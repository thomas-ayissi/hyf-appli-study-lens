// https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
const body = document.body,
  html = document.documentElement;

const height = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
);

const width = Math.max(
  body.scrollWidth,
  body.offsetWidth,
  html.clientWidth,
  html.scrollWidth,
  html.offsetWidth
);

const cfd = new CanvasFreeDrawing.default({
  elementId: "cfd",
  width,
  height,
  showWarnings: true,
  lineWidth: 2,
  transparent: true,
  strokeColor: [255, 255, 255],
});

cfd.canvas.getContext("2d").fillStyle = "hsla(0, 0%, 100%, 0)";

document.getElementById("clear").addEventListener("click", () => cfd.clear());
document.getElementById("undo").addEventListener("click", () => cfd.undo());
document.getElementById("redo").addEventListener("click", () => cfd.redo());

document
  .getElementById("white")
  .addEventListener("click", () => cfd.setDrawingColor([255, 255, 255]));
document
  .getElementById("red")
  .addEventListener("click", () => cfd.setDrawingColor([255, 0, 0]));
document
  .getElementById("green")
  .addEventListener("click", () => cfd.setDrawingColor([0, 255, 0]));
document
  .getElementById("blue")
  .addEventListener("click", () => cfd.setDrawingColor([114, 223, 250]));
document
  .getElementById("orange")
  .addEventListener("click", () => cfd.setDrawingColor([255, 179, 0]));

document.getElementsByClassName("code-toolbar")[0].style.zIndex = 20;
