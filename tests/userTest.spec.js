// @ts-check
const { test } = require('@playwright/test')
const dayjs = require('dayjs')

const mediaData = require('../testData/mediaModules.json')
const userData = require('../testData/users.json')
const commonData = require('../testData/commonData.json')
const base = require('../testData/baseQuestionnaires.json')
const questionList = require('../testData/questions.json')

const { HomeAction } = require('../support/action/homeAction')
const { BaseAction } = require('../support/action/baseAction')
const { UserAction } = require('../support/action/userAction')
const { InviteAction } = require('../support/action/InviteAction')
const { PlayerAction } = require('../support/action/playerAction')
const { TrainingAction } = require('../support/action/trainingAction')
const { MediaAction } = require('../support/action/mediaAction')
const { QuestionnaireAction } = require('../support/action/questionnaireAction')
const { ModuleAction } = require('../support/action/moduleAction')
const { QuestionAction } = require('../support/action/questionsAction')

let page
const adminUser = userData.Betaadmin

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
})

test.beforeEach(async ({}) => {
  const home = new HomeAction(page)
  const randomNum = Math.floor(Math.random() * (100))
  const date = dayjs().format('YYYYMMDDhhmmss')
  const randNo = date + randomNum
  process.env.uniqueId = randNo
  // process.env.uniqueId = '2024080205473891'
  await home.logIn(adminUser)
})

test.describe('User module', () => {
  test('Verify invite user, activate and register then delete', async ({ }) => {
    const home = new HomeAction(page)
    const user = new UserAction(page)
    const invite = new InviteAction(page)
    const userList = userData.users.emailtesters
    await user.inviteUsersAndActivate(userList)
    await invite.userInviteAndRegister(commonData, userList)
    await home.logIn(adminUser)
    await user.deleteUserAndVerify(userList)
  })

  // Random Issue on generating password
  test('Verify create user and activate then delete, Scenario id: EQA054', async ({ }) => {
    const home = new HomeAction(page)
    const invite = new InviteAction(page)
    const user = new UserAction(page)
    const player = new PlayerAction(page)
    const userList = userData.users.emailtester
    await user.createUser(userList)
    await invite.navigateToEmailandsmslog()
    await player.clickActiveUserPreviewBtn(commonData, userList)
    await home.newUserLoginChangesThePassword(commonData, userList)
    await home.logIn(adminUser)
    await user.deleteUserAndVerify(userList)
  })

  test('Verify deactivate user, Scenario id: EQA055', async ({ }) => {
    const home = new HomeAction(page)
    const user = new UserAction(page)
    const invite = new InviteAction(page)
    const userList = userData.users.emailtesters
    await user.inviteUsersAndActivate(userList)
    await invite.userInviteAndRegister(commonData, userList)
    await home.logIn(adminUser)
    await user.deactivateUserAndVerify(userList)
    await home.verifyDeactivation(userList)
    await home.logIn(adminUser)
    await user.deleteUserAndVerify(userList)
  })

  test('Verify create group and assign user, Scenario id: EQA057', async ({ }) => {
    const user = new UserAction(page)
    const userList = userData.users.contactuser
    const group = userData.group.group_1
    await user.createGroup(group)
    await user.assignUserToGroupAndVerify(userList, group)
    await user.deleteGroup(group)
  })

  test('Verify import users,  Scenario id: EQA031', async ({ }) => {
    const users = new UserAction(page)
    const userList = userData.upload_users
    await users.deleteExistingImport()
    await users.uploadUsersAndVerify(userList)
    await users.verifyUploadedUsers()
  })

  test('verify all menu permission for user, Scenario id: EQA095', async ({ }) => {
    const user = new UserAction(page)
    const home = new HomeAction(page)
    const userList = userData.users.contactuser
    await user.grantAllMenusToView(userList)
    await user.verifyAllMenusAvailableForPermittedUser(userList)
    await home.logIn(adminUser)
    await user.disablePermissionForUser(userList)
  })

  test('Verify questions menu permission to user, Scenario id: EQA097', async ({ }) => {
    const home = new HomeAction(page)
    const user = new UserAction(page)
    const question = new QuestionAction(page)
    const bases = new BaseAction(page)
    const userList = userData.users.contactuser
    const baseData = base.bases.base_3
    const questionset = questionList.all_type2
    const questions = questionList.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    await user.grantToQuestions(userList)
    await home.logInUser(userList)
    await home.dashboard.changeToAdmin()
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionset)
    await question.verifyQuestionsOptionsByPermittedUser(baseData, questions)
    await home.logIn(adminUser)
    await user.disablePermissionForUser(userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify media menu permissions for user, Scenario id: EQA098', async ({ }) => {
    const home = new HomeAction(page)
    const user = new UserAction(page)
    const bases = new BaseAction(page)
    const medias = new MediaAction(page)
    const userList = userData.users.contactuser
    const baseData = base.bases.base_3
    const mediaList = mediaData.medias.media1
    const baseType = 'singledomain'
    await user.grantPermissionsForMedia(userList)
    await home.logInUser(userList)
    await home.dashboard.changeToAdmin()
    await bases.createBase(baseData, baseType)
    await medias.verifyMediaOptionsByPermittedUser(baseData, mediaList)
    await home.logIn(adminUser)
    await user.disablePermissionForUser(userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify questionnaire menu permission for user, Scenario id: EQA096', async ({ }) => {
    const home = new HomeAction(page)
    const user = new UserAction(page)
    const bases = new BaseAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const userList = userData.users.contactuser
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const editQuestionnaire = base.questionnaires.questionnaire_2
    const questionData = questionList.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await user.grantPermissionsForQuestionnaire(userList)
    await home.logInUser(userList)
    await home.dashboard.changeToAdmin()
    await questionnaire.verifyQuestionnaireOptionsByPermittedUser(userList, baseData, questionnaireData, editQuestionnaire, questionData)
    await home.logIn(adminUser)
    await user.disablePermissionForUser(userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify user menu permission for user, Scenario id: EQA105', async ({ }) => {
    const home = new HomeAction(page)
    const user = new UserAction(page)
    const invite = new InviteAction(page)
    const bases = new BaseAction(page)
    const userList = userData.users.contactuser
    const contact = userData.users.emailtester
    const group = userData.group.group_1
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const questionData = questionList.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await invite.inviteUsersForEvaluations(baseData, baseStatus, contact, commonData, questionnaireData)
    await user.createGroup(group)
    await user.assignUserToGroupAndVerify(userList, group)
    await user.grantPermissionsForUsers(userList)
    await home.logInUser(userList)
    await home.dashboard.changeToAdmin()
    await user.verifyUsersOptionsForPermittedUser(userList, group)
    await home.logIn(adminUser)
    await user.disablePermissionForUser(userList)
    await user.deleteGroup(group)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify modules menu permission for user, Scenario id: EQA099', async ({ }) => {
    const home = new HomeAction(page)
    const user = new UserAction(page)
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const userList = userData.users.contactuser
    const contact = userData.users.emailtester
    const group = userData.group.group_1
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const mediaList = mediaData.medias.media1
    const moduleList = mediaData.module.module_list1
    const editModuleList = mediaData.module.edit_module_list1
    const questionData = questionList.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await user.createGroup(group)
    await user.assignUserToGroupAndVerify(userList, group)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await user.grantPermissionsFormodules(userList)
    await home.logInUser(userList)
    await home.dashboard.changeToAdmin()
    await module.verifyModulesOptionsByPermittedUser(contact, moduleList, editModuleList, questionData)
    await home.logIn(adminUser)
    await user.disablePermissionForUser(userList)
    await user.deleteGroup(group)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify training menu permission for user, Scenario id: EQA100', async ({}) => {
    const home = new HomeAction(page)
    const user = new UserAction(page)
    const bases = new BaseAction(page)
    const training = new TrainingAction(page)
    const contact = userData.users.contactuser
    const userList = userData.users.emailtester
    const group = userData.group.group_1
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.training_questionnaire_1
    const mediaList = mediaData.medias.training_media1
    const trainingData = base.training.training_1
    const editTrainingData = base.training.training_2
    const questionData = questionList.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaires(baseData, baseStatus, questionnaireType, questionnaireData)
    await user.createGroup(group)
    await user.assignUserToGroupAndVerify(userList, group)
    await bases.addMediaThroughBases(baseData, mediaList)
    await user.grantPermissionsForTraining(contact)
    await home.logInUser(contact)
    await home.dashboard.changeToAdmin()
    await training.verifyTrainingOptionsByPermittedUser(adminUser, baseData, trainingData, editTrainingData, userList, contact, questionnaireData, mediaList)
    await home.logIn(adminUser)
    await user.disablePermissionForUser(contact)
    await user.deleteGroup(group)
    await bases.deleteBaseVerify(baseData)
  })

  // Random Issue on password generation invalid
  test('Verify reset user password, Scenario id: EQA056', async ({ }) => {
    const home = new HomeAction(page)
    const user = new UserAction(page)
    const invite = new InviteAction(page)
    const player = new PlayerAction(page)
    const contact = userData.users.contactuser
    await user.inviteUsersAndActivate(contact)
    await invite.userInviteAndRegister(commonData, contact)
    await home.logIn(adminUser)
    await user.resetPassword(contact)
    await invite.navigateToEmailandsmslog()
    await player.playPage.clickActiveUserPreviewButtonResetPassword(commonData, contact)
    await home.newUserLoginChangesThePassword(commonData, contact)
    await home.logIn(adminUser)
    await user.deleteUserAndVerify(contact)
  })
})
