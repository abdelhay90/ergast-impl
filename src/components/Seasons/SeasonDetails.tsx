import React, {useContext, useEffect, useState} from 'react';
import {Button, Popover, Table} from 'antd';
import AppContext from '../../common/AppContext';
import {getSeasonRaces} from '../../api/seasons';
import RaceWinners from './RaceWinners';
import moment from 'moment';
import TopDriverStandings from "./TopDriverStandings";
import {LocationType, PaginationOptions, Race} from "../../types";
import RaceLocationMap from "./RaceLocationMap";

const columns = [
    {
        dataIndex: 'round',
        title: 'Round',
    },
    {
        dataIndex: 'raceName',
        title: 'Race Name',
    },
    {
        dataIndex: 'date',
        title: 'Date',
        render: (_: string, record: Race) =>
            `${moment(`${record.date} ${record.time}`).format(
                'DD MMM YYYY, HH:mm'
            )} (GMT${moment().format('Z')})`,
    },
    {
        dataIndex: ['Circuit', 'circuitName'],
        title: 'Circuit Name',
    },
    {
        dataIndex: ['Circuit', 'Location'],
        title: 'Circuit Location',
        // eslint-disable-next-line react/display-name
        render: (data: LocationType) => {
            return data ?
                (
                    <Popover title="Race Location"
                             trigger="click"
                             content={<RaceLocationMap raceLocation={data}/>}
                             // placement="left"
                    >
                        <Button type="link">
                            {`${data.locality}, ${data.country}`}
                        </Button>
                    </Popover>
                )
                : 'N/A';
        }
    },
];
const SeasonDetails = () => {
    const {selectedSeason} = useContext(AppContext);
    const [races, setRaces] = useState<Race[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<PaginationOptions | null>({
        limit: 10,
        offset: 0,
        total: 0,
        current: 1,
    });
    const getSelectedSeason = async (season: string,
                                     options: { [key: string]: string | number }) => {
        setLoading(true);
        const {data, limit, offset, total} = await getSeasonRaces(season, {
            limit: options.limit,
            offset: options.offset,
        });
        setRaces(data);
        setPagination({
            limit,
            offset,
            total,
            current: offset / limit + 1,
        });
        setLoading(false);
    };
    useEffect(() => {
        getSelectedSeason(selectedSeason, {limit: 10, offset: 0}).then();
    }, [selectedSeason]);
    const handlePaginationChange = (pageNumber: number) => {
        getSelectedSeason(selectedSeason, {
            limit: 10,
            offset: (pageNumber - 1) * 10,
        }).then();
    };

    return (
        <div className="px-2 pt-1 pb-2">
            <TopDriverStandings/>
            <Table
                rowKey="raceName"
                columns={columns}
                dataSource={races}
                loading={loading}
                pagination={{
                    onChange: handlePaginationChange,
                    total: pagination?.total,
                    current: pagination?.current,
                    pageSize: pagination?.limit,
                    showSizeChanger: false,
                }}
                expandable={{
                    expandedRowRender(record: Race) {
                        return <RaceWinners round={record.round}/>;
                    },
                }}
            />
        </div>
    );
};
export default SeasonDetails;
