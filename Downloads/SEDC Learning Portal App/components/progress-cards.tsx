import { Card } from '@/components/ui/card';
import { BookOpen, Award, Clock, CheckCircle2 } from 'lucide-react';

export function ProgressCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {/* Ongoing Courses Card */}
      <Card className="p-4 sm:p-6 border border-border hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">
              ONGOING COURSES
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">2</h3>
          </div>
          <div className="p-3 rounded-lg bg-primary/10">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-foreground">
                Solar Installation
              </span>
              <span className="text-xs font-medium text-primary">65%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all"
                style={{ width: '65%' }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-foreground">
                Agri-tech Fundamentals
              </span>
              <span className="text-xs font-medium text-secondary">42%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-secondary rounded-full h-2 transition-all"
                style={{ width: '42%' }}
              />
            </div>
          </div>
        </div>

        <button className="mt-4 text-sm font-semibold text-primary hover:underline">
          View All Courses →
        </button>
      </Card>

      {/* Certification Progress Card */}
      <Card className="p-4 sm:p-6 border border-border hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">
              CERTIFICATION PROGRESS
            </p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              3
              <span className="text-lg text-muted-foreground">/5</span>
            </h3>
          </div>
          <div className="p-3 rounded-lg bg-secondary/10">
            <Award className="w-6 h-6 text-secondary" />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-foreground">Solar Tech Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-foreground">Agri-tech Level 1</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm text-foreground">Safety Compliance</span>
          </div>
        </div>

        <button className="text-sm font-semibold text-secondary hover:underline">
          View Certificates →
        </button>
      </Card>

      {/* Next Workshop Card */}
      <Card className="p-4 sm:p-6 border border-border hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">
              NEXT WORKSHOP
            </p>
            <h3 className="text-base font-semibold text-foreground line-clamp-2">
              Renewable Energy Design
            </h3>
          </div>
          <div className="p-3 rounded-lg bg-accent/10">
            <Clock className="w-6 h-6 text-accent" />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Date & Time
            </p>
            <p className="text-sm font-semibold text-foreground">
              March 15, 2024
            </p>
            <p className="text-sm text-muted-foreground">2:00 PM - 4:30 PM WAT</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Location
            </p>
            <p className="text-sm font-semibold text-foreground">Enugu Hub</p>
            <p className="text-sm text-muted-foreground">
              SEDC Regional Center
            </p>
          </div>
        </div>

        <button className="mt-4 w-full px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
          Register Now
        </button>
      </Card>
    </div>
  );
}
