import { useContext } from "react";
import { Context } from "../../context/Context";
import { MdDeleteForever, MdDownload, MdAccessTime } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";
import { handleDeletePhoto } from "../../utils/cameraHelpers";

function GalleryItem({ item }) {
    const [context, updateContext] = useContext(Context);

    const onClickHandler = () => {
        const newGallery = handleDeletePhoto(item.id, context.gallery);
        updateContext({
            gallery: newGallery,
        });
    };

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
            <button
                aria-label="Delete this photo"
                className="btn"
                onClick={onClickHandler}
            >
                <MdDeleteForever className="small-icon" />
            </button>

            <a alt="Download this picture" href={item.src} download>
                <button className="btn" aria-label="Download this photo">
                    <MdDownload className="small-icon" />
                </button>
            </a>
        </li>
    );
}

export default GalleryItem;
