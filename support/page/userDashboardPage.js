const { expect } = require('@playwright/test')
exports.UserDashboardPage = class UserDashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor (page) {
    this.page = page
  }

  async clickEnterprise () {
    await this.page.click("//nav[@id='nav-main']//span[normalize-space(text())='Settings']")
  }

  async clickCustomization () {
    await this.page.click("//div[@class='xq-nav-tab-wrapper']//a[normalize-space()='Customization']")
  }

  async clickUserView () {
    await this.page.click("//nav[@id='nav-main']//span[contains(text(),'User view')]")
    await expect(this.page.locator("//div[@id='user-dashboard-page']")).toBeVisible()
  }

  async clickAdminView () {
    await this.page.click("//nav[@id='nav-main']//span[contains(text(),'Admin view')]")
    await expect(this.page.locator("//div[@id='dashboard-page']//h1[text()[normalize-space()='Administration Dashboard']]")).toBeVisible()
  }

  async clickEmployeeView () {
    await this.page.click("//select[@id='employee_dashboard_sleek_dashboard']/following-sibling::span//span[@class='ui-selectmenu-icon ui-icon ui-icon-triangle-1-s']")
  }

  async clickEmployeeSleek () {
    await this.page.click("//ul[@id='employee_dashboard_sleek_dashboard-menu']//div[text()='sleek']")
  }

  async clickDropDownFreeAccessDisplay () {
    await this.page.click('#employee_dashboard_sleek_display-button')
  }

  async clickBase () {
    await this.page.click("//ul[@id='employee_dashboard_sleek_display-menu']//div[contains(text(),'by base')]")
  }

  async clickDropDownFreeAccessOrder () {
    await this.page.click('#employee_dashboard_sleek_order-button')
  }

  async clickByName () {
    await this.page.click("//ul[@id='employee_dashboard_sleek_order-menu']//div[contains(text(),'by name')]")
  }

  async clickSave () {
    await this.page.click("//button[@type='submit']")
  }

  async clickEmployeeClassic () {
    await this.page.click("//ul[@id='employee_dashboard_sleek_dashboard-menu']//div[text()='classic']")
  }

  async clickByRank () {
    await this.page.click("//ul[@id='employee_dashboard_sleek_order-menu']//div[contains(text(),'by rank')]")
  }

  async clickEditUser () {
    await this.page.click("//li[@title='Edit']//a[contains(@href,'/v4/admin/')]")
    await this.page.locator("//div[@class='waiting-wrapper full-page']//div[@class='waiting']").waitFor({ state: 'hidden' })
  }

  async clickEmployee () {
    await this.page.click("//label[contains(@input-id,'profile-/UserProfile/')][@class='checkbox-label'][normalize-space() = 'Employee']")
  }

  async clickClient () {
    await this.page.click("//label[contains(@input-id,'profile-/UserProfile/')][@class='checkbox-label'][normalize-space() = 'Client']")
  }

  async clickTrainee () {
    await this.page.click("//label[contains(@input-id,'profile-/UserProfile/')][@class='checkbox-label'][normalize-space() = 'Trainee']")
  }

  async clickContractor () {
    await this.page.click("//label[contains(@input-id,'profile-/UserProfile/')][@class='checkbox-label'][normalize-space() = 'Contractor']")
  }

  async clickOther () {
    await this.page.click("//label[contains(@input-id,'profile-/UserProfile/')][@class='checkbox-label'][normalize-space() = 'Other']")
  }

  async clickEnableClient () {
    await this.page.click("//label[@for='client_used']//span[@class='fa fa-square-o unchecked ']")
  }

  async clickClientCheckbox () {
    await this.page.click("//label[@for='client_user_dashboard_show_all']//span[@class='fa fa-square-o unchecked ']")
  }

  async clickClientView () {
    await this.page.click("//span[@id='client_dashboard_sleek_dashboard-button']//span[@class='ui-selectmenu-icon ui-icon ui-icon-triangle-1-s']")
  }

  async clickClientSleek () {
    await this.page.click("//ul[@id='client_dashboard_sleek_dashboard-menu']//div[text()='sleek']")
  }

  async clickClientDropDownFreeAccessDisplay () {
    await this.page.click('#client_dashboard_sleek_display-button')
  }

  async clickGlobalClient () {
    await this.page.click("//ul[@id='client_dashboard_sleek_display-menu']//div[contains(text(),'global')]")
  }

  async clickClientDropDownFreeAccessOrder () {
    await this.page.click('#client_dashboard_sleek_order-button')
  }

  async clickClientByRank () {
    await this.page.click("//ul[@id='client_dashboard_sleek_order-menu']//div[contains(text(),'by rank')]")
  }

  async clickBaseClient () {
    await this.page.click("//ul[@id='client_dashboard_sleek_display-menu']//div[contains(text(),'by base')]")
  }

  async clickClientByName () {
    await this.page.click("//ul[@id='client_dashboard_sleek_order-menu']//div[contains(text(),'by name')]")
  }

  async clickClientClassic () {
    await this.page.click("//ul[@id='client_dashboard_sleek_dashboard-menu']//div[text()='classic']")
  }

  async clickEnableTrainee () {
    await this.page.click("//label[@for='participant_used']//span[@class='fa fa-square-o unchecked ']")
  }

  async clickTraineeCheckbox () {
    await this.page.click("//label[@for='trainee_user_dashboard_show_all']//span[@class='fa fa-square-o unchecked ']")
  }

  async clickTraineeView () {
    await this.page.click("//span[@id='trainee_dashboard_sleek_dashboard-button']//span[@class='ui-selectmenu-icon ui-icon ui-icon-triangle-1-s']")
  }

  async clickTraineeSleek () {
    await this.page.click("//ul[@id='trainee_dashboard_sleek_dashboard-menu']//div[text()='sleek']")
  }

  async clickTraineeDropDownFreeAccessDisplay () {
    await this.page.click('#trainee_dashboard_sleek_display-button')
  }

  async clickGlobalTrainee () {
    await this.page.click("//ul[@id='trainee_dashboard_sleek_display-menu']//div[contains(text(),'global')]")
  }

  async clickTraineeDropDownFreeAccessOrder () {
    await this.page.click('#trainee_dashboard_sleek_order-button')
  }

  async clickTraineeByRank () {
    await this.page.click("//ul[@id='trainee_dashboard_sleek_order-menu']//div[contains(text(),'by rank')]")
  }

  async clickBaseTrainee () {
    await this.page.click("//ul[@id='trainee_dashboard_sleek_display-menu']//div[contains(text(),'by base')]")
  }

  async clickTraineeByName () {
    await this.page.click("//ul[@id='trainee_dashboard_sleek_order-menu']//div[contains(text(),'by name')]")
  }

  async clickTraineeClassic () {
    await this.page.click("//ul[@id='trainee_dashboard_sleek_dashboard-menu']//div[text()='classic']")
  }

  async clickEnableContractor () {
    await this.page.click("//label[@for='contractor_used']//span[@class='fa fa-square-o unchecked ']")
  }

  async clickContractorCheckbox () {
    await this.page.click("//label[@for='contractor_user_dashboard_show_all']//span[@class='fa fa-square-o unchecked ']")
  }

  async clickContractorView () {
    await this.page.click("//span[@id='contractor_dashboard_sleek_dashboard-button']//span[@class='ui-selectmenu-icon ui-icon ui-icon-triangle-1-s']")
  }

  async clickContractorSleek () {
    await this.page.click("//ul[@id='contractor_dashboard_sleek_dashboard-menu']//div[text()='sleek']")
  }

  async clickContractorDropDownFreeAccessDisplay () {
    await this.page.click('#contractor_dashboard_sleek_display-button')
  }

  async clickGlobalContractor () {
    await this.page.click("//ul[@id='contractor_dashboard_sleek_display-menu']//div[contains(text(),'global')]")
  }

  async clickContractorDropDownFreeAccessOrder () {
    await this.page.click('#contractor_dashboard_sleek_order-button')
  }

  async clickContractorByRank () {
    await this.page.click("//ul[@id='contractor_dashboard_sleek_order-menu']//div[contains(text(),'by rank')]")
  }

  async clickBaseContractor () {
    await this.page.click("//ul[@id='contractor_dashboard_sleek_display-menu']//div[contains(text(),'by base')]")
  }

  async clickContractorByName () {
    await this.page.click("//ul[@id='contractor_dashboard_sleek_order-menu']//div[contains(text(),'by name')]")
  }

  async clickContractorClassic () {
    await this.page.click("//ul[@id='contractor_dashboard_sleek_dashboard-menu']//div[text()='classic']")
  }

  async clickEnableOther () {
    await this.page.click("//label[@for='other_used']//span[@class='fa fa-square-o unchecked ']")
  }

  async clickOtherCheckbox () {
    await this.page.click("//label[@for='other_user_dashboard_show_all']//span[@class='fa fa-square-o unchecked ']")
  }

  async clickOtherView () {
    await this.page.click("//span[@id='other_dashboard_sleek_dashboard-button']//span[@class='ui-selectmenu-icon ui-icon ui-icon-triangle-1-s']")
  }

  async clickOtherSleek () {
    await this.page.click("//ul[@id='other_dashboard_sleek_dashboard-menu']//div[text()='sleek']")
  }

  async clickOtherDropDownFreeAccessDisplay () {
    await this.page.click('#other_dashboard_sleek_display-button')
  }

  async clickGlobalOther () {
    await this.page.click("//ul[@id='other_dashboard_sleek_display-menu']//div[contains(text(),'global')]")
  }

  async clickOtherDropDownFreeAccessOrder () {
    await this.page.click('#other_dashboard_sleek_order-button')
  }

  async clickOtherByRank () {
    await this.page.click("//ul[@id='other_dashboard_sleek_order-menu']//div[contains(text(),'by rank')]")
  }

  async clickBaseOther () {
    await this.page.click("//ul[@id='other_dashboard_sleek_display-menu']//div[contains(text(),'by base')]")
  }

  async clickOtherByName () {
    await this.page.click("//ul[@id='other_dashboard_sleek_order-menu']//div[contains(text(),'by name')]")
  }

  async clickOtherClassic () {
    await this.page.click("//ul[@id='other_dashboard_sleek_dashboard-menu']//div[text()='classic']")
  }

  async verifyClassic () {
    await expect(this.page.locator("//div[@id='user-dashboard-page']//div[@class='blocs-stripe']")).toBeVisible()
  }
}
