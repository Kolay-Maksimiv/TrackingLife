import { FormControl, FormGroup, Validators } from "@angular/forms";

export class Transaction {

    public AddCategoryForm: FormGroup = new FormGroup({
        CurrentBalance: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(256),
            Validators.pattern(/^\S/)
        ]),
        Status: new FormControl('', [ ])
    });
}
