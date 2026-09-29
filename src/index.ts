import { createBook, markAsRead, getBookInfo, countReadBooks } from "./library.js";

const books = [
    createBook("1984", "Джордж Оруэлл", 1949),
    createBook("Мастер и Маргарита", "Михаил Булгаков", 1967),
    createBook("Преступление и наказание", "Фёдор Достоевский", 1866),
];

books[0] = markAsRead(books[0]);
books[2] = markAsRead(books[2]);

books.forEach(book => console.log(getBookInfo(book)));
console.log(`Прочитано книг: ${countReadBooks(books)}`);
