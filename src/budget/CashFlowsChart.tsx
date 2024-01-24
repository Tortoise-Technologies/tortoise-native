import React from "react";
import { BarChart, Card, Title } from "@tremor/react";
import { SimulationResult, Payment } from "../rustTypes";

const Chart: React.FC<{ results: SimulationResult }> = ({ results }) => {
    const valueFormatter = (number: number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

    const cashFlowNames = results.payments.map((payment: Payment) => payment.cash_flow.name);
    const uniqueCashFlowNames = [...new Set(cashFlowNames)];

    const chartData = new Map<string, any>();
    results.payments.forEach((payment: Payment) => {
        if (payment.date && payment.cash_flow.name && payment.amount) {
            const date = payment.date;
            const cashFlowName = payment.cash_flow.name;
            const amount = payment.amount;

            if (!chartData.has(date)) {
                chartData.set(date, {});
            }

            chartData.get(date)[cashFlowName] = amount;
        }
    });

    const chartDataArray = Array.from(chartData.entries()).map(([date, cashFlows]) => {
        return {
            date,
            ...cashFlows,
        };
    });

    const colors = Array.from({ length: uniqueCashFlowNames.length }, (_, index) => {
        return ["blue", "teal", "amber", "rose", "indigo", "emerald"][index % 6];
    });

    return <Card>
        <Title>Cash Flows</Title>
        <BarChart
            className="mt-6"
            data={chartDataArray}
            index="date"
            categories={uniqueCashFlowNames}
            colors={colors}
            valueFormatter={valueFormatter}
            yAxisWidth={48}
            onValueChange={() => { }}
            stack={true}
        />
    </Card>
};

export default Chart;