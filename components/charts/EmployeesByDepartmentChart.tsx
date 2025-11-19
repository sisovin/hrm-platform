"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface EmployeesByDepartmentChartProps {
  data?: Array<{ name: string; value: number }>;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function EmployeesByDepartmentChart({ data }: EmployeesByDepartmentChartProps) {
  const [mounted] = useState(true);

  // Default sample data if no data provided
  const chartData = data || [
    { name: "Engineering", value: 15 },
    { name: "Sales", value: 10 },
    { name: "Marketing", value: 8 },
    { name: "HR", value: 5 },
    { name: "Finance", value: 7 },
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (!mounted) {
    return (
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Employees by Department</CardTitle>
          <CardDescription>Distribution of {total} employees across departments</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Loading chart...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Employees by Department</CardTitle>
        <CardDescription>Distribution of {total} employees across departments</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
