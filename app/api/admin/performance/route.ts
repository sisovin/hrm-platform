import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/rbac';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || !['admin', 'hr'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const reviews = await prisma.performanceReview.findMany({
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform to match frontend expectations
    const transformedReviews = reviews.map(review => ({
      id: review.id,
      employeeId: review.employeeId,
      reviewDate: review.createdAt.toISOString(),
      reviewPeriod: review.period,
      overallScore: review.score,
      strengths: review.notes || '',
      areasForImprovement: review.notes || '',
      goals: review.notes || '',
      status: review.status,
      employee: review.employee,
    }));

    return NextResponse.json(transformedReviews);
  } catch (error) {
    console.error('Error fetching performance reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || !['admin', 'hr'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      employeeId,
      reviewPeriod,
      overallScore,
      strengths,
      areasForImprovement,
      goals,
      status,
    } = body;

    // Validation
    if (!employeeId || !reviewPeriod || !overallScore) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Combine notes fields
    const notes = `Strengths:\n${strengths || ''}\n\nAreas for Improvement:\n${areasForImprovement || ''}\n\nGoals:\n${goals || ''}`;

    const review = await prisma.performanceReview.create({
      data: {
        employeeId,
        reviewerId: user.id,
        period: reviewPeriod,
        score: overallScore,
        notes,
        status: status || 'submitted',
      },
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
    });

    // Transform to match frontend expectations
    const transformedReview = {
      id: review.id,
      employeeId: review.employeeId,
      reviewDate: review.createdAt.toISOString(),
      reviewPeriod: review.period,
      overallScore: review.score,
      strengths: strengths || '',
      areasForImprovement: areasForImprovement || '',
      goals: goals || '',
      status: review.status,
      employee: review.employee,
    };

    return NextResponse.json(transformedReview, { status: 201 });
  } catch (error) {
    console.error('Error creating performance review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
