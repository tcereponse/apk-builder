import { NavLink } from 'react-router-dom';
import { Home, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
const navItems = [
{ to: '/', icon: Home, label: 'Accueil' },
{ to: '/favorites', icon: Heart, label: 'Favoris' },
];
export function BottomNav() {
return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-colors duration-200 ${
                isActive
                  ? 'text-sky-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium tracking-wide">
                  {label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-sky-400"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}