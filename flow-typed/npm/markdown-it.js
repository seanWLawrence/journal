// @flow strict

declare module 'markdown-it' {
  declare interface MarkdownItInterface {
    /**
     * Renders a Markdown string into an HTML string
     * @param {markdown} string
     * @returns {html} String og HTML
     */
    render(markdown: string): string;
  }

  declare type Options = {
    html: boolean, // Enable HTML tags in source
    xhtmlOut: boolean, // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: boolean, // Convert '\n' in paragraphs into <br>
    langPrefix: string, // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    linkify: boolean, // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    typographer: boolean,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: string,

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: (str: string, lang: string) => string,
  };

  declare export default class MarkdownIt implements MarkdownItInterface {
    constructor(options?: Options): void;
    render(markdown: string): string;
  }
}
