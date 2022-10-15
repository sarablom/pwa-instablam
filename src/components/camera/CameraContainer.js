import { useRef, useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";

import GalleryItem from "../gallery/GalleryItem";
import Counter from "../gallery/Counter";
import Camera from "./Camera";
import TurnCameraOnBtn from "../buttons/TurnCameraOnBtn";

export default function CameraContainer() {
    const [context, updateContext] = useContext(Context);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    //Video stream
    const [facing, setFacing] = useState("user");
    const [browserSupport, setBrowserSupport] = useState(false);
    const [cameraOn, setCameraOn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [stream, setStream] = useState(null);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

            <video
                ref={videoRef}
                className={cameraOn ? "display-camera" : "hidden"}
                playsInline
            />

            {!cameraOn && (
                <div className="btn-container">
                    {browserSupport && (
                        <TurnCameraOnBtn
                            video={videoRef.current}
                            facing={facing}
                            setCameraOn={setCameraOn}
                            setStream={setStream}
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
                    stream={stream}
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
