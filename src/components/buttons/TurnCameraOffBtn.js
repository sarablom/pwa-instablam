import { RiCameraOffFill } from "react-icons/ri";

export default function TurnCameraOffBtn({ turnCameraOff }) {
    return (
        <button
            className="btn"
            aria-label="Turn camera off"
            onClick={turnCameraOff}
        >
            <RiCameraOffFill className="icon" />
        </button>
    );
}
