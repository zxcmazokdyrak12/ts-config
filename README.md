# ts-practice-1

Практическая работа №1.1 — Установка TypeScript.

## Запуск

```bash
npm install
npm run build        # npx tsc
npm start            # node dist/index.js
```

Дополнительно:

```bash
node dist/basics.js      # часть 2 — базовые типы
node dist/functions.js   # часть 3 — функции
npx tsc -p errors/tsconfig.json   # покажет намеренные ошибки из частей 2, 3 и 5
```

## Структура

```
src/
  index.ts        # часть 4 — запуск «Библиотеки»
  library.ts      # тип Book и функции
  basics.ts       # часть 2
  functions.ts    # часть 3
errors/           # файлы с намеренными ошибками (не входят в сборку)
REPORT.md         # ответы на теоретические задания
tsconfig.json
package.json
```
