import { RiCameraOffFill } from "react-icons/ri";
import { turnCameraOff } from "../../utils/cameraHelpers";

export default function TurnCameraOffBtn({
    stream,
    setCameraOn,
    setIsCounting,
}) {
    const handleTurnCameraOff = async () => {
        await turnCameraOff(stream);
        setCameraOn(false);
        setIsCounting(false);
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
