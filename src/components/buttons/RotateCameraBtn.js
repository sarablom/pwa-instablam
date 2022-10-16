import { RiCameraSwitchFill } from "react-icons/ri";
import { turnCameraOn } from "../../utils/cameraHelpers";
import ErrorMessage from "../ErrorMessage";

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
        if (currentStream) {
            setStream(currentStream);
        } else {
            setTimeout(() => {
                <ErrorMessage message="Could not turn camera on" />;
            }, "5000");
        }
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
