import { CloseButton } from "../../CloseButton";

import { FeedbackType, feedbackTypes } from "..";
import { ArrowLeft, Camera } from "phosphor-react";
import { ScreensshotButton } from "../ScreensshotButton";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/api";
import { Loading } from "../../Loading";

interface FeesbackContentStepProps {
  feedbackType: FeedbackType;
  onFeefbackRestartRequest: () => void;
  onFeedbackSent: () => void;
}
export function FeesbackContentStep({
  feedbackType,
  onFeefbackRestartRequest,
  onFeedbackSent,
}: FeesbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    await api.post("/feedbacks", {
      type: feedbackType,
      screenshot,
      comment,
    });
    setIsLoading(false);
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeefbackRestartRequest}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>
      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes oque está acontecendo..."
          onChange={(e) => setComment(e.target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreensshotButton
            screenshot={screenshot}
            onSreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0 || isLoading}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isLoading ? <Loading /> : "Enviar feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}
