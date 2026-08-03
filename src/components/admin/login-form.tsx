"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { loginAction } from "@/app/head/actions";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    ok: false,
  });

  return (
    <form
      action={formAction}
      className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl"
    >
      <div className="mb-6 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
          <Lock className="h-6 w-6" aria-hidden="true" />
        </div>
      </div>

      <h1 className="mb-1 text-center text-lg font-bold text-white">Sign in</h1>
      <p className="mb-6 text-center text-sm text-neutral-400">
        Restricted area
      </p>

      <label
        htmlFor="username"
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400"
      >
        Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        required
        className="mb-4 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none transition focus:border-primary"
      />

      <label
        htmlFor="password"
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400"
      >
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="mb-4 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none transition focus:border-primary"
      />

      {state.error ? (
        <p className="mb-4 text-sm text-red-400">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
