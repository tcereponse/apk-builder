import React from 'react';
import { Carousel } from '../components/Carousel';
import { SearchBar } from '../components/SearchBar';
import { FilterDropdown } from '../components/FilterDropdown';
import { useGames } from '../hooks/useGames';
import { useGamesFilters } from '../hooks/useGamesFilters';
import { ErrorMessage } from '@shared/components/ui/ErrorMessage';
import { LoadingScreen } from '@shared/components/ui/LoadingScreen';
const YEAR_OPTIONS = [
{ value: '2026', label: '2026' },
{ value: '2025', label: '2025' },
{ value: '2024', label: '2024' },
{ value: '2023', label: '2023' },
{ value: '2022', label: '2022' },
{ value: '2021', label: '2021' },
{ value: '2020', label: '2020' },
{ value: '2019', label: '2019' },
{ value: '2018', label: '2018' },
{ value: '2017', label: '2017' },
{ value: '2016', label: '2016' },
{ value: '2015', label: '2015' },
{ value: '2010-2014', label: '2010-2014' },
{ value: '2000-2009', label: '2000-2009' },
{ value: '1990-1999', label: '1990-1999' },
{ value: '1989', label: '1989' },
];
const ORDERING_OPTIONS = [
{ value: '-released', label: 'Plus récents' },
{ value: 'released', label: 'Plus anciens' },
{ value: '-rating', label: 'Mieux notés' },
{ value: 'rating', label: 'Moins bien notés' },
{ value: '-metacritic', label: 'Metacritic' },
{ value: 'name', label: 'Nom (A-Z)' },
];
export default function HomePage() {
const { filters, setSearch, setYear, setOrdering, resetFilters } = useGamesFilters();
const { data, isLoading, error, refetch } = useGames(filters);
const handleRetry = () => refetch();
if (isLoading && !data) {
return <LoadingScreen />;
}
if (error) {
return (
      <div className="flex-1 flex items-center justify-center p-6">
        <ErrorMessage
          title="Erreur de chargement"
          message="Impossible de charger les jeux. Vérifiez votre connexion réseau."
          onRetry={handleRetry}
          fullPage
        />
      </div>
    );
  }const games = data?.results || [];
return (
    <div className="flex-1 pb-4">
      <header className="relative pt-6 pb-4 px-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient tracking-tight">
              GAMETOBACK
              <span className="text-sm font-normal text-zinc-500 ml-2">v2</span>
            </h1>
            <span className="text-xs text-zinc-600 font-mono">
              1989 → 2026
            </span>
          </div>          <div className="flex flex-col sm:flex-row gap-2">
            <SearchBar
              value={filters.search || ''}
              onChange={setSearch}
              placeholder="Rechercher un jeu..."
              className="flex-1"
            />
            <div className="flex flex-wrap gap-2">
              <FilterDropdown
                label="Année"
                value={filters.year || ''}
                options={YEAR_OPTIONS}
                onChange={setYear}
                placeholder="Toutes"
              />
              <FilterDropdown
                label="Trier"
                value={filters.ordering || '-released'}
                options={ORDERING_OPTIONS}
                onChange={setOrdering}
                placeholder="Plus récents"
              />
            </div>
          </div>{(filters.search || filters.year || filters.ordering !== '-released') && (
<button
onClick={resetFilters}
className="text-xs text-zinc-500 hover:text-slate-300 transition-colors self-end"
>
Réinitialiser les filtres
</button>
)}
        </div>
      </header>      <div className="px-4">
        <Carousel
          title={filters.search ? `Résultats pour "${filters.search}"` : 'Nouveautés'}
          subtitle={
            filters.year
              ? `Jeux de ${filters.year}`
              : filters.search
                ? `${games.length} jeux trouvés`
                : 'Les dernières sorties'
          }
          games={games}
          loading={isLoading}
          error={error as Error | null}
          onRetry={handleRetry}
          autoplay={false}
        />
      </div>{games.length > 0 && (
        <div className="text-center mt-6 text-xs text-zinc-600">
          {data?.count} jeux trouvés
        </div>
      )}
    </div>
  );
}