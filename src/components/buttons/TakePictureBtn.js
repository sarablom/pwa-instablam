import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { RiCameraFill } from "react-icons/ri";
import { getLocation } from "../../services/geolocation";

export default function TakePictureBtn({
    timeStamp,
    latPos,
    lonPos,
    canvasRef,
    videoRef,
    setIsCounting,
    setImageGallery,
}) {
    const [context, updateContext] = useContext(Context);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
        const printAddress = async () => {
            return await getLocation(latPos, lonPos);
        };

        const location = printAddress();
        setCity(location.city);
        setCountry(location.country);
    }, [latPos, lonPos]);

    const constructNewGalleryItem = (id, photo) => {
        return (
            <li key={id} className="img-item">
                <img src={photo} alt="Gallery item" className="takenPicture" />
                <p>{new Date(timeStamp).toLocaleString()}</p>
                <p>
                    {city} in {country}
                </p>
            </li>
        );
    };

    const handleTakePicture = async () => {
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
            const photo = canvasRef.current.toDataURL("image/jpeg");
            const id = Math.floor(Math.random() * 10000);

            const newImgObj = {
                id,
                src: photo,
                latitude: latPos,
                longitude: lonPos,
                city,
                country,
                time: new Date(timeStamp).toLocaleString(),
            };

            updateContext({
                gallery: [...context.gallery, newImgObj],
            });

            setImageGallery(imageGallery => [
                constructNewGalleryItem(id, photo),
                ...imageGallery,
            ]);
            setIsCounting(false);
        } catch (error) {
            console.log("Cant take picture", error);
        }
    };

    return (
        <button className="btn" onClick={handleTakePicture}>
            <RiCameraFill className="icon" />
        </button>
    );
}
