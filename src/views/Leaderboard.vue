<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LeagueTable from "@/components/LeagueTable.vue";
import { ref } from "vue";

const tableHeadersList = ref(['Teamname', 'MP', 'GF', 'GA', 'Point'])
const tableDataList = ref([{

}])
</script>

<template>
  <DefaultLayout>
    <h1 class="heading">League Standings</h1>

    <LeagueTable :headers="tableHeadersList" :rows="tableDataList"></LeagueTable>
  </DefaultLayout>
</template>

<style scoped>

</style>