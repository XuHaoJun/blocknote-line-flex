/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./editor"), {
  ssr: false,
});

export default function Home() {
  const [content, setContent] = React.useState([
    {
      type: "heading",
      props: { level: 1 },
      content: [
        {
          type: "text",
          text: "Welcome to My Document",
          styles: { bold: true, underline: true },
        },
      ],
    },
  ]);
  React.useEffect(() => {
    console.log(content);
  }, [content]);
  return (
    <main className="container mx-auto py-8">
      <div className="flex flex-col gap-4">
        <Editor content={content} onChange={setContent} />
        <div className="border border-gray-200 rounded-md p-4">
          <pre>
            {JSON.stringify(blockNoteToLineFlexMessage(content), null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}

// Define types for LINE Flex Message components
type FlexText = {
  type: "text";
  text: string;
  size?: string;
  weight?: string;
  wrap?: boolean;
  margin?: string;
  flex?: number;
};

type FlexImage = {
  type: "image";
  url: string;
  size: string;
  aspectMode: string;
};

type FlexBox = {
  type: "box";
  layout: string;
  contents: FlexComponent[];
  margin?: string;
};

type FlexComponent = FlexText | FlexImage | FlexBox;

type FlexBubble = {
  type: "bubble";
  body: FlexBox;
};

type FlexMessage = {
  type: "flex";
  altText: string;
  contents: FlexBubble;
};

// Convert BlockNote data to LINE Flex Message format
function blockNoteToLineFlexMessage(blockNoteData: any): FlexMessage {
  // Default container for the Flex Message
  const flexMessage: FlexMessage = {
    type: "flex",
    altText: "Block Content", // Can be customized
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [],
      },
    },
  };

  // Process each block and convert to LINE Flex components
  function processBlocks(blocks: any[]) {
    return blocks.map((block, index) => {
      // Handle different block types
      switch (block.type) {
        case "paragraph":
          return processParagraph(block);
        case "heading":
          return processHeading(block);
        case "bulletListItem":
          return processBulletList(block);
        case "numberedListItem":
          return processNumberedList(block, index);
        case "image":
          return processImage(block);
        default:
          return processParagraph(block); // Default to paragraph handling
      }
    });
  }

  // Process paragraph blocks
  function processParagraph(block: any): FlexText {
    return {
      type: "text",
      text: getTextContent(block.content),
      wrap: true,
      size: "sm",
    };
  }

  // Process heading blocks
  function processHeading(block: any): FlexText {
    const sizes: Record<number, string> = {
      1: "xl",
      2: "lg",
      3: "md",
    };

    return {
      type: "text",
      text: getTextContent(block.content),
      weight: "bold",
      size: sizes[block.props.level as number] || "md",
      margin: "md",
    };
  }

  // Process bullet list items
  function processBulletList(block: any): FlexBox {
    return {
      type: "box",
      layout: "horizontal",
      contents: [
        {
          type: "text",
          text: "•",
          size: "sm",
          flex: 1,
        },
        {
          type: "text",
          text: getTextContent(block.content),
          wrap: true,
          size: "sm",
          flex: 12,
        },
      ],
    };
  }

  // Process numbered list items
  function processNumberedList(block: any, index: number): FlexBox {
    return {
      type: "box",
      layout: "horizontal",
      contents: [
        {
          type: "text",
          text: `${index + 1}.`,
          size: "sm",
          flex: 1,
        },
        {
          type: "text",
          text: getTextContent(block.content),
          wrap: true,
          size: "sm",
          flex: 12,
        },
      ],
    };
  }

  // Process image blocks
  function processImage(block: any): FlexImage {
    return {
      type: "image",
      url: block.props.url,
      size: "full",
      aspectMode: "cover",
    };
  }

  // Extract text content from block content array
  function getTextContent(content: any) {
    if (!content) return "";

    return content
      .map((item: any) => {
        if (typeof item === "string") return item;
        if (item.text) return item.text;
        return "";
      })
      .join("");
  }

  // Process all blocks and add to flex message
  const processedBlocks = processBlocks(blockNoteData);
  flexMessage.contents.body.contents = processedBlocks;

  return flexMessage;
}

// Example usage:
const blockNoteExample = [
  {
    type: "heading",
    props: { level: 1 },
    content: [{ text: "Welcome to My Document" }],
  },
  {
    type: "paragraph",
    content: [{ text: "This is a sample paragraph with some text content." }],
  },
  {
    type: "bulletListItem",
    content: [{ text: "First bullet point" }],
  },
  {
    type: "numberedListItem",
    content: [{ text: "First numbered item" }],
  },
];

// const flexMessage = blockNoteToLineFlexMessage(blockNoteExample);
// console.log(JSON.stringify(flexMessage, null, 2));
