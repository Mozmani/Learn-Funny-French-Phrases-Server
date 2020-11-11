const { agent } = require("supertest");
const LinkedList = require("../LinkedList");

const wordList = new LinkedList();

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from("language")
      .select(
        "language.id",
        "language.name",
        "language.user_id",
        "language.head",
        "language.total_score"
      )
      .where("language.user_id", user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from("word")
      .select(
        "id",
        "language_id",
        "original",
        "translation",
        "next",
        "memory_value",
        "correct_count",
        "incorrect_count"
      )
      .where({ language_id });
  },

  //generates a linked list
  generateList(lang, words) {
    const ll = new LinkedList();
    ll.id = lang.id;
    ll.name = lang.name;
    ll.total_score = lang.total_score;

    let word = words.find((w) => w.id === lang.head);

    let firstInsert = {
      id: word.id,
      original: word.original,
      translation: word.translation,
      memory_value: word.memory_value,
      correct_count: word.correct_count,
      incorrect_count: word.incorrect_count,
    };

    ll.insertFirst(firstInsert);

    while (word.next) {
      word = words.find((w) => w.id === word.next);

      let newInsert = {
        id: word.id,
        original: word.original,
        translation: word.translation,
        memory_value: word.memory_value,
        correct_count: word.correct_count,
        incorrect_count: word.incorrect_count,
      };

      ll.insertLast(newInsert);
    }
    return ll;
  },
  //updates the language table and values needed
  updateLanguageEntry(db, list) {
    return db("language").where({ id: list.id }).update({
      total_score: list.total_score,
      head: list.head.value.id,
    });
  },

  //updates the word table with values needed
  updateWordEntry(db, list) {

    return db.transaction((trx) =>
      Promise.all([
        ...list.map((word) =>
          db("word")
            .transacting(trx)
            .where("id", word.value.id)
            .update({
              memory_value: word.value.memory_value,
              correct_count: word.value.correct_count,
              incorrect_count: word.value.incorrect_count,
              next: word.next ? word.next.value.id : null,
            })
        ),
      ])
    );
  },

};

module.exports = LanguageService;
