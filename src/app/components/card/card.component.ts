import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EValute } from 'src/app/enums/valute.enum';
import { IValute } from 'src/app/interfaces/valute.interface';
import { Valute } from 'src/app/models/valute';
import { ValuteService } from '../../services/valute.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [
    ValuteService,
    DatePipe
  ]
})

export class CardComponent implements OnInit, OnDestroy {
  date: string;
  currentValute: IValute;
  newValute: IValute;
  subscription$: any;

  constructor(private valuteService: ValuteService, public datepipe: DatePipe) {
    this.date = this.getFormattedDate(new Date());
    this.currentValute = new Valute(EValute.EUR);
    this.newValute = new Valute(EValute.RUB);
  }

  ngOnInit(): void {
    this.getExchangeRate();
  }

  getExchangeRate() {
    this.subscription$ = this.valuteService.getData().subscribe(data => {
      this.date = this.getFormattedDate(new Date());
      this.currentValute = data;
    },
      (err) => {
        console.error(err);
        this.getExchangeRate();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getFormattedDate(date: Date): string {
    return this.datepipe.transform(date, 'dd.MM.yyyy HH:MM:ss');
  }
}

