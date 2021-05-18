const start = (video) => {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { 
                    ideal: "environment" 
                }
            }
        }).then((stream) => {
            video.srcObject = stream;
        }).catch((e) => {
            console.log(e);
        });
    }
}

const stop = (canvas, video, prediction) => {
    if (video.srcObject !== null) {
        let context = canvas.getContext('2d');
        let tracks = video.srcObject.getTracks();

        for (let i = 0; i < tracks.length; i++) {
            tracks[i].stop();
        }

        video.srcObject = null;
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    prediction.innerHTML = ``;
}

const TakeAndPost = (canvas, video, prediction) => {
    let context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const img = Array.from(
        context.getImageData(0, 0, canvas.width, canvas.height).data
    );
    prediction.innerHTML = ``;

    fetch(`${window.location.href}api/`, {
            method: "POST",
            body: JSON.stringify({
                'image': img
            })
        }).then(res => res.json()).then(res => {
            prediction.innerHTML = `Prediction <strong>${res['predicted']}</strong>`
        }
    )
}

export {
    start,
    stop,
    TakeAndPost
};