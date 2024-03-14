<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'

const mapStore = useMapStore();
const accessLibreStore = useAccessLibreStore();

const markerPopup: any = ref(null);
const markerCoordinates: any = ref(null);
const mapLocation: any = ref([47.22080552180658, 2.829457070540785]);
const zoom: any = ref(6);

onMounted( async () => {
  const codeInsee = mapStore.state.codeInsee;

  if(!codeInsee && "geolocation" in navigator) {
    const clientPosition: any = await mapStore.getPosition();
    await mapStore.reverseGeoCode(clientPosition.coordinates);
  } else {
    console.log(codeInsee);
    console.log(mapStore.state.mapLocation);
    mapLocation.value = mapStore.state.mapLocation;
    zoom.value = 12;

    markerCoordinates.value = mapStore.state.mapLocation;
    markerPopup.value = mapStore.state.townName;
    // await accessLibreStore.getERPSCount(mapStore.state.codeInsee);
  }
});

watch(() => mapStore.state.mapLocation, async (newState) => {

  await mapStore.reverseGeoCode(newState);

  mapLocation.value = newState;
  zoom.value = 12;

  markerCoordinates.value = newState;

  markerPopup.value = mapStore.state.townName;

  await accessLibreStore.getERPSCount(mapStore.state.codeInsee);
  // await accessLibreStore.getActivitiesByTown(mapStore.state.townName);
});

</script>

<template>
  <div id="map" class="mt-14 lg:mt-0 h-[400px] sm:h-[400px] w-full mx-auto md:mx-0">
    <LMap
      ref="map"
      :zoom="zoom"
      :center="mapLocation"
      class="z-0"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a>"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker v-if="markerCoordinates" :lat-lng="markerCoordinates">
        <LPopup>{{ markerPopup }}</LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<style scoped>

</style>