import { useEffect, useState } from "react";

const KEY = "bharatroots-favourites";
const CHANGE_EVENT = "bharatroots-favourites-changed";

function read(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : [];
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
    window.addEventListener(CHANGE_EVENT, onStorage);
    return () => { window.removeEventListener("storage", onStorage); window.removeEventListener(CHANGE_EVENT, onStorage); };
  }, []);

  const toggle = (id: string) => {
    const current = read();
    const next = current.includes(id)
      ? current.filter((f) => f !== id)
      : [...current, id];
    setFavourites(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return { favourites, toggle, isFavourite: (id: string) => favourites.includes(id) };
}
