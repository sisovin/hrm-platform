"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface AverageSalaryByDepartmentBarChartProps {
  data?: Array<{ department: string; avgSalary: number }>;
}

export function AverageSalaryByDepartmentBarChart({ data }: AverageSalaryByDepartmentBarChartProps) {
  const [mounted] = useState(true);

  // Default sample data if no data provided
  const chartData = data || [
    { department: "Engineering", avgSalary: 85000 },
    { department: "Finance", avgSalary: 78000 },
    { department: "Sales", avgSalary: 65000 },
    { department: "Marketing", avgSalary: 62000 },
    { department: "HR", avgSalary: 58000 },
  ];

  const formatCurrency = (value: number) => {
    return `$${(value / 1000).toFixed(0)}k`;
  };

  if (!mounted) {
    return (
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Average Salary by Department</CardTitle>
          <CardDescription>Comparison of average salaries across departments</CardDescription>
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
        <CardTitle>Average Salary by Department</CardTitle>
        <CardDescription>Comparison of average salaries across departments</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="department"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              formatter={(value: number) => `$${value.toLocaleString()}`}
              labelStyle={{ color: "#000" }}
            />
            <Legend />
            <Bar dataKey="avgSalary" fill="#8884d8" name="Average Salary" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
