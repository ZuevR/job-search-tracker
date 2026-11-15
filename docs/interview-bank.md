# Interview bank — Next.js / React

Вопросы, которые всплыли по ходу проекта, с краткими эталонными ответами.
Формат: **Вопрос** → ответ в 2–5 предложениях (как сказать на собеседовании) → ссылка на доку → где это в проекте.

## 1. Основы App Router

**Что значит `○ (Static)` в выводе `next build`? Что делает страницу динамической?**
Страница пререндерена один раз во время сборки, и готовый HTML (плюс RSC payload) отдаётся всем пользователям, обычно из CDN. Динамической её делают данные, которые есть только во время запроса: `cookies()`, `headers()`, `searchParams`, `connection()`, некэшированные `fetch` и запросы к БД. Клиентские компоненты и обработчики событий на статичность не влияют, потому что они тоже пререндерятся в HTML и затем гидрируются. С Cache Components (Next 16) динамику оборачивают в `<Suspense>`, и получается `◐ Partial Prerender`: статическая оболочка мгновенно отдаётся, а динамические части стримятся во время запроса. Легенда: `○` static, `◐` partial prerender, `ƒ` dynamic.
→ nextjs.org/docs/app/getting-started/caching · проект: задача 1.

**Чем `layout.tsx` отличается от `page.tsx`? Что происходит с layout при навигации?**
`page` — уникальный UI маршрута, именно он делает сегмент публичным URL. `layout` — общий UI, который оборачивает свой сегмент и все вложенные. При навигации внутри layout он не перемонтируется: состояние и DOM сохраняются, а перерисовывается только изменившаяся часть (partial rendering).
→ nextjs.org/docs/app/getting-started/layouts-and-pages

**Почему root layout обязан содержать `<html>` и `<body>`?**
В App Router нет отдельного `index.html` или `_document`, поэтому корневой layout сам является HTML-документом. `<head>` руками не пишется: Next собирает его из `metadata`/`generateMetadata` всех layouts и pages на пути маршрута.
→ nextjs.org/docs/app/api-reference/file-conventions/layout#root-layout

**Откуда берутся `PageProps` / `LayoutProps` без импорта?**
Это глобальные типы, которые `next dev`, `next build` и `next typegen` генерируют в `.next/types` по реальной структуре `app/`. Благодаря им `params` типизированы по сегментам маршрута, а `href` у `Link` проверяется на существующие маршруты.
→ nextjs.org/docs/app/api-reference/config/typescript

## 2. Server vs Client Components

## 3. Загрузка данных, streaming, ошибки

## 4. Кэширование и режимы рендеринга

## 5. Маршрутизация

## 6. Мутации и Server Actions

## 7. Данные и БД

## 8. Аутентификация и proxy

## 9. Route Handlers

## 10. Качество и производительность
