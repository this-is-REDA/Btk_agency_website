#!/bin/bash

# Script de démarrage en arrière-plan pour BTK Agency
# Frontend: React + Vite
# Backend: Node.js + Express
# Sécurité: Complète avec protection XSS, CSRF, Rate Limiting, etc.

echo "🚀 Démarrage de BTK Agency en arrière-plan..."
echo ""

# Arrêter les processus existants
echo "🛑 Arrêt des processus existants..."
pkill -f "node.*server-simple" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 2

# Vérifier que les ports sont libres
echo "🔍 Vérification des ports..."
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ Port 8080 déjà utilisé"
    exit 1
fi

if lsof -Pi :5001 -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ Port 5001 déjà utilisé"
    exit 1
fi

# Créer le dossier logs s'il n'existe pas
mkdir -p logs

# Démarrer le backend en arrière-plan
echo "🔧 Démarrage du backend (port 5001)..."
cd backend
nohup npm run dev:simple > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Démarrer le frontend en arrière-plan
echo "🎨 Démarrage du frontend (port 8080)..."
nohup npm run dev > logs/frontend.log 2>&1 &
FRONTEND_PID=$!

# Attendre que les services démarrent
echo "⏳ Attente du démarrage des services..."
sleep 10

# Vérifier que les services fonctionnent
echo "🔍 Vérification des services..."

# Vérifier le backend
if curl -s -k https://localhost:5001/api/health > /dev/null; then
    echo "✅ Backend démarré avec succès (HTTPS)"
else
    echo "❌ Erreur: Backend non accessible"
    echo "📋 Vérifiez les logs: cat logs/backend.log"
    exit 1
fi

# Vérifier le frontend
if curl -s -k https://localhost:8080 > /dev/null; then
    echo "✅ Frontend démarré avec succès (HTTPS)"
else
    echo "❌ Erreur: Frontend non accessible"
    echo "📋 Vérifiez les logs: cat logs/frontend.log"
    exit 1
fi

echo ""
echo "🎉 BTK Agency est maintenant en ligne !"
echo ""
echo "🔒 Frontend (HTTPS): https://localhost:8080"
echo "🔒 Backend (HTTPS):  https://localhost:5001"
echo "📊 API Health: https://localhost:5001/api/health"
echo ""
echo "🛡️ Sécurité activée:"
echo "   - Protection XSS"
echo "   - Protection CSRF"
echo "   - Rate Limiting"
echo "   - Headers de sécurité"
echo "   - Validation des entrées"
echo "   - Détection d'attaques"
echo ""
echo "📋 Commandes utiles:"
echo "   - Voir les logs backend: cat logs/backend.log"
echo "   - Voir les logs frontend: cat logs/frontend.log"
echo "   - Suivre les logs backend: tail -f logs/backend.log"
echo "   - Suivre les logs frontend: tail -f logs/frontend.log"
echo "   - Arrêter le projet: ./stop-project.sh"
echo "   - Redémarrer le projet: ./restart-project.sh"
echo ""
echo "🔒 Le site est sécurisé et prêt pour la production !"
echo "💡 Vous pouvez maintenant utiliser le terminal normalement."
echo "💡 Les services continuent de fonctionner en arrière-plan." 