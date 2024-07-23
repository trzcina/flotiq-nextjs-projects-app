'use client'

import { usePathname } from "next/navigation";

export default function DraftModeToolbar() {
  const pathName = usePathname();

  return (
    <div className="fixed top-0 right-0 py-2 px-4 bg-red-500">
      <p>Draft mode enabled</p>
      <a href={`/api/draft/?disable=true&slug=${pathName}`}>Disable</a>
    </div>
  )
}