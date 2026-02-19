"use client";

import { useState, ReactNode } from "react";
import { useGT } from "gt-next/client";

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
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
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
  const gt = useGT();
  const [s1Gender, setS1Gender] = useState("male");
  const [s2Gender, setS2Gender] = useState("male");
  const [s2Adj, setS2Adj] = useState("clever");
  const [s3Gender, setS3Gender] = useState("male");

  return (
    <div className="space-y-6">
      {/* Scenario 1: Gendered subject */}
      <Card title={gt("Gendered Subject")} badge="<Static>">
        <ToggleGroup
          options={[
            { label: gt("👦 Boy"), value: "male" },
            { label: gt("👧 Girl"), value: "female" },
          ]}
          value={s1Gender}
          onChange={setS1Gender}
        />
        <OutputBox>{scenario1[s1Gender]}</OutputBox>
        <CodeLine>
          {`<T>The <Static>{getSubject(gender)}</Static> is playing in the park.</T>`}
        </CodeLine>
        <p className="text-xs text-neutral-500 italic">
          {gt('In Spanish: "El niño está jugando…" vs "La niña está jugando…" — the article changes with gender.')}
        </p>
      </Card>

      {/* Scenario 2: Subject × Adjective */}
      <Card
        title={gt("Subject × Adjective Agreement")}
        badge="<Static> × <Static>"
      >
        <div className="flex flex-wrap gap-2">
          <ToggleGroup
            options={[
              { label: gt("👦 Boy"), value: "male" },
              { label: gt("👧 Girl"), value: "female" },
            ]}
            value={s2Gender}
            onChange={setS2Gender}
          />
          <ToggleGroup
            options={[
              { label: gt("🧠 Clever"), value: "clever" },
              { label: gt("😊 Happy"), value: "happy" },
            ]}
            value={s2Adj}
            onChange={setS2Adj}
          />
        </div>
        <OutputBox>{scenario2[`${s2Gender}-${s2Adj}`]}</OutputBox>
        <CodeLine>
          {`<T>The <Static>{getSubject(...)}</Static> is very <Static>{getAdjective(...)}</Static>.</T>`}
        </CodeLine>
        <p className="text-xs text-neutral-500 italic">
          {gt('In Spanish: "El niño es muy listo" vs "La niña es muy lista" — the adjective ending changes to agree with the subject\'s gender.')}
        </p>
        <div className="text-xs text-neutral-500">
          <p className="font-medium mb-1.5 text-neutral-400">
            {gt("2 × 2 = 4 translation entries:")}
          </p>
          <div className="grid grid-cols-2 gap-1">
            {(["male", "female"] as const).map((g) =>
              (["clever", "happy"] as const).map((a) => (
                <button
                  key={`${g}-${a}`}
                  onClick={() => { setS2Gender(g); setS2Adj(a); }}
                  className={`px-2 py-0.5 rounded text-xs text-left cursor-pointer transition-colors ${
                    s2Gender === g && s2Adj === a
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800 font-medium"
                      : "bg-neutral-800 text-neutral-500 border border-neutral-800 hover:text-neutral-300"
                  }`}
                >
                  {g === "male" ? gt("boy") : gt("girl")} + {a === "clever" ? gt("clever") : gt("happy")}
                </button>
              ))
            )}
          </div>
        </div>
      </Card>

      {/* Scenario 3: String version */}
      <Card title={gt("String Translation")} badge="declareStatic()">
        <ToggleGroup
          options={[
            { label: gt("👦 Boy"), value: "male" },
            { label: gt("👧 Girl"), value: "female" },
          ]}
          value={s3Gender}
          onChange={setS3Gender}
        />
        <OutputBox>{scenario3[s3Gender]}</OutputBox>
        <CodeLine>
          {`gt(\`The talented \${declareStatic(getSubject(gender))} won the prize.\`)`}
        </CodeLine>
        <p className="text-xs text-neutral-500 italic">
          {gt('In French: "Le garçon talentueux…" vs "La fille talentueuse…" — adjective endings change with gender.')}
        </p>
      </Card>

      {/* How it works */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 space-y-3">
        <h2 className="text-base font-semibold text-neutral-100">
          {gt("How it works")}
        </h2>
        <div className="text-sm text-neutral-400 space-y-2 leading-relaxed">
          <p>
            {gt("<Static> tells the GT CLI to statically analyze all possible return values of a function and create separate translation entries for each permutation.", { id: "static_explanation_1" })}
          </p>
          <p>
            {gt("This is critical for languages with grammatical gender, noun classes, or case systems where articles, adjectives, and verb forms must agree with the subject or object.")}
          </p>
          <p>
            {gt("Unlike <Var> (which inserts a runtime variable into a single translation), <Static> creates multiple complete translations — one per value — so the entire sentence adapts for each case.", { id: "static_explanation_3" })}
          </p>
        </div>
      </div>
    </div>
  );
}
