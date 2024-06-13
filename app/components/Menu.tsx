"use client";

import type { Image, Settings } from "@/app/types";
import { ChangeEvent, useState } from "react";

const Menu = () => {
  const [image, setImage] = useState<Image | null>(null);
  const [settings, setSettings] = useState<Settings>({
    padding: 0,
    borderRadius: 0,
    shadow: 0,
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          setImage({
            src: reader.result as string,
            width: img.width,
            height: img.height,
          });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSettingsChange = (key: keyof Settings, value: number) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col m-6">
      <h1 className="font-bold text-2xl">Settings</h1>
      <label className="relative my-3 w-[350px] h-8 text-xs cursor-pointer file-input file-input-primary">
        <span className="absolute inset-0 flex justify-center items-center">
          Choisir un fichier
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="opacity-0"
        />
      </label>

      <label className="flex flex-col my-3">
        <span>Padding :</span>
        <input
          type="range"
          min={0}
          max={99}
          value={settings.padding}
          onChange={(e) =>
            handleSettingsChange("padding", Number(e.target.value))
          }
          className="w-[350px] slider slider-primary"
        />
      </label>

      <label className="flex flex-col my-3">
        <span>Border Radius :</span>
        <input
          type="range"
          min={0}
          max={99}
          value={settings.borderRadius}
          onChange={(e) =>
            handleSettingsChange("borderRadius", Number(e.target.value))
          }
          className="w-[350px] h-3 slider slider-primary"
        />
      </label>

      <label className="flex flex-col my-3">
        <span>Shadow :</span>
        <input
          type="range"
          min={0}
          max={99}
          value={settings.shadow}
          onChange={(e) =>
            handleSettingsChange("shadow", Number(e.target.value))
          }
          className="w-[350px] h-3 slider slider-primary"
        />
      </label>
    </div>
  );
};

export default Menu;
