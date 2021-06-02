export interface AppContextType {
    currentSeason: string;
    selectedSeason: string;
    worldChampion?: DriverType;
    changeSelectedSeason: (season: string) => void;
    setWorldChampion: (champion: DriverType) => void;
}

export interface PaginationOptions {
    limit: number;
    offset: number;
    total: number;
    current: number;
}

export interface DriverType {
    givenName: string;
    familyName: string;
    driverId: string;
}

export interface ConstructorType {
    name: string;
}

export interface TimeType {
    time: string;
}

export interface Winner {
    positionText:string;
    number: number;
    Driver: DriverType;
    Constructor: ConstructorType
    grid: number;
    laps: number;
    status: string;
    Time: TimeType;
    points:number;
}
export interface DriverStandingResult {
    points: number;
    position: string;
    Driver: DriverType;
}


export interface LocationType {
    locality: string;
    country: string;
    lat: number;
    long: number;
}

export interface CircuitType {
    circuitName: string;
    Location: LocationType
}

export interface Race {
    round: number;
    raceName: string;
    date: string;
    time: string;
    Circuit: CircuitType
}

export interface RaceLocationMapProps {
    raceLocation: LocationType;
}
