import html2canvas from "html2canvas";

const CHARACTER_CONTAINER_ID = "character";
const CHARACTER_LAYER_SELECTOR = ".characterLayer";

/** Renders `#character` to a PNG and triggers download (uses first `.characterLayer` for crop bounds). */
export function saveCharacterAsPng(filename = "character.png"): void {
  const container = document.querySelector(`#${CHARACTER_CONTAINER_ID}`);
  const layer = document.querySelector(CHARACTER_LAYER_SELECTOR);
  if (container === null || layer === null) return;

  const xOffset = container.clientWidth - layer.clientWidth;
  const yOffset = container.clientHeight - layer.clientHeight;

  html2canvas(container as HTMLElement, {
    x: xOffset,
    y: yOffset,
    height: layer.clientHeight,
    width: layer.clientWidth
  }).then((canvas: HTMLCanvasElement) => {
    document.body.appendChild(canvas);
    const dataUrl = canvas.toDataURL();
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = filename;
    anchor.click();
    canvas.remove();
  });
}
