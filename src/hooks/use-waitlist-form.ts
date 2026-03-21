"use client";

import { useState, useSyncExternalStore } from "react";

interface WaitlistFormState {
  email: string;
  setEmail: (email: string) => void;
  submitted: boolean;
  loading: boolean;
  error: string;
  handleSubmit: (e: React.FormEvent) => void;
}

let globalSubmitted = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return globalSubmitted;
}

function markSubmitted() {
  globalSubmitted = true;
  for (const listener of listeners) {
    listener();
  }
}

export function useWaitlistForm(source: string): WaitlistFormState {
  const [email, setEmail] = useState("");
  const submitted = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    setError("");

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      setError("Waitlist is not configured yet.");
      setLoading(false);
      return;
    }

    try {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      markSubmitted();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return { email, setEmail, submitted, loading, error, handleSubmit };
}
