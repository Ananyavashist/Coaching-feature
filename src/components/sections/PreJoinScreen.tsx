import { useState } from "react";
import {
  MicrophoneOff01,
  Microphone01,
  VideoRecorderOff,
  VideoRecorder,
  ArrowLeft,
  MessageChatCircle,
  InfoCircle,
} from "@untitledui/icons";
import { Button } from "../ui/Button";
import { currentUser, type CoachingSession } from "../../data/dashboard";

function AiTranscriptNotice({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-[6px] border border-brand-200 bg-brand-50 px-3.5 py-2.5 ${className ?? ""}`}
      role="status"
    >
      <InfoCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
      <p className="text-[13px] leading-relaxed text-brand-800">
        AI is transcribing this session in the background to capture notes and key takeaways.
      </p>
    </div>
  );
}

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

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-8 px-4 py-16 sm:px-8 lg:flex-row lg:items-center lg:gap-10">
        {/* Video preview — balanced height with right column */}
        <div className="flex w-full justify-center lg:w-1/2">
          <div className="relative flex aspect-[4/3] w-full max-w-md flex-col rounded-2xl bg-gray-100 lg:aspect-auto lg:min-h-[360px] lg:max-w-lg">
            <div className="flex flex-1 items-center justify-center px-6">
              {videoOn ? (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <VideoRecorder className="h-8 w-8" />
                  <span className="text-sm">Camera preview</span>
                </div>
              ) : (
                <span className="text-center text-2xl font-medium text-gray-500">{goBy}</span>
              )}
            </div>

            <div className="flex shrink-0 items-center justify-center gap-3 px-4 pb-5 pt-2">
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus-visible:border-brand-500"
              >
                {muted ? (
                  <MicrophoneOff01 className="h-4 w-4 text-gray-500" />
                ) : (
                  <Microphone01 className="h-4 w-4 text-gray-500" />
                )}
                {muted ? "Unmute" : "Mute"}
              </button>
              <button
                type="button"
                onClick={() => setVideoOn((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus-visible:border-brand-500"
              >
                {videoOn ? (
                  <VideoRecorder className="h-4 w-4 text-gray-500" />
                ) : (
                  <VideoRecorderOff className="h-4 w-4 text-gray-500" />
                )}
                {videoOn ? "Stop video" : "Start video"}
              </button>
            </div>
          </div>
        </div>

        {/* Session details */}
        <div className="flex w-full flex-col lg:w-1/2">
          <h1 className="text-left text-xl font-semibold text-gray-900 sm:text-[22px]">
            Coaching session with {session.managerName}
          </h1>

          <AiTranscriptNotice className="mt-4" />

          <div
            className="mt-4 rounded-xl border border-gray-200 bg-white p-5"
            data-tour="prejoin-ready"
          >
            <h2 className="text-base font-semibold text-gray-900">Ready to join?</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              This meeting is shared between you and {session.managerName} and will not be used
              for performance evaluation, this is solely for your growth and learning.
            </p>

            <label className="mt-5 block text-sm font-semibold text-gray-700">
              What would you like to go by?
            </label>
            <input
              value={goBy}
              onChange={(e) => setGoBy(e.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-gray-300 px-3.5 text-sm text-gray-900 focus:border-brand-500 focus:outline-none"
            />

            <div className="mt-5 flex justify-end">
              <Button
                data-tour="prejoin-join"
                onClick={() => onJoin({ transcript: true, goBy })}
              >
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
