import PizzaBox from "./PizzaBox";
import { useState , useEffect } from "react";


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
  const [gameStart , setGameStart] = useState(false);
  // to aviod the same index 
  const [lastOpenIndex, setLastOpenIndex] = useState(null);

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
    const newBoard = board.map((box , index) => {
      return {
        ...box ,
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
      .map((box, index) => 
      <PizzaBox boxOpen={box.isOpen} key={index} />);
  }
  // function to present the seconed line of the boxes
  function createBoxes2() {
    return board
      .slice(2)
      .map((box, index) => 
      <PizzaBox boxOpen={box.isOpen} key={index + 2} />);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center gap-4">
        {createBoxes1()}
      </div>
      <div className="flex justify-center gap-4">
        {createBoxes2()}
      </div>
      <button onClick={gameStart ? restart : handleGameStart}>{gameStart ? "RESTART" : "START"}</button>
    </div>
  );
}
