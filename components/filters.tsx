"use client";

import { parseAsInteger, parseAsStringLiteral, useQueryStates } from "nuqs";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CharacterGender, CharacterStatus } from "@/types/character";

const STATUS_OPTIONS = ["alive", "dead", "unknown"] as const satisfies readonly CharacterStatus[];
const GENDER_OPTIONS = ["female", "male", "genderless", "unknown"] as const satisfies readonly CharacterGender[];

const statusParser = parseAsStringLiteral(STATUS_OPTIONS);
const genderParser = parseAsStringLiteral(GENDER_OPTIONS);

interface FiltersProps {
  disabled?: boolean;
}

function isCharacterStatus(value: string): value is CharacterStatus {
  return STATUS_OPTIONS.includes(value as CharacterStatus);
}

function isCharacterGender(value: string): value is CharacterGender {
  return GENDER_OPTIONS.includes(value as CharacterGender);
}

export function Filters({ disabled = false }: FiltersProps) {
  const [filters, setFilters] = useQueryStates(
    {
      status: statusParser,
      gender: genderParser,
      page: parseAsInteger.withDefault(1),
    },
    {
      shallow: false,
    },
  );

  return (
    <section className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <Badge variant="outline">shallow: false</Badge>
        <span>URL state with SSR reload</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Select
          disabled={disabled}
          value={filters.status ?? "all"}
          onValueChange={(value) =>
            setFilters({
              status: value === "all" ? null : isCharacterStatus(value) ? value : null,
              page: 1,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="alive">Alive</SelectItem>
            <SelectItem value="dead">Dead</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>

        <Select
          disabled={disabled}
          value={filters.gender ?? "all"}
          onValueChange={(value) =>
            setFilters({
              gender: value === "all" ? null : isCharacterGender(value) ? value : null,
              page: 1,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All gender</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="genderless">Genderless</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
