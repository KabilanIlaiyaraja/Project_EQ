// @ts-check
const { test } = require('@playwright/test')
const dayjs = require('dayjs')

const mediaData = require('../testData/mediaModules.json')
const userData = require('../testData/users.json')
const base = require('../testData/baseQuestionnaires.json')
const questionList = require('../testData/questions.json')
const { HomeAction } = require('../support/action/homeAction')
const { BaseAction } = require('../support/action/baseAction')
const { TrainingAction } = require('../support/action/trainingAction')
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
  // process.env.uniqueId = '20240722014618356'
  await home.logIn(adminUser)
})

test.describe('Training module', () => {
  test('Verify create training with archived base, Scenario id: EQA090', async ({ }) => {
    const bases = new BaseAction(page)
    const training = new TrainingAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.training_questionnaire_1
    const trainingData = base.training.training_1
    const questionData = questionList.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaires(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.archiveBase(baseData)
    await training.createTraining(adminUser, baseData, trainingData)
    await training.verifyTrainingOfBaseAcrhived(baseData, trainingData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create and delete training, Scenario id: EQA075', async ({ }) => {
    const bases = new BaseAction(page)
    const training = new TrainingAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.training_questionnaire_2
    const trainingData = base.training.training_1
    const mediaList = mediaData.medias.training_media1
    const questionData = questionList.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaires(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await training.createTraining(adminUser, baseData, trainingData)
    await training.addQuestionnaireAndMedia(baseData, trainingData, questionnaireData, mediaList)
    await training.deleteTrainingAndVerify(baseData, trainingData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create training, invite user and play training evaluation by user, Scenario id: EQA007', async ({ }) => {
    const bases = new BaseAction(page)
    const evaluation = new EvaluationAction(page)
    const training = new TrainingAction(page)
    const baseData = base.bases.base_1
    const userList = userData.users.emailtester
    const questionnaireData = base.questionnaires.training_questionnaire_1
    const trainingData = base.training.training_1
    const mediaList = mediaData.medias.training_media1
    const questionData = questionList.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaires(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await training.createTraining(adminUser, baseData, trainingData)
    await training.addQuestionnaireAndMedia(baseData, trainingData, questionnaireData, mediaList)
    await training.inviteUsersForTraining(userList, baseData, trainingData)
    await training.startTrainingByParticipants(userList, trainingData, questionnaireData, questionData, mediaList)
    await training.sendTrainingEvaluationToParticipants(adminUser, baseData, trainingData, questionnaireData)
    await training.playEvaluationByParticipants(userList, trainingData, questionnaireData, questionData, mediaList)
    await evaluation.verifyTrainingResults(adminUser, baseData, trainingData, questionnaireData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify edit training, set a user as trainer and invite user then play training evaluation by user, Scenario id: EQA074', async ({ }) => {
    const bases = new BaseAction(page)
    const evaluation = new EvaluationAction(page)
    const training = new TrainingAction(page)
    const baseData = base.bases.base_1
    const userList = userData.users.emailtester
    const userList2 = userData.users.emailtesters
    const questionnaireData = base.questionnaires.training_questionnaire_1
    const trainingData = base.training.training_1
    const editTrainingData = base.training.training_2
    const mediaList = mediaData.medias.training_media1
    const questionData = questionList.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaires(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await training.createTraining(adminUser, baseData, trainingData)
    await training.addQuestionnaireAndMedia(baseData, trainingData, questionnaireData, mediaList)
    await training.editTraining(baseData, trainingData, editTrainingData, userList)
    await training.inviteUsersForTraining(userList2, baseData, editTrainingData)
    await training.startTrainingByParticipants(userList2, editTrainingData, questionnaireData, questionData, mediaList)
    await training.sendTrainingEvaluationToParticipantsByTrainer(userList, editTrainingData, questionnaireData)
    await training.playEvaluationByParticipants(userList2, editTrainingData, questionnaireData, questionData, mediaList)
    await evaluation.verifyTrainingResults(adminUser, baseData, editTrainingData, questionnaireData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify duplicate training, set a user as trainer and invite user then play training evaluation by user, Scenario id: EQA076', async ({ }) => {
    const bases = new BaseAction(page)
    const evaluation = new EvaluationAction(page)
    const training = new TrainingAction(page)
    const userList = userData.users.emailtester
    const userList2 = userData.users.emailtesters
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.training_questionnaire_1
    const trainingData = base.training.training_1
    const mediaList = mediaData.medias.training_media1
    const questionData = questionList.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaires(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await training.createTraining(adminUser, baseData, trainingData)
    await training.addQuestionnaireAndMedia(baseData, trainingData, questionnaireData, mediaList)
    await training.duplicateTraining(baseData, userList2, trainingData)
    await training.inviteUsersForDuplicatingTraining(userList, baseData, trainingData)
    await training.startTrainingByParticipants(userList, trainingData, questionnaireData, questionData, mediaList)
    await training.sendTrainingEvaluationToParticipantsByTrainer(userList2, trainingData, questionnaireData)
    await training.playEvaluationByParticipants(userList, trainingData, questionnaireData, questionData, mediaList)
    await evaluation.verifyDuplicateTrainingResult(adminUser, baseData, trainingData, questionnaireData)
    await bases.deleteBaseVerify(baseData)
  })
})
