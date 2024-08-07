/* eslint-disable eqeqeq */
// @ts-check
const { expect } = require('@playwright/test')

const { PlayerPage } = require('../page/playerPage')
const { DashboardPage } = require('../page/dashboardPage')
const { QuestionnairePage } = require('../page/questionnairePage')
const { QuestionsPage } = require('../page/questionsPage')
const { FormAction } = require('../action/formAction')
const { CyclePage } = require('../page/cyclePage')
const { EvaluationPage } = require('../page/evaluationPage')
const { BasePage } = require('../page/basePage')

exports.PlayerAction = class PlayerAction {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor (page) {
    this.page = page
    this.playPage = new PlayerPage(this.page)
    this.dashboardPage = new DashboardPage(this.page)
    this.questionnairePage = new QuestionnairePage(this.page)
    this.formAction = new FormAction(this.page)
    this.base = new BasePage(this.page)
  }

  async clickActiveUserPreviewBtn (commonData, emails) {
    await this.playPage.clickActiveUserPreviewButton(commonData, emails)
  }

  async playQuestionnaire (baseName, baseStatus, questionnaireName, answerData) {
    await this.dashboardPage.clickBases()
    switch (baseStatus) {
      case ('active'):
        await this.base.openBase(baseName)
        break
      case ('archived'):
        await this.base.clickStatusFilter()
        await this.base.selectArchivedStatus()
        await this.base.openArchivebase(baseName)
        break
      default:
        console.log(baseStatus + 'Base status not defined')
        break
    }
    await this.base.clickQuestionnaireTab()
    await this.questionnairePage.openQuestionnaire(questionnaireName)
    await this.questionnairePage.clickPlayLink(questionnaireName)
    await this.answerForQuestionnaire(answerData)
    await this.playPage.backToQuestionnaire()
  }

  async playAvailableQuestionnaire (questionnaireData, questions) {
    await this.dashboardPage.clickPlayAvailableQuestionnaire(questionnaireData)
    await this.answerForQuestionnaire(questions)
    await this.playPage.backToDashboard()
    await this.dashboardPage.userLogOut()
  }

  async playFreeQuestionnaire (questionnaireData, questions) {
    await this.dashboardPage.clickPlayAvailableQuestionnaire(questionnaireData)
    await this.answerForQuestionnaire(questions)
    await this.playPage.backToDashboard()
  }

  async playInvitedQuestionnaire (questionnaireData, questions) {
    await this.dashboardPage.clickPlayInvitedQuestionnaire(questionnaireData)
    await this.answerForQuestionnaire(questions)
    await this.playPage.backToDashboard()
    await this.dashboardPage.userLogOut()
  }

  async playQuestionnaireFromDuplicateBase (baseName, questionnaireName, answerData) {
    await this.dashboardPage.clickBases()
    await this.base.openDuplicateBase(baseName)
    await this.base.clickQuestionnaireTab()
    await this.questionnairePage.openQuestionnaire(questionnaireName)
    await this.questionnairePage.clickPlayLink(questionnaireName)
    await this.answerForQuestionnaire(answerData)
    await this.playPage.backToQuestionnaire()
  }

  async playCycleTestWithQuesAndFormByActiveUser (questionnaire, questionData, form) {
    this.formAction = new FormAction(this.page)
    this.cyclePage = new CyclePage(this.page)
    await this.cyclePage.waitFortheCycleinvitation(questionnaire)
    await this.dashboardPage.clickQuestionnaireInvitationOnUserDashboardPage(questionnaire)
    await this.answerForQuestionnaire(questionData)
    await this.playPage.backToQuestionnaire()
    await this.dashboardPage.clickDashboard()
    await this.dashboardPage.clickFormInvitationOnUserDashboardPage(form)
    await this.formAction.fillForm(form)
    await this.dashboardPage.userLogOut()
  }

  async playInvitedQuestionnaireThroughSkill (inviteData, link, questionData) {
    await this.playPage.emailandsmslogPlayquestionnairewithskill(inviteData, link)
    await this.answerForQuestionnaire(questionData)
    await this.playPage.contactUserBackToHome()
  }

  async answerWithPlayerMessage (questionnaire, questionData) {
    for (let index = 0; index < questionData.length; index++) {
      await this.questionnairePage.verifyPlayerMessage(questionnaire)
      await this.play(index, questionData)
    }
  }

  async answerForTrainingQuestionnaire (questionData) {
    await expect(this.page.locator("//div[@class='xq-player-content']")).toBeVisible({ timeout: 50000 })
    for (let index = 0; index < questionData.length; index++) {
      if (await this.page.locator("//div[@title='Start']").isVisible()) {
        await this.page.locator("//div[@title='Start']").click()
      }
      await this.play(index, questionData)
    }
    await expect(this.page.locator("//div[@id='player-scores']")).toBeVisible()
    await this.page.locator("//div[@class='xq-btn xq-btn-primary']").click()
  }

  async answerForQuestionnaire (questionData) {
    await expect(this.page.locator("//div[@class='xq-player-content']")).toBeVisible({ timeout: 50000 })
    for (let index = 0; index < questionData.length; index++) {
      if (await this.page.locator("//div[@title='Start']").isVisible()) {
        await this.page.locator("//div[@title='Start']").click()
      }
      await this.play(index, questionData)
    }
  }

  async play (index, questionData) {
    await expect(this.page.locator("//div[@class='question slider pristine']")).toBeVisible()
    const questionType = await this.page.locator("//div[@class='xq-enriched-html xq-question-text']").innerText()
    const qtype = questionType.split('-', 1)
    const questionText = await this.page.locator("//div[@class='xq-enriched-html xq-question-text']").innerText()
    if (questionText !== '') {
      const answers = await this.typeQuestion(qtype, questionText, questionData)
      await this.selectAnswers(qtype, answers)
    } else {
      const questionType1 = await this.page.getAttribute("//section[@class='xq-player-question']", 'data-answer-type')
      const questionText1 = await this.page.locator("//div[@class='xq-enriched-html xq-question-text']").innerText()
      const answers1 = await this.typeQuestion(questionType1, questionText1, questionData)
      await this.selectAnswers(questionType1, answers1)
    }
    if (index < questionData.length - 1) {
      await expect(this.page.locator("//div[@class='debrief-header']")).toBeVisible()
      await this.playPage.clickNext()
    } else {
      await this.playPage.clickExit()
    }
  }

  async typeQuestion (questionType, questionText, questionData) {
    let getType = ''
    if (questionType == 'mcq') {
      getType = 'single'
    }
    if (questionType == 'mchk') {
      getType = 'multi'
    }
    if (questionType == 'bool') {
      getType = 'true_or_false'
    }
    if (questionType == 'text') {
      getType = 'entered_answer'
    }
    if (questionType == 'sort') {
      getType = 'sort_list'
    }
    if (questionType == 'match') {
      getType = 'match_items'
    }
    if (questionType == 'fill') {
      getType = 'fill'
    }
    if (questionType == 'classif') {
      getType = 'classify'
    }
    if (questionType == 'fsel') {
      getType = 'Select'
    }
    if (questionType == 'heart') {
      getType = 'softsingle'
    }
    if (questionType == 'heart_multiple') {
      getType = 'softmultiple'
    }
    if (questionType == 'free') {
      getType = 'free'
    }
    if (questionType == 'free2') {
      getType = 'free2'
    }
    if (questionType == 'free3') {
      getType = 'free3'
    }
    for (const questions of questionData) {
      if (questions.type === getType && questions.question_text === questionText) {
        return questions.answers
      } else {
        if (questions.type === 'fill') {
          const q = questions.question_text
          const q1 = q.replace(' ____', '')
          if (questionText === q1) {
            return questions.answers
          }
        }
      }
    }
  }

  async selectAnswers (questionType, answer) {
    await this.page.waitForTimeout(1000)
    if (questionType == 'mcq') {
      await this.playPage.clickSingleAnswer(answer)
    }
    if (questionType == 'mchk') {
      await this.playPage.clickFirstMultiCorrectAnswer(answer)
      await this.playPage.clickFirstMultiCorrectAnswers(answer)
    }
    if (questionType == 'bool') {
      await this.playPage.clickTrueOrFalseAnswer(answer)
    }
    if (questionType == 'text') {
      await this.playPage.clickAnswerEnteredAnswer(answer)
    }
    if (questionType == 'sort') {
      await this.playPage.sortAnswer(answer)
    }
    if (questionType == 'match') {
      await this.playPage.clickMatchAnswer(answer)
    }
    if (questionType == 'fill') {
      await this.playPage.clickEnterAnswer(answer)
    }
    if (questionType == 'classif') {
      await this.playPage.classifyAnswer(answer)
    }
    if (questionType == 'fsel') {
      await this.playPage.answerTheSelectTypeQuestion(answer)
    }
    if (questionType == 'heart') {
      await this.playPage.selectAnswerForSoftsingleQuestion(answer)
    }
    if (questionType == 'heart_multiple') {
      await this.playPage.selectAnswerForMultiplesoftQuestion()
    }
    if (questionType == 'free') {
      await this.playPage.freeWithText(answer)
    }
    if (questionType == 'free2') {
      await this.playPage.freeWithAudio()
    }
    if (questionType == 'free3') {
      await this.playPage.freeWithAttachment(answer)
    }
    await this.playPage.clickValidate()
  }

  async selectAnswerSinglepage (questionType, answer, index) {
    await this.page.waitForTimeout(1000)
    if (questionType == 'mcq') {
      await this.playPage.clickSingleAnswerSinglePage(answer, index)
    }
  }

  async EmailGetFromEmailandsmslog (emails, commonData, questionData) {
    const subj = commonData.mail_subjects.mail_subject + ' ' + process.env.uniqueId
    const eyeButton = " (//div[normalize-space()='" + emails.user_name + emails.domain + "']/following-sibling::div[contains(.,'" + subj + "')]/following-sibling::button//span[@class='fa fa-eye icon'])[1]"
    try {
      await this.page.locator(eyeButton).isVisible()
    } catch (error) {
      await this.page.reload({ waitUntil: 'load' })
      await this.page.locator(eyeButton).isVisible()
    }
    await this.page.click(eyeButton)
    await this.playPage.clickContactUserStartButton()
    await this.answerForQuestionnaire(questionData)
  }

  async invitePlayWithForm (invite, link, answerData, formData) {
    await this.page.waitForLoadState('load')
    await this.page.reload({ waitUntil: 'load' })
    const subj = link.mail_subjects.mail_subject + ' ' + process.env.uniqueId
    const eyeButton = " (//div[normalize-space()='" + invite.user_name + invite.domain + "']/following-sibling::div[contains(.,'" + subj + "')]/following-sibling::button//span[@class='fa fa-eye icon'])[1]"
    try {
      await this.page.locator(eyeButton).isVisible()
    } catch (error) {
      await this.page.reload({ waitUntil: 'load' })
      await this.page.locator(eyeButton).isVisible()
    }
    await this.page.click(eyeButton)
    await this.playPage.clickContactUserStartButton()
    await this.formAction.fillForm(formData)
    await this.page.waitForTimeout(3000)
    await this.answerForQuestionnaire(answerData)
    await this.playPage.backToQuestionnaire()
  }

  async invitePlayWithoutForm (invite, link, answerData) {
    await this.page.waitForLoadState('load')
    const subj = link.mail_subjects.mail_subject + ' ' + process.env.uniqueId
    const eyeButton = " (//div[normalize-space()='" + invite.user_name + invite.domain + "']/following-sibling::div[contains(.,'" + subj + "')]/following-sibling::button//span[@class='fa fa-eye icon'])[1]"
    try {
      await this.page.locator(eyeButton).isVisible()
    } catch (error) {
      await this.page.reload({ waitUntil: 'load' })
      await this.page.locator(eyeButton).isVisible()
    }
    await this.page.click(eyeButton)
    await this.playPage.clickContactUserStartButton()
    await this.answerForQuestionnaire(answerData)
    await this.playPage.backToQuestionnaire()
  }

  async playQuestionnaireWithFormByUser (questionnaire, answerData, formData) {
    this.evaluationPage = new EvaluationPage(this.page)
    await this.evaluationPage.clickPlayEvaluation(questionnaire)
    await this.formAction.fillForm(formData)
    await this.page.waitForTimeout(3000)
    await this.answerForQuestionnaire(answerData)
    await this.playPage.backToQuestionnaire()
  }

  async playFormByUser (formData) {
    this.evaluationPage = new EvaluationPage(this.page)
    await this.evaluationPage.clickPlayForm(formData)
    await this.formAction.fillForm(formData)
    await this.dashboardPage.userLogOut()
  }

  async playPublicQuestionnaire (link, answerData) {
    await this.page.goto(link)
    await this.answerForQuestionnaire(answerData)
    await this.playPage.backToQuestionnaire()
  }

  async playNoneQuestionnaire (questionnaire) {
    await this.playPage.verifyQuestionnaireNotDisplayed(questionnaire)
    await this.dashboardPage.userLogOut()
  }

  async playQuestionnaireFromMail (emails, commonData, questionData) {
    const subj = commonData.mail_subjects.mail_subject + ' ' + process.env.uniqueId
    const eyeButton = "(//div[normalize-space()='" + emails.user_name + emails.domain + "']/following-sibling::div[contains(.,'" + subj + "')]/following-sibling::button//span[@class='fa fa-eye icon'])[1]"
    try {
      await this.page.locator(eyeButton).isVisible()
    } catch (error) {
      await this.page.reload({ waitUntil: 'load' })
      await this.page.locator(eyeButton).isVisible()
    }
    await this.page.click(eyeButton)
    await this.playPage.clickContactUserStartButton()
    await this.answerForQuestionnaire(questionData)
    await this.playPage.contactUserBackToHome()
  }

  async playQuestionnaireFromMailWithMessage (emails, commonData, questionnaire, questionData) {
    const subj = commonData.mail_subjects.mail_subject + ' ' + process.env.uniqueId
    const eyeButton = "(//div[normalize-space()='" + emails.user_name + emails.domain + "']/following-sibling::div[contains(.,'" + subj + "')]/following-sibling::button//span[@class='fa fa-eye icon'])[1]"
    try {
      await this.page.locator(eyeButton).isVisible()
    } catch (error) {
      await this.page.reload({ waitUntil: 'load' })
      await this.page.locator(eyeButton).isVisible()
    }
    await this.page.click(eyeButton)
    await this.playPage.clickContactUserStartButton()
    await this.questionnairePage.verifyMessageClickStart(questionnaire)
    await this.answerWithPlayerMessage(questionnaire, questionData)
    await this.playPage.contactUserBackToHome()
  }

  async playQuestionnarieWithConsequenceWithMessagesAndAction (users, questionnaire, questionData, message) {
    await this.dashboardPage.clickPlayInvitedQuestionnaire(questionnaire)
    await this.answerForQuestionnaire(questionData)
    await this.playPage.verifyConsequenceMessageAtEndOfTheTest(users, message)
    await this.playPage.contactUserBackToHome()
    await this.dashboardPage.userLogOut()
  }

  async playQuestionnarieWithConsequenceWithMessages (users, questionnaire, questionData, message) {
    await this.dashboardPage.clickPlayInvitedQuestionnaire(questionnaire)
    await this.answerForQuestionnaire(questionData)
    await this.playPage.verifyConsequenceMessageAtEndOfTheTest(users, message)
    await this.playPage.contactUserBackToHome()
    await this.dashboardPage.userLogOut()
  }

  async playClassifyQuestionnaire (base, questionnaireName, answerData) {
    this.questionPage = new QuestionsPage(this.page)
    await this.dashboardPage.clickBases()
    await this.base.openBase(base)
    await this.base.clickQuestionnaireTab()
    await this.questionnairePage.openQuestionnaire(questionnaireName)
    await this.questionnairePage.clickPlayLink(questionnaireName)
    await this.questionPage.answerClassificationQuestions(answerData)
    await this.playPage.clickValidate()
    await this.playPage.clickExit()
    await this.playPage.backToQuestionnaire()
  }

  async playQuestionnaireSinglePage (base, questionnaireName, answerData) {
    await this.dashboardPage.clickBases()
    await this.base.openBase(base)
    await this.base.clickQuestionnaireTab()
    await this.questionnairePage.openQuestionnaire(questionnaireName)
    await this.questionnairePage.clickPlayLink(questionnaireName)
    await this.answerQuestionnaireSinglePage(answerData)
    await this.playPage.backToQuestionnaire()
  }

  async playQuestionnaireSinglePageByUser (questionnaire, answerData) {
    await this.dashboardPage.clickPlayInvitedQuestionnaire(questionnaire)
    await this.answerQuestionnaireSinglePage(answerData)
    await this.playPage.backToDashboard()
    await this.dashboardPage.userLogOut()
  }

  async answerQuestionnaireSinglePage (questionData) {
    // await this.page.waitForLoadState('load')
    await expect(this.page.locator("//div[@class='xq-player-content']")).toBeVisible({ timeout: 50000 })
    for (let index = 1; index <= questionData.length; index++) {
      await this.singlePageAnswer(index, questionData)
    }
  }

  async singlePageAnswer (index, questionData) {
    const questionType = await this.page.locator("(//div[@class='xq-enriched-html xq-question-text'])[" + index + ']').innerText()
    const qtype = questionType.split('-', 1)
    const questionText = await this.page.locator("(//div[@class='xq-enriched-html xq-question-text'])[" + index + ']').innerText()
    if (questionText !== '') {
      const answers = await this.typeQuestion(qtype, questionText, questionData)
      await this.selectAnswerSinglepage(qtype, answers, index)
    } else {
      const questionType1 = await this.page.getAttribute("//section[@class='xq-player-question']", 'data-answer-type')
      const questionText1 = await this.page.locator("(//div[@class='xq-enriched-html xq-question-text'])[" + index + ']').innerText()
      const answers1 = await this.typeQuestion(questionType1, questionText1, questionData)
      await this.selectAnswerSinglepage(questionType1, answers1, index)
    }
    if (index < questionData.length) {
      console.log('Answer for' + qtype)
    } else {
      await this.playPage.clickSaveAndScore()
      await this.playPage.clickSaveAndScorePopup()
    }
  }

  async playQuestionnairewithRulesAndExplanation (base, questionnaireName, answerData) {
    await this.dashboardPage.clickBases()
    await this.base.openBase(base)
    await this.base.clickQuestionnaireTab()
    await this.questionnairePage.openQuestionnaire(questionnaireName)
    await this.questionnairePage.clickPlayLink(questionnaireName)
    await this.answerQuestionnairewithRulesAndExplanation(answerData)
    await this.playPage.backToQuestionnaire()
  }

  async answerQuestionnairewithRulesAndExplanation (questionData) {
    for (let index = 0; index < questionData.length; index++) {
      await this.playWithRuleExplanation(index, questionData)
    }
  }

  async playWithRuleExplanation (index, questionData) {
    await expect(this.page.locator("//section[@class='xq-player-question']")).toBeVisible()
    const questionType = await this.page.locator("//div[@class='xq-enriched-html xq-question-text']").innerText()
    const qtype = questionType.split('-', 1)
    const questionText = await this.page.locator("//div[@class='xq-enriched-html xq-question-text']").innerText()
    if (questionText !== '') {
      const answers = await this.typeQuestion(qtype, questionText, questionData)
      await this.selectAnswers(qtype, answers)
    } else {
      const questionType1 = await this.page.getAttribute("//section[@class='xq-player-question']", 'data-answer-type')
      const questionText1 = await this.page.locator("//div[@class='xq-enriched-html xq-question-text']").innerText()
      const answers1 = await this.typeQuestion(questionType1, questionText1, questionData)
      await this.selectAnswers(questionType1, answers1)
      const rule = await this.explanationRules(questionType, questionText, questionData)
      if (rule[1] !== '') {
        await this.playPage.verifyExplanation(rule[1])
      }
      if (rule[0] !== '') {
        await this.playPage.verifyRule(rule[0])
      }
    }
    if (index < questionData.length - 1) {
      await this.playPage.clickNext()
    } else {
      await this.playPage.clickExit()
    }
  }

  async explanationRules (questiontype, questionText, questionData) {
    let getType = ''
    if (questiontype == 'mcq') {
      getType = 'single'
    }
    if (questiontype == 'mchk') {
      getType = 'multi'
    }
    if (questiontype == 'bool') {
      getType = 'true_or_false'
    }
    if (questiontype == 'text') {
      getType = 'entered_answer'
    }
    if (questiontype == 'sort') {
      getType = 'sort_list'
    }
    if (questiontype == 'match') {
      getType = 'match_items'
    }
    if (questiontype == 'free') {
      getType = 'free_form_answer'
    }
    if (questiontype == 'fill') {
      getType = 'fill'
    }
    if (questiontype == 'classif') {
      getType = 'classify'
    }
    for (const question of questionData) {
      if (question.type === getType && question.question_text === questionText) {
        const ruleData = []
        ruleData.push(question.rule, question.explanation)
        return ruleData
      } else {
        if (question.type === 'fill') {
          const q = question.question_text
          const q1 = q.replace(' ____', '')
          if (questionText === q1) {
            const ruleData = []
            ruleData.push(question.rule, question.explanation)
            return ruleData
          }
        }
      }
    }
  }
}
