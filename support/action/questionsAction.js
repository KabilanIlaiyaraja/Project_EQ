// @ts-check

const { expect } = require('@playwright/test')
const { BasePage } = require('../page/basePage')
const { DashboardPage } = require('../page/dashboardPage')
const { QuestionsPage } = require('../page/questionsPage')
const { PlayerPage } = require('../page/playerPage')
exports.QuestionAction = class QuestionAction {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor (page) {
    this.page = page
    this.base = new BasePage(this.page)
    this.dashboard = new DashboardPage(this.page)
    this.question = new QuestionsPage(this.page)
    this.play = new PlayerPage(this.page)
  }

  async createQuestionsThroughDuplicateBase (baseName, questionData) {
    await this.dashboard.clickBases()
    await this.base.openDuplicateBase(baseName)
    await this.base.clickQuestionsTab()
    await this.base.clickNewQuestion()
    await this.createQuestionsWithDomain(baseName, questionData)
  }

  async createQuestionsWithFreeTypeThroughBase (baseName, questionData) {
    await this.dashboard.clickBases()
    await this.base.openBase(baseName)
    await this.base.clickQuestionsTab()
    await this.base.clickNewQuestion()
    await this.createQuestionWithFree(questionData)
  }

  async createQuestionsWithoutDomain (questiondata) {
    for (const question of questiondata) {
      await this.clickQuestionType(question.type)
      await this.question.enterQuestionTitle(question.title)
      await this.question.enterQuestion(question.question_text)
      await this.EnterAnswerField(question.type, question.answers)
      await this.question.saveNew()
    }
    await this.question.quit()
  }

  async createQuestionsWithDomain (base, questiondata) {
    for (const question of questiondata) {
      await this.question.selectDomain(base)
      await this.clickQuestionType(question.type)
      await this.question.enterQuestionTitle(question.title)
      await this.question.enterQuestion(question.question_text)
      await this.EnterAnswerField(question.type, question.answers)
      await this.question.saveNew()
    }
    await this.question.quit()
  }

  async createQuestionWithFree (questions) {
    for (const question of questions) {
      await this.clickQuestionType(question.type)
      await this.question.enterQuestionTitle(question.title)
      await this.question.enterQuestion(question.question_text + question.question_syntax)
      if (question.type !== 'free1' || question.type !== 'free2' || question.type !== 'free3') {
        await this.EnterAnswerField(question.type, question.answers)
      }
      if (question.type === 'softsingle' || question.type === 'softmultiple') {
        await this.question.softSkillTag(question.answers)
      }
      if (question.type === 'free3') {
        await this.question.clickMoreSettings()
        await this.question.freeWithAttachment()
      }
      if (question.type === 'free2') {
        await this.question.clickMoreSettings()
        await this.question.freeWithRecord()
      }
      await this.question.saveNew()
    }
    await this.question.quit()
  }

  async clickQuestionType (questionType) {
    switch (questionType) {
      case 'single':
        await this.question.clickSingleCorrect()
        break
      case 'multi':
        await this.question.clickMultiCorrect()
        break
      case 'true_or_false':
        await this.question.clickTrueOrFalse()
        break
      case 'enteredAnswer':
        await this.question.clickEnteredAnswer()
        break
      case 'sort_list':
        await this.question.clickSortList()
        break
      case 'matchItems':
        await this.question.clickMatch()
        break
      case 'fill':
        await this.question.clickFill()
        break
      case 'classify':
        await this.question.clickClassification()
        break
      case 'softsingle':
        await this.question.clickSoftskillsSingle()
        break
      case 'softmultiple':
        await this.question.clickSoftskillsMultiple()
        break
      case 'image_area':
        await this.question.clickImageArea()
        break
      case 'Select':
        await this.question.clickSelectQuestionType()
        break
      case 'free1':
        await this.question.clickFree()
        break
      case 'free2':
        await this.question.clickFree()
        break
      case 'free3':
        await this.question.clickFree()
        break
      case 'free':
        await this.question.clickFree()
        break
      default:
        break
    }
  }

  async EnterAnswerField (questionType, answerData) {
    if (questionType === 'single') {
      await this.question.singleAnswers(answerData)
    }
    if (questionType === 'multi') {
      await this.question.multiAnswers(answerData)
    }
    if (questionType === 'enteredAnswer') {
      await this.question.enteredAnswer(answerData)
    }
    if (questionType === 'sort_list') {
      await this.question.sortListAnswer(answerData)
    }
    if (questionType === 'matchItems') {
      await this.question.matchItemAnswer(answerData)
    }
    if (questionType === 'fill') {
      await this.question.enterAnswer()
    }
    if (questionType === 'classify') {
      await this.question.classificationAnswer(answerData)
    }
    if (questionType === 'softsingle') {
      await this.question.softskillsSingleAnswer(answerData)
      await this.question.softSkillTag(answerData)
    }
    if (questionType === 'softmultiple') {
      await this.question.softskillsMultipleAnswer(answerData)
      await this.question.softSkillTag(answerData)
    }
    if (questionType === 'Select') {
      await this.question.enterTheSelectAnswer(answerData)
    }
  }

  async deleteAllQuestions (base) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.question.clickTopicFilter()
    await this.question.selectTopic(base)
    await this.question.selectAllQuestions()
    await this.deleteQuestions()
  }

  async deleteQuestions () {
    await this.question.clickDeleteButton()
    await this.question.clickConfirmDelete()
  }

  async verifyDeletedQuestions (base, questions) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.question.verifyQuestionsNotExist(base, questions)
  }

  async duplicateQuestions (base, questions) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.question.clickTopicFilter()
    await this.question.selectTopic(base)
    await this.question.duplicateQuestions(questions)
  }

  async verifyDuplicatedQuestions (base, questions) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.question.clickTopicFilter()
    await this.question.selectTopic(base)
    await this.question.checkDuplicatedQuestions(questions)
  }

  async moveQuestionsToAnotherBase (base1, base2) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.question.clickTopicFilter()
    await this.question.selectTopic(base1)
    await this.question.selectAllQuestions()
    await this.question.clickCopyToBaseButton()
    await this.copyToBase(base2)
  }

  async copyToBase (base) {
    await this.question.clickCopyBaseFilter()
    await this.question.selectTopicOnPopup(base)
    await this.question.clickSaveCopyBase()
  }

  async verifyMovedQuestions (base, questions) {
    await this.dashboard.clickBases()
    await this.base.openBase(base)
    await this.base.clickQuestionsTab()
    await this.question.verifyQuestionsExist(questions)
  }

  async verifyArchivedQuestions (base, questions) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.question.verifyQuestionsNotExist(base, questions)
  }

  async uploadQuestionsAndVerify (base) {
    await this.dashboard.clickBases()
    await this.base.openBase(base)
    await this.base.clickImportAndExportsTab()
    await this.question.uploadQuestion(base)
    await this.page.reload({ waitUntil: 'load' })
    await this.question.verifyQuestionsImported(base)
  }

  async verifyUploadedQuestions (base) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.question.clickTopicFilter()
    await this.question.selectTopic(base)
    await this.dashboard.waiting()
    await this.question.verifyQuestionsListExist()
  }

  async editQuestionWithSameRank (base, questions) {
    await this.dashboard.clickBases()
    await this.base.openBase(base)
    await this.base.clickQuestionsTab()
    await this.question.clickEditQuestion(questions[0])
    await this.question.hoverRank()
    await this.question.changeRank()
    await this.question.clickSave()
    await this.question.rankErrorMessage()
    await this.question.quit()
  }

  async editQuestionsThroughBase (base, questions) {
    await this.dashboard.clickBases()
    await this.base.openBase(base)
    await this.base.clickQuestionsTab()
    await this.editQuestion(questions)
    await this.dashboard.clickDashboard()
  }

  async editQuestion (questions) {
    for (const question of questions) {
      await this.question.clickEditQuestionButton(question)
      if (question.type === 'single') {
        await this.clickQuestionType(question.edit_type)
        await this.question.enterQuestionTitle(question.edit_title)
        await this.question.enterQuestion(question.edit_question + question.question_syntax)
        await this.EnterAnswerField(question.edit_type, question.edit_answers)
        if (question.edit_type === 'softsingle' || question.edit_type === 'softmultiple') {
          await this.question.editSoftSkillTag(question.edit_answers)
        }
        await this.question.clickSave()
        await expect(await this.page.locator("//li[contains(text(),'Question successfully updated')]")).toBeVisible()
        await this.page.locator("//li[contains(text(),'Question successfully updated')]").waitFor({ state: 'hidden' })
      }
    }
  }

  async createQuestionStep (base, baseStatus) {
    await this.dashboard.clickBases()
    switch (baseStatus) {
      case ('active'):
        await this.base.openBase(base)
        break
      case ('archived'):
        await this.base.clickStatusFilter()
        await this.base.selectArchivedStatus()
        await this.base.openArchivebase(base)
        break
      default:
        console.log(baseStatus + 'Base status not defined')
        break
    }
    await this.base.clickQuestionsTab()
    await this.base.clickNewQuestion()
  }

  async setQuestionsPageFilters () {
    await this.question.clickTopicFilter()
    await this.question.selectAllTopic()
    await this.question.clickStatusFilter()
    await this.question.clickAnyStatus()
  }

  async verifyEditedQuestion (base, questions) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.question.clickTopicFilter()
    await this.question.selectTopic(base)
    await this.question.checkEditedQuestions(questions)
  }

  async createQuestionWithoutTitle (base, baseStatus, questions) {
    await this.createQuestionStep(base, baseStatus)
    for (const question of questions) {
      await this.clickQuestionType(question.type)
      await this.question.enterQuestion(question.question_text)
      await this.EnterAnswerField(question.type, question.answers)
      await this.question.clickSave()
      await this.question.titleErrorMessage()
    }
    await this.question.quit()
  }

  async createQuestionWithoutQuestionField (base, baseStatus, questions) {
    await this.createQuestionStep(base, baseStatus)
    for (const question of questions) {
      await this.clickQuestionType(question.type)
      await this.question.enterQuestionTitle(question.title)
      if (question.type !== 'fill') {
        await this.EnterAnswerField(question.type, question.answers)
        await this.question.clickSave()
        await this.question.questionErrorMessage()
      }
    }
    await this.question.quit()
  }

  async createQuestionWithoutAnswer (base, baseStatus, questions) {
    await this.createQuestionStep(base, baseStatus)
    for (const question of questions) {
      await this.clickQuestionType(question.type)
      await this.question.enterQuestionTitle(question.title)
      await this.question.enterQuestion(question.question_text)
      if (question.type === 'true_or_false') {
        await this.question.makeAnswerFieldEmpty()
      }
      await this.question.clickSave()
      if (question.type === 'fill') {
        await this.question.enterTypeAnswerErrorMessage()
      } else {
        if (question.type !== 'free_form_answer') {
          await this.question.answerErrorMessage()
        }
      }
    }
    await this.question.quit()
  }

  async createQuestionsWithRulesAndExplanation (base, baseStatus, questionData) {
    await this.createQuestionStep(base, baseStatus)
    for (const questions of questionData) {
      await this.clickQuestionType(questions.type)
      await this.question.enterQuestionTitle(questions.title)
      await this.question.enterQuestion(questions.question_text)
      await this.EnterAnswerField(questions.type, questions.answers)
      await this.question.clickMoreSettings()
      await this.question.enterExplanation(questions)
      await this.question.enterRule(questions)
      await this.question.saveNew()
    }
    await this.question.quit()
  }

  async createSoftSkillsQuestionWithoutDomain (base, baseStatus, questionData) {
    await this.createQuestionStep(base, baseStatus)
    for (const questions of questionData) {
      await this.clickQuestionType(questions.type)
      await this.question.enterQuestionTitle(questions.title)
      await this.question.enterQuestion(questions.question_text)
      await this.EnterAnswerField(questions.type, questions.answers)
      await this.question.softSkillTag(questions.answers)
      await this.question.saveNew()
    }
    await this.question.quit()
  }

  async verifyProposedStatus (base, questions) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.changeStatusAsProposed(base, questions)
    await this.page.reload({ waitUntil: 'load' })
    await this.dashboard.clickQuestions()
    await this.question.clickStatusFilter()
    await this.question.selectProposedStatus()
    await this.question.verifyQuestionsExist(questions)
  }

  async changeStatusAsProposed (base, questions) {
    for (const questionData of questions) {
      await this.question.clickTopicFilter()
      await this.question.selectTopic(base)
      await this.question.clickEditQuestionButton(questionData)
      await this.question.clickStatusFilterOnQuestionPage()
      await this.question.selectProposedOption()
      await this.question.clickSave()
      await expect(await this.page.locator("//li[contains(text(),'Question successfully updated')]")).toBeVisible()
      await this.page.locator("//li[contains(text(),'Question successfully updated')]").waitFor({ state: 'hidden' })
    }
  }

  async verifyReviewedStatus (base, questions) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.changeStatusAsReviewed(base, questions)
    await this.page.reload({ waitUntil: 'load' })
    await this.dashboard.clickQuestions()
    await this.question.clickStatusFilter()
    await this.question.selectReviewedStatus()
    await this.question.verifyQuestionsExist(questions)
  }

  async changeStatusAsReviewed (base, questions) {
    for (const questionData of questions) {
      await this.question.clickTopicFilter()
      await this.question.selectTopic(base)
      await this.question.clickEditQuestionButton(questionData)
      await this.question.clickStatusFilterOnQuestionPage()
      await this.question.selectReviewOption()
      await this.question.clickSave()
      await expect(await this.page.locator("//li[contains(text(),'Question successfully updated')]")).toBeVisible()
      await this.page.locator("//li[contains(text(),'Question successfully updated')]").waitFor({ state: 'hidden' })
    }
  }

  async verifyDraftStatus (base, questions) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.changeStatusAsDraft(base, questions)
    await this.page.reload({ waitUntil: 'load' })
    await this.dashboard.clickQuestions()
    await this.question.clickStatusFilter()
    await this.question.selectDraftStatus()
    await this.question.verifyQuestionsExist(questions)
  }

  async changeStatusAsDraft (base, questions) {
    for (const questionData of questions) {
      await this.question.clickTopicFilter()
      await this.question.selectTopic(base)
      await this.question.clickEditQuestionButton(questionData)
      await this.question.clickStatusFilterOnQuestionPage()
      await this.question.selectDraftOption()
      await this.question.clickSave()
      await expect(await this.page.locator("//li[contains(text(),'Question successfully updated')]")).toBeVisible()
      await this.page.locator("//li[contains(text(),'Question successfully updated')]").waitFor({ state: 'hidden' })
    }
  }

  async verifyInactiveStatus (base, questions) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.changeStatusToActive(base, questions)
    await this.changeStatusAsInactive(base, questions)
    await this.page.reload({ waitUntil: 'load' })
    await this.dashboard.clickQuestions()
    await this.question.clickStatusFilter()
    await this.question.selectInactiveStatus()
    await this.question.verifyQuestionsExist(questions)
  }

  async changeStatusAsInactive (base, questions) {
    for (const questionData of questions) {
      await this.question.clickTopicFilter()
      await this.question.selectTopic(base)
      await this.question.clickEditQuestionButton(questionData)
      await this.question.clickStatusFilterOnQuestionPage()
      await this.question.selectInactiveOption()
      await this.question.clickSave()
      await expect(await this.page.locator("//li[contains(text(),'Question successfully updated')]")).toBeVisible()
      await this.page.locator("//li[contains(text(),'Question successfully updated')]").waitFor({ state: 'hidden' })
    }
  }

  async verifyActiveStatus (base, questions) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.changeStatusToActive(base, questions)
    await this.page.reload({ waitUntil: 'load' })
    await this.dashboard.clickQuestions()
    await this.question.clickStatusFilter()
    await this.question.selectActiveStatus()
    await this.question.verifyQuestionsExist(questions)
  }

  async changeStatusToActive (base, questions) {
    for (const questionData of questions) {
      await this.question.clickTopicFilter()
      await this.question.selectTopic(base)
      await this.question.clickEditQuestionButton(questionData)
      await this.question.clickStatusFilterOnQuestionPage()
      await this.question.selectActiveOption()
      await this.question.clickSave()
      await expect(this.page.locator("//li[contains(text(),'Question successfully updated')]")).toBeVisible()
      await this.page.locator("//li[contains(text(),'Question successfully updated')]").waitFor({ state: 'hidden' })
    }
  }

  async verifyTopicFilter (base1, base2, questions) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.question.clickTopicFilter()
    await this.question.selectTopic(base1)
    await this.dashboard.waiting()
    await this.question.verifyQuestionsExist(questions)
    await this.page.waitForLoadState('load')
    await this.question.clickTopicFilter()
    await this.question.selectTopic(base2)
    await this.dashboard.waiting()
    await this.question.verifyQuestionsExist(questions)
  }

  async playSoftSkillQuestion (base, questionData) {
    await this.dashboard.clickBases()
    await this.base.openBase(base)
    await this.base.clickQuestionsTab()
    await this.question.clickPlayQuestion(questionData)
    await this.question.selectAnswerForSoftskillQuestion(questionData[0])
    await this.play.clickValidate()
    await this.play.clickExit()
  }

  async playClassificationQuestion (base, questionData) {
    await this.dashboard.clickBases()
    await this.base.openBase(base)
    await this.base.clickQuestionsTab()
    await this.question.clickPlayQuestion(questionData)
    await this.question.answerClassificationQuestions(questionData)
    await this.play.clickValidate()
    await this.play.clickExit()
  }

  async createProposeQuestionsByContributor (base, questions) {
    await this.dashboard.clickMyQuestions()
    await this.question.clickTopicFilterOnMyQuestions()
    await this.question.selectBaseOnTopicFilter(base)
    await this.question.clickNewQuestionButtonOnMyQuestions()
    await this.createQuestionAsProposedStatusByUser(questions)
    await this.dashboard.userLogOut()
  }

  async createQuestionAsProposedStatusByUser (questions) {
    for (const question of questions) {
      await this.clickQuestionTypeByContributer(question.type)
      await this.question.enterTitleByUser(question.title)
      await this.question.enterQuestionByUser(question.question_text)
      await this.answerFieldUser(question.type, question.answers)
      await this.question.clickStatusFilterOnQuestionPageByUser()
      await this.question.selectProposedOptionByUser()
      await this.question.saveNewButtonUser()
    }
    await this.question.clickQuitButtonByUser()
  }

  async clickQuestionTypeByContributer (questionType) {
    if (questionType === 'single') {
      await this.question.clickSingleCorrectByUser()
    }
  }

  async answerFieldUser (questionType, answerData) {
    if (questionType === 'single') {
      await this.question.singleAnswersByUser(answerData)
    }
  }

  async activeQuestionsByAdmin (base, questions) {
    await this.dashboard.clickQuestions()
    await this.setQuestionsPageFilters()
    await this.changeStatusToActive(base, questions)
  }

  async verifyQuestionsOptionsByPermittedUser (base, questions) {
    await this.dashboard.clickQuestions()
    await this.question.clickTopicFilter()
    await this.question.selectTopic(base)
    await this.question.clickNewQuestion()
    await this.createQuestionsWithDomain(base, questions)
    await this.dashboard.clickQuestions()
    await this.page.reload({ waitUntil: 'load' })
    await this.question.selectAllQuestions()
    await this.deleteQuestions()
    await this.page.reload({ waitUntil: 'load' })
    await this.question.clickNewQuestion()
    await this.createQuestionsWithDomain(base, questions)
    await this.dashboard.logOut()
  }
}
