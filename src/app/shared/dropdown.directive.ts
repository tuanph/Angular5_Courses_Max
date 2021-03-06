import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';



@Directive({
    selector: '[appDropDown]'
})

export class DropdownDirective implements OnInit {

    @HostBinding('class.open') isOpen = false;
    @HostListener('click', ['$event'])
    toggleOpen() {
        this.isOpen = !this.isOpen;
    }
    // constructor(private elementRef: ElementRef, private render: Renderer2) {
    // }

    ngOnInit(): void {

    }
}
