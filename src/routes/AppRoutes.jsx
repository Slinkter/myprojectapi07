
import { Suspense, lazy } from 'react';
import { PokemonSkeleton } from '@/features/pokemon';

// Lazy loading for pages
const PokedexPage = lazy(() => import('@/pages/PokedexPage'));

/**
 * AppRoutes
 * Centralized routing management.
 * Provides a clear overview of the application's entry points.
 */
const AppRoutes = () => {
  return (
    <Suspense 
      fallback={
        <div className="flex justify-center items-center h-screen bg-slate-50 dark:bg-slate-900">
          <div className="w-full max-w-sm p-4">
            <PokemonSkeleton />
          </div>
        </div>
      }
    >
      {/* Since there's no router library installed yet (react-router-dom), 
          we render the main page directly. This stays scalable for when 
          the USER decides to add more routes. */}
      <PokedexPage />
    </Suspense>
  );
};

export default AppRoutes;
