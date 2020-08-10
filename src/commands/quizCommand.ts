import { Context } from "telegraf";
import {logError, logInfo} from "../util/logger";
import {loadFileFromPath} from "../util/fileIO";

/**
 * Quiz handler
 *
 * @param ctx - Bot context object
 */
export default async function (ctx: Context): Promise<void> {
    try {
        // Get args
        const quizType = ctx.message?.text?.replace('/quiz', '').split(' ');

        // Check for args
        if(quizType == undefined || quizType.length != 2) {
            // Send help with the quiz command
            ctx.replyWithMarkdown(
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
                .then(() => logInfo(`Send quiz help to ${ctx.from?.username}`))
                .catch(err => logError("Something went wrong: ", err));

            return;
        }

        // List quiz
        if(quizType[1] == "list") {
            // Build message
            let response =
                "Here you have a list of all the quizzes that are currently available " +
                "and the corresponding ID. To start a quiz use the id with the command */quiz*" +
                "\n\n"
            response += "------------------------\n";

            // Get list
            const list = await getQuizList();
            list.forEach(quiz => {
                response += "ID: *" + quiz.id + "*\n";
                response += "Description: " + quiz.description + "\n";
                response += "------------------------\n";
            });

            // Add footer
            response += "\n\n";
            response += "Do you think all quizzes are trash?" +
                " No problem just create your own. " +
                "See my [GitHub](https://github.com/stplasim/lonely-bot) site for instructions and a template.";

            // Send list of quizzes to user
            ctx.replyWithMarkdown(response)
                .then(() => logInfo(`Send Quiz list to ${ctx.from?.username}`))
                .catch(err => logError("Something went wrong: ", err));
        }
        else {
            // Get quiz from file
            const quizObj = await getQuizById(quizType[1]);
            if (quizObj.found && quizObj.quiz != null) {
                // Generate random index for quiz
                const randomQuiz = Math.floor(Math.random() * quizObj.quiz.length);

                // Extract quiz infos
                const { correct, answer, question } = quizObj.quiz[randomQuiz];

                // Send quiz to user
                ctx.replyWithQuiz(question, answer, {
                    correct_option_id: correct,
                    is_anonymous: false,
                    // @ts-ignore
                    open_period: 60
                })
                    .then(() => logInfo(`Send Quiz with id "${quizType[1]}" to ${ctx.from?.username}`))
                    .catch(err => logError("Something went wrong: ", err));
            }
        }
    }
    catch (err) {
        logError("Something went wrong", err);
        await ctx.reply("It looks like something didn't quite go as planned. Just try it again my dude.");
    }
}

// ################################################################################################

// Define quiz list type
interface QuizList {
    id:             string
    description:    string
    file:           string
}

// Load quiz list and return it
async function getQuizList(): Promise<Array<QuizList>> {
    const list = await loadFileFromPath(__dirname, "..", "..", "data", "quiz", "quiz_list.json");

    return JSON.parse(list);
}

// ################################################################################################

// Define quiz type
interface Quiz {
    question:       string
    answer:         Array<string>
    correct:        number
}

// Define return type for getQuizById
type QuizReturn = {
    quiz?:   Array<Quiz> | null
    found:  boolean
}

// Get quiz by id
async function getQuizById(id: string): Promise<QuizReturn> {
    const list = await getQuizList();

    // Search for quiz
    for (let ql of list) {
        if(ql.id.toLowerCase() == id.toLowerCase()) {
            const quizRaw = await loadFileFromPath(__dirname, "..", "..", "data", "quiz", ql.file);
            const quiz = JSON.parse(quizRaw);

            // Return it if found
            return {
                quiz,
                found: true
            };
        }
    }

    // If no quiz is found return empty response
    return {
        quiz: null,
        found: false
    };
}