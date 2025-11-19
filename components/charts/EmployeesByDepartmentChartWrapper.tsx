"use client";

import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const EmployeesByDepartmentChartClient = dynamic(
  () => import('./EmployeesByDepartmentChart').then(mod => ({ default: mod.EmployeesByDepartmentChart })),
  {
    ssr: false,
    loading: () => (
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Employees by Department</CardTitle>
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

interface EmployeesByDepartmentChartWrapperProps {
  data?: Array<{ name: string; value: number }>;
}

export function EmployeesByDepartmentChartWrapper({ data }: EmployeesByDepartmentChartWrapperProps) {
  return <EmployeesByDepartmentChartClient data={data} />;
}
