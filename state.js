var state = {
  problems: [
    {
      prompt: "Find d/dx of x^2",
      choices: [
        {
          text: "x^3",
          correct: false,
          id: 0
        },
        {
          text: "2x^3",
          correct: false,
          id: 1
        },
        {
          text: "2x",
          correct: true,
          id: 2
        },
        {
          text: "1/2x",
          correct: false,
          id: 3
        }

      ]
    },

    {
      prompt: "Integrate x^2",
      choices: [
        {
          text: "x^3",
          correct: false,
          id: 0
        },
        {
          text: "2x^3",
          correct: false,
          id: 1
        },
        {
          text: "2x",
          correct: false,
          id: 2
        },
        {
          text: "1/2x",
          correct: true,
          id: 3
        }

      ]
    },

    {
      prompt: "Integrate x^2 from 0 to 1",
      choices: [
        {
          text: "1/2",
          correct: true,
          id: 0
        },
        {
          text: "1/4",
          correct: false,
          id: 1
        },
        {
          text: "2",
          correct: false,
          id: 2
        },
        {
          text: "1",
          correct: false,
          id: 3
        }

      ]
    },

    {
      prompt: "Find d/dx x^2y",
      choices: [
        {
          text: "x^2",
          correct: false,
          id: 0
        },
        {
          text: "2x",
          correct: false,
          id: 1
        },
        {
          text: "y",
          correct: false,
          id: 2
        },
        {
          text: "2xy",
          correct: true,
          id: 3
        }

      ]
    },

    {
      prompt: "Find d/dy x^2y",
      choices: [
        {
          text: "x^2",
          correct: true,
          id: 0
        },
        {
          text: "2x",
          correct: false,
          id: 1
        },
        {
          text: "y",
          correct: false,
          id: 2
        },
        {
          text: "2xy",
          correct: false,
          id: 3
        }

      ]
    }
  ],
  currentProblem: 0,
  numCorrect: 0,
  numAnswered: 0
}