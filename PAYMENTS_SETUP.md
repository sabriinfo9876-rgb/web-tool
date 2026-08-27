# WebDevHub — Safepay Payment & Monetization Integration Guide

This guide documents the production-ready Safepay payment integration for **WebDevHub**, replacing legacy Stripe payments with a secure, Pakistan-compatible merchant gateway for Developer Pro and Team subscriptions.

---

## 1. Overview & Architecture

WebDevHub utilizes a secure, server-authoritative billing architecture:

```
┌─────────────────┐       ┌─────────────────┐       ┌──────────────────────┐
│  Client Browser │──────>│ WebDevHub Server│──────>│ Safepay Merchant API │
│  (React / SPA)  │<──────│   (Express.js)  │<──────│ (Sandbox / Production│
└─────────────────┘       └─────────────────┘       └──────────────────────┘
         │                         │                           │
         │                         │                           │
         ▼                         ▼                           ▼
┌─────────────────┐       ┌─────────────────┐       ┌──────────────────────┐
│ Safepay Hosted  │       │ Firestore DB &  │       │   Safepay Webhook    │
│ Checkout / Modal│──────>│ Server Quota DB │<──────│   (HMAC-SHA256 Sig)  │
└─────────────────┘       └─────────────────┘       └──────────────────────┘
```

### Security Directives:
1. **Never Expose Secrets**: Merchant secret keys (`SAFEPAY_SECRET_KEY`) and webhook secrets (`SAFEPAY_WEBHOOK_SECRET`) are stored strictly server-side and never bundled in client assets.
2. **Server-Authoritative Subscription State**: Pro and Team access is activated exclusively through verified Safepay webhook notifications (`payment.completed`, `order.completed`, `subscription.active`) or server-side tracker validation. Client-side parameters are never trusted for plan elevation.
3. **Cryptographic Webhook Verification**: All incoming webhooks are validated with HMAC-SHA256 signatures against `x-sfpy-signature` and `x-sfpy-timestamp`.
4. **Idempotency Guard**: Webhook event IDs and order trackers are tracked in an idempotency cache to prevent double-crediting or duplicate processing.

---

## 2. Plans & Pricing Structure

All prices and limits are configured centrally in `src/config/plans.js`:

| Plan Tier | Price | AI Operations Limit | Snippet Vault | GitHub Repair Engine |
| :--- | :--- | :--- | :--- | :--- |
| **FREE** | **$0 / month** | 74 operations / day | 5 Cloud Snippets | Read-only simulation |
| **PRO (Monthly)** | **$7.99 / month** | 200 ops/day (3,000/mo) | Unlimited | Automated PR & Signing |
| **PRO (Annual)** | **$59.00 / year** *(Save ~38%)* | 200 ops/day (3,000/mo) | Unlimited | Automated PR & Signing |
| **TEAM** | **$29.00 / month** | 1,000 ops/day (10,000/mo) | Unlimited (Shared) | Team PR branches & SLA |

---

## 3. Environment Variables Configuration

Configure the following variables in your hosting environment (Cloud Run, Vercel, or `.env`):

```bash
# Safepay Environment ('sandbox' or 'production')
SAFEPAY_ENV=sandbox

# Safepay Public Key (from Safepay Merchant Portal -> Developers -> API Keys)
SAFEPAY_PUBLIC_KEY=pub_sandbox_xxxxxxxxxxxxxxxxxxxx

# Safepay Secret Key (Server-only; NEVER commit to version control)
SAFEPAY_SECRET_KEY=sec_sandbox_xxxxxxxxxxxxxxxxxxxx

# Safepay Webhook Secret (from Webhook configuration endpoint)
SAFEPAY_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Safepay Base URL (Defaults to sandbox.api.getsafepay.com in sandbox)
SAFEPAY_BASE_URL=https://sandbox.api.getsafepay.com

# Safepay Subscription Plan IDs (Created in Safepay Merchant Dashboard -> Subscriptions)
SAFEPAY_PRO_MONTHLY_PLAN_ID=plan_pro_monthly_xxxxxxxx
SAFEPAY_PRO_ANNUAL_PLAN_ID=plan_pro_annual_xxxxxxxx
SAFEPAY_TEAM_PLAN_ID=plan_team_monthly_xxxxxxxx

# Application Public Host URL
APP_URL=https://web-tool-eta-orcin.vercel.app
```

---

## 4. Webhook Configuration in Safepay Dashboard

1. Log into your [Safepay Merchant Dashboard](https://merchant.getsafepay.com) (or sandbox equivalent).
2. Navigate to **Developers** &rarr; **Webhooks**.
3. Click **Add Webhook Endpoint**:
   - **URL**: `https://<your-domain>/api/safepay/webhook`
   - **Events to subscribe**:
     - `payment.completed`
     - `payment.failed`
     - `order.completed`
     - `tracker.completed`
     - `subscription.created`
     - `subscription.active`
     - `subscription.renewed`
     - `subscription.canceled`
     - `subscription.expired`
4. Copy the generated **Signing Secret** and assign it to `SAFEPAY_WEBHOOK_SECRET`.

---

## 5. API Endpoints Reference

### `POST /api/safepay/create-checkout-session`
Initiates a payment order or subscription checkout session.
- **Request Body**:
  ```json
  {
    "plan": "pro",
    "interval": "month",
    "userId": "user_uid_123",
    "userEmail": "developer@example.com",
    "successUrl": "https://webdevhub.app/#/billing/success",
    "cancelUrl": "https://webdevhub.app/#/billing/cancel"
  }
  ```
- **Response**:
  ```json
  {
    "configured": true,
    "url": "https://sandbox.api.getsafepay.com/components?beacon=trk_...",
    "token": "trk_...",
    "plan": "pro",
    "interval": "month"
  }
  ```

### `POST /api/safepay/webhook`
Receives and verifies real-time payment events from Safepay.
- **Headers**:
  - `x-sfpy-signature`: HMAC-SHA256 signature
  - `x-sfpy-timestamp`: Request timestamp
- **Behavior**:
  - Validates cryptographic signature
  - Checks event idempotency cache
  - Activates / renews / cancels user plan in server state and Firestore

### `GET /api/safepay/verify-tracker`
Server-to-server verification of a Safepay tracker token.
- **Query Params**: `?tracker=trk_...&userId=...`
- **Response**:
  ```json
  {
    "verified": true,
    "status": "active",
    "plan": "pro",
    "tracker": "trk_..."
  }
  ```

### `GET /api/safepay/subscription-status`
Returns the verified server-authoritative subscription status for the authenticated user.
- **Response**:
  ```json
  {
    "plan": "pro",
    "status": "active",
    "isPaid": true,
    "paymentProvider": "safepay",
    "currentPeriodEnd": 1756300000000
  }
  ```

### `POST /api/safepay/cancel-subscription`
Cancels user subscription at the end of the billing cycle.

---

## 6. Testing & Sandbox Verification

### Test Cases & Sandbox Scenarios:
1. **Free Tier Access**: Confirm that unauthenticated or free users can execute all 74 developer tools with 74 daily AI requests.
2. **Pro Monthly Checkout**: Test Safepay checkout flow for $7.99/mo.
3. **Pro Annual Checkout**: Test Safepay checkout flow for $59.00/yr.
4. **Webhook Signature Validation**: Test valid vs invalid `x-sfpy-signature` to ensure unauthorized requests are rejected (HTTP 400).
5. **Webhook Idempotency**: Send the same webhook event twice and verify it processes only once.
6. **Payment Failure**: Verify status sets to `past_due` or `failed` without elevating permissions.
7. **Cancellation Flow**: Ensure cancelled users retain access until `currentPeriodEnd`.
8. **Direct Tracker Validation**: Verify `/api/safepay/verify-tracker` updates server status upon checkout completion.

---

## 7. Production Go-Live Checklist

- [ ] Switch `SAFEPAY_ENV=production` in production environment variables.
- [ ] Add production `SAFEPAY_PUBLIC_KEY` and `SAFEPAY_SECRET_KEY`.
- [ ] Create production subscription plans in Safepay Dashboard and update plan IDs.
- [ ] Register production webhook endpoint in Safepay Merchant Dashboard.
- [ ] Verify SSL certificate and ensure HTTPS is enforced.
- [ ] Execute test transaction with a live card to confirm end-to-end receipt.
