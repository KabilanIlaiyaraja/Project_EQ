const { expect } = require('@playwright/test')
const dayjs = require('dayjs')
const { DashboardPage } = require('./dashboardPage')

exports.InvitePage = class InvitePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
  }

  async setStartDate () {
    const currentDate = dayjs().format('DD-MM-YYYY')
    const currrentTime = dayjs().format('hh:mm')
    await this.startDate(currentDate, currrentTime)
  }

  async startDate (now, hrs) {
    const element = this.page.locator("//span[normalize-space()='Opening date']/ancestor::div[@class='from-group--label']/following-sibling::input[@class='xq-input']")
    await element.pressSequentially(now, { delay: 100 })
    await element.press('Control+ArrowRight')
    await element.pressSequentially(hrs, { delay: 100 })
    await element.click()
  }

  async setStartDateADayLater () {
    const now = (dayjs().add(1, 'day')).format('DD-MM-YYYY')
    const hrs = (dayjs().add(1, 'minute')).format('hh:mm')
    await this.startDate(now, hrs)
  }

  async setCloseDate () {
    const closeDate = (dayjs().add(1, 'day')).format('DD-MM-YYYY')
    const closeTime = dayjs().add(1, 'minute').format('hh:mm')
    await this.closeDate(closeDate, closeTime)
  }

  async setCloseDateAsNow () {
    const now = dayjs().format('DD-MM-YYYY')
    const hrs = (dayjs().add(2, 'minutes')).format('hh:mm')
    await this.closeDate(now, hrs)
  }

  async setCloseDateShortTime () {
    const now = dayjs().format('DD-MM-YYYY')
    const hrs = (dayjs().add(10, 'minutes')).format('hh:mm')
    await this.closeDate(now, hrs)
  }

  async closeDate (now, hrs) {
    const element = this.page.locator("//span[normalize-space()='Opening end date']/ancestor::div[@class='from-group--label']/following-sibling::input[@class='xq-input']")
    await element.pressSequentially(now, { delay: 100 })
    await element.press('Control+ArrowRight')
    await element.pressSequentially(hrs, { delay: 100 })
    await element.click()
  }

  async setCloseDateTwoDaysLater () {
    const closeDate = (dayjs().add(2, 'day')).format('DD-MM-YYYY')
    const hrs = (dayjs().add(1, 'minute')).format('hh:mm')
    await this.closeDate(closeDate, hrs)
  }

  async enterSubjectQuestionnaireInvite (subject) {
    await this.page.locator("//span[normalize-space()='Subject']/ancestor::div[@class='from-group--label']/following-sibling::div//input[@class='xq-input']").clear()
    await this.page.fill("//span[normalize-space()='Subject']/ancestor::div[@class='from-group--label']/following-sibling::div//input[@class='xq-input']", subject + ' ' + process.env.uniqueId)
  }

  async enterMessageQuestionnaireInvite (message) {
    await this.page.locator("//span[normalize-space()='Message']/ancestor::div[@class='from-group--label']/following-sibling::div//textarea[@class='xq-textarea']").clear()
    await this.page.fill("//span[normalize-space()='Message']/ancestor::div[@class='from-group--label']/following-sibling::div//textarea[@class='xq-textarea']", message)
  }

  async clickEmailAndMobilesButton () {
    await this.page.click("//span[normalize-space(text())='Emails & mobiles']")
  }

  async clickSelectUser () {
    await this.page.click("//span[normalize-space(text())='Select users']")
  }

  async emailAreaInvite (email) {
    const emailId = email.user_name + email.domain
    await this.page.locator("//textarea[contains(@placeholder,'Enter email addresses and mobile numbers')]").click()
    await this.page.locator("//textarea[contains(@placeholder,'Enter email addresses and mobile numbers')]").pressSequentially(emailId, { delay: 100 })
  }

  async clickValidate () {
    await this.page.click("//span[contains(text(),'Validate')]")
  }

  async selectUsers (user) {
    await this.page.click("//div[@class='xq-users-select']//div[contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/ancestor::div[@class='xq-draggable-row-body']/following-sibling::div[@class='right-icon']")
  }

  async clickSelectUserForPath () {
    await this.page.click('#select-employees-btn')
  }

  async selectUsersForPath (user) {
    await this.page.click("//span[normalize-space(text())='" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "']/parent::div[@class='cell user']/following-sibling::div//a[@class='to-right-btn']")
  }

  async saveUsersForPath () {
    await this.page.click("//a[@class='btn btn-primary save-btn'][normalize-space(text())='Validate']")
  }

  async clickInviteButton () {
    await expect(this.page.locator('.fa.fa-share')).toBeVisible()
    await this.page.click('.fa.fa-share')
    await this.page.waitForTimeout(3000)
  }

  async enterCycleSubject (subject) {
    await this.page.locator("//span[normalize-space()='Subject']/ancestor::div[@class='from-group--label']/following-sibling::div//input[@class='xq-input']").clear()
    await this.page.locator("//span[normalize-space()='Subject']/ancestor::div[@class='from-group--label']/following-sibling::div//input[@class='xq-input']").pressSequentially(subject + ' ' + process.env.uniqueId)
  }

  async enterCycleMessage (message) {
    await this.page.locator("//span[normalize-space()='Message']/ancestor::div[@class='from-group--label']/following-sibling::div//textarea[@class='xq-textarea']").clear()
    await this.page.locator("//span[normalize-space()='Message']/ancestor::div[@class='from-group--label']/following-sibling::div//textarea[@class='xq-textarea']").pressSequentially(message)
  }

  async setStartDateFormADayLater () {
    const now = (dayjs().add(1, 'day')).format('YYYY-MM-DD')
    const hrs = (dayjs().add(1, 'minute')).format('HH:mm')
    await this.startDateForm(now, hrs)
  }

  async setStartDateForm () {
    const currentDate = dayjs().format('YYYY-MM-DD')
    const currrentTime = dayjs().format('HH:mm')
    await this.startDateForm(currentDate, currrentTime)
  }

  async setCloseDateForm () {
    const closeDate = (dayjs().add(1, 'day')).format('YYYY-MM-DD')
    const closeTime = dayjs().add(1, 'minute').format('HH:mm')
    await this.closeDateForm(closeDate, closeTime)
  }

  async setCloseDateFormAsLess () {
    const now = dayjs().format('YYYY-MM-DD')
    const hrs = (dayjs().add(2, 'minutes')).format('HH:mm')
    await this.closeDateForm(now, hrs)
  }

  async startDateForm (now, hrs) {
    const element = this.page.locator("//input[@id='start_date']")
    await element.clear()
    await element.pressSequentially(now + ' ' + hrs, { delay: 100 })
  }

  async clickEmailsMobilesButton () {
    await this.page.click('#select-contacts-btn')
  }

  async saveEmail () {
    await this.page.click('#save-contacts')
  }

  async closeDateForm (now, hrs) {
    const element = this.page.locator("//input[@id='end_date']")
    await element.clear()
    await element.pressSequentially(now + ' ' + hrs, { delay: 100 })
  }

  async modifyModuleEndDate () {
    await this.page.waitForTimeout(1000)
    const closeDate = (dayjs().add(2, 'day')).format('YYYY-MM-DD HH:MM')
    await this.moduleCloseDatePopup(closeDate)
  }

  async moduleCloseDatePopup (date) {
    await this.page.locator("//input[contains(@class,'form_datetime ')]").clear()
    await this.page.locator("//input[contains(@class,'form_datetime ')]").pressSequentially(date, { delay: 100 })
    await this.page.click("//input[contains(@class,'form_datetime ')]")
  }

  async checkInvitePage (getEmailTemplateValue) {
    const text = await this.page.locator('#mail-message>.xq-textarea').innerText()
    console.log(text)
    console.log(text.padStart)
    if (text.padStart === getEmailTemplateValue) {
      console.log('Pass .. ')
    } else {
      console.log('Fail .. ')
    }
  }
}
