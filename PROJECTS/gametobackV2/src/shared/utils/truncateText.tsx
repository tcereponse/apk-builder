export function truncateText(text: string | null | undefined, maxLength: number = 120): string {
if (!text) return '';
if (text.length <= maxLength) return text;
return text.slice(0, maxLength).trim() + '...';
}