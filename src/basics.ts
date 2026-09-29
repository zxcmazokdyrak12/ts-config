// Часть 2. Работа с базовыми типами

// Задание 2.1. Пять базовых типов с явной аннотацией
let studentName: string = "Анна";
let studentAge: number = 20;
let isEnrolled: boolean = true;
let middleName: null = null;
let hobby: undefined = undefined;

// Задание 2.2. Вывод типов (type inference) — аннотаций нет
let city = "Москва";         // string
let population = 12_000_000; // number
let isCapital = true;        // boolean

// Задание 2.3. Ошибки типизации вынесены в папку errors/ (см. errors/errors-demo.ts),
// чтобы проект нормально компилировался. Ниже — уже ИСПРАВЛЕННЫЕ версии.
let title: string = "Книга";
title = "Война и мир";       // было: title = 123;

let pages: number = 300;
pages = 500;                 // было: pages = "много";

let isRead: boolean = false;
isRead = true;               // было: isRead = 1;

// Задание 2.4. Корректный вариант вместо `let userName: string = null;`
let userName: string | null = null;

console.log("Студент:", studentName, studentAge, isEnrolled, middleName, hobby);
console.log("Город:", city, population, isCapital);
console.log("Книга:", title, pages, isRead);
console.log("userName:", userName);
