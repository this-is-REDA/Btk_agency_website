# 🔧 Guide de Résolution des Problèmes HTTPS

## 🚨 **Problèmes Courants et Solutions**

### **1. Erreur "Your connection is not private"**

#### **Symptôme**
```
NET::ERR_CERT_AUTHORITY_INVALID
Votre connexion n'est pas privée
```

#### **Cause**
- Certificats SSL auto-signés non reconnus par le navigateur
- Autorité de certification non installée

#### **Solution**
```bash
# 1. Installer mkcert
brew install mkcert

# 2. Installer l'autorité de certification locale
mkcert -install

# 3. Régénérer les certificats
mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost 127.0.0.1 ::1

# 4. Redémarrer les serveurs
pkill -f "node.*server-simple" && pkill -f "vite"
cd backend && npm run dev:simple
npm run dev
```

### **2. Erreur "Certificate not trusted"**

#### **Symptôme**
```
ERR_CERT_AUTHORITY_INVALID
Certificate not trusted
```

#### **Solution**
```bash
# Vérifier que mkcert est installé
mkcert -CAROOT

# Réinstaller l'autorité de certification
mkcert -install

# Régénérer les certificats
rm -f certs/*.pem
mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost 127.0.0.1 ::1
```

### **3. Erreur "ENOENT: no such file or directory"**

#### **Symptôme**
```
ENOENT: no such file or directory, open './certs/localhost-key.pem'
```

#### **Solution**
```bash
# 1. Créer le dossier certs
mkdir -p certs

# 2. Générer les certificats
mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost 127.0.0.1 ::1

# 3. Vérifier les fichiers
ls -la certs/
```

### **4. Erreur de port déjà utilisé**

#### **Symptôme**
```
EADDRINUSE: address already in use :::5001
```

#### **Solution**
```bash
# Tuer les processus existants
pkill -f "node.*server-simple"
pkill -f "vite"

# Attendre quelques secondes
sleep 3

# Redémarrer
cd backend && npm run dev:simple
npm run dev
```

### **5. Erreur CORS avec HTTPS**

#### **Symptôme**
```
Access to fetch at 'https://localhost:5001/api/contact' from origin 'https://localhost:8080' has been blocked by CORS policy
```

#### **Solution**
Vérifier que la configuration CORS inclut les URLs HTTPS :
```javascript
const allowedOrigins = [
  'https://localhost:8080',
  'https://localhost:8081',
  'https://localhost:3000'
];
```

## 🔍 **Diagnostic des Problèmes**

### **Test de Connexion HTTPS**
```bash
# Test du backend
curl -v https://localhost:5001/api/health

# Test du frontend
curl -v https://localhost:8080

# Test avec certificats
curl --cacert certs/localhost.pem https://localhost:5001/api/health
```

### **Vérification des Certificats**
```bash
# Vérifier les certificats
openssl x509 -in certs/localhost.pem -text -noout

# Vérifier la chaîne de certificats
openssl verify certs/localhost.pem

# Tester la connexion SSL
openssl s_client -connect localhost:5001 -servername localhost
```

### **Vérification des Ports**
```bash
# Vérifier les ports utilisés
lsof -i :5001
lsof -i :8080

# Tuer les processus si nécessaire
pkill -f "node.*server-simple"
pkill -f "vite"
```

## 🛠️ **Commandes de Réparation**

### **Réparation Complète**
```bash
#!/bin/bash
echo "🔧 Réparation HTTPS..."

# 1. Arrêter tous les serveurs
pkill -f "node.*server-simple"
pkill -f "vite"
sleep 3

# 2. Vérifier mkcert
if ! command -v mkcert &> /dev/null; then
    echo "📦 Installation de mkcert..."
    brew install mkcert
fi

# 3. Installer l'autorité de certification
echo "🔐 Installation de l'autorité de certification..."
mkcert -install

# 4. Régénérer les certificats
echo "📜 Régénération des certificats..."
mkdir -p certs
mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost 127.0.0.1 ::1

# 5. Redémarrer les serveurs
echo "🚀 Redémarrage des serveurs..."
cd backend && npm run dev:simple &
cd .. && npm run dev &

# 6. Attendre et tester
sleep 8
echo "🧪 Test des serveurs..."
curl -s https://localhost:5001/api/health | jq '.success'
curl -s https://localhost:8080 | grep -o "<title>.*</title>"

echo "✅ Réparation terminée !"
```

### **Script de Diagnostic**
```bash
#!/bin/bash
echo "🔍 Diagnostic HTTPS..."

echo "1. Vérification de mkcert..."
if command -v mkcert &> /dev/null; then
    echo "✅ mkcert installé"
    mkcert -CAROOT
else
    echo "❌ mkcert non installé"
fi

echo "2. Vérification des certificats..."
if [ -f "certs/localhost.pem" ] && [ -f "certs/localhost-key.pem" ]; then
    echo "✅ Certificats présents"
    openssl x509 -in certs/localhost.pem -text -noout | grep -E "(Subject:|Issuer:|Not After)"
else
    echo "❌ Certificats manquants"
fi

echo "3. Vérification des ports..."
echo "Port 5001:"
lsof -i :5001
echo "Port 8080:"
lsof -i :8080

echo "4. Test des connexions..."
echo "Backend:"
curl -s https://localhost:5001/api/health | jq '.success' 2>/dev/null || echo "❌ Backend inaccessible"
echo "Frontend:"
curl -s https://localhost:8080 | grep -o "<title>.*</title>" 2>/dev/null || echo "❌ Frontend inaccessible"

echo "🔍 Diagnostic terminé"
```

## 📋 **Checklist de Résolution**

### **✅ Vérifications de Base**
- [ ] mkcert est installé (`brew install mkcert`)
- [ ] L'autorité de certification est installée (`mkcert -install`)
- [ ] Les certificats sont générés (`ls certs/`)
- [ ] Les serveurs sont arrêtés avant redémarrage
- [ ] Les ports 5001 et 8080 sont libres

### **✅ Tests de Fonctionnement**
- [ ] Backend accessible : `curl https://localhost:5001/api/health`
- [ ] Frontend accessible : `curl https://localhost:8080`
- [ ] Pas d'erreur de certificat dans le navigateur
- [ ] CORS fonctionne entre frontend et backend
- [ ] Les formulaires fonctionnent avec HTTPS

### **✅ Sécurité**
- [ ] Protection XSS active avec HTTPS
- [ ] Rate limiting fonctionne
- [ ] Headers de sécurité présents
- [ ] Validation des données côté serveur

## 🎯 **Résultat Attendu**

Après résolution, vous devriez avoir :
- ✅ **Aucun avertissement de sécurité** dans le navigateur
- ✅ **Connexion HTTPS sécurisée** sur https://localhost:8080
- ✅ **API HTTPS fonctionnelle** sur https://localhost:5001
- ✅ **Certificats de confiance** reconnus par le navigateur
- ✅ **Toutes les fonctionnalités** opérationnelles avec HTTPS

---

**🔧 Si vous rencontrez encore des problèmes, utilisez le script de diagnostic ci-dessus !** 