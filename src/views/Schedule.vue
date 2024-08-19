<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LeagueTable from "@/components/LeagueTable.vue";
import LeagueService from "@/services/LeagueService.js";
import {getCountryFlag, getToken} from "../api";
import {computed, ref, watchEffect} from "vue";

const matchesList = ref([])

const fetchMatches = async () => {
  await getToken()
  const leagueService = new LeagueService()
  await leagueService.fetchData()
  matchesList.value = leagueService.getMatches().value

  console.table(matchesList?.value)
}

fetchMatches()



const tableHeadersList = ref([
  { value: 'Date/Time', isHidden: window.innerWidth <= 500, width: '150', align: 'left' },
  { value: 'Stadium', isHidden: window.innerWidth <= 750, align: 'left' },
  { value: 'Home Team', align: 'right', maxWidth: '150' },
  { value: '', width: '70' },
  { value: 'Away Team', align: 'left', maxWidth: '150' }])

const matchDataList = computed(() => {
  return matchesList.value.map((match) => {
    const date = new Date(match.matchDate)
    return [
      {
        value: date.toLocaleDateString('de-de', { hour:"numeric", minute: "numeric"}).replace(',', ''),
        align: 'left', width: '80'
      },
      {
        value: match.stadium,
        align: 'left',
      },
      {
        value: match.homeTeam,
        isFlagRight: true,
        flagUrl: `https://flagsapi.codeaid.io/${match.homeTeam}.png`,
        align: 'right',
        isBold: true,
        isFlagCell: true
      },
      {
        isBold: true,
        value: '1-1',
        align: 'center'
      },
      {
        value: match.awayTeam,
        flagUrl: `https://flagsapi.codeaid.io/${match.awayTeam}.png`,
        align: 'left',
        isBold: true,
        isFlagCell: true
      }
    ]
  })
})
</script>

<template>
  <DefaultLayout>
    <div>
      <h1 class="heading">League Schedule</h1>

      <LeagueTable :headers="tableHeadersList" :rows="matchDataList" :is-striped="true"></LeagueTable>
    </div>
  </DefaultLayout>
</template>

<style scoped>

</style>