const { expect } = require('@playwright/test')
const { DashboardPage } = require('./dashboardPage')

exports.ProfilePage = class ProfilePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
  }

  async clickChangePassword () {
    await this.page.click("//div[@id='standard-toolbar']//a[@data-target='#change-password-modal']")
    await expect(this.page.locator('.modal-dialog .modal-header', { hasText: 'Change your password' })).toBeVisible()
  }

  async clickChangePasswordAdmin () {
    await this.page.click("//button[@title='Modify my password']")
  }

  async enterOldPassword (oldPassword) {
    await expect(this.page.locator("//form[@id='change-password-form']//input[@name='old_password']")).toBeVisible()
    await this.page.locator("//form[@id='change-password-form']//input[@name='old_password']").clear()
    await this.page.locator("//form[@id='change-password-form']//input[@name='old_password']").pressSequentially(oldPassword, { delay: 100 })
  }

  async enterNewPassword (newPassword) {
    await expect(this.page.locator("//form[@id='change-password-form']//input[@name='password']")).toBeVisible()
    await this.page.locator("//form[@id='change-password-form']//input[@name='password']").clear()
    await this.page.locator("//form[@id='change-password-form']//input[@name='password']").pressSequentially(newPassword, { delay: 100 })
  }

  async reEnterPassword (newPassword) {
    await expect(this.page.locator("//form[@id='change-password-form']//input[@id='password2']")).toBeVisible()
    await this.page.locator("//form[@id='change-password-form']//input[@id='password2']").clear()
    await this.page.locator("//form[@id='change-password-form']//input[@id='password2']").pressSequentially(newPassword, { delay: 100 })
  }

  async clickSave () {
    await this.page.click("(//*[@class='fa fa-check'])[1]")
  }

  async clickEditProfile () {
    await this.page.click("//a[@href='/user/settings/edit']")
  }

  async clickEditAdminProfile () {
    await this.page.click("//a[contains(@href,'/admin/settings/edit')]")
  }

  async editCity (editData) {
    await this.page.locator('#city').clear()
    await this.page.locator('#city').pressSequentially(editData.city)
  }

  async editZip (editData) {
    await this.page.locator('#zip').clear()
    await this.page.locator('#zip').pressSequentially(editData.zip_code)
  }

  async editCityAdmin (city) {
    await this.page.locator("//div[contains(@class,'city')]//input").clear()
    await this.page.locator("//div[contains(@class,'city')]//input").pressSequentially(city.city)
  }

  async editZipAdmin (code) {
    await this.page.locator("//div[contains(@class,'zip')]//input").clear()
    await this.page.locator("//div[contains(@class,'zip')]//input").pressSequentially(code.zip_code)
  }

  async clickSaveUser () {
    await this.page.click("//button[@class='btn btn-primary']")
    await expect(this.page.locator("//div[@class='main-title']/h1[contains(text(),'My profile')]")).toBeVisible()
  }

  async clickSaveAdmin () {
    await this.page.click("//span[contains(text(),'save')]/parent::button[@class='xq-button primary']")
    await expect(this.page.locator("//div[@class='main-title']//h1[text()='My profile']")).toBeVisible()
  }

  async enterPasswordAdmin (oldPassword) {
    await this.page.locator("//div//input[@name='pwd-password']").clear()
    await this.page.locator("//div//input[@name='pwd-password']").pressSequentially(oldPassword, { delay: 100 })
  }

  async enterNewPasswordAdmin (newPassword) {
    await this.page.locator("//div//input[@name='pwd-new-password']").clear()
    await this.page.locator("//div//input[@name='pwd-new-password']").pressSequentially(newPassword, { delay: 100 })
  }

  async confirmPasswordAdmin (newPassword) {
    await this.page.locator("//div//input[@name='pwd-confirm-password']").clear()
    await this.page.locator("//div//input[@name='pwd-confirm-password']").pressSequentially(newPassword, { delay: 100 })
  }

  async clickCancelAdmin () {
    await this.page.click("//button[@class='xq-button secondary']//span[normalize-space(text())='cancel']")
  }

  async verifyErrorMessageDisplayedAdmin () {
    await expect(this.page.locator("//div//input[@name='pwd-new-password']//following::div//ul//li[contains(text(),'Passwords')]")).toBeVisible()
  }

  async verifyErrorMessageDisplayed () {
    await expect(this.page.locator("//label[normalize-space(text())='New password']/following-sibling::p[@class='field-error']")).toBeVisible()
  }

  async clickCancel () {
    await this.page.click('#change-password-cancel-btn')
  }

  async editData (user) {
    const editData = user.edit_user
    await this.editFirstName(editData)
    await this.editLastMame(editData)
    await this.clickSave()
  }

  async editFirstName (firstName) {
    if (firstName.first_name !== null && firstName.first_name !== '') {
      await this.page.locator("//div[contains(@class,'firstname')]//input").clear()
      await this.page.locator("//div[contains(@class,'firstname')]//input").pressSequentially(firstName.first_name)
    }
  }

  async editLastMame (lastName) {
    if (lastName.last_name !== null && lastName.last_name !== '') {
      await this.page.locator("//div[contains(@class,'lastname')]//input").clear()
      await this.page.locator("//div[contains(@class,'lastname')]//input").pressSequentially(lastName.last_name)
    }
  }
}
