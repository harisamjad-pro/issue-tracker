import { Suspense } from "react";
import { IssueGetAPI } from "@/lib/api/issues";
import { Issues } from "@/lib/types/issues";
import { DeleteButtonIcon, EditButtonIcon } from './components/Button';
import Link from "next/link";
import { TbChevronsUp } from "react-icons/tb";

type FetchIssuesResult = Issues[] | { error: string };

const fetchIssues = async (): Promise<FetchIssuesResult> => {
  try {
    return await IssueGetAPI();
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};

const thead = [{ name: "Details", span: 3 }, { name: "Priority", span: 1 }, { name: "Status", span: 1 }, { name: "Assignee", span: 1 }, { name: "Project", span: 1 }];

const List = async () => {
  const issues = await fetchIssues();

  return (
    <div className={("error" in issues) ? "bg-red-600 h-dvh" : ""}>
      {!("error" in issues) ? (
        Array.isArray(issues) && issues.length > 0 ? (
          <div className="grid border border-gray-200 rounded-xl">
            {/* title */}
            <div className="px-6 py-4 flex items-center gap-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-black">Issues list</h2>
              <span className="text-xs font-medium text-blue-800 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5">{issues.length > 0 ? issues.length : 0} items</span>
            </div>
            {/* head */}
            <div className="text-sm font-medium text-gray-600 grid grid-cols-8 gap-6 bg-gray-50 px-6 py-2">
              {thead.map((head) => <div key={head.name} className={`col-span-${head.span}`}><p>{head.name}</p></div>)}
            </div>
            {/* body */}
            <div className="bg-transparent divide-y divide-gray-200 rounded-b-xl border-t border-gray-200 text-black font-normal">
              {issues.map((issue) => (
                <div key={issue.id} className="grid grid-cols-8 items-center gap-6 px-6 py-2 group hover:bg-gray-50">
                  <div className="col-span-3">
                    <Link href={`/details/${issue.slug}`} className="text-sm font-medium text-blue-800 hover:underline">{issue.title}</Link>
                  </div>
                  <div className="col-span-1">
                    <span className={`flex items-center gap-0.5 text-sm font-medium
                      ${issue.priority === "High" && "text-red-600"}
                      ${issue.priority === "Medium" && "text-yellow-600"}
                      ${issue.priority === "Low" && "text-green-600"}
                    `}>
                      <TbChevronsUp className="size-4 -ms-1" />{issue.priority}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <div className={`flex items-center gap-1 w-fit text-xs font-medium border rounded-full px-2 py-0.5
                      ${issue.status === "Open" && "text-green-800 bg-green-50 border-green-200"}
                      ${issue.status === "Progress" && "text-yellow-800 bg-yellow-50 border-yellow-200"}
                      ${issue.status === "Closed" && "text-gray-800 bg-gray-50 border-gray-200"}
                    `}>
                      <div className={`size-1.5 rounded-full
                        ${issue.status === "Open" && "bg-green-400"}
                        ${issue.status === "Progress" && "bg-yellow-400"}
                        ${issue.status === "Closed" && "bg-gray-400"}`}
                      ></div>
                      {issue.status}
                    </div>
                  </div>
                  <div className="col-span-1"><p className="text-sm font-normal text-gray-600">Alex</p></div>
                  <div className="col-span-1"><p className="text-sm font-normal text-gray-600">{issue.projects?.title ? issue.projects?.title : "-"}</p></div>
                  <div className="col-span-1 flex items-center justify-end opacity-0 group-hover:opacity-100">
                    <EditButtonIcon id={issue.id} />
                    <DeleteButtonIcon id={issue.id} />
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
    <div className="px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Issue Tracker</h1>
      <Suspense fallback={<div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 inline-block animate-pulse">Loading...</div>}>
        <List />
      </Suspense>
    </div>
  );
}