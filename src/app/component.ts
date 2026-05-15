import { Component, ElementRef, Query, QueryList, ViewChild, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { Counter } from './features/counter/component';
import { Card, ReflectionBoard } from './features/tarot/reflection-board/component';
import { tarotDecks } from './tarot';
import { CardSelector } from './features/tarot/card-selector/component';
import { BottomMenu } from './features/bottom-menu/component';
import { Deck, TarotCard, TarotDeck } from './features/tarot/deck/component';
import { CommonModule } from '@angular/common';
import { PopupScreen } from './features/popup-screen/component';
import { AudioPlayer } from './audio/AudioPlayer';
import { API_Ask } from './api/index';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        //Counter,
        ReflectionBoard,
        CardSelector,
        BottomMenu,
        Deck,
        PopupScreen
    ],
    templateUrl: './component.html',
    styleUrls : ['./component.css']
})
export class App {
    values: number[] = [];

    audioPlayer : AudioPlayer = new AudioPlayer;

    //@ViewChildren(Counter)
    //children! : QueryList<Counter>;
    
    @ViewChild(ReflectionBoard)
    reflectionBoard! : ReflectionBoard;

    @ViewChild(CardSelector)
    cardSelector! : CardSelector;

    @ViewChild('additionalContext') additionalContext!: ElementRef;

    tarotDecks = tarotDecks;

    //Card selection
    isCardSelectOpen = false;
    selectedDeck? : TarotDeck;
    
    //introduction
    isIntroductionOpen = true;
    
    //context
    isSetContextOpen = false;

    //prediction
    isPredictionOpen = false;

    predictionHTML? : SafeHtml;

    constructor(
        private sanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef
    ){
        this.audioPlayer.load("CardSwipe", 'sounds/swipe.mp3');
        this.audioPlayer.load("CardSelect", 'sounds/select.mp3');
        this.audioPlayer.load("CardPick", 'sounds/pick.mp3');
        this.audioPlayer.load("CardPut", 'sounds/put.mp3');
        this.audioPlayer.load("CardRoll", 'sounds/roll.mp3');
    }


    updateValue(index: number, value: number) {
        this.values[index] = value;
        console.log(this.values);
    }

    clickDeck(deck : TarotDeck){
        this.selectedDeck = deck;
        this.cardSelector.index = 0;
        this.isCardSelectOpen = true;
    }

    clickSelectCard(cardIndex : number) {
        this.isCardSelectOpen = false;
        const card = this.selectedDeck?.cards?.[cardIndex];
        this.reflectionBoard.addCard(card as Card);
        this.audioPlayer.play("CardSelect");
    }

    async clickPredict(){
        this.isSetContextOpen = false;
        this.isPredictionOpen = true;
        this.predictionHTML = undefined;
        
        //force update
        this.cdr.detectChanges();

        //ask api
        let html : string;
        try{
            const response = await API_Ask(
                this.reflectionBoard.getReading(),
                this.reflectionBoard.getFutureReading(),
                (this.additionalContext.nativeElement as HTMLTextAreaElement).value
            );
            html = DOMPurify.sanitize(await marked.parse(response));
        }
        catch(err){
            console.log(err);
            html = `<b>Error</b><br> ${DOMPurify.sanitize(await marked.parse((err as Error).message))}`;
        }

        //pass html
        this.predictionHTML = this.sanitizer.bypassSecurityTrustHtml(html);

        //force update
        this.cdr.detectChanges();
    }
}