
const shortBrlFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export class MoneyFormatter {

    static shortBRL(value: number): string {
        return value ? shortBrlFormatter.format(value) : shortBrlFormatter.format(0);
    }

}