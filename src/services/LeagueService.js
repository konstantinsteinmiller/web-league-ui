/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM, 
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 * 
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 * 
 */
import { getAllMatches } from '../api'
import { ref } from "vue";

const matchesList = ref([])

class LeagueService {

    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */    
    setMatches(matches) {
        matchesList.value = matches
    }

    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches() {
        return matchesList
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING],
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard() {
        const sortedLeaderboardList = this.getSortedLeaderboard()
        return sortedLeaderboardList
    }

    /** @returns {Array} sorted leaderboard as List of Entries
     */
    getSortedLeaderboard() {
        const leaderboardObject = this.assessLeaderboardFromMatches(matchesList.value)
        const leaderboardList = Object.values(leaderboardObject)

        leaderboardList.sort((a, b) => {
            /* compare leaderboard points */
            if (a.points > b.points) {
                return -1
            } else if (a.points < b.points) {
                return 1
            }

            const matchesWithTeamAAndBList = matchesList.value.filter((match) => {
                return match.homeTeam === a.teamName && match.awayTeam === b.teamName ||
                  match.homeTeam === b.teamName && match.awayTeam === a.teamName
            })

            /* 1st: equal points, so find tie-break by head-to-head winner */
            const headToHeadTieBreakerLeaderboard = this.assessLeaderboardFromMatches(matchesWithTeamAAndBList)
            // console.table(headToHeadTieBreakerLeaderboard)
            const headToHeadTeamA = headToHeadTieBreakerLeaderboard[a.teamName]
            const headToHeadTeamB = headToHeadTieBreakerLeaderboard[b.teamName]
            if (headToHeadTeamA.points > headToHeadTeamB.points) {
                return -1
            } else if (headToHeadTeamA.points < headToHeadTeamB.points) {
                return 1
            }

            /* 2nd: goal difference tie-breaker */
            const teamAEntry = leaderboardObject[a.teamName]
            const teamBEntry = leaderboardObject[b.teamName]
            if (teamAEntry.goalsFor - teamAEntry.goalsAgainst > teamBEntry.goalsFor - teamBEntry.goalsAgainst) {
                return -1
            } else if (teamAEntry.goalsFor - teamAEntry.goalsAgainst < teamBEntry.goalsFor - teamBEntry.goalsAgainst) {
                return 1
            }

            /* 3rd: goal difference tie-breaker */
            if (teamAEntry.goalsFor > teamBEntry.goalsFor) {
                return -1
            } else if (teamAEntry.goalsFor < teamBEntry.goalsFor) {
                return 1
            }

            /* 4rd: alphabetic ascending order tie-breaker */
            if (teamAEntry.teamName < teamBEntry.teamName) {
                return -1
            } else if (teamAEntry.teamName > teamBEntry.teamName) {
                return 1
            }

            return 0
        })
        return leaderboardList
    }
    /** @param localMatchesList {Array<Object>} list of matches, can be subset of all matches
     *  @returns {Object} leaderboard map by name containing points for each team
     */
    assessLeaderboardFromMatches(localMatchesList) {
        return localMatchesList.reduce((leaderboardObject, match) => {
            let homeTeamEntry = leaderboardObject[match.homeTeam]
            let awayTeamEntry = leaderboardObject[match.awayTeam]
            // calculate for homeTeam
            leaderboardObject[match.homeTeam] = this.calculateLeaderboardScoresPerTeam(match, homeTeamEntry, true)

            // now calculate for awayTeam
            leaderboardObject[match.awayTeam] = this.calculateLeaderboardScoresPerTeam(match, awayTeamEntry, false)

            return leaderboardObject
        }, {})
    }

    /** @param match {Object} representing a match
     *  @param entry {Object} leaderboard entry
     *  @param isHomeTeam {Boolean} run this calculation for home or away team?
     *  @returns {Object} updated leaderboard entry
     */
    calculateLeaderboardScoresPerTeam = (match, entry, isHomeTeam = false) => {
        let updatedTeamEntry = entry

        // in case of the awayTeam exchange home with away team for the same calculations
        const matchData = isHomeTeam
          ? match
          : {
              ...match,
              homeTeamScore: match.awayTeamScore,
              awayTeamScore: match.homeTeamScore,
              homeTeam: match.awayTeam,
              awayTeam: match.homeTeamScore,
          }

        if (!updatedTeamEntry) {
            updatedTeamEntry = {
                teamName: matchData.homeTeam,
                matchesPlayed: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                points: 0
            }
        }

        const hasHomeTeamWon = matchData.homeTeamScore - matchData.awayTeamScore > 0
        const isTie = matchData.homeTeamScore - matchData.awayTeamScore === 0

        // only add points and goals if match was actually played yet
        if (matchData.matchPlayed) {
            return {
                teamName: matchData.homeTeam,
                matchesPlayed: updatedTeamEntry.matchesPlayed + 1,
                goalsFor: updatedTeamEntry.goalsFor + matchData.homeTeamScore,
                goalsAgainst: updatedTeamEntry.goalsAgainst + matchData.awayTeamScore,
                // if home team wins add 3 points, on tie 1 otherwise don't add points
                points: hasHomeTeamWon ? updatedTeamEntry.points + 3 :
                  isTie ? updatedTeamEntry.points + 1 : updatedTeamEntry.points,
            }
        } else {
            return updatedTeamEntry
        }
    }
    /**
     * Asynchronic function to fetch the data from the server and set the matches.
     */
    async fetchData() {
        let matches = await getAllMatches()
        this.setMatches(matches);
    }    
}

export default LeagueService;