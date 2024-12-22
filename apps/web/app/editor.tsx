"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

export default function Editor() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "test",
      },
    ]
  });
  console.log(editor.document);

  return (
    <div className="border border-gray-200 rounded-md">
      <BlockNoteView
        className="min-h-[300px]"
        editor={editor}
        theme={"light"}
      />
    </div>
  );
}
