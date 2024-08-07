// @ts-check
const { DashboardPage } = require('../page/dashboardPage')
const { SkillsQualificationsPage } = require('../page/skillsQualificationsPage')
const { QuestionnairePage } = require('../page/questionnairePage')

// @ts-check
exports.SkillsQualificationsAction = class SkillsQualificationsAction {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor (page) {
    this.page = page
    this.skillsqualification = new SkillsQualificationsPage(this.page)
  }

  async createSkillsBlockSkillsAndCapacity (skillBlock, skill, manual, auto) {
    await this.skillsqualification.clickSkillsMenu()
    await this.createSkillsBlock(skillBlock, skill)
    await this.createManCapacity(skillBlock, skill, manual)
    await this.createAutoCapacity(skillBlock, skill, auto)
  }

  async createSkillsBlock (block, skill) {
    await this.skillsqualification.clickSkillsMenu()
    await this.skillsqualification.clickNewSkillsBlock()
    await this.skillsqualification.enterSkillBlockName(block)
    await this.skillsqualification.enterSkillBlockAbbreviation(block)
    await this.skillsqualification.enterSkillBlockReference(block)
    await this.skillsqualification.clickSkillBlockSave()
    await this.createSkills(block, skill)
  }

  async createSkills (block, skills) {
    await this.skillsqualification.clickSkillsMenu()
    await this.skillsqualification.clickNewSkills(block)
    await this.page.waitForTimeout(2000)
    await this.skillsqualification.enterAbbreviation2(skills)
    await this.skillsqualification.enterSkillReference(skills)
    await this.skillsqualification.enterSkillName(skills)
    await this.skillsqualification.clickSaveSkill()
  }

  async createManCapacity (block, skill, manualCapacity) {
    await this.skillsqualification.clickSkillsMenu()
    await this.skillsqualification.clickDetailOnBlock(block)
    await this.skillsqualification.clickNewCapacity(skill)
    await this.page.waitForTimeout(2000)
    await this.skillsqualification.enterCapacityreference(manualCapacity)
    await this.skillsqualification.enterCapacityName(manualCapacity)
    await this.skillsqualification.clickManualTypeCapacity()
    await this.skillsqualification.clickSaveCapacity()
  }

  async createAutoCapacity (block, skill, autoCapacity) {
    await this.skillsqualification.clickSkillsMenu()
    await this.skillsqualification.clickDetailOnBlock(block)
    await this.skillsqualification.clickNewCapacity(skill)
    await this.page.waitForTimeout(2000)
    await this.skillsqualification.enterCapacityreference(autoCapacity)
    await this.skillsqualification.enterCapacityName(autoCapacity)
    await this.skillsqualification.clickAutoTypeCapacity()
    await this.skillsqualification.clickSaveCapacity()
  }

  async createAutoCapacityConsequence (block, skill, autoCapacity) {
    await this.skillsqualification.clickSkillsMenu()
    await this.skillsqualification.clickDetailOnBlock(block)
    await this.skillsqualification.clickNewCapacity(skill)
    await this.page.waitForTimeout(2000)
    await this.skillsqualification.enterCapacityreferenceWithoutTimeStamp(autoCapacity)
    await this.skillsqualification.enterCapacityName(autoCapacity)
    await this.skillsqualification.clickAutoTypeCapacity()
    await this.skillsqualification.clickSaveCapacity()
  }

  async verifySkillBlockSkillAndCapacity (block, skills, manualCapacity, autoCapacity) {
    await this.skillsqualification.clickSkillsMenu()
    await this.skillsqualification.verifyBlock(block)
    await this.skillsqualification.clickDetailOnBlock(block)
    await this.skillsqualification.verifySkill(skills)
    await this.skillsqualification.clickDetailOnSkill(skills)
    await this.skillsqualification.verifyManualCapacity(manualCapacity)
    await this.skillsqualification.verifyAutoCapacity(autoCapacity)
  }

  async verifySkillBlockAndSkill (block, skills) {
    await this.skillsqualification.clickSkillsMenu()
    await this.skillsqualification.verifyBlock(block)
    await this.skillsqualification.clickDetailOnBlock(block)
    await this.skillsqualification.verifySkill(skills)
  }

  async createQualificationAndJobs (qualifications, jobs, skillBlock) {
    await this.createQualification(qualifications, skillBlock)
    await this.createJobs(jobs, skillBlock)
  }

  async createQualification (qualifications, skillBlock) {
    await this.skillsqualification.clickQualificationTab()
    await this.skillsqualification.clickNewQualificationButton()
    await this.page.waitForTimeout(2000)
    await this.skillsqualification.enterQualicationFamilyCode(qualifications)
    await this.skillsqualification.enterQualificationFamilyName(qualifications)
    await this.skillsqualification.enterTheQualificationCode(qualifications)
    await this.skillsqualification.enterTheQualificationName(qualifications)
    await this.skillsqualification.enterQulaficationDescription(qualifications)
    await this.skillsqualification.clickCreateButton()
    await this.skillsqualification.verifySkillIsDisplayed(skillBlock)
    await this.skillsqualification.clickToggleSwitch(skillBlock)
    await this.skillsqualification.clickSaveButton()
    await this.skillsqualification.clickBackToQualifications()
    await this.skillsqualification.VerifyQualification(qualifications)
  }

  async createJobs (jobs, skillBlock) {
    await this.skillsqualification.clickJobsTab()
    await this.skillsqualification.clickNewJobsButton()
    await this.page.waitForTimeout(2000)
    await this.skillsqualification.enterJobsFamilyCode(jobs)
    await this.skillsqualification.enterJobsFamilyName(jobs)
    await this.skillsqualification.enterTheJobsCode(jobs)
    await this.skillsqualification.enterTheJobsName(jobs)
    await this.skillsqualification.enterJobsDescription(jobs)
    await this.skillsqualification.clickCreateButton()
    await this.skillsqualification.verifySkillIsDisplayed(skillBlock)
    await this.skillsqualification.clickToggleSwitch(skillBlock)
    await this.skillsqualification.clickSaveButton()
    await this.skillsqualification.clickBackToJobs()
    await this.skillsqualification.VerifyJob(jobs)
  }

  async VerifyUserIsAbleToDeleteSkill (skillBlock) {
    await this.skillsqualification.clickSkillTab()
    await this.skillsqualification.clickDeleteButton(skillBlock)
    await this.skillsqualification.confirmDeleteButtonSkillBlock()
    await this.skillsqualification.verifyValidtionMsg()
  }

  async deleteQuaification (qualification) {
    await this.skillsqualification.clickQualificationTab()
    await this.skillsqualification.clickTheCheckBox()
    await this.skillsqualification.clickDelete()
    await this.skillsqualification.confirmDeleteButtonForQualification()
    await this.page.reload({ waitUntil: 'load' })
    await this.skillsqualification.verifyCreatedQualificationIsDeleted(qualification)
  }

  async deleteJobs (jobs) {
    await this.skillsqualification.clickJobsTab()
    await this.skillsqualification.clickTheCheckBox()
    await this.skillsqualification.clickDelete()
    await this.skillsqualification.confirmDeleteButtonForJobs()
    await this.page.reload({ waitUntil: 'load' })
    await this.skillsqualification.verifyCreatedJobsIsDeleted(jobs)
  }

  async deleteSkills (skillBlock) {
    await this.skillsqualification.clickSkillsMenu()
    await this.skillsqualification.clickDeleteButton(skillBlock)
    await this.skillsqualification.confirmDeleteButtonForSkillBlock()
    await this.page.reload({ waitUntil: 'load' })
    await this.skillsqualification.verifyCreatedSkillBlockIsDeleted(skillBlock)
  }

  async importSkills (skillImport) {
    await this.skillsqualification.clickSkillsMenu()
    await this.skillsqualification.clickImport()
    await this.skillsqualification.uploadSkillDocument(skillImport)
    await this.skillsqualification.clickSkillsOverview()
  }

  async deleteImportedSkills (skillImport) {
    await this.skillsqualification.clickSkillsMenu()
    await this.skillsqualification.clickImport()
    await this.skillsqualification.clickDeleteImportSkill(skillImport)
  }

  async deleteRepositaryBlock (skillBlock, qualifications, jobs) {
    await this.skillsqualification.clickSkillTab()
    await this.skillsqualification.clickDeleteRepositaryButton()
    await this.skillsqualification.clickConfirmDeleteRepository()
    await this.page.reload({ waitUntil: 'load' })
    await this.skillsqualification.verifyDeletedRepositaryUnderSkillTab(skillBlock)
    await this.skillsqualification.verifyDeletedRepositaryUnderQualificationTab(qualifications)
    await this.skillsqualification.verifyDeletedRepositaryUnderJobsTab(jobs)
  }

  async createSkillsBlockWithManualCapacity (skillBlock, skill, manual) {
    await this.skillsqualification.clickSkillsMenu()
    await this.createSkillsBlock(skillBlock, skill)
    await this.createManCapacity(skillBlock, skill, manual)
  }

  async validateManualCapacity (userData, block, skill, manual, manualValidation) {
    this.dashboard = new DashboardPage(this.page)
    await this.skillsqualification.clickSkillsMenu()
    await this.skillsqualification.clickSkillsUsersTab()
    await this.skillsqualification.clickBlockFilterButton()
    await this.skillsqualification.selectBlock(block)
    await this.skillsqualification.clickEditUser(userData)
    await this.skillsqualification.clickOpenDetailBlock(block)
    await this.skillsqualification.clickOpenDetailSkill(skill)
    await this.skillsqualification.clickMessage(manual)
    await this.skillsqualification.enterValidationRate(manualValidation)
    await this.skillsqualification.clickValiadateButton()
    await this.skillsqualification.clickCertifyButton()
    await this.skillsqualification.clickBlockFilterButton()
    await this.skillsqualification.selectBlock(block)
    await this.skillsqualification.verifyCertifyOrNot()
  }

  async validateAutoCapacity (block, user) {
    await this.skillsqualification.clickSkillsMenu()
    await this.skillsqualification.clickSkillsUsersTab()
    await this.skillsqualification.clickEditUser(user)
    await this.skillsqualification.clickCertifyButton()
    await this.skillsqualification.clickBlockFilterButton()
    await this.skillsqualification.selectBlock(block)
    await this.skillsqualification.verifyCertifyOrNot()
  }

  async createSkillsBlockWithAutoCapacity (skillBlock, skill, manual) {
    await this.skillsqualification.clickSkillsMenu()
    await this.createSkillsBlock(skillBlock, skill)
    await this.createAutoCapacityConsequence(skillBlock, skill, manual)
  }

  async enterActionConsequence (base, questionnaire, actionMessage) {
    this.dashboard = new DashboardPage(this.page)
    this.questionnaire = new QuestionnairePage(this.page)
    await this.dashboard.clickQuestionnaire()
    await this.questionnaire.clickTopicFilter()
    await this.questionnaire.selectBase(base)
    await this.questionnaire.openQuestionnaire(questionnaire)
    await this.questionnaire.clickOptions()
    await this.skillsqualification.enterActionForCapacity(actionMessage)
    await this.questionnaire.clickSaveOptionPage()
  }

  async deleteAllSkillBlock () {
    await this.skillsqualification.clickSkillsMenu()
    await this.page.waitForLoadState('load')
    if (await this.page.locator("(//div[contains(@class,'skills-block-div')])[1]").isVisible()) {
      const count = await this.page.locator("//div[contains(@class,'skills-block-div')]").count()
      for (let index = 0; index < count; index++) {
        await this.skillsqualification.clickDeleteButtonSkillBlock()
        await this.skillsqualification.clickConfirmDeleteSkillBlock()
      }
    }
  }

  async verifyAutoCapacityActionArePassed (blockName, user, capName, rate) {
    await this.skillsqualification.clickSkillsMenu()
    await this.skillsqualification.clickSkillsUsersTab()
    await this.skillsqualification.clickBlockFilterButton()
    await this.skillsqualification.selectBlock(blockName)
    await this.page.waitForLoadState('load')
    await this.skillsqualification.clickEditStatus(user)
    await this.skillsqualification.clickSkillsBlockDetail()
    await this.skillsqualification.clickSkillsDetail()
    await this.skillsqualification.verifyAutoCapacityActionArePassed(capName, rate)
  }
}
