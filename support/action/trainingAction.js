// @ts-check

const { PlayerPage } = require('../page/playerPage')
const { HomeAction } = require('./homeAction')
const { DashboardPage } = require('../page/dashboardPage')
const { EnterprisePage } = require('../page/enterprisePage')
const { QuestionnairePage } = require('../page/questionnairePage')
const { TrainingPage } = require('../page/trainingPage')
const { PlayerAction } = require('./playerAction')
const { expect } = require('playwright/test')

exports.TrainingAction = class TrainingAction {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor (page) {
    this.page = page
    this.playerPage = new PlayerPage(this.page)
    this.home = new HomeAction(this.page)
    this.dashboardPage = new DashboardPage(this.page)
    this.enterprisePage = new EnterprisePage(this.page)
    this.questionnairePage = new QuestionnairePage(this.page)
    this.trainingPage = new TrainingPage(this.page)
  }

  async createTrainingThroughArchiveBase (loginData, baseName, trainingData) {
    await this.trainingPage.clickNewTraining()
    await this.trainingPage.enterTrainingName(trainingData)
    await this.trainingPage.enterStartDate()
    await this.trainingPage.enterEndDate()
    await this.trainingPage.selectTrainer(loginData)
    await this.trainingPage.enterLocation(trainingData)
    await this.trainingPage.clickSave()
    await this.trainingPage.navigateTrainingPage()
    await this.dashboardPage.clickTraining()
    await this.trainingPage.clickTopicFolderFilter()
    await this.trainingPage.selectBase(baseName)
    await this.trainingPage.verifyTrainingBaseIsArchived(baseName, trainingData)
  }

  async createTraining (adminUser, baseName, trainingData) {
    await this.dashboardPage.clickTraining()
    await this.trainingPage.clickTopicFolderFilter()
    await this.trainingPage.selectBase(baseName)
    await this.trainingPage.clickNewTraining()
    await this.page.waitForLoadState('load')
    await this.trainingPage.enterTrainingName(trainingData)
    await this.trainingPage.enterStartDate()
    await this.trainingPage.enterEndDate()
    await this.trainingPage.selectTrainer(adminUser)
    await this.trainingPage.enterLocation(trainingData)
    await this.trainingPage.clickSave()
    await this.trainingPage.navigateTrainingPage()
    await this.dashboardPage.clickTraining()
    await this.trainingPage.verifyTrainingExist(baseName, trainingData)
  }

  async addQuestionnaireAndMedia (baseName, trainingData, questionnaires, medias) {
    await this.dashboardPage.clickTraining()
    await this.setAllFiltersAsAll()
    await this.trainingPage.openTraining(baseName, trainingData)
    await this.trainingPage.clickQuestionnaires()
    await this.trainingPage.clickSeeAsAdmin()
    await this.page.reload({ waitUntil: 'load' })
    await this.trainingPage.selectQuestionnaire(questionnaires)
    await this.trainingPage.verifyQuestionnairesAdded(questionnaires)
    await this.trainingPage.clickMedias()
    await this.trainingPage.selectMedia(medias)
  }

  async inviteUsersForTraining (users, baseName, trainingData) {
    await this.dashboardPage.clickTraining()
    await this.setAllFiltersAsAll()
    await this.trainingPage.openTraining(baseName, trainingData)
    await this.trainingPage.clickMedias()
    await this.trainingPage.clickInvitations()
    await this.trainingPage.selectParticipants(users)
    await this.trainingPage.clickSendInvitationButton()
    await this.dashboardPage.clickTraining()
    await this.trainingPage.openTraining(baseName, trainingData)
    await this.trainingPage.clickMedias()
    await this.trainingPage.navigateToParticipantTab()
    await this.trainingPage.dragToPresentUserOnTraining()
    await this.dashboardPage.logOut()
  }

  async inviteUsersForDuplicatingTraining (users, baseName, trainingData) {
    await this.dashboardPage.clickTraining()
    await this.setAllFiltersAsAll()
    await this.trainingPage.openDuplicateTraining(baseName, trainingData)
    await this.trainingPage.clickMedias()
    await this.trainingPage.clickInvitations()
    await this.trainingPage.selectParticipants(users)
    await this.trainingPage.clickSendInvitationButton()
    await this.dashboardPage.logOut()
  }

  async verifyTrainingOfBaseAcrhived (baseName, trainingData) {
    await this.dashboardPage.clickTraining()
    await this.setAllFiltersAsAll()
    await this.trainingPage.verifyTrainingBaseIsArchived(baseName, trainingData)
  }

  async deleteTrainingAndVerify (baseName, trainingData) {
    await this.dashboardPage.clickTraining()
    await this.setAllFiltersAsAll()
    await this.trainingPage.clickTopicFolderFilter()
    await this.trainingPage.selectBase(baseName)
    await this.trainingPage.clickDeleteTraining(trainingData)
    await this.trainingPage.confirmDeleteTraining()
    await this.trainingPage.verifyTrainingNotExist(baseName, trainingData)
  }

  async startTrainingByParticipants (user, training, questionnaire, answers, medias) {
    if (user.trainer !== null) {
      await this.home.logInUser(user)
      await this.trainingPage.openInviteByUser(training)
      await this.trainingPage.confirmTrainingByUser()
      await this.trainingPage.clickTrainingOldViewButton()
      await this.page.reload({ waitUntil: 'load' })
      await this.playFreeQuestionnaire(questionnaire, answers)
      await this.trainingPage.verifyFreeResult(questionnaire)
      await this.openAvailableMedias(medias)
      await this.dashboardPage.userLogOut()
    }
  }

  async playFreeQuestionnaire (questionnaire, answers) {
    for (const questionnaires of questionnaire) {
      if (questionnaires.usage === 'free') {
        await expect(this.page.locator("//*[@id='free-evals-bloc-2']//a/*[contains(.,'" + questionnaires.questionnaire_name + ' ' + process.env.uniqueId + "')]")).toBeVisible()
        const pagePromise = this.page.context().waitForEvent('page')
        await this.page.click("//*[@id='free-evals-bloc-2']//a/*[contains(.,'" + questionnaires.questionnaire_name + ' ' + process.env.uniqueId + "')]")
        const newPage = await pagePromise
        this.play = new PlayerAction(newPage)
        await this.play.answerForTrainingQuestionnaire(answers)
        await newPage.close()
      }
    }
  }

  async playEvaluationQuestionnaires (questionnaire, answers) {
    for (const questionnaires of questionnaire) {
      if (questionnaires.usage === 'evaluation') {
        await expect(this.page.locator("//*[@id='pending-evals-bloc-2']//a/*[contains(.,'" + questionnaires.questionnaire_name + ' ' + process.env.uniqueId + "')]")).toBeVisible()
        const pagePromise = this.page.context().waitForEvent('page')
        await this.page.click("//*[@id='pending-evals-bloc-2']//a/*[contains(.,'" + questionnaires.questionnaire_name + ' ' + process.env.uniqueId + "')]")
        const newPage = await pagePromise
        this.play = new PlayerAction(newPage)
        await this.play.answerForTrainingQuestionnaire(answers)
        await newPage.close()
      }
    }
  }

  async openAvailableMedias (medias) {
    for (const element of medias.items) {
      if (element.usage === 'available') {
        await this.trainingPage.verifyViewMedia(element)
      }
      // if (element.usage === 'selected') {
      //   await this.trainingPage.viewByType(element)
      // }
    }
  }

  async sendTrainingEvaluationToParticipants (loginData, base, training, questionnaire) {
    await this.home.logIn(loginData)
    await this.dashboardPage.clickTraining()
    await this.setAllFiltersAsAll()
    await this.trainingPage.openTraining(base, training)
    await this.trainingPage.clickQuestionnaires()
    await this.trainingPage.ClickSeeAsTrainer()
    await this.trainingPage.clickTrainingQuestionnaireInvitation(questionnaire)
    await this.trainingPage.submitEvaluation()
    await this.dashboardPage.userLogOut()
  }

  async sendTrainingEvaluationToParticipantsByTrainer (loginData, training, questionnaire) {
    await this.home.logInUser(loginData)
    await this.trainingPage.openInviteByUser(training)
    await this.trainingPage.clickQuestionnaires()
    await this.trainingPage.clickTrainingQuestionnaireInvitation(questionnaire)
    await this.trainingPage.submitEvaluation()
    await this.dashboardPage.userLogOut()
  }

  async playEvaluationByParticipants (user, training, questionnaire, answers, media) {
    if (user.trainer !== null) {
      await this.home.logInUser(user)
      await this.trainingPage.openInviteByUser(training)
      await this.page.reload({ waitUntil: 'load' })
      await this.playEvaluationQuestionnaires(questionnaire, answers)
      await this.trainingPage.verifyEvaluationResult(questionnaire)
      await this.openAvailableMedias(media)
      await this.dashboardPage.userLogOut()
    }
  }

  async editTraining (baseName, trainingData, editTrainingData, users) {
    await this.dashboardPage.clickTraining()
    await this.setAllFiltersAsAll()
    await this.trainingPage.openTraining(baseName, trainingData)
    await this.trainingPage.clickEdit()
    await this.trainingPage.enterTrainingName(editTrainingData)
    await this.trainingPage.enterStartDate()
    await this.trainingPage.enterEndDate()
    await this.trainingPage.selectTrainerAsUser(users)
    await this.trainingPage.enterLocation(editTrainingData)
    await this.trainingPage.clickSave()
    await this.dashboardPage.clickTraining()
    await this.trainingPage.verifyTrainingExist(baseName, editTrainingData)
  }

  async duplicateTraining (baseName, trainer, trainingData) {
    await this.dashboardPage.clickTraining()
    await this.setAllFiltersAsAll()
    await this.trainingPage.clickTopicFolderFilter()
    await this.trainingPage.selectBase(baseName)
    await this.trainingPage.clickDuplicateTraining(trainingData)
    await this.page.reload({ waitUntil: 'load' })
    await this.trainingPage.openDuplicateTraining(baseName, trainingData)
    await this.trainingPage.clickEdit()
    await this.trainingPage.enterStartDate()
    await this.trainingPage.enterEndDate()
    await this.trainingPage.selectTrainerAsUser(trainer)
    await this.trainingPage.enterLocation(trainingData)
    await this.trainingPage.clickSave()
    await this.dashboardPage.clickTraining()
    await this.trainingPage.verifyDuplicatedTrainingExist(baseName, trainingData)
  }

  async verifyTrainingOptionsByPermittedUser (adminUser, base, trainingData, editTrainingData, userList, contact, trainingQuestionnaire, mediaList) {
    await this.createTraining(adminUser, base, trainingData)
    await this.addQuestionnaireAndMedia(base, trainingData, trainingQuestionnaire, mediaList)
    await this.editTraining(base, trainingData, editTrainingData, contact)
    await this.inviteUsersForTraining(userList, base, editTrainingData)
  }

  async setAllFiltersAsAll () {
    // await this.trainingPage.clickTopicFolderFilter()
    // await this.trainingPage.selectAllBase()
    // await this.trainingPage.clickTrainingStatusFilter()
    // await this.trainingPage.selectAllTraining()
    // await this.trainingPage.clickPeriodFilter()
    // await this.trainingPage.selectAllPeriods()
    // await this.trainingPage.clickPageFilter()
    // await this.trainingPage.select400PerPage()
  }
}
