import { useRef, useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { RiCameraFill, RiMapPinLine } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
import { MdDeleteForever, MdDownload, MdAccessTime } from "react-icons/md";
import { getLocation } from "../../services/geolocation";
import StartTimerBtn from "../buttons/StartTimerBtn";
import RotateCameraBtn from "../buttons/RotateCameraBtn";
import TurnCameraOffBtn from "../buttons/TurnCameraOffBtn";

export default function CameraControllers() {
  const [context, updateContext] = useContext(Context);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  //Video stream
  const [facing, setFacing] = useState("user");
  const [stream, setStream] = useState(null);
  const [browserSupport, setBrowserSupport] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const gallery = context.gallery;

  //Geolocation
  const [latPos, setLatPos] = useState(null);
  const [lonPos, setLonPos] = useState(null);
  const [timeStamp, setTimeStamp] = useState(null);
  const [updateLocation, setUpdateLocation] = useState(false);

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

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLatPos(pos.coords.latitude);
        setLonPos(pos.coords.longitude);
        setTimeStamp(pos.timestamp);
        setUpdateLocation(false);
      });
    } else {
      console.log("No location");
    }
  }, [updateLocation]);

  function handleDeletePhoto(id) {
    const newGallery = gallery.filter((item) => item.id !== id);
    updateContext({
      gallery: newGallery,
    });
    localStorage.setItem("gallery", JSON.stringify(newGallery));
  }

  const handleVideoOn = () => assignStream(videoRef.current);

  async function assignStream(videoElement) {
    const constraints = {
      video: { width: 320, height: 240, facingMode: facing },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElement.srcObject = stream;
      videoElement.addEventListener("loadedmetadata", () => {
        videoElement.play();
      });
      setCameraOn(true);
      setStream(stream);
    } catch (error) {
      console.log("Failed access", error);
    }
  }

  async function getAddress(lat, lon) {
    const data = await getLocation(lat, lon);
    return { city: data.city, country: data.country, error: data.error };
  }

  const handleTakePicture = async () => {
    setIsCounting(false);
    setCount(3);
    setUpdateLocation(true);

    const address = await getAddress(latPos, lonPos);

    const printCity = async () => {
      return address.city;
    };

    const printCountry = async () => {
      return address.country;
    };

    try {
      canvasRef.current
        .getContext("2d")
        .drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

      //Object send to context
      const newImgObj = {
        id: Math.floor(Math.random() * 10000),
        src: canvasRef.current.toDataURL("image/jpeg"),
        city: (await printCity()) || "City unknown",
        country: (await printCountry()) || "Country unknown",
        time: new Date(timeStamp).toLocaleString(),
      };

      updateContext({
        gallery: [newImgObj, ...gallery],
      });

      localStorage.setItem("gallery", JSON.stringify([newImgObj, ...gallery]));
    } catch (error) {
      console.log("Cant take picture", error);
    }
  };

  function turnCameraOff() {
    if (!stream) return;

    let tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setCameraOn(false);
    setIsCounting(false);
  }

  return (
    <>
      {!browserSupport && <p>{errorMessage}</p>}

      <video ref={videoRef} className="display-camera" playsInline>
        {" "}
      </video>

      {!cameraOn && (
        <div className="btn-container">
          {browserSupport && (
            <button className="btn" aria-label="Turn camera on" onClick={handleVideoOn}>
              <FaPlay className="icon" />
            </button>
          )}
        </div>
      )}

      {cameraOn && (
        <div className="btn-container">
          <button className="btn" aria-label="Take photo" onClick={handleTakePicture}>
            <RiCameraFill className="icon" />
          </button>
          <TurnCameraOffBtn turnCameraOff={turnCameraOff} />
          {window.innerWidth <= 800 && (
            <RotateCameraBtn
              facing={facing}
              setFacing={setFacing}
              handleVideoOn={handleVideoOn}
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
      )}

      {isCounting && (
        <>
          <p className="countdown">Taking picture in</p>
          <p className="animation">{count}</p>
        </>
      )}
      <>
        {gallery.length > 0 && <h2>Image Gallery</h2>}

        <ul className="img-container">
          {gallery &&
            gallery.map((item) => (
              <li key={item.id} className="img-item">
                <img
                  src={item.src}
                  alt="Gallery item"
                  className="picture-taken"
                />
                <p>
                  <MdAccessTime /> {item.time}
                </p>
                {item.city && (
                  <p>
                    <RiMapPinLine /> {item.city}, {item.country}
                  </p>
                )}
                <button
                  aria-label="Delete this photo"
                  className="btn"
                  onClick={() => handleDeletePhoto(item.id)}
                >
                  <MdDeleteForever className="small-icon" />
                </button>

                <a alt="Download this picture" href={item.src} download>
                  <button className="btn" aria-label="Download this photo">
                    <MdDownload className="small-icon" />
                  </button>
                </a>
              </li>
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
