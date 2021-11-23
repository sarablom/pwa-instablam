import { RiCameraSwitchFill } from "react-icons/ri";

export default function RotateCameraBtn({ facing, setFacing }) {

  function changeFacing() {
    if (facing === "user") {
      setFacing("environment");
    } else {
      setFacing("user");
    }
  }

  return (
    <button className="btn" onClick={changeFacing}>
      <RiCameraSwitchFill className="icon" />
    </button>
  );
}
