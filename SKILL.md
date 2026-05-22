---
name: update-affiliate-links
description: Busca produtos no Mercado Livre pela API pública e atualiza assets/js/affiliate-config.js com links de afiliado usando matt_tool.
---

# Update Affiliate Links

Use esta skill para atualizar automaticamente os links de afiliado do blog com base nas queries definidas no repositório.

## O que ela faz

Esta skill usa o script `scripts/update-affiliate-links.py` para:

- ler as queries configuradas em `PRODUCT_QUERIES`
- buscar produtos na API pública do Mercado Livre
- selecionar o melhor resultado com base em condição e volume de vendas
- adicionar o parâmetro de afiliado `matt_tool`
- atualizar o arquivo `assets/js/affiliate-config.js`

## Arquivos envolvidos

- `scripts/update-affiliate-links.py`
- `assets/js/affiliate-config.js`

## Como usar

Execute manualmente no repositório:

```bash
python3 scripts/update-affiliate-links.py
```

### Opções úteis

```bash
python3 scripts/update-affiliate-links.py --dry-run
python3 scripts/update-affiliate-links.py --limit 10
python3 scripts/update-affiliate-links.py --affiliate-id "https://www.mercadolivre.com.br/social/wesleydesouzaraujo"
```

## Quando usar

Use esta skill quando você quiser:

- atualizar links de produtos desatualizados
- validar os melhores resultados retornados pelo Mercado Livre
- regenerar URLs com o ID de afiliado correto
- testar buscas sem alterar arquivos usando `--dry-run`

## Observações

- A seleção do produto prioriza itens com condição `new`
- Entre os candidatos, o script escolhe o maior `sold_quantity`
- Se um produto não for encontrado, o script tenta manter a URL anterior no arquivo JS
- Pode ser necessário ajustar manualmente as queries em `PRODUCT_QUERIES` para melhorar a relevância dos resultados
