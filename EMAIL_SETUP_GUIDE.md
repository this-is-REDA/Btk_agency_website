# 📧 Guide de Configuration Email - BTK Agency

## 🎯 Objectif
Configurer l'envoi d'emails élégants vers votre boîte mail `btkagency0@gmail.com` quand quelqu'un remplit le formulaire de contact.

## ✅ Fonctionnalités Actuelles
- ✅ Template HTML élégant et moderne
- ✅ Design responsive (mobile-friendly)
- ✅ Informations organisées et claires
- ✅ Horodatage automatique
- ✅ Support multilingue
- ✅ Sécurité renforcée

## 🔧 Configuration Gmail

### 1. Activer l'authentification à 2 facteurs
1. Allez sur [myaccount.google.com](https://myaccount.google.com)
2. Cliquez sur "Sécurité"
3. Activez "Validation en 2 étapes"

### 2. Générer un mot de passe d'application
1. Dans "Sécurité" > "Validation en 2 étapes"
2. Cliquez sur "Mots de passe d'application"
3. Sélectionnez "Autre (nom personnalisé)"
4. Nommez-le "BTK Agency Website"
5. Copiez le mot de passe généré (16 caractères)

### 3. Configurer le fichier .env
Créez un fichier `.env` dans le dossier `backend/` avec :

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/btk-agency?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=btk-agency-super-secret-jwt-key-2024
JWT_EXPIRES_IN=7d

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=btkagency0@gmail.com
EMAIL_PASS=votre-mot-de-passe-d-application-ici
FROM_NAME=BTK Agency
FROM_EMAIL=btkagency0@gmail.com
ADMIN_EMAIL=btkagency0@gmail.com

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
FRONTEND_URL=http://localhost:8081
```

## 🎨 Template Email Élégant

### Caractéristiques du Template :
- 🎨 **Design moderne** avec dégradé bleu-violet
- 📱 **Responsive** pour mobile et desktop
- 📊 **Informations organisées** en grille
- 🎯 **Icônes** pour une meilleure lisibilité
- ⏰ **Horodatage** automatique
- 🏢 **Branding** BTK Agency

### Informations incluses :
- 👤 Nom du contact
- 📧 Email
- 📞 Téléphone
- 🏢 Entreprise
- 🎯 Service demandé
- 💰 Budget
- ⏰ Délai souhaité
- 📊 Source (site web, etc.)
- 💬 Message complet

## 🚀 Test de Configuration

### 1. Démarrer le projet
```bash
./start-project.sh
```

### 2. Tester le formulaire de contact
1. Allez sur `https://localhost:8080/contact`
2. Remplissez le formulaire
3. Cliquez sur "Envoyer le message"
4. Vérifiez votre boîte mail `btkagency0@gmail.com`

### 3. Vérifier les logs
Dans le terminal, vous devriez voir :
```
Message sent: <message-id>
```

## 🔒 Sécurité

### Protection contre le spam :
- ✅ Validation des données
- ✅ Protection XSS
- ✅ Rate limiting
- ✅ Validation email
- ✅ Filtrage de contenu dangereux

### Variables d'environnement sécurisées :
- ✅ Mot de passe d'application Gmail
- ✅ Configuration SMTP sécurisée
- ✅ Validation côté serveur

## 📧 Exemple d'Email Reçu

Quand quelqu'un remplit le formulaire, vous recevrez un email avec :

**Objet :** `🎯 Nouveau Contact - [Sujet du message]`

**Contenu :**
- Header élégant avec logo BTK Agency
- Grille d'informations organisées
- Message complet dans une section dédiée
- Horodatage de réception
- Footer professionnel

## 🛠️ Dépannage

### Problème : Email non reçu
1. Vérifiez le mot de passe d'application Gmail
2. Vérifiez que l'authentification 2FA est activée
3. Vérifiez les logs du serveur

### Problème : Erreur SMTP
1. Vérifiez `EMAIL_HOST=smtp.gmail.com`
2. Vérifiez `EMAIL_PORT=587`
3. Vérifiez `EMAIL_USER=btkagency0@gmail.com`

### Problème : Template non affiché
1. Vérifiez que le fichier `sendEmail.js` est à jour
2. Redémarrez le serveur backend
3. Vérifiez les logs pour les erreurs

## 📞 Support

Si vous avez des problèmes :
1. Vérifiez les logs du serveur
2. Testez avec un email de test
3. Vérifiez la configuration Gmail

---

**🎉 Félicitations !** Votre système d'emails élégants est maintenant configuré et fonctionnel ! 