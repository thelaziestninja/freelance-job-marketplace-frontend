import { atom } from "jotai";

export const notificationAtom = atom<string | null>(null);

export const setMessageAtom = atom(null, (get, set, message: string) => {
  set(notificationAtom, message);
});
