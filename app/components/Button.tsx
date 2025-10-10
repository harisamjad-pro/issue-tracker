"use client";
import React from 'react'

export const DeleteButton = ({ title }: { title: string }) => {
  return (
    <button className="bg-red-600 text-white px-3 py-1 rounded-full cursor-pointer" onClick={() => alert("Deleted" + " " + title)}>
      {title}
    </button>
  )
}
