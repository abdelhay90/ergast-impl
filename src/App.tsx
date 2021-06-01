import React, {useState} from 'react';
import {Layout} from 'antd';
import SeasonSelector from './components/Seasons/SeasonSelector';
import './App.less';
import AppHeader from './components/common/AppHeader';
import AppFooter from './components/common/AppFooter';
import SeasonDetails from './components/Seasons/SeasonDetails';
import AppContext from './common/AppContext';
import {DriverType} from "./types";

const {Content} = Layout;
const currentYear = new Date().getFullYear().toString();

const App = () => {
    const [selectedSeason, setSelectedSeason] = useState<string>(currentYear);
    const [champion, setChampion] = useState<DriverType | undefined>(undefined);

    const changeSelectedSeason = (season: string) => {
        setSelectedSeason(season);
    };
    const setWorldChampion = (driver: DriverType) => {
        console.log(driver)
        setChampion(driver);
    };

    return (
        <Layout>
            <AppHeader/>
            <Content className="app-content" style={{padding: '0 50px'}}>
                <Layout
                    className="site-layout-background"
                    style={{padding: '24px 0'}}
                >
                    <AppContext.Provider
                        value={{
                            currentSeason: currentYear,
                            selectedSeason,
                            changeSelectedSeason,
                            setWorldChampion,
                            worldChampion: champion
                        }}
                    >
                        <SeasonSelector/>
                        <SeasonDetails/>
                    </AppContext.Provider>
                </Layout>
            </Content>
            <AppFooter/>
        </Layout>
    );
};

export default App;
