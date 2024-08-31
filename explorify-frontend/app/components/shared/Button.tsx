import React from "react";
import Link from "next/link";

interface ButtonProps {
  text: string;
  color?: string;
  textColor?: string;
  hoverColor?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  color = "bg-blue-500",
  textColor = "text-white",
  hoverColor = "bg-blue-600",
  onClick,
  size = "md",
  href,
}) => {
  let sizeClasses;

  switch (size) {
    case "sm":
      sizeClasses = "px-3 py-1 text-sm";
      break;
    case "lg":
      sizeClasses = "px-5 py-3 text-lg";
      break;
    case "md":
    default:
      sizeClasses = "px-4 py-2 text-base";
  }

  const buttonClasses = `inline-block bg-black ${textColor} ${sizeClasses} font-semibold rounded-full shadow-md hover:${hoverColor} focus:outline-none focus:ring-2 focus:ring-blue-400`;

  return href ? (
    <Link href={href} className={buttonClasses}>
      {text}
    </Link>
  ) : (
    <button onClick={onClick} className={buttonClasses}>
      {text}
    </button>
  );
};
