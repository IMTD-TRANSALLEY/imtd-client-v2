import { Component, OnInit } from '@angular/core';
import { ContactForm, EMPTY_CONTACT_FORM } from './../../models/ContactForm';
import { MailerService } from 'src/app/services/mailer.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  form: ContactForm = { ...EMPTY_CONTACT_FORM };

  constructor(private mailerService: MailerService) {}

  ngOnInit(): void {}

  isFormValid(): boolean {
    return (
      this.form.email !== '' &&
      this.form.phone !== '' &&
      this.form.title !== '' &&
      this.form.content !== ''
    );
  }

  onSubmit() {
    this.mailerService.sendEmail(this.form).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
