import { IValute } from './valute.interface';

export interface IParser {
    parse(data: string, valute: string): IValute;
}
