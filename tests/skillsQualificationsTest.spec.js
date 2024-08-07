// @ts-check
const { test } = require('@playwright/test')
const dayjs = require('dayjs')

const userData = require('../testData/users.json')
const commonData = require('../testData/commonData.json')
const base = require('../testData/baseQuestionnaires.json')
const questionList = require('../testData/questions.json')
const skillData = require('../testData/skills.json')

const { HomeAction } = require('../support/action/homeAction')
const { InviteAction } = require('../support/action/InviteAction')
const { PlayerAction } = require('../support/action/playerAction')
const { SkillsQualificationsAction } = require('../support/action/skillsQualificationAction')
const { BaseAction } = require('../support/action/baseAction')

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
  // process.env.uniqueId = "20240122102844861"
  await home.logIn(adminUser)
})

test.describe('Skills & Qualifications module', () => {
  test('Verify import skill', async ({ }) => {
    const skillsqualifications = new SkillsQualificationsAction(page)
    const skillImport = skillData.skill_1.import_skill
    await skillsqualifications.importSkills(skillImport)
    await skillsqualifications.deleteImportedSkills(skillImport)
    await skillsqualifications.deleteAllSkillBlock()
  })

  test('Verify to create block with skill and both capacity', async ({ }) => {
    const skillsqualifications = new SkillsQualificationsAction(page)
    const skillBlock = skillData.skill_1.block1
    const skill = skillData.skill.skills
    const manual = skillData.skill.manual_capacity
    const auto = skillData.skill.auto_capacity
    await skillsqualifications.createSkillsBlockSkillsAndCapacity(skillBlock, skill, manual, auto)
    await skillsqualifications.verifySkillBlockSkillAndCapacity(skillBlock, skill, manual, auto)
    await skillsqualifications.deleteSkills(skillBlock)
  })

  test('Verify to delete skills, qualifications and jobs', async ({ }) => {
    const skillsqualifications = new SkillsQualificationsAction(page)
    const skillBlock = skillData.skill_1.block1
    const skill = skillData.skill.skills
    const qualifications = skillData.skill_1.qualification
    const jobs = skillData.skill_1.jobs
    await skillsqualifications.createSkillsBlock(skillBlock, skill)
    await skillsqualifications.verifySkillBlockAndSkill(skillBlock, skill)
    await skillsqualifications.createQualificationAndJobs(qualifications, jobs, skillBlock)
    await skillsqualifications.VerifyUserIsAbleToDeleteSkill(skillBlock)
    await skillsqualifications.deleteQuaification(qualifications)
    await skillsqualifications.deleteJobs(jobs)
    await skillsqualifications.deleteSkills(skillBlock)
  })

  test('Verify delete repositary', async ({ }) => {
    const skillsqualifications = new SkillsQualificationsAction(page)
    const skillBlock = skillData.skill_1.block1
    const skill = skillData.skill.skills
    const manual = skillData.skill.manual_capacity
    const auto = skillData.skill.auto_capacity
    const qualifications = skillData.skill_1.qualification
    const jobs = skillData.skill_1.jobs
    await skillsqualifications.createSkillsBlockSkillsAndCapacity(skillBlock, skill, manual, auto)
    await skillsqualifications.verifySkillBlockSkillAndCapacity(skillBlock, skill, manual, auto)
    await skillsqualifications.createQualificationAndJobs(qualifications, jobs, skillBlock)
    await skillsqualifications.deleteRepositaryBlock(skillBlock, qualifications, jobs)
  })

  test('Verify validated manual capacity', async ({ }) => {
    const skillsqualifications = new SkillsQualificationsAction(page)
    const userList = userData.users.emailtesters
    const skillBlock = skillData.skill_1.block1
    const skill = skillData.skill_1.skills1
    const manual = skillData.skill.manual_capacity
    const manualValidation = skillData.skill_1.manual_cap
    await skillsqualifications.createSkillsBlockWithManualCapacity(skillBlock, skill, manual)
    await skillsqualifications.validateManualCapacity(userList, skillBlock, skill, manual, manualValidation)
    await skillsqualifications.deleteSkills(skillBlock)
  })

  test('Verify validated auto capacity', async ({ }) => {
    const home = new HomeAction(page)
    const invite = new InviteAction(page)
    const bases = new BaseAction(page)
    const player = new PlayerAction(page)
    const skillsqualifications = new SkillsQualificationsAction(page)
    const baseData = base.bases.base_1
    const questionnaire = base.questionnaires.questionnaire_1
    const userList = userData.users.emailtesters
    const skillBlock = skillData.skill_1.block1
    const skill = skillData.skill.skills
    const auto = skillData.skill.auto_capacity
    const actionMessage = base.message.messages_1
    const questionData = questionList.single_type
    const baseType = 'singledomain'
    const baseStatus = 'active'
    const questionnaireType = 'dynamic'
    await bases.createBase(baseData, baseType)
    await bases.createQuestionsThroughBase(baseData, baseStatus, baseType, questionData)
    await bases.createQuestionnaireThroughBase(baseData, baseStatus, questionnaireType, questionnaire)
    await skillsqualifications.deleteAllSkillBlock()
    await skillsqualifications.createSkillsBlockWithAutoCapacity(skillBlock, skill, auto)
    await skillsqualifications.enterActionConsequence(baseData, questionnaire, actionMessage)
    await player.playQuestionnaire(baseData, baseStatus, questionnaire, questionData)
    await invite.inviteQuestionnaireToActiveUser(baseData, baseStatus, userList, commonData, questionnaire)
    await invite.navigateToEmailandsmslog()
    await player.playInvitedQuestionnaireThroughSkill(userList, commonData, questionData)
    await home.logIn(adminUser)
    await skillsqualifications.validateAutoCapacity(skillBlock, userList)
    await skillsqualifications.deleteSkills(skillBlock)
    await bases.deleteBaseVerify(baseData)
  })
})
