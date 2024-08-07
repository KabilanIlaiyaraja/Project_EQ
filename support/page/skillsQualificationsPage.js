const { expect } = require('@playwright/test')

exports.SkillsQualificationsPage = class SkillsQualificationsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
  }

  async clickSkillsMenu () {
    await this.page.click("//nav[@id='nav-main']//span[contains(text(),'Skills')]")
    await this.page.waitForLoadState('load')
  }

  async clickNewSkillsBlock () {
    await this.page.click("//a[@href='/skills_block/create']")
  }

  async enterSkillBlockName (block) {
    await this.page.locator('#name').clear()
    await this.page.locator('#name').pressSequentially(block.block_name + ' ' + process.env.uniqueId)
  }

  async enterSkillBlockAbbreviation (abb) {
    await this.page.locator("//input[@id='short_name']").clear()
    await this.page.locator("//input[@id='short_name']").pressSequentially(abb.block_abbreviation)
  }

  async enterSkillBlockReference (ref) {
    await this.page.locator("//input[@id='reference']").clear()
    await this.page.locator("//input[@id='reference']").pressSequentially(ref.block_reference + process.env.uniqueId)
  }

  async clickSkillBlockSave () {
    await this.page.click("//button[@class='btn btn-primary']")
  }

  async clickNewSkills (block) {
    await this.page.click("//a[normalize-space(text())='" + block.block_name + ' ' + process.env.uniqueId + "']/following-sibling::div//a[@title='New skill']")
  }

  async enterAbbreviation2 (abb) {
    await this.page.locator("//input[@id='short_name']").clear()
    await this.page.locator("//input[@id='short_name']").pressSequentially(abb.skill_abbreviation, { delay: 100 })
  }

  async enterSkillReference (ref) {
    await this.page.locator("//form[contains(@action,'/enterprise/skill')]//input[@name='reference']").clear()
    await this.page.locator("//form[contains(@action,'/enterprise/skill')]//input[@name='reference']").pressSequentially(ref.skill_reference + process.env.uniqueId, { delay: 100 })
  }

  async enterSkillName (name) {
    await this.page.locator("//label[normalize-space(text())='Name of skill']/following-sibling::input[@class='form-control']").clear()
    await this.page.locator("//label[normalize-space(text())='Name of skill']/following-sibling::input[@class='form-control']").pressSequentially(name.skill_name + ' ' + process.env.uniqueId, { delay: 100 })
  }

  async clickSaveSkill () {
    await this.page.click("//form[contains(@action,'/enterprise/skill')]//button[@class='btn btn-primary']")
  }

  async clickDetailOnBlock (block) {
    if (!await this.page.locator("//div[@id='skills_block-detail-1']").isVisible()) {
      await this.page.click("//a[normalize-space(text())='" + block.block_name + ' ' + process.env.uniqueId + "']/following-sibling::div//a[@title='Detail']")
    }
  }

  async clickDetailOnSkill (skill) {
    if (!await this.page.locator("(//div[contains(@class,'skills-detail-panel')])[1]").isVisible()) {
      await this.page.click("//*[@class='cell skill-name']//a[normalize-space(text())='" + skill.skill_name + ' ' + process.env.uniqueId + "']/parent::div/following-sibling::div//a[contains(@href,'#skill-detail')]")
    }
  }

  async clickNewCapacity (skill) {
    await this.page.click("//a[normalize-space(text())='" + skill.skill_name + ' ' + process.env.uniqueId + "']/parent::div/following-sibling::div//a[@title='New capacity']")
  }

  async enterCapacityreference (ref) {
    await this.page.locator("//form[contains(@action,'/enterprise/capacity')]//input[@name='reference']").clear()
    await this.page.locator("//form[contains(@action,'/enterprise/capacity')]//input[@name='reference']").pressSequentially(ref.cap_reference + process.env.uniqueId, { delay: 100 })
  }

  async enterCapacityreferenceWithoutTimeStamp (ref) {
    await this.page.locator("//form[contains(@action,'/enterprise/capacity')]//input[@name='reference']").clear()
    await this.page.locator("//form[contains(@action,'/enterprise/capacity')]//input[@name='reference']").pressSequentially(ref.cap_reference, { delay: 100 })
  }

  async enterCapacityName (capacity) {
    await this.page.locator("//label[normalize-space(text())='Name of capacity']/following-sibling::input[@class='form-control']").clear()
    await this.page.locator("//label[normalize-space(text())='Name of capacity']/following-sibling::input[@class='form-control']").pressSequentially(capacity.cap_name + ' ' + process.env.uniqueId, { delay: 100 })
  }

  async clickManualTypeCapacity () {
    await this.page.click("//ul[@id='certification_mode']//label[text()='manual']")
  }

  async clickAutoTypeCapacity () {
    await this.page.click("//ul[@id='certification_mode']//label[text()='automatic']")
  }

  async clickSaveCapacity () {
    await this.page.click("//form[contains(@action,'/enterprise/capacity')]//button[@class='btn btn-primary']")
  }

  async verifyBlock (block) {
    await expect(this.page.locator("//*[@id='skills_blocks-list']//a[normalize-space(text())='" + block.block_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async verifySkill (skill) {
    await expect(this.page.locator("//*[@class='cell skill-name']//a[normalize-space(text())='" + skill.skill_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async verifyManualCapacity (manual) {
    await expect(this.page.locator("//div[@class='cell name']//a[normalize-space(text())='" + manual.cap_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async verifyAutoCapacity (auto) {
    await expect(this.page.locator("//div[@class='cell name']//a[normalize-space(text())='" + auto.cap_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async clickQualificationTab () {
    await this.page.click("//div[@class='tabs-wrapper']//a[text()='Qualifications']")
  }

  async clickNewQualificationButton () {
    await this.page.click("//div[@class='btn-toolbar']//a[@class='btn btn-primary']")
  }

  async enterQualicationFamilyCode (qualifications) {
    await this.page.locator("//form[contains(@action,'Qualification/create')]//input[@name='family_code']").clear()
    await this.page.locator("//form[contains(@action,'Qualification/create')]//input[@name='family_code']").pressSequentially(qualifications.family_code, { delay: 100 })
  }

  async enterQualificationFamilyName (qualifications) {
    await this.page.locator("//form[contains(@action,'Qualification/create')]//input[@name='family_name']").clear()
    await this.page.locator("//form[contains(@action,'Qualification/create')]//input[@name='family_name']").pressSequentially(qualifications.family_name + ' ' + process.env.uniqueId, { delay: 100 })
  }

  async enterTheQualificationCode (qualifications) {
    await this.page.locator("//form[contains(@action,'Qualification/create')]//input[@name='code']").clear()
    await this.page.locator("//form[contains(@action,'Qualification/create')]//input[@name='code']").pressSequentially(qualifications.code, { delay: 100 })
  }

  async enterTheQualificationName (qualifications) {
    await this.page.locator("//form[contains(@action,'Qualification/create')]//input[@name='name']").clear()
    await this.page.locator("//form[contains(@action,'Qualification/create')]//input[@name='name']").pressSequentially(qualifications.name + ' ' + process.env.uniqueId, { delay: 100 })
  }

  async enterQulaficationDescription (qualifications) {
    await this.page.locator("//form[contains(@action,'Qualification/create')]//textarea[@id='description']").clear()
    await this.page.locator("//form[contains(@action,'Qualification/create')]//textarea[@id='description']").pressSequentially(qualifications.description, { delay: 100 })
  }

  async clickCreateButton () {
    await this.page.click("(//div[@class='btn-toolbar']//button[@type='submit'])[1]")
    await expect(this.page.locator("//div[@class='xq-flashes xq-m collapse']")).toBeVisible()
    await this.page.locator("//div[@class='xq-flashes xq-m collapse']").waitFor({ state: 'hidden' })
  }

  async verifySkillIsDisplayed (skillBlock) {
    await expect(this.page.locator("//div[normalize-space(text())='" + skillBlock.block_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async clickToggleSwitch (skillBlock) {
    await this.page.click("//div[normalize-space(text())='" + skillBlock.block_name + ' ' + process.env.uniqueId + "']/following-sibling::div//span[@class='fa fa-toggle-off unchecked  ']")
  }

  async clickSaveButton () {
    await this.page.click('#checked-save-btn')
    await expect(this.page.locator("//div[@class='xq-flashes xq-m collapse']")).toBeVisible()
    await this.page.locator("//div[@class='xq-flashes xq-m collapse']").waitFor({ state: 'hidden' })
    await this.page.waitForLoadState('load')
  }

  async clickJobsTab () {
    await this.page.click("//li//a[text()='Jobs']")
  }

  async clickNewJobsButton () {
    await this.page.click("div#standard-toolbar>a[class='btn btn-primary']")
  }

  async enterJobsFamilyCode (jobs) {
    await this.page.locator("//form[contains(@action,'Job/create')]//input[@name='family_code']").clear()
    await this.page.locator("//form[contains(@action,'Job/create')]//input[@name='family_code']").pressSequentially(jobs.family_code, { delay: 100 })
  }

  async enterJobsFamilyName (jobs) {
    await this.page.locator("//form[contains(@action,'Job/create')]//input[@name='family_name']").clear()
    await this.page.locator("//form[contains(@action,'Job/create')]//input[@name='family_name']").pressSequentially(jobs.family_name + ' ' + process.env.uniqueId, { delay: 100 })
  }

  async enterTheJobsCode (jobs) {
    await this.page.locator("//form[contains(@action,'Job/create')]//input[@name='code']").clear()
    await this.page.locator("//form[contains(@action,'Job/create')]//input[@name='code']").pressSequentially(jobs.code, { delay: 100 })
  }

  async enterTheJobsName (jobs) {
    await this.page.locator("//form[contains(@action,'Job/create')]//input[@name='name']").clear()
    await this.page.locator("//form[contains(@action,'Job/create')]//input[@name='name']").pressSequentially(jobs.name + ' ' + process.env.uniqueId, { delay: 100 })
  }

  async enterJobsDescription (jobs) {
    await this.page.locator("//form[contains(@action,'Job/create')]//textarea[@id='description']").clear()
    await this.page.locator("//form[contains(@action,'Job/create')]//textarea[@id='description']").pressSequentially(jobs.description, { delay: 100 })
  }

  async clickSkillTab () {
    await this.page.click("//li//a[text()='Skills']")
  }

  async clickDeleteButton (skillBlock) {
    await this.page.click("//a[normalize-space(text())='" + skillBlock.block_name + ' ' + process.env.uniqueId + "']/following-sibling::div//a[@title='Delete']")
  }

  async clickDeleteImportSkill (skillImport) {
    await this.page.click("(//div[text()='" + skillImport.name + "']/following-sibling::div//ul//a[@title='Delete file'])[1]")
    await expect(this.page.locator("//div[contains(@class,'xq-flashes')]")).toBeVisible()
    await this.page.locator("//div[contains(@class,'xq-flashes')]").waitFor({ state: 'hidden' })
  }

  async confirmDeleteButtonForSkillBlock () {
    await this.page.click("//a[contains(@href,'/enterprise/skills_block')][text()='Delete']")
    await expect(this.page.locator("//div[@class='xq-flashes xq-m collapse']")).toBeVisible()
    await this.page.locator("//div[@class='xq-flashes xq-m collapse']").waitFor({ state: 'hidden' })
  }

  async confirmDeleteButtonSkillBlock () {
    await this.page.click("//a[contains(@href,'/enterprise/skills_block')][text()='Delete']")
  }

  async verifyValidtionMsg () {
    await expect(this.page.locator("//div[@class='xq-flashes xq-m collapse']//ul//li[contains(normalize-space(.),'Skills block are used in qualifications or jobs')]")).toBeVisible()
  }

  async clickTheCheckBox () {
    await this.page.click("//label//span[contains(@class,'fa fa-square-o unchecked check')]")
  }

  async clickDelete () {
    await this.page.click('div[id=objs-checked-toolbar]>a[id=delete-objs-btn]')
  }

  async verifyCreatedQualificationIsDeleted (qualifications) {
    await expect(this.page.locator("//a//span[normalize-space(text())='" + qualifications.name + ' ' + process.env.uniqueId + "']")).not.toBeVisible()
  }

  async verifyCreatedJobsIsDeleted (jobs) {
    await expect(this.page.locator("//a//span[normalize-space(text())='" + jobs.name + ' ' + process.env.uniqueId + "']")).not.toBeVisible()
  }

  async verifyCreatedSkillBlockIsDeleted (skillBlock) {
    await expect(this.page.locator("//a[normalize-space(text())='" + skillBlock.block_name + ' ' + process.env.uniqueId + "']")).not.toBeVisible()
  }

  async confirmDeleteButtonForJobs () {
    await this.page.click("//a[@class='btn btn-danger btn-ok']")
    await expect(this.page.locator("//div[@class='xq-flashes xq-m collapse']")).toBeVisible()
    await this.page.locator("//div[@class='xq-flashes xq-m collapse']").waitFor({ state: 'hidden' })
  }

  async confirmDeleteButtonForQualification () {
    await this.page.click("(//a[@id='confirm-delete-list-btn'])[1]")
    await expect(this.page.locator("//div[@class='xq-flashes xq-m collapse']")).toBeVisible()
    await this.page.locator("//div[@class='xq-flashes xq-m collapse']").waitFor({ state: 'hidden' })
  }

  async clickImport () {
    await this.page.click("//li//a[text()='Import']")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//div[@id='skills-file-upload-page']")).toBeVisible()
  }

  async uploadSkillDocument (skillImport) {
    await expect(this.page.locator("//section//div[@id='dropzone']")).toBeVisible()
    const mediaDirectory = process.cwd() + '/media/' + skillImport.name
    await this.page.setInputFiles("input[type='file']", mediaDirectory)
    await expect(this.page.locator("(//div[@id='skills-files-list']//div[text()='" + skillImport.name + "'])[1]")).toBeVisible()
  }

  async clickSkillsOverview () {
    await this.page.click("//a[contains(text(),'Overview ')]")
  }

  async clickDeleteRepositaryButton () {
    await this.page.click("//a[normalize-space(text())='Delete repository']")
  }

  async clickConfirmDeleteRepository () {
    await this.page.click("//div[@class='btn-toolbar']//a[@class='btn btn-danger btn-ok']")
  }

  async verifyDeletedRepositaryUnderSkillTab (skillBlock) {
    await expect(this.page.locator("//a[normalize-space(text())='" + skillBlock.block_name + "']")).not.toBeVisible()
  }

  async verifyDeletedRepositaryUnderQualificationTab (qualifications) {
    await this.clickQualificationTab()
    await expect(this.page.locator("//a//span[normalize-space(text())='" + qualifications.name + "']")).not.toBeVisible()
  }

  async verifyDeletedRepositaryUnderJobsTab (jobs) {
    await this.clickJobsTab()
    await expect(this.page.locator("//a//span[normalize-space(text())='" + jobs.name + "']")).not.toBeVisible()
  }

  async clickSkillsUsersTab () {
    await this.page.click("//a[@href='/enterprise/users/skills/skill/all/all'][text()='Users']")
  }

  async clickBlockFilterButton () {
    await this.page.click("//span[text()='Zoom in on a skills block']")
  }

  async selectBlock (block) {
    await this.page.click("//div[contains(@class,'ui-selectmenu-open')]//div[contains(text(),'" + block.block_name + ' ' + process.env.uniqueId + "')]")
  }

  async clickEditUser (user) {
    await this.page.click("//a[contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/parent::div/following-sibling::div//a[@class='fa fa-pencil']")
  }

  async clickOpenDetailBlock (block) {
    await this.page.click("//div[@class='cell title'][normalize-space(text())='" + block.block_name + ' ' + process.env.uniqueId + "']/following-sibling::div//a[@title='Detail']")
  }

  async clickOpenDetailSkill (skill) {
    await this.page.click("//div[@class='cell title'][normalize-space(text())='" + skill.skill_name + ' ' + process.env.uniqueId + "']/following-sibling::div//a[@title='Detail']")
  }

  async clickMessage (capacity) {
    await this.page.click("//div[contains(text(),'" + capacity.cap_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//i[@class='fa fa-comment-o']")
  }

  async enterValidationRate (rate) {
    await this.page.click("//input[@id='success_rate']")
    await this.page.locator("//input[@id='success_rate']").clear()
    await this.page.locator("//input[@id='success_rate']").pressSequentially(rate.items[0].validation_rate, { delay: 100 })
  }

  async clickValiadateButton () {
    await this.page.click("//button[@id='capacity-opinion-validation-save-btn']")
  }

  async clickCertifyButton () {
    await this.page.click("//a[@title='Certify']")
  }

  async verifyCertifyOrNot () {
    const rate = await this.page.locator("//span[normalize-space(@class)='green-color']").innerText()
    if (rate === '100%') {
      console.log('verified')
    } else {
      console.log('not verified')
    }
  }

  async enterActionForCapacity (actionMessgae) {
    await this.page.locator("//textarea[@id='actions_consequence_translated']").clear()
    await this.page.locator("//textarea[@id='actions_consequence_translated']").pressSequentially(actionMessgae.capacity_action, { delay: 100 })
  }

  async clickDeleteButtonSkillBlock () {
    await this.page.click("(//div[contains(@class,'skills-block-div')])[1]//div//div//ul//li//a[@title='Delete']")
  }

  async clickConfirmDeleteSkillBlock () {
    await this.page.click("//div[@class='btn-toolbar']//a[text()='Delete']")
  }

  async clickBackToQualifications () {
    await this.page.click("//a[normalize-space(.)='Back to qualifications']")
  }

  async VerifyQualification (qualifications) {
    await expect(this.page.locator("//a//span[text()='" + qualifications.name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async clickBackToJobs () {
    await this.page.click("//a[normalize-space(.)='Back to jobs']")
  }

  async VerifyJob (jobs) {
    await expect(this.page.locator("//a//span[text()='" + jobs.name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async clickEditStatus (name) {
    await expect(this.page.locator("//a[contains(text(),'" + name.last_name.toUpperCase() + ' ' + name.first_name[0].toUpperCase() + name.first_name.slice(1) + "')]/parent::div/following-sibling::div//a[@class='fa fa-pencil']")).toBeVisible()
    await this.page.click("//a[contains(text(),'" + name.last_name.toUpperCase() + ' ' + name.first_name[0].toUpperCase() + name.first_name.slice(1) + "')]/parent::div/following-sibling::div//a[@class='fa fa-pencil']")
  }

  async clickSkillsBlockDetail () {
    await this.page.click("//a[contains(@href,'#skills_block-detail')]")
  }

  async clickSkillsDetail () {
    await this.page.click("//a[contains(@href,'#skill-detail')]")
  }

  async verifyAutoCapacityActionArePassed (capName, validationRate) {
    await expect(this.page.locator("//div[contains(@title,'" + capName + "')]/parent::div/following-sibling::div//strong[text()='" + validationRate + "%']")).toBeVisible()
  }
}
