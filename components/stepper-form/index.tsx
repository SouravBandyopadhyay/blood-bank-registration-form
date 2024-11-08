'use client';

import { useState } from 'react';
import { PersonalInfo } from './personal-info';
import { MedicalHistory } from './medical-history';
import { Confirmation } from './confirmation';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function StepperForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    medicalHistory: {},
  });

  const updateFormData = (stepData: any, step: string) => {
    setFormData((prev) => ({
      ...prev,
      [step]: stepData,
    }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-8">
      <div className="space-y-2">
        <Progress value={(step / 3) * 100} className="w-full" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Personal Information</span>
          <span>Medical History</span>
          <span>Confirmation</span>
        </div>
      </div>

      <Card className="p-6">
        {step === 1 && (
          <PersonalInfo
            data={formData.personalInfo}
            onNext={nextStep}
            updateData={(data) => updateFormData(data, 'personalInfo')}
          />
        )}
        {step === 2 && (
          <MedicalHistory
            data={formData.medicalHistory}
            onNext={nextStep}
            onBack={prevStep}
            updateData={(data) => updateFormData(data, 'medicalHistory')}
          />
        )}
        {step === 3 && <Confirmation formData={formData} onBack={prevStep} />}
      </Card>
    </div>
  );
}
