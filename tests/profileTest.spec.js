// @ts-check
const { test } = require('@playwright/test')

const dayjs = require('dayjs')

const userData = require('../testData/users.json')
const commonData = require('../testData/commonData.json')

const { HomeAction } = require('../support/action/homeAction')
const { UserAction } = require('../support/action/userAction')
const { ProfileAction } = require('../support/action/profileAction')

let page
const adminUser = userData.Betaadmin

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
})

test.beforeEach(async ({ }) => {
  const randomNum = Math.floor(Math.random() * (100))
  const date = dayjs().format('YYYYMMDDhhmmss')
  const randNo = date + randomNum
  process.env.uniqueId = randNo
  // process.env.uniqueId = '20240122102844867'
})

test.describe('Profile module', () => {
  test('Verify edit user profile Scenario id: EQA019', async ({ }) => {
    const home = new HomeAction(page)
    const user = new UserAction(page)
    const profiles = new ProfileAction(page)
    const userList = userData.users.emailtester
    await home.logInUser(userList)
    await profiles.editUserProfile(userList)
    await user.verifyUserEditedData(adminUser, userList)
  })

  test('verify edit admin profile Scenario id: EQA010', async ({ }) => {
    const home = new HomeAction(page)
    const profiles = new ProfileAction(page)
    const user = new UserAction(page)
    await home.logIn(adminUser)
    await profiles.editAdminProfile(adminUser)
    await user.verifyAdminEditedData(adminUser)
  })

  test.skip('Verify admin and user password criteria Scenario id: EQA101', async ({ }) => {
    const user = new UserAction(page)
    const home = new HomeAction(page)
    const userList = userData.users.emailtesters
    const adminUser = userData.Betaadminqa
    await home.logIn(adminUser)
    await user.inviteUsersAndActivate(userList)
    await user.verifyPasswordCriteriaWithInviteUserLink(userList, commonData)
    await user.verifyPasswordCriteriaWithAdminAndUserProfile(adminUser, userList)
    await user.removePasswordCriteriaAdminProfile(adminUser)
    await home.logIn(adminUser)
    await user.deleteUserAndVerify(userList)
  })
})
