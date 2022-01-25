//import { FileViewModel } from './FileViewModel';
import { NewsModel } from './news.model';

export class NewsFileViewModel {
  public id: number;
  public newsId: number;
  public news: NewsModel;
  public fileId: number;
  //public file: FileViewModel;

    public constructor(init?: Partial<NewsFileViewModel>) {
        Object.assign(this, init);
    }
}
