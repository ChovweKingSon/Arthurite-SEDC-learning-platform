'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap,
  Sprout,
  Hammer,
  Users,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: string;
  students: number;
  icon: React.ReactNode;
  badge: string;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Solar Installation & Maintenance',
    category: 'Renewable Energy',
    description:
      'Master the fundamentals of solar panel installation, electrical connections, and system maintenance.',
    difficulty: 'Intermediate',
    duration: '8 weeks',
    instructor: 'Dr. Eze Okoro',
    students: 342,
    icon: <Zap className="w-6 h-6" />,
    badge: 'Industry Standard',
  },
  {
    id: '2',
    title: 'Sustainable Agri-Tech Solutions',
    category: 'Agri-tech',
    description:
      'Learn modern agricultural techniques using IoT sensors, data analytics, and precision farming tools.',
    difficulty: 'Beginner',
    duration: '6 weeks',
    instructor: 'Prof. Chioma Adeyemi',
    students: 521,
    icon: <Sprout className="w-6 h-6" />,
    badge: 'Industry Standard',
  },
  {
    id: '3',
    title: 'Construction Project Management',
    category: 'Construction',
    description:
      'Comprehensive training in project planning, budgeting, team coordination, and quality assurance.',
    difficulty: 'Intermediate',
    duration: '10 weeks',
    instructor: 'Engr. James Okonkwo',
    students: 287,
    icon: <Hammer className="w-6 h-6" />,
    badge: 'Industry Standard',
  },
  {
    id: '4',
    title: 'Wind Energy Systems',
    category: 'Renewable Energy',
    description:
      'Advanced understanding of wind turbines, installation procedures, and grid integration.',
    difficulty: 'Advanced',
    duration: '12 weeks',
    instructor: 'Dr. Amara Ndubueze',
    students: 156,
    icon: <Zap className="w-6 h-6" />,
    badge: 'Industry Standard',
  },
  {
    id: '5',
    title: 'Irrigation System Design',
    category: 'Agri-tech',
    description:
      'Design and implement efficient irrigation systems for maximum crop yield and water conservation.',
    difficulty: 'Intermediate',
    duration: '7 weeks',
    instructor: 'Dr. Ngozi Okafor',
    students: 403,
    icon: <Sprout className="w-6 h-6" />,
    badge: 'Industry Standard',
  },
  {
    id: '6',
    title: 'Green Building Certification',
    category: 'Construction',
    description:
      'Learn sustainable construction practices and achieve LEED and other green building certifications.',
    difficulty: 'Advanced',
    duration: '11 weeks',
    instructor: 'Arch. Ifeanyi Udechukwu',
    students: 198,
    icon: <Hammer className="w-6 h-6" />,
    badge: 'Industry Standard',
  },
];

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Intermediate:
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
};

export function CourseCatalog() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  const filteredCourses = selectedDifficulty
    ? courses.filter((c) => c.difficulty === selectedDifficulty)
    : courses;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Vocational Training Catalog
          </h2>
          <p className="text-muted-foreground mt-1">
            Choose from {courses.length} industry-standard courses
          </p>
        </div>
      </div>

      {/* Difficulty Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedDifficulty === null ? 'default' : 'outline'}
          onClick={() => setSelectedDifficulty(null)}
          className="text-sm"
        >
          All Levels
        </Button>
        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
          <Button
            key={level}
            variant={
              selectedDifficulty === level ? 'default' : 'outline'
            }
            onClick={() => setSelectedDifficulty(level)}
            className="text-sm"
          >
            {level}
          </Button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="overflow-hidden border border-border hover:shadow-lg transition-shadow flex flex-col h-full"
          >
            {/* Course Header with Icon */}
            <div className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border">
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
                  <span className="text-primary text-sm sm:text-base">{course.icon}</span>
                </div>
                <Badge className="bg-secondary text-secondary-foreground text-xs whitespace-nowrap">
                  {course.badge}
                </Badge>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-2">
                {course.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                {course.category}
              </p>
            </div>

            {/* Course Body */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Difficulty Badge */}
              <div className="mb-4">
                <Badge
                  className={`${
                    difficultyColors[
                      course.difficulty as keyof typeof difficultyColors
                    ]
                  }`}
                >
                  {course.difficulty}
                </Badge>
              </div>

              {/* Course Meta */}
              <div className="space-y-2 mb-4 flex-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{course.students} students</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">
                    {course.instructor}
                  </p>
                </div>
              </div>

              {/* Enroll Button */}
              <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2">
                Enroll Now
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No courses found for the selected difficulty level.
          </p>
        </div>
      )}
    </div>
  );
}
