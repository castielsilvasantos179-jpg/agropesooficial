# Validação da página de produto

URL temporária testada: https://5173-ivi52fzieysv6ki0p121c-07c8c89b.us2.manus.computer/produto/balanca-barra-60

Correção observada na página de produto:

- Preço principal exibido como **R$ 999,90**.
- Texto complementar exibido como **à vista no Pix**.
- Condição alternativa exibida como **ou R$ 1.490,00 em até 10x no cartão**.

Correção observada no modal de compra:

- Valor unitário no Pix exibido como **R$ 999,90**.
- Valor no cartão exibido como **R$ 1.490,00 em até 10x**.
- Total no Pix e total no cartão calculados conforme a quantidade selecionada.

Build validado com sucesso por `pnpm check` e `pnpm build`.
