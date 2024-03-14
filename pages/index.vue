<script setup lang="ts">
useSeoMeta({
  title: "Accès Libre | Accueil",
  description: "Voici un exemple d'app utilisant l'api accès libre."
});
</script>

<template>
  <div class="sm:w-5/6 mx-auto">
    <HomeIntro />
    <div class="lg:flex lg:gap-4">
      <HomeMap />
    </div>
    <HomeSearchResult />
  </div>
</template>