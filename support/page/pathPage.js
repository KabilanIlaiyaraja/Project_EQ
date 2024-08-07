// @ts-check
const { expect } = require('@playwright/test')
const { DashboardPage } = require('../page/dashboardPage')

exports.PathPage = class PathPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
  }

  async clickNewPathButton () {
    await this.page.click("//a[contains(@href,'/learning_paths/create')]")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//form//div[@class='parameters-form-section']")).toBeVisible()
  }

  async enterPathName (name) {
    await this.page.locator("//input[@input-id='name-form-group']").clear()
    await this.page.locator("//input[@input-id='name-form-group']").pressSequentially(name.path_name + ' ' + process.env.uniqueId)
  }

  async enterNewPathName (name) {
    await this.page.locator("//input[@input-id='name-form-group']").clear()
    await this.page.locator("//input[@input-id='name-form-group']").pressSequentially(name.edit_path_name + ' ' + process.env.uniqueId)
  }

  async clickAuthorNameField () {
    await this.page.click("//input[@id='author-form-group']")
  }

  async selectAuthorName (author) {
    await this.page.click("//span[@class='username'][normalize-space(text())='" + author.last_name.toUpperCase() + ' ' + author.first_name[0].toUpperCase() + author.first_name.slice(1) + "']")
  }

  async clickSave () {
    await this.page.click("//button//span[@class='fa fa-check']")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//ul//li[contains(text(),'Learning Path')][contains(text(),'successfully')]")).toBeVisible()
    await this.page.locator("//ul//li[contains(text(),'Learning Path')][contains(text(),'successfully')]").waitFor({ state: 'hidden' })
  }

  async verifyPathCreated (pathName) {
    this.dashboard = new DashboardPage(this.page)
    await this.dashboard.clickPath()
    await this.page.reload({ waitUntil: 'load' })
    await expect(this.page.locator("//*[contains(@class,'learning-path-name')][normalize-space(.)='" + pathName.path_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async clickDeletePath (path) {
    await this.page.click("//*[contains(@class,'learning-path-name')][normalize-space(.)='" + path.path_name + ' ' + process.env.uniqueId + "']//following-sibling::div//li[@title='Delete learning path']")
  }

  async clickDeleteDuplicatePath (path) {
    await this.page.click("//*[contains(@class,'learning-path-name')][normalize-space(.)='" + path.path_name + ' ' + process.env.uniqueId + ' ' + "(1)']//following-sibling::div//li[@title='Delete learning path']")
  }

  async clickDeleteEditedPath (path) {
    await this.page.click("//*[contains(@class,'learning-path-name')][normalize-space(.)='" + path.edit_path_name + ' ' + process.env.uniqueId + "']//following-sibling::div//li[@title='Delete learning path']")
  }

  async confirmDelete (path) {
    await this.page.click("//*[contains(text(),'" + path.path_name + ' ' + process.env.uniqueId + "')]//ancestor::div//div//button[@class='xq-button danger']")
  }

  async confirmDeleteEditedPath (path) {
    await this.page.click("//*[contains(text(),'" + path.edit_path_name + ' ' + process.env.uniqueId + "')]//ancestor::div//div//button[@class='xq-button danger']")
  }

  async verifyPathDeleted (pathName) {
    await expect(this.page.locator("//*[contains(@class,'learning-path-name')][normalize-space(.)='" + pathName.path_name + ' ' + process.env.uniqueId + "']")).not.toBeVisible()
  }

  async verifyPathEdited (pathName) {
    this.dashboard = new DashboardPage(this.page)
    await this.dashboard.clickPath()
    await expect(this.page.locator("//*[contains(@class,'learning-path-name')][normalize-space(.)='" + pathName.edit_path_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async duplicatePath (path) {
    await this.page.click("//*[contains(@class,'learning-path-name')][normalize-space(.)='" + path.path_name + ' ' + process.env.uniqueId + "']//following-sibling::div//li[@title='Duplicate']")
  }

  async verifyDuplicatedPath (pathName) {
    await this.dashboard.clickPath()
    await expect(this.page.locator("//*[contains(@class,'learning-path-name')][normalize-space(.)='" + pathName.path_name + ' ' + process.env.uniqueId + " (1)']")).toBeVisible()
  }

  async openPath (pathName) {
    await this.page.click("//*[contains(@class,'learning-path-name')][normalize-space(.)='" + pathName.path_name + ' ' + process.env.uniqueId + "']")
    await this.dashboard.waiting()
    await expect(this.page.locator("//div[@class='learningPath-overview-container']")).toBeVisible()
    await this.page.waitForTimeout(2000)
  }

  async openEditedPath (pathName) {
    await this.page.click("//*[contains(@class,'learning-path-name')][normalize-space(.)='" + pathName.edit_path_name + ' ' + process.env.uniqueId + "']")
    await this.dashboard.waiting()
    await expect(this.page.locator("//div[@class='learningPath-overview-container']")).toBeVisible()
    await this.page.waitForTimeout(2000)
  }

  async clickModule () {
    await this.page.click("//a[contains(@href,'/learning_path/')][text()='Modules']")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//section[@id='available-modules-bloc']")).toBeVisible()
    await this.page.reload({ waitUntil: 'load' })
  }

  async selectModules (name) {
    await this.page.locator("//div[contains(text(),'" + name + ' ' + process.env.uniqueId + "')]//parent::div[contains(@class,'module-line')]").dragTo(this.page.locator("//*[@id='selected-modules']"))
    await expect(this.page.locator("//div[@id='selected-modules']//div[contains(@class,'module-line')]//div[contains(text(),'" + name + ' ' + process.env.uniqueId + "')]")).toBeVisible()
  }

  async saveModule () {
    await this.page.click('#save-and-quit')
  }

  async clickInvite () {
    await this.page.click("//a[normalize-space()='Invitations']")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//form[@id='invite-form']")).toBeVisible()
    await this.page.waitForTimeout(2000)
  }

  async ClickPathheader () {
    await this.page.click('//div//h1')
  }

  async clickResults () {
    await this.page.click("//a[contains(@href,'/learning_path/')][text()='Results']")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//div[contains(@class,'path-results-page')]")).toBeVisible()
  }

  async clickEdit () {
    await this.page.click("//a[contains(@href,'/edit')]")
  }

  async clickDetails () {
    await this.page.click("//a[contains(@title,'Open detail ')]")
    await expect(this.page.locator("//div[contains(@class,'evaluation-item-detail-page')]")).toBeVisible()
  }

  async verifyModuleNotPassed (modulename) {
    await expect(this.page.locator("//*[contains(text(),'" + modulename.module_name + ' ' + process.env.uniqueId + "')]/parent::div/following-sibling::div/ul//i[@title='Module not passed']")).toBeTruthy()
  }
}
