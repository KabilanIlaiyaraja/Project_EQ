const { expect } = require('@playwright/test')
const { DashboardPage } = require('./dashboardPage')
const { HomeAction } = require('../action/homeAction')

exports.EnterprisePage = class EnterprisePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
  }

  async clickAdministrationTab () {
    await this.page.click("//a[contains(@href,'/enterprise/administration')][text()='Administration']")
    await this.dashboard.waiting()
  }

  async clickEmailAndSmsLogTab () {
    await expect(this.page.locator("//a[contains(@href,'/administration/email_sms_log')][normalize-space()='Emails & Sms log']")).toBeVisible()
    await this.page.click("//a[contains(@href,'/administration/email_sms_log')][normalize-space()='Emails & Sms log']")
    try {
      await expect(this.page.locator("//div[contains(@class,'email-log-table')]")).toBeVisible()
    } catch (error) {
      await this.page.reload({ waitUntil: 'load' })
      await expect(this.page.locator("//div[contains(@class,'email-log-table')]")).toBeVisible()
    }
  }

  async clickSettingsTab () {
    await this.page.click("//a[@href='/enterprise/options']")
    await this.page.waitForLoadState('load')
    await this.dashboard.waiting()
    await expect(this.page.locator('#menu h2', { hasText: 'Administrator menu' })).toBeVisible()
  }

  async clickSaveButtonOnSettingsTab () {
    await this.page.click("//button[@class='btn btn-primary']")
  }

  async clickViewPreviewMessage (to, subj) {
    await this.page.click("(//div[normalize-space()='" + to + "']/following-sibling::div[contains(.,'" + subj + "')]/following-sibling::button//span[@class='fa fa-eye icon'])[1]")
  }

  async clickQuitButton () {
    await this.page.click("//button[@class='xq-button secondary']//span[normalize-space(text())='quit']")
  }

  async emailTemplate () {
    await this.page.click("//a[@href='/enterprise/invitation_email/settings_edit']")
    const text = await this.page.locator("//*[@name='generic_email_message']").innerText()
    return text.padStart
  }

  async clickSave () {
    await this.page.click("//i[@class='fa fa-check']")
  }

  async clickEnterpriseQuestionnairesCheckbox () {
    if (await this.page.locator("//input[@name='main_menu_show_questionnaires']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_questionnaires']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseQuestionsCheckbox () {
    if (await this.page.locator("//input[@name='main_menu_show_questions']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_questions']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseMediaCheckbox () {
    if (await this.page.locator("//input[@name='main_menu_show_media']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_media']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseModulesCheckbox () {
    if (await this.page.locator("//input[@name='main_menu_show_modules']/following-sibling::label//span[@class='fa fa-square-o unchecked ']").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_modules']/following-sibling::label//span[@class='fa fa-square-o unchecked ']")
    }
  }

  async clickEnterpriseEvaluationsCheckbox () {
    if (await this.page.locator("//input[@name='main_menu_show_evaluations']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_evaluations']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseSkillsCheckbox () {
    if (await this.page.locator("//input[@name='main_menu_show_skills']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_skills']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseTrainingsCheckbox () {
    if (await this.page.locator("//input[@name='main_menu_show_trainings']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_trainings']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterprisePathsCheckbox () {
    if (await this.page.locator("//input[@name='main_menu_show_paths']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_paths']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseCertificatesCheckbox () {
    if (await this.page.locator("//input[@name='main_menu_show_certificates']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_certificates']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseChatsCheckbox () {
    if (await this.page.locator("//input[@name='main_menu_show_chats']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_chats']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseUseCyclesCheckbox () {
    if (await this.page.locator("//input[@name='show_cycles']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_cycles']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseShowCyclesCheckbox () {
    if (await this.page.locator("//input[@name='main_menu_show_cycles']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_cycles']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseUseSkillsManagement () {
    if (await this.page.locator("//input[@name='show_skills_blocks']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_skills_blocks']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseEnableUseQualificationMmanagement () {
    if (await this.page.locator("//input[@name='show_qualifications']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_qualifications']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseEnableUseJobManagement () {
    if (await this.page.locator("//input[@name='show_jobs']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_jobs']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseUseBusinessIntelligenceCheckbox () {
    if (await this.page.locator("//input[@name='with_business_intelligence']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='with_business_intelligence']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseBusinessIntelligenceCheckbox () {
    if (await this.page.locator("//input[@name='main_menu_show_business_intelligence']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_business_intelligence']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async verifyQuestionnaireMenuExist () {
    await expect(this.page.locator("//a[span[text()='Questionnaires']]")).toBeVisible()
  }

  async verifyQuestionMenuExist () {
    await expect(this.page.locator("//a[span[text()='Questions']]")).toBeVisible()
  }

  async verifyMediaMenuExist () {
    await expect(this.page.locator("//a[span[text()='Medias']]")).toBeVisible()
  }

  async verifyTrainingMenuExist () {
    await expect(this.page.locator("//a[span[text()='Trainings']]")).toBeVisible()
  }

  async verifyModuleMenuExist () {
    await expect(this.page.locator("//a[span[text()='Modules']]")).toBeVisible()
  }

  async verifyPathMenuExist () {
    await expect(this.page.locator("//a[span[text()='Learning paths']]")).toBeVisible()
  }

  async verifyEvaluationMenuExist () {
    await expect(this.page.locator("//a[span[text()='Results']]")).toBeVisible()
  }

  async verifyCycleMenuExist () {
    await expect(this.page.locator("//a[span[text()='Cycles']]")).toBeVisible()
  }

  async verifySkillMenuExist () {
    await expect(this.page.locator("//a[span[text()='Skills']]")).toBeVisible()
  }

  async verifyCertificateMenuExist () {
    await expect(this.page.locator("//a[span[text()='Certificates']]")).toBeVisible()
  }

  async verifyChatsMenuExist () {
    await expect(this.page.locator("//a[span[text()='Chats']]")).toBeVisible()
  }

  async verifyFormMenuExist () {
    await expect(this.page.locator("//a[span[text()='Surveys']]")).toBeVisible()
  }

  async clickEnterpriseCalendarOnDashboardCheckbox () {
    if (await this.page.locator("//input[@name='show_calendar']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_calendar']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseDashboardRankCheckbox () {
    if (await this.page.locator("//input[@name='show_dashboard_rank']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_dashboard_rank']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseLogoCheckbox () {
    if (await this.page.locator("//input[@name='show_enterprise_logo']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_enterprise_logo']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseAdvancedPermissionCheckbox () {
    if (await this.page.locator("//input[@name='show_advanced_permissions']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_advanced_permissions']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseHierarchyPermissionCheckbox () {
    if (await this.page.locator("//input[@name='show_hierarchy']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_hierarchy']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseTagsCheckbox () {
    if (await this.page.locator("//input[@name='show_tags']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_tags']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseUseTitle () {
    if (await this.page.locator("//input[@name='show_title']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_title']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseUseContactMessageToAdministrator () {
    if (await this.page.locator("//input[@name='show_user_contact_panel']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_user_contact_panel']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async enterContactMail (admin) {
    const contact = admin.user_name + admin.domain
    await this.page.locator("//input[@id='contact_email']").pressSequentially(contact)
  }

  async enterRedirectURLForUnsignedUser (url) {
    await this.page.locator("//input[@id='url_after']").pressSequentially(url.links.redirect_url)
  }

  async clickSortByFeature () {
    await this.page.click("//input[@id='show_order_by']/following-sibling::label//label[contains(text(),'Add')]")
  }

  async clickEnterpriseUseMailing () {
    if (await this.page.locator("//input[@name='show_mailing']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_mailing']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseEnableCertificateGenerator () {
    if (await this.page.locator("//input[@name='show_certificate']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_certificate']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseGlossaryCheckbox () {
    if (await this.page.locator("//input[@name='use_glossary']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='use_glossary']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickTopicTransfer () {
    if (await this.page.locator("//input[@id='use_topic_transfer']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@id='use_topic_transfer']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickTextToSpeech () {
    if (await this.page.locator("//input[@id='with_text_to_speech']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@id='with_text_to_speech']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseShowPlayerCheckbox () {
    if (await this.page.locator("//input[@name='show_player_settings']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_player_settings']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseShowColorCheckbox () {
    if (await this.page.locator("//input[@name='show_color_settings']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_color_settings']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseShowPlayerMessageCheckbox () {
    if (await this.page.locator("//input[@name='show_player_messages']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_player_messages']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseShowBaseColorCheckbox () {
    if (await this.page.locator("//input[@name='show_topic_color_field']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_topic_color_field']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseShowBaseArchiveCheckbox () {
    if (await this.page.locator("//input[@name='show_archive_topics']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_archive_topics']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseShowQuestionQualityPanelCheckbox () {
    if (await this.page.locator("//input[@name='show_question_quality_panel']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_question_quality_panel']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseMediasSubfoldersCheckbox () {
    if (await this.page.locator("//input[@name='use_media_subfolders']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='use_media_subfolders']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickUploadLargerSizeMedia () {
    if (await this.page.locator("//input[@id='use_unlimited_media_size_upload']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@id='use_unlimited_media_size_upload']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickUsePDFRreader () {
    if (await this.page.locator("//input[@id='use_custom_pdf_reader']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@id='use_custom_pdf_reader']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async enableEnterpriseQuestionsByDomainCheckbox () {
    if (await this.page.locator("//input[@name='show_questionnaire_dyn_specif_questions']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_questionnaire_dyn_specif_questions']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseQuestionsConsequencesCheckbox () {
    if (await this.page.locator("//input[@name='show_evaluation_consequence']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_evaluation_consequence']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseRenewalCheckbox () {
    if (await this.page.locator("//input[@name='show_renewal_warning']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_renewal_warning']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseSaveQuestionnaireEmail () {
    if (await this.page.locator("//input[@name='save_questionnaire_email']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='save_questionnaire_email']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseEnableCopyDocxQuestionnaire () {
    if (await this.page.locator("//input[@name='show_questionnaire_copy_docx']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_questionnaire_copy_docx']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseRankCheckbox () {
    if (await this.page.locator("//input[@name='show_evaluation_rank']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_evaluation_rank']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseGrade20Checkbox () {
    if (await this.page.locator("//input[@name='show_grade_20']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_grade_20']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseEnableFilterBySenderInEvaluationList () {
    if (await this.page.locator("//input[@name='show_leader_filter']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_leader_filter']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseEnableDefineGroupPermissionOnQuestionnaire () {
    if (await this.page.locator("//input[@name='show_group_questionnaire_permission']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_group_questionnaire_permission']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseQuestionnaieCorrectionCheckbox () {
    if (await this.page.locator("//input[@name='show_questionnaire_correction']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_questionnaire_correction']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseEvaluationCorrectionCheckbox () {
    if (await this.page.locator("//input[@name='show_evaluation_correction']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_evaluation_correction']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseTrainingBlackboardCheckbox () {
    if (await this.page.locator("//input[@name='show_training_blackboard']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_training_blackboard']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseTrainingCyclescheckbox () {
    if (await this.page.locator("//input[@name='show_training_cycles']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_training_cycles']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseTrainingAttendanceCheckbox () {
    if (await this.page.locator("//input[@name='show_training_attendance']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_training_attendance']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseTrainingTallySheet () {
    if (await this.page.locator("//input[@id='show_training_tally']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@id='show_training_tally']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseUsersExportsCheckbox () {
    if (await this.page.locator("//input[@name='show_users_export_xlsx']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_users_export_xlsx']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseExportsFlatCheckbox () {
    if (await this.page.locator("//input[@name='show_question_exports_flat']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_question_exports_flat']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseExportsCheckbox () {
    if (await this.page.locator("//input[@name='show_question_exports']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_question_exports']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseExportsJsoncheckbox () {
    if (await this.page.locator("//input[@name='show_question_exports_json']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_question_exports_json']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseExportsDocxCheckbox () {
    if (await this.page.locator("//input[@name='show_question_exports_docx']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_question_exports_docx']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async enterExcelFooterMessage (message) {
    await this.page.locator("//label[contains(text(),'Excel footer')]/following-sibling::input[@class='form-control']").pressSequentially(message.excel_footer)
  }

  async clickEnterpriseQuestionnaireExportScorm () {
    if (await this.page.locator("//input[@id='show_questionnaire_exports_scorm']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@id='show_questionnaire_exports_scorm']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickImportExternalModuleScorm () {
    if (await this.page.locator("//input[@id='show_imports_scorm']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@id='show_imports_scorm']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickModifyOwnProfileData () {
    if (await this.page.locator("//label[text()='Modify your own profile data']/preceding-sibling::span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//label[text()='Modify your own profile data']/preceding-sibling::span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseDirectionCheckbox () {
    if (await this.page.locator("//input[@name='direction_show']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='direction_show']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterprisePoleCheckbox () {
    if (await this.page.locator("//input[@name='pole_show']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='pole_show']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseTeamCheckbox () {
    if (await this.page.locator("//input[@name='team_show']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='team_show']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseDobCheckbox () {
    if (await this.page.locator("//input[@name='birth_date_show']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='birth_date_show']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseHiringCheckbox () {
    if (await this.page.locator("//input[@name='hiring_date_show']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='hiring_date_show']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickEnterpriseFixedCheckbox () {
    if (await this.page.locator("//input[@name='phone_fix_show']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='phone_fix_show']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickSignInCodes () {
    if (await this.page.locator("//input[@name='with_passwordless']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='with_passwordless']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async clickOptions () {
    await this.page.click("//ul[@class='xq-nav-tab-row']//a[normalize-space()='Settings']")
    await expect(this.page.locator('#menu h2', { hasText: 'Administrator menu' })).toBeVisible()
  }

  async clickSettingsHead () {
    await this.page.click("//div[@class='flex-head']")
  }

  async clickUserMenu () {
    await this.page.click("//a[@href='/enterprise/user_menu']")
  }

  async clickCustomizationTab () {
    await this.page.click("//ul[@class='xq-nav-tab-row']//a[normalize-space()='Customization']")
  }

  async clickEmployee () {
    await this.page.click("//label[contains(text(),'Employee')]")
  }

  async disableEmployee () {
    await this.page.click("//*[@for='employee_dashboard_sleek_dashboard'][contains(text(),'Sleek dashboard')]")
  }

  async clickClient () {
    await this.page.click("//label[contains(text(),'Client')]")
  }

  async clickTrainee () {
    await this.page.click("//label[contains(text(),'Trainee')]")
  }

  async clickContractor () {
    await this.page.click("//label[contains(text(),'Contractor')]")
  }

  async clickOther () {
    await this.page.click("//label[contains(text(),'Other')]")
  }

  async verifyEmployee () {
    await this.page.click("//*[@for='employee_user_dashboard_show_all']//span[contains(@class,'unchecked')]")
  }

  async verifyClient () {
    await this.page.click("//*[@for='client_user_dashboard_show_all']//span[contains(@class,'unchecked')]")
  }

  async verifyTrainee () {
    await this.page.click("//*[@for='trainee_user_dashboard_show_all']//span[contains(@class,'unchecked')]")
  }

  async verifyContractor () {
    await this.page.click("//*[@for='contractor_user_dashboard_show_all']//span[contains(@class,'unchecked')]")
  }

  async verifyOther () {
    await this.page.click("//*[@for='other_user_dashboard_show_all']//span[contains(@class,'unchecked')]")
  }

  async verifyClientnotvisible () {
    await expect(this.page.locator("//*[@for='client_user_dashboard_show_all']//span[contains(@class,'unchecked')]")).not.toBeVisible()
  }

  async verifyTraineenotvisible () {
    await expect(this.page.locator("//*[@for='trainee_user_dashboard_show_all']//span[contains(@class,'unchecked')]")).not.toBeVisible()
  }

  async verifyContractornotvisible () {
    await expect(this.page.locator("//*[@for='contractor_user_dashboard_show_all']//span[contains(@class,'unchecked')]")).not.toBeVisible()
  }

  async verifyOthernotvisible () {
    await expect(this.page.locator("//*[@for='other_user_dashboard_show_all']//span[contains(@class,'unchecked')]")).not.toBeVisible()
  }

  async clickUserOptions () {
    await this.page.click("//a[@href='/enterprise/user_menu']")
    await this.page.waitForLoadState('load')
  }

  async clickEnterpriseSurveyUserDataOption () {
    await this.page.click("//label[contains(text(),'Use survey forms to collect user data')]/preceding-sibling::span[contains(@class,'unchecked')]")
  }

  async disableQuestionnaireMenuOnEnterpriseOption () {
    if (await this.page.locator("//input[@name='main_menu_show_questionnaires']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_questionnaires']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']")
    }
  }

  async disableQuestionMenuOnEnterpriseOption () {
    if (await this.page.locator("//input[@name='main_menu_show_questions']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_questions']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']")
    }
  }

  async disableMediaMenuOnEnterpriseOption () {
    if (await this.page.locator("//input[@name='main_menu_show_media']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_media']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']")
    }
  }

  async disableResultMenuOnEnterpriseOption () {
    if (await this.page.locator("//input[@name='main_menu_show_evaluations']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_evaluations']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']")
    }
  }

  async disableCycleMenuOnEnterpriseOption () {
    if (await this.page.locator("//input[@name='show_cycles']/following-sibling::label//span[@class='fa fa-toggle-on checked ']").isVisible()) {
      await this.page.click("//input[@name='show_cycles']/following-sibling::label//span[@class='fa fa-toggle-on checked ']")
    }
  }

  async disableSkillMenuOnEnterpriseOption () {
    if (await this.page.locator("//input[@name='main_menu_show_skills']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_skills']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']")
    }
  }

  async disableTrainingMenuOnEnterpriseOption () {
    if (await this.page.locator("//input[@name='main_menu_show_trainings']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_trainings']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']")
    }
  }

  async disableModuleMenuOnEnterpriseOption () {
    if (await this.page.locator("//input[@name='main_menu_show_modules']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_modules']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']")
    }
  }

  async disablePathMenuOnEnterpriseOption () {
    if (await this.page.locator("//input[@name='main_menu_show_paths']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_paths']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']")
    }
  }

  async disableSurveyMenuOnEnterpriseOption () {
    if (await this.page.locator("//input[@name='main_menu_show_forms']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_forms']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']")
    }
  }

  async disableCertificateMenuOnEnterpriseOption () {
    if (await this.page.locator("//input[@name='main_menu_show_certificates']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_certificates']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']")
    }
  }

  async disableChatMenuOnEnterpriseOption () {
    if (await this.page.locator("//input[@name='main_menu_show_chats']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_chats']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']")
    }
  }

  async verifyAllUserMenus (users) {
    this.home = new HomeAction(this.page)
    await this.home.logInUserRand(users)
    await this.verifyAllUserMenusExist()
    await this.dashboard.userLogOut()
  }

  async verifyAllUserMenusExist () {
    await this.verifyUserTrainingPage()
    await this.verifyUserModulesPage()
    await this.verifyUserPathsPage()
    await this.verifyUserSurveyPage()
    await this.verifyUserSkillPage()
    await this.verifyUserScorecardsPage()
    await this.verifyUserReviewsPage()
    await this.verifyUserBattlesPage()
  }

  async disableBusinessIntelligenceMenuOnEnterpriseOption () {
    if (await this.page.locator("//input[@name='main_menu_show_business_intelligence']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']").isVisible()) {
      await this.page.click("//input[@name='main_menu_show_business_intelligence']/following-sibling::label//span[@class='fa  fa-check-square-o checked ']")
    }
  }

  async clickEnterpriseCalendarOndashboardCheckbox () {
    if (await this.page.locator("//input[@name='show_calendar']/following-sibling::label//span[contains(@class,'unchecked')]").isVisible()) {
      await this.page.click("//input[@name='show_calendar']/following-sibling::label//span[contains(@class,'unchecked')]")
    }
  }

  async disableEnterpriseDirectionCheckbox () {
    if (await this.page.locator("//input[@name='direction_show']/following-sibling::label//span[contains(@class,'checked')]").isVisible()) {
      await this.page.click("//input[@name='direction_show']/following-sibling::label//span[contains(@class,'checked')]")
    }
  }

  async disableEnterprisePoleCheckbox () {
    if (await this.page.locator("//input[@name='pole_show']/following-sibling::label//span[contains(@class,'checked')]").isVisible()) {
      await this.page.click("//input[@name='pole_show']/following-sibling::label//span[contains(@class,'checked')]")
    }
  }

  async disableEnterpriseDepartmentCheckbox () {
    if (await this.page.locator("//input[@name='department_show']/following-sibling::label//span[contains(@class,'checked')]").isVisible()) {
      await this.page.click("//input[@name='department_show']/following-sibling::label//span[contains(@class,'checked')]")
    }
  }

  async disableEnterpriseTeamCheckbox () {
    if (await this.page.locator("//input[@name='team_show']/following-sibling::label//span[contains(@class,'checked')]").isVisible()) {
      await this.page.click("//input[@name='team_show']/following-sibling::label//span[contains(@class,'checked')]")
    }
  }

  async disableEnterpriseEmployeeIdCheckbox () {
    if (await this.page.locator("//input[@name='employee_id_show']/following-sibling::label//span[contains(@class,'checked')]").isVisible()) {
      await this.page.click("//input[@name='employee_id_show']/following-sibling::label//span[contains(@class,'checked')]")
    }
  }

  async disableEnterpriseJobTitleCheckbox () {
    if (await this.page.locator("//input[@name='job_title_show']/following-sibling::label//span[contains(@class,'checked')]").isVisible()) {
      await this.page.click("//input[@name='job_title_show']/following-sibling::label//span[contains(@class,'checked')]")
    }
  }

  async disableEnterpriseDobCheckbox () {
    if (await this.page.locator("//input[@name='birth_date_show']/following-sibling::label//span[contains(@class,'checked')]").isVisible()) {
      await this.page.click("//input[@name='birth_date_show']/following-sibling::label//span[contains(@class,'checked')]")
    }
  }

  async disableEnterpriseHiringCheckbox () {
    if (await this.page.locator("//input[@name='hiring_date_show']/following-sibling::label//span[contains(@class,'checked')]").isVisible()) {
      await this.page.click("//input[@name='hiring_date_show']/following-sibling::label//span[contains(@class,'checked')]")
    }
  }

  async disableEnterpriseFixedCheckbox () {
    if (await this.page.locator("//input[@name='phone_fix_show']/following-sibling::label//span[contains(@class,'checked')]").isVisible()) {
      await this.page.click("//input[@name='phone_fix_show']/following-sibling::label//span[contains(@class,'checked')]")
    }
  }

  async disableEnterpriseCheckbox () {
    if (await this.page.locator("//input[@name='enterprise_show']/following-sibling::label//span[contains(@class,'checked')]").isVisible()) {
      await this.page.click("//input[@name='enterprise_show']/following-sibling::label//span[contains(@class,'checked')]")
    }
  }

  async disableModifyOwnProfileData () {
    if (await this.page.locator("//label[text()='Modify your own profile data']/preceding-sibling::span[contains(@class,'fa fa-toggle-on checked ')]").isVisible()) {
      await this.page.click("//label[text()='Modify your own profile data']/preceding-sibling::span[contains(@class,'fa fa-toggle-on checked ')]")
    }
  }

  async clickSaveForEnterpriseSettings () {
    await this.page.click("//button[@class='xq-button primary']")
  }

  async verifyAllMenusDisabled (users) {
    await this.home.logInUserRand(users)
    await expect(this.page.locator("//a[@href='/user/questions']/i")).not.toBeVisible()
    await expect(this.page.locator("//*[@id='calendar-bloc']")).not.toBeVisible()
    await expect(this.page.locator("//a[@href='/user/media']/i")).not.toBeVisible()
    await expect(this.page.locator("//a[@href='/user/trainings']/i")).not.toBeVisible()
    await expect(this.page.locator("//a[@href='/user/modules']/i")).not.toBeVisible()
    await expect(this.page.locator("//a[@href='/user/paths/list']/i")).not.toBeVisible()
    await expect(this.page.locator("//a[@href='/user/evaluations/list/eval']/i")).not.toBeVisible()
    await expect(this.page.locator("//a[@href='/user/scorecards']/i")).not.toBeVisible()
    await expect(this.page.locator("//a[@href='/user/reviews/list']/i")).not.toBeVisible()
    await expect(this.page.locator("//a[@href='/user/battles']/i")).not.toBeVisible()
    await this.dashboard.userLogOut()
  }

  async enableUserMenus () {
    await this.checkEmployee()
    await this.checkClient()
    await this.checkTrainee()
    await this.checkContractor()
    await this.checkOther()
  }

  async disableUserMenus () {
    await this.checkEmployeeDisabled()
    await this.checkClientDisabled()
    await this.checkTraineeDisabled()
    await this.checkContractorDisabled()
    await this.checkOtherDiabled()
  }

  async verifySleekMenu () {
    await this.verifyEmployee()
    await this.verifyClient()
    await this.verifyTrainee()
    await this.verifyContractor()
    await this.verifyOther()
  }

  async verifySleekMenunotvisible () {
    await this.verifyClientnotvisible()
    await this.verifyTraineenotvisible()
    await this.verifyContractornotvisible()
    await this.verifyOthernotvisible()
  }

  async verifySleekMenuEmployee () {
    await this.verifyEmployee()
  }

  async disableUserMenu () {
    await this.disableUserMenus()
    await this.verifySleekMenunotvisible()
  }

  async enableAllOptionsForEmployee () {
    await this.checkEmployee()
    await this.checkAllInEmployee()
  }

  async enableAllOptionsForClient () {
    await this.checkClient()
    await this.checkAllInClient()
  }

  async enableAllOptionsForTrainee () {
    await this.checkTrainee()
    await this.checkAllInTrainee()
  }

  async enableAllOptionsForContractor () {
    await this.checkContractor()
    await this.checkAllInContractor()
  }

  async enableAllOptionsForOther () {
    await this.checkOther()
    await this.checkAllInOther()
  }

  async disableAllOptionsForEmployee () {
    await this.checkAllInEmployee()
    await this.checkAllInEmployeeDisabled()
    await this.checkEmployeeDisabled()
  }

  async disableAllOptionsForClient () {
    await this.checkAllInClient()
    await this.checkAllInClientDisabled()
    await this.checkClientDisabled()
  }

  async disableAllOptionsForTrainee () {
    await this.checkAllInTrainee()
    await this.checkAllInTraineeDisabled()
    await this.checkTraineeDisabled()
  }

  async disableAllOptionsForContractor () {
    await this.checkAllInContractor()
    await this.checkAllInContractorDisabled()
    await this.checkContractorDisabled()
  }

  async disableAllOptionsForOther () {
    await this.checkAllInOther()
    await this.checkAllInOtherDisabled()
    await this.checkOtherDiabled()
  }

  async verifyUserTrainingPage () {
    await expect(this.page.locator("//span[normalize-space(text())='My trainings']")).toBeVisible()
  }

  async verifyUserModulesPage () {
    await expect(this.page.locator("//span[normalize-space(text())='My modules']")).toBeVisible()
  }

  async verifyUserPathsPage () {
    await expect(this.page.locator("//span[normalize-space(text())='My paths']")).toBeVisible()
  }

  async verifyUserSurveyPage () {
    await expect(this.page.locator("//span[normalize-space(text())='My surveys']")).toBeVisible()
  }

  async verifyUserSkillPage () {
    await expect(this.page.locator("//span[normalize-space(text())='My skills']")).toBeVisible()
  }

  async verifyUserEvaluationPage () {
    await expect(this.page.locator("//span[normalize-space(text())='My results']")).toBeVisible()
  }

  async verifyUserScorecardsPage () {
    await expect(this.page.locator("//span[normalize-space(text())='My scorecards']")).toBeVisible()
  }

  async verifyUserReviewsPage () {
    await expect(this.page.locator("//span[normalize-space(text())='My reviews']")).toBeVisible()
  }

  async verifyUserCertificatesPage () {
    await expect(this.page.locator("//span[normalize-space(text())='My certificates']")).toBeVisible()
  }

  async verifyUserBattlesPage () {
    await expect(this.page.locator("//span[normalize-space(text())='My battles']")).toBeVisible()
  }

  async checkEmployee () {
    try {
      await this.page.click("//label[contains(text(),'Employee')]")
      await expect(this.page.locator("//section[@id='employee-bloc']")).toBeVisible()
    } catch (error) {
      await this.page.click("//label[contains(text(),'Employee')]")
      await expect(this.page.locator("//section[@id='employee-bloc']")).toBeVisible()
    }
  }

  async checkEmployeeDisabled () {
    await this.page.click("//label[contains(text(),'Employee')]")
    await expect(this.page.locator("//section[@id='employee-bloc'][@style='display: none;']")).toBeTruthy()
  }

  async checkClient () {
    try {
      await this.page.click("//label[contains(text(),'Client')]")
      await expect(this.page.locator("//section[@id='client-bloc']")).toBeVisible()
    } catch (error) {
      await this.page.click("//label[contains(text(),'Client')]")
      await expect(this.page.locator("//section[@id='client-bloc']")).toBeVisible()
    }
  }

  async checkClientDisabled () {
    await this.page.click("//label[contains(text(),'Client')]")
    await expect(this.page.locator("//section[@id='client-bloc'][@style='display: none;']")).toBeTruthy()
  }

  async checkTrainee () {
    try {
      await this.page.click("//label[contains(text(),'Trainee')]")
      await expect(this.page.locator("//section[@id='participant-bloc']")).toBeVisible()
    } catch (error) {
      await this.page.click("//label[contains(text(),'Trainee')]")
      await expect(this.page.locator("//section[@id='participant-bloc']")).toBeVisible()
    }
  }

  async checkTraineeDisabled () {
    await this.page.click("//label[contains(text(),'Trainee')]")
    await expect(this.page.locator("//section[@id='participant-bloc'][@style='display: none;']")).toBeTruthy()
  }

  async checkContractor () {
    try {
      await this.page.click("//label[contains(text(),'Contractor')]")
      await expect(this.page.locator("//section[@id='contractor-bloc']")).toBeVisible()
    } catch (error) {
      await this.page.click("//label[contains(text(),'Contractor')]")
      await expect(this.page.locator("//section[@id='contractor-bloc']")).toBeVisible()
    }
  }

  async checkContractorDisabled () {
    await this.page.click("//label[contains(text(),'Contractor')]")
    await expect(this.page.locator("//section[@id='contractor-bloc'][@style='display: none;']")).toBeTruthy()
  }

  async checkOther () {
    try {
      await this.page.click("//label[contains(text(),'Other')]")
      await expect(this.page.locator("//section[@id='other-bloc']")).toBeVisible()
    } catch (error) {
      await this.page.click("//label[contains(text(),'Other')]")
      await expect(this.page.locator("//section[@id='other-bloc']")).toBeVisible()
    }
  }

  async checkOtherDiabled () {
    await this.page.click("//label[contains(text(),'Other')]")
    await expect(this.page.locator("//section[@id='other-bloc'][@style='display: none;']")).toBeTruthy()
  }

  async checkAllInEmployee () {
    await this.page.click("//input[@id='employee_user_dashboard_show_all']/following-sibling::label//span[contains(@class,'unchecked')]")
  }

  async checkAllInEmployeeDisabled () {
    await this.page.click("//input[@id='employee_user_dashboard_show_all']/following-sibling::label//span[contains(@class,'square-o checked')]")
  }

  async checkAllInClient () {
    await this.page.click("//input[@id='client_user_dashboard_show_all']/following-sibling::label//span[contains(@class,'unchecked')]")
  }

  async checkAllInClientDisabled () {
    await this.page.click("//input[@id='client_user_dashboard_show_all']/following-sibling::label//span[contains(@class,'square-o checked')]")
  }

  async checkAllInTrainee () {
    await this.page.click("//input[@id='trainee_user_dashboard_show_all']/following-sibling::label//span[contains(@class,'unchecked')]")
  }

  async checkAllInTraineeDisabled () {
    await this.page.click("//input[@id='trainee_user_dashboard_show_all']/following-sibling::label//span[contains(@class,'square-o checked')]")
  }

  async checkAllInContractor () {
    await this.page.click("//input[@id='contractor_user_dashboard_show_all']/following-sibling::label//span[contains(@class,'unchecked')]")
  }

  async checkAllInContractorDisabled () {
    await this.page.click("//input[@id='contractor_user_dashboard_show_all']/following-sibling::label//span[contains(@class,'square-o checked')]")
  }

  async checkAllInOther () {
    await this.page.click("//input[@id='other_user_dashboard_show_all']/following-sibling::label//span[contains(@class,'unchecked')]")
  }

  async checkAllInOtherDisabled () {
    await this.page.click("//input[@id='other_user_dashboard_show_all']/following-sibling::label//span[contains(@class,'square-o checked')]")
  }

  async clickEditEnterprise () {
    await this.page.click("//span[@class='fa fa-pencil']")
  }

  async enterEnterpriseName (name) {
    await this.page.locator("//input[@id='enterprise-name-input']").clear()
    await this.page.locator("//input[@id='enterprise-name-input']").pressSequentially(name.enterprise_name + process.env.uniqueId)
  }

  async enterWebsite (website) {
    await this.page.locator("//input[@id='website-input']").clear()
    await this.page.locator("//input[@id='website-input']").pressSequentially(website.website)
  }

  async enterSector (sector) {
    await this.page.click("//div[@class='xq-select xq-select-sector']")
    await this.page.click("//div[@id='sector-selector']//ul//li[@title='" + sector.sector + "']")
  }

  async selectSize (size) {
    await this.page.click("//div[@class='xq-select xq-select-companySize']")
    await this.page.click("//div[@title='" + size.size + "']")
  }

  async verifyEnterpriseNameInOverview (name) {
    await expect(this.page.locator("//label[normalize-space()='Enterprise']/following-sibling::div[normalize-space()='" + name.enterprise_name + process.env.uniqueId + "']")).toBeVisible()
  }

  async verifyWebsiteInOverview (website) {
    await expect(this.page.locator("//label[normalize-space(text())='WebSite']/following-sibling::div[normalize-space()='" + website.website + "']")).toBeVisible()
  }

  async verifySectorInOverview (sector) {
    await expect(this.page.locator("//label[normalize-space()='Sector']/following-sibling::div[normalize-space()='" + sector.sector + "']")).toBeVisible()
  }

  async verifySizeInOverview (size) {
    await expect(this.page.locator("//label[normalize-space()='Size']/following-sibling::div[normalize-space()='" + size.size + "']")).toBeVisible()
  }

  async verifyEnterpriseNameInHeader (name) {
    await expect(this.page.locator("//*[@class='enterprise-name']//*[text()='" + name.enterprise_name + process.env.uniqueId + "']")).toBeVisible()
  }

  async verifyEnterpriseNameByUser (enterpriseData) {
    await this.verifyEnterpriseNameInHeader(enterpriseData)
  }
}
