// @ts-check

exports.DashboardAction = class DashboardAction {
  /**
    * @param {import('@playwright/test').Page} page
    */

  constructor (page) {
    this.page = page
  }
}
