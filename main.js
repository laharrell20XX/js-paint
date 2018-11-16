mouseDisplayer = document.querySelector("p.mouse-position");
var canvas = document.querySelector("canvas");
canvas.addEventListener("mousemove", ev => {
    if (ev.buttons == 1) {
        draw(ev);
        mouseDisplayer.innerText = `(${ev.clientX},${ev.clientY})`;
    }
});
function draw(ev) {
    canvasCtx = canvas.getContext("2d");
    canvasCtx.lineWidth = 5.0;
    canvasCtx.lineCap = "round";
    canvasCtx.beginPath();
    canvasCtx.moveTo(ev.offsetX, ev.offsetY);
    canvasCtx.lineTo(ev.offsetX, ev.offsetY);
    canvasCtx.stroke();
}
