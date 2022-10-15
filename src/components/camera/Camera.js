import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import StartTimerBtn from "../buttons/StartTimerBtn";
import RotateCameraBtn from "../buttons/RotateCameraBtn";
import TurnCameraOffBtn from "../buttons/TurnCameraOffBtn";
import { turnCameraOff, takePicture } from "../../utils/cameraHelpers";
import { getLocation } from "../../services/geolocation";
import TakePictureBtn from "../buttons/TakePictureBtn";

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
    stream,
    setStream,
}) {
    const [context, updateContext] = useContext(Context);

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
            const address = await getLocation(latPos, lonPos);
            if (!address) {
                return;
            }

            setCurrentLocation(address);
        };
        fetch();
    }, [latPos, lonPos]);

    const handleTurnCameraOff = () => {
        turnCameraOff(stream);
        setCameraOn(false);
        setIsCounting(false);
    };

    const handleTakePicture = async () => {
        const newImgObj = await takePicture(
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
            <TakePictureBtn />
            <TurnCameraOffBtn turnCameraOff={handleTurnCameraOff} />
            {window.innerWidth <= 800 && (
                <RotateCameraBtn
                    facing={facing}
                    setFacing={setFacing}
                    video={video}
                    turnCameraOff={turnCameraOff}
                    setStream={setStream}
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
