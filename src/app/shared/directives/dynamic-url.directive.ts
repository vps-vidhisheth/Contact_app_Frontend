import { Directive, Input, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({
  selector: '[appDynamicUrl]',
  providers: [NgModel]
})
export class DynamicUrlDirective {
  @Input('appDynamicUrl') fieldName: string = ''; 

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {

    const currentParams = { ...this.route.snapshot.queryParams };

    if (this.fieldName) {
      currentParams[this.fieldName] = value.trim();
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: currentParams,
      replaceUrl: true
    });
  }
}
