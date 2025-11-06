#!/bin/bash

# Script d'arrêt pour BTK Agency
echo "🛑 Arrêt de BTK Agency..."

# Arrêter les processus backend
echo "🔧 Arrêt du backend..."
pkill -f "node.*server-simple" 2>/dev/null

# Arrêter les processus frontend
echo "🎨 Arrêt du frontend..."
pkill -f "vite" 2>/dev/null

# Attendre un peu pour que les processus se terminent
sleep 2

# Vérifier que les ports sont libres
echo "🔍 Vérification des ports..."
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 8080 encore utilisé, arrêt forcé..."
    lsof -ti:8080 | xargs kill -9 2>/dev/null
fi

if lsof -Pi :5001 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Port 5001 encore utilisé, arrêt forcé..."
    lsof -ti:5001 | xargs kill -9 2>/dev/null
fi

echo "✅ Projet arrêté avec succès"
echo "💡 Vous pouvez redémarrer avec: ./start-project-background.sh" 