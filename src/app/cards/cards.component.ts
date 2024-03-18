import { Card } from './../models/card';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardsModalComponent } from './cards-modal/cards-modal.component';
import { CardService } from '../services/card.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public cardService: CardService
  ) {

  }

  ngOnInit(): void {
    this.cardService.getCards()
  }

  openAddCardModal(): void {
    this.dialog.open(CardsModalComponent, {
      width: '400px'
    })
  }
}
