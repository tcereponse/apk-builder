import React from 'react';
import { Search, Heart } from 'lucide-react';
export interface EmptyStateProps {
title?: string;
message?: string;
icon?: 'search' | 'heart' | 'default';
}
export function EmptyState({
title = 'Aucun résultat',
message = 'Aucun élément trouvé correspondant à votre recherche.',
icon = 'default',
}: EmptyStateProps) {
const IconComponent = {
search: Search,
heart: Heart,
default: Search,
}[icon];
return (
    <div className="flex flex-col items-center justify-center gap-3 text-center p-8 py-16">
      <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center">
        <IconComponent className="w-7 h-7 text-zinc-600" />
      </div>
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-xs">{message}</p>
    </div>
  );
}