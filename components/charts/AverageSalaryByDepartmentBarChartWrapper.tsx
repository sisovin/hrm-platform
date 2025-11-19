"use client";

import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AverageSalaryByDepartmentBarChartClient = dynamic(
  () => import('./AverageSalaryByDepartmentBarChart').then(mod => ({ default: mod.AverageSalaryByDepartmentBarChart })),
  {
    ssr: false,
    loading: () => (
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Average Salary by Department</CardTitle>
          <CardDescription>Loading chart...</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Loading chart...
          </div>
        </CardContent>
      </Card>
    )
  }
);

interface AverageSalaryByDepartmentBarChartWrapperProps {
  data?: Array<{ department: string; avgSalary: number }>;
}

export function AverageSalaryByDepartmentBarChartWrapper({ data }: AverageSalaryByDepartmentBarChartWrapperProps) {
  return <AverageSalaryByDepartmentBarChartClient data={data} />;
}
