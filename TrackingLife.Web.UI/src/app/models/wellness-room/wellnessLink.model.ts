import { LinkType } from "app/enums/LinkType";

export class WellnessLinkModel {
    public id: number;
    public title: string;
    public bannerImageUrl: string;
    public link: string;
    public linkType: LinkType;

    public constructor(init?: Partial<WellnessLinkModel>) {
        Object.assign(this, init);
    }
}