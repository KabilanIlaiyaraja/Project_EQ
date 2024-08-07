const { expect } = require('@playwright/test')
const { BasePage } = require('../page/basePage')
const { DashboardPage } = require('../page/dashboardPage')

exports.QuestionnairePage = class QuestionnairePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    this.bases = new BasePage(this.page)
    this.dashboard = new DashboardPage(this.page)
  }

  async clickCreateQuestionnaire () {
    await expect(this.page.locator("//span[contains(text(),'new questionnaire')]")).toBeVisible()
    await this.page.click("//span[contains(text(),'new questionnaire')]")
  }

  async enterQuestionnaireName (questionnaireName) {
    await this.page.locator("//input[contains(@class,'xq-input')]").clear()
    await this.page.locator("//input[contains(@class,'xq-input')]").pressSequentially(questionnaireName.questionnaire_name + ' ' + process.env.uniqueId)
  }

  async enterQuestionnaireNameOnEditPage (questionnaireName) {
    await this.page.locator("//span[text()='Questionnaire name']/ancestor::div[@class='from-group--label']/following-sibling::div//input[contains(@class,'xq-input')]").clear()
    await this.page.locator("//span[text()='Questionnaire name']/ancestor::div[@class='from-group--label']/following-sibling::div//input[contains(@class,'xq-input')]").pressSequentially(questionnaireName.questionnaire_name + ' ' + process.env.uniqueId)
  }

  async dynamicType () {
    await this.page.click("//button[contains(@class,'xq-button')]//span[text()='dynamic']")
  }

  async saveQuestionnaire () {
    await this.page.click("//button[@class='xq-button primary']")
    await expect(this.page.locator("//li[contains(text(),'Questionnaire')]")).toBeVisible()
    await this.page.locator("//li[contains(text(),'Questionnaire')]").waitFor({ state: 'hidden' })
  }

  async enterQuestionsDisplayed () {
    await this.page.locator("//div[contains(@class,'questionnaire-nbQuestions')]//input[@type='number']").clear()
    await this.page.locator("//div[contains(@class,'questionnaire-nbQuestions')]//input[@type='number']").pressSequentially('3')
  }

  async clickSave () {
    await this.page.click("//div[@id='std-toolbar']//button[contains(@class,'button primary')]")
    await this.page.waitForLoadState('load')
  }

  async clickTypeFilter () {
    await this.dashboard.waiting()
    await this.page.click("//div[@id='filter-questionnaire-by-type']")
    if (!await this.page.locator("//div[@id='filter-questionnaire-by-type'][@class='xq-select focused']").isVisible()) {
      await this.page.click("//div[@id='filter-questionnaire-by-type']")
    }
  }

  async clickTopicFilter () {
    await this.dashboard.waiting()
    await this.page.click('#filter-by-topics > .xq-select-content')
    if (!await this.page.locator("//div[@id='filter-by-topics'][@class='xq-select focused']").isVisible()) {
      await this.page.click('#filter-by-topics > .xq-select-content')
    }
  }

  async clickAuthorFilter () {
    await this.dashboard.waiting()
    await this.page.click('#filter-by-author > .xq-select-content')
    if (!await this.page.locator("//div[@id='filter-by-author'][@class='xq-select focused']").isVisible()) {
      await this.page.click('#filter-by-author > .xq-select-content')
    }
  }

  async selectStaticOption () {
    await this.page.click("//div[@id='filter-questionnaire-by-type']//li[@title='Static']")
    await this.dashboard.waiting()
  }

  async selectDynamicOption () {
    await this.page.click("//div[@id='filter-questionnaire-by-type']//li[@title='Dynamic']")
    await this.dashboard.waiting()
  }

  async selectAllTypeOption () {
    await this.page.click("//div[@id='filter-questionnaire-by-type']//li[@title='All types']")
    await this.dashboard.waiting()
  }

  async selectAllTopicsOption () {
    await this.page.click("//div[@id='filter-by-topics']//ul//span[normalize-space(text())='All bases']")
    await this.dashboard.waiting()
  }

  async selectAllAuthorsOption () {
    await this.page.click("//div[@id='filter-by-author']//ul//span[contains(text(),'All authors')]")
    await this.dashboard.waiting()
  }

  async selectAuthorOption (author) {
    await this.page.click("//div[@id='filter-by-author']//ul//span[contains(text(),'" + author.first_name[0].toUpperCase() + author.first_name.slice(1) + ' ' + author.last_name[0].toUpperCase() + author.last_name.slice(1) + "')]")
    await this.dashboard.waiting()
  }

  async clickSaveOptionPage () {
    await this.page.click("(//button[contains(text(),'Save')])[1]")
    await this.page.waitForLoadState('load')
  }

  async verifyQuestionnaireExist (questionnaireName) {
    await expect(this.page.locator("//a[normalize-space()='" + questionnaireName.questionnaire_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async verifyBaseNotDisplayed (baseName) {
    await expect(this.page.locator("//ul[@class='xq-option-list']//span[normalize-space(text())='" + baseName.base_name + ' ' + process.env.uniqueId + "']")).toHaveCount(0)
  }

  async openQuestionnaire (questionnaireName) {
    await this.dashboard.waiting()
    await this.page.reload({ waitUntil: 'load' })
    await this.clickPageFilter()
    await this.page.click("//a[contains(.,'" + questionnaireName.questionnaire_name + ' ' + process.env.uniqueId + "')]")
  }

  async clickPageFilter () {
    await this.page.locator("//div[@id='filter-by-pages']//div[@class='xq-select-content']").click()
    await this.page.click("//div//ul//li[@title='400 per page']")
    await this.dashboard.waiting()
  }

  async clickOptions () {
    await this.page.click("//a[contains(@href,'/option')]")
    await this.page.waitForLoadState('load')
  }

  async clickVisibility () {
    await this.page.click("//a[contains(@href,'/visibility')]")
  }

  async clickResults () {
    await this.page.click("//a[contains(@href,'/questionnaires')][contains(@href,'/results')]")
    await this.page.waitForLoadState('load')
  }

  async selectAllUsers () {
    await this.page.click("//label[@input-id='visibility-all-users']//span[contains(@class,'fa fa-square')]")
  }

  async selectGroupVisibility (group) {
    await this.page.locator("//div[@class='groups-list']//div//label[normalize-space(text())='" + group + ' ' + process.env.uniqueId + "']//span[contains(@class,'fa fa-square')]").click()
  }

  async clickSaveOnQuestionnaireVisibilityPage () {
    await this.page.click("//div[@class='visibility-page-content']//button[@class='xq-button primary']")
  }

  async clickAllbasefilteronQuestionnairelist () {
    await this.page.click("//div[@id='filter-by-topics']//div//span[@class='word-wrap selected']")
  }

  async selectBase (base) {
    await this.page.click("(//span[contains(text(),'" + base.base_name + ' ' + process.env.uniqueId + "')])[1]")
    await this.dashboard.waiting()
  }

  async selectTopic (base) {
    await this.page.click("//span[normalize-space(text())='" + base.base_name + ' ' + process.env.uniqueId + "']")
    await this.dashboard.waiting()
  }

  async clickSelection () {
    await this.page.click("//a[contains(@href,'/selection')]")
  }

  async selectAllQuestions () {
    await this.page.click("//span[@class='fa fa-arrow-circle-o-right']")
  }

  async saveSelectedQuestions () {
    await this.page.click("//button[@class='xq-button primary']")
  }

  async clickInvitePage () {
    await this.page.click("//a[contains(@href,'/invite')]")
  }

  async clickPlayLink (questionnaire) {
    await this.page.click("//div[normalize-space(text())='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']/ancestor::div//a[contains(@href,'/trial/play')]")
  }

  async clickOptionSave () {
    await this.page.click("//button[contains(text(),'Save')]")
  }

  async enterConsequenceMessages (message) {
    await this.page.locator("//textarea[@id='messages_consequence_translated']").clear()
    await this.page.locator("//textarea[@id='messages_consequence_translated']").pressSequentially(message.module_message, { delay: 100 })
  }

  async enterAction (message) {
    await this.page.locator("//textarea[@id='actions_consequence_translated']").clear()
    await this.page.locator("//textarea[@id='actions_consequence_translated']").pressSequentially(message.message, { delay: 50 })
  }

  async enterNoOfMonthOnRenewalField (month) {
    await this.page.locator("//input[@id='renewal_period']").clear()
    await this.page.locator("//input[@id='renewal_period']").pressSequentially(month.renewal)
  }

  async clickMakeItPublic () {
    await this.page.click("//span[contains(text(),'make it public')]")
  }

  async clickMakePublic () {
    await this.page.click("//span[normalize-space(text())='make public']")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//li[contains(text(),'Your link')]")).toBeVisible()
    await this.page.locator("//li[contains(text(),'Your link')]").waitFor({ state: 'hidden' })
  }

  async enterPublicQuestionnaireLink (link) {
    await this.page.locator('#public-link-link-input').clear()
    await this.page.fill('#public-link-link-input', link.link_text + process.env.uniqueId)
  }

  async clickSaveOnVisibilityPage () {
    await this.page.click("//div[@class='visibility-page-content']//button[@class='xq-button primary']")
  }

  async selectForm (form) {
    await this.clickSurveyForm()
    await this.page.click("//*[@id='survey_form_select-menu']/li/div[contains(text(),'" + form.form_name + ' ' + process.env.uniqueId + "')]")
  }

  async selectDuplicateForm (form) {
    await this.clickSurveyForm()
    await this.page.click("//*[@id='survey_form_select-menu']/li/div[contains(text(),'" + form.form_name + ' ' + process.env.uniqueId + "')]")
  }

  async clickSurveyForm () {
    await this.page.click('#survey_form_select-button')
  }

  async verifyQuestionnaireIsCreatedAsPublic (questionnaireName) {
    await expect(this.page.locator("//a[contains(.,'" + questionnaireName.questionnaire_name + ' ' + process.env.uniqueId + "')]//span[text()='P']")).toHaveCount(1)
  }

  async verifyQuestionnaireIsCreatedAsForm (questionnaireName) {
    await expect(this.page.locator("//a[contains(.,'" + questionnaireName.questionnaire_name + ' ' + process.env.uniqueId + "')]//span[text()='F']")).toHaveCount(1)
  }

  async verifyQuestionnaireIsCreatedAsVisibility (questionnaireName) {
    await expect(this.page.locator("//a[contains(.,'" + questionnaireName.questionnaire_name + ' ' + process.env.uniqueId + "')]//span[text()='V']")).toHaveCount(1)
  }

  async verifyQuestionnaireIsCreatedAsRenewal (questionnaireName) {
    await expect(this.page.locator("//a[contains(.,'" + questionnaireName.questionnaire_name + ' ' + process.env.uniqueId + "')]//span[text()='R']")).toHaveCount(1)
  }

  async verifyQuestionnaireIsCreatedAsConsequence (questionnaireName) {
    await expect(this.page.locator("//a[contains(.,'" + questionnaireName.questionnaire_name + ' ' + process.env.uniqueId + "')]//span[text()='C']")).toHaveCount(1)
  }

  async clickSurveyData () {
    await this.page.click("//a[contains(@href,'#collected-data')]")
  }

  async clickDetails (questionnaire) {
    await this.page.click("(//*[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/ancestor::div[@class='cell title']/following-sibling::div//ul//a[contains(@href,'#eval-detail')])[1]")
  }

  async clickNoLimit () {
    await this.page.click("//label[@for='withpace-0']")
  }

  async verifyResultForUserPlayedQuestionnaireWithForm (questionnaire) {
    await expect(this.page.locator("//div[@class='cell title']//a[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]//following::div[@title='1 /1played']")).toBeVisible()
  }

  async enterAllConsequenceAction (message) {
    const questionnaire1 = message.action_for_questionnaire.replace('replaceme', process.env.uniqueId)
    const module1 = message.action_for_module.replace('replaceme', process.env.uniqueId)
    const ingrp = message.action_for_in_group.replace('replaceme', process.env.uniqueId)
    const outgrp = message.action_for_out_group.replace('replaceme', process.env.uniqueId)
    await this.page.locator("//textarea[@id='actions_consequence_translated']").clear()
    await this.page.locator("//textarea[@id='actions_consequence_translated']").pressSequentially(questionnaire1 + module1 + ingrp + outgrp + message.action_for_admin_mail + message.action_for_user_mail + message.action_for_contact_mail + message.action_for_manager_mail + message.action_for_capacity)
  }

  async clickDeleteIcon (questionnaire) {
    await this.page.click("//a[@class='cell link name'][contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//span[@class='fa fa-trash-o button-icon']")
  }

  async confirmDeleteQuestionnaire (questionnaire) {
    await this.page.click("//strong[contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/ancestor::div//button[@class='xq-button danger']")
  }

  async verifyQuestionnaireNotExist (questionnaire) {
    await expect(this.page.locator("//a[normalize-space(text())= '" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']")).not.toBeVisible()
  }

  async clickDuplicateIcon (questionnaire) {
    await this.page.click("//a[@class='cell link name'][contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//span[@class='fa fa-clone button-icon']")
  }

  async verifyDuplicatedQuestionnaire (questionnaire) {
    await expect(this.page.locator("//a[@class='cell link name'][contains(.,'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + " (1)')]")).toBeVisible()
  }

  async getLink () {
    const link = await this.page.locator("//div[@class='flex-content-row']/h2/following-sibling::a[contains(@href,'https://beta.experquiz.com/xq')]").innerText()
    return link
  }

  async clickPublicResults () {
    await this.page.click("//a[contains(@href,'/free')]")
  }

  async clickEditQuestionnaire () {
    await this.page.click("//a[contains(@href,'/edit')]")
  }

  async clickAuthorNameField () {
    await this.page.click('#author_name')
  }

  async setAuthorName (user) {
    if (user.author) {
      await this.clickAuthorNameField()
      await this.selectAuthorName(user)
    }
  }

  async selectAuthorName (author) {
    await this.page.click("//span[@class='username'][normalize-space(text())='" + author.last_name.toUpperCase() + ' ' + author.first_name[0].toUpperCase() + author.first_name.slice(1) + "']")
  }

  async setCertification () {
    await this.page.click("//input[@id='certification']/following-sibling::label//span[text()='Yes']")
  }

  async enterCertificationRate (questionnaire) {
    await this.page.locator('#certification_rate').clear()
    await this.page.locator('#certification_rate').pressSequentially(questionnaire.mark)
  }

  async verifyCertificateByAdmin (questionnaire, user) {
    await expect(this.page.locator("//div[@title='" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "']/following-sibling::div[normalize-space()='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']/following-sibling::div//span[@class='fa fa-graduation-cap']")).toBeVisible()
  }

  async verifyDownloadCertificateByUser (questionnaire) {
    await expect(this.page.locator("//div[@class='cell title'][contains(text(),'" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//a[contains(@class,'qrcode')]")).toBeVisible()
  }

  async enterPlayerIntroMessage (questionnaire) {
    await this.page.locator("//*[@class='cell player-first-page']//*[@id='player_intro_message']/following-sibling::div").click()
    await this.page.locator("//*[@class='cell player-first-page']//*[@id='player_intro_message']/following-sibling::div//p").fill(questionnaire.Player_first_page, { delay: 100 })
  }

  async enterPlayerMessage (questionnaire) {
    await this.page.locator("//*[@id='player_message']/following-sibling::div").click()
    await this.page.locator("//*[@id='player_message']/following-sibling::div//p").fill(questionnaire.Player_message, { delay: 100 })
  }

  async verifyMessageClickStart (message) {
    await expect(this.page.locator("//div[@class='intro-message']/p[contains(text(),'" + message.Player_first_page + "')]")).toBeVisible()
    await this.clickStart()
  }

  async clickStart () {
    await this.page.click("//div[normalize-space(text())='Start']")
  }

  async verifyPlayerMessage (message) {
    await expect(this.page.locator("//div[@class='questionnaire-message']//p//p[normalize-space(text())='" + message.Player_message + "']")).toBeVisible()
  }

  async clickCheckCode () {
    await this.page.click("//div[@class='bloc-body']//a[text()='Check code']")
  }

  async enterValidation (validation) {
    await this.page.locator('#data_consequence').clear()
    await this.page.locator('#data_consequence').pressSequentially(validation.validation)
  }

  async clickCodeValidate () {
    await this.page.click('#code-validation-btn')
  }

  async enterActionAssignGroup (messages) {
    const message = messages.add_action.replace('replaceme', process.env.uniqueId)
    await this.page.locator("//textarea[@id='actions_consequence_translated']").clear()
    await this.page.locator("//textarea[@id='actions_consequence_translated']").pressSequentially(message)
  }

  async enterActionRemoveGroup (messages) {
    const message = messages.remove_action.replace('replaceme', process.env.uniqueId)
    await this.page.locator("//textarea[@id='actions_consequence_translated']").clear()
    await this.page.locator("//textarea[@id='actions_consequence_translated']").pressSequentially(message)
  }

  async enterValidationGroup (validation) {
    await this.page.locator('#data_consequence').clear()
    await this.page.locator('#data_consequence').pressSequentially(validation.validation_group)
  }

  async selectSinglePage () {
    await this.page.click("//span[contains(text(),'single page')]")
  }
}
