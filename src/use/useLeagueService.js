import {getToken} from "@/api";
import LeagueService from "@/services/LeagueService";

export const useLeagueService = async () => {
  await getToken()
  const leagueService = new LeagueService()
  await leagueService.fetchData()

  return {
    leagueService
  }
}