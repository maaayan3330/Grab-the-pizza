import PizzaBox from "./PizzaBox";
import { useState } from "react";

export default function PizzaBoard() {
  // a state to track for every box if it is open or if it been clicked
  const [board, setBoard] = useState([
    { isOpen: false, isClicked: false },
    { isOpen: false, isClicked: false },
    { isOpen: false, isClicked: false },
    { isOpen: false, isClicked: false },
    { isOpen: false, isClicked: false },
  ]);

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
    </div>
  );
}
