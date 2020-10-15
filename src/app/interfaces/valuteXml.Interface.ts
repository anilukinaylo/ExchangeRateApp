import { IValute } from './valute.interface';

export interface IValuteXml {
  ValCurs: {
    Valute: IValute[];
  };
}
