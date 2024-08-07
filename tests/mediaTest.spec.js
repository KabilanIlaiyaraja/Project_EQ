// @ts-check
const { test } = require('@playwright/test')
const dayjs = require('dayjs')

const userData = require('../testData/users.json')
const mediaData = require('../testData/mediaModules.json')
const { HomeAction } = require('../support/action/homeAction')
const { UserAction } = require('../support/action/userAction')
const { MediaAction } = require('../support/action/mediaAction')

let page
const adminUser = userData.Betaadmin

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
})

test.beforeEach(async ({ }) => {
  const home = new HomeAction(page)
  const randomNum = Math.floor(Math.random() * (100))
  const date = dayjs().format('YYYYMMDDhhmmss')
  const randNo = date + randomNum
  process.env.uniqueId = randNo
  //   process.env.uniqueId = '20240122102844867'
  await home.logIn(adminUser)
})

test.describe('Media module', () => {
  test('Verify to create media and delete media Scenario id: EQA006', async ({ }) => {
    const medias = new MediaAction(page)
    const mediaList = mediaData.medias.media1
    await medias.deleteAllExistingMedia()
    await medias.createMedia(mediaList)
    await medias.verifyMedia(mediaList)
    await medias.deleteMediaAndVerify(mediaList)
  })

  test('Verify to create media and edit media Scenario id: EQA006', async ({ }) => {
    const medias = new MediaAction(page)
    const mediaList = mediaData.medias.media1
    await medias.deleteAllExistingMedia()
    await medias.createMedia(mediaList)
    await medias.editMedia(mediaList)
    await medias.deleteEditedMedia(mediaList)
  })

  test('Verify media visibility to all Scenario id: EQA047', async ({ }) => {
    const home = new HomeAction(page)
    const medias = new MediaAction(page)
    const mediaList = mediaData.medias.media1
    const userList = userData.users.emailtesters
    await medias.deleteAllExistingMedia()
    await medias.createMedia(mediaList)
    await medias.setVisibilityForAll(mediaList)
    await home.logInUser(userList)
    await medias.verifyMediasByUser(mediaList)
    await home.logIn(adminUser)
    await medias.deleteMediaAndVerify(mediaList)
  })

  test('Verify media visibility to a group', async ({ }) => {
    const home = new HomeAction(page)
    const medias = new MediaAction(page)
    const user = new UserAction(page)
    const mediaList = mediaData.medias.media1
    const userList = userData.users.emailtesters
    const group = userData.group.group_1
    await medias.deleteAllExistingMedia()
    await medias.createMedia(mediaList)
    await user.createGroup(group)
    await user.addUserAndAdminOnTheCreatedGroup(group, userList, adminUser)
    await medias.setVisibilityForGroup(mediaList, group)
    await home.logInUser(userList)
    await medias.verifyMediasByUser(mediaList)
    await home.logIn(adminUser)
    await user.deleteGroup(group)
    await medias.deleteMediaAndVerify(mediaList)
  })

  test('Verify create duplicate media Scenario id: EQA0048', async ({ }) => {
    const medias = new MediaAction(page)
    const mediaList = mediaData.medias.media1
    await medias.deleteAllExistingMedia()
    await medias.createMedia(mediaList)
    await medias.dulicateMedia(mediaList)
    await medias.deleteDuplicatedMedia(mediaList)
    await medias.deleteMediaAndVerify(mediaList)
  })

  test('verify to assign tag for created medias Scenario id: EQA0049', async ({ }) => {
    const medias = new MediaAction(page)
    const mediaList = mediaData.medias.training_media1
    await medias.deleteAllExistingMedia()
    await medias.createMedia(mediaList)
    await medias.assignTagToMedia(mediaList)
    await medias.deleteMediaAndVerify(mediaList)
  })
})
