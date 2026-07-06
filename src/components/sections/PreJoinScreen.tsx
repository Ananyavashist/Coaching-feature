import { useState } from "react";
import {
  MicrophoneOff01,
  Microphone01,
  VideoRecorderOff,
  VideoRecorder,
  Stars02,
  ArrowLeft,
  MessageChatCircle,
} from "@untitledui/icons";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import { currentUser, type CoachingSession } from "../../data/dashboard";

export function PreJoinScreen({
  session,
  onJoin,
  onBack,
}: {
  session: CoachingSession;
  onJoin: (opts: { transcript: boolean; goBy: string }) => void;
  onBack: () => void;
}) {
  const [muted, setMuted] = useState(true);
  const [videoOn, setVideoOn] = useState(false);
  const [goBy, setGoBy] = useState(currentUser.name);
  const [transcript, setTranscript] = useState(false);

  return (
    <div className="fixed inset-0 z-[60] flex min-h-screen flex-col overflow-y-auto bg-white">
      <div className="absolute left-0 top-0 flex items-center px-4 py-4 sm:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          Back
        </button>
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-8 px-4 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Video preview */}
        <div className="relative flex aspect-video w-full items-center justify-center rounded-2xl bg-gray-100">
          {videoOn ? (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <VideoRecorder className="h-8 w-8" />
              <span className="text-sm">Camera preview</span>
            </div>
          ) : (
            <span className="text-2xl font-medium text-gray-500">{goBy}</span>
          )}

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3">
            <button
              onClick={() => setMuted((m) => !m)}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {muted ? (
                <MicrophoneOff01 className="h-4.5 w-4.5 text-gray-500" />
              ) : (
                <Microphone01 className="h-4.5 w-4.5 text-gray-500" />
              )}
              {muted ? "Unmute" : "Mute"}
            </button>
            <button
              onClick={() => setVideoOn((v) => !v)}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {videoOn ? (
                <VideoRecorder className="h-4.5 w-4.5 text-gray-500" />
              ) : (
                <VideoRecorderOff className="h-4.5 w-4.5 text-gray-500" />
              )}
              {videoOn ? "Stop video" : "Start video"}
            </button>
          </div>
        </div>

        {/* Join panel */}
        <div className="w-full">
          <p className="mb-3 text-left text-[18px] font-semibold text-gray-900">
            Coaching session with {session.managerName}
          </p>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="text-base font-semibold text-gray-900">Ready to join?</h2>
            <p className="mt-1.5 text-[14px] leading-relaxed text-gray-600">
              This meeting is shared between you and {session.managerName} and will not be used
              for performance evaluation, this is solely for your growth and learning.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-gray-600">
              You're signed in. You can optionally update how you appear in this meeting.
            </p>

            <label className="mt-4 block text-[14px] font-medium text-gray-700">
              What would you like to go by?
            </label>
            <input
              value={goBy}
              onChange={(e) => setGoBy(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-lg border border-gray-300 px-3.5 text-[14px] text-gray-900 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-100"
            />

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => setTranscript((t) => !t)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  transcript
                    ? "border-brand-300 bg-brand-50 text-brand-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                )}
              >
                <Stars02 className="h-4.5 w-4.5" />
                {transcript ? "AI transcript on" : "Enable AI transcript"}
              </button>

              <Button onClick={() => onJoin({ transcript, goBy })}>
                <MessageChatCircle className="h-4.5 w-4.5" />
                Join now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
