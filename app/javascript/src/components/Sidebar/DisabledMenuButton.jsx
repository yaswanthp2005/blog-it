import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Button } from "neetoui";

const DisabledMenuButton = () => (
  <Button
    disabled
    className="!pointer-events-none !cursor-not-allowed rounded-lg !text-gray-300 hover:!bg-transparent hover:!text-gray-300"
    icon={MenuHorizontal}
    iconSize={20}
    style="text"
  />
);

export default DisabledMenuButton;
