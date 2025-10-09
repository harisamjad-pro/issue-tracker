import { Issues } from "../types/issues";

const API_BASE_URL = "http://localhost:3000/api/issues";

export const IssueGetAPI = async (): Promise<Issues[]> => {
  const response = await fetch(API_BASE_URL, { method: "GET", cache: "no-store" });
  if (!response.ok) throw new Error(`Failed fetching data request :( ${response.status} ${response.statusText}`);   // Handle non-2xx HTTP responses
  return response.json();
}

export const IssuePostAPI = async (data: Issues) => {
  return await fetch(API_BASE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), });
}

export const IssuePutAPI = async (data: Issues) => {
  return await fetch(`${API_BASE_URL}/${data.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), });
}

export const IssueDeleteAPI = async (id: string) => {
  return await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE", cache: "no-store" });
}
