# 🔒 Guide de Sécurité - BTK Agency

## 🛡️ **Sécurité Implémentée**

### **Frontend (React)**

#### **1. Validation des Entrées**
- ✅ Validation email avec regex
- ✅ Validation téléphone internationale
- ✅ Validation nom (caractères autorisés uniquement)
- ✅ Validation message (longueur et contenu)
- ✅ Nettoyage automatique des entrées

#### **2. Protection XSS**
- ✅ Encodage des caractères spéciaux
- ✅ Filtrage des balises HTML dangereuses
- ✅ Protection contre les scripts malveillants
- ✅ Validation côté client et serveur

#### **3. Protection CSRF**
- ✅ Génération de tokens CSRF
- ✅ Validation des tokens à chaque requête
- ✅ Protection contre les attaques cross-site

#### **4. Protection contre les Injections**
- ✅ Détection des caractères dangereux
- ✅ Filtrage des patterns SQL malveillants
- ✅ Nettoyage automatique des entrées
- ✅ Validation stricte des types

#### **5. Protection de Session**
- ✅ Validation des tokens JWT
- ✅ Nettoyage automatique des sessions
- ✅ Timeout de session configurable
- ✅ Protection contre les sessions volées

#### **6. Protection contre les Attaques par Force Brute**
- ✅ Limitation des tentatives de connexion
- ✅ Blocage temporaire des IPs
- ✅ Détection des clics frauduleux
- ✅ Protection contre les bots

### **Backend (Node.js/Express)**

#### **1. Middleware de Sécurité**
- ✅ **Helmet** : Headers de sécurité
- ✅ **CORS** : Configuration sécurisée
- ✅ **Rate Limiting** : Protection contre les abus
- ✅ **Input Validation** : Validation des entrées
- ✅ **Attack Detection** : Détection d'attaques

#### **2. Protection des Routes**
- ✅ **Authentication** : JWT sécurisé
- ✅ **Authorization** : Gestion des rôles
- ✅ **CSRF Protection** : Tokens de sécurité
- ✅ **Content Validation** : Validation des types

#### **3. Logging de Sécurité**
- ✅ Détection d'activités suspectes
- ✅ Logs des tentatives d'attaque
- ✅ Monitoring en temps réel
- ✅ Alertes automatiques

#### **4. Validation des Données**
- ✅ Validation email stricte
- ✅ Validation téléphone internationale
- ✅ Validation nom (caractères autorisés)
- ✅ Validation message (longueur et contenu)
- ✅ Détection d'injections SQL/XSS

## 🔧 **Configuration de Sécurité**

### **Variables d'Environnement**

```env
# Sécurité
NODE_ENV=production
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_MAX_LOGIN_ATTEMPTS=5

# CORS
FRONTEND_URL=https://btkagency.com
ALLOWED_ORIGINS=https://btkagency.com,https://www.btkagency.com

# Headers de Sécurité
SECURITY_HEADERS_ENABLED=true
CSP_ENABLED=true
HSTS_ENABLED=true

# Logging
SECURITY_LOGGING_ENABLED=true
SUSPICIOUS_ACTIVITY_LOGGING=true
```

### **Headers de Sécurité**

```javascript
// Headers automatiquement ajoutés par Helmet
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'
```

## 🚨 **Protection contre les Attaques**

### **1. XSS (Cross-Site Scripting)**
- ✅ Encodage des caractères spéciaux
- ✅ Filtrage des balises HTML
- ✅ Validation stricte des entrées
- ✅ CSP (Content Security Policy)

### **2. SQL Injection**
- ✅ Validation des entrées
- ✅ Paramètres préparés (Mongoose)
- ✅ Filtrage des caractères dangereux
- ✅ Détection de patterns malveillants

### **3. CSRF (Cross-Site Request Forgery)**
- ✅ Tokens CSRF uniques
- ✅ Validation à chaque requête
- ✅ Protection des cookies
- ✅ Headers de sécurité

### **4. Brute Force**
- ✅ Limitation des tentatives
- ✅ Blocage temporaire des IPs
- ✅ Délais progressifs
- ✅ Monitoring des tentatives

### **5. DDoS (Distributed Denial of Service)**
- ✅ Rate limiting par IP
- ✅ Limitation de la taille des requêtes
- ✅ Timeout des connexions
- ✅ Monitoring du trafic

## 📊 **Monitoring de Sécurité**

### **Logs de Sécurité**
```javascript
// Exemple de log d'attaque détectée
{
  timestamp: "2024-01-15T10:30:00Z",
  type: "SUSPICIOUS_ACTIVITY",
  ip: "192.168.1.100",
  userAgent: "sqlmap/1.0",
  path: "/api/contact",
  method: "POST",
  payload: "<script>alert('xss')</script>",
  blocked: true,
  action: "BLOCKED_IP"
}
```

### **Métriques de Sécurité**
- Nombre de tentatives d'attaque
- IPs bloquées
- Requêtes suspectes
- Erreurs de validation
- Tentatives de connexion échouées

## 🔐 **Bonnes Pratiques Implémentées**

### **1. Validation des Données**
- ✅ Validation côté client ET serveur
- ✅ Sanitisation automatique
- ✅ Validation des types
- ✅ Limitation des longueurs

### **2. Authentification**
- ✅ Mots de passe hashés (bcrypt)
- ✅ Tokens JWT sécurisés
- ✅ Expiration automatique
- ✅ Refresh tokens

### **3. Autorisation**
- ✅ Gestion des rôles (user/admin)
- ✅ Protection des routes sensibles
- ✅ Validation des permissions
- ✅ Audit des actions

### **4. Chiffrement**
- ✅ HTTPS obligatoire
- ✅ Chiffrement des données sensibles
- ✅ Protection des cookies
- ✅ Sécurisation des sessions

## 🛠️ **Outils de Sécurité Utilisés**

### **Frontend**
- ✅ **React Security Utils** : Validation et sanitisation
- ✅ **Security Provider** : Context de sécurité
- ✅ **Form Validation** : Validation des formulaires
- ✅ **Session Protection** : Gestion des sessions

### **Backend**
- ✅ **Helmet** : Headers de sécurité
- ✅ **Express Rate Limit** : Protection contre les abus
- ✅ **CORS** : Configuration sécurisée
- ✅ **JWT** : Authentification sécurisée
- ✅ **bcryptjs** : Hashage des mots de passe

## 📋 **Checklist de Sécurité**

### **✅ Implémenté**
- [x] Validation des entrées utilisateur
- [x] Protection XSS
- [x] Protection CSRF
- [x] Protection contre les injections
- [x] Rate limiting
- [x] Headers de sécurité
- [x] Logging de sécurité
- [x] Validation des formulaires
- [x] Protection de session
- [x] Détection d'attaques
- [x] Sanitisation des données
- [x] Configuration CORS sécurisée
- [x] Protection contre la force brute
- [x] Monitoring de sécurité
- [x] Validation des fichiers
- [x] Protection des routes

### **🔄 En Cours**
- [ ] Tests de sécurité automatisés
- [ ] Audit de sécurité complet
- [ ] Intégration avec un WAF
- [ ] Monitoring avancé

### **📅 Planifié**
- [ ] Intégration avec un SIEM
- [ ] Tests de pénétration
- [ ] Formation sécurité équipe
- [ ] Documentation détaillée

## 🚀 **Démarrage Sécurisé**

### **1. Variables d'Environnement**
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Configurer les variables de sécurité
JWT_SECRET=your-super-secret-key-here
NODE_ENV=production
```

### **2. Démarrage du Backend**
```bash
cd backend
npm install
npm run dev:simple
```

### **3. Démarrage du Frontend**
```bash
npm install
npm run dev
```

### **4. Vérification de Sécurité**
```bash
# Test des headers de sécurité
curl -I http://localhost:5001/api/health

# Test de rate limiting
for i in {1..10}; do curl http://localhost:5001/api/health; done

# Test de validation
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"<script>alert(\"xss\")</script>","email":"test@test.com","subject":"test","message":"test"}'
```

## 📞 **Support Sécurité**

Pour toute question concernant la sécurité :
- 📧 Email : btkagency0@gmail.com
- 📋 Rapport : Créer un ticket de sécurité
- 🚨 Urgence : Contacter l'équipe technique

---

**⚠️ Important** : Ce guide doit être mis à jour régulièrement avec les nouvelles menaces et bonnes pratiques de sécurité. 