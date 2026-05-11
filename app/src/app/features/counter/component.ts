import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'counter',
    standalone: true,
    templateUrl: './component.html',
    styleUrls: ['./component.css']
})
export class Counter {
    count = 0;

    @Output() countChange = new EventEmitter<number>();

    increment() {
        this.count++;
        this.countChange.emit(this.count);
    }
}