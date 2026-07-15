import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGameDetails, useGameScreenshots } from '@shared/hooks/useGames';
import { getPlatformNames, getReleaseYear } from '@shared/services/gameService';
import { ArrowLeft, Calendar, Monitor, Star, Globe, ExternalLink, Clock } from 'lucide-react';

export default function GameDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: game, isLoading: gameLoading, error: gameError } = useGameDetails(id || '');
  const { data: screenshots, isLoading: screenshotsLoading } = useGameScreenshots(id || '');

  if (gameLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-diamond-border border-t-diamond-text" />
      </div>
    );
  }

  if (gameError || !game) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <p className="text-diamond-muted">Impossible de charger ce jeu.</p>
        <button
          onClick={() => navigate('/')}
          className="rounded-full border border-diamond-border/30 px-6 py-2 text-sm text-diamond-text transition-colors hover:bg-white/5"
        >
          Retourner à l'accueil
        </button>
      </div>
    );
  }

  const year = getReleaseYear(game);
  const platforms = getPlatformNames(game);
  const description = game.description_raw || game.description || 'Aucune description disponible.';
  const screenshotList = screenshots || [];

  return (
    <div className="pb-16 pt-4">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-diamond-muted transition-colors hover:text-diamond-text -ml-2"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Retour
        </Link>

        <div className="mt-4 space-y-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
            <div className="sm:w-[280px] lg:w-[320px] flex-shrink-0">
              <div className="overflow-hidden rounded-xl glass-panel">
                {game.background_image ? (
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="h-auto w-full object-cover aspect-[3/4]"
                  />
                ) : (
                  <div className="aspect-[3/4] flex items-center justify-center bg-diamond-surface/40">
                    <span className="text-sm text-diamond-muted/50">No cover</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-diamond-text sm:text-3xl lg:text-4xl">
                  {game.name}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-diamond-muted">
                  {year && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" strokeWidth={1.5} />
                      {year}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Monitor className="h-4 w-4" strokeWidth={1.5} />
                    {platforms.slice(0, 4).join(', ')}
                    {platforms.length > 4 && ` +${platforms.length - 4}`}
                  </span>
                  {game.rating && (
                    <span className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-yellow-500/70 text-yellow-500/70" strokeWidth={2} />
                      {game.rating.toFixed(1)}
                    </span>
                  )}
                  {game.metacritic && (
                    <span className="rounded bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                      {game.metacritic}%
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {game.genres.slice(0, 4).map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-diamond-border/30 px-3 py-1 text-xs text-diamond-muted/80"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="prose prose-invert prose-sm max-w-none text-diamond-muted/90">
                <p className="leading-relaxed">{description}</p>
              </div>

              {(game.website || game.reddit_url) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {game.website && (
                    <a
                      href={game.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-diamond-muted transition-colors hover:text-diamond-text"
                    >
                      <Globe className="h-4 w-4" strokeWidth={1.5} />
                      Site officiel
                      <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                    </a>
                  )}
                  {game.reddit_url && (
                    <a
                      href={game.reddit_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-diamond-muted transition-colors hover:text-diamond-text"
                    >
                      Reddit
                      <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {screenshotList.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium uppercase tracking-wider text-diamond-muted/50">
                Captures d'écran
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {screenshotList.slice(0, 8).map((shot: any, index: number) => (
                  <div
                    key={shot.id || index}
                    className="overflow-hidden rounded-lg glass-panel-light transition-transform hover:scale-[1.02]"
                  >
                    <img
                      src={shot.image}
                      alt={`Screenshot ${index + 1}`}
                      loading="lazy"
                      className="h-auto w-full object-cover aspect-video"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}