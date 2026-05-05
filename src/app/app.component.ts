import { Component } from '@angular/core';
import { CounterComponent } from './features/counter/counter.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CounterComponent],
    templateUrl: './app.html'
})
export class AppComponent {
    values: number[] = [];

    updateValue(index: number, value: number) {
        this.values[index] = value;
        console.log(this.values);
    }
}