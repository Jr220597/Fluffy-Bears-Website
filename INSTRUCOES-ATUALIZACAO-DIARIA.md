# 📊 Instruções para Atualização Diária dos Dados do Twitter

## 🎯 Objetivo
Atualizar manualmente os dados de tweets sobre Fluffy Bears todos os dias usando o Apify CLI.

## 📋 Processo Diário

### 1. Executar o Scraper via Apify CLI
```bash
# Execute este comando no terminal
apify call twlo/low --input '{"searchTerms": ["Fluffy_Bearss", "@Fluffy_Bearss", "#FluffyBears", "#FluffyBearsNFT", "fluffy bears nft"], "maxTweets": 200, "language": "any", "includeRetweets": true}'
```

### 2. Baixar os Dados
Após a execução:
- Acesse https://console.apify.com/
- Vá em "Storage" > "Datasets"
- Encontre o dataset mais recente
- Clique em "Export" > "JSON"
- Baixe o arquivo

### 3. Substituir o Arquivo Local
- Renomeie o arquivo baixado para: `fluffy-bears-tweets.json`
- Substitua o arquivo em: `data/twitter-daily/fluffy-bears-tweets.json`

### 4. Formatos Suportados
O sistema aceita estes formatos de JSON:

**Formato 1 - Array direto:**
```json
[
  {
    "tweet_id": "123...",
    "text": "Tweet text...",
    "username": "user123",
    "like_count": 10,
    ...
  }
]
```

**Formato 2 - Com propriedade data:**
```json
{
  "data": [
    {
      "tweet_id": "123...",
      ...
    }
  ]
}
```

**Formato 3 - Formato Apify dataset:**
```json
{
  "items": [
    {
      "tweet_id": "123...",
      ...
    }
  ]
}
```

### 5. Campos Importantes
Certifique-se que os dados contenham:
- `tweet_id` ou `id`
- `text` ou `full_text`
- `username`
- `like_count`, `retweet_count`, `reply_count`
- `created_at`
- `hashtags` (array)
- `mentions` (array)

### 6. Verificar a Atualização
- Acesse http://localhost:3001/twitter-game
- Verifique se aparece "Dados atualizados: [data atual]"
- Confirme se os novos tweets estão aparecendo

## 🔧 Comandos Úteis

### Validar arquivo antes de substituir:
```bash
# No diretório do projeto
node -e "
const fs = require('fs');
try {
  const data = JSON.parse(fs.readFileSync('caminho/para/arquivo.json'));
  console.log('✅ Arquivo válido!');
  console.log('Tweets encontrados:', Array.isArray(data) ? data.length : (data.data?.length || data.items?.length || 0));
} catch(e) {
  console.error('❌ Arquivo inválido:', e.message);
}
"
```

### Backup do arquivo anterior:
```bash
# Fazer backup antes de substituir
cp data/twitter-daily/fluffy-bears-tweets.json data/twitter-daily/backup-$(date +%Y%m%d).json
```

## ⚠️ Observações Importantes

1. **Frequência**: Execute diariamente pela manhã para dados mais atuais
2. **Créditos**: Cada execução consome ~2-5 créditos do Apify
3. **Limite**: Configure `maxTweets` de acordo com seus créditos disponíveis
4. **Backup**: Sempre faça backup do arquivo anterior antes de substituir
5. **Validação**: Sempre verifique se o arquivo é um JSON válido antes de substituir

## 🚨 Problemas Comuns

**Arquivo não aparece na interface:**
- Verifique se o nome está correto: `fluffy-bears-tweets.json`
- Confirme se está na pasta: `data/twitter-daily/`
- Reinicie o servidor: `npm run dev`

**Erro "JSON inválido":**
- Valide o arquivo JSON em jsonlint.com
- Certifique-se de que baixou no formato correto

**Dados não atualizando:**
- Limpe o cache do navegador
- Verifique se o servidor está rodando
- Confirme a data de modificação do arquivo