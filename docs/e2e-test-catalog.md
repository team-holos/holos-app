# **E2E Testkatalog - Holos App**  
## **Einleitung**  
Dieser Testkatalog dokumentiert die End-to-End-Testfälle für die Holos App. Die Tests werden mit **Playwright** durchgeführt und prüfen die Kernfunktionen der App, von Registrierung und Login bis hin zur Nutzung der Workout-Seite.

---

## **Testumgebung**
- **URL:** `http://localhost:5173/`
- **Browser:** Chrome (neueste Version), Edge
- **Test Framework:** Playwright
- **Viewport:** 1920x1080px
- **Datenbank-Setup:** Vor jedem Test werden saubere Testdaten verwendet
- **Pipeline-Integration:** Tests müssen sowohl lokal als auch in der CI/CD-Pipeline erfolgreich durchlaufen.

---

## **1. Registrierung**

### **TC-REG-001: Erfolgreiche Registrierung mit allen Pflichtfeldern**  
**Priorität:** Hoch  
**Vorbedingung:** Registrierungsseite ist geöffnet  
**Schritte:**  
1. Vorname „Max Mustermann“ eingeben  
2. E-Mail „test@example.com“ eingeben  
3. Geburtsdatum „01.01.2000“ eingeben  
4. Gewicht „75“ eingeben  
5. Größe „180“ eingeben  
6. Geschlecht „Männlich“ auswählen  
7. Passwort „Test123!“ eingeben  
8. Passwort bestätigen „Test123!“ eingeben  
9. „Register“ Button klicken  
**Erwartetes Ergebnis:**  
- Erfolgsmeldung wird angezeigt  
- Weiterleitung zum Login  
- Alle eingegebenen Daten wurden korrekt gespeichert  

### **TC-REG-002 bis TC-REG-008: Validierungen & Edge Cases**  
(Siehe Original-Katalog, bleibt unverändert)

---

## **2. Login**

### **TC-LOGIN-001: Erfolgreiches Login**
**Priorität:** Hoch  
**Vorbedingung:** Der Benutzer hat sich registriert.  
**Schritte:**  
1. Login-Seite aufrufen  
2. E-Mail „test@example.com“ eingeben  
3. Passwort „Test123!“ eingeben  
4. „Login“ Button klicken  
**Erwartetes Ergebnis:**  
- Nutzer wird auf das Dashboard weitergeleitet  
- Session bleibt nach einem Seiten-Reload erhalten  

### **TC-LOGIN-002: Falsches Passwort**
**Priorität:** Hoch  
**Schritte:**  
1. E-Mail „test@example.com“ eingeben  
2. Passwort „falschesPasswort“ eingeben  
3. „Login“ Button klicken  
**Erwartetes Ergebnis:**  
- Fehlermeldung „Falsche E-Mail oder Passwort“  
- Login wird verhindert  

---

## **3. Workout-Tracking**

### **TC-WORKOUT-001: Navigation zur Workout-Seite**  
**Priorität:** Mittel  
**Vorbedingung:** Der Benutzer ist eingeloggt.  
**Schritte:**  
1. Dashboard öffnen  
2. Auf „Workout“ in der Navigation klicken  
**Erwartetes Ergebnis:**  
- Die Workout-Seite wird geladen  

### **TC-WORKOUT-002: Nutzer kann ein Workout eintragen**  
**Priorität:** Hoch  
**Vorbedingung:** Der Benutzer ist eingeloggt und auf der Workout-Seite.  
**Schritte:**  
1. „Neues Workout hinzufügen“ klicken  
2. Datum auswählen (z. B. „10.03.2025“)  
3. Eine Übung auswählen (z. B. „Bankdrücken“)  
4. Anzahl der Sätze „4“ eingeben  
5. Wiederholungen pro Satz „10“ eingeben  
6. Gewicht „80 kg“ eingeben  
7. „Speichern“ klicken  
**Erwartetes Ergebnis:**  
- Workout wird in der Liste angezeigt  
- Daten bleiben nach einem Seiten-Reload erhalten  

### **TC-WORKOUT-003: Validierung von Workout-Daten**  
**Priorität:** Hoch  
**Schritte:**  
1. „Neues Workout hinzufügen“ klicken  
2. Keine Werte eingeben  
3. „Speichern“ klicken  
**Erwartetes Ergebnis:**  
- Fehlermeldungen für alle Pflichtfelder  

### **TC-WORKOUT-004: Workout löschen**  
**Priorität:** Mittel  
**Vorbedingung:** Ein Workout existiert bereits.  
**Schritte:**  
1. Auf der Workout-Seite das bestehende Workout finden  
2. „Löschen“ Button klicken  
3. Bestätigen  
**Erwartetes Ergebnis:**  
- Workout verschwindet aus der Liste  

---

## **4. Dashboard & Tagesübersicht**
### **TC-DASH-001: Nutzer sieht die Tagesübersicht**
**Priorität:** Mittel  
**Vorbedingung:** Der Benutzer hat Workouts eingetragen.  
**Schritte:**  
1. Dashboard aufrufen  
2. Tagesübersicht prüfen  
**Erwartetes Ergebnis:**  
- Die Tagesübersicht zeigt das heutige Workout an  

### **TC-DASH-002: Leere Tagesübersicht bei keinem Workout**
**Priorität:** Niedrig  
**Schritte:**  
1. Dashboard öffnen, ohne vorher ein Workout eingetragen zu haben  
**Erwartetes Ergebnis:**  
- Meldung „Noch kein Workout eingetragen“ wird angezeigt  

---

## **5. CI/CD-Pipeline Integration**
### **TC-PIPELINE-001: Erfolgreicher Pipeline-Durchlauf**
**Priorität:** Hoch  
**Vorbedingung:** Code-Änderungen im Feature-Branch  
**Schritte:**  
1. Änderungen pushen  
2. CI/CD-Pipeline ausführen  
**Erwartetes Ergebnis:**  
- Alle Tests bestehen  
- Die Anwendung wird erfolgreich gestartet  

---

## **Zusätzliche Testüberlegungen**
✔ **Cross-Browser-Tests** (Chrome, Edge)  
✔ **Responsive Design testen** (Mobile, Tablet, Desktop)  
✔ **Barrierefreiheit testen** (Keyboard-Navigation, Screen Reader)  
✔ **Datenbank-Persistenz prüfen**  

---