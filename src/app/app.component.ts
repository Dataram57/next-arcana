import { Component } from '@angular/core';
import { CounterComponent } from './features/counter/counter.component';
import { TarotCanvasComponent } from './features/tarot/canvas/tarot-canvas.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CounterComponent,
        TarotCanvasComponent
    ],
    templateUrl: './app.html'
})
export class AppComponent {
    values: number[] = [];

    updateValue(index: number, value: number) {
        this.values[index] = value;
        console.log(this.values);
    }
}