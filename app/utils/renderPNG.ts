import type { ImageProps, Settings } from "../types";

export const renderPNG = async ({
  image,
  settings,
}: {
  image: ImageProps;
  settings: Settings;
}) => {
  // Création d'un canvas
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  // Création d'un contexte 2D obligatoire pour dessiner sur le canvas
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  ctx.drawImage(
    // Création d'une image à partir de l'URL de l'image
    await createImageBitmap(await fetch(image.src).then((res) => res.blob())),
    0,
    0
  );

  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = settings.shadow;
  ctx.lineWidth = settings.padding;
  ctx.strokeRect(0, 0, image.width, image.height);

  // Un Blob (Binary Large OBject) est un objet utilisé pour représenter des données qui ne sont pas nécessairement dans un format JavaScript natif
  return {
    blob: await new Promise<Blob>((resolve) =>
      canvas.toBlob((blob) => resolve(blob!), "image/png")
    ),
  };
};