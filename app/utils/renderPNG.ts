import type { ImageProps, Settings } from "../types";
export const renderPNG = async ({
  image,
  settings,
}: {
  image: ImageProps;
  settings: Settings;
}) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Dessiner l'image sur le canvas
  const img = await createImageBitmap(
    await fetch(image.src).then((res) => res.blob())
  );
  ctx.drawImage(img, settings.padding, settings.padding);

  // Appliquer les styles de l'aperçu
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = settings.shadow;
  ctx.lineWidth = settings.padding * 2;
  ctx.strokeStyle = "transparent";
  ctx.strokeRect(
    settings.padding,
    settings.padding,
    image.width - settings.padding * 2,
    image.height - settings.padding * 2
  );

  // Appliquer le border-radius
  ctx.globalCompositeOperation = "destination-in";
  ctx.beginPath();
  ctx.roundRect(
    settings.padding,
    settings.padding,
    image.width - settings.padding * 2,
    image.height - settings.padding * 2,
    // settings.borderRadius
    Math.min(settings.borderRadius, Math.min(image.width, image.height) / 2)
  );
  ctx.closePath();
  ctx.fill();

  // Retourner l'objet avec la propriété blob
  return {
    blob: await new Promise<Blob>((resolve) =>
      canvas.toBlob((blob) => resolve(blob!), "image/png")
    ),
  };
};
