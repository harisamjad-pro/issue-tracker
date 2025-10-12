import { Issues } from "../types/issues";

export const IssueGetAPI = async (): Promise<Issues[]> =>
  (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/issues`, { method: "GET", cache: "no-store" })).json();

export const IssuePostAPI = async (data: Issues) =>
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/issues`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), });

export const IssuePutAPI = async (data: Issues) =>
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/issues/${data.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), });

export const IssueDeleteAPI = async (id: string) =>
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/issues/${id}`, { method: "DELETE", cache: "no-store" });
