import { fetchPokemonById, fetchSpeciesById } from "./poke-api.js";

function randomInt(min, max) {
  // inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.pokedexApp = function () {
  return {
    loading: false,
    error: "",
    showDetails: true,

    pokemon: null,
    species: null,

    async init() {
      // load one on first page view
      await this.loadRandom();
    },

    toggleDetails() {
      this.showDetails = !this.showDetails;
    },

    async loadRandom() {
      this.loading = true;
      this.error = "";

      try {
        // Gen 1–9 range-ish; keep it safe:
        const id = randomInt(1, 1025);

        // Two endpoints (requirement): pokemon + species
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
  };
};
