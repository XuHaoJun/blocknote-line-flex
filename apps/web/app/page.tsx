"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./editor"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <div className="flex flex-col gap-4">
        <Editor />
        <div className="border border-gray-200 rounded-md">test</div>
      </div>
    </main>
  );
}
