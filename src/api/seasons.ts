import {axiosInstance} from './index';

export const getSeasonRaces = async (season: string,
                                     options: { [key: string]: string | number }) => {
    try {
        const {data} = await axiosInstance.get(`/${season}.json`, {params: {...options}});
        const {MRData} = data;
        return {
            data: MRData.RaceTable.Races,
            limit: MRData.limit,
            offset: MRData.offset,
            total: MRData.total
        }
    } catch (err) {
        throw err;
    }
}

export const getRaceWinnersPerSeason = async ({season, round}: { season: string, round: number },
                                              options = {}) => {
    try {
        const {data} = await axiosInstance.get(`/${season}/${round}/results.json`,
            {params: {...options}});
        const {MRData} = data;
        return {
            data: MRData.RaceTable.Races[0].Results,
        }
    } catch (err) {
        throw err;
    }
}

export const getSeasonDriverStandings = async ({season}: { season: string }, options = {}) => {
    try {
        const {data} = await axiosInstance.get(`/${season}/driverStandings.json`,
            {params: {...options}});
        const {MRData} = data;
        return {
            data: {
                round: MRData.StandingsTable.StandingsLists[0].round,
                season: MRData.StandingsTable.StandingsLists[0].season,
                standings: MRData.StandingsTable.StandingsLists[0].DriverStandings,
            },
        }
    } catch (err) {
        throw err;
    }
}
