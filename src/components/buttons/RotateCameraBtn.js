import { RiCameraSwitchFill } from "react-icons/ri";

export default function RotateCameraBtn({ facing, setFacing, turnCameraOff, handleTurnCameraOn }) {

  function changeFacing() {
    if (facing === "user") {
      setFacing("environment");
    } else {
      setFacing("user");
    }
    turnCameraOff();
    handleTurnCameraOn();
  }

  return (
    <button className="btn" aria-label="Rotate camera" onClick={changeFacing}>
      <RiCameraSwitchFill className="icon" />
    </button>
  );
}
