// @ts-check
const { test } = require('@playwright/test')
const { HomeAction } = require('../support/action/homeAction')
const { EnterpriseAction } = require('../support/action/enterpriseAction')
const { UserAction } = require('../support/action/userAction')
const { InviteAction } = require('../support/action/InviteAction')
const userData = require('../testData/users.json')
const commonData = require('../testData/commonData.json')

const dayjs = require('dayjs')

let page
const adminUser = userData.Betaplaydummy
const userList = userData.users.emailtesters

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  const randomNum = Math.floor(Math.random() * (100))
  const date = dayjs().format('YYYYMMDDhhmmss')
  const randNo = date + randomNum
  process.env.uniqueId = randNo
  process.env.uniqueId = '20240806406656'
})

test.describe('Enterprise module', () => {
  test('Verify enable and disable administrator menu options, Scenario id: EQA022', async ({ }) => {
    const home = new HomeAction(page)
    const enterprise = new EnterpriseAction(page)
    const user = new UserAction(page)
    const invite = new InviteAction(page)
    await home.homepageRegistrationAndVerify(adminUser)
    await enterprise.enableAllAdminSideMenusAndVerify()
    await enterprise.disableAllAdministratorMenuAndVerify()
    await enterprise.enableAllAdminSideMenusAndVerify()
    await user.inviteUsersAndActivate(userList)
    await invite.userInviteAndRegister(commonData, userList)
  })

  test('Verify employee user menu options, Scenario id: EQA026', async ({ }) => {
    const home = new HomeAction(page)
    const enterprise = new EnterpriseAction(page)
    const user = new UserAction(page)
    await home.logInUserRand(adminUser)
    await user.changeUserTypeAsEmployee(userList)
    await enterprise.enableAllEmployeeUserMenusVerify(userList)
    await enterprise.disableAllEmployeeMenusAndVerify(adminUser, userList)
  })

  test('Verify client user menu options, Scenario id: EQA027', async ({ }) => {
    const home = new HomeAction(page)
    const enterprise = new EnterpriseAction(page)
    const user = new UserAction(page)
    const userList = userData.users.emailtesters
    await home.logInUserRand(adminUser)
    await user.changeUserTypeAsClient(userList)
    await enterprise.enableAllClientUserMenusVerify(userList)
    await enterprise.disableAllClientMenusAndVerify(adminUser, userList)
  })

  test('Verify trainee user menu options, Scenario id: EQA028', async ({ }) => {
    const home = new HomeAction(page)
    const enterprise = new EnterpriseAction(page)
    const user = new UserAction(page)
    await home.logInUserRand(adminUser)
    await user.changeUserTypeAsTrainee(userList)
    await enterprise.enableAllTraineeUserMenusVerify(userList)
    await enterprise.disableAllTraineeMenusAndVerify(adminUser, userList)
  })

  test('Verify contractor user menu options, Scenario id: EQA029', async ({ }) => {
    const home = new HomeAction(page)
    const enterprise = new EnterpriseAction(page)
    const user = new UserAction(page)
    await home.logInUserRand(adminUser)
    await user.changeUserTypeAsContractor(userList)
    await enterprise.enableAllContractorUserMenusVerify(userList)
    await enterprise.disableAllContractorMenusAndVerify(adminUser, userList)
  })

  test('Verify other user menu options, Scenario id: EQA030', async ({ }) => {
    const home = new HomeAction(page)
    const enterprise = new EnterpriseAction(page)
    const user = new UserAction(page)
    await home.logInUserRand(adminUser)
    await user.changeUserTypeAsOther(userList)
    await enterprise.enableAllOtherUserMenusVerify(userList)
    await enterprise.disableAllOtherMenusAndVerify(adminUser, userList)
  })

  test('Verify edit enterprise profile, Scenario id: EQA009', async ({ }) => {
    const home = new HomeAction(page)
    const enterprise = new EnterpriseAction(page)
    const enterpriseData = commonData.enterprise_profile
    await enterprise.editEnterpriseProfile(adminUser, enterpriseData)
    await enterprise.verifyEnterpriseDataOnAdminPage(enterpriseData)
    await home.logInUserRand(userList)
    await enterprise.verifyEnterpriseDataOnUserPage(enterpriseData)
  })

  test('Verify select sleek dasboard, Scenario id: Id 1002', async ({ }) => {
    const home = new HomeAction(page)
    const enterprise = new EnterpriseAction(page)
    await home.logInUserRand(adminUser)
    await enterprise.enableUserDataUsersMenuEnterprise()
    await enterprise.disableUserDataUserMenu()
  })

  test('Verify select sleek dasboard employee, Scenario id: Id 1003', async ({ }) => {
    const home = new HomeAction(page)
    const enterprise = new EnterpriseAction(page)
    await home.logInUserRand(adminUser)
    await enterprise.enableUserDataUsersMenuEmployee()
  })

  test('Verify user data options Scenario id: EQA023', async ({ }) => {
    const user = new UserAction(page)
    await user.updateUserProfileByAdmin(adminUser, userList)
    await user.dashboardPage.logOut()
  })
})
