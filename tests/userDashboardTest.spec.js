// @ts-check
const { test } = require('@playwright/test')
const userData = require('../testData/users.json')
const commonData = require('../testData/commonData.json')
const { HomeAction } = require('../support/action/homeAction')
const { UserDashboardAction } = require('../support/action/userDashboardAction')
const { EnterpriseAction } = require('../support/action/enterpriseAction')
const dayjs = require('dayjs')

let page
const adminUser = userData.Betaplaydummy

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  const randomNum = Math.floor(Math.random() * (100))
  const date = dayjs().format('YYYYMMDDhhmmss')
  const randNo = date + randomNum
  process.env.uniqueId = randNo
  process.env.uniqueId = '202408020258285'
})

test.describe.skip('UserDashboard module', () => {
  test('Register a new administrator', async ({ }) => {
    const home = new HomeAction(page)
    const enterprise = new EnterpriseAction(page)
    await home.homepageRegistrationAndVerify(adminUser)
    await enterprise.enableAllAdminSideMenusAndVerify()
    await enterprise.enableAllFeaturesExceptGDPR(adminUser, commonData)
    await home.logOut()
  })

  test('Verify the usertype employee', async ({ }) => {
    const userDashboardaction = new UserDashboardAction(page)
    const home = new HomeAction(page)
    await home.logInUserRand(adminUser)
    await userDashboardaction.userDashboardPage.clickUserView()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createSleekByBaseByName()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createSleekByBaseByRank()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createClassic()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await home.logOut()
  })

  test('verify the usertype client', async ({ }) => {
    const home = new HomeAction(page)
    const userDashboardaction = new UserDashboardAction(page)
    const userType = 'client'
    await home.logInUserRand(adminUser)
    await userDashboardaction.userTypeSelection(userType)
    await userDashboardaction.userDashboardPage.clickUserView()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createClientSleekByRank()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createClientSleekByBaseByName()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createClientSleekByBaseByRank()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createClientClassic()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await home.logOut()
  })

  test('Verify the usertype trainee', async ({ }) => {
    const home = new HomeAction(page)
    const userDashboardaction = new UserDashboardAction(page)
    const userType = 'trainee'
    await home.logInUserRand(adminUser)
    await userDashboardaction.userTypeSelection(userType)
    await userDashboardaction.userDashboardPage.clickUserView()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createTraineeSleekByRank()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createTraineeSleekByBaseByName()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createTraineeSleekByBaseByRank()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createTraineeClassic()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await home.logOut()
  })

  test('Verify the usertype contractor', async ({ }) => {
    const home = new HomeAction(page)
    const userDashboardaction = new UserDashboardAction(page)
    const userType = 'contractor'
    await home.logInUserRand(adminUser)
    await userDashboardaction.userTypeSelection(userType)
    await userDashboardaction.userDashboardPage.clickUserView()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createContractorSleekByRank()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createContractorSleekByBaseByName()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createContractorSleekByBaseByRank()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createContractorClassic()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await home.logOut()
  })

  test('Verify the usertype other', async ({ }) => {
    const home = new HomeAction(page)
    const userDashboardaction = new UserDashboardAction(page)
    const userType = 'other'
    await home.logInUserRand(adminUser)
    await userDashboardaction.userTypeSelection(userType)
    await userDashboardaction.userDashboardPage.clickUserView()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createOtherSleekByRank()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createOtherSleekByBaseByName()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createOtherSleekByBaseByRank()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await userDashboardaction.createOtherClassic()
    await userDashboardaction.userDashboardPage.clickAdminView()
    await home.logOut()
  })
})
