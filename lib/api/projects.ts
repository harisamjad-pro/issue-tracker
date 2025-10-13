import { Projects } from "../types/issues";

export const ProjectGetAPI = async (): Promise<Projects[]> =>
  (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, { method: "GET", cache: "no-store" })).json();