import { FormControl, FormGroup, Validators } from "@angular/forms";

export class LinkForm {
    public EditLinkForm: FormGroup = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256),
            Validators.pattern(/^\S/)
        ]),
        bannerImageUrl: new FormControl('', [ ]),
        linkType: new FormControl('', [
            Validators.required, 
        ]),
        link: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256),
            Validators.pattern(/^\S/)
        ])

    });

    public AddLinkForm: FormGroup = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256),
            Validators.pattern(/^\S/)
        ]),
        bannerImageUrl: new FormControl('', [ ]),
        linkType: new FormControl('', [
            Validators.required, 
        ]),
        link: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256),
            Validators.pattern(/^\S/)
        ])
    });
}
