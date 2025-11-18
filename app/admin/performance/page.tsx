'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PerformancePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Performance Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Review</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Performance Review</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="employee">Employee</Label>
                <Select>
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">John Doe</SelectItem>
                    <SelectItem value="2">Jane Smith</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reviewPeriod">Review Period</Label>
                  <Select>
                    <SelectTrigger id="reviewPeriod">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="q1">Q1 2024</SelectItem>
                      <SelectItem value="q2">Q2 2024</SelectItem>
                      <SelectItem value="annual">Annual 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Overall Rating</Label>
                  <Select>
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
                <Textarea id="strengths" placeholder="List key strengths..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="improvements">Areas for Improvement</Label>
                <Textarea id="improvements" placeholder="List areas for improvement..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goals">Goals for Next Period</Label>
                <Textarea id="goals" placeholder="Set goals..." />
              </div>
              <Button className="w-full">Submit Review</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">4.2</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Reviews Completed</p>
                <p className="text-2xl font-bold">120</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Top Performers</p>
                <p className="text-2xl font-bold">25</p>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Review Period</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Engineering</TableCell>
                  <TableCell>Q1 2024</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>4.5</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Completed
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>Sales</TableCell>
                  <TableCell>Q1 2024</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>4.8</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Completed
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goal Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Goal</TableHead>
                  <TableHead>Target Date</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Complete AWS Certification</TableCell>
                  <TableCell>2024-06-30</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-sm">75%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      In Progress
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
