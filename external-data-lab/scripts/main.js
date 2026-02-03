import { fetchPokemonById, fetchSpeciesById } from "./poke-api.js";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Register component when Alpine is ready (most reliable)
document.addEventListener("alpine:init", () => {
  Alpine.data("pokedexApp", () => ({
    loading: false,
    error: "",
    showDetails: true,

    pokemon: null,
    species: null,

    async init() {
      await this.loadRandom();
    },

    toggleDetails() {
      this.showDetails = !this.showDetails;
    },

    async loadRandom() {
      this.loading = true;
      this.error = "";

      try {
        const id = randomInt(1, 1025);

        const [pokemon, species] = await Promise.all([
          fetchPokemonById(id),
          fetchSpeciesById(id),
        ]);

        this.pokemon = pokemon;
        this.species = species;
      } catch (err) {
        this.error = err?.message ?? "Unknown error";
      } finally {
        this.loading = false;
      }
    },
  }));
});
