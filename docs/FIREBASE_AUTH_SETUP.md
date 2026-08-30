# Firebase Authentication & Production Setup Guide

This document explains how Firebase Authentication is integrated in **Web Developer Hub** and how to configure authorized domains, OAuth providers, and sandbox testing.

---

## 1. Firebase Authentication Architecture

Web Developer Hub uses standard Firebase v10 Client SDK (`firebase/auth` and `firebase/firestore`) coupled with a server-side verified entitlement engine in `server.ts`.

### Features
- **Email & Password Authentication**: Full sign-in and sign-up with real-time Firestore user profiles.
- **Google OAuth Sign-In**: Integrated with `GoogleAuthProvider` supporting both popup and redirect fallback.
- **Preview & Iframe Resilience**: Automatic detection of iframe sandbox limitations and popup blockers with helpful diagnostics and copyable domain utility.
- **Deterministic Sandbox Accounts**: Instant 1-click accounts for development and testing:
  - **Ada Lovelace** (Free Developer Tier — 68 tools, 74 AI ops/day)
  - **Alan Turing** (Pro Developer Tier — 74 tools including GitHub Automated PRs, 3,000 AI ops/month)

---

## 2. Resolving Preview Errors

### A. `auth/unauthorized-domain`
This error occurs when Firebase Auth is invoked from a domain that has not yet been whitelisted in the Firebase Console.

#### Solution:
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Select your project: **`yielding-xenops-dxctm`** (or your custom project).
3. Navigate to **Authentication** > **Settings** tab > **Authorized domains**.
4. Click **Add domain**.
5. Paste your preview hostname (e.g. `*.run.app`, `localhost`, or your production custom domain).
6. Click **Save**.

---

### B. `auth/popup-blocked`
This error occurs when browser security policies or container iframes block modal popup windows from spawning.

#### Solution:
- Web Developer Hub automatically catches `auth/popup-blocked` and falls back to `signInWithRedirect()`.
- Alternatively, open the app in a new browser tab or use the 1-click Developer Sandbox login buttons.

---

## 3. Environment Variables Configuration

For custom Firebase projects, you can configure the client via `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_DATABASE_ID=your_firestore_database_id
```

If not provided, the application safely falls back to `firebase-applet-config.json`.

---

## 4. Firestore Security Rules

All user documents are stored in the `/users/{userId}` collection. The security rules ensure:
- Users can read and write only their own profile data.
- System subscriptions and quotas are verified server-side on API calls.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
