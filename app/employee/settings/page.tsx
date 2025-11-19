'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function EmployeeSettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">PST (GMT-8)</SelectItem>
                      <SelectItem value="est">EST (GMT-5)</SelectItem>
                      <SelectItem value="cst">CST (GMT-6)</SelectItem>
                      <SelectItem value="mst">MST (GMT-7)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger id="dateFormat">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-fit">Save Preferences</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates for important events</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="leave-status" className="font-medium">Leave Status Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified when your leave requests are processed</p>
                </div>
                <Switch id="leave-status" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="payroll-notifications" className="font-medium">Payroll Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications when payslips are available</p>
                </div>
                <Switch id="payroll-notifications" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="review-reminders" className="font-medium">Performance Review Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminders for upcoming performance reviews</p>
                </div>
                <Switch id="review-reminders" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="attendance-reminders" className="font-medium">Attendance Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive reminders to check in/out</p>
                </div>
                <Switch id="attendance-reminders" />
              </div>
              <Button className="w-fit mt-4">Save Notification Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Display Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="compact-view" className="font-medium">Compact View</Label>
                  <p className="text-sm text-muted-foreground">Use a more condensed layout</p>
                </div>
                <Switch id="compact-view" />
              </div>
              <Button className="w-fit">Save Display Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="profile-visibility" className="font-medium">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">Allow other employees to view your profile</p>
                </div>
                <Switch id="profile-visibility" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="show-status" className="font-medium">Show Online Status</Label>
                  <p className="text-sm text-muted-foreground">Display your online/offline status to others</p>
                </div>
                <Switch id="show-status" defaultChecked />
              </div>
              <Button className="w-fit mt-4">Save Privacy Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
