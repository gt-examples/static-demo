"use client";

import { useLocale, useLocaleProperties, useGT } from "gt-next/client";

export default function LanguageBadge() {
  const locale = useLocale();
  const { name } = useLocaleProperties(locale);
  const gt = useGT();

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800">
      <span className="text-xs text-neutral-500">{gt("Example language:")}</span>
      <span className="text-xs font-medium text-emerald-400">{name}</span>
    </div>
  );
}
