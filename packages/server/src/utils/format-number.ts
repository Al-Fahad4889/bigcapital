import { get } from 'lodash';
import * as accounting from 'accounting';
import * as Currencies from 'js-money/lib/currency';

const getNegativeFormat = (formatName) => {
  switch (formatName) {
    case 'parentheses':
      return '(%s%v)';
    case 'mines':
      return '-%s%v';
  }
};

const getCurrencySign = (currencyCode?: string) => {
  if(!currencyCode) {
    return '';
  }
  const currency = Currencies[currencyCode];
  if (!currency) {
    return '';
  }
  if(currencyCode === 'BDT') {
    return currency.symbol_native || '৳';
  }
  return currency.symbol || '';
};

export interface IFormatNumberSettings {
  precision?: number;
  divideOn1000?: boolean;
  excerptZero?: boolean;
  negativeFormat?: string;
  thousand?: string;
  decimal?: string;
  zeroSign?: string;
  money?: boolean;
  currencyCode?: string;
  symbol?: string;
}

export const formatNumber = (
  balance,
  {
    precision = 2,
    divideOn1000 = false,
    excerptZero = false,
    negativeFormat = 'mines',
    thousand = ',',
    decimal = '.',
    zeroSign = '',
    money = true,
    currencyCode,
    symbol = '',
  }: IFormatNumberSettings,
) => {
  const formattedSymbol = getCurrencySign(currencyCode);
  const negForamt = getNegativeFormat(negativeFormat);
  const format = '%s%v';

  let formattedBalance = parseFloat(balance);

  if (divideOn1000) {
    formattedBalance /= 1000;
  }
  return accounting.formatMoney(
    formattedBalance,
    money ? formattedSymbol : symbol ? symbol : '',
    precision,
    thousand,
    decimal,
    {
      pos: format,
      neg: negForamt,
      zero: excerptZero ? zeroSign : format,
    },
  );
};
