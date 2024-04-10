import { DollarCircleOutlined } from "@ant-design/icons"
import { Text } from "../text"
import { Card } from "antd"
import { useList } from "@refinedev/core"
import { DASHBOARD_DEALS_CHART_QUERY } from "@/graphql/queries"
import { mapDealsData } from "@/utilities/helpers"
import React from "react"
import { GetFieldsFromList } from "@refinedev/nestjs-query"
import { DashboardDealsChartQuery } from "@/graphql/types"
import { Line } from "react-chartjs-2"
import { faker } from "@faker-js/faker"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    Ticks,
    scales,
    elements,
} from 'chart.js';

const DealsChart = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend,
    );

    const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
        resource: 'dealStages',
        filters: [
            {
                field: 'title', operator: 'in', value: ['WON', 'LOST']
            }
        ],
        meta: {
            gqlQuery: DASHBOARD_DEALS_CHART_QUERY
        }
    });

    const dealData = React.useMemo(() => {
        return mapDealsData(data?.data);
    }, [data?.data])

    // dealData contains two set of data, with duplicate time text.
    // Hence, get time text array from one of the deal type will do.
    const dealDataTimeText = dealData
        .filter((data) => data.state === 'Won')
        .map((data) => data.timeText);

    const wonDealData = dealData
        .filter((data) => data.state === 'Won')
        .map((data) => data.value);

    const lostDealData = dealData
        .filter((data) => data.state === 'Lost')
        .map((data) => data.value);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                align: 'start' as const,
            },
            tooltip: {
                intersect: false,
                mode: 'index' as const,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
        }
    };

    const chartData = {
        labels: dealDataTimeText,
        datasets: [
            {
                fill: true,
                label: 'Won',
                data: wonDealData,
                borderColor: '#51a875',
                backgroundColor: 'rgba(81, 168, 117, 0.1)',
                pointBorderColor: 'transparent',
                tension: 0.5,
            },
            {
                fill: true,
                label: 'Lost',
                data: lostDealData,
                borderColor: '#748bd4',
                backgroundColor: 'rgba(198, 211, 235, 0.3)',
                pointBorderColor: 'transparent',
                tension: 0.5
            },
        ],
    };

    return (
        <Card
            style={{ height: '100%' }}
            headStyle={{ padding: '8px 16px' }
            }
            bodyStyle={{ padding: '24px 24px 0 24px' }}
            title={
                < div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <DollarCircleOutlined />
                    <Text
                        size="sm"
                        style={{ marginLeft: '0.7rem' }}
                    >
                        Deals
                    </Text>
                </div >
            }
        >
        </Card >
    )
}

export default DealsChart