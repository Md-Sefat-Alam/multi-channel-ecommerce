import { redirect } from "@/MUST_USE_Navigation";

export default function page() {
    // Trigger the redirect when this component is rendered
    redirect("/");

    return null; // Optionally return null or an empty fragment, as the page will redirect immediately
}
