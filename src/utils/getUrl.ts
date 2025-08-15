import { BASE_URL } from "@/constant/Defaults";

export default function ({ path }: { path: string }) {
    if(path.includes('http')){
        return path
    }
    const replaced = path?.replace(/\\/g, "/");
    return BASE_URL + "/" + replaced;
}
