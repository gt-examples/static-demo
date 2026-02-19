import { T, Static, Var } from "gt-next";
import { getGT, declareStatic } from "gt-next/server";
import { LocaleSelector } from "gt-next";
import InteractiveDemo from "@/components/InteractiveDemo";
import LanguageBadge from "@/components/LanguageBadge";

// Helper functions for Static analysis — each must have statically analyzable returns
function getSubject(gender: "male" | "female") {
  return gender === "male" ? "boy" : "girl";
}

function getAdjective(adj: "clever" | "happy") {
  return adj === "clever" ? "clever" : "happy";
}

const subjectGenders = ["male", "female"] as const;
const adjectives = ["clever", "happy"] as const;

export default async function Home() {
  const gt = await getGT();

  // Scenario 1: Gendered subject — one <T>, CLI generates permutations
  const scenario1: Record<string, React.ReactNode> = {};
  for (const gender of subjectGenders) {
    scenario1[gender] = (
      <T>
        The <Static>{getSubject(gender)}</Static> is playing in the park.
      </T>
    );
  }

  // Scenario 2: Subject × Adjective — one <T>, CLI generates all permutations
  const scenario2: Record<string, React.ReactNode> = {};
  for (const gender of subjectGenders) {
    for (const adj of adjectives) {
      scenario2[`${gender}-${adj}`] = (
        <T>
          The <Static>{getSubject(gender)}</Static> is very{" "}
          <Static>{getAdjective(adj)}</Static>.
        </T>
      );
    }
  }

  // Scenario 3: String version with declareStatic() — one gt() call, CLI generates permutations
  const scenario3: Record<string, string> = {};
  for (const gender of subjectGenders) {
    scenario3[gender] = gt(
      `The talented ${declareStatic(getSubject(gender))} won the prize.`
    );
  }

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
          <h2 className="text-2xl font-semibold text-neutral-100 mb-3">
            Grammatical agreement across languages
          </h2>
          <p className="text-base text-neutral-400 max-w-xl leading-relaxed mb-4">
            Toggle the options below and switch languages to see how{" "}
            {"<Static>"} and declareStatic() generate separate translation
            entries for each permutation, enabling proper grammatical agreement.
          </p>
          <LanguageBadge />
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
