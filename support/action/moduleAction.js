// @ts-check

const { PlayerPage } = require('../page/playerPage')
const { HomeAction } = require('../action/homeAction')
const { DashboardPage } = require('../page/dashboardPage')
const { EnterprisePage } = require('../page/enterprisePage')
const { QuestionnairePage } = require('../page/questionnairePage')
const { EvaluationAction } = require('../action/evaluationAction')
const { InvitePage } = require('../page/invitePage')
const { ModulePage } = require('../page/modulePage')
const { PlayerAction } = require('./playerAction')

exports.ModuleAction = class ModuleAction {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor (page) {
    this.page = page
    this.modulePage = new ModulePage(this.page)
    this.playerPage = new PlayerPage(this.page)
    this.home = new HomeAction(this.page)
    this.evaluation = new EvaluationAction(this.page)
    this.dashboard = new DashboardPage(this.page)
    this.enterprisePage = new EnterprisePage(this.page)
    this.questionnairePage = new QuestionnairePage(this.page)
    this.invitePage = new InvitePage(this.page)
  }

  async inviteUsers (moduleList, users) {
    await this.moduleInvite(moduleList, users)
    await this.dashboard.logOut()
  }

  async createModuleThroughArchiveBase (moduleList) {
    for (const modules of moduleList) {
      await this.modulePage.clickNewModuleButton()
      await this.modulePage.enterModuleName(modules)
      await this.modulePage.enterModuleRank(modules)
      await this.modulePage.clickSaveButtonCreateModulePage()
      // await this.page.reload({ waitUntil: 'load' })
      // await this.modulePage.verifyModulesExist(modules)
    }
  }

  async addModuleElementsThroughArchiveBases (base, moduleList) {
    for (const modules of moduleList) {
      await this.modulePage.openModule(modules)
      await this.modulePage.clickElements()
      for (const moduleElements of modules.elements) {
        if (moduleElements.type === 'questionnaire') {
          await this.modulePage.clickSelectQuestionnaire()
          await this.modulePage.clickAllTopicFilter()
          await this.modulePage.selectBaseName(base)
          await this.modulePage.selectElement(moduleElements.name)
        }
        if (moduleElements.type !== 'questionnaire') {
          await this.modulePage.clickSelectMedia()
          await this.modulePage.selectMediaElement(moduleElements.name, base)
          await this.modulePage.clickElements()
        }
      }
    }
  }

  async selectActiveBase (base) {
    await this.modulePage.clickAllTopicFilter()
    await this.modulePage.selectBaseName(base)
  }

  async selectArchiveBase (base) {
    await this.modulePage.enableWithArchivedBases()
    await this.modulePage.clickAllTopicFilter()
    await this.modulePage.selectBaseName(base)
  }

  async createModulesWithElements (moduleList, base, baseStatus) {
    for (const modules of moduleList) {
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      if (modules.module_name !== ' ') {
        await this.modulePage.clickNewModuleButton()
        await this.modulePage.enterModuleName(modules)
        await this.modulePage.enterModuleRank(modules)
        switch (baseStatus) {
          case 'active':
            await this.selectActiveBase(base)
            break
          case 'archived':
            await this.selectArchiveBase(base)
            break
          default:
            console.log('select without base')
            break
        }
        await this.modulePage.clickSaveButtonCreateModulePage()
      }
      await this.dashboard.clickModules()
      await this.modulePage.verifyModulesExist(modules)
      await this.modulePage.openModule(modules)
      await this.modulePage.clickElements()
      for (const moduleElements of modules.elements) {
        if (moduleElements.type === 'questionnaire') {
          await this.modulePage.clickSelectQuestionnaire()
          await this.modulePage.clickAllTopicFilter()
          await this.modulePage.selectBaseName(base)
          await this.modulePage.selectElement(moduleElements.name)
          await this.modulePage.verifyElement()
        }
        if (moduleElements.type !== 'questionnaire') {
          await this.modulePage.clickSelectMedia()
          await this.modulePage.selectMediaElement(moduleElements.name, base)
          await this.modulePage.verifyElement()
          await this.modulePage.clickElements()
        }
      }
    }
  }

  async inviteModule (modules) {
    await this.dashboard.clickModules()
    await this.setAllfilterAsAll()
    await this.modulePage.openModule(modules)
    await this.modulePage.clickInvite()
  }

  async selectUserToInvite (user) {
    await this.invitePage.clickSelectUser()
    await this.invitePage.selectUsers(user)
    await this.invitePage.clickValidate()
    await this.invitePage.clickInviteButton()
  }

  async emailsAndMobilesToInvite (user) {
    await this.invitePage.clickEmailAndMobilesButton()
    await this.invitePage.emailAreaInvite(user)
    await this.invitePage.clickValidate()
    await this.invitePage.clickInviteButton()
  }

  async moduleInvite (moduleList, user) {
    for (const modules of moduleList) {
      await this.inviteModule(modules)
      await this.invitePage.setStartDate()
      await this.invitePage.setCloseDate()
      await this.selectUserToInvite(user)
    }
    await this.evaluation.verifyModuleInviteSent(moduleList, user)
  }

  async inviteConsequenceModule (modules, user) {
    await this.inviteModule(modules)
    await this.invitePage.setStartDate()
    await this.invitePage.setCloseDate()
    await this.selectUserToInvite(user)
    await this.home.logOut()
  }

  async inviteModuleForCloseDate (moduleData, user) {
    for (const modules of moduleData) {
      await this.inviteModule(modules)
      await this.invitePage.setStartDate()
      await this.invitePage.setCloseDateAsNow()
      await this.selectUserToInvite(user)
    }
    await this.evaluation.verifyModuleInviteSent(moduleData, user)
    await this.page.waitForTimeout(150000)
    await this.home.logOut()
  }

  async inviteModuleWithShortTime (moduleData, user) {
    for (const modules of moduleData) {
      await this.inviteModule(modules)
      await this.invitePage.setStartDate()
      await this.invitePage.setCloseDateShortTime()
      await this.selectUserToInvite(user)
    }
    await this.evaluation.verifyModuleInviteSent(moduleData, user)
    await this.home.logOut()
  }

  async inviteModuleStartsOneDayAfter (moduleData, user) {
    for (const modules of moduleData) {
      await this.inviteModule(modules)
      await this.invitePage.setStartDateADayLater()
      await this.invitePage.setCloseDateTwoDaysLater()
      await this.selectUserToInvite(user)
    }
    await this.evaluation.verifyModuleInviteSent(moduleData, user)
    await this.home.logOut()
  }

  async inviteModuleThroughEmailsAndMobiles (moduleData, user) {
    for (const modules of moduleData) {
      await this.inviteModule(modules)
      await this.invitePage.setStartDate()
      await this.invitePage.setCloseDate()
      await this.emailsAndMobilesToInvite(user)
    }
    await this.home.logOut()
  }

  async modulePlay (modules, answerData) {
    let index = 0
    for (const moduleElements of modules.elements) {
      await this.playModule(moduleElements, answerData)
      let count = (modules.elements).length
      count = count - 1
      if (index < count) {
        await this.modulePage.clickNextStep()
        index++
      } else {
        await this.modulePage.clickQuitModule()
        await this.modulePage.saveModule()
      }
    }
  }

  async modulePlayWithSuccessRate (modules, answers) {
    let index = 0
    for (const moduleElements of modules.elements) {
      await this.playModule(moduleElements, answers)
      let count = (modules.elements).length
      count = count - 1
      if (index < count) {
        if (moduleElements.type === 'questionnaire') {
          await this.modulePage.verifyUserCompletedWithSuccessRate(modules)
          await this.modulePage.clickNextStep()
          index++
        } else {
          await this.modulePage.clickNextStep()
          index++
        }
      } else {
        await this.modulePage.clickQuitModule()
        await this.modulePage.saveModule()
      }
    }
  }

  async playModule (moduleElements, answerData) {
    this.play = new PlayerAction(this.page)
    if (moduleElements.type === 'questionnaire') {
      await this.modulePage.clickPlayQuestionnaire()
      await this.play.answerForQuestionnaire(answerData)
    }
  }

  async setModuleDurationAsMinute (module) {
    for (const modules of module) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickSteps()
      await this.modulePage.enableNotifyByEmail()
      await this.modulePage.disableAssignToGroup()
      await this.modulePage.enterModuleDruationAsMinute(modules)
      await this.modulePage.clickSaveOnStepPage()
    }
  }

  async playByUsers (users, moduleData, answer) {
    await this.home.logInUser(users)
    await this.playInvitedModule(moduleData, answer)
  }

  async playInvitedModule (moduleData, answer) {
    for (const modules of moduleData) {
      await this.dashboard.clickModuleInvites(modules)
      await this.modulePlay(modules, answer)
      await this.dashboard.clickDashboard()
    }
    await this.dashboard.userLogOut()
  }

  async playModuleBeforeStart (users, moduleData, answer) {
    await this.home.logInUser(users)
    for (const modules of moduleData) {
      if (!await this.page.locator("//a[contains(@href,'/user/module/')]//*[@title='" + modules.module_name + ' ' + process.env.uniqueId + "']").isVisible()) {
        await this.dashboard.clickMyModulesByUser()
        await this.page.waitForLoadState('load')
        await this.modulePage.verifyMyModuleInviteNotOpened(modules)
      }
      await this.dashboard.clickDashboard()
    }
    await this.dashboard.userLogOut()
  }

  async playAvailableModule (users, moduleData, answer) {
    await this.home.logInUser(users)
    for (const modules of moduleData) {
      await this.dashboard.clickAvailableModule(modules)
      await this.modulePlay(modules, answer)
      await this.dashboard.clickDashboard()
    }
    await this.dashboard.userLogOut()
  }

  async playModuleAfterEndTime (users, moduleData, answer) {
    await this.home.logInUser(users)
    for (const modules of moduleData) {
      if (!await this.page.locator("//a[contains(@href,'/user/module/')]//*[@title='" + modules.module_name + ' ' + process.env.uniqueId + "']").isVisible()) {
        await this.dashboard.clickMyModulesByUser()
        await this.page.waitForLoadState('load')
        await this.modulePage.verifyMyModuleInviteClosed(modules)
      }
      await this.dashboard.clickDashboard()
    }
    await this.dashboard.userLogOut()
  }

  async playModuleWithCorrectionQuestionnaireOfSuccessRate (users, moduleData, answer) {
    await this.home.logInUser(users)
    for (const modules of moduleData) {
      await this.dashboard.clickModuleInvites(modules)
      await this.playModuleWithCorrectionQuestionnaireAndSuccessRate(modules, answer)
      await this.dashboard.clickDashboard()
    }
    await this.dashboard.userLogOut()
  }

  async playModuleWithCorrectionQuestionnaireAndSuccessRate (modules, answers) {
    for (const moduleElements of modules.elements) {
      await this.playModule(moduleElements, answers)
      if (await this.page.locator("//a[@id='next-btn']").isHidden()) {
        await this.modulePage.clickBackToDashboardButton()
        break
      }
    }
  }

  async playSameModuleAfterCorrection (users, moduleData) {
    await this.home.logInUser(users)
    for (const modules of moduleData) {
      await this.dashboard.clickModuleInvites(modules)
      await this.playSameModuleAfterCompletedCorrection(modules)
      await this.dashboard.clickDashboard()
    }
    await this.dashboard.userLogOut()
  }

  async playSameModuleAfterCompletedCorrection (modules) {
    let index = 0
    for (const moduleElements of modules.elements) {
      await this.modulePage.verifyFirstStepsIsValidated(moduleElements)
      let count = (modules.elements).length
      count = count - 1
      if (index < count) {
        await this.modulePage.clickNextStep()
        index++
      } else {
        await this.modulePage.clickQuitModule()
        await this.modulePage.saveModule()
      }
    }
  }

  async playModuleWithoutSideMenu (users, moduleData, answer) {
    await this.home.logInUser(users)
    for (const modules of moduleData) {
      await this.dashboard.clickModuleInvites(modules)
      await this.modulePlayWithoutSideNavigationMenu(modules, answer)
      await this.dashboard.clickDashboard()
    }
    await this.dashboard.userLogOut()
  }

  async modulePlayWithoutSideNavigationMenu (modules, answers) {
    let index = 0
    for (const moduleElements of modules.elements) {
      await this.modulePage.verifySideNavigationMenuIsNotDisplayed()
      await this.playModuleWithoutSideMenuAndVerify(moduleElements, answers)
      let count = (modules.elements).length
      count = count - 1
      if (index < count) {
        await this.modulePage.clickNextStep()
        index++
      } else {
        await this.modulePage.clickQuitModule()
        await this.modulePage.saveModule()
      }
    }
  }

  async playModuleWithoutSideMenuAndVerify (moduleElements, answerData) {
    this.play = new PlayerAction(this.page)
    if (moduleElements.type === 'questionnaire') {
      await this.modulePage.clickPlayQuestionnaire()
      await this.modulePage.verifySideNavigationMenuIsDisplayedWhilePlayQuestionnaire()
      await this.play.answerForQuestionnaire(answerData)
    }
  }

  async playModuleWithConsequenceMessageAndAction (users, modules, answer, messages) {
    await this.home.logInUser(users)
    await this.dashboard.clickModuleInvites(modules)
    await this.modulePlayWithConsequenceMessage(users, modules, answer, messages)
    await this.dashboard.clickDashboard()
    await this.dashboard.userLogOut()
  }

  async modulePlayWithConsequenceMessage (users, modules, answers, messages) {
    let index = 0
    for (const moduleElements of modules.elements) {
      await this.playModuleConsequeceMessage(users, moduleElements, answers, messages)
      let count = (modules.elements).length
      count = count - 1
      if (index < count) {
        await this.modulePage.clickNextStep()
        index++
      } else {
        await this.modulePage.clickQuitModule()
        await this.modulePage.saveModule()
      }
    }
  }

  async playModuleConsequeceMessage (users, moduleElements, answerData, messages) {
    this.play = new PlayerAction(this.page)
    if (moduleElements.type === 'questionnaire') {
      await this.modulePage.clickPlayQuestionnaire()
      await this.play.answerForQuestionnaire(answerData)
      await this.modulePage.verifyConsequenceMessageAtEndOfTheTest(users, messages)
    }
  }

  async deleteModulesAndVerify (moduleData) {
    for (const modules of moduleData) {
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.clickDeleteModule(modules)
      await this.modulePage.confirmDelete(modules)
      await this.page.reload({ waitUntil: 'load' })
      await this.modulePage.verifyModuleDeleted(modules)
    }
  }

  async deleteVisibilityModuleAndverify (moduleData) {
    for (const modules of moduleData) {
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.clickDeleteVisibilityModule(modules)
      await this.modulePage.confirmDelete(modules)
      await this.page.reload({ waitUntil: 'load' })
      await this.modulePage.verifyVisibilityModuleDeleted(modules)
    }
  }

  async duplicateModulesAndVerify (moduleData) {
    for (const modules of moduleData) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.clickDuplicateModule(modules)
      await this.page.reload({ waitUntil: 'load' })
      await this.modulePage.verifyDuplicateModuleExist(modules)
    }
  }

  async playDuplicateModuleBySelf (moduleData, questionData) {
    for (const modules of moduleData) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openDuplicateModule(modules)
      await this.modulePage.clickPlayTrialModule()
      await this.modulePlay(modules, questionData)
      await this.dashboard.clickDashboard()
    }
  }

  async playModuleWithSuccessRate (users, moduleData, answer) {
    await this.home.logInUser(users)
    for (const modules of moduleData) {
      await this.dashboard.clickModuleInvites(modules)
      await this.modulePlayWithSuccessRate(modules, answer)
      await this.dashboard.clickDashboard()
    }
    await this.dashboard.userLogOut()
  }

  async deleteOngoingModulesAndVerify (moduleData) {
    for (const modules of moduleData) {
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.clickDeleteModule(modules)
      await this.modulePage.confirmDelete(modules)
      await this.page.reload({ waitUntil: 'load' })
      await this.modulePage.verifyOngoingNotModuleDeleted(modules)
    }
  }

  async editModules (moduleData, editModule) {
    let index = 0
    for (const modules of moduleData) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickEdit()
      await this.modulePage.enterModuleName(editModule[index])
      await this.modulePage.clickSaveButtonEditModulePage()
      await this.dashboard.clickModules()
      await this.modulePage.verifyModulesExist(editModule[index])
      index++
    }
  }

  async setModuleAttendanceCertificate (moduleData) {
    for (const modules of moduleData) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickSteps()
      await this.modulePage.enableNotifyByEmail()
      await this.modulePage.disableAssignToGroup()
      await this.modulePage.enableCertificate()
      await this.modulePage.clickSaveOnStepPage()
    }
  }

  async VerifyModuleAttendanceCertificate (users, moduleData) {
    await this.home.logInUser(users)
    await this.dashboard.clickMyCertificatesByUser()
    await this.modulePage.clickModuleTabCertificates()
    await this.page.waitForLoadState('load')
    for (const modules of moduleData) {
      await this.modulePage.VerifyModuleAttendanceCertificate(modules)
    }
    await this.dashboard.userLogOut()
  }

  async setVisibilityAll (moduleData) {
    for (const modules of moduleData) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickVisibility()
      await this.modulePage.selectAllUsers()
      await this.modulePage.clickSaveOnVisibilityPage()
    }
    await this.dashboard.logOut()
  }

  async setVisibilityGroup (group, moduleData) {
    for (const modules of moduleData) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickVisibility()
      await this.modulePage.selectGroupModuleVisibility(group)
      await this.modulePage.clickSaveOnVisibilityPage()
    }
    await this.dashboard.logOut()
  }

  async changeModuleEndDate (moduleData) {
    for (const modules of moduleData) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickResults()
      await this.modulePage.clickChangeEndDate()
      await this.invitePage.modifyModuleEndDate()
      await this.modulePage.clickSaveOnCloseDatePopupWindow()
    }
    await this.dashboard.logOut()
  }

  async setQuestionnaireUsage (moduleData) {
    for (const modules of moduleData) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickSteps()
      await this.modulePage.enableNotifyByEmail()
      await this.modulePage.disableAssignToGroup()
      await this.modulePage.enablePracticeOnQuestionnaireUsage()
      await this.modulePage.enableEvaluationOnQuestionnaireUsage()
      await this.modulePage.enableCertificationOnQuestionnaireUsage()
      await this.modulePage.clickSaveOnStepPage()
    }
  }

  async setQuestionnaireUsageWithSuccessRate (moduleData) {
    for (const modules of moduleData) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickSteps()
      await this.modulePage.enableNotifyByEmail()
      await this.modulePage.disableAssignToGroup()
      await this.modulePage.enableEvaluationsOnQuestionnaireUsage()
      await this.modulePage.enterSuccessRateOnEvaluationsQuestionnaire(modules)
      await this.modulePage.enableCertificationOnQuestionnaireUsage()
      await this.modulePage.enterSuccessRateOnCertificationQuestionnaire(modules)
      await this.modulePage.clickSaveOnStepPage()
    }
  }

  async setQuestionnaireUsageOnCorrectionQuestionnaire (moduleData) {
    for (const modules of moduleData) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickSteps()
      await this.modulePage.enableNotifyByEmail()
      await this.modulePage.disableAssignToGroup()
      await this.modulePage.enableEvaluationsOnQuestionnaireUsage()
      await this.modulePage.clickSaveOnStepPage()
    }
  }

  async setQuestionnaireUsageOnEnableConsequenceModule (modules) {
    await this.dashboard.clickDashboard()
    await this.dashboard.clickModules()
    await this.setAllfilterAsAll()
    await this.modulePage.openModule(modules)
    await this.modulePage.clickSteps()
    await this.modulePage.enableNotifyByEmail()
    await this.modulePage.disableAssignToGroup()
    await this.modulePage.enableEvaluationsOnQuestionnaireUsage()
    await this.modulePage.clickSaveOnStepPage()
  }

  async setQuestionnaireUsageOnCorrectionQuestionnaireWithSuccessRate (moduleData) {
    for (const modules of moduleData) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickSteps()
      await this.modulePage.enableNotifyByEmail()
      await this.modulePage.disableAssignToGroup()
      await this.modulePage.enableEvaluationsOnQuestionnaireUsage()
      await this.modulePage.enterSuccessRateOnEvaluationsQuestionnaire(modules)
      await this.modulePage.clickSaveOnStepPage()
    }
  }

  async enableCertificateByEmail (moduleList) {
    for (const modules of moduleList) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickSteps()
      await this.modulePage.enableNotifyByEmail()
      await this.modulePage.disableAssignToGroup()
      await this.modulePage.enableEvaluationsOnQuestionnaireUsage()
      await this.modulePage.enableCertificateByEmail()
      await this.modulePage.clickSaveOnStepPage()
    }
  }

  async enableCertificateOnStepsPage (moduleList) {
    for (const modules of moduleList) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickSteps()
      await this.modulePage.enableNotifyByEmail()
      await this.modulePage.disableAssignToGroup()
      await this.modulePage.enableEvaluationsOnQuestionnaireUsage()
      await this.modulePage.enableCertificate()
      await this.modulePage.clickSaveOnStepPage()
    }
  }

  async correctingTheCorrectionQuestionsByAdmin (admin, moduleData, question) {
    await this.home.logIn(admin)
    for (const modules of moduleData) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickResults()
      await this.modulePage.clickUsersTab()
      await this.modulePage.clickCorrectionButton()
      await this.modulePage.clickCorrectionButtonOnEvaluationPage()
      let correction = 0
      let index = 1
      for (const questions of question) {
        const getQuesTitle = await this.page.locator("//ul[@class='questions-list']//li[@class='question-item selected']").innerText()
        const qtitle = questions.title + ' ' + process.env.uniqueId
        if (qtitle === getQuesTitle) {
          await this.modulePage.enterAnswer(index, questions.answers)
          await this.modulePage.enterScore(correction, questions.score)
          await this.modulePage.correctionStatus(correction, questions.result)
          await this.modulePage.clickSaveOnCorrectionPage(index)
          correction = correction + 1
          index++
        }
      }
    }
    await this.dashboard.logOut()
  }

  async disableModuleSideNavigationMenu (module) {
    for (const modules of module) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickSteps()
      await this.modulePage.enableNotifyByEmail()
      await this.modulePage.disableAssignToGroup()
      await this.modulePage.disableSideNavigationMenu()
      await this.modulePage.clickSaveOnStepPage()
    }
  }

  async editCertificateTemplateOnModuleStepPage (admin, module) {
    await this.home.logIn(admin)
    for (const modules of module) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickSteps()
      await this.modulePage.enableNotifyByEmail()
      await this.modulePage.disableAssignToGroup()
      await this.modulePage.editModuleCertificateTitle(modules)
      await this.modulePage.editContentOnTheCertificateText(modules)
      await this.modulePage.clickSaveOnStepPage()
    }
  }

  async adminReGenerateCertificateToSameUser (module, users) {
    for (const modules of module) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.openModule(modules)
      await this.modulePage.clickResults()
      await this.modulePage.clickUsersTab()
      await this.modulePage.checkboxIsSelectedForPlayedUser(users)
      await this.modulePage.clickModuleAttendance()
    }
    await this.dashboard.logOut()
  }

  async verifyReGeneratedCertificate (users, moduleData) {
    await this.home.logInUser(users)
    await this.dashboard.clickMyModulesByUser()
    await this.page.waitForLoadState('load')
    for (const modules of moduleData) {
      await this.modulePage.VerifyAttendanceCertificate(modules)
    }
    await this.dashboard.userLogOut()
  }

  async ChangeToPublicModule (module) {
    for (const modules of module) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.checkboxIsSelectedForCreatedModule(modules)
      await this.modulePage.clickAddPublicStatusButton()
      await this.page.reload({ waitUntil: 'load' })
      await this.modulePage.verifyModuleIsNowPublic(modules)
      await this.modulePage.clickAllModulesFilter()
      await this.modulePage.selectPublicModuleStatus()
      await this.modulePage.verifyModuleOnPublicStatus(modules)
      await this.modulePage.clickAllModulesFilter()
      await this.modulePage.SelectAllModuleStatus()
    }
  }

  async removePublicModule (module) {
    for (const modules of module) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.checkboxIsSelectedForCreatedModule(modules)
      await this.modulePage.clickRemovePublicStatusButton()
      await this.page.reload({ waitUntil: 'load' })
      await this.modulePage.verifyModuleIsNotPublic(modules)
      await this.modulePage.clickAllModulesFilter()
      await this.modulePage.selectNonPublicModuleStatus()
      await this.modulePage.verifyModuleOnNonPublicStatus(modules)
      await this.modulePage.clickAllModulesFilter()
      await this.modulePage.SelectAllModuleStatus()
    }
  }

  async ArchiveModule (module) {
    for (const modules of module) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.checkboxIsSelectedForCreatedModule(modules)
      await this.modulePage.clickArchiveModuleButton()
      await this.page.reload({ waitUntil: 'load' })
      await this.modulePage.clickAllStatusFilter()
      await this.modulePage.selectArchivedModuleStatus()
      await this.modulePage.verifyArchivedModuleIsOnArchivedStatus(modules)
      await this.modulePage.clickAllStatusFilter()
      await this.modulePage.selectAllStatus()
      await this.modulePage.verifyArchivedModule(modules)
    }
  }

  async UnarchiveModule (module) {
    for (const modules of module) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.setAllfilterAsAll()
      await this.modulePage.checkboxIsSelectedForCreatedModule(modules)
      await this.modulePage.clickUnarchiveModuleButton()
      await this.page.reload({ waitUntil: 'load' })
      await this.modulePage.clickAllStatusFilter()
      await this.modulePage.selectActiveModuleStatus()
      await this.modulePage.verifyUnarchivedModuleIsOnActiveStatus(modules)
      await this.modulePage.clickAllStatusFilter()
      await this.modulePage.selectAllStatus()
      await this.modulePage.verifyUnarchivedModule(modules)
    }
  }

  async verifyArchiveModuleIsNowVisibility (module) {
    for (const modules of module) {
      await this.dashboard.clickDashboard()
      await this.dashboard.clickModules()
      await this.modulePage.clickAllStatusFilter()
      await this.modulePage.selectArchivedModuleStatus()
      await this.modulePage.verifyArchiveModuleVisibility(modules)
      await this.setAllfilterAsAll()
    }
    await this.dashboard.logOut()
  }

  async verifyArchiveModuleVisibilityIsNotDisplayedToUser (moduleData) {
    for (const modules of moduleData) {
      await this.dashboard.verifyArchivedModuleVisibilityIsNotShownOnFreeSection(modules)
      await this.dashboard.clickDashboard()
    }
    await this.dashboard.userLogOut()
  }

  async enableAddConsequenceOnModule (modules) {
    await this.dashboard.clickDashboard()
    await this.dashboard.clickModules()
    await this.setAllfilterAsAll()
    await this.modulePage.openModule(modules)
    await this.modulePage.clickSteps()
    await this.modulePage.enableNotifyByEmail()
    await this.modulePage.disableAssignToGroup()
    await this.modulePage.enableConsequenceOption()
    await this.modulePage.clickSaveOnStepPage()
  }

  async verifyModulesOptionsByPermittedUser (userList, moduleList, editModuleList, questions) {
    await this.editModules(moduleList, editModuleList)
    await this.moduleInvite(editModuleList, userList)
    await this.home.logOut()
    await this.home.logInUser(userList)
    await this.playInvitedModule(editModuleList, questions)
  }

  async setAllfilterAsAll () {
    await this.modulePage.clickAllStatusFilter()
    await this.modulePage.selectAllStatus()
    await this.modulePage.clickAllModulesFilter()
    await this.modulePage.SelectAllModuleStatus()
    await this.modulePage.clickPageFilter()
    await this.modulePage.select400PerPage()
  }
}
