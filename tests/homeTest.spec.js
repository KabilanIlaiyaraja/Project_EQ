// @ts-check
const { test } = require('@playwright/test')
const dayjs = require('dayjs')
const userData = require('../testData/users.json')
const { HomeAction } = require('../support/action/homeAction')
const { DashboardPage } = require('../support/page/dashboardPage')

let page
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
})

test.beforeEach(async ({ }) => {
  const randomNum = Math.floor(Math.random() * (100))
  const date = dayjs().format('YYYYMMDDhhmmss')
  const randNo = date + randomNum
  process.env.uniqueId = randNo
  // process.env.uniqueId = "20240122102844867"
  await page.goto('/')
})

test.describe('Home module', () => {
  test('Verify user registration and successfull login', async ({ }) => {
    const adminUser = userData.Betaplaydummy
    const home = new HomeAction(page)
    const dashboard = new DashboardPage(page)
    await home.homepageRegistrationAndVerify(adminUser)
    await dashboard.logOut()
    await home.verifySuccessfulLogin(adminUser)
    await dashboard.deleteAccount()
  })

  test('Verify user unsuccessfull login with invalid data id: EQA021', async ({ }) => {
    const home = new HomeAction(page)
    const invalidUser = userData.invalid_user
    await home.clickSignOut()
    await home.invalidEmailLogIn(invalidUser)
    await home.invalidPasswordLogin(invalidUser)
    await home.invalidDomainLogin(invalidUser)
    await home.invalidDataLogIn(invalidUser)
  })

  test('Verify unsuccessfull user registration id: EQA039', async ({ }) => {
    const home = new HomeAction(page)
    const adminUser = userData.Betaplaydummy
    const existingUser = userData.Betaplay
    await home.clickSignOut()
    await home.homepageRegistrationWithoutEmail(adminUser)
    await home.homepageRegistrationWithoutFirstName(adminUser)
    await home.homepageRegistrationWithoutLastName(adminUser)
    await home.homepageRegistrationWithoutPassword(adminUser)
    await home.homepageRegistrationWithoutConfirmPassword(adminUser)
    await home.homepageRegistrationWithoutEnterprise(adminUser)
    await home.homepageRegistrationWithInvalidEmail(adminUser)
    await home.homepageRegistrationWithInvalidConfirmPassword(adminUser)
    await home.homepageRegistrationWithExistingUserAndVerifyUnsuccessful(existingUser)
  })
})
