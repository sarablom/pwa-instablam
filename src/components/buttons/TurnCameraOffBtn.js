import { RiCameraOffFill } from "react-icons/ri";

export default function TurnCameraOffBtn({ turnCameraOff }) {

  return (
    <button className="btn" onClick={turnCameraOff}>
      <RiCameraOffFill className="icon" />
    </button>
  );
}
