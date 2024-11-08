"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex justify-center items-center w-full mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="relative">
            <div
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors",
                currentStep > index
                  ? "bg-primary border-primary"
                  : currentStep === index
                  ? "border-primary"
                  : "border-muted-foreground"
              )}
            >
              {currentStep > index ? (
                <Check className="h-5 w-5 text-white" />
              ) : (
                <span
                  className={cn(
                    "text-sm",
                    currentStep === index ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {index + 1}
                </span>
              )}
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-20 h-[2px]",
                currentStep > index ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}