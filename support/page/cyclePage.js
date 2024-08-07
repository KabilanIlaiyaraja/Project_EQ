const { expect } = require('@playwright/test')
const dayjs = require('dayjs')

exports.CyclePage = class CyclePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
  }

  async clickNewCycleButton () {
    await this.page.click("//a[contains(@href,'/cycles/create')]")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//form[@id='cycle-form']")).toBeVisible()
  }

  async enterCycleName (cycle) {
    await this.page.locator('#cycle_name').clear()
    await this.page.fill('#cycle_name', cycle.cycle_name + ' ' + process.env.uniqueId)
  }

  async enterDescription (cycle) {
    await this.page.locator('#description').clear()
    await this.page.fill('#description', cycle.description)
  }

  async clickSave () {
    await this.page.click("//*[contains(@class,'btn btn-primary')]")
    await this.page.waitForLoadState('load')
  }

  async verifyCycleCreated (cycle) {
    await expect(this.page.locator("//a[@class='cell link name'][normalize-space()='" + cycle.cycle_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async editCycleButton () {
    await this.page.click("//a[contains(@href,'/edit')]")
  }

  async openCycle (cycle) {
    await this.page.click("//a[normalize-space()='" + cycle.cycle_name + ' ' + process.env.uniqueId + "']")
  }

  async clickSteps () {
    await this.page.click("//a[contains(@href,'/items')]")
  }

  async clickInvitation () {
    await this.page.click("//a[contains(@href,'/invite')]")
  }

  async clickUsers () {
    await this.page.click("//a[contains(@href,'/users')][contains(@href,'/cycle')]")
  }

  async uncheckAllDays (base, questionnaire) {
    await expect(this.page.locator("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//ul/li[@title='Monday'][@class='checked']")).toBeVisible()
    await this.page.click("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//ul/li[@title='Monday'][@class='checked']")
    await expect(this.page.locator("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//ul/li[@title='Tuesday'][@class='checked']")).toBeVisible()
    await this.page.click("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//ul/li[@title='Tuesday'][@class='checked']")
    await expect(this.page.locator("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//ul/li[@title='Wednesday'][@class='checked']")).toBeVisible()
    await this.page.click("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//ul/li[@title='Wednesday'][@class='checked']")
    await expect(this.page.locator("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//ul/li[@title='Thursday'][@class='checked']")).toBeVisible()
    await this.page.click("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//ul/li[@title='Thursday'][@class='checked']")
    await expect(this.page.locator("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//ul/li[@title='Friday'][@class='checked']")).toBeVisible()
    await this.page.click("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//ul/li[@title='Friday'][@class='checked']")
  }

  async selectQuestionnaireOnCycle (base, questionnaire) {
    await this.page.click("//div[@id='available-items']//span[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(text(),'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//a[contains(@title,'questionnaire to the cycle')]")
  }

  async selectFormOnCycle (form) {
    await this.page.click("//div[@id='available-items']//span[contains(text(),'" + form.form_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//a[contains(@title,'Add this survey to the cycle')]")
  }

  async selectDay (base, questionnaire) {
    const day = dayjs().format('dddd')
    await this.page.click("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + "')]/following-sibling::span[contains(.,'" + base.base_name + "')]/ancestor::div[@class='title-row']/following-sibling::div//ul/li[@title='" + day + "']")
  }

  async setRepeat (base, questionnaire) {
    await this.page.click("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//div/input[@name='repeat']/following-sibling::i[@class='up fa fa-angle-up']")
  }

  async setDelay (base, questionnaire) {
    await this.page.locator("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//div/input[@name='delta_days']").clear()
    await this.page.fill("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//div/input[@name='delta_days']", '0')
  }

  async setDelayOnForm (form) {
    await this.page.locator("//div[@id='selected-items']//span[contains(.,'" + form.form_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//div/input[@name='delta_days']").clear()
    await this.page.fill("//div[@id='selected-items']//span[contains(.,'" + form.form_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//div/input[@name='delta_days']", '0')
  }

  async disableCycleMessage () {
    await this.page.click("//button//span[text()='no']")
    await expect(this.page.locator("//button[contains(@class,'active-state')]//span[text()='no']")).toBeVisible()
  }

  async clickDeleteButtonOnGoingCyclePanel (name) {
    await this.page.click("//a[normalize-space()='" + name.cycle_name + ' ' + process.env.uniqueId + "']/following-sibling::div//li[@title='Delete']")
  }

  async clickConfirmDeleteCycle () {
    await this.page.click("//button[@class='xq-button danger']")
  }

  async verifyOnGoingCycleIsDeleted (name) {
    await expect(this.page.locator("//a[normalize-space()='" + name.cycle_name + ' ' + process.env.uniqueId + "']")).not.toBeVisible()
  }

  async verifyDeletedCycleIsNotDisplayedOnUserDashboardPage (cycle) {
    for (const step of cycle.cycle_step) {
      if (step.type === 'questionnaire') {
        await expect(this.page.locator("//div[normalize-space(text())='" + step.questionnaire_name + ' ' + process.env.uniqueId + "']")).not.toBeVisible()
      }
      if (step.type === 'form') {
        await expect(this.page.locator("//div[normalize-space(text())='" + step.form_name + ' ' + process.env.uniqueId + "']")).not.toBeVisible()
      }
    }
  }

  async clickStatusFilter () {
    await this.page.click("//span[@id='status-filter-button']")
  }

  async filterOngoingStatus () {
    await this.clickStatusFilter()
    await this.page.click("//ul[@id='status-filter-menu']//div[contains(text(),'Ongoing')]")
  }

  async clickCheckboxOnOngoingCycle () {
    await this.page.click("//div[@class='cell check']//span[@class='fa fa-square-o unchecked  ']")
  }

  async clickDeleteButtonOnInvitedCycle () {
    await this.page.click("//a[@title='Delete all checked']")
    await this.page.click("//a[@id='confirm-btn']")
  }

  async filterCancelledStatus () {
    await this.clickStatusFilter()
    await this.page.click("//ul[@id='status-filter-menu']//div[contains(text(),'Cancelled')]")
  }

  async verifyDeletedOnCancelledStatus (users) {
    await expect(this.page.locator("//div[text()='" + users.first_name + ' ' + users.last_name[0].toUpperCase() + users.last_name.slice(1) + "']//following::div[text()='cancelled']")).toBeVisible()
  }

  async selectUserCheckbox () {
    await this.page.click("//div[@class='cell check']//span[@class='fa fa-square-o unchecked  ']")
  }

  async clickCloseCycleInvitation () {
    await this.page.click("//i[@class='fa fa-lock']")
  }

  async clickConfirmClosecycle () {
    await this.page.click("//a[@id='confirm-btn']")
  }

  async deleteSelectedQuestionnaireOnCycleStep (base, questionnaire) {
    await this.page.click("//div[@id='selected-items']//span[contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::span[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//a[@title='Remove this questionnaire']")
  }

  async deleteSelectedFormOnCycleStep (form) {
    await this.page.click("//div[@id='selected-items']//span[contains(.,'" + form.form_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='title-row']/following-sibling::div//a[@title='Remove this survey']")
  }

  async waitFortheCycleinvitation (questionnaire) {
    for (let reload = 0; reload < 10; reload++) {
      try {
        await expect(this.page.locator("//div[normalize-space(text())='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
        break
      } catch (err) {
        await this.page.reload({ waitUntil: 'load' })
      }
    }
  }
}
