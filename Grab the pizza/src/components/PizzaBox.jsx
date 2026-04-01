export default function PizzaBox({ boxOpen, isClicked, handleClick , index}) {
  return (
    <button onClick={() => handleClick(index)}>
      <img
        src={boxOpen ? "/pizza-open.png" : "/pizza-close.png"}
        alt="pizza box"
        className={`w-65 h-65 object-contain cursor-pointer hover:scale-105 transition ${
          isClicked ? "scale-110" : ""
        }`}
      />
    </button>
  );
}
