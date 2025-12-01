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
- Und vieles mehr...

---

## 🏗️ Projekt-Struktur

```
StralsHund/
├── backend/              # Node.js Backend API
│   ├── src/
│   │   ├── config/      # Datenbank & Config
│   │   ├── models/      # Mongoose Models
│   │   ├── routes/      # API Routes
│   │   ├── controllers/ # Business Logic
│   │   ├── middleware/  # Auth, Error Handling
│   │   └── utils/       # Helper Functions
│   ├── Dockerfile
│   └── package.json
│
├── mobile/              # React Native App
│   ├── src/
│   │   ├── components/  # Reusable UI Components
│   │   ├── screens/     # App Screens
│   │   ├── navigation/  # Navigation Setup
│   │   ├── theme/       # Design System
│   │   ├── store/       # State Management (Zustand)
│   │   └── api/         # API Client
│   ├── App.js
│   └── package.json
│
├── admin/               # Web Admin Dashboard (Coming Soon)
├── docker-compose.yml   # Docker Setup
└── README.md
```

---

## 🚀 Schnellstart

### Voraussetzungen

- **Node.js** >= 18.0.0
- **npm** oder **yarn**
- **Docker** & **Docker Compose** (empfohlen)
- **Expo CLI** für Mobile-Entwicklung
- **MongoDB** (läuft über Docker)

### Installation

#### 1. Repository klonen
```bash
cd StralsHund
```

#### 2. Dependencies installieren
```bash
npm run install-all
```

Oder manuell:
```bash
# Backend
cd backend && npm install

# Mobile
cd ../mobile && npm install
```

#### 3. Environment Variables
```bash
# Backend
cd backend
cp .env.example .env
# Bearbeite .env mit deinen Credentials
```

#### 4. Datenbank starten (Docker)
```bash
# Im Root-Verzeichnis
docker-compose up -d mongodb redis
```

#### 5. Backend starten
```bash
cd backend
npm run dev
```

Backend läuft jetzt auf [http://localhost:5000](http://localhost:5000)

#### 6. Mobile App starten
```bash
cd mobile
npm start
```

Scanne den QR-Code mit der **Expo Go App**:
- iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
- Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

---

## 🐳 Docker Setup (Empfohlen)

### Alle Services starten
```bash
docker-compose up -d
```

Das startet:
- MongoDB auf Port `27017`
- Redis auf Port `6379`
- Backend API auf Port `5000`

### Services stoppen
```bash
docker-compose down
```

### Logs anzeigen
```bash
docker-compose logs -f backend
```

---

## 📱 Mobile App - Entwicklung

### iOS Simulator
```bash
cd mobile
npm run ios
```

### Android Emulator
```bash
cd mobile
npm run android
```

### Web (Entwicklung)
```bash
cd mobile
npm run web
```

---

## 🎨 Design System

Das komplette Design System findest du in [mobile/design-system.md](mobile/design-system.md).

### Farbpalette
- **Primary:** Orange (`#FF7A00`) - Energetisch, freundlich
- **Secondary:** Blau (`#0085FF`) - Vertrauenswürdig
- **Accent Colors:** Grün (Success), Rot (Danger), Gelb (Premium)

### Komponenten
- Alle UI-Komponenten in `/mobile/src/components/`
- Vordefinierte Buttons, Inputs, Cards, etc.
- Konsistentes Spacing (8pt Grid)
- Moderne Shadows & Elevations

---

## 🔑 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication
```
POST   /auth/register      # Registrierung
POST   /auth/login         # Login
POST   /auth/logout        # Logout
POST   /auth/refresh-token # Token erneuern
GET    /auth/me            # Aktueller User
```

### Users
```
GET    /users/me           # Eigenes Profil
PUT    /users/me           # Profil aktualisieren
```

### Routes (Gassi-Routen)
```
GET    /routes             # Alle Routen
POST   /routes             # Route erstellen
```

### Dog Spots (Private Treffplätze)
```
GET    /dog-spots          # Alle Spots
POST   /dog-spots          # Spot erstellen
```

### Meetups
```
GET    /meetups            # Alle Meetups
POST   /meetups            # Meetup erstellen
```

Vollständige API-Dokumentation: Coming soon (Swagger)

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Mobile Tests
```bash
cd mobile
npm test
```

---

## 📦 Technologie-Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Datenbank:** MongoDB mit Mongoose
- **Caching:** Redis
- **Auth:** JWT + OAuth2 (Google, Apple, Facebook)
- **File Upload:** Cloudinary/AWS S3
- **Payment:** Stripe

### Mobile
- **Framework:** React Native (Expo)
- **Navigation:** React Navigation
- **State Management:** Zustand
- **API Client:** Axios + React Query
- **Maps:** React Native Maps
- **UI:** Custom Components + Lucide Icons

### DevOps
- **Container:** Docker & Docker Compose
- **Hosting:** TBD (AWS/DigitalOcean/Railway)
- **CI/CD:** GitHub Actions

---

## 🤝 Mitwirken

Dieses Projekt befindet sich noch in der Entwicklung. Contributions sind willkommen!

### Development Workflow
1. Feature Branch erstellen: `git checkout -b feature/dein-feature`
2. Änderungen committen: `git commit -m "Add: Dein Feature"`
3. Push to Branch: `git push origin feature/dein-feature`
4. Pull Request erstellen

---

## 📄 Lizenz

MIT License - Siehe [LICENSE](LICENSE) für Details

---

## 📞 Kontakt

**StralsHund Team**
- Website: Coming soon
- Email: info@stralshund.de
- GitHub: [github.com/yourusername/stralshund](https://github.com/yourusername/stralshund)

---

## 🗺️ Roadmap

### ✅ Phase 1 - MVP (Q1 2024)
- [x] Backend Setup
- [x] Datenbank Models
- [x] Auth System
- [x] Mobile App Grundstruktur
- [x] Design System
- [ ] Gassi-Routen Feature
- [ ] Dog Spots Feature
- [ ] Meetups Feature

### 📋 Phase 2 - Core Features (Q2 2024)
- [ ] Activity Tracking
- [ ] Social Feed
- [ ] Lost & Found System
- [ ] Wetter-Integration
- [ ] Push Notifications

### 🚀 Phase 3 - Growth (Q3 2024)
- [ ] Premium Features
- [ ] Gamification
- [ ] Admin Dashboard
- [ ] Payment Integration
- [ ] Multi-Stadt Support

---

**Made with ❤️ for dog lovers**

🐾 StralsHund - Deine Community-App für Hundebesitzer
