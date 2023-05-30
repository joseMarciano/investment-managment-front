
const PERCENTAGE_FORMATTER =  Intl.NumberFormat('pt-BR', {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 2
    });


export class PercentageFormatter {

    static format(value: number): string {
        return value ? PERCENTAGE_FORMATTER.format(value) : PERCENTAGE_FORMATTER.format(0);
    }

}