# Next.js + gt-next Internationalization Example

A minimal Next.js application internationalized with [gt-next](https://generaltranslation.com/docs/next), demonstrating how to add multilingual support to a Next.js App Router project.

## Features

- 🌍 **5 languages** — English (default), Spanish, French, Japanese, and Chinese
- 🔄 **Locale switcher** — Built-in `<LocaleSelector>` component for switching languages
- 📦 **`<T>` component** — Wrap JSX content for automatic translation
- 🛣️ **Locale routing** — Middleware-based locale detection and URL prefixing (`/es/`, `/fr/`, etc.)
- ⚡ **Next.js 16** — App Router with Turbopack

## Quick Start

```bash
# Clone the repo
git clone https://github.com/gt-examples/next-app.git
cd next-app

# Install dependencies
npm install

# (Optional) Add your GT API keys for dev hot-reloading translations
# Create a .env.local file:
# GT_API_KEY=your-dev-api-key
# GT_PROJECT_ID=your-project-id

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and use the language dropdown to switch between languages.

## Project Structure

```
next-app/
├── gt.config.json              # GT locale configuration
├── proxy.ts                    # Locale detection middleware (Next.js 16+)
├── next.config.ts              # Next.js config with withGTConfig
└── src/app/[locale]/
    ├── layout.tsx              # Root layout with GTProvider
    ├── page.tsx                # Home page with <T> components
    └── globals.css             # Global styles
```

## How It Works

1. **`gt.config.json`** defines the default locale and supported locales
2. **`withGTConfig`** in `next.config.ts` initializes the gt-next SDK
3. **`proxy.ts`** middleware detects the user's language and routes to the correct `[locale]` path
4. **`<GTProvider>`** in the root layout provides translation context to client components
5. **`<T>`** components wrap translatable JSX content
6. **`<LocaleSelector>`** renders a language switcher dropdown

## Deploying to Production

For production, pre-translate your content:

```bash
# Set environment variables
export GT_PROJECT_ID=your-project-id
export GT_API_KEY=gtx-api-your-production-key

# Translate and build
npx gtx-cli translate
npm run build
```

Or add to your `package.json` build script:

```json
{
  "scripts": {
    "build": "npx gtx-cli translate && next build"
  }
}
```

## Learn More

- [gt-next Documentation](https://generaltranslation.com/docs/next)
- [gt-next Quickstart](https://generaltranslation.com/docs/next/tutorials/quickstart)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT
