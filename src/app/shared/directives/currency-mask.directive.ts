import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyMask]'
})
export class CurrencyMaskDirective {
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement as HTMLInputElement;
  }

  ngOnInit() {
    this.formatarValor(this.el.value);
  }

  @HostListener('input', ['$event.target.value']) onInputChange(value: string) {
    this.formatarValor(value);
  }

  private formatarValor(value: string) {
    let valor = value.replace(/\D/g, '');

    if (valor) {
      valor = (parseInt(valor, 10) / 100).toFixed(2);
      valor = valor.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      valor = 'R$ ' + valor;
    } else {
      valor = '';
    }

    this.el.value = valor;
  }
}
