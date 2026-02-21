import { T, Static } from "gt-next";
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
      {/* Disclaimer banner */}
      <div className="bg-amber-950/50 border-b border-amber-900/50">
        <div className="max-w-3xl mx-auto px-6 py-2.5 text-center">
          <p className="text-xs text-amber-200/80">
            <T>
              This is an example app built with{" "}
              <a
                href="https://generaltranslation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-100"
              >
                General Translation
              </a>{" "}
              to demonstrate internationalization features. It is not a real
              product.
            </T>
          </p>
        </div>
      </div>

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
              {gt("Static Analysis Demo")}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gt-examples/static-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
              aria-label="View on GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <LocaleSelector />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-100 mb-3">
            {gt("Grammatical agreement across languages")}
          </h2>
          <p className="text-base text-neutral-400 max-w-xl leading-relaxed mb-4">
            <T>
              Toggle the options below and switch languages to see how{" "}
              {"<Static>"} and declareStatic() generate separate translation
              entries for each permutation, enabling proper{" "}
              <a
                href="https://en.wikipedia.org/wiki/Agreement_(linguistics)"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-200"
              >
                grammatical agreement
              </a>.
            </T>
          </p>
          <LanguageBadge />
        </div>

        <InteractiveDemo
          scenario1={scenario1}
          scenario2={scenario2}
          scenario3={scenario3}
        />

        <footer className="mt-16 pt-8 border-t border-neutral-800 text-center">
          <p className="text-xs text-neutral-500">
            <T>
              Built with{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-300"
              >
                Next.js
              </a>{" "}
              and{" "}
              <a
                href="https://generaltranslation.com/docs/next"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-300"
              >
                gt-next
              </a>
              . Learn more about{" "}
              <a
                href="https://generaltranslation.com/docs/next/api/components/static"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-300"
              >
                the Static component
              </a>
              .
            </T>
          </p>
        </footer>
      </main>
    </div>
  );
}
