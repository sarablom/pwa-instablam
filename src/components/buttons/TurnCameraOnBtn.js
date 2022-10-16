import React from "react";
import { turnCameraOn } from "../../utils/cameraHelpers";
import { FaPlay } from "react-icons/fa";
import ErrorMessage from "../ErrorMessage";

const TurnCameraOnBtn = ({ video, facing, setCameraOn, setStream }) => {
    const handleTurnCameraOn = async () => {
        const currentStream = await turnCameraOn(video, facing);

        if (currentStream) {
            setCameraOn(true);
            setStream(currentStream);
        } else {
            setTimeout(() => {
                <ErrorMessage message="Could not turn camera on" />;
            }, "5000");
        }
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
