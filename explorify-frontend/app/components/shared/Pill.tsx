import { FC } from "react";

interface Pill {
  content: string;
  color?: string;
  textColor?: string;
}

export const Pill: FC<Pill> = ({
  content,
  color = "bg-black",
  textColor = "text-white",
}) => {
  return (
    <span
      className={`inline-block ${color} ${textColor} px-3 py-1 text-sm font-semibold rounded-full m-1`}
    >
      {content}
    </span>
  );
};
