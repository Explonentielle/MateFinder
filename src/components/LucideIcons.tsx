import React from "react";
import * as Icons from "lucide-react";

export type IconName = keyof typeof Icons;

interface LucideIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

const LucideIcons: React.FC<LucideIconProps> = ({ name, size = 16, color = "currentColor" }) => {
  const IconComponent = Icons[name] as React.FC<{ size?: number; color?: string }>;

  if (!IconComponent) {
    return <span>Icon not found</span>;
  }

  return <IconComponent size={size} color={color} />;
};

export default LucideIcons;
