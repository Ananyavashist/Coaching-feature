import { useState } from "react";
import { Send01 } from "@untitledui/icons";
import { currentUser, type CoachingSession } from "../../data/dashboard";

type ChatMessage = {
  id: string;
  author: string;
  text: string;
  time: string;
  self?: boolean;
};

const seedMessages = (session: CoachingSession): ChatMessage[] => [
  {
    id: "m1",
    author: session.managerName,
    text: "Thanks for joining — let's start with the agenda you shared.",
    time: "2:01 PM",
  },
  {
    id: "m2",
    author: currentUser.name,
    text: "Sounds good. I have the patterns and challenge pulled up on the board.",
    time: "2:02 PM",
    self: true,
  },
];

export function MeetingChatPanel({ session }: { session: CoachingSession }) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => seedMessages(session));
  const [draft, setDraft] = useState("");

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        author: currentUser.name,
        text,
        time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        self: true,
      },
    ]);
    setDraft("");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((m) => (
          <div key={m.id} className={m.self ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.self
                  ? "max-w-[85%] rounded-2xl rounded-br-md bg-gray-900 px-3.5 py-2.5 text-white"
                  : "max-w-[85%] rounded-2xl rounded-bl-md border border-gray-200 bg-white px-3.5 py-2.5"
              }
            >
              {!m.self ? (
                <p className="mb-1 text-xs font-semibold text-gray-900">{m.author}</p>
              ) : null}
              <p className={`text-sm leading-relaxed ${m.self ? "text-white" : "text-gray-700"}`}>
                {m.text}
              </p>
              <p
                className={`mt-1 text-xs ${m.self ? "text-gray-300" : "text-gray-400"}`}
              >
                {m.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Type a message…"
            aria-label="Chat message"
            className="h-11 flex-1 rounded-lg border border-gray-300 px-3.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-100"
          />
          <button
            type="button"
            onClick={send}
            aria-label="Send message"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-300"
          >
            <Send01 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
