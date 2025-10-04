'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { SectionHeader } from '../ui/section-header';
import { FieldGroup, FieldItem } from '../ui/field-group';
import { Textarea } from '../ui/textarea';
import {
  User,
  Building,
  Users,
  HelpCircle,
  Eye,
  AlertTriangle,
  Briefcase,
  Shield,
  Info,
} from 'lucide-react';
import { step1Schema } from '@/lib/validationSchemas';
import { z } from 'zod';
import { EmptyStatePlaceholder } from '../ui/empty-state-placeholder';

interface Step1Props {
  reporterType: string;
  setReporterType: (type: string) => void;
  isAnonymous: boolean;
  setIsAnonymous: (value: boolean) => void;
  showForm: boolean;
  setShowForm: (value: boolean) => void;
  onBack?: () => void;
  onContinue: () => void;
}

export default function Step1ReporterDetails({
  reporterType,
  setReporterType,
  isAnonymous,
  setIsAnonymous,
  showForm,
  setShowForm,
  onBack,
  onContinue,
}: Step1Props) {
  const [formData, setFormData] = useState({
    fullName: '',
    country: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    relationship: '',
    victimAge: '',
    reporterRole: '',
    additionalInfo: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const reporterTypes = [
    { value: 'individual', label: 'Individual', icon: User },
    { value: 'business', label: 'Business', icon: Building },
    { value: 'parent-guardian', label: 'Parent-Guardian', icon: Users },
    { value: 'other', label: 'Other', icon: HelpCircle },
  ];

  const handleReporterTypeChange = (type: string) => {
    setReporterType(type);
    setShowForm(true);
    // Clear errors when changing reporter type
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleContinue = () => {
    try {
      step1Schema.parse({
        reporterType,
        isAnonymous,
        ...formData,
      });
      // Validation passed
      setErrors({});
      onContinue();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: Record<string, string> = {};
        error.issues.forEach((err: z.core.$ZodIssue) => {
          if (err.path[0]) {
            errorMap[err.path[0] as string] = err.message;
          }
        });
        setErrors(errorMap);
      }
    }
  };

  return (
    <Card className="h-[600px] flex flex-col gap-0">
      <CardContent className="flex-1 overflow-hidden px-0 pt-0 flex flex-col">
        {/* Sticky Header */}
        <div className="flex-shrink-0 bg-card px-6 pt-6 pb-4 border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-blue-500" />
            Reporter Details
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Tell us about yourself so we can follow up on your report
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-2 flex-1 relative gap-0 overflow-hidden">
          {/* Divider line between columns */}
          <div className="absolute left-1/2 top-6 bottom-6 w-px bg-border transform -translate-x-1/2 z-10"></div>
          
          {/* First column - Reporter Details */}
          <div className="space-y-4 pt-6 px-6 min-w-0 flex-shrink-0">

            {/* Reporter Type Selection */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Choose reporter type</Label>
              <div className="grid grid-cols-2 gap-3">
                {reporterTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Button
                      key={type.value}
                      variant={reporterType === type.value ? 'default' : 'outline'}
                      className="h-auto p-4 flex flex-col items-center gap-2"
                      onClick={() => handleReporterTypeChange(type.value)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm">{type.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Anonymity Option */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-slate-300"
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Anonymity: "I prefer to stay anonymous"
                </Label>
              </div>
              {isAnonymous && (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg w-full overflow-hidden">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-yellow-800 dark:text-yellow-200 break-words leading-relaxed min-w-0">
                    Warning: Choosing anonymity limits our ability to follow up on
                    your report and provide updates.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Second column - Dynamic content based on reporter type */}
          <div className="pl-6 flex flex-col h-full overflow-hidden">
            {isAnonymous ? (
              <EmptyStatePlaceholder icon={Eye} message="Anonymous reporting selected" />
            ) : !showForm ? (
              <EmptyStatePlaceholder icon={User} message="Select a reporter type to continue" />
            ) : (
              <ScrollArea variant="thin" className="h-full">
                <div className="pr-4">
                <div className="space-y-4">
                  {!isAnonymous && (
                    <div className="py-6">
                      <SectionHeader icon={User} title="Reporter Information" />
                      <FieldGroup>
                        <FieldItem>
                          <Label htmlFor="fullName">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className={errors.fullName ? 'border-red-500' : ''}
                          />
                          {errors.fullName && (
                            <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                          )}
                        </FieldItem>
                        <FieldItem>
                          <Label htmlFor="country">
                            Country <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="country"
                            placeholder="Enter your country"
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className={errors.country ? 'border-red-500' : ''}
                          />
                          {errors.country && (
                            <p className="text-xs text-red-500 mt-1">{errors.country}</p>
                          )}
                        </FieldItem>
                        <FieldItem>
                          <Label htmlFor="email">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={errors.email ? 'border-red-500' : ''}
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                          )}
                        </FieldItem>
                        <FieldItem>
                          <Label htmlFor="phone">
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+974 123456789"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={errors.phone ? 'border-red-500' : ''}
                          />
                          {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                          )}
                        </FieldItem>
                      </FieldGroup>

                      {/* Business-specific fields */}
                      {reporterType === 'business' && (
                        <div>
                          <hr className="my-6" />
                          <SectionHeader icon={Briefcase} title="Business Information" />
                          <FieldGroup>
                            <FieldItem>
                              <Label htmlFor="organization">Organization</Label>
                              <Input
                                id="organization"
                                placeholder="Company name"
                                value={formData.organization}
                                onChange={(e) => handleInputChange('organization', e.target.value)}
                              />
                            </FieldItem>
                            <FieldItem>
                              <Label htmlFor="role">Role/Title</Label>
                              <Input
                                id="role"
                                placeholder="Your position/title"
                                value={formData.role}
                                onChange={(e) => handleInputChange('role', e.target.value)}
                              />
                            </FieldItem>
                          </FieldGroup>
                        </div>
                      )}

                      {/* Parent-Guardian specific fields */}
                      {reporterType === 'parent-guardian' && (
                        <div>
                          <hr className="my-6" />
                          <SectionHeader icon={Shield} title="Guardian Information" />
                          <FieldGroup>
                            <FieldItem>
                              <Label htmlFor="relationship">Relationship to Victim</Label>
                              <Input
                                id="relationship"
                                placeholder="e.g., Parent, Guardian, Legal Representative"
                                value={formData.relationship}
                                onChange={(e) => handleInputChange('relationship', e.target.value)}
                              />
                            </FieldItem>
                            <FieldItem>
                              <Label htmlFor="victimAge">
                                Victim's Age (if applicable)
                              </Label>
                              <Input
                                id="victimAge"
                                type="number"
                                placeholder="Age"
                                value={formData.victimAge}
                                onChange={(e) => handleInputChange('victimAge', e.target.value)}
                              />
                            </FieldItem>
                          </FieldGroup>
                        </div>
                      )}

                      {/* Other reporter type specific fields */}
                      {reporterType === 'other' && (
                        <div>
                          <hr className="my-6" />
                          <SectionHeader icon={Info} title="Additional Information" />
                          <FieldGroup>
                            <FieldItem>
                              <Label htmlFor="reporterRole">Your Role/Relationship</Label>
                              <Input
                                id="reporterRole"
                                placeholder="Describe your role or relationship to the incident"
                                value={formData.reporterRole}
                                onChange={(e) => handleInputChange('reporterRole', e.target.value)}
                              />
                            </FieldItem>
                            <FieldItem>
                              <Label htmlFor="additionalInfo">Additional Context</Label>
                              <Textarea
                                id="additionalInfo"
                                className="h-20"
                                placeholder="Any additional information that might be relevant"
                                value={formData.additionalInfo}
                                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                              />
                            </FieldItem>
                          </FieldGroup>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </CardContent>

      {/* Action Buttons */}
      <div className="flex-shrink-0 px-4 bg-slate-50/50 dark:bg-slate-900/50">
        <hr className="mb-6" />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (onBack) {
                onBack();
              } else {
                setShowForm(false);
                setReporterType('');
                setIsAnonymous(false);
              }
            }}
          >
            Back to Menu
          </Button>
          <Button type="button" onClick={handleContinue} disabled={!reporterType}>
            Continue to Step 2
          </Button>
        </div>
      </div>
    </Card>
  );
}

