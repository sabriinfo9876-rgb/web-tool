# Web Developer Hub - Flutter Mobile App

Production-ready Flutter application for Google Play Store.

## Features Included:
1. **CSS Generator**: Box-shadow, border-radius, color controls with live interactive preview.
2. **Text Analyzer**: Real-time word, character, and sentence counters with case converter tools.
3. **Responsive Screen Resizer**: Live website tester with device preset viewports (Mobile, Tablet, Desktop).
4. **Firebase Firestore Cloud Vault**: Real-time synchronization and cloud storage for developer snippets.
5. **API Test Client**: Fast HTTP REST API tester.

## Getting Started:
1. Open this folder in VS Code or Android Studio.
2. Run `flutter pub get`
3. Connect your Android device or start an emulator.
4. Run `flutter run`

## Building for Play Store (AAB):
```bash
flutter build appbundle --release
```
Your release bundle will be created at `build/app/outputs/bundle/release/app-release.aab`.
