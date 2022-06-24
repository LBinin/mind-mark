/**
 * 该解析器根据 mdast，解析出支持的对应的 md 语法
 */

import {
  Markdown,
  BlockquoteContent,
  HeadingContent,
  MarkdownParagraph,
  MarkdownStrong,
  MarkdownEmphasis, MarkdownList, MarkdownListItem
} from "../model";

/**
 * 抽象节点解析：Title
 */
export function resolveTitle(titleList: HeadingContent[], plain?: boolean) {
  const content = titleList.map((title, index) => {
    switch (title.type) {
      case Markdown.Text:
        return title.value
      case Markdown.InlineCode:
        return plain ? title.value : <code key={title.value}>{title.value}</code>
      case Markdown.Strong:
        return plain ? resolveStrong(title, plain) : <b key={index}>{resolveStrong(title)}</b>
      case Markdown.Emphasis:
        return plain ? resolveEmphasis(title, plain) : <i key={index}>{resolveEmphasis(title)}</i>
      default:
        return plain ? "" : null;
    }
  });

  return plain ? content.join("") : content;
}

/**
 * 抽象节点解析：Callout
 */
export function resolveCallout(callout: BlockquoteContent) {
  switch (callout.type) {
    case Markdown.Paragraph:
      return <p>{resolveParagraph(callout)}</p>
    case Markdown.List:
      return resolveList(callout);
    default:
      return null;
  }
}

/**
 * 基本节点解析：Paragraph
 */
export function resolveParagraph(paragraph: MarkdownParagraph) {
  return paragraph.children.map((child, index) => {
    switch (child.type) {
      case Markdown.Text:
        return child.value
      case Markdown.InlineCode:
        return <code key={`${child.value}$$${index}`}>{child.value}</code>
  case Markdown.Strong:
    return <b key={index}>{resolveStrong(child)}</b>
  case Markdown.Emphasis:
    return <i key={index}>{resolveEmphasis(child)}</i>
  default:
    return null;
  }
  });
}


export function resolveList(list: MarkdownList, index?: number) {
  const listItems = list.children.map((item, index) =>
    <li key={index}>{resolveListItem(item)}</li>
  );
  return list.ordered ? <ol key={index}>{listItems}</ol> : <ul key={index}>{listItems}</ul>
}

export function resolveListItem(item: MarkdownListItem) {
  return item.children.map((content, index) => {
    switch (content.type) {
      case Markdown.Paragraph:
        return <p key={index}>{resolveParagraph(content)}</p>;
      case Markdown.List:
        return resolveList(content, index);
      default:
        return null;
    }
  })
}

/**
 * 基本节点解析：Strong
 */
export function resolveStrong(strong: MarkdownStrong, plain?: boolean) {
  return strong.children.map(item => {
    switch (item.type) {
      case Markdown.Text:
        return item.value
      case Markdown.InlineCode:
        return plain ? item.value : <code key={item.value}>{item.value}</code>
      default:
        return plain ? "" : null;
    }
  })
}

/**
 * 基本节点解析：Emphasis
 */
export function resolveEmphasis(emphasis: MarkdownEmphasis, plain?: boolean) {
  return emphasis.children.map(item => {
    switch (item.type) {
      case Markdown.Text:
        return item.value
      case Markdown.InlineCode:
        return plain ? item.value : <code key={item.value}>{item.value}</code>
      default:
        return plain ? "" : null;
    }
  })
}
