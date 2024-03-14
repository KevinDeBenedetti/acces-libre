<script setup lang="ts">
const mapStore = useMapStore();
const accessLibreStore = useAccessLibreStore();

const townName: any = ref(null);
const erpsCount: any = ref(null);

onMounted(() => {
  townName.value = mapStore.state.townName;
  erpsCount.value = accessLibreStore.state.erpsCount;
});
</script>

<template>
  <h1 class="text-lg sm:text-3xl">Établissements à <span class="font-bold">{{ townName }}</span></h1>

  <p class="italic text-sm">Il y a {{ erpsCount }} établissements</p>
</template>