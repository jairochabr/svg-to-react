import * as vscode from "vscode";
import { readFile, writeFile } from "fs/promises";

// Constantes para extensões de arquivo
const SVG_EXTENSION = ".svg";
const JSX_EXTENSION = ".jsx";
const TSX_EXTENSION = ".tsx";

// Expressões regulares compiladas para melhor performance
const KEBAB_CASE_REGEX = /-([a-z])/g;
const ATTRIBUTE_REGEX = /([a-zA-Z0-9-_:]+)[:=]["']([^"']*)["']/g;
const ARIA_REGEX = /^aria-/;

/**
 * Ativa a extensão
 * @param context O contexto da extensão
 */
export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.workspace.onWillRenameFiles(handleFileRename);
  context.subscriptions.push(disposable);
}

/**
 * Lida com o evento de renomeação de arquivos
 * @param event O evento de renomeação
 */
async function handleFileRename(event: vscode.FileWillRenameEvent): Promise<void> {
  const renamePromises = event.files.map(async ({ oldUri, newUri }) => {
    if (isSvgToReactConversion(oldUri, newUri)) {
      await convertSvgToReact(oldUri, newUri);
    }
  });

  await Promise.all(renamePromises);
}

/**
 * Verifica se a renomeação é uma conversão de SVG para React
 * @param oldUri URI do arquivo antigo
 * @param newUri URI do novo arquivo
 * @returns true se for uma conversão de SVG para React
 */
function isSvgToReactConversion(oldUri: vscode.Uri, newUri: vscode.Uri): boolean {
   const isSvgConversionValid = oldUri.fsPath.endsWith(SVG_EXTENSION) 
   && (newUri.fsPath.endsWith(JSX_EXTENSION) || newUri.fsPath.endsWith(TSX_EXTENSION));
   return isSvgConversionValid;
}

/**
 * Valida o conteúdo do SVG
 * @param svgContent O conteúdo do SVG a ser validado
 * @returns true se o SVG for válido, false caso contrário
 * @throws {Error} Se o SVG estiver vazio ou mal formatado
 */

function validateSvgContent(svgContent: string): boolean {
  const svgRegex = /<svg[^>]*>[\s\S]*<\/svg>/;
  return svgRegex.test(svgContent);
}

/**
 * Converte um arquivo SVG para um componente React
 * @param oldUri URI do arquivo SVG
 * @param newUri URI do novo arquivo React
 */
async function convertSvgToReact(oldUri: vscode.Uri, newUri: vscode.Uri): Promise<void> {
  try {
    const svgContent = await readFile(oldUri.fsPath, "utf-8");
    if (!validateSvgContent(svgContent)) {
      throw new Error("Invalid SVG format");
    }
    if (!svgContent.trim()) {
      throw new Error("SVG file is empty");
    }
    const reactComponent = createReactComponent(svgContent, newUri.fsPath);
    await writeFile(oldUri.fsPath, reactComponent);
    vscode.window.showInformationMessage(
      `File ${getComponentName(
        newUri.fsPath
      )}.svg converted to a React component`
    );
  } catch (error) {
    handleConversionError(error);
    // Adicionar log para debugging
    console.error("SVG conversion failed:", error);
  }
}

/**
 * Trata erros de conversão
 * @param error O erro capturado
 */
function handleConversionError(error: unknown): void {
  if (error instanceof Error) {
    vscode.window.showErrorMessage(
      `Error converting SVG to React: ${error.message}`
    );
  } else {
    vscode.window.showErrorMessage(
      "Unknown error when converting SVG to React"
    );
  }
}

/**
 * Cria o conteúdo do componente React
 * @param svgContent O conteúdo do SVG
 * @param filePath O caminho do arquivo
 * @returns O conteúdo do componente React
 */
function createReactComponent(svgContent: string, filePath: string): string {
  const componentName = getComponentName(filePath);
  const jsxElement = convertSvgToJsx(svgContent);
  const isTypeScript = filePath.endsWith(TSX_EXTENSION);
  const propsType = isTypeScript ? ": React.SVGProps<SVGSVGElement>" : "";
  const importStatement = isTypeScript
    ? 'import * as React from "react";\n\n'
    : 'import * as React from "react";\n\n';

  return `${importStatement}const ${componentName} = (props${propsType}) => {
  return (
${jsxElement}
  );
};

export default ${componentName};
`;
}

/**
 * Gera o nome do componente baseado no nome do arquivo
 * @param filePath O caminho do arquivo
 * @returns O nome do componente
 */
function getComponentName(filePath: string): string {
  const fileName = filePath.split(/[\/\\]/).pop()?.split(".")[0] || "SvgComponent";
  return fileName.split(/[-_]/).map(capitalizeFirstLetter).join("");
}

/**
 * Capitaliza a primeira letra de uma string
 * @param str A string para capitalizar
 * @returns A string com a primeira letra maiúscula
 */
function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Remove atributos desnecessários do SVG e normaliza o espaçamento
 * @param svg O conteúdo SVG
 * @returns O SVG limpo e normalizado
 */
function removeUnnecessaryAttributes(svg: string): string {
  return svg
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\s*xmlns:xlink=["'][^"']*["']/g, "")
    .replace(/\s*version=["'][^"']*["']/g, "")
    .replace(/\s*id=["'][^"']*["']/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n")
    .trim();
}

/**
 * Prepara a tag SVG adicionando suporte a props
 * @param svg O conteúdo SVG
 * @returns O SVG com suporte a props
 */
function prepareSvgTag(svg: string): string {
  return svg.replace(">", " {...props}>");
}

/**
 * Processa a tag SVG removendo atributos desnecessários e adicionando suporte a props
 * @param svg O conteúdo SVG
 * @returns O SVG processado
 */
function processSvgTag(svg: string): string {
  // Primeiro remove os atributos desnecessários
  const cleanedSvg = removeUnnecessaryAttributes(svg);
  // Depois adiciona suporte a props
  return prepareSvgTag(cleanedSvg);
}

/**
 * Converte o conteúdo SVG para JSX
 * @param svg O conteúdo SVG
 * @returns O conteúdo JSX
 */
function convertSvgToJsx(svg: string): string {
  let jsxSvg = processSvgTag(svg);
  jsxSvg = convertAttributes(jsxSvg);
  return indentJsx(jsxSvg);
}

/**
 * Converte os atributos SVG para JSX
 * @param svg O conteúdo SVG
 * @returns O SVG com atributos convertidos
 */
function convertAttributes(svg: string): string {
  return svg.replace(ATTRIBUTE_REGEX, (_, attr: string, value: string) => {
     // Preserva apenas atributos aria-*
     if (ARIA_REGEX.test(attr)) {
      return `${attr}="${value}"`;
    }

    let camelAttr = toCamelCase(attr);

    if (attr === "xlink:href") {
      return `xlinkHref="${value}"`;
    }

    if (attr === "xml:space") {
      return `xmlSpace="${value}"`;
    }

    if (camelAttr === "class") {
      return `className="${value}"`;
    }

    if (camelAttr === "style") {
      return convertStyleAttribute(value);
    }

    if (!isNaN(Number(value))) {
      return `${camelAttr}={${value}}`;
    }

    return `${camelAttr}="${value}"`;
  });
}

/**
 * Converte o atributo style para o formato JSX
 * @param styleValue O valor do atributo style
 * @returns O atributo style convertido
 */
function convertStyleAttribute(styleValue: string): string {
  const styleObject = styleValue.split(";")
    .filter((s: string) => s.trim())
    .map((s: string) => {
      const [key, value] = s.split(":");
      return `${toCamelCase(key.trim())}: "${value.trim()}"`;
    })
    .join(", ");
  return `style={{${styleObject}}}`;
}

/**
 * Converte uma string de kebab-case para camelCase
 * @param str A string em kebab-case
 * @returns A string em camelCase
 */
function toCamelCase(str: string): string {
  return str.replace(KEBAB_CASE_REGEX, (_, letter: string) =>
    letter.toUpperCase()
  );
}

/**
 * Indenta o JSX gerado
 * @param jsx O JSX para indentar
 * @returns O JSX indentado
 */
function indentJsx(jsx: string): string {
  return jsx.split("\n").map((line: string) => `    ${line.trim()}`).join("\n");
}

/**
 * Desativa a extensão
 */
export function deactivate() {}
