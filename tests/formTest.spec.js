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
const { QuestionnaireAction } = require('../support/action/questionnaireAction')
const { EvaluationAction } = require('../support/action/evaluationAction')
const { FormAction } = require('../support/action/formAction')

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
  // process.env.uniqueId = '20240307034058680'
  await home.logIn(adminUser)
})

test.describe('Survey form module', () => {
  test('Verify create survey form and play with questionnaire Scenario id: EQA077', async ({ }) => {
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const forms = new FormAction(page)
    const invite = new InviteAction(page)
    const evaluation = new EvaluationAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const formData = form.forms.form_1
    const userList = userData.users.emailtesters
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await forms.createForm(formData)
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaire.setFormForQuestionnaire(baseData, questionnaireData, formData)
    await invite.inviteQuestionnaireWithFormAndPlay(userList, commonData, questionData, formData)
    await home.logIn(adminUser)
    await evaluation.questionnaireEvaluationWithForm(baseData, questionnaireData, userList, formData)
    await forms.deleteFormAndVerify(formData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify Create survey form and invite form one day later to user', async ({ }) => {
    const home = new HomeAction(page)
    const forms = new FormAction(page)
    const formData = form.forms.form_1
    const userList = userData.users.emailtesters
    await forms.createForm(formData)
    await forms.inviteFormToTheActiveUserWithScheduled(formData, userList)
    await home.logInUser(userList)
    await forms.verifyUserNotPlayedTheScheduledSurvey(formData)
    await home.logIn(adminUser)
    await forms.deleteFormAndVerify(formData)
  })

  test('Verify delete survey form Scenario id: EQA080', async ({ }) => {
    const forms = new FormAction(page)
    const formData = form.forms.form_1
    await forms.createForm(formData)
    await forms.deleteFormAndVerify(formData)
  })

  test('Verify duplicate survey form and play with questionnaire Scenario id: EQA079', async ({ }) => {
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const forms = new FormAction(page)
    const invite = new InviteAction(page)
    const evaluation = new EvaluationAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const formData = form.forms.form_1
    const userList = userData.users.emailtesters
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await forms.createForm(formData)
    await forms.duplicateFormAndVerify(formData)
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaire.setDuplicateFormForQuestionnaire(baseData, questionnaireData, formData)
    await invite.inviteQuestionnaireWithFormAndPlay(userList, commonData, questionData, formData)
    await home.logIn(adminUser)
    await evaluation.questionnaireEvaluationWithForm(baseData, questionnaireData, userList, formData)
    await forms.deleteFormAndVerify(formData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify delete ongoing survey form Scenario id: EQA081', async ({ }) => {
    const bases = new BaseAction(page)
    const home = new HomeAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const forms = new FormAction(page)
    const invite = new InviteAction(page)
    const player = new PlayerAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const formData = form.forms.form_1
    const userList = userData.users.emailtesters
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await forms.createForm(formData)
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaire.setFormForQuestionnaireWithNoLimit(baseData, questionnaireData, formData)
    await invite.inviteUsersForEvaluations(baseData, baseStatus, userList, commonData, questionnaireData)
    await forms.deleteFormAndVerify(formData)
    await invite.navigateToEmailAndSmsLog()
    await player.invitePlayWithoutForm(userList, commonData, questionData)
    await home.logIn(adminUser)
    await bases.deleteBaseVerify(baseData)
  })

  test('verify create survey form and play questionnaire with form by user Scenario id:Id 1007', async ({ }) => {
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const forms = new FormAction(page)
    const invite = new InviteAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const formData = form.forms.form_1
    const userList = userData.users.emailtesters
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await forms.createForm(formData)
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaire.setFormForQuestionnaire(baseData, questionnaireData, formData)
    await invite.inviteQuestionnaireToActiveUser(baseData, baseStatus, userList, commonData, questionnaireData)
    await forms.inviteFormToTheUser(formData, userList)
    await home.logInUser(userList)
    await invite.playQuestionnaireAndForm(questionnaireData, questionData, formData)
    await home.logIn(adminUser)
    await forms.verifyUserPlayedForm(userList, formData)
    await forms.verifyUserPlayedQuestionnaireWithForm(questionnaireData)
    await forms.deleteFormAndVerify(formData)
    await bases.deleteBaseVerify(baseData)
  })

  test('verify create survey form and invite to user', async ({ }) => {
    const home = new HomeAction(page)
    const forms = new FormAction(page)
    const player = new PlayerAction(page)
    const formData = form.forms.form_1
    const userList = userData.users.emailtesters
    await forms.createForm(formData)
    await forms.inviteFormToTheActiveUser(formData, userList)
    await home.logInUser(userList)
    await player.playFormByUser(formData)
    await home.logIn(adminUser)
    await forms.verifyUserPlayedForm(userList, formData)
    await forms.deleteFormAndVerify(formData)
  })

  test('Verify edit survey form with questionnaire Scenario id: EQA078', async ({ }) => {
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const forms = new FormAction(page)
    const invite = new InviteAction(page)
    const evaluation = new EvaluationAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const formData = form.forms.form_1
    const editFormData = form.forms.form_2
    const userList = userData.users.emailtesters
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await forms.createForm(formData)
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaire.setFormForQuestionnaire(baseData, questionnaireData, formData)
    await invite.inviteQuestionnaireWithFormAndPlay(userList, commonData, questionData, formData)
    await home.logIn(adminUser)
    await evaluation.questionnaireEvaluationWithForm(baseData, questionnaireData, userList, formData)
    await forms.editForm(formData, editFormData)
    await questionnaire.openQuestionnaire(questionnaireData)
    await invite.inviteQuestionnaireWithFormAndPlay(userList, commonData, questionData, editFormData)
    await home.logIn(adminUser)
    await evaluation.questionnaireEvaluationWithForm(baseData, questionnaireData, userList, editFormData)
    await forms.deleteFormAndVerify(editFormData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create survey form with condition Scenario id:Id 1012', async ({ }) => {
    const home = new HomeAction(page)
    const forms = new FormAction(page)
    const player = new PlayerAction(page)
    const formData = form.forms.condition_form
    const userList = userData.users.emailtesters
    await forms.createFormWithCondition(formData)
    await forms.inviteFormToTheActiveUser(formData, userList)
    await home.logInUser(userList)
    await player.playFormByUser(formData)
    await home.logIn(adminUser)
    await forms.deleteFormAndVerify(formData)
  })

  test('Verify create public survey form and play public survey form by active user', async ({ }) => {
    const home = new HomeAction(page)
    const forms = new FormAction(page)
    const formData = form.forms.public_form
    const userList = userData.users.emailtester
    const appLinks = commonData.links.v3_url
    await forms.createFormWithRedirectUrl(formData)
    const link = await forms.createPublicFormForActiveUser(appLinks, formData)
    await home.logInUser(userList)
    await forms.playPublicSurveyFormByActiveUser(link, formData)
    await home.logIn(adminUser)
    await forms.verifyPublicSurveyIsPlayedByActiveUser(userList, formData)
    await forms.deleteFormAndVerify(formData)
  })

  test('Verify create public survey form and play public survey form by inactive user', async ({ }) => {
    const home = new HomeAction(page)
    const forms = new FormAction(page)
    const formData = form.forms.public_form
    const appLinks = commonData.links.v3_url
    await forms.updateRedirectUrlForInactiveUserInEnterpriseOption(formData)
    await forms.createForm(formData)
    const link = await forms.createPublicFormForInactiveUser(appLinks, formData)
    await forms.playPublicSurveyFormByInactiveUser(link, formData)
    await home.logIn(adminUser)
    await forms.verifyPublicSurveyIsPlayedByInactiveUser(formData)
    await forms.deleteFormAndVerify(formData)
  })
})
