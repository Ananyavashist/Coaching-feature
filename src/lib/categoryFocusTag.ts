import { cn } from "./utils";

export function categoryFocusTagClass(tag: string): string {
  const key = tag.toLowerCase();
  if (key.includes("engineering")) {
    return "border-sky-200 bg-sky-50 text-sky-800";
  }
  if (key.includes("trust") || key.includes("integrity")) {
    return "border-pink-200 bg-pink-50 text-pink-800";
  }
  if (key.includes("innovat") || key.includes("strategic")) {
    return "border-violet-200 bg-violet-50 text-violet-800";
  }
  return "border-gray-200 bg-gray-50 text-gray-700";
}

export function categoryFocusTagCn(tag: string, className?: string) {
  return cn(
    "inline-flex items-center rounded-[6px] border p-1.5 text-xs font-medium shrink-0",
    categoryFocusTagClass(tag),
    className
  );
}