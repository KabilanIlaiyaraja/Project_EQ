// @ts-nocheck

const { expect } = require('@playwright/test')
const { DashboardPage } = require('../page/dashboardPage')
const { EvaluationPage } = require('../page/evaluationPage')
const { BasePage } = require('../page/basePage')
const { CyclePage } = require('../page/cyclePage')
const { QuestionnairePage } = require('../page/questionnairePage')
const { PathPage } = require('../page/pathPage')
const { HomeAction } = require('./homeAction')
const { ModulePage } = require('../page/modulePage')
const { TrainingPage } = require('../page/trainingPage')
const { UserPage } = require('../page/userPage')
const { PlayerPage } = require('../page/playerPage')
const { SkillsQualificationsAction } = require('./skillsQualificationAction')
const { EnterpriseAction } = require('../action/enterpriseAction')

exports.EvaluationAction = class EvaluationAction {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
    this.evaluation = new EvaluationPage(this.page)
    this.bases = new BasePage(this.page)
    this.cyclePage = new CyclePage(this.page)
    this.questionnaire = new QuestionnairePage(this.page)
    this.home = new HomeAction(this.page)
    this.modulePage = new ModulePage(this.page)
    this.trainingPage = new TrainingPage(this.page)
    this.enterprise = new EnterpriseAction(this.page)
  }

  async verifyBattleEvaluationByAdmin (questionnaireName) {
    await this.dashboard.changeToUser()
    await this.dashboard.clickBattle()
    await this.dashboard.battleEvaluation(questionnaireName)
    await this.dashboard.userLogOut()
  }

  async verifyBattleEvaluationByUser (questionnaireName) {
    await this.dashboard.clickBattle()
    await this.evaluation.battleEvaluation(questionnaireName)
    await this.dashboard.userLogOut()
  }

  async questionnaireEvaluationOnDuplicateBase (baseName) {
    await this.dashboard.clickBases()
    await this.bases.openDuplicateBase(baseName)
    await this.bases.clickEvaluationTab()
    await this.evaluation.verifyPassedEvaluation()
  }

  async verifyClosedCycleEvaluation (users, cycle) {
    await this.dashboard.clickCycles()
    await this.cyclePage.openCycle(cycle)
    await this.cyclePage.clickUsers()
    await this.evaluation.verifyCycleEvaluationsClosed(users)
  }

  async verifyCycleEvaluation (users, cycle) {
    await this.dashboard.clickCycles()
    await this.cyclePage.openCycle(cycle)
    await this.cyclePage.clickUsers()
    await this.evaluation.verifyCycleEvaluations(users, cycle)
  }

  async questionnaireEvaluationWithForm (baseName, questionnaire, users, formData) {
    await this.dashboard.clickBases()
    await this.bases.openBase(baseName)
    await this.bases.clickEvaluationTab()
    await this.evaluation.verifyPassedEvaluation()
    await this.questionnaire.clickDetails(questionnaire)
    await this.questionnaire.clickSurveyData()
    await this.evaluation.verifySurveyData(users, formData)
    await this.questionnaire.clickDetails(questionnaire)
  }

  async pathEvaluation (email, pathData, moduleData) {
    this.pathPage = new PathPage(this.page)
    await this.dashboard.clickPath()
    await this.pathPage.openPath(pathData)
    await this.pathPage.clickResults()
    await this.pathPage.clickDetails()
    const steps = (moduleData).length
    await expect(this.page.locator("//div[normalize-space(text())='" + email.last_name.toUpperCase() + ' ' + email.first_name[0].toUpperCase() + email.first_name.slice(1) + "']/following-sibling::div//strong[normalize-space(text())='" + steps + '/' + steps + "']")).toBeVisible()
  }

  async closedPathEvaluation (email, pathData, moduleData) {
    this.pathPage = new PathPage(this.page)
    await this.dashboard.clickPath()
    await this.pathPage.openPath(pathData)
    await this.pathPage.clickResults()
    await this.pathPage.clickDetails()
    const total = (moduleData).length
    await expect(this.page.locator("//div[normalize-space(text())='" + email.last_name.toUpperCase() + ' ' + email.first_name[0].toUpperCase() + email.first_name.slice(1) + "']/following-sibling::div//strong[normalize-space(text())='0/" + total + "']")).toBeVisible()
  }

  async editedPathEvaluation (email, pathData, moduleData) {
    this.pathPage = new PathPage(this.page)
    await this.dashboard.clickPath()
    await this.pathPage.openEditedPath(pathData)
    await this.pathPage.clickResults()
    await this.pathPage.clickDetails()
    const steps = (moduleData).length
    await expect(this.page.locator("//div[normalize-space(text())='" + email.last_name.toUpperCase() + ' ' + email.first_name[0].toUpperCase() + email.first_name.slice(1) + "']/following-sibling::div//strong[normalize-space(text())='" + steps + '/' + steps + "']")).toBeVisible()
  }

  async verifyModuleResult (login, moduleList, user) {
    await this.home.logIn(login)
    await this.moduleEvaluationForActiveUser(moduleList, user)
  }

  async moduleEvaluationForActiveUser (moduleData, email) {
    for (const modules of moduleData) {
      await this.moduleResult(modules)
      await this.modulePage.clickDetailButton()
      const steps = (modules.elements).length
      await expect(this.page.locator("//div[contains(text(),'" + email.last_name.toUpperCase() + ' ' + email.first_name + "')]/following-sibling::div[@class='cell nb-played ']//strong[text()='" + steps + '/' + steps + "']")).toBeVisible()
    }
  }

  async verifyConsequenceModuleResult (modules, email) {
    await this.moduleResult(modules)
    await this.modulePage.clickDetailButton()
    const steps = (modules.elements).length
    await expect(this.page.locator("//div[contains(text(),'" + email.last_name.toUpperCase() + ' ' + email.first_name + "')]/following-sibling::div[@class='cell nb-played ']//strong[text()='" + steps + '/' + steps + "']")).toBeVisible()
  }

  async moduleEvaluationForContactUser (moduleData, email) {
    for (const modules of moduleData) {
      await this.moduleResult(modules)
      await this.modulePage.clickDetailButton()
      const steps = (modules.elements).length
      await expect(this.page.locator("//div[contains(text(),'" + email.user_name.toUpperCase() + "')]/following-sibling::div[@class='cell nb-played ']//strong[text()='" + steps + '/' + steps + "']")).toBeVisible()
    }
  }

  async freeToPlayModuleResult (moduleData, email) {
    for (const modules of moduleData) {
      await this.moduleResult(modules)
      await this.modulePage.clickUsersTab()
      await this.page.waitForEvent('load')
      await this.modulePage.clickAllContextFilter()
      await this.modulePage.selectFreeModule()
      const steps = (modules.elements).length
      await expect(this.page.locator(" //div[@class='flex-row mul-table-row']//div[normalize-space()='" + email.last_name.toUpperCase() + ' ' + email.first_name + "']//following-sibling::div//strong[text()='" + steps + '/' + steps + "']")).toBeVisible()
    }
  }

  async nonePlayedModuleResult (moduleData, email) {
    this.modulePage = new ModulePage(this.page)
    this.dashboard = new DashboardPage(this.page)
    for (const modules of moduleData) {
      await this.moduleResult(modules)
      await this.modulePage.clickDetailButton()
      const steps = (modules.elements).length
      await expect(this.page.locator("//div[@class='flex-row sort-mul-div']/div[contains(text(),'" + email.last_name.toUpperCase() + ' ' + email.first_name + "')]/following-sibling::div/div//strong[text()='0/" + steps + "']")).toBeVisible()
    }
  }

  async verifyModuleInviteSent (moduleData, email) {
    for (const modules of moduleData) {
      await this.moduleResult(modules)
      await this.modulePage.clickDetailButton()
      const steps = (modules.elements).length
      await expect(this.page.locator("//div[contains(@class,'flex-row sort-mul-div')]/div[contains(text(),'" + email.last_name.toUpperCase() + ' ' + email.first_name + "')]/following-sibling::div/div//strong[contains(text(),'0/" + steps + "')]")).toBeVisible()
    }
  }

  async verifyResultforfreeToPlayModuleResult (login, moduleData, user) {
    await this.home.logIn(login)
    await this.freeToPlayModuleResult(moduleData, user)
  }

  async verifyNonePlayedModuleResult (login, moduleData, user) {
    await this.home.logIn(login)
    await this.nonePlayedModuleResult(moduleData, user)
  }

  async verifyContactUserModuleResult (login, moduleData, user) {
    await this.home.logIn(login)
    await this.moduleEvaluationForContactUser(moduleData, user)
  }

  async moduleResult (modules) {
    await this.dashboard.clickModules()
    await this.modulePage.openModule(modules)
    await this.modulePage.clickResults()
  }

  async verifyGroupActionArePassed (login, message, userName) {
    await this.home.logIn(login)
    this.userPage = new UserPage(this.page)
    const getInGroupName = message.action_for_in_group
    const inGroup1 = getInGroupName.split('("')[1]
    const inGroup2 = inGroup1.split('")')[0]
    await this.dashboard.clickUsers()
    await this.userPage.clickGroupsFilter()
    await this.userPage.selectInGroupName(inGroup2)
    await this.userPage.verifyUserAreInGroupAction(userName)
    await this.page.reload({ waitUntil: 'load' })
    // const getOutGroupName = message.action_for_out_group
    // const outGroup1 = getOutGroupName.split('("')[1]
    // const outGroup2 = outGroup1.split('")')[0]
    // await this.userPage.clickGroupsFilter()
    // await this.userPage.selectOutGroupName(out_group2)
    // await this.userPage.verifyUserAreOutGroupAction(userName)
    await this.userPage.clickGroupsFilter()
    await this.userPage.selectAllUsersOption()
    await this.dashboard.logOut()
  }

  async verifyQuestionnaireActionArePassed (message, user) {
    await this.home.logInUser(user)
    this.playerPage = new PlayerPage(this.page)
    const getQuestionnaireName = message.action_for_questionnaire
    const quesName1 = getQuestionnaireName.split('("')[1]
    const quesName2 = quesName1.split('")')[0]
    await this.dashboard.clickDashboard()
    await this.playerPage.verifyQuestionnaireActionArePassed(quesName2)
    await this.dashboard.userLogOut()
  }

  async verifyModuleActionArePassed (message, user) {
    await this.home.logInUser(user)
    this.playerPage = new PlayerPage(this.page)
    const getModuleName = message.action_for_module
    const moduleName1 = getModuleName.split('("')[1]
    const moduleName2 = moduleName1.split('")')[0]
    await this.dashboard.clickDashboard()
    await this.playerPage.verifyModuleActionArePassed(moduleName2)
    await this.dashboard.userLogOut()
  }

  async verifyCapacityActionArePassed (block, user, message) {
    this.skillsAction = new SkillsQualificationsAction(this.page)
    const getCapacityName = message.action_for_capacity
    const capName1 = getCapacityName.split('("')[1]
    const capName2 = capName1.split('", 100')[0]
    const getValidationRate = message.action_for_capacity
    const rate1 = getValidationRate.split('"14", ')[1]
    const rate2 = rate1.split(')')[0]
    await this.skillsAction.verifyAutoCapacityActionArePassed(block, user, capName2, rate2)
  }

  async verifyAdminMailActionArePassed (admin, message) {
    const getAdminSubject = message.action_for_admin_mail
    const sub1 = getAdminSubject.split('administrator", "')[1]
    const sub2 = sub1.split('", "message"')[0]
    const mes1 = getAdminSubject.split('admin_subject", "')[1]
    const mes2 = mes1.split('")')[0]
    await this.enterprise.verifyAdminMailActionArePassed(admin, sub2, mes2)
  }

  async verifyUserMailActionArePassed (user, message) {
    const getUserSubject = message.action_for_user_mail
    const sub1 = getUserSubject.split('user", "')[1]
    const sub2 = sub1.split('", "message"')[0]
    const mes1 = getUserSubject.split('user_subject", "')[1]
    const mes2 = mes1.split('")')[0]
    await this.enterprise.verifyUserMailActionsArePassed(user, sub2, mes2)
  }

  async verifyManagerMailActionArePassed (admin, message) {
    const getManagerSubject = message.action_for_manager_mail
    const sub1 = getManagerSubject.split('manager", "')[1]
    const sub2 = sub1.split('", "message"')[0]
    const mes1 = getManagerSubject.split('manager_subject", "')[1]
    const mes2 = mes1.split('")')[0]
    await this.enterprise.verifyManagerMailActionsArePassed(admin, sub2, mes2)
  }

  async questionnaireResult (base, baseStatus, questionnaire) {
    await this.dashboard.clickBases()
    switch (baseStatus) {
      case ('active'):
        await this.bases.openBase(base)
        break
      case ('archived'):
        await this.bases.clickStatusFilter()
        await this.bases.selectArchivedStatus()
        await this.bases.openArchivebase(base)
        break
      default:
        console.log(baseStatus + 'Base status not defined')
        break
    }
    await this.bases.clickQuestionnaireTab()
    await this.questionnaire.openQuestionnaire(questionnaire)
    await this.questionnaire.clickResults()
  }

  async verifyPublicQuestionnaireEvaluation (base, baseStatus, questionnaire) {
    await this.questionnaireResult(base, baseStatus, questionnaire)
    await this.questionnaire.clickPublicResults()
    await this.evaluation.verifyPublicQuestionnaireEvaluation(questionnaire)
  }

  async VerifyQuestionnaireEvaluationAfterEnd (base, baseStatus, questionnaire) {
    await this.questionnaireResult(base, baseStatus, questionnaire)
    await this.page.reload({ waitUntil: 'load' })
    await this.questionnaireResult(base, baseStatus, questionnaire)
    await this.evaluation.verifyQuestionnaireEvaluationAfterEnd(questionnaire)
  }

  async verifyQuestionnaireEvaluationBeforeStart (base, baseStatus, questionnaire) {
    await this.questionnaireResult(base, baseStatus, questionnaire)
    await this.evaluation.verifyQuestionnaireEvaluationBeforeStart(questionnaire)
  }

  async verifyQuestionnaireEvaluation (base, baseStatus, questionnaire) {
    await this.questionnaireResult(base, baseStatus, questionnaire)
    await this.evaluation.verifyQuestionnaireEvaluation(questionnaire)
  }

  async generateCertificate (base, questionnaire) {
    await this.dashboard.clickBases()
    await this.bases.openBase(base)
    await this.bases.clickEvaluationTab()
    await this.evaluation.checkEvaluation(questionnaire)
    await this.evaluation.clickCertificateButton()
  }

  async verifyTrainingResults (loginData, base, training, questionnaire) {
    await this.home.logIn(loginData)
    await this.dashboard.clickTraining()
    await this.trainingPage.openTraining(base, training)
    await this.trainingPage.clickQuestionnaires()
    await this.trainingPage.clickResultsByTrainer()
    await this.evaluation.verifyTrainingEvaluation(questionnaire)
    await this.trainingPage.clickSeeAsAdmin()
  }

  async verifyDuplicateTrainingResult (loginData, base, training, questionnaire) {
    await this.home.logIn(loginData)
    await this.dashboard.clickTraining()
    await this.trainingPage.openDuplicateTraining(base, training)
    await this.trainingPage.clickQuestionnaires()
    await this.trainingPage.clickResultsByTrainer()
    await this.evaluation.verifyTrainingEvaluation(questionnaire)
    await this.trainingPage.clickSeeAsAdmin()
  }
}
