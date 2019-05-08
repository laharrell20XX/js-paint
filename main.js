mouseDisplayer = document.querySelector("p.mouse-position");
var canvas = document.querySelector("canvas");
var canvasClientRect = canvas.getBoundingClientRect()
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
    }
});

canvas.addEventListener("mousedown", ev => {
    drawnPoints.push({ x: ev.offsetX, y: ev.offsetY })
    drawPoint(drawnPoints[0], tool)
})

canvas.addEventListener("mouseup", () => drawnPoints = [])

canvas.addEventListener("mouseleave", ev => {
    ev.preventDefault()
    drawnPoints = []
})

window.addEventListener("keypress", ev => {
    if (ev.key.toLowerCase() == "r") {
        clear();
    }
});

canvas.addEventListener("touchmove", ev => {
    ev.preventDefault()
    tOffsetX = calcOffsetX(ev.touches[0].pageX)
    tOffsetY = calcOffsetY(ev.touches[0].pageY)
    if (drawnPoints.length === 2) {
        // console.log(drawnPoints);
        drawLineSeg(drawnPoints, tool);
        drawnPoints.shift();
    }
    drawnPoints.push({ x: tOffsetX, y: tOffsetY });
    mouseDisplayer.innerText = `(${ev.touches[0].pageX},${ev.touches[0].pageY})`
})

canvas.addEventListener("touchend", ev => {
    drawnPoints = []
})


function calcOffsetX(touchX) {
    return touchX - (canvasClientRect.x - 1)
}
function calcOffsetY(touchY) {
    return touchY - (canvasClientRect.y - 1)
}

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
function drawPoint(drawnPoint, tool) {
    canvasCtx = canvas.getContext("2d");
    canvasCtx.lineWidth = tool.width;
    canvasCtx.lineCap = "round";
    canvasCtx.strokeStyle = tool.color;
    canvasCtx.beginPath();
    canvasCtx.moveTo(drawnPoint.x, drawnPoint.y);
    canvasCtx.lineTo(drawnPoint.x, drawnPoint.y);
    canvasCtx.stroke();
}
function clear() {
    canvasCtx = canvas.getContext("2d");
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}
