"use client";

import { useState } from "react";

const Menu = () => {
  const [value, setValue] = useState(40);

  return (
    <div className="flex flex-col m-6">
      <input
        type="text"
        className="my-3 pl-4 w-1/6 h-5 file-input file-input-primary"
        placeholder="la vie est belle"
      />
      <input
        type="range"
        min={0}
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="my-3 w-1/6 h-3 slider slider-primary"
      />
    </div>
  );
};
export default Menu;
