import { format, parseISO, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';
export function formatDate(dateStr: string | null | undefined): string {
if (!dateStr) return 'À venir';
try {
const date = parseISO(dateStr);
if (!isValid(date)) return 'À venir';
return format(date, 'dd MMM yyyy', { locale: fr });
} catch {
return 'À venir';
}
}
export function formatDateShort(dateStr: string | null | undefined): string {
if (!dateStr) return 'À venir';
try {
const date = parseISO(dateStr);
if (!isValid(date)) return 'À venir';
return format(date, 'dd/MM/yyyy', { locale: fr });
} catch {
return 'À venir';
}
}
export function getYear(dateStr: string | null | undefined): string {
if (!dateStr) return 'À venir';
try {
const date = parseISO(dateStr);
if (!isValid(date)) return 'À venir';
return format(date, 'yyyy');
} catch {
return 'À venir';
}
}