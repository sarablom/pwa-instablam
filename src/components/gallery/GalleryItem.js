import { MdDownload, MdAccessTime } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";

import DeleteButton from "../buttons/DeleteButton";

function GalleryItem({ item }) {
    return (
        <li className="img-item">
            <img src={item.src} alt="Gallery item" className="picture-taken" />
            <p>
                <MdAccessTime /> {item.time}
            </p>
            {item.city && (
                <p>
                    <RiMapPinLine /> {item.city}, {item.country}
                </p>
            )}
            <DeleteButton item={item} />

            <a alt="Download this picture" href={item.src} download>
                <button className="btn" aria-label="Download this photo">
                    <MdDownload className="small-icon" />
                </button>
            </a>
        </li>
    );
}

export default GalleryItem;
