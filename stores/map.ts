import { defineStore } from 'pinia'

export const useMapStore = defineStore('mapStore', () => {
  const state = reactive({
    postalCode: null as number | null,
    townName: null as string | null,
    latitude: null as number | null,
    longitude: null as number | null
  });

  function setGeoInfo(value: any) {
    state.townName = value.town;
    state.postalCode = value.postcode;
  }

  function setLatitude(value: number) {
    state.latitude = value
  }

  function setLongitude(value: number) {
    state.longitude = value
  }

  async function searchTown(query: string) {
    try {
      return await $fetch(`https://geo.api.gouv.fr/communes?nom=${query}&boost=population&limit=5`);
    } catch (error) {
      console.error(error)
    }
  }

  function getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          setLatitude(latitude);

          setLongitude(longitude);

          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        })
    })
  }

  async function reverseGeoCode(latitude: number, longitude: number) {
    try {
/*      const { data } = await useAsyncData(() => $fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`));*/

      const response: any = await $fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);

      setGeoInfo(response.address);

      return {
        town: response.address.town,
        postCode: response.address.postcode,
        displayName: response.display_name
      }

    } catch (error) {
      console.error(error)
    }
  }


  return {
    getPosition,
    reverseGeoCode,
    searchTown,
    state
  };
})