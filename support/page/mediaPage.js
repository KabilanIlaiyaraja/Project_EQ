const { expect } = require('@playwright/test')

exports.MediasPage = class MediasPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
  }

  async verifyBaseNotInFilter (base) {
    await this.clickFolderFilter()
    await this.verifyBaseNotInFolderFilter(base)
  }

  async clickFolderFilter () {
    await this.page.locator('#topics-filter').click()
  }

  async selectTopic (base) {
    await this.page.click("//span[normalize-space(text())='" + base.base_name + ' ' + process.env.uniqueId + "']")
  }

  async verifyBaseNotInFolderFilter (baseName) {
    await expect(this.page.locator("//ul[@class='xq-option-list']//span[normalize-space(text())='" + baseName.base_name + ' ' + process.env.uniqueId + "']")).toHaveCount(0)
  }

  async clickFactSheetButton () {
    await this.page.click("//div[@class='std-toolbar']//span[normalize-space(text())='factsheet']")
  }

  async enterFactSheetTitle (element) {
    await this.page.locator("//input[@class='field filename xq-input'][@label-text='title']").pressSequentially(element.name, { delay: 200 })
  }

  async enterFactContent (factSheetData) {
    await this.page.locator("//div[@role='textbox']").pressSequentially(factSheetData.factsheet_data, { delay: 100 })
  }

  async saveFactSheet (fileName) {
    const ele = this.page.locator("//div[@class='xq-modal-body']//span[normalize-space(text())='save']")
    await ele.click()
    const verifyEle = this.page.locator("//div[@title='" + fileName.name + "']")
    try {
      await expect(verifyEle).toBeVisible()
    } catch (error) {
      await ele.click()
      await expect(verifyEle).toBeVisible()
    }
  }

  async saveEditedFactSheet (fileName) {
    const ele = this.page.locator("//div[@class='xq-modal-body']//span[normalize-space(text())='save']")
    await ele.click()
    const verifyEle = this.page.locator("//div[@title='" + fileName.edit_name + "']")
    try {
      await expect(verifyEle).toBeVisible()
    } catch (error) {
      await ele.click()
      await expect(verifyEle).toBeVisible()
    }
  }

  async clickEmbedButton () {
    await this.page.click("//div[@class='std-toolbar']//span[normalize-space(text())='embedded media']")
  }

  async enterEmbedTitle (name) {
    await this.page.fill("//input[@class='field filename xq-input'][@label-text='title']", name.name)
  }

  async enterEmbedCode (code) {
    await this.page.fill("//textarea[contains(@label-text,'copy-paste iframe')]", code.embed_code)
  }

  async saveEmbedVideo (fileName) {
    await this.page.click("//div[@class='xq-modal-body']//span[normalize-space(text())='save']")
    const verifyEle = this.page.locator("//div[@title='" + fileName.name + "']")
    await expect(verifyEle).toBeVisible()
  }

  async saveEditedEmbedVideo (fileName) {
    await this.page.click("//div[@class='xq-modal-body']//span[normalize-space(text())='save']")
    const verifyEle = this.page.locator("//div[@title='" + fileName.edit_name + "']")
    await expect(verifyEle).toBeVisible()
  }

  async clickNewMediaButton () {
    await this.page.click("//button//span[contains(text(),'Medias')]")
  }

  async uploadFiles (fileName) {
    const mediaDirectory = process.cwd() + '/media/' + fileName.name + '.' + fileName.type
    await this.page.setInputFiles("input[type='file']", mediaDirectory)
    await this.page.locator("//ul[@class='uploader-progress']").waitFor({ state: 'hidden' })
    await expect(this.page.locator("//div[@title='" + fileName.name + '.' + fileName.type + "']")).toBeVisible({ timeout: 100000 })
  }

  async verifyMediaExist (mediaList) {
    for (const element of mediaList.items) {
      await expect(this.page.locator("//div[@class='xq-media-card']//div[contains(@title,'" + element.name + "')]")).toBeVisible()
    }
  }

  async deleteAllExisitngMedia () {
    if (await this.page.locator("(//div[@class='xq-media-card'])[1]").isVisible()) {
      const count = await this.page.locator("//div[@class='xq-media-card']").count()
      for (let index = 0; index < count; index++) {
        await this.page.locator("(//div[@class='xq-media-card'])[1]").hover()
        await this.page.click("(//div[@class='xq-media-card']//div/following-sibling::div//span[@class='fa fa-trash'])[1]")
        await expect(this.page.locator("//div//ul//li[text()='1 media deleted']")).toBeVisible()
        await this.page.locator("//div//ul//li[text()='1 media deleted']").waitFor({ state: 'hidden' })
      }
    }
  }

  async deleteMediaAndVerify (file) {
    const data = file.items
    for (const element of data) {
      await this.clickDeleteMedia(element)
      await expect(this.page.locator("//div[@class='xq-media-card']//div[contains(@title,'" + element.name + "')]")).not.toBeVisible()
    }
  }

  async deleteDuplicateMediaAndVerify (file) {
    const data = file.items
    for (const element of data) {
      if (element.type === 'factsheet' || element.type === 'embed') {
        await this.clickDeleteDuplicateMedia(element)
        await expect(this.page.locator("//div[@class='xq-media-card']//div[contains(@title,'" + element.name + " (1)')]")).not.toBeVisible()
      }
    }
  }

  async deleteEditedMediaAndVerify (file) {
    const data = file.items
    for (const element of data) {
      if (element.type === 'factsheet' || element.type === 'embed') {
        await this.clickDeleteEditedMedia(element)
        await expect(this.page.locator("//div[@class='xq-media-card']//div[contains(@title,'" + element.edit_name + "')]")).not.toBeVisible()
      } else {
        await this.clickDeleteMedia(element)
        await expect(this.page.locator("//div[@class='xq-media-card']//div[contains(@title,'" + element.name + "')]")).not.toBeVisible()
      }
    }
  }

  async clickDeleteDuplicateMedia (file) {
    await this.page.hover("//div[contains(@title,'" + file.name + " (1)')]")
    await this.page.click("//div[contains(@title,'" + file.name + " (1)')]/following-sibling::div//span[@class='fa fa-trash']")
  }

  async clickDeleteMedia (file) {
    await this.page.hover("//div[contains(@title,'" + file.name + "')]")
    await this.page.click("//div[contains(@title,'" + file.name + "')]/following-sibling::div//span[@class='fa fa-trash']")
  }

  async clickDeleteEditedMedia (file) {
    await this.page.hover("//div[contains(@title,'" + file.edit_name + "')]")
    await this.page.click("//div[contains(@title,'" + file.edit_name + "')]/following-sibling::div//span[@class='fa fa-trash']")
  }

  async clickEditMedia (file) {
    await this.page.hover("//div[@title='" + file.name + "']")
    await this.page.click("//div[@title='" + file.name + "']/following-sibling::div//span[@class='fa fa-pencil']")
  }

  async editFactSheetTitle (title) {
    await this.page.locator("//input[@class='field filename xq-input'][@label-text='title']").clear()
    await this.page.locator("//input[@class='field filename xq-input'][@label-text='title']").pressSequentially(title.edit_name)
  }

  async editFactContent (factSheetData) {
    await this.page.locator("//div[@role='textbox']").clear()
    await this.page.locator("//div[@role='textbox']").pressSequentially(factSheetData.edit_data)
  }

  async editEmbedTitle (name) {
    await this.page.locator("//input[@class='field filename xq-input'][@label-text='title']").clear()
    await this.page.locator("//input[@class='field filename xq-input'][@label-text='title']").pressSequentially(name.edit_name)
  }

  async editEmbedCode (code) {
    await this.page.locator("//textarea[contains(@label-text,'copy-paste iframe')]").clear()
    await this.page.locator("//textarea[contains(@label-text,'copy-paste iframe')]").pressSequentially(code.edit_data)
  }

  async verifyEditedFactSheet (data) {
    await expect(this.page.locator("//div[normalize-space(text())='" + data.edit_name + "']")).toBeVisible()
  }

  async verifyEditedEmbedTitle (data) {
    await expect(this.page.locator("//div[normalize-space(text())='" + data.edit_name + "']")).toBeVisible()
  }

  async clickVisibilityTab () {
    await this.page.click("//a[@href='/enterprise/medias/visibility']")
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//div[@id='select-docs']")).toBeVisible()
  }

  async clickEnterpriseFolder () {
    await this.page.click("//span[@id='topic-filter-button']")
  }

  async selectBaseOnVisibilityPage (base) {
    await this.page.click("//ul[@id='topic-filter-menu']//div[normalize-space(text())='" + base.base_name + ' ' + process.env.uniqueId + "']")
  }

  async selectMediasAndVerify (mediaData) {
    for (const media of mediaData.items) {
      await this.page.locator("(//div[contains(.,'" + media.name + "')]/preceding-sibling::i)[1]").dragTo(this.page.locator("//*[@id='items-set-3']"))
      await expect(await this.page.locator("//div[contains(@class,'xq-flashes')]//li[text()='Your settings have been saved']")).toBeVisible()
      await this.page.locator("//div[contains(@class,'xq-flashes')]//li[text()='Your settings have been saved']").waitFor({ state: 'hidden' })
      await expect(this.page.locator("//section[@id='visible-media-bloc']//div[contains(text(),'" + media.name + "')]")).toBeVisible()
    }
  }

  async verifyVisibilityMedia (media) {
    for (const element of media.items) {
      await expect(this.page.locator("//div[@class='filename']//span[contains(text(),'" + element.name + "')]")).toBeVisible()
    }
  }

  async clickGroupFilter () {
    await this.page.click("//span[@id='group-filter-button']")
  }

  async selectGroup (group) {
    await this.page.click("//ul[@id='group-filter-menu']//li//div[text()='" + group + ' ' + process.env.uniqueId + "']")
  }

  async verifyDuplicatedFactSheet (media) {
    await expect(this.page.locator("//div[normalize-space(text())='" + media.name + " (1)']")).toBeVisible()
  }

  async verifyDuplicatedEmbedTitle (media) {
    await expect(this.page.locator("//div[normalize-space(text())='" + media.name + " (1)']")).toBeVisible()
  }

  async selectCheckedForCreatedMedia (mediaData) {
    await this.page.hover("//div[contains(@title,'" + mediaData.name + "')]")
    await this.page.click("//div[contains(@title,'" + mediaData.name + "')]/following-sibling::div//span[@class='fa fa-check']")
  }

  async clickDuplicate () {
    await this.page.click("//span[normalize-space(text())='duplicate']")
  }

  async clickTickMark (mediaData) {
    await this.page.hover("//div[contains(@title,'" + mediaData.name + "')]")
    await this.page.click("//div[contains(@title,'" + mediaData.name + "')]/following-sibling::div//span[@class='fa fa-check']")
  }

  async clickTag () {
    await this.page.click("//span[normalize-space(text())='Tags']")
  }

  async clickDefine () {
    await this.page.click("//span[normalize-space(text())= 'define']")
  }

  async enterDefineTag (mediaData) {
    await this.page.locator("//div[@class='form-group']//input[@placeholder='Enter tags...']").clear()
    await this.page.locator("//div[@class='form-group']//input[@placeholder='Enter tags...']").pressSequentially(mediaData.tag, { delay: 100 })
  }

  async clickSaveTagButton () {
    await this.page.click("//button[@class='xq-button primary']//span[contains(text(),'save')]")
  }

  async verifyMediaTag (mediaData) {
    await this.page.hover("//div[contains(@title,'" + mediaData.name + "')]")
    await expect(this.page.locator("//li[@class='xq-media-tag'][text()='" + mediaData.tag + "']")).toBeVisible()
  }

  async allMediasButtonOnMyMedias () {
    await this.page.click('#topic-filter-button')
  }

  async selectMediaOnMyMedias (base) {
    await this.page.click("//div[contains(text(),'" + base.base_name + ' ' + process.env.uniqueId + "')]")
  }

  async verifyTheVisibilityMedia (media) {
    for (const element of media.items) {
      await expect(this.page.locator("//div[@class='filename']//span[contains(text(),'" + element.name + "')]")).toBeVisible()
    }
  }
}
