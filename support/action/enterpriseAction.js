// @ts-check
const { expect } = require('@playwright/test')
const { EnterprisePage } = require('../page/enterprisePage')
const { DashboardPage } = require('../page/dashboardPage')
const { UserDashboardPage } = require('../page/userDashboardPage')
const { HomeAction } = require('./homeAction')

exports.EnterpriseAction = class EnterpriseAction {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    this.enterprisePage = new EnterprisePage(this.page)
    this.dashboard = new DashboardPage(this.page)
  }

  async verifyAdminMailActionArePassed (admin, subject, msg) {
    const to = admin.user_name
    await this.enterprisePage.clickViewPreviewMessage(to, subject)
    await expect(this.page.locator("//td//div[contains(text(),'" + msg + "')]")).toBeTruthy()
    await this.enterprisePage.clickQuitButton()
  }

  async verifyUserMailActionsArePassed (user, sub, msg) {
    const to = user.user_name + user.domain
    await this.enterprisePage.clickViewPreviewMessage(to, sub)
    await expect(this.page.locator("//td//div[contains(text(),'" + msg + "')]")).toBeTruthy()
    await this.enterprisePage.clickQuitButton()
  }

  async verifyManagerMailActionsArePassed (admin, sub, msg) {
    const to = admin.user_name
    await this.enterprisePage.clickViewPreviewMessage(to, sub)
    await expect(this.page.locator("//td//div[contains(text(),'" + msg + "')]")).toBeTruthy()
    await this.enterprisePage.clickQuitButton()
  }

  async createEmailTemplate () {
    this.userdashboardPage = new UserDashboardPage(this.page)
    await this.dashboard.clickEnterprise()
    await this.userdashboardPage.clickCustomization()
    const getEmailValue = await this.enterprisePage.emailTemplate()
    await this.enterprisePage.clickSave()
    return getEmailValue
  }

  async enableAllAdminSideMenusAndVerify () {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickSettingsTab()
    await this.enterprisePage.clickEnterpriseQuestionnairesCheckbox()
    await this.enterprisePage.clickEnterpriseQuestionsCheckbox()
    await this.enterprisePage.clickEnterpriseMediaCheckbox()
    await this.enterprisePage.clickEnterpriseEvaluationsCheckbox()
    await this.enterprisePage.clickEnterpriseUseCyclesCheckbox()
    await this.enterprisePage.clickEnterpriseShowCyclesCheckbox()
    await this.enterprisePage.clickEnterpriseUseSkillsManagement()
    await this.enterprisePage.clickEnterpriseSkillsCheckbox()
    await this.enterprisePage.clickEnterpriseEnableUseQualificationMmanagement()
    await this.enterprisePage.clickEnterpriseEnableUseJobManagement()
    await this.enterprisePage.clickEnterpriseTrainingsCheckbox()
    await this.enterprisePage.clickEnterpriseModulesCheckbox()
    await this.enterprisePage.clickEnterprisePathsCheckbox()
    await this.enterprisePage.clickEnterpriseCertificatesCheckbox()
    await this.enterprisePage.clickEnterpriseChatsCheckbox()
    await this.enterprisePage.clickEnterpriseUseBusinessIntelligenceCheckbox()
    await this.enterprisePage.clickEnterpriseBusinessIntelligenceCheckbox()
    await this.enterprisePage.clickSave()
    await this.verifyAllMenusExist()
  }

  async verifyAllMenusExist () {
    await this.enterprisePage.verifyQuestionnaireMenuExist()
    await this.enterprisePage.verifyQuestionMenuExist()
    await this.enterprisePage.verifyMediaMenuExist()
    await this.enterprisePage.verifyEvaluationMenuExist()
    await this.enterprisePage.verifyCycleMenuExist()
    await this.enterprisePage.verifySkillMenuExist()
    await this.enterprisePage.verifyTrainingMenuExist()
    await this.enterprisePage.verifyModuleMenuExist()
    await this.enterprisePage.verifyPathMenuExist()
    await this.enterprisePage.verifyFormMenuExist()
    await this.enterprisePage.verifyCertificateMenuExist()
    await this.enterprisePage.verifyChatsMenuExist()
  }

  async enableAllFeaturesExceptGDPR (admin, links) {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickSettingsTab()
    await this.enableAdministratorDashboard()
    await this.enableEnterprise(admin, links)
    await this.enableSpecificFunctions()
    await this.enablePlayer()
    await this.enableBases()
    await this.enableMedias()
    await this.enableQuestionnaires()
    await this.enableTrainings()
    await this.enableExports(links)
    await this.enableScorm()
    await this.enableUserData()
    await this.enablePasswords()
    await this.enterprisePage.clickSave()
  }

  async enableAdministratorDashboard () {
    await this.enterprisePage.clickEnterpriseCalendarOnDashboardCheckbox()
    await this.enterprisePage.clickEnterpriseDashboardRankCheckbox()
  }

  async enableEnterprise (admin, links) {
    await this.enterprisePage.clickEnterpriseLogoCheckbox()
    await this.enterprisePage.clickEnterpriseAdvancedPermissionCheckbox()
    await this.enterprisePage.clickEnterpriseHierarchyPermissionCheckbox()
    await this.enterprisePage.clickEnterpriseTagsCheckbox()
    await this.enterprisePage.clickEnterpriseUseContactMessageToAdministrator()
    await this.enterprisePage.enterContactMail(admin)
    await this.enterprisePage.enterRedirectURLForUnsignedUser(links)
    await this.enterprisePage.clickSortByFeature()
  }

  async enableSpecificFunctions () {
    await this.enterprisePage.clickEnterpriseUseMailing()
    await this.enterprisePage.clickEnterpriseEnableCertificateGenerator()
    await this.enterprisePage.clickEnterpriseGlossaryCheckbox()
    await this.enterprisePage.clickTopicTransfer()
    await this.enterprisePage.clickTextToSpeech()
  }

  async enablePlayer () {
    await this.enterprisePage.clickEnterpriseShowPlayerCheckbox()
    await this.enterprisePage.clickEnterpriseShowColorCheckbox()
    await this.enterprisePage.clickEnterpriseShowPlayerMessageCheckbox()
  }

  async enableBases () {
    await this.enterprisePage.clickEnterpriseShowBaseColorCheckbox()
    await this.enterprisePage.clickEnterpriseShowBaseArchiveCheckbox()
    await this.enterprisePage.clickEnterpriseShowQuestionQualityPanelCheckbox()
  }

  async enableMedias () {
    await this.enterprisePage.clickEnterpriseMediasSubfoldersCheckbox()
    await this.enterprisePage.clickUploadLargerSizeMedia()
    await this.enterprisePage.clickUsePDFRreader()
  }

  async enableQuestionnaires () {
    await this.enterprisePage.enableEnterpriseQuestionsByDomainCheckbox()
    await this.enterprisePage.clickEnterpriseQuestionsConsequencesCheckbox()
    await this.enterprisePage.clickEnterpriseRenewalCheckbox()
    await this.enterprisePage.clickEnterpriseSaveQuestionnaireEmail()
    await this.enterprisePage.clickEnterpriseEnableCopyDocxQuestionnaire()
    await this.enterprisePage.clickEnterpriseQuestionnaieCorrectionCheckbox()
    await this.enterprisePage.clickEnterpriseEvaluationCorrectionCheckbox()
    await this.enterprisePage.clickEnterpriseRankCheckbox()
    await this.enterprisePage.clickEnterpriseGrade20Checkbox()
    await this.enterprisePage.clickEnterpriseEnableFilterBySenderInEvaluationList()
    await this.enterprisePage.clickEnterpriseEnableDefineGroupPermissionOnQuestionnaire()
  }

  async enableTrainings () {
    await this.enterprisePage.clickEnterpriseTrainingBlackboardCheckbox()
    await this.enterprisePage.clickEnterpriseTrainingCyclescheckbox()
    await this.enterprisePage.clickEnterpriseTrainingAttendanceCheckbox()
    await this.enterprisePage.clickEnterpriseTrainingTallySheet()
  }

  async enableExports (message) {
    await this.enterprisePage.clickEnterpriseUsersExportsCheckbox()
    await this.enterprisePage.clickEnterpriseExportsFlatCheckbox()
    await this.enterprisePage.clickEnterpriseExportsCheckbox()
    await this.enterprisePage.clickEnterpriseExportsJsoncheckbox()
    await this.enterprisePage.clickEnterpriseExportsDocxCheckbox()
    await this.enterprisePage.enterExcelFooterMessage(message)
  }

  async enableScorm () {
    await this.enterprisePage.clickEnterpriseQuestionnaireExportScorm()
    await this.enterprisePage.clickImportExternalModuleScorm()
  }

  async enableUserData () {
    await this.enterprisePage.clickModifyOwnProfileData()
    await this.enterprisePage.clickEnterpriseDirectionCheckbox()
    await this.enterprisePage.clickEnterprisePoleCheckbox()
    await this.enterprisePage.clickEnterpriseTeamCheckbox()
    await this.enterprisePage.clickEnterpriseDobCheckbox()
    await this.enterprisePage.clickEnterpriseHiringCheckbox()
    await this.enterprisePage.clickEnterpriseFixedCheckbox()
  }

  async enablePasswords () {
    await this.enterprisePage.clickSignInCodes()
  }

  async enableallFeaturesExceptGdpr (admin, links) {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickSettingsHead()
    await this.enterprisePage.clickOptions()
    await this.enableAdministratorDashboard()
    await this.enableEnterprise(admin, links)
    await this.enableSpecificFunctions()
    await this.enablePlayer()
    await this.enableBases()
    await this.enableMedias()
    await this.enableQuestionnaires()
    await this.enableTrainings()
    await this.enableExports(links)
    await this.enableScorm()
    await this.enableUserData()
    await this.enablePasswords()
    await this.enterprisePage.clickSave()
  }

  async enableUserdataUsersMenu () {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickCustomizationTab()
    await this.enterprisePage.clickUserMenu()
    await this.enterprisePage.enableUserMenus()
    await this.enterprisePage.verifySleekMenu()
    await this.enterprisePage.clickSave()
    await this.dashboard.changeToUser()
    await this.dashboard.changeToAdmin()
  }

  async disableUserData () {
    await this.enterprisePage.disableModifyOwnProfileData()
    await this.enterprisePage.disableEnterpriseDirectionCheckbox()
    await this.enterprisePage.disableEnterprisePoleCheckbox()
    await this.enterprisePage.disableEnterpriseDepartmentCheckbox()
    await this.enterprisePage.disableEnterpriseTeamCheckbox()
    await this.enterprisePage.disableEnterpriseEmployeeIdCheckbox()
    await this.enterprisePage.disableEnterpriseJobTitleCheckbox()
    await this.enterprisePage.disableEnterpriseDobCheckbox()
    await this.enterprisePage.disableEnterpriseHiringCheckbox()
    await this.enterprisePage.disableEnterpriseFixedCheckbox()
    await this.enterprisePage.disableEnterpriseCheckbox()
  }

  async disableAllAdministratorMenuAndVerify () {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickSettingsHead()
    await this.enterprisePage.clickOptions()
    await this.enterprisePage.disableQuestionnaireMenuOnEnterpriseOption()
    await this.enterprisePage.disableQuestionMenuOnEnterpriseOption()
    await this.enterprisePage.disableMediaMenuOnEnterpriseOption()
    await this.enterprisePage.disableResultMenuOnEnterpriseOption()
    await this.enterprisePage.disableCycleMenuOnEnterpriseOption()
    await this.enterprisePage.disableSkillMenuOnEnterpriseOption()
    await this.enterprisePage.disableTrainingMenuOnEnterpriseOption()
    await this.enterprisePage.disableModuleMenuOnEnterpriseOption()
    await this.enterprisePage.disablePathMenuOnEnterpriseOption()
    await this.enterprisePage.disableSurveyMenuOnEnterpriseOption()
    await this.enterprisePage.disableCertificateMenuOnEnterpriseOption()
    await this.enterprisePage.disableChatMenuOnEnterpriseOption()
    await this.enterprisePage.disableBusinessIntelligenceMenuOnEnterpriseOption()
    await this.enterprisePage.clickSave()
  }

  async enableAllEmployeeUserMenusVerify (users) {
    await this.enableAllEmployeeUserMenus()
    await this.dashboard.logOut()
    await this.enterprisePage.verifyAllUserMenus(users)
  }

  async enableAllEmployeeUserMenus () {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickUserOptions()
    await this.enterprisePage.enableAllOptionsForEmployee()
    await this.enterprisePage.clickSave()
  }

  async disableAllEmployeeMenusAndVerify (admin, users) {
    this.homeAction = new HomeAction(this.page)
    await this.homeAction.logInUserRand(admin)
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickUserOptions()
    await this.enterprisePage.disableAllOptionsForEmployee()
    await this.enterprisePage.clickSave()
    await this.dashboard.logOut()
    await this.enterprisePage.verifyAllMenusDisabled(users)
  }

  async enableAllClientUserMenusVerify (users) {
    await this.enableAllClientUserMenus()
    await this.dashboard.logOut()
    await this.enterprisePage.verifyAllUserMenus(users)
  }

  async disableAllClientMenusAndVerify (admin, users) {
    this.homeAction = new HomeAction(this.page)
    await this.homeAction.logInUserRand(admin)
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickUserOptions()
    await this.enterprisePage.disableAllOptionsForClient()
    await this.enterprisePage.clickSave()
    await this.dashboard.logOut()
    await this.enterprisePage.verifyAllMenusDisabled(users)
  }

  async enableAllTraineeUserMenusVerify (users) {
    await this.enableAllTraineeUserMenus()
    await this.dashboard.logOut()
    await this.enterprisePage.verifyAllUserMenus(users)
  }

  async disableAllTraineeMenusAndVerify (admin, users) {
    this.homeAction = new HomeAction(this.page)
    await this.homeAction.logInUserRand(admin)
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickUserOptions()
    await this.enterprisePage.disableAllOptionsForTrainee()
    await this.enterprisePage.clickSave()
    await this.dashboard.logOut()
    await this.enterprisePage.verifyAllMenusDisabled(users)
  }

  async enableAllContractorUserMenusVerify (users) {
    await this.enableAllContractorUserMenus()
    await this.dashboard.logOut()
    await this.enterprisePage.verifyAllUserMenus(users)
  }

  async disableAllContractorMenusAndVerify (admin, users) {
    this.homeAction = new HomeAction(this.page)
    await this.homeAction.logInUserRand(admin)
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickUserOptions()
    await this.enterprisePage.disableAllOptionsForContractor()
    await this.enterprisePage.clickSave()
    await this.dashboard.logOut()
    await this.enterprisePage.verifyAllMenusDisabled(users)
  }

  async enableAllOtherUserMenusVerify (users) {
    await this.enableAllOtherUserMenus()
    await this.dashboard.logOut()
    await this.enterprisePage.verifyAllUserMenus(users)
  }

  async disableAllOtherMenusAndVerify (admin, users) {
    this.homeAction = new HomeAction(this.page)
    await this.homeAction.logInUserRand(admin)
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickUserOptions()
    await this.enterprisePage.disableAllOptionsForOther()
    await this.enterprisePage.clickSave()
    await this.dashboard.logOut()
    await this.enterprisePage.verifyAllMenusDisabled(users)
  }

  async enableAllClientUserMenus () {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickUserOptions()
    await this.enterprisePage.enableAllOptionsForClient()
    await this.enterprisePage.clickSave()
  }

  async enableAllTraineeUserMenus () {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickUserOptions()
    await this.enterprisePage.enableAllOptionsForTrainee()
    await this.enterprisePage.clickSave()
  }

  async enableAllContractorUserMenus () {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickUserOptions()
    await this.enterprisePage.enableAllOptionsForContractor()
    await this.enterprisePage.clickSave()
  }

  async enableAllOtherUserMenus () {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickUserOptions()
    await this.enterprisePage.enableAllOptionsForOther()
    await this.enterprisePage.clickSave()
  }

  async editEnterpriseProfile (admin, enterpriseData) {
    this.homeAction = new HomeAction(this.page)
    await this.homeAction.logInUserRand(admin)
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickEditEnterprise()
    await this.enterprisePage.enterEnterpriseName(enterpriseData)
    await this.enterprisePage.enterWebsite(enterpriseData)
    await this.enterprisePage.enterSector(enterpriseData)
    await this.enterprisePage.selectSize(enterpriseData)
    await this.enterprisePage.clickSaveForEnterpriseSettings()
  }

  async verifyEnterpriseDataOnAdminPage (enterpriseData) {
    await this.page.reload({ waitUntil: 'load' })
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.verifyEnterpriseNameInOverview(enterpriseData)
    await this.enterprisePage.verifySectorInOverview(enterpriseData)
    await this.enterprisePage.verifySizeInOverview(enterpriseData)
    await this.enterprisePage.verifyEnterpriseNameInHeader(enterpriseData)
    await this.dashboard.logOut()
  }

  async verifyEnterpriseDataOnUserPage (data) {
    await this.enterprisePage.verifyEnterpriseNameByUser(data)
    await this.dashboard.userLogOut()
  }

  async enableUserDataUsersMenuEnterprise () {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickCustomizationTab()
    await this.enterprisePage.clickUserMenu()
    await this.enterprisePage.enableUserMenus()
    await this.enterprisePage.verifySleekMenu()
    await this.enterprisePage.clickSave()
    await this.dashboard.changeToUser()
    await this.dashboard.changeToAdmin()
  }

  async enableUserDataUsersMenuEmployee () {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickUserMenu()
    await this.enterprisePage.checkEmployee()
    await this.enterprisePage.verifySleekMenuEmployee()
    await this.enterprisePage.clickSave()
    await this.dashboard.changeToUser()
    await this.dashboard.changeToAdmin()
  }

  async disableUserDataUserMenu () {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickUserMenu()
    await this.enterprisePage.disableUserMenu()
    await this.enterprisePage.clickSave()
  }

  async disableUserDataOptions () {
    await this.dashboard.clickEnterprise()
    await this.enterprisePage.clickOptions()
    await this.disableUserData()
    await this.enterprisePage.clickSave()
  }
}
