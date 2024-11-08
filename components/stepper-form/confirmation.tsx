'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { CheckCircle2 } from 'lucide-react';

export function Confirmation({ formData, onBack }: any) {
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Registration Successful!',
          description: 'Thank you for registering for the blood donation camp.',
        });
      } else {
        toast({
          title: 'Registration Failed',
          description:
            'There was an issue with your registration. Please try again.',
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration Failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h2 className="text-2xl font-semibold">Review Your Information</h2>
        <p className="text-muted-foreground">
          Please review your information before submitting
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your basic details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <span className="font-medium">Name:</span>{' '}
            {formData.personalInfo.name}
          </p>
          <p>
            <span className="font-medium">Email:</span>{' '}
            {formData.personalInfo.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span>{' '}
            {formData.personalInfo.phone}
          </p>
          <p>
            <span className="font-medium">Date of Birth:</span>{' '}
            {formData.personalInfo.dob &&
              format(new Date(formData.personalInfo.dob), 'PPP')}
          </p>
          <p>
            <span className="font-medium">Blood Group:</span>{' '}
            {formData.personalInfo.bloodGroup}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
          <CardDescription>Your health information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <span className="font-medium">Recent Illness:</span>{' '}
            {formData.medicalHistory.hasRecentIllness ? 'Yes' : 'No'}
          </p>
          <p>
            <span className="font-medium">Chronic Diseases:</span>{' '}
            {formData.medicalHistory.hasChronisDiseases ? 'Yes' : 'No'}
          </p>
          <p>
            <span className="font-medium">Taking Medication:</span>{' '}
            {formData.medicalHistory.isTakingMedication ? 'Yes' : 'No'}
          </p>
          {formData.medicalHistory.lastDonationDate && (
            <p>
              <span className="font-medium">Last Donation:</span>{' '}
              {formData.medicalHistory.lastDonationDate}
            </p>
          )}
          {formData.medicalHistory.additionalNotes && (
            <p>
              <span className="font-medium">Additional Notes:</span>{' '}
              {formData.medicalHistory.additionalNotes}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Previous Step
        </Button>
        <Button onClick={handleSubmit}>Submit Registration</Button>
      </div>
    </div>
  );
}
