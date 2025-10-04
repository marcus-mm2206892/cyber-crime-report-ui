'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { FieldItem } from '../ui/field-group';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  INCIDENT_TYPES,
  SAFETY_TIPS_BY_INCIDENT_TYPE,
} from '@/constants/formConstants';
import {
  FileText,
  Clock,
  MapPin,
  Upload,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { step2Schema } from '@/lib/validationSchemas';
import { z } from 'zod';

interface Step2Props {
  incidentType: string;
  setIncidentType: (value: string) => void;
  isOngoing: string;
  setIsOngoing: (value: string) => void;
  whatHappened: string;
  setWhatHappened: (value: string) => void;
  incidentTime: string;
  setIncidentTime: (value: string) => void;
  platform: string;
  setPlatform: (value: string) => void;
  platformUrl: string;
  setPlatformUrl: (value: string) => void;
  consent: boolean;
  setConsent: (value: boolean) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function Step2IncidentDetails({
  incidentType,
  setIncidentType,
  isOngoing,
  setIsOngoing,
  whatHappened,
  setWhatHappened,
  incidentTime,
  setIncidentTime,
  platform,
  setPlatform,
  platformUrl,
  setPlatformUrl,
  consent,
  setConsent,
  files,
  setFiles,
  onBack,
  onSubmit,
}: Step2Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    try {
      step2Schema.parse({
        incidentType,
        isOngoing,
        whatHappened,
        incidentTime,
        platform,
        platformUrl,
        consent,
        files,
      });
      // Validation passed
      setErrors({});
      onSubmit();
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
        {/* Header */}
        <div className="flex-shrink-0 bg-card px-6 pt-6 pb-4 border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-blue-500" />
            Incident Details
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Please provide detailed information about the incident
          </p>
        </div>

        <ScrollArea variant="thin" className="flex-1">
          <div className="space-y-6 px-6 pt-6 pb-6 pr-4">

            {/* Incident Type */}
            <FieldItem>
              <Label htmlFor="incident-type">
                Incident Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={incidentType}
                onValueChange={(value) => {
                  setIncidentType(value);
                  clearError('incidentType');
                }}
              >
                <SelectTrigger
                  id="incident-type"
                  className={errors.incidentType ? 'border-red-500' : ''}
                >
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  {INCIDENT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.incidentType && (
                <p className="text-xs text-red-500 mt-1">{errors.incidentType}</p>
              )}
            </FieldItem>

            {/* Is it ongoing? */}
            <FieldItem>
              <Label>
                Is it ongoing right now? <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={isOngoing}
                onValueChange={(value) => {
                  setIsOngoing(value);
                  clearError('isOngoing');
                }}
              >
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="ongoing-yes" />
                    <Label htmlFor="ongoing-yes" className="font-normal cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="ongoing-no" />
                    <Label htmlFor="ongoing-no" className="font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                </div>
              </RadioGroup>
              {errors.isOngoing && (
                <p className="text-xs text-red-500 mt-1">{errors.isOngoing}</p>
              )}

              {/* Safety Banner for ongoing incidents */}
              {isOngoing === 'yes' && incidentType && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 dark:border-red-600 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-red-900 dark:text-red-200 mb-2">
                        Immediate Safety Tips
                      </h4>
                      <ul className="space-y-1.5 text-xs text-red-800 dark:text-red-300">
                        {SAFETY_TIPS_BY_INCIDENT_TYPE[incidentType]?.map(
                          (tip, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-600 dark:text-red-400 mt-0.5">
                                •
                              </span>
                              <span>{tip}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </FieldItem>

            {/* What happened? */}
            <FieldItem>
              <Label htmlFor="what-happened">
                What happened? <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="what-happened"
                placeholder="Describe the incident in detail (50-600 characters)"
                className={`min-h-[120px] ${errors.whatHappened ? 'border-red-500' : ''}`}
                value={whatHappened}
                onChange={(e) => {
                  setWhatHappened(e.target.value);
                  clearError('whatHappened');
                }}
                maxLength={600}
              />
              <div className="flex justify-between items-center mt-1">
                <div>
                  {errors.whatHappened && (
                    <p className="text-xs text-red-500">{errors.whatHappened}</p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {whatHappened.length}/600 characters
                </p>
              </div>
            </FieldItem>

            {/* When did it start? */}
            <FieldItem>
              <Label htmlFor="incident-datetime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                When did it start? <span className="text-red-500">*</span>
              </Label>
              <Input
                id="incident-datetime"
                type="datetime-local"
                value={incidentTime}
                onChange={(e) => {
                  setIncidentTime(e.target.value);
                  clearError('incidentTime');
                }}
                className={errors.incidentTime ? 'border-red-500' : ''}
              />
              {errors.incidentTime ? (
                <p className="text-xs text-red-500 mt-1">{errors.incidentTime}</p>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  Select date and time when the incident occurred
                </p>
              )}
            </FieldItem>

            {/* Where did it happen? */}
            <FieldItem>
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Where did it happen?
              </Label>
              <div className="space-y-3">
                <Input
                  id="platform"
                  placeholder="Platform/Site/App name"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                />
                <Input
                  id="platform-url"
                  type="url"
                  placeholder="URL (if applicable)"
                  value={platformUrl}
                  onChange={(e) => setPlatformUrl(e.target.value)}
                />
              </div>
            </FieldItem>

            {/* Consent */}
            <FieldItem>
              <div
                className={`flex items-start space-x-3 p-4 border rounded-lg bg-muted/30 ${errors.consent ? 'border-red-500' : ''}`}
              >
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    clearError('consent');
                  }}
                  className="mt-0.5 rounded border-slate-300"
                />
                <Label htmlFor="consent" className="text-sm font-normal cursor-pointer">
                  <span className="text-red-500">*</span> I consent to you storing and
                  processing this information for investigation purposes
                </Label>
              </div>
              {errors.consent && (
                <p className="text-xs text-red-500 mt-1">{errors.consent}</p>
              )}
            </FieldItem>

            {/* Evidence Upload */}
            <FieldItem>
              <Label className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Evidence (Optional)
              </Label>
              <p className="text-xs text-muted-foreground mb-2">
                Upload screenshots, PDFs, emails (.eml), or logs
              </p>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept=".png,.jpg,.jpeg,.pdf,.eml,.log,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, PDF, EML, LOG files
                    </p>
                  </div>
                </label>
              </div>
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 border rounded text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="flex-1 truncate">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </FieldItem>
          </div>
        </ScrollArea>
      </CardContent>

      {/* Action Buttons */}
      <div className="flex-shrink-0 px-4 bg-slate-50/50 dark:bg-slate-900/50">
        <hr className="mb-6" />
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onBack}>
            Back to Step 1
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Submit Report
          </Button>
        </div>
      </div>
    </Card>
  );
}

