```
├── env
│   └── .env.(...)
├── public
│   └── ...
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── (...)
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   ├── (...).woff|tiff
│   │   │   └── index.ts
│   │   ├── layout.tsx
│   │   ├── [locale]
│   │   │   ├── (auth)
│   │   │   │   ├── layout.tsx
│   │   │   │   └── (...)
│   │   │   │       └── page.tsx
│   │   │   └── (private)
│   │   │       ├── layout.tsx
│   │   │       └── (...)
│   │   │       │   └── page.tsx
│   │   │       ├── not-found.tsx
│   │   │       ├── page.tsx
│   │   │       └── [...rest]
│   │   │           └── page.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components
│   │   └── (...)
│   │   │   ├── component-root.tsx
│   │   │   ├── (...).tsx|ts
│   │   │   └── index.ts
│   ├── constants
│   │   └── (...).ts
│   ├── i18n
│   │   ├── config.ts
│   │   ├── locales
│   │   │   └── (...)
│   │   │       └── (...),json
│   │   └── request.ts
│   ├── middlewares
│   │   └── with(...).ts
│   ├── middleware.ts
│   ├── server-actions
│   │   └── (...).ts
│   ├── types
│   │   └── (...).d.ts
│   └── views
│       └── (...)View
│           ├── component-root.tsx
│           ├── components
│           │   └── (...).tsx
│           ├── context
│           │   ├── context.tsx
│           │   ├── (...).tsx|ts
│           │   └── index.ts
│           ├── hooks
│           │   └── use(...).tsx|ts
│           ├── index.ts
│           └── types.d.ts
│
├── eslint.config.js
├── next.config.js
├── next-env.d.ts
├── package.json
├── server.cjs
├── tsconfig.json
├── turbo.json
└── web.config
```