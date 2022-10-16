import React from "react";
import { MdDownload } from "react-icons/md";

function DownloadButton({ src }) {
    return (
        <a alt="Download this picture" href={src} download>
            <button className="btn" aria-label="Download this photo">
                <MdDownload className="small-icon" />
            </button>
        </a>
    );
}

export default DownloadButton;
