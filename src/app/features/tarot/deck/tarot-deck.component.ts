import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TarotCard {
  id: string;
  name: string;
  src?: string;
}

@Component({
  selector: 'app-tarot-deck',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarot-deck.component.html',
  styleUrls: ['./tarot-deck.component.css']
})
export class TarotDeckComponent {

  @Input() cards: TarotCard[] = [];
  @Output() selectCard = new EventEmitter<TarotCard>();

  direction: 'next' | 'prev' | null = null;
  index = 0;
  Math = Math;

  get length() {
    return this.cards.length;
  }

  private mod(i: number): number {
    return (i + this.length) % this.length;
  }

  get current(): TarotCard | null {
    return this.cards[this.index] ?? null;
  }

  get previous(): TarotCard | null {
    if (!this.length) return null;
    return this.cards[this.mod(this.index - 1)];
  }

  setIndex(i: number) {
    this.index = this.mod(i);
  }

  selectCurrent() {
    const card = this.current;
    if (card) this.selectCard.emit(card);
  }

  selectPrevious() {
    const prevIndex = this.mod(this.index - 1);
    this.index = prevIndex;
    this.selectCard.emit(this.cards[prevIndex]);
  }

  // swipe support (optional but nice)
  private startX = 0;

  @HostListener('pointerdown', ['$event'])
  down(e: PointerEvent) {
    this.startX = e.clientX;
  }

  @HostListener('pointerup', ['$event'])
  up(e: PointerEvent) {
    const dx = e.clientX - this.startX;

    if (dx > 50) this.selectPrevious();
    else if (dx < -50) this.next();
  }

animationTick = 0;

next() {
  this.animationTick++;
  this.index = this.mod(this.index + 1);
}

prev() {
  this.animationTick++;
  this.index = this.mod(this.index - 1);
}

getStack() {
  const n = this.cards.length;
  if (!n) return [];

  const prev = this.cards[this.mod(this.index - 1)];
  const current = this.cards[this.index];
  const next = this.cards[this.mod(this.index + 1)];

  return [
    { ...prev, position: 'prev' },
    { ...current, position: 'current' },
    { ...next, position: 'next' }
  ];
}

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

trackById(index: number, card: TarotCard & { offset: number }) {
  return card.id;
}

}