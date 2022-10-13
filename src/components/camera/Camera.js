import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import StartTimerBtn from "../buttons/StartTimerBtn";
import RotateCameraBtn from "../buttons/RotateCameraBtn";
import TurnCameraOffBtn from "../buttons/TurnCameraOffBtn";
import { RiCameraFill } from "react-icons/ri";
import {
    turnCameraOff,
    turnCameraOn,
    takePicture,
} from "../../utils/cameraHelpers";
import { getAddress } from "../../utils/positionHelpers";

function Camera({
    setCameraOn,
    setIsCounting,
    video,
    facing,
    setFacing,
    count,
    setCount,
    isCounting,
    canvas,
}) {
    const [context, updateContext] = useContext(Context);
    const [stream, setStream] = useState(null);
    const [latPos, setLatPos] = useState(null);
    const [lonPos, setLonPos] = useState(null);
    const [timeStamp, setTimeStamp] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const gallery = context.gallery;

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(pos => {
                setLatPos(pos.coords.latitude);
                setLonPos(pos.coords.longitude);
                setTimeStamp(pos.timestamp);
            });
        } else {
            console.log("No location");
        }
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const address = await getAddress(latPos, lonPos);

            setCurrentLocation(address);
        };
        fetch();
    }, [latPos, lonPos]);

    const handleTurnCameraOff = () => {
        turnCameraOff(stream);
        setCameraOn(false);
        setIsCounting(false);
    };

    const handleTurnCameraOn = () => {
        const currentStream = turnCameraOn(video, facing);
        setCameraOn(true);
        console.log({ currentStream });
        setStream(currentStream);
    };

    const handleTakePicture = () => {
        const newImgObj = takePicture(
            canvas,
            video,
            currentLocation,
            timeStamp
        );

        updateContext({
            gallery: [newImgObj, ...gallery],
        });

        localStorage.setItem(
            "gallery",
            JSON.stringify([newImgObj, ...gallery])
        );
        setIsCounting(false);
        setCount(3);
    };

    return (
        <div className="btn-container">
            <button
                className="btn"
                aria-label="Take photo"
                onClick={handleTakePicture}
            >
                <RiCameraFill className="icon" />
            </button>
            <TurnCameraOffBtn turnCameraOff={handleTurnCameraOff} />
            {window.innerWidth <= 800 && (
                <RotateCameraBtn
                    facing={facing}
                    setFacing={setFacing}
                    handleTurnCameraOn={handleTurnCameraOn}
                    turnCameraOff={turnCameraOff}
                />
            )}
            <StartTimerBtn
                handleTakePicture={handleTakePicture}
                isCounting={isCounting}
                setIsCounting={setIsCounting}
                count={count}
                setCount={setCount}
            />
        </div>
    );
}

export default Camera;
