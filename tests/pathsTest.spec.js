// @ts-check
const { test } = require('@playwright/test')
const dayjs = require('dayjs')

const userData = require('../testData/users.json')
const base = require('../testData/baseQuestionnaires.json')
const questions = require('../testData/questions.json')
const mediaData = require('../testData/mediaModules.json')

const { HomeAction } = require('../support/action/homeAction')
const { BaseAction } = require('../support/action/baseAction')
const { ModuleAction } = require('../support/action/moduleAction')
const { EvaluationAction } = require('../support/action/evaluationAction')
const { PathAction } = require('../support/action/pathAction')
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
  // process.env.uniqueId = '20240608023158303'
  await home.logIn(adminUser)
})

test.describe('Path module', () => {
  test('Verify create and delete path Scenario id: EQA070', async ({ }) => {
    const path = new PathAction(page)
    const pathData = mediaData.path.path1
    await path.createPathAndVerify(pathData, adminUser)
    await path.deletePathAndVerify(pathData)
  })

  test('Verify create and duplicate path Scenario id: EQA072', async ({ }) => {
    const path = new PathAction(page)
    const pathData = mediaData.path.path1
    await path.createPathAndVerify(pathData, adminUser)
    await path.duplicatePathAndVerify(pathData)
    await path.deleteDuplicatePath(pathData)
    await path.deletePathAndVerify(pathData)
  })

  test('Verify create path and invite path in autonomous mode to user Scenario id: EQA005', async ({ }) => {
    const home = new HomeAction(page)
    const path = new PathAction(page)
    const bases = new BaseAction(page)
    const evaluation = new EvaluationAction(page)
    const module = new ModuleAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtester
    const mediaList = mediaData.medias.media1
    const moduleList = mediaData.module.module_list2
    const pathData = mediaData.path.path1
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await path.createPathAndVerify(pathData, adminUser)
    await path.addModules(pathData, moduleList)
    await path.inviteUsersForPath(pathData, userList)
    await home.logOut()
    await home.logInUser(userList)
    await path.playPath(moduleList, questionData)
    await home.logIn(adminUser)
    await evaluation.pathEvaluation(userList, pathData, moduleList)
    await path.deletePathAndVerify(pathData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify invite path and play by user after end time Scenario id: EQA033', async ({ }) => {
    const home = new HomeAction(page)
    const path = new PathAction(page)
    const bases = new BaseAction(page)
    const evaluation = new EvaluationAction(page)
    const module = new ModuleAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const mediaList = mediaData.medias.media1
    const moduleList = mediaData.module.module_list1
    const pathData = mediaData.path.path1
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.setModuleDurationAsMinute(moduleList)
    await path.createPathAndVerify(pathData, adminUser)
    await path.addModules(pathData, moduleList)
    await path.inviteUsersForPathWithLessTime(pathData, userList)
    await home.logInUser(userList)
    await path.VerifyClosedPath(moduleList)
    await home.logIn(adminUser)
    await evaluation.closedPathEvaluation(userList, pathData, moduleList)
    await path.deletePathAndVerify(pathData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create path, invite to user and delete ongoing module Scenario id: EQA071', async ({ }) => {
    const path = new PathAction(page)
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const mediaList = mediaData.medias.media1
    const moduleList = mediaData.module.module_list1
    const pathData = mediaData.path.path1
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await path.createPathAndVerify(pathData, adminUser)
    await path.addModules(pathData, moduleList)
    await path.inviteUsersForPath(pathData, userList)
    await path.deletePathAndVerify(pathData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify edit path and invite to user & play by user Scenario id: EQA046', async ({ }) => {
    const home = new HomeAction(page)
    const path = new PathAction(page)
    const bases = new BaseAction(page)
    const evaluation = new EvaluationAction(page)
    const module = new ModuleAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const mediaList = mediaData.medias.media1
    const moduleList = mediaData.module.module_list1
    const pathData = mediaData.path.path1
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await path.createPathAndVerify(pathData, adminUser)
    await path.editPathAndVerify(pathData)
    await path.addModulesForEditedPath(pathData, moduleList)
    await path.inviteUsersForEditedPath(pathData, userList)
    await home.logOut()
    await home.logInUser(userList)
    await path.playPath(moduleList, questionData)
    await home.logIn(adminUser)
    await evaluation.editedPathEvaluation(userList, pathData, moduleList)
    await path.deleteEditedPath(pathData)
    await bases.deleteBaseVerify(baseData)
  })
})
