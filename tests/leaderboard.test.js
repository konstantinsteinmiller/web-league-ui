/**
 * 
 *  THIS IS A TESTING FILE. YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO TEST YOUR WORK.
 *  PLEASE DON´T CHANGE THE INTERFACE OF leagueService.js METHODS
 *
 */

require('jest-fetch-mock').enableMocks();
fetchMock.dontMock();

import LeagueService from "../src/services/LeagueService";

describe("leaderboard", () => {
  let leagueService;

  beforeEach(() => {
    leagueService = new LeagueService();
  });

  test('check-leaderboard-teams', async () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Brazil',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 1
      }
    ];
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[0];
    expect(firstTeam.teamName).toBe('Brazil');
    expect(firstTeam.matchesPlayed).toBe(1);
    expect(firstTeam.goalsFor).toBe(2);
    expect(firstTeam.goalsAgainst).toBe(1);
    expect(firstTeam.points).toBe(3);

    const secondTeam = leaderboard[1];
    expect(secondTeam.teamName).toBe('France');
    expect(secondTeam.matchesPlayed).toBe(1);
    expect(secondTeam.goalsFor).toBe(1);
    expect(secondTeam.goalsAgainst).toBe(2);
    expect(secondTeam.points).toBe(0);
  });

  test('serbia wins tie breaker by head-to-head win', async () => {
    const matches = [
      {
        "matchDate": 1651744228685,
        "stadium": "Maracanã",
        "homeTeam": "Brazil",
        "awayTeam": "Serbia",
        "matchPlayed": true,
        "homeTeamScore": 0,
        "awayTeamScore": 1
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Stade de Suisse",
        "homeTeam": "Switzerland",
        "awayTeam": "Serbia",
        "matchPlayed": true,
        "homeTeamScore": 2,
        "awayTeamScore": 2
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Stadion Rajko Mitic",
        "homeTeam": "Serbia",
        "awayTeam": "Cameroon",
        "matchPlayed": true,
        "homeTeamScore": 0,
        "awayTeamScore": 1
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Maracanã",
        "homeTeam": "Brazil",
        "awayTeam": "Switzerland",
        "matchPlayed": true,
        "homeTeamScore": 3,
        "awayTeamScore": 0
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Maracanã",
        "homeTeam": "Brazil",
        "awayTeam": "Cameroon",
        "matchPlayed": true,
        "homeTeamScore": 4,
        "awayTeamScore": 4
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Stade de Suisse",
        "homeTeam": "Switzerland",
        "awayTeam": "Cameroon",
        "matchPlayed": true,
        "homeTeamScore": 2,
        "awayTeamScore": 2
      }
    ];
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[1];
    expect(firstTeam.teamName).toBe('Serbia');
    expect(firstTeam.matchesPlayed).toBe(3);
    expect(firstTeam.goalsFor).toBe(3);
    expect(firstTeam.goalsAgainst).toBe(3);
    expect(firstTeam.points).toBe(4);

    const secondTeam = leaderboard[2];
    expect(secondTeam.teamName).toBe('Brazil');
    expect(secondTeam.matchesPlayed).toBe(3);
    expect(secondTeam.goalsFor).toBe(7);
    expect(secondTeam.goalsAgainst).toBe(5);
    expect(secondTeam.points).toBe(4);
  });

  test('switzerland wins tie breaker by goal difference', async () => {
    const matches = [
      {
        "matchDate": 1651744228685,
        "stadium": "Maracanã",
        "homeTeam": "Brazil",
        "awayTeam": "Serbia",
        "matchPlayed": true,
        "homeTeamScore": 1,
        "awayTeamScore": 0
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Stade de Suisse",
        "homeTeam": "Switzerland",
        "awayTeam": "Serbia",
        "matchPlayed": true,
        "homeTeamScore": 2,
        "awayTeamScore": 2
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Stadion Rajko Mitic",
        "homeTeam": "Serbia",
        "awayTeam": "Cameroon",
        "matchPlayed": true,
        "homeTeamScore": 0,
        "awayTeamScore": 2
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Maracanã",
        "homeTeam": "Brazil",
        "awayTeam": "Switzerland",
        "matchPlayed": true,
        "homeTeamScore": 3,
        "awayTeamScore": 3
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Maracanã",
        "homeTeam": "Brazil",
        "awayTeam": "Cameroon",
        "matchPlayed": true,
        "homeTeamScore": 4,
        "awayTeamScore": 4
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Stade de Suisse",
        "homeTeam": "Switzerland",
        "awayTeam": "Cameroon",
        "matchPlayed": true,
        "homeTeamScore": 2,
        "awayTeamScore": 2
      }
    ]
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[0];
    expect(firstTeam.teamName).toBe('Cameroon');
    expect(firstTeam.matchesPlayed).toBe(3);
    expect(firstTeam.goalsFor).toBe(8);
    expect(firstTeam.goalsAgainst).toBe(6);
    expect(firstTeam.points).toBe(5);

    const secondTeam = leaderboard[1];
    expect(secondTeam.teamName).toBe('Brazil');
    expect(secondTeam.matchesPlayed).toBe(3);
    expect(secondTeam.goalsFor).toBe(8);
    expect(secondTeam.goalsAgainst).toBe(7);
    expect(secondTeam.points).toBe(5);
  });

  test('Brazil wins tie breaker by alphabetic order', async () => {
    const matches = [
      {
        "matchDate": 1651744228685,
        "stadium": "Maracanã",
        "homeTeam": "Brazil",
        "awayTeam": "Serbia",
        "matchPlayed": true,
        "homeTeamScore": 1,
        "awayTeamScore": 0
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Stade de Suisse",
        "homeTeam": "Switzerland",
        "awayTeam": "Serbia",
        "matchPlayed": true,
        "homeTeamScore": 2,
        "awayTeamScore": 2
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Stadion Rajko Mitic",
        "homeTeam": "Serbia",
        "awayTeam": "Cameroon",
        "matchPlayed": true,
        "homeTeamScore": 0,
        "awayTeamScore": 1
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Maracanã",
        "homeTeam": "Brazil",
        "awayTeam": "Switzerland",
        "matchPlayed": true,
        "homeTeamScore": 3,
        "awayTeamScore": 3
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Maracanã",
        "homeTeam": "Brazil",
        "awayTeam": "Cameroon",
        "matchPlayed": true,
        "homeTeamScore": 4,
        "awayTeamScore": 4
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Stade de Suisse",
        "homeTeam": "Switzerland",
        "awayTeam": "Cameroon",
        "matchPlayed": true,
        "homeTeamScore": 2,
        "awayTeamScore": 2
      }
    ]
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[0];
    expect(firstTeam.teamName).toBe('Brazil');
    expect(firstTeam.matchesPlayed).toBe(3);
    expect(firstTeam.goalsFor).toBe(8);
    expect(firstTeam.goalsAgainst).toBe(7);
    expect(firstTeam.points).toBe(5);

    const secondTeam = leaderboard[1];
    expect(secondTeam.teamName).toBe('Cameroon');
    expect(secondTeam.matchesPlayed).toBe(3);
    expect(secondTeam.goalsFor).toBe(7);
    expect(secondTeam.goalsAgainst).toBe(6);
    expect(secondTeam.points).toBe(5);
  });

  test('teams leaderboard is sorted by points', async () => {
    const matches = [
      {
        "matchDate": 1651744228685,
        "stadium": "Maracanã",
        "homeTeam": "Brazil",
        "awayTeam": "Serbia",
        "matchPlayed": true,
        "homeTeamScore": 1,
        "awayTeamScore": 0
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Stade de Suisse",
        "homeTeam": "Switzerland",
        "awayTeam": "Serbia",
        "matchPlayed": true,
        "homeTeamScore": 2,
        "awayTeamScore": 2
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Stadion Rajko Mitic",
        "homeTeam": "Serbia",
        "awayTeam": "Cameroon",
        "matchPlayed": true,
        "homeTeamScore": 0,
        "awayTeamScore": 1
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Maracanã",
        "homeTeam": "Brazil",
        "awayTeam": "Switzerland",
        "matchPlayed": true,
        "homeTeamScore": 3,
        "awayTeamScore": 0
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Maracanã",
        "homeTeam": "Brazil",
        "awayTeam": "Cameroon",
        "matchPlayed": true,
        "homeTeamScore": 4,
        "awayTeamScore": 4
      },
      {
        "matchDate": 1651744228685,
        "stadium": "Stade de Suisse",
        "homeTeam": "Switzerland",
        "awayTeam": "Cameroon",
        "matchPlayed": true,
        "homeTeamScore": 2,
        "awayTeamScore": 2
      }
    ]
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[0];
    expect(firstTeam.teamName).toBe('Brazil');
    expect(firstTeam.matchesPlayed).toBe(3);
    expect(firstTeam.goalsFor).toBe(8);
    expect(firstTeam.goalsAgainst).toBe(4);
    expect(firstTeam.points).toBe(7);

    const secondTeam = leaderboard[1];
    expect(secondTeam.teamName).toBe('Cameroon');
    expect(secondTeam.matchesPlayed).toBe(3);
    expect(secondTeam.goalsFor).toBe(7);
    expect(secondTeam.goalsAgainst).toBe(6);
    expect(secondTeam.points).toBe(5);

    const thirdTeam = leaderboard[2];
    expect(thirdTeam.teamName).toBe('Switzerland');
    expect(thirdTeam.matchesPlayed).toBe(3);
    expect(thirdTeam.goalsFor).toBe(4);
    expect(thirdTeam.goalsAgainst).toBe(7);
    expect(thirdTeam.points).toBe(2);

    const fourthTeam = leaderboard[3];
    expect(fourthTeam.teamName).toBe('Serbia');
    expect(fourthTeam.matchesPlayed).toBe(3);
    expect(fourthTeam.goalsFor).toBe(2);
    expect(fourthTeam.goalsAgainst).toBe(4);
    expect(fourthTeam.points).toBe(1);
  });
});