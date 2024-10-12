# SVG to React Component

*Leia isso em outros idiomas: [English](../README.md), [Español](./README_es.md)*

Transforme seus SVGs em componentes React com um simples renomeio de arquivo! 🎨 → 🚀

<!-- Video -->

## Características ✨

- 🔄 Conversão automática de SVG para React (JSX/TSX)
- 🎨 Mantém a estrutura e estilo original do SVG
- 🚀 Suporte para JSX e TSX com tipagem automática
- 💅 Lida com estilos inline e classes CSS
- 📝 Gera nomes de componentes inteligentes baseados no nome do arquivo
- 🔧 Zero configuração necessária!

## Como Usar 🛠️

1. Localize o arquivo SVG no seu projeto
2. Renomeie o arquivo de `.svg` para `.jsx` ou `.tsx`
3. Voilà! Seu componente React está pronto para uso

![Demonstração de Uso](images/demo.gif)

## Exemplo Rápido 👁️‍🗨️

**Antes (`icon.svg`):**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="red" />
</svg>
```

**Depois (`Icon.jsx`):**

```jsx
const Icon = (props) => {
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <circle cx={50} cy={50} r={40} fill="red" />
    </svg>
  );
};

export default Icon;
```

Para TypeScript (`.tsx`), o componente incluirá tipagem automática!

## Por que usar SVG to React Component? 🤔

- ⏱️ Economize tempo convertendo SVGs complexos com um único clique
- 🧩 Ideal para trabalhar com sistemas de design e bibliotecas de componentes
- 🎛️ Mantenha o controle total sobre seus SVGs no React
- 🚫 Diga adeus ao copiar e colar manual de SVGs!

## Dicas Profissionais 💡

1. Use para converter ícones SVG em componentes React reutilizáveis
2. Combine com styled-components ou CSS Modules para estilos dinâmicos
3. Aproveite as props do React para controlar cores e tamanhos do SVG

## Solução de Problemas 🔍

Encontrou um probleminha? Tente estas dicas rápidas:

1. Verifique se o arquivo SVG é válido
2. Confira as permissões do arquivo
3. Dê um restart no VSCode e tente novamente

Ainda com problemas? Abra uma issue no nosso [GitHub](https://github.com/jairochabr/svg-to-react-component/issues). Estamos aqui para ajudar!

## Faça Parte da Nossa Jornada de Código! 🚀

Adora usar o SVG to React Component? Você pode fazer parte da nossa jornada de desenvolvimento!

### 🌟 Estrela no GitHub

Se este projeto te ajudou, que tal dar uma estrela no nosso [repositório](https://github.com/your-username/svg-to-react-component)? É grátis e nos motiva muito!

### 🐛 Feedback e Contribuições

Suas ideias são ouro para nós! Abra uma [issue](https://github.com/your-username/svg-to-react-component/issues) ou envie um pull request. Toda contribuição conta!

### ☕ Café para os Devs

Se o SVG to React Component economizou seu tempo (e sabemos que economizou!), que tal nos pagar um café? Sua contribuição ajuda a manter o projeto vivo e nos permite dedicar mais tempo para torná-lo ainda melhor!

<a href="https://www.buymeacoffee.com/your-username" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

Cada xícara de café se transforma em novas features, melhor documentação e suporte contínuo. É como se você estivesse sentado conosco, planejando o futuro desta ferramenta!

### 🎉 Hall da Fama dos Apoiadores

Quer ver seu nome (ou de sua empresa) brilhando no nosso README? Todos os apoiadores serão eternizados no nosso Hall da Fama! É a nossa forma de dizer "Valeu demais!" 🙏

## O Que Vem Por Aí? 🔮

Estamos sempre trabalhando para melhorar! Aqui estão algumas ideias para o futuro:

- Suporte para mais frameworks (Vue, Svelte)
- Opções de customização avançadas
- Integração com sistemas de design populares

Tem uma ideia incrível? Compartilhe conosco!

## Licença 📄

Esta extensão é licenciada sob a [Licença MIT](LICENSE.md).

---

Desenvolvido com ❤️ e muito ☕ por [@jairochabr](https://github.com/jairochabr)

[⭐ Avalie esta extensão](https://marketplace.visualstudio.com/items?itemName=jairochabr-publisher.svg-to-react-component&ssr=false#review-details)

[🐛 Reportar um problema](https://github.com/jairochabr/svg-to-react/issues)

[💡 Solicitar uma feature](https://github.com/jairochabr/svg-to-react/issues)
