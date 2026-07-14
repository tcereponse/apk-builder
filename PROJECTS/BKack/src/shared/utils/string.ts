export function capitalize(str: string): string {
if (str.length === 0) return str;
return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
if (str.length <= maxLength) return str;
return str.slice(0, maxLength - suffix.length) + suffix;
}

export function slugify(str: string): string {
return str
.toLowerCase()
.replace(/[^a-z0-9]+/g, '-')
.replace(/^-+|-+$/g, '');
}

export function generateId(): string {
return Math.random().toString(36).substring(2, 15) +
Math.random().toString(36).substring(2, 15);
}