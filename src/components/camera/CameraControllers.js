import { useRef, useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";

import GalleryItem from "../gallery/GalleryItem";
import Counter from "../gallery/Counter";
import Camera from "./Camera";
import TurnCameraOnBtn from "../buttons/TurnCameraOnBtn";

export default function CameraControllers() {
    const [context, updateContext] = useContext(Context);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    //Video stream
    const [facing, setFacing] = useState("user");
    const [browserSupport, setBrowserSupport] = useState(false);
    const [cameraOn, setCameraOn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //Countdown
    const [count, setCount] = useState(3);
    const [isCounting, setIsCounting] = useState(false);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("gallery"))) {
            let newItemsArray = JSON.parse(localStorage.getItem("gallery"));
            updateContext({
                gallery: newItemsArray,
            });
        }
    }, []);

    useEffect(() => {
        if (navigator.mediaDevices) {
            setBrowserSupport(true);
        } else {
            setErrorMessage("Your browser doesn't support video streaming");
        }
    }, []);

    return (
        <>
            {!browserSupport && <p>{errorMessage}</p>}

            <video ref={videoRef} className="display-camera" playsInline />

            {!cameraOn && (
                <div className="btn-container">
                    {browserSupport && (
                        <TurnCameraOnBtn
                            video={videoRef.current}
                            facing={facing}
                            setCameraOn={setCameraOn}
                        />
                    )}
                </div>
            )}

            {cameraOn && videoRef && (
                <Camera
                    setCameraOn={setCameraOn}
                    setIsCounting={setIsCounting}
                    video={videoRef.current}
                    facing={facing}
                    setFacing={setFacing}
                    count={count}
                    setCount={setCount}
                    isCounting={isCounting}
                    canvas={canvasRef.current}
                />
            )}

            {isCounting && <Counter count={count} />}
            <>
                {context && <h2>Image Gallery</h2>}

                <ul className="img-container">
                    {context.gallery.length > 0 &&
                        context.gallery.map(item => (
                            <GalleryItem item={item} key={item.id} />
                        ))}
                </ul>
            </>

            <ul className="canvas-list">
                <li>
                    <canvas ref={canvasRef} width="320" height="240"></canvas>
                </li>
            </ul>
        </>
    );
}
