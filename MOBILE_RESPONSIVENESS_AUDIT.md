# Mobile Responsiveness & Accessibility Audit

**Date:** 2026-01-19  
**Goal:** Achieve a fully liquid responsive website across all breakpoints with optimal mobile usability and accessibility.

---

## 🎯 Executive Summary

The website has a solid foundation with fluid typography tokens and good accessibility practices. However, several components need optimization for true liquid responsiveness across all breakpoints, particularly focusing on mobile (320px-768px) and tablet (768px-1024px) viewports.

---

## ✅ What's Working Well

1. **Fluid Typography System**
   - CSS custom properties with `clamp()` functions for scalable text
   - Semantic color tokens for theming
   - Good WCAG 2.1 AA foundations

2. **Accessibility Features**
   - Focus-visible states implemented
   - Reduced motion support
   - Minimum touch targets (44px) for coarse pointers
   - Semantic HTML structure

3. **Mobile-First Patterns**
   - Responsive grid layouts using Tailwind
   - Mobile drawer navigation
   - Adaptive hero sections

---

## 🔧 Critical Optimizations Needed

### 1. **Breadcrumbs Component** (`src/shared/ui/Breadcrumbs.tsx`)

**Issues:**
- Hardcoded color classes (`text-slate-500`, `text-slate-900`) instead of semantic theme tokens
- Text size `text-sm` may be too small on mobile devices
- Icon sizes (`size={14}`) are fixed and don't scale responsively
- Spacing (`space-x-2`) could cause overlap on very small screens
- Missing responsive text truncation for long breadcrumb labels

**Recommendations:**
```tsx
// Replace hardcoded colors with theme tokens
text-slate-500 → text-muted-foreground
text-slate-900 → text-foreground

// Add responsive sizing
text-sm → text-xs sm:text-sm

// Add text truncation for long labels
<span className="truncate max-w-[120px] sm:max-w-none">

// Increase icon size for better touch targets
size={14} → size={16}
```

---

### 2. **"Zurück zur Übersicht" Button** (Service Detail Page)

**Issues:**
- Fixed positioning (`top-28 left-8 md:top-32`) doesn't account for smaller mobile screens
- On mobile, the button may overlap with hero text or be cut off
- Small touch target area on mobile
- Text may be hard to read over varying background images

**Current Code:**
```tsx
// Line 62-67 in ServiceDetailPage.tsx
<Link 
  to={`/${lang}/services`}
  className="absolute top-28 left-8 md:top-32 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-sm flex items-center gap-2 transition-colors font-medium border border-white/20 z-10"
>
```

**Recommendations:**
```tsx
// Improve mobile positioning and sizing
className="absolute top-20 left-4 md:top-32 md:left-8 
           bg-white/10 hover:bg-white/20 backdrop-blur-md 
           text-white px-4 py-3 md:px-5 md:py-2.5 
           rounded-sm flex items-center gap-2 
           transition-colors font-medium text-sm md:text-base
           border border-white/20 z-10
           min-h-[44px] min-w-[44px]"
```

---

### 3. **Headline Sizing Across Breakpoints**

**Issues:**
- Some headlines use fixed responsive classes (e.g., `text-4xl md:text-5xl`) instead of fluid `text-h1` tokens
- Inconsistent use of `text-h*` utility classes vs manual responsive classes
- Font weights not optimized for Inter font family

**Examples Found:**
```tsx
// HomePage.tsx line 56
<h2 className="text-4xl md:text-5xl font-bold mb-6">

// AboutPage.tsx line 27
<h1 className="text-4xl md:text-5xl font-bold mb-6">

// ContactPage.tsx line 31
<h1 className="text-4xl md:text-5xl font-bold mb-4">

// ServiceDetailPage.tsx line 60
<h1 className="text-5xl md:text-7xl font-slab font-bold mb-6">
```

**Recommendations:**
- Replace manual responsive classes with fluid `text-h1`, `text-h2`, etc.
- Update font-slab usage to Inter where appropriate
- Ensure minimum sizes are readable on small mobile (320px width)

**Proposed Scale:**
```css
--heading-1: clamp(2rem, 4vw + 1rem, 3.5rem);    /* 32px → 56px */
--heading-2: clamp(1.75rem, 3vw + 0.75rem, 2.75rem); /* 28px → 44px */
--heading-3: clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem);  /* 24px → 36px */
--heading-4: clamp(1.25rem, 2vw + 0.5rem, 1.875rem);  /* 20px → 30px */
```

---

### 4. **Contact Page Layout** (`src/pages/contact/ui/ContactPage.tsx`)

**Issues:**
- Contact info cards have fixed padding that doesn't scale well
- Icon containers (`w-12 h-12`) may be too large on mobile
- "Ihr direkter Draht" section uses `text-sm` which becomes cramped on mobile
- Grid layout `lg:grid-cols-2` creates very narrow columns on tablets

**Recommendations:**
```tsx
// Line 40: Adjust padding responsively
<div className="bg-slate-50 p-6 md:p-8 rounded-sm">

// Line 44: Responsive icon sizing
<div className="bg-white p-2 md:p-3 rounded-md w-10 h-10 md:w-12 md:h-12">

// Line 118: Better mobile spacing
<div className="bg-white p-4 md:p-6 rounded-sm">
```

---

### 5. **About Page Team Grid** (`src/pages/about/ui/AboutPage.tsx`)

**Issues:**
- Craftsmen grid uses `grid-cols-2` on mobile which may be too cramped
- Small avatar icons (`w-10 h-10`) with small text (`text-xs`)
- Leadership cards on mobile could benefit from stacking

**Current:**
```tsx
// Line 150
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
```

**Recommendations:**
```tsx
// Consider single column on very small screens
<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
```

---

### 6. **Career Page Hero** (`src/pages/career/ui/CareerPage.tsx`)

**Issues:**
- Hero height `h-[50vh] min-h-[400px]` may be too tall on mobile landscape
- Text container padding needs better mobile scaling
- Button in hero could benefit from full-width on mobile

**Current:**
```tsx
// Line 28
<div className="relative h-[50vh] min-h-[400px] max-h-[600px]">

// Line 42-44
<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
```

**Recommendations:**
```tsx
// Adjust hero height for mobile
<div className="relative h-[60vh] md:h-[50vh] min-h-[400px] max-h-[600px]">

// Better text scaling
<h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
```

---

### 7. **Service Detail Page Sidebar** (`src/pages/service-detail/ui/ServiceDetailPage.tsx`)

**Issues:**
- Sidebar is `lg:col-span-4` but shows stacked on mobile - good!
- However, the "Quick CTA Box" padding could be better optimized
- Sticky positioning `sticky top-40` assumes fixed header height

**Current:**
```tsx
// Line 177
<div className="lg:col-span-4 space-y-8 sticky top-40 h-fit">

// Line 179
<div className="bg-slate-900 text-white p-8 rounded-md">
```

**Recommendations:**
```tsx
// Responsive sticky offset
<div className="lg:col-span-4 space-y-6 md:space-y-8 lg:sticky lg:top-40 h-fit">

// Responsive padding
<div className="bg-slate-900 text-white p-6 md:p-8 rounded-md">
```

---

### 8. **Hero Section Stats Grid** (`src/widgets/home/ui/HeroSection.tsx`)

**Issues:**
- Mobile stats grid uses `grid-cols-2` which is good
- Text sizes (`text-[10px]`) may be too small for accessibility
- Icon sizes differ between mobile (`size={20}`) and desktop (`size={24}`)

**Current:**
```tsx
// Line 171 (mobile)
<p className="text-[10px] text-slate-300 uppercase tracking-wider font-bold">

// Line 129 (desktop)
<p className="text-xs text-slate-300 uppercase tracking-wider font-bold">
```

**Recommendations:**
- Increase mobile caption text to `text-[11px]` or `text-xs`
- Ensure consistent styling patterns

---

### 9. **Navigation Header** (`src/widgets/navigation/SiteHeader.tsx`)

**Issues:**
- Logo text size is fixed `text-2xl`
- "Bedachungen" subtitle `text-xs` becomes very small on mobile
- Desktop nav has good responsive behavior
- Mobile drawer is well implemented ✅

**Minor Improvements:**
```tsx
// Line 56-59: Responsive logo sizing
<h1 className="text-xl sm:text-2xl font-bold">
  IVANGS
</h1>
<span className="text-[10px] sm:text-xs uppercase">Bedachungen</span>
```

---

### 10. **Button Component Improvements**

**Current State:** ✅ Already has `min-h-touch` and `min-w-touch`

**Recommendations:**
- Ensure all custom button implementations (non-component usage) follow the same pattern
- Check inline `<button>` elements throughout codebase

---

## 🎨 Typography Implementation: Inter Font

**Current State:**
- Inter is defined in `tailwind.config.ts` (line 99)
- Body font-family is set in `globals.css` (line 46)
- **BUT**: Inter is not loaded from a CDN or local files

**Action Required:**

### Option 1: Google Fonts CDN (Recommended for speed)
Add to `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Option 2: Self-hosted (Better for privacy)
- Download Inter from [Google Fonts](https://fonts.google.com/specimen/Inter)
- Place files in `/public/fonts/`
- Add `@font-face` declarations in `globals.css`

---

## 📱 Responsive Breakpoint Strategy

**Current Tailwind Breakpoints:**
```js
sm: '640px'   // Small tablets
md: '768px'   // Tablets
lg: '1024px'  // Laptops
xl: '1280px'  // Desktops
2xl: '1536px' // Large desktops (capped at 1280px for container)
```

**Recommendation:** Consider adding an `xs` breakpoint for small phones
```js
xs: '480px'
```

This helps target devices between 320px and 640px more precisely.

---

## 🎯 Priority Action Items

### High Priority (Implement immediately)
1. ✅ Load Inter font in HTML
2. ✅ Fix breadcrumbs component colors and sizing
3. ✅ Improve "Zurück zur Übersicht" button mobile spacing
4. ✅ Update all headline classes to use fluid `text-h*` tokens

### Medium Priority (Next sprint)
5. ⚠️ Optimize contact page icon sizes and padding
6. ⚠️ Improve career page hero responsiveness
7. ⚠️ Adjust service detail sidebar spacing

### Low Priority (Nice to have)
8. 🔵 Add `xs` breakpoint to Tailwind config
9. 🔵 Create responsive image component guidelines
10. 🔵 Document mobile testing checklist

---

## 🧪 Testing Checklist

Test all pages at the following breakpoints:
- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12/13/14)
- [ ] 390px (iPhone 14 Pro)
- [ ] 414px (iPhone Plus models)
- [ ] 768px (iPad Portrait)
- [ ] 1024px (iPad Landscape)
- [ ] 1280px (Laptop)
- [ ] 1920px (Desktop)

**Key Pages:**
- [ ] Home Page
- [ ] About Page
- [ ] Contact Page
- [ ] Career Page
- [ ] Service Detail Pages (all 5)
- [ ] Generic Pages (Legal, Privacy, etc.)

**Interaction Testing:**
- [ ] Mobile drawer navigation
- [ ] Form inputs with virtual keyboard
- [ ] Button touch targets (min 44x44px)
- [ ] Horizontal scrolling (should not occur)
- [ ] Images loading and scaling
- [ ] Video performance on mobile

---

## 📚 Resources & References

- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Apple Human Interface Guidelines - Touch Targets](https://developer.apple.com/design/human-interface-guidelines/inputs)
- [Inter Font Family](https://rsms.me/inter/)
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [CSS Clamp() Calculator](https://clamp.font-size.app/)

---

**End of Audit**
