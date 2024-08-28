"use client";

import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TruncatedTextProps {
  text: string;
  maxLength: number;
}

export function TruncatedText({ text, maxLength }: TruncatedTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  const truncatedText = isExpanded ? text : `${text.slice(0, maxLength)}...`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {truncatedText}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isExpanded ? "Click to collapse" : "Click to expand"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
