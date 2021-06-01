import React, { useContext, useMemo } from 'react';
import { Col, Row, Select, Typography } from 'antd';
import AppContext from '../../common/AppContext';

const SeasonSelector = () => {
    const { currentSeason, selectedSeason, changeSelectedSeason } =
        useContext(AppContext);
    const seasonList = useMemo<number[]>(() => {
        return new Array<number>(Number(currentSeason) - 2005 + 1).fill(1);
    }, [currentSeason]);

    return (
        <>
            <Row gutter={12}>
                <Col sm={24} md={12} lg={6}>
                    <div className="px-2">
                        <Typography.Title level={5}>
                            Please Select Season
                        </Typography.Title>
                        <Select
                            className="full-width"
                            value={selectedSeason}
                            onChange={(value: string) => {
                                changeSelectedSeason(value);
                            }}
                        >
                            {seasonList.map((_: number, index: number) => (
                                <Select.Option
                                    key={2005 + index}
                                    value={(2005 + index).toString()}
                                >
                                    {2005 + index}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default SeasonSelector;
