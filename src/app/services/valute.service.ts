import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, throwError } from 'rxjs';
import { map, catchError, startWith, mergeMap } from 'rxjs/operators';
import { EParseType } from '../enums/parseType.enum';
import { EValute } from '../enums/valute.enum';
import { IParser } from '../interfaces/parser.interface';
import { ISourceInfo } from '../interfaces/sourceInfo.interface';
import { IValute } from '../interfaces/valute.interface';
import { JsonParser } from '../models/jsonParser';
import { XmlParser } from '../models/xmlParser';
import * as urlsData from '../urls.json';

@Injectable({
  providedIn: 'root'
})
export class ValuteService {

  sourceIndex: number;
  sourceList: ISourceInfo[];
  sourceInfo: ISourceInfo;
  date: string;

  constructor(private httpClient: HttpClient) {
    this.sourceList = urlsData.Urls;
    this.sourceIndex = 0;
  }

  getData(): Observable<IValute> {
    return interval(10000).pipe(
      startWith(0),
      mergeMap(() =>
        this.httpClient.get(this.getSource().Url, { responseType: 'text' }).pipe(
          map((response: string) => {
            return this.getParser().parse(response, EValute.EUR);
          }),
          catchError((err) => {
            this.sourceIndex = this.sourceIndex + 1 <= this.sourceList.length - 1
              ? this.sourceIndex + 1
              : 0;
            return throwError(err);
          })
        ))
    );
  }

  private getSource(): ISourceInfo {
    return this.sourceInfo = this.sourceList[this.sourceIndex];
  }

  private getParser(): IParser {
    switch (this.sourceInfo.ResponseType) {
      case EParseType.Json: return new JsonParser();
      case EParseType.Xml: return new XmlParser();
      default:
        throw new Error(`Тип "${this.sourceInfo.ResponseType}"не поддерживается.
        Убедитесь, что запрос возвращает данные в формате Json или Xml`);
    }
  }
}
