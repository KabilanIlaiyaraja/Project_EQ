const { UserDashboardPage } = require('../page/userDashboardPage')
const { UserAction } = require('../action/userAction')
const { DashboardPage } = require('../page/dashboardPage')
exports.UserDashboardAction = class UserDashboardAction {
  /**
     * @param {import('@playwright/test').Page} page
     */
  constructor (page) {
    this.page = page
    this.userDashboardPage = new UserDashboardPage(this.page)
  }

  async createSleekByBaseByName () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickEmployeeView()
    await this.userDashboardPage.clickEmployeeSleek()
    await this.userDashboardPage.clickDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickBase()
    await this.userDashboardPage.clickDropDownFreeAccessOrder()
    await this.userDashboardPage.clickByName()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createSleekByBaseByRank () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickEmployeeView()
    await this.userDashboardPage.clickEmployeeSleek()
    await this.userDashboardPage.clickDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickBase()
    await this.userDashboardPage.clickDropDownFreeAccessOrder()
    await this.userDashboardPage.clickByRank()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createClassic () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickEmployeeView()
    await this.userDashboardPage.clickEmployeeClassic()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
    await this.userDashboardPage.verifyClassic()
  }

  async userTypeSelection (userType) {
    this.dashboardPage = new DashboardPage(this.page)
    this.userAction = new UserAction(this.page)
    await this.dashboardPage.clickUsers()
    await this.userDashboardPage.clickEditUser()
    await this.userAction.unselectUserProfiles()
    switch (userType) {
      case ('client'):
        await this.userDashboardPage.clickClient()
        break
      case ('trainee'):
        await this.userDashboardPage.clickTrainee()
        break
      case ('contractor'):
        await this.userDashboardPage.clickContractor()
        break
      case ('other'):
        await this.userDashboardPage.clickOther()
        break
      default:
        await this.userDashboardPage.clickEmployee()
        break
    }
    await this.userAction.userPage.clickSave()
  }

  async createClientSleekByRank () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickEnableClient()
    await this.userDashboardPage.clickClientCheckbox()
    await this.userDashboardPage.clickClientView()
    await this.userDashboardPage.clickClientSleek()
    await this.userDashboardPage.clickClientDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickGlobalClient()
    await this.userDashboardPage.clickClientDropDownFreeAccessOrder()
    await this.userDashboardPage.clickClientByRank()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createClientSleekByBaseByName () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickClientView()
    await this.userDashboardPage.clickClientSleek()
    await this.userDashboardPage.clickClientDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickBaseClient()
    await this.userDashboardPage.clickClientDropDownFreeAccessOrder()
    await this.userDashboardPage.clickClientByName()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createClientSleekByBaseByRank () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickClientView()
    await this.userDashboardPage.clickClientSleek()
    await this.userDashboardPage.clickClientDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickBaseClient()
    await this.userDashboardPage.clickClientDropDownFreeAccessOrder()
    await this.userDashboardPage.clickClientByRank()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createClientClassic () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickClientView()
    await this.userDashboardPage.clickClientClassic()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
    await this.userDashboardPage.verifyClassic()
  }

  async createTraineeSleekByRank () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickEnableTrainee()
    await this.userDashboardPage.clickTraineeCheckbox()
    await this.userDashboardPage.clickTraineeView()
    await this.userDashboardPage.clickTraineeSleek()
    await this.userDashboardPage.clickTraineeDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickGlobalTrainee()
    await this.userDashboardPage.clickTraineeDropDownFreeAccessOrder()
    await this.userDashboardPage.clickTraineeByRank()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createTraineeSleekByBaseByName () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickTraineeView()
    await this.userDashboardPage.clickTraineeSleek()
    await this.userDashboardPage.clickTraineeDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickBaseTrainee()
    await this.userDashboardPage.clickTraineeDropDownFreeAccessOrder()
    await this.userDashboardPage.clickTraineeByName()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createTraineeSleekByBaseByRank () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickTraineeView()
    await this.userDashboardPage.clickTraineeSleek()
    await this.userDashboardPage.clickTraineeDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickBaseTrainee()
    await this.userDashboardPage.clickTraineeDropDownFreeAccessOrder()
    await this.userDashboardPage.clickTraineeByRank()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createTraineeClassic () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickTraineeView()
    await this.userDashboardPage.clickTraineeClassic()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
    await this.userDashboardPage.verifyClassic()
  }

  async createContractorSleekByRank () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickEnableContractor()
    await this.userDashboardPage.clickContractorCheckbox()
    await this.userDashboardPage.clickContractorView()
    await this.userDashboardPage.clickContractorSleek()
    await this.userDashboardPage.clickContractorDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickGlobalContractor()
    await this.userDashboardPage.clickContractorDropDownFreeAccessOrder()
    await this.userDashboardPage.clickContractorByRank()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createContractorSleekByBaseByName () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickContractorView()
    await this.userDashboardPage.clickContractorSleek()
    await this.userDashboardPage.clickContractorDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickBaseContractor()
    await this.userDashboardPage.clickContractorDropDownFreeAccessOrder()
    await this.userDashboardPage.clickContractorByName()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createContractorSleekByBaseByRank () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickContractorView()
    await this.userDashboardPage.clickContractorSleek()
    await this.userDashboardPage.clickContractorDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickBaseContractor()
    await this.userDashboardPage.clickContractorDropDownFreeAccessOrder()
    await this.userDashboardPage.clickContractorByRank()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createContractorClassic () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickContractorView()
    await this.userDashboardPage.clickContractorClassic()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
    await this.userDashboardPage.verifyClassic()
  }

  async createOtherSleekByRank () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickEnableOther()
    await this.userDashboardPage.clickOtherCheckbox()
    await this.userDashboardPage.clickOtherView()
    await this.userDashboardPage.clickOtherSleek()
    await this.userDashboardPage.clickOtherDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickGlobalOther()
    await this.userDashboardPage.clickOtherDropDownFreeAccessOrder()
    await this.userDashboardPage.clickOtherByRank()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createOtherSleekByBaseByName () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickOtherView()
    await this.userDashboardPage.clickOtherSleek()
    await this.userDashboardPage.clickOtherDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickBaseOther()
    await this.userDashboardPage.clickOtherDropDownFreeAccessOrder()
    await this.userDashboardPage.clickOtherByName()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createOtherSleekByBaseByRank () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickOtherView()
    await this.userDashboardPage.clickOtherSleek()
    await this.userDashboardPage.clickOtherDropDownFreeAccessDisplay()
    await this.userDashboardPage.clickBaseOther()
    await this.userDashboardPage.clickOtherDropDownFreeAccessOrder()
    await this.userDashboardPage.clickOtherByRank()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
  }

  async createOtherClassic () {
    await this.userDashboardPage.clickEnterprise()
    await this.userDashboardPage.clickCustomization()
    await this.userDashboardPage.clickOtherView()
    await this.userDashboardPage.clickOtherClassic()
    await this.userDashboardPage.clickSave()
    await this.userDashboardPage.clickUserView()
    await this.userDashboardPage.verifyClassic()
  }
}
