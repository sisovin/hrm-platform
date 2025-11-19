'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Star, TrendingUp, Users, Award, Target } from 'lucide-react';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  department: { name: string } | null;
}

interface PerformanceReview {
  id: number;
  employeeId: number;
  employee: Employee;
  reviewDate: string;
  reviewPeriod: string;
  overallScore: number;
  strengths: string;
  areasForImprovement: string;
  goals: string;
  status: string;
}

export default function PerformancePage() {
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    reviewPeriod: '',
    overallScore: '',
    strengths: '',
    areasForImprovement: '',
    goals: '',
  });

  useEffect(() => {
    fetchReviews();
    fetchEmployees();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/employee/reviews');
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      toast.error('Failed to load performance reviews');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/hr/employees');
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Failed to load employees:', error);
    }
  };

  const handleCreateReview = async () => {
    try {
      const response = await fetch('/api/admin/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          employeeId: parseInt(formData.employeeId),
          overallScore: parseFloat(formData.overallScore),
          reviewDate: new Date().toISOString(),
          status: 'completed',
        }),
      });

      if (!response.ok) throw new Error('Failed to create review');

      toast.success('Performance review created successfully');
      setIsCreateDialogOpen(false);
      setFormData({
        employeeId: '',
        reviewPeriod: '',
        overallScore: '',
        strengths: '',
        areasForImprovement: '',
        goals: '',
      });
      fetchReviews();
    } catch (error) {
      toast.error('Failed to create review');
      console.error(error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      completed: { variant: 'default', label: 'Completed' },
      pending: { variant: 'secondary', label: 'Pending' },
      draft: { variant: 'outline', label: 'Draft' },
    };
    const config = statusMap[status.toLowerCase()] || { variant: 'outline' as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getRatingStars = (score: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= score ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-2 font-medium">{score.toFixed(1)}</span>
      </div>
    );
  };

  const filteredReviews = filterStatus === 'all'
    ? reviews
    : reviews.filter(review => review.status.toLowerCase() === filterStatus);

  const stats = {
    averageRating: reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.overallScore, 0) / reviews.length).toFixed(1)
      : '0.0',
    totalReviews: reviews.filter(r => r.status.toLowerCase() === 'completed').length,
    pendingReviews: reviews.filter(r => r.status.toLowerCase() === 'pending').length,
    topPerformers: reviews.filter(r => r.overallScore >= 4.5).length,
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Management</h1>
          <p className="text-muted-foreground">Manage employee performance reviews and track progress</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Award className="mr-2 h-4 w-4" />
              Create Review
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Performance Review</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="employee">Employee</Label>
                <Select
                  value={formData.employeeId}
                  onValueChange={(value) => setFormData({ ...formData, employeeId: value })}
                >
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id.toString()}>
                        {emp.firstName} {emp.lastName} - {emp.department?.name || 'No Dept'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reviewPeriod">Review Period</Label>
                  <Select
                    value={formData.reviewPeriod}
                    onValueChange={(value) => setFormData({ ...formData, reviewPeriod: value })}
                  >
                    <SelectTrigger id="reviewPeriod">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Q1 2024">Q1 2024</SelectItem>
                      <SelectItem value="Q2 2024">Q2 2024</SelectItem>
                      <SelectItem value="Q3 2024">Q3 2024</SelectItem>
                      <SelectItem value="Q4 2024">Q4 2024</SelectItem>
                      <SelectItem value="Annual 2024">Annual 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Overall Rating</Label>
                  <Select
                    value={formData.overallScore}
                    onValueChange={(value) => setFormData({ ...formData, overallScore: value })}
                  >
                    <SelectTrigger id="rating">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 - Outstanding</SelectItem>
                      <SelectItem value="4">4 - Exceeds Expectations</SelectItem>
                      <SelectItem value="3">3 - Meets Expectations</SelectItem>
                      <SelectItem value="2">2 - Needs Improvement</SelectItem>
                      <SelectItem value="1">1 - Unsatisfactory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="strengths">Strengths</Label>
                <Textarea
                  id="strengths"
                  placeholder="List key strengths and accomplishments..."
                  value={formData.strengths}
                  onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="improvements">Areas for Improvement</Label>
                <Textarea
                  id="improvements"
                  placeholder="List areas where the employee can grow..."
                  value={formData.areasForImprovement}
                  onChange={(e) => setFormData({ ...formData, areasForImprovement: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goals">Goals for Next Period</Label>
                <Textarea
                  id="goals"
                  placeholder="Set specific, measurable goals..."
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateReview}>Submit Review</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}</div>
            <p className="text-xs text-muted-foreground">Across all reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReviews}</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.topPerformers}</div>
            <p className="text-xs text-muted-foreground">Rating ≥ 4.5</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Performance Reviews</CardTitle>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">Loading reviews...</div>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Award className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Performance Reviews</h3>
              <p className="text-muted-foreground mb-4">
                {filterStatus !== 'all'
                  ? `No ${filterStatus} reviews found.`
                  : 'Get started by creating your first performance review.'}
              </p>
              {filterStatus === 'all' && (
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Award className="mr-2 h-4 w-4" />
                  Create Review
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Review Period</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">
                      {review.employee.firstName} {review.employee.lastName}
                    </TableCell>
                    <TableCell>{review.employee.department?.name || 'N/A'}</TableCell>
                    <TableCell>{review.reviewPeriod}</TableCell>
                    <TableCell>{getRatingStars(review.overallScore)}</TableCell>
                    <TableCell>{getStatusBadge(review.status)}</TableCell>
                    <TableCell>{new Date(review.reviewDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedReview(review);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Performance Review Details</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Employee</Label>
                  <p className="font-medium">{selectedReview.employee.firstName} {selectedReview.employee.lastName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Department</Label>
                  <p className="font-medium">{selectedReview.employee.department?.name || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Review Period</Label>
                  <p className="font-medium">{selectedReview.reviewPeriod}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Review Date</Label>
                  <p className="font-medium">{new Date(selectedReview.reviewDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Overall Rating</Label>
                <div className="mt-1">{getRatingStars(selectedReview.overallScore)}</div>
              </div>
              <div>
                <Label className="text-muted-foreground">Strengths</Label>
                <p className="mt-1 text-sm whitespace-pre-wrap">{selectedReview.strengths}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Areas for Improvement</Label>
                <p className="mt-1 text-sm whitespace-pre-wrap">{selectedReview.areasForImprovement}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Goals for Next Period</Label>
                <p className="mt-1 text-sm whitespace-pre-wrap">{selectedReview.goals}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
