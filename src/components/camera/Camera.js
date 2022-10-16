import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import StartTimerBtn from "../buttons/StartTimerBtn";
import RotateCameraBtn from "../buttons/RotateCameraBtn";
import TurnCameraOffBtn from "../buttons/TurnCameraOffBtn";
import { takePicture } from "../../utils/cameraHelpers";
import { getLocation } from "../../services/geolocation";
import TakePictureBtn from "../buttons/TakePictureBtn";
import ErrorMessage from "../ErrorMessage";

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
    const [currentLocation, setCurrentLocation] = useState(null);
    const gallery = context.gallery;
    const timeStamp = new Date();

    useEffect(() => {
        if ("geolocation" in navigator) {
            setCoords();
        } else {
            console.log("No location");
            setTimeout(() => {
                <ErrorMessage message="Could not set location" />;
            }, "5000");
        }
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const address = await getLocation(latPos, lonPos);
            if (!address) {
                setTimeout(() => {
                    <ErrorMessage message="Could not set location" />;
                }, "5000");
            }

            setCurrentLocation(address);
        };
        fetch();
    }, [latPos, lonPos]);

    const setCoords = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(pos => {
                setLatPos(pos.coords.latitude);
                setLonPos(pos.coords.longitude);
            });
        } else {
            console.log("No location");
            setTimeout(() => {
                <ErrorMessage message="Could not set location" />;
            }, "5000");
        }
    };

    const handleTakePicture = async () => {
        const newImgObj = await takePicture(
            canvas,
            video,
            currentLocation,
            timeStamp
        );

        if (newImgObj) {
            updateContext({
                gallery: [newImgObj, ...gallery],
            });

            localStorage.setItem(
                "gallery",
                JSON.stringify([newImgObj, ...gallery])
            );
            setIsCounting(false);
            setCount(3);
        } else {
            console.log("No location");
            setTimeout(() => {
                <ErrorMessage message="Could not take picture" />;
            }, "5000");
        }
    };

    return (
        <div className="btn-container">
            <TakePictureBtn handleTakePicture={handleTakePicture} />
            <TurnCameraOffBtn
                stream={stream}
                setCameraOn={setCameraOn}
                setIsCounting={setIsCounting}
            />
            {window.innerWidth <= 800 && (
                <RotateCameraBtn
                    facing={facing}
                    setFacing={setFacing}
                    video={video}
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
