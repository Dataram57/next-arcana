import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definitions
export interface Card {
    id: string;
    name: string;
    src: string;
}

export interface Deck {
    name: string;
    cards: Card[];
}

interface CardInstance {
    id: string;
    name: string;
    src: string;
    x: number;
    y: number;
    rotation: number;
}

@Component({
    selector: 'reflection-board',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './component.html',
    styleUrls: ['./component.css']
})
export class ReflectionBoard {

    @Input() decks: Deck[] = [];

    cards = signal<CardInstance[]>([]);

    // =========================
    // Add card
    addCard(card: Card) {
        this.cards.update(cards => [
            ...cards,
            {
                id: crypto.randomUUID(),
                name: card.name,
                src: card.src,
                x: 80,
                y: 80,
                rotation: 0
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

        // 🔥 disable animation during drag
        target.style.transition = 'none';

        const startX = event.clientX;
        const startY = event.clientY;

        const oldX = card.x;
        const oldY = card.y;

        let dx = 0;
        let dy = 0;

        const move = (e: PointerEvent) => {
            dx = e.clientX - startX;
            dy = e.clientY - startY;

            target.style.transform =
                `translate3d(${oldX + dx}px, ${oldY + dy}px, 0) rotate(${card.rotation}deg)`;
        };

        const up = (e: PointerEvent) => {
            target.releasePointerCapture(e.pointerId);

            // 🎯 SNAP TO GRID
            const finalX = this.snap(oldX + dx, target.clientWidth / 2);
            const finalY = this.snap(oldY + dy, target.clientHeight / 2);

            // 🔥 enable smooth animation
            target.style.transition = 'transform 250ms cubic-bezier(0.22, 1, 0.36, 1)';

            // animate to snapped position
            target.style.transform =
                `translate3d(${finalX}px, ${finalY}px, 0) rotate(${card.rotation}deg)`;

            // commit AFTER animation (optional but cleaner)
            setTimeout(() => {
                this.cards.update(cards =>
                    cards.map(c =>
                        c.id === card.id
                            ? { ...c, x: finalX, y: finalY }
                            : c
                    )
                );
            }, 250);

            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('pointercancel', up);
        };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        window.addEventListener('pointercancel', up);
    }

    // =========================
    // Rotate
    rotate(card: CardInstance) {
        this.cards.update(cards =>
            cards.map(c =>
                c.id === card.id
                    ? { ...c, rotation: (c.rotation + 180) % 360 }
                    : c
            )
        );
    }

    // =========================
    // Remove
    remove(card: CardInstance) {
        this.cards.update(cards => cards.filter(c => c.id !== card.id));
    }

}