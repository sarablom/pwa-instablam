import React from "react";
import { MdDownload } from "react-icons/md";

function DownloadButton() {
    return (
        <button className="btn" aria-label="Download this photo">
            <MdDownload className="small-icon" />
        </button>
    );
}

export default DownloadButton;
