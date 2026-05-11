import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'popup-screen',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './component.html',
    styleUrls: ['./component.css']
})
export class PopupScreen {
    @Input() visible = false;
    @Input() title = 'Popup Title';

    @Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }
}