
const shortBrlFormatter = new Intl.DateTimeFormat('pt-BR');

export class DateFormatter {

    static format(value: string): string {
        return !!value ? shortBrlFormatter.format(new Date(value)) : '';
    }

}