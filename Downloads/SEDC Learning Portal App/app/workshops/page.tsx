'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, MapPin, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Workshop {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  attendees: number;
  maxCapacity: number;
  description: string;
  status: 'upcoming' | 'live' | 'past';
  category: string;
  thumbnail: string;
}

const workshops: Workshop[] = [
  {
    id: '1',
    title: 'Solar Installation Best Practices',
    instructor: 'Engineer Amara Okoro',
    date: 'March 15, 2024',
    time: '2:00 PM - 4:00 PM',
    duration: '2 hours',
    location: 'Virtual - Zoom',
    attendees: 87,
    maxCapacity: 150,
    description: 'Learn the fundamentals of solar panel installation, safety protocols, and industry standards.',
    status: 'upcoming',
    category: 'Renewable Energy',
    thumbnail: '/images/workshop-solar.jpg',
  },
  {
    id: '2',
    title: 'Smart Agriculture IoT Systems',
    instructor: 'Dr. Chinedu Nwankwo',
    date: 'March 18, 2024',
    time: '3:00 PM - 5:00 PM',
    duration: '2 hours',
    location: 'Enugu Training Center',
    attendees: 45,
    maxCapacity: 100,
    description: 'Explore IoT applications in modern agriculture, including soil monitoring and crop analytics.',
    status: 'upcoming',
    category: 'Agri-Tech',
    thumbnail: '/images/workshop-agriculture.jpg',
  },
  {
    id: '3',
    title: 'Electrical Safety in Construction',
    instructor: 'Engineer Emeka Okonkwo',
    date: 'March 10, 2024',
    time: '10:00 AM - 12:00 PM',
    duration: '2 hours',
    location: 'Virtual - Teams',
    attendees: 120,
    maxCapacity: 200,
    description: 'Critical safety standards and protocols for working with electrical systems on construction sites.',
    status: 'live',
    category: 'Construction',
    thumbnail: '/images/workshop-electrical.jpg',
  },
  {
    id: '4',
    title: 'Wind Energy Fundamentals',
    instructor: 'Prof. Okechukwu Adeyemi',
    date: 'March 5, 2024',
    time: '2:00 PM - 3:30 PM',
    duration: '1.5 hours',
    location: 'Virtual - Zoom',
    attendees: 95,
    maxCapacity: 150,
    description: 'Comprehensive overview of wind energy systems and their role in sustainable development.',
    status: 'past',
    category: 'Renewable Energy',
    thumbnail: '/images/workshop-wind.jpg',
  },
];

export default function WorkshopsPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredWorkshops = workshops.filter((w) => {
    if (filterStatus === 'all') return true;
    return w.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-600 text-white animate-pulse">LIVE NOW</Badge>;
      case 'upcoming':
        return <Badge className="bg-primary text-primary-foreground">UPCOMING</Badge>;
      case 'past':
        return <Badge className="bg-muted text-muted-foreground">COMPLETED</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64 overflow-auto w-full">
        <Header userName="Engineer Chidi" userRole="Learner & Trainer" />

        <main className="flex-1 overflow-auto w-full">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Virtual Workshops
              </h1>
              <p className="text-muted-foreground">
                Join live sessions with industry experts and learn practical skills
              </p>
            </div>

            {/* Tabs for filtering */}
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1">
                <TabsTrigger
                  value="all"
                  onClick={() => setFilterStatus('all')}
                  className="text-xs sm:text-sm"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="live"
                  onClick={() => setFilterStatus('live')}
                  className="text-xs sm:text-sm"
                >
                  Live
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  onClick={() => setFilterStatus('upcoming')}
                  className="text-xs sm:text-sm"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  onClick={() => setFilterStatus('past')}
                  className="text-xs sm:text-sm"
                >
                  Completed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  {filteredWorkshops.map((workshop) => (
                    <Card
                      key={workshop.id}
                      className="overflow-hidden border border-border hover:shadow-lg transition-shadow flex flex-col"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-32 sm:h-40 md:h-48 bg-muted overflow-hidden">
                        <img
                          src={workshop.thumbnail}
                          alt={workshop.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        {workshop.status === 'live' && (
                          <button className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full bg-red-600 text-white animate-pulse flex items-center gap-2 text-sm font-semibold">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            <span className="hidden sm:inline">LIVE</span>
                          </button>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <div>
                            <Badge className="bg-secondary text-secondary-foreground text-xs mb-2">
                              {workshop.category}
                            </Badge>
                            <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-2">
                              {workshop.title}
                            </h3>
                          </div>
                          {getStatusBadge(workshop.status)}
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {workshop.description}
                        </p>

                        <div className="space-y-2 mb-4 text-xs sm:text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span>{workshop.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{workshop.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span>{workshop.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4 flex-shrink-0" />
                            <span>
                              {workshop.attendees}/{workshop.maxCapacity}
                              <span className="hidden sm:inline"> attendees</span>
                            </span>
                          </div>
                        </div>

                        {/* Instructor */}
                        <div className="border-t border-border pt-3 mb-4">
                          <p className="text-xs text-muted-foreground mb-1">Instructor</p>
                          <p className="text-sm font-semibold text-foreground">
                            {workshop.instructor}
                          </p>
                        </div>

                        {/* Action Button */}
                        <Button
                          className={`w-full mt-auto ${
                            workshop.status === 'live'
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                          }`}
                        >
                          {workshop.status === 'live' ? (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Join Now
                            </>
                          ) : workshop.status === 'upcoming' ? (
                            'Register Now'
                          ) : (
                            'View Recording'
                          )}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="live" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  {filteredWorkshops.map((workshop) => (
                    <Card
                      key={workshop.id}
                      className="overflow-hidden border border-border hover:shadow-lg transition-shadow flex flex-col"
                    >
                      <div className="relative h-32 sm:h-40 md:h-48 bg-muted overflow-hidden">
                        <img
                          src={workshop.thumbnail}
                          alt={workshop.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <button className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full bg-red-600 text-white animate-pulse flex items-center gap-2 text-sm font-semibold">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          <span className="hidden sm:inline">LIVE</span>
                        </button>
                      </div>

                      <div className="p-4 sm:p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <div>
                            <Badge className="bg-secondary text-secondary-foreground text-xs mb-2">
                              {workshop.category}
                            </Badge>
                            <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-2">
                              {workshop.title}
                            </h3>
                          </div>
                          <Badge className="bg-red-600 text-white animate-pulse">LIVE NOW</Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {workshop.description}
                        </p>

                        <div className="space-y-2 mb-4 text-xs sm:text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{workshop.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4 flex-shrink-0" />
                            <span>
                              {workshop.attendees}/{workshop.maxCapacity}
                              <span className="hidden sm:inline"> attendees</span>
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-border pt-3 mb-4">
                          <p className="text-xs text-muted-foreground mb-1">Instructor</p>
                          <p className="text-sm font-semibold text-foreground">
                            {workshop.instructor}
                          </p>
                        </div>

                        <Button className="w-full mt-auto bg-red-600 hover:bg-red-700 text-white">
                          <Play className="w-4 h-4 mr-2" />
                          Join Now
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  {filteredWorkshops.map((workshop) => (
                    <Card
                      key={workshop.id}
                      className="overflow-hidden border border-border hover:shadow-lg transition-shadow flex flex-col"
                    >
                      <div className="relative h-32 sm:h-40 md:h-48 bg-muted overflow-hidden">
                        <img
                          src={workshop.thumbnail}
                          alt={workshop.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>

                      <div className="p-4 sm:p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <div>
                            <Badge className="bg-secondary text-secondary-foreground text-xs mb-2">
                              {workshop.category}
                            </Badge>
                            <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-2">
                              {workshop.title}
                            </h3>
                          </div>
                          <Badge className="bg-primary text-primary-foreground">UPCOMING</Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {workshop.description}
                        </p>

                        <div className="space-y-2 mb-4 text-xs sm:text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span>{workshop.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{workshop.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4 flex-shrink-0" />
                            <span>
                              {workshop.attendees}/{workshop.maxCapacity}
                              <span className="hidden sm:inline"> attendees</span>
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-border pt-3 mb-4">
                          <p className="text-xs text-muted-foreground mb-1">Instructor</p>
                          <p className="text-sm font-semibold text-foreground">
                            {workshop.instructor}
                          </p>
                        </div>

                        <Button className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                          Register Now
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="past" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  {filteredWorkshops.map((workshop) => (
                    <Card
                      key={workshop.id}
                      className="overflow-hidden border border-border hover:shadow-lg transition-shadow flex flex-col opacity-75"
                    >
                      <div className="relative h-32 sm:h-40 md:h-48 bg-muted overflow-hidden">
                        <img
                          src={workshop.thumbnail}
                          alt={workshop.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                      </div>

                      <div className="p-4 sm:p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <div>
                            <Badge className="bg-secondary text-secondary-foreground text-xs mb-2">
                              {workshop.category}
                            </Badge>
                            <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-2">
                              {workshop.title}
                            </h3>
                          </div>
                          <Badge className="bg-muted text-muted-foreground">COMPLETED</Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {workshop.description}
                        </p>

                        <div className="space-y-2 mb-4 text-xs sm:text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span>{workshop.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4 flex-shrink-0" />
                            <span>{workshop.duration}</span>
                          </div>
                        </div>

                        <div className="border-t border-border pt-3 mb-4">
                          <p className="text-xs text-muted-foreground mb-1">Instructor</p>
                          <p className="text-sm font-semibold text-foreground">
                            {workshop.instructor}
                          </p>
                        </div>

                        <Button className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                          View Recording
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
