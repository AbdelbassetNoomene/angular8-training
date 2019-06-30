import { Directive, Input, HostListener, ElementRef, Renderer2, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appPropertiesHighlight]'
})
export class PropertiesHighlightDirective implements OnInit{ 

@Input() defaultRadius = '10px';
@Input() hoverRadius = '50px';
//@Input('appPropertiesHighlight') hoverRadius = '50px';

@HostBinding('style.borderRadius') radius : string;

  constructor(private element : ElementRef, private render : Renderer2) { }

  ngOnInit() {
    this.radius = this.defaultRadius;
  }

  @HostListener('mouseenter') mouseEnter (eventData : Event){
    this.radius = this.hoverRadius;
    this.render.setStyle(this.element.nativeElement, 'borderRadius', '50px');
  }

  @HostListener('mouseleave') mouseLeave (eventData : Event){
    this.radius = this.defaultRadius;
  }


}
