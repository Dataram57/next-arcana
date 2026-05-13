import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CardSelectorCard {
    id: string;
    name: string;
    src?: string;
}

@Component({
    selector: 'card-selector',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './component.html',
    styleUrls: ['./component.css']
})
export class CardSelector {

    //input
    @Input() cards: CardSelectorCard[] = [];
    
    //output
    @Output() onchange = new EventEmitter<number>();
    @Output() onselect = new EventEmitter<number>();

    //variables
    index = 0;
    
    //misc
    Math = Math;

    //================================================================
    //#region Field
    
    private mod(i: number): number {
        return (i + this.cards.length) % this.cards.length;
    }

    //#endregion

    //================================================================
    //#region Swipe Support
    
    // swipe support (optional but nice)
    private startX = 0;

    @HostListener('pointerdown', ['$event'])
    down(e: PointerEvent) {
        this.startX = e.clientX;
    }

    @HostListener('pointerup', ['$event'])
    up(e: PointerEvent) {
        const dx = e.clientX - this.startX;

        if (dx > 50)
            this.prev();
        else if (dx < -50)
            this.next();
    }

    //#endregion

    //================================================================
    //#region Actions

    animationTick = 0;

    next() {
        this.animationTick++;
        this.index = this.mod(this.index + 1);
        this.onchange.emit(this.index);
    }

    prev() {
        this.animationTick++;
        this.index = this.mod(this.index - 1);
        this.onchange.emit(this.index);
    }

    selectCurrent() {
        this.onselect.emit(this.index);
    }

    //#endregion

    //================================================================
    //#region Visual

    getStackWindow(depth = 5) {
        const n = this.cards.length;
        if (!n) return [];

        const result = [];

        for (let i = -2; i <= 2; i++) {
            const idx = this.mod(this.index + i);
            result.push({
            ...this.cards[idx],
            offset: i
            });
        }
        console.log(result);
        return result;
    }

    getTransform(offset: number): string {
        const y = offset * 20;
        const scale = 1 - Math.abs(offset) * 0.07;
        const rotate = offset * 3;

        return `translate3d(0, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
    }

    trackById(index: number, card: CardSelectorCard & { offset: number }) {
        return card.id;
    }

    //#endregion

}