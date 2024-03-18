import { SnackbarService } from './../../services/snackbar.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from '../../models/card';

@Component({
  selector: 'app-cards-modal',
  templateUrl: './cards-modal.component.html',
  styleUrl: './cards-modal.component.scss'
})
export class CardsModalComponent implements OnInit {

  cardForm!: FormGroup
  showSpinner: boolean = false

  constructor(
    private dialogRef: MatDialogRef<CardsModalComponent>,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) { }

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      name: new FormControl(this.data?.name || '', Validators.maxLength(50)),
      title: new FormControl(this.data?.title || '', [Validators.required, Validators.maxLength(255)]),
      phone: new FormControl(this.data?.phone || '', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl(this.data?.email || '', [Validators.email, Validators.maxLength(50)]),
      address: new FormControl(this.data?.address || '', Validators.maxLength(255))
    });
  }

  addCard(): void {
    this.showSpinner = true
    this.cardService.addCard(this.cardForm.value)
      .subscribe({
        next: (res: any) => {
          this.getSuccess(res || "business card added succesfully")
        },
        error: (err: any) => {
          this.getError(err.message || 'There is some error when added business card')
        }
      })
  }

  updateCard(): void {
    this.showSpinner = true
    this.cardService.updateCard(this.cardForm.value, this.data.id)
      .subscribe({
        next: (res: any) => {
          this.getSuccess(res || "business card updated succesfully")
        },
        error: (err: any) => {
          this.getError(err.message || 'There is some error when updated business card')
        }
      })
  }

  deleteCard(): void {
    this.showSpinner = true
    this.cardService.deleteCard(this.data.id)
      .subscribe({
        next: (res: any) => {
          this.getSuccess(res || "business card deleted successfully")
        },
        error: (err: any) => {
          this.getError(err.message || 'There is some error when deleted business card')
        }
      })
  }

  getSuccess(message: string): void {
    this.snackbarService.createSnackBar('success', message)
    this.cardService.getCards()
    this.showSpinner = false
    this.dialogRef.close()
  }

  getError(message: string): void {
    this.snackbarService.createSnackBar('error', message)
    this.showSpinner = false
  }

}
