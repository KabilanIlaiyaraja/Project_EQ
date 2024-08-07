const { expect } = require('@playwright/test')

exports.DashboardPage = class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
  }

  async hoverOnHeader () {
    await this.page.click("//div[@class='main-title']")
  }

  async clickDashboard () {
    await this.page.click("//nav[@id='nav-main']//span[contains(text(),'Dashboard')]")
    await this.hoverOnHeader()
    await expect(this.page.locator("//div[contains(@id,'dashboard-page')]")).toBeVisible()
    await this.waiting()
  }

  async clickBases () {
    await this.page.click("//nav[@id='nav-main']//span[normalize-space(text())='Bases']")
    await this.page.waitForLoadState('load')
    await this.hoverOnHeader()
    await expect(this.page.locator("//h1[normalize-space() ='Bases']")).toBeVisible()
    await this.waiting()
  }

  async clickQuestionnaire () {
    await this.page.click("//nav[@id='nav-main']//span[contains(text(),'Questionnaires')]")
    await this.page.waitForLoadState('load')
    await this.hoverOnHeader()
    await expect(this.page.locator("//div[contains(@class,'questionnaires-page')]")).toBeVisible()
    await this.waiting()
  }

  async clickQuestions () {
    await this.page.click("//nav[@id='nav-main']//span[contains(text(),'Questions')]")
    await this.page.waitForLoadState('load')
    await this.hoverOnHeader()
    await expect(this.page.locator("//h1[normalize-space()='Questions']")).toBeVisible()
    await this.waiting()
  }

  async clickMedia () {
    await this.page.click("//nav[@id='nav-main']//span[normalize-space(text())='Medias']")
    await this.page.waitForLoadState('load')
    await this.hoverOnHeader()
    await expect(this.page.locator("//h1[normalize-space()='Medias']")).toBeVisible()
    await this.waiting()
  }

  async clickUsers () {
    await this.page.click("//nav[@id='nav-main']//span[normalize-space(text())='Users']")
    await this.page.waitForLoadState('load')
    await this.hoverOnHeader()
    await expect(this.page.locator("//div[@id='users-table']")).toBeVisible()
    await this.waiting()
  }

  async clickEnterprise () {
    await this.page.click("//nav[@id='nav-main']//span[normalize-space(text())='Settings']")
    await this.page.waitForLoadState('load')
    await this.page.click("//div[@class='flex-head']")
    await expect(this.page.locator("//h1[normalize-space()='Settings']")).toBeVisible()
    await this.waiting()
  }

  async clickTraining () {
    await this.page.click("//nav[@id='nav-main']//span[normalize-space(text())='Trainings']")
    await this.page.waitForLoadState('load')
    await this.hoverOnHeader()
    await expect(this.page.locator("//h1[normalize-space()='Trainings']")).toBeVisible()
    await this.waiting()
  }

  async clickModules () {
    await this.page.click("//nav[@id='nav-main']//span[normalize-space(text())='Modules']")
    await this.page.waitForLoadState('load')
    await this.hoverOnHeader()
    await expect(this.page.locator("//h1[normalize-space()='Modules']")).toBeVisible()
    await this.waiting()
  }

  async clickForms () {
    await this.page.click("//nav[@id='nav-main']//span[normalize-space(text())='Surveys']")
    await this.hoverOnHeader()
    await expect(this.page.locator("//h1[normalize-space()='Surveys']")).toBeVisible()
    await this.waiting()
  }

  async clickPath () {
    await this.page.click("//nav[@id='nav-main']//a[@href='/v4/admin/learning_paths']")
    await this.page.waitForLoadState('load')
    await this.hoverOnHeader()
    await expect(this.page.locator("//h1[normalize-space()='Learning paths']")).toBeVisible()
    await this.waiting()
  }

  async clickCycles () {
    await this.page.click("//nav[@id='nav-main']//span[normalize-space(text())='Cycles']")
    await this.page.waitForLoadState('load')
    await this.hoverOnHeader()
    await expect(this.page.locator("//h1[normalize-space()='Cycles']")).toBeVisible()
    await this.waiting()
  }

  async clickEvaluations () {
    await this.page.click("//nav[@id='nav-main']//span[normalize-space(text())='Results']")
    await this.page.waitForLoadState('load')
    await this.hoverOnHeader()
    await this.waiting()
  }

  async changeToAdmin () {
    await this.clickDashboard()
    await this.page.hover('#header span.name')
    await this.page.click("//a[normalize-space(text())='Admin view']")
  }

  async changeToUser () {
    await this.clickDashboard()
    await this.page.hover('#header span.name')
    await this.page.hover("//div[@class='login-slide']/ul/li/a[@href='/user/dashboard']")
    await this.page.click("(//li/a[@href='/user/dashboard'])[1]")
  }

  async clickBattle () {
    await this.page.click("//nav[@id='nav-main']//span[normalize-space(text())='My battles']")
    await this.hoverOnHeader()
  }

  async clickCertificates () {
    await this.page.click("//nav[@id='nav-main']//span[normalize-space(text())='Certificates']")
    await this.hoverOnHeader()
  }

  async clickUsersCertificate () {
    await this.page.click("//*[@href='/user/certificates/view']")
    await this.hoverOnHeader()
  }

  async userLogOut () {
    await this.page.hover('#header span.name')
    if (await this.page.locator("//div[@class='login-slide']//a[normalize-space(text())='Log Out']").isVisible()) {
      await this.page.click("//div[@class='login-slide']//a[normalize-space(text())='Log Out']")
    } else {
      await this.page.hover('#header span.name')
      await this.page.click("//div[@class='login-slide']//a[normalize-space(text())='Log Out']")
    }
  }

  async logOut () {
    await this.clickDashboard()
    await this.page.hover('#header span.name')
    await this.page.click("//span[normalize-space(text())='log-out']")
  }

  async battleEvaluation (battle) {
    const length = 1 + 1
    const total = length
    await expect(this.page.locator("//a[contains(text(),'" + battle.questionnaire_name + ' ' + process.env.uniqueId + "')]/ancestor::div//strong[contains(text(),'" + total + '/' + total + "')]")).toBeVisible()
  }

  async clickUserSettings () {
    await this.page.hover('#header span.name')
    await this.page.hover("//div[@class='login-slide']/ul/li/a[@href='/user/settings']")
    await this.page.click("(//li/a[@href='/user/settings'])[1]")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//div[@id='user-settings-view-page']")).toBeVisible()
  }

  async clickAdminSettings () {
    await this.page.hover('#header span.name')
    await this.page.hover("//div[@class='login-slide']/ul/li/a[@href='/v4/admin/settings']")
    await this.page.click("//li/a[@href='/v4/admin/settings']")
    await expect(this.page.locator("//div[@class='user-settings-view']")).toBeVisible()
  }

  async verifyLoggedInAndRegistered (user) {
    const firstname = user.first_name[0].toUpperCase() + user.first_name.slice(1)
    const lastname = user.last_name[0].toUpperCase() + user.last_name.slice(1)
    await expect(this.page.locator('#header span.name', { hasText: firstname + ' ' + lastname })).toBeVisible()
  }

  async verifyUserAreaExist (user) {
    const firstname = user.first_name[0].toUpperCase() + user.first_name.slice(1)
    const lastname = user.last_name[0].toUpperCase() + user.last_name.slice(1)
    await expect(this.page.locator('#header span.name', { hasText: firstname + ' ' + process.env.uniqueId + ' ' + lastname })).toBeVisible()
  }

  async verifyUserAreanotExist (user) {
    const firstname = user.first_name[0].toUpperCase() + user.first_name.slice(1)
    const lastname = user.last_name[0].toUpperCase() + user.last_name.slice(1)
    await expect(this.page.locator('#header span.name', { hasText: firstname + ' ' + process.env.uniqueId + ' ' + lastname })).not.toBeVisible()
  }

  async verifyLogedIn () {
    await expect(this.page.locator("//div[contains(@class,'login-area')]")).toBeVisible()
  }

  async verifyNoQuestionnaireInvitationOnUserDashboardPage (base, questionnaire) {
    await expect(this.page.locator("//div[@title='" + base.base_name + ' ' + process.env.uniqueId + "']/ancestor::div//following-sibling::div//div[normalize-space(text())='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']")).toHaveCount(0)
  }

  async clickQuestionnaireInvitationOnUserDashboardPage (questionnaire) {
    await this.page.click("//div[normalize-space(text())='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']")
  }

  async clickFormInvitationOnUserDashboardPage (form) {
    await this.page.click("//div[normalize-space(text())='" + form.form_name + ' ' + process.env.uniqueId + "']")
  }

  async clickMyMediaByUser () {
    await this.page.click("//nav[@id='nav-main']//i[@class='icon icon-fichiers']")
  }

  async clickMyModulesByUser () {
    await this.page.click("//div[@class='nav-wrapper']//span[normalize-space(text())='My modules']")
    await this.page.waitForLoadState('load')
  }

  async clickMyCertificatesByUser () {
    await this.page.click("//div[@class='nav-wrapper']//span[normalize-space(text())='My certificates']")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//div[@id='list-of-evaluations-page']")).toBeVisible()
  }

  async deleteAccount () {
    await this.verifyLogedIn()
    await this.page.goto('/ai1fu4hori2bu8iw/enterprise/delete/all/delete')
  }

  async clickMySurveyMenuOnUserSide () {
    await this.page.click("//a[@href='/user/surveys/list']")
  }

  async clickMyQuestions () {
    await this.page.click("//nav[@id='nav-main']//span[normalize-space(text())='My questions']")
    await this.hoverOnHeader()
  }

  async clickInvitePath (moduleData) {
    await this.page.click("//*[@title='" + moduleData.module_name + ' ' + process.env.uniqueId + "']")
  }

  async clickModuleInvites (moduleData) {
    await expect(this.page.locator("//a[contains(@href,'/user/module/')]//*[@title='" + moduleData.module_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
    await this.page.click("//a[contains(@href,'/user/module/')]//*[@title='" + moduleData.module_name + ' ' + process.env.uniqueId + "']")
  }

  async clickAvailableModule (moduleData) {
    await this.page.click("//a[contains(@href,'/module/free')]//*[contains(@title,'" + moduleData.module_name + ' ' + process.env.uniqueId + "')]")
  }

  async verifyArchivedModuleVisibilityIsNotShownOnFreeSection (moduleData) {
    await expect(this.page.locator("//a[contains(@href,'/module/free')]//*[@title='" + moduleData.module_name + ' ' + process.env.uniqueId + "']")).not.toBeVisible()
  }

  async clickPlayAvailableQuestionnaire (questionnaire) {
    try {
      await expect(this.page.locator("//div[@class='new-play-card-wrapper']//div[contains(@class,'wrapper')]//div[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]")).toBeVisible()
      await this.page.click("//div[@class='new-play-card-wrapper']//div[contains(@class,'wrapper')]//div[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]")
    } catch (error) {
      await this.page.reload({ waitUntil: 'load' })
      await expect(this.page.locator("//div[@class='new-play-card-wrapper']//div[contains(@class,'wrapper')]//div[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]")).toBeVisible()
      await this.page.click("//div[@class='new-play-card-wrapper']//div[contains(@class,'wrapper')]//div[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]")
    }
  }

  async clickPlayInvitedQuestionnaire (questionnaire) {
    try {
      await expect(this.page.locator("//div[@class='new-play-card-wrapper']//div[normalize-space(text())='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
      await this.page.click("//div[@class='new-play-card-wrapper']//div[normalize-space(text())='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']")
    } catch (error) {
      await this.page.reload({ waitUntil: 'load' })
      await expect(this.page.locator("//div[@class='new-play-card-wrapper']//div[normalize-space(text())='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
      await this.page.click("//div[@class='new-play-card-wrapper']//div[normalize-space(text())='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']")
    }
  }

  async waiting () {
    if (await this.page.locator("//div[@class='waiting-wrapper full-page']//div[@class='waiting']").isVisible()) {
      await this.page.locator("//div[@class='waiting-wrapper full-page']//div[@class='waiting']").waitFor({ state: 'hidden' })
    }
  }
}
