const { expect } = require('@playwright/test')
const { DashboardPage } = require('./dashboardPage')
const dayjs = require('dayjs')
exports.TrainingPage = class TrainingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
  }

  async clickNewTraining () {
    await expect(this.page.locator("//button[@title='New training']")).toBeVisible()
    await this.page.click("//button[@title='New training']")
    await expect(this.page.locator("//div[@id='training-edit-page']")).toBeVisible()
  }

  async enterTrainingName (trainingName) {
    if (trainingName.training_name !== '') {
      await this.page.locator("//input[@id='training_name']").clear()
      await this.page.fill("//input[@id='training_name']", trainingName.training_name + ' ' + process.env.uniqueId)
    }
  }

  async enterStartDate () {
    const currentDate = dayjs().format('DD/MM/YYYY')
    await this.page.locator('#start_date').clear()
    await this.page.fill('#start_date', currentDate)
  }

  async enterEndDate () {
    const closeDate = (dayjs().add(1, 'day')).format('DD/MM/YYYY')
    await this.page.locator('#end_date').clear()
    await this.page.fill('#end_date', closeDate)
  }

  async selectTrainer (adminUser) {
    await this.clickTrainerNameField()
    await this.clickTrainerName(adminUser)
  }

  async selectTrainerAsUser (User) {
    await this.clickTrainerNameField()
    await this.clickUserTrainerName(User)
  }

  async clickTrainerNameField () {
    await expect(this.page.locator('#trainer_name')).toBeVisible()
    await this.page.click('#trainer_name')
  }

  async clickTrainerName (email) {
    await this.page.click("//span[@class='username'][contains(text(),'" + email.last_name.toUpperCase() + ' ' + email.first_name[0].toUpperCase() + email.first_name.slice(1) + "')]")
  }

  async clickUserTrainerName (user) {
    await this.page.click("//span[@class='username'][contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]")
  }

  async enterLocation (location) {
    if (location.location !== '') {
      await this.page.locator('#location').clear()
      await this.page.fill('#location', location.location)
    }
  }

  async clickSave () {
    await this.page.click("//button[contains(@class,'btn btn-primary')]")
  }

  async verifyTrainingBaseIsArchived (base, training) {
    await expect(this.page.locator("//a[contains(.,'" + training.training_name + ' ' + process.env.uniqueId + "')]//span[@class='fa fa-archive archived-icon']")).toBeVisible()
  }

  async clickTopicFolderFilter () {
    await this.dashboard.waiting()
    await this.page.click("(//div[@class='xq-select-content']//span[@class='fa fa-caret-down'])[1]")
  }

  async clickTrainingStatusFilter () {
    await this.dashboard.waiting()
    await this.page.click("(//div[@class='xq-select-content']//span[@class='fa fa-caret-down'])[3]")
  }

  async clickPeriodFilter () {
    await this.dashboard.waiting()
    await this.page.click("//div[@class='xq-select-period']//span[@class='fa fa-caret-down']")
  }

  async clickPageFilter () {
    await this.dashboard.waiting()
    await this.page.click("//div[@id='filter-by-pages']//span[@class='fa fa-caret-down']")
  }

  async selectAllBase () {
    await this.page.click("//ul//li[@title='All bases']")
  }

  async selectAllTraining () {
    await this.page.click("//ul//li[@title='All trainings']")
  }

  async selectAllPeriods () {
    await this.page.click("//ul//li[@title='All periods']")
  }

  async select400PerPage () {
    await this.page.click("//ul//li[@title='400 per page']")
  }

  async selectBase (base) {
    await this.page.click("//li[@class='xq-option']//span[normalize-space(text())='" + base.base_name + ' ' + process.env.uniqueId + "']")
  }

  async verifyTrainingExist (base, training) {
    await expect(this.page.locator("//div[@title='" + base.base_name + ' ' + process.env.uniqueId + "']/following::a[@title='" + training.training_name + ' ' + process.env.uniqueId + "']")).toBeVisible()
  }

  async openTraining (base, training) {
    await this.page.click("//div[@title='" + base.base_name + ' ' + process.env.uniqueId + "']/following::a[contains(.,'" + training.training_name + ' ' + process.env.uniqueId + "')]")
    await expect(this.page.locator("//div[@class='details-panel training-details']")).toBeVisible()
  }

  async openDuplicateTraining (base, training) {
    await this.page.click("//div[@title='" + base.base_name + ' ' + process.env.uniqueId + "']/following::a[contains(.,'" + training.training_name + ' ' + process.env.uniqueId + " (copy)')]")
    await expect(this.page.locator("//div[@class='details-panel training-details']")).toBeVisible()
  }

  async clickQuestionnaires () {
    await this.page.click("(//a[contains(@href,'/questionnaires')][contains(@href,'/trainings')])[1]")
  }

  async clickSeeAsAdmin () {
    if (await this.page.locator("//a[contains(@href,'/trainings/switch?')][text()='See as admin']").isVisible()) {
      await this.page.click("//a[contains(@href,'/trainings/switch?')][text()='See as admin']")
      await this.dashboard.waiting()
      if (!await this.page.locator("//a[contains(@href,'/trainings/switch?')][normalize-space()='see as trainer']").isVisible()) {
        if (!await this.page.locator("//a[contains(@href,'/trainings/switch?')][normalize-space()='See as trainer']").isVisible()) {
          await this.page.click("//a[contains(@href,'/trainings/switch?')][text()='See as admin']")
        }
      }
    }
  }

  async ClickSeeAsTrainer () {
    await this.dashboard.waiting()
    if (await this.page.locator("//a[contains(@href,'/trainings/switch?')][normalize-space()='see as trainer']").isVisible()) {
      try {
        await this.page.click("//a[contains(@href,'/trainings/switch?')][normalize-space()='see as trainer']", { force: true })
        await expect(this.page.locator("//a[contains(@href,'/trainings/switch?')][text()='See as admin']")).toBeVisible()
      } catch (error) {
        await this.page.reload({ waitUntil: 'load' })
        await this.page.click("//a[contains(@href,'/trainings/switch?')][normalize-space()='see as trainer']", { force: true })
        await expect(this.page.locator("//a[contains(@href,'/trainings/switch?')][text()='See as admin']")).toBeVisible()
      }
    } else {
      if (await this.page.locator("//a[contains(@href,'/trainings/switch?')][normalize-space()='See as trainer']").isVisible()) {
        try {
          await this.page.click("//a[contains(@href,'/trainings/switch?')][normalize-space()='See as trainer']", { force: true })
          await expect(this.page.locator("//a[contains(@href,'/trainings/switch?')][text()='See as admin']")).toBeVisible()
        } catch (error) {
          await this.page.reload({ waitUntil: 'load' })
          await this.page.click("//a[contains(@href,'/trainings/switch?')][normalize-space()='See as trainer']", { force: true })
          await expect(this.page.locator("//a[contains(@href,'/trainings/switch?')][text()='See as admin']")).toBeVisible()
        }
      }
    }
  }

  async selectQuestionnaire (trainingData) {
    for (const questionnaires of trainingData) {
      if (questionnaires.usage === 'free') {
        await this.page.locator("//div[contains(text(),'" + questionnaires.questionnaire_name + ' ' + process.env.uniqueId + "')]").dragTo(this.page.locator("//*[@id='items-set-3']"))
      }
      if (questionnaires.usage === 'evaluation') {
        await this.page.locator("//div[contains(text(),'" + questionnaires.questionnaire_name + ' ' + process.env.uniqueId + "')]").dragTo(this.page.locator("//*[@id='items-set-2']"))
      }
      await expect(this.page.locator("//div[contains(@class,'xq-flashes')]//ul//li")).toBeVisible()
      await this.page.locator("//div[contains(@class,'xq-flashes')]//ul//li").waitFor({ state: 'hidden' })
      await expect(this.page.locator("//div[contains(@id,'items-set')]//div[contains(text(),'" + questionnaires.questionnaire_name + ' ' + process.env.uniqueId + "')]")).toBeVisible()
    }
  }

  async verifyQuestionnairesAdded (trainingData) {
    for (const questionnaires of trainingData) {
      if (questionnaires.usage === 'free') {
        await expect(this.page.locator("//div[@id='items-set-3']//div[contains(text(),'" + questionnaires.questionnaire_name + ' ' + process.env.uniqueId + "')]")).toBeVisible()
      }
    }
  }

  async clickMedias () {
    await this.page.click("//a[contains(@href,'/trainings')][normalize-space()='Medias']")
  }

  async selectMedia (trainingData) {
    for (const media of trainingData.items) {
      if (media.usage === 'available') {
        await this.page.locator("(//div[@class='caption'][contains(.,'" + media.name + "')])[1]").dragTo(this.page.locator("//*[@id='items-set-3']"))
        await expect(this.page.locator("//div[@id='items-set-3']//div[contains(text(),'" + media.name + "')]")).toBeVisible()
      } else {
        if (media.usage === 'selected') {
          await this.page.locator("(//div[@class='caption'][contains(.,'" + media.name + "')])[1]").dragTo(this.page.locator("//*[@id='items-set-2']"))
          await expect(this.page.locator("//div[@id='items-set-2']//div[contains(text(),'" + media.name + "')]")).toBeVisible()
        }
      }
      await expect(this.page.locator("//div[contains(@class,'xq-flashes')]//ul//li")).toBeVisible()
      await this.page.locator("//div[contains(@class,'xq-flashes')]//ul//li").waitFor({ state: 'hidden' })
    }
  }

  async clickInvitations () {
    await this.page.click("//a[normalize-space(text())='Invitations']")
  }

  async selectParticipants (user) {
    await this.clickSelectParticipants()
    if (user.trainer) {
      if (await this.page.locator("//span[@class='username'][contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/parent::div[@class='cell user']/following-sibling::div//a[@class='to-right-btn']").isVisible()) {
        await this.page.click("//span[@class='username'][contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/parent::div[@class='cell user']/following-sibling::div//a[@class='to-right-btn']")
      }
    } else {
      await this.page.click("//span[@class='username'][contains(text(),'" + user.last_name.toUpperCase() + ' ' + user.first_name[0].toUpperCase() + user.first_name.slice(1) + "')]/parent::div[@class='cell user']/following-sibling::div//a[@class='to-right-btn']")
    }
    await this.page.click("//a[contains(@class,'save')]")
  }

  async clickSelectParticipants () {
    await this.page.click('#select-employees-btn')
  }

  async clickSendInvitationButton () {
    await this.page.click('#invitations-send-btn')
  }

  async navigateToParticipantTab () {
    await this.page.click("//a[normalize-space(text())='Participants']")
    await this.page.waitForLoadState('load')
  }

  async dragToPresentUserOnTraining () {
    await expect(this.page.locator("(//div[@class='caption'])[1]")).toBeVisible()
    await this.page.click("//i[@class='fa fa-arrow-circle-o-right']")
  }

  async clickDuplicateTraining (trainingName) {
    await this.page.click("//a[contains(.,'" + trainingName.training_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//ul/li[@title='Duplicate']")
    await expect(this.page.locator("//ul//li[normalize-space(text())='Your training session has been successfully duplicated']")).toBeVisible()
    await this.page.locator("//ul//li[normalize-space(text())='Your training session has been successfully duplicated']").waitFor({ state: 'hidden' })
  }

  async clickDeleteTraining (trainingName) {
    await this.page.click("//a[contains(.,'" + trainingName.training_name + ' ' + process.env.uniqueId + "')]/following-sibling::div//ul/li[@title='Delete']")
  }

  async confirmDeleteTraining () {
    await this.page.click("//button[@class='xq-button danger']")
    await expect(this.page.locator("//ul//li[normalize-space(text())='Deletion of 1 training(s)']")).toBeVisible()
    await this.page.locator("//ul//li[normalize-space(text())='Deletion of 1 training(s)']").waitFor({ state: 'hidden' })
  }

  async verifyTrainingNotExist (base, training) {
    await expect(this.page.locator("//div[@title='" + base.base_name + ' ' + process.env.uniqueId + "']/following::a[contains(.,'" + training.training_name + ' ' + process.env.uniqueId + "')]")).toHaveCount(0)
  }

  async openInviteByUser (training) {
    await this.page.click("//div[@class='new-play-card-wrapper']//div[contains(text(),'" + training.training_name + ' ' + process.env.uniqueId + "')]")
  }

  async clickTrainingOldViewButton () {
    if (await this.page.locator("//section[@class='bloc classic-training-view'][@style='display: none;']").isVisible()) {
      await this.page.click("//input[@id='switch_view']/following-sibling::label//span[@class='checked']")
    }
  }

  async confirmTrainingByUser () {
    if (await this.page.locator("//a[contains(@href,'/confirm')]").isVisible()) {
      await this.page.click("//a[contains(@href,'/confirm')]")
    }
  }

  async verifyViewMedia (media) {
    const media1 = "//*[@id='documents-bloc']//div/a[contains(text(),'" + media.name + "')]/parent::div/following-sibling::div//a[@title='View']"
    if (media1) {
      await expect(this.page.locator("//*[@id='documents-bloc']//div/a[contains(text(),'" + media.name + "')]/parent::div/following-sibling::div//a[@title='View']")).toBeVisible()
    }
  }

  async viewByType (element) {
    if (element.type === 'embed') {
      await expect(this.page.locator("//*[@id='documents-bloc']//div/a[contains(text(),'" + element.name + "')]/parent::div/following-sibling::div//a[@title='Play']")).toBeVisible()
    }
    if (element.type === 'factsheet') {
      await this.page.click("//*[@id='documents-bloc']//div/a[contains(text(),'" + element.name + "')]/parent::div/following-sibling::div//a[@title='View']")
      await this.page.click("(//a[text()='Close'])[2]")
    }
  }

  async clickTrainingQuestionnaireInvitation (questionnaire) {
    for (const questionnairename of questionnaire) {
      if (questionnairename.usage === 'evaluation') {
        await this.page.click("//div[contains(text(),'" + questionnairename.questionnaire_name + ' ' + process.env.uniqueId + "')]/following-sibling::a[@class='fa fa-share play-btn']")
      }
    }
  }

  async submitEvaluation () {
    await this.page.click("//button[@form='questionnaire_submit_form']")
  }

  async verifyFreeResult (questionnaire) {
    await this.page.reload({ waitUntil: 'load' })
    for (const questionnairename of questionnaire) {
      if (questionnairename.usage === 'free') {
        const questionnaire1 = await this.page.locator("//*[@id='played-tests-bloc-2']//div[contains(text(),'" + questionnairename.questionnaire_name + ' ' + process.env.uniqueId + "')]")
        if (questionnaire1) {
          await expect(this.page.locator("(//*[@id='played-tests-bloc-2']//div[contains(text(),'" + questionnairename.questionnaire_name + ' ' + process.env.uniqueId + "')])[1]")).toBeVisible()
        }
      }
    }
  }

  async verifyEvaluationResult (questionnaire) {
    await this.page.reload({ waitUntil: 'load' })
    for (const questionnaireName of questionnaire) {
      if (questionnaireName.usage === 'evaluation') {
        const questionnaire1 = "//*[@id='played-evals-bloc-2']//div[contains(text(),'" + questionnaireName.questionnaire_name + ' ' + process.env.uniqueId + "')]"
        if (questionnaire1) {
          await expect(this.page.locator("//*[@id='played-evals-bloc-2']//div[contains(text(),'" + questionnaireName.questionnaire_name + ' ' + process.env.uniqueId + "')]")).toBeVisible()
        }
      }
    }
  }

  async clickResultsByTrainer () {
    await this.ClickSeeAsTrainer()
    await this.page.click("//a[contains(@href,'/trainings')][contains(@href,'/results')]")
  }

  async clickEdit () {
    await this.page.click("//a[@class='xq-button primary']")
  }

  async verifyDuplicatedTrainingExist (base, training) {
    await expect(this.page.locator("//div[@title='" + base.base_name + ' ' + process.env.uniqueId + "']/following::a[contains(.,'" + training.training_name + ' ' + process.env.uniqueId + " (copy)')]")).toBeVisible()
  }

  async navigateTrainingPage () {
    if (await this.page.locator("//a[contains(@href,'/enterprise/trainings/')][text()='Overview']").isVisible()) {
      await this.page.click("//a[contains(@href,'/trainings/switch?')][text()='See as admin']")
    }
    await expect(this.page.locator("//a[contains(@href,'/admin/trainings/')][text()='Overview']")).toBeVisible()
  }
}
