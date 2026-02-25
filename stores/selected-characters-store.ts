import { create } from "zustand";

import type { Character } from "@/types/character";

export type SelectedCharacter = Pick<
  Character,
  "id" | "name" | "image" | "status" | "gender"
>;

export interface SelectedCharactersState {
  selectedCharacters: Record<number, SelectedCharacter>;
}

export interface SelectedCharactersActions {
  toggleCharacter: (character: SelectedCharacter) => void;
  clearSelectedCharacters: () => void;
}

export type SelectedCharactersStore = SelectedCharactersState & SelectedCharactersActions;

export const useSelectedCharactersStore = create<SelectedCharactersStore>((set) => ({
  selectedCharacters: {},
  toggleCharacter: (character) =>
    set((state) => {
      const nextSelected = { ...state.selectedCharacters };

      if (nextSelected[character.id]) {
        delete nextSelected[character.id];
      } else {
        nextSelected[character.id] = character;
      }

      return { selectedCharacters: nextSelected };
    }),
  clearSelectedCharacters: () => set({ selectedCharacters: {} }),
}));
