<script setup lang="ts">
const mapStore = useMapStore();

const markerPopup: any = ref(null);
const markerCoordinates: any = ref(null);
const mapLocation: any = ref(null);
const zoom: any = ref(null);

onBeforeMount(() => {
  if (mapStore.state.mapLocation) {
    mapLocation.value = mapStore.state.mapLocation;
    zoom.value = 12;
  } else {
    mapLocation.value = [47.22080552180658, 2.829457070540785];
    zoom.value = 6;
  }
})

onMounted( async () => {
  const codeInsee = mapStore.state.codeInsee;

  if(!codeInsee && "geolocation" in navigator) {
    const clientPosition: any = await mapStore.getPosition();
    await mapStore.reverseGeoCode(clientPosition.coordinates);
  } else {
    mapLocation.value = mapStore.state.mapLocation;
    zoom.value = 12;

    markerCoordinates.value = mapStore.state.mapLocation;
    markerPopup.value = mapStore.state.townName;
  }
});

watch(() => mapStore.state.mapLocation, async (newState) => {

  await mapStore.reverseGeoCode(newState);

  mapLocation.value = newState;
  zoom.value = 12;
  markerCoordinates.value = newState;
  markerPopup.value = mapStore.state.townName;
});

</script>

<template>
  <div id="map" class="pt-40 sm:pt-20 lg:mt-0 h-[400px] sm:h-[600px] w-full mx-auto md:mx-0">
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