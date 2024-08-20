<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LeagueTable from "@/components/LeagueTable.vue";
import LeagueService from "@/services/LeagueService.js";
import { getToken } from "../api";
import { computed, ref } from "vue";

const matchesList = ref([])

const fetchMatches = async () => {
  await getToken()
  const leagueService = new LeagueService()
  await leagueService.fetchData()
  matchesList.value = leagueService.getMatches().value

  console.table(matchesList?.value)
}

fetchMatches()



const tableHeadersList = [
  { value: 'Date/Time' },
  { value: 'Stadium' },
  { value: 'Home Team' },
  { value: '' },
  { value: 'Away Team' }
]

const matchDataList = computed(() => {
  return matchesList.value.map((match) => {
    const date = new Date(match.matchDate)
    return [
      {
        value: date.toLocaleDateString('de-de', { hour:"numeric", minute: "numeric"}).replace(',', '')
      },
      {
        value: match.stadium
      },
      {
        value: match.homeTeam,
        isFlagRight: true,
        flagUrl: `https://flagsapi.codeaid.io/${match.homeTeam}.png`,
        isBold: true,
        isFlagCell: true
      },
      {
        value: `${match.homeTeamScore} : ${match.awayTeamScore}`,
        isBold: true
      },
      {
        value: match.awayTeam,
        flagUrl: `https://flagsapi.codeaid.io/${match.awayTeam}.png`,
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

      <LeagueTable :headers="tableHeadersList" :rows="matchDataList" :is-striped="true" />
    </div>
  </DefaultLayout>
</template>

<style scoped>
>>> .table th:nth-of-type(1),
>>> .table td:nth-of-type(1){
  text-align: right;
  width: 80px;
}
>>> .table th:nth-of-type(2),
>>> .table td:nth-of-type(2){
  text-align: left;
  padding: 0 40px;
}
>>> .table th:nth-of-type(3),
>>> .table td:nth-of-type(3){
  text-align: right;
  padding-left: 16px;
}
>>> .table th:nth-of-type(4),
>>> .table td:nth-of-type(4){
  text-align: center;
  padding: 0 16px;
  width: 70px;
}
>>> .table th:nth-of-type(5),
>>> .table td:nth-of-type(5){
  text-align: left;
  padding-right: 16px;
}
@media (max-width: 750px) {
  >>> .table th:nth-of-type(2),
  >>> .table td:nth-of-type(2){
    display: none;
  }
  >>> .table th:nth-of-type(3),
  >>> .table td:nth-of-type(3){
    padding-left: 4px;
  }
  >>> .table th:nth-of-type(4),
  >>> .table td:nth-of-type(4){
    padding: 0 4px;
  }
  >>> .table th:nth-of-type(5),
  >>> .table td:nth-of-type(5){
    padding-right: 4px;
  }
}
@media (max-width: 500px) {
  >>> .table th:nth-of-type(1),
  >>> .table td:nth-of-type(1){
    display: none;
  }
}
</style>