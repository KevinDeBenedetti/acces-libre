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

  await navigateTo('/');
}
</script>

<template>
  <div class="flex">
    <PrimeAutoComplete :pt="{ input: { class: '' } }" v-model="value" :suggestions="mappedCities" @complete="search($event)" placeholder="Saisir une commune"/>
    <PrimeButton icon="pi pi-search" class="ml-2" @click="show(value)"/>
  </div>
</template>