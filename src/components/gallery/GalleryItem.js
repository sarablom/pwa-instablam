import { MdDownload, MdAccessTime } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";

import DeleteButton from "../buttons/DeleteButton";

function GalleryItem({ item: { src, time, city, country, id } }) {
    return (
        <li className="img-item">
            <img src={src} alt="Gallery item" className="picture-taken" />
            <p>
                <MdAccessTime /> {time}
            </p>
            {city && (
                <p>
                    <RiMapPinLine /> {city}, {country}
                </p>
            )}
            <DeleteButton id={id} />

            <a alt="Download this picture" href={src} download>
                <button className="btn" aria-label="Download this photo">
                    <MdDownload className="small-icon" />
                </button>
            </a>
        </li>
    );
}

export default GalleryItem;
