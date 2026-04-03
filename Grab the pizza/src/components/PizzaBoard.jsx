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
  // state for score
  const [score, setScore] = useState(0);

  // to aviod the same index
  const lastOpenIndexRef = useRef(null);
  // to pause the game for a short time after catch
  const isPausedRef = useRef(false);
  // to save the timeout so we can clean it on restart
  const timeoutRef = useRef(null);

  // Catch tracking function
  function updateOnClickOfBox(index) {
    const clickedBox = board[index];

    // check if it not open / allready clicked / game is paused
    if (!clickedBox.isOpen || clickedBox.isClicked || isPausedRef.current) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = {
      ...newBoard[index],
      isClicked: true,
    };

    setBoard(newBoard);
    setScore((prev) => prev + 1);

    // pause game for a short moment so user can see the shake
    isPausedRef.current = true;

    timeoutRef.current = setTimeout(() => {
      openRandomBox();
      isPausedRef.current = false;
    }, 350);
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
    lastOpenIndexRef.current = null;
    // restart pause
    isPausedRef.current = false;
    // restart the button
    setGameStart(false);
    setScore(0);

    // clear timeout if exist
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  // function to open random box
  function openRandomBox() {
    // get a random index
    let randomIndex = Math.floor(Math.random() * initialBoard.length);

    // to aviod the same index
    while (randomIndex === lastOpenIndexRef.current) {
      randomIndex = Math.floor(Math.random() * initialBoard.length);
    }

    // made a new arr of boxes
    const newBoard = initialBoard.map((box, index) => {
      return {
        ...box,
        isOpen: index === randomIndex,
        isClicked: false,
      };
    });

    setBoard(newBoard);
    lastOpenIndexRef.current = randomIndex;
  }

  // use effect for timmer to open every X secondes a random box
  useEffect(() => {
    // only if the user start the game
    if (!gameStart) return;

    // random box on the start
    openRandomBox();

    // now every X time
    const intervalId = setInterval(() => {
      if (!isPausedRef.current) {
        openRandomBox();
      }
    }, 750);

    // clean the interval and timeout
    return () => {
      clearInterval(intervalId);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [gameStart]);

  // function to present the first line of the boxes
  function createBoxes1() {
    return board.slice(0, 2).map((box, index) => (
      <PizzaBox
        boxOpen={box.isOpen}
        key={index}
        isClicked={box.isClicked}
        index={index}
        handleClick={updateOnClickOfBox}
      />
    ));
  }

  // function to present the seconed line of the boxes
  function createBoxes2() {
    return board.slice(2).map((box, index) => (
      <PizzaBox
        boxOpen={box.isOpen}
        key={index + 2}
        isClicked={box.isClicked}
        index={index + 2}
        handleClick={updateOnClickOfBox}
      />
    ));
  }

  return (
    <div>
      <Header score={score} />
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center gap-4">{createBoxes1()}</div>
        <div className="flex justify-center gap-4">{createBoxes2()}</div>
        <div className="flex justify-center mt-6">
          <button
            onClick={gameStart ? restart : handleGameStart}
            className="cursor-pointer rounded-2xl border-4 border-amber-900 bg-gradient-to-br from-orange-300 via-orange-400 to-amber-500 px-8 py-3 text-xl font-bold text-amber-950 shadow-[0_8px_20px_rgba(120,53,15,0.35)] transition-all duration-200 hover:scale-105 hover:shadow-[0_12px_30px_rgba(120,53,15,0.45)] active:scale-95"
          >
            {gameStart ? "RESTART" : "START"}
          </button>
        </div>
      </div>
    </div>
  );
}