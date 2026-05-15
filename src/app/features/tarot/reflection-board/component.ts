import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definitions
export interface Card {
    id : string;
    name : string;
    src : string;
}

export interface Deck {
    name : string;
    cards : Card[];
}

interface CardInstance {
    id : string;
    cardId : string;
    name : string;
    src : string;
    x : number;
    y : number;
    rotation : number;
    shiftRotation : number;
}

@Component({
    selector : 'reflection-board',
    standalone : true,
    imports : [CommonModule],
    templateUrl : './component.html',
    styleUrls : ['./component.css', './responsives.css']
})
export class ReflectionBoard {

    //input
    @Input() decks : Deck[] = [];

    //output
    @Output() onpick = new EventEmitter<number>();
    @Output() ondrag = new EventEmitter<number>();
    @Output() onput = new EventEmitter<number>();

    //vars
    cards = signal<CardInstance[]>([]);

    // =========================
    // Add card
    addCard(card : Card) {
        this.cards.update(cards => [
            ...cards,
            {
                id: crypto.randomUUID(),
                cardId: card.id,
                name: card.name,
                src: card.src,
                x: 0,
                y: 0,
                rotation: 0,
                shiftRotation: 0
            }
        ]);
    }

    // =========================
    // Drag

    private snap(value: number, grid: number): number {
        return Math.round(value / grid) * grid;
    }


    startDrag(event: PointerEvent, card: CardInstance) {
        event.preventDefault();

        const target = event.currentTarget as HTMLElement;
        target.setPointerCapture(event.pointerId);

        //emit event
        this.onpick.emit();

        //disable old animation
        target.style.transition = 'none';

        const startX = event.clientX;
        const startY = event.clientY;

        let dx = 0;
        let dy = 0;

        const move = (e: PointerEvent) => {
            //emit event
            this.ondrag.emit();

            dx = e.clientX - startX;
            dy = e.clientY - startY;

            card.shiftRotation = 0;
            target.style.transform = this.GetTransform(card.x + dx, card.y + dy, card.rotation + card.shiftRotation);
        };

        const up = (e: PointerEvent) => {
            //emit event
            this.onput.emit();


            target.releasePointerCapture(e.pointerId);

            //snap to grid
            const isRotated = (card.rotation / 90) % 2 == 0;
            const cardWidth = Math.min(target.clientWidth, target.clientHeight) / 2;
            const cardHeight = Math.max(target.clientWidth, target.clientHeight) / 2;
            //console.log(cardWidth, cardHeight);

            card.x = this.snap(card.x + dx, (isRotated ? cardWidth : cardWidth));
            card.y = this.snap(card.y + dy, (isRotated ? cardHeight : cardHeight));
            card.shiftRotation = Math.random() * 4 - 2;
            //console.log(card);

            //enable transition
            target.style.transition = 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1)';

            // animate to snapped position
            target.style.transform = this.GetTransform(card.x, card.y, card.rotation + card.shiftRotation);

            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('pointercancel', up);
        };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        window.addEventListener('pointercancel', up);
    }

    GetTransform(x : number, y : number, rotation : number){
        return `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
    }

    rotate(card: CardInstance) {
        this.cards.update(cards =>
            cards.map(c =>
                c.id === card.id
                    ? { ...c, rotation: (c.rotation + 90) % 360 }
                    : c
            )
        );
    }

    front(card: CardInstance) {
        this.cards.update(cards => {
            const filtered = cards.filter(c => c.id !== card.id);
            return [...filtered, card]; // move to end (top)
        });
    }

    remove(card: CardInstance) {
        this.cards.update(cards => cards.filter(c => c.id !== card.id));
    }

    getFutureReading(){
        return this.getReading(1);
    }

    private getCardIndexes(targetId : string) : {deckIndex : number, cardIndex : number}{
        //for each deck
        for (let deckIndex = 0; deckIndex < this.decks.length; deckIndex++) {
            const deck = this.decks[deckIndex];
            //for each card
            for (let cardIndex = 0; cardIndex < deck.cards.length; cardIndex++) {
                const card = deck.cards[cardIndex];
                //check
                if (card.id === targetId)
                    return{
                        deckIndex,
                        cardIndex
                    }
            }
        }
        //missing
        return{
            deckIndex: -1,
            cardIndex: -1
        }
    }

    getReading(readingOffset = 0) : string{
        let reading : string = "";
        let cardName : string;
        this.cards().forEach((card, index) => {
            //get name
            if(readingOffset){
                const cardIndexes = this.getCardIndexes(card.cardId);
                cardIndexes.cardIndex = (cardIndexes.cardIndex + readingOffset) % this.decks[cardIndexes.deckIndex].cards.length;
                cardName = this.decks[cardIndexes.deckIndex].cards[cardIndexes.cardIndex].name;
            }
            else
                //default
                cardName = card.name;
            
            //write into reading
            if(index != 0)
                reading += "\n";
            reading += `${cardName} at (${card.x}, ${card.y})`;
        });

        return reading;
    }

}