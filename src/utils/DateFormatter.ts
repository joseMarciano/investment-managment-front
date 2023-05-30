
const DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR');

export class DateFormatter {

    static format(value: string): string {
        return !!value ? DATE_FORMATTER.format(new Date(value)) : '';
    }

}