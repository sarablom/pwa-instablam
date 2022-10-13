import { printCity, printCountry } from "./positionHelpers";

export function handleDeletePhoto(id, gallery) {
    const newGallery = gallery.filter(item => item.id !== id);
    localStorage.setItem("gallery", JSON.stringify(newGallery));

    return newGallery;
}

export async function turnCameraOn(videoElement, facing) {
    const constraints = {
        video: { width: 320, height: 240, facingMode: facing },
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = stream;
        videoElement.addEventListener("loadedmetadata", () => {
            videoElement.play();
        });
        return stream;
    } catch (error) {
        console.log("Failed access", error);
    }
}

export function turnCameraOff(stream) {
    if (!stream) return;

    let tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
}

export const takePicture = async (
    canvas,
    video,
    currentLocation,
    timeStamp
) => {
    try {
        canvas
            .getContext("2d")
            .drawImage(video, 0, 0, canvas.width, canvas.height);

        return {
            id: Math.floor(Math.random() * 10000),
            src: canvas.toDataURL("image/jpeg"),
            city: (await printCity(currentLocation.city)) || "City unknown",
            country:
                (await printCountry(currentLocation.country)) ||
                "Country unknown",
            time: new Date(timeStamp).toLocaleString(),
        };
    } catch (error) {
        console.log("Cant take picture", error);
    }
};
