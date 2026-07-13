import { useEffect, useRef } from "react";
import { Stars02 } from "@untitledui/icons";
import { cn } from "../../../lib/utils";
import type { TranscriptLine } from "../../../data/dashboard";

function ListeningIndicator() {
  return (
    <div className="flex items-center justify-center gap-3 rounded-lg border border-dashed border-brand-200 bg-brand-50/40 px-4 py-6 animate-pulse">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-50" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-500" />
      </span>
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-brand-400"
            style={{
              animation: "transcript-wave 1.4s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-brand-700">AI is listening…</span>
    </div>
  );
}

function TypingLine({
  line,
  typedText,
}: {
  line: TranscriptLine;
  typedText: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-3 py-2.5 ring-1 ring-brand-200 transition-all duration-500",
        line.speaker === "engineer"
          ? "ml-4 border-gray-200 bg-white"
          : "mr-4 border-brand-100 bg-brand-50/50"
      )}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-gray-900">{line.speakerName}</span>
        <span className="text-[10px] text-gray-400">{line.timestamp}</span>
      </div>
      <p className="text-sm leading-relaxed text-gray-700">
        {typedText}
        <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-brand-500 align-middle" />
      </p>
    </div>
  );
}

export function LiveTranscriptPanel({
  lines,
  isLive,
  listening,
  typingLine,
  typedText,
}: {
  lines: TranscriptLine[];
  isLive: boolean;
  listening?: boolean;
  typingLine?: TranscriptLine | null;
  typedText?: string;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines.length, typedText, listening]);

  return (
    <div className="flex h-full flex-col">
      <style>{`
        @keyframes transcript-wave {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>

      {isLive ? (
        <div className="flex items-center gap-2 border-b border-gray-200 bg-brand-50 px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
          </span>
          <Stars02 className="h-3.5 w-3.5 text-brand-600" />
          <span className="text-xs font-medium text-brand-800">Capturing live transcript…</span>
        </div>
      ) : null}

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {lines.length === 0 && !listening && !typingLine ? (
          <p className="text-center text-sm text-gray-500">
            Waiting for conversation to begin…
          </p>
        ) : null}

        {lines.map((line) => (
          <div
            key={line.id}
            className={cn(
              "rounded-lg border px-3 py-2.5 transition-opacity duration-700",
              line.speaker === "engineer"
                ? "ml-4 border-gray-200 bg-white"
                : "mr-4 border-brand-100 bg-brand-50/50"
            )}
          >
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-gray-900">{line.speakerName}</span>
              <span className="text-[10px] text-gray-400">{line.timestamp}</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-700">{line.text}</p>
          </div>
        ))}

        {listening ? <ListeningIndicator /> : null}

        {typingLine && typedText !== undefined ? (
          <TypingLine line={typingLine} typedText={typedText} />
        ) : null}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
