export class CategoryFilter {
    constructor(
        public pageNumber: number,
        public take: number){}
}

export class LinkFilter {
    constructor(
        public pageNumber: number,
        public take: number,
        public categoryId: number){}
}