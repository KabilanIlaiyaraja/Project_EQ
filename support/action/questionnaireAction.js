// @ts-check

const { expect } = require('@playwright/test')
const { BasePage } = require('../page/basePage')
const { DashboardPage } = require('../page/dashboardPage')
const { QuestionnairePage } = require('../page/questionnairePage')
const { PlayerAction } = require('../action/playerAction')
const { HomeAction } = require('../action/homeAction')

exports.QuestionnaireAction = class QuestionnaireAction {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor (page) {
    this.page = page
    this.base = new BasePage(this.page)
    this.dashboard = new DashboardPage(this.page)
    this.questionnaire = new QuestionnairePage(this.page)
  }

  async createQuestionnaireThroughDuplicateBases (baseName, questionnaireName) {
    await this.dashboard.clickBases()
    await this.base.openDuplicateBase(baseName)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.clickCreateQuestionnaire()
    await this.questionnaire.enterQuestionnaireName(questionnaireName)
    await this.questionnaire.dynamicType()
    await this.questionnaire.saveQuestionnaire()
    await this.questionnaire.enterQuestionsDisplayed()
    await this.questionnaire.clickSave()
  }

  async createConsequenceQuestionnaireThroughBase (baseName, questionnaire, consequence) {
    await this.createConsequenceQuestionnaire(baseName, questionnaire, consequence)
    await this.verifyQuestionnaireIsNowConsequence(baseName, questionnaire)
  }

  async createVisibilityQuestionnaireThroughBase (baseName, questionnaire) {
    await this.createVisibilityQuestionnaire(baseName, questionnaire)
    await this.verifyQuestionnaireIsNowVisibility(baseName, questionnaire)
  }

  async createRenewalQuestionnaireThroughBase (baseName, questionnaire) {
    await this.createRenewalQuestionnaire(baseName, questionnaire)
    await this.verifyQuestionnaireIsNowRenewal(baseName, questionnaire)
  }

  async createFormQuestionnaireThroughBase (baseName, questionnaire, form) {
    await this.createFormQuestionnaire(baseName, questionnaire, form)
    await this.verifyQuestionnaireIsNowForm(baseName, questionnaire)
  }

  async createPublicQuestionnaireThroughBase (baseName, questionnaire) {
    await this.createPublicQuestionnaire(baseName, questionnaire)
    await this.verifyQuestionnaireIsNowPublic(baseName, questionnaire)
  }

  async createConsequenceQuestionnaire (baseName, questionnaireName, consequence) {
    await this.dashboard.clickBases()
    await this.base.openBase(baseName)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.openQuestionnaire(questionnaireName)
    await this.questionnaire.clickOptions()
    await this.questionnaire.enterConsequenceMessages(consequence)
    await this.questionnaire.enterAction(consequence)
    await this.questionnaire.clickOptionSave()
  }

  async createRenewalQuestionnaire (baseName, questionnaireName) {
    await this.dashboard.clickBases()
    await this.base.openBase(baseName)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.openQuestionnaire(questionnaireName)
    await this.questionnaire.clickOptions()
    await this.questionnaire.enterNoOfMonthOnRenewalField(questionnaireName)
    await this.questionnaire.clickOptionSave()
  }

  async createPublicQuestionnaire (baseName, questionnaireName) {
    await this.dashboard.clickBases()
    await this.base.openBase(baseName)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.openQuestionnaire(questionnaireName)
    await this.questionnaire.clickVisibility()
    await this.questionnaire.clickMakeItPublic()
    await this.questionnaire.enterPublicQuestionnaireLink(questionnaireName.public)
    await this.questionnaire.clickMakePublic()
  }

  async createVisibilityQuestionnaire (baseName, questionnaireName) {
    await this.dashboard.clickBases()
    await this.base.openBase(baseName)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.openQuestionnaire(questionnaireName)
    await this.questionnaire.clickVisibility()
    await this.questionnaire.selectAllUsers()
    await this.questionnaire.clickSaveOnVisibilityPage()
  }

  async createFormQuestionnaire (baseName, questionnaireName, form) {
    await this.dashboard.clickBases()
    await this.base.openBase(baseName)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.openQuestionnaire(questionnaireName)
    await this.questionnaire.clickOptions()
    await this.questionnaire.selectForm(form)
    await this.questionnaire.clickOptionSave()
  }

  async openQuestionnaire (questionnaireName) {
    await this.dashboard.clickQuestionnaire()
    await this.setAllFilterAsAll()
    await this.questionnaire.openQuestionnaire(questionnaireName)
  }

  async verifyQuestionnaireIsNowPublic (baseName, questionnaireName) {
    await this.dashboard.clickBases()
    await this.base.openBase(baseName)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.verifyQuestionnaireIsCreatedAsPublic(questionnaireName)
  }

  async verifyQuestionnaireIsNowConsequence (baseName, questionnaireName) {
    await this.dashboard.clickBases()
    await this.base.openBase(baseName)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.verifyQuestionnaireIsCreatedAsConsequence(questionnaireName)
  }

  async verifyQuestionnaireIsNowForm (baseName, questionnaireName) {
    await this.dashboard.clickBases()
    await this.base.openBase(baseName)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.verifyQuestionnaireIsCreatedAsForm(questionnaireName)
  }

  async verifyQuestionnaireIsNowRenewal (baseName, questionnaireName) {
    await this.dashboard.clickBases()
    await this.base.openBase(baseName)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.verifyQuestionnaireIsCreatedAsRenewal(questionnaireName)
  }

  async verifyQuestionnaireIsNowVisibility (baseName, questionnaireName) {
    await this.dashboard.clickBases()
    await this.base.openBase(baseName)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.verifyQuestionnaireIsCreatedAsVisibility(questionnaireName)
  }

  async setFormForQuestionnaire (base, questionnaireName, form) {
    await this.stepSetFormForQuestionnaire(base, questionnaireName)
    await this.questionnaire.selectForm(form)
    await this.questionnaire.clickSaveOptionPage()
  }

  async setDuplicateFormForQuestionnaire (base, questionnaireName, form) {
    await this.stepSetFormForQuestionnaire(base, questionnaireName)
    await this.questionnaire.selectDuplicateForm(form)
    await this.questionnaire.clickSaveOptionPage()
  }

  async setFormForQuestionnaireWithNoLimit (base, questionnaireName, form) {
    await this.stepSetFormForQuestionnaire(base, questionnaireName)
    await this.questionnaire.clickNoLimit()
    await this.questionnaire.selectForm(form)
    await this.questionnaire.clickSaveOptionPage()
  }

  async stepSetFormForQuestionnaire (base, questionnaireName) {
    await this.dashboard.clickQuestionnaire()
    await this.questionnaire.clickTopicFilter()
    await this.questionnaire.selectBase(base)
    await this.questionnaire.openQuestionnaire(questionnaireName)
    await this.questionnaire.clickOptions()
  }

  async addConsequenceMessageOnQuestionnaire (base, questionnaireData, consequence) {
    await this.dashboard.clickBases()
    await this.base.openBase(base)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.openQuestionnaire(questionnaireData)
    await this.questionnaire.clickOptions()
    await this.questionnaire.enterConsequenceMessages(consequence)
    await this.questionnaire.clickSaveOptionPage()
  }

  async addAllConsequenceActionOnQuestionnaire (base, questionnaireData, consequence) {
    await this.dashboard.clickBases()
    await this.base.openBase(base)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.openQuestionnaire(questionnaireData)
    await this.questionnaire.clickOptions()
    await this.questionnaire.enterAllConsequenceAction(consequence)
    await this.questionnaire.clickSaveOptionPage()
  }

  async addConsequenceMessage (questionnaire, message) {
    await this.dashboard.clickQuestionnaire()
    await this.page.reload({ waitUntil: 'load' })
    await this.setAllFilterAsAll()
    await this.questionnaire.openQuestionnaire(questionnaire)
    await this.questionnaire.clickOptions()
    await this.questionnaire.enterConsequenceMessages(message)
    await this.questionnaire.clickCheckCode()
    await this.questionnaire.enterValidation(message)
    await this.questionnaire.clickCodeValidate()
    await this.page.reload({ waitUntil: 'load' })
    await this.questionnaire.enterConsequenceMessages(message)
    await this.questionnaire.clickSaveOptionPage()
  }

  async addConsequenceActionAssignGroup (questionnaire, message) {
    await this.dashboard.clickQuestionnaire()
    await this.page.reload({ waitUntil: 'load' })
    await this.setAllFilterAsAll()
    await this.questionnaire.openQuestionnaire(questionnaire)
    await this.questionnaire.clickOptions()
    await this.questionnaire.enterActionAssignGroup(message)
    await this.questionnaire.clickCheckCode()
    await this.questionnaire.enterValidationGroup(message)
    await this.questionnaire.clickCodeValidate()
    await this.page.reload({ waitUntil: 'load' })
    await this.questionnaire.enterActionAssignGroup(message)
    await this.questionnaire.clickSaveOptionPage()
  }

  async addConsequenceActionRemoveGroup (questionnaire, message) {
    await this.dashboard.clickQuestionnaire()
    await this.page.reload({ waitUntil: 'load' })
    await this.setAllFilterAsAll()
    await this.questionnaire.openQuestionnaire(questionnaire)
    await this.questionnaire.clickOptions()
    await this.questionnaire.enterActionRemoveGroup(message)
    await this.questionnaire.clickCheckCode()
    await this.questionnaire.enterValidationGroup(message)
    await this.questionnaire.clickCodeValidate()
    await this.page.reload({ waitUntil: 'load' })
    await this.questionnaire.enterActionRemoveGroup(message)
    await this.questionnaire.clickSaveOptionPage()
  }

  async deleteQuestionnaireAndVerify (base, questionnaireName) {
    await this.dashboard.clickQuestionnaire()
    await this.setAllFilterAsAll()
    await this.questionnaire.clickAllbasefilteronQuestionnairelist()
    await this.questionnaire.selectBase(base)
    await this.deleteQuestionnaire(questionnaireName)
    await this.dashboard.clickQuestionnaire()
    await this.page.reload({ waitUntil: 'load' })
    await this.questionnaire.verifyQuestionnaireNotExist(questionnaireName)
  }

  async deleteQuestionnaire (questionnaireName) {
    await this.questionnaire.clickDeleteIcon(questionnaireName)
    await this.questionnaire.confirmDeleteQuestionnaire(questionnaireName)
  }

  async duplicateQuestionnaireAndVerify (base, questionnaireName) {
    await this.dashboard.clickQuestionnaire()
    await this.setAllFilterAsAll()
    await this.questionnaire.clickAllbasefilteronQuestionnairelist()
    await this.questionnaire.selectBase(base)
    await this.questionnaire.clickDuplicateIcon(questionnaireName)
    await this.dashboard.clickQuestionnaire()
    await this.page.reload({ waitUntil: 'load' })
    await this.questionnaire.verifyDuplicatedQuestionnaire(questionnaireName)
  }

  async setVisiblilityToAll (base, questionnaireName) {
    await this.dashboard.clickBases()
    await this.base.openBase(base)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.openQuestionnaire(questionnaireName)
    await this.questionnaire.clickVisibility()
    await this.questionnaire.selectAllUsers()
    await this.questionnaire.clickSaveOnQuestionnaireVisibilityPage()
    await this.dashboard.logOut()
  }

  async setVisiblilityToGroup (base, questionnaireName, group) {
    await this.dashboard.clickBases()
    await this.base.openBase(base)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.openQuestionnaire(questionnaireName)
    await this.questionnaire.clickVisibility()
    await this.questionnaire.selectGroupVisibility(group)
    await this.questionnaire.clickSaveOnQuestionnaireVisibilityPage()
    await this.dashboard.logOut()
  }

  async makeQuestionnairePublic (base, questionnaireName) {
    await this.createPublicQuestionnaire(base, questionnaireName)
    const link = await this.questionnaire.getLink()
    await this.dashboard.logOut()
    return link
  }

  async editQuestionnaire (base, questionnaire, newQuestionnaire) {
    await this.dashboard.clickBases()
    await this.base.openBase(base)
    await this.base.clickQuestionnaireTab()
    await this.questionnaire.openQuestionnaire(questionnaire)
    await this.questionnaire.clickEditQuestionnaire()
    await this.questionnaire.enterQuestionnaireNameOnEditPage(newQuestionnaire)
    await this.questionnaire.clickSave()
    await this.page.waitForTimeout(3000)
    await this.dashboard.clickDashboard()
  }

  async setAuthorForQuestionnaire (questionnaire, users) {
    await this.dashboard.clickQuestionnaire()
    await this.setAllFilterAsAll()
    await this.questionnaire.openQuestionnaire(questionnaire)
    await this.questionnaire.clickOptions()
    await this.questionnaire.setAuthorName(users)
    await this.questionnaire.clickSaveOptionPage()
  }

  async verifyStaticFilter (staticQuestionnaire, dynamicQuestionnaire) {
    await this.dashboard.clickQuestionnaire()
    await this.page.reload({ waitUntil: 'load' })
    await this.setAllFilterAsAll()
    await this.questionnaire.clickTypeFilter()
    await this.questionnaire.selectStaticOption()
    await this.questionnaire.verifyQuestionnaireExist(staticQuestionnaire)
    await this.questionnaire.verifyQuestionnaireNotExist(dynamicQuestionnaire)
  }

  async verifyDynamicFilter (dynamicQuestionnaire, staticQuestionnaire) {
    await this.dashboard.clickQuestionnaire()
    await this.page.reload({ waitUntil: 'load' })
    await this.setAllFilterAsAll()
    await this.questionnaire.clickTypeFilter()
    await this.questionnaire.selectDynamicOption()
    await this.questionnaire.verifyQuestionnaireExist(dynamicQuestionnaire)
    await this.questionnaire.verifyQuestionnaireNotExist(staticQuestionnaire)
  }

  async setAllFilterAsAll () {
    await this.questionnaire.clickTopicFilter()
    await this.questionnaire.selectAllTopicsOption()
    await this.questionnaire.clickTypeFilter()
    await this.questionnaire.selectAllTypeOption()
    await this.questionnaire.clickAuthorFilter()
    await this.questionnaire.selectAllAuthorsOption()
  }

  async verifyTopicFilter (base, baseQuestionnaire, otherQuestionnaire) {
    await this.dashboard.clickQuestionnaire()
    await this.page.reload({ waitUntil: 'load' })
    await this.setAllFilterAsAll()
    await this.questionnaire.clickTopicFilter()
    await this.questionnaire.selectBase(base)
    await this.questionnaire.verifyQuestionnaireExist(baseQuestionnaire)
    await this.questionnaire.verifyQuestionnaireNotExist(otherQuestionnaire)
  }

  async verifyAllTopicFilter (questionnaire1, questionnaire2) {
    await this.dashboard.clickQuestionnaire()
    await this.page.reload({ waitUntil: 'load' })
    await this.setAllFilterAsAll()
    await this.questionnaire.clickTopicFilter()
    await this.questionnaire.selectAllTopicsOption()
    await this.questionnaire.verifyQuestionnaireExist(questionnaire1)
    await this.questionnaire.verifyQuestionnaireExist(questionnaire2)
  }

  async verifyAllAuthorsFilter (questionnaire1, questionnaire2) {
    await this.dashboard.clickQuestionnaire()
    await this.page.reload({ waitUntil: 'load' })
    await this.setAllFilterAsAll()
    await this.questionnaire.clickAuthorFilter()
    await this.questionnaire.selectAllAuthorsOption()
    await this.questionnaire.verifyQuestionnaireExist(questionnaire1)
    await this.questionnaire.verifyQuestionnaireExist(questionnaire2)
  }

  async verifyAuthorFilter (author, questionnaire1, questionnaire2) {
    await this.dashboard.clickQuestionnaire()
    await this.page.reload({ waitUntil: 'load' })
    await this.setAllFilterAsAll()
    await this.questionnaire.clickAuthorFilter()
    await this.questionnaire.selectAuthorOption(author)
    await this.questionnaire.verifyQuestionnaireExist(questionnaire1)
    await this.questionnaire.verifyQuestionnaireNotExist(questionnaire2)
  }

  async verifyAllTypeFilter (dynamicQuestionnaire, staticQuestionnaire) {
    await this.dashboard.clickQuestionnaire()
    await this.page.reload({ waitUntil: 'load' })
    await this.setAllFilterAsAll()
    await this.questionnaire.clickTypeFilter()
    await this.questionnaire.selectAllTypeOption()
    await this.questionnaire.verifyQuestionnaireExist(dynamicQuestionnaire)
    await this.questionnaire.verifyQuestionnaireExist(staticQuestionnaire)
  }

  async setCertification (questionnaire) {
    await this.dashboard.clickQuestionnaire()
    await this.setAllFilterAsAll()
    await this.questionnaire.openQuestionnaire(questionnaire)
    await this.questionnaire.clickOptions()
    await this.setCertificationForQuestionnaire(questionnaire)
    await this.questionnaire.clickSaveOptionPage()
  }

  async setCertificationForQuestionnaire (questionnaire) {
    await this.questionnaire.setCertification()
    await this.questionnaire.enterCertificationRate(questionnaire)
  }

  async verifyCertificateGeneratedByAdmin (questionnaire, users) {
    await this.dashboard.clickCertificates()
    await this.questionnaire.verifyCertificateByAdmin(questionnaire, users)
    await this.dashboard.logOut()
  }

  async verifyCertificateGeneratedByUser (questionnaire) {
    await this.dashboard.clickUsersCertificate()
    await expect(this.page.locator("//div[@class='cell title'][contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]")).toBeVisible()
    await this.questionnaire.verifyDownloadCertificateByUser(questionnaire)
    await this.dashboard.userLogOut()
  }

  async setPlayerMessage (base, questionnaire) {
    await this.dashboard.clickQuestionnaire()
    await this.setAllFilterAsAll()
    await this.questionnaire.clickAllbasefilteronQuestionnairelist()
    await this.questionnaire.selectBase(base)
    await this.page.reload({ waitUntil: 'load' })
    await this.questionnaire.openQuestionnaire(questionnaire)
    await this.questionnaire.clickOptions()
    await this.questionnaire.enterPlayerIntroMessage(questionnaire)
    await this.questionnaire.enterPlayerMessage(questionnaire)
    await this.questionnaire.clickSaveOptionPage()
  }

  async setSinglePageQuestionnaire (base, questionnaire) {
    await this.dashboard.clickQuestionnaire()
    await this.setAllFilterAsAll()
    await this.questionnaire.clickAllbasefilteronQuestionnairelist()
    await this.questionnaire.selectBase(base)
    await this.page.reload({ waitUntil: 'load' })
    await this.questionnaire.openQuestionnaire(questionnaire)
    await this.questionnaire.clickOptions()
    await this.questionnaire.selectSinglePage()
    await this.questionnaire.clickSaveOptionPage()
  }

  async verifyQuestionnaireOptionsByPermittedUser (userList, base, questionnaire, editQuestionnaire, questions) {
    this.play = new PlayerAction(this.page)
    this.home = new HomeAction(this.page)
    await this.setVisiblilityToAll(base, questionnaire)
    await this.home.logInUser(userList)
    await this.play.playFreeQuestionnaire(questionnaire, questions)
    await this.dashboard.changeToAdmin()
    await this.editQuestionnaire(base, questionnaire, editQuestionnaire)
    await this.dashboard.logOut()
  }
}
