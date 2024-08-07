const { expect } = require('@playwright/test')
const { DashboardPage } = require('./dashboardPage')

exports.BattlePage = class BattlePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
  }

  async clickFolderFilter () {
    await this.page.click('#topic-filter-button')
  }

  async selectFolder (baseName) {
    await this.page.click("//div[@role='option'][contains(text(),'" + baseName.base_name + ' ' + process.env.uniqueId + "')]")
  }

  async clickNewBattle () {
    await expect(this.page.locator('#new-battle-btn')).toBeVisible()
    await this.page.click('#new-battle-btn')
  }

  async clickQuestionnaireFilter () {
    await this.page.click('#questionnaire-button')
  }

  async selectQuestionnaireList (questionnaireName) {
    await this.page.click("//div[@role='option'][contains(text(),'" + questionnaireName.questionnaire_name + ' ' + process.env.uniqueId + "')]")
  }

  async enableDebrief () {
    await this.page.click("//label[@for='with_debrief']/span[contains(text(),'Yes')]")
  }

  async clickSelectEmployeesButton () {
    await this.page.click('#select-employees-btn')
  }

  async particularUser (user) {
    await this.page.click("//span[@class='username'][contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/parent::div/following-sibling::div//a[@class='to-right-btn']")
  }

  async saveUsers () {
    await this.page.click("//a[contains(@class,'save-btn')]")
  }

  async clickSave () {
    await this.page.click("//button[contains(@class,'btn btn-primary')]")
  }

  async verifyBattleCreated (users, questionnaire) {
    const length = 1 + 1
    const total = length
    await expect(this.page.locator("//a[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='cell title']/following-sibling::div//strong[contains(text(),'0/" + total + "')]")).toBeVisible()
  }

  async verifyBattleDeleted (questionnaire) {
    await expect(this.page.locator("//a[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]")).not.toBeVisible()
  }

  async clickPlayBattle (questionnaire) {
    await this.page.click("//a[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='cell title']/following-sibling::div//a[contains(@href,'/battle/play')]")
  }

  async deletePlayedBattle (questionnaire) {
    await this.page.click("//a[normalize-space(text())='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']/ancestor::div[@class='cell title']/following-sibling::div//a[@title='Delete']")
  }

  async clickConfirmDeleteBattle () {
    await this.page.click("//div[@class='btn-toolbar']//a[normalize-space(text())='Delete']")
  }

  async selectAdmin (admin) {
    await this.page.click("//span[@class='username'][contains(text(),'" + admin.last_name.toUpperCase() + ' ' + admin.first_name[0].toUpperCase() + admin.first_name.slice(1) + "')]/parent::div/following-sibling::div//a[@class='to-right-btn']")
  }
}
