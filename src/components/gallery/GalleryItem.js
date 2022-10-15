import { MdAccessTime } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";

import DeleteButton from "../buttons/DeleteButton";
import DownloadButton from "../buttons/DownloadButton";

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
            <div className="btn-container">
                <DeleteButton id={id} />

                <a alt="Download this picture" href={src} download>
                    <DownloadButton />
                </a>
            </div>
        </li>
    );
}

export default GalleryItem;
