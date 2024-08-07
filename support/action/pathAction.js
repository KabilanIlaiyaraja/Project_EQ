// @ts-check
const { PathPage } = require('../page/pathPage')
const { DashboardPage } = require('../page/dashboardPage')
const { InvitePage } = require('../page/invitePage')
const { ModuleAction } = require('./moduleAction')
exports.PathAction = class PathAction {
  /**
    * @param {import('@playwright/test').Page} page
    */

  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
    this.pathPage = new PathPage(this.page)
  }

  async createPathAndVerify (pathData, adminUser) {
    await this.dashboard.clickPath()
    await this.createPath(pathData, adminUser)
    await this.pathPage.verifyPathCreated(pathData)
  }

  async createPath (pathData, adminUser) {
    await this.pathPage.clickNewPathButton()
    await this.pathPage.enterPathName(pathData)
    await this.pathPage.clickAuthorNameField()
    await this.pathPage.selectAuthorName(adminUser)
    await this.pathPage.clickSave()
  }

  async deletePathAndVerify (pathData) {
    await this.deletePath(pathData)
    await this.page.reload({ waitUntil: 'load' })
    await this.pathPage.verifyPathDeleted(pathData)
  }

  async deletePath (path) {
    await this.dashboard.clickPath()
    await this.pathPage.clickDeletePath(path)
    await this.pathPage.confirmDelete(path)
  }

  async deleteDuplicatePath (path) {
    await this.dashboard.clickPath()
    await this.pathPage.clickDeleteDuplicatePath(path)
    await this.pathPage.confirmDelete(path)
  }

  async deleteEditedPath (path) {
    await this.dashboard.clickPath()
    await this.pathPage.clickDeleteEditedPath(path)
    await this.pathPage.confirmDeleteEditedPath(path)
  }

  async duplicatePathAndVerify (pathData) {
    await this.pathPage.duplicatePath(pathData)
    await this.pathPage.verifyDuplicatedPath(pathData)
  }

  async addModules (pathData, module) {
    await this.dashboard.clickPath()
    await this.pathPage.openPath(pathData)
    await this.pathPage.clickModule()
    for (const moduleData of module) {
      await this.pathPage.selectModules(moduleData.module_name)
    }
    await this.pathPage.saveModule()
  }

  async addModulesForEditedPath (pathData, module) {
    this.dashboard = new DashboardPage(this.page)
    await this.dashboard.clickPath()
    await this.pathPage.openEditedPath(pathData)
    await this.pathPage.clickModule()
    for (const moduleData of module) {
      await this.pathPage.selectModules(moduleData.module_name)
    }
    await this.pathPage.saveModule()
  }

  async editPathAndVerify (path) {
    await this.dashboard.clickPath()
    await this.pathPage.openPath(path)
    await this.pathPage.clickEdit()
    await this.pathPage.enterNewPathName(path)
    await this.pathPage.clickSave()
    await this.pathPage.verifyPathEdited(path)
  }

  async inviteSetTime () {
    this.invitePage = new InvitePage(this.page)
    await this.pathPage.clickInvite()
    await this.invitePage.setStartDateForm()
    await this.pathPage.ClickPathheader()
    await this.invitePage.setCloseDateForm()
    await this.pathPage.ClickPathheader()
  }

  async selectUserAndInvite (user) {
    this.invitePage = new InvitePage(this.page)
    await this.invitePage.clickSelectUserForPath()
    await this.invitePage.selectUsersForPath(user)
    await this.invitePage.saveUsersForPath()
    await this.invitePage.clickInviteButton()
  }

  async inviteUsersForPath (pathData, user) {
    this.invitePage = new InvitePage(this.page)
    await this.dashboard.clickPath()
    await this.pathPage.openPath(pathData)
    await this.inviteSetTime()
    await this.selectUserAndInvite(user)
  }

  async inviteUsersForEditedPath (pathData, user) {
    this.invitePage = new InvitePage(this.page)
    await this.dashboard.clickPath()
    await this.pathPage.openEditedPath(pathData)
    await this.inviteSetTime()
    await this.selectUserAndInvite(user)
  }

  async inviteUsersForPathWithLessTime (pathData, user) {
    this.invitePage = new InvitePage(this.page)
    await this.dashboard.clickPath()
    await this.pathPage.openPath(pathData)
    await this.pathPage.clickInvite()
    await this.invitePage.setStartDateForm()
    await this.pathPage.ClickPathheader()
    await this.invitePage.setCloseDateFormAsLess()
    await this.pathPage.ClickPathheader()
    await this.selectUserAndInvite(user)
    await this.page.waitForTimeout(120000)
  }

  async playPath (moduleData, answer) {
    this.moduleAction = new ModuleAction(this.page)
    for (const module of moduleData) {
      await this.dashboard.clickInvitePath(module)
      await this.moduleAction.modulePlay(module, answer)
      await this.dashboard.clickDashboard()
    }
    await this.dashboard.userLogOut()
  }

  async VerifyClosedPath (moduleData) {
    this.dashboard = new DashboardPage(this.page)
    await this.dashboard.clickMyModulesByUser()
    await this.pathPage.verifyModuleNotPassed(moduleData[0])
  }
}
