import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { RiCameraFill } from "react-icons/ri";
import { getLocation } from "../../services/geolocation";

export default function TakePictureBtn({ timeStamp, latPos, lonPos, canvasRef, videoRef, setIsCounting, setImageGallery }) {
  const [context, updateContext] = useContext(Context);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  async function getAddress(lat, lon) {
    console.log(lat, lon);
    const data = await getLocation(lat, lon);

    return { city: data.city, country: data.country };
  }

  const handleTakePicture = async () => {
    let id = Math.floor(Math.random() * 10000);
    let timestamp = new Date(timeStamp);
    let time = timestamp.toLocaleString();

    const address = getAddress(latPos, lonPos);

    const printAddress = async () => {
      const a = await address;
      setCity(a.city);
      setCountry(a.country);
    };

    printAddress();

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

      console.log(photo);

      const jsxString = (
        <li key={id} className="img-item">
          <img src={photo} alt="Gallery item" className="takenPicture" />
          <p>{time}</p>
          <p>
            {city} in {country}
          </p>
        </li>
      );

      //Object send to database and/or context
      const newImgObj = {
        id: id,
        src: photo,
        latitude: latPos,
        longitude: lonPos,
        city: city,
        country: country,
        time: timeStamp,
      };

      console.log(newImgObj);

      updateContext({
        gallery: [...context.gallery, newImgObj],
      });

      setImageGallery((imageGallery) => [jsxString, ...imageGallery]);
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
