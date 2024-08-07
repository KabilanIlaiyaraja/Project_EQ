// @ts-check
const { test } = require('@playwright/test')
const dayjs = require('dayjs')
const userData = require('../testData/users.json')
const commonData = require('../testData/commonData.json')
const base = require('../testData/baseQuestionnaires.json')
const questions = require('../testData/questions.json')
const mediaData = require('../testData/mediaModules.json')
const skillData = require('../testData/skills.json')

const { HomeAction } = require('../support/action/homeAction')
const { EnterpriseAction } = require('../support/action/enterpriseAction')
const { UserAction } = require('../support/action/userAction')
const { InviteAction } = require('../support/action/InviteAction')
const { PlayerAction } = require('../support/action/playerAction')
const { BaseAction } = require('../support/action/baseAction')
const { QuestionnaireAction } = require('../support/action/questionnaireAction')
const { ModuleAction } = require('../support/action/moduleAction')
const { SkillsQualificationsAction } = require('../support/action/skillsQualificationAction')
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
  // process.env.uniqueId = '20240413120639172'
  await home.logIn(adminUser)
})

test.describe('Questionnaire module', () => {
  test('Verify create dynamic and static questionnaire and play Scenario id: EQA003', async ({ }) => {
    const bases = new BaseAction(page)
    const player = new PlayerAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const questionnaireData2 = base.questionnaires.questionnaire_2
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    const questionnaireType2 = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await player.playQuestionnaire(baseData, baseStatus, questionnaireData, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType2, questionnaireData2)
    await player.playQuestionnaire(baseData, baseStatus, questionnaireData2, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify delete questionnaire Scenario id: EQA052', async ({ }) => {
    const bases = new BaseAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaire.deleteQuestionnaireAndVerify(baseData, questionnaireData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify duplicate questionnaire Scenario id: EQA051', async ({ }) => {
    const bases = new BaseAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaire.duplicateQuestionnaireAndVerify(baseData, questionnaireData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create questionnaire and set visibility to all Scenario id:EQA013', async ({ }) => {
    const bases = new BaseAction(page)
    const home = new HomeAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const player = new PlayerAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtester
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaire.setVisiblilityToAll(baseData, questionnaireData)
    await home.logInUser(userList)
    await player.playAvailableQuestionnaire(questionnaireData, questionData)
    await home.logIn(adminUser)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create questionnaire and set visibility to group', async ({ }) => {
    const bases = new BaseAction(page)
    const home = new HomeAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const user = new UserAction(page)
    const player = new PlayerAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const questionData = questions.single_type
    const group = userData.group.group_1
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await user.createGroup(group)
    await user.addUserAndAdminOnTheCreatedGroup(group, userList, adminUser)
    await questionnaire.setVisiblilityToGroup(baseData, questionnaireData, group)
    await home.logInUser(userList)
    await player.playAvailableQuestionnaire(questionnaireData, questionData)
    await home.logIn(adminUser)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create questionnaire, set as public questionnaire and play Scenario id:EQA048', async ({ }) => {
    const bases = new BaseAction(page)
    const home = new HomeAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const player = new PlayerAction(page)
    const evaluation = new EvaluationAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    const link = await questionnaire.makeQuestionnairePublic(baseData, questionnaireData)
    await player.playPublicQuestionnaire(link, questionData)
    await home.logIn(adminUser)
    await evaluation.verifyPublicQuestionnaireEvaluation(baseData, baseStatus, questionnaireData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create questionnaire, invite to user with short time and play by user after end time Scenario id:EQA035', async ({ }) => {
    const bases = new BaseAction(page)
    const home = new HomeAction(page)
    const invite = new InviteAction(page)
    const evaluation = new EvaluationAction(page)
    const player = new PlayerAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const questionData = questions.single_type
    const userList = userData.users.emailtester
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await invite.inviteQuestionnaireForEndDate(baseData, baseStatus, userList, commonData, questionnaireData)
    await home.logInUser(userList)
    await player.playNoneQuestionnaire(questionnaireData)
    await home.logIn(adminUser)
    await evaluation.VerifyQuestionnaireEvaluationAfterEnd(baseData, baseStatus, questionnaireData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create questionnaire, invite to user for a day later and play by user before start Scenario id: EQA085', async ({ }) => {
    const bases = new BaseAction(page)
    const home = new HomeAction(page)
    const invite = new InviteAction(page)
    const evaluation = new EvaluationAction(page)
    const player = new PlayerAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const questionData = questions.single_type
    const userList = userData.users.emailtesters
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await invite.inviteQuestionnaireBeforeStart(baseData, baseStatus, userList, commonData, questionnaireData)
    await home.logInUser(userList)
    await player.playNoneQuestionnaire(questionnaireData)
    await home.logIn(adminUser)
    await evaluation.verifyQuestionnaireEvaluationBeforeStart(baseData, baseStatus, questionnaireData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify edit and invite questionnaire to user then play questionnaire from email Scenario id: EQA011', async ({ }) => {
    const bases = new BaseAction(page)
    const home = new HomeAction(page)
    const invite = new InviteAction(page)
    const player = new PlayerAction(page)
    const evaluation = new EvaluationAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const newQuestionnaire = base.questionnaires.questionnaire_2
    const userList = userData.users.emailtesters
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaire.editQuestionnaire(baseData, questionnaireData, newQuestionnaire)
    await bases.verifyQuestionnaire(baseData, newQuestionnaire)
    await player.playQuestionnaire(baseData, baseStatus, newQuestionnaire, questionData)
    await invite.inviteQuestionnaireAndPlay(baseData, baseStatus, userList, commonData, newQuestionnaire, questionData)
    await home.logIn(adminUser)
    await evaluation.verifyQuestionnaireEvaluation(baseData, baseStatus, newQuestionnaire)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify All filters in questionnaire page Scenario id: EQA044', async ({ }) => {
    const bases = new BaseAction(page)
    const questionnaires = new QuestionnaireAction(page)
    const base1 = base.bases.base_1
    const base2 = base.bases.base_2
    const userList = userData.users.emailtester
    const dynamicQuestionnaire = base.questionnaires.questionnaire_1
    const staticQuestionnaire = base.questionnaires.questionnaire_2
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType1 = 'dynamic'
    const questionnaireType2 = 'static'
    await bases.createBase(base1, baseType)
    await bases.createQuestionsThroughBase(base1, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(base1, baseStatus, questionnaireType1, dynamicQuestionnaire)
    await bases.createBase(base2, baseType)
    await bases.createQuestionsThroughBase(base2, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(base2, baseStatus, questionnaireType2, staticQuestionnaire)
    await questionnaires.setAuthorForQuestionnaire(dynamicQuestionnaire, userList)
    await questionnaires.verifyStaticFilter(staticQuestionnaire, dynamicQuestionnaire)
    await questionnaires.verifyDynamicFilter(dynamicQuestionnaire, staticQuestionnaire)
    await questionnaires.verifyAllTypeFilter(dynamicQuestionnaire, staticQuestionnaire)
    await questionnaires.verifyTopicFilter(base1, dynamicQuestionnaire, staticQuestionnaire)
    await questionnaires.verifyAllTopicFilter(dynamicQuestionnaire, staticQuestionnaire)
    await questionnaires.verifyAuthorFilter(userList, dynamicQuestionnaire, staticQuestionnaire)
    await questionnaires.verifyAllAuthorsFilter(dynamicQuestionnaire, staticQuestionnaire)
    await bases.deleteBaseVerify(base2)
    await bases.deleteBaseVerify(base1)
  })

  test('Create email template and verify it on questionnaire Scenario id: EQA106', async ({ }) => {
    const bases = new BaseAction(page)
    const invite = new InviteAction(page)
    const enterprise = new EnterpriseAction(page)
    const questionnaire = new QuestionnaireAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    const getEmailTemplateValue = await enterprise.createEmailTemplate()
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await invite.verifyEmailTemplate(questionnaireData, getEmailTemplateValue)
    await questionnaire.deleteQuestionnaireAndVerify(baseData, questionnaireData)
    await bases.deleteBaseVerify(baseData)
  })

  // An issue occurs the created questionnaire is not displayed on the archived base.
  test('Verify create questionnaire in archived base and invite to user then play Scenario id: EQA089', async ({ }) => {
    const bases = new BaseAction(page)
    const home = new HomeAction(page)
    const invite = new InviteAction(page)
    const player = new PlayerAction(page)
    const evaluation = new EvaluationAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtester
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'archived'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.archiveBase(baseData)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await player.playQuestionnaire(baseData, baseStatus, questionnaireData, questionData)
    await invite.inviteQuestionnaireAndPlay(baseData, baseStatus, userList, commonData, questionnaireData, questionData)
    await home.logIn(adminUser)
    await evaluation.verifyQuestionnaireEvaluation(baseData, baseStatus, questionnaireData)
    await bases.deleteBaseVerify(baseData)
  })

  test('To verify player first message, player message and set certification for questionnaire evaluation Scenario id: EQA015', async ({ }) => {
    const bases = new BaseAction(page)
    const home = new HomeAction(page)
    const questionnaires = new QuestionnaireAction(page)
    const invite = new InviteAction(page)
    const evaluation = new EvaluationAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtester
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaires.setPlayerMessage(baseData, questionnaireData)
    await questionnaires.setCertification(questionnaireData)
    await invite.inviteQuestionnaireAndPlayWithMessage(baseData, baseStatus, userList, commonData, questionnaireData, questionData)
    await home.logIn(adminUser)
    await evaluation.generateCertificate(baseData, questionnaireData)
    await questionnaires.verifyCertificateGeneratedByAdmin(questionnaireData, userList)
    await home.logInUser(userList)
    await questionnaires.verifyCertificateGeneratedByUser(questionnaireData)
    await home.logIn(adminUser)
    await evaluation.verifyQuestionnaireEvaluation(baseData, baseStatus, questionnaireData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify add consequencce message and all actions in questionnaire,invite to user and play Scenario id: EQA110', async ({ }) => {
    const bases = new BaseAction(page)
    const home = new HomeAction(page)
    const questionnaires = new QuestionnaireAction(page)
    const evaluation = new EvaluationAction(page)
    const invite = new InviteAction(page)
    const user = new UserAction(page)
    const module = new ModuleAction(page)
    const player = new PlayerAction(page)
    const skills = new SkillsQualificationsAction(page)
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.two_questionnaire
    const userList = userData.users.emailtester
    const moduleList = mediaData.module.add_consequece_questionnaire_on_module_element
    const mediaList = mediaData.medias.media1
    const messages = base.message.messages_1
    const group1 = userData.group.group_1
    const group2 = userData.group.group_2
    const skillBlock = skillData.skill.block
    const skill = skillData.skill.skills
    const auto = skillData.skill.auto_capacity
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaires(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await skills.deleteAllSkillBlock()
    await skills.createSkillsBlockWithAutoCapacity(skillBlock, skill, auto)
    await user.createGroup(group1)
    await user.addUserAndAdminOnTheCreatedGroup(group1, userList, adminUser)
    await user.createGroup(group2)
    await user.defineBossForActiveUser(adminUser, userList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await questionnaires.addConsequenceMessageOnQuestionnaire(baseData, questionnaireData[0], messages)
    await questionnaires.addAllConsequenceActionOnQuestionnaire(baseData, questionnaireData[0], messages)
    await invite.inviteQuestionnaireToActiveUserWithConsequence(baseData, baseStatus, userList, commonData, questionnaireData[0])
    await home.logInUser(userList)
    await player.playQuestionnarieWithConsequenceWithMessagesAndAction(userList, questionnaireData[0], questionData, messages)
    await evaluation.verifyGroupActionArePassed(adminUser, messages, userList)
    await evaluation.verifyModuleActionArePassed(messages, userList)
    await evaluation.verifyQuestionnaireActionArePassed(messages, userList)
    await home.logIn(adminUser)
    await evaluation.verifyCapacityActionArePassed(skillBlock, userList, messages)
    await invite.navigateToEmailAndSmsLog()
    await evaluation.verifyAdminMailActionArePassed(adminUser, messages)
    await evaluation.verifyUserMailActionArePassed(userList, messages)
    await evaluation.verifyManagerMailActionArePassed(adminUser, messages)
    await user.deleteGroup(group1)
    await user.deleteGroup(group2)
    await skills.deleteSkills(skillBlock)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify add consequence assign group action on questionnaire,invite to user and play Scenario id:EQA113', async ({ }) => {
    const bases = new BaseAction(page)
    const home = new HomeAction(page)
    const questionnaires = new QuestionnaireAction(page)
    const invite = new InviteAction(page)
    const user = new UserAction(page)
    const player = new PlayerAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const messages = base.message.messages_1
    const group = userData.group.group_4
    const userList = userData.users.emailtesters
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await user.createGroup(group)
    await questionnaires.addConsequenceActionAssignGroup(questionnaireData, messages)
    await invite.inviteUsersForEvaluations(baseData, baseStatus, userList, commonData, questionnaireData)
    await home.logOut()
    await home.logInUser(userList)
    await player.playInvitedQuestionnaire(questionnaireData, questionData)
    await user.verifyUserInGroup(adminUser, group, userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify add consequence remove group action on questionnaire,invite to user and play Scenario id:EQA114', async ({ }) => {
    const bases = new BaseAction(page)
    const home = new HomeAction(page)
    const questionnaires = new QuestionnaireAction(page)
    const invite = new InviteAction(page)
    const user = new UserAction(page)
    const player = new PlayerAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const messages = base.message.messages_1
    const group = userData.group.group_1
    const userList = userData.users.emailtester
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await user.createGroup(group)
    await user.addUserAndAdminOnTheCreatedGroup(group, userList, adminUser)
    await questionnaires.addConsequenceActionRemoveGroup(questionnaireData, messages)
    await invite.inviteUsersForEvaluations(baseData, baseStatus, userList, commonData, questionnaireData)
    await home.logOut()
    await home.logInUser(userList)
    await player.playInvitedQuestionnaire(questionnaireData, questionData)
    await user.verifyUserNotInGroup(adminUser, group, userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify Create and play the classification questionnaire', async ({ }) => {
    const bases = new BaseAction(page)
    const player = new PlayerAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const questionData = questions.classifications.questions1
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await player.playClassifyQuestionnaire(baseData, questionnaireData, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create questionnaire evaluation on single page and play by user Scenario id: EQA104', async ({ }) => {
    const bases = new BaseAction(page)
    const home = new HomeAction(page)
    const questionnaires = new QuestionnaireAction(page)
    const invite = new InviteAction(page)
    const player = new PlayerAction(page)
    const evaluation = new EvaluationAction(page)
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtester
    const questionData = questions.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await questionnaires.setSinglePageQuestionnaire(baseData, questionnaireData)
    await player.playQuestionnaireSinglePage(baseData, questionnaireData, questionData)
    await invite.inviteQuestionnaireToActiveUser(baseData, baseStatus, userList, commonData, questionnaireData)
    await home.logOut()
    await home.logInUser(userList)
    await player.playQuestionnaireSinglePageByUser(questionnaireData, questionData)
    await home.logIn(adminUser)
    await evaluation.verifyQuestionnaireEvaluation(baseData, baseStatus, questionnaireData)
    await bases.deleteBaseVerify(baseData)
  })
})
