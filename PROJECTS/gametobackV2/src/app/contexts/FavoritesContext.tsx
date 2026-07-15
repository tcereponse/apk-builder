import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { openDB, IDBPDatabase } from 'idb';
interface FavoritesContextType {
favorites: number[];
isLoading: boolean;
addFavorite: (id: number) => Promise<void>;
removeFavorite: (id: number) => Promise<void>;
toggleFavorite: (id: number) => Promise<void>;
isFavorite: (id: number) => boolean;
}
const FavoritesContext = createContext<FavoritesContextType | null>(null);
const DB_NAME = 'GAMETOBACKV2';
const STORE_NAME = 'favorites';
const DB_VERSION = 1;
let dbInstance: IDBPDatabase | null = null;
async function getDB(): Promise<IDBPDatabase> {
if (dbInstance) return dbInstance;
dbInstance = await openDB(DB_NAME, DB_VERSION, {
upgrade(db) {
if (!db.objectStoreNames.contains(STORE_NAME)) {
db.createObjectStore(STORE_NAME, { keyPath: 'id' });
}
},
});
return dbInstance;
}
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
const [favorites, setFavorites] = useState<number[]>([]);
const [isLoading, setIsLoading] = useState(true);
const loadFavorites = useCallback(async () => {
try {
const db = await getDB();
const all = await db.getAll(STORE_NAME);
setFavorites(all.map((item) => item.id));
} catch (error) {
console.warn('Failed to load favorites:', error);
setFavorites([]);
} finally {
setIsLoading(false);
}
}, []);
useEffect(() => {
loadFavorites();
}, [loadFavorites]);
const addFavorite = useCallback(async (id: number) => {
try {
const db = await getDB();
await db.put(STORE_NAME, { id });
setFavorites((prev) => {
if (prev.includes(id)) return prev;
return [...prev, id];
});
} catch (error) {
console.warn(`Failed to add favorite ${id}:`, error);
}
}, []);
const removeFavorite = useCallback(async (id: number) => {
try {
const db = await getDB();
await db.delete(STORE_NAME, id);
setFavorites((prev) => prev.filter((fid) => fid !== id));
} catch (error) {
console.warn(`Failed to remove favorite ${id}:`, error);
}
}, []);
const toggleFavorite = useCallback(
async (id: number) => {
if (favorites.includes(id)) {
await removeFavorite(id);
} else {
await addFavorite(id);
}
},
[favorites, addFavorite, removeFavorite]
);
const isFavorite = useCallback(
(id: number) => favorites.includes(id),
[favorites]
);
const value: FavoritesContextType = {
favorites,
isLoading,
addFavorite,
removeFavorite,
toggleFavorite,
isFavorite,
};
return (
<FavoritesContext.Provider value={value}>
{children}
</FavoritesContext.Provider>
);
}
export function useFavorites(): FavoritesContextType {
const context = useContext(FavoritesContext);
if (!context) {
throw new Error('useFavorites must be used within a FavoritesProvider');
}
return context;
}