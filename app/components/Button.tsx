"use client";

import { IssueDeleteAPI, IssueSingleGetAPI, IssuePutAPI } from "@/lib/api/issues";
import { ProjectGetAPI } from "@/lib/api/projects";
import { Issues, Projects } from "@/lib/types/issues";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TbPencil, TbTrash } from "react-icons/tb";

/* ------------------------- DELETE LOGIC ------------------------- */
const deleteIssueConfirm = async (id: string, router: AppRouterInstance) => {
  try {
    const result = await IssueDeleteAPI(id);
    if ("error" in result) alert("Error deleting issue: " + result.error);
    else alert("Issue deleted successfully!");
    router.refresh();
  } catch (error) {
    alert(error instanceof Error ? error.message : "Unknown error occurred while deleting");
  }
};

export const DeleteButtonIcon = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <TbTrash
      onClick={() => deleteIssueConfirm(id, router)}
      className="text-gray-500 size-8 p-2 rounded-full cursor-pointer hover:bg-red-50 hover:text-red-800"
    />
  );
};

/* ------------------------- EDIT LOGIC ------------------------- */
export const EditButtonIcon = ({ id }: { id: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [issue, setIssue] = useState<Issues | null>(null);
  const [projects, setProjects] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEditClick = async () => {
    setOpen(true);
    setLoading(true);
    try {
      const data = await IssueSingleGetAPI(id);
      if (data && !("error" in data)) setIssue(data);
      else alert("Failed to fetch issue details");
    } catch (error) {
      alert("Error loading issue details: " + error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await ProjectGetAPI();
      if (Array.isArray(data)) setProjects(data);
    } catch (error) {
      alert("Error loading projects: " + error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setIssue(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!issue) return;

    const formData = new FormData(e.currentTarget);

    // Safe union casting for strict types
    const updatedIssue: Issues = {
      ...issue,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      priority: formData.get("priority") as "High" | "Medium" | "Low",
      status: formData.get("status") as "Open" | "Progress" | "Closed",
      project_id: formData.get("project") as string || null,
    };

    try {
      const res = await IssuePutAPI(updatedIssue);
      if (!res.ok) throw new Error("Failed to update issue");
      alert("Issue updated successfully!");
      router.refresh();
      handleClose();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unknown error updating issue");
    }
  };

  const modal = open
    ? createPortal(
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-1/2">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : issue ? (
            <>
              <h1 className="text-lg font-semibold mb-4">
                Edit Issue: {issue.title}
              </h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="title"
                  defaultValue={issue.title}
                  placeholder="Issue Title"
                  className="text-gray-800 border-2 border-gray-200 focus:outline-none focus:border-blue-600 rounded-lg px-3 py-2 text-base placeholder:text-gray-600"
                  required
                />
                <textarea
                  name="description"
                  defaultValue={issue.description ?? ""}
                  placeholder="Issue Description"
                  className="text-gray-800 border-2 border-gray-200 focus:outline-none focus:border-blue-600 rounded-lg px-3 py-2 text-base placeholder:text-gray-600"
                  rows={3}
                />
                <select
                  name="priority"
                  defaultValue={issue.priority}
                  className="text-gray-800 border-2 border-gray-200 focus:outline-none focus:border-blue-600 rounded-lg px-3 py-2 text-base"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <select
                  name="status"
                  defaultValue={issue.status}
                  className="text-gray-800 border-2 border-gray-200 focus:outline-none focus:border-blue-600 rounded-lg px-3 py-2 text-base"
                >
                  <option value="Open">Open</option>
                  <option value="Progress">Progress</option>
                  <option value="Closed">Closed</option>
                </select>
                <select
                  name="project"
                  defaultValue={issue.project_id ?? ""}
                  className="text-gray-800 border-2 border-gray-200 focus:outline-none focus:border-blue-600 rounded-lg px-3 py-2 text-base"
                >
                  <option value="">No project</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.title}
                    </option>
                  ))}
                </select>

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-300 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Update
                  </button>
                </div>
              </form>
            </>
          ) : (
            <p className="text-center text-red-600">
              Could not load issue data.
            </p>
          )}
        </div>
      </div>,
      document.body
    )
    : null;

  return (
    <>
      <TbPencil
        onClick={handleEditClick}
        className="text-gray-500 size-8 p-2 rounded-full cursor-pointer hover:bg-yellow-50 hover:text-yellow-800"
      />
      {modal}
    </>
  );
};
