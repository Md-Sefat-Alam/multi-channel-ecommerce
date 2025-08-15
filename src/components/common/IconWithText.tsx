import { ReactNode } from "react";

type Props = { icon: ReactNode; text: string; smHiddenText?: boolean };

export default function IconWithText({ icon, text, smHiddenText }: Props) {
  return (
    <div className="flex gap-1 justify-center items-center select-none cursor-pointer">
      <span className="text-[--secondary] text-lg sm:text-xl">{icon}</span>{" "}
      <p
        className={`!text-[--primary] ${smHiddenText ? "hidden lg:block" : ""
          }`}
      >
        {text}
      </p>
    </div>
  );
}
