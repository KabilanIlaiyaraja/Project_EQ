// @ts-check
const { expect } = require('@playwright/test')
const { DashboardPage } = require('../page/dashboardPage')
const { HomePage } = require('../page/homePage')
const { ProfileAction } = require('../action/profileAction')

exports.HomeAction = class HomeAction {
  /**
    * @param {import('@playwright/test').Page} page
    */

  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
    this.home = new HomePage(this.page)
  }

  async logIn (loginData) {
    await this.page.goto('/')
    if (await this.page.locator("//ul/li/a[contains(text(),'Connection')]").isVisible()) {
      await this.loginExistingAccount(loginData)
    } else {
      await this.clickSignOut()
      await this.loginExistingAccount(loginData)
    }
  }

  async loginAsUserrand (userData) {
    await this.home.clickConnexion()
    await this.home.userEmail(userData.user_name + process.env.uniqueId + userData.domain)
    await this.home.enterPassword(userData.new_password)
    await this.home.clickSignIn()
  }

  async loginExistingAccount (loginData) {
    await this.home.clickConnexion()
    await this.home.enterEmail(loginData)
    await this.home.enterPassword(loginData.password)
    await this.home.clickSignIn()
    await this.page.context().storageState({ path: 'storeState/authUser.json' })
  }

  async logInNewPassword (loginData) {
    await this.home.clickConnexion()
    await this.home.enterEmail(loginData)
    await this.home.enterPassword(loginData.new_password)
    await this.home.clickSignIn()
  }

  async verifyUserLoggedIn (userData) {
    if (!await this.page.locator("//ul/li/a[contains(text(),'Connection')]").isVisible()) {
      const actualTxt = (await this.page.locator('div.login-holder span.name').innerText()).toString()
      const expectedTxt = userData.first_name[0].toUpperCase() + ' ' + userData.last_name[0].toUpperCase()
      if (actualTxt === expectedTxt) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  async logInUser (loginData) {
    await this.page.goto('/')
    if (await this.page.locator("//ul/li/a[contains(text(),'Connection')]").isVisible()) {
      await this.logInAsUser(loginData)
    } else {
      await this.clickSignOut()
      await this.logInAsUser(loginData)
    }
  }

  async logInUserRand (loginData) {
    await this.page.goto('/')
    if (await this.page.locator("//ul/li/a[contains(text(),'Connection')]").isVisible()) {
      await this.loginAsUserrand(loginData)
    } else {
      await this.clickSignOut()
      await this.loginAsUserrand(loginData)
    }
  }

  async logInAsUser (loginData) {
    await this.home.clickConnexion()
    await this.home.userEmail(loginData.user_name + loginData.domain)
    await this.home.enterPassword(loginData.new_password)
    await this.home.clickSignIn()
  }

  async logOut () {
    await this.dashboard.clickDashboard()
    await this.page.hover('#header span.name')
    await this.page.click("//span[normalize-space(text())='log-out']")
  }

  async userLogOut () {
    await this.page.hover('#header span.name')
    await this.page.click("//div[@class='login-slide']//a[normalize-space(text())='Log Out']")
  }

  async clickSignOut () {
    if (await this.page.locator("//ul/li/a[contains(text(),'Sign-out')]").isVisible()) {
      await this.page.click("//ul/li/a[contains(text(),'Sign-out')]")
      await expect(this.page.locator("//ul/li/a[contains(text(),'Connection')]")).toBeVisible()
    }
  }

  async loginByInvitedUsers (users) {
    this.dashboard = new DashboardPage(this.page)
    await this.home.enterInviteUserFirstName(users)
    await this.home.enterInviteUserLastName(users)
    await this.home.enterInviteUserPassword(users.new_password)
    await this.home.enterInviteUserReEnterPassword(users.new_password)
    await this.home.clickInviteRegister()
    await this.dashboard.userLogOut()
  }

  async newUserLoginChangesThePassword (linkUrls, inviteData) {
    await this.getPasswordAfterActivation(linkUrls, inviteData)
  }

  async getPasswordAfterActivation (linkUrls, inviteData) {
    this.profile = new ProfileAction(this.page)
    const username = await this.page.frameLocator('iframe').locator("//body[@id='email_base']//p[contains(text(),'Email')]//strong").innerText()
    const password = await this.page.frameLocator('iframe').locator("//body[@id='email_base']//p[contains(text(),'Password')]//strong").innerText()
    const url = linkUrls.links.v3_url
    await this.page.goto(url + '/en/?signin=true')
    await expect(this.page.locator("//div[@class='container']//nav[@class='nav-holder']")).toBeVisible()
    await this.page.click("//ul[@id='main-nav']//a[contains(text(),'Sign-out')]")
    await this.page.goto(url + '/en/?signin=true')
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//div[@id='sign-in-tab']")).toBeVisible()
    await this.page.locator("//form[@id='sign-in-form']//input[@name='email_or_mobile']").pressSequentially(username, { delay: 100 })
    await this.page.locator("//form[@id='sign-in-form']//input[@name='password']").pressSequentially(password, { delay: 100 })
    await this.page.click("//form[@id='sign-in-form']//button[@type='submit']")
    await this.page.waitForLoadState('load')
    await this.dashboard.verifyLogedIn()
    await this.dashboard.clickUserSettings()
    await this.profile.changePassword(password, inviteData.new_password)
    await this.dashboard.clickDashboard()
    await this.dashboard.userLogOut()
  }

  async homepageRegistrationAndVerify (registerData) {
    await this.page.goto('/')
    if (await this.page.locator("//header[@id='header']//a[normalize-space(text())='Free trial']").isVisible()) {
      await this.homepageRegistration(registerData)
    } else {
      await this.clickSignOut()
      await this.homepageRegistration(registerData)
    }
    await this.dashboard.verifyLoggedInAndRegistered(registerData)
  }

  async verifySuccessfulLogin (loginData) {
    await this.logInUserRand(loginData)
    await this.dashboard.verifyLoggedInAndRegistered(loginData)
  }

  async invalidEmailLogIn (loginData) {
    await this.home.clickConnexion()
    await this.home.enterInvalidId(loginData)
    await this.home.enterPassword(loginData.password)
    await this.home.clickSignInButton()
    await this.dashboard.verifyUserAreanotExist(loginData)
  }

  async invalidPasswordLogin (loginData) {
    await this.home.returnToHomepageFromSiginPage()
    await this.home.clickConnexion()
    await this.home.enterEmailLogin(loginData)
    await this.home.enterInvalidPassword(loginData)
    await this.home.clickSignInButton()
    await this.dashboard.verifyUserAreanotExist(loginData)
  }

  async invalidDomainLogin (loginData) {
    await this.home.returnToHomepageFromSiginPage()
    await this.home.clickConnexion()
    await this.home.enterInvalidDomains(loginData)
    await this.home.enterPassword(loginData.password)
    await this.home.clickSignInButton()
    await this.dashboard.verifyUserAreanotExist(loginData)
  }

  async invalidDataLogIn (loginData) {
    await this.home.returnToHomepageFromSiginPage()
    await this.home.clickConnexion()
    await this.home.enterInvalidDomains(loginData)
    await this.home.enterInvalidPassword(loginData)
    await this.home.clickSignInButton()
    await this.dashboard.verifyUserAreanotExist(loginData)
  }

  async homepageRegistration (registerData) {
    await this.home.clickRegisterLink()
    await this.home.enterHomeRegisterEmail(registerData)
    await this.home.enterFirstName(registerData.first_name)
    await this.home.enterLastName(registerData.last_name)
    await this.home.enterHomeRegisterPassword(registerData.password)
    await this.home.enterHomeRegisterPassword2(registerData.password)
    await this.home.enterEnterpriseName(registerData.enterprise)
    await this.home.clickRegisterButton()
  }

  async homepageRegistrationWithoutEmail (registerData) {
    await this.home.clickRegisterLink()
    await this.home.enterFirstName(registerData.first_name)
    await this.home.enterLastName(registerData.last_name)
    await this.home.enterHomeRegisterPassword(registerData.password)
    await this.home.enterHomeRegisterPassword2(registerData.password)
    await this.home.enterEnterpriseName(registerData.enterprise)
    await this.home.clickRegisterButton()
    await this.dashboard.verifyUserAreanotExist(registerData)
  }

  async homepageRegistrationWithoutFirstName (registerData) {
    await this.home.returnToHomepageFromRegisterPage()
    await this.home.clickRegisterLink()
    await this.home.enterHomeRegisterEmail(registerData)
    await this.home.enterLastName(registerData.last_name)
    await this.home.enterHomeRegisterPassword(registerData.password)
    await this.home.enterHomeRegisterPassword2(registerData.password)
    await this.home.enterEnterpriseName(registerData.enterprise)
    await this.home.clickRegisterButton()
    await this.dashboard.verifyUserAreanotExist(registerData)
  }

  async homepageRegistrationWithoutLastName (registerData) {
    await this.home.returnToHomepageFromRegisterPage()
    await this.home.clickRegisterLink()
    await this.home.enterHomeRegisterEmail(registerData)
    await this.home.enterFirstName(registerData.first_name)
    await this.home.enterHomeRegisterPassword(registerData.password)
    await this.home.enterHomeRegisterPassword2(registerData.password)
    await this.home.enterEnterpriseName(registerData.enterprise)
    await this.home.clickRegisterButton()
    await this.dashboard.verifyUserAreanotExist(registerData)
  }

  async homepageRegistrationWithoutPassword (registerData) {
    await this.home.returnToHomepageFromRegisterPage()
    await this.home.clickRegisterLink()
    await this.home.enterHomeRegisterEmail(registerData)
    await this.home.enterFirstName(registerData.first_name)
    await this.home.enterLastName(registerData.last_name)
    await this.home.enterHomeRegisterPassword2(registerData.password)
    await this.home.enterEnterpriseName(registerData.enterprise)
    await this.home.clickRegisterButton()
    await this.dashboard.verifyUserAreanotExist(registerData)
  }

  async homepageRegistrationWithoutConfirmPassword (registerData) {
    await this.home.returnToHomepageFromRegisterPage()
    await this.home.clickRegisterLink()
    await this.home.enterHomeRegisterEmail(registerData)
    await this.home.enterFirstName(registerData.first_name)
    await this.home.enterLastName(registerData.last_name)
    await this.home.enterHomeRegisterPassword(registerData.password)
    await this.home.enterEnterpriseName(registerData.enterprise)
    await this.home.clickRegisterButton()
    await this.dashboard.verifyUserAreanotExist(registerData)
  }

  async homepageRegistrationWithoutEnterprise (registerData) {
    await this.home.returnToHomepageFromRegisterPage()
    await this.home.clickRegisterLink()
    await this.home.enterHomeRegisterEmail(registerData)
    await this.home.enterFirstName(registerData.first_name)
    await this.home.enterLastName(registerData.last_name)
    await this.home.enterHomeRegisterPassword(registerData.password)
    await this.home.enterHomeRegisterPassword2(registerData.password)
    await this.home.clickRegisterButton()
    await this.dashboard.verifyUserAreanotExist(registerData)
  }

  async homepageRegistrationWithInvalidEmail (registerData) {
    await this.home.returnToHomepageFromRegisterPage()
    await this.home.clickRegisterLink()
    await this.home.enterHomeRegisterInvalidEmail(registerData)
    await this.home.enterFirstName(registerData.first_name)
    await this.home.enterLastName(registerData.last_name)
    await this.home.enterHomeRegisterPassword(registerData.password)
    await this.home.enterHomeRegisterPassword2(registerData.password)
    await this.home.enterEnterpriseName(registerData.enterprise)
    await this.home.clickRegisterButton()
    await this.dashboard.verifyUserAreanotExist(registerData)
  }

  async homepageRegistrationWithInvalidConfirmPassword (registerData) {
    await this.home.returnToHomepageFromRegisterPage()
    await this.home.clickRegisterLink()
    await this.home.enterHomeRegisterEmail(registerData)
    await this.home.enterFirstName(registerData.first_name)
    await this.home.enterLastName(registerData.last_name)
    await this.home.enterHomeRegisterPassword(registerData.password)
    await this.home.enterHomeRegisterPassword2(registerData.password + registerData.password)
    await this.home.enterEnterpriseName(registerData.enterprise)
    await this.home.clickRegisterButton()
    await this.dashboard.verifyUserAreanotExist(registerData)
  }

  async homepageRegistrationWithExistingUserAndVerifyUnsuccessful (registerData) {
    await this.home.returnToHomepageFromRegisterPage()
    await this.homepageRegistration(registerData)
    await this.dashboard.verifyUserAreanotExist(registerData)
  }

  async enterUserRegisterPasswordWithoutSymbol (inviteData) {
    await this.page.waitForLoadState('load')
    await this.home.enterInviteUserFirstName(inviteData)
    await this.home.enterInviteUserLastName(inviteData)
    await this.home.enterInviteUserPassword(inviteData.password_without_symbol)
    await this.home.enterInviteUserReEnterPassword(inviteData.password_without_symbol)
    await this.home.clickInviteRegister()
    await this.home.verifyRegisterFailed(inviteData)
  }

  async enterUserRegisterPasswordWithoutLength (inviteData) {
    await this.page.waitForLoadState('load')
    await this.home.enterInviteUserFirstName(inviteData)
    await this.home.enterInviteUserLastName(inviteData)
    await this.home.enterInviteUserPassword(inviteData.password_without_length)
    await this.home.enterInviteUserReEnterPassword(inviteData.password_without_length)
    await this.home.clickInviteRegister()
    await this.home.verifyRegisterFailed(inviteData)
  }

  async enterUserRegisterPasswordWithCriteria (inviteData) {
    await this.page.waitForLoadState('load')
    await this.home.enterInviteUserFirstName(inviteData)
    await this.home.enterInviteUserLastName(inviteData)
    await this.home.enterInviteUserPassword(inviteData.new_password)
    await this.home.enterInviteUserReEnterPassword(inviteData.new_password)
    await this.home.clickInviteRegister()
    await this.dashboard.verifyLoggedInAndRegistered(inviteData)
  }

  async verifyDeactivation (inviteData) {
    await this.logInDeactivateUser(inviteData)
    await this.home.verifyInactiveStatement()
  }

  async logInDeactivateUser (userData) {
    await this.page.goto('/')
    await this.clickSignOut()
    await this.home.clickConnexion()
    await this.home.userEmail(userData.user_name + process.env.uniqueId + userData.domain)
    await this.home.enterPassword(userData.new_password)
    await this.home.clickSignInButton()
  }
}
