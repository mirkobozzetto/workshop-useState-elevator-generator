import type { ImageProps, Settings } from "../types";

export const renderPNG = async ({
  image,
  settings,
}: {
  image: ImageProps;
  settings: Settings;
}) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width + settings.padding * 2;
  canvas.height = image.height + settings.padding * 2;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Dessiner un rectangle avec un remplissage transparent
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Créer un nouveau canvas pour dessiner l'image avec le box shadow
  const imageCanvas = document.createElement("canvas");
  imageCanvas.width = image.width;
  imageCanvas.height = image.height;
  const imageCtx = imageCanvas.getContext("2d") as CanvasRenderingContext2D;

  // Dessiner l'image sur le nouveau canvas avec le box shadow
  const img = await createImageBitmap(
    await fetch(image.src).then((res) => res.blob())
  );
  imageCtx.shadowColor = "rgba(0, 0, 0, 0.05)";
  imageCtx.shadowBlur = settings.shadow;
  // drawImage prend en compte le padding pour centrer l'image
  imageCtx.drawImage(img, 0, 0);

  // Appliquer le border-radius à l'image
  imageCtx.globalCompositeOperation = "destination-in";
  imageCtx.beginPath();
  imageCtx.roundRect(0, 0, image.width, image.height, settings.borderRadius);
  imageCtx.closePath();
  imageCtx.fill();

  // Dessiner l'image avec le box shadow et le border-radius sur le canvas principal
  ctx.drawImage(imageCanvas, settings.padding, settings.padding);

  // Retourner l'objet avec la propriété blob
  return {
    blob: await new Promise<Blob>((resolve) =>
      canvas.toBlob((blob) => resolve(blob!), "image/png")
    ),
  };
};
