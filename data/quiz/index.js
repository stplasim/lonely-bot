module.exports = {
  getRandomQuestion(type) {
    switch (type.toLowerCase()) {
      case 'it':
        const question = require('./it_question');
        return question[Math.floor(Math.random() * question.length)];

      default:
        return null;
    }
  },
  getQuizList() {
    return [
      {
        name: "The super duper IT abbreviations quiz",
        id: "it"
      }
    ]
  }
}
