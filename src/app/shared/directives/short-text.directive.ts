import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShortText]'
})
export class ShortTextDirective {

  @Input() set appShortText(text: string) {
    if (text == null || text.length > 5 || text.length == 0) {
      this.vcRef.clear();
    } else {
      this.vcRef.createEmbeddedView(this.templateRef);
    }

  };

  //place where we place directive in the document
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
