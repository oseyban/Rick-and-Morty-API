"use client";

import { useMemo } from "react";

import { useSelectedCharactersStore } from "@/stores/selected-characters-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SelectedCharactersSummary() {
  const selectedCharacters = useSelectedCharactersStore((state) => state.selectedCharacters);
  const clearSelectedCharacters = useSelectedCharactersStore((state) => state.clearSelectedCharacters);

  const selectedList = useMemo(() => Object.values(selectedCharacters), [selectedCharacters]);

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-2 pt-6">
        <Badge variant="secondary">Selected: {selectedList.length}</Badge>
        {selectedList.slice(0, 5).map((character) => (
          <Badge key={character.id} variant="outline">
            {character.name}
          </Badge>
        ))}
        {selectedList.length > 0 ? (
          <Button type="button" variant="outline" size="sm" onClick={clearSelectedCharacters}>
            Clear
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
