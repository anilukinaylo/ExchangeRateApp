import { IParser } from '../interfaces/parser.interface';
import { IValute } from '../interfaces/valute.interface';
export class JsonParser implements IParser {
    parse(data: string, valute: string): IValute {
        const json = JSON.parse(data);
        return json.Valute[valute] ? json.Valute[valute] : null;
    }
}
