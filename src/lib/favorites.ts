import { useEffect, useState } from "react";

const KEY = "bharatroots-favourites";

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    setFavourites(read());
    const onStorage = () => setFavourites(read());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = (id: string) => {
    const next = favourites.includes(id)
      ? favourites.filter((f) => f !== id)
      : [...favourites, id];
    setFavourites(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  return { favourites, toggle, isFavourite: (id: string) => favourites.includes(id) };
}
