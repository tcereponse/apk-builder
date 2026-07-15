import React, { memo, useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useFavorites } from '@app/contexts/FavoritesContext';
export interface FavoriteButtonProps {
gameId: number;
initialFavorite?: boolean;
onToggle?: (id: number) => void;
size?: 'sm' | 'md' | 'lg';
className?: string;
}
function FavoriteButtonComponent({
gameId,
initialFavorite = false,
onToggle,
size = 'md',
className = '',
}: FavoriteButtonProps) {
const { isFavorite, toggleFavorite } = useFavorites();
const [isFav, setIsFav] = useState(initialFavorite);
useEffect(() => {
setIsFav(isFavorite(gameId));
}, [gameId, isFavorite]);
const handleToggle = async (e: React.MouseEvent) => {
e.preventDefault();
e.stopPropagation();
await toggleFavorite(gameId);
if (onToggle) onToggle(gameId);
};
const sizeClasses = {
sm: 'w-7 h-7 rounded-full',
md: 'w-9 h-9 rounded-full',
lg: 'w-11 h-11 rounded-full',
};
const iconSizes = {
sm: 'w-3.5 h-3.5',
md: 'w-4 h-4',
lg: 'w-5 h-5',
};
const classes = twMerge(
clsx(
'flex items-center justify-center transition-all duration-200',
'glass hover:scale-110 active:scale-95',
sizeClasses[size],
isFav
? 'bg-red-500/20 border-red-400/30 text-red-400 hover:bg-red-500/30'
: 'hover:bg-white/10 text-zinc-400 hover:text-red-400'
),
className
);
return (
<button
onClick={handleToggle}
className={classes}
aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
<Heart
className={iconSizes[size]}
fill={isFav ? 'currentColor' : 'none'}
strokeWidth={isFav ? 2 : 1.5}
/>
</button>
);
}
export const FavoriteButton = memo(FavoriteButtonComponent);