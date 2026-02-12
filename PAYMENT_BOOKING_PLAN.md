# Payment & Booking Integration Plan for Ivangs Bedachungen

## 1. Analysis of Current Project
- **Architecture**: The website is a **Static Site** (React + Vite + TinaCMS) deployed on Render.
- **Constraints**: There is no backend server or database in the current repository to handle complex booking logic (calendar availability, time slots, double-booking prevention) or secure server-side Stripe operations.
- **Requirement**: "Users can book ivangs immediately for their services."

## 2. Recommended Solution: Embedded Booking System (Cal.com + Stripe)

For a static site wanting "immediate booking" with payments, the industry-standard best practice is to use a specialized booking platform embedded directly into your site.

**Recommendation: Cal.com (Open Source, highly customizable) or Calendly.**
Both integrate natively with **Stripe** to collect payments before a booking is confirmed.

### Why this approach?
1.  **Zero Backend Code**: No need to build/host a separate API just for payments.
2.  **Real-time Availability**: Handles calendar syncing (Google Calendar, Outlook) so users can't book times that are already taken.
3.  **Instant Payments**: Users pay via Stripe *during* the booking flow.
4.  **Automated Emails**: Confirmation emails, reminders, and cancellations are handled automatically.
5.  **CMS Integration**: We can easily create a "Booking Block" in TinaCMS where you just paste your booking link.

---

## 3. Implementation Steps

### Phase 1: Setup (External)
1.  **Create Account**: Sign up for Cal.com (or Calendly).
2.  **Connect Stripe**: Link your Stripe account in the booking platform's "Apps" or "Integrations" section.
3.  **Create Event Types**: Create events like:
    -   "Beratungsgespräch (kostenlos)" (Free Consultation)
    -   "Dachinspektion (Pauschale)" (Roof Inspection - e.g., €150) -> *Enabling Stripe payment for this event.*
4.  **Get Embed Code**: Copy the "Embed" snippet or just the handle (e.g., `ivangs/dachinspektion`).

### Phase 2: CMS Integration (Coding)
We will add a new component to TinaCMS so you can easily place booking forms on any page.

#### 1. Create `BookingBlock` Component
We will create a new React component `src/blocks/BookingBlock.tsx` that uses the `cal.com` embed library (or generic iframe).

```tsx
// Example pseudo-code
import Cal, { getCalApi } from "@calcom/embed-react";

export const BookingBlock = ({ calLink }) => {
  return <Cal calLink={calLink} config={{theme: 'light'}} />;
};

// Or generic Iframe approach if preferred
export const IframeBlock = ({ url, height }) => (
  <iframe src={url} style={{ width: '100%', height: height, border: 'none' }} />
);
```

#### 2. Update TinaCMS Schema
Add a new block definition in `tina/config.ts`:

```typescript
const bookingBlock = {
  name: 'booking',
  label: '📅 Buchungskalender',
  fields: [
    { type: 'string', name: 'title', label: 'Titel (optional)' },
    { type: 'string', name: 'calLink', label: 'Cal.com Link/Handle', required: true },
    { type: 'string', name: 'description', label: 'Beschreibung' },
  ],
};
```

#### 3. Register Block
Add this block to the `Page` builder and `Home` singleton so it can be used anywhere.

## 4. Alternative: "Stripe Payment Links" (Simple Buttons)
If you **do not need time/date selection** and just want to sell a "Service Package" (e.g., "Buy Maintenance Package"), we can use **Stripe Payment Links**.

-   **Setup**: Create a "Product" in Stripe -> "Create Payment Link".
-   **Code**: We add a `paymentLink` field to your existing Service blocks.
-   **User Flow**: User clicks "Book Now" -> Redirects to full-screen Stripe Checkout -> Returns to website "Success" page.

## 5. Summary Recommendation
Since you mentioned "booking immediately", **Phase 2 (Booking Block)** is the robust solution. It solves the availability + payment problem in one go without requiring a complex backed migration.

**Next Steps:**
1.  Approve this plan.
2.  I will implement the `BookingBlock` in the code.
3.  You will need to set up the Cal.com + Stripe account (I can guide you).
