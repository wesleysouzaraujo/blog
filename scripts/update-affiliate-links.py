#!/usr/bin/env python3
"""
update-affiliate-links.py
=========================
Busca cada produto do blog no Mercado Livre via API pública e atualiza
o arquivo assets/js/affiliate-config.js com URLs reais de produto
contendo o parâmetro de rastreamento de afiliado (matt_tool).

Uso:
  python3 scripts/update-affiliate-links.py [--affiliate-id SEU_ID]

Argumentos opcionais:
  --affiliate-id   ID de afiliado do Mercado Livre (matt_tool).
                   Padrão: valor definido em AFFILIATE_ID abaixo.
  --dry-run        Exibe as URLs encontradas sem gravar o arquivo.
  --limit N        Número de resultados da API a avaliar por produto (padrão: 5).

Requisitos:
  Python 3.7+ (sem dependências externas)
"""

import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

# ---------------------------------------------------------------------------
# Configuração
# ---------------------------------------------------------------------------

# ID de afiliado padrão (matt_tool) — mesmo valor definido em main.js
AFFILIATE_ID = "https://www.mercadolivre.com.br/social/wesleydesouzaraujo"

# Raiz do repositório
REPO_ROOT = Path(__file__).resolve().parent.parent

# Arquivo de configuração de afiliados
AFFILIATE_CONFIG_PATH = REPO_ROOT / "assets" / "js" / "affiliate-config.js"

# Mapeamento: chave do produto → query de busca no Mercado Livre
# Ajuste as queries para retornar o produto mais relevante.
PRODUCT_QUERIES = {
    "creatina": "growth-creatina"
    # "max-titanium-creatine": "Max Titanium Creatine 300g",
    # "on-creatine":           "Optimum Nutrition Creatine Powder 300g",
    # "probiotica-creatina":   "Probiótica creatina monohidratada",
    # "dark-lab-creatina":     "Dark Lab creatina micronizada",
    # "integralmedica-creatina": "IntegralMédica creatina monohidratada",
    # "universal-creatine":    "Universal Creatine 200g",
}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

ML_SEARCH_URL = "https://api.mercadolibre.com/sites/MLB/search"


def search_mercadolivre(query: str, limit: int = 5) -> list[dict]:
    """Chama a API pública do ML e retorna os primeiros `limit` resultados."""
    params = urllib.parse.urlencode({"q": query, "limit": limit})
    url = f"{ML_SEARCH_URL}?{params}"

    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/125.0.0.0 Safari/537.36"
        ),
        "Accept": "application/json,text/plain,*/*",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
    }

    for attempt in range(3):
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode())
                return data.get("results", [])
        except urllib.error.HTTPError as exc:
            print(
                f"  [ERRO] HTTP {exc.code} ao buscar '{query}' (tentativa {attempt + 1}/3)",
                file=sys.stderr,
            )
            if exc.code == 403 and attempt < 2:
                wait_seconds = 2 * (attempt + 1)
                print(f"  [INFO] Aguardando {wait_seconds}s para tentar novamente...", file=sys.stderr)
                time.sleep(wait_seconds)
                continue
            return []
        except urllib.error.URLError as exc:
            print(f"  [ERRO] Falha ao buscar '{query}': {exc}", file=sys.stderr)
            return []

    return []


def build_affiliate_url(permalink: str, affiliate_id: str) -> str:
    """Adiciona o parâmetro matt_tool ao URL do produto."""
    parsed = urllib.parse.urlparse(permalink)
    qs = urllib.parse.parse_qs(parsed.query, keep_blank_values=True)
    qs["matt_tool"] = [affiliate_id]
    new_query = urllib.parse.urlencode(qs, doseq=True)
    return parsed._replace(query=new_query).geturl()


def pick_best_result(results: list[dict]) -> dict | None:
    """
    Escolhe o melhor resultado priorizando:
    1. Condition == 'new'
    2. Maior número de vendas (sold_quantity)
    """
    if not results:
        return None
    new_items = [r for r in results if r.get("condition") == "new"]
    candidates = new_items if new_items else results
    return max(candidates, key=lambda r: r.get("sold_quantity", 0))


# ---------------------------------------------------------------------------
# Atualização do affiliate-config.js
# ---------------------------------------------------------------------------

def read_config(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_config(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8")


def update_affiliate_links_in_js(js_content: str, new_links: dict[str, str]) -> str:
    """
    Substitui o bloco AFFILIATE_LINKS dentro do JS.
    Gera o novo objeto mantendo a formatação existente.
    """
    lines = ["  var AFFILIATE_LINKS = {"]
    items = list(new_links.items())
    for i, (key, url) in enumerate(items):
        comma = "," if i < len(items) - 1 else ""
        lines.append(f"    '{key}': '{url}'{comma}")
    lines.append("")
    lines.append("    /* Adicione novos produtos aqui seguindo o mesmo padrão:")
    lines.append("    'id-do-produto': 'https://mercadolivre.com/sec/SEU_LINK_AQUI', */")
    lines.append("  };")
    new_block = "\n".join(lines)

    # Regex para localizar o bloco inteiro de AFFILIATE_LINKS
    pattern = re.compile(
        r"var AFFILIATE_LINKS\s*=\s*\{.*?\};",
        re.DOTALL,
    )
    updated, count = pattern.subn(new_block.lstrip(), js_content)
    if count == 0:
        raise ValueError("Bloco AFFILIATE_LINKS não encontrado em affiliate-config.js")
    return updated


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Atualiza affiliate-config.js com links reais do Mercado Livre."
    )
    parser.add_argument(
        "--affiliate-id",
        default=AFFILIATE_ID,
        metavar="ID",
        help=f"ID de afiliado (matt_tool). Padrão: {AFFILIATE_ID}",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Exibe os resultados sem gravar o arquivo.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=5,
        metavar="N",
        help="Número de resultados da API por produto (padrão: 5).",
    )
    args = parser.parse_args()

    affiliate_id = args.affiliate_id
    print(f"ID de afiliado: {affiliate_id}")
    print(f"Dry-run: {args.dry_run}\n")

    new_links: dict[str, str] = {}
    failed: list[str] = []

    for product_key, query in PRODUCT_QUERIES.items():
        print(f"🔍 [{product_key}] Buscando: '{query}'")
        results = search_mercadolivre(query, limit=args.limit)
        best = pick_best_result(results)

        if best:
            permalink = best.get("permalink", "")
            affiliate_url = build_affiliate_url(permalink, affiliate_id)
            new_links[product_key] = affiliate_url
            print(f"   ✅ {best.get('title', '')}")
            print(f"      {affiliate_url}")
        else:
            print(f"   ⚠️  Nenhum resultado encontrado — mantendo URL anterior.")
            failed.append(product_key)

        # Pausa para não sobrecarregar a API
        time.sleep(2)

    print()

    if args.dry_run:
        print("=== DRY-RUN: nenhum arquivo foi alterado. ===")
        return

    # Lê o conteúdo atual, preserva produtos não encontrados com sua URL original
    js_content = read_config(AFFILIATE_CONFIG_PATH)

    # Extrai links existentes para manter fallback dos não encontrados
    existing: dict[str, str] = {}
    for match in re.finditer(r"'([^']+)':\s*'([^']+)'", js_content):
        existing[match.group(1)] = match.group(2)

    for key in failed:
        if key in existing:
            new_links[key] = existing[key]
            print(f"↩️  [{key}] Mantendo URL anterior: {existing[key]}")

    # Garante a mesma ordem do PRODUCT_QUERIES
    ordered_links = {k: new_links[k] for k in PRODUCT_QUERIES if k in new_links}

    updated_js = update_affiliate_links_in_js(js_content, ordered_links)
    write_config(AFFILIATE_CONFIG_PATH, updated_js)
    print(f"✅ {AFFILIATE_CONFIG_PATH} atualizado com sucesso.")

    if failed:
        print(f"\n⚠️  Produtos sem resultado na API: {', '.join(failed)}")
        print("   Verifique as queries em PRODUCT_QUERIES e tente novamente.")


if __name__ == "__main__":
    main()
