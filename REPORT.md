# Практическая работа №1.1 — Установка TypeScript

Отчёт с ответами на теоретические задания. Все сообщения компилятора получены реальным запуском `tsc` (версия 6.0.3), файлы с намеренными ошибками лежат в папке `errors/`.

## Часть 1. Подготовка проекта

```bash
mkdir ts-practice-1
cd ts-practice-1
npm init -y
npm install --save-dev typescript
npx tsc --init
```

`tsconfig.json` настроен по заданию: `target: esnext`, `module: nodenext`, `strict: true`, `rootDir: ./src`, `outDir: ./dist`, `exclude: [node_modules, dist]`.
В `package.json` добавлено `"type": "module"` — без него Node.js трактует `.js`-файлы как CommonJS, и режим `nodenext` не заработает с ES-импортами.

## Часть 2. Базовые типы

### 2.3. Намеренные ошибки и их исправление

| Код с ошибкой | Сообщение компилятора | Исправление |
|---|---|---|
| `let title: string = "Книга"; title = 123;` | `error TS2322: Type 'number' is not assignable to type 'string'.` | `title = "Война и мир";` |
| `let pages: number = 300; pages = "много";` | `error TS2322: Type 'string' is not assignable to type 'number'.` | `pages = 500;` |
| `let isRead: boolean = false; isRead = 1;` | `error TS2322: Type 'number' is not assignable to type 'boolean'.` | `isRead = true;` |

### 2.4. Почему `let userName: string = null;` даёт ошибку

Сообщение: `error TS2322: Type 'null' is not assignable to type 'string'.`

При `"strict": true` включается `strictNullChecks`. Он запрещает присваивать `null` и `undefined` переменным других типов: `null` — отдельный тип, не входящий в `string`. Это защищает от ошибок «Cannot read properties of null» во время выполнения.

Корректные варианты:

1. Объединение типов: `let userName: string | null = null;`
2. Пустая строка: `let userName: string = "";`
3. `undefined` в объединении: `let userName: string | undefined = undefined;`

## Часть 3. Функции

### 3.2. Некорректные вызовы

| Вызов | Сообщение компилятора |
|---|---|
| `formatPrice("100");` | `error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.` |
| `clamp(5, 0);` | `error TS2554: Expected 3 arguments, but got 2.` |
| `logMessage(123);` | `error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.` |

### 3.3. Чем `void` отличается от `undefined`

- `void` — «функция не возвращает полезного значения». Возвращаемое значение не используется, тип нужен для функций с побочными эффектами (`console.log`, запись в файл). Оператор `return` не обязателен.
- `undefined` — конкретное значение (и тип). Функция с возвращаемым типом `undefined` обязана явно вернуть `undefined`.

```ts
function logMessage(msg: string): void { console.log(msg); }
function returnUndefined(): undefined { return undefined; }
```

## Часть 4. Мини-проект «Библиотека»

Реализован в `src/library.ts` (тип `Book` и функции `createBook`, `markAsRead`, `getBookInfo`, `countReadBooks`) и `src/index.ts`.

```bash
npx tsc
node dist/index.js
```

Фактический вывод:

```
«1984», Джордж Оруэлл, 1949 — прочитана
«Мастер и Маргарита», Михаил Булгаков, 1967 — не прочитана
«Преступление и наказание», Фёдор Достоевский, 1866 — прочитана
Прочитано книг: 2
```

Важно: при `module: nodenext` импорт пишется с расширением `.js` (`from "./library.js"`), даже если файл исходно `.ts`. Без него компилятор выдаёт `error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './library.js'?`

## Часть 5. Анализ ошибок компилятора

| Код | Фрагмент | Ошибка | Причина и исправление |
|---|---|---|---|
| A | `let count = 5; count = "десять";` | `TS2322: Type 'string' is not assignable to type 'number'.` | Тип `number` выведен из начального значения `5`. Строку присвоить нельзя. Исправление: `count = 10;` или явно `let count: number \| string = 5;` |
| B | `add(2);` для `add(x: number, y: number)` | `TS2554: Expected 2 arguments, but got 1.` | Оба параметра обязательные. Исправление: `add(2, 3);` или сделать второй параметр необязательным/дефолтным: `y: number = 0`. |
| C | `let name: string = null;` | `TS2322: Type 'null' is not assignable to type 'string'.` | При `strictNullChecks` `null` не входит в `string`. Исправление: `let name: string \| null = null;` или `let name: string = "";`. |
| D | `function greet(name: string): string { console.log(...); }` | `TS2355: A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.` | Функция объявлена как возвращающая `string`, но ничего не возвращает. Исправление: добавить `return "Привет, " + name;` или сменить тип возврата на `void`. |

Примечание: в новых версиях TypeScript в тексте ошибки D перечислено `'undefined', 'void', nor 'any'`; в старых — только `'void' nor 'any'`. Смысл тот же.

## Часть 6. Вопросы для самопроверки

**1. Что такое статическая типизация и какие преимущества она даёт?**
Тип переменной известен на этапе компиляции и проверяется до запуска программы. Преимущества: ошибки находятся до выполнения кода, лучше автодополнение и навигация в редакторе, безопаснее рефакторинг, типы служат документацией.

**2. Что такое вывод типов? Когда лучше указывать аннотацию явно?**
Вывод типов — автоматическое определение типа по начальному значению (`let city = "Москва"` → `string`). Явную аннотацию лучше указывать для параметров функций, возвращаемых значений публичных функций, переменных без начального значения и когда нужен более широкий тип (например, `string | null`).

**3. За что отвечает `"strict": true`?**
Включает набор строгих проверок: `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `alwaysStrict`, `useUnknownInCatchVariables` и др.

**4. Как скомпилировать проект и запустить результат?**
`npx tsc` компилирует `src/*.ts` в `dist/*.js`, затем `node dist/index.js` запускает результат.

**5. Почему `null` нельзя присвоить `string` при `strictNullChecks`? Как правильно?**
`null` и `undefined` считаются самостоятельными типами и не входят в остальные. Если значение может отсутствовать, это нужно выразить в типе: `let x: string | null = null;`.

**6. Чем `void` отличается от `undefined` в возвращаемом типе?**
`void` — функция не возвращает осмысленного значения, `return` не нужен. `undefined` — функция обязана явно вернуть значение `undefined`.

**7. Какую роль играют `rootDir` и `outDir`?**
`rootDir` — корень исходников (`./src`); от него строится структура выходных файлов. `outDir` — папка для скомпилированных `.js` (`./dist`). Благодаря этому исходники и результат не смешиваются.
