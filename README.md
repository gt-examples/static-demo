# Static Analysis Demo

Interactive demo of General Translation's `<Static>` component and `declareStatic()` function for grammatical agreement across languages.

**[Live Demo](https://static-demo.generaltranslation.dev)** | **[General Translation Docs](https://generaltranslation.com/docs)**

## About

Many languages require articles, adjectives, and verb forms to agree with the grammatical gender or case of nouns. This app demonstrates how `<Static>` and `declareStatic()` solve this by generating separate translation entries for each permutation at build time, enabling proper grammatical agreement without runtime translation.

Toggle between "boy" and "girl" subjects, switch languages, and watch the entire sentence adapt — including articles and adjective endings.

## GT Features Used

- `<Static>` — Build-time permutation generation for JSX content
- `declareStatic()` — Build-time permutation generation for string translations
- `<T>` — JSX translation
- `getGT` / `useGT` — String translations
- `<LocaleSelector>` — Language picker
- `loadTranslations` — Local translation storage

## Getting Started

```bash
git clone https://github.com/gt-examples/static-demo.git
cd static-demo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Built With

- [Next.js](https://nextjs.org)
- [General Translation](https://generaltranslation.com) (gt-next)
- [Tailwind CSS](https://tailwindcss.com)
