import {ASTNode, Markdown, MarkdownHeading, MindNodeItem} from "../model";

/**
 * 构建 Mind Nodes 层级关系
 * @param nodes mdast 抽象语法树列表
 */
export function buildMindNodes(nodes: ASTNode[]) {
  if (nodes.length < 1) {
    return;
  }

  let buildProgressIndex = 0;

  const buildMindNodes = (depth: number) => {
    const currLevel: MindNodeItem[] = [];

    while (buildProgressIndex < nodes.length) {
      const node = nodes[buildProgressIndex];
      // debugger;
      switch (node.type) {
        /* 标题元素 */
        case Markdown.Heading:
          // 同级 title
          if (node.depth === depth) {
            const mindNode: MindNodeItem = {
              title: node.children,
            };
            currLevel.push(mindNode);
          }

          // 上一级 title，当前级结束，返回 currLevel 所有 node
          if (node.depth < depth) {
            buildProgressIndex--;
            return currLevel;
          }

          // 下钻
          if (node.depth > depth) {
            const prevMindNode = currLevel[currLevel.length - 1];
            prevMindNode.children = buildMindNodes(node.depth);
          }
          break;

        /* 引用 */
        case Markdown.Blockquote:
          if (currLevel.length === 0) { break; }

          const prevMindNode = currLevel[currLevel.length - 1];

          if (!prevMindNode.callout) {
            prevMindNode.callout = [];
          }

          node.children && prevMindNode.callout.push(...node.children)
          break;

        /* 分割线 */
        case Markdown.ThematicBreak:
          // TODO
          break;
        default:
          break;
      }

      buildProgressIndex++;
    }

    return currLevel;
  }

  const firstHeadingNodeIndex = nodes.findIndex(i => i.type === Markdown.Heading);

  if (firstHeadingNodeIndex === -1) {
    return [];
  }

  return buildMindNodes(
    (nodes[firstHeadingNodeIndex] as MarkdownHeading).depth,
  );
}

export function generateNodeId(title: string) {
  try {
    return encodeURIComponent(title);
  } catch {
    return title;
  }
}
