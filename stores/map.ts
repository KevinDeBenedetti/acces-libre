import { defineStore } from 'pinia'

export const useMapStore = defineStore('mapStore', () => {
  const state = reactive({
    mapLocation: null as [] | null,
    codeInsee: null as number | null,

    postalCode: null as number | null,
    townName: null as string | null,
    markerInfo: null as string | null,
  });

  function setCodeInsee(code: number) {
    state.codeInsee = code;
  }
  function setTownName(value: string) {
    state.townName = value;
  }

  function setMapLocation(value: any) {
    state.mapLocation = value
  }

  async function getTown(value: string) {
    const response: any = await $fetch(`https://geo.api.gouv.fr/communes?nom=${value}&fields=nom,code,codesPostaux,siren,centre,mairie,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre`);

    const townCoordinates = response[0].mairie.coordinates.reverse();

    setMapLocation(townCoordinates);
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
          const coordinates = [position.coords.latitude, position.coords.longitude];
          resolve({ coordinates });
        },
        (error) => {
          reject(error);
        })
    })
  }

  async function reverseGeoCode(coordinates: any) {
    try {
      const latitude = coordinates[0];
      const longitude = coordinates[1];

      const response: any = await $fetch(`https://geo.api.gouv.fr/communes?lat=${latitude}&lon=${longitude}&fields=nom,code,codesPostaux,centre,mairie,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre`);

      const townCoordinates = response[0].mairie.coordinates.reverse();

      if (!state.mapLocation) {
        setMapLocation(townCoordinates);
      }

      // setMapLocation(townCoordinates);
      setTownName(response[0].nom);
      setCodeInsee(response[0].code);
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getPosition,
    reverseGeoCode,
    searchTown,
    setMapLocation,
    getTown,
    state
  };
})