import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-counter',
    standalone: true,
    templateUrl: './counter.html',
    styleUrls: ['./counter.css']
})
export class CounterComponent {
    count = 0;

    @Output() countChange = new EventEmitter<number>();

    increment() {
        this.count++;
        this.countChange.emit(this.count);
    }
}