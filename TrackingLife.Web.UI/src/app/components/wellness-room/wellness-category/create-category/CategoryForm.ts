import { FormControl, FormGroup, Validators } from "@angular/forms";

export class CategoryForm {
    public EditCategoryForm: FormGroup = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256),
            Validators.pattern(/^\S/)
        ]),
        bannerImageUrl: new FormControl('', [ ])
    });

    public AddCategoryForm: FormGroup = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256),
            Validators.pattern(/^\S/)
        ]),
        bannerImageUrl: new FormControl('', [ ])
    });
}
