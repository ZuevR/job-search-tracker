# Прогресс

**Дедлайн:** ср, 18.11.2026 — готовность к собеседованиям (живой проект + банк ответов).
**Темп:** 8–10 ч/день, задачи по 30–90 минут.

## План по дням

### Сб, 14.11 — фундамент
- [ ] 1. Старт: create-next-app, структура App Router, layout/page, `Link`, `next/font`, metadata, GitHub → Vercel
- [ ] 2. Tailwind + shadcn/ui: лендинг и каркас кабинета
- [ ] 3. Server vs Client Components: граница, `'use client'`, сериализуемые props, композиция через `children`

### Вс, 15.11 — данные
- [ ] 4. Загрузка данных в серверных компонентах (агрегатор), параллельная vs последовательная, `searchParams`
- [ ] 5. `loading.tsx`, Suspense, streaming, `error.tsx`, `not-found.tsx`
- [ ] 6. Кэширование в Next 16: Cache Components, `'use cache'`, `cacheLife`, `cacheTag`; static/dynamic по build output; отличия от модели 13–15

### Пн, 16.11 — маршруты и мутации
- [ ] 7. Динамические маршруты, `generateStaticParams`, route groups, parallel + intercepting routes (модалка вакансии)
- [ ] 8. Postgres в Docker + Drizzle, data access layer (`server-only`)
- [ ] 9. Server Actions: формы, zod, `useActionState`, `useOptimistic`, ревалидация

### Вт, 17.11 — auth и интеграция
- [ ] 10. Auth: вход, сессии, `proxy.ts`, защита страниц и Server Actions
- [ ] 11. Route Handlers, webhook от агрегатора → инвалидация по тегу
- [ ] 12. Прод: Neon + Vercel, README-кейс, 3–4 истории «проблема → решение»

### Ср, 18.11 утро
- [ ] Прогон `interview-bank.md`

### После среды
Vitest + Playwright, Lighthouse/бандл, a11y, канбан с DnD, статистика воронки, OG-картинки, напоминания.

## Задачи

| # | Задача | Модуль | Статус | Файл |
|---|--------|--------|--------|------|
| 1 | Проект, GitHub, первый деплой | 1 | ✅ 14.11 | [tasks/01-project-setup.md](tasks/01-project-setup.md) |
| 2 | Каркас: вложенные layouts, навигация, metadata, шрифт | 1 | ✅ 16.11 | [tasks/02-layouts-navigation.md](tasks/02-layouts-navigation.md) |

## Что понял

- Типы маршрутов (`LayoutProps`, `PageProps`) — глобальные, их генерирует Next в `.next/types` по структуре `app/`.
- Layout не перерисовывается при навигации внутри своего сегмента.
- С `cacheComponents` ушедшие маршруты прячутся через `<Activity>` (до 3 штук), а не размонтируются: сохраняются state и DOM.
- `metadata` сливается по дереву сегментов; `title.template`/`default`/`absolute`.
- `next/font`: шрифт скачивается при сборке и раздаётся со своего домена; fallback с подогнанными метриками против CLS; `variable` только объявляет CSS-переменную.
- Cascade layers: стили вне `@layer` побеждают утилиты Tailwind 4.

## Слабые места

- Проверка результата: «Готово, когда» — проверять самому (деплои в Vercel, lint).
- ❗ Static vs dynamic: путает «где рендерится» и «когда». Клиентский JS не делает страницу динамической; динамической её делают данные запроса (`cookies`, `headers`, `searchParams`, некэшированные данные). → вернуться в задаче 3 (Server/Client) и в модуле 6.
- ❗ «Сохранение при навигации» объяснял через `'use client'`. На деле дело в том, какой сегмент перемонтируется: общий layout остаётся, `page` меняется. → задача 3.
- RSC payload: ожидал увидеть в нём HTML. → задача 3.
- Root layout = HTML-документ (вместо `index.html`/`_document`), `<head>` собирается из Metadata API.

## Открытые вопросы

- 
