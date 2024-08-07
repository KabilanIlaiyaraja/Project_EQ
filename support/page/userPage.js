const { expect } = require('@playwright/test')
const { DashboardPage } = require('./dashboardPage')

exports.UserPage = class UserPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    this.dashboardPage = new DashboardPage(this.page)
  }

  async clickInviteTab () {
    await this.page.click("//a[@href='/enterprise/users/invite']")
    await this.page.waitForLoadState('load')
  }

  async clickEmailsandMobile () {
    await this.page.click('#select-contacts-btn')
    await expect(this.page.locator("//div[@id='select-contacts']")).toBeVisible()
  }

  async enterEmails (email) {
    const emailId = email.user_name + process.env.uniqueId + email.domain
    await this.page.click("//textarea[@id='contacts-participants']")
    await this.page.locator("//textarea[@id='contacts-participants']").pressSequentially(emailId, { delay: 100 })
  }

  async clickSaveButton () {
    await this.page.click("//a[@id ='save-contacts'][normalize-space(text())='Validate']")
  }

  async clickInviteUserButton () {
    await expect(this.page.locator("//button[@name='invite-btn']")).toBeVisible()
    await this.page.click("//button[@name='invite-btn']")
    await expect(this.page.locator("//li[normalize-space(text())='The invitations have been sent']")).toBeVisible()
    await this.page.locator("//li[normalize-space(text())='The invitations have been sent']").waitFor({ state: 'hidden' })
  }

  async clickStatusFilter () {
    await this.dashboardPage.waiting()
    await this.page.click("(//div[@class='xq-select-content'])[1]")
  }

  async selectAllStatusOption () {
    await this.page.click("//ul//li[@title='All status']")
  }

  async selectCreatedOption () {
    await this.page.click("//ul//li[@title='created']")
  }

  async selectInactiveOption () {
    await this.page.click("//ul//li[@title='inactive']")
  }

  async selectActiveOption () {
    await this.page.click("//ul//li[@title='active']")
  }

  async clickGroupsFilter () {
    await this.dashboardPage.waiting()
    await this.page.click("(//div[@class='xq-select-content'])[2]")
  }

  async selectAllUsersOption () {
    await this.page.click("//ul//li[@title='All users']")
  }

  async clickProfilesFilter () {
    await this.dashboardPage.waiting()
    await this.page.click("(//div[@class='xq-select-content'])[3]")
  }

  async selectAllProfilesOption () {
    await this.page.click("//ul//li[@title='All profiles']")
  }

  async clickPageFilter () {
    await this.dashboardPage.waiting()
    await this.page.click("(//div[@class='xq-select-content'])[4]")
  }

  async select400PerPage () {
    await this.page.click("//ul//li[@title='400 per page']")
  }

  async verifyUserExist (email) {
    await expect(this.page.locator("//div[@class='flex-row']//div[text()='" + '[' + email.user_name + process.env.uniqueId + email.domain + ']' + "']")).toBeVisible()
  }

  async verifyUserNotExist (email) {
    await expect(this.page.locator("//div[@class='flex-row']//div[text()='" + '[' + email.user_name + process.env.uniqueId + email.domain + ']' + "']")).not.toBeVisible()
  }

  async clickNewUserButton () {
    await this.page.click("//div[@id='std-toolbar']//span[@class='fa fa-plus']")
  }

  async enterFirstName (fistName) {
    await this.page.locator("//div[contains(@class,'firstname')]//input[@class='xq-input']").clear()
    await this.page.fill("//div[contains(@class,'firstname')]//input[@class='xq-input']", fistName.first_name)
  }

  async enterLastName (lastName) {
    await this.page.locator("//div[contains(@class,'lastname')]//input[@class='xq-input']").clear()
    await this.page.fill("//div[contains(@class,'lastname')]//input[@class='xq-input']", lastName.last_name + ' ' + process.env.uniqueId)
  }

  async enterUserEmail (email) {
    await this.page.locator("//div[contains(@class,'email')]//input[@class='xq-input']").clear()
    await this.page.fill("//div[contains(@class,'email')]//input[@class='xq-input']", email.user_name + process.env.uniqueId + email.domain)
  }

  async setEmailPreferred () {
    await this.page.click("//input[@value='email']/parent::label")
  }

  async clickSaveUser () {
    await this.page.click("(//button[@class='xq-button primary']//span[contains(text(),'save')])[1]")
  }

  async selectUsers (user) {
    await this.page.click("//*[contains(text(),'" + user.last_name.toUpperCase() + ' ' + process.env.uniqueId + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/ancestor::li//label//span[@class='fa fa-square-o icon']")
  }

  async selectUser (user) {
    await this.page.click("//*[contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/ancestor::li//label//span[@class='fa fa-square-o icon']")
  }

  async activateUsers () {
    await this.page.click("//button[@class='xq-button primary']//span[contains(text(),'activate')]")
  }

  async clickConfirmActivate () {
    await this.page.click("//div[@class='xq-modal-body']//button[@class='xq-button primary']//span[contains(text(),'activate')]")
  }

  async clickNewPassword () {
    if (await this.page.locator("//button[contains(@class,'active-state')]//span[normalize-space()='Without sending the password']").isVisible()) {
      await this.page.click("//span[@class='xq-yesno-choices']")
    }
  }

  async clickDeleteButton () {
    await expect(this.page.locator("//button[@class='xq-button primary']//span[contains(text(),'delete')]")).toBeVisible()
    await this.page.click("//button[@class='xq-button primary']//span[contains(text(),'delete')]")
  }

  async confirmDeleteButton () {
    await expect(this.page.locator("//h3[text()='Confirm delete']")).toBeVisible()
    await this.page.click("//span[contains(text(),'delete')]/parent::button[@class='xq-button danger']")
    await expect(this.page.locator("//ul//li[contains(text(),'user has been deleted')]")).toBeVisible()
    await this.page.locator("//ul//li[contains(text(),'user has been deleted')]").waitFor({ state: 'hidden' })
  }

  async clickGroupsTab () {
    await this.page.click("//a[@href='/user/enterprise/groups']")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//div[@id='groups-page']")).toBeVisible()
  }

  async clickCreateGroupButton () {
    await this.page.click("//a[@class='btn btn-primary'][normalize-space(text())='Create Group']")
    await this.page.waitForTimeout(3000)
    await expect(this.page.locator("//div[@class='modal-dialog']//div//form[@action='/user/enterprise/groups']")).toBeVisible()
  }

  async enterGroupName (name) {
    await this.page.locator("//form[@action='/user/enterprise/groups']//input[@id='group_name']").clear()
    await this.page.locator("//form[@action='/user/enterprise/groups']//input[@id='group_name']").pressSequentially(name + ' ' + process.env.uniqueId, { delay: 100 })
  }

  async clickCreateButton () {
    await this.page.click("//button[@class='btn btn-primary'][text()='Create']")
  }

  async verifyGroupExist (name) {
    await this.clickGroupsManagement()
    await expect(this.page.locator("//div[@class='cell group-name'][normalize-space()='" + name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async verifyGroupNotExist (name) {
    await this.clickGroupsManagement()
    await expect(this.page.locator("//div[@class='cell group-name'][normalize-space()='" + name + ' ' + process.env.uniqueId + "']")).not.toBeVisible()
  }

  async clickGroupsManagement () {
    await this.page.click("//a[normalize-space()='Groups management']")
  }

  async checkGroup (name) {
    await this.page.locator("//div[@class='cell group-name'][normalize-space()='" + name + ' ' + process.env.uniqueId + "']/preceding-sibling::label//span[@class='fa fa-square-o icon']").click()
  }

  async clickGroupFilter () {
    await this.page.click("//span[@id='group-filter-button']//span[@class='ui-selectmenu-icon ui-icon ui-icon-triangle-1-s']")
  }

  async selectGroup (group) {
    await this.page.click("//div[contains(@id,'ui-id')][contains(text(),'" + group + ' ' + process.env.uniqueId + "')]")
  }

  async selectUsersAndAdminOnThisGroup (user, admins) {
    const admin = "//div[contains(text(),'" + admins.last_name.toUpperCase() + ' ' + admins.first_name[0].toUpperCase() + admins.first_name.slice(1) + "')]/preceding-sibling::div//span[contains(@class,'fa fa-square-o unchecked')]"
    await expect(this.page.locator(admin)).toBeVisible()
    await this.page.click(admin)
    const User = "//div[contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/preceding-sibling::div//span[contains(@class,'fa fa-square-o unchecked')]"
    await expect(this.page.locator(User)).toBeVisible()
    await this.page.click(User)
  }

  async saveGroup () {
    await this.page.click('#users-checked-toolbar > #checked-save-btn')
  }

  async verifyGroupMembers (user, group) {
    await this.selectAllGroup()
    await expect(this.page.locator("//span[@title='" + group + ' ' + process.env.uniqueId + "'][@class='fa fa-check-circle-o']/preceding::div//a[contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]")).toBeVisible()
  }

  async selectAllGroup () {
    await this.clickGroupFilter()
    await this.selectAllOption()
  }

  async selectAllOption () {
    await this.page.click("//div[contains(@id,'ui-id')][contains(text(),'All users')]")
  }

  async checkAllGroup () {
    await this.page.click("//div[@class='flex-row xq-table-head']//span[@class='icon fa fa-square-o']")
  }

  async ClickGroupDeleteButton () {
    await this.page.click("//button[@title='delete groups']")
  }

  async ClickConfirmGroupDeleteButton () {
    await expect(this.page.locator("//h3[text()='Confirm delete']")).toBeVisible()
    await this.page.click("//button[@class='xq-button danger']")
  }

  async clickUserDetailButton (userName) {
    await this.page.click("//div[@class='name-link'][normalize-space(text())='" + userName.last_name.toUpperCase() + ' ' + userName.first_name[0].toUpperCase() + userName.first_name.slice(1) + "']/parent::a//following-sibling::div//a[@title='Details']")
  }

  async verifyUserDetails (users) {
    const user = users.edit_user
    await this.clickUserDetailButton(users)
    await expect(this.page.locator("//label[text()='Address']/following-sibling::div//p[text()='" + user.zip_code + ' ' + user.city + "']")).toBeVisible()
  }

  async clickContactTab () {
    await this.page.click("//a[@href='/enterprise/contacts']")
  }

  async selectContactUser (emails) {
    await this.page.click("//div[@class='cell name'][contains(text(),'[" + emails.user_name + process.env.uniqueId + emails.domain + "]')]/preceding-sibling::div/label/span[@class='fa fa-square-o unchecked  ']")
  }

  async ClickActivateContactUser () {
    await this.page.click("//a[@id='activate-users-btn'][text()='Activate']")
  }

  async clickConfirmActivateContact () {
    await this.page.click("//a[@id='confirm-activate-btn'][text()='Activate']")
  }

  async clickEditUsersButton (userName) {
    await this.page.click("//div[@class='name-link'][normalize-space(text())='" + userName.last_name.toUpperCase() + ' ' + process.env.uniqueId + ' ' + userName.first_name[0].toUpperCase() + userName.first_name.slice(1) + "']/parent::a/following-sibling::div//li[@title='Edit']")
    await this.dashboardPage.waiting()
    await this.page.waitForTimeout(3000)
  }

  async clickEditUserButton (userName) {
    await this.page.click("//div[@class='name-link'][normalize-space(text())='" + userName.last_name.toUpperCase() + ' ' + userName.first_name[0].toUpperCase() + userName.first_name.slice(1) + "']/parent::a/following-sibling::div//li[@title='Edit']")
    await this.dashboardPage.waiting()
    await this.page.waitForTimeout(3000)
  }

  async clickDefineBossButton () {
    await this.page.click("//button[contains(@class,'primary boss')]")
  }

  async selectBossUser (admin) {
    await this.page.click("//div[contains(text(),'" + admin.last_name.toUpperCase() + ' ' + admin.first_name[0].toUpperCase() + admin.first_name.slice(1) + "')]/parent::a//following-sibling::button[contains(@class,'btn btn-tile')]")
  }

  async verifySelectedAdminIsPresentInHierarchySection (admin) {
    await expect(this.page.locator("//div[@class='flex-row hierarchy']//div[contains(text(),'" + admin.first_name[0].toUpperCase() + admin.first_name.slice(1) + ' ' + admin.last_name[0].toUpperCase() + "')]")).toBeVisible()
  }

  async clickSaveOnEditUserPage () {
    await this.page.click("(//button[@class='xq-button primary']//span[contains(text(),'save')])[1]")
    await expect(this.page.locator("//div//ul//li[contains(text(),'successfully updated')]")).toBeVisible()
    await this.page.locator("//div//ul//li[contains(text(),'successfully updated')]").waitFor({ state: 'hidden' })
  }

  async selectInGroupName (inGroupName) {
    const ingrp = inGroupName.replace('replaceme', process.env.uniqueId)
    await this.page.click("//ul//li//div[@title='" + ingrp + "']")
  }

  async verifyUserAreInGroupAction (users) {
    await expect(this.page.locator("//div[@class='flex-row']//div[contains(text(),'" + users.last_name.toUpperCase() + ' ' + users.first_name[0].toUpperCase() + users.first_name.slice(1) + "')]")).toBeVisible()
  }

  async selectOutGroupName (outGroupName) {
    const outgrp = outGroupName.replace('replaceme', process.env.uniqueId)
    await this.page.click("//ul//li//div[@title='" + outgrp + "']")
  }

  async verifyUserAreOutGroupAction (users) {
    await expect(this.page.locator("//div[@class='flex-row']//div[contains(text(),'" + users.last_name.toUpperCase() + ' ' + users.first_name[0].toUpperCase() + users.first_name.slice(1) + "')]")).not.toBeVisible()
  }

  async verifyUserNotExistInGroup (users) {
    const usermail = "//div[@class='flex-row user-div']//div[normalize-space(text())='" + users.last_name.toUpperCase() + ' ' + users.first_name[0].toUpperCase() + users.first_name.slice(1) + "']//preceding-sibling::div//span[contains(@class,'square-o unchecked')]"
    await expect(this.page.locator(usermail)).toBeVisible()
  }

  async verifyUserExistInGroup (users) {
    const usermail = "//div[@class='flex-row user-div']//div[normalize-space(text())='" + users.last_name.toUpperCase() + ' ' + users.first_name[0].toUpperCase() + users.first_name.slice(1) + "']//preceding-sibling::div//span[@class='fa  fa-check-square-o checked  ']"
    await expect(this.page.locator(usermail)).toBeVisible()
  }

  async enableContributor () {
    await expect(this.page.locator("//div[@class='form-group contributor']//div//span[@class='xq-yesno-choices']")).toBeVisible()
    if (await this.page.locator("//div[contains(@class,'contributor')]//button[contains(@class,'active-state')]//span[normalize-space(text())='no']").isVisible()) {
      await this.page.click("//div[@class='form-group contributor']//div//span[@class='xq-yesno-choices']")
    }
  }

  async disableContributor () {
    await expect(this.page.locator("//div[@class='form-group contributor']//div//span[@class='xq-yesno-choices']")).toBeVisible()
    if (await this.page.locator("//div[contains(@class,'contributor')]//button[contains(@class,'active-state')]//span[normalize-space(text())='yes']").isVisible()) {
      await this.page.click("//div[@class='form-group contributor']//div//span[@class='xq-yesno-choices']")
    }
  }

  async selectBaseForPermittedUser (base) {
    await this.page.click("//*[contains(@input-id,'permission-/Topic')][normalize-space()='" + base.base_name[0].toUpperCase() + base.base_name.slice(1) + ' ' + process.env.uniqueId + "']//span[@class='fa fa-square-o icon']")
  }

  async unSelectAllBaseForPermittedUser (base) {
    if (await this.page.locator("//*[contains(@input-id,'permission-/Topic')]/following::span//label[contains(.,'" + base.base_name[0].toUpperCase() + base.base_name.slice(1) + ' ' + process.env.uniqueId + "')]//span[contains(@class,'check-square')]").isVisible()) {
      if (await this.page.locator("//label[@input-id='permission-all-topics']//span[contains(@class,'check-square-o')]").isVisible()) {
        await this.page.click("//label[@input-id='permission-all-topics']//span[contains(@class,'check-square-o')]")
      } else {
        await this.page.click("//label[@input-id='permission-all-topics']//span")
        await this.page.click("//label[@input-id='permission-all-topics']//span[contains(@class,'check-square-o')]")
      }
    }
    await expect(this.page.locator("//*[contains(@input-id,'permission-/Topic')]/following::span//label[contains(.,'" + base.base_name[0].toUpperCase() + base.base_name.slice(1) + ' ' + process.env.uniqueId + "')]//span[contains(@class,'check-square')]")).not.toBeVisible()
  }

  async verifyUserAsContributer (userName) {
    await expect(this.page.locator("//div[@class='name-link'][normalize-space(text())='" + userName.last_name.toUpperCase() + ' ' + userName.first_name[0].toUpperCase() + userName.first_name.slice(1) + "']/parent::a//following-sibling::div[@class='cell rights']//span[text()='C']")).toBeVisible()
  }

  async verifyUserNotAsContributer (userName) {
    await expect(this.page.locator("//div[@class='name-link'][normalize-space(text())='" + userName.last_name.toUpperCase() + ' ' + userName.first_name[0].toUpperCase() + userName.first_name.slice(1) + "']/parent::a//following-sibling::div[@class='cell rights']//span[text()='C']")).not.toBeVisible()
  }

  async clickDeactivate () {
    await expect(this.page.locator("//button[@class='xq-button primary']//span[normalize-space(text())='deactivate']")).toBeVisible()
    await this.page.click("//button[@class='xq-button primary']//span[normalize-space(text())='deactivate']")
  }

  async confirmDeactivate () {
    await this.page.click("(//button[@class='xq-button primary']//span[normalize-space(text())='deactivate'])[2]")
    await expect(this.page.locator("//li[contains(text(),'user has been updated')]")).toBeVisible()
    await this.page.locator("//li[contains(text(),'user has been updated')]").waitFor({ state: 'hidden' })
  }

  async clickResetButton () {
    await expect(this.page.locator("//button[@class='xq-button primary']//span[normalize-space(text())='reset']")).toBeVisible()
    await this.page.click("//button[@class='xq-button primary']//span[normalize-space(text())='reset']")
  }

  async confirmReset () {
    await this.page.click("(//button[@class='xq-button primary']//span[normalize-space(text())='reset'])[2]")
  }

  async verifyUser (email) {
    await expect(this.page.locator("//div[text()='" + email.last_name.toUpperCase() + ' ' + email.first_name[0].toUpperCase() + email.first_name.slice(1) + "']")).toBeVisible()
  }

  async clickAssignButton () {
    await this.page.click("//button[@class='xq-button primary']//span[normalize-space(text())='assign']")
  }

  async clickAssignToGroup (group) {
    await this.page.click("//label[text()[normalize-space()='" + group + ' ' + process.env.uniqueId + "']]//span")
  }

  async clickSave () {
    await this.page.click("(//button[@class='xq-button primary']//span[contains(text(),'save')])[1]")
  }

  async clickImportExportsTab () {
    await this.page.click("//a[contains(@href,'/employee_file')]")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//div[@id='users-file-upload-page']")).toBeVisible()
  }

  async uploadUsers (fileName) {
    const mediaDirectory = process.cwd() + '/media/' + fileName.user_file_name
    await this.page.setInputFiles("input[type='file']", mediaDirectory)
    await expect(this.page.locator("//div[contains(@class,'xq-flashes')]//ul//li")).toBeVisible()
    await this.page.locator("//div[contains(@class,'xq-flashes')]//ul//li").waitFor({ state: 'hidden' })
  }

  async verifyDocumentUploaded (fileName) {
    await expect(this.page.locator("//div[contains(@class,'filename')][contains(text(),'" + fileName.user_file_name + "')]")).toBeVisible()
  }

  async verifyUploadedUser () {
    const noOfUsers = await this.page.locator("//div[contains(text(),'users_to_upload.xlsx')]//following-sibling::div[@class='cell nb-users']").innerText()
    if (noOfUsers !== 0) {
      console.log('Users successfully uploaded')
    } else {
      console.log('Users not uploaded')
    }
    await this.dashboardPage.clickUsers()
    await this.clickStatusFilter()
    await this.selectCreatedOption()
    await expect(this.page.locator("(//div[@class='cell status created']//following-sibling::div[@class='cell rights']//span[text()='M'])[1]")).toBeVisible()
    const Users = await this.page.locator("//div[@class='cell status created']//following-sibling::div[@class='cell rights']//span[text()='M']").count()
    // eslint-disable-next-line eqeqeq
    if (noOfUsers == Users) {
      console.log('Users successfully created')
    } else {
      console.log('Users not created')
    }
    await this.clickStatusFilter()
    await this.selectAllStatusOption()
  }

  async enablePermission () {
    if (await this.page.locator("//div[contains(@class,'has-permissions')]//button[contains(@class,'xq-yesno-button active-state')]//span[text()='no']").isVisible()) {
      await this.page.click("//div[contains(@class,'has-permissions')]//input[@type='checkbox']")
    }
  }

  async disablePermission () {
    if (await this.page.locator("//div[contains(@class,'has-permissions')]//button[contains(@class,'xq-yesno-button active-state')]//span[text()='yes']").isVisible()) {
      await this.page.click("//div[contains(@class,'has-permissions')]//input[@type='checkbox']")
    }
  }

  async clickYesForAllEnterpriseUsers () {
    if (await this.page.locator("//div[contains(@class,'includes_all_users')]//button[contains(@class,'xq-yesno-button active-state')]//span[text()='no']").isVisible()) {
      await this.page.click("//div[contains(@class,'includes_all_users')]//input[@type='checkbox']")
    }
  }

  async clickYesForAllEnterpriseTopics () {
    if (await this.page.locator("//div[contains(@class,'includes_all_topics')]//button[contains(@class,'xq-yesno-button active-state')]//span[text()='no']").isVisible()) {
      await this.page.click("//div[contains(@class,'includes_all_topics')]//input[@type='checkbox']")
    }
  }

  async grantUsersView () {
    if (await this.page.locator("//input[@id='users_view']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='users_view']/parent::div")
    }
  }

  async grantContactsView () {
    if (await this.page.locator("//input[@id='contacts_view']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='contacts_view']/parent::div")
    }
  }

  async grantBasesView () {
    if (await this.page.locator("//input[@id='bases_author']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='bases_author']/parent::div")
    }
  }

  async grantBasesQuestionsView () {
    if (await this.page.locator("//input[@id='questions_view']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='questions_view']/parent::div")
    }
  }

  async grantPermissionQuestionsPropose () {
    if (await this.page.locator("//input[@id='questions_propose']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='questions_propose']/parent::div")
    }
  }

  async grantPermissionQuestionsEdit () {
    if (await this.page.locator("//input[@id='questions_edit']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='questions_edit']/parent::div")
    }
  }

  async grantPermissionQuestionnairesView () {
    if (await this.page.locator("//input[@id='questionnaires_view']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='questionnaires_view']/parent::div")
    }
  }

  async grantPermissionQuestionnairesEdit () {
    if (await this.page.locator("//input[@id='questionnaires_edit']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='questionnaires_edit']/parent::div")
    }
  }

  async grantPermissionQuestionnairesVisibility () {
    if (await this.page.locator("//input[@id='questionnaires_visibility']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='questionnaires_visibility']/parent::div")
    }
  }

  async grantPermissionMediaView () {
    if (await this.page.locator("//input[@id='media_view']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='media_view']/parent::div")
    }
  }

  async grantPermissionMediaVisibility () {
    if (await this.page.locator("//input[@id='media_visibility']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='media_visibility']/parent::div")
    }
  }

  async grantPermissionTrainingsView () {
    if (await this.page.locator("//input[@id='trainings_view']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='trainings_view']/parent::div")
    }
  }

  async grantPermissionTrainingsEdit () {
    if (await this.page.locator("//input[@id='trainings_edit']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='trainings_edit']/parent::div")
    }
  }

  async grantPermissionTrainingsInvite () {
    if (await this.page.locator("//input[@id='trainings_invite']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='trainings_invite']/parent::div")
    }
  }

  async grantPermissionModulesView () {
    if (await this.page.locator("//input[@id='modules_view']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='modules_view']/parent::div")
    }
  }

  async grantPermissionModulesEdit () {
    if (await this.page.locator("//input[@id='modules_edit']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='modules_edit']/parent::div")
    }
  }

  async grantPermissionModulesInvite () {
    if (await this.page.locator("//input[@id='modules_invite']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='modules_invite']/parent::div")
    }
  }

  async grantPermissionModulesVisibility () {
    if (await this.page.locator("//input[@id='modules_visibility']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='modules_visibility']/parent::div")
    }
  }

  async grantPermissionEvaluationsEdit () {
    if (await this.page.locator("//input[@id='evaluations_edit']//preceding-sibling::span[@class='fa fa-toggle-off']").isVisible()) {
      await this.page.click("//input[@id='evaluations_edit']/parent::div")
    }
  }

  async selectContractorOption () {
    await this.page.click("//label[contains(@input-id,'profile-/UserProfile/')][normalize-space()='Contractor']")
  }

  async selectClientOption () {
    await this.page.click("//label[contains(@input-id,'profile-/UserProfile/')][normalize-space()='Client']")
  }

  async selectTraineeOption () {
    await this.page.click("//label[contains(@input-id,'profile-/UserProfile/')][normalize-space()='Trainee']")
  }

  async selectOtherOption () {
    await this.page.click("//label[contains(@input-id,'profile-/UserProfile/')][normalize-space()='Other']")
  }

  async selectEmployeeOption () {
    await this.page.click("//label[contains(@input-id,'profile-/UserProfile/')][normalize-space()='Employee']")
  }

  async unselectEmployeeOption () {
    if (await this.page.locator("//label[@class='checkbox-label marked'][normalize-space() = 'Employee']").isVisible()) {
      await this.page.click("//label[@class='checkbox-label marked'][normalize-space() = 'Employee']")
    }
  }

  async unselectClientOption () {
    if (await this.page.locator("//label[@class='checkbox-label marked'][normalize-space() = 'Client']").isVisible()) {
      await this.page.click("//label[@class='checkbox-label marked'][normalize-space() = 'Client']")
    }
  }

  async unselectTraineeOption () {
    if (await this.page.locator("//label[@class='checkbox-label marked'][normalize-space() = 'Trainee']").isVisible()) {
      await this.page.click("//label[@class='checkbox-label marked'][normalize-space() = 'Trainee']")
    }
  }

  async unselectContractorOption () {
    if (await this.page.locator("//label[@class='checkbox-label marked'][normalize-space() = 'Contractor']").isVisible()) {
      await this.page.click("//label[@class='checkbox-label marked'][normalize-space() = 'Contractor']")
    }
  }

  async unselectOtherOption () {
    if (await this.page.locator("//label[@class='checkbox-label marked'][normalize-space() = 'Other']").isVisible()) {
      await this.page.click("//label[@class='checkbox-label marked'][normalize-space() = 'Other']")
    }
  }

  async deleteImport () {
    await this.page.click("(//div[@class='flex-row file-div']//a[@title='Delete file'])[1]")
    await expect(this.page.locator("//div[contains(@class,'xq-flashes')]//li")).toBeVisible()
    await this.page.locator("//div[contains(@class,'xq-flashes')]//li").waitFor({ state: 'hidden' })
  }
}
