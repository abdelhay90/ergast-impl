import React, {useContext, useEffect, useState} from 'react';
import {Table} from 'antd';
import AppContext from '../../common/AppContext';
import {getRaceWinnersPerSeason} from '../../api/seasons';
import {ConstructorType, DriverType, Winner} from "../../types";

interface RaceWinnersProps {
    round: number;
}

const columns = [
    {
        dataIndex: 'positionText',
        title: 'Position',
    },
    {
        dataIndex: 'number',
        title: 'No.',
    },
    {
        dataIndex: ['Driver'],
        title: 'Name',
        render: ({givenName, familyName}: DriverType) =>
            `${givenName} ${familyName}`,
    },
    {
        dataIndex: ['Constructor'],
        title: 'Constructor',
        render: ({name}: ConstructorType) => `${name}`,
    },
    {
        dataIndex: ['grid'],
        title: 'Grid',
    },
    {
        dataIndex: ['laps'],
        title: 'Laps',
    },
    {
        dataIndex: ['Time', 'time'],
        title: 'Time',
    },
    {
        dataIndex: ['status'],
        title: 'Status',
    },
    {
        dataIndex: ['points'],
        title: 'Points',
    },
];

const RaceWinners = ({round}: RaceWinnersProps) => {
    const {selectedSeason, worldChampion} = useContext(AppContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [winners, setWinners] = useState<Winner[]>([]);

    const getRaceWinners = async () => {
        setLoading(true);
        const {data} = await getRaceWinnersPerSeason({
            season: selectedSeason,
            round,
        });
        setWinners(data);
        setLoading(false);
    };
    useEffect(() => {
        getRaceWinners().then();
        // eslint-disable-next-line
    }, [round]);

    return (
        <div>
            <Table
                columns={columns}
                dataSource={winners}
                size="small"
                loading={loading}
                rowKey={({Driver}: Winner) => Driver.driverId}
                rowClassName={({Driver:{driverId}}:Winner)=> {
                    return worldChampion?.driverId === driverId ? "world-champion" : ""
                }}
                pagination={false}
            />
        </div>
    );
};

export default RaceWinners;
