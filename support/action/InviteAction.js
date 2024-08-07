// @ts-check

const { PlayerPage } = require('../page/playerPage')
const { HomeAction } = require('../action/homeAction')
const { DashboardPage } = require('../page/dashboardPage')
const { EnterprisePage } = require('../page/enterprisePage')
const { QuestionnairePage } = require('../page/questionnairePage')
const { InvitePage } = require('../page/invitePage')
const { BasePage } = require('../page/basePage')
const { CyclePage } = require('../page/cyclePage')
const { PlayerAction } = require('../action/playerAction')
exports.InviteAction = class InviteAction {
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
    this.invitePage = new InvitePage(this.page)
    this.basePage = new BasePage(this.page)
    this.cyclePage = new CyclePage(this.page)
    this.playerAction = new PlayerAction(this.page)
  }

  async userInviteAndRegister (commonData, userList) {
    await this.playerPage.emailandsmslog(commonData, userList)
    await this.home.loginByInvitedUsers(userList)
  }

  async navigateToEmailandsmslog () {
    await this.dashboardPage.clickEnterprise()
    await this.enterprisePage.clickAdministrationTab()
    await this.enterprisePage.clickEmailAndSmsLogTab()
  }

  async inviteQuestionnaireToActiveUser (base, baseStatus, inviteData, link, questionnaireName) {
    await this.selectBaseForEvaluation(base, baseStatus)
    await this.questionnairePage.openQuestionnaire(questionnaireName)
    await this.questionnairePage.clickInvitePage()
    await this.invitePage.setStartDate()
    await this.invitePage.setCloseDate()
    await this.inviteQuestionnaireBySelectUser(inviteData, link)
  }

  async inviteQuestionnaireToActiveUserWithConsequence (base, baseStatus, inviteData, link, questionnaires) {
    await this.selectBaseForEvaluation(base, baseStatus)
    await this.questionnairePage.openQuestionnaire(questionnaires)
    await this.questionnairePage.clickInvitePage()
    await this.invitePage.setStartDate()
    await this.invitePage.setCloseDate()
    await this.inviteQuestionnaireBySelectUser(inviteData, link)
    await this.dashboardPage.logOut()
  }

  async inviteQuestionnaireForEndDate (base, baseStatus, inviteData, link, questionnaireName) {
    await this.selectBaseForEvaluation(base, baseStatus)
    await this.questionnairePage.openQuestionnaire(questionnaireName)
    await this.questionnairePage.clickInvitePage()
    await this.invitePage.setStartDate()
    await this.invitePage.setCloseDateAsNow()
    await this.inviteQuestionnaireBySelectUser(inviteData, link)
    await this.page.waitForTimeout(180000)
    await this.dashboardPage.logOut()
  }

  async inviteQuestionnaireBeforeStart (base, baseStatus, inviteData, link, questionnaireName) {
    await this.selectBaseForEvaluation(base, baseStatus)
    await this.questionnairePage.openQuestionnaire(questionnaireName)
    await this.questionnairePage.clickInvitePage()
    await this.invitePage.setStartDateADayLater()
    await this.invitePage.setCloseDateTwoDaysLater()
    await this.inviteQuestionnaireBySelectUser(inviteData, link)
    await this.dashboardPage.logOut()
  }

  async inviteUsersForEvaluations (base, baseStatus, inviteData, link, questionnaireName) {
    await this.selectBaseForEvaluation(base, baseStatus)
    await this.questionnairePage.openQuestionnaire(questionnaireName)
    await this.questionnairePage.clickInvitePage()
    await this.invitePage.setStartDate()
    await this.invitePage.setCloseDate()
    await this.inviteQuestionnaireWithEmail(inviteData, link)
  }

  async selectBaseForEvaluation (base, baseStatus) {
    switch (baseStatus) {
      case ('active'):
        await this.dashboardPage.clickQuestionnaire()
        await this.questionnairePage.clickAllbasefilteronQuestionnairelist()
        await this.questionnairePage.selectBase(base)
        break
      case ('archived'):
        await this.dashboardPage.clickBases()
        await this.basePage.clickStatusFilter()
        await this.basePage.selectArchivedStatus()
        await this.basePage.openArchivebase(base)
        await this.basePage.clickQuestionnaireTab()
        break
      default:
        console.log('No base selected for evaluation')
        break
    }
  }

  async inviteQuestionnaireWithEmail (inviteData, link) {
    await this.invitePage.enterSubjectQuestionnaireInvite(link.mail_subjects.mail_subject)
    await this.invitePage.enterMessageQuestionnaireInvite(link.mail_subjects.mail_message)
    await this.invitePage.clickEmailAndMobilesButton()
    await this.invitePage.emailAreaInvite(inviteData)
    await this.invitePage.clickValidate()
    await this.invitePage.clickInviteButton()
  }

  async inviteQuestionnaireBySelectUser (inviteData, link) {
    await this.invitePage.enterSubjectQuestionnaireInvite(link.mail_subjects.mail_subject)
    await this.invitePage.enterMessageQuestionnaireInvite(link.mail_subjects.mail_message)
    await this.invitePage.clickSelectUser()
    await this.invitePage.selectUsers(inviteData)
    await this.invitePage.clickValidate()
    await this.invitePage.clickInviteButton()
  }

  async inviteQuestionnaireWithFormAndPlay (inviteData, link, questionSet, formData) {
    await this.questionnairePage.clickInvitePage()
    await this.invitePage.setStartDate()
    await this.invitePage.setCloseDate()
    await this.inviteQuestionnaireWithEmail(inviteData, link)
    await this.navigateToEmailAndSmsLog()
    await this.playerAction.invitePlayWithForm(inviteData, link, questionSet, formData)
  }

  async duplicateBaseQuestionnaireInvitePlay (userList, commonData, base, questionnaire, questionList) {
    await this.inviteUsersForEvaluationFromDuplicateBase(userList, commonData, base, questionnaire)
    await this.playerAction.EmailGetFromEmailandsmslog(userList, commonData, questionList)
    await this.playerPage.contactUserBackToHome()
  }

  async inviteUsersForEvaluationFromDuplicateBase (inviteData, link, baseName, questionnaire) {
    await this.dashboardPage.clickBases()
    await this.basePage.openDuplicateBase(baseName)
    await this.basePage.clickQuestionnaireTab()
    await this.questionnairePage.openQuestionnaire(questionnaire)
    await this.questionnairePage.clickInvitePage()
    await this.invitePage.setStartDate()
    await this.invitePage.setCloseDate()
    await this.inviteQuestionnaireWithEmail(inviteData, link)
    await this.navigateToEmailAndSmsLog()
  }

  async navigateToEmailAndSmsLog () {
    await this.dashboardPage.clickEnterprise()
    await this.enterprisePage.clickAdministrationTab()
    await this.enterprisePage.clickEmailAndSmsLogTab()
  }

  async inviteCycleToTheActiveUser (cycle, inviteData, link) {
    await this.inviteUsersForCycleEvaluation(cycle, inviteData, link)
    await this.dashboardPage.logOut()
  }

  async inviteUsersForCycleEvaluation (cycle, inviteData, link) {
    await this.dashboardPage.clickCycles()
    await this.cyclePage.openCycle(cycle)
    await this.cyclePage.clickInvitation()
    // await this.cyclePage.disableCycleMessage()
    await this.invitePage.enterCycleSubject(link.mail_subjects.mail_subject)
    await this.invitePage.enterCycleMessage(link.mail_subjects.mail_message)
    await this.invitePage.clickSelectUser()
    await this.invitePage.selectUsers(inviteData)
    await this.invitePage.clickValidate()
    await this.invitePage.clickInviteButton()
  }

  async inviteCycleToTheActiveUserAndClosed (cycle, inviteData, link) {
    await this.inviteUsersForCycleEvaluation(cycle, inviteData, link)
    await this.cyclePage.selectUserCheckbox()
    await this.cyclePage.clickCloseCycleInvitation()
    await this.cyclePage.clickConfirmClosecycle()
    await this.dashboardPage.logOut()
  }

  async playQuestionnaireAndForm (questionnaire, question, formData) {
    await this.playerAction.playQuestionnaireWithFormByUser(questionnaire, question, formData)
    await this.playerAction.playFormByUser(formData)
  }

  async inviteQuestionnaireAndPlay (base, baseStatus, userList, commonData, questionnaire, question) {
    await this.inviteQuestionnaireToActiveUser(base, baseStatus, userList, commonData, questionnaire)
    await this.navigateToEmailAndSmsLog()
    await this.playerAction.playQuestionnaireFromMail(userList, commonData, question)
  }

  async verifyEmailTemplate (questionnaireName, getEmailTemplateValue) {
    await this.dashboardPage.clickQuestionnaire()
    await this.questionnairePage.openQuestionnaire(questionnaireName)
    await this.questionnairePage.clickInvitePage()
    await this.invitePage.checkInvitePage(getEmailTemplateValue)
  }

  async inviteQuestionnaireAndPlayWithMessage (base, baseStatus, userList, commonData, questionnaire, question) {
    await this.inviteUsersForEvaluations(base, baseStatus, userList, commonData, questionnaire)
    await this.navigateToEmailAndSmsLog()
    await this.playerAction.playQuestionnaireFromMailWithMessage(userList, commonData, questionnaire, question)
  }
}
