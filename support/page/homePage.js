const { expect } = require('@playwright/test')
const { DashboardPage } = require('./dashboardPage')

exports.HomePage = class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
  }

  async enterInviteUserFirstName (name) {
    await this.page.locator("//form[@id='enterprise-register-form']//input[@id='first_name']").clear()
    await this.page.fill("//form[@id='enterprise-register-form']//input[@id='first_name']", name.first_name)
    await expect(this.page.locator("//form[@id='enterprise-register-form']//input[@id='first_name']")).toBeVisible()
  }

  async enterInviteUserLastName (name) {
    await this.page.locator("//form[@id='enterprise-register-form']//input[@id='last_name']").clear()
    await this.page.fill("//form[@id='enterprise-register-form']//input[@id='last_name']", name.last_name + ' ' + process.env.uniqueId)
    await expect(this.page.locator("//form[@id='enterprise-register-form']//input[@id='last_name']")).toBeVisible()
  }

  async enterInviteUserPassword (password) {
    await this.page.locator("//form[@id='enterprise-register-form']//input[@id='password']").clear()
    await this.page.fill("//form[@id='enterprise-register-form']//input[@id='password']", password)
    await expect(this.page.locator("//form[@id='enterprise-register-form']//input[@id='password']")).toBeVisible()
  }

  async enterInviteUserReEnterPassword (password) {
    await this.page.locator("//form[@id='enterprise-register-form']//input[@id='password2']").clear()
    await this.page.fill("//form[@id='enterprise-register-form']//input[@id='password2']", password)
    await expect(this.page.locator("//form[@id='enterprise-register-form']//input[@id='password2']")).toBeVisible()
  }

  async clickInviteRegister () {
    await this.page.click("//*[@id='enterprise-register-form']/div//button")
  }

  async clickConnexion () {
    await this.page.click("//ul/li/a[contains(text(),'Connection')]")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator('#sign-in .page-content')).toBeVisible()
  }

  async userEmail (email) {
    await this.page.locator("//form[@id='sign-in-form']//input[@name='email_or_mobile']").clear()
    await this.page.locator("//form[@id='sign-in-form']//input[@name='email_or_mobile']").pressSequentially(email, { delay: 100 })
  }

  async enterPassword (password) {
    await this.page.locator("//div[@id='sign-in']//input[@name='password']").clear()
    await this.page.locator("//div[@id='sign-in']//input[@name='password']").pressSequentially(password, { delay: 100 })
  }

  async enterEmail (email) {
    const emailId = email.user_name
    await this.page.locator("//form[@id='sign-in-form']//input[@name='email_or_mobile']").clear()
    await this.page.locator("//form[@id='sign-in-form']//input[@name='email_or_mobile']").pressSequentially(emailId, { delay: 100 })
  }

  async enterEmailLogin (email) {
    const emailId = email.first_name + email.last_name + email.domain
    await this.page.locator("//div[@id='sign-in']//input[@name='email_or_mobile']").clear()
    await this.page.locator("//form[@id='sign-in-form']//input[@name='email_or_mobile']").pressSequentially(emailId, { delay: 100 })
  }

  async clickSignIn () {
    await this.page.click("//div[@id='sign-in']//button[text()='Sign-in']")
    await this.page.waitForLoadState('load')
    await this.dashboard.verifyLogedIn()
  }

  async clickSignInButton () {
    await this.page.click("//div[@id='sign-in']//button[text()='Sign-in']")
  }

  async clickRegisterLink () {
    await this.page.click("//header[@id='header']//a[normalize-space(text())='Free trial']")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator('#register .page-content')).toBeVisible()
  }

  async enterHomeRegisterEmail (email) {
    const emailId = email.first_name + email.last_name + process.env.uniqueId + email.domain
    await this.page.locator("//form[@id='register-form']//input[@name='email_or_mobile']").clear()
    await this.page.locator("//form[@id='register-form']//input[@name='email_or_mobile']").pressSequentially(emailId, { delay: 50 })
  }

  async enterHomeRegisterInvalidEmail (email) {
    const emailId = email.first_name + email.last_name
    await this.page.locator("//form[@id='register-form']//input[@name='email_or_mobile']").clear()
    await this.page.locator("//form[@id='register-form']//input[@name='email_or_mobile']").pressSequentially(emailId)
  }

  async enterHomeRegisterPassword (password) {
    await this.page.locator("//form[@id='register-form']//input[@name='password']").clear()
    await this.page.locator("//form[@id='register-form']//input[@name='password']").pressSequentially(password, { delay: 100 })
  }

  async enterHomeRegisterPassword2 (password) {
    await this.page.locator("//form[@id='register-form']//input[@name='password2']").clear()
    await this.page.locator("//form[@id='register-form']//input[@name='password2']").pressSequentially(password, { delay: 100 })
  }

  async enterFirstName (firstName) {
    await this.page.locator('#first_name').clear()
    await this.page.locator('#first_name').pressSequentially(firstName, { delay: 100 })
  }

  async enterLastName (lastName) {
    await this.page.locator('#last_name').clear()
    await this.page.locator('#last_name').pressSequentially(lastName, { delay: 100 })
  }

  async enterEnterpriseName (enterpriseName) {
    await this.page.locator('#enterprise_name').clear()
    await this.page.locator('#enterprise_name').pressSequentially(enterpriseName + process.env.uniqueId, { delay: 100 })
  }

  async clickRegisterButton () {
    await this.page.click("//button[text()='Register']")
    await this.page.waitForLoadState()
  }

  async returnToHomepageFromSiginPage () {
    await this.page.click("//div[@id='sign-in']//a[text()='Back to home']")
  }

  async returnToHomepageFromRegisterPage () {
    await this.page.click("//form[@id='register-form']/ancestor::div[@id='register']//a[text()='Back to home']")
  }

  async enterInvalidId (email) {
    const emailId = email.invalid_datum.invalid_first_name + email.invalid_datum.invalid_last_name + email.domain
    await this.page.locator("//form[@id='sign-in-form']/div/input[@name='email_or_mobile']").clear()
    await this.page.locator("//form[@id='sign-in-form']/div/input[@name='email_or_mobile']").pressSequentially(emailId)
  }

  async enterInvalidDomains (email) {
    const emailId = email.first_name + email.last_name + email.invalid_datum.invalid_domain
    await this.page.locator("//form[@id='sign-in-form']/div/input[@name='email_or_mobile']").clear()
    await this.page.locator("//form[@id='sign-in-form']/div/input[@name='email_or_mobile']").pressSequentially(emailId)
  }

  async enterInvalidPassword (loginData) {
    await this.page.locator("//div[@id='sign-in']//input[@name='password']").clear()
    await this.page.locator("//div[@id='sign-in']//input[@name='password']").pressSequentially(loginData.invalid_datum.invalid_password)
  }

  async clickActiveUserStartButton () {
    const ele = await this.page.frameLocator('iframe').locator("//a['@href'][normalize-space(text())='click on this link']")
    const regLink = await ele.getAttribute('href')
    await this.page.goto(regLink + '')
    await this.page.waitForLoadState('load')
  }

  async verifyRegisterFailed (user) {
    const firstname = user.first_name[0].toUpperCase() + user.first_name.slice(1)
    const lastname = user.last_name[0].toUpperCase()
    await expect(this.page.locator("//p[@class='field-error']", { hasText: firstname + ' ' + lastname })).toHaveCount(0)
  }

  async verifyInactiveStatement () {
    await expect(this.page.locator("//*[contains(text(),'Your account is not active')]")).toBeVisible()
  }
}
