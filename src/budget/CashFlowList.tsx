import React from "react";
import { Card, Title, DeltaBar, Flex } from "@tremor/react";
import { CashFlow } from "../rustTypes/CashFlow";

const valueFormatter = (number: number) => `${Math.sign(number) < 0 ? "-" : ""}\$${Intl.NumberFormat("us").format(Math.abs(number)).toString()}`;

const CashFlowList: React.FC<{ cashFlows: CashFlow[] }> = ({ cashFlows }) => {
  const maxAmount = Math.max(...cashFlows.map((cashFlow: CashFlow) => cashFlow.amount));

  return <Card style={{ maxWidth: "350px" }}>
    <Flex flexDirection="row" alignItems="baseline">
      <Title>Cash Flows</Title>
      <div className="text-xs">Log Scaled</div>
    </Flex>
    <div
      className="flex flex-col gap-2 py-2"
      style={{
        maxHeight: "300px",
        overflowY: "auto",
      }}
    >
      {
        cashFlows
          .sort((a: CashFlow, b: CashFlow) => Math.abs(b.amount) - Math.abs(a.amount))
          .map((cashFlow: CashFlow) => {
            return <div className="flex flex-col text-gray-400 text-xs">
              <div className="flex flex-row justify-between gap-4 w-full pb-1">
                <div>{cashFlow.name}</div>
                <div>{valueFormatter(cashFlow.amount)}</div>
              </div>
              <DeltaBar
                className="cursor-pointer hover:opacity-75"
                value={(Math.log(Math.abs(cashFlow.amount)) / Math.log(maxAmount)) * Math.sign(cashFlow.amount) * 100}
                tooltip={`${valueFormatter(cashFlow.amount)} | ${cashFlow.frequency}`}
                onClick={() => {}}
              />
            </div>
          })
      }
    </div>
  </Card>
}

export default CashFlowList;