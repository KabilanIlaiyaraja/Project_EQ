// @ts-check
const { test } = require('@playwright/test')
const dayjs = require('dayjs')
const userData = require('../testData/users.json')
const commonData = require('../testData/commonData.json')
const base = require('../testData/baseQuestionnaires.json')
const questions = require('../testData/questions.json')

const { HomeAction } = require('../support/action/homeAction')
const { UserAction } = require('../support/action/userAction')
const { InviteAction } = require('../support/action/InviteAction')
const { PlayerAction } = require('../support/action/playerAction')
const { BaseAction } = require('../support/action/baseAction')
const { EvaluationAction } = require('../support/action/evaluationAction')
const { QuestionAction } = require('../support/action/questionsAction')

let page
const adminUser = userData.Betaadmin
const questionData = questions.single_type

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
})

test.beforeEach(async ({ }) => {
  const home = new HomeAction(page)
  const randomNum = Math.floor(Math.random() * (100))
  const date = dayjs().format('YYYYMMDDhhmmss')
  const randNo = date + randomNum
  process.env.uniqueId = randNo
  // process.env.uniqueId = '20240404121851154'
  await home.logIn(adminUser)
})

test.describe('Questions module', () => {
  test('To verify create questions with domain,Scenario id: EQA064', async ({ }) => {
    const bases = new BaseAction(page)
    const baseData = base.bases.base_3
    const baseType = 'singledomain'
    const baseStatus = 'active'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create questions without domain', async ({ }) => {
    const bases = new BaseAction(page)
    const baseData = base.bases.base_3
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create and delete questions, Scenario id: EQA061', async ({ }) => {
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const baseData = base.bases.base_1
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await question.deleteAllQuestions(baseData)
    await question.verifyDeletedQuestions(baseData, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create and duplicate questions,Scenario id: EQA059', async ({ }) => {
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const baseData = base.bases.base_1
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await question.duplicateQuestions(baseData, questionData)
    await question.verifyDuplicatedQuestions(baseData, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify duplicating question to another base, Scenario id: EQA060', async ({ }) => {
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const baseData1 = base.bases.base_1
    const baseData2 = base.bases.base_2
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    await bases.createBase(baseData1, baseType)
    await bases.createQuestionsThroughBase(baseData1, baseStatus, baseType, questionData)
    await bases.createBase(baseData2, baseType)
    await question.moveQuestionsToAnotherBase(baseData1, baseData2)
    await question.verifyMovedQuestions(baseData2, questionData)
    await bases.deleteBaseVerify(baseData1)
    await bases.deleteBaseVerify(baseData2)
  })

  test('Verify create questions through archived base', async ({ }) => {
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const baseData = base.bases.base_3
    const baseType = 'singledomain'
    const baseStatus = 'archived'
    await bases.createBase(baseData, baseType)
    await bases.archiveBase(baseData)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await question.verifyArchivedQuestions(baseData, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify import questions, Scenario id: EQA034', async ({ }) => {
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const baseData = base.bases.base_2
    const baseType = 'singledomain'
    await bases.createBase(baseData, baseType)
    await question.uploadQuestionsAndVerify(baseData)
    await question.verifyUploadedQuestions(baseData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create questions and edit with same rank', async ({ }) => {
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const baseData = base.bases.base_1
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await question.editQuestionWithSameRank(baseData, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create questions and edit questions', async ({ }) => {
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const baseData = base.bases.base_1
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await question.editQuestionsThroughBase(baseData, questionData)
    await question.verifyEditedQuestion(baseData, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify question creation without mandatory fields,Scenario id: EQA062', async ({ }) => {
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const baseData = base.bases.base_1
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    await bases.createBase(baseData, baseType)
    await question.createQuestionWithoutTitle(baseData, baseStatus, questionData)
    await question.createQuestionWithoutQuestionField(baseData, baseStatus, questionData)
    await question.createQuestionWithoutAnswer(baseData, baseStatus, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create questions with explain and rule,Scenario id: EQA037', async ({ }) => {
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const player = new PlayerAction(page)
    const questionnaireData = base.questionnaires.questionnaire_1
    const baseData = base.bases.base_3
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await question.createQuestionsWithRulesAndExplanation(baseData, baseStatus, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await player.playQuestionnairewithRulesAndExplanation(baseData, questionnaireData, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify all filters in questions page, Scenario id: EQA045', async ({ }) => {
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const baseData1 = base.bases.base_1
    const baseData2 = base.bases.base_2
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    await bases.createBase(baseData1, baseType)
    await bases.createBase(baseData2, baseType)
    await bases.createQuestionsThroughBase(baseData1, baseStatus, baseType, questionData)
    await question.verifyProposedStatus(baseData1, questionData)
    await question.verifyReviewedStatus(baseData1, questionData)
    await question.verifyDraftStatus(baseData1, questionData)
    await question.verifyInactiveStatus(baseData1, questionData)
    await question.verifyActiveStatus(baseData1, questionData)
    await question.moveQuestionsToAnotherBase(baseData1, baseData2)
    await question.verifyTopicFilter(baseData1, baseData2, questionData)
    await bases.deleteBaseVerify(baseData1)
    await bases.deleteBaseVerify(baseData2)
  })

  test('Verify create softskills single question and play', async ({ }) => {
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const baseData = base.bases.base_1
    const questionData = questions.softskills_single
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    await bases.createBase(baseData, baseType)
    await question.createSoftSkillsQuestionWithoutDomain(baseData, baseStatus, questionData)
    await question.playSoftSkillQuestion(baseData, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create softskills multiple question and play', async ({ }) => {
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const questionData = questions.softskills_multiple
    const baseData = base.bases.base_0
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    await bases.createBase(baseData, baseType)
    await question.createSoftSkillsQuestionWithoutDomain(baseData, baseStatus, questionData)
    await question.playSoftSkillQuestion(baseData, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create classification questions and play Scenario id: EQA0058', async ({ }) => {
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const questionData = questions.classifications.questions1
    const baseData = base.bases.base_1
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await question.playClassificationQuestion(baseData, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('To verify questions created by contributor, Scenario id: EQA016', async ({ }) => {
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const invite = new InviteAction(page)
    const user = new UserAction(page)
    const player = new PlayerAction(page)
    const evaluation = new EvaluationAction(page)
    const baseData = base.bases.base_1
    const baseStatus = 'active'
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const baseType = 'singledomain'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await user.enableContributorWithBase(userList, baseData)
    await home.logInUser(userList)
    await question.createProposeQuestionsByContributor(baseData, questionData)
    await home.logIn(adminUser)
    await question.activeQuestionsByAdmin(baseData, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await player.playQuestionnaire(baseData, baseStatus, questionnaireData, questionData)
    await invite.inviteUsersForEvaluations(baseData, baseStatus, userList, commonData, questionnaireData)
    await home.logOut()
    await home.logInUser(userList)
    await player.playInvitedQuestionnaire(questionnaireData, questionData)
    await home.logIn(adminUser)
    await evaluation.verifyQuestionnaireEvaluation(baseData, baseStatus, questionnaireData)
    await user.disableContributorWithBase(userList, baseData)
    await bases.deleteBaseVerify(baseData)
  })
})
