<script setup lang="ts">
import { watch, ref } from 'vue'

const mapStore = useMapStore();
const accessLibreStore = useAccessLibreStore();

const erpsCount: any = ref(null);
const clientTown: any = ref(null);
const activities: any = ref(null);

watch(() => mapStore.state.townName, async (newState) => {
    erpsCount.value = accessLibreStore.state.erpsCount;
    await accessLibreStore.getActivitiesByTown(newState);
    activities.value = accessLibreStore.state.activities;
});
</script>

<template>
  <!-- TODO => Ajouter une condition s'il n'y a pas d'informations Exemple avec la commune de Céret (66)-->
  <PrimeCard v-if="erpsCount && clientTown" class="mt-2">
    <template #title>Informations</template>
    <template #content>
      <!--        TODO => Afficher erpsCount avec un compteur de 0 à N-->
      <h3>Il y a {{ erpsCount }} établissements à {{ clientTown }}.</h3>
    </template>
  </PrimeCard>

  <div>
    <PrimePanel v-if="activities" header="Catégories" toggleable class="mt-10">
      <h3>Activités à {{ clientTown }}</h3>
      <div class="flex gap-3 flex-wrap mt-4">
        <div v-for="activity in activities" class="relative">
          <PrimeChip class="bg-[#C2E0FAC9] border-2 border-[#2093F750] text-center text-xs" :label="activity.nom" />
          <PrimeBadge class="absolute right-[-14px] top-[-10px]" :value="activity.count" severity="contrast"></PrimeBadge>
        </div>
      </div>
    </PrimePanel>
  </div>
</template>

<style scoped>

</style>