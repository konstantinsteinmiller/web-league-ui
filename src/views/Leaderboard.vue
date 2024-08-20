<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LeagueTable from "@/components/LeagueTable.vue";
import {computed, ref} from "vue";
import {useLeagueService} from "@/use/useLeagueService";

const leaderboardList = ref([])
const fetchMatches = async () => {
  const {leagueService} = await useLeagueService()
  leaderboardList.value = leagueService.getLeaderboard()
}
fetchMatches()

const tableHeadersList = [
  { value: 'Team Name' },
  { value: 'MP' },
  { value: 'GF' },
  { value: 'GA' },
  { value: 'GD' },
  { value: 'Points' }
]
const tableDataList = computed(() => {
  return leaderboardList.value.map((leaderboardEntry) => {
    return [
      {
        value: leaderboardEntry.teamName,
        flagUrl: `https://flagsapi.codeaid.io/${leaderboardEntry.teamName}.png`,
        isBold: true,
        isFlagCell: true
      },
      { value: leaderboardEntry.matchesPlayed },
      { value: leaderboardEntry.goalsFor },
      { value: leaderboardEntry.goalsAgainst },
      { value: leaderboardEntry.goalsFor - leaderboardEntry.goalsAgainst },
      { value: leaderboardEntry.points,
    }]
  })
})
</script>

<template>
  <DefaultLayout>
    <h1 class="heading">League Standings</h1>

    <LeagueTable :headers="tableHeadersList" :rows="tableDataList" />
  </DefaultLayout>
</template>

<style scoped>
.table >>> th:nth-of-type(1),
.table >>> td:nth-of-type(1) {
  text-align: left;
  padding: 0 8px;
}
.table >>> td:nth-of-type(6) {
  font-weight: bold;
  color: #055FEB;
}
.table >>> th:not(th:nth-of-type(1)),
.table >>> td:not(td:nth-of-type(1)) {
  text-align: center;
  width: 80px;
}

@media (max-width: 500px) {
  .table >>> th:nth-of-type(3),
  .table >>> td:nth-of-type(3),
  .table >>> th:nth-of-type(4),
  .table >>> td:nth-of-type(4) {
    display: none;
  }
}
@media (min-width: 501px) {
  .table >>> th:nth-of-type(5),
  .table >>> td:nth-of-type(5){
    display: none;
  }
}
</style>