export class SettingsModel {

  public sentNotification: boolean;
  public allowComments: boolean;
  public allowEmojis: boolean;
  public allowCategorySetting: boolean;

  public constructor(init?: Partial<SettingsModel>) {
      Object.assign(this, init);
  }
}
