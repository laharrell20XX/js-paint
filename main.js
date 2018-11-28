mouseDisplayer = document.querySelector("p.mouse-position");
var canvas = document.querySelector("canvas");
var drawnPoints = [];
canvas.addEventListener("mousemove", ev => {
    if (ev.buttons == 1) {
        if (drawnPoints.length === 2) {
            // console.log(drawnPoints);
            drawLineSeg(drawnPoints);
            drawnPoints.shift();
        }
        drawPoint(ev);
        drawnPoints.push({ x: ev.offsetX, y: ev.offsetY });
        mouseDisplayer.innerText = `(${ev.offsetX},${ev.offsetY})`;
    } else {
        drawnPoints = [];
    }
});
window.addEventListener("keypress", ev => {
    if (ev.key.toLowerCase() == "r") {
        clear();
    }
});
function drawPoint(ev) {
    canvasCtx = canvas.getContext("2d");
    canvasCtx.lineWidth = 0.0;
    canvasCtx.lineCap = "round";
    canvasCtx.beginPath();
    canvasCtx.moveTo(ev.offsetX, ev.offsetY);
    canvasCtx.lineTo(ev.offsetX, ev.offsetY);
    canvasCtx.stroke();
}
function drawLineSeg(drawnPoints) {
    canvasCtx = canvas.getContext("2d");
    canvasCtx.lineWidth = 5.0;
    canvasCtx.lineCap = "round";
    lastPoint = drawnPoints[0];
    curPoint = drawnPoints[1];
    canvasCtx.beginPath();
    canvasCtx.moveTo(lastPoint.x, lastPoint.y);
    canvasCtx.lineTo(curPoint.x, curPoint.y);
    canvasCtx.stroke();
}
function clear(ev) {
    canvasCtx = canvas.getContext("2d");
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}
