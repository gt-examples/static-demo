"use client";

import { useState, ReactNode } from "react";

interface Props {
  scenario1: Record<string, ReactNode>;
  scenario2: Record<string, ReactNode>;
  scenario3: Record<string, ReactNode>;
  scenario4: Record<string, string>;
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
    <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            value === opt.value
              ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
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
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        <span className="px-2 py-0.5 text-xs font-mono rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}

function OutputBox({ children }: { children: ReactNode }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg px-4 py-3 text-zinc-800 dark:text-zinc-200 text-lg font-medium border border-zinc-200 dark:border-zinc-700">
      {children}
    </div>
  );
}

export default function InteractiveDemo({
  scenario1,
  scenario2,
  scenario3,
  scenario4,
}: Props) {
  const [s1Gender, setS1Gender] = useState("male");
  const [s1Name, setS1Name] = useState("Smith");

  const [s2Gender, setS2Gender] = useState("male");

  const [s3Gender, setS3Gender] = useState("male");
  const [s3Item, setS3Item] = useState("ball");

  const [s4Formality, setS4Formality] = useState("formal");
  const [s4Name, setS4Name] = useState("friend");

  return (
    <div className="space-y-8">
      {/* Scenario 1: Title agreement */}
      <Card title="Greeting with Title Agreement" badge="<Static> + <Var>">
        <div className="flex flex-wrap items-center gap-3">
          <ToggleGroup
            options={[
              { label: "Mr.", value: "male" },
              { label: "Ms.", value: "female" },
              { label: "Mx.", value: "neutral" },
            ]}
            value={s1Gender}
            onChange={setS1Gender}
          />
          <input
            type="text"
            value={s1Name}
            onChange={(e) => setS1Name(e.target.value)}
            className="px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm w-32"
            placeholder="Name"
          />
        </div>
        <OutputBox>
          {/* Show the pre-rendered translation, replacing the default name */}
          <span className="contents" suppressHydrationWarning>
            {scenario1[s1Gender]}
          </span>
        </OutputBox>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          {`<T>Dear <Static>{getTitle("${s1Gender}")}</Static> <Var name="name">${s1Name}</Var>, welcome to our platform!</T>`}
        </p>
      </Card>

      {/* Scenario 2: Subject agreement */}
      <Card title="Subject with Gender Agreement" badge="<Static>">
        <ToggleGroup
          options={[
            { label: "👦 Boy", value: "male" },
            { label: "👧 Girl", value: "female" },
          ]}
          value={s2Gender}
          onChange={setS2Gender}
        />
        <OutputBox>{scenario2[s2Gender]}</OutputBox>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          {`<T>The <Static>{getSubject("${s2Gender}")}</Static> is playing in the park.</T>`}
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">
          In Spanish: &quot;El niño está jugando...&quot; vs &quot;La niña está
          jugando...&quot; — articles change with gender!
        </p>
      </Card>

      {/* Scenario 3: Combinatorial */}
      <Card title="Combinatorial: Subject × Object" badge="<Static> × <Static>">
        <div className="flex flex-wrap gap-3">
          <ToggleGroup
            options={[
              { label: "👦 Boy", value: "male" },
              { label: "👧 Girl", value: "female" },
            ]}
            value={s3Gender}
            onChange={setS3Gender}
          />
          <ToggleGroup
            options={[
              { label: "⚽ Ball", value: "ball" },
              { label: "🖍️ Crayon", value: "crayon" },
              { label: "📖 Book", value: "book" },
            ]}
            value={s3Item}
            onChange={setS3Item}
          />
        </div>
        <OutputBox>{scenario3[`${s3Gender}-${s3Item}`]}</OutputBox>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          {`<T>The <Static>{getSubject(...)}</Static> plays with the <Static>{getItem(...)}</Static>.</T>`}
        </p>
        <div className="text-xs text-zinc-400 dark:text-zinc-500">
          <p className="font-medium mb-1">
            2 × 3 = 6 translation entries created:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {(["male", "female"] as const).map((g) =>
              (["ball", "crayon", "book"] as const).map((i) => (
                <span
                  key={`${g}-${i}`}
                  className={`px-2 py-0.5 rounded text-xs ${
                    s3Gender === g && s3Item === i
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {g === "male" ? "boy" : "girl"} + {i}
                </span>
              ))
            )}
          </div>
        </div>
      </Card>

      {/* Scenario 4: String version */}
      <Card title="String Version: Formal Greetings" badge="declareStatic() + declareVar()">
        <div className="flex flex-wrap items-center gap-3">
          <ToggleGroup
            options={[
              { label: "🎩 Formal", value: "formal" },
              { label: "👋 Informal", value: "informal" },
            ]}
            value={s4Formality}
            onChange={setS4Formality}
          />
          <input
            type="text"
            value={s4Name}
            onChange={(e) => setS4Name(e.target.value)}
            className="px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm w-32"
            placeholder="Name"
          />
        </div>
        <OutputBox>
          {scenario4[s4Formality]?.replace(/\bfriend\b/, s4Name || "friend")}
        </OutputBox>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
          {`gt(\`\${declareStatic(getFormalGreeting("${s4Formality}"))} \${declareVar("name")}! We hope you enjoy your visit.\`)`}
        </p>
      </Card>

      {/* Explanation */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl border border-blue-200 dark:border-blue-800 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          How it works
        </h2>
        <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
          <p>
            <strong className="text-zinc-800 dark:text-zinc-200">
              {"<Static>"}
            </strong>{" "}
            and{" "}
            <strong className="text-zinc-800 dark:text-zinc-200">
              declareStatic()
            </strong>{" "}
            tell the GT CLI to statically analyze all possible return values of a
            function and create <em>separate translation entries</em> for each
            permutation.
          </p>
          <p>
            This is critical for languages with grammatical gender, noun
            classes, or case systems where articles, adjectives, and verb forms
            must agree with the subject or object.
          </p>
          <p>
            Unlike <strong>{"<Var>"}</strong> (which inserts a runtime variable
            into a single translation), <strong>{"<Static>"}</strong> creates
            multiple complete translation entries — one for each possible value —
            enabling the translator to adjust the entire sentence for each case.
          </p>
        </div>
      </div>
    </div>
  );
}
