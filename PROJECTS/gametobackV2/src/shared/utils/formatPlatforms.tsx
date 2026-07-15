import { Platform } from '@shared/constants/api';
const platformIcons: Record<string, string> = {
pc: '💻',
playstation: '🎮',
xbox: '🎮',
nintendo: '🎮',
ios: '📱',
android: '📱',
mac: '🖥',
linux: '🐧',
'web-browser': '🌐',
'xbox-one': '🎮',
'xbox-series-x': '🎮',
'playstation-4': '🎮',
'playstation-5': '🎮',
'nintendo-switch': '🎮',
'nintendo-3ds': '🎮',
'nintendo-ds': '🎮',
};
const platformShortNames: Record<string, string> = {
pc: 'PC',
playstation: 'PS',
xbox: 'Xbox',
nintendo: 'Nintendo',
ios: 'iOS',
android: 'Android',
mac: 'Mac',
linux: 'Linux',
'web-browser': 'Web',
'xbox-one': 'Xbox One',
'xbox-series-x': 'Xbox SX',
'playstation-4': 'PS4',
'playstation-5': 'PS5',
'nintendo-switch': 'Switch',
'nintendo-3ds': '3DS',
'nintendo-ds': 'DS',
};
export function formatPlatforms(platforms: Array<{ platform: Platform }>): string {
if (!platforms || platforms.length === 0) return 'Multi-plateforme';
const names = platforms.map((p) => {
const slug = p.platform.slug;
return platformShortNames[slug] || p.platform.name;
});
return names.join(' • ');
}
export function getPlatformIcon(platformSlug: string): string {
return platformIcons[platformSlug] || '🎮';
}
export function getPlatformBadge(platformSlug: string): string {
return platformShortNames[platformSlug] || platformSlug;
}