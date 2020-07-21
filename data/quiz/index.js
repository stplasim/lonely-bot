module.exports = {
  /**
   * Get quiz by id
   *
   * @param type - Id of the quiz
   * @returns null|{question: string, answer: [string, string, string, string], correct: number}
   */
  getRandomQuestion(type) {
    switch (type.toLowerCase()) {
      case 'it':
        const question = require('./it_question');
        return question[Math.floor(Math.random() * question.length)];

      default:
        return null;
    }
  },
  /**
   * Get list of all available quizzes
   *
   * @returns {{name: string, id: string}[]}
   */
  getQuizList() {
    return [
      {
        name: "The super duper IT abbreviations quiz",
        id: "it"
      }
    ]
  }
}
