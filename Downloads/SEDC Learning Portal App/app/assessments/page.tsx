'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import {
  CheckCircle2,
  XCircle,
  Code2,
  HelpCircle,
  Play,
  Copy,
  Check,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AssessmentQuestion {
  id: string;
  title: string;
  type: 'multiple-choice' | 'code' | 'diagram' | 'short-answer';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topic: string;
  question: string;
  description?: string;
  options?: string[];
  correctAnswer?: string | number;
  codeTemplate?: string;
  diagram?: {
    title: string;
    description: string;
  };
  points: number;
}

const renewableEnergyAssessment: AssessmentQuestion[] = [
  {
    id: '1',
    title: 'Solar Circuit Basics',
    type: 'multiple-choice',
    difficulty: 'Beginner',
    topic: 'Solar Energy',
    question:
      'What is the main component that converts sunlight into electricity in a solar panel?',
    options: [
      'Inverter',
      'Photovoltaic (PV) Cell',
      'Charge Controller',
      'Battery Pack',
    ],
    correctAnswer: 1,
    points: 5,
  },
  {
    id: '2',
    title: 'MPPT vs PWM Controllers',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    topic: 'Solar Energy',
    question:
      'Which charge controller type is more efficient for off-grid solar systems?',
    options: [
      'PWM (Pulse Width Modulation)',
      'MPPT (Maximum Power Point Tracking)',
      'Both are equally efficient',
      'It depends on the time of day',
    ],
    correctAnswer: 1,
    points: 8,
  },
  {
    id: '3',
    title: 'Wind Turbine Circuit Design',
    type: 'code',
    difficulty: 'Advanced',
    topic: 'Wind Energy',
    question: 'Design a simple voltage regulation circuit for a wind turbine output',
    description:
      'Write pseudocode or describe the logic for a basic voltage regulation system that maintains 48V output from a variable wind turbine source (20V-80V)',
    codeTemplate: `// Wind Turbine Voltage Regulator Circuit
// Input: Turbine voltage (20V-80V)
// Target Output: 48V DC

function regulateVoltage(turbineVoltage) {
  // TODO: Implement voltage regulation logic
  // Consider using buck-boost converter principles
  // Ensure output stays at 48V ± 2V
  
  if (turbineVoltage < 20) {
    // Handle under-voltage condition
  }
  
  if (turbineVoltage > 80) {
    // Handle over-voltage condition
  }
  
  return regulatedVoltage;
}`,
    points: 15,
  },
  {
    id: '4',
    title: 'Renewable Energy Grid Integration',
    type: 'diagram',
    difficulty: 'Advanced',
    topic: 'System Integration',
    question: 'Identify components in a grid-tied solar system with battery backup',
    diagram: {
      title: 'Grid-Tied Solar System with Battery Backup',
      description:
        'Label the following in the system: Solar Panels, Inverter, Grid Connection, Battery, Charge Controller, AC Load, DC Load, and Safety Disconnects',
    },
    points: 12,
  },
  {
    id: '5',
    title: 'Energy Calculation',
    type: 'short-answer',
    difficulty: 'Intermediate',
    topic: 'Energy Calculations',
    question:
      'If a 5kW solar panel system generates 20kWh per day, calculate the peak sun hours. Show your calculation.',
    points: 10,
  },
  {
    id: '6',
    title: 'Renewable Energy Efficiency',
    type: 'multiple-choice',
    difficulty: 'Beginner',
    topic: 'Renewables Overview',
    question:
      'What is the average efficiency rate of modern solar panels?',
    options: ['5-10%', '15-22%', '40-50%', '70-90%'],
    correctAnswer: 1,
    points: 5,
  },
];

export default function AssessmentPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [showResults, setShowResults] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedDiagramLabels, setSelectedDiagramLabels] = useState<
    Record<string, boolean>
  >({});

  const currentQuestion = renewableEnergyAssessment[currentQuestionIndex];
  const totalQuestions = renewableEnergyAssessment.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleMultipleChoice = (optionIndex: number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionIndex,
    });
  };

  const handleCodeSubmit = () => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: codeInput,
    });
    moveToNext();
  };

  const handleShortAnswer = (text: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: text,
    });
  };

  const handleDiagramLabel = (label: string) => {
    setSelectedDiagramLabels({
      ...selectedDiagramLabels,
      [label]: !selectedDiagramLabels[label],
    });
  };

  const moveToNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCodeInput('');
    }
  };

  const moveToBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitAssessment = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    let maxScore = 0;

    renewableEnergyAssessment.forEach((question) => {
      maxScore += question.points;
      if (question.type === 'multiple-choice') {
        if (answers[question.id] === question.correctAnswer) {
          score += question.points;
        }
      } else {
        // For non-multiple choice, award partial credit if attempted
        if (answers[question.id]) {
          score += question.points * 0.75;
        }
      }
    });

    return { score: Math.round(score), maxScore };
  };

  const { score, maxScore } = calculateScore();
  const percentage = Math.round((score / maxScore) * 100);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentQuestion.codeTemplate || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const diagramLabels = [
    'Solar Panels',
    'Inverter',
    'Grid Connection',
    'Battery',
    'Charge Controller',
    'AC Load',
    'DC Load',
    'Safety Disconnect',
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col md:ml-64 overflow-auto">
        <Header
          userName="Engineer Chidi"
          userRole="Skill Assessment"
        />

        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
            {!showResults ? (
              <>
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Renewable Energy Circuit Assessment
                      </h1>
                      <p className="text-muted-foreground">
                        Test your knowledge of renewable energy systems and circuits
                      </p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground whitespace-nowrap">
                      {currentQuestionIndex + 1} / {totalQuestions}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question Card */}
                <Card className="border border-border mb-8 overflow-hidden">
                  <div className="p-6 md:p-8">
                    {/* Question Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge
                          className={
                            currentQuestion.difficulty === 'Beginner'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : currentQuestion.difficulty === 'Intermediate'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }
                        >
                          {currentQuestion.difficulty}
                        </Badge>
                        <Badge variant="outline">{currentQuestion.topic}</Badge>
                        <Badge variant="outline" className="ml-auto">
                          {currentQuestion.points} pts
                        </Badge>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        {currentQuestion.title}
                      </h2>
                    </div>

                    {/* Question Content */}
                    <div className="mb-8">
                      <p className="text-base md:text-lg text-foreground mb-4">
                        {currentQuestion.question}
                      </p>
                      {currentQuestion.description && (
                        <p className="text-sm text-muted-foreground bg-muted p-4 rounded-lg">
                          {currentQuestion.description}
                        </p>
                      )}
                    </div>

                    {/* Question Type Specific Content */}
                    {currentQuestion.type === 'multiple-choice' && (
                      <div className="space-y-3">
                        {currentQuestion.options?.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleMultipleChoice(index)}
                            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                              answers[currentQuestion.id] === index
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  answers[currentQuestion.id] === index
                                    ? 'bg-primary border-primary'
                                    : 'border-border'
                                }`}
                              >
                                {answers[currentQuestion.id] === index && (
                                  <Check className="w-3 h-3 text-primary-foreground" />
                                )}
                              </div>
                              <span className="font-medium text-foreground">
                                {option}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {currentQuestion.type === 'code' && (
                      <div className="space-y-4">
                        <div className="bg-muted rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Code2 className="w-4 h-4 text-primary" />
                              <span className="text-sm font-semibold text-foreground">
                                Code Editor
                              </span>
                            </div>
                            <button
                              onClick={copyToClipboard}
                              className="p-2 hover:bg-background rounded transition-colors"
                            >
                              {copied ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                          <textarea
                            value={
                              codeInput ||
                              currentQuestion.codeTemplate ||
                              ''
                            }
                            onChange={(e) =>
                              setCodeInput(e.target.value)
                            }
                            className="w-full h-64 md:h-72 p-4 rounded-lg bg-background text-foreground font-mono text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            placeholder="Write your code here..."
                          />
                        </div>
                        <Button
                          onClick={handleCodeSubmit}
                          className="w-full bg-primary text-primary-foreground hover:opacity-90 flex items-center justify-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Submit Code
                        </Button>
                      </div>
                    )}

                    {currentQuestion.type === 'diagram' && (
                      <div className="space-y-6">
                        <div className="p-6 bg-muted rounded-lg">
                          <h3 className="font-semibold text-foreground mb-2">
                            {currentQuestion.diagram?.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-6">
                            {currentQuestion.diagram?.description}
                          </p>

                          {/* Diagram Placeholder */}
                          <div className="w-full h-64 md:h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-6 border-2 border-dashed border-border">
                            <div className="text-center">
                              <HelpCircle className="w-12 h-12 mx-auto text-muted-foreground mb-2 opacity-50" />
                              <p className="text-sm text-muted-foreground">
                                Diagram visualization area
                              </p>
                            </div>
                          </div>

                          {/* Labels to Match */}
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-foreground mb-3">
                              Select all components:
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {diagramLabels.map((label) => (
                                <button
                                  key={label}
                                  onClick={() =>
                                    handleDiagramLabel(label)
                                  }
                                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                    selectedDiagramLabels[label]
                                      ? 'bg-primary text-primary-foreground border-primary'
                                      : 'bg-background border-border hover:border-primary'
                                  }`}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentQuestion.type === 'short-answer' && (
                      <div className="space-y-4">
                        <textarea
                          value={
                            (answers[currentQuestion.id] as string) ||
                            ''
                          }
                          onChange={(e) =>
                            handleShortAnswer(e.target.value)
                          }
                          className="w-full h-40 md:h-48 p-4 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                          placeholder="Type your answer here..."
                        />
                        <p className="text-xs text-muted-foreground">
                          Provide a detailed explanation with calculations
                        </p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between">
                  <Button
                    variant="outline"
                    onClick={moveToBack}
                    disabled={currentQuestionIndex === 0}
                    className="w-full sm:w-auto"
                  >
                    Back
                  </Button>

                  <div className="flex flex-col sm:flex-row gap-3 flex-1 sm:flex-none">
                    {currentQuestionIndex < totalQuestions - 1 ? (
                      <Button
                        onClick={moveToNext}
                        className="flex-1 bg-primary text-primary-foreground hover:opacity-90"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        onClick={submitAssessment}
                        className="flex-1 bg-secondary text-secondary-foreground hover:opacity-90"
                      >
                        Submit Assessment
                      </Button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Results Screen */}
                <div className="text-center mb-12">
                  <div className="mb-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-primary">
                          {percentage}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {score}/{maxScore}
                        </p>
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      Assessment Complete!
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {percentage >= 80
                        ? 'Excellent work! You have a strong understanding of renewable energy circuits.'
                        : percentage >= 60
                        ? 'Good effort! Review the concepts and try again to improve your score.'
                        : 'Keep practicing! Review the materials and retake the assessment.'}
                    </p>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card className="p-6 border border-border">
                      <p className="text-sm text-muted-foreground mb-2">
                        Total Score
                      </p>
                      <h3 className="text-3xl font-bold text-foreground">
                        {score}/{maxScore}
                      </h3>
                    </Card>

                    <Card className="p-6 border border-border">
                      <p className="text-sm text-muted-foreground mb-2">
                        Performance
                      </p>
                      <h3 className="text-3xl font-bold text-foreground">
                        {percentage >= 80
                          ? '⭐ Advanced'
                          : percentage >= 60
                          ? '⭐ Intermediate'
                          : '⭐ Beginner'}
                      </h3>
                    </Card>
                  </div>

                  {/* Question Review */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-foreground mb-4 text-left">
                      Question Review
                    </h3>
                    <div className="space-y-2">
                      {renewableEnergyAssessment.map((question, index) => (
                        <div
                          key={question.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted border border-border text-left"
                        >
                          <div>
                            <p className="font-semibold text-foreground">
                              Q{index + 1}: {question.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {question.points} points
                            </p>
                          </div>
                          {question.type === 'multiple-choice' &&
                          answers[question.id] ===
                            question.correctAnswer ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <XCircle className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => {
                        setShowResults(false);
                        setCurrentQuestionIndex(0);
                        setAnswers({});
                        setCodeInput('');
                        setSelectedDiagramLabels({});
                      }}
                      className="w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90"
                    >
                      Retake Assessment
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      Download Certificate
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
