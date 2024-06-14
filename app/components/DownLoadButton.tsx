import type { DownLoadButtonProps } from "../types";
import { renderPNG } from "../utils/renderPNG";

export const DownLoadButton = ({ image, settings }: DownLoadButtonProps) => {
  const handleDownload = async () => {
    if (image) {
      const { blob } = await renderPNG({ image, settings });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "image.png";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <button className="btn" disabled={!image} onClick={handleDownload}>
      Download
    </button>
  );
};
