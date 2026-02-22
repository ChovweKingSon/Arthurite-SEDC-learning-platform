'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { ProgressCards } from '@/components/progress-cards';
import { CourseCatalog } from '@/components/course-catalog';
import { TalentMarketplace } from '@/components/talent-marketplace';
import { ImpactMetrics } from '@/components/impact-metrics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

export default function Dashboard() {
  const [userRole] = useState<'learner' | 'admin'>('learner');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 overflow-auto w-full">
        {/* Header */}
        <Header userName="Engineer Chidi" userRole="Learner & Trainer" />

        {/* Main Content */}
        <main className="flex-1 overflow-auto w-full">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {/* Dashboard Content */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    Welcome Back, Engineer Chidi
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your learning journey and explore new opportunities
                  </p>
                </div>
              </div>

              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1">
                <TabsTrigger value="dashboard" className="text-xs sm:text-sm">Dashboard</TabsTrigger>
                <TabsTrigger value="courses" className="text-xs sm:text-sm">Courses</TabsTrigger>
                <TabsTrigger value="marketplace" className="text-xs sm:text-sm">Marketplace</TabsTrigger>
                {userRole === 'admin' && (
                  <TabsTrigger value="impact" className="text-xs sm:text-sm">Impact</TabsTrigger>
                )}
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Your Learning Progress
                  </h2>
                  <ProgressCards />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  <Card className="p-4 sm:p-6 border border-border">
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-2">
                      LEARNING HOURS
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                      124
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      +12 hours this week
                    </p>
                  </Card>

                  <Card className="p-4 sm:p-6 border border-border">
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-2">
                      SKILLS DEVELOPED
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">18</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Across 3 courses
                    </p>
                  </Card>

                  <Card className="p-4 sm:p-6 border border-border">
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-2">
                      ACHIEVEMENTS
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">7</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Badges earned
                    </p>
                  </Card>
                </div>
              </TabsContent>

              {/* Courses Tab */}
              <TabsContent value="courses">
                <CourseCatalog />
              </TabsContent>

              {/* Marketplace Tab */}
              <TabsContent value="marketplace">
                <TalentMarketplace />
              </TabsContent>

              {/* Impact Metrics Tab (Admin Only) */}
              {userRole === 'admin' && (
                <TabsContent value="impact">
                  <ImpactMetrics />
                </TabsContent>
              )}
            </Tabs>

            {/* Footer Note */}
            <div className="mt-12 py-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                SEDC Technical Skills Development Platform • Empowering South-East
                Development
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
