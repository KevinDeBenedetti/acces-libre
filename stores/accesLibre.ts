import { defineStore } from 'pinia';
import { reactive } from 'vue';

interface City {
  nom: string;
  codeDepartement: string;
}

export const useAccessLibreStore = defineStore('access-libre', () => {

  const state = reactive({
    categories: [] as any[],
    erpsCount: null as number | null,
    erps: [] as any[],
    postalCode: null as number | null,
    townName: null as string | null,
    activities: [] as any[]
  });

  const setActivities = (values: any[]) => {
    state.activities = values;
  }
  const setCategories = (values: any[]) => {
    state.categories = values;
  }
  const setERPSCount = (count: number) => {
    state.erpsCount = count;
  };
  const setERPS = (values: any[]) => {
    state.erps = values;
  }

  const config = useRuntimeConfig();
  const apiUrlAccesLibre = config.public.apiUrlAccesLibre;
  const apiKey = config.public.apiKey;

  const filterERPS = (filteredCountries: City[]) => {
    return filteredCountries.map(city => {
      const { nom, codeDepartement } = city;
      return `${nom} (${codeDepartement})`;
    })
  }

  async function getActivitiesByTown(town: string) {
    try {
      const response: any = await $fetch(`${apiUrlAccesLibre}/activites/?commune=${town}`, { headers: {'Authorization': apiKey}});
      const actvitiesArray: any = response.results;
      actvitiesArray.sort((a: any, b: any) => b.count - a.count);
      setActivities(actvitiesArray);
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

  async function getERPSCountByPostalCode(postalCode: number) {
    try {
      const response: any = await $fetch(`${apiUrlAccesLibre}/erps/?code_postal=${postalCode}`, { headers: {'Authorization': apiKey} });

      setERPSCount(response.count);
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

  async function* getERPSbyPostalCode(postalCode: number) {
    const erps: any = [];
    try {
      const responseERPS: any = await $fetch(`${apiUrlAccesLibre}/erps/?code_postal=${postalCode}`, { headers: {'Authorization': apiKey} });
      const response: any = responseERPS;

      erps.value = response.results;
      erps.push(...response.results);
      setERPS(response.results);

      let nextPage: any = response.next;

      if (nextPage !== null) {
        do {
          await new Promise(resolve => setTimeout(resolve, 500));

          const responseByPage: any = await $fetch(nextPage, { headers: {'Authorization': apiKey} });
          const response: any = responseByPage

          erps.push(...response.results);
          // console.log(erps);
          setERPS(erps);
          nextPage = response.next;

          yield erps;
        } while (nextPage !== null);
      }

    } catch (error) {
      throw error;
    }
  }

  async function getCategoriesOfERPS() {

    const categoriesCount = state.erps.reduce((count, erps) => {
      const categorySlug = erps.activite.slug;

      count[categorySlug] = (count[categorySlug] || 0) + 1;

      return count;
    }, {});

    const categoriesArray = Object.entries(categoriesCount).map(([slug, count]) => {
      const categoryName = state.erps.find(erps => erps.activite.slug === slug).activite.nom;
      return { name: categoryName, slug, count };
    })

    categoriesArray.sort((a: any, b: any) => b.count - a.count);

    setCategories(categoriesArray);

  }

  return {
    getERPSCountByPostalCode,
    getERPSbyPostalCode,
    getCategoriesOfERPS,
    getActivitiesByTown,
    filterERPS,
    state
  }
})