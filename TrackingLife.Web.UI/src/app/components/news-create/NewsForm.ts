import { FormControl, FormGroup, Validators } from "@angular/forms";

export class NewsForm {
    public EditNewsForm: FormGroup = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256),
            Validators.pattern(/^\S/)
        ]),
        contentHtml: new FormControl('', [
            //Validators.maxLength(255),
            //Validators.pattern(/^\S/)
        ]),

        bannerImageUrl: new FormControl('', [
          //Validators.maxLength(255),
          //Validators.pattern(/^\S/)
        ]),


        // assignedToProfileId: new FormControl(null),
        level: new FormControl(null, [
            Validators.required
        ]),
        categoryList: new FormControl(null),
        // startDate: new FormControl(null),
        // dueDate: new FormControl(null),
        // projectId: new FormControl(null),
        // estimate: new FormControl('', [
        //     Validators.maxLength(2),
        //     Validators.min(1),
        //     Validators.pattern('[0-9]*')
        // ]),
        // progress: new FormControl(null, [
        //     Validators.min(0),
        //     Validators.max(100),
        //     Validators.pattern(/^[0-9]+$/)
        // ]),
        // assignedTo: new FormControl(null),
        // comment: new FormControl(null, [
        //     Validators.maxLength(255),
        //     Validators.pattern(/^\S/)
        // ])
    });

    public AddNewsForm: FormGroup = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256),
            Validators.pattern(/^\S/)
        ]),
        contentHtml: new FormControl('', [
            Validators.required,
            //Validators.maxLength(255),
            Validators.pattern(/^\S/)
        ]),
        bannerImageUrl: new FormControl('', [
          //Validators.maxLength(255),
          //Validators.pattern(/^\S/)
        ]),
        level: new FormControl(null, [
          Validators.required
        ]),
        categoryList: new FormControl(null, [
            Validators.required
        ]),
        sendNotification: new FormControl(false),
        showInNews: new FormControl(0),
        allowComments: new FormControl(true),
        allowEmojis: new FormControl(true),
        selectPublish: new FormControl(0)
        // acceptanceCriteria: new FormControl('', []),
        // assignedToProfileId: new FormControl(null),
        // state: new FormControl(null, [
        //     Validators.required
        // ]),
        // startDate: new FormControl(null),
        // dueDate: new FormControl(null),
        // type: new FormControl (),
        // priority: new FormControl(null, [
        //     Validators.min(0),
        //     Validators.max(5),
        //     Validators.pattern(/[0-9+]/)
        // ]),
        // estimate: new FormControl('', [
        //     Validators.maxLength(2),
        //     Validators.min(1),
        //     Validators.pattern(/[0-9+]/)
        // ]),
        // progress: new FormControl(null, [
        //     Validators.min(0),
        //     Validators.max(100),
        //     Validators.pattern(/[0-9+]/)
        // ]),
        // comment: new FormControl(null, [
        //     Validators.maxLength(255),
        //     Validators.pattern(/^\S/)
        // ])
    });
}
