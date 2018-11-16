// mouseDisplayer = document.querySelector("p.mouse-position");
var canvas = document.querySelector("canvas");
document.addEventListener("mousemove", ev => {
    if (ev.buttons == 1) {
        draw(ev);
        // mouseDisplayer.innerText = `(${ev.clientX},${ev.clientY})`;
    }
});
function draw(ev) {
    canvasCtx = canvas.getContext("2d");
    canvasCtx.lineWidth = 5.0;
    canvasCtx.lineCap = "round";
    canvasCtx.beginPath();
    canvasCtx.moveTo(ev.clientX - 6, ev.clientY - 6);
    canvasCtx.lineTo(ev.clientX - 6, ev.clientY - 6);
    canvasCtx.stroke();
}
