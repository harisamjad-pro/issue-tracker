"use client";
import React from 'react'
import { TbPencil, TbTrash } from 'react-icons/tb';

export const DeleteButton = ({ title }: { title: string }) => {
  return (
    <button className="bg-red-600 text-white px-3 py-1 rounded-full cursor-pointer" onClick={() => alert("Deleted" + " " + title)}>
      {title}
    </button>
  )
}

export const DeleteButtonIcon = () => {
  return (
    <TbTrash className="text-gray-500 size-8 p-2 rounded-full cursor-pointer hover:bg-red-50 hover:text-red-600" />
  )
}

export const EditButtonIcon = () => {
  return (
    <TbPencil className="text-gray-500 size-8 p-2 rounded-full cursor-pointer hover:bg-yellow-50 hover:text-yellow-600" />
  )
}
