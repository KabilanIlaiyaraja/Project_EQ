const { expect } = require('@playwright/test')

exports.EvaluationPage = class EvaluationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
  }

  async clickStatusFilter () {
    await this.page.click("//span[@id='status-filter-button']")
  }

  async selectAllStatus () {
    await this.page.click("//ul[@id='status-filter-menu']//div[contains(text(),'All')]")
  }

  async battleEvaluation (battle) {
    const length = 2
    const total = length
    await expect(this.page.locator("//a[contains(text(),'" + battle.questionnaire_name + ' ' + process.env.uniqueId + "')]/ancestor::div//strong[contains(text(),'" + total + '/' + total + "')]")).toBeVisible()
  }

  async verifyPassedEvaluation () {
    const string = "//div[@id='evals-list']/div[2]/div/div[7]/div"
    await expect(this.page.locator(string)).toBeVisible()
  }

  async verifyCycleEvaluationsClosed (user) {
    await this.clickStatusFilter()
    await this.selectAllStatus()
    await expect(this.page.locator("//div[normalize-space()='" + user.first_name + ' ' + user.last_name[0].toUpperCase() + user.last_name.slice(1) + "']/following-sibling::div[contains(text(),'cancelled')]")).toBeVisible()
  }

  async verifyCycleEvaluations (user, cycle) {
    await this.clickStatusFilter()
    await this.selectAllStatus()
    const length = (cycle.cycle_step).length
    const total = length
    await expect(this.page.locator("//div[normalize-space()='" + user.first_name + ' ' + user.last_name[0].toUpperCase() + user.last_name.slice(1) + "']/following-sibling::div[contains(text(),'" + total + ' / ' + total + "')]")).toBeVisible()
  }

  async verifySurveyData (user, formData) {
    for (const data of formData.fields) {
      if ((data.user_data) && (data.field_type === 'text' || data.field_type === 'para' || data.field_type === 'date' || data.field_type === 'number' || data.field_type === 'selector' || data.field_type === 'bool' || data.field_type === 'drop_down')) {
        await expect(this.page.locator("//*[contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/following-sibling::div//span[normalize-space(text())='" + data.answer_data + "']")).toBeVisible()
      }
      if ((data.user_data) && (data.field_type === 'multiple_select')) {
        await expect(this.page.locator("//*[contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/following-sibling::div//span[normalize-space(text())='" + data.answer_data_2 + ', ' + data.answer_data_1 + ', ' + data.answer_data_3 + "']")).toBeVisible()
      }
    }
  }

  async clickPlayEvaluation (questionnaire) {
    await this.page.click("//div[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]")
  }

  async clickPlayForm (formData) {
    await this.page.click("//div[contains(text(),'" + formData.form_name + ' ' + process.env.uniqueId + "')]")
  }

  async verifyPublicQuestionnaireEvaluation (questionnaire) {
    await expect(this.page.locator("//div[@title='Guest']/following-sibling::div[@class='cell questionnaire'][normalize-space(.)='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']/following-sibling::div//strong[normalize-space(text())='20/20']")).toBeVisible()
  }

  async verifyQuestionnaireEvaluationAfterEnd (questionnaire) {
    await expect(this.page.locator("//a[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/preceding::span[@title='Closed']/parent::div/following-sibling::div//div[@title='0 /1played']")).toBeVisible()
  }

  async verifyQuestionnaireEvaluationBeforeStart (questionnaire) {
    await expect(this.page.locator("//a[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/preceding::span[@class='fa fa-clock-o blue-color picto-calendar']/parent::div/following-sibling::div//div[@title='0 /1played']")).toBeVisible()
  }

  async verifyQuestionnaireEvaluation (questionnaire) {
    await expect(this.page.locator("//a[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/preceding::span[@class='fa fa-unlock-alt blue-color picto-calendar']/parent::div/following-sibling::div//div[@title='1 /1played']")).toBeVisible()
  }

  async clickCertificateButton () {
    await expect(this.page.locator("//*[@id='evals-certificate-btn']")).toBeVisible()
    await this.page.click('#evals-certificate-btn')
  }

  async checkEvaluation (questionnaire) {
    await this.page.click("(//a[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]//preceding::span[contains(@class,'fa fa-square-o unchecked')])[2]")
  }

  async verifyTrainingEvaluation (questionnaires) {
    const total = 1
    for (const questionnaire of questionnaires) {
      if (questionnaire.usage === 'evaluation') {
        const string = "//a[contains(text(),'" + questionnaire.questionnaire_name + "')]/ancestor::div[@class='cell title']/following-sibling::div/div[contains(@title,'" + total + ' /' + total + "played')]"
        await expect(this.page.locator(string)).toBeVisible()
      }
    }
  }
}
