'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import {
  MapPin,
  Star,
  CheckCircle2,
  Download,
  Mail,
  Phone,
  Briefcase,
  Award,
  ExternalLink,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Technician {
  id: string;
  name: string;
  title: string;
  state: 'Abia' | 'Anambra' | 'Ebonyi' | 'Enugu' | 'Imo';
  skills: string[];
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  yearsExperience: number;
  certifications: string[];
  availability: 'Available' | 'Busy' | 'Part-time';
  email: string;
  phone: string;
  credentialId: string;
  hourlyRate?: number;
  projects?: number;
  bio?: string;
}

const technicians: Technician[] = [
  {
    id: '1',
    name: 'Chukwu Amadi',
    title: 'Solar Installation Technician',
    state: 'Enugu',
    skills: ['Solar PV Systems', 'Electrical Wiring', 'System Design', 'Maintenance'],
    location: 'Enugu City, Enugu State',
    rating: 4.8,
    reviews: 47,
    verified: true,
    yearsExperience: 8,
    certifications: ['SEDC Solar Expert', 'International Solar Cert', 'Electrical Safety'],
    availability: 'Available',
    email: 'chukwu.amadi@sedc.com',
    phone: '+234 803 123 4567',
    credentialId: 'SEDC-SLR-001-2024',
    hourlyRate: 15000,
    projects: 156,
    bio: 'Expert in residential and commercial solar installations with proven track record across Enugu and neighboring states.',
  },
  {
    id: '2',
    name: 'Blessing Nkomo',
    title: 'Agri-Tech Specialist',
    state: 'Abia',
    skills: ['Precision Farming', 'Irrigation Systems', 'Soil Analytics', 'Crop Monitoring'],
    location: 'Umuahia, Abia State',
    rating: 4.9,
    reviews: 62,
    verified: true,
    yearsExperience: 6,
    certifications: ['Agri-Tech Certification', 'IoT Agriculture', 'Data Analytics'],
    availability: 'Available',
    email: 'blessing.nkomo@sedc.com',
    phone: '+234 805 987 6543',
    credentialId: 'SEDC-AGR-002-2024',
    hourlyRate: 12000,
    projects: 89,
    bio: 'Specializes in modern agricultural technology solutions for small and medium-scale farmers.',
  },
  {
    id: '3',
    name: 'Dr. Kenneth Obi',
    title: 'Construction Project Manager',
    state: 'Anambra',
    skills: ['Project Management', 'Green Building', 'Quality Control', 'Civil Engineering'],
    location: 'Awka, Anambra State',
    rating: 4.7,
    reviews: 89,
    verified: true,
    yearsExperience: 12,
    certifications: ['PMP', 'LEED Green Building', 'Construction Safety'],
    availability: 'Busy',
    email: 'kenneth.obi@sedc.com',
    phone: '+234 807 654 3210',
    credentialId: 'SEDC-CNS-003-2024',
    hourlyRate: 20000,
    projects: 234,
    bio: 'Led construction of 50+ projects including schools, hospitals, and commercial centers.',
  },
  {
    id: '4',
    name: 'Ada Okeke',
    title: 'Renewable Energy Consultant',
    state: 'Ebonyi',
    skills: ['Solar Systems', 'Wind Energy', 'Energy Audit', 'System Integration'],
    location: 'Abakaliki, Ebonyi State',
    rating: 4.8,
    reviews: 51,
    verified: true,
    yearsExperience: 7,
    certifications: ['Renewable Energy Expert', 'Energy Auditor', 'System Designer'],
    availability: 'Available',
    email: 'ada.okeke@sedc.com',
    phone: '+234 809 234 5678',
    credentialId: 'SEDC-REN-004-2024',
    hourlyRate: 18000,
    projects: 120,
    bio: 'Helps businesses and communities transition to clean energy with comprehensive assessments and solutions.',
  },
  {
    id: '5',
    name: 'Tunde Adeleye',
    title: 'Smart Agriculture Developer',
    state: 'Imo',
    skills: ['IoT Solutions', 'Mobile Apps', 'Data Analytics', 'Automation'],
    location: 'Owerri, Imo State',
    rating: 4.6,
    reviews: 38,
    verified: true,
    yearsExperience: 5,
    certifications: ['IoT Developer', 'Mobile Development', 'Data Science'],
    availability: 'Part-time',
    email: 'tunde.adeleye@sedc.com',
    phone: '+234 810 456 7890',
    credentialId: 'SEDC-IOT-005-2024',
    hourlyRate: 16000,
    projects: 67,
    bio: 'Develops cutting-edge smart farming solutions using AI and IoT technology.',
  },
  {
    id: '6',
    name: 'Nneka Uyanne',
    title: 'Infrastructure Engineer',
    state: 'Enugu',
    skills: ['Civil Engineering', 'CAD/BIM', 'Infrastructure Design', 'Surveying'],
    location: 'Enugu City, Enugu State',
    rating: 4.9,
    reviews: 74,
    verified: true,
    yearsExperience: 10,
    certifications: ['Civil Engineering', 'BIM Expert', 'Surveying Tech'],
    availability: 'Available',
    email: 'nneka.uyanne@sedc.com',
    phone: '+234 811 567 8901',
    credentialId: 'SEDC-CIV-006-2024',
    hourlyRate: 17000,
    projects: 145,
    bio: 'Expert in infrastructure design and implementation for sustainable development projects.',
  },
];

const states = ['Abia', 'Anambra', 'Ebonyi', 'Enugu', 'Imo'] as const;

export default function MarketplacePage() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedTechnician, setSelectedTechnician] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTechnicians = technicians.filter((tech) => {
    const matchesState = !selectedState || tech.state === selectedState;
    const matchesSearch = !searchTerm || 
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesState && matchesSearch;
  });

  const downloadCredential = (technician: Technician) => {
    const credentialContent = `
    SEDC DIGITAL CREDENTIAL
    =======================
    
    Name: ${technician.name}
    Title: ${technician.title}
    Credential ID: ${technician.credentialId}
    Location: ${technician.location}
    
    Rating: ${technician.rating}/5 (${technician.reviews} reviews)
    Years of Experience: ${technician.yearsExperience}
    Projects Completed: ${technician.projects}
    
    Certifications:
    ${technician.certifications.map(c => `- ${c}`).join('\n')}
    
    Skills:
    ${technician.skills.map(s => `- ${s}`).join('\n')}
    
    Availability: ${technician.availability}
    Contact: ${technician.email} | ${technician.phone}
    
    Verified by SEDC: ${technician.verified ? 'YES' : 'NO'}
    Issue Date: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([credentialContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${technician.name.replace(/\s+/g, '_')}_SEDC_Credential.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64 overflow-auto">
        <Header userName="Engineer Chidi" userRole="Talent Marketplace" />

        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                SEDC Talent Marketplace
              </h1>
              <p className="text-muted-foreground">
                Discover and connect with {technicians.length} certified technical professionals
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by name or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
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

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTechnicians.length} of {technicians.length} professionals
              </p>
            </div>

            {/* Technicians List */}
            {filteredTechnicians.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {filteredTechnicians.map((technician) => (
                  <Card
                    key={technician.id}
                    className="border border-border overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      {/* Top Section */}
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl flex-shrink-0">
                            {technician.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                              <h3 className="text-lg md:text-xl font-bold text-foreground">
                                {technician.name}
                              </h3>
                              {technician.verified && (
                                <Badge className="bg-secondary text-secondary-foreground w-fit flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  SEDC Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm md:text-base text-muted-foreground mb-2">
                              {technician.title}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{technician.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Rating Badge */}
                        <div className="flex items-center gap-2 bg-muted p-3 rounded-lg text-center md:text-right">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(technician.rating)
                                    ? 'fill-secondary text-secondary'
                                    : 'text-muted-foreground'
                                }`}
                              />
                            ))}
                          </div>
                          <div>
                            <p className="font-bold text-foreground">
                              {technician.rating}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ({technician.reviews})
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Middle Section - Bio & Stats */}
                      {technician.bio && (
                        <p className="text-sm text-muted-foreground mb-6 py-4 border-y border-border">
                          {technician.bio}
                        </p>
                      )}

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="p-3 rounded-lg bg-muted">
                          <p className="text-xs text-muted-foreground mb-1">
                            Experience
                          </p>
                          <p className="font-bold text-foreground">
                            {technician.yearsExperience}+ yrs
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted">
                          <p className="text-xs text-muted-foreground mb-1">
                            Projects
                          </p>
                          <p className="font-bold text-foreground">
                            {technician.projects}
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted">
                          <p className="text-xs text-muted-foreground mb-1">
                            Hourly Rate
                          </p>
                          <p className="font-bold text-foreground">
                            ₦{technician.hourlyRate?.toLocaleString()}
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-muted">
                          <p className="text-xs text-muted-foreground mb-1">
                            Status
                          </p>
                          <Badge
                            variant="outline"
                            className={
                              technician.availability === 'Available'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : technician.availability === 'Busy'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            }
                          >
                            {technician.availability}
                          </Badge>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                          Key Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {technician.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                          Certifications
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {technician.certifications.map((cert) => (
                            <div
                              key={cert}
                              className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-medium"
                            >
                              <Award className="w-3 h-3" />
                              {cert}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact Info and Actions */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-border">
                        <div className="flex flex-col sm:flex-row gap-3 text-sm">
                          <a
                            href={`mailto:${technician.email}`}
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Mail className="w-4 h-4" />
                            <span className="hidden sm:inline">Email</span>
                          </a>
                          <a
                            href={`tel:${technician.phone}`}
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Phone className="w-4 h-4" />
                            <span className="hidden sm:inline">Call</span>
                          </a>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          <Button
                            onClick={() =>
                              downloadCredential(technician)
                            }
                            className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity"
                          >
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">
                              Download Credential
                            </span>
                            <span className="sm:hidden">Credential</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2"
                          >
                            <Briefcase className="w-4 h-4" />
                            <span className="hidden sm:inline">View Profile</span>
                            <span className="sm:hidden">Profile</span>
                          </Button>
                        </div>
                      </div>

                      {/* Credential ID */}
                      <div className="mt-4 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
                        <span className="font-semibold">Credential ID:</span>{' '}
                        {technician.credentialId}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center border border-border">
                <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground mb-2">No professionals found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </Card>
            )}

            {/* Footer */}
            <div className="mt-12 py-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                All professionals are SEDC-verified and hold valid certifications
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
