export enum Markdown {
  Heading = "heading",
  Text = "text",
  InlineCode = "inlineCode",
  Blockquote = "blockquote",
  Paragraph = "paragraph",
  Strong = "strong",
  ThematicBreak = "thematicBreak",
  Emphasis = "emphasis",
  List = "list",
  ListItem = "listItem",
}

// https://github.com/syntax-tree/mdast

export type ASTNode = // 支持识别的 Markdown 语法，于 utils/index.ts 的 buildMindNodes 实现识别
  MarkdownHeading |
  MarkdownBlockquote |
  MarkdownThematicBreak;

export type MarkdownDepth = 1 | 2 | 3 | 4 | 5 | 6;

// 支持的语法中可能用到的行内节点
export type HeadingContent = MarkdownText | MarkdownInlineCode | MarkdownStrong | MarkdownEmphasis;
export type BlockquoteContent = MarkdownParagraph | MarkdownList;

export type ParagraphContent = MarkdownText | MarkdownInlineCode | MarkdownStrong | MarkdownEmphasis;
export type StrongContent = MarkdownText | MarkdownInlineCode;
export type EmphasisContent = MarkdownText | MarkdownInlineCode;

/* 支持的 MD 语法 */

// 标题（#语法）
export interface MarkdownHeading {
  type: Markdown.Heading;
  depth: MarkdownDepth;
  children: HeadingContent[];
}
// 引用（>语法）
export interface MarkdownBlockquote {
  type: Markdown.Blockquote;
  children: BlockquoteContent[];
}
// 分割线
export interface MarkdownThematicBreak {
  type: Markdown.ThematicBreak,
}
// 段落
export interface MarkdownParagraph {
  type: Markdown.Paragraph,
  children: ParagraphContent[];
}
// 列表
export interface MarkdownList {
  type: Markdown.List,
  ordered: boolean;
  children: MarkdownListItem[];
}
export interface MarkdownListItem {
  type: Markdown.ListItem,
  children: Array<MarkdownList | MarkdownParagraph>;
}

/* 行内节点（基本节点） */
export interface MarkdownText {
  type: Markdown.Text;
  value: string;
}

export interface MarkdownInlineCode {
  type: Markdown.InlineCode;
  value: string;
}

export interface MarkdownStrong {
  type: Markdown.Strong;
  children: StrongContent[];
}

export interface MarkdownEmphasis {
  type: Markdown.Emphasis;
  children: EmphasisContent[];
}

/* Mind Node */
export interface MindNodeItem {
  title?: HeadingContent[];
  callout?: BlockquoteContent[];
  children?: MindNodeItem[];
}
