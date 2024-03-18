import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { MatDialog } from '@angular/material/dialog';
import { CardsModalComponent } from '../cards-modal/cards-modal.component';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent implements OnInit {

  @Input() cardItem!: Card;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  openUpdateModal(): void {
    this.dialog.open(CardsModalComponent, {
      width: "400px",
      data: this.cardItem
    })
  }



}
