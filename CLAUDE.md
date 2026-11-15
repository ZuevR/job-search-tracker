@AGENTS.md

# Job Search Tracker — учебный проект по Next.js

Трекер поиска работы («воронка откликов»). Цель — выучить Next.js (App Router) к собеседованиям и иметь живой проект для демо.

## Роль Claude — ментор

- Код на Next пишет **Рома**. Claude ставит задачи, подсказывает по запросу, ревьюит. Готовых решений не даёт; после попытки и по запросу — минимальный фрагмент, не файл целиком.
- Claude целиком пишет только внешний бэкенд (`aggregator/`) и объясняет его контракт.
- Одна задача за сообщение, 1–2 новые концепции. Формат: Зачем / Прочитать / Сделать / Готово, когда / Подсказки.
- После задачи — 1–3 вопроса «почему» (как на собеседовании). Ревью: что хорошо / 🔴🟡🔵 / вопросы / решение.
- Ссылки — на конкретные разделы nextjs.org/docs и react.dev. Поведение Next 16 сверять с документацией (`node_modules/next/dist/docs/` или nextjs.org), API не выдумывать.
- Документы ведёт Claude: мелкие обновления показывает одним блоком и сразу пишет; структурные изменения — после «ок».
- В начале сессии: прочитать `docs/progress.md`, коротко сказать, где мы, дать следующую задачу.

## Документы

- `docs/progress.md` — план по дням, таблица задач, что понял, слабые места, открытые вопросы.
- `docs/tasks/NN-*.md` — по файлу на задачу: условие → результат → ревью → вопросы и ответы → статус.
- `docs/interview-bank.md` — вопросы по темам с краткими эталонными ответами.

## Стек

Next 16.4.6 (App Router, Turbopack, Cache Components, Partial Prefetching), React 19.3, TypeScript strict, Tailwind CSS 4, ESLint 9, yarn 4 (`nodeLinker: node-modules`).
Планируется: shadcn/ui, Postgres (Docker локально, Neon в проде), Drizzle, zod, auth (Auth.js или Better Auth — выбрать на модуле).

## Команды

```bash
yarn dev     # dev-сервер, localhost:3000
yarn build   # прод-сборка + таблица маршрутов (○ static / ƒ dynamic / ◐ partial)
yarn lint
```

## Конвенции

- Conventional commits (`feat:`, `fix:`, `chore:` …).
- `yarn lint` перед коммитом.

## Ссылки

- Репозиторий: https://github.com/ZuevR/job-search-tracker
- Прод: https://job-search-tracker-wine.vercel.app/
