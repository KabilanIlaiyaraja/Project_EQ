// @ts-check
const { DashboardPage } = require('../page/dashboardPage')
const { UserPage } = require('../page/userPage.js')
const { EnterprisePage } = require('../page/enterprisePage')
const { PlayerPage } = require('../page/playerPage.js')
const { PlayerAction } = require('../action/playerAction.js')
const { HomeAction } = require('../action/homeAction.js')
const { ProfileAction } = require('../action/profileAction.js')
const { expect } = require('@playwright/test')
const { ProfilePage } = require('../page/profilePage.js')

exports.UserAction = class UserAction {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor (page) {
    this.page = page
    this.dashboardPage = new DashboardPage(this.page)
    this.userPage = new UserPage(this.page)
    this.enterprisePage = new EnterprisePage(this.page)
    this.playerPage = new PlayerPage(this.page)
    this.home = new HomeAction(this.page)
  }

  async inviteUsersAndActivate (userList) {
    await this.inviteUsers(userList)
    await this.dashboardPage.clickEnterprise()
    await this.enterprisePage.clickAdministrationTab()
    await this.enterprisePage.clickEmailAndSmsLogTab()
  }

  async createUser (userDetails) {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickNewUserButton()
    await this.userPage.enterFirstName(userDetails)
    await this.userPage.enterLastName(userDetails)
    await this.userPage.enterUserEmail(userDetails)
    await this.userPage.setEmailPreferred()
    await this.userPage.clickSaveUser()
    await this.dashboardPage.clickUsers()
    await this.userPage.clickStatusFilter()
    await this.userPage.selectCreatedOption()
    await this.page.reload({ waitUntil: 'load' })
    await this.userPage.selectUsers(userDetails)
    await this.userPage.activateUsers()
    await this.userPage.clickNewPassword()
    await this.userPage.clickConfirmActivate()
  }

  async verifyUsersInvited (userList) {
    await this.userPage.clickStatusFilter()
    await this.userPage.selectAllStatusOption()
    await this.page.waitForLoadState('load')
    await this.userPage.verifyUserExist(userList)
  }

  async inviteUsers (userList) {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickInviteTab()
    await this.userPage.clickEmailsandMobile()
    await this.userPage.enterEmails(userList)
    await this.userPage.clickSaveButton()
    await this.userPage.clickInviteUserButton()
    await this.verifyUsersInvited(userList)
  }

  async deleteUserAndVerify (userDetails) {
    await this.dashboardPage.clickUsers()
    await this.setAllFilterAsAll()
    await this.userPage.selectUsers(userDetails)
    await this.userPage.clickDeleteButton()
    await this.userPage.confirmDeleteButton()
    await this.page.reload({ waitUntil: 'load' })
    await this.userPage.verifyUserNotExist(userDetails)
  }

  async verifyArchivedBaseOfInvitedQuestionnaireIsNotOnUserExperquizAccount (base, questionnaire) {
    await this.dashboardPage.verifyNoQuestionnaireInvitationOnUserDashboardPage(base, questionnaire)
    await this.dashboardPage.userLogOut()
  }

  async playArchiveQuestionnaireOnUserMail (userList, commonData, questionList) {
    this.playerAction = new PlayerAction(this.page)
    await this.dashboardPage.clickEnterprise()
    await this.enterprisePage.clickAdministrationTab()
    await this.enterprisePage.clickEmailAndSmsLogTab()
    await this.playerAction.EmailGetFromEmailandsmslog(userList, commonData, questionList)
    await this.playerPage.contactUserBackToHome()
  }

  async createGroup (group) {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickGroupsTab()
    await this.userPage.clickCreateGroupButton()
    await this.userPage.enterGroupName(group)
    await this.userPage.clickCreateButton()
    await this.userPage.verifyGroupExist(group)
  }

  async addUserAndAdminOnTheCreatedGroup (group, userData, adminData) {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickGroupsTab()
    await this.userPage.clickGroupFilter()
    await this.userPage.selectGroup(group)
    await this.userPage.selectUsersAndAdminOnThisGroup(userData, adminData)
    await this.userPage.saveGroup()
    await this.userPage.verifyGroupMembers(userData, group)
  }

  async deleteGroup (group) {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickGroupsTab()
    await this.userPage.clickGroupsManagement()
    await this.userPage.checkGroup(group)
    await this.userPage.ClickGroupDeleteButton()
    await this.userPage.ClickConfirmGroupDeleteButton()
    await this.userPage.verifyGroupNotExist(group)
  }

  async verifyUserEditedData (loginData, userData) {
    await this.home.logIn(loginData)
    await this.dashboardPage.clickUsers()
    await this.setAllFilterAsAll()
    await this.userPage.verifyUserDetails(userData)
    await this.dashboardPage.logOut()
  }

  async verifyAdminEditedData (loginData) {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickStatusFilter()
    await this.userPage.selectAllStatusOption()
    await this.userPage.verifyUserDetails(loginData)
    await this.dashboardPage.logOut()
  }

  async verifyPasswordCriteriaWithInviteUserLink (userList, commonData) {
    this.homeAction = new HomeAction(this.page)
    const subj = commonData.mail_subjects.invite_user_subject
    const to = userList.user_name + process.env.uniqueId + userList.domain
    const eyeButton = "//div[normalize-space()='" + to + "']/following-sibling::div[contains(.,'" + subj + "')]/following-sibling::button//span[@class='fa fa-eye icon']"
    await this.page.reload({ waitUntil: 'load' })
    await this.page.click(eyeButton)
    await this.homeAction.home.clickActiveUserStartButton()
    await this.homeAction.enterUserRegisterPasswordWithoutLength(userList)
    await this.homeAction.enterUserRegisterPasswordWithoutSymbol(userList)
    await this.homeAction.enterUserRegisterPasswordWithCriteria(userList)
    await this.dashboardPage.userLogOut()
  }

  async verifyPasswordCriteriaWithAdminAndUserProfile (admin, user) {
    this.profileAction = new ProfileAction(this.page)
    await this.home.logIn(admin)
    await this.verifyPasswordCriteriaForAdmin(admin)
    await this.home.logInUserRand(user)
    await this.profileAction.passwordCriteriaForUsers(user)
  }

  async verifyPasswordCriteriaForAdmin (admin) {
    this.profileAction = new ProfileAction(this.page)
    await this.dashboardPage.clickAdminSettings()
    await this.profileAction.adminPasswordWithoutLength(admin)
    await this.profileAction.adminPasswordWithCriteria(admin)
    await this.dashboardPage.logOut()
  }

  async removePasswordCriteriaAdminProfile (admin) {
    this.profileAction = new ProfileAction(this.page)
    await this.home.logInNewPassword(admin)
    await this.profileAction.changePasswordWithoutCriteria(admin)
    await this.dashboardPage.logOut()
  }

  async activateContactUsers (loginData, users) {
    await this.home.logIn(loginData)
    await this.dashboardPage.clickUsers()
    await this.userPage.clickContactTab()
    await this.userPage.selectContactUser(users)
    await this.userPage.ClickActivateContactUser()
    await this.userPage.clickConfirmActivateContact()
  }

  async defineBossForActiveUser (admin, user) {
    await this.dashboardPage.clickUsers()
    await this.setAllFilterAsAll()
    await this.userPage.clickEditUserButton(user)
    await this.userPage.clickDefineBossButton()
    await this.userPage.selectBossUser(admin)
    await this.page.waitForLoadState('load')
    await this.userPage.verifySelectedAdminIsPresentInHierarchySection(admin)
    await this.userPage.clickSaveOnEditUserPage()
  }

  async verifyUserInGroup (loginData, group, userList) {
    this.home = new HomeAction(this.page)
    await this.home.logIn(loginData)
    await this.dashboardPage.clickUsers()
    await this.userPage.clickGroupsTab()
    await this.userPage.clickGroupFilter()
    await this.userPage.selectGroup(group)
    await this.userPage.verifyUserExistInGroup(userList)
  }

  async verifyUserNotInGroup (loginData, group, userList) {
    this.home = new HomeAction(this.page)
    await this.home.logIn(loginData)
    await this.dashboardPage.clickUsers()
    await this.userPage.clickGroupsTab()
    await this.userPage.clickGroupFilter()
    await this.userPage.selectGroup(group)
    await this.userPage.verifyUserNotExistInGroup(userList)
  }

  async enableContributorWithBase (users, base) {
    await this.dashboardPage.clickUsers()
    await this.setAllFilterAsAll()
    await this.userPage.clickEditUserButton(users)
    await this.userPage.enableContributor()
    await this.userPage.selectBaseForPermittedUser(base)
    await this.userPage.clickSaveOnEditUserPage()
    await this.userPage.verifyUserAsContributer(users)
    await this.dashboardPage.logOut()
  }

  async disableContributorWithBase (users, base) {
    await this.dashboardPage.clickUsers()
    await this.setAllFilterAsAll()
    await this.userPage.clickEditUserButton(users)
    await this.userPage.unSelectAllBaseForPermittedUser(base)
    await this.userPage.disableContributor()
    await this.userPage.clickSaveOnEditUserPage()
    await this.userPage.verifyUserNotAsContributer(users)
  }

  async deactivateUserAndVerify (userData) {
    await this.dashboardPage.clickUsers()
    await this.setAllFilterAsAll()
    await this.userPage.clickStatusFilter()
    await this.userPage.selectActiveOption()
    await this.userPage.selectUsers(userData)
    await this.userPage.clickDeactivate()
    await this.userPage.confirmDeactivate()
    await this.page.reload({ waitUntil: 'load' })
    await this.verifyUserInactive(userData)
  }

  async verifyUserInactive (userData) {
    await this.userPage.clickStatusFilter()
    await this.userPage.selectInactiveOption()
    await this.userPage.verifyUser(userData)
  }

  async resetPassword (userData) {
    await this.dashboardPage.clickUsers()
    await this.setAllFilterAsAll()
    await this.userPage.clickStatusFilter()
    await this.userPage.selectActiveOption()
    await this.userPage.selectUsers(userData)
    await this.userPage.clickResetButton()
    await this.userPage.confirmReset()
  }

  async assignUserToGroupAndVerify (userData, group) {
    await this.dashboardPage.clickUsers()
    await this.setAllFilterAsAll()
    await this.userPage.selectUser(userData)
    await this.userPage.clickAssignButton()
    await this.userPage.clickAssignToGroup(group)
    await this.userPage.clickSave()
    await expect(this.page.locator("//li[contains(text(),'assigned to groups')]")).toBeVisible()
    await this.page.locator("//li[contains(text(),'assigned to groups')]").waitFor({ state: 'hidden' })
    await this.userPage.clickGroupsTab()
    await this.userPage.verifyGroupMembers(userData, group)
  }

  async uploadUsersAndVerify (user) {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickImportExportsTab()
    await this.userPage.uploadUsers(user)
    await this.page.reload({ waitUntil: 'load' })
    await this.userPage.verifyDocumentUploaded(user)
  }

  async verifyUploadedUsers () {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickImportExportsTab()
    await this.userPage.verifyUploadedUser()
  }

  async permissionForUser (user) {
    await this.dashboardPage.clickUsers()
    await this.setAllFilterAsAll()
    await this.userPage.clickEditUserButton(user)
  }

  async grantAllMenusToView (user) {
    await this.permissionForUser(user)
    await this.userPage.enablePermission()
    await this.userPage.clickYesForAllEnterpriseUsers()
    await this.userPage.clickYesForAllEnterpriseTopics()
    await this.userPage.grantUsersView()
    await this.userPage.grantContactsView()
    await this.userPage.grantBasesView()
    await this.userPage.grantBasesQuestionsView()
    await this.userPage.grantPermissionQuestionnairesView()
    await this.userPage.grantPermissionMediaView()
    await this.userPage.grantPermissionEvaluationsEdit()
    await this.userPage.grantPermissionTrainingsView()
    await this.userPage.grantPermissionModulesView()
    await this.userPage.clickSave()
    await this.dashboardPage.logOut()
  }

  async disablePermissionForUser (user) {
    await this.permissionForUser(user)
    await this.userPage.disablePermission()
    await this.userPage.clickSave()
  }

  async verifyAllMenusAvailableForPermittedUser (users) {
    await this.home.logInUser(users)
    await this.dashboardPage.changeToAdmin()
    await this.dashboardPage.clickBases()
    await this.dashboardPage.clickQuestionnaire()
    await this.dashboardPage.clickQuestions()
    await this.dashboardPage.clickUsers()
    await this.dashboardPage.clickEvaluations()
    await this.dashboardPage.clickMedia()
    await this.dashboardPage.clickModules()
    await this.dashboardPage.clickPath()
    await this.dashboardPage.logOut()
  }

  async grantToQuestions (user) {
    await this.permissionForUser(user)
    await this.userPage.enablePermission()
    await this.userPage.clickYesForAllEnterpriseTopics()
    await this.userPage.grantBasesView()
    await this.userPage.grantBasesQuestionsView()
    await this.userPage.grantPermissionQuestionsPropose()
    await this.userPage.grantPermissionQuestionsEdit()
    await this.userPage.clickSave()
    await this.dashboardPage.logOut()
  }

  async grantPermissionsForMedia (user) {
    await this.permissionForUser(user)
    await this.userPage.enablePermission()
    await this.userPage.clickYesForAllEnterpriseTopics()
    await this.userPage.grantBasesView()
    await this.userPage.grantBasesQuestionsView()
    await this.userPage.grantPermissionMediaVisibility()
    await this.userPage.clickSave()
    await this.dashboardPage.logOut()
  }

  async grantPermissionsForQuestionnaire (user) {
    await this.permissionForUser(user)
    await this.userPage.enablePermission()
    await this.userPage.grantUsersView()
    await this.userPage.grantContactsView()
    await this.userPage.grantBasesView()
    await this.userPage.grantPermissionQuestionnairesView()
    await this.userPage.grantPermissionQuestionnairesEdit()
    await this.userPage.grantPermissionQuestionnairesVisibility()
    await this.userPage.clickYesForAllEnterpriseTopics()
    await this.userPage.clickYesForAllEnterpriseUsers()
    await this.userPage.clickSave()
    await this.dashboardPage.logOut()
  }

  async grantPermissionsForUsers (user) {
    await this.permissionForUser(user)
    await this.userPage.enablePermission()
    await this.userPage.grantUsersView()
    await this.userPage.grantContactsView()
    await this.userPage.grantBasesView()
    await this.userPage.clickYesForAllEnterpriseTopics()
    await this.userPage.clickYesForAllEnterpriseUsers()
    await this.userPage.clickSave()
    await this.dashboardPage.logOut()
  }

  async verifyUsersOptionsForPermittedUser (userList, group) {
    await this.dashboardPage.clickUsers()
    await this.setAllFilterAsAll()
    await this.userPage.verifyUser(userList)
    await this.userPage.clickGroupsTab()
    await this.userPage.verifyGroupMembers(userList, group)
    await this.dashboardPage.logOut()
  }

  async grantPermissionsFormodules (user) {
    await this.permissionForUser(user)
    await this.userPage.enablePermission()
    await this.userPage.clickYesForAllEnterpriseTopics()
    await this.userPage.clickYesForAllEnterpriseUsers()
    await this.userPage.grantUsersView()
    await this.userPage.grantContactsView()
    await this.userPage.grantBasesView()
    await this.userPage.grantPermissionModulesView()
    await this.userPage.grantPermissionModulesEdit()
    await this.userPage.grantPermissionModulesInvite()
    await this.userPage.grantPermissionModulesVisibility()
    await this.userPage.clickSave()
    await this.dashboardPage.logOut()
  }

  async grantPermissionsForTraining (user) {
    await this.permissionForUser(user)
    await this.userPage.enablePermission()
    await this.userPage.clickYesForAllEnterpriseTopics()
    await this.userPage.clickYesForAllEnterpriseUsers()
    await this.userPage.grantUsersView()
    await this.userPage.grantContactsView()
    await this.userPage.grantBasesView()
    await this.userPage.grantPermissionTrainingsView()
    await this.userPage.grantPermissionTrainingsEdit()
    await this.userPage.grantPermissionTrainingsInvite()
    await this.userPage.clickSave()
    await this.dashboardPage.logOut()
  }

  async unselectUserProfiles () {
    await this.userPage.unselectEmployeeOption()
    await this.userPage.unselectClientOption()
    await this.userPage.unselectTraineeOption()
    await this.userPage.unselectContractorOption()
    await this.userPage.unselectOtherOption()
  }

  async filterAndEnableContributor (admin, users) {
    await this.home.logInUserRand(admin)
    await this.dashboardPage.clickUsers()
    await this.setAllFilterAsAll()
    await this.enableContributor(users)
  }

  async enableContributor (user) {
    await this.userPage.clickEditUserButton(user)
    await this.userPage.enableContributor()
    await this.userPage.clickSave()
  }

  async changeUserTypeAsEmployee (user) {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickEditUsersButton(user)
    await this.unselectUserProfiles()
    await this.userPage.selectEmployeeOption()
    await this.userPage.clickSave()
  }

  async changeUserTypeAsClient (user) {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickEditUsersButton(user)
    await this.unselectUserProfiles()
    await this.userPage.selectClientOption()
    await this.userPage.clickSave()
  }

  async changeUserTypeAsTrainee (user) {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickEditUsersButton(user)
    await this.unselectUserProfiles()
    await this.userPage.selectTraineeOption()
    await this.userPage.clickSave()
  }

  async changeUserTypeAsContractor (user) {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickEditUsersButton(user)
    await this.unselectUserProfiles()
    await this.userPage.selectContractorOption()
    await this.userPage.clickSave()
  }

  async changeUserTypeAsOther (user) {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickEditUsersButton(user)
    await this.unselectUserProfiles()
    await this.userPage.selectOtherOption()
    await this.userPage.clickSave()
  }

  async updateUserProfileByAdmin (admin, users) {
    await this.home.logInUserRand(admin)
    await this.dashboardPage.clickUsers()
    await this.editUserProfileByAdmin(users)
  }

  async editUserProfileByAdmin (users) {
    this.profile = new ProfilePage(this.page)
    await this.userPage.clickStatusFilter()
    await this.userPage.selectAllStatusOption()
    await this.userPage.clickEditUsersButton(users)
    await this.profile.editData(users)
  }

  async setAllFilterAsAll () {
    await this.userPage.clickStatusFilter()
    await this.userPage.selectAllStatusOption()
    await this.userPage.clickGroupsFilter()
    await this.userPage.selectAllUsersOption()
    await this.userPage.clickProfilesFilter()
    await this.userPage.selectAllProfilesOption()
    await this.userPage.clickPageFilter()
    await this.userPage.select400PerPage()
  }

  async deleteExistingImport () {
    await this.dashboardPage.clickUsers()
    await this.userPage.clickImportExportsTab()
    if (await this.page.locator("(//div[@id='employee-files-list']//a[@title='Delete file'])[1]").isVisible()) {
      const count = await this.page.locator("//div[@id='employee-files-list']//a[@title='Delete file']").count()
      for (let index = 0; index < count; index++) {
        await this.userPage.deleteImport()
      }
    }
  }
}
