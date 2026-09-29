// Часть 3. Типизированные функции

// Задание 3.1
export function formatPrice(value: number): string {
    return value.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₽";
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function logMessage(message: string): void {
    console.log(message);
}

export function repeat(text: string, times: number = 2): string {
    return text.repeat(times);
}

export function describeUser(name: string, age?: number): string {
    if (age !== undefined) {
        return `${name}, возраст: ${age}`;
    }
    return name;
}

// Задание 3.3 — void и undefined
export function returnUndefined(): undefined {
    return undefined;
}

// Задание 3.2. Корректные вызовы
// (некорректные вызовы и тексты ошибок — в errors/errors-demo.ts)
console.log(formatPrice(1234.5));        // "1 234,50 ₽"
console.log(clamp(15, 0, 10));           // 10
logMessage("Привет");                    // "Привет"
console.log(repeat("abc"));              // "abcabc"
console.log(describeUser("Иван"));       // "Иван"
console.log(describeUser("Иван", 25));   // "Иван, возраст: 25"
