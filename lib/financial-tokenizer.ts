import { SettingsState } from '@/store/settings';
import * as Currencies from '@dinero.js/currencies';
import { Dinero, Rates, convert, dinero, toDecimal } from 'dinero.js';
import { evaluate } from 'mathjs';

type CurrencyRate = {
  amount: number;
  scale: number;
};

const CurrencyMap: Record<string, any> = {};
for (const key in Currencies) {
  CurrencyMap[key] = Currencies[key as keyof typeof Currencies];
}

const SymbolCodeMap = {
  $: 'USD',
  '€': 'EUR',
  '£': 'GBP',
};

const createTransformer =
  (formatOptions?: { notation?: SettingsState['notation'], currencyDisplay?: 'code' | 'symbol' | 'narrowSymbol' | 'name' }) =>
  ({
    value,
    currency,
  }: {
    value: string;
    currency: {
      code: string;
    };
  }) => {
    return `${Number(value).toLocaleString('en-US', {
      style: 'currency',
      currency: currency.code,
      ...(formatOptions?.notation && {
        notation: formatOptions.notation,
      }),
      ...(formatOptions?.currencyDisplay && {
        currencyDisplay: formatOptions.currencyDisplay,
      }),
    })}`;
  };

const isNaN = (input: unknown): boolean => {
  const toNum = Number(input);
  return Number.isNaN(toNum);
};

const isDinero = (object: Record<string, unknown>) => {
  return object && typeof object.toJSON === 'function';
};

const dineroFromFloat = ({
  amount: float,
  currency,
}: {
  amount: number;
  currency: Currencies.Currency<any>;
}) => {
  const factor = currency.base ** currency.exponent;
  const amount = Math.round(float * factor);

  return dinero({ amount, currency });
};

const cleanString = (inputString: string): string => {
  const regex = /[A-Za-z]{3,4}$/;
  const match = inputString.match(regex);
  const op = (
    match ? match[0] + inputString.replace(regex, '') : inputString
  ).toUpperCase();
  return op;
};

const handleSpaces = (inputArray: string[]): string[] => {
  let outputArray = [];
  for (let i = 0; i < inputArray.length; i++) {
    // Check if current element is a number
    if (!isNaN(+inputArray[i])) {
      // If the next element is a currency code, combine them
      if (i + 1 < inputArray.length && inputArray[i + 1].match(/^[A-Za-z]+$/)) {
        outputArray.push(inputArray[i] + inputArray[i + 1]);
        i++; // Skip the next element as it's already combined
      } else {
        outputArray.push(inputArray[i]);
      }
    } else if (inputArray[i].match(/^[A-Za-z]+$/)) {
      // Check if the previous element is a number
      if (i - 1 >= 0 && !isNaN(+inputArray[i - 1])) {
        // If the previous element is a number, combine them
        outputArray[outputArray.length - 1] = inputArray[i - 1] + inputArray[i];
      } else {
        // Check if the next element is a number
        if (i + 1 < inputArray.length && !isNaN(+inputArray[i + 1])) {
          // If the next element is a number, combine them
          outputArray.push(inputArray[i] + inputArray[i + 1]);
          i++; // Skip the next element as it's already combined
        } else {
          outputArray.push(inputArray[i]);
        }
      }
    } else {
      outputArray.push(inputArray[i]);
    }
  }

  return outputArray;
};

const strToDinero = (
  str: string,
  baseCurrency: string = 'USD',
  rates: Record<string, CurrencyRate>
): Dinero<number> => {
  // regex to capture optional decimal part
  const reg: RegExp = /^([A-Z]+)(-?\d+)(?:\.(\d+))?$/;
  const matchString = str.match(reg);
  const currency = CurrencyMap[matchString?.[1] as keyof typeof CurrencyMap];

  const amountStr = `${matchString?.[2]}${
    matchString?.[3] ? `.${matchString[3]}` : ''
  }`;
  const amount = parseFloat(amountStr);

  const currencyRates = getInverseRates(currency.code, baseCurrency, rates);

  const tempDineroObj = dineroFromFloat({ amount, currency });

  return currency.code === baseCurrency
    ? tempDineroObj
    : convert(
        tempDineroObj,
        CurrencyMap[baseCurrency as keyof typeof CurrencyMap],
        currencyRates as Rates<number>
      );
};

export const getInverseRates = (
  targetCurrency: string,
  baseCurrency: string = 'USD',
  rates: Record<string, CurrencyRate>
): Record<string, CurrencyRate> | undefined => {
  const usableRates = rates;
  const targetRate = usableRates[targetCurrency as keyof typeof usableRates];
  if (!targetRate) {
    throw new Error(
      `Unable to find rate for target currency: ${targetCurrency}`
    );
  }

  const scale = targetRate.scale;

  // Return the inverse rate as a Dinero-compatible object with base currency as the key
  return {
    [baseCurrency]: { amount: targetRate.amount, scale },
  };
};

export const convertRatesToDineroFormat = (
  rates: any
): Record<string, CurrencyRate> => {
  const usableRates = rates;
  const dineroRates: Record<string, CurrencyRate> = {};
  for (const currencyCode in usableRates) {
    const rate = usableRates[currencyCode as keyof typeof usableRates];
    const currency = CurrencyMap[currencyCode.toUpperCase()];
    if (currency) {
      const scale = currency.exponent || 2; // Default to  2 if exponent is not defined
      const integerRate = Math.round(rate * Math.pow(10, scale + 4));
      dineroRates[currencyCode] = { amount: integerRate, scale: scale + 4 };
    }
  }
  return dineroRates;
};

export const prettyPrint = (
  el: Dinero<number>,
  formatOptions?: {
    notation?: SettingsState['notation'];
    currencyDisplay?: 'code' | 'symbol' | 'narrowSymbol' | 'name'
  }
) => toDecimal(el as Dinero<number>, createTransformer(formatOptions));

export const evaluateNaturalExpression = (
  input: string,
  baseCurrency: string = 'USD',
  rates: any
) => {
  try {
    const uniformExpression = input
      .toLowerCase()
      .replace(/,/g, '')
      .replace(/[$€£]/g, (match: any) => {
        const currencyCode = SymbolCodeMap[match as keyof typeof SymbolCodeMap];
        return currencyCode ? currencyCode : match;
      })
      .replace(/[\(\)]|\s+/g, (match: string) => {
        switch (match) {
          case '(':
            return '( ';
          case ')':
            return ' )';
          default:
            return ' ';
        }
      })
      .replace(
        /([^a-zA-Z])([kmbtKMBT])(?![a-zA-Z])/g,
        (match: any, p1: string, p2: string) => {
          switch (p2) {
            case 'k':
              return p1 + ' * 1000';
            case 'm':
              return p1 + ' * 1000000';
            case 'b':
              return p1 + ' * 1000000000';
            case 't':
              return p1 + ' * 1000000000000';
            default:
              return match;
          }
        }
      )
      .replace(/\b(thousand|million|billion|trillion)\b/g, (match: any) => {
        switch (match.toLowerCase()) {
          case 'thousand':
            return ' * 1000';
          case 'million':
            return ' * 1000000';
          case 'billion':
            return ' * 1000000000';
          case 'trillion':
            return ' * 1000000000000';
          default:
            return match;
        }
      })
      .split(' ');
    const tokens = handleSpaces(uniformExpression).map(cleanString);
    const baseCurrencyExchangeRates = convertRatesToDineroFormat(rates);
    const formattedTokens = tokens.map((token: string) =>
      /[A-Z]{3,4}/.test(token)
        ? strToDinero(token, baseCurrency, baseCurrencyExchangeRates)
        : token
    );
    const val = `${baseCurrency}${evaluate(
      formattedTokens
        .map((token) =>
          isDinero(token as Dinero<number>)
            ? toDecimal(token as Dinero<number>)
            : token
        )
        .join(' ')
    )}`;
    return strToDinero(val, baseCurrency, baseCurrencyExchangeRates);
  } catch (error: any) {
    throw new Error(
      `An error occurred while evaluating the expression: ${error?.message}`
    );
  }
};
