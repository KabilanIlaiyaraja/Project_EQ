const { expect } = require('@playwright/test')
const { DashboardPage } = require('./dashboardPage')

exports.ModulePage = class ModulePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
  }

  async clickNewModuleButton () {
    await this.page.click("//a[contains(@href,'/create')]//span[@class='fa fa-plus']")
    await this.page.waitForLoadState('load')
  }

  async openModule (module) {
    await this.page.click("//a[contains(@class,'module-name')][contains(normalize-space(.),'" + module.module_name + ' ' + process.env.uniqueId + "')]")
    await this.dashboard.waiting()
    await expect(this.page.locator("//div[@class='module-overview-container']")).toBeVisible()
    await this.page.waitForTimeout(2000)
  }

  async openDuplicateModule (moduleName) {
    await this.page.click("//a[contains(@class,'cell link module-name')][contains(.,'" + moduleName.module_name + ' ' + process.env.uniqueId + " (1)')]")
    await this.dashboard.waiting()
    await expect(this.page.locator("//div[@class='module-overview-container']")).toBeVisible()
  }

  async enterModuleName (name) {
    await this.page.locator('#module_name').clear()
    await this.page.fill('#module_name', name.module_name + ' ' + process.env.uniqueId)
  }

  async enterModuleRank (name) {
    await this.page.locator('#dashboard_rank').clear()
    await this.page.fill('#dashboard_rank', name.module_rank)
  }

  async clickSaveButtonCreateModulePage () {
    await this.page.click("//button[text()='Save']")
    // await expect(this.page.locator("//li[contains(text(),'Module successfully created')]")).toBeVisible()
    // await this.page.locator("//li[contains(text(),'Module successfully created')]").waitFor({ state: 'hidden' })
  }

  async clickSaveButtonEditModulePage () {
    await this.page.click("//button[text()='Save']")
  }

  async verifyModulesExist (moduleName) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(.,'" + moduleName.module_name + ' ' + process.env.uniqueId + "')]")).toBeVisible()
  }

  async clickElements () {
    await this.page.click("//a[contains(@href,'/elements')]")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//div[@id='module-elements-page']")).toBeVisible()
  }

  async clickSelectQuestionnaire () {
    await this.page.click("//a[@href='#select-questionnaire-tab']")
    await this.page.reload({ waitUntil: 'load' })
  }

  async selectBaseName (baseName) {
    await this.page.click("//div[normalize-space(text())='" + baseName.base_name + ' ' + process.env.uniqueId + "']")
  }

  async selectElement (name) {
    await this.page.locator("//span[@class='caption'][contains(text(),'" + name + ' ' + process.env.uniqueId + "')]").dragTo(this.page.locator("//*[@id='items-set-3']"))
  }

  async clickSelectMedia () {
    await this.page.click("//a[@href='#select-media-tab']")
  }

  async selectMediaElement (name, base) {
    await this.page.locator("//span[contains(text(),'" + name + "' )]/following-sibling::span[normalize-space(text())='" + base.base_name + ' ' + process.env.uniqueId + "']").dragTo(this.page.locator("//*[@id='items-set-3']"))
  }

  async clickAllTopicFilter () {
    await this.page.click("//span[@id='topic-filter-button']")
  }

  async clickInvite () {
    await this.page.click("//a[contains(@href,'/invite')]")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//div[@class='content-holder']")).toBeVisible()
  }

  async verifyElement () {
    await expect(this.page.locator("//div//li[text()='Your settings have been saved']")).toBeVisible()
    await this.page.locator("//div//li[text()='Your settings have been saved']").waitFor({ state: 'hidden' })
  }

  async enableWithArchivedBases () {
    await this.page.click("//div[@class='archived-topics-div']//span[text()='Yes']")
  }

  async clickPlayQuestionnaire () {
    await this.page.click("//*[@class='fa fa-play-circle']")
  }

  async clickNextStep () {
    await this.page.click("//a[@id='next-btn']")
  }

  async clickQuitModule () {
    await this.page.click("//div[@id='std-toolbar']/a[@data-target='#module-close-modal']")
  }

  async saveModule () {
    await this.page.click('#save-btn')
  }

  async clickVisibility () {
    await this.page.click("//a[contains(@href,'/visibility')]")
    await expect(this.page.locator("//div[@class='visibility-page-content']")).toBeVisible()
  }

  async clickSteps () {
    await this.page.click("//a[contains(@href,'/steps')]")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//div[@id='module-steps-page']")).toBeVisible()
  }

  async clickEdit () {
    await this.page.click("//a[contains(@href,'/edit')]")
  }

  async clickSaveOnStepPage () {
    await this.page.click("//button[text()='Save']")
    await this.page.waitForLoadState('load')
  }

  async enterModuleDruationAsMinute (duration) {
    const duration1 = duration.module_duration
    await this.page.locator("//input[@id='duration']").clear()
    await this.page.locator("//input[@id='duration']").pressSequentially(duration1 + duration.duration_type)
  }

  async clickResults () {
    await this.page.click("//a[contains(@href,'/results/sessions')]")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//div[@class='content-holder']")).toBeVisible()
  }

  async clickDetailButton () {
    await expect(this.page.locator("//a[@title='Detail']")).toBeVisible()
    await this.page.click("//a[@title='Detail']")
    if (await this.page.locator("//div[contains(@class,'module-invitation')]//div[contains(@class,'waiting')]").isVisible()) {
      await this.page.locator("//div[contains(@class,'module-invitation')]//div[contains(@class,'waiting')]").waitFor({ state: 'hidden' })
    }
  }

  async clickDeleteModule (moduleName) {
    await this.page.click("//a[contains(@class,'cell link module-name')][contains(normalize-space(.),'" + moduleName.module_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//ul/li[@title='Delete module']")
  }

  async clickDeleteVisibilityModule (moduleName) {
    await this.page.click("//a[contains(@class,'cell link module-name')][contains(normalize-space(.),'" + moduleName.module_name + ' ' + process.env.uniqueId + "')]//following-sibling::div//span[@title='Visible']/parent::div/following-sibling::div//ul/li[@title='Delete module']")
  }

  async confirmDelete (moduleName) {
    await this.page.click("//strong[contains(text(),'" + moduleName.module_name + "')]/ancestor::div//button[@class='xq-button danger']")
  }

  async verifyModuleDeleted (moduleName) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(text(),'" + moduleName.module_name + ' ' + process.env.uniqueId + "')]")).not.toBeVisible()
  }

  async verifyVisibilityModuleDeleted (moduleName) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(text(),'" + moduleName.module_name + ' ' + process.env.uniqueId + "')]//following-sibling::div//span[@title='Visible']")).not.toBeVisible()
  }

  async clickDuplicateModule (moduleName) {
    await this.page.click("//a[contains(@class,'cell link module-name')][contains(normalize-space(.),'" + moduleName.module_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//ul/li[@title='Duplicate']")
  }

  async verifyDuplicateModuleExist (moduleName) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(.,'" + moduleName.module_name + ' ' + process.env.uniqueId + " (1)')]")).toBeVisible()
  }

  async clickPlayTrialModule () {
    await this.page.click("//a[contains(@href,'/trial')]")
  }

  async verifyOngoingNotModuleDeleted (moduleName) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(.,'" + moduleName.module_name + ' ' + process.env.uniqueId + "')]")).not.toBeVisible()
  }

  async VerifyAttendanceCertificate (modules) {
    await expect(this.page.locator("//span[text()='" + modules.module_name + ' ' + process.env.uniqueId + "']/parent::div/following-sibling::div//li[contains(@title,'module completion certificate')]/a[contains(@href,'.pdf')]")).toBeVisible()
  }

  async clickModuleTabCertificates () {
    await this.page.click("//a[contains(@href,'/module/certificates')]")
    await this.page.waitForLoadState()
  }

  async VerifyModuleAttendanceCertificate (modules) {
    await expect(this.page.locator("//div[@data-title='" + modules.module_name + ' ' + process.env.uniqueId + "']/following-sibling::div//li//span[@title='Successful validation']/parent::li/following-sibling::li[@title='Download module attendance sheet']")).toBeVisible()
  }

  async enableCertificate () {
    await this.page.click("//label[@for='certificate_options-1']")
    try {
      await expect(this.page.locator("//label[@for='certificate_options-1'][contains(@class,'ui-state-active')]")).toBeVisible()
    } catch (error) {
      await this.page.click("//label[@for='certificate_options-1']")
    }
  }

  async selectAllUsers () {
    await this.page.click('.bloc-body > .checkbox-label > .icon')
  }

  async clickSaveOnVisibilityPage () {
    await this.page.click("//div[@id='std-toolbar']/button")
    await expect(this.page.locator("//li[normalize-space(text())='Module visibility has been updated']")).toBeVisible()
    await this.page.locator("//li[normalize-space(text())='Module visibility has been updated']").waitFor({ state: 'hidden' })
  }

  async clickUsersTab () {
    await this.page.click("//a[contains(@href,'/results/user')]")
  }

  async clickAllContextFilter () {
    await this.page.click("//div[@class='xq-select-content']//span[text()='All contexts']")
  }

  async selectFreeModule () {
    await this.page.click("//ul[@class='xq-option-list']//li//div[@title='Free to play']")
  }

  async selectGroupModuleVisibility (group) {
    await this.page.locator("//div[@class='flex-row groups']//span//label[contains(.,'" + group + ' ' + process.env.uniqueId + "')]").click()
  }

  async verifyMyModuleInviteClosed (moduleData) {
    await expect(this.page.locator("//div[@class='flex-row body ']/div/span[contains(text(),'" + moduleData.module_name + ' ' + process.env.uniqueId + "')]/../..//div/ul/li/i[@title='Module not passed']")).toBeVisible()
  }

  async verifyMyModuleInviteNotOpened (moduleData) {
    await expect(this.page.locator("//div[@class='flex-row body ']/div/span[contains(text(),'" + moduleData.module_name + ' ' + process.env.uniqueId + "')]/../..//div/ul/li/a[@title='Module not opened yet']")).toBeVisible()
  }

  async clickChangeEndDate () {
    await this.page.click("//a[@title='Change end date']")
  }

  async clickSaveOnCloseDatePopupWindow () {
    await this.page.click("//a[text()='Save']")
  }

  async enablePracticeOnQuestionnaireUsage () {
    await this.page.click("//label[@for='elements_options-0-usage-0']")
  }

  async enableEvaluationOnQuestionnaireUsage () {
    await this.page.click("//label[@for='elements_options-1-usage-1']")
  }

  async enableCertificationOnQuestionnaireUsage () {
    await this.page.click("//label[@for='elements_options-2-usage-2']")
  }

  async enableCertificateByEmail () {
    await this.page.click("//label[@for='certificate_options-2']")
  }

  async enableEvaluationsOnQuestionnaireUsage () {
    await this.page.click("//label[@for='elements_options-0-usage-1']")
  }

  async enterSuccessRateOnEvaluationsQuestionnaire (rate) {
    await this.page.locator("//input[@id='elements_options-0-success_rate']").clear()
    await this.page.locator("//input[@id='elements_options-0-success_rate']").pressSequentially(rate.success_rate)
  }

  async enterSuccessRateOnCertificationQuestionnaire (rate) {
    await this.page.locator("//input[@id='elements_options-2-success_rate']").clear()
    await this.page.locator("//input[@id='elements_options-2-success_rate']").pressSequentially(rate.success_rate)
  }

  async verifyUserCompletedWithSuccessRate (rate) {
    await expect(this.page.locator("//div[@class='message']//p[text()='You have completed your questionnaire with a grade of ']//strong[text()='" + rate.success_rate + "%']")).toBeVisible()
  }

  async clickCorrectionButton () {
    await this.page.click("//a[contains(@href,'/evaluations/')][contains(@href,'/correction')]")
  }

  async clickCorrectionButtonOnEvaluationPage () {
    await this.page.click("//a[@title='Correction']")
  }

  async enterAnswer (correction, answer) {
    await this.page.click("(//div[contains(@class,'cke_textarea_inline')])[" + correction + ']')
    await this.page.locator("(//div[contains(@class,'cke_textarea_inline')])[" + correction + ']').pressSequentially(answer)
  }

  async enterScore (correction, score) {
    await this.page.locator("//input[@id='questions-" + correction + "-corrected_score']").clear()
    await this.page.locator("//input[@id='questions-" + correction + "-corrected_score']").pressSequentially(score)
  }

  async correctionStatus (correction, status) {
    await this.page.click("//label[@for='questions-" + correction + "-correct']//span[contains(.,'" + status + "')]")
  }

  async clickSaveOnCorrectionPage (correction) {
    await this.page.click("(//a[contains(text(),'Save')])[" + correction + ']')
  }

  async clickBackToDashboardButton () {
    await this.page.click("//a//span[normalize-space(text())='Back to dashboard']")
  }

  async verifyFirstStepsIsValidated (questionnaires) {
    if (questionnaires.type === 'questionnaire') {
      await expect(this.page.locator("//div[@class='module-step']//div[contains(text(),'" + questionnaires.name + ' ' + process.env.uniqueId + "')]/..//i[@title='validated']")).toBeVisible()
    }
  }

  async disableSideNavigationMenu () {
    await this.page.click("//label[@for='with_nav_menu']//span[text()='No']")
  }

  async verifySideNavigationMenuIsNotDisplayed () {
    await expect(this.page.locator("//div[@class='menu-player-nav']")).not.toBeVisible()
  }

  async verifySideNavigationMenuIsDisplayedWhilePlayQuestionnaire () {
    await expect(this.page.locator("//div[@class='sidebar below-desktop-hide']")).toBeVisible()
  }

  async editContentOnTheCertificateText (module) {
    await this.page.locator("//div[@class='certificate-text']//div[@role='textbox']").clear()
    await this.page.locator("//div[@class='certificate-text']//div[@role='textbox']").pressSequentially(module.certificate_text)
  }

  async editModuleCertificateTitle (module) {
    await this.page.locator("//div[@class='certificate-title']//div[@role='textbox']//p").clear()
    await this.page.locator("//div[@class='certificate-title']//div[@role='textbox']").pressSequentially(module.certificate_title, { delay: 100 })
  }

  async clickModuleAttendance () {
    await this.page.click("//button//span[text()='Certificate']")
  }

  async checkboxIsSelectedForPlayedUser (email) {
    await this.page.click("//div[normalize-space(.)='" + email.last_name.toUpperCase() + ' ' + email.first_name[0].toUpperCase() + email.first_name.slice(1) + "']/preceding-sibling::label//span[@class='fa fa-square-o icon']")
  }

  async checkboxIsSelectedForCreatedModule (module) {
    await this.page.click("//a[contains(@class,'cell link module-name')][contains(normalize-space(.),'" + module.module_name + ' ' + process.env.uniqueId + "')]/preceding-sibling::label[@class='checkbox-label checkbox']")
  }

  async clickAddPublicStatusButton () {
    await expect(this.page.locator("//button[@class='xq-button primary']//span[contains(normalize-space(.),'Add public status')]")).toBeVisible()
    await this.page.click("//button[@class='xq-button primary']//span[contains(normalize-space(.),'Add public status')]")
  }

  async clickRemovePublicStatusButton () {
    await expect(this.page.locator("//button[@class='xq-button primary']//span[contains(normalize-space(.),'remove public status')]")).toBeVisible()
    await this.page.click("//button[@class='xq-button primary']//span[contains(normalize-space(.),'remove public status')]")
  }

  async clickAllModulesFilter () {
    await this.dashboard.waiting()
    await this.page.click("(//div[@class='xq-select-content'])[2]")
  }

  async SelectAllModuleStatus () {
    await this.page.click("//div//ul/li[@title='All modules']")
  }

  async selectPublicModuleStatus () {
    await this.page.click("//div//ul/li[@title='Public modules']")
  }

  async clickPageFilter () {
    await this.dashboard.waiting()
    await this.page.click("(//div[@class='xq-select-content'])[3]")
  }

  async select400PerPage () {
    await this.page.click("//ul//li[@title='400 per page']")
  }

  async selectNonPublicModuleStatus () {
    await this.page.click("//div//ul/li[@title='Not public modules']")
  }

  async verifyModuleOnPublicStatus (module) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(normalize-space(.),'" + module.module_name + ' ' + process.env.uniqueId + "')]")).toBeVisible()
  }

  async verifyModuleOnNonPublicStatus (module) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(normalize-space(.),'" + module.module_name + ' ' + process.env.uniqueId + "')]")).toBeVisible()
  }

  async verifyModuleIsNowPublic (module) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(normalize-space(.),'" + module.module_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//span[text()='A']")).toBeTruthy()
  }

  async verifyModuleIsNotPublic (module) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(normalize-space(.),'" + module.module_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//span[text()='A']")).toHaveCount(0)
  }

  async clickArchiveModuleButton () {
    await this.page.click("//button[@class='xq-button primary']//span[contains(normalize-space(.),'archive module')]")
  }

  async clickUnarchiveModuleButton () {
    await this.page.click("//button[@class='xq-button primary']//span[contains(normalize-space(.),'unarchive module')]")
  }

  async clickAllStatusFilter () {
    await this.dashboard.waiting()
    await this.page.click("(//div[@class='xq-select-content'])[1]")
  }

  async selectAllStatus () {
    await this.page.click("//div//ul/li[@title='All status']")
  }

  async selectArchivedModuleStatus () {
    await this.page.click("//div//ul/li[@title='Archived']")
  }

  async selectActiveModuleStatus () {
    await this.page.click("//div//ul/li[@title='Active']")
  }

  async verifyArchivedModuleIsOnArchivedStatus (module) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(normalize-space(.),'" + module.module_name + ' ' + process.env.uniqueId + "')]/preceding-sibling::span[contains(@class,'archived-icon')]")).toBeVisible()
  }

  async verifyUnarchivedModuleIsOnActiveStatus (module) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(normalize-space(.),'" + module.module_name + ' ' + process.env.uniqueId + "')]")).toBeVisible()
  }

  async verifyArchivedModule (module) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(normalize-space(.),'" + module.module_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//ul//li[@title='Edit']//div[contains(@class,'inactive')]")).toBeVisible()
  }

  async verifyUnarchivedModule (module) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(normalize-space(.),'" + module.module_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//ul//li[@title='Edit']//a")).toBeVisible()
  }

  async verifyArchiveModuleVisibility (module) {
    await expect(this.page.locator("//a[contains(@class,'cell link module-name')][contains(normalize-space(.),'" + module.module_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//span[text()='V']")).toBeTruthy()
  }

  async enableConsequenceOption () {
    await this.page.click("(//div[contains(@class,'activate-consequences')]//div[contains(@class,'yes-no-checkbox form-control')]//span[@class='checked'])[1]")
  }

  async verifyConsequenceMessageAtEndOfTheTest (users, message) {
    await expect(this.page.locator("//p[contains(text(),'" + message.message_verification + ' ' + users.first_name[0].toUpperCase() + users.first_name.slice(1) + ' ' + users.last_name[0].toUpperCase() + users.last_name.slice(1) + "!')]")).toBeVisible()
  }

  async enableNotifyByEmail () {
    await expect(this.page.locator("//div[@class='action-if-failed']//div//label[contains(@for,'with_email')]//span[@class='checked'][text()='Yes']")).toBeVisible()
  }

  async disableAssignToGroup () {
    if (await this.page.locator("//div[@class='action-if-failed']//div[@id='show-group']").isVisible()) {
      await this.page.click("//div[@class='action-if-failed']//div[contains(@id,'assignment-to-group')]//div[contains(@class,'yes-no-checkbox')]")
      await expect(this.page.locator("//div[@class='action-if-failed']//div[@id='show-group']")).not.toBeVisible()
    }
  }
}
