export class DocumentValidator {
  static isValid(document: string): boolean {
    const cleaned = document.replace(/\D/g, "");

    if (cleaned.length === 11) {
      return this.isValidCPF(cleaned);
    }

    if (cleaned.length === 14) {
      return this.isValidCNPJ(cleaned);
    }

    return false;
  }

  static isValidCPF(cpf: string): boolean {
    if (!/^\d{11}$/.test(cpf)) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    const calcCheck = (factor: number) =>
      cpf
        .split("")
        .slice(0, factor - 1)
        .reduce((acc, curr, idx) => acc + Number(curr) * (factor - idx), 0);

    const digit1 = ((calcCheck(10) * 10) % 11) % 10;
    const digit2 = ((calcCheck(11) * 10) % 11) % 10;

    return digit1 === Number(cpf[9]) && digit2 === Number(cpf[10]);
  }

  static isValidCNPJ(cnpj: string): boolean {
    if (!/^\d{14}$/.test(cnpj)) return false;
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    const calcCheck = (base: string, weights: number[]) =>
      base
        .split("")
        .reduce((acc, num, idx) => acc + Number(num) * weights[idx], 0);

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, ...weights1];

    const digit1 = 11 - (calcCheck(cnpj.slice(0, 12), weights1) % 11);
    const check1 = digit1 >= 10 ? 0 : digit1;

    const digit2 = 11 - (calcCheck(cnpj.slice(0, 12) + check1, weights2) % 11);
    const check2 = digit2 >= 10 ? 0 : digit2;

    return check1 === Number(cnpj[12]) && check2 === Number(cnpj[13]);
  }

  static format(document: string): string {
    return document.replace(/\D/g, "");
  }
}
