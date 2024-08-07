// @ts-check
const { ProfilePage } = require('../page/profilePage')
const { DashboardPage } = require('../page/dashboardPage')
exports.ProfileAction = class ProfileAction {
  /**
    * @param {import('@playwright/test').Page} page
    */

  constructor (page) {
    this.page = page
    this.profilepage = new ProfilePage(this.page)
    this.dashboard = new DashboardPage(this.page)
  }

  async changePassword (password, newPassword) {
    await this.profilepage.clickChangePassword()
    await this.page.waitForTimeout(2000)
    await this.profilepage.enterOldPassword(password)
    await this.profilepage.enterNewPassword(newPassword)
    await this.profilepage.reEnterPassword(newPassword)
    await this.profilepage.clickSave()
  }

  async editUserProfile (user) {
    const editData = user.edit_user
    await this.dashboard.clickUserSettings()
    await this.profilepage.clickEditProfile()
    await this.profilepage.editCity(editData)
    await this.profilepage.editZip(editData)
    await this.profilepage.clickSaveUser()
    await this.dashboard.userLogOut()
  }

  async editAdminProfile (user) {
    const editData = user.edit_user
    await this.dashboard.clickAdminSettings()
    await this.profilepage.clickEditAdminProfile()
    await this.profilepage.editCityAdmin(editData)
    await this.profilepage.editZipAdmin(editData)
    await this.profilepage.clickSaveAdmin()
  }

  async adminPasswordWithoutLength (admin) {
    await this.profilepage.clickChangePasswordAdmin()
    await this.page.waitForTimeout(2000)
    await this.profilepage.enterPasswordAdmin(admin.password_without_lower_case)
    await this.profilepage.enterNewPasswordAdmin(admin.password_without_length)
    await this.profilepage.confirmPasswordAdmin(admin.password_without_length)
    await this.profilepage.clickSaveAdmin()
    await this.profilepage.verifyErrorMessageDisplayedAdmin()
    await this.profilepage.clickCancelAdmin()
  }

  async adminPasswordWithCriteria (admin) {
    await this.profilepage.clickChangePasswordAdmin()
    await this.page.waitForTimeout(2000)
    await this.profilepage.enterPasswordAdmin(admin.password)
    await this.profilepage.enterNewPasswordAdmin(admin.new_password)
    await this.profilepage.confirmPasswordAdmin(admin.new_password)
    await this.profilepage.clickSaveAdmin()
  }

  async passwordCriteriaForUsers (users) {
    await this.dashboard.clickUserSettings()
    await this.passwordWithoutSymbolForUser(users)
    await this.passwordWithoutLengthForUser(users)
    await this.passwordWithCriteriaForUser(users)
    await this.dashboard.userLogOut()
  }

  async passwordWithoutSymbolForUser (user) {
    await this.profilepage.clickChangePassword()
    await this.page.waitForTimeout(2000)
    await this.profilepage.enterOldPassword(user.new_password)
    await this.profilepage.enterNewPassword(user.password_without_symbol)
    await this.profilepage.reEnterPassword(user.password_without_symbol)
    await this.profilepage.clickSave()
    await this.profilepage.verifyErrorMessageDisplayed()
    await this.profilepage.clickCancel()
  }

  async passwordWithoutLengthForUser (user) {
    await this.profilepage.clickChangePassword()
    await this.page.waitForTimeout(2000)
    await this.profilepage.enterOldPassword(user.new_password)
    await this.profilepage.enterNewPassword(user.password_without_length)
    await this.profilepage.reEnterPassword(user.password_without_length)
    await this.profilepage.clickSave()
    await this.profilepage.verifyErrorMessageDisplayed()
    await this.profilepage.clickCancel()
  }

  async passwordWithCriteriaForUser (user) {
    await this.profilepage.clickChangePassword()
    await this.page.waitForTimeout(2000)
    await this.profilepage.enterOldPassword(user.new_password)
    await this.profilepage.enterNewPassword(user.new_password_2)
    await this.profilepage.reEnterPassword(user.new_password_2)
    await this.profilepage.clickSave()
  }

  async changePasswordWithoutCriteria (user) {
    await this.dashboard.clickAdminSettings()
    await this.removePasswordAfterChangedCriteriaForAdmin(user)
  }

  async removePasswordAfterChangedCriteriaForAdmin (user) {
    await this.profilepage.clickChangePasswordAdmin()
    await this.page.waitForTimeout(2000)
    await this.profilepage.enterPasswordAdmin(user.new_password)
    await this.profilepage.enterNewPasswordAdmin(user.password)
    await this.profilepage.confirmPasswordAdmin(user.password)
    await this.profilepage.clickSaveAdmin()
  }
}
