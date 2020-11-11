const express = require("express");
const LanguageService = require("./language-service");
const { requireAuth } = require("../middleware/jwt-auth");
const LinkedList = require("../LinkedList");
const e = require("express");

const languageRouter = express.Router();
const wordList = new LinkedList();

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get("db"),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`,
      });

    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get("/", async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get("db"),
      req.language.id
    );

    res.json({
      language: req.language,
      words,
    });
    next();
  } catch (error) {
    next(error);
  }
});
// Grabs the list head to determine the first word on new log in
languageRouter.get("/head", async (req, res, next) => {
  try {
    const word = await LanguageService.getLanguageWords(
      req.app.get("db"),
      req.language.id
    ).first();

    const language = await LanguageService.getUsersLanguage(
      req.app.get("db"),
      req.user.id
    );

    res.json({
      nextWord: word.original,
      totalScore: language.total_score,
      wordCorrectCount: word.correct_count,
      wordIncorrectCount: word.incorrect_count,
    });
    next();
  } catch (error) {
    next(error);
  }
});
// sends a post request to the server to check the guess and change the word order based on its memory value.
languageRouter.post("/guess", async (req, res, next) => {
  try {
    //sets request body and requires it
    const { guess } = req.body;
    if (!guess) {
      return res.status(400).json({
        error: `Missing 'guess' in request body`,
      });
   }
   //grabs list of words for the specific user
    const words = await LanguageService.getLanguageWords(
      req.app.get("db"),
      req.language.id
    );
    //generates a linked list with the correct data
    const newList = LanguageService.generateList(req.language, words);

    const node = newList.head;
    const answer = node.value.translation;

    //value to determine if the answer is correct or not
    let isCorrect;

    if (guess === answer) {
      isCorrect = true;
    
      //sets the values needed if true
      newList.head.value.memory_value = Number(node.value.memory_value) * 2;
      newList.head.value.correct_count = Number(newList.head.value.correct_count) + 1;

      newList.total_score = Number(newList.total_score) + 1;
    } else {
      isCorrect = false;

      //sets the values needed if false
      newList.head.value.memory_value = 1;
      newList.head.value.incorrect_count = Number(newList.head.value.incorrect_count) + 1;
    }

    // moves the head of linked list based on memory value
    newList.moveHead(newList.head.value.memory_value);

    // persists new head value to language table    
     await LanguageService.updateLanguageEntry(
       req.app.get('db'),
       newList
     )
    // persists new next, correct, and incorrect values to each word in the word table
     await LanguageService.updateWordEntry(
      req.app.get('db'),
      newList
    )
    //response body
    res.json({
      nextWord: newList.head.value.original,
      wordCorrectCount: newList.head.value.correct_count,
      wordIncorrectCount: newList.head.value.incorrect_count,
      totalScore: newList.total_score,
      answer,
      isCorrect,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = languageRouter;
