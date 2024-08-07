const { expect } = require('@playwright/test')

exports.QuestionsPage = class QuestionsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor (page) {
    this.page = page
  }

  async clickSingleCorrect () {
    await this.page.click('.icon.fa.fa-dot-circle-o')
  }

  async clickSingleCorrectUser () {
    await this.page.click("//li[@data-value='mcq']")
  }

  async clickMultiCorrect () {
    await this.page.click('.icon.fa.fa-check-square-o')
  }

  async clickTrueOrFalse () {
    await this.page.click('.icon.fa.fa-adjust')
  }

  async clickEnteredAnswer () {
    await this.page.click('.icon.fa.fa-pencil-square')
  }

  async clickSortList () {
    await this.page.click('.icon.fa.fa-sort')
  }

  async clickMatch () {
    await this.page.click('.icon.fa.fa-exchange')
  }

  async clickFill () {
    await this.page.click('.icon.fa.fa-ellipsis-h')
  }

  async clickClassification () {
    await this.page.click('.icon.fa.fa-sitemap')
  }

  async clickSoftskillsSingle () {
    await this.page.click('.icon.fa.fa-heart-o')
  }

  async clickSoftskillsMultiple () {
    await this.page.click('.icon.fa.fa-heart')
  }

  async clickImageArea () {
    await this.page.click('.icon.fa.fa-picture-o')
  }

  async clickFree () {
    await this.page.click('.icon.fa.fa-envira')
  }

  async clickSelectQuestionType () {
    await this.page.click('.icon.fa.fa-list')
  }

  async enterQuestionTitle (questionTitle) {
    await this.page.locator("//input[@input-id='question-title']").clear()
    await this.page.fill("//input[@input-id='question-title']", questionTitle + ' ' + process.env.uniqueId)
  }

  async enterQuestion (questionName) {
    await this.page.locator("//div[@input-id='question-text']//textarea").clear()
    await this.page.fill("//div[@input-id='question-text']//textarea", questionName)
  }

  async singleAnswers (answer) {
    await this.singleAnswer1(answer)
    await this.singleAnswer2(answer)
    await this.singleAnswer3(answer)
  }

  async multiAnswers (answer) {
    await this.multipleAnswer1(answer)
    await this.multipleAnswer2(answer)
    await this.multipleAnswer3(answer)
    await this.clickTickmarkForSecondCorrectAnswer()
    await this.clickTickmarkForThirdCorrectAnswer()
    await this.disableTickmarkForFirstAnswerField()
  }

  async classificationAnswer (answer) {
    await this.classificationAnswer1(answer)
    await this.classificationAnswer2(answer)
    await this.classificationAnswer3(answer)
  }

  async softskillsSingleAnswer (answer) {
    await this.softskillsSingleAnswer1(answer)
    await this.softskillsSingleAnswer2(answer)
    await this.softskillsSingleAnswer3(answer)
  }

  async softskillsMultipleAnswer (answer) {
    await this.softskillsMultipleAnswer1(answer)
    await this.softskillsMultipleAnswer2(answer)
    await this.softskillsMultipleAnswer3(answer)
  }

  async enteredAnswer (enteredAnswer) {
    await this.page.locator("//div[@class='xq-cke-wrapper']//textarea[@class='xq-textarea']").clear()
    await this.page.fill("//div[@class='xq-cke-wrapper']//textarea[@class='xq-textarea']", enteredAnswer)
  }

  async sortListAnswer (sortAnswer) {
    await this.page.locator("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", sortAnswer[0].answer_text)
    await this.page.locator("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", sortAnswer[1].answer_text)
    await this.page.locator("//div[normalize-space(text())='Answer #3']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #3']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", sortAnswer[2].answer_text)
  }

  async matchItemAnswer (matchItem) {
    await this.page.locator("//div[normalize-space(text())='Item #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Item #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", matchItem[0].case)
    await this.page.locator("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", matchItem[0].match_text)
    await this.page.locator("//div[normalize-space(text())='Item #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Item #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", matchItem[1].case)
    await this.page.locator("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", matchItem[1].match_text)
  }

  async singleAnswer1 (firstAnswer) {
    await this.page.locator("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", firstAnswer[0].answer_text)
  }

  async singleAnswer2 (secondAnswer) {
    await this.page.locator("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", secondAnswer[1].answer_text)
  }

  async singleAnswer3 (thirdAnswer) {
    await this.page.locator("//div[normalize-space(text())='Answer #3']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #3']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", thirdAnswer[2].answer_text)
  }

  async multipleAnswer1 (firstAnswer) {
    await this.page.locator("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", firstAnswer[0].answer_text)
  }

  async multipleAnswer2 (secondAnswer) {
    await this.page.locator("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", secondAnswer[1].answer_text)
  }

  async multipleAnswer3 (thirdAnswer) {
    await this.page.locator("//div[normalize-space(text())='Answer #3']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #3']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", thirdAnswer[2].answer_text)
  }

  async classificationAnswer1 (answer1) {
    await this.page.locator("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", answer1[0].bucket + answer1[0].syntax + answer1[0].label)
  }

  async classificationAnswer2 (answer2) {
    await this.page.locator("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", answer2[1].bucket + answer2[1].syntax + answer2[1].label)
  }

  async classificationAnswer3 (answer3) {
    await this.page.locator("//div[normalize-space(text())='Answer #3']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #3']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", answer3[2].bucket + answer3[2].syntax + answer3[2].label)
  }

  async clickTickmarkForSecondCorrectAnswer () {
    await this.page.click("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//div[@class='glyph-answer false']")
  }

  async clickTickmarkForThirdCorrectAnswer () {
    await this.page.click("//div[normalize-space(text())='Answer #3']/../parent::div/following-sibling::div//div[@class='glyph-answer false']")
  }

  async disableTickmarkForFirstAnswerField () {
    await this.page.click("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//div[@class='glyph-answer correct']")
  }

  async softskillsSingleAnswer1 (answer1) {
    await this.page.locator("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", answer1[0].answer_text)
  }

  async softskillsSingleAnswer2 (answer2) {
    await this.page.locator("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", answer2[1].answer_text)
  }

  async softskillsSingleAnswer3 (answer3) {
    await this.page.locator("//div[normalize-space(text())='Answer #3']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #3']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", answer3[2].answer_text)
  }

  async softskillsMultipleAnswer1 (firstAnswer) {
    await this.page.locator("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", firstAnswer[0].answer_text)
  }

  async softskillsMultipleAnswer2 (secondAnswer) {
    await this.page.locator("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", secondAnswer[1].answer_text)
  }

  async softskillsMultipleAnswer3 (thirdAnswer) {
    await this.page.locator("//div[normalize-space(text())='Answer #3']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]").clear()
    await this.page.fill("//div[normalize-space(text())='Answer #3']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", thirdAnswer[2].answer_text)
  }

  async enterAnswer () {
    await this.page.locator("//div[@class='xq-ckeditor-wrapper']//textarea").clear()
    await this.page.locator("//div[@class='xq-ckeditor-wrapper']//textarea").fill('Java development kit').then(async () => {
      await this.page.keyboard.press('Enter')
    })
  }

  async softSkillTag (answerData) {
    let index = 1
    for (const taganswer of answerData) {
      await this.page.locator("(//div[@class='input-tags-content'])[" + index + ']').click()
      await this.page.locator("(//input[@placeholder='Enter tags...'])[" + index + ']').fill(taganswer.tag_answer)
      index++
    }
  }

  async enterTheSelectAnswer (answerData) {
    const answer = answerData[0].syntax + answerData[0].correct_answer + answerData[0].second_option + answerData[0].third_option
    await this.page.locator("//div[@class='xq-ckeditor-wrapper']//textarea").clear()
    await this.page.fill("//div[@class='xq-ckeditor-wrapper']//textarea", answer)
  }

  async saveNew () {
    await this.page.click("//button[@class='xq-button primary']//span[normalize-space(text())='Save & New']")
    await expect(this.page.locator("//li[normalize-space(text())='Question successfully created']")).toBeVisible()
    await this.page.locator("//li[normalize-space(text())='Question successfully created']").waitFor({ state: 'hidden' })
  }

  async quit () {
    await this.page.click("//span[contains(@class,'fa fa-times')]/following-sibling::span[normalize-space(text())='quit']")
  }

  async verifyBaseNotDisplayed (baseName) {
    await expect(this.page.locator("//ul[@class='xq-option-list']//span[normalize-space(text())='" + baseName.base_name + ' ' + process.env.uniqueId + "']")).toHaveCount(0)
  }

  async selectDomain (base) {
    await this.page.click('.xq-select.domain-select.grey')
    await this.page.click("//div[@title='" + base.domains[0] + "']")
  }

  async selectTopic (base) {
    await this.page.click("//span[contains(text(),'" + base.base_name + ' ' + process.env.uniqueId + "')]")
  }

  async selectTopicOnPopup (base) {
    await this.page.click("//div[@class='xq-modal-content']//div[@class='xq-select focused']//li[@title='" + base.base_name + ' ' + process.env.uniqueId + "']")
  }

  async clickMoreSettings () {
    await this.page.click('.fa.fa-angle-right')
  }

  async freeWithAttachment () {
    await this.enableWithAttachment()
    await this.disableTextArea()
  }

  async freeWithRecord () {
    await this.enableWithAttachment()
    await this.enableAttachmentAudio()
    await this.disableTextArea()
  }

  async enableWithAttachment () {
    await this.page.locator("//div[@button-id='answer-with-attachment']//span[@class='xq-yesno-choices']").click()
  }

  async disableTextArea () {
    await this.page.click("//div[@button-id='hide-textarea']//span[@class='xq-yesno-choices']")
  }

  async enableAttachmentAudio () {
    await this.page.click("//div[@button-id='audio-attachment']//span[@class='xq-yesno-choices']")
  }

  async clickTopicFilter () {
    await this.page.click("//div[@id='filter-by-topics']//div[@class='xq-select-content']")
  }

  async selectAllQuestions () {
    await this.page.click("//div[@class='flex-row xq-table-head']//label[@class='checkbox-label checkbox']")
  }

  async clickDeleteButton () {
    await expect(this.page.locator("//button//span[contains(text(),'delete')]")).toBeVisible()
    await this.page.click("//button//span[contains(text(),'delete')]")
  }

  async clickConfirmDelete () {
    await this.page.click("//button[@class='xq-button danger']")
  }

  async selectAllTopic () {
    await this.page.click("//div[@id='filter-by-topics']//li[@title='All bases']")
  }

  async verifyQuestionsNotExist (base, questions) {
    for (const question of questions) {
      await expect(this.page.locator("//div[@title='" + base.base_name + ' ' + process.env.uniqueId + "']/parent::a/following-sibling::div//span[@class='title'][contains(text(),'" + question.title + "')]")).toHaveCount(0)
    }
  }

  async verifyQuestionsExist (questions) {
    for (const question of questions) {
      await expect(this.page.locator("//div[@class='cell title']//span[contains(text(),'" + question.title + ' ' + process.env.uniqueId + "')]")).toBeVisible()
    }
  }

  async duplicateQuestions (questions) {
    for (const question of questions) {
      await this.page.click("//span[normalize-space(text())='" + question.title + ' ' + process.env.uniqueId + "']/ancestor::li//div[@class='xq-table-button-group']//li[@title='Duplicate']")
    }
  }

  async checkDuplicatedQuestions (questions) {
    for (const question of questions) {
      await expect(this.page.locator("//li[contains(@class,'question-table-item')]//span[contains(text(),'" + question.title + ' ' + process.env.uniqueId + " (copy)')]")).toBeVisible()
    }
  }

  async clickCopyToBaseButton () {
    await expect(this.page.locator("//button//span[@class='fa fa-files-o']/following-sibling::span[contains(text(),'copy to base')]")).toBeVisible()
    await this.page.click("//button//span[@class='fa fa-files-o']/following-sibling::span[contains(text(),'copy to base')]")
  }

  async clickCopyBaseFilter () {
    await this.page.click('p .fa')
  }

  async hoverBase (name) {
    await this.page.hover("//ul[@class='xq-option-list']/..//span[normalize-space(text())='" + name.base_name + ' ' + process.env.uniqueId + "']")
  }

  async clickSaveCopyBase () {
    await this.page.click("//button//span[contains(text(),'save')]")
    await expect(this.page.locator("//li[contains(text(),'questions have been duplicated')]")).toBeVisible()
    await this.page.locator("//li[contains(text(),'questions have been duplicated')]").waitFor({ state: 'hidden' })
  }

  async uploadQuestion (fileName) {
    const mediaDirectory = process.cwd() + '/media/' + fileName.question_file_name
    await this.page.setInputFiles("input[type='file']", mediaDirectory)
    await expect(this.page.locator("//li[contains(text(),'Import of questions')]")).toBeVisible()
    await this.page.locator("//li[contains(text(),'Import of questions')]").waitFor({ state: 'hidden' })
  }

  async verifyQuestionsImported (fileName) {
    await expect(this.page.locator("//div[contains(@class,'filename')][normalize-space()='" + fileName.question_file_name + "']")).toBeVisible()
    await this.page.reload({ waitUntil: 'load' })
    try {
      await expect(this.page.locator("//div[contains(@class,'filename')][normalize-space()='" + fileName.question_file_name + "']/following-sibling::div//span[@title='Import finished']")).toBeVisible()
    } catch (error) {
      await this.page.reload({ waitUntil: 'load' })
      await expect(this.page.locator("//div[contains(@class,'filename')][normalize-space()='" + fileName.question_file_name + "']/following-sibling::div//span[@title='Import finished']")).toBeVisible()
    }
  }

  async clickEditQuestion (questionTitle) {
    await this.page.click("//span[normalize-space(text())='" + questionTitle.title + ' ' + process.env.uniqueId + "']/ancestor::li//div[@class='xq-table-button-group']//li[@title='Edit']")
  }

  async hoverRank () {
    await this.page.hover("//div[@class='xq-input-number']")
  }

  async changeRank () {
    await this.page.click("//span[@class='fa fa-angle-up icon']")
  }

  async rankErrorMessage () {
    await expect(this.page.locator("//li[normalize-space(text())='This rank is already in use']")).toBeVisible()
  }

  async clickSave () {
    await this.page.click("//span[@class='fa fa-check']/following-sibling::span[normalize-space(text())='Save & Quit']")
  }

  async verifyQuestionsListExist () {
    await expect(this.page.locator("//div[@id='questions-table']")).toBeVisible()
  }

  async clickEditQuestionButton (questionTitle) {
    await this.page.click("//span[normalize-space(text())='" + questionTitle.title + ' ' + process.env.uniqueId + "']/ancestor::li//div[@class='xq-table-button-group']//a[contains(@href,'edit')]")
  }

  async editSoftSkillTag (answerData) {
    let index = 0
    for (const taganswer of answerData) {
      if (await this.page.locator("//span[normalize(text())='" + answerData[0].tag_answer + "']").isVisible) {
        await this.page.locator("(//div[@class='input-tags-content'])[" + index + ']').click()
        await this.page.locator("(//input[@placeholder='Enter tags...'])[" + index + ']').pressSequentially(taganswer.tag_answer)
      }
      index++
    }
  }

  async checkEditedQuestions (questions) {
    for (const question of questions) {
      await expect(this.page.locator("//div[contains(@class,'title')]//span[normalize-space(text()) = '" + question.edit_title + ' ' + process.env.uniqueId + "']")).toBeVisible()
    }
  }

  async titleErrorMessage () {
    await expect(this.page.locator("//li[normalize-space(text())='this field is required']")).toBeVisible()
  }

  async questionErrorMessage () {
    await expect(this.page.locator("//li[normalize-space(text())='this field is required']")).toBeVisible()
  }

  async makeAnswerFieldEmpty () {
    await this.page.fill("//div[normalize-space(text())='Answer #1']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", '')
    await this.page.fill("//div[normalize-space(text())='Answer #2']/../parent::div/following-sibling::div//textarea[contains(@class,'xq-textarea')]", '')
  }

  async answerErrorMessage () {
    await expect(this.page.locator("//div[contains(@class,'first-answer')]//li[normalize-space(text())='An answer text or media is required']")).toBeVisible()
  }

  async enterTypeAnswerErrorMessage () {
    await expect(this.page.locator("//div[contains(@class,'first-answer')]//li[normalize-space(text())='An answer text or media is required']")).toBeVisible()
  }

  async enterRule (rule) {
    await this.page.locator("//label[normalize-space(text())='rule']/following::div//div[contains(@class,'question-rule')]//textarea").clear()
    await this.page.locator("//label[normalize-space(text())='rule']/following::div//div[contains(@class,'question-rule')]//textarea").pressSequentially(rule.rule)
  }

  async enterExplanation (explanation) {
    await this.page.locator("//label[normalize-space(text())='Explain']/following::div//div[contains(@class,'question-explain')]//textarea").clear()
    await this.page.locator("//label[normalize-space(text())='Explain']/following::div//div[contains(@class,'question-explain')]//textarea").pressSequentially(explanation.explanation)
  }

  async clickStatusFilterOnQuestionPage () {
    await this.page.click("//div[@id='std-toolbar']//div[@class='xq-select']")
  }

  async selectProposedOption () {
    await this.page.click("//ul[@class='xq-option-list']//li[@title='Proposed']")
  }

  async clickStatusFilter () {
    await this.page.click("//div[@id='filter-by-status']/div[@class='xq-select-content']")
  }

  async clickAnyStatus () {
    await this.page.click("//div[@title='Any status']")
  }

  async selectProposedStatus () {
    await this.page.click("//div[@title='Proposed']")
  }

  async selectReviewedStatus () {
    await this.page.click("//div[@title='Reviewed']")
  }

  async selectReviewOption () {
    await this.page.click("//ul[@class='xq-option-list']//li[@title='Reviewed']")
  }

  async selectDraftStatus () {
    await this.page.click("//div[@title='Draft']")
  }

  async selectInactiveStatus () {
    await this.page.click("//div[@title='Inactive']")
  }

  async selectDraftOption () {
    await this.page.click("//ul[@class='xq-option-list']//li[@title='Draft']")
  }

  async selectInactiveOption () {
    await this.page.click("//ul[@class='xq-option-list']//li[@title='Inactive']")
  }

  async selectActiveOption () {
    await this.page.click("//ul[@class='xq-option-list']//li[@title='Active']")
  }

  async selectActiveStatus () {
    await this.page.click("//div[@title='Active']")
  }

  async clickPlayQuestion (questions1) {
    await this.page.click("//span[contains(text(),'" + questions1[0].title + ' ' + process.env.uniqueId + "')]/ancestor::li//div[@class='xq-table-button-group']//li[@title='Play']")
  }

  async selectAnswerForSoftskillQuestion (answerData) {
    await expect(this.page.locator("//div[@class='xq-player-content']")).toBeVisible({ timeout: 30000 })
    if (answerData.type === 'softsingle') {
      await this.page.click("//li[@class='answer-card'][1]")
    }
    if (answerData.type === 'softmultiple') {
      await this.page.click("//li[@class='answer-card'][1]")
      await this.page.click("//li[@class='answer-card'][2]")
    }
  }

  async answerClassificationQuestions (answerData) {
    await expect(this.page.locator("//div[@class='xq-player-content']")).toBeVisible({ timeout: 30000 })
    for (const answers of answerData) {
      await this.page.locator("//div[@class='card movable']//div[normalize-space(text())='" + answers.answers[0].bucket + "']/../../../..").dragTo(this.page.locator("//div[@class='bucket-wrapper']//div[normalize-space(text())='" + answers.answers[0].label + "']/../../../../div"))
      await this.page.locator("//div[@class='card movable']//div[normalize-space(text())='" + answers.answers[1].bucket + "']/../../../..").dragTo(this.page.locator("//div[@class='bucket-wrapper']//div[normalize-space(text())='" + answers.answers[1].label + "']/../../../../div"))
      await this.page.locator("//div[@class='card movable']//div[normalize-space(text())='" + answers.answers[2].bucket + "']/../../../..").dragTo(this.page.locator("//div[@class='bucket-wrapper']//div[normalize-space(text())='" + answers.answers[2].label + "']/../../../../div"))
    }
  }

  async clickTopicFilterOnMyQuestions () {
    await this.page.click("//div[@class='filter-fields']//span[contains(text(),'All topics')]")
  }

  async selectBaseOnTopicFilter (base) {
    await this.page.click("//ul[@id='topic-filter-menu']//div[contains(text(),'" + base.base_name + ' ' + process.env.uniqueId + "')]")
  }

  async clickNewQuestionButtonOnMyQuestions () {
    await this.page.click('#new-question-btn')
  }

  async clickSingleCorrectByUser () {
    await this.page.click("//li[@data-value='mcq']")
  }

  async singleAnswersByUser (answer) {
    await this.singleAnswer1ByUser(answer)
    await this.singleAnswer2ByUser(answer)
    await this.singleAnswer3ByUser(answer)
  }

  async singleAnswer1ByUser (firstAnswer) {
    await this.page.locator("//textarea[@id='answers-0']").clear()
    await this.page.locator("//textarea[@id='answers-0']").pressSequentially(firstAnswer[0].answer_text)
  }

  async singleAnswer2ByUser (secondAnswer) {
    await this.page.locator("//textarea[@id='answers-1']").clear()
    await this.page.locator("//textarea[@id='answers-1']").pressSequentially(secondAnswer[1].answer_text)
  }

  async singleAnswer3ByUser (thirdAnswer) {
    await this.page.locator("//textarea[@id='answers-2']").clear()
    await this.page.locator("//textarea[@id='answers-2']").pressSequentially(thirdAnswer[2].answer_text)
  }

  async enterTitleByUser (questionTitle) {
    await this.page.locator("//input[@id='title']").clear()
    await this.page.locator("//input[@id='title']").pressSequentially(questionTitle + ' ' + process.env.uniqueId)
  }

  async enterQuestionByUser (questionName) {
    await this.page.locator("//textarea[@id='question_text']").clear()
    await this.page.locator("//textarea[@id='question_text']").pressSequentially(questionName)
  }

  async clickStatusFilterOnQuestionPageByUser () {
    await this.page.click("//span[@id='workflow_status-button']")
  }

  async selectProposedOptionByUser () {
    await this.page.click("//ul//li//div[text()='Proposed']")
  }

  async clickQuitButtonByUser () {
    await this.page.click("//i[contains(@class,'fa fa-times')]/../..//a[@name='back-btn']")
  }

  async saveNewButtonUser () {
    await this.page.click('.fa.fa-retweet')
  }

  async clickNewQuestion () {
    await expect(this.page.locator("//a[contains(@href,'questions/create')]")).toBeVisible()
    await this.page.click("//a[contains(@href,'questions/create')]")
    await expect(await this.page.locator("//div[@class='question-edit']")).toBeVisible()
  }
}
