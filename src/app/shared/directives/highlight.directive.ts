import { Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit{
  @HostBinding('style.backgroundColor') background : string;

  constructor(private element : ElementRef, private render : Renderer2) { }

  ngOnInit() {
    //this.element.nativeElement.style.backgroundColor = "red";
    this.render.setStyle(this.element.nativeElement, 'background-color', 'red');
  }

  @HostListener('mouseenter') mouseEnter (eventData : Event){
    this.render.setStyle(this.element.nativeElement, 'background-color', 'blue');
    this.render.setStyle(this.element.nativeElement, 'height', '50px');
    this.background='blue';
  }

  @HostListener('mouseleave') mouseLeave (eventData : Event){
   // this.render.setStyle(this.element.nativeElement, 'background-color', 'red');
    this.render.setStyle(this.element.nativeElement, 'height', 'unset');
    this.background='pink';
  }

}
