import React from "react";
import { turnCameraOn } from "../../utils/cameraHelpers";
import { FaPlay } from "react-icons/fa";

const TurnCameraOnBtn = ({ video, facing, setCameraOn, setStream }) => {
    const handleTurnCameraOn = async () => {
        const currentStream = await turnCameraOn(video, facing);
        setCameraOn(true);
        setStream(currentStream);
    };
    return (
        <button
            className="btn"
            aria-label="Turn camera on"
            onClick={handleTurnCameraOn}
        >
            <FaPlay className="icon" />
        </button>
    );
};
export default TurnCameraOnBtn;
