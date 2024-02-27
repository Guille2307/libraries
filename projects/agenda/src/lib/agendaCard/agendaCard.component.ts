import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AgendaService } from '../service/agenda.service';

@Component({
  selector: 'agenda-card',
  templateUrl: './agendaCard.component.html',
  styleUrls: ['./agendaCard.component.scss'],
})
export class AgendaCardComponent implements OnInit {

  @Input() card?;
  @Input() showBell = false;
  @Input() editCard = false;
  @Input() translations?;

  @Output() cardDeleted = new EventEmitter<any>();
  @Output() actionCard = new EventEmitter<any>();
  // @Output() deleteCard = new EventEmitter<any>();
  // @Output() duplicateCard = new EventEmitter<any>();

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private agendaSvc: AgendaService
  ) { }

  ngOnInit() { }

  activateNotifications(card) {
    card.assistance = !card.assistance;
    if (card.assistance) {
      this.agendaSvc.addToSchedule(card.id).then((result) => {
        return result;
      });
    } else {
      this.agendaSvc.deleteFromSchedule(card.id).then((result) => {
        return result;
      });
    }
  }

  async deleteCard(card) {
    const title = this.agendaSvc.translations.edit.deleteCard.alert.title;
    const message = this.agendaSvc.translations.edit.deleteCard.alert.message;
    if (title && message) {
      const alert = await this.alertCtrl.create({
        header: title,
        message,
        buttons: [{
          text: 'Ok',
          handler: () => this.resolveFunction(card)
        },
        {
          text: 'Cancel'
        }]
      });

      await alert.present();
    }
  }

  async resolveFunction(card) {
    const cardDeleted = await this.agendaSvc.deleteSchedule(card.id).then((result) => {
      console.log(result);
      return card.id;
    });

    if (cardDeleted) {
      this.cardDeleted.emit(cardDeleted);
    }
  }

  duplicateCard(card) {
    sessionStorage.setItem('duplicateCard', JSON.stringify(card));
    this.router.navigate(['/menu/agenda/set-event']);
  }

  getDate(date) {
    let fullDate = new Date();

    if (date !== undefined) {
      const tSD = date.split(/[- :]/);
      const dSD = new Date(tSD[0], tSD[1] - 1, tSD[2], tSD[3], tSD[4], tSD[5]);
      fullDate = new Date(dSD);
    }

    // tslint:disable-next-line: max-line-length
    return ('0' + fullDate.getDate()).slice(-2) + '/' + ('0' + (fullDate.getMonth() + 1)).slice(-2) + '/' + fullDate.getFullYear() + ' - ' + ('0' + fullDate.getHours()).slice(-2) + ':' + ('0' + fullDate.getMinutes()).slice(-2) + 'h';
  }

  getDayName(day) {
    return this.agendaSvc.translations.schedule[day];
  }

  clickCard() {
    this.actionCard.emit({
      action: this.editCard,
      id: this.card.id
    });
  }

  getDay(date) {
    return new Date(date).getDate();
  }

}
