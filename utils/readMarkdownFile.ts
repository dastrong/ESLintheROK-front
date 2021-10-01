import path from 'path';
import fs from 'fs-extra';

export const readMarkdownFile = async (fileName: string): Promise<string> => {
  const filePath = path.join(process.cwd(), fileName);
  const fileContents = await fs.readFile(filePath, { encoding: 'utf-8' });
  return fileContents;
};
