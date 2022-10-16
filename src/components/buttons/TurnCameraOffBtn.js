import { RiCameraOffFill } from "react-icons/ri";
import { turnCameraOff } from "../../utils/cameraHelpers";
import ErrorMessage from "../ErrorMessage";

export default function TurnCameraOffBtn({
    stream,
    setCameraOn,
    setIsCounting,
}) {
    const handleTurnCameraOff = () => {
        const cameraOff = turnCameraOff(stream);
        if (cameraOff) {
            setCameraOn(false);
            setIsCounting(false);
        } else {
            setTimeout(() => {
                <ErrorMessage message="Could not turn camera off" />;
            }, "5000");
        }
    };
    return (
        <button
            className="btn"
            aria-label="Turn camera off"
            onClick={handleTurnCameraOff}
        >
            <RiCameraOffFill className="icon" />
        </button>
    );
}
