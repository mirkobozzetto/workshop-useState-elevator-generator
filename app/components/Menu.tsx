"use client";

import type { ImageProps, Settings } from "@/app/types";
import { ChangeEvent, useState } from "react";

const Menu = () => {
  const [image, setImage] = useState<ImageProps | null>(null);
  // ici on utilise useState pour déclarer une variable d'état image qui est initialisée à null
  const [settings, setSettings] = useState<Settings>({
    padding: 0,
    borderRadius: 0,
    shadow: 0,
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // ici on déclare une fonction handleImageUpload qui prend un argument e de type ChangeEvent<HTMLInputElement>
    const file = e.target.files?.[0];
    // file est une variable qui contient le premier fichier de la liste des fichiers sélectionnés par l'utilisateur
    if (file) {
      // si file est défini
      const reader = new FileReader();
      // alors on initialise une nouvelle instance de FileReader
      reader.onload = () => {
        // on définit une fonction qui sera exécutée lorsque le chargement du fichier sera terminé
        const img = new Image();
        // on initialise une nouvelle instance de l'objet Image
        img.onload = () => {
          // lorsque l'image est chargée
          setImage({
            src: reader.result as string,
            width: img.width,
            height: img.height,
            // on met à jour l'état de l'image avec les propriétés src, width et height
          });
        };
        img.src = reader.result as string;
        // on met à jour la propriété src de l'objet Image avec la valeur de reader.result
      };

      // reader.onloadend = function () {
      //   console.log(reader.result);
      // };
      // // le console.log affiche le résultat de la lecture du fichier

      reader.readAsDataURL(file);
      // on lit le contenu du fichier sous forme d'URL de données
    }
  };

  const handleSettingsChange = (key: keyof Settings, value: number) => {
    // ici on déclare une fonction handleSettingsChange qui prend deux arguments: key de type keyof Settings et value de type number
    setSettings((prevSettings) => ({
      // afin de mettre à jour l'état des paramètres, on utilise la fonction setSettings qui prend une fonction en argument
      ...prevSettings,
      // le spread copie les propriétés de l'objet prevSettings
      [key]: value,
      // key est utilisé comme clé pour mettre à jour la valeur de la propriété correspondante
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
