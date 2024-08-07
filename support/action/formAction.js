// @ts-check

const { expect } = require('@playwright/test')
const { DashboardPage } = require('../page/dashboardPage')
const { FormsPage } = require('../page/formPage')
const { InvitePage } = require('../page/invitePage')
const { QuestionnairePage } = require('../page/questionnairePage')
const { EnterprisePage } = require('../page/enterprisePage')
exports.FormAction = class FormAction {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor (page) {
    this.page = page
    this.dashboardPage = new DashboardPage(this.page)
    this.formPage = new FormsPage(this.page)
  }

  async createForm (formData) {
    await this.createNewForm(formData)
    await this.createFields(formData)
    await this.saveFormAndVerify(formData)
  }

  async createFormWithCondition (formData) {
    await this.createNewForm(formData)
    await this.createFieldsWithCondition(formData)
    await this.saveFormAndVerify(formData)
  }

  async createFormWithRedirectUrl (formData) {
    await this.dashboardPage.clickForms()
    await this.formPage.clickNewForms()
    await this.formPage.enterFormName(formData)
    await this.formPage.enterRedirectUrl(formData)
    await this.formPage.saveForm()
    await this.createFields(formData)
    await this.saveFormAndVerify(formData)
  }

  async saveFormAndVerify (formData) {
    await this.formPage.saveForm()
    await this.formPage.verifyFormExist(formData)
    await this.formPage.clickTrialPlayForm(formData)
    await this.fillForm(formData)
  }

  async createNewForm (formData) {
    await this.dashboardPage.clickForms()
    await this.formPage.clickNewForms()
    await this.formPage.enterFormName(formData)
    await this.formPage.saveForm()
  }

  async editForm (formData, editForm) {
    await this.dashboardPage.clickForms()
    await this.formPage.clickEditForm(formData)
    await this.formPage.deleteAllFields()
    await this.formPage.enterFormName(editForm)
    await this.createFields(editForm)
    await this.formPage.saveForm()
    await this.formPage.verifyFormExist(editForm)
  }

  async createFields (form) {
    for (const data of form.fields) {
      if (data.field_type === 'text' || data.field_type === 'para' || data.field_type === 'date' || data.field_type === 'number' || data.field_type === 'selector' || data.field_type === 'bool' || data.field_type === 'multiple_select' || data.field_type === 'drop_down' || data.field_type === 'label' || data.field_type === 'section_separator') {
        await this.moveField(data.field_type)
        await this.editField(data.field_type)
      }
      if (data.field_type === 'text' || data.field_type === 'para' || data.field_type === 'date' || data.field_type === 'number' || data.field_type === 'selector' || data.field_type === 'bool' || data.field_type === 'multiple_select' || data.field_type === 'drop_down') {
        await this.commonFields(data)
      }
      if (data.field_type === 'label') {
        await this.formPage.labelFields(data)
      }
      if (data.field_type === 'section_separator') {
        await this.sectionSeparatorFields(data)
      }
      if (data.field_type === 'text' || data.field_type === 'para') {
        await this.formPage.enterMinimumLength(data)
        await this.formPage.enterMaximumLength(data)
      }
      if (data.field_type === 'selector' || data.field_type === 'bool' || data.field_type === 'multiple_select' || data.field_type === 'drop_down') {
        await this.formPage.enterChoices(data)
      }
      if (data.field_type !== 'media') {
        await this.formPage.clickSaveField()
      }
    }
  }

  async createFieldsWithCondition (form) {
    for (const data of form.fields) {
      if (data.field_type === 'text' || data.field_type === 'para' || data.field_type === 'date' || data.field_type === 'number' || data.field_type === 'selector' || data.field_type === 'bool' || data.field_type === 'multiple_select' || data.field_type === 'drop_down' || data.field_type === 'label' || data.field_type === 'section_separator') {
        await this.moveField(data.field_type)
        await this.editField(data.field_type)
      }
      if (data.field_type === 'text' || data.field_type === 'para' || data.field_type === 'date' || data.field_type === 'number' || data.field_type === 'selector' || data.field_type === 'bool' || data.field_type === 'multiple_select' || data.field_type === 'drop_down') {
        await this.commonFields(data)
      }
      if (data.field_type === 'label') {
        await this.formPage.labelFields(data)
      }
      if (data.field_type === 'section_separator') {
        await this.sectionSeparatorFields(data)
      }
      if (data.field_type === 'text' || data.field_type === 'para') {
        await this.formPage.enterMinimumLength(data)
        await this.formPage.enterMaximumLength(data)
      }
      if (data.field_type === 'selector' || data.field_type === 'bool' || data.field_type === 'multiple_select' || data.field_type === 'drop_down') {
        await this.formPage.enterChoices(data)
      }
      if (data.field_type !== 'media') {
        await this.formPage.clickSaveField()
        await this.enterConditionForEachField(data)
      }
    }
  }

  async moveField (data) {
    if (data === 'text') {
      await this.formPage.moveTextField()
    }
    if (data === 'para') {
      await this.formPage.moveTextArea()
    }
    if (data === 'number') {
      await this.formPage.moveNumberField()
    }
    if (data === 'date') {
      await this.formPage.moveDateField()
    }
    if (data === 'selector') {
      await this.formPage.moveSelectorField()
    }
    if (data === 'bool') {
      await this.formPage.moveBoolField()
    }
    if (data === 'drop_down') {
      await this.formPage.moveDropDownField()
    }
    if (data === 'multiple_select') {
      await this.formPage.moveMultipleSelectField()
    }
    if (data === 'label') {
      await this.formPage.moveLabelField()
    }
    if (data === 'section_separator') {
      await this.formPage.moveSectionSeparatorField()
    }
  }

  async editField (data) {
    if (data === 'text') {
      await this.formPage.editTextField()
    }
    if (data === 'para') {
      await this.formPage.editTextArea()
    }
    if (data === 'number') {
      await this.formPage.editNumberField()
    }
    if (data === 'date') {
      await this.formPage.editDateField()
    }
    if (data === 'selector') {
      await this.formPage.editSelectorField()
    }
    if (data === 'bool') {
      await this.formPage.editBoolField()
    }
    if (data === 'drop_down') {
      await this.formPage.editDropDownField()
    }
    if (data === 'multiple_select') {
      await this.formPage.editMultipleSelectField()
    }
    if (data === 'label') {
      await this.formPage.editLabelField()
    }
    if (data === 'section_separator') {
      await this.formPage.editSectionSeparatorField()
    }
    await this.page.waitForTimeout(1000)
    await expect(this.page.locator("//form[@id='field-settings-form']")).toBeVisible()
  }

  async commonFields (data) {
    await this.formPage.enterFieldName(data)
    await this.formPage.enterLabelName(data)
    await this.formPage.selectInputRequired(data)
    await this.formPage.selectUserData(data)
  }

  async sectionSeparatorFields (data) {
    await this.formPage.enterFieldName(data)
    await this.formPage.enterLabelName(data)
  }

  async fillForm (form) {
    await this.page.waitForLoadState('load')
    await expect(this.page.locator("//body[@id='survey-page']")).toBeVisible()
    for (const data of form.fields) {
      if (data.field_type === 'selector' || data.field_type === 'bool') {
        await this.formPage.selectChoice(data)
      }
      if (data.field_type === 'drop_down') {
        await this.formPage.selectOptionFromDropDownList(data)
      }
      if (data.field_type === 'multiple_select') {
        await this.formPage.selectMultiple1(data)
        await this.formPage.selectMultiple2(data)
        await this.formPage.selectMultiple3(data)
      }
      if (data.field_type === 'text' || data.field_type === 'para' || data.field_type === 'date' || data.field_type === 'number') {
        await this.formPage.enterTextField(data)
      }
    }
    await this.formPage.submitForm()
  }

  async enterConditionForEachField (data) {
    switch (data.field_type) {
      case ('para'):
        await this.formPage.editTextArea()
        await this.formPage.enterConditionpara(data.condition_para)
        await this.formPage.clickSaveField()
        break
      case ('date'):
        await this.formPage.editDateField()
        await this.formPage.enterConditionForDate(data.condition_date)
        await this.formPage.clickSaveField()
        break
      case ('number'):
        await this.formPage.editNumberField()
        await this.formPage.enterConditionForNumber(data.condition_number)
        await this.formPage.clickSaveField()
        break
      case ('selector'):
        await this.formPage.editSelectorField()
        await this.formPage.enterConditionForSelector(data.condition_selector)
        await this.formPage.clickSaveField()
        break
      case ('bool'):
        await this.formPage.editBoolField()
        await this.formPage.enterConditionForBool(data.condition_bool)
        await this.formPage.clickSaveField()
        break
      case ('drop_down'):
        await this.formPage.editDropDownField()
        await this.formPage.enterConditionForDropDown(data.condition_drop_down)
        await this.formPage.clickSaveField()
        break
      case ('multiple_select'):
        await this.formPage.editMultipleSelectField()
        await this.formPage.enterConditionForMultiple(data.condition_multiple)
        await this.formPage.clickSaveField()
        break
      default:
        console.log('No condition is entered')
        break
    }
  }

  async deleteFormAndVerify (formData) {
    await this.dashboardPage.clickForms()
    await this.formPage.clickStatusFilter()
    await this.formPage.selectAllStatus()
    await this.formPage.deleteForm(formData)
    await this.formPage.confirmDelete(formData)
    await this.page.reload({ waitUntil: 'load' })
    await this.formPage.verifyFormNotExist(formData)
  }

  async duplicateFormAndVerify (formData) {
    await this.dashboardPage.clickForms()
    await this.formPage.duplicateForm(formData)
    await this.dashboardPage.clickForms()
    await this.page.reload({ waitUntil: 'load' })
    await this.formPage.verifyDuplicateFormExist(formData)
    await this.formPage.clickSurveyDetailbutton(formData)
  }

  async inviteFormToTheActiveUserWithScheduled (formData, userData) {
    this.invite = new InvitePage(this.page)
    await this.dashboardPage.clickForms()
    await this.formPage.openForm(formData)
    await this.formPage.clickInvitationTab()
    await this.formPage.clickSelectUsersButton()
    await this.formPage.selectActiveUser(userData)
    await this.formPage.clickValidateTheSelectUser()
    await this.invite.setStartDateFormADayLater()
    await this.formPage.clickInviteButton()
    await this.dashboardPage.logOut()
  }

  async inviteFormToTheActiveUser (formData, userData) {
    this.invite = new InvitePage(this.page)
    await this.dashboardPage.clickForms()
    await this.formPage.openForm(formData)
    await this.formPage.clickInvitationTab()
    await this.formPage.clickSelectUsersButton()
    await this.formPage.selectActiveUser(userData)
    await this.formPage.clickValidateTheSelectUser()
    await this.formPage.clickInviteButton()
    await this.dashboardPage.logOut()
  }

  async inviteFormToTheUser (formData, userData) {
    this.invite = new InvitePage(this.page)
    await this.dashboardPage.clickForms()
    await this.formPage.clickInviteButtonOnForm(formData)
    await this.invite.clickEmailsMobilesButton()
    await this.invite.emailAreaInvite(userData)
    await this.invite.saveEmail()
    await this.invite.clickInviteButton()
    await this.dashboardPage.logOut()
  }

  async verifyUserNotPlayedTheScheduledSurvey (formData) {
    await this.dashboardPage.clickMySurveyMenuOnUserSide()
    await this.formPage.filterAnyStatusOnMySurveyPage()
    await this.formPage.verifyInvitedFormIsScheduledStatus(formData)
    await this.dashboardPage.userLogOut()
  }

  async verifyUserPlayedForm (userList, formData) {
    await this.dashboardPage.clickForms()
    await this.formPage.openForm(formData)
    await this.formPage.clickResultsTab()
    await this.formPage.verifyResultForUserPlayedForm(userList)
  }

  async verifyUserPlayedQuestionnaireWithForm (questionnaires) {
    this.questionnaire = new QuestionnairePage(this.page)
    await this.dashboardPage.clickQuestionnaire()
    await this.questionnaire.openQuestionnaire(questionnaires)
    await this.questionnaire.clickResults()
    await this.questionnaire.verifyResultForUserPlayedQuestionnaireWithForm(questionnaires)
  }

  async createPublicFormForActiveUser (appLinks, formData) {
    await this.dashboardPage.clickForms()
    await this.formPage.openForm(formData)
    await this.formPage.clickMakeItPublicButton()
    await this.formPage.enterPublicText(formData)
    await this.formPage.clickMakePublicButton()
    await this.formPage.verifySurveyFormIsPublic(appLinks, formData)
    const link = await this.formPage.getSurveyPublicLink(appLinks, formData)
    await this.dashboardPage.logOut()
    return link
  }

  async createPublicFormForInactiveUser (appLinks, formData) {
    await this.dashboardPage.clickForms()
    await this.formPage.openForm(formData)
    await this.formPage.clickMakeItPublicButton()
    await this.formPage.enterPublicText(formData)
    await this.formPage.enterPublicRedirectUrl(formData)
    await this.formPage.clickMakePublicButton()
    await this.formPage.verifySurveyFormIsPublic(appLinks, formData)
    const redirectUrl = await this.page.locator("//section[@id='visibility-bloc']/div[@class='bloc-body']").innerText()
    const url = redirectUrl.split('is:\n')[1]
    await this.formPage.verifySurveyFormIsRedirectUrl(url, formData)
    const link = await this.formPage.getSurveyPublicLink(appLinks, formData)
    await this.dashboardPage.logOut()
    return link
  }

  async playPublicSurveyFormByActiveUser (link, formData) {
    await this.dashboardPage.verifyLogedIn()
    await this.page.goto(link)
    await this.fillForm(formData)
    await this.formPage.waitForFormBouncePage()
    await this.formPage.signOutLoggedUser()
  }

  async verifyPublicSurveyIsPlayedByActiveUser (user, formData) {
    await this.dashboardPage.clickForms()
    await this.formPage.openForm(formData)
    await this.formPage.clickResultsTab()
    await this.formPage.verifyResultForActiveUserPlayedPublicForm(user)
  }

  async playPublicSurveyFormByInactiveUser (link, formData) {
    await this.page.goto(link)
    await this.fillForm(formData)
    await this.formPage.waitForFormBouncePage()
  }

  async verifyPublicSurveyIsPlayedByInactiveUser (formData) {
    await this.dashboardPage.clickForms()
    await this.formPage.openForm(formData)
    await this.formPage.clickResultsTab()
    await this.formPage.verifyResultForInactiveUserPlayedPublicForm()
  }

  async updateRedirectUrlForInactiveUserInEnterpriseOption (formData) {
    this.enterprisePage = new EnterprisePage(this.page)
    await this.dashboardPage.clickEnterprise()
    await this.enterprisePage.clickSettingsTab()
    await this.formPage.enterRedirectUrlOnEnterpriseOption(formData)
    await this.enterprisePage.clickSaveButtonOnSettingsTab()
  }
}
