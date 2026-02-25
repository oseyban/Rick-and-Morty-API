"use client";

import Image from "next/image";

import type { Character } from "@/types/character";
import { cn } from "@/lib/utils";
import { useSelectedCharactersStore } from "@/stores/selected-characters-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const isSelected = useSelectedCharactersStore((state) =>
    Boolean(state.selectedCharacters[character.id]),
  );
  const toggleCharacter = useSelectedCharactersStore((state) => state.toggleCharacter);

  const handleToggle = () => {
    toggleCharacter({
      id: character.id,
      name: character.name,
      image: character.image,
      status: character.status,
      gender: character.gender,
    });
  };

  return (
    <Card className={cn(isSelected && "ring-2 ring-slate-900")}>
      <CardContent className="p-0">
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="h-56 w-full rounded-t-xl object-cover"
        />
      </CardContent>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{character.name}</CardTitle>
        <Badge variant="secondary">{character.status}</Badge>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-slate-600">
        <p>Gender: {character.gender}</p>
        <Button type="button" variant={isSelected ? "default" : "outline"} onClick={handleToggle}>
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CardContent>
    </Card>
  );
}
