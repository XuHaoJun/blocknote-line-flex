/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

export default function Editor({ content, onChange }: any) {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: content,
  });

  return (
    <div className="border border-gray-200 rounded-md">
      <BlockNoteView
        className="min-h-[300px]"
        editor={editor}
        theme={"light"}
        onChange={() => {
          onChange(editor.document);
        }}
      />
    </div>
  );
}
