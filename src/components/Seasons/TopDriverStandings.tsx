import React, {useContext, useEffect, useMemo, useState} from 'react';
import AppContext from "../../common/AppContext";
import {getSeasonDriverStandings} from "../../api/seasons";
import {ReactComponent as MedalIcon} from "../../assets/svg/first-place.svg"
import Icon from "@ant-design/icons"
import {Spin, Typography} from "antd";
import classNames from "classnames";
import {DriverStandingResult} from "../../types";

const TopDriverStandings = () => {
    const {selectedSeason, setWorldChampion} = useContext(AppContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [standings, setStandings] = useState<DriverStandingResult[]>([]);
    const getRaceWinners = async (season: string) => {
        setLoading(true);
        const {data} = await getSeasonDriverStandings({
            season: season,
        });
        setStandings(data.standings);
        setLoading(false);
    };

    const topDrivers = useMemo(() => {
        return standings.slice(0, 3);
    }, [standings]);

    useEffect(() => {
        if (topDrivers.length > 0) {
            setWorldChampion(topDrivers[0].Driver)
        }
        // eslint-disable-next-line
    }, [topDrivers]);


    useEffect(() => {
        getRaceWinners(selectedSeason).then();
    }, [selectedSeason]);
    return (
        <Spin spinning={loading}>
            <Typography.Text>Top world records: </Typography.Text>
            <ul className="list__unbulleted display-flex">
                {topDrivers.map(({points, Driver, position}) => (
                    <li key={Driver.driverId} className="mr-2">
                        <Icon
                            className={
                                classNames("mr-1", "medal", {
                                    "first-place": position == '1',
                                    "second-place": position == '2',
                                    "third-place": position == '3'
                                })
                            }
                            component={MedalIcon}/>
                        {`${Driver.givenName} ${Driver.familyName}, ${points} Pts.`}
                    </li>
                ))}
            </ul>
        </Spin>
    )
};

export default TopDriverStandings;
