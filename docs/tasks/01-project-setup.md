# Задача 1 — Проект, GitHub, первый деплой

**Статус:** ✅ принято 14.11.2026 · вопросы: 1 — ❌, 2 — 🟡, 3 — ✅
**Модуль:** 1 — Старт

## Условие

**Зачем:** понять, из чего состоит App Router-проект «из коробки», и с первого дня иметь пайплайн `git push` → прод.

**Прочитать:**
- https://nextjs.org/docs/app/getting-started/installation
- https://nextjs.org/docs/app/getting-started/project-structure
- https://nextjs.org/docs/app/getting-started/deploying

**Сделать:**
1. Создать проект с recommended defaults в текущей папке.
2. Запустить dev-сервер, открыть `localhost:3000`.
3. Разобраться, зачем каждый файл в корне и в `app/` (`next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `tsconfig.json`).
4. Заменить главную на заглушку.
5. Публичный репозиторий на GitHub, push.
6. Vercel: Import → Deploy.
7. Изменить заглушку, push, убедиться в авто-деплое.
8. `build` локально, сохранить таблицу маршрутов.

**Готово, когда:** localhost и прод-URL показывают заглушку (прод — вторую версию), в Vercel ≥ 2 деплоев, прислана ссылка на репо, прод-URL и вывод build.

## Результат

- Репозиторий: https://github.com/ZuevR/job-search-tracker
- Прод: https://job-search-tracker-wine.vercel.app/ — показывает «Ver 2.0»; Vercel-статус коммита `0a3b7e0` — success.
- yarn 4 (`nodeLinker: node-modules`) вместо npm — Vercel подхватил без настроек.
- Defaults Next 16.4: TypeScript, ESLint, Tailwind 4 (через `@tailwindcss/turbopack`), App Router, Cache Components, Partial Prefetching, AGENTS.md.

```
Route (app)
┌ ○ /
└ ○ /_not-found
○  (Static)  prerendered as static content
```

## Ревью

**Хорошо:** авто-деплой работает; осознанный выбор yarn 4 + node-modules linker; conventional commit; `.idea/` в `.gitignore`.

- 🟡 Неиспользуемый `import Image` в `app/page.tsx` — warning `yarn lint`. Привычка: lint перед коммитом.
- 🟡 Деплои в Vercel не проверены самостоятельно — это часть «Готово, когда»; там же build logs для разбора падений.
- 🔵 `metadata.title` = «Create Next App», `<html lang="en">` при русском контенте — в задаче 2.

## Вопросы на понимание

1. В выводе build у `/` стоит `○ (Static)`. Что это значит — где и когда сгенерирована страница? Что должно появиться в коде, чтобы она перестала быть полностью статической?
2. Чем `layout.tsx` отличается от `page.tsx`? Что происходит с layout при навигации между страницами под ним? Почему корневой layout обязан содержать `<html>` и `<body>`?
3. `LayoutProps<"/">` используется без импорта — откуда он берётся?

### Ответы и оценка

**1. ❌ Static `○`.**
Ответ: «страница сформирована на сервере и пришла как HTML; перестанет быть статической, если появится JS для обработки событий в браузере».
Разбор: на сервере HTML формируется и у динамических страниц, поэтому дело не в том, *где* рендер, а в том, *когда*. `○` значит, что страница пререндерена **один раз во время `next build`**, а потом для всех пользователей отдаётся готовый HTML (и RSC payload) из CDN. Клиентский JS здесь ни при чём: Client Components (`'use client'`, `onClick`) тоже пререндерятся в HTML и потом гидрируются. Статичность ломают **данные, известные только во время запроса**: `cookies()`, `headers()`, `searchParams`, `params` без `generateStaticParams`, `connection()`, а также некэшированные `fetch` и запросы к БД. С Cache Components такие места нужно оборачивать в `<Suspense>` (или кэшировать через `'use cache'`). Тогда получается `◐ Partial Prerender`: статическая оболочка плюс динамические «дыры», которые стримятся во время запроса. Без Suspense `next build` упадёт с ошибкой blocking prerender. Подробно — в модулях 3 и 6.

**2. 🟡 layout vs page.**
- «layout — обёртка над разделом, page — часть раздела» — направление верное. Точнее: `page` — уникальный UI маршрута, и **без `page.tsx` папка вообще не маршрут**. `layout` — общий UI, который оборачивает свой сегмент и все вложенные.
- «при навигации не меняется» — ✅. Формулировка из доки: layouts preserve state, remain interactive, and do not rerender. Это partial rendering: перерисовывается только изменившаяся часть дерева.
- «root layout — агрегатор метаинформации» — ❌. В App Router нет отдельного `index.html` или `_document`, и **корневой layout сам является HTML-документом**, поэтому `<html>` и `<body>` должны быть в нём. `<head>` руками не пишем: Next собирает его из `metadata`/`generateMetadata`, которые экспортируют layouts и pages. Слияние там действительно есть, но это отдельный механизм.

**3. ✅ `LayoutProps`.**
Ответ: «`declare global`, компилятор видит». Верно. Добавлю, откуда это берётся: `next dev`, `next build` и `next typegen` генерируют `.d.ts` в `.next/types/` (подключены через `next-env.d.ts` и `include` в `tsconfig.json`). Типы строятся по реальной структуре `app/`: `PageProps<'/u/[username]'>` знает, что `params: Promise<{ username: string }>`, а `Link` проверяет `href` на существующие маршруты.
