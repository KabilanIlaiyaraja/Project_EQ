const { expect } = require('@playwright/test')
const { DashboardPage } = require('./dashboardPage')
exports.PlayerPage = class PlayerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
    this.dashboard = new DashboardPage(this.page)
  }

  async emailandsmslog (commondata, emails) {
    const subj = commondata.mail_subjects.invite_user_subject
    const eyeButton = " //div[normalize-space()='" + emails.user_name + process.env.uniqueId + emails.domain + "']/following-sibling::div[contains(.,'" + subj + "')]/following-sibling::button//span[@class='fa fa-eye icon']"
    try {
      await expect(this.page.locator(eyeButton)).toBeVisible()
      await this.page.click(eyeButton)
    } catch (error) {
      await this.page.reload({ waitUntil: 'load' })
      await expect(this.page.locator(eyeButton)).toBeVisible()
      await this.page.click(eyeButton)
    }
    await this.clickActiveUserStartButton()
  }

  async clickActiveUserStartButton () {
    const ele = await this.page.frameLocator('iframe').locator("//a['@href'][normalize-space(text())='click on this link']")
    const regLink = await ele.getAttribute('href')
    await this.page.click("//button[@class='xq-button secondary']//span[normalize-space(text())='quit']")
    await this.page.goto(regLink + '')
  }

  async emailandsmslogPlayquestionnairewithskill (emails, commonData) {
    const subj = commonData.mail_subjects.mail_subject + ' ' + process.env.uniqueId
    const eyeButton = " //div[normalize-space()='" + emails.user_name + emails.domain + "']/following-sibling::div[contains(.,'" + subj + "')]/following-sibling::button//span[@class='fa fa-eye icon']"
    try {
      await expect(this.page.locator(eyeButton)).toBeVisible()
      await this.page.click(eyeButton)
    } catch (error) {
      await this.page.reload({ waitUntil: 'load' })
      await expect(this.page.locator(eyeButton)).toBeVisible()
      await this.page.click(eyeButton)
    }
    await this.clickContactUserStartButton()
  }

  async clickSingleAnswer (firstAnswer) {
    await this.page.click("//ul[@class='xq-player-answers']//div[contains(text(),'" + firstAnswer[0].answer_text + "')]")
    try {
      await expect(this.page.locator("//li[@class='answer-card selected']")).toBeVisible()
    } catch (error) {
      await this.page.click("//ul[@class='xq-player-answers']//div[contains(text(),'" + firstAnswer[0].answer_text + "')]")
    }
  }

  async clickFirstMultiCorrectAnswer (secondAnswer) {
    await this.page.click("//*[contains(text(),'" + (secondAnswer[1].answer_text) + "')]")
  }

  async clickFirstMultiCorrectAnswers (thirdAnswer) {
    await this.page.click("//*[contains(text(),'" + (thirdAnswer[2].answer_text) + "')]")
  }

  async clickTrueOrFalseAnswer (trueOrFalseAnswer) {
    await this.page.click("//*[contains(text(),'" + (trueOrFalseAnswer[0].answer_text) + "')]")
  }

  async clickAnswerEnteredAnswer (enteredEnswer) {
    await this.page.fill("//input[contains(@type,'text')]", (enteredEnswer))
  }

  async sortAnswer (answer) {
    const sortableElement = await this.page.locator("//div[@class='player-answers']")
    const value = await sortableElement.innerText()
    for (const data of answer) {
      console.log('for loop', data)
      if (value === answer[0].answerText + ' ' + answer[1].answerText + ' ' + answer[2].answerText) {
        console.log('enters into if')
      } else {
        console.log('enters into else')
        const answerText1 = answer[0].answerText
        const answerText2 = answer[1].answerText
        const answerText3 = answer[2].answerText
        await this.page.locator("//div[@class='xq-player-answer']//div[normalize-space(text())='" + answerText1 + "']").dragTo(this.page.locator("(//div[@class='xq-player-answer'])[1]"))
        await this.page.locator("//div[@class='xq-player-answer']//div[normalize-space(text())='" + answerText2 + "']").dragTo(this.page.locator("(//div[@class='xq-player-answer'])[2]"))
        await this.page.locator("//div[@class='xq-player-answer']//div[normalize-space(text())='" + answerText3 + "']").dragTo(this.page.locator("(//div[@class='xq-player-answer'])[3]"))
      }
    }
  }

  async clickMatchAnswer (matchAnswer) {
    const answer1 = matchAnswer
    const question = []
    const answer = []
    const questionElements = await this.page.$$("//div[contains(@class,'left no-hover')]")
    for (const val of questionElements) {
      question.push(await val.textContent())
    }
    const answerElements = await this.page.$$("//div[contains(@class,'right xq-draggable')]")
    for (const val1 of answerElements) {
      answer.push(await val1.textContent())
    }

    if (question[0] === answer1[0].case) {
      console.log('it enters into 1st if condition')
    }
    if (answer[0] === answer1[0].match_text) {
      console.log('it enters into 2nd if condition')
      console.log("It's already in the correct order")
    } else {
      await this.page.locator("(//div[contains(@class,'right xq-draggable')]//div[normalize-space(text())='" + answer1[0].match_text + "']//preceding::i[@class='fa fa-arrows'])[2]").dragTo(this.page.locator("(//div[normalize-space(text())='" + answer1[1].match_text + "']/../../../../../..//div[contains(@class,'right xq-draggable')]//preceding::i[@class='fa fa-arrows'])[1]"))
    }
  }

  async clickEnterAnswer (enterAnswer) {
    await this.page.fill("//input[@class='value-input fill-input xq-answer-text']", (enterAnswer.answer))
  }

  async classifyAnswer (answerData) {
    await this.page.locator("//div[@class='left']//div[normalize-space(text())='" + answerData[0].label.title() + "']").dragTo(this.page.locator("//div[@class='right']//div[normalize-space(text())='" + answerData[0].label.title() + "']"))
    await this.page.locator("//div[@class='left']//div[normalize-space(text())='" + answerData[1].label.title() + "']").dragTo(this.page.locator("//div[@class='right']//div[normalize-space(text())='" + answerData[1].label.title() + "']"))
    await this.page.locator("//div[@class='left']//div[normalize-space(text())='" + answerData[2].label.title() + "']").dragTo(this.page.locator("//div[@class='right']//div[normalize-space(text())='" + answerData[2].label.title() + "']"))
  }

  async answerTheSelectTypeQuestion (answerData) {
    await this.page.click("//p//span[contains(@class,'ui-selectmenu-button')]")
    await this.page.click("//ul[@role='listbox']//div[text()='" + answerData[0].correct_answer + "']")
  }

  async selectAnswerForSoftsingleQuestion (answer) {
    await this.page.click("//*[contains(text(),'" + (answer[0].answer_text) + "')]")
  }

  async selectAnswerForMultiplesoftQuestion () {
    await this.page.click("//div[@class='answer answer-multi-choice active']")
    await this.page.click("//div[@class='answer answer-multi-choice active']")
    await this.page.click("//div[@class='answer answer-multi-choice active']")
  }

  async freeWithText (answer) {
    await expect(this.page.locator("//div[@class='answer-card']//textarea")).toBeVisible()
    await this.page.locator("//div[@class='answer-card']//textarea").click()
    await this.page.fill("//div[@class='answer-card']//textarea", answer)
  }

  async freeWithAudio () {
    await this.page.click("//div[contains(@class,'record-button')][@title='Record']")
    await this.page.waitForTimeout(3000)
    if (await this.page.locator("//div[contains(@class,'record-button')][@title='Stop']").isVisible()) {
      await this.page.click("//div[contains(@class,'record-button')][@title='Stop']")
    }
  }

  async freeWithAttachment (fileName) {
    await expect(this.page.locator("//div[@title='Attach File']")).toBeVisible()
    const mediaDirectory = process.cwd() + '/media/' + fileName
    await this.page.setInputFiles('input[type="file"]', mediaDirectory)
  }

  async clickValidate () {
    await expect(this.page.locator("//div[@class='xq-btn xq-btn-primary']//span[text()='Validate']")).toBeVisible()
    await this.page.click("//div[@class='xq-btn xq-btn-primary']//span[text()='Validate']")
  }

  async clickNext () {
    await expect(this.page.locator("//a[@title='Next Question']")).toBeVisible()
    await this.page.click("//a[@title='Next Question']")
  }

  async clickExit () {
    await expect(this.page.locator("//a[@title='View scores']")).toBeVisible()
    await this.page.click("//a[@title='View scores']")
    await this.page.waitForLoadState('load')
  }

  async clickActiveUserPreviewButton (commondata, emails) {
    const subj = commondata.mail_subjects.create_account_subject
    const eyeButton = "//div[normalize-space()='" + emails.user_name + process.env.uniqueId + emails.domain + "']/following-sibling::div[contains(.,'" + subj + "')]/following-sibling::button//span[@class='fa fa-eye icon']"
    try {
      await expect(this.page.locator(eyeButton)).toBeVisible()
      await this.page.click(eyeButton)
    } catch (error) {
      await this.page.reload({ waitUntil: 'load' })
      await expect(this.page.locator(eyeButton)).toBeVisible()
      await this.page.click(eyeButton)
    }
  }

  async clickActiveUserPreviewButtonResetPassword (commondata, emails) {
    const subj = commondata.mail_subjects.reset_password_subject
    const eyeButton = "//div[normalize-space()='" + emails.user_name + process.env.uniqueId + emails.domain + "']/following-sibling::div[contains(.,'" + subj + "')]/following-sibling::button//span[@class='fa fa-eye icon']"
    try {
      await expect(this.page.locator(eyeButton)).toBeVisible()
      await this.page.click(eyeButton)
    } catch (error) {
      await this.page.reload({ waitUntil: 'load' })
      await expect(this.page.locator(eyeButton)).toBeVisible()
      await this.page.click(eyeButton)
    }
  }

  async contactUserBackToHome () {
    await this.page.click("//div[@class='xq-btn xq-btn-primary']")
  }

  async clickContactUserStartButton () {
    const ele = await this.page.frameLocator('iframe').locator("//a['@href'][normalize-space(text())='START']")
    const regLink = await ele.getAttribute('href')
    await this.page.click("//button[@class='xq-button secondary']//span[normalize-space(text())='quit']")
    await this.dashboard.logOut()
    await this.page.goto(regLink + '')
  }

  async verifyModuleAttendenceCertificateByEmail (commondata, user) {
    const subj = commondata.mail_subjects.module_certificate_subject
    const to = user.user_name + user.domain
    await this.clickViewPreviewMessage(to, subj)
    await expect(this.page.locator("//p[text()='In order to use this certificate, ']//a[text()=' click the link']")).toBeTruthy()
    await this.clickQuitButton()
  }

  async clickViewPreviewMessage (to, sub) {
    await this.page.click("(//div[normalize-space()='" + to + "']/following-sibling::div[contains(.,'" + sub + "')]/following-sibling::button//span[@class='fa fa-eye icon'])[1]")
  }

  async clickQuitButton () {
    await this.page.click("//button[@class='xq-button secondary']//span[normalize-space(text())='quit']")
  }

  async verifyQuestionnaireActionArePassed (questionnaire) {
    const questionnairename = questionnaire.replace('replaceme', process.env.uniqueId)
    await expect(this.page.locator("(//div[normalize-space(text()='" + questionnairename + "')]//a[contains(@href,'/ev/')])[1]")).toBeVisible()
  }

  async verifyModuleActionArePassed (module) {
    const modulename = module.replace('replaceme', process.env.uniqueId)
    await expect(this.page.locator("//a[contains(@href,'/user/module/')]//*[@title='" + modulename + "']")).toBeVisible()
  }

  async verifyQuestionnaireNotDisplayed (questionnaire) {
    if (await this.page.locator("//div[@id='user-dashboard-page']//div[normalize-space(text())='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']").isVisible()) {
      await this.page.reload({ waitUntil: 'load' })
    }
    await expect(this.page.locator("//div[@id='user-dashboard-page']//div[normalize-space(text())='" + questionnaire.questionnaire_name + ' ' + process.env.uniqueId + "']")).not.toBeVisible()
  }

  async verifyConsequenceMessageAtEndOfTheTest (users, message) {
    await expect(this.page.locator("//p[contains(text(),'" + message.message_verification + ' ' + users.first_name[0].toUpperCase() + users.first_name.slice(1) + ' ' + users.last_name[0].toUpperCase() + users.last_name.slice(1) + "!')]")).toBeVisible()
  }

  async verifyExplanation (explanation) {
    await expect(this.page.locator("//div[@class='debrief-content']/p[contains(text(),'" + explanation + "')]")).toBeVisible()
  }

  async verifyRule (rule) {
    await expect(this.page.locator("//div[@class='rule-content']/p[contains(text(),'" + rule + "')]")).toBeVisible()
  }

  async clickSaveAndScore () {
    await this.page.click("//div[@title='Save and score']")
  }

  async clickSaveAndScorePopup () {
    await this.page.waitForSelector("//div[@id='xq-modal-content']")
    await this.page.click("//div[@id='xq-modal-content']//div[@title='Save and score']")
  }

  async clickSingleAnswerSinglePage (firstAnswer, index) {
    await this.page.click("(//ul[@class='xq-player-answers']//div[contains(text(),'" + (firstAnswer[0].answer_text) + "')])[" + index + ']')
    try {
      await expect(this.page.locator("(//li[@class='answer-card selected'])[" + index + ']')).toBeVisible()
    } catch (error) {
      await this.page.click("(//ul[@class='xq-player-answers']//div[contains(text(),'" + (firstAnswer[0].answer_text) + "')])[" + index + ']')
    }
  }

  async backToQuestionnaire () {
    await expect(this.page.locator("//div[@class='xq-btn-toolbar']//div[@class='xq-btn xq-btn-primary']")).toBeVisible({ timeout: 50000 })
    await this.page.click("//div[@class='xq-btn-toolbar']//div[@class='xq-btn xq-btn-primary']")
  }

  async backToDashboard () {
    await expect(this.page.locator("//div[@class='xq-btn-toolbar']//div[@class='xq-btn xq-btn-primary']")).toBeVisible({ timeout: 50000 })
    await this.page.click("//div[@class='xq-btn-toolbar']//div[@class='xq-btn xq-btn-primary']")
  }
}
