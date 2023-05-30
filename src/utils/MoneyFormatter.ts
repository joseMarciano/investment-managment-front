
const MONEY_FORMATTER = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export class MoneyFormatter {

    static shortBRL(value: number): string {
        return value ? MONEY_FORMATTER.format(value) : MONEY_FORMATTER.format(0);
    }

}