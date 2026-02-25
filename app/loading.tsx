import { CharacterListLoading } from "@/components/character-list-loading";

export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6 md:p-10">
      <p className="text-sm text-slate-500">Loading characters...</p>
      <CharacterListLoading />
    </main>
  );
}
