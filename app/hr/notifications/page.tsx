"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Trash2, Settings, Filter } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
}

export default function HRNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Leave Request Pending",
      message: "3 leave requests require your approval",
      type: "warning",
      timestamp: "15 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "New Employee Document",
      message: "John Doe uploaded employment contract",
      type: "info",
      timestamp: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Performance Review Due",
      message: "5 performance reviews are due this week",
      type: "warning",
      timestamp: "2 hours ago",
      read: true,
    },
    {
      id: "4",
      title: "Employee Anniversary",
      message: "Alice Johnson celebrates 2 years with the company",
      type: "success",
      timestamp: "1 day ago",
      read: true,
    },
    {
      id: "5",
      title: "Attendance Report Ready",
      message: "November attendance report is ready for review",
      type: "info",
      timestamp: "2 days ago",
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with HR activities and alerts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <span className="text-sm font-medium">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </span>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="ghost" size="sm">
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No notifications</p>
              <p className="text-sm text-muted-foreground">
                You&apos;re all caught up!
              </p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all ${!notification.read ? "border-l-4 border-l-primary bg-primary/5" : ""
                }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-base">
                        {notification.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={getTypeColor(notification.type)}
                      >
                        {notification.type}
                      </Badge>
                      {!notification.read && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      {notification.message}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">
                  {notification.timestamp}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
