import { IValute } from '../interfaces/valute.interface';

export class Valute implements IValute {
    NumCode: number;
    CharCode: string;
    Nominal: number;
    Name: string;
    Value: string;

    constructor(CharCode: string, Value: string = '', Nominal?: number, NumCode?: number, Name?: string) {
        this.NumCode = NumCode;
        this.CharCode = CharCode;
        this.Nominal = Nominal;
        this.Name = Name;
        this.Value = Value;
    }
}
