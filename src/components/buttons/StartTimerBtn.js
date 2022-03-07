import { useEffect } from "react";
import { MdOutlineTimer3 } from "react-icons/md";

export default function StartTimerBtn({handleTakePicture, setIsCounting, count, isCounting, setCount}) {
  // const [canUse, setCanUse] = useState(false)

  // useEffect(() => {
	// 	// Find out whether we can use notifications at all
	// 	Notification.requestPermission().then(result => {
	// 		if( result === 'granted' )
	// 			setCanUse(true)
	// 	})
	// }, [])

  useEffect(() => {
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
      
      if (count === 0 && isCounting) {
        handleTakePicture(); 
        // if (count === 0 && canUse) {
        //   showNotificationWithData();
        // }
      }

      return () => clearInterval(timer);
  }, [count, setCount, handleTakePicture, isCounting]);

  // function showNotificationWithData() {
	// 	new Notification('Picture taken!', {body: 'A new nice pic is now available in the image gallery'})
	// }
  
  function handleStartTimer() {
    setIsCounting(true);
    setCount(3);
  }

  return (
    <button className="btn" aria-label="Start 3 seconds timer to take photo" onClick={handleStartTimer}>
      <MdOutlineTimer3 className="icon" />
    </button>
  );
}
