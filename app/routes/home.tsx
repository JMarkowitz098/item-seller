import type { Route } from "./+types/home";
import { Welcome, loader as welcomeLoader } from "~/welcome/welcome";

export const loader = welcomeLoader;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Stuff" },
    { name: "description", content: "My items collection" },
  ];
}

export default Welcome;
