export interface FileModule extends File {
  path: string;
  fileName: string;
  preview: string;
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
