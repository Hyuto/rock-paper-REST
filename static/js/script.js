const video = document.getElementById("videoElement");
const canvas = document.getElementById("canvasElement");
const context = canvas.getContext('2d');

const start = () => {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            stream;
        }).catch((e) => {
            console.log(e);
        });
    }
}

const stop = () => {
    let tracks = video.srcObject.getTracks();
  
    for(let i = 0; i < tracks.length; i++) {
        tracks[i].stop();
    }
  
    video.srcObject = null;
    context.clearRect(0, 0, canvas.width, canvas.height)
    document.getElementById('prediction').innerHTML = ``
}

const TakeAndPost = () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const img = Array.from(context.getImageData(0, 0, canvas.width, canvas.height).data);

    fetch(`${window.location.href}api/`, {
        method: "POST", 
        body: JSON.stringify({'image' : img})
    }).then(res => res.json()).then(res => {
        document.getElementById('prediction').innerHTML = `Prediction <strong>${res['predicted']}</strong>`
    })
}