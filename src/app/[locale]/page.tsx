import { T, Static, Var } from "gt-next";
import { getGT } from "gt-next/server";
import { LocaleSelector } from "gt-next";
import InteractiveDemo from "@/components/InteractiveDemo";

// Helper functions for Static analysis — each must have statically analyzable returns
function getGenderedDescription(gender: "male" | "female") {
  return gender === "male" ? "handsome boy" : "beautiful girl";
}

function getSubject(gender: "male" | "female") {
  return gender === "male" ? "boy" : "girl";
}

function getAdjective(adj: "clever" | "happy") {
  return adj === "clever" ? "clever" : "happy";
}

export default async function Home() {
  const gt = await getGT();

  // Scenario 1: Gendered adjective — single Static wrapping a combined description
  const scenario1: Record<string, React.ReactNode> = {};
  scenario1["male"] = (
    <T>
      The <Static>{getGenderedDescription("male")}</Static> is playing in the
      park.
    </T>
  );
  scenario1["female"] = (
    <T>
      The <Static>{getGenderedDescription("female")}</Static> is playing in the
      park.
    </T>
  );

  // Scenario 2: Subject × Adjective — subject affects adjective agreement
  const scenario2: Record<string, React.ReactNode> = {};
  scenario2["male-clever"] = (
    <T>
      The <Static>{getSubject("male")}</Static> is very{" "}
      <Static>{getAdjective("clever")}</Static>.
    </T>
  );
  scenario2["male-happy"] = (
    <T>
      The <Static>{getSubject("male")}</Static> is very{" "}
      <Static>{getAdjective("happy")}</Static>.
    </T>
  );
  scenario2["female-clever"] = (
    <T>
      The <Static>{getSubject("female")}</Static> is very{" "}
      <Static>{getAdjective("clever")}</Static>.
    </T>
  );
  scenario2["female-happy"] = (
    <T>
      The <Static>{getSubject("female")}</Static> is very{" "}
      <Static>{getAdjective("happy")}</Static>.
    </T>
  );

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
