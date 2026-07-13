import { Stars02 } from "@untitledui/icons";

export function TranscriptSummaryLoading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
        <Stars02 className="h-6 w-6 animate-pulse text-brand-600" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-900">Generating meeting summary</p>
        <p className="mt-1 text-sm text-gray-500">
          AI is analysing the transcript and organising key takeaways…
        </p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 animate-bounce rounded-full bg-brand-500"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
