'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const schema = z.object({
  hasRecentIllness: z.boolean(),
  hasChronicDiseases: z.boolean(),
  isTakingMedication: z.boolean(),
  lastDonationDate: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export function MedicalHistory({ data, onNext, onBack, updateData }: any) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    updateData(data);
    onNext();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="recentIllness"
            checked={form.watch('hasRecentIllness')}
            onCheckedChange={(checked) =>
              form.setValue('hasRecentIllness', checked as boolean)
            }
          />
          <Label htmlFor="recentIllness">
            Have you had any recent illnesses in the past 3 months?
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="chronicDiseases"
            checked={form.watch('hasChronicDiseases')}
            onCheckedChange={(checked) =>
              form.setValue('hasChronicDiseases', checked as boolean)
            }
          />
          <Label htmlFor="chronicDiseases">
            Do you have any chronic diseases?
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="medication"
            checked={form.watch('isTakingMedication')}
            onCheckedChange={(checked) =>
              form.setValue('isTakingMedication', checked as boolean)
            }
          />
          <Label htmlFor="medication">
            Are you currently taking any medication?
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastDonation">Last Blood Donation Date (if any)</Label>
        <Input
          id="lastDonation"
          type="date"
          {...form.register('lastDonationDate')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          {...form.register('additionalNotes')}
          placeholder="Any additional information you'd like to share..."
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Previous Step
        </Button>
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
}
