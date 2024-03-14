<script setup lang="ts">
const mapStore = useMapStore();
const accessLibreStore = useAccessLibreStore();

const value = ref("");
const mappedCities: any = ref(null);

const search = async (event: any) => {
  let query = event.query;
  let response: any = await mapStore.searchTown(query);
  mappedCities.value = accessLibreStore.filterERPS(response);
}

const show = async (value: string) => {
  const formattedValue = value.replace(/\s*\([^)]*\)\s*/, '');

  await mapStore.getTown(formattedValue);

  const mapElement = document.getElementById('map');
  if (mapElement) {
    mapElement.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <div>
    <PrimeCard class="mt-10 lg:mt-0">
      <template #title>Recherche</template>
      <template #content>
        <div class="flex flex-col gap-4 md:justify-center md:w-3/5 md:mx-auto lg:w-full">
          <PrimeAutoComplete :pt="{ input: { class: 'w-full' } }" v-model="value" :suggestions="mappedCities" @complete="search($event)" placeholder="Saisir une commune"/>
          <PrimeButton  label="Rechercher" @click="show(value)"/>
        </div>
      </template>
    </PrimeCard>
  </div>
</template>