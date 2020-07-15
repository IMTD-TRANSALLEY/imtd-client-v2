import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { MailerService } from 'src/app/services/mailer.service';
import { ContactForm, EMPTY_CONTACT_FORM } from './../../models/ContactForm';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  isLoading: boolean = false; // toggle display loading spinner

  form: ContactForm = { ...EMPTY_CONTACT_FORM }; // empty contact form object

  @ViewChild('modal') modal; // reference to modal template
  @ViewChild('contactForm') templateForm: NgForm; // reference to form template

  modalTitle: string = ''; // modal title
  modalContent: string = ''; // modal content

  constructor(
    private mailerService: MailerService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Check if form is valid
  isFormValid(): boolean {
    return (
      this.form.email !== '' &&
      this.form.phone !== '' &&
      this.form.title !== '' &&
      this.form.content !== ''
    );
  }

  onSubmit() {
    this.isLoading = true; // toggle on spinner
    this.displayModal(); // display modal

    // Send email
    this.mailerService.sendEmail(this.form).subscribe(
      (res) => {
        console.log(res);
        // On success, toggle off spinner and display a success message
        this.isLoading = false;
        this.modalTitle = 'Succès';
        this.modalContent = 'Votre message a été envoyé avec succès';
      },
      (err) => {
        console.log(err);
        // On success, toggle off spinner and display an error message
        this.isLoading = false;
        this.modalTitle = 'Erreur';
        this.modalContent = `Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer plus tard`;
      }
    );
  }

  // Display modal and routing on close
  private displayModal() {
    this.resetModal();
    this.modalTitle = 'Traitement...';
    this.modalService
      .open(this.modal, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
      })
      .result.then(
        (result) => {
          this.router.navigate(['/']);
        },
        (reason) => {
          this.router.navigate(['/']);
        }
      );
  }

  // Reset modal title and content
  private resetModal() {
    this.modalTitle = '';
    this.modalContent = '';
  }
}
