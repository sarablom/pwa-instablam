import React from "react";
import { turnCameraOn } from "../../utils/cameraHelpers";
import { FaPlay } from "react-icons/fa";

const TurnCameraOnBtn = ({ video, facing, setCameraOn }) => {
    return (
        <button
            className="btn"
            aria-label="Turn camera on"
            onClick={() => {
                turnCameraOn(video, facing);
                setCameraOn(true);
            }}
        >
            <FaPlay className="icon" />
        </button>
    );
};
export default TurnCameraOnBtn;
