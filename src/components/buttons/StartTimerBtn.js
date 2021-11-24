import { useEffect } from "react";
import { MdOutlineTimer3 } from "react-icons/md";

export default function StartTimerBtn({handleTakePicture, setIsCounting, count, isCounting, setCount}) {

  function handleStartTimer() {
    setIsCounting(true);
    setCount(3);
  }

  useEffect(() => {
      const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
      if (count <= 0 && isCounting) {
        handleTakePicture();
      }
      return () => clearInterval(timer);
  }, [count, setCount, handleTakePicture, isCounting]);

  return (
    <button className="btn" onClick={handleStartTimer}>
      <MdOutlineTimer3 className="icon" />
    </button>
  );
}
