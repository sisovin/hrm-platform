'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface QuickAction {
  title: string;
  description?: string;
  icon: LucideIcon;
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  disabled?: boolean;
}

interface QuickActionsProps {
  title?: string;
  description?: string;
  actions: QuickAction[];
  columns?: 2 | 3 | 4;
}

export function QuickActions({
  title = 'Quick Actions',
  description,
  actions,
  columns = 4,
}: QuickActionsProps) {
  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className={`grid gap-3 md:${gridColsClass}`}>
          {actions.map((action, index) => {
            const Icon = action.icon;

            return (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                className="h-auto flex-col gap-2 py-4"
                onClick={action.onClick}
                disabled={action.disabled}
                asChild={!!action.href}
              >
                {action.href ? (
                  <a href={action.href}>
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{action.title}</span>
                    {action.description && (
                      <span className="text-xs text-muted-foreground">
                        {action.description}
                      </span>
                    )}
                  </a>
                ) : (
                  <>
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{action.title}</span>
                    {action.description && (
                      <span className="text-xs text-muted-foreground">
                        {action.description}
                      </span>
                    )}
                  </>
                )}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

interface StatCard {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface StatsGridProps {
  stats: StatCard[];
  columns?: 2 | 3 | 4;
}

export function StatsGrid({ stats, columns = 4 }: StatsGridProps) {
  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns];

  return (
    <div className={`grid gap-4 ${gridColsClass}`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.description && (
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              )}
              {stat.trend && (
                <div className="flex items-center gap-1 text-xs mt-1">
                  <span className={stat.trend.isPositive ? 'text-green-600' : 'text-red-600'}>
                    {stat.trend.isPositive ? '↑' : '↓'} {Math.abs(stat.trend.value)}%
                  </span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md">{description}</p>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

interface DataTableCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function DataTableCard({ title, description, children, actions }: DataTableCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
