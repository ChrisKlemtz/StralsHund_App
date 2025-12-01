# 🐕 StralsHund

**Die Community-App für Hundebesitzer in städtischen Gebieten**

StralsHund verbindet Hundebesitzer, hilft Gassi-Routen zu teilen, hundefreundliche Orte zu finden und bietet private Grundstücke als Hundetreffplätze an.

---

## 🌟 Features (MVP Phase 1)

### Kernfeatures
- 🗺️ **Gassi-Routen Management** - Erstelle, teile und bewerte Routen
- 🏡 **Private Hundetreffplätze** - Biete dein Grundstück an oder buche Plätze
- 📍 **Hundefreundliche Orte** - Finde Restaurants, Cafés, Tierärzte & mehr
- 👥 **Community Meetups** - Organisiere Treffen mit anderen Hundebesitzern
- 🆘 **Lost & Found System** - Hilfe bei vermissten Hunden

### Geplante Features (Phase 2+)
- 📊 Activity Tracking & Statistiken
- 🎮 Gamification & Badges
- 💬 Social Feed
- 🌦️ Wetter-Integration
- ⭐ Premium-Features

---

## 🏗️ Projekt-Struktur

```
StralsHund/
├── backend/              # Node.js Backend API
│   ├── src/
│   │   ├── config/      # Datenbank & Config
│   │   ├── models/      # Mongoose Models (User, DogSpot, Route, Meetup)
│   │   ├── routes/      # API Routes
│   │   ├── controllers/ # Business Logic
│   │   ├── middleware/  # Auth (JWT), Error Handling
│   │   └── utils/       # Logger, Token Generator
│   ├── .env             # Environment Variables (erstellt aus .env.example)
│   ├── Dockerfile
│   └── package.json
│
├── mobile/              # React Native App (Expo)
│   ├── src/
│   │   ├── components/  # UI Components (Button, Input, Card)
│   │   ├── screens/     # App Screens (Auth, Main)
│   │   │   ├── auth/   # Onboarding, Login, Register
│   │   │   └── main/   # Home, Explore, Meetups, Messages, Profile
│   │   ├── navigation/  # React Navigation Setup
│   │   ├── theme/       # Design System (Colors, Typography, Spacing)
│   │   ├── store/       # Zustand State Management
│   │   └── api/         # API Config & Axios Client
│   ├── App.js
│   ├── app.json
│   └── package.json
│
├── docker-compose.yml   # MongoDB + Redis Setup
├── SETUP.md            # Detaillierte Setup-Anleitung
└── README.md
```

---

## 🚀 Schnellstart

> **Tipp:** Für eine detaillierte Schritt-für-Schritt-Anleitung, siehe [SETUP.md](SETUP.md)

### Voraussetzungen

- **Node.js** >= 18.0.0 ✅
- **Docker Desktop** (für MongoDB & Redis) ✅
- **WSL2** (falls Windows)
- **Expo Go App** auf Smartphone (iOS/Android)

### Installation in 5 Schritten

#### 1️⃣ Docker Desktop installieren & starten

Download: https://www.docker.com/products/docker-desktop/

**Wichtig:** Warte bis Docker läuft (grüner "Engine running" Status)

#### 2️⃣ MongoDB & Redis starten

```bash
docker-compose up -d mongodb redis
```

Prüfen:
```bash
docker-compose ps
# Sollte zeigen: stralshund-mongodb (Up), stralshund-redis (Up)
```

#### 3️⃣ Backend Dependencies & Start

```bash
cd backend
npm install
npm run dev
```

✅ Backend läuft auf: **http://localhost:5000**
✅ Test: http://localhost:5000/health

#### 4️⃣ Mobile App Dependencies installieren

```bash
cd mobile
npm install --legacy-peer-deps
```

#### 5️⃣ Mobile App starten

```bash
npm start
```

**Dann:**
- 📱 **Smartphone:** Scanne QR-Code mit [Expo Go App](https://expo.dev/client)
- 🌐 **Browser:** Drücke `w` für Web-Version (http://localhost:19006)

---

## 🐳 Docker Befehle

```bash
# Alle Container starten
docker-compose up -d

# Nur MongoDB & Redis
docker-compose up -d mongodb redis

# Container stoppen
docker-compose down

# Logs anzeigen
docker-compose logs -f mongodb
```

**Container:**
- MongoDB: Port `27017` (User: `admin`, Password: `stralshund123`)
- Redis: Port `6379`
- Backend: Port `5000` (nur wenn via Docker gestartet)

---

## 📱 Mobile App - Testing Optionen

### Option 1: Web-Browser (Empfohlen für schnelles Testen)
```bash
cd mobile
npm start
# Drücke 'w' im Terminal
```
Öffnet: http://localhost:19006

### Option 2: Expo Go App (Echtes Mobile Feeling)
1. **Installiere Expo Go:**
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
2. **Scanne QR-Code** aus dem Terminal
3. App lädt auf deinem Smartphone

### Option 3: iOS Simulator (macOS only)
```bash
npm run ios
```

### Option 4: Android Emulator (Android Studio required)
```bash
npm run android
```

---

## ⚙️ Konfiguration

### Backend Environment Variables

Die `.env` Datei im Backend ist bereits vorkonfiguriert. Wichtigste Werte:

```env
# Datenbank
MONGODB_URI=mongodb://admin:stralshund123@localhost:27017/stralshund?authSource=admin

# JWT Secrets (IN PRODUKTION ÄNDERN!)
JWT_SECRET=super-secret-jwt-key-change-in-production-12345
JWT_REFRESH_SECRET=super-refresh-token-secret-67890

# Server
PORT=5000
NODE_ENV=development
```

### Mobile App API Config

Die App verbindet sich automatisch mit dem Backend:
- **WSL/Physisches Gerät:** `http://172.29.40.113:5000/api/v1`
- **Android Emulator:** `http://10.0.2.2:5000/api/v1`
- **Web/iOS:** `http://localhost:5000/api/v1`

Config-Datei: [mobile/src/api/config.js](mobile/src/api/config.js)

---

## 🎨 Design System

Das komplette Design System findest du in [mobile/design-system.md](mobile/design-system.md).

### Farbpalette
- **Primary:** `#FF7A00` (Energetic Orange) - Freundlich, warm, aktiv
- **Secondary:** `#0085FF` (Trustworthy Blue) - Vertrauen, Sicherheit
- **Success:** `#10B981` (Green)
- **Error:** `#EF4444` (Red)
- **Warning:** `#F59E0B` (Yellow)

### UI Komponenten
Alle in `/mobile/src/components/`:
- **Button** - Primary, Secondary, Ghost, Danger Varianten
- **Input** - Mit Icons, Password Toggle, Validation
- **Card** - Verschiedene Elevations

### Typography
- **Font:** Inter (modern, clean)
- **Sizes:** 12px - 48px
- **Weights:** Light bis Extrabold

---

## 🔑 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication
```
POST   /auth/register          # Neue User registrieren
POST   /auth/login             # Login
POST   /auth/logout            # Logout (benötigt Token)
POST   /auth/refresh-token     # Access Token erneuern
POST   /auth/forgot-password   # Passwort vergessen
POST   /auth/reset-password/:token  # Passwort zurücksetzen
GET    /auth/me                # Aktueller User (benötigt Token)
```

### Users (Coming Soon)
```
GET    /users/me               # Eigenes Profil
PUT    /users/me               # Profil aktualisieren
POST   /users/me/dogs          # Hund hinzufügen
```

### Routes (Coming Soon)
```
GET    /routes                 # Alle Routen
POST   /routes                 # Route erstellen
GET    /routes/:id             # Route Details
```

### Dog Spots (Coming Soon)
```
GET    /dog-spots              # Alle Spots
POST   /dog-spots              # Spot erstellen
GET    /dog-spots/:id          # Spot Details
```

### Meetups (Coming Soon)
```
GET    /meetups                # Alle Meetups
POST   /meetups                # Meetup erstellen
```

---

## 📦 Technologie-Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.x
- **Datenbank:** MongoDB 7.0 mit Mongoose ODM
- **Caching:** Redis 7
- **Auth:** JWT (Access + Refresh Tokens)
- **Logging:** Winston
- **Security:** Helmet, CORS, bcrypt, Rate Limiting

### Mobile App
- **Framework:** React Native 0.73 (Expo 50)
- **Navigation:** React Navigation 6
- **State Management:** Zustand
- **API Client:** Axios + React Query
- **UI:** Custom Design System
- **Icons:** Lucide React Native
- **Maps:** React Native Maps (planned)

### DevOps
- **Container:** Docker & Docker Compose
- **Version Control:** Git
- **Package Manager:** npm

---

## 🧪 Testing

```bash
# Backend Tests (Coming Soon)
cd backend
npm test

# Mobile Tests (Coming Soon)
cd mobile
npm test
```

---

## 🐛 Troubleshooting

### Backend startet nicht
```bash
# Prüfe ob MongoDB läuft
docker-compose ps

# MongoDB neu starten
docker-compose restart mongodb

# Logs checken
docker-compose logs mongodb
```

### Mobile App: "Request Timeout"

**Für WSL + Physisches Gerät:**
1. Finde WSL IP: `hostname -I | awk '{print $1}'`
2. Aktualisiere `mobile/src/api/config.js` mit deiner IP
3. Öffne Windows Firewall für Port 5000:
   ```powershell
   # In PowerShell als Administrator:
   New-NetFirewallRule -DisplayName "WSL Node Backend" -Direction Inbound -LocalPort 5000 -Protocol TCP -Action Allow
   ```

**Alternative:** Nutze Expo Tunnel-Modus:
```bash
npx expo start --tunnel
```

### "Port already in use"
```bash
# Backend Port ändern
# In backend/.env: PORT=5001

# Expo Port ändern
npx expo start --port 19001
```

---

## 🗺️ Roadmap

### ✅ Phase 1 - MVP Setup (Abgeschlossen!)
- [x] Backend Setup mit Express & MongoDB
- [x] Datenbank Models (User, DogSpot, Route, Meetup)
- [x] JWT Authentication System
- [x] Mobile App Grundstruktur
- [x] Modernes Design System
- [x] Onboarding & Auth Screens
- [x] Navigation (5 Tabs)
- [x] Docker Setup

### 📋 Phase 2 - Core Features (In Arbeit)
- [ ] **Gassi-Routen Feature**
  - [ ] Routen erstellen & speichern
  - [ ] Karten-Integration
  - [ ] Route bewerten & kommentieren
- [ ] **Dog Spots Feature**
  - [ ] Spot erstellen als Gastgeber
  - [ ] Spot buchen als Besucher
  - [ ] Buchungs-Kalender
  - [ ] Bezahl-Integration (Stripe)
- [ ] **Meetups Feature**
  - [ ] Meetup erstellen
  - [ ] Teilnehmer-Management
  - [ ] Chat-Funktion

### 🚀 Phase 3 - Advanced Features
- [ ] Activity Tracking & Statistiken
- [ ] Social Feed
- [ ] Lost & Found System
- [ ] Wetter-Integration
- [ ] Push Notifications
- [ ] Premium Features

### 🌍 Phase 4 - Growth
- [ ] Admin Dashboard
- [ ] Multi-Stadt Support
- [ ] Internationalisierung (i18n)
- [ ] App Store Deployment

---

## 🤝 Mitwirken

Contributions sind willkommen!

### Development Workflow
1. Fork das Repository
2. Feature Branch erstellen: `git checkout -b feature/amazing-feature`
3. Änderungen committen: `git commit -m 'Add amazing feature'`
4. Push to Branch: `git push origin feature/amazing-feature`
5. Pull Request erstellen

---

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details

---

## 📞 Kontakt & Support

- **Projekt:** StralsHund - Community App für Hundebesitzer
- **Dokumentation:** [SETUP.md](SETUP.md) für detaillierte Setup-Anleitung
- **Design:** [mobile/design-system.md](mobile/design-system.md)

---

## 💡 Nächste Schritte

Nach dem erfolgreichen Setup:

1. **Teste die App** - Registriere einen Test-Account
2. **Erkunde den Code** - Sieh dir die Struktur an
3. **Design anpassen** - Farben in `mobile/src/theme/colors.js`
4. **Features bauen** - Starte mit Routes oder Dog Spots
5. **API testen** - Nutze Postman oder curl

**Viel Erfolg mit StralsHund! 🐕**

---

**Made with ❤️ for dog lovers**

🐾 StralsHund - Deine Community-App für Hundebesitzer
