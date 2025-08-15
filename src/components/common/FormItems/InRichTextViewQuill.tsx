"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import "react-quill/dist/quill.snow.css";

interface Props {
  content: string; // HTML string from Quill editor
  className?: string;
  style?: React.CSSProperties;
  collapsedHeight?: number; // the “standard” height you want before expanding
  showGradientFade?: boolean; // add a subtle fade when collapsed
}

function InRichTextViewQuillExpandable({
  content,
  className = "",
  style = {},
  collapsedHeight = 240,
  showGradientFade = true,
}: Props) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [needExpand, setNeedExpand] = useState(false);

  useEffect(() => {
    if (!viewerRef.current) return;

    // Inject HTML
    viewerRef.current.innerHTML = content || "";

    // After injecting, decide whether we need the expand button
    const el = viewerRef.current;
    const check = () => {
      // Use scrollHeight to know the "real" height
      setNeedExpand(el.scrollHeight > collapsedHeight);
    };

    check();

    // In case fonts/images inside the HTML change the height later
    const ro = new ResizeObserver(check);
    ro.observe(el);

    return () => ro.disconnect();
  }, [content, collapsedHeight]);

  if (!content) {
    return (
      <div className={`text-gray-500 italic ${className}`} style={style}>
        No content available.
      </div>
    );
  }

  const collapsedStyle: React.CSSProperties = !expanded
    ? {
        maxHeight: collapsedHeight,
        overflow: "hidden",
        ...(showGradientFade
          ? {
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0))",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0))",
            }
          : {}),
      }
    : {};

  return (
    <div style={{ ...style }}>
      <div
        ref={viewerRef}
        className={`ql-editor ${className}`}
        style={{
          padding: "10px",
          minHeight: "auto",
          border: "none",
          ...collapsedStyle,
        }}
        aria-expanded={expanded}
      />
      {needExpand && (
        <div style={{ marginTop: 8 }}>
          <Button
            type='link'
            size='small'
            onClick={() => {
              if (expanded) {
                setExpanded(false);
                // Scroll into view after collapsing
                setTimeout(() => {
                  viewerRef.current?.nextElementSibling?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }, 0);
              } else {
                setExpanded(true);
              }
            }}
          >
            {expanded ? "Show less" : "Show more"}
          </Button>
        </div>
      )}
    </div>
  );
}

export default InRichTextViewQuillExpandable;
