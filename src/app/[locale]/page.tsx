import { T, Static, Var } from "gt-next";
import { getGT, declareStatic, declareVar } from "gt-next/server";
import { LocaleSelector } from "gt-next";
import { getTitle, getSubject, getItem, getFormalGreeting } from "@/lib/helpers";
import InteractiveDemo from "@/components/InteractiveDemo";

// All gender values
const genders = ["male", "female", "neutral"] as const;
// All subject genders
const subjectGenders = ["male", "female"] as const;
// All items
const items = ["ball", "crayon", "book"] as const;
// Formality
const formalities = ["formal", "informal"] as const;

export default async function Home() {
  const t = await getGT();

  // Pre-render Scenario 1: Greeting with title agreement
  const scenario1: Record<string, React.ReactNode> = {};
  for (const gender of genders) {
    scenario1[gender] = (
      <T>
        Dear <Static>{getTitle(gender)}</Static>{" "}
        <Var name="name">Smith</Var>, welcome to our platform!
      </T>
    );
  }

  // Pre-render Scenario 2: Subject + action
  const scenario2: Record<string, React.ReactNode> = {};
  for (const gender of subjectGenders) {
    scenario2[gender] = (
      <T>
        The <Static>{getSubject(gender)}</Static> is playing in the park.
      </T>
    );
  }

  // Pre-render Scenario 3: Combinatorial (subject × item)
  const scenario3: Record<string, React.ReactNode> = {};
  for (const gender of subjectGenders) {
    for (const item of items) {
      scenario3[`${gender}-${item}`] = (
        <T>
          The <Static>{getSubject(gender)}</Static> plays with the{" "}
          <Static>{getItem(item)}</Static>.
        </T>
      );
    }
  }

  // Pre-render Scenario 4: String version with declareStatic()
  const scenario4: Record<string, string> = {};
  scenario4["formal"] = t(
    `${declareStatic(getFormalGreeting("formal"))}! We hope you enjoy your visit.`
  );
  scenario4["informal"] = t(
    `${declareStatic(getFormalGreeting("informal"))}! We hope you enjoy your visit.`
  );

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            <T>
              <Var>{"<Static>"}</Var> & <Var>declareStatic()</Var> Demo
            </T>
          </h1>
          <LocaleSelector />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-10">
          <T>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
              This demo showcases how General Translation handles grammatical
              agreement across languages using <Var>{"<Static>"}</Var> and{" "}
              <Var>declareStatic()</Var>. Toggle the options below and switch
              languages to see how translations adapt.
            </p>
          </T>
        </div>

        <InteractiveDemo
          scenario1={scenario1}
          scenario2={scenario2}
          scenario3={scenario3}
          scenario4={scenario4}
        />
      </main>
    </div>
  );
}
