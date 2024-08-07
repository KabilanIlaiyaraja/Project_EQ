// @ts-check
const { test } = require('@playwright/test')
const dayjs = require('dayjs')

const userData = require('../testData/users.json')
const base = require('../testData/baseQuestionnaires.json')
const questions = require('../testData/questions.json')
const mediaData = require('../testData/mediaModules.json')
const commonData = require('../testData/commonData.json')
const form = require('../testData/form.json')

const { HomeAction } = require('../support/action/homeAction')
const { BaseAction } = require('../support/action/baseAction')
const { UserAction } = require('../support/action/userAction')
const { InviteAction } = require('../support/action/InviteAction')
const { PlayerAction } = require('../support/action/playerAction')
const { QuestionnaireAction } = require('../support/action/questionnaireAction')
const { TrainingAction } = require('../support/action/trainingAction')
const { ModuleAction } = require('../support/action/moduleAction')
const { QuestionAction } = require('../support/action/questionsAction')
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
  // process.env.uniqueId = '20240409013930783'
  await home.logIn(adminUser)
})

test.describe('Base module', () => {
  test('To verify create base and delete the created base - Scenario id: EQA053', async ({ }) => {
    const bases = new BaseAction(page)
    const baseData = base.bases.base_1
    const baseType = 'singledomain'
    await bases.createBase(baseData, baseType)
    await bases.deleteBaseVerify(baseData)
  })

  test('To verify create base with multiple domains', async ({ }) => {
    const bases = new BaseAction(page)
    const baseData = base.bases.base_1
    const baseType = 'multipledomain'
    await bases.createBase(baseData, baseType)
    await bases.deleteBaseVerify(baseData)
  })

  test('To verify create a base and archive and verify the base data archived - scenario id: EQA088', async ({ }) => {
    const bases = new BaseAction(page)
    const questionnaireData = base.questionnaires.questionnaire_1
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.archiveBase(baseData)
    await bases.verifyBaseDataArchived(baseData)
    await bases.deleteBaseVerify(baseData)
  })

  test('To verify create a base and edit the created base Scenario id: EQA014', async ({ }) => {
    const bases = new BaseAction(page)
    const baseData = base.bases.base_1
    const newBase = base.bases.base_2
    const baseType = 'singledomain'
    await bases.createBase(baseData, baseType)
    await bases.editBaseAndVerify(baseData, newBase)
    await bases.deleteBaseVerify(newBase)
  })

  // validation message is not displayed(bug)
  test('To verify the media and question is not able to upload in archived base', async ({ }) => {
    const bases = new BaseAction(page)
    const baseData = base.bases.base_2
    const baseType = 'withoutdomain'
    await bases.createBase(baseData, baseType)
    await bases.archiveBase(baseData)
    await bases.mediaAndQuestionNotUplodatedOnArchivedBaseAndVerify(baseData)
    await bases.deleteBaseVerify(baseData)
  })

  test('To verify archive and unarchive the base and verify  id: EQA094', async ({ }) => {
    const bases = new BaseAction(page)
    const questionnaireData = base.questionnaires.questionnaire_1
    const mediaList = mediaData.medias.media1
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await bases.archiveBase(baseData)
    await bases.verifyBaseDataArchived(baseData)
    await bases.unarchiveBaseAndVerify(baseData)
    await bases.verifyBaseDataActive(baseData)
    await bases.deleteBaseVerify(baseData)
  })

  // An issue occurs while duplicate base with questions and questionnaires.
  test('To verify duplicate the base with element Scenario id: EQA0011', async ({ }) => {
    const bases = new BaseAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.duplicateBaseWithElementAndVerify(baseData)
    await bases.deleteDuplicateBase(baseData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify to create a question,questionnaire,training and module through archive base', async ({ }) => {
    const bases = new BaseAction(page)
    const baseData = base.bases.base_2
    const questionnaireData = base.questionnaires.questionnaire_1
    const trainingData = base.training.training_1
    const mediaList = mediaData.medias.media1
    const moduleList = mediaData.module.module_list2
    const questionData = questions.single_type
    const baseType = 'withoutdomain'
    const baseStatus = 'archived'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.addMediaThroughBases(baseData, mediaList)
    await bases.archiveBase(baseData)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.createTrainingThroughArchiveBase(adminUser, baseData, trainingData)
    await bases.createModuleThroughArchiveBase(baseData, moduleList)
    await bases.addElementThroughArchiveBase(baseData, moduleList)
    await bases.deleteBaseVerify(baseData)
  })

  test('To verify deleting a base which have questions, questionnaire, module, training and media elements - Scenario id: EQA002', async ({ }) => {
    const bases = new BaseAction(page)
    const training = new TrainingAction(page)
    const moduleAction = new ModuleAction(page)
    const invite = new InviteAction(page)
    const home = new HomeAction(page)
    const questionnaireData = base.questionnaires.questionnaire_1
    const baseData = base.bases.base_1
    const trainingQuestionnaire = base.questionnaires.training_questionnaire_1
    const trainingData = base.training.training_1
    const mediaList = mediaData.medias.training_media1
    const moduleList = mediaData.module.module_list
    const questionData = questions.single_type
    const userList = userData.users.emailtesters
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    const questionnaireType1 = 'static'
    const questionnaireType2 = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaires(baseData, baseStatus, questionnaireType1, trainingQuestionnaire)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType2, questionnaireData)
    await invite.inviteUsersForEvaluations(baseData, baseStatus, userList, commonData, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await training.createTraining(adminUser, baseData, trainingData)
    await training.addQuestionnaireAndMedia(baseData, trainingData, trainingQuestionnaire, mediaList)
    await training.inviteUsersForTraining(userList, baseData, trainingData)
    await home.logIn(adminUser)
    await moduleAction.createModulesWithElements(moduleList, baseData, baseStatus)
    await moduleAction.inviteUsers(moduleList, userList)
    await home.logIn(adminUser)
    await bases.deleteBaseVerify(baseData)
  })

  // An issue occurs while duplicate base with questions and questionnaires.
  test('To verify the public visibility questionnaire is not duplicated Scenario id: EQA0011', async ({ }) => {
    const bases = new BaseAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const forms = new FormAction(page)
    const baseData = base.bases.base_2
    const mediaList = mediaData.medias.training_media1
    const questionnaireData = base.questionnaires.questionnaire_1
    const consequence = base.message.messages_1
    const formData = form.forms.simple_form
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await forms.createForm(formData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaire.createPublicQuestionnaireThroughBase(baseData, questionnaireData)
    await questionnaire.createConsequenceQuestionnaireThroughBase(baseData, questionnaireData, consequence)
    await questionnaire.createFormQuestionnaireThroughBase(baseData, questionnaireData, formData)
    await questionnaire.createRenewalQuestionnaireThroughBase(baseData, questionnaireData)
    await questionnaire.createVisibilityQuestionnaireThroughBase(baseData, questionnaireData)
    await bases.duplicateBaseWithElementAndVerify(baseData)
    await bases.verifyVisibilityIsNotDuplicatedOnDuplicateBase(baseData, questionnaireData)
    await bases.verifyQuestionnaireModeIsDuplicatedExceptPublicVisibilityOnDuplicateBase(baseData, questionnaireData)
    await bases.verifyMediaIsDuplicatedFromOriginalBase(baseData, mediaList)
    await bases.verifyQuestionIsDuplicatedFromOriginalBase(baseData, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('To create and duplicate base without element and verify Scenario id: EQA0012', async ({ }) => {
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const question = new QuestionAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const player = new PlayerAction(page)
    const invite = new InviteAction(page)
    const evaluation = new EvaluationAction(page)
    const userList = userData.users.emailtesters
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const mediaList = mediaData.medias.training_media1
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await bases.duplicateBaseWithoutElementAndVerify(baseData)
    await question.createQuestionsThroughDuplicateBase(baseData, questionData)
    await questionnaire.createQuestionnaireThroughDuplicateBases(baseData, questionnaireData)
    await player.playQuestionnaireFromDuplicateBase(baseData, questionnaireData, questionData)
    await invite.duplicateBaseQuestionnaireInvitePlay(userList, commonData, baseData, questionnaireData, questionData)
    await home.logIn(adminUser)
    await evaluation.questionnaireEvaluationOnDuplicateBase(baseData)
    await bases.deleteDuplicateBase(baseData)
    await bases.deleteBaseVerify(baseData)
  })

  test('verify invited archived questionnaire is on mail not in the user account', async ({ }) => {
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const invite = new InviteAction(page)
    const user = new UserAction(page)
    const baseData = base.bases.base_2
    const questionnaireData = base.questionnaires.questionnaire_1
    const questionData = questions.single_type
    const baseStatus = 'archived'
    const questionnaireType = 'dynamic'
    const baseType = 'withoutdomain'
    const userList = userData.users.emailtesters
    await bases.createBase(baseData, baseType)
    await bases.archiveBase(baseData)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await invite.inviteUsersForEvaluations(baseData, baseStatus, userList, commonData, questionnaireData)
    await home.logOut()
    await home.logInUser(userList)
    await user.verifyArchivedBaseOfInvitedQuestionnaireIsNotOnUserExperquizAccount(baseData, questionnaireData)
    await home.logIn(adminUser)
    await user.playArchiveQuestionnaireOnUserMail(userList, commonData, questionData)
    await home.logIn(adminUser)
    await bases.deleteBaseVerify(baseData)
  })
})
