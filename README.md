<h1 align="center">My_Dashboard_Makes_Me_Proud</h1>

<p align="center">
  <strong>A camada Medir do MARKETING 4.0 — o dashboard unificado que responde qual canal vendeu.</strong><br>
  Motor portátil de métricas para Claude Code e Codex: lê o que as outras peças já gravam e aplica o contrato 7/30/90, onde ausência nunca é zero.
</p>

<p align="center">
  <a href="./LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-7B2FBE.svg"></a>
  <img alt="No runtime dependencies" src="https://img.shields.io/badge/runtime_dependencies-0-D5A62E.svg">
  <img alt="Claude Code and Codex" src="https://img.shields.io/badge/works_with-Claude_Code_%2B_Codex-17131F.svg">
</p>

> **Independent project:** My_Dashboard_Makes_Me_Proud is not affiliated with, endorsed by, or sponsored by any analytics vendor. It implements established marketing-attribution patterns with deterministic tooling — no third-party copy, no trademarks, no claims about tools it does not ship.

---

## Em 30 segundos

O dashboard não gera tráfego, não converte, não nutre. Ele **lê** o que o funil já gravou — cliques do tracklink, leads da LP, compras com origem — e renderiza as respostas de negócio. Hoje esse papel é "a planilha do dono" (socket 9 do pack); este motor transforma a planilha num dashboard gerado.

## Para quem é este produto?

Para o dono de loja que montou o funil com o pack e quer saber, sem exportar planilha manualmente:

- **De onde veio cada lead e cada compra** — qual peça, qual link, qual `utm_source`
- **Qual canal vende** — funil completo: visita → lead → compra, com receita por abandono e lembrete
- **O que está morrendo** — janelas 7/30/90 mostram tráfego caindo e sequências parando
- **Prova de que os sockets funcionam** — se o dashboard mostra dados, os plugs estão instalados

## Instalação

```bash
git clone https://github.com/luisroquette/My_Dashboard_Makes_Me_Proud.git
```

A skill é portátil: copie `SKILL.md` (e o conteúdo da pasta) para `~/.claude/skills/my-dashboard-makes-me-proud/` e ela fica disponível em qualquer projeto.

## O contrato de métricas

O motor existe para implementar o contrato que as outras peças só citam:

1. **Janelas 7/30/90 calendar-filled** — toda agregação compara as mesmas janelas de calendário, não contagens soltas de eventos
2. **Ausência nunca é zero** — um dia sem dado é um dia vazio explícito, nunca um 0 silencioso que lê como fracasso
3. **Anti-fabricação** — a tela mostra só o que o banco sustenta; número que o dado não sustenta é omitido, nunca estimado
4. **Somente leitura** — o dashboard nunca escreve no banco do dono; métricas nunca bloqueiam o funil

## Estado

Peça 6 do MARKETING 4.0 pack. Socket 9 em construção: hoje o contrato e a skill estão definidos; as telas de demo são a próxima entrega.
