<script setup lang="ts">
const accessLibreStore = useAccessLibreStore();
const erpsCount: any = ref(null);
const items = ref([
/*  {
    label: 'Recherche',
    icon: 'pi pi-search',
    route: '/'
  },*/
/*  {
    label: 'Carte',
    icon: 'pi pi-map',
    route: '/'
  },*/
  {
    label: 'Établissements',
    icon: 'pi pi-building',
    badge: erpsCount.value,
    route: '/erps'
  }
]);

watch(() => accessLibreStore.state.erpsCount, async (value) => {
  erpsCount.value = value;
  items.value[0].badge = value;
});
</script>

<template>
  <nav class="sticky top-0 z-50">
    <PrimeMenubar :model="items" class="">
      <template #start>
        <NuxtLink to="/">
          <img class="h-12 p-2 hover:bg-slate-200 rounded-full" src="/images/logo.png" alt="Logo">
        </NuxtLink>

      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <NuxtLink v-if="item.route" :to="item.route" v-slot="{ href, navigate }" custom>
          <a v-ripple :href="href" class="flex align-items-center hover:bg-slate-200" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <PrimeBadge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
          </a>
        </NuxtLink>
      </template>
      <template #end>
        <div class="flex">
          <AppSearch class="hidden sm:flex" />

          <div class="flex items-center gap-2 sm:ml-20">
            <a class="hidden sm:block md:hidden " href="https://www.kevindb.dev/" target="_blank">
              <PrimeButton icon="pi pi-user" class="hover:text-black hover:bg-white" severity="contrast" size="small" />
            </a>
            <a class="hidden md:block" href="https://www.kevindb.dev/" target="_blank">
              <PrimeButton icon="pi pi-user" class="hover:text-black hover:bg-white" label="Portfolio" severity="contrast" size="small" />
            </a>
            <a class="flex items-center mx-2" href="https://github.com/KevinDeBenedetti/acces-libre" target="_blank">
              <i class="pi pi-github text-2xl hover:text-gray-400"></i>
            </a>
          </div>
        </div>
      </template>
    </PrimeMenubar>
    <div class="sm:hidden h-20 bg-gray-200 flex items-center justify-center">
      <AppSearch />
    </div>
  </nav>
</template>