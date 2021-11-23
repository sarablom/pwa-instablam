import { RiCameraOffFill } from "react-icons/ri";

export default function TurnCameraOffBtn({stream, setCameraOn, setIsCounting}) {

  function turnCameraOff() {
    if (!stream) return;

    let tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setCameraOn(false);
    setIsCounting(false);
  }

  return (
    <button className="btn" onClick={turnCameraOff}>
      <RiCameraOffFill className="icon" />
    </button>
  );
}
