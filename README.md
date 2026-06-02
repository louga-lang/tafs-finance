# 🌿 TAFS Finance Manager — Version 2.0

**Teranga Agrifood Services · Application de gestion financière**

PWA complète : fonctionne hors connexion ET synchronise toutes les données entre tous les appareils via Firebase en temps réel.

---

## 📋 Services gérés (17 distincts)

Fast-food · Maïga · Café · Ataya · Wass · Bissap · Jus Naturel · Pop-Corn · Bouraké · Kinkéliba · Lait · Beignets · Madd · Mango · Local · Thiakry · Ngalakh

---

## 🚀 ÉTAPES DE DÉPLOIEMENT COMPLET

### ÉTAPE 1 — Créer le projet Firebase (gratuit)

1. Aller sur [console.firebase.google.com](https://console.firebase.google.com)
2. Cliquer **"Créer un projet"**
3. Nom : `tafs-finance` → Continuer → Désactiver Analytics (optionnel) → Créer
4. Dans le menu gauche → **Authentication** → Commencer → **Email/Mot de passe** → Activer → Enregistrer
5. Dans le menu gauche → **Firestore Database** → Créer une base de données → **Mode production** → Choisir une région (europe-west) → Activer
6. Dans **Firestore** → onglet **Règles** → Remplacer par :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
    match /ventes/{doc} {
      allow read, write: if request.auth != null;
    }
    match /incidents/{doc} {
      allow read, write: if request.auth != null;
    }
  }
}
```
→ Publier

7. Dans **Paramètres du projet** (⚙️ en haut à gauche) → **Général** → Défiler jusqu'à "Vos applications" → Cliquer **</>** (Web) → Nom : `TAFS Web` → Enregistrer → Copier la config

### ÉTAPE 2 — Configurer l'application

Ouvrir `index.html` et trouver le bloc `FB_CONFIG` (vers la ligne 200) :

```javascript
const FB_CONFIG = {
  apiKey:            "VOTRE_API_KEY",          // ← coller ici
  authDomain:        "VOTRE_PROJECT.firebaseapp.com",
  databaseURL:       "https://VOTRE_PROJECT-default-rtdb.firebaseio.com",
  projectId:         "VOTRE_PROJECT",
  storageBucket:     "VOTRE_PROJECT.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId:             "VOTRE_APP_ID"
};
```

Remplacer chaque valeur par celle copiée depuis Firebase.

> ⚠️ Si vous ne configurez pas Firebase, l'app fonctionne en **mode démo local** (données sur l'appareil uniquement, sans synchronisation).

### ÉTAPE 3 — Publier sur GitHub

1. Créer un compte sur [github.com](https://github.com)
2. **New repository** → Nom : `tafs-finance` → **Public** → Create
3. Uploader tous les fichiers (**Add file → Upload files**) :
   ```
   index.html
   manifest.json
   sw.js
   icons/icon-192.png
   icons/icon-512.png
   .github/workflows/deploy.yml
   ```
4. **Settings → Pages → Source → GitHub Actions** → Save
5. Patienter 2-3 min → votre app est disponible à :
   `https://VOTRE_PSEUDO.github.io/tafs-finance/`

### ÉTAPE 4 — Autoriser le domaine GitHub dans Firebase

Dans Firebase Console → **Authentication → Settings → Domaines autorisés** → Ajouter :
```
VOTRE_PSEUDO.github.io
```

### ÉTAPE 5 — Installer sur téléphone

**Android (Chrome) :**
→ Ouvrir l'URL → Menu ⋮ → "Ajouter à l'écran d'accueil" → Installer

**iPhone (Safari) :**
→ Ouvrir l'URL → Bouton partage ↑ → "Sur l'écran d'accueil" → Ajouter

---

## 📁 Structure des fichiers

```
tafs-finance/
├── index.html              ← Application complète (HTML + CSS + JS intégrés)
├── manifest.json           ← Configuration PWA
├── sw.js                   ← Service Worker (mode offline)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── .github/workflows/
    └── deploy.yml          ← Déploiement automatique
```

---

## 🔄 Comment ça synchronise

```
Téléphone Gérant ──┐
Téléphone Matin  ──┤──► Firebase Firestore ──► Tous les appareils
Téléphone Soir   ──┘      (temps réel)
```

- Chaque saisie est **immédiatement visible** sur tous les appareils connectés
- **Hors connexion** : les données sont sauvegardées localement et synchronisées dès que la connexion revient
- Chaque enregistrement porte le **nom de l'agent** qui l'a effectué

---

## 👤 Gestion des comptes

Chaque agent crée son compte avec :
- Prénom + Nom
- Numéro de téléphone (identifiant unique)
- Poste : Gérant / Caissier Matin / Caissier Soir / Vendeur / Superviseur
- Mot de passe (min. 6 caractères)

---

*TAFS Finance Manager · Teranga Agrifood Services · El Hadji Ndiaga DIOP*
