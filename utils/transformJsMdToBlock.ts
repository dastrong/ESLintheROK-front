import shuffle from 'lodash.shuffle';
import { colors } from 'utils/colors';

type NewLine = '\n';

type Children =
  | NewLine
  | string
  | {
      tag: string;
      props: any;
      children: Children[];
    };

type MarkdownToJs = {
  body: {
    children: (NewLine | Children)[];
  };
};

export type FilteredChildren = {
  tag: string;
  props: any;
  children: Children[];
};

export const transformJsMdToBlock = (output: MarkdownToJs) => {
  // removed heading, newLine, subheadings
  const childrenContent = output.body.children.slice(3);

  // remove the newLine strings from the children's array - we'll style with margin instead
  const realChildrenContent = childrenContent.filter(
    markChild => markChild !== '\n'
  ) as FilteredChildren[];

  // remove the newLines that are nested - *there shouldn't be any further nesting*
  const finalChildrenContent = realChildrenContent.map(
    (markChild: FilteredChildren) => {
      const newChildren = markChild.children.filter(
        markChildChild => markChildChild !== '\n'
      );

      return { ...markChild, children: newChildren };
    }
  );

  const panels = finalChildrenContent.reduce((acc, cVal) => {
    // the start of a new entry
    if (cVal.tag === 'h2') {
      // we don't want the id to link it so we can just grab the second item; the text
      const header = cVal.children[1];
      // start a new entry with the header from above
      acc.push({ header, content: [] });
    } else {
      // the content of an entry
      const lastItemIndex = acc.length - 1;
      // create an element based on the children given
      acc[lastItemIndex].content.push(cVal);
    }
    return acc;
  }, []);

  const mixColors = shuffle(colors);

  return panels.map((panel, i) => ({ ...panel, color: mixColors[i] }));
};

transformJsMdToBlock;
