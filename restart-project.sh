#!/bin/bash

# Script de redémarrage pour BTK Agency
echo "🔄 Redémarrage de BTK Agency..."

# Arrêter d'abord
./stop-project.sh

# Attendre un peu
sleep 3

# Redémarrer
./start-project-background.sh 