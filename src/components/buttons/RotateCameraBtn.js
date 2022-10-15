import { RiCameraSwitchFill } from "react-icons/ri";
import { turnCameraOn } from "../../utils/cameraHelpers";

export default function RotateCameraBtn({
    facing,
    setFacing,
    turnCameraOff,
    video,
    setStream,
}) {
    async function changeFacing() {
        if (facing === "user") {
            setFacing("environment");
        } else {
            setFacing("user");
        }
        turnCameraOff();
        const currentStream = await turnCameraOn(video, facing);
        setStream(currentStream);
    }

    return (
        <button
            className="btn"
            aria-label="Rotate camera"
            onClick={changeFacing}
        >
            <RiCameraSwitchFill className="icon" />
        </button>
    );
}
