export class DashboardResponceModel {
    public installedApps: LineChartResponce<LineChartViewMode>;
    public newUsers: LineChartResponce<NameValueViewMode>;
    public activeUsers: LineChartResponce<LineChartViewMode>;
    public popularSections: LineChartResponce<NameValueViewMode>;
    public popularNews: LineChartResponce<NameValueViewMode>;
    public popularLinks: LineChartResponce<NameValueViewMode>;
    public popularDocuments: LineChartResponce<NameValueViewMode>;
}

export class LineChartResponce<T> {
    public data: T[];
    public total: number;
    public prevCount: number;
}

export class LineChartViewMode {
    public name: string;
    public nameValueViewMode: NameValueViewMode;
}

export class NameValueViewMode {
    public value: number;
    public name: string;
}