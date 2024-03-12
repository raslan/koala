'use server';
import axios from 'axios';

export const fetchRates = async (
  baseCurrency: string
): Promise<Record<string, number>> => {
  const { data } = await axios.get(
    `${process.env.CURRENCY_API_URL}?currency=${baseCurrency}`
  );
  return data.rates;
};
