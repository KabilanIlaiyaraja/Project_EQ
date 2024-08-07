// @ts-check

const { DashboardPage } = require('../page/dashboardPage')
const { BattlePage } = require('../page/battlePage')
const { PlayerAction } = require('../action/playerAction')

exports.BattleAction = class BattleAction {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
    this.battle = new BattlePage(this.page)
  }

  async createBattleByAdmin (users, baseName, questionnaireName) {
    await this.dashboard.changeToUser()
    await this.dashboard.clickBattle()
    await this.selectBase(baseName)
    await this.battle.clickNewBattle()
    await this.selectQuestionnaire(questionnaireName)
    await this.battle.enableDebrief()
    await this.battle.clickSelectEmployeesButton()
    await this.battle.particularUser(users)
    await this.battle.saveUsers()
    await this.battle.clickSave()
    await this.battle.verifyBattleCreated(users, questionnaireName)
    await this.dashboard.userLogOut()
  }

  async createBattle (baseName, questionnaireName) {
    await this.dashboard.changeToUser()
    await this.dashboard.clickBattle()
    await this.selectBase(baseName)
    await this.battle.clickNewBattle()
    await this.selectQuestionnaire(questionnaireName)
    await this.battle.enableDebrief()
    await this.battle.clickSave()
    await this.dashboard.userLogOut()
  }

  async verifyBattleEvaluationByAdminAndDelete (questionnaireName) {
    await this.dashboard.changeToUser()
    await this.dashboard.clickBattle()
    await this.battle.deletePlayedBattle(questionnaireName)
    await this.battle.clickConfirmDeleteBattle()
    await this.dashboard.clickBattle()
    await this.battle.verifyBattleDeleted(questionnaireName)
    await this.dashboard.userLogOut()
  }

  async createBattleByUser (admin, users, baseName, questionnaireName, question) {
    await this.dashboard.clickBattle()
    await this.selectBase(baseName)
    await this.battle.clickNewBattle()
    await this.selectQuestionnaire(questionnaireName)
    await this.battle.enableDebrief()
    await this.battle.clickSelectEmployeesButton()
    await this.battle.particularUser(users)
    await this.battle.selectAdmin(admin)
    await this.battle.saveUsers()
    await this.battle.clickSave()
    await this.battle.verifyBattleCreated(users, questionnaireName)
    await this.playBattleByUsers(questionnaireName, question)
  }

  async selectBase (element) {
    await this.battle.clickFolderFilter()
    await this.battle.selectFolder(element)
  }

  async selectQuestionnaire (element) {
    await this.battle.clickQuestionnaireFilter()
    await this.battle.selectQuestionnaireList(element)
  }

  async playBattleByAdmin (battleData, answer) {
    await this.dashboard.changeToUser()
    await this.plays(battleData, answer)
  }

  async plays (battleData, answer) {
    await this.dashboard.clickBattle()
    await this.battlePlay(battleData, answer)
    await this.dashboard.userLogOut()
  }

  async battlePlay (questionnaireData, answer) {
    this.play = new PlayerAction(this.page)
    await this.battle.clickPlayBattle(questionnaireData)
    await this.play.answerForQuestionnaire(answer)
    await this.play.playPage.backToQuestionnaire()
  }

  async playBattleByUsers (battleData, answer) {
    await this.plays(battleData, answer)
  }
}
