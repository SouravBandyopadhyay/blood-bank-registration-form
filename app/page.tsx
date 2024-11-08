import { StepperForm } from '@/components/stepper-form';
import { Droplet } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Droplet className="h-12 w-12 text-primary mx-auto mb-4 bg-red" />
          <h1 className="text-4xl font-bold tracking-tight">
            Blood Donation Camp Registration
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us in our mission to save lives. Register for our upcoming
            blood donation camp and make a difference in someone's life....
          </p>
        </div>
        <StepperForm />
      </div>
    </main>
  );
}
