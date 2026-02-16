import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chatbot } from "../chatbot/chatbot";

@Component({
  selector: 'initial-page',
  imports: [RouterLink, Chatbot],
  templateUrl: './initial-page.html',
  styleUrl: './initial-page.scss',
})
export class InitialPage {
  @ViewChild('infoSection') infoSection!: ElementRef;
  isInfoVisible = false;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isInfoVisible = true;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(this.infoSection.nativeElement);
  }
}
