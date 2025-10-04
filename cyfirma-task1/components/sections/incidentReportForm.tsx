'use client';

import React, { useState } from 'react';
import Step1ReporterDetails from './Step1ReporterDetails';
import Step2IncidentDetails from './Step2IncidentDetails';
import Step3SubmitConfirmation from './Step3SubmitConfirmation';

interface IncidentReportFormProps {
  onBack?: () => void;
}

export default function IncidentReportForm({ onBack }: IncidentReportFormProps) {
  // Step management
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1 state
  const [reporterType, setReporterType] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Step 2 state
  const [incidentType, setIncidentType] = useState<string>('');
  const [isOngoing, setIsOngoing] = useState<string>('');
  const [whatHappened, setWhatHappened] = useState<string>('');
  const [incidentTime, setIncidentTime] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [platformUrl, setPlatformUrl] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = () => {
    console.log('Form submitted', {
      reporterType,
      isAnonymous,
      incidentType,
      isOngoing,
      whatHappened,
      incidentTime,
      platform,
      platformUrl,
      consent,
      files,
    });
    setCurrentStep(3);
  };

  const handleSubmitAnother = () => {
    // Reset all form state
    setReporterType('');
    setIsAnonymous(false);
    setShowForm(false);
    setIncidentType('');
    setIsOngoing('');
    setWhatHappened('');
    setIncidentTime('');
    setPlatform('');
    setPlatformUrl('');
    setConsent(false);
    setFiles([]);
    setCurrentStep(1);
  };

  const handleReturnHome = () => {
    if (onBack) {
      onBack();
    } else {
      // Reset and go to step 1
      handleSubmitAnother();
    }
  };

  return (
    <div className="w-4xl mx-auto">
      {currentStep === 1 && (
        <Step1ReporterDetails
          reporterType={reporterType}
          setReporterType={setReporterType}
          isAnonymous={isAnonymous}
          setIsAnonymous={setIsAnonymous}
          showForm={showForm}
          setShowForm={setShowForm}
          onBack={onBack}
          onContinue={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 2 && (
        <Step2IncidentDetails
          incidentType={incidentType}
          setIncidentType={setIncidentType}
          isOngoing={isOngoing}
          setIsOngoing={setIsOngoing}
          whatHappened={whatHappened}
          setWhatHappened={setWhatHappened}
          incidentTime={incidentTime}
          setIncidentTime={setIncidentTime}
          platform={platform}
          setPlatform={setPlatform}
          platformUrl={platformUrl}
          setPlatformUrl={setPlatformUrl}
          consent={consent}
          setConsent={setConsent}
          files={files}
          setFiles={setFiles}
          onBack={() => setCurrentStep(1)}
          onSubmit={handleSubmit}
        />
      )}

      {currentStep === 3 && (
        <Step3SubmitConfirmation
          reporterType={reporterType}
          isAnonymous={isAnonymous}
          incidentType={incidentType}
          isOngoing={isOngoing}
          whatHappened={whatHappened}
          incidentDateTime={incidentTime}
          platform={platform}
          files={files}
          onSubmitAnother={handleSubmitAnother}
          onReturnHome={handleReturnHome}
        />
      )}
    </div>
  );
}