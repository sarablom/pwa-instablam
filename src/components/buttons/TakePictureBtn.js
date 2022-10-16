import { RiCameraFill } from "react-icons/ri";

export default function TakePictureBtn({ handleTakePicture }) {
    return (
        <button
            className="btn"
            aria-label="Take photo"
            onClick={handleTakePicture}
        >
            <RiCameraFill className="icon" />
        </button>
    );
}
