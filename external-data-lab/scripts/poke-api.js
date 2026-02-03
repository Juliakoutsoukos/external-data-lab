const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonById(id) {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!res.ok) throw new Error(`Pokémon fetch failed (status ${res.status})`);
  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    baseExp: data.base_experience,
    types: (data.types || []).map((t) => t.type.name),
    sprite:
      data.sprites?.other?.["official-artwork"]?.front_default ??
      data.sprites?.front_default ??
      null,
  };
}

export async function fetchSpeciesById(id) {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`);
  if (!res.ok) throw new Error(`Species fetch failed (status ${res.status})`);
  const data = await res.json();

  const englishGenus =
    (data.genera || []).find((g) => g.language.name === "en")?.genus ?? "Unknown";

  const englishFlavor =
    (data.flavor_text_entries || []).find((f) => f.language.name === "en")?.flavor_text ??
    "No flavor text found.";

  const cleanedFlavor = englishFlavor.replace(/\s+/g, " ").trim();

  return {
    genus: englishGenus,
    flavorText: cleanedFlavor,
    habitat: data.habitat?.name ?? "unknown",
  };
}
