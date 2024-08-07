// @ts-check
const { expect } = require('@playwright/test')

exports.FormsPage = class FormsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
  }

  async clickNewForms () {
    await this.page.click("//a[@href='/surveys/new']")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//section[@id='survey-top']")).toBeVisible()
  }

  async enterFormName (name) {
    await this.page.locator('#form_name').clear()
    await this.page.fill('#form_name', name.form_name + ' ' + process.env.uniqueId)
  }

  async enterRedirectUrl (redirectRrl) {
    await this.page.locator('#url_after').clear()
    await this.page.locator('#url_after').pressSequentially(redirectRrl.redirect_url, { delay: 100 })
  }

  async saveForm () {
    await this.page.click("//button//i[@class='fa fa-check']")
  }

  async moveTextField () {
    await this.page.click("(//div[contains(@class,'field-type-text')]//a[contains(@title,'form')])[1]")
  }

  async moveTextArea () {
    await this.page.click("(//div[contains(@class,'field-type-textarea')]//a[contains(@title,'form')])[1]")
  }

  async moveDateField () {
    await this.page.click("(//div[contains(@class,'field-type-date')]//a[contains(@title,'form')])[1]")
  }

  async moveNumberField () {
    await this.page.click("(//div[contains(@class,'field-type-number')]//a[contains(@title,'form')])[1]")
  }

  async moveSelectorField () {
    await this.page.click("(//div[contains(@class,'field-type-select')]//a[contains(@title,'form')])[1]")
  }

  async moveBoolField () {
    await this.page.click("(//div[contains(@class,'field-type-bool')]//a[contains(@title,'form')])[1]")
  }

  async moveDropDownField () {
    await this.page.click("(//div[contains(@class,'field-type-dropdown')]//a[contains(@title,'form')])[1]")
  }

  async moveMultipleSelectField () {
    await this.page.click("(//div[contains(@class,'field-type-multiselect')]//a[contains(@title,'form')])[1]")
  }

  async moveSectionSeparatorField () {
    await this.page.click("(//div[contains(@class,'field-type-section')]//a[contains(@title,'form')])[1]")
  }

  async moveLabelField () {
    await this.page.click("(//div[contains(@class,'field-type-label')]//a[contains(@title,'form')])[1]")
  }

  async editTextField () {
    const element = "(//div[contains(@class,'field-type-text')]//a[contains(@title,'Edit settings')])[3]"
    await this.page.click(element)
  }

  async editTextArea () {
    const element = "(//div[contains(@class,'field-type-textarea')]//a[contains(@title,'Edit settings')])[2]"
    await this.page.click(element)
  }

  async editDateField () {
    const element = "(//div[contains(@class,'field-type-date')]//a[contains(@title,'Edit settings')])[2]"
    await this.page.click(element)
  }

  async editNumberField () {
    const element = "(//div[contains(@class,'field-type-number')]//a[contains(@title,'Edit settings')])[2]"
    await this.page.click(element)
  }

  async editSelectorField () {
    const element = "(//div[contains(@class,'field-type-select')]//a[contains(@title,'Edit settings')])[2]"
    await this.page.click(element)
  }

  async editBoolField () {
    const element = "(//div[contains(@class,'field-type-bool')]//a[contains(@title,'Edit settings')])[2]"
    await this.page.click(element)
  }

  async editDropDownField () {
    const element = "(//div[contains(@class,'field-type-dropdown')]//a[contains(@title,'Edit settings')])[2]"
    await this.page.click(element)
  }

  async editMultipleSelectField () {
    const element = "(//div[contains(@class,'field-type-multiselect')]//a[contains(@title,'Edit settings')])[2]"
    await this.page.click(element)
  }

  async editLabelField () {
    const element = "(//div[contains(@class,'field-type-label')]//a[contains(@title,'Edit settings')])[2]"
    await this.page.click(element)
  }

  async editSectionSeparatorField () {
    const element = "(//div[contains(@class,'field-type-section')]//a[contains(@title,'Edit settings')])[2]"
    await this.page.click(element)
  }

  async labelFields (data) {
    await this.enterLabelName(data)
  }

  async enterFieldName (name) {
    await this.page.locator("//input[@id='field_name']").clear()
    await this.page.locator("//input[@id='field_name']").pressSequentially(name.field_name, { delay: 100 })
  }

  async enterLabelName (label) {
    await this.page.locator("//input[@id='label']").clear()
    await this.page.locator("//input[@id='label']").pressSequentially(label.label_name, { delay: 100 })
  }

  async selectInputRequired (form) {
    const color = "//input[@id='required']/following-sibling::label/span[@class='unchecked']"
    if (color && form.input_required) {
      await this.page.click("//input[@id='required']/following-sibling::label/span[@class='checked']")
    }
  }

  async selectUserData (form) {
    const color = "//input[@id='user_data']/following-sibling::label/span[@class='unchecked']"
    if (color && form.user_data) {
      await this.page.click("//input[@id='user_data']/following-sibling::label/span[@class='checked']")
    }
  }

  async enterMinimumLength (length) {
    await this.page.locator('#min_length').clear()
    await this.page.fill('#min_length', length.minimum_length)
  }

  async enterMaximumLength (length) {
    await this.page.locator('#max_length').clear()
    await this.page.fill('#max_length', length.maximum_length)
  }

  async clickSaveField () {
    await this.page.click('#field-settings-done-btn')
  }

  async enterChoices (data) {
    const val = data.choices
    const str = val.toString()
    await this.page.locator('#choices').clear()
    await this.page.locator('#choices').pressSequentially(str, { delay: 100 })
  }

  async verifyFormExist (name) {
    await expect(this.page.locator("//div[@id='survey-table']//a[normalize-space()='" + name.form_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async clickTrialPlayForm (name) {
    await this.page.click("//a[normalize-space()='" + name.form_name + ' ' + process.env.uniqueId + "']/following-sibling::div//span[@class='fa fa-play button-icon']")
  }

  async selectChoice (field) {
    if (field.answer_data !== '') {
      await this.page.click("//label[text()='" + field.field_name + "']/following-sibling::ul//li//label[text()='" + field.answer_data + "']")
    }
  }

  async enterTextField (field) {
    await this.page.locator("//*[@name='" + field.field_name + "']").clear()
    await this.page.fill("//*[@name='" + field.field_name + "']", field.answer_data)
    await this.page.click("//label[@for='survey-field-0-0']")
  }

  async selectOptionFromDropDownList (field) {
    await this.page.click("//span[@id='drop_down_1-button']")
    await this.page.click("//div[text()='" + field.answer_data + "']")
  }

  async selectMultiple1 (field) {
    await this.page.click("//label[contains(text(),'" + field.answer_data_1 + "')]")
  }

  async selectMultiple2 (field) {
    await this.page.click("//label[contains(text(),'" + field.answer_data_2 + "')]")
  }

  async selectMultiple3 (field) {
    await this.page.click("//label[contains(text(),'" + field.answer_data_3 + "')]")
  }

  async submitForm () {
    await this.page.click("//*[@name='submit']")
  }

  async deleteForm (formData) {
    await this.page.click("//a[normalize-space()='" + formData.form_name + ' ' + process.env.uniqueId + "']/following-sibling::div//span[@class='fa fa-trash-o button-icon']")
  }

  async duplicateForm (formData) {
    await this.page.click("//a[normalize-space()='" + formData.form_name + ' ' + process.env.uniqueId + "']/following-sibling::div//span[@class='fa fa-clone button-icon']")
  }

  async confirmDelete (formData) {
    await this.page.click("//p[contains(.,'" + formData.form_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//button[@class='xq-button danger']")
  }

  async verifyFormNotExist (name) {
    await expect(this.page.locator("//*[@id='survey-forms-list']//div[contains(text(),'" + name.form_name + ' ' + process.env.uniqueId + "')]")).not.toBeVisible()
  }

  async verifyDuplicateFormExist (name) {
    await expect(this.page.locator("//div[@class='survey-table-item']//a[normalize-space()='" + name.form_name + ' ' + process.env.uniqueId + " (1)']")).toBeVisible()
  }

  async clickStatusFilter () {
    await this.page.click("//div[@class='xq-select-content']")
  }

  async selectAllStatus () {
    await this.page.click("//div[@title='All']")
  }

  async openForm (formData) {
    await this.page.click("//a[normalize-space()='" + formData.form_name + ' ' + process.env.uniqueId + "']")
  }

  async clickInvitationTab () {
    await this.page.click("//a[contains(@href,'/surveys')][contains(@href,'/invitation')]")
  }

  async clickResultsTab () {
    await this.page.click("//a[contains(@href,'/surveys')][contains(@href,'/results')]")
  }

  async clickSelectUsersButton () {
    await this.page.click("//a[@id='select-employees-btn']")
  }

  async selectActiveUser (user) {
    await expect(this.page.locator("//span[@class='username'][contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/parent::div[@class='cell user']/following-sibling::div//a[@class='to-right-btn']")).toBeVisible()
    await this.page.click("//span[@class='username'][contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/parent::div[@class='cell user']/following-sibling::div//a[@class='to-right-btn']")
  }

  async clickValidateTheSelectUser () {
    await this.page.click("//a[@class='btn btn-primary save-btn']")
  }

  async clickInviteButton () {
    await this.page.click('#invite')
  }

  async verifyInvitedFormIsScheduledStatus (name) {
    await expect(this.page.locator("//span[contains(text(),'" + name.form_name + ' ' + process.env.uniqueId + "')]//following::div[@class='cell status'][text()='scheduled']")).toBeVisible()
  }

  async filterAnyStatusOnMySurveyPage () {
    await this.page.click("//span[@id='status-filter-button']")
    await this.page.click("//div[text()='Any status']")
  }

  async clickSurveyDetailbutton (name) {
    await this.page.click("//div[@class='survey-table-item']//a[normalize-space()='" + name.form_name + ' ' + process.env.uniqueId + "']/following-sibling::div//a[@title='Details']")
  }

  async clickInviteButtonOnForm (formData) {
    await this.page.click("//a[normalize-space()='" + formData.form_name + ' ' + process.env.uniqueId + "']/following-sibling::div//li[@title='Invite participants']")
  }

  async verifyResultForUserPlayedForm (users) {
    await expect(this.page.locator("//div[@class='cell user-name'][contains(text(),'" + users.last_name.toUpperCase() + ' ' + users.first_name[0].toUpperCase() + users.first_name.slice(1) + "')]/following-sibling::div[contains(text(),'completed')]")).toBeVisible()
  }

  async clickEditForm (form) {
    await this.page.click("//a[normalize-space()='" + form.form_name + ' ' + process.env.uniqueId + "']/following-sibling::div//span[@class='fa fa-pencil button-icon']")
    await this.page.waitForLoadState('load')
  }

  async deleteAllFields () {
    await this.page.waitForTimeout(2000)
    const val1 = await this.page.locator("//div[@id='selected-fields']//a[contains(@title,'Remove this field')]").count()
    let index = val1
    while (index > 0 && index <= val1) {
      await this.page.click("(//div[@id='selected-fields']//a[contains(@title,'Remove this field')])[1]")
      index = index - 1
    }
  }

  async enterConditionpara (data) {
    await this.page.locator("//input[@id='condition']").clear()
    await this.page.locator("//input[@id='condition']").pressSequentially(data)
  }

  async enterConditionForDate (data) {
    await this.page.locator("//input[@id='condition']").clear()
    await this.page.locator("//input[@id='condition']").pressSequentially(data)
  }

  async enterConditionForNumber (data) {
    await this.page.locator("//input[@id='condition']").clear()
    await this.page.locator("//input[@id='condition']").pressSequentially(data)
  }

  async enterConditionForSelector (data) {
    await this.page.locator("//input[@id='condition']").clear()
    await this.page.locator("//input[@id='condition']").pressSequentially(data)
  }

  async enterConditionForBool (data) {
    await this.page.locator("//input[@id='condition']").clear()
    await this.page.locator("//input[@id='condition']").pressSequentially(data)
  }

  async enterConditionForDropDown (data) {
    await this.page.locator("//input[@id='condition']").clear()
    await this.page.locator("//input[@id='condition']").pressSequentially(data)
  }

  async enterConditionForMultiple (data) {
    await this.page.locator("//input[@id='condition']").clear()
    await this.page.locator("//input[@id='condition']").pressSequentially(data)
  }

  async clickMakeItPublicButton () {
    await this.page.click("(//i[@class='fa fa-share-alt'])[1]")
    await this.page.waitForTimeout(2000)
  }

  async enterPublicText (data) {
    await this.page.locator("//input[@class='form-control'][@id='public_link']").clear()
    await this.page.locator("//input[@class='form-control'][@id='public_link']").pressSequentially(data.public_text + process.env.uniqueId, { delay: 100 })
  }

  async clickMakePublicButton () {
    await this.page.click("//button[text()='Make Public']")
    await expect(this.page.locator("//div[contains(@class,'xq-flashes')]")).toBeVisible()
    await this.page.locator("//div[contains(@class,'xq-flashes')]").waitFor({ state: 'hidden' })
  }

  async verifySurveyFormIsPublic (url, publicText) {
    await expect(this.page.locator("//a[@href='" + url + '/xq/' + publicText.public_text + process.env.uniqueId + "']")).toBeVisible()
  }

  async getSurveyPublicLink (url, publicText) {
    const link = await this.page.locator("//a[@href='" + url + '/xq/' + publicText.public_text + process.env.uniqueId + "']").innerText()
    return link
  }

  async enterPublicRedirectUrl (redirectUrl) {
    await this.page.locator("//input[@id='public_back_url']").clear()
    await this.page.locator("//input[@id='public_back_url']").pressSequentially(redirectUrl.public_redirect_url, { delay: 100 })
  }

  async verifySurveyFormIsRedirectUrl (url, redirectUrl) {
    const data = redirectUrl.public_redirect_url
    if (url === data) {
      console.log('got url')
    } else {
      console.log('not got url')
    }
  }

  async verifyResultForActiveUserPlayedPublicForm (user) {
    await expect(this.page.locator("//div[@class='cell user-name'][contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/following-sibling::div[contains(text(),'completed')]")).toBeVisible()
  }

  async verifyResultForInactiveUserPlayedPublicForm () {
    await expect(this.page.locator("//div[@class='cell user-name'][contains(text(),'Guest')]/following-sibling::div[contains(text(),'completed')]")).toBeVisible()
  }

  async signOutLoggedUser () {
    await this.page.click("//a[normalize-space(text())='Sign-out']")
  }

  async enterRedirectUrlOnEnterpriseOption (redirectUrl) {
    await this.page.locator("//input[@id='url_after']").clear()
    await this.page.locator("//input[@id='url_after']").pressSequentially(redirectUrl.public_redirect_url, { delay: 100 })
  }

  async waitForFormBouncePage () {
    await expect(this.page.locator("//div[@class='bounce-page']")).toBeVisible()
    await this.page.locator("//div[@class='bounce-page']").waitFor({ state: 'hidden' })
  }
}
