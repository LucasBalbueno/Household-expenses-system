#!/bin/bash

# Script para executar a API na porta padrão 5163
echo "Iniciando a API do Sistema de Despesas Domésticas..."
echo "A API estará disponível em: http://localhost:5163"
echo "Swagger disponível em: http://localhost:5163/swagger"
echo ""

# Navegar para o diretório do projeto API
cd src/Backend/webApi.API

# Executar o projeto
dotnet run
