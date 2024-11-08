import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Force dynamic behavior for this API route
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { personalInfo, medicalHistory } = await req.json();

    // Save the user data in the User table
    const user = await prisma.user.create({
      data: {
        name: personalInfo.name,
        email: personalInfo.email,
        phone: personalInfo.phone,
        dob: new Date(personalInfo.dob),
        bloodGroup: personalInfo.bloodGroup,
        medicalHistory: {
          create: {
            hasRecentIllness: medicalHistory.hasRecentIllness,
            hasChronicDiseases: medicalHistory.hasChronicDiseases, //issue here
            isTakingMedication: medicalHistory.isTakingMedication,
            lastDonationDate: medicalHistory.lastDonationDate
              ? new Date(medicalHistory.lastDonationDate)
              : null,
            additionalNotes: medicalHistory.additionalNotes || null,
          },
        },
      },
    });

    // Return a successful response
    return NextResponse.json(
      { message: 'Registration successful', user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving registration:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
