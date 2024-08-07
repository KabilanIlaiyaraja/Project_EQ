// @ts-check

const { DashboardPage } = require('../page/dashboardPage')
const { CyclePage } = require('../page/cyclePage')

exports.CycleAction = class CycleAction {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
    this.cycle = new CyclePage(this.page)
  }

  async createCycle (cycle) {
    await this.dashboard.clickCycles()
    await this.cycle.clickNewCycleButton()
    await this.cycle.enterCycleName(cycle)
    await this.cycle.enterDescription(cycle)
    await this.cycle.clickSave()
    await this.cycle.verifyCycleCreated(cycle)
  }

  async addStepsWithQuestionnaire (cycle, base, questionnaire) {
    await this.cycle.openCycle(cycle)
    await this.cycle.clickSteps()
    await this.cycle.selectQuestionnaireOnCycle(base, questionnaire)
    await this.cycle.uncheckAllDays(base, questionnaire)
    await this.cycle.setDelay(base, questionnaire)
    await this.cycle.setRepeat(base, questionnaire)
    await this.cycle.selectDay(base, questionnaire)
    await this.cycle.clickSave()
  }

  async addStepsWithQuestionnaireAndForms (cycle, base, questionnaire, form) {
    await this.cycle.openCycle(cycle)
    await this.cycle.clickSteps()
    await this.cycle.selectQuestionnaireOnCycle(base, questionnaire)
    await this.cycle.uncheckAllDays(base, questionnaire)
    await this.cycle.setDelay(base, questionnaire)
    await this.cycle.selectDay(base, questionnaire)
    await this.cycle.selectFormOnCycle(form)
    await this.cycle.setDelayOnForm(form)
    await this.cycle.clickSave()
  }

  async addStepsWithQuestionnaireAndFormsOnEditCycle (base, cycle) {
    await this.cycle.openCycle(cycle)
    await this.cycle.clickSteps()
    for (const type of cycle.cycle_step) {
      if (type.type === 'questionnaire') {
        await this.cycle.selectQuestionnaireOnCycle(base, type)
        await this.cycle.uncheckAllDays(base, type)
        await this.cycle.setDelay(base, type)
        await this.cycle.selectDay(base, type)
      }
      if (type.type === 'form') {
        await this.cycle.selectFormOnCycle(type)
        await this.cycle.setDelayOnForm(type)
      }
    }
    await this.cycle.clickSave()
  }

  async verifyTheCycleIsCreated (cycle) {
    await this.dashboard.clickCycles()
    await this.cycle.verifyCycleCreated(cycle)
  }

  async deleteCycleAndVerify (cycle) {
    await this.dashboard.clickCycles()
    await this.cycle.clickDeleteButtonOnGoingCyclePanel(cycle)
    await this.cycle.clickConfirmDeleteCycle()
    await this.page.reload({ waitUntil: 'load' })
    await this.cycle.verifyOnGoingCycleIsDeleted(cycle)
  }

  async verifyDeletedCycleIsNotDisplayedOnInvitedUserDashboard (cycles) {
    await this.cycle.verifyDeletedCycleIsNotDisplayedOnUserDashboardPage(cycles)
    await this.dashboard.userLogOut()
  }

  async deleteInvitedUserOnCycle (cycle) {
    await this.dashboard.clickCycles()
    await this.cycle.openCycle(cycle)
    await this.cycle.clickUsers()
    await this.cycle.filterOngoingStatus()
    await this.cycle.clickCheckboxOnOngoingCycle()
    await this.cycle.clickDeleteButtonOnInvitedCycle()
  }

  async verifyDeletedInvitedCycleIsOnCancelledStatus (user) {
    // await this.cycle.filterCancelledStatus()
    // await this.cycle.verifyDeletedOnCancelledStatus(user)
    await this.dashboard.logOut()
  }

  async editCreatedCycle (cycle, editCycle) {
    await this.dashboard.clickCycles()
    await this.cycle.openCycle(cycle)
    await this.cycle.editCycleButton()
    await this.cycle.enterCycleName(editCycle)
    await this.cycle.enterDescription(editCycle)
    await this.cycle.clickSave()
  }

  async editCycleStepOnCreatedCycle (base, cycle, editCycle) {
    await this.dashboard.clickCycles()
    await this.cycle.openCycle(editCycle)
    await this.cycle.clickSteps()
    for (const steps of cycle.cycle_step) {
      if (steps.type === 'questionnaire') {
        await this.cycle.deleteSelectedQuestionnaireOnCycleStep(base, steps)
      }
      if (steps.type === 'form') {
        await this.cycle.deleteSelectedFormOnCycleStep(steps)
      }
    }
    await this.cycle.clickSave()
  }
}
