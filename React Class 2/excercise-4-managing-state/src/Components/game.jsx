import React from "react";

const Game = ({ numCorrect, numQuestions, number1, number2, number3, proposedAnswer,checkAnswer }) => (
    <div className="game">
        <h2>ADD THE NUMBERS GAME</h2>
        <div className="equation">
            <p className="text">{`${number1} + ${number2} + ${number3} = ${proposedAnswer}`}</p>
        </div>
        <button onClick={_ => checkAnswer(true)}>True</button>
        <button onClick={_ => checkAnswer(false)}>False</button>
        <p className="text">
            You have answered {numCorrect} question answered correctly out of total {numQuestions} questions.
          </p>
    </div>
);

export default Game;