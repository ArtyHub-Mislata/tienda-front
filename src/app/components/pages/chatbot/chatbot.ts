import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpService } from '../../../services/http-service';

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

  constructor(private sanitizer: DomSanitizer, private httpService: HttpService) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.chatbotUrl);
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    if (event.data && event.data.type === 'FILTRAR_ARTWORKS') {
      const categoria = event.data.categoria;
      const precio = event.data.precio;

      this.httpService.updateCategory(categoria);
      this.httpService.updateMaxPrice(precio);

      setTimeout(() => {
        const element = document.getElementById('content');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
  }
}
