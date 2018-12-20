mouseDisplayer = document.querySelector("p.mouse-position");
var canvas = document.querySelector("canvas");
var drawnPoints = [];
var tool = {
    type: "brush",
    color: "black",
    width: 5.0
};
var colorChanger = document.querySelectorAll(".color-changer button");
var toolStatusDisplayer = document.querySelector("#brush-display");
var toolColorDisplayer = toolStatusDisplayer.querySelector(".brush-color");
colorChanger.forEach(button =>
    button.addEventListener("click", () => {
        tool.color = button.getAttribute("value");
        toolColorDisplayer.style.backgroundColor = tool.color;
    })
);

canvas.addEventListener("mousemove", ev => {
    if (ev.buttons == 1) {
        if (drawnPoints.length === 2) {
            // console.log(drawnPoints);
            drawLineSeg(drawnPoints, tool);
            drawnPoints.shift();
        }
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

function drawLineSeg(drawnPoints, tool) {
    canvasCtx = canvas.getContext("2d");
    canvasCtx.lineWidth = tool.width;
    canvasCtx.lineCap = "round";
    canvasCtx.strokeStyle = tool.color;
    var lastPoint = drawnPoints[0];
    var curPoint = drawnPoints[1];
    canvasCtx.beginPath();
    canvasCtx.moveTo(lastPoint.x, lastPoint.y);
    canvasCtx.lineTo(curPoint.x, curPoint.y);
    canvasCtx.stroke();
}
function clear() {
    canvasCtx = canvas.getContext("2d");
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}
