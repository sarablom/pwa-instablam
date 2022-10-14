import { useContext } from "react";
import { Context } from "../../context/Context";
import { handleDeletePhoto } from "../../utils/cameraHelpers";
import { MdDeleteForever } from "react-icons/md";

function DeleteButton({ id }) {
    const [context, updateContext] = useContext(Context);

    const onClickHandler = () => {
        const newGallery = handleDeletePhoto(id, context.gallery);
        localStorage.setItem("gallery", JSON.stringify(newGallery));
        updateContext({
            gallery: newGallery,
        });
    };
    return (
        <button
            aria-label="Delete this photo"
            className="btn"
            onClick={onClickHandler}
        >
            <MdDeleteForever className="small-icon" />
        </button>
    );
}

export default DeleteButton;
