import { DollarCircleOutlined } from "@ant-design/icons"
import { Text } from "../text"
import { Card } from "antd"
import { Area, AreaConfig } from "@ant-design/plots"
import { useList } from "@refinedev/core"
import { DASHBOARD_DEALS_CHART_QUERY } from "@/graphql/queries"
import { mapDealsData } from "@/utilities/helpers"
import React from "react"
import { GetFieldsFromList } from "@refinedev/nestjs-query"
import { DashboardDealsChartQuery } from "@/graphql/types"
import { DealStage } from "@/graphql/schema.types"

const DealsChart = () => {
    const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
        resource: 'dealStages',
        meta: {
            gqlQuery: DASHBOARD_DEALS_CHART_QUERY
        }
    });

    const dealData = React.useMemo(() => {
        return mapDealsData(data?.data);
    }, [data?.data])

    const config: AreaConfig = {
        data: dealData,
        xField: 'timeText',
        yField: 'value',
        shapeField: 'smooth',
        seriesField: 'state',
        colorField: 'state',
        style: {
            opacity: 0.4,
        },
        axis: {
            y: {
                labelFormatter: (v: string) => {
                    return `$${Number(v) / 1000}k`
                }
            },
        },
        tooltip: {
            channel: 'y',
            valueFormatter: (y: string) => {
                return `$${Number(y) / 1000}k`
            }
        }
    }

    return (
        <Card
            style={{ height: '100%' }}
            headStyle={{ padding: '8px 16px' }}
            bodyStyle={{ padding: '24px 24px 0 24px' }}
            title={
                <div style={{
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
                </div>
            }
        >
            <Area {...config} height={325} />
        </Card>
    )
}

export default DealsChart