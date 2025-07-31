
import React, { useState } from "react"; // <--- Import useState
import Square from "./Square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXturn, setIsXturn] = useState(true);

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) 
      {
      const [a, b, c] = combination;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) 
        {
        return state[a]; 
        }
     }
    return null;
  };

  const winner = checkWinner(); // Call checkWinner to get the current winner

  const handleClick = (index) => 
  {
    // If there's a winner or the square is already filled, do nothing
    if (winner || state[index] !== null) 
    {
      return;
    }

    const newState = [...state];
    newState[index] = isXturn ? "X" : "O";
    setState(newState);
    setIsXturn(!isXturn);
  };

  const renderSquare = (index) => {
    return <Square onClick={() => handleClick(index)} value={state[index]} />;
  };
  
  // Function to reset the game
  const handleReset = () => {
    setState(Array(9).fill(null));
    setIsXturn(true);
  };

  return (
    <div className="board-container">
      {winner ? 
      (
        <>
          <p className="status">Winner: {winner}</p>
          <button onClick={handleReset}>Play Again</button>
        </>
      )
      : state.every(function(square) 
      {
          return square !== null;
      }) ? 
      ( // Check for a draw
        <>
          <p className="status">It's a Draw!</p>
          <button onClick={handleReset}>Play Again</button>
        </>
      ) 
      : (
        <p className="status">Next Player: {isXturn ? "X" : "O"}</p>
      )}

      <div className="board-rows">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>

      <div className="board-rows">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>

      <div className="board-rows">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;