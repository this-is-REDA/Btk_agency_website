# 🧪 Guide de Test - Système d'Emails Élégants

## 🎯 Objectif
Tester le système d'envoi d'emails élégants vers votre boîte mail `btkagency0@gmail.com`.

## ✅ Prérequis
1. ✅ Configuration Gmail (authentification 2FA + mot de passe d'application)
2. ✅ Fichier `.env` configuré dans `backend/`
3. ✅ Projet démarré avec `./start-project.sh`

## 🚀 Test du Formulaire de Contact

### 1. Accéder au formulaire
```
https://localhost:8080/contact
```

### 2. Remplir le formulaire
- **Nom :** Test User
- **Email :** test@example.com
- **Téléphone :** +212 5 22 123 456
- **Entreprise :** Test Company
- **Sujet :** Test du système d'emails
- **Message :** Ceci est un test du système d'emails élégants de BTK Agency.

### 3. Envoyer le formulaire
Cliquez sur "Envoyer le message"

### 4. Vérifier l'email
Vérifiez votre boîte mail `btkagency0@gmail.com`

**Email attendu :**
- **Objet :** `🎯 Nouveau Contact - Test du système d'emails`
- **Contenu :** Template HTML élégant avec toutes les informations

## 🧪 Test avec cURL

### Test du formulaire de contact
```bash
curl -X POST https://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+212 5 22 123 456",
    "company": "Test Company",
    "subject": "Test cURL",
    "message": "Test du système d'emails via cURL",
    "service": "Site Web",
    "budget": "5 000 - 15 000 MAD",
    "timeline": "Normal (1-2 mois)",
    "source": "Test cURL"
  }'
```

### Test du formulaire de devis
```bash
curl -X POST https://localhost:5001/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Client",
    "email": "client@example.com",
    "phone": "+212 5 22 123 456",
    "company": "Client Company",
    "projectType": "Site Web",
    "description": "Nous souhaitons créer un site web moderne pour notre entreprise",
    "budget": "15 000 - 30 000 MAD",
    "timeline": "Normal (1-2 mois)",
    "features": "Design moderne, responsive, SEO optimisé",
    "additionalInfo": "Nous avons besoin d'un site e-commerce avec paiement en ligne"
  }'
```

## 📧 Vérification de l'Email

### Contenu attendu dans l'email :
1. **Header élégant** avec logo BTK Agency
2. **Grille d'informations** :
   - 👤 Nom
   - 📧 Email
   - 📞 Téléphone
   - 🏢 Entreprise
   - 🎯 Service
   - 💰 Budget
   - ⏰ Délai
   - 📊 Source
3. **Section message** avec le contenu complet
4. **Horodatage** de réception
5. **Footer** professionnel

## 🔍 Vérification des Logs

### Dans le terminal, vous devriez voir :
```
Message sent: <message-id>
```

### Si erreur, vérifiez :
```
Email sending failed: [erreur]
```

## 🛠️ Dépannage

### Problème : Email non reçu
1. **Vérifiez Gmail :**
   - Dossier spam
   - Filtres Gmail
   - Configuration SMTP

2. **Vérifiez les logs :**
   ```bash
   # Dans le terminal du serveur
   tail -f backend/logs/app.log
   ```

3. **Testez la configuration :**
   ```bash
   # Test de connexion SMTP
   telnet smtp.gmail.com 587
   ```

### Problème : Template non affiché
1. **Vérifiez le fichier `sendEmail.js`**
2. **Redémarrez le serveur**
3. **Vérifiez les variables d'environnement**

### Problème : Erreur SSL
1. **Vérifiez les certificats HTTPS**
2. **Testez en HTTP si nécessaire**
3. **Vérifiez la configuration cURL**

## 📊 Test de Performance

### Test de charge (optionnel)
```bash
# Installer Apache Bench
sudo apt-get install apache2-utils

# Test avec 10 requêtes
ab -n 10 -c 1 -H "Content-Type: application/json" \
  -p test-data.json https://localhost:5001/api/contact
```

## 🎯 Validation du Template

### Vérifiez que l'email contient :
- ✅ **Design responsive** (testez sur mobile)
- ✅ **Couleurs BTK Agency** (dégradé bleu-violet)
- ✅ **Informations organisées** en grille
- ✅ **Icônes** pour chaque section
- ✅ **Horodatage** correct
- ✅ **Footer** professionnel

## 📱 Test Mobile

### Vérifiez sur mobile :
1. **Ouvrez l'email sur votre téléphone**
2. **Vérifiez que le design s'adapte**
3. **Testez la lisibilité**

## 🔒 Test de Sécurité

### Test de validation :
```bash
# Test avec données invalides
curl -X POST https://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "email": "invalid-email",
    "message": "test"
  }'
```

### Résultat attendu :
```json
{
  "success": false,
  "message": "Validation échouée",
  "errors": {
    "name": "Nom invalide (2-50 caractères)",
    "email": "Email invalide"
  }
}
```

## ✅ Checklist de Validation

- [ ] Email reçu dans `btkagency0@gmail.com`
- [ ] Template HTML élégant affiché
- [ ] Toutes les informations présentes
- [ ] Design responsive
- [ ] Horodatage correct
- [ ] Pas d'erreurs dans les logs
- [ ] Validation des données fonctionnelle
- [ ] Protection contre les injections

## 🎉 Succès !

Si tous les tests passent, votre système d'emails élégants est parfaitement configuré !

---

**💡 Conseil :** Gardez ce guide pour tester après chaque modification du système d'emails. 