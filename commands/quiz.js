module.exports = {
  /**
   * Quiz handler
   *
   * @param ctx - Bot context object
   * @returns { Promise<MessagePoll>|Promise<Message> }
   */
  getQuiz(ctx) {
    const type = ctx.message.text.replace('/quiz', '').split(' ');

    // Check for args
    if(type.length === 2) {

      // Require quizzes
      const questions = require('./../data/quiz');

      // Check for the list command
      if(type[1] === 'list') {
        let response =
          "Here you have a list of all the quizzes that are currently available " +
          "and the corresponding ID. To start a quiz use the id with the command */quiz*" +
          "\n\n"
          response += "------------------------\n";

          // Get quiz info and make the output
          const list = questions.getQuizList();
          list.forEach(quiz => {
            response += "ID: *" + quiz.id + "*\n";
            response += "Name: " + quiz.name + "\n";
            response += "------------------------\n";
          });

          response += "\n\n";
          response += "Do you think all quizzes are trash?" +
            " No problem just create your own. " +
            "See my [GitHub](https://github.com/stplasim/lonely-bot) site for instructions and a template.";

        // Send list of quizzes to user
        return ctx.replyWithMarkdown(response);
      }
      else {
        // get quiz data by type
        const questionObj = questions.getRandomQuestion(type[1]);

        // Reply if quiz wasn't found
        if(questionObj === null || questionObj === undefined) {
          return ctx.replyWithMarkdown(
            "I'm sorry but I don't know the quiz you're looking for " +
            "or it's not cool enough for me to know it. \n" +
            "If you need help finding a quiz that suits you best use the command */quiz list*"
          );
        }

        // Send back quiz
        return ctx.replyWithQuiz(questionObj?.question, questionObj?.answer, {
          correct_option_id: questionObj?.correct,
          is_anonymous: false,
          open_period: 60
        });
      }
    }
    // Send help with the quiz command
    else {
      return ctx.replyWithMarkdown(
        "Hey. You don't know what to do with your time? Just start a quiz. " +
        "To start a quiz, enter the command */quiz* followed by the category.\n\n" +
        "Here is an example.\n */quiz it*. \n\n" +

        "To prevent dozens of quizzes from floating around in the group, " +
        "all quizzes have a 60 second life span.\n\n" +

        "If you want to know what quizzes are available, just type the command */quiz list.* \n\n" +

        "Do you think all quizzes are trash?" +
        " No problem just create your own. " +
        "See my [GitHub](https://github.com/stplasim/lonely-bot) site for instructions and a template."
      )
    }
  }
}
