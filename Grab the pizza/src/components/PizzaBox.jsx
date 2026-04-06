export default function PizzaBox({ boxOpen, isClicked, handleClick, index }) {
  return (
    <button onClick={() => handleClick(index)}>
      <img
        src={boxOpen ? "/pizza-open.png" : "/pizza-close.png"}
        alt="pizza box"
        className={`w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 object-contain cursor-pointer transition duration-200 hover:scale-105 active:scale-95 ${
          isClicked ? "animate-pizza-shake scale-110" : ""
        }`}
      />
    </button>
  );
}