import { CategoryOrderType } from 'app/enums/categoryOrderType';

export class CategoriesSearchFilter{
    searchKeyWordByName: string;
    pageNumber: number;
    take: number;
    orderType: CategoryOrderType; 

    constructor(_pageNumber: number, _take: number, _orderType: CategoryOrderType, _searchKeyWordByName?: any)
    constructor(_pageNumber: number, _take: number, _orderType: CategoryOrderType, _searchKeyWordByName: string) {
        this.pageNumber = _pageNumber;
        this.take = _take;
        this.orderType = _orderType;
        this.searchKeyWordByName = _searchKeyWordByName;
    }
}