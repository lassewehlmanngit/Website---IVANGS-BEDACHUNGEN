# Design System (Starter)

This starter includes a lightweight but scalable **token-first design system** built on Tailwind CSS and semantic CSS variables, optimized for **WCAG 2.1 AA** and “liquid” responsiveness.

## 1) Design Tokens

Tokens live in `src/shared/styles/tokens.css` and are mapped into Tailwind in `tailwind.config.ts`.

### Color tokens (semantic)

**Core colors:**
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--success`, `--success-foreground`
- `--warning`, `--warning-foreground`
- `--border`, `--input`, `--ring`

**Primary color scale (new):**
- `--primary-50` through `--primary-600` for subtle variations

**Surface colors (new):**
- `--surface-subtle` – Very light backgrounds
- `--surface-muted` – Muted section backgrounds  
- `--surface-elevated` – Elevated card backgrounds

**Text semantic tokens (new):**
- `--text-emphasis` – Emphasized text (uses primary)
- `--text-subtle` – Subdued text color

Use via Tailwind:

- `bg-background text-foreground`
- `bg-primary text-primary-foreground`
- `bg-surface-subtle`, `bg-surface-muted`, `bg-surface-elevated`
- `border-border`
- `text-muted-foreground`
- `focus-visible:ring-ring`

### Typography tokens (fluid)

Typography uses `clamp()`-based variables for smooth scaling:

- `--text-xs` → `--text-4xl`
- `--heading-1` → `--heading-6`
- `--leading-tight`, `--leading-normal`, `--leading-relaxed`

Tailwind utilities:

- `text-base`, `text-lg`, `text-2xl`, etc.
- `text-h1` → `text-h6` for headings

### Spacing + shadows

Spacing: `--space-1` … `--space-32` (4px base)
- Standard scale: `--space-1` through `--space-16`
- Extended scale (new): `--space-20` (80px), `--space-24` (96px), `--space-32` (128px)

Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

Tailwind shadows map to tokens (e.g. `shadow-md`).

### Icon size scale (new)

- `--icon-xs`: 16px (compact contexts)
- `--icon-sm`: 20px (list items, small buttons)
- `--icon-md`: 24px (default, most contexts)
- `--icon-lg`: 32px (feature highlights, hero elements)

### Layout variables (new)

- `--header-height`: 5rem (80px) – Header height for sticky calculations
- `--service-nav-height`: 3rem (48px) – Service navigation strip height

## 2) Accessibility defaults (WCAG 2.1 AA)

Global styles in `src/shared/styles/globals.css` include:

- **Focus visible** outline + ring token
- **Reduced motion** support (`prefers-reduced-motion`)
- **High contrast** adjustments (`prefers-contrast: more`)
- **Minimum touch targets** on coarse pointers (44×44px)
- `sr-only` and `sr-only-focusable` utilities

## 3) Reusable UI components

Components are in `src/shared/ui/` and exported from `src/shared/ui/index.ts`.

### Typography

- `Heading` (levels 1–6, semantic tags)
- `Text` (variants: `body`, `muted`, `small`, `caption`)
- `Lead`

### Buttons

- `Button` for `<button>` elements
- `ButtonLink` for React Router links styled like buttons
- `IconButton` for icon-only buttons with required aria-label

Variants: `primary`, `default`, `secondary`, `outline`, `ghost`, `destructive`

Sizes:
- `sm`: Compact (px-3 py-2, text-sm)
- `md`: Default (px-4 py-3, text-sm)
- `lg`: Large (px-5 py-3, text-base)
- `xl`: Extra large (px-6 py-4 → px-8 py-5, text-base → text-lg, bold) - Hero CTAs
- `2xl`: Marketing (px-8 py-5 → px-10 py-6, text-lg → text-xl, bold) - Final CTAs

Supports loading state and left/right icons.

### Forms

- `FormField` (label/description/error wrapper with correct ARIA)
- `Label`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`

### Layout primitives

- `Card`, `CardHeader`, `CardContent`, `CardFooter`
- `Badge`, `Alert`
- `Section`, `Stack`, `Grid`

### Interactive components

- `Dialog` – Modal dialog with focus trap, portal, and keyboard support
- `Drawer` – Slide-out panel (left/right) with focus trap
- `Dropdown` – Menu with keyboard navigation (arrow keys, escape)
- `Tabs` – Tab interface with ARIA roles and keyboard navigation
- `Accordion` – Expandable sections with animated transitions
- `Tooltip` – Positioned tooltip with delay and arrow

### Feedback components

- `Toast` / `Toaster` – Toast notification system with `toast()` API
- `Progress` – Linear and circular progress indicators
- `Spinner` – Simple loading spinner
- `Skeleton` – Loading placeholders (text, avatar, card, button variants)

### Marketing components

- `Hero` – Hero section with variants (default, centered, split)
- `PageHero` – Compound component for page hero sections (Contact, About, etc.)
  - `PageHero.Eyebrow` – Small uppercase label
  - `PageHero.Title` – Main heading (uses text-h1)
  - `PageHero.Description` – Supporting text
  - Variants: `dark`, `light`, `primary`
- `FeatureCard` / `FeatureGrid` / `FeatureSection` – Feature showcases
- `Testimonial` / `TestimonialGrid` / `FeaturedTestimonial` – Customer quotes
- `PricingCard` / `PricingGrid` / `PricingToggle` – Pricing tables
- `OptimizedImage` – Lazy loading image with blur placeholder
- `AvatarImage` – Avatar with fallback initials

### SEO & Content

- `Seo` – Full SEO component with OG, Twitter, canonical, and JSON-LD
- `Markdown` – Markdown renderer with prose styling

## 4) Usage examples

### Button

```tsx
import { Button } from '@/shared/ui';

export function Example() {
  return (
    <>
      {/* Standard button */}
      <Button variant="primary" size="md">
        Submit
      </Button>
      
      {/* Hero CTA with xl size */}
      <Button size="xl" className="shadow-lg shadow-primary/30">
        Get Started <ArrowRight size={18} />
      </Button>
      
      {/* Secondary xl button for hero sections */}
      <Button variant="outline" size="xl" className="bg-white/10 text-white border-white/20">
        Learn More
      </Button>
    </>
  );
}
```

### FormField + Input

```tsx
import { FormField, Input } from '@/shared/ui';

export function Example() {
  return (
    <FormField
      label="Email"
      required
      description="We’ll only use this to reply."
      error={undefined}
    >
      {({ id, describedBy, invalid }) => (
        <Input id={id} aria-describedby={describedBy} invalid={invalid} placeholder="you@company.com" />
      )}
    </FormField>
  );
}
```

### Typography

```tsx
import { Heading, Lead, Text } from '@/shared/ui';

export function Example() {
  return (
    <div>
      <Heading level={1}>A marketing headline</Heading>
      <Lead>Short intro text that scales fluidly.</Lead>
      <Text variant="muted">Supporting details.</Text>
    </div>
  );
}
```

### Dialog

```tsx
import { useState } from 'react';
import { Dialog, DialogFooter, Button } from '@/shared/ui';

export function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Confirm action">
        <p>Are you sure you want to proceed?</p>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
```

### Toast notifications

```tsx
import { toast } from '@/shared/lib/toast';
import { Button } from '@/shared/ui';

export function Example() {
  return (
    <Button onClick={() => toast.success('Saved!', { description: 'Changes saved.' })}>
      Save
    </Button>
  );
}
```

### Hero section

```tsx
import { Hero, Button, ButtonLink } from '@/shared/ui';

export function Example() {
  return (
    <Hero
      variant="centered"
      title="Build faster with our starter"
      description="A production-ready foundation for marketing sites."
      actions={
        <>
          <Button size="lg">Get Started</Button>
          <ButtonLink to="/docs" variant="outline" size="lg">Learn More</ButtonLink>
        </>
      }
    />
  );
}
```

### PageHero (compound component)

```tsx
import { PageHero } from '@/shared/ui';

export function ContactPageHero() {
  return (
    <PageHero variant="dark">
      <PageHero.Eyebrow>Contact</PageHero.Eyebrow>
      <PageHero.Title>Get in touch with us</PageHero.Title>
      <PageHero.Description>
        We'd love to hear from you. Send us a message and we'll respond within 24 hours.
      </PageHero.Description>
    </PageHero>
  );
}

// With TinaCMS visual editing
export function AboutPageHero({ data }) {
  return (
    <PageHero variant="dark">
      {data.eyebrow && (
        <PageHero.Eyebrow data-tina-field={tinaField(data, 'eyebrow')}>
          {data.eyebrow}
        </PageHero.Eyebrow>
      )}
      <PageHero.Title data-tina-field={tinaField(data, 'title')}>
        {data.title}
      </PageHero.Title>
      <PageHero.Description data-tina-field={tinaField(data, 'description')}>
        {data.description}
      </PageHero.Description>
    </PageHero>
  );
}
```

### Feature grid

```tsx
import { FeatureSection, FeatureCard } from '@/shared/ui';
import { Zap, Shield, Globe } from 'lucide-react';

export function Example() {
  return (
    <FeatureSection title="Why choose us" centered>
      <FeatureCard icon={<Zap />} title="Fast" description="Optimized for performance." />
      <FeatureCard icon={<Shield />} title="Secure" description="Built with security in mind." />
      <FeatureCard icon={<Globe />} title="Global" description="Multi-language support." />
    </FeatureSection>
  );
}
```

## 5) Customization checklist

- **Brand color**: set `--primary` / `--primary-foreground` in `tokens.css`.
- **Radius**: set `--radius`.
- **Light/dark**: adjust token values in the default and `prefers-color-scheme: light` blocks.
- **Typography**: tune `--heading-*` and `--text-*` clamps.

## 6) WCAG notes (practical)

- Keep contrast: \(\ge 4.5:1\) for normal text, \(\ge 3:1\) for large text.
- Don’t rely on color alone for errors/success; pair with text + icons.
- Ensure interactive elements remain reachable by keyboard and show focus.

