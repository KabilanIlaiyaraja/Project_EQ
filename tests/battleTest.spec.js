// @ts-check
const { test } = require('@playwright/test')
const dayjs = require('dayjs')

const userData = require('../testData/users.json')
const base = require('../testData/baseQuestionnaires.json')
const questions = require('../testData/questions.json')

const { BaseAction } = require('../support/action/baseAction')
const { QuestionnaireAction } = require('../support/action/questionnaireAction')
const { HomeAction } = require('../support/action/homeAction')
const { BattleAction } = require('../support/action/battleAction')
const { EvaluationAction } = require('../support/action/evaluationAction')

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
  // process.env.uniqueId = '20240305121217414'
  await home.logIn(adminUser)
})

test.describe('Battle module', () => {
  test('To Verify battle creation by admin and play by user Scenario id: EQA017', async ({ }) => {
    const bases = new BaseAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const home = new HomeAction(page)
    const battles = new BattleAction(page)
    const evaluation = new EvaluationAction(page)
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await home.logIn(adminUser)
    await questionnaire.setVisiblilityToAll(baseData, questionnaireData)
    await home.logIn(adminUser)
    await battles.createBattleByAdmin(userList, baseData, questionnaireData)
    await home.logIn(adminUser)
    await battles.playBattleByAdmin(questionnaireData, questionData)
    await home.logInUser(userList)
    await battles.playBattleByUsers(questionnaireData, questionData)
    await home.logIn(adminUser)
    await evaluation.verifyBattleEvaluationByAdmin(questionnaireData)
    await home.logIn(adminUser)
    await bases.deleteBaseVerify(baseData)
  })

  test('To Verify battle creation and delete the created battle by admin Scenario id: EQA018', async ({ }) => {
    const bases = new BaseAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const home = new HomeAction(page)
    const battles = new BattleAction(page)
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.questionnaire_1
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaire.setVisiblilityToAll(baseData, questionnaireData)
    await home.logIn(adminUser)
    await battles.createBattle(baseData, questionnaireData)
    await home.logIn(adminUser)
    await battles.playBattleByAdmin(questionnaireData, questionData)
    await home.logIn(adminUser)
    await battles.verifyBattleEvaluationByAdminAndDelete(questionnaireData)
    await home.logIn(adminUser)
    await bases.deleteBaseVerify(baseData)
  })

  test('To Verify Battle Creation by user and play by admin Scenario id: EQA040', async ({ }) => {
    const bases = new BaseAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const home = new HomeAction(page)
    const battles = new BattleAction(page)
    const evaluation = new EvaluationAction(page)
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaire.setVisiblilityToAll(baseData, questionnaireData)
    await home.logInUser(userList)
    await battles.createBattleByUser(adminUser, userList, baseData, questionnaireData, questionData)
    await home.logIn(adminUser)
    await battles.playBattleByAdmin(questionnaireData, questionData)
    await home.logInUser(userList)
    await evaluation.verifyBattleEvaluationByUser(questionnaireData)
    await home.logIn(adminUser)
    await bases.deleteBaseVerify(baseData)
  })
})
