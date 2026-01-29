import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'c-chatbot',
  imports: [],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
})
export class Chatbot {
  chatbotUrl: string = 'https://landbot.online/v3/H-3304752-5M0QSZFK164L102Y/index.html';
  safeUrl: SafeResourceUrl;
  isOpen: boolean = false;

  constructor(private sanitizer: DomSanitizer) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.chatbotUrl);
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
  }
}
