# E2E Testkatalog - Holos App

## Einleitung
Dieser Testkatalog dokumentiert die End-to-End Testfälle für die Holos App, beginnend mit den kritischen Funktionen Registrierung und Login. Die Tests werden mit Playwright durchgeführt.

## Testumgebung
- URL: http://localhost:5173/
- Browser: Chrome (neueste Version), Edge
- Test Framework: Playwright
- Viewport: 1920x1080px

## 1. Registrierung

## Testfälle

### TC-REG-001: Erfolgreiche Registrierung mit allen Pflichtfeldern
**Priorität:** Hoch
**Vorbedingung:** Registrierungsseite ist geöffnet
**Schritte:**
1. Vorname "Max Mustermann" eingeben
2. E-Mail "test@example.com" eingeben
3. Geburtsdatum "01.01.2000" eingeben
4. Gewicht "75" eingeben
5. Größe "180" eingeben
6. Geschlecht "Männlich" auswählen
7. Passwort "Test123!" eingeben
8. Passwort bestätigen "Test123!" eingeben
9. "Register" Button klicken
**Erwartetes Ergebnis:**
- Erfolgsmeldung wird angezeigt
- Weiterleitung zum Login
- Alle eingegebenen Daten wurden korrekt gespeichert

### TC-REG-002: Validierung des Mindestalters
**Priorität:** Hoch
**Schritte:**
1. Alle Felder korrekt ausfüllen
2. Geburtsdatum weniger als 16 Jahre in der Vergangenheit eingeben
3. "Register" Button klicken
**Erwartetes Ergebnis:**
- Fehlermeldung "Du musst mindestens 16 Jahre alt sein!"
- Registrierung wird verhindert

### TC-REG-003: Passwort-Validierung
**Priorität:** Hoch
**Schritte:**
1. Alle Felder korrekt ausfüllen
2. Passwort ohne Großbuchstaben eingeben
3. "Register" Button klicken
**Erwartetes Ergebnis:**
- Fehlermeldung "Passwort muss mindestens einen Großbuchstaben enthalten"
- Registrierung wird verhindert

### TC-REG-004: E-Mail-Validierung
**Priorität:** Hoch
**Schritte:**
1. Alle Felder korrekt ausfüllen
2. Ungültige E-Mail "test@" eingeben
3. "Register" Button klicken
**Erwartetes Ergebnis:**
- Fehlermeldung "Invalid email address"
- Registrierung wird verhindert

### TC-REG-005: Gewichts-Validierung
**Priorität:** Mittel
**Schritte:**
1. Alle Felder korrekt ausfüllen
2. Ungültiges Gewicht "abc" eingeben
3. "Register" Button klicken
**Erwartetes Ergebnis:**
- Fehlermeldung "Gewicht muss eine Zahl sein"
- Registrierung wird verhindert

### TC-REG-006: Größen-Validierung
**Priorität:** Mittel
**Schritte:**
1. Alle Felder korrekt ausfüllen
2. Ungültige Größe "abc" eingeben
3. "Register" Button klicken
**Erwartetes Ergebnis:**
- Fehlermeldung "Größe muss eine Zahl sein"
- Registrierung wird verhindert

### TC-REG-007: Pflichtfeld-Validierung
**Priorität:** Hoch
**Schritte:**
1. Keine Felder ausfüllen
2. "Register" Button klicken
**Erwartetes Ergebnis:**
- Fehlermeldungen für alle Pflichtfelder
- Registrierung wird verhindert

### TC-REG-008: Navigation zum Login
**Priorität:** Niedrig
**Schritte:**
1. Auf "Zurück zur Loginseite" Link klicken
**Erwartetes Ergebnis:**
- Weiterleitung zur Login-Seite

## Edge Cases und Grenzwerte

- Maximale Länge des Vornamens testen
- Extrem hohe/niedrige Werte für Gewicht und Größe
- Spezielle Zeichen in E-Mail-Adresse
- Geburtsdatum in der Zukunft
- Sehr lange Passwörter (24 Zeichen)

## Wichtige Hinweise

- Tests in verschiedenen Browsern durchführen
- Responsive Design auf verschiedenen Viewport-Größen testen
- Barrierefreiheit (Tab-Navigation, Screen Reader) testen
- Server-Antworten und Fehlermeldungen validieren

## 2. Login

### TC-LOGIN-001: Erfolgreicher Login
**Priorität:** Hoch
**Vorbedingung:** Login-Seite ist geöffnet
**Schritte:**
1. E-Mail "test@example.com" eingeben
2. Passwort "Test123!" eingeben
3. "Login" Button klicken
**Erwartetes Ergebnis:**
- Erfolgreiche Weiterleitung zum Dashboard
- Erfolgsmeldung wird angezeigt

### TC-LOGIN-002: Ungültige E-Mail
**Priorität:** Hoch
**Schritte:**
1. Ungültige E-Mail "test@" eingeben
2. Passwort "Test123!" eingeben
3. "Login" Button klicken
**Erwartetes Ergebnis:**
- Fehlermeldung "Invalid email address"
- Login wird verhindert

### TC-LOGIN-003: Nicht registrierte E-Mail
**Priorität:** Hoch
**Schritte:**
1. Nicht registrierte E-Mail "nonexistent@example.com" eingeben
2. Passwort "Test123!" eingeben
3. "Login" Button klicken
**Erwartetes Ergebnis:**
- Fehlermeldung "Email ist nicht registriert"
- Login wird verhindert

### TC-LOGIN-004: Falsches Passwort
**Priorität:** Hoch
**Schritte:**
1. E-Mail "test@example.com" eingeben
2. Falsches Passwort "WrongPass123!" eingeben
3. "Login" Button klicken
**Erwartetes Ergebnis:**
- Fehlermeldung über ungültiges Passwort
- Login wird verhindert

### TC-LOGIN-005: Leere Pflichtfelder
**Priorität:** Hoch
**Schritte:**
1. Keine Felder ausfüllen
2. "Login" Button klicken
**Erwartetes Ergebnis:**
- Fehlermeldungen für fehlende E-Mail und Passwort
- Login wird verhindert

### TC-LOGIN-006: Navigation zur Registrierung
**Priorität:** Niedrig
**Schritte:**
1. Auf "Registrieren" Link klicken
**Erwartetes Ergebnis:**
- Weiterleitung zur Registrierungsseite

## 3. Mental Health Page

### TC-MH-001: Journal-Eintrag speichern
**Priorität:** Hoch
**Vorbedingung:** Mental Health Page ist geöffnet und Benutzer ist eingeloggt
**Schritte:**
1. Datum im Kalender auswählen
2. Text in das Journal-Textfeld eingeben
3. "Speichern" Button klicken
**Erwartetes Ergebnis:**
- Erfolgsmeldung wird angezeigt
- Journal-Eintrag wird gespeichert und im Kalender markiert

### TC-MH-002: Journal-Eintrag laden
**Priorität:** Hoch
**Vorbedingung:** Mental Health Page ist geöffnet und Benutzer ist eingeloggt
**Schritte:**
1. Datum im Kalender auswählen, für das ein Eintrag existiert
**Erwartetes Ergebnis:**
- Journal-Textfeld wird mit dem gespeicherten Eintrag gefüllt

### TC-MH-003: Meditationstimer starten
**Priorität:** Mittel
**Vorbedingung:** Mental Health Page ist geöffnet
**Schritte:**
1. Timer starten
**Erwartetes Ergebnis:**
- Timer beginnt zu zählen

### TC-MH-004: Sound abspielen
**Priorität:** Mittel
**Vorbedingung:** Mental Health Page ist geöffnet
**Schritte:**
1. Sound im SoundForm auswählen und abspielen
**Erwartetes Ergebnis:**
- Ausgewählter Sound wird abgespielt