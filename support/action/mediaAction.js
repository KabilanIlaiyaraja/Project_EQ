// @ts-check
const { MediasPage } = require('../page/mediaPage')
const { DashboardPage } = require('../page/dashboardPage')

exports.MediaAction = class MediaAction {
  /**
    * @param {import('@playwright/test').Page} page
    */

  constructor (page) {
    this.page = page
    this.media = new MediasPage(this.page)
    this.dashboard = new DashboardPage(this.page)
  }

  async createMedia (data) {
    await this.dashboard.clickMedia()
    const datas = data.items
    for (const element of datas) {
      if (element.type === 'factsheet') {
        await this.media.clickFactSheetButton()
        await this.media.enterFactSheetTitle(element)
        await this.media.enterFactContent(element)
        await this.media.saveFactSheet(element)
      } else {
        if (element.type === 'embed') {
          await this.media.clickEmbedButton()
          await this.media.enterEmbedTitle(element)
          await this.media.enterEmbedCode(element)
          await this.media.saveEmbedVideo(element)
        } else {
          await this.media.clickNewMediaButton()
          await this.media.uploadFiles(element)
        }
      }
    }
  }

  async verifyMedia (mediaList) {
    await this.dashboard.clickMedia()
    await this.media.verifyMediaExist(mediaList)
  }

  async deleteAllExistingMedia () {
    await this.dashboard.clickMedia()
    await this.media.deleteAllExisitngMedia()
  }

  async deleteMediaAndVerify (mediaList) {
    await this.dashboard.clickMedia()
    await this.media.deleteMediaAndVerify(mediaList)
    await this.dashboard.logOut()
  }

  async deleteDuplicatedMedia (mediaList) {
    await this.dashboard.clickMedia()
    await this.media.deleteDuplicateMediaAndVerify(mediaList)
  }

  async deleteEditedMedia (mediaList) {
    await this.dashboard.clickDashboard()
    await this.dashboard.clickMedia()
    await this.media.deleteEditedMediaAndVerify(mediaList)
  }

  async deleteEditedMediaUser (base, mediaList) {
    await this.dashboard.clickDashboard()
    await this.dashboard.clickMedia()
    await this.media.clickFolderFilter()
    await this.media.selectTopic(base)
    await this.media.deleteEditedMediaAndVerify(mediaList)
  }

  async editMedia (mediaList) {
    await this.dashboard.clickMedia()
    const datas = mediaList.items
    for (const element of datas) {
      if (element.type === 'factsheet') {
        await this.media.clickEditMedia(element)
        await this.media.editFactSheetTitle(element)
        await this.media.editFactContent(element)
        await this.media.saveEditedFactSheet(element)
        await this.media.verifyEditedFactSheet(element)
      } else {
        if (element.type === 'embed') {
          await this.media.clickEditMedia(element)
          await this.media.editEmbedTitle(element)
          await this.media.editEmbedCode(element)
          await this.media.saveEditedEmbedVideo(element)
          await this.media.verifyEditedEmbedTitle(element)
        }
      }
    }
  }

  async dulicateMedia (data) {
    await this.dashboard.clickMedia()
    const datas = data.items
    for (const element of datas) {
      if (element.type === 'factsheet') {
        await this.media.selectCheckedForCreatedMedia(element)
        await this.media.clickDuplicate()
        await this.media.verifyDuplicatedFactSheet(element)
      }
      if (element.type === 'embed') {
        await this.media.selectCheckedForCreatedMedia(element)
        await this.media.clickDuplicate()
        await this.media.verifyDuplicatedEmbedTitle(element)
      }
    }
  }

  async setVisibilityForAll (mediaData) {
    await this.dashboard.clickMedia()
    await this.media.clickVisibilityTab()
    await this.media.selectMediasAndVerify(mediaData)
    await this.dashboard.logOut()
  }

  async verifyMediasByUser (media) {
    await this.dashboard.clickMyMediaByUser()
    await this.media.verifyVisibilityMedia(media)
    await this.dashboard.userLogOut()
  }

  async setVisibilityForGroup (mediaData, group) {
    await this.dashboard.clickMedia()
    await this.media.clickVisibilityTab()
    await this.media.clickGroupFilter()
    await this.media.selectGroup(group)
    await this.media.selectMediasAndVerify(mediaData)
    await this.dashboard.logOut()
  }

  async assignTagToMedia (mediaData) {
    await this.dashboard.clickMedia()
    for (const data of mediaData.items) {
      await this.media.clickTickMark(data)
      await this.media.clickTag()
      await this.media.clickDefine()
      await this.media.enterDefineTag(data)
      await this.media.clickSaveTagButton()
      await this.media.verifyMediaTag(data)
    }
  }

  async verifyMediaOptionsByPermittedUser (base, media) {
    await this.dashboard.clickMedia()
    await this.media.clickFolderFilter()
    await this.media.selectTopic(base)
    await this.createMedia(media)
    await this.media.clickVisibilityTab()
    await this.media.clickEnterpriseFolder()
    await this.media.selectBaseOnVisibilityPage(base)
    await this.media.selectMediasAndVerify(media)
    await this.dashboard.changeToUser()
    await this.dashboard.clickMyMediaByUser()
    await this.media.allMediasButtonOnMyMedias()
    await this.media.selectMediaOnMyMedias(base)
    await this.media.verifyTheVisibilityMedia(media)
    await this.dashboard.changeToAdmin()
    await this.dashboard.clickMedia()
    await this.media.clickFolderFilter()
    await this.media.selectTopic(base)
    await this.editMedia(media)
    await this.deleteEditedMediaUser(base, media)
  }
}
