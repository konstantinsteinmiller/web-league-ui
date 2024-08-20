<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import LeagueTable from "@/components/LeagueTable.vue";
import {computed, ref} from "vue";
import LeagueService from "@/services/LeagueService";
import {getToken} from "@/api";

const leaderboardList = ref([])
const fetchMatches = async () => {
  await getToken()
  const leagueService = new LeagueService()
  await leagueService.fetchData()

  leaderboardList.value = leagueService.getLeaderboard()
  /*@Todo delete*/ console.table(leagueService.getMatches().value)
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
      { value: leaderboardEntry.teamName,
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


:global(.table th:nth-of-type(1)),
:global(.table td:nth-of-type(1)) {
  text-align: left;
  padding: 0 8px;
}

:global(.table th:not(th:nth-of-type(1))),
:global(.table td:not(td:nth-of-type(1))) {
  text-align: center;
  width: 80px;
}

@media (max-width: 500px) {
  :global(.table th:nth-of-type(3)),
  :global(.table td:nth-of-type(3)),
  :global(.table th:nth-of-type(4)),
  :global(.table td:nth-of-type(4)){
    display: none;
  }
}
@media (min-width: 501px) {
  :global(.table th:nth-of-type(5)),
  :global(.table td:nth-of-type(5)){
    display: none;
  }
}
</style>