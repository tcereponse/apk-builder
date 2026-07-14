export function shuffle<T>(array: T[]): T[] {
const result = [...array];
for (let i = result.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[result[i], result[j]] = [result[j], result[i]];
}
return result;
}

export function chunk<T>(array: T[], size: number): T[][] {
const result: T[][] = [];
for (let i = 0; i < array.length; i += size) {
result.push(array.slice(i, i + size));
}
return result;
}

export function unique<T>(array: T[]): T[] {
return Array.from(new Set(array));
}

export function groupBy<T, K extends string | number | symbol>(
array: T[],
key: (item: T) => K
): Record<K, T[]> {
return array.reduce((acc, item) => {
const groupKey = key(item);
if (!acc[groupKey]) {
acc[groupKey] = [];
}
acc[groupKey].push(item);
return acc;
}, {} as Record<K, T[]>);
}