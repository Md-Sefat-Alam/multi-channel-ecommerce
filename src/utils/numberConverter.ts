import { ITrans } from "@/types/common";

export const convertNumber = (tr: ITrans, number: string) => {
  const numberStr = number.split("").map((item) => {
    if (item === " " || item === "+" || item === "," || item === "-") {
      return item;
    }
    return tr(item);
  });
  return numberStr.join("");
};
