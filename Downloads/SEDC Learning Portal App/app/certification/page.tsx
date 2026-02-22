'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  Download,
  Share2,
  Eye,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  credentialId: string;
  issueDate: string;
  expiryDate?: string;
  status: 'active' | 'pending' | 'expired';
  progress: number;
  skills: string[];
  description: string;
  icon: string;
}

const certifications: Certification[] = [
  {
    id: '1',
    name: 'Solar Installation Technician',
    issuer: 'SEDC Technical Academy',
    credentialId: 'SEDC-SOL-2024-001',
    issueDate: 'January 15, 2024',
    expiryDate: 'January 15, 2027',
    status: 'active',
    progress: 100,
    skills: ['Solar Panel Installation', 'Electrical Safety', 'System Maintenance'],
    description:
      'Certified technician trained in solar panel installation, maintenance, and troubleshooting.',
    icon: '☀️',
  },
  {
    id: '2',
    name: 'Renewable Energy Fundamentals',
    issuer: 'SEDC Technical Academy',
    credentialId: 'SEDC-REN-2024-002',
    issueDate: 'December 20, 2023',
    expiryDate: 'December 20, 2026',
    status: 'active',
    progress: 100,
    skills: ['Wind Energy', 'Solar Power', 'Hybrid Systems', 'Energy Storage'],
    description:
      'Comprehensive certification in renewable energy systems and sustainable power generation.',
    icon: '⚡',
  },
  {
    id: '3',
    name: 'Smart Agriculture Systems',
    issuer: 'SEDC Technical Academy',
    credentialId: 'SEDC-AGR-2024-003',
    issueDate: 'November 5, 2023',
    expiryDate: 'November 5, 2026',
    status: 'active',
    progress: 100,
    skills: ['IoT Implementation', 'Soil Monitoring', 'Crop Analytics', 'System Integration'],
    description:
      'Certification in IoT-based agriculture systems and precision farming technologies.',
    icon: '🌾',
  },
  {
    id: '4',
    name: 'Construction Safety Management',
    issuer: 'SEDC Technical Academy',
    credentialId: 'SEDC-CSM-2024-004',
    issueDate: 'October 10, 2023',
    expiryDate: 'October 10, 2025',
    status: 'pending',
    progress: 85,
    skills: ['Safety Protocols', 'OSHA Compliance', 'Risk Assessment'],
    description: 'Advanced certification in construction safety management and compliance.',
    icon: '🏗️',
  },
  {
    id: '5',
    name: 'Advanced Electrical Systems',
    issuer: 'SEDC Technical Academy',
    credentialId: 'SEDC-AES-2024-005',
    issueDate: 'September 1, 2023',
    expiryDate: null,
    status: 'pending',
    progress: 72,
    skills: ['Circuit Design', 'Troubleshooting', 'Wiring Standards'],
    description: 'Professional certification in advanced electrical system design and maintenance.',
    icon: '⚙️',
  },
  {
    id: '6',
    name: 'Digital Skills Bootcamp',
    issuer: 'SEDC Technical Academy',
    credentialId: 'SEDC-DSB-2023-006',
    issueDate: 'August 15, 2023',
    expiryDate: null,
    status: 'expired',
    progress: 100,
    skills: ['Web Development', 'Database Management', 'Cloud Services'],
    description: 'Comprehensive digital skills certification (expired - renewal available).',
    icon: '💻',
  },
];

export default function CertificationPage() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const activeCerts = certifications.filter((c) => c.status === 'active');
  const pendingCerts = certifications.filter((c) => c.status === 'pending');
  const expiredCerts = certifications.filter((c) => c.status === 'expired');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600 text-white">ACTIVE</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600 text-white">IN PROGRESS</Badge>;
      case 'expired':
        return <Badge className="bg-red-600 text-white">EXPIRED</Badge>;
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
                Certifications
              </h1>
              <p className="text-muted-foreground">
                View your credentials and professional certifications
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8">
              <Card className="p-4 sm:p-6 border border-border">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-2">
                  ACTIVE CERTIFICATIONS
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {activeCerts.length}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">
                  Currently valid credentials
                </p>
              </Card>

              <Card className="p-4 sm:p-6 border border-border">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-2">
                  IN PROGRESS
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {pendingCerts.length}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">
                  Nearly complete certifications
                </p>
              </Card>

              <Card className="p-4 sm:p-6 border border-border">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-2">
                  TOTAL SKILLS GAINED
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">28</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  Across all certifications
                </p>
              </Card>
            </div>

            {/* Certifications Tabs */}
            <Tabs defaultValue="active" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 gap-1">
                <TabsTrigger value="active" className="text-xs sm:text-sm">
                  Active
                </TabsTrigger>
                <TabsTrigger value="pending" className="text-xs sm:text-sm">
                  In Progress
                </TabsTrigger>
                <TabsTrigger value="expired" className="text-xs sm:text-sm">
                  Expired
                </TabsTrigger>
              </TabsList>

              {/* Active Certifications */}
              <TabsContent value="active" className="space-y-4">
                {activeCerts.length > 0 ? (
                  activeCerts.map((cert) => (
                    <Card
                      key={cert.id}
                      className="p-4 sm:p-6 border border-border hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="text-3xl sm:text-4xl flex-shrink-0">
                            {cert.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-bold text-foreground">
                              {cert.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {cert.issuer}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              ID: {cert.credentialId}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(cert.status)}
                      </div>

                      {/* Validity Period */}
                      <div className="bg-muted rounded-lg p-3 sm:p-4 mb-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                          <div>
                            <p className="text-muted-foreground">Issued</p>
                            <p className="font-semibold text-foreground">
                              {cert.issueDate}
                            </p>
                          </div>
                          {cert.expiryDate && (
                            <div>
                              <p className="text-muted-foreground">Expires</p>
                              <p className="font-semibold text-foreground">
                                {cert.expiryDate}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-4">
                        <p className="text-xs sm:text-sm font-semibold text-foreground mb-2">
                          Skills Covered:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill) => (
                            <Badge
                              key={skill}
                              className="bg-primary/10 text-primary text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <Button
                          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
                          onClick={() => setSelectedCert(cert)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Certificate
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 text-sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 text-sm"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-8 text-center border border-border">
                    <p className="text-muted-foreground">
                      No active certifications yet. Start a course to earn your first certification!
                    </p>
                  </Card>
                )}
              </TabsContent>

              {/* Pending Certifications */}
              <TabsContent value="pending" className="space-y-4">
                {pendingCerts.length > 0 ? (
                  pendingCerts.map((cert) => (
                    <Card
                      key={cert.id}
                      className="p-4 sm:p-6 border border-border hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="text-3xl sm:text-4xl flex-shrink-0">
                            {cert.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-bold text-foreground">
                              {cert.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {cert.issuer}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              ID: {cert.credentialId}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(cert.status)}
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-xs sm:text-sm font-semibold text-foreground">
                            Progress
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {cert.progress}%
                          </p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary rounded-full h-2 transition-all"
                            style={{ width: `${cert.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-4">
                        <p className="text-xs sm:text-sm font-semibold text-foreground mb-2">
                          Skills Covered:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill) => (
                            <Badge
                              key={skill}
                              className="bg-primary/10 text-primary text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                    </Card>
                  ))
                ) : (
                  <Card className="p-8 text-center border border-border">
                    <p className="text-muted-foreground">
                      No certifications in progress. Start a new course to begin!
                    </p>
                  </Card>
                )}
              </TabsContent>

              {/* Expired Certifications */}
              <TabsContent value="expired" className="space-y-4">
                {expiredCerts.length > 0 ? (
                  expiredCerts.map((cert) => (
                    <Card
                      key={cert.id}
                      className="p-4 sm:p-6 border border-border hover:shadow-lg transition-shadow opacity-75"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className="text-3xl sm:text-4xl flex-shrink-0 opacity-50">
                            {cert.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-bold text-foreground">
                              {cert.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {cert.issuer}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              ID: {cert.credentialId}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(cert.status)}
                      </div>

                      {/* Expired Date */}
                      <div className="bg-red-50 dark:bg-red-950 rounded-lg p-3 sm:p-4 mb-4">
                        <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">
                          This certification expired. You can renew it by retaking the course.
                        </p>
                      </div>

                      {/* Actions */}
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Award className="w-4 h-4 mr-2" />
                        Renew Certification
                      </Button>
                    </Card>
                  ))
                ) : (
                  <Card className="p-8 text-center border border-border">
                    <p className="text-muted-foreground">
                      No expired certifications.
                    </p>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
