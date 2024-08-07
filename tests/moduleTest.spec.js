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
const { QuestionAction } = require('../support/action/questionsAction')
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
  // process.env.uniqueId = '20240411113031768'
  await home.logIn(adminUser)
})

test.describe('Module module', () => {
  test('Verify create module, set visibility to all users and play by user Scenario id:EQA066', async ({ }) => {
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtester
    const moduleList = mediaData.module.module_list2
    const mediaList = mediaData.medias.media1
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const evaluation = new EvaluationAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.setVisibilityAll(moduleList)
    await module.playAvailableModule(userList, moduleList, questionData)
    await evaluation.verifyResultforfreeToPlayModuleResult(adminUser, moduleList, userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create module, set visibility to group and play by group user Scenario id:EQA083', async ({ }) => {
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtester
    const moduleList = mediaData.module.module_list2
    const mediaList = mediaData.medias.media1
    const group = userData.group.group_1
    const bases = new BaseAction(page)
    const user = new UserAction(page)
    const module = new ModuleAction(page)
    const evaluation = new EvaluationAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await user.createGroup(group)
    await user.addUserAndAdminOnTheCreatedGroup(group, userList, adminUser)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.setVisibilityGroup(group, moduleList)
    await module.playAvailableModule(userList, moduleList, questionData)
    await evaluation.verifyResultforfreeToPlayModuleResult(adminUser, moduleList, userList)
    await user.deleteGroup(group)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create module, change to public access module and remove the public access then delete module Scenario id:EQA067', async ({ }) => {
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.questionnaire_1
    const moduleList = mediaData.module.module_list2
    const mediaList = mediaData.medias.media1
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.ChangeToPublicModule(moduleList)
    await module.removePublicModule(moduleList)
    await module.deleteModulesAndVerify(moduleList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create and duplicate module Scenario id:EQA073', async ({ }) => {
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.questionnaire_1
    const moduleList = mediaData.module.module_list2
    const mediaList = mediaData.medias.media1
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.duplicateModulesAndVerify(moduleList)
    await module.playDuplicateModuleBySelf(moduleList, questionData)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create module, invite and play by user Scenario id:EQA004', async ({ }) => {
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const userList = userData.users.emailtester
    const moduleList = mediaData.module.module_list
    const questionnaireData = base.questionnaires.questionnaire_1
    const mediaList = mediaData.medias.media1
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const evaluation = new EvaluationAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.inviteUsers(moduleList, userList)
    await module.playByUsers(userList, moduleList, questionData)
    await evaluation.verifyModuleResult(adminUser, moduleList, userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create module with archived base, edit the module then invite to user and play by user Scenario id: EQA091', async ({ }) => {
    const baseData = base.bases.base_1
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const moduleList = mediaData.module.module_list1
    const editModuleList = mediaData.module.edit_module_list1
    const mediaList = mediaData.medias.media1
    const questionData = questions.single_type
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const evaluation = new EvaluationAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'archived'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.addMediaThroughBases(baseData, mediaList)
    await bases.archiveBase(baseData)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.editModules(moduleList, editModuleList)
    await module.inviteUsers(editModuleList, userList)
    await module.playByUsers(userList, editModuleList, questionData)
    await evaluation.verifyModuleResult(adminUser, editModuleList, userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify invite module to user with short time and play by user after module end time Scenario id:EQA087', async ({ }) => {
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const moduleList = mediaData.module.module_list4
    const mediaList = mediaData.medias.media1
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const evaluation = new EvaluationAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.inviteModuleForCloseDate(moduleList, userList)
    await module.playModuleAfterEndTime(userList, moduleList, questionData)
    await evaluation.verifyNonePlayedModuleResult(adminUser, moduleList, userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify invite module one day after and play module by user Scenario id:EQA086', async ({ }) => {
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const moduleList = mediaData.module.module_list4
    const mediaList = mediaData.medias.media1
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const evaluation = new EvaluationAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.inviteModuleStartsOneDayAfter(moduleList, userList)
    await module.playModuleBeforeStart(userList, moduleList, questionData)
    await evaluation.verifyNonePlayedModuleResult(adminUser, moduleList, userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify invite module with short time, change module end date and play by user Scenario id: EQA109', async ({ }) => {
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const moduleList = mediaData.module.module_list1
    const mediaList = mediaData.medias.media1
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const evaluation = new EvaluationAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.inviteModuleWithShortTime(moduleList, userList)
    await home.logIn(adminUser)
    await module.changeModuleEndDate(moduleList)
    await module.playByUsers(userList, moduleList, questionData)
    await evaluation.verifyModuleResult(adminUser, moduleList, userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify create module, set module attendance certificate then invite to user through email and play Scenario id: Id 1005', async ({ }) => {
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.questionnaire_1
    const moduleList = mediaData.module.module_list1
    const mediaList = mediaData.medias.media1
    const contactUser = userData.users.emailtesters
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const evaluation = new EvaluationAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.setModuleAttendanceCertificate(moduleList)
    await module.inviteModuleThroughEmailsAndMobiles(moduleList, contactUser)
    await module.playByUsers(contactUser, moduleList, questionData)
    await module.VerifyModuleAttendanceCertificate(contactUser, moduleList)
    await evaluation.verifyModuleResult(adminUser, moduleList, contactUser)
    await bases.deleteBaseVerify(baseData)
  })

  // Error occurs randomly on generating module certificates
  test('Verify create module, set questionnaire usage on module, invite module with certificate by mail and play by user then verify certificate by mail', async ({ }) => {
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.three_questionnaire
    const userList = userData.users.emailtester
    const moduleList = mediaData.module.questionnaire_list
    const mediaList = mediaData.medias.media1
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const evaluation = new EvaluationAction(page)
    const invite = new InviteAction(page)
    const player = new PlayerAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaires(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.enableCertificateByEmail(moduleList)
    await module.setQuestionnaireUsage(moduleList)
    await module.inviteUsers(moduleList, userList)
    await module.playByUsers(userList, moduleList, questionData)
    await evaluation.verifyModuleResult(adminUser, moduleList, userList)
    await invite.navigateToEmailAndSmsLog()
    await player.playPage.verifyModuleAttendenceCertificateByEmail(commonData, userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify invite module with questionnaire evaluations and certification success rate and play by user', async ({ }) => {
    const baseData = base.bases.base_1
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.two_questionnaire
    const userList = userData.users.emailtester
    const moduleList = mediaData.module.module_with_success_rate
    const mediaList = mediaData.medias.media1
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const evaluation = new EvaluationAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaires(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.setQuestionnaireUsageWithSuccessRate(moduleList)
    await module.inviteUsers(moduleList, userList)
    await module.playModuleWithSuccessRate(userList, moduleList, questionData)
    await evaluation.verifyModuleResult(adminUser, moduleList, userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify invite module with correction questions, questionnaire evaluation with 100% succes rate and play by user', async ({ }) => {
    const baseData = base.bases.base_1
    const questionData = questions.all_type2
    const questionnaireData = base.questionnaires.questionnaire_with_correction
    const userList = userData.users.emailtester
    const moduleList = mediaData.module.module_with_correction_questionnaire
    const mediaList = mediaData.medias.media1
    const question = new QuestionAction(page)
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const evaluation = new EvaluationAction(page)
    const player = new PlayerAction(page)
    const baseType = 'withoutdomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await question.createQuestionsWithFreeTypeThroughBase(baseData, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await player.playQuestionnaire(baseData, baseStatus, questionnaireData, questionData)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.setQuestionnaireUsageOnCorrectionQuestionnaireWithSuccessRate(moduleList)
    await module.inviteUsers(moduleList, userList)
    await module.playModuleWithCorrectionQuestionnaireOfSuccessRate(userList, moduleList, questionData)
    await module.correctingTheCorrectionQuestionsByAdmin(adminUser, moduleList, questionData)
    await module.playSameModuleAfterCorrection(userList, moduleList)
    await evaluation.verifyModuleResult(adminUser, moduleList, userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify invite module with certificate and without side navigation menu, and change template of certificate then regenarate module certificate', async ({ }) => {
    const baseData = base.bases.base_2
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const moduleList = mediaData.module.module_list2
    const mediaList = mediaData.medias.media1
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const evaluation = new EvaluationAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.disableModuleSideNavigationMenu(moduleList)
    await module.enableCertificateOnStepsPage(moduleList)
    await module.inviteUsers(moduleList, userList)
    await module.playModuleWithoutSideMenu(userList, moduleList, questionData)
    await module.VerifyModuleAttendanceCertificate(userList, moduleList)
    await module.editCertificateTemplateOnModuleStepPage(adminUser, moduleList)
    await module.adminReGenerateCertificateToSameUser(moduleList, userList)
    await module.verifyReGeneratedCertificate(userList, moduleList)
    await evaluation.verifyModuleResult(adminUser, moduleList, userList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify archived visibility module is not displayed to the user and unarchive the module', async ({ }) => {
    const baseData = base.bases.base_2
    const questionData = questions.single_type
    const questionnaireData = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const moduleList = mediaData.module.module_list2
    const mediaList = mediaData.medias.media1
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const module = new ModuleAction(page)
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'static'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaireData)
    await bases.addMediaThroughBases(baseData, mediaList)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await module.setVisibilityAll(moduleList)
    await home.logIn(adminUser)
    await module.ArchiveModule(moduleList)
    await module.verifyArchiveModuleIsNowVisibility(moduleList)
    await home.logInUser(userList)
    await module.verifyArchiveModuleVisibilityIsNotDisplayedToUser(moduleList)
    await home.logIn(adminUser)
    await module.UnarchiveModule(moduleList)
    await bases.deleteBaseVerify(baseData)
  })

  test('Verify invite module, enable all consequence actions and message and play by user Scenario id: EQA112', async ({ }) => {
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
    const home = new HomeAction(page)
    const bases = new BaseAction(page)
    const user = new UserAction(page)
    const invite = new InviteAction(page)
    const module = new ModuleAction(page)
    const evaluation = new EvaluationAction(page)
    const skills = new SkillsQualificationsAction(page)
    const questionnaire = new QuestionnaireAction(page)
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
    await questionnaire.addConsequenceMessageOnQuestionnaire(baseData, questionnaireData[0], messages)
    await module.createModulesWithElements(moduleList, baseData, baseStatus)
    await questionnaire.addAllConsequenceActionOnQuestionnaire(baseData, questionnaireData[0], messages)
    await module.enableAddConsequenceOnModule(moduleList[0])
    await module.setQuestionnaireUsageOnEnableConsequenceModule(moduleList[0])
    await module.inviteConsequenceModule(moduleList[0], userList)
    await module.playModuleWithConsequenceMessageAndAction(userList, moduleList[0], questionData, messages)
    await evaluation.verifyGroupActionArePassed(adminUser, messages, userList)
    await evaluation.verifyModuleActionArePassed(messages, userList)
    await evaluation.verifyQuestionnaireActionArePassed(messages, userList)
    await home.logIn(adminUser)
    await evaluation.verifyCapacityActionArePassed(skillBlock, userList, messages)
    await invite.navigateToEmailAndSmsLog()
    await evaluation.verifyAdminMailActionArePassed(adminUser, messages)
    await evaluation.verifyUserMailActionArePassed(userList, messages)
    await evaluation.verifyManagerMailActionArePassed(adminUser, messages)
    await evaluation.verifyConsequenceModuleResult(moduleList[0], userList)
    await user.deleteGroup(group1)
    await user.deleteGroup(group2)
    await skills.deleteSkills(skillBlock)
    await bases.deleteBaseVerify(baseData)
  })
})
