// @ts-check
const { test } = require('@playwright/test')
const dayjs = require('dayjs')

const userData = require('../testData/users.json')
const base = require('../testData/baseQuestionnaires.json')
const questions = require('../testData/questions.json')
const commonData = require('../testData/commonData.json')
const form = require('../testData/form.json')

const { HomeAction } = require('../support/action/homeAction')
const { BaseAction } = require('../support/action/baseAction')
const { InviteAction } = require('../support/action/InviteAction')
const { PlayerAction } = require('../support/action/playerAction')
const { EvaluationAction } = require('../support/action/evaluationAction')
const { FormAction } = require('../support/action/formAction')
const { CycleAction } = require('../support/action/cycleAction')

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
  // process.env.uniqueId = '20240524123610203'
  await home.logIn(adminUser)
})

test.describe('Cycle module', () => {
  test('Verify to create cycle with questionnaireData Scenario id: EQA103', async ({ }) => {
    const bases = new BaseAction(page)
    const cycles = new CycleAction(page)
    const baseData = base.bases.base_1
    const cycle = base.cycle.cycle_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await cycles.createCycle(cycle)
    await cycles.addStepsWithQuestionnaire(cycle, baseData, questionnaireData)
    await cycles.verifyTheCycleIsCreated(cycle)
    await cycles.deleteCycleAndVerify(cycle)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify invite a cycle to active user and delete the ongoing Cycle', async ({ }) => {
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const cycles = new CycleAction(page)
    const forms = new FormAction(page)
    const invite = new InviteAction(page)
    const baseData = base.bases.base_1
    const cycle = base.cycle.cycle_2
    const questionnaireData = base.questionnaires.questionnaire_1
    const formData = form.forms.form_1
    const questionData = questions.single_type
    const userList = userData.users.emailtesters
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await forms.createForm(formData)
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await cycles.createCycle(cycle)
    await cycles.addStepsWithQuestionnaireAndForms(cycle, baseData, questionnaireData, formData)
    await invite.inviteCycleToTheActiveUser(cycle, userList, commonData)
    await home.logIn(adminUser)
    await cycles.deleteCycleAndVerify(cycle)
    await forms.deleteFormAndVerify(formData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify invite a cycle to active user and delete the cycle invitation', async ({ }) => {
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const cycles = new CycleAction(page)
    const forms = new FormAction(page)
    const invite = new InviteAction(page)
    const baseData = base.bases.base_1
    const cycle = base.cycle.cycle_2
    const questionnaireData = base.questionnaires.questionnaire_1
    const formData = form.forms.form_1
    const questionData = questions.single_type
    const userList = userData.users.emailtesters
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await forms.createForm(formData)
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await cycles.createCycle(cycle)
    await cycles.addStepsWithQuestionnaireAndForms(cycle, baseData, questionnaireData, formData)
    await invite.inviteCycleToTheActiveUser(cycle, userList, commonData)
    await home.logIn(adminUser)
    await cycles.deleteInvitedUserOnCycle(cycle)
    await cycles.verifyDeletedInvitedCycleIsOnCancelledStatus(userList)
    await home.logInUser(userList)
    await cycles.verifyDeletedCycleIsNotDisplayedOnInvitedUserDashboard(cycle)
    await home.logIn(adminUser)
    await forms.deleteFormAndVerify(formData)
    await cycles.deleteCycleAndVerify(cycle)
    await bases.deleteBaseVerify(baseData)
  })

  test('To invite a cycle to the active user, closed the invited cycle evaluation and verify', async ({ }) => {
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const cycles = new CycleAction(page)
    const forms = new FormAction(page)
    const invite = new InviteAction(page)
    const evaluation = new EvaluationAction(page)
    const baseData = base.bases.base_1
    const cycle = base.cycle.cycle_2
    const questionnaireData = base.questionnaires.questionnaire_1
    const formData = form.forms.form_1
    const questionData = questions.single_type
    const userList = userData.users.emailtesters
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await forms.createForm(formData)
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await cycles.createCycle(cycle)
    await cycles.addStepsWithQuestionnaireAndForms(cycle, baseData, questionnaireData, formData)
    await invite.inviteCycleToTheActiveUserAndClosed(cycle, userList, commonData)
    await home.logIn(adminUser)
    await evaluation.verifyClosedCycleEvaluation(userList, cycle)
    await forms.deleteFormAndVerify(formData)
    await cycles.deleteCycleAndVerify(cycle)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create a cycle and edit the created cycle', async ({ }) => {
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const cycles = new CycleAction(page)
    const forms = new FormAction(page)
    const invite = new InviteAction(page)
    const player = new PlayerAction(page)
    const evaluation = new EvaluationAction(page)
    const baseData = base.bases.base_1
    const cycle = base.cycle.cycle_2
    const editCycle = base.cycle.edit_cycle
    const questionnaireData = base.questionnaires.two_questionnaire
    const formData1 = form.forms.form_1
    const formData2 = form.forms.simple_form
    const questionData = questions.single_type
    const userList = userData.users.emailtesters
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await forms.createForm(formData1)
    await forms.createForm(formData2)
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaires(baseData, baseStatus, questionnaireType, questionnaireData)
    await cycles.createCycle(cycle)
    await cycles.addStepsWithQuestionnaireAndForms(cycle, baseData, questionnaireData[0], formData1)
    await cycles.editCreatedCycle(cycle, editCycle)
    await cycles.editCycleStepOnCreatedCycle(baseData, cycle, editCycle)
    await cycles.addStepsWithQuestionnaireAndFormsOnEditCycle(baseData, editCycle)
    await invite.inviteCycleToTheActiveUser(editCycle, userList, commonData)
    await home.logInUser(userList)
    await player.playCycleTestWithQuesAndFormByActiveUser(questionnaireData[1], questionData, formData2)
    await home.logIn(adminUser)
    await evaluation.verifyCycleEvaluation(userList, editCycle)
    await forms.deleteFormAndVerify(formData1)
    await forms.deleteFormAndVerify(formData2)
    await cycles.deleteCycleAndVerify(editCycle)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify to create cycle and invite cycle to the active user and play by active user and verify', async ({ }) => {
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const cycles = new CycleAction(page)
    const forms = new FormAction(page)
    const invite = new InviteAction(page)
    const player = new PlayerAction(page)
    const evaluation = new EvaluationAction(page)
    const baseData = base.bases.base_1
    const cycle = base.cycle.cycle_2
    const userList = userData.users.emailtesters
    const questionnaireData = base.questionnaires.questionnaire_1
    const formData = form.forms.form_1
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await forms.createForm(formData)
    await cycles.createCycle(cycle)
    await cycles.addStepsWithQuestionnaireAndForms(cycle, baseData, questionnaireData, formData)
    await invite.inviteCycleToTheActiveUser(cycle, userList, commonData)
    await home.logInUser(userList)
    await player.playCycleTestWithQuesAndFormByActiveUser(questionnaireData, questionData, formData)
    await home.logIn(adminUser)
    await evaluation.verifyCycleEvaluation(userList, cycle)
    await forms.deleteFormAndVerify(formData)
    await cycles.deleteCycleAndVerify(cycle)
    await bases.deleteBaseVerify(baseData)
  })
})
