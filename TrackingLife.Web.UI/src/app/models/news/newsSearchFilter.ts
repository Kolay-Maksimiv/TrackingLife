import { NewsOrderType } from 'app/enums/newsOrderType';

export class NewsSearchFilter{
    searchKeyWordByTitle: string;
    searchKeyWordByLevel: string;
    searchKeyWordByDate: string;
    dateFrom: string;
    dateTo: string;
    pageNumber: number;
    take: number;
    orderType: NewsOrderType; 
    categoryId: number;
    isDelete: boolean

    constructor(_pageNumber: number, _take: number, _orderType: NewsOrderType, _categoryId: number, _searchKeyWordByTitle?: any, _searchKeyWordByLevel?:any, _searchKeyWordByDate?: any, _isDelete?:any)
    constructor(_pageNumber: number, _take: number, _orderType: NewsOrderType, _categoryId: number, _searchKeyWordByTitle: string, _searchKeyWordByLevel: string, _searchKeyWordByDate: string, _isDelete: boolean) {
        this.pageNumber = _pageNumber;
        this.take = _take;
        this.orderType = _orderType;
        this.searchKeyWordByTitle = _searchKeyWordByTitle;
        this.searchKeyWordByLevel = _searchKeyWordByLevel;
        this.searchKeyWordByDate = _searchKeyWordByDate;
        this.categoryId = _categoryId;
        this.isDelete = _isDelete;
    }
}