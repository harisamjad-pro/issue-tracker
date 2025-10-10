import { IssueGetAPI } from "@/lib/api/issues";
import { Issues } from "@/lib/types/issues";
import { Suspense } from "react";
import { DeleteButton } from "./components/Button";

type FetchIssuesResult = Issues[] | { error: string };

const fetchIssues = async (): Promise<FetchIssuesResult> => {
  try {
    return await IssueGetAPI();
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};

const List = async () => {
  const issues = await fetchIssues();

  return (
    <div className={("error" in issues) ? "bg-red-600 h-dvh" : ""}>
      {"error" in issues ? (
        <p className="text-red-600 text-center font-semibold">{issues.error}</p>
      ) : Array.isArray(issues) && issues.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {issues.map((issue) => (
            <div key={issue.id} className="border rounded-xl px-6 py-4">
              <h2 className="text-xl font-semibold">{issue.title}</h2>
              <DeleteButton title="Delete" />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No issues found 🎉</p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Issue Tracker</h1>
      <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
        <List />
      </Suspense>
    </div>
  );
}