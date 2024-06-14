import Image, { ImageProps } from "next/image";
import type { Settings } from "../types";

type ImagePreviewProps = {
  image: ImageProps | null;
  settings: Settings;
};

const ImagePreview = ({ image, settings }: ImagePreviewProps) => {
  if (!image) {
    return null;
  }

  const { src, width, height } = image;
  const { padding, borderRadius, shadow } = settings;

  const previewStyle = {
    padding: `${padding}px`,
    borderRadius: `${borderRadius}px`,
    boxShadow: `0 0 ${shadow}px rgba(0, 0, 0, 0.5)`,
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <Image
        src={src}
        alt="Preview"
        style={previewStyle}
        width={width}
        height={height}
        layout="responsive"
      />
    </div>
  );
};

export default ImagePreview;
