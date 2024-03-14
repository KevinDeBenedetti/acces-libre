<script setup lang="ts">
import SearchResult from '~/components/Home/SearchResult.vue'

useSeoMeta({
  title: "Accès Libre | Accueil",
  description: "Voici un exemple d'app utilisant l'api accès libre."
});
</script>

<template>
  <div class="sm:w-5/6 mx-auto">
    <HomeIntro />
    <div class="mt-10 lg:flex lg:gap-4">
      <HomeMap />
      <HomeSearch />
      <SearchResult />
    </div>
  </div>
</template>