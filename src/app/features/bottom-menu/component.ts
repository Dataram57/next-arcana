import { Component, Input } from '@angular/core';

@Component({
    selector: 'bottom-menu',
    templateUrl: './component.html',
    styleUrls: ['./component.css']
})
export class BottomMenu {
    @Input() collapsedHeight = 70;

    collapsed = false;

    toggleMenu(): void {
        this.collapsed = !this.collapsed;
    }
}