"use client";

import { IssueDeleteAPI } from '@/lib/api/issues';
// import { Issues } from '@/lib/types/issues';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { TbPencil, TbTrash } from 'react-icons/tb';

const deleteIssueConfirm = async (id: string, router: AppRouterInstance) => {
  try {
    const result = await IssueDeleteAPI(id);
    if ("error" in result) alert("Error deleting issue: " + result.error);
    router.refresh();
    return [];
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export const DeleteButtonIcon = ({ id }: { id: string }) => {
  const router = useRouter();
  return <TbTrash onClick={() => deleteIssueConfirm(id, router)} className="text-gray-500 size-8 p-2 rounded-full cursor-pointer hover:bg-red-50 hover:text-red-800" />;
};

export const EditButtonIcon = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const handleEditClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modal = open ? createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="bg-white rounded-xl p-6 w-96">
        <h1 className="text-lg font-semibold mb-2">Edit Issue {id}</h1>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to edit this issue?
        </p>
        <button
          onClick={handleClose}
          className="text-sm bg-gray-800 text-white px-4 py-1.5 rounded-lg hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  ) : null;

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