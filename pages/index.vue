<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeMount, watch } from 'vue';
import { useMapStore } from '~/stores/map';
import { useAccessLibreStore } from '~/stores/accesLibre';
import { runtime } from 'std-env'

// Pinia Stores
const mapStore = useMapStore();
const accessLibreStore = useAccessLibreStore();


// Variables
const value = ref("");
const mappedCities: any = ref(null);
const filteredCountries = ref<{ nom: string; codeDepartement: string; code:string; }[] | null>(null);
const zoom: any = ref(null);
const mapLocation: any = ref(null);
const clientCoordonates: any = ref(null);

const activities: any = reactive([]);

// TODO => Create an Array for factorisation
const clientInfo: any = ref(null);
const clientTown: any = ref(null);

const erpsCount: any = ref(null);

onBeforeMount(() => {
  // TODO => Uitiliser mapLocation dans un state pour enregistrer les coordonnées et le zoom durant la navigation
  mapLocation.value = [47.22080552180658, 2.829457070540785];
  zoom.value = 6;
});

onMounted( async () => {
  const config = useRuntimeConfig();
  console.log(config.public.test);

  const postalCode = mapStore.state.postalCode;
  // Si la localisation est permise par le client
  if(!postalCode && "geolocation" in navigator) {
    const { latitude, longitude }: any = await mapStore.getPosition();
    mapLocation.value = [latitude, longitude];
    zoom.value = null;
    zoom.value = 12;
    clientCoordonates.value = [latitude, longitude];

    const geoInfo: any = await mapStore.reverseGeoCode(latitude, longitude);
    clientInfo.value = geoInfo.displayName;
    clientTown.value = geoInfo.town;

    const postCode: number = geoInfo.postCode;
    await accessLibreStore.getERPSCountByPostalCode(postCode);
    erpsCount.value = accessLibreStore.state.erpsCount;
    await accessLibreStore.getActivitiesByTown(clientTown.value);
    activities.value = accessLibreStore.state.activities;
  } else {
    // TODO => Modify the map to zoom properly
    const latitude: any = mapStore.state.latitude;
    const longitude: any = mapStore.state.longitude;
    mapLocation.value = [latitude, longitude];
    zoom.value = 12;
    clientCoordonates.value = [latitude, longitude];
    const geoInfo: any = await mapStore.reverseGeoCode(latitude, longitude);
    clientInfo.value = geoInfo.displayName;
    clientTown.value = geoInfo.town;
  }
});

// Search a town
const search = async (event: any) => {
  let query = event.query;
  let response: any = await mapStore.searchTown(query);
  // filteredCounries.value = response;
  mappedCities.value = accessLibreStore.filterERPS(response);
  console.log(mappedCities.value);

}

const show = async (value: string) => {
  // Remove markers ?
  console.log(value);
  // Format value for request to api
  const formattedValue = value.replace(/\s*\([^)]*\)\s*/, '');
  const response = await $fetch(`https://geo.api.gouv.fr/communes?nom=${formattedValue}&fields=codesPostaux,centre,departement&format=json&geometry=centre`);

  const latitude = response[0].centre.coordinates[1];
  const longitude = response[0].centre.coordinates[0];

  // Update map
  mapLocation.value = [latitude, longitude];
  zoom.value = 12;
  clientCoordonates.value = [latitude, longitude];

  const geoInfo: any = await mapStore.reverseGeoCode(latitude, longitude);
  clientInfo.value = geoInfo.displayName;
  clientTown.value = geoInfo.town;

  const postCode: number = geoInfo.postCode;
  await accessLibreStore.getERPSCountByPostalCode(postCode);
  erpsCount.value = accessLibreStore.state.erpsCount;
  await accessLibreStore.getActivitiesByTown(clientTown.value);
  activities.value = accessLibreStore.state.activities;

  const mapElement = document.getElementById('map');
  if (mapElement) {
    mapElement.scrollIntoView({ behavior: 'smooth' });
  }
}

</script>

<template>

  <div class="sm:w-5/6 mx-auto">

    <h1 class="text-2xl sm:text-3xl font-bold mx-4 sm:mx-0">Carte intéractive <br> API Accès Libre</h1>

    <p class="mt-4 mx-4 sm:mx-0">Découvrez une carte interactive mettant en évidence les emplacements des établissements PMR dans différentes communes. La carte est alimentée par des données en temps réel provenant de l'API Accès Libre, permettant aux utilisateurs de visualiser facilement la répartition des établissements accessibles.</p>

    <PrimeCard>
      <template #title>Recherche</template>
      <template #content>
        <div class="flex flex-col gap-4 md:justify-center md:w-3/5 md:mx-auto">
          <PrimeAutoComplete :pt="{ input: { class: 'w-full' } }" v-model="value" :suggestions="mappedCities" @complete="search($event)" placeholder="Saisir une commune"/>
          <PrimeButton  label="Rechercher" @click="show(value)"/>
        </div>
      </template>
    </PrimeCard>

    <div id="map" class="mt-14 h-[400px] sm:h-[600px] mx-auto">
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
        <LMarker v-if="clientCoordonates" :lat-lng="clientCoordonates">
          <LPopup>{{ clientInfo }}</LPopup>
        </LMarker>
      </LMap>
    </div>

<!-- TODO => Ajouter une condition s'il n'y a pas d'informations Exemple avec la commune de Céret (66)-->
    <PrimeCard v-if="erpsCount && clientTown" class="mt-2">
      <template #title>Informations</template>
      <template #content>
<!--        TODO => Afficher erpsCount avec un compteur de 0 à N-->
        <h3>Il y a {{ erpsCount }} établissements à {{ clientTown }}.</h3>
      </template>
    </PrimeCard>

    <PrimePanel v-if="activities.value" header="Catégories" toggleable class="mt-10">
      <h3>Activités à {{ clientTown }}</h3>
      <div class="flex gap-3 flex-wrap mt-4">
        <div v-for="activity in activities.value" class="relative">
          <PrimeChip class="bg-[#C2E0FAC9] border-2 border-[#2093F750] text-center text-xs" :label="activity.nom" />
          <PrimeBadge class="absolute right-[-14px] top-[-10px]" :value="activity.count" severity="contrast"></PrimeBadge>
        </div>
      </div>
    </PrimePanel>

  </div>

</template>

<style scoped>

</style>