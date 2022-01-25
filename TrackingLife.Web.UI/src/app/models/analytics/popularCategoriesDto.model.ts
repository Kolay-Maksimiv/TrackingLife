export class PopularCategoriesDto{
    public companyId: number;
    public companyName: string;
    public popularCategories : PopularCategoriesBaseDto[];
    public showDetails: boolean;
    public isSystemAdmin: boolean;
}

export class PopularCategoriesBaseDto{
    public categoryId: number;
    public categoryName: string;
    public companyId: number;
    public companyName: string;
    public newsCount: number;
}