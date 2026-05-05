import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Card {
    id: string;
    name: string;
}

interface CardInstance {
    id: string;
    name: string;
    x: number;
    y: number;
    rotation: number;
}

@Component({
    selector: 'app-tarot-canvas',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tarot-canvas.component.html',
    styleUrls: ['./tarot-canvas.component.css']
})
export class TarotCanvasComponent {

    // Deck (you can expand this)
    deck: Card[] = [
        { id: 'fool', name: 'The Fool' },
        { id: 'magician', name: 'The Magician' },
        { id: 'high-priestess', name: 'High Priestess' },
        { id: 'empress', name: 'The Empress' },
    ];

    // Cards placed on canvas
    cards = signal<CardInstance[]>([]);

    // --- Add card to canvas ---
    addCard(card: Card, event: MouseEvent) {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

        this.cards.update(cards => [
            ...cards,
            {
                id: crypto.randomUUID(),
                name: card.name,
                x: 50,
                y: 50,
                rotation: 0
            }
        ]);
    }

    // --- Dragging ---
    startDrag(event: PointerEvent, card: CardInstance) {
        event.preventDefault();

        const startX = event.clientX;
        const startY = event.clientY;

        const origX = card.x;
        const origY = card.y;

        const move = (e: PointerEvent) => {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            this.cards.update(cards =>
                cards.map(c =>
                    c.id === card.id
                    ? { ...c, x: origX + dx, y: origY + dy }
                    : c
                )
            );
        };

        const up = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
        };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
    }

    // --- Rotate card (upright/reversed) ---
    rotate(card: CardInstance) {
        this.cards.update(cards =>
            cards.map(c =>
            c.id === card.id
                ? { ...c, rotation: (c.rotation + 180) % 360 }
                : c
            )
        );
    }

    // --- Remove card ---
    remove(card: CardInstance) {
        this.cards.update(cards => cards.filter(c => c.id !== card.id));
    }
}