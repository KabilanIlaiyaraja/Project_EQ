// @ts-check

const { BasePage } = require('../page/basePage')
const { DashboardPage } = require('../page/dashboardPage')
const { QuestionnairePage } = require('../page/questionnairePage')
const { QuestionsPage } = require('../page/questionsPage')
const { MediasPage } = require('../page/mediaPage')
const { TrainingPage } = require('../page/trainingPage')
const { QuestionAction } = require('../action/questionsAction')
const { ModuleAction } = require('../action/moduleAction')
const { TrainingAction } = require('../action/trainingAction')

exports.BaseAction = class BaseAction {
  /**
    * @param {import('@playwright/test').Page} page
    */

  constructor (page) {
    this.page = page
    this.basePage = new BasePage(this.page)
    this.dashboardPage = new DashboardPage(this.page)
    this.questionnairePage = new QuestionnairePage(this.page)
    this.questionsPage = new QuestionsPage(this.page)
    this.mediaPage = new MediasPage(this.page)
    this.trainingPage = new TrainingPage(this.page)
    this.questionsAction = new QuestionAction(this.page)
  }

  async baseCreateStep (elementNames) {
    await this.dashboardPage.clickBases()
    await this.basePage.clickNewBase()
    await this.basePage.enterBasename(elementNames)
    await this.basePage.clickNoformatText()
  }

  async createBase (elementNames, baseType) {
    await this.baseCreateStep(elementNames)
    switch (baseType) {
      case ('singledomain'):
        await this.basePage.createSingleDomain(elementNames)
        break
      case ('multipledomain'):
        await this.basePage.createMultipleDomain(elementNames.multipledomain)
        break
      default:
        console.log(baseType + ' ' + 'No domains are created')
        break
    }
    await this.saveAndVerify(elementNames)
  }

  async saveAndVerify (elementNames) {
    await this.basePage.clickSaveBase()
    await this.dashboardPage.clickBases()
    await this.page.reload({ waitUntil: 'load' })
    await this.basePage.verifyBasePresent(elementNames)
  }

  async deleteBaseVerify (baseName) {
    await this.dashboardPage.clickBases()
    await this.basePage.clickStatusFilter()
    await this.basePage.selectAllStatus()
    await this.deleteBase(baseName)
    await this.page.reload({ waitUntil: 'load' })
    await this.basePage.verifyBaseDeleted(baseName)
  }

  async deleteBase (baseName) {
    await this.basePage.clickDeleteIcon(baseName)
    await this.basePage.confirmDelete(baseName)
    await this.dashboardPage.waiting()
  }

  async archiveBase (base) {
    await this.dashboardPage.clickBases()
    await this.page.reload({ waitUntil: 'load' })
    await this.basePage.selectBase(base)
    await this.basePage.clickArchiveButton()
    await this.verifyArchivedBase(base)
  }

  async verifyBaseDataArchived (base) {
    await this.dashboardPage.clickQuestionnaire()
    await this.questionnairePage.clickTopicFilter()
    await this.questionnairePage.verifyBaseNotDisplayed(base)
    await this.dashboardPage.clickQuestions()
    await this.questionsPage.clickTopicFilter()
    await this.questionsPage.verifyBaseNotDisplayed(base)
    await this.dashboardPage.clickMedia()
    await this.mediaPage.verifyBaseNotInFilter(base)
  }

  async verifyBaseDataActive (base) {
    await this.dashboardPage.clickQuestionnaire()
    await this.page.reload({ waitUntil: 'load' })
    await this.questionnairePage.clickTopicFilter()
    await this.questionnairePage.selectTopic(base)
    await this.dashboardPage.clickQuestions()
    await this.questionsPage.clickTopicFilter()
    await this.questionsPage.selectTopic(base)
    await this.dashboardPage.clickMedia()
    await this.mediaPage.clickFolderFilter()
    await this.mediaPage.selectTopic(base)
  }

  async editBaseAndVerify (oldBaseName, newBaseName) {
    await this.dashboardPage.clickBases()
    await this.basePage.clickEditBase(oldBaseName)
    await this.basePage.enterBasename(newBaseName)
    await this.basePage.clickSaveBase()
    await this.dashboardPage.clickBases()
    await this.page.reload({ waitUntil: 'load' })
    await this.basePage.verifyBasePresent(newBaseName)
  }

  async mediaAndQuestionNotUplodatedOnArchivedBaseAndVerify (base) {
    await this.basePage.clickStatusFilter()
    await this.basePage.selectArchivedStatus()
    await this.basePage.verifyBasePresent(base)
    await this.basePage.openArchivebase(base)
    await this.basePage.clickBaseMedias()
    // await this.basePage.verifyValidationMessageIsDisplayedWhileClickingMediaTabOnArchivedBase()
  }

  async addMediaThroughBases (baseName, mediaList) {
    await this.dashboardPage.clickBases()
    await this.basePage.openBase(baseName)
    await this.basePage.clickMediaTab()
    await this.createMedia(mediaList)
  }

  async createMedia (data) {
    const datas = data.items
    for (const element of datas) {
      if (element.type === 'factsheet') {
        await this.basePage.clickFactSheetButton()
        await this.basePage.enterFactSheetTitle(element)
        await this.basePage.enterFactContent(element)
        await this.basePage.saveFactSheet(element)
      } else {
        if (element.type === 'embed') {
          await this.basePage.clickEmbedButton()
          await this.basePage.enterEmbedTitle(element)
          await this.basePage.enterEmbedCode(element)
          await this.basePage.saveEmbedVideo(element)
        } else {
          await this.basePage.clickNewMediaButtonFromBase()
          await this.basePage.uploadFiles(element)
        }
      }
    }
  }

  async unarchiveBaseAndVerify (base) {
    await this.dashboardPage.clickBases()
    await this.verifyArchivedBase(base)
    await this.basePage.selectBase(base)
    await this.basePage.clickUnarchiveButton()
    await this.verifyActiveBase(base)
  }

  async deleteDuplicateBase (base) {
    await this.dashboardPage.clickBases()
    await this.basePage.clickStatusFilter()
    await this.basePage.selectAllStatus()
    await this.deleteDuplicatedbase(base)
    await this.basePage.verifyDeletedDuplicateBasePresent(base)
  }

  async deleteDuplicatedbase (base) {
    await this.basePage.clickDeleteIconInDuplicateBase(base)
    await this.basePage.confirmDeleteInDuplicateBase(base)
    await this.dashboardPage.waiting()
  }

  async createQuestionsThroughBase (base, baseStatus, baseType, question) {
    await this.questionsAction.createQuestionStep(base, baseStatus)
    switch (baseType) {
      case ('singledomain'):
        await this.questionsAction.createQuestionsWithDomain(base, question)
        break
      case ('withoutdomain'):
        await this.questionsAction.createQuestionsWithoutDomain(question)
        break
      default:
        console.log(baseType + 'Base domain not defined')
        break
    }
  }

  async createQuestionnaireThroughBase (baseName, baseStatus, questionnaireType, questionnaireName) {
    await this.createQuestionnaireStep(baseName, baseStatus)
    switch (questionnaireType) {
      case ('static'):
        await this.staticQuestionnaire(questionnaireName)
        await this.selectAllQuestion(baseName, baseStatus, questionnaireName)
        break
      case ('dynamic'):
        await this.dynamicQuestionnaire(questionnaireName)
        break
      default:
        console.log(questionnaireType + 'Questionnaire type not defined')
        break
    }
    if (baseStatus === 'active') {
      await this.verifyQuestionnaire(baseName, questionnaireName)
    }
  }

  async createQuestionnaires (baseName, baseStatus, questionnaireType, questionnaireName) {
    for (const questionnaire of questionnaireName) {
      await this.createQuestionnaireThroughBase(baseName, baseStatus, questionnaireType, questionnaire)
    }
  }

  async verifyQuestionnaire (baseName, questionnaire) {
    await this.dashboardPage.clickQuestionnaire()
    await this.questionnairePage.clickTopicFilter()
    await this.questionnairePage.selectTopic(baseName)
    await this.page.reload({ waitUntil: 'load' })
    await this.questionnairePage.verifyQuestionnaireExist(questionnaire)
  }

  async verifyArchivedBase (base) {
    await this.basePage.clickStatusFilter()
    await this.basePage.selectArchivedStatus()
    await this.basePage.verifyArchivebase(base)
  }

  async verifyActiveBase (base) {
    await this.basePage.clickStatusFilter()
    await this.basePage.selectActiveStatus()
    await this.basePage.verifyBasePresent(base)
  }

  async selectBase (baseName, baseStatus) {
    switch (baseStatus) {
      case ('active'):
        await this.basePage.openBase(baseName)
        break
      case ('archived'):
        await this.basePage.clickStatusFilter()
        await this.basePage.selectArchivedStatus()
        await this.basePage.openArchivebase(baseName)
        break
      default:
        console.log(baseStatus + 'Base status not defined')
        break
    }
  }

  async createQuestionnaireStep (baseName, baseStatus) {
    await this.dashboardPage.clickBases()
    await this.selectBase(baseName, baseStatus)
    await this.basePage.clickQuestionnaireTab()
    await this.questionnairePage.clickCreateQuestionnaire()
  }

  async dynamicQuestionnaire (questionnaireName) {
    await this.questionnairePage.enterQuestionnaireName(questionnaireName)
    await this.questionnairePage.dynamicType()
    await this.questionnairePage.saveQuestionnaire()
    await this.questionnairePage.enterQuestionsDisplayed()
    await this.questionnairePage.clickSave()
  }

  async staticQuestionnaire (questionnaireName) {
    await this.questionnairePage.enterQuestionnaireName(questionnaireName)
    await this.questionnairePage.saveQuestionnaire()
  }

  async selectAllQuestion (baseName, baseStatus, questionnaireName) {
    await this.dashboardPage.clickBases()
    await this.selectBase(baseName, baseStatus)
    await this.basePage.clickQuestionnaireTab()
    await this.page.reload({ waitUntil: 'load' })
    await this.questionnairePage.openQuestionnaire(questionnaireName)
    await this.questionnairePage.clickSelection()
    await this.questionnairePage.selectAllQuestions()
    await this.questionnairePage.saveSelectedQuestions()
  }

  async selectOpenArchiveBase (base) {
    await this.dashboardPage.clickBases()
    await this.basePage.clickStatusFilter()
    await this.basePage.selectArchivedStatus()
    await this.basePage.openArchivebase(base)
  }

  async createTrainingThroughArchiveBase (admin, base, training) {
    this.trainingAction = new TrainingAction(this.page)
    await this.selectOpenArchiveBase(base)
    await this.basePage.clickTrainingTab()
    await this.trainingAction.createTrainingThroughArchiveBase(admin, base, training)
  }

  async createModuleThroughArchiveBase (base, module) {
    this.moduleAction = new ModuleAction(this.page)
    await this.selectOpenArchiveBase(base)
    await this.basePage.clickModuleTab()
    await this.moduleAction.createModuleThroughArchiveBase(module)
  }

  async addElementThroughArchiveBase (base, module) {
    this.moduleAction = new ModuleAction(this.page)
    await this.selectOpenArchiveBase(base)
    await this.basePage.clickModuleTab()
    await this.moduleAction.addModuleElementsThroughArchiveBases(base, module)
  }

  async duplicateBaseWithoutElementAndVerify (base) {
    await this.dashboardPage.clickBases()
    await this.basePage.clickDuplicate(base)
    await this.basePage.clickSaveButtonOnDuplicatePopupWindow()
    await this.dashboardPage.clickBases()
    await this.basePage.openDuplicateBase(base)
    await this.basePage.verifyDuplicateBasePresentWithoutQuestionnaireElement(base)
    await this.basePage.verifyDuplicateBasePresentWithoutQuestionElement(base)
  }

  async duplicateBaseWithElementAndVerify (base) {
    await this.dashboardPage.clickBases()
    await this.basePage.clickDuplicate(base)
    await this.basePage.enableYesOnDuplicateBaseWithElement()
    await this.basePage.clickSaveButtonOnDuplicatePopupWindow()
    await this.dashboardPage.clickBases()
    await this.basePage.openDuplicateBase(base)
    await this.basePage.verifyDuplicateBasePresentWithQuestionnaireQuestionElements()
  }

  async verifyVisibilityIsNotDuplicatedOnDuplicateBase (base, questionnaire) {
    await this.dashboardPage.clickBases()
    await this.basePage.openDuplicateBase(base)
    await this.basePage.clickQuestionnaireTab()
    await this.page.reload({ waitUntil: 'load' })
    await this.basePage.verifyVisibilityIsNotDuplicatedOnDuplicateBaseOfQuestionnaire(questionnaire)
  }

  async verifyQuestionnaireModeIsDuplicatedExceptPublicVisibilityOnDuplicateBase (base, questionnaire) {
    await this.dashboardPage.clickBases()
    await this.basePage.openDuplicateBase(base)
    await this.basePage.clickQuestionnaireTab()
    await this.page.reload({ waitUntil: 'load' })
    await this.basePage.verifyQuestionnaireModeIsDuplicatedExceptPublicVisibilityOnDuplicateBase(questionnaire)
  }

  async verifyMediaIsDuplicatedFromOriginalBase (base, media) {
    await this.dashboardPage.clickBases()
    await this.basePage.openDuplicateBase(base)
    await this.basePage.clickMediaTab()
    await this.page.reload({ waitUntil: 'load' })
    await this.basePage.verifyMediaIsDuplicatedOnDuplicateBaseWithElement(media.items)
  }

  async verifyQuestionIsDuplicatedFromOriginalBase (base, question) {
    await this.dashboardPage.clickBases()
    await this.basePage.openDuplicateBase(base)
    await this.basePage.clickQuestionsTab()
    await this.basePage.verifyQuestionIsPresentedInDuplicateBase(question)
  }
}
