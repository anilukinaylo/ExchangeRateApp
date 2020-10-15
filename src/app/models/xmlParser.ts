import { IParser } from '../interfaces/parser.interface';
import * as parser from 'fast-xml-parser';
import { IValute } from '../interfaces/valute.interface';
import { IValuteXml } from '../interfaces/valuteXml.Interface';

export class XmlParser implements IParser {
  parse(data: string, valute: string): IValute {
    try {
      const json: IValuteXml = parser.parse(data);
      const rate = json.ValCurs.Valute.find((item: IValute) => item.CharCode === valute);
      return rate ? rate : null;
    }
    catch (error) {
      console.error(error.message);
      return null;
    }
  }
}
