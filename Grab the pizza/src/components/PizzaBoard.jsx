import PizzaBox from "./PizzaBox";
import Header from "./Header";
import { useState, useEffect, useRef } from "react";

const initialBoard = [
  { isOpen: false, isClicked: false },
  { isOpen: false, isClicked: false },
  { isOpen: false, isClicked: false },
  { isOpen: false, isClicked: false },
  { isOpen: false, isClicked: false },
];

export default function PizzaBoard() {
  // a state to track for every box if it is open or if it been clicked
  const [board, setBoard] = useState(initialBoard);
  // state for start button
  const [gameStart, setGameStart] = useState(false);
  // to aviod the same index
  const [lastOpenIndex, setLastOpenIndex] = useState(null);
  // state for score
  const [score , setScore] = useState(0);

  // Catch tracking function
  function updateOnClickOfBox(index) {
    const clickedBox = board[index]
    
    // check if it not open / allready clicked
    if (!clickedBox.isOpen || clickedBox.isClicked) {
      return;
    } 
    const newBoard = [...board];
    newBoard[index] = {
      ...newBoard[index],
      isClicked: true,
    };
    setBoard(newBoard);
    setScore((prev) => prev + 1);
  }

  // fucntion to handle click
  function handleGameStart() {
    setGameStart(true);
  }

  // restart funcion
  function restart() {
    // restart the states of the boxes
    setBoard(initialBoard);
    // restart the index
    setLastOpenIndex(null);
    // restart the button
    setGameStart(false);
    setScore(0);
  }

  // function to open random box
  function openRandomBox() {
    // get a random index
    let randomIndex = Math.floor(Math.random() * board.length);

    // to aviod the same index
    while (randomIndex === lastOpenIndex) {
      randomIndex = Math.floor(Math.random() * board.length);
    }

    // made a new arr of boxes
    const newBoard = board.map((box, index) => {
      return {
        ...box,
        isOpen: index === randomIndex,
        isClicked: false,
      };
    });
    setBoard(newBoard);
    setLastOpenIndex(randomIndex);
  }

  // use effect for timmer to open every X secondes a random box
  useEffect(() => {
    // only if the user start the game
    if (!gameStart) return;

    // random box on the start
    openRandomBox();

    // now every X time
    const intervalId = setInterval(() => {
      openRandomBox();
    }, 750);

    // clean the interval
    return () => clearInterval(intervalId);
  }, [gameStart]);

  // function to present the first line of the boxes
  function createBoxes1() {
    return board
      .slice(0, 2)
      .map((box, index) => <PizzaBox boxOpen={box.isOpen} key={index} isClicked={box.isClicked} index={index} handleClick={updateOnClickOfBox} />);
  }
  // function to present the seconed line of the boxes
  function createBoxes2() {
    return board
      .slice(2)
      .map((box, index) => <PizzaBox boxOpen={box.isOpen} key={index + 2} isClicked={box.isClicked} index={index + 2} handleClick={updateOnClickOfBox}/>);
  }

  return (
    <div>
      <Header score={score}/>
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center gap-4">{createBoxes1()}</div>
      <div className="flex justify-center gap-4">{createBoxes2()}</div>
      <div className="flex justify-center mt-6">
        <button
          onClick={gameStart ? restart : handleGameStart}
          className="cursor-pointer rounded-2xl border-4 border-amber-900 bg-gradient-to-br from-orange-300 via-orange-400 to-amber-500 px-8 py-3 text-xl font-bold text-amber-950 shadow-[0_8px_20px_rgba(120,53,15,0.35)] transition-all duration-200 hover:scale-105 hover:shadow-[0_12px_30px_rgba(120,53,15,0.45)] active:scale-95"      >
          {gameStart ? "RESTART" : "START"}
        </button>
      </div>
    </div>
    </div>
  );
}
