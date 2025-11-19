'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function HRSettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">HR Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="default-department">Default Department for New Employees</Label>
                <Select defaultValue="general">
                  <SelectTrigger id="default-department">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="auto-assign" className="font-medium">Auto-assign Department Manager</Label>
                  <p className="text-sm text-muted-foreground">Automatically assign new employees to department manager</p>
                </div>
                <Switch id="auto-assign" defaultChecked />
              </div>
              <Button className="w-fit">Save Department Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sick-leave">Sick Leave (Days/Year)</Label>
                  <Input id="sick-leave" type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vacation">Vacation Days (Days/Year)</Label>
                  <Input id="vacation" type="number" defaultValue="15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personal">Personal Leave (Days/Year)</Label>
                  <Input id="personal" type="number" defaultValue="5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="leave-notice">Minimum Notice Period (Days)</Label>
                <Input id="leave-notice" type="number" defaultValue="3" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="auto-approve" className="font-medium">Auto-approve Leave Requests</Label>
                  <p className="text-sm text-muted-foreground">Automatically approve leave requests under 3 days</p>
                </div>
                <Switch id="auto-approve" />
              </div>
              <Button className="w-fit">Save Leave Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="work-start">Work Start Time</Label>
                  <Input id="work-start" type="time" defaultValue="09:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work-end">Work End Time</Label>
                  <Input id="work-end" type="time" defaultValue="17:00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="late-threshold">Late Arrival Threshold (Minutes)</Label>
                  <Input id="late-threshold" type="number" defaultValue="15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grace-period">Grace Period (Minutes)</Label>
                  <Input id="grace-period" type="number" defaultValue="5" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="geo-tracking" className="font-medium">Enable Geo-tracking</Label>
                  <p className="text-sm text-muted-foreground">Track employee location during check-in/out</p>
                </div>
                <Switch id="geo-tracking" />
              </div>
              <Button className="w-fit">Save Attendance Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Review Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="review-cycle">Review Cycle</Label>
                <Select defaultValue="quarterly">
                  <SelectTrigger id="review-cycle">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="biannual">Bi-annual</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating-scale">Rating Scale</Label>
                <Select defaultValue="5">
                  <SelectTrigger id="rating-scale">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3-Point Scale</SelectItem>
                    <SelectItem value="5">5-Point Scale</SelectItem>
                    <SelectItem value="10">10-Point Scale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="self-review" className="font-medium">Enable Self-Reviews</Label>
                  <p className="text-sm text-muted-foreground">Allow employees to submit self-assessments</p>
                </div>
                <Switch id="self-review" defaultChecked />
              </div>
              <Button className="w-fit">Save Review Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates for HR activities</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="new-employee" className="font-medium">New Employee Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new employees join</p>
                </div>
                <Switch id="new-employee" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="leave-requests" className="font-medium">Leave Request Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified of pending leave requests</p>
                </div>
                <Switch id="leave-requests" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="attendance-alerts" className="font-medium">Attendance Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts for late arrivals and absences</p>
                </div>
                <Switch id="attendance-alerts" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="review-reminders" className="font-medium">Review Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminders for pending performance reviews</p>
                </div>
                <Switch id="review-reminders" defaultChecked />
              </div>
              <Button className="w-fit mt-4">Save Notification Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-frequency">Automated Report Frequency</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger id="report-frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-recipients">Report Recipients</Label>
                <Textarea
                  id="report-recipients"
                  placeholder="Enter email addresses separated by commas"
                  defaultValue="hr@hrm.local, manager@hrm.local"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="auto-reports" className="font-medium">Enable Automated Reports</Label>
                  <p className="text-sm text-muted-foreground">Automatically generate and send reports</p>
                </div>
                <Switch id="auto-reports" defaultChecked />
              </div>
              <Button className="w-fit">Save Report Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
