export class FileViewModel {
  public imageUrl: string;
  public fileUrl: string;

  public constructor(init?: Partial<FileViewModel>) {
      Object.assign(this, init);
  }
}
