import type { Character } from "@/types/character";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <img
          src={character.image}
          alt={character.name}
          className="h-56 w-full rounded-t-xl object-cover"
        />
      </CardContent>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{character.name}</CardTitle>
        <Badge variant="secondary">{character.status}</Badge>
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-slate-600">
        <p>Gender: {character.gender}</p>
      </CardContent>
    </Card>
  );
}
