import { T, Static, Var } from "gt-next";
import { getGT } from "gt-next/server";
import { LocaleSelector } from "gt-next";
import InteractiveDemo from "@/components/InteractiveDemo";

// Helper functions must be in the same file for CLI static analysis
function getSubject(gender: "male" | "female"): string {
  return gender === "male" ? "boy" : "girl";
}

function getAdjective(gender: "male" | "female"): string {
  return gender === "male" ? "handsome" : "beautiful";
}

function getItem(item: "ball" | "crayon" | "book"): string {
  if (item === "ball") return "ball";
  if (item === "crayon") return "crayon";
  return "book";
}

const subjectGenders = ["male", "female"] as const;
const items = ["ball", "crayon", "book"] as const;

export default async function Home() {
  const gt = await getGT();

  // Scenario 1: Gendered adjective agreement
  const scenario1: Record<string, React.ReactNode> = {};
  for (const gender of subjectGenders) {
    scenario1[gender] = (
      <T>
        The <Static>{getAdjective(gender)}</Static>{" "}
        <Static>{getSubject(gender)}</Static> is playing in the park.
      </T>
    );
  }

  // Scenario 2: Combinatorial (subject × item)
  const scenario2: Record<string, React.ReactNode> = {};
  for (const gender of subjectGenders) {
    for (const item of items) {
      scenario2[`${gender}-${item}`] = (
        <T>
          The <Static>{getSubject(gender)}</Static> plays with the{" "}
          <Static>{getItem(item)}</Static>.
        </T>
      );
    }
  }

  // Scenario 3: String version with gt()
  const scenario3: Record<string, string> = {};
  scenario3["male"] = gt("The talented boy won the prize.");
  scenario3["female"] = gt("The talented girl won the prize.");

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200">
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="https://generaltranslation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              General Translation
            </a>
            <span className="text-neutral-700">/</span>
            <h1 className="text-sm font-semibold text-neutral-100">
              Static Analysis Demo
            </h1>
          </div>
          <LocaleSelector />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-12">
          <T>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-3">
              Grammatical agreement across languages
            </h2>
          </T>
          <T>
            <p className="text-base text-neutral-400 max-w-xl leading-relaxed">
              Toggle the options below and switch languages to see how{" "}
              <Var>{"<Static>"}</Var> and <Var>declareStatic()</Var> generate
              separate translation entries for each permutation, enabling proper
              grammatical agreement.
            </p>
          </T>
        </div>

        <InteractiveDemo
          scenario1={scenario1}
          scenario2={scenario2}
          scenario3={scenario3}
        />
      </main>
    </div>
  );
}
