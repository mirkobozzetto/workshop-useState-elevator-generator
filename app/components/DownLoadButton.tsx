import type { DownLoadButtonProps } from "../types";
import { renderPNG } from "../utils/renderPNG";

export const DownLoadButton = ({ image, settings }: DownLoadButtonProps) => {
  const handleDownload = async () => {
    if (image) {
      const { blob } = await renderPNG({ image, settings });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = image.alt;
      link.click();
      // Révoquer l'URL pour libérer la mémoire
      URL.revokeObjectURL(url);
    }
  };

  return (
    <button className="btn" disabled={!image} onClick={handleDownload}>
      Download
    </button>
  );
};
