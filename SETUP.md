# 🚀 StralsHund Setup Guide

## Schnellstart in 5 Schritten

### 1️⃣ MongoDB & Redis starten (Docker)

**WICHTIG:** Starte zuerst die Datenbank!

```bash
# Im Root-Verzeichnis (/StralsHund)
docker-compose up -d mongodb redis
```

Prüfe, ob MongoDB läuft:
```bash
docker-compose ps
```

Du solltest sehen:
```
NAME                   STATUS
stralshund-mongodb     Up
stralshund-redis       Up
```

### 2️⃣ Backend Dependencies installieren

```bash
cd backend
npm install
```

### 3️⃣ Backend starten

```bash
npm run dev
```

✅ **Erfolg:** Du siehst:
```
✅ MongoDB Connected: localhost
🚀 Server running in development mode on port 5000
```

**Backend läuft jetzt auf:** [http://localhost:5000](http://localhost:5000)

Test: [http://localhost:5000/health](http://localhost:5000/health)

---

### 4️⃣ Mobile App Dependencies installieren

```bash
# Neues Terminal öffnen
cd mobile
npm install --legacy-peer-deps
```

### 5️⃣ Mobile App starten

```bash
npm start
```

Dann:
- 📱 **Smartphone:** Scanne QR-Code mit **Expo Go** App
  - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
  - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- 🖥️ **Simulator:** Drücke `i` für iOS oder `a` für Android

---

## 🐛 Troubleshooting

### Problem: "MongoDB connection failed"

**Lösung:** MongoDB läuft nicht. Starte Docker:
```bash
docker-compose up -d mongodb redis
```

### Problem: "Port 5000 already in use"

**Lösung:** Anderer Prozess blockiert Port. Ändere in [backend/.env](backend/.env):
```env
PORT=5001
```

### Problem: "npm install" Fehler bei Mobile

**Lösung:** Verwende das `--legacy-peer-deps` Flag:
```bash
cd mobile
npm install --legacy-peer-deps
```

### Problem: Backend startet, aber keine DB-Verbindung

**Prüfe MongoDB-Status:**
```bash
docker-compose logs mongodb
```

**Prüfe .env Datei:**
```bash
cat backend/.env | grep MONGODB_URI
```

Sollte sein:
```
MONGODB_URI=mongodb://admin:stralshund123@localhost:27017/stralshund?authSource=admin
```

---

## 📦 Alles neu installieren

Falls etwas schief geht, cleanup:

```bash
# Im Root-Verzeichnis

# Backend cleanup
cd backend
rm -rf node_modules package-lock.json
npm install

# Mobile cleanup
cd ../mobile
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Docker cleanup (ACHTUNG: Löscht alle Daten!)
docker-compose down -v
docker-compose up -d mongodb redis
```

---

## 🔑 Environment Variables

Die Datei [backend/.env](backend/.env) wurde bereits erstellt mit:
- ✅ MongoDB Verbindung
- ✅ JWT Secrets
- ✅ Basis-Konfiguration

Für Produktion MUSST du ändern:
- `JWT_SECRET` - Neues Secret generieren
- `JWT_REFRESH_SECRET` - Neues Secret generieren
- API Keys für: Email, OAuth, Cloudinary, Stripe, etc.

---

## 🎯 Nächste Schritte

1. **Backend läuft?** → Teste die API mit `curl http://localhost:5000/health`
2. **Mobile läuft?** → Öffne die App in Expo Go
3. **Alles läuft?** → Registriere einen Test-Account in der App!

---

## 📚 Weitere Ressourcen

- [README.md](README.md) - Vollständige Dokumentation
- [Design System](mobile/design-system.md) - UI/UX Guide
- [Docker Compose](docker-compose.yml) - Container Setup

---

**Happy Coding! 🐕**
