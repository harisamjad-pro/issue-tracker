import { IssueGetAPI } from "@/lib/api/issues";
import { Issues } from "@/lib/types/issues";
import { Suspense } from "react";
import { DeleteButton, DeleteButtonIcon, EditButtonIcon } from './components/Button';
import Link from "next/link";

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
      {!("error" in issues) ? (
        Array.isArray(issues) && issues.length > 0 ? (
          <div className="grid border border-gray-200 rounded-xl">
            <div className="px-6 py-4 flex items-center gap-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Issues list</h2> {/* 20px Semibold Black */}
              <span className="text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-0.5">100 items</span>
            </div>
            <div className="text-sm font-medium text-gray-500 grid grid-cols-8 gap-4 bg-gray-50 px-6 py-2">
              <div className="col-span-3"><p>Details</p></div>
              <div className="col-span-1"><p>Priority</p></div>
              <div className="col-span-1"><p>Status</p></div>
              <div className="col-span-1"><p>Assignee</p></div>
              <div className="col-span-1"><p>Project</p></div>
            </div>
            <div className="bg-transparent divide-y divide-gray-200 rounded-b-xl border-t border-gray-200 text-black font-normal">
              {issues.map((issue) => (
                <div key={issue.id} className="grid grid-cols-8 items-center gap-4 px-6 py-2 group hover:bg-gray-50">
                  <div className="col-span-3">
                    <Link href="/" className="text-base font-normal text-black hover:underline group-hover:text-blue-600">{issue.title}</Link>
                    {/* <p className="text-sm font-normal text-gray-600">{issue.description.length > issue.description.slice(0, 60).length && issue.description.slice(0, 64) + "..."}</p> */}
                  </div>
                  <div className="col-span-1"><p className="text-sm font-normal text-gray-600">Low</p></div>
                  <div className="col-span-1"><span className="text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5">{issue.status}</span></div>
                  <div className="col-span-1"><p className="text-sm font-normal text-gray-600">Alex</p></div>
                  <div className="col-span-1"><p className="text-sm font-normal text-gray-600">Project Name</p></div>
                  <div className="col-span-1 flex items-center opacity-0 group-hover:opacity-100">
                    <EditButtonIcon />
                    <DeleteButtonIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : <p className="text-gray-600 text-center">No issues found 🎉</p>
      ) : <p className="text-red-600 text-center font-semibold">{issues.error}</p>
      }
    </div>
  );
}

export default function Home() {
  return (
    <div className="p-8">
      {/* <h1 className="text-3xl font-bold mb-6">Issue Tracker</h1> */}
      <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
        <List />
      </Suspense>
    </div>
  );
}