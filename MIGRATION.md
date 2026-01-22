# Design System Migration Guide

This document outlines the changes made during the design system overhaul and how to migrate existing code.

## Button Size Migration

### Before (manual className overrides)
```tsx
<Button className="px-6 py-5 md:px-8 md:py-6 text-base md:text-lg font-bold">
  Get Started
</Button>
```

### After (using size prop)
```tsx
<Button size="xl">
  Get Started
</Button>
```

### Size Reference

| Size | Padding | Font Size | Use Case |
|------|---------|-----------|----------|
| `sm` | px-3 py-2 | text-sm | Compact UI, secondary actions |
| `md` | px-4 py-3 | text-sm | Default, form buttons |
| `lg` | px-5 py-3 | text-base | Primary actions |
| `xl` | px-6→8 py-4→5 | text-base→lg | Hero CTAs, page-level actions |
| `2xl` | px-8→10 py-5→6 | text-lg→xl | Final CTAs, marketing emphasis |

## Typography Migration

### Before (manual responsive classes)
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
  Page Title
</h1>

<h2 className="text-3xl md:text-4xl font-bold">
  Section Title
</h2>
```

### After (fluid typography tokens)
```tsx
<h1 className="text-h1 font-bold">
  Page Title
</h1>

<h2 className="text-h2 font-bold">
  Section Title
</h2>
```

### Typography Scale

| Token | Base Size | Max Size | Line Height |
|-------|-----------|----------|-------------|
| `text-h1` | 2rem | 3.5rem | tight (1.2) |
| `text-h2` | 1.75rem | 2.75rem | tight (1.2) |
| `text-h3` | 1.5rem | 2.25rem | tight (1.2) |
| `text-h4` | 1.25rem | 1.875rem | tight (1.2) |
| `text-h5` | 1.125rem | 1.5rem | tight (1.2) |
| `text-h6` | 1rem | 1.25rem | tight (1.2) |

## PageHero Component Migration

### Before (inline hero sections)
```tsx
<section className="relative py-20 md:py-32 bg-slate-900 text-white overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-4xl">
      <p className="text-primary font-bold uppercase tracking-wider mb-4">Contact</p>
      <h1 className="text-h1 font-bold mb-6">{title}</h1>
      <p className="text-xl text-slate-300 max-w-2xl">{description}</p>
    </div>
  </div>
</section>
```

### After (compound component)
```tsx
import { PageHero } from '@/shared/ui/PageHero';

<PageHero variant="dark">
  <PageHero.Eyebrow>Contact</PageHero.Eyebrow>
  <PageHero.Title>{title}</PageHero.Title>
  <PageHero.Description>{description}</PageHero.Description>
</PageHero>
```

### PageHero Variants
- `dark` – Dark background (slate-900), white text
- `light` – White background, dark text
- `primary` – Primary color background, white text

## Color Token Migration

### Before (direct Tailwind colors)
```tsx
<p className="text-slate-600">Description</p>
<div className="bg-slate-50">...</div>
<span className="text-slate-900">Title</span>
```

### After (semantic tokens)
```tsx
<p className="text-muted-foreground">Description</p>
<div className="bg-muted">...</div>
<span className="text-foreground">Title</span>
```

### New Surface Colors
```tsx
<div className="bg-surface-subtle">Very light background</div>
<div className="bg-surface-muted">Muted section background</div>
<div className="bg-surface-elevated">Card/elevated background</div>
```

## Loading State Migration

### Before (spinner)
```tsx
if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
```

### After (skeleton)
```tsx
import { Skeleton, SkeletonText, SkeletonCard } from '@/shared/ui/Skeleton';

if (isLoading) {
  return (
    <div className="animate-fade-in">
      {/* Hero skeleton */}
      <div className="bg-slate-900 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <Skeleton variant="text" width="100px" className="h-4 mb-4 bg-slate-700" />
          <Skeleton variant="text" width="60%" className="h-12 mb-6 bg-slate-700" />
          <Skeleton variant="text" width="80%" className="h-6 bg-slate-700" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SkeletonText lines={3} />
          <SkeletonCard className="mt-6" />
        </div>
      </div>
    </div>
  );
}
```

## Border Radius Consistency

### Standard values
- `rounded-sm` – Cards, buttons, inputs (default)
- `rounded-md` – Larger cards, modals
- `rounded-lg` – Hero images, feature sections
- Avoid `rounded-3xl` or larger – use `rounded-lg` maximum for consistency

## Icon Size Guidelines

| Context | Size | Example |
|---------|------|---------|
| Compact list items | 16px (`size={16}`) | Dropdown items |
| Standard list items | 20px (`size={20}`) | Feature checkpoints |
| Cards, form icons | 24px (`size={24}`) | Contact info icons |
| Feature highlights | 32px (`size={32}`) | Hero stats |

## Mobile-First Layout Patterns

### Contact page pattern (form first on mobile)
```tsx
<div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
  <div className="order-2 lg:order-1">
    {/* Contact Information - shows second on mobile */}
  </div>
  <div className="order-1 lg:order-2">
    {/* Contact Form - shows first on mobile */}
  </div>
</div>
```

## Sticky Sidebar with CSS Variables

### Before (fixed value)
```tsx
<div className="lg:sticky lg:top-40 h-fit">
```

### After (using layout variables)
```tsx
<div 
  className="lg:sticky h-fit"
  style={{ top: 'calc(var(--header-height, 5rem) + var(--service-nav-height, 3rem) + 2rem)' }}
>
```

## QuickContactForm Component

New lightweight form component for hero sections:

```tsx
import { QuickContactForm } from '@/features/contact/QuickContactForm';

// In hero section
<QuickContactForm 
  source="hero"
  formData={cmsFormData}
  lang={lang}
  variant="dark"
/>

// In mobile section
<QuickContactForm 
  source="mobile"
  formData={cmsFormData}
  lang={lang}
  variant="dark"
/>
```

## Checklist for Migration

- [ ] Replace manual button padding with `size="xl"` or `size="2xl"`
- [ ] Replace `text-4xl md:text-5xl` patterns with `text-h1`, `text-h2`, etc.
- [ ] Replace inline hero sections with `<PageHero>` component
- [ ] Replace spinner loading states with Skeleton components
- [ ] Update `rounded-3xl` to `rounded-lg` for consistency
- [ ] Add `order-*` classes for mobile-first layout ordering
- [ ] Use CSS variables for sticky positioning calculations
- [ ] Replace direct slate colors with semantic tokens where appropriate
