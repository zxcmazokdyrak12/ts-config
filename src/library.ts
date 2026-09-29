// Часть 4. Мини-проект «Библиотека»

export type Book = {
    title: string;
    author: string;
    year: number;
    isRead: boolean;
};

export function createBook(title: string, author: string, year: number): Book {
    return { title, author, year, isRead: false };
}

export function markAsRead(book: Book): Book {
    return { ...book, isRead: true };
}

export function getBookInfo(book: Book): string {
    const status = book.isRead ? "прочитана" : "не прочитана";
    return `«${book.title}», ${book.author}, ${book.year} — ${status}`;
}

export function countReadBooks(books: Book[]): number {
    return books.filter(book => book.isRead).length;
}
