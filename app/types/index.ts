export type Image = {
  src: string;
  width: number;
  height: number;
};

export type Settings = {
  padding: number;
  borderRadius: number;
  shadow: number;
};

export type DownLoadButtonProps = {
  image: Image | null;
  settings: Settings;
};
