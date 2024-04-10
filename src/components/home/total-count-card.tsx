import { totalCountVariants } from "@/constants";
import { Card, Skeleton } from "antd";
import { Text } from "../text";
import { config } from "process";
import { Line } from "react-chartjs-2";

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

type Props = {
    resource: "companies" | "contacts" | "deals"
    isLoading: boolean,
    totalCount: number
}

const DashboardTotalCountCard = ({
    resource,
    isLoading,
    totalCount
}: Props) => {
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

    const options = {
        responsive: true,
        maintainAspectRation: false,
        aspectRatio: 1,
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

    const { primaryColor, secondaryColor, icon, title } = totalCountVariants[resource];

    const countVariantDataIndex = totalCountVariants[resource].data
        .map((data) => data.index);

    const countVariantDataValue = totalCountVariants[resource].data
        .map((data) => data.value);

    const chartData = {
        labels: countVariantDataIndex,
        datasets: [
            {
                fill: true,
                label: 'Won',
                data: countVariantDataValue,
                borderColor: '#51a875',
                backgroundColor: 'rgba(81, 168, 117, 0.1)',
                pointBorderColor: 'transparent',
                tension: 0.5,
            },
        ],
    };

    return (
        <Card
            style={{ height: '96px', padding: 0 }}
            bodyStyle={{ padding: '8px 8px 8px 12px' }}
            size="small"
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap'
                }}
            >
                {icon}
                <Text size="md" className="secondary" style={{ marginLeft: '8px' }}>
                    {title}
                </Text>
            </div>
            <div
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <Text
                    size="xxxl"
                    strong
                    style={{
                        flex: 1,
                        whiteSpace: 'noWrap',
                        flexShrink: 0,
                        textAlign: 'start',
                        marginLeft: '48px',
                        fontVariantNumeric: 'tabular-nums'
                    }}
                >
                    {isLoading ? (
                        <Skeleton.Button
                            style={{
                                marginTop: '8px',
                                width: '74pxs'
                            }}
                        />
                    ) : (
                        totalCount
                    )}
                </Text>
            </div>
        </Card>
    );
};

export default DashboardTotalCountCard