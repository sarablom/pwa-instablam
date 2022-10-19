import { RiCameraSwitchFill } from "react-icons/ri";
import { turnCameraOn, turnCameraOff } from "../../utils/cameraHelpers";
import ErrorMessage from "../ErrorMessage";

export default function RotateCameraBtn({
    facing,
    setFacing,
    video,
    setStream,
}) {
    async function changeFacing() {
        turnCameraOff();
        setFacing(facing === "user" ? "environment" : "user");

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
