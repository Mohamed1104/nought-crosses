import Square from "../Square";
import "./board.css";
import { useState } from "react";

import React from "react";

export default function Board() {
  //State that is an Array of 9 that holds what value the square holds either X or O;
  // Start each sqaure with a value of null;
  const [squares, setSquares] = useState(Array(9).fill(null));
  // State that alternates which value is being put on the squares;
  const [isX, setIsX] = useState(true);

  //function that takes in the index of the array
  // alternates between X AND O;

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // if the state of isX is true set the sqaure to X if its false set it to O
    squares[i] = isX ? "X" : "O";
    setSquares(squares);
    // set the state to the oposite of what is currently is when button is clicked
    setIsX(!isX);
  }

  function calculateWinner(squares) {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < combinations.length; i++) {
      const [a, b, c] = combinations[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  const winner = calculateWinner(squares);
  let status = "";

  if (winner) {
    status = `The Winner is Player: ${winner}`;
  } else {
    status = `Next player: ${isX ? "X" : "O"}`;
  }

  function handleRestart() {
    setIsX(true);
    setSquares(Array(9).fill(null));
  }

  return (
    <div className="board">
      <div className="just-the-board">
        <div className="board-row">
          <Square value={squares[0]} handleClick={() => handleClick(0)} />
          <Square value={squares[1]} handleClick={() => handleClick(1)} />
          <Square value={squares[2]} handleClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} handleClick={() => handleClick(3)} />
          <Square value={squares[4]} handleClick={() => handleClick(4)} />
          <Square value={squares[5]} handleClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} handleClick={() => handleClick(6)} />
          <Square value={squares[7]} handleClick={() => handleClick(7)} />
          <Square value={squares[8]} handleClick={() => handleClick(8)} />
        </div>
      </div>

      <div className="results">
        <div className="status">{status}</div>
        <div>
          <button className="restart" onClick={() => handleRestart()}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}
