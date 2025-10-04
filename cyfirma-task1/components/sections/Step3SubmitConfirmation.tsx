'use client';

import React from 'react';
import { Card, CardContent, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import {
  CheckCircle2,
  Copy,
  Download,
  AlertCircle,
  FileText,
  User,
  Clock,
  MapPin,
  Shield,
  Home,
  RefreshCcw,
} from 'lucide-react';

interface Step3Props {
  reporterType: string;
  isAnonymous: boolean;
  incidentType: string;
  isOngoing: string;
  whatHappened: string;
  incidentDateTime: string;
  platform: string;
  files: File[];
  onSubmitAnother: () => void;
  onReturnHome: () => void;
}

export default function Step3SubmitConfirmation({
  reporterType,
  isAnonymous,
  incidentType,
  isOngoing,
  whatHappened,
  incidentDateTime,
  platform,
  files,
  onSubmitAnother,
  onReturnHome,
}: Step3Props) {
  // Generate case ID
  const caseId = `INC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(caseId);
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation
    console.log('Downloading PDF report...');
  };

  const formatIncidentType = (type: string) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card className="h-[600px] flex flex-col gap-0">
      <CardContent className="flex-1 overflow-hidden px-0 pt-0 flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-card px-6 pt-6 pb-4 border-b">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-full">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Report Submitted Successfully</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Your cybercrime incident has been recorded
              </p>
            </div>
          </div>
        </div>

        <ScrollArea variant="thin" className="flex-1">
          <div className="space-y-6 px-6 pt-6 pb-6 pr-4">
            {/* Case ID Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Case Reference Number</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyToClipboard}
                  className="h-8 gap-2"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </Button>
              </div>
              <div className="p-4 border-2 rounded-lg bg-slate-50 dark:bg-slate-900/40 flex items-center gap-3">
                <span className="font-mono text-base font-semibold flex-1">
                  {caseId}
                </span>
                <Badge variant="secondary" className="text-xs">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Save this reference number to track your report or share with authorities
              </p>
            </div>

            {/* Report Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-semibold">Report Summary</h4>
              </div>
              
              <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
                {/* Reporter Type */}
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Reporter Type</p>
                    <p className="text-sm font-medium">
                      {isAnonymous ? 'Anonymous' : formatIncidentType(reporterType)}
                    </p>
                  </div>
                </div>

                <hr />

                {/* Incident Type */}
                <div className="flex items-start gap-3">
                  <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Incident Type</p>
                    <p className="text-sm font-medium">{formatIncidentType(incidentType)}</p>
                    <Badge 
                      variant={isOngoing === 'yes' ? 'destructive' : 'secondary'} 
                      className="mt-1 text-xs"
                    >
                      {isOngoing === 'yes' ? 'Ongoing' : 'Resolved'}
                    </Badge>
                  </div>
                </div>

                <hr />

                {/* Date & Time */}
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Incident Date & Time</p>
                    <p className="text-sm font-medium">
                      {incidentDateTime
                        ? new Date(incidentDateTime).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })
                        : 'Not specified'}
                    </p>
                  </div>
                </div>

                <hr />

                {/* Platform */}
                {platform && (
                  <>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Platform</p>
                        <p className="text-sm font-medium">{platform}</p>
                      </div>
                    </div>
                    <hr />
                  </>
                )}

                {/* Description Preview */}
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Description</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 overflow-hidden text-ellipsis">
                      {whatHappened}
                    </p>
                  </div>
                </div>

                {/* Evidence */}
                {files.length > 0 && (
                  <>
                    <hr />
                    <div className="flex items-start gap-3">
                      <Download className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Evidence Attached</p>
                        <p className="text-sm font-medium">{files.length} file(s)</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* What Happens Next */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">What happens next?</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">1.</span>
                  <span>Your report will be reviewed by our cybercrime team within 24-48 hours</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">2.</span>
                  <span>
                    {isAnonymous
                      ? 'Updates will be posted to your case reference number (check anonymously)'
                      : 'We may contact you for additional information or updates'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">3.</span>
                  <span>Share your Case ID with law enforcement or financial institutions if needed</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">4.</span>
                  <span>Download your report summary for your records</span>
                </div>
              </div>
            </div>

            {/* Download Report Option */}
            <div className="p-4 border-2 border-dashed rounded-lg hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Download Report Summary</p>
                    <p className="text-xs text-muted-foreground">
                      PDF document with all details
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>

      {/* Action Buttons */}
      <div className="flex-shrink-0 px-4 bg-slate-50/50 dark:bg-slate-900/50">
        <hr className="mb-6" />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onSubmitAnother}
            className="gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Submit Another Report
          </Button>
          <Button type="button" onClick={onReturnHome} className="gap-2">
            <Home className="h-4 w-4" />
            Return Home
          </Button>
        </div>
      </div>
    </Card>
  );
}

