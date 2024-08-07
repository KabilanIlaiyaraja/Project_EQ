const { expect } = require('@playwright/test')

exports.BasePage = class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
  }

  async clickNewBase () {
    await expect(this.page.locator("//div[@class='holder-filters-and-buttons']//a[normalize-space()='new base']")).toBeVisible()
    await this.page.click("//div[@class='holder-filters-and-buttons']//a[normalize-space()='new base']")
  }

  async enterBasename (baseName) {
    await this.page.locator("//section[@class='bloc']//input[@input-id='topic-text-form-group']").clear()
    await this.page.fill("//section[@class='bloc']//input[@input-id='topic-text-form-group']", baseName.base_name + ' ' + process.env.uniqueId)
  }

  async clickNoformatText () {
    await this.page.click("//input[@button-id='use-markdown-form-group']")
  }

  async createSingleDomain (domains) {
    await expect(this.page.locator("//div[@class='cell domain-text']//input[@class='xq-input']")).toBeVisible()
    await this.page.fill("//div[@class='cell domain-text']//input[@class='xq-input']", domains.domains[0])
  }

  async clickSaveBase () {
    await this.page.click("//button[@class='xq-button primary']//span[normalize-space(text())='save']")
  }

  async verifyBasePresent (baseName) {
    await expect(this.page.locator("//a[@class='cell link topic-name'][normalize-space()='" + baseName.base_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async clickDeleteIcon (baseName) {
    await this.page.click("//ul[@class='xq-table-body']//div//a[normalize-space()='" + baseName.base_name + ' ' + process.env.uniqueId + "']/following-sibling::div//ul//li[@title='Delete']")
  }

  async confirmDelete (baseName) {
    await this.page.click("//strong[normalize-space()='" + baseName.base_name + ' ' + process.env.uniqueId + "']//parent::p/following-sibling::div//button[@class='xq-button danger']")
  }

  async verifyBaseDeleted (baseName) {
    await expect(this.page.locator("//a[@class='cell link topic-name'][normalize-space()='" + baseName.base_name + ' ' + process.env.uniqueId + "']")).toHaveCount(0)
  }

  async clickEditBase (baseName) {
    await this.page.click("//div//a[normalize-space()='" + baseName.base_name + ' ' + process.env.uniqueId + "']/following-sibling::div//li[@title='Edit base']")
  }

  async createMultipleDomain (domains) {
    let index = 1
    for (const domain of domains) {
      await this.page.locator("(//div[@class='flex-row']//div[@class='cell domain-text']//input)[" + index + ']').pressSequentially(domain, { delay: 100 })
      const domainlen = domains.length - 1
      if (domainlen >= index) {
        await this.page.click("//div//div[contains(@class,'add-domain')]")
      }
      index++
    }
  }

  async openBase (baseName) {
    await expect(this.page.locator("//a[normalize-space()='" + baseName.base_name + ' ' + process.env.uniqueId + "'][1]")).toBeVisible()
    await this.page.click("//a[normalize-space()='" + baseName.base_name + ' ' + process.env.uniqueId + "'][1]")
    await expect(this.page.locator("//div[@class='overview-wrapper']")).toBeVisible()
  }

  async openArchivebase (baseName) {
    await expect(this.page.locator("//span[@title='Archived base']/following-sibling::a[normalize-space()='" + baseName.base_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
    await this.page.click("//span[@title='Archived base']/following-sibling::a[normalize-space()='" + baseName.base_name + ' ' + process.env.uniqueId + "']")
    await expect(this.page.locator("//div[@class='overview-wrapper']")).toBeVisible()
  }

  async openDuplicateBase (base) {
    await expect(this.page.locator("//a[@class='cell link topic-name'][contains(.,'" + base.base_name + ' ' + process.env.uniqueId + " (copy)')]")).toBeVisible({ timeout: 30000 })
    await this.page.click("//a[@class='cell link topic-name'][contains(.,'" + base.base_name + ' ' + process.env.uniqueId + " (copy)')]")
    await expect(this.page.locator("//div[@class='overview-wrapper']")).toBeVisible()
  }

  async verifyCreatedDomains (domain) {
    for (const domains of domain) {
      await expect(this.page.locator("//div[@class='grid-wrap']//label[normalize-space()= 'Domains']/following-sibling::div[contains(text(),'" + domains + "')]")).toBeVisible()
    }
  }

  async clickQuestionsTab () {
    await this.page.click("//div[@class='xq-nav-tab-wrapper']//a[normalize-space()='Questions']")
    await expect(this.page.locator("//div[@class='holder-filters-and-buttons']")).toBeVisible()
  }

  async clickQuestionnaireTab () {
    await this.page.click("//div[@class='xq-nav-tab-wrapper']//a[normalize-space()='Questionnaires']")
    await expect(this.page.locator("//div[@id='topics-questionnaires-page']")).toBeVisible()
  }

  async clickMediaTab () {
    await this.page.click("//div[@class='xq-nav-tab-wrapper']//a[normalize-space()='Medias']")
    await expect(this.page.locator("//div[@class='media-list']")).toBeVisible()
  }

  async clickTrainingTab () {
    await this.page.click("//div[@class='xq-nav-tab-wrapper']//a[normalize-space()='Trainings']")
    await expect(this.page.locator("//div[@class='trainings-page']")).toBeVisible()
  }

  async clickModuleTab () {
    await this.page.click("//div[@class='xq-nav-tab-wrapper']//a[normalize-space()='Modules']")
  }

  async clickEvaluationTab () {
    await this.page.click("//div[@class='xq-nav-tab-wrapper']//a[normalize-space()='Results']")
  }

  async clickImportAndExportsTab () {
    await this.page.click("//div[@class='xq-nav-tab-wrapper']//a[normalize-space()='Import & Export']")
  }

  async selectBase (base) {
    await this.page.click("//ul//a[normalize-space()='" + base.base_name + ' ' + process.env.uniqueId + "']//parent::div//span[@class='fa fa-square-o icon']")
  }

  async clickArchiveButton () {
    await expect(this.page.locator("//div[@id='std-toolbar'][button[@title='archive bases']]")).toBeVisible()
    await this.page.click("//div[@id='std-toolbar'][button[@title='archive bases']]")
  }

  async clickUnarchiveButton () {
    await expect(this.page.locator("//button[@title='unarchive bases']")).toBeVisible()
    await this.page.click("//button[@title='unarchive bases']")
  }

  async clickNewQuestion () {
    await expect(await this.page.locator("//a[normalize-space()='new question']")).toBeVisible()
    await this.page.click("//a[normalize-space()='new question']")
    await this.page.hover('#header div.enterprise-name')
    await expect(await this.page.locator("//div[@class='question-edit']")).toBeVisible()
  }

  async clickStatusFilter () {
    await this.page.click("//div[@class='xq-select-content']")
  }

  async selectArchivedStatus () {
    await this.page.click("//div[@title='Archived']")
  }

  async selectActiveStatus () {
    await this.page.click("//div[@title='Active']")
  }

  async selectAllStatus () {
    await this.page.click("//div[@title='All status']")
  }

  async verifyArchivebase (baseName) {
    await expect(this.page.locator("//span[@title='Archived base']/following-sibling::a[normalize-space()='" + baseName.base_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async clickBaseMedias () {
    await this.page.click("//div[@class='xq-nav-tab-wrapper']//a[normalize-space()='Medias']")
  }

  async verifyValidationMessageIsDisplayedWhileClickingMediaTabOnArchivedBase () {
    await expect(this.page.locator("//li[contains(.,'Sorry, you are not allowed to access this resource')]")).toBeVisible()
  }

  async verifyDuplicateBasePresentWithQuestionnaireQuestionElements () {
    await expect(this.page.locator("//label[@class='xq-data-group-label'][normalize-space()='Questions']/following-sibling::div[@class='data-value']")).toHaveCount(1)
    await expect(this.page.locator("//label[@class='xq-data-group-label'][normalize-space()='Questionnaires']/following-sibling::div[@class='data-value']")).toHaveCount(1)
  }

  async verifyDuplicateBasePresentWithoutQuestionnaireElement (duplicateBase) {
    await expect(this.page.locator("//a[normalize-space()='" + duplicateBase.base_name + ' ' + process.env.uniqueId + " (copy)']/following-sibling::span[text()='questionnaire']/following-sibling::strong[text()='0']")).toHaveCount(0)
  }

  async verifyDuplicateBasePresentWithoutQuestionElement (duplicateBase) {
    await expect(this.page.locator("//a[normalize-space()='" + duplicateBase.base_name + ' ' + process.env.uniqueId + " (copy)']/following-sibling::span[text()='question']/following-sibling::strong[text()='0']")).toHaveCount(0)
  }

  async clickFactSheetButton () {
    await this.page.click("//div[@class='std-toolbar']//span[normalize-space(text())='factsheet']")
  }

  async enterFactSheetTitle (element) {
    await this.page.locator("//input[@class='field filename xq-input'][@label-text='title']").pressSequentially(element.name, { delay: 100 })
  }

  async enterFactContent (factSheetData) {
    await this.page.click("//div[@role='textbox']")
    await this.page.locator("//div[@role='textbox']").pressSequentially(factSheetData.factsheet_data, { delay: 100 })
  }

  async saveFactSheet (fileName) {
    const ele = this.page.getByRole('button', { name: 'save' })
    await ele.click()
    const verifyEle = this.page.locator("//div[@title='" + fileName.name + "']")
    if (!verifyEle.isVisible()) {
      await ele.click()
    }
    await expect(verifyEle).toBeVisible()
  }

  async clickEmbedButton () {
    await this.page.click("//div[@class='std-toolbar']//span[normalize-space()='embedded media']")
  }

  async enterEmbedTitle (name) {
    await this.page.fill("//input[@class='field filename xq-input'][@label-text='title']", name.name)
  }

  async enterEmbedCode (code) {
    await this.page.fill("//textarea[contains(@label-text,'copy-paste iframe')]", code.embed_code)
  }

  async saveEmbedVideo (fileName) {
    await this.page.click("//div[@class='xq-modal-body']//span[normalize-space()='save']")
    await expect(this.page.locator("//div[@title='" + fileName.name + "']")).toBeVisible()
  }

  async uploadFiles (fileName) {
    const mediaDirectory = process.cwd() + '/media/' + fileName.name + '.' + fileName.type
    await this.page.setInputFiles("input[type='file']", mediaDirectory)
    await this.page.locator("//ul[@class='uploader-progress']").waitFor({ state: 'hidden' })
    await expect(this.page.locator("//div[@title='" + fileName.name + '.' + fileName.type + "']")).toBeVisible({ timeout: 100000 })
  }

  async clickNewMediaButtonFromBase () {
    await this.page.locator("//div[@class='std-toolbar']//span[normalize-space()='Medias']").click()
  }

  async clickDuplicate (base) {
    await this.page.click("//a[normalize-space()='" + base.base_name + ' ' + process.env.uniqueId + "']/following-sibling::div//ul//li[@title='Duplicate base']")
  }

  async enableYesOnDuplicateBaseWithElement () {
    await this.page.click("//div[@class='xq-modal-body']//span[@class='xq-yesno-choices']")
    await expect(this.page.locator("//div[@class='xq-modal-body']//span[@class='xq-yesno-choices']")).toBeVisible()
  }

  async clickSaveButtonOnDuplicatePopupWindow () {
    await this.page.click("//div[@class='submit-group']//span[contains(text(),'save')]")
  }

  async clickDeleteIconInDuplicateBase (base) {
    await this.page.click("//a[text()[contains(.,'" + base.base_name + ' ' + process.env.uniqueId + " (copy)')]]/following-sibling::div//ul//li[@title='Delete']")
  }

  async confirmDeleteInDuplicateBase (base) {
    await this.page.click("//strong[contains(text(),'" + base.base_name + ' ' + process.env.uniqueId + " (copy)')]//parent::p/following-sibling::div//button[@class='xq-button danger']")
  }

  async verifyDeletedDuplicateBasePresent (base) {
    await expect(this.page.locator("//a[contains(text(),'" + base.base_name + ' ' + process.env.uniqueId + " (copy)')]")).toHaveCount(0)
  }

  async verifyVisibilityIsNotDuplicatedOnDuplicateBaseOfQuestionnaire (questionnaire) {
    await expect(this.page.locator("//a[@title='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']//span[text()='V']")).not.toBeVisible()
  }

  async verifyQuestionnaireModeIsDuplicatedExceptPublicVisibilityOnDuplicateBase (questionnaire) {
    await expect(this.page.locator("//a[@title='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']//span[text()='R']")).toBeVisible()
    await expect(this.page.locator("//a[@title='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']//span[text()='F']")).toBeVisible()
    await expect(this.page.locator("//a[@title='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']//span[text()='C']")).toBeVisible()
    await expect(this.page.locator("//a[@title='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']//span[text()='P']")).toBeVisible()
  }

  async verifyMediaIsDuplicatedOnDuplicateBaseWithElement (media) {
    for (const mediaList of media) {
      await expect(this.page.locator(" //div[@class='xq-media-card']//div[contains(@title,'" + mediaList.name + "')]")).toBeVisible()
    }
  }

  async verifyQuestionIsPresentedInDuplicateBase (question) {
    for (const questionList of question) {
      await expect(this.page.locator("//div[@class='cell title']//span[contains(text(),'" + questionList.title + "')]")).toBeVisible()
    }
  }
}
