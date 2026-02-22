'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { CourseCatalog } from '@/components/course-catalog';

export default function TrainingPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64 overflow-auto w-full">
        <Header userName="Engineer Chidi" userRole="Training Modules" />

        <main className="flex-1 overflow-auto w-full">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Training Modules
              </h1>
              <p className="text-muted-foreground">
                Access comprehensive vocational training across solar energy, agri-tech, and construction
              </p>
            </div>

            <CourseCatalog />

            <div className="mt-12 py-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                All modules are SEDC-certified and recognized industry-wide
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
