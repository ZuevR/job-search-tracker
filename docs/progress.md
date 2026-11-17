# Прогресс

**Дедлайн:** ср, 25.11.2026 (перенесён с 18.11) — готовность к собеседованиям (живой проект + банк ответов).
**Темп:** 8–10 ч/день, задачи по 30–90 минут.

## План по дням

### Сб–Пн, 14–16.11 — фундамент
- [x] 1. Старт: create-next-app, App Router, layout/page, `Link`, `next/font`, metadata, GitHub → Vercel (задачи 1–2)

### Вт, 17.11 — граница Server/Client и данные
- [ ] 2+3. shadcn/ui + граница Server/Client: `'use client'`, сериализуемые props, композиция через `children` (задача 3)
- [ ] 4. Загрузка данных в серверных компонентах (агрегатор), параллельная vs последовательная, `searchParams`

### Ср, 18.11 — streaming и ошибки
- [ ] 5. `loading.tsx`, Suspense, streaming, `error.tsx`, `not-found.tsx`
- [ ] 6а. Cache Components: `'use cache'`, static shell, `◐` в build output

### Чт, 19.11 — кэширование и маршруты
- [ ] 6б. `cacheLife`, `cacheTag`, ревалидация; отличия от модели 13–15
- [ ] 7. Динамические маршруты, `generateStaticParams`, route groups, parallel + intercepting routes (модалка вакансии)

### Пт, 20.11 — БД
- [ ] 8. Postgres в Docker + Drizzle, data access layer (`server-only`)
- [ ] 9а. Server Actions: формы, zod, `useActionState`

### Сб, 21.11 — мутации
- [ ] 9б. `useOptimistic`, ревалидация после мутаций, обработка ошибок
- [ ] 10а. Auth: выбор библиотеки, вход, сессии

### Вс, 22.11 — auth и интеграция
- [ ] 10б. `proxy.ts`, защита страниц и Server Actions
- [ ] 11. Route Handlers, webhook от агрегатора → инвалидация по тегу

### Пн, 23.11 — прод и качество
- [ ] 12. Прод: Neon + Vercel, README-кейс, 3–4 истории «проблема → решение»
- [ ] 13. Тесты: Vitest (unit для DAL/actions) + один Playwright-сценарий

### Вт, 24.11 — буфер и полировка
- [ ] Буфер под хвосты
- [ ] Одно из: канбан с DnD / статистика воронки / Lighthouse + разбор бандла
- [ ] Пробное собеседование: прогон `interview-bank.md` вслух

### Ср, 25.11 утро
- [ ] Финальный прогон слабых мест

### После 25.11
a11y, OG-картинки, напоминания, оставшиеся пункты из вторника.

## Задачи

| # | Задача | Модуль | Статус | Файл |
|---|--------|--------|--------|------|
| 1 | Проект, GitHub, первый деплой | 1 | ✅ 14.11 | [tasks/01-project-setup.md](tasks/01-project-setup.md) |
| 2 | Каркас: вложенные layouts, навигация, metadata, шрифт | 1 | ✅ 16.11 | [tasks/02-layouts-navigation.md](tasks/02-layouts-navigation.md) |
| 3 | shadcn/ui и граница Server/Client | 1 | 🔄 выдана 16.11 | [tasks/03-shadcn-server-client.md](tasks/03-shadcn-server-client.md) |

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
