# Aggregator — фейковый агрегатор вакансий

Внешний бэкенд для учебного проекта. Его пишет Claude, а Next-приложение только ходит в него по HTTP, как в чужой API.

- Без зависимостей: Node 24, чистый JS, Web-стандартные `Request`/`Response`.
- Данные генерируются детерминированно (фиксированный seed): 120 вакансий, 20 компаний. Даты публикации отсчитываются от момента запуска сервера.
- Каждый эндпоинт специально отвечает с задержкой, чтобы были видны водопады запросов.

## Запуск локально

```bash
yarn aggregator          # http://localhost:4000/api, перезапуск при изменениях
```

В терминале агрегатора логируется каждый запрос: время прихода `→` и ответа `←` с длительностью. По этим логам видно, шли запросы параллельно или друг за другом.

В Next-приложении базовый URL берётся из env:

```bash
cp .env.example .env.local   # AGGREGATOR_URL=http://localhost:4000/api
```

## Эндпоинты

Все ответы — JSON, `cache-control: no-store`. Только `GET`.

| Метод и путь | Задержка по умолчанию | Ответ |
|---|---|---|
| `GET /api/health` | 0 мс | `{ ok: true }` |
| `GET /api/stats` | 700 мс | `Stats` |
| `GET /api/vacancies` | 1000 мс | `VacancyList` |
| `GET /api/vacancies/:id` | 500 мс | `Vacancy` или 404 |
| `GET /api/companies/:id` | 800 мс | `Company` или 404 |

### Query-параметры `GET /api/vacancies`

| Параметр | Тип | По умолчанию | Смысл |
|---|---|---|---|
| `q` | string | — | поиск подстроки в названии, компании и тегах, без учёта регистра |
| `city` | string | — | точное совпадение города, например `Москва` |
| `remote` | `true` \| `false` | — | только удалённые или только офисные |
| `tag` | string | — | точное совпадение тега без учёта регистра, например `react` |
| `salaryFrom` | integer | — | вакансии, где верхняя (или нижняя, если верхней нет) граница ≥ значения |
| `sort` | `date` \| `salary` | `date` | сначала новые или сначала с большей зарплатой |
| `page` | integer ≥ 1 | `1` | номер страницы |
| `limit` | integer 1–50 | `10` | размер страницы |

Неверное значение параметра → 400 с `error.code = "bad_param"`.

### Служебные параметры (для любого эндпоинта)

| Параметр | Смысл |
|---|---|
| `delay=<ms>` | переопределить задержку (0–30000), например `delay=0` |
| `fail=1` | ответить 500 `simulated_failure` |

Переменные окружения агрегатора: `PORT` (4000), `AGGREGATOR_DELAY_SCALE` (множитель всех задержек, 1), `AGGREGATOR_FAIL_RATE` (доля случайных 500, от 0 до 1, по умолчанию 0).

## Типы ответов

```ts
type Vacancy = {
  id: string;               // "v-001"
  title: string;            // "Senior Next.js-разработчик"
  companyId: string;        // "c-02" → GET /api/companies/c-02
  companyName: string;
  city: string;
  remote: boolean;
  salaryFrom: number | null; // в рублях
  salaryTo: number | null;
  currency: 'RUB';
  tags: string[];
  source: 'jobboard' | 'telegram' | 'career-site' | 'referral';
  publishedAt: string;      // ISO 8601
  description: string;
};

// В списке приходит превью: всё, кроме description.
type VacancyPreview = Omit<Vacancy, 'description'>;

type VacancyList = {
  items: VacancyPreview[];
  page: number;
  limit: number;
  total: number;            // всего найдено с учётом фильтров
  totalPages: number;       // минимум 1
};

type Company = {
  id: string;               // "c-01"
  name: string;
  city: string;
  size: '1-50' | '51-200' | '201-1000' | '1000+';
  field: string;
  rating: number;           // 3.2–4.9
  website: string;
  description: string;
};

type Stats = {
  totalVacancies: number;
  remoteVacancies: number;
  newLast24h: number;
  avgSalaryFrom: number;    // средняя нижняя граница среди вакансий с зарплатой
  topCities: { name: string; count: number }[]; // топ-5
  topTags: { name: string; count: number }[];   // топ-5
  generatedAt: string;      // ISO 8601, момент ответа
};

type ApiError = {
  error: { code: 'not_found' | 'bad_param' | 'simulated_failure' | 'method_not_allowed' | 'internal'; message: string };
};
```

Обрати внимание: `Vacancy` содержит только `companyId`, а данные компании приходят отдельным запросом. Это сделано специально: так возникает зависимый (последовательный) запрос.

## Деплой на Vercel

Агрегатор деплоится отдельным проектом Vercel из того же репозитория:

1. Vercel → Add New → Project → тот же репозиторий.
2. **Root Directory:** `aggregator`, **Framework Preset:** Other (не Node: тот ищет точку входа сервера и может взять локальный `src/server.js`). Build-команда не нужна.
   У агрегатора свой `yarn.lock`: так yarn 4 считает папку отдельным проектом. Без него `yarn install` на Vercel поднимается до корневого проекта Next и падает с «doesn't seem to be part of the project».
3. После деплоя базовый URL — `https://<проект-агрегатора>.vercel.app/api`.
4. В проекте Next-приложения: Settings → Environment Variables → `AGGREGATOR_URL` = этот URL.

Файлы `api/**` — точки входа Vercel Functions (`export function GET(request)`). Вся логика лежит в `src/app.js`, локальный сервер `src/server.js` вызывает тот же `handle()`.

## Планы

- Webhook «вакансии обновились» → Route Handler в Next → инвалидация кэша по тегу (задача 11).
