/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "@arc-fusion/prop-types";
import { Button, Input, Stack, Heading, Paragraph, Link } from "@wpmedia/arc-themes-components";
import { useFusionContext } from "fusion:context";
import { useContent } from "fusion:content";
import "../../_index.scss";

const BLOCK_CLASS_NAME = "b-ask-the-news";
const MAX_QUESTION_CHARS = 200;

const extractInputString = (...args) => {
  // Arc Themes Input onChange varies by version:
  // - onChange(value: string)
  // - onChange(event)
  // - onChange(event, value: string)
  // - onChange({ value: string })
  // eslint-disable-next-line no-restricted-syntax
  for (const arg of args) {
    if (typeof arg === "string") return arg;
  }

  const first = args[0];
  const candidates = [
    first?.target?.value,
    first?.currentTarget?.value,
    first?.value,
    first?.detail?.value,
  ];
  // eslint-disable-next-line no-restricted-syntax
  for (const c of candidates) {
    if (typeof c === "string") return c;
  }

  return null;
};

const AskTheNews = ({ customFields = {} }) => {
  const { arcSite } = useFusionContext() || {};
  const [question, setQuestion] = useState("");
  const [lastQuestion, setLastQuestion] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [streamText, setStreamText] = useState("");
  const [sources, setSources] = useState([]);
  const [showSources, setShowSources] = useState(false);
  const abortRef = useRef(null);
  const sseEventRef = useRef(null);
  const pendingStreamTextRef = useRef("");
  const flushHandleRef = useRef(null);

  useEffect(() => () => {
      if (abortRef.current) abortRef.current.abort();
      if (flushHandleRef.current) {
        if (flushHandleRef.current.type === "raf") window.cancelAnimationFrame(flushHandleRef.current.id);
        else window.clearTimeout(flushHandleRef.current.id);
      }
    }, []);

  const canSubmit = useMemo(() => question.trim().length > 0 && status !== "streaming" && status !== "loading", [question, status]);
  const charCount = question.length;

  const greeting = useMemo(() => {
    if (typeof window === "undefined") return "Good day";
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const isLocal = useMemo(() => {
    if (typeof window === "undefined") return process.env.NODE_ENV === "development";
    const hostname = window.location?.hostname || "";
    return process.env.NODE_ENV === "development" || hostname.includes("localhost") || hostname === "127.0.0.1";
  }, []);

  const suggestedConfig = useMemo(() => {
    if (!isLocal || !arcSite) return null;
    return {
      source: "ask-the-news-questions",
      query: { siteId: arcSite },
    };
  }, [arcSite, isLocal]);

  const suggestedResult = useContent(suggestedConfig);
  const suggestedQuestions = Array.isArray(suggestedResult?.questions) ? suggestedResult.questions : [];

  const cancelScheduledFlush = () => {
    if (!flushHandleRef.current) return;
    if (flushHandleRef.current.type === "raf") window.cancelAnimationFrame(flushHandleRef.current.id);
    else window.clearTimeout(flushHandleRef.current.id);
    flushHandleRef.current = null;
  };

  const flushPendingStreamText = () => {
    cancelScheduledFlush();
    const pending = pendingStreamTextRef.current;
    if (!pending) return;
    pendingStreamTextRef.current = "";
    setStreamText((prev) => `${prev}${pending}`);
  };

  const scheduleFlushPendingStreamText = () => {
    if (flushHandleRef.current) return;
    const flush = () => {
      flushHandleRef.current = null;
      const pending = pendingStreamTextRef.current;
      if (!pending) return;
      pendingStreamTextRef.current = "";
      setStreamText((prev) => `${prev}${pending}`);
    };
    if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
      flushHandleRef.current = { type: "raf", id: window.requestAnimationFrame(flush) };
    } else {
      flushHandleRef.current = { type: "timeout", id: window.setTimeout(flush, 50) };
    }
  };

  const enqueueStreamText = (next) => {
    if (!next) return;
    pendingStreamTextRef.current += next;
    scheduleFlushPendingStreamText();
  };

  const handleStreamLine = (rawLine) => {
    const line = rawLine.trim();
    if (!line) return;

    // SSE framing: ignore metadata lines and use event/data pairing.
    if (line.startsWith("event:")) {
      sseEventRef.current = line.replace(/^event:\s?/, "").trim() || null;
      return;
    }
    if (line.startsWith("id:") || line.startsWith("retry:") || line.startsWith(":")) {
      return;
    }

    const payload = line.startsWith("data:") ? line.replace(/^data:\s?/, "") : line;
    if (!payload || payload === "[DONE]") return;

    // If we're in SSE mode with an event type, prefer interpreting data by the event.
    const sseEventType = sseEventRef.current;
    if (sseEventType && line.startsWith("data:")) {
      if (sseEventType === "output_text.delta") {
        // Some servers send raw token text; others wrap it as JSON: {"delta":"..."}
        if (payload.startsWith("{")) {
          try {
            const msg = JSON.parse(payload);
            if (typeof msg?.delta === "string") enqueueStreamText(msg.delta);
          } catch {
            enqueueStreamText(payload);
          }
        } else {
          enqueueStreamText(payload);
        }
        return;
      }
      if (sseEventType === "output_text") {
        flushPendingStreamText();
        setStreamText(payload);
        return;
      }
      if (sseEventType === "sources") {
        try {
          const msg = JSON.parse(payload);
          if (Array.isArray(msg?.results)) setSources(msg.results);
        } catch {
          // ignore
        }
        return;
      }
      // Unknown event type: ignore its data rather than printing metadata
      return;
    }

    // If payload is JSON, parse it and render only the useful bits.
    if (payload.startsWith("{") || payload.startsWith("[")) {
      try {
        const msg = JSON.parse(payload);
        const type = msg?.type;
        if (type === "output_text.delta" && typeof msg?.delta === "string") {
          // Stream token-by-token response
          enqueueStreamText(msg.delta);
          return;
        }
        if (type === "output_text" && typeof msg?.text === "string") {
          // Non-delta final response
          flushPendingStreamText();
          setStreamText(msg.text);
          return;
        }
        if (type === "sources" && Array.isArray(msg?.results)) {
          setSources(msg.results);
          return;
        }
        // Ignore other message types (message_start, etc.)
        return;
      } catch {
        // fallthrough to raw append
      }
    }

    // Fallback: append raw line
    // Avoid printing SSE metadata if it slips through
    if (payload.startsWith("event:") || payload.startsWith("id:") || payload.startsWith("retry:")) return;
    enqueueStreamText(payload);
  };

  const handleFieldChange = (...args) => {
    const next = extractInputString(...args);
    // If we can't confidently parse a string, do nothing (don't wipe state).
    if (typeof next === "string") setQuestion(next.slice(0, MAX_QUESTION_CHARS));
  };

  const handleCancel = () => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = null;
    pendingStreamTextRef.current = "";
    cancelScheduledFlush();
    setStatus("idle");
  };

  const submitQuery = async (rawQuery) => {
    const query = (rawQuery || "").trim();
    if (!query) return;

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setError(null);
    pendingStreamTextRef.current = "";
    cancelScheduledFlush();
    setStreamText("");
    setSources([]);
    setShowSources(false);
    setLastQuestion(query);
    const streamingEnabled = customFields?.enableStreaming !== false;
    setStatus(streamingEnabled ? "streaming" : "loading");

    try {
      const response = await fetch("http://localhost:8000/api/v1/query", {
        method: "POST",
        headers: {
          Accept: streamingEnabled ? "text/event-stream" : "application/json",
          "content-type": "application/json",
          "arc-organization": "arclabs",
        },
        body: JSON.stringify({ query, limit: 40 }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`Request failed (${response.status})${text ? `: ${text}` : ""}`);
      }

      if (streamingEnabled) {
        const reader = response.body?.getReader?.();
        if (!reader) {
          const text = await response.text();
          text.split(/\r?\n/).forEach(handleStreamLine);
          setStatus("done");
          return;
        }

        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        // eslint-disable-next-line no-constant-condition
        while (true) {
          // eslint-disable-next-line no-await-in-loop
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // Process line-delimited chunks, keep remainder in buffer
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() || "";
          lines.forEach(handleStreamLine);
        }

        const final = buffer + decoder.decode();
        if (final.trim()) final.split(/\r?\n/).forEach(handleStreamLine);
        flushPendingStreamText();
        setStatus("done");
      } else {
        const data = await response.json();
        // Minimal extraction: prefer common keys
        const text =
          data?.answer ||
          data?.text ||
          data?.output_text ||
          data?.output ||
          (typeof data === "string" ? data : "");
        const sourceList = Array.isArray(data?.results) ? data.results : Array.isArray(data?.sources) ? data.sources : [];
        setStreamText(text || "");
        if (Array.isArray(sourceList)) {
          setSources(sourceList);
        }
        setStatus("done");
      }
    } catch (e) {
      if (e?.name === "AbortError") return;
      pendingStreamTextRef.current = "";
      cancelScheduledFlush();
      setError(e?.message || "Request failed");
      setStatus("error");
    } finally {
      abortRef.current = null;
    }
  };

  const handleSubmit = async (event) => {
    if (event && "preventDefault" in event) event.preventDefault();

    let query = (question || "").trim();
    // Fallback: if state is empty but the input is showing text (uncontrolled Input),
    // read it from the form field on submit.
    if (!query && event && "currentTarget" in event) {
      const form = event.currentTarget;
      const el = form?.elements?.namedItem?.("question");
      if (el && typeof el.value === "string") {
        query = el.value.trim();
      }
    }

    await submitQuery(query);
  };

  const showQuestionList = status === "idle" && !lastQuestion && !streamText;
  const inputPlaceholder = lastQuestion || streamText ? "Ask another question" : "What do you want to know?";

  return (
    <Stack className={BLOCK_CLASS_NAME}>
      <Stack className={`${BLOCK_CLASS_NAME}__header`} gap="0.5rem">
        <Heading level={2}>{greeting}</Heading>
      </Stack>

      <Stack className={`${BLOCK_CLASS_NAME}__body`} gap="1rem">
        {showQuestionList ? (
          suggestedQuestions.length ? (
            <div className={`${BLOCK_CLASS_NAME}__questionList`}>
              <ul className={`${BLOCK_CLASS_NAME}__suggestionRows`}>
                {suggestedQuestions.slice(0, 5).map((q) => (
                  <li key={q} className={`${BLOCK_CLASS_NAME}__suggestionRow`}>
                    <button
                      type="button"
                      className={`${BLOCK_CLASS_NAME}__suggestionButton`}
                      onClick={() => {
                        const next = q.slice(0, MAX_QUESTION_CHARS);
                        setQuestion(next);
                        submitQuery(next);
                      }}
                    >
                      <span className={`${BLOCK_CLASS_NAME}__sparkle`} aria-hidden="true">✦</span>
                      <span className={`${BLOCK_CLASS_NAME}__suggestionText`}>{q}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Paragraph className={`${BLOCK_CLASS_NAME}__suggestions-empty`}>No suggested questions available for this site.</Paragraph>
          )
        ) : null}

        {error ? <div className={`${BLOCK_CLASS_NAME}__error`}>{error}</div> : null}
        {status === "streaming" ? <div className={`${BLOCK_CLASS_NAME}__status`}>Streaming…</div> : null}
        {status === "loading" ? <div className={`${BLOCK_CLASS_NAME}__status`}>Loading…</div> : null}

        {lastQuestion ? (
          <div className={`${BLOCK_CLASS_NAME}__userBubbleWrap`}>
            <div className={`${BLOCK_CLASS_NAME}__userBubble`}>{lastQuestion}</div>
          </div>
        ) : null}

        {streamText ? (
          <div className={`${BLOCK_CLASS_NAME}__answer`}>
            <Paragraph>{streamText}</Paragraph>
          </div>
        ) : null}

        {sources.length ? (
          <div className={`${BLOCK_CLASS_NAME}__sources`}>
            <div className={`${BLOCK_CLASS_NAME}__sourceActions`}>
              <button
                type="button"
                className={`${BLOCK_CLASS_NAME}__sourcesPill`}
                onClick={() => setShowSources((v) => !v)}
              >
                Sources
              </button>
              <button
                type="button"
                className={`${BLOCK_CLASS_NAME}__actionIcon`}
                aria-label="Copy answer"
                title="Copy answer"
                onClick={() => {
                  const text = streamText || "";
                  if (!text) return;
                  navigator?.clipboard?.writeText?.(text).catch(() => {});
                }}
              >
                ⧉
              </button>
              <button type="button" className={`${BLOCK_CLASS_NAME}__actionIcon`} aria-label="Thumbs up" title="Thumbs up">
                +
              </button>
              <button type="button" className={`${BLOCK_CLASS_NAME}__actionIcon`} aria-label="Thumbs down" title="Thumbs down">
                –
              </button>
            </div>

            {showSources ? (
              <ol className={`${BLOCK_CLASS_NAME}__sourcesList`}>
                {sources.map((s, idx) => (
                  <li key={s.document_id || `source-${idx}`}>
                    <div><strong>{s.headline || s.document_id || "Untitled"}</strong></div>
                    <div>
                      {s.source
                        ? `${s.source}${typeof s.score === "number" ? ` (score ${s.score.toFixed(2)})` : ""}`
                        : null}
                    </div>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        ) : null}
      </Stack>

      <Stack className={`${BLOCK_CLASS_NAME}__footer`} gap="0.5rem">
        <form className={`${BLOCK_CLASS_NAME}__form`} onSubmit={handleSubmit}>
          <Stack className={`${BLOCK_CLASS_NAME}__inputRow`} direction="horizontal">
            <Input
              value={question}
              label=""
              name="question"
              onChange={handleFieldChange}
              placeholder={inputPlaceholder}
              type="text"
              maxLength={MAX_QUESTION_CHARS}
            />
            <Button
              className={`${BLOCK_CLASS_NAME}__submit`}
              aria-label="Submit"
              disabled={!canSubmit}
              type="submit"
              size="large"
              variant="secondary"
              {...(!canSubmit ? { "aria-disabled": true } : {})}
            >
              ↑
            </Button>
          </Stack>
        </form>

        <Stack className={`${BLOCK_CLASS_NAME}__helper`} gap="0.5rem">
          <Paragraph className={`${BLOCK_CLASS_NAME}__disclaimer`}>
            Answers are AI generated from our reporting. Because AI can make mistakes, verify information by referencing provided sources for each answer.
          </Paragraph>
          <Stack className={`${BLOCK_CLASS_NAME}__how`} direction="horizontal">
            <span className={`${BLOCK_CLASS_NAME}__info`} aria-hidden="true">i</span>
            <Link href="#" onClick={(e) => e?.preventDefault?.()}>
              How it works
            </Link>
            <div className={`${BLOCK_CLASS_NAME}__counter`}>{charCount}/{MAX_QUESTION_CHARS}</div>
          </Stack>
          {status === "streaming" ? (
            <Button onClick={handleCancel} size="large" variant="secondary">
              Cancel
            </Button>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
};

AskTheNews.lazy = true;
AskTheNews.propTypes = {
  customFields: PropTypes.shape({
    enableStreaming: PropTypes.bool,
    
  }),
};

export default AskTheNews;
