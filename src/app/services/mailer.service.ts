import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ContactForm, EMPTY_CONTACT_FORM } from './../models/ContactForm';

const BACKEND_URL = `${environment.imtdAPI}/mailer`;

@Injectable({
  providedIn: 'root',
})
export class MailerService {
  constructor(private http: HttpClient) {}

  sendEmail(contactForm: ContactForm) {
    return this.http.post<any>(`${BACKEND_URL}`, contactForm);
  }
}
