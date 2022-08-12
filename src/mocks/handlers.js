import { rest } from 'msw';

export const handlers = [
  rest.get("https://opentdb.com/api.php?amount=5&type=multiple", async (req, res, ctx) => {

    return res(
      ctx.json(
        {
          "response_code": 0,
          "results": [
              {
                  "category": "Entertainment: Film",
                  "type": "multiple",
                  "difficulty": "easy",
                  "question": "When was the movie &#039;Con Air&#039; released?",
                  "correct_answer": "1997",
                  "incorrect_answers": [
                      "1985",
                      "1999",
                      "1990"
                  ]
              },
              {
                  "category": "Entertainment: Video Games",
                  "type": "multiple",
                  "difficulty": "hard",
                  "question": "In the game Nuclear Throne, what organization chases the player character throughout the game?",
                  "correct_answer": "The I.D.P.D",
                  "incorrect_answers": [
                      "The Fishmen",
                      "The Bandits",
                      "The Y.V.G.G"
                  ]
              },
              {
                  "category": "Geography",
                  "type": "multiple",
                  "difficulty": "hard",
                  "question": "How many countries border Kyrgyzstan?",
                  "correct_answer": "4",
                  "incorrect_answers": [
                      "3",
                      "1",
                      "6"
                  ]
              },
              {
                  "category": "Entertainment: Video Games",
                  "type": "multiple",
                  "difficulty": "easy",
                  "question": "Who is the leader of Team Instinct in Pok&eacute;mon Go?",
                  "correct_answer": "Spark",
                  "incorrect_answers": [
                      "Candela",
                      "Blanche",
                      "Willow"
                  ]
              },
              {
                  "category": "Entertainment: Video Games",
                  "type": "multiple",
                  "difficulty": "easy",
                  "question": "Which Pok&eacute;mon can learn the move &quot;Secret Power&quot; by leveling up?",
                  "correct_answer": "Audino",
                  "incorrect_answers": [
                      "Type:Null",
                      "Arceus",
                      "Silvally"
                  ]
              }
          ]
      }
      )
    )
  })
];