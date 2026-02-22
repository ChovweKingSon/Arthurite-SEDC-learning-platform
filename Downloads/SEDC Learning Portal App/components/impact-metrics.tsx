'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Award, Briefcase } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const skillsGapsData = [
  { state: 'Abia', closed: 145, remaining: 85 },
  { state: 'Anambra', closed: 192, remaining: 58 },
  { state: 'Ebonyi', closed: 128, remaining: 72 },
  { state: 'Enugu', closed: 215, remaining: 35 },
  { state: 'Imo', closed: 167, remaining: 63 },
];

const employmentRateData = [
  { month: 'Jan', rate: 62 },
  { month: 'Feb', rate: 65 },
  { month: 'Mar', rate: 68 },
  { month: 'Apr', rate: 71 },
  { month: 'May', rate: 74 },
  { month: 'Jun', rate: 76 },
];

const impactData = [
  { name: 'Employed', value: 1247, color: '#1B5E20' },
  { name: 'Self-Employed', value: 456, color: '#D4A574' },
  { name: 'Further Training', value: 312, color: '#2E7D32' },
];

const metricsCards = [
  {
    label: 'Total Learners',
    value: '2,847',
    icon: Users,
    change: '+12%',
    trend: 'up',
  },
  {
    label: 'Certifications Awarded',
    value: '1,450',
    icon: Award,
    change: '+8%',
    trend: 'up',
  },
  {
    label: 'Placement Rate',
    value: '76%',
    icon: Briefcase,
    change: '+4%',
    trend: 'up',
  },
  {
    label: 'Industry Partners',
    value: '42',
    icon: TrendingUp,
    change: '+3',
    trend: 'up',
  },
];

export function ImpactMetrics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Regional Impact Dashboard
          </h2>
          <p className="text-muted-foreground mt-1">
            Monitor SEDC's skills development impact across the 5 South-East states
          </p>
        </div>
        <Badge className="bg-primary text-primary-foreground">
          Admin View
        </Badge>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsCards.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="p-4 md:p-6 border border-border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                    {metric.label}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                    {metric.value}
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs md:text-sm font-semibold text-green-600">
                  {metric.change}
                </span>
                <span className="text-xs text-muted-foreground">
                  vs last month
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Gaps Closed by State */}
        <Card className="p-6 border border-border">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground">
              Skills Gaps Closed by State
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Training progress across South-East region
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={skillsGapsData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="state" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Legend />
              <Bar dataKey="closed" fill="#1B5E20" name="Gaps Closed" />
              <Bar dataKey="remaining" fill="#D4A574" name="Remaining" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Employment Rate Trend */}
        <Card className="p-6 border border-border">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground">
              Employment Rate Trend
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Graduate placement rate over 6 months
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={employmentRateData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#1B5E20"
                strokeWidth={3}
                dot={{ fill: '#1B5E20', r: 5 }}
                activeDot={{ r: 7 }}
                name="Employment Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Graduate Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-border">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground">
              Graduate Outcomes Distribution
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Career paths of certified graduates
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={impactData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {impactData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: 'var(--foreground)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Detailed Statistics */}
        <div className="space-y-4">
          <Card className="p-6 border border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">
              State-wise Statistics
            </h3>
            <div className="space-y-3">
              {skillsGapsData.map((state, index) => {
                const total = state.closed + state.remaining;
                const percentage = Math.round((state.closed / total) * 100);
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-foreground">
                        {state.state}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {state.closed} skills gaps closed
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 border border-border bg-gradient-to-br from-primary/5 to-secondary/5">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Key Achievements
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span className="text-foreground">
                  <strong>2,847</strong> learners enrolled across all programs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span className="text-foreground">
                  <strong>1,450</strong> certifications awarded to graduates
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span className="text-foreground">
                  <strong>76%</strong> employment rate among graduates
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span className="text-foreground">
                  <strong>847</strong> skills gaps closed in the region
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
