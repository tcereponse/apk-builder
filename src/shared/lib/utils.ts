export const cn = (...classes: (string | undefined | false | null)[]): string => {
 return classes.filter(Boolean).join(' ');
};

export const generateSlug = (text: string): string => {
 return text
 .toLowerCase()
 .normalize('NFD')
 .replace(/[̀-ͯ]/g, '')
 .replace(/[^a-z0-9]+/g, '-')
 .replace(/^-+/, '')
 .replace(/-+/, '');
};

export const formatDate = (date: string | Date): string => {
 const d = typeof date === 'string' ? new Date(date) : date;
 return d.toLocaleDateString('fr-FR', {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
 hour: '2-digit',
 minute: '2-digit',
 });
};

export const formatDateShort = (date: string | Date): string => {
 const d = typeof date === 'string' ? new Date(date) : date;
 return d.toLocaleDateString('fr-FR', {
 year: 'numeric',
 month: 'short',
 day: 'numeric',
 });
};

export const truncateText = (text: string, maxLength: number): string => {
 if (text.length <= maxLength) return text;
 return text.slice(0, maxLength).trim() + '...';
};

export const isValidUrl = (url: string): boolean => {
 try {
 new URL(url);
 return true;
 } catch {
 return false;
 }
};

export const normalizeUrl = (url: string): string => {
 try {
 const parsed = new URL(url);
 return parsed.hostname + parsed.pathname;
 } catch {
 return url;
 }
};

export const extractDomain = (url: string): string => {
 try {
 const parsed = new URL(url);
 return parsed.hostname.replace('www.', '');
 } catch {
 return url;
 }
};

export const getInitials = (name: string): string => {
 return name
 .split(' ')
 .map((part) => part[0])
 .join('')
 .toUpperCase()
 .slice(0, 2);
};

export const debounce = <T extends (...args: unknown[]) => void>(
 fn: T,
 delay: number
): ((...args: Parameters<T>) => void) => {
 let timeout: NodeJS.Timeout;
 return (...args: Parameters<T>) => {
 clearTimeout(timeout);
 timeout = setTimeout(() => fn(...args), delay);
 };
};

export const throttle = <T extends (...args: unknown[]) => void>(
 fn: T,
 limit: number
): ((...args: Parameters<T>) => void) => {
 let inThrottle = false;
 return (...args: Parameters<T>) => {
 if (!inThrottle) {
 fn(...args);
 inThrottle = true;
 setTimeout(() => (inThrottle = false), limit);
 }
 };
};

export const groupBy = <T, K extends string | number>(
 array: T[],
 keySelector: (item: T) => K
): Record<K, T[]> => {
 return array.reduce(
 (acc, item) => {
 const key = keySelector(item);
 if (!acc[key]) acc[key] = [];
 acc[key].push(item);
 return acc;
 },
 {} as Record<K, T[]>
 );
};

export const sortByDate = <T extends { createdAt: string }>(
 items: T[],
 order: 'asc' | 'desc' = 'desc'
): T[] => {
 return [...items].sort((a, b) => {
 const dateA = new Date(a.createdAt).getTime();
 const dateB = new Date(b.createdAt).getTime();
 return order === 'desc' ? dateB - dateA : dateA - dateB;
 });
};

export const getStatusColor = (status: string): string => {
 const colors: Record<string, string> = {
 PENDING: 'bg-yellow-500',
 VALIDATED: 'bg-green-500',
 REJECTED: 'bg-red-500',
 SUCCESS: 'bg-green-500',
 PARTIAL: 'bg-orange-500',
 FAILED: 'bg-red-500',
 ADMIN: 'bg-purple-600',
 MODERATOR: 'bg-blue-600',
 USER: 'bg-gray-500',
 };
 return colors[status] || 'bg-gray-300';
};

export const getStatusLabel = (status: string): string => {
 const labels: Record<string, string> = {
 PENDING: 'En attente',
 VALIDATED: 'Validé',
 REJECTED: 'Rejeté',
 SUCCESS: 'Succès',
 PARTIAL: 'Partiel',
 FAILED: 'Échec',
 ADMIN: 'Administrateur',
 MODERATOR: 'Modérateur',
 USER: 'Utilisateur',
 };
 return labels[status] || status;
};

export const deepClone = <T>(obj: T): T => {
 return JSON.parse(JSON.stringify(obj));
};

export const areEqual = <T>(a: T, b: T): boolean => {
 return JSON.stringify(a) === JSON.stringify(b);
};
