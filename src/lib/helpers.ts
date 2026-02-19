// Helper functions that return static values for <Static> and declareStatic()

export function getSubject(gender: "male" | "female"): string {
  return gender === "male" ? "boy" : "girl";
}

export function getAdjective(gender: "male" | "female"): string {
  return gender === "male" ? "handsome" : "beautiful";
}

export function getItem(item: "ball" | "crayon" | "book"): string {
  if (item === "ball") return "ball";
  if (item === "crayon") return "crayon";
  return "book";
}

export function getFormalGreeting(formality: "formal" | "informal"): string {
  return formality === "formal" ? "Welcome, esteemed" : "Hey";
}
