'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Briefcase,
  CheckCircle2,
  Mail,
  Phone,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Professional {
  id: string;
  name: string;
  title: string;
  state: 'Abia' | 'Anambra' | 'Ebonyi' | 'Enugu' | 'Imo';
  specializations: string[];
  certifications: number;
  experience: string;
  rating: number;
  reviews: number;
  verified: boolean;
  availability: 'Available' | 'Busy' | 'Part-time';
}

const professionals: Professional[] = [
  {
    id: '1',
    name: 'Chukwu Amadi',
    title: 'Solar Installation Expert',
    state: 'Enugu',
    specializations: ['Solar Energy', 'Electrical Systems', 'Project Management'],
    certifications: 5,
    experience: '8 years',
    rating: 4.8,
    reviews: 47,
    verified: true,
    availability: 'Available',
  },
  {
    id: '2',
    name: 'Blessing Nkomo',
    title: 'Agri-Tech Specialist',
    state: 'Abia',
    specializations: ['Precision Farming', 'Irrigation Systems', 'Crop Analytics'],
    certifications: 3,
    experience: '6 years',
    rating: 4.9,
    reviews: 62,
    verified: true,
    availability: 'Available',
  },
  {
    id: '3',
    name: 'Dr. Kenneth Obi',
    title: 'Construction Manager',
    state: 'Anambra',
    specializations: [
      'Project Coordination',
      'Green Building',
      'Quality Assurance',
    ],
    certifications: 7,
    experience: '12 years',
    rating: 4.7,
    reviews: 89,
    verified: true,
    availability: 'Busy',
  },
  {
    id: '4',
    name: 'Ada Okeke',
    title: 'Renewable Energy Consultant',
    state: 'Ebonyi',
    specializations: [
      'Solar Systems',
      'Wind Energy',
      'Energy Audit',
    ],
    certifications: 4,
    experience: '7 years',
    rating: 4.8,
    reviews: 51,
    verified: true,
    availability: 'Available',
  },
  {
    id: '5',
    name: 'Tunde Adeleye',
    title: 'Smart Agriculture Developer',
    state: 'Imo',
    specializations: ['IoT Solutions', 'Agricultural Tech', 'Data Analytics'],
    certifications: 4,
    experience: '5 years',
    rating: 4.6,
    reviews: 38,
    verified: true,
    availability: 'Part-time',
  },
  {
    id: '6',
    name: 'Nneka Uyanne',
    title: 'Infrastructure Engineer',
    state: 'Enugu',
    specializations: ['Civil Engineering', 'Infrastructure Design', 'CAD/BIM'],
    certifications: 6,
    experience: '10 years',
    rating: 4.9,
    reviews: 74,
    verified: true,
    availability: 'Available',
  },
];

const states = ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'] as const;

const availabilityColors = {
  Available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Busy: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Part-time':
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
};

export function TalentMarketplace() {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const filteredProfessionals = selectedState
    ? professionals.filter((p) => p.state === selectedState)
    : professionals;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            SEDC Talent Marketplace
          </h2>
          <p className="text-muted-foreground mt-1">
            Connect with {professionals.length} verified skilled professionals
          </p>
        </div>
      </div>

      {/* State Filters */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Filter by State
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedState === null ? 'default' : 'outline'}
            onClick={() => setSelectedState(null)}
            className="text-sm"
          >
            All States
          </Button>
          {states.map((state) => (
            <Button
              key={state}
              variant={selectedState === state ? 'default' : 'outline'}
              onClick={() => setSelectedState(state)}
              className="text-sm"
            >
              <MapPin className="w-3 h-3 mr-1" />
              {state}
            </Button>
          ))}
        </div>
      </div>

      {/* Professionals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {filteredProfessionals.map((professional) => (
          <Card
            key={professional.id}
            className="overflow-hidden border border-border hover:shadow-lg transition-shadow flex flex-col"
          >
            {/* Header Section */}
            <div className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border">
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0">
                  {professional.name.charAt(0)}
                </div>
                {professional.verified && (
                  <Badge className="bg-secondary text-secondary-foreground flex items-center gap-1 text-xs whitespace-nowrap">
                    <CheckCircle2 className="w-3 h-3" />
                    <span className="hidden sm:inline">SEDC Verified</span>
                    <span className="sm:hidden">Verified</span>
                  </Badge>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                {professional.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{professional.title}</p>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              {/* Location */}
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{professional.state} State</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(professional.rating)
                          ? 'fill-secondary text-secondary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {professional.rating}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({professional.reviews})
                </span>
              </div>

              {/* Specializations */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                  Specializations
                </p>
                <div className="flex flex-wrap gap-1">
                  {professional.specializations.map((spec) => (
                    <Badge
                      key={spec}
                      variant="outline"
                      className="text-xs"
                    >
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Experience & Certifications */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div className="p-2 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="font-semibold text-foreground">
                    {professional.experience}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">
                    Certifications
                  </p>
                  <p className="font-semibold text-foreground">
                    {professional.certifications}
                  </p>
                </div>
              </div>

              {/* Availability Status */}
              <div className="mb-4">
                <Badge
                  className={`${
                    availabilityColors[
                      professional.availability as keyof typeof availabilityColors
                    ]
                  }`}
                >
                  {professional.availability}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                  Contact
                </button>
                <button className="flex-1 px-3 py-2 rounded-lg border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors">
                  Profile
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProfessionals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No professionals found in {selectedState} state.
          </p>
        </div>
      )}
    </div>
  );
}
