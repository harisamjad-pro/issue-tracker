"use client";
import { IssueDeleteAPI } from '@/lib/api/issues';
import { Issues } from '@/lib/types/issues';
import { useRouter } from 'next/navigation';
import React from 'react';
import { TbPencil, TbTrash } from 'react-icons/tb';

export const DeleteButtonIcon = ({ id }: { id: string }) => {
  const router = useRouter();

  type deleteIssueResult = Issues[] | { error: string };

  const deleteIssue = async (): Promise<deleteIssueResult> => {
    try {
      const result = await IssueDeleteAPI(id);
      if ("error" in result) alert("Error deleting issue: " + result.error);

      router.refresh();
      return [];
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Unknown error" };
    }
  }

  return <TbTrash onClick={() => deleteIssue()} className="text-gray-500 size-8 p-2 rounded-full cursor-pointer hover:bg-red-50 hover:text-red-800" />;
};

export const EditButtonIcon = () => {
  return <TbPencil className="text-gray-500 size-8 p-2 rounded-full cursor-pointer hover:bg-yellow-50 hover:text-yellow-800" />;
}


// export const DeleteButtonIcon = ({ onDelete }: { onDelete: () => void }) => {