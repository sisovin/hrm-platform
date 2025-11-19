# Header and Footer Separation Guide

## Overview

The application now has separate headers and footers for the landing page and dashboard areas, providing distinct user experiences for public-facing pages vs. authenticated dashboard pages.

## Component Structure

### Landing Page Components

**Location**: `components/layout/`

1. **LandingHeader.tsx** - Public-facing header
   - Logo and branding
   - Navigation links (Features, Pricing, Docs)
   - Theme toggle (Light/Dark mode)
   - Auth buttons (Sign in, Get Started) or Dashboard link if logged in
   - Responsive mobile menu
   - Clean, marketing-focused design

2. **LandingFooter.tsx** - Public-facing footer
   - Company branding
   - Multi-column link sections (Product, Company, Legal)
   - Social media links (Twitter, LinkedIn, GitHub)
   - Copyright notice
   - Full-width dark theme design

### Dashboard Components

**Location**: `components/layout/`

1. **DashboardHeader.tsx** - Dashboard header
   - Search functionality
   - Theme toggle
   - Notifications bell with indicator
   - User dropdown menu (Profile, Settings, Sign out)
   - Shows user name and email
   - Compact, utility-focused design

2. **DashboardFooter.tsx** - Dashboard footer
   - Simple, minimal design
   - Copyright notice
   - Quick links (Help Center, Privacy, Terms)
   - Matches dashboard theme

## Conditional Rendering

**ConditionalLayout.tsx** - Smart layout wrapper

- Detects current route using `usePathname()`
- Routes starting with `/admin`, `/hr`, or `/employee` → No header/footer (sidebars handle navigation)
- Routes `/login` or `/register` → No header/footer (auth pages have their own layouts)
- All other routes (landing page, etc.) → Shows LandingHeader and LandingFooter

## Implementation

### Root Layout (`app/layout.tsx`)

```tsx
<AppProviders>
  <ConditionalLayout>
    <Toaster />
    {children}
  </ConditionalLayout>
</AppProviders>
```

The `ConditionalLayout` wraps all content and automatically determines which header/footer to show (or none).

### Dashboard Layouts

Each dashboard area has its own layout with sidebar:

- `app/admin/layout.tsx` - Uses `AdminSidebar` with breadcrumbs
- `app/hr/layout.tsx` - Uses `HRSidebar` with breadcrumbs
- `app/employee/layout.tsx` - Uses `EmployeeSidebar` with breadcrumbs

These layouts use the shadcn `SidebarProvider` pattern and don't need separate headers/footers since navigation is handled by the sidebar.

## Route Behavior

| Route | Header | Footer | Navigation |
|-------|--------|--------|------------|
| `/` (Home) | LandingHeader | LandingFooter | Public nav links |
| `/login` | None | None | Auth form only |
| `/register` | None | None | Auth form only |
| `/admin/*` | None | None | AdminSidebar |
| `/hr/*` | None | None | HRSidebar |
| `/employee/*` | None | None | EmployeeSidebar |

## Features

### Landing Header/Footer

- ✅ Marketing-focused design
- ✅ Public navigation
- ✅ Authentication state aware
- ✅ Redirects logged-in users to appropriate dashboard
- ✅ Theme toggle support
- ✅ Responsive mobile design
- ✅ Social media integration

### Dashboard Header/Footer (Ready to use)

- ✅ Utility-focused design
- ✅ Search functionality
- ✅ Notification system
- ✅ User profile menu
- ✅ Theme toggle support
- ✅ Minimal, clean footer
- ✅ Context-aware links

## Usage

The system works automatically - no manual configuration needed. The `ConditionalLayout` component handles all routing logic.

To use the dashboard header/footer in a custom layout (if needed):

```tsx
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { DashboardFooter } from '@/components/layout/DashboardFooter';

<div className="flex flex-col min-h-screen">
  <DashboardHeader />
  <main className="flex-1">
    {children}
  </main>
  <DashboardFooter />
</div>
```

## Benefits

1. **Clear Separation** - Landing pages and dashboards have distinct UX
2. **Automatic Routing** - No manual configuration needed
3. **Flexible** - Easy to add new layouts for different sections
4. **Maintainable** - Each component focuses on one purpose
5. **Consistent** - All dashboards share sidebar pattern
6. **Responsive** - Mobile-friendly across all layouts
