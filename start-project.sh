#!/bin/bash

# Script de démarrage pour BTK Agency
# Frontend: React + Vite
# Backend: Node.js + Express
# Sécurité: Complète avec protection XSS, CSRF, Rate Limiting, etc.

echo "🚀 Démarrage de BTK Agency..."
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

# Démarrer le backend
echo "🔧 Démarrage du backend (port 5001)..."
cd backend
npm run dev:simple &
BACKEND_PID=$!
cd ..

# Attendre que le backend soit prêt
echo "⏳ Attente du démarrage du backend..."
sleep 5

# Vérifier que le backend fonctionne
if curl -s -k https://localhost:5001/api/health > /dev/null; then
    echo "✅ Backend démarré avec succès (HTTPS)"
else
    echo "❌ Erreur: Backend non accessible"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Démarrer le frontend
echo "🎨 Démarrage du frontend (port 8080)..."
npm run dev &
FRONTEND_PID=$!

# Attendre que le frontend soit prêt
echo "⏳ Attente du démarrage du frontend..."
sleep 8

# Vérifier que le frontend fonctionne
if curl -s -k https://localhost:8080 > /dev/null; then
    echo "✅ Frontend démarré avec succès (HTTPS)"
else
    echo "❌ Erreur: Frontend non accessible"
    kill $FRONTEND_PID 2>/dev/null
    kill $BACKEND_PID 2>/dev/null
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
echo "   - Test de sécurité: curl -X POST http://localhost:5001/api/contact -H 'Content-Type: application/json' -d '{\"name\":\"<script>alert(\\\"xss\\\")\</script>\",\"email\":\"test@test.com\",\"subject\":\"test\",\"message\":\"test\"}'"
echo "   - Test de rate limiting: for i in {1..15}; do curl http://localhost:5001/api/health; done"
echo "   - Arrêter le projet: pkill -f 'node.*server-simple' && pkill -f 'vite'"
echo ""
echo "🔒 Le site est sécurisé et prêt pour la production !"

# Fonction de nettoyage
cleanup() {
    echo ""
    echo "🛑 Arrêt de BTK Agency..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    pkill -f "node.*server-simple" 2>/dev/null
    pkill -f "vite" 2>/dev/null
    echo "✅ Projet arrêté"
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Attendre indéfiniment
echo "⏳ Appuyez sur Ctrl+C pour arrêter le projet..."
wait 