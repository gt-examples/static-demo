"use client";

import { useState, ReactNode } from "react";

interface Props {
  scenario1: Record<string, ReactNode>;
  scenario2: Record<string, ReactNode>;
  scenario3: Record<string, string>;
}

function ToggleGroup({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-0.5 bg-neutral-800 rounded-lg p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
            value === opt.value
              ? "bg-neutral-700 text-neutral-100 shadow-sm"
              : "text-neutral-500 hover:text-neutral-300"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Card({
  title,
  badge,
  children,
}: {
  title: string;
  badge: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="text-base font-semibold text-neutral-100">{title}</h2>
        <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}

function OutputBox({ children }: { children: ReactNode }) {
  return (
    <div className="bg-neutral-950 rounded-lg px-4 py-3 text-neutral-100 text-lg font-medium border border-neutral-800">
      {children}
    </div>
  );
}

function CodeLine({ children }: { children: string }) {
  return (
    <p className="text-xs text-neutral-600 font-mono leading-relaxed break-all">
      {children}
    </p>
  );
}

export default function InteractiveDemo({
  scenario1,
  scenario2,
  scenario3,
}: Props) {
  const [s1Gender, setS1Gender] = useState("male");
  const [s2Gender, setS2Gender] = useState("male");
  const [s2Item, setS2Item] = useState("ball");
  const [s3Gender, setS3Gender] = useState("male");

  return (
    <div className="space-y-6">
      {/* Scenario 1: Gendered adjective */}
      <Card title="Gendered Adjective Agreement" badge="<Static>">
        <ToggleGroup
          options={[
            { label: "👦 Boy", value: "male" },
            { label: "👧 Girl", value: "female" },
          ]}
          value={s1Gender}
          onChange={setS1Gender}
        />
        <OutputBox>{scenario1[s1Gender]}</OutputBox>
        <CodeLine>
          {`<T>The <Static>{getAdjective("${s1Gender}")}</Static> <Static>{getSubject("${s1Gender}")}</Static> is playing in the park.</T>`}
        </CodeLine>
        <p className="text-xs text-neutral-500 italic">
          In Spanish: &quot;El <strong>guapo</strong> niño…&quot; vs &quot;La{" "}
          <strong>hermosa</strong> niña…&quot; — both the article and adjective
          change with gender.
        </p>
      </Card>

      {/* Scenario 2: Combinatorial */}
      <Card
        title="Combinatorial: Subject × Object"
        badge="<Static> × <Static>"
      >
        <div className="flex flex-wrap gap-2">
          <ToggleGroup
            options={[
              { label: "👦 Boy", value: "male" },
              { label: "👧 Girl", value: "female" },
            ]}
            value={s2Gender}
            onChange={setS2Gender}
          />
          <ToggleGroup
            options={[
              { label: "⚽ Ball", value: "ball" },
              { label: "🖍️ Crayon", value: "crayon" },
              { label: "📖 Book", value: "book" },
            ]}
            value={s2Item}
            onChange={setS2Item}
          />
        </div>
        <OutputBox>{scenario2[`${s2Gender}-${s2Item}`]}</OutputBox>
        <CodeLine>
          {`<T>The <Static>{getSubject(...)}</Static> plays with the <Static>{getItem(...)}</Static>.</T>`}
        </CodeLine>
        <div className="text-xs text-neutral-500">
          <p className="font-medium mb-1.5 text-neutral-400">
            2 × 3 = 6 translation entries:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {(["male", "female"] as const).map((g) =>
              (["ball", "crayon", "book"] as const).map((i) => (
                <span
                  key={`${g}-${i}`}
                  className={`px-2 py-0.5 rounded text-xs ${
                    s2Gender === g && s2Item === i
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800 font-medium"
                      : "bg-neutral-800 text-neutral-500 border border-neutral-800"
                  }`}
                >
                  {g === "male" ? "boy" : "girl"} + {i}
                </span>
              ))
            )}
          </div>
        </div>
      </Card>

      {/* Scenario 3: String version */}
      <Card title="String Translation" badge="gt()">
        <ToggleGroup
          options={[
            { label: "👦 Boy", value: "male" },
            { label: "👧 Girl", value: "female" },
          ]}
          value={s3Gender}
          onChange={setS3Gender}
        />
        <OutputBox>{scenario3[s3Gender]}</OutputBox>
        <CodeLine>
          {`gt(gender === "male" ? "The talented boy won the prize." : "The talented girl won the prize.")`}
        </CodeLine>
        <p className="text-xs text-neutral-500 italic">
          In French: &quot;Le garçon <strong>talentueux</strong>…&quot; vs
          &quot;La fille <strong>talentueuse</strong>…&quot; — adjective endings
          change with gender.
        </p>
      </Card>

      {/* How it works */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 space-y-3">
        <h2 className="text-base font-semibold text-neutral-100">
          How it works
        </h2>
        <div className="text-sm text-neutral-400 space-y-2 leading-relaxed">
          <p>
            <code className="text-emerald-400 text-xs bg-emerald-950 px-1.5 py-0.5 rounded">
              {"<Static>"}
            </code>{" "}
            tells the GT CLI to statically analyze all possible return values of
            a function and create <em>separate translation entries</em> for each
            permutation.
          </p>
          <p>
            This is critical for languages with grammatical gender, noun classes,
            or case systems where articles, adjectives, and verb forms must agree
            with the subject or object.
          </p>
          <p>
            Unlike{" "}
            <code className="text-neutral-300 text-xs bg-neutral-800 px-1.5 py-0.5 rounded">
              {"<Var>"}
            </code>{" "}
            (which inserts a runtime variable into a single translation),{" "}
            <code className="text-emerald-400 text-xs bg-emerald-950 px-1.5 py-0.5 rounded">
              {"<Static>"}
            </code>{" "}
            creates multiple complete translations — one per value — so the
            entire sentence adapts for each case.
          </p>
        </div>
      </div>
    </div>
  );
}
