import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DeckSelectorCard {
    id: string;
    name: string;
    src?: string;
}

@Component({
    selector: 'deck-selector',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './component.html',
    styleUrls: ['./component.css']
})
export class DeckSelector {

    //dependencies
    private nextSound : HTMLAudioElement = new Audio('sounds/oxidvideos-taking-playing-card-2-522516.mp3');
    private prevSound : HTMLAudioElement = this.nextSound;
    private selectSound : HTMLAudioElement = this.nextSound;

    //input
    @Input() cards: DeckSelectorCard[] = [];
    
    //output
    @Output() onchange = new EventEmitter<Number>();
    @Output() onselect = new EventEmitter<Number>();

    //variables
    index = 0;
    
    //misc
    Math = Math;

    constructor(){
        this.nextSound.load();
        this.prevSound.load();
        this.selectSound.load();
    }


    //================================================================
    //#region Sound Player

    private play(sound : HTMLAudioElement) {
        sound.currentTime = 0; // restart instantly
        sound.play().catch(() => {});
    }

    //#endregion

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
        this.play(this.nextSound);
    }

    prev() {
        this.animationTick++;
        this.index = this.mod(this.index - 1);
        this.onchange.emit(this.index);
        this.play(this.prevSound);
    }

    selectCurrent() {
        this.onselect.emit(this.index);
        this.play(this.selectSound);
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

        return result;
    }

    getTransform(offset: number): string {
        const y = offset * 20;
        const scale = 1 - Math.abs(offset) * 0.07;
        const rotate = offset * 3;

        return `translate3d(0, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
    }

    trackById(index: number, card: DeckSelectorCard & { offset: number }) {
        return card.id;
    }

    //#endregion

}