import * as Currencies from '@dinero.js/currencies';
import {
  dinero,
  convert,
  Rates,
  Dinero,
  toDecimal,
  add,
  subtract,
  multiply,
} from 'dinero.js';

const transformer = ({ value, currency }: any) => {
  return `${Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: currency.code,
  })}`;
};

export const isDinero = (object: any) => {
  return object && typeof object.toJSON === 'function';
};

const CurrencyMap: Record<string, any> = {};
for (const key in Currencies) {
  CurrencyMap[key] = Currencies[key as keyof typeof Currencies];
}

type CurrencyRate = {
  amount: number;
  scale: number;
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

const getInverseRates = (
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

const dineroFromFloat = ({
  amount: float,
  currency,
}: {
  amount: number;
  currency: any;
}) => {
  const factor = currency.base ** currency.exponent;
  const amount = Math.round(float * factor);

  return dinero({ amount, currency });
};

const prettyPrint = (el: Dinero<number>) =>
  toDecimal(el as Dinero<number>, transformer);

type ExpressionElement = Dinero<number> | string;

const isNaN = (input: any): boolean => {
  const toNum = +input;
  return Number.isNaN(toNum);
};

/**
 * Divides a Dinero object by a floating-point number using the multiply method.
 * @param dineroObject - The Dinero object to divide.
 * @param divisor - The floating-point number to divide by.
 * @returns A new Dinero object representing the result of the division.
 */
function divideDineroByNumber(
  dineroObject: Dinero<number>,
  divisor: number
): Dinero<number> {
  // Calculate the reciprocal of the divisor as a scaled amount
  const reciprocal = { amount: Math.round((1 / divisor) * 100), scale: 2 };

  // Multiply the Dinero object by the reciprocal to perform division
  return multiply(dineroObject, reciprocal);
}

/**
 * Multiplies a Dinero object by a floating-point number using the multiply method.
 * @param dineroObject - The Dinero object to multiply.
 * @param multiplicative - The floating-point number to multiply by.
 * @returns A new Dinero object representing the result of the multiplication.
 */
function multiplyDineroByNumber(
  dineroObject: Dinero<number>,
  multiplicative: number
): Dinero<number> {
  // Calculate the reciprocal of the multiplicative as a scaled amount
  const multiplicand = { amount: Math.round(multiplicative * 100), scale: 2 };

  // Multiply the Dinero object by the multiplicand to perform division
  return multiply(dineroObject, multiplicand);
}

const evaluateExpressionRecursive = (
  expression: ExpressionElement[]
): Dinero<number> => {
  let operationPerformed = false;

  const expressionWithHandledMultiplicatives = expression.reduce(
    (accumulator: ExpressionElement[], currentValue, index, arr) => {
      if (operationPerformed) {
        operationPerformed = false;
        return accumulator;
      }

      if (typeof currentValue === 'string') {
        const multiplicatives = {
          '*': multiplyDineroByNumber,
          '/': divideDineroByNumber,
        };
        const operation =
          multiplicatives?.[currentValue as keyof typeof multiplicatives]!;
        if (operation) {
          const operand1 = arr[index - 1];
          const operand2 = arr[index + 1];
          const isNaNOperand1 = isNaN(operand1);
          const isNaNOperand2 = isNaN(operand2);
          if (isDinero(operand1) && !isNaNOperand2) {
            const result = operation(
              operand1 as Dinero<number>,
              +operand2 as number
            );
            operationPerformed = true;
            return [...accumulator.slice(0, -1), result];
          } else if (isDinero(operand2) && !isNaNOperand1) {
            const result = operation(
              operand2 as Dinero<number>,
              +operand1 as number
            );
            operationPerformed = true;
            return [...accumulator.slice(0, -1), result];
          } else {
            return [...accumulator, currentValue];
          }
        }
      }
      return [...accumulator, currentValue];
    },
    []
  );

  // Check if the last operation is pending
  if (operationPerformed && expressionWithHandledMultiplicatives.length === 1) {
    return expressionWithHandledMultiplicatives[0] as Dinero<number>;
  }

  // Perform the final addition or subtraction operation if needed
  if (expressionWithHandledMultiplicatives.length > 1) {
    return expressionWithHandledMultiplicatives.reduce(
      (accumulator, currentValue, index, arr) => {
        if (typeof currentValue === 'string') {
          const operation = currentValue === '+' ? add : subtract;
          return operation(
            accumulator as Dinero<number>,
            arr[index + 1] as Dinero<number>
          );
        } else {
          return accumulator;
        }
      },
      expressionWithHandledMultiplicatives[0] as Dinero<number>
    ) as Dinero<number>;
  }

  return expressionWithHandledMultiplicatives[0] as Dinero<number>;
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

const SymbolCodeMap = {
  $: 'USD',
  '€': 'EUR',
  '£': 'GBP',
};

const strToDinero = (
  str: string,
  baseCurrency: string = 'USD',
  rates: Record<string, CurrencyRate>
): Dinero<number> => {
  // regex to capture optional decimal part
  const reg: RegExp = /^([A-Z]+)(\d+)(?:\.(\d+))?$/;
  const matchString = str.match(reg);
  const currency = CurrencyMap[matchString?.[1] as keyof typeof CurrencyMap];

  // Construct the amount string considering the decimal part
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

export const evaluateNaturalExpression = (
  input: string,
  baseCurrency: string = 'USD',
  rates: any
) => {
  try {
    const uniformExpression = input
      .replace(/[$€£]/g, (match: any) => {
        const currencyCode = SymbolCodeMap[match as keyof typeof SymbolCodeMap];
        return currencyCode ? currencyCode : match;
      })
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ');
    const tokens = handleSpaces(uniformExpression).map(cleanString);
    const baseCurrencyExchangeRates = convertRatesToDineroFormat(rates);

    const formattedTokens = tokens.map((token: string) =>
      /[A-Z]{3,4}/.test(token)
        ? strToDinero(token, baseCurrency, baseCurrencyExchangeRates)
        : token
    );
    return prettyPrint(evaluateExpressionRecursive(formattedTokens));
  } catch (error) {
    return 'Invalid input.';
  }
};
