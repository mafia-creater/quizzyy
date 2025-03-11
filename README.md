# QuizApp

QuizApp is a web application that allows users to create, share, and take quizzes. It uses Supabase for authentication and Prisma for database management.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Middleware](#middleware)
- [Components](#components)
- [API](#api)
- [Utilities](#utilities)

## Installation

To get started with QuizApp, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/quizapp.git
    cd quizapp
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables (see [Environment Variables](#environment-variables)).

4. Run the development server:
    ```bash
    npm run dev
    ```

## Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Project Structure

The project is structured as follows:

```
src/
├── app/
│   ├── auth/
│   │   ├── callback/
│   │   │   └── route.ts
│   │   ├── handle-hash-callback/
│   │   │   └── page.tsx
│   │   ├── oauth-callback/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── dashboard/
│   │   ├── dashboard-shell.tsx
│   │   ├── dashboard-skeleton.tsx
│   │   ├── leaderboard-card.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── quiz-grid.tsx
│   │   ├── recent-activity.tsx
│   │   └── subscription-status.tsx
│   └── ui/
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── sheet.tsx
│       └── skeleton.tsx
├── lib/
│   ├── activity.ts
│   ├── leaderboard.ts
│   ├── prisma.ts
│   ├── quiz.ts
│   ├── subscription.ts
│   ├── supabase.ts
│   └── utils.ts
└── middleware.ts
```

## Supabase Client

Create a `supabase.ts` file in the `lib` directory and add the following code:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Missing Supabase environment variables!");
    throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});
```

