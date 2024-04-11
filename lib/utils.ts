import * as AllCurrencies from '@dinero.js/currencies';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Currencies = AllCurrencies;

export type CurrencyCode = keyof typeof AllCurrencies;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Reusable currency name formatter
export const currencyNameFormatter = new Intl.DisplayNames(['en'], {
  type: 'currency',
});

/**
 *
 * @param code The currency code
 * @returns The currency name
 */
export const getCurrencyName = (code: CurrencyCode) =>
  `${currencyNameFormatter.of(code)} (${code})`;

export const currenciesWithNames = [
  'AED',
  'AFN',
  'ALL',
  'AMD',
  'ANG',
  'AOA',
  'ARS',
  'AUD',
  'AWG',
  'AZN',
  'BAM',
  'BBD',
  'BDT',
  'BGN',
  'BHD',
  'BIF',
  'BMD',
  'BND',
  'BOB',
  'BRL',
  'BSD',
  'BTN',
  'BWP',
  'BYN',
  'BZD',
  'CAD',
  'CDF',
  'CHF',
  'CLF',
  'CLP',
  'CNY',
  'COP',
  'CRC',
  'CUC',
  'CUP',
  'CVE',
  'CZK',
  'DJF',
  'DKK',
  'DOP',
  'DZD',
  'EGP',
  'ERN',
  'ETB',
  'EUR',
  'FJD',
  'FKP',
  'GBP',
  'GEL',
  'GHS',
  'GIP',
  'GMD',
  'GNF',
  'GTQ',
  'GYD',
  'HKD',
  'HNL',
  'HRK',
  'HTG',
  'HUF',
  'IDR',
  'INR',
  'IQD',
  'IRR',
  'ISK',
  'JMD',
  'JOD',
  'JPY',
  'KES',
  'KGS',
  'KHR',
  'KMF',
  'KRW',
  'KWD',
  'KYD',
  'KZT',
  'LAK',
  'LBP',
  'LKR',
  'LRD',
  'LSL',
  'LYD',
  'MAD',
  'MDL',
  'MGA',
  'MKD',
  'MMK',
  'MNT',
  'MOP',
  'MRU',
  'MUR',
  'MVR',
  'MWK',
  'MXN',
  'MYR',
  'MZN',
  'NAD',
  'NGN',
  'NIO',
  'NOK',
  'NPR',
  'NZD',
  'OMR',
  'PAB',
  'PEN',
  'PGK',
  'PHP',
  'PKR',
  'PLN',
  'PYG',
  'QAR',
  'RON',
  'RSD',
  'RUB',
  'RWF',
  'SAR',
  'SBD',
  'SCR',
  'SDG',
  'SEK',
  'SGD',
  'SHP',
  'SLL',
  'SOS',
  'SRD',
  'SSP',
  'SVC',
  'SZL',
  'THB',
  'TJS',
  'TMT',
  'TND',
  'TOP',
  'TRY',
  'TTD',
  'TWD',
  'TZS',
  'UAH',
  'UGX',
  'USD',
  'UYU',
  'UZS',
  'VES',
  'VND',
  'VUV',
  'WST',
  'XAF',
  'XCD',
  'XOF',
  'XPF',
  'YER',
  'ZAR',
  'ZMW',
];

const supportedCurrencies = [
  '00',
  '1INCH',
  'AAVE',
  'ABT',
  'ACH',
  'ACS',
  'ADA',
  'AED',
  'AERGO',
  'AERO',
  'AFN',
  'AGLD',
  'AIOZ',
  'ALCX',
  'ALEPH',
  'ALGO',
  'ALICE',
  'ALL',
  'AMD',
  'AMP',
  'ANG',
  'ANKR',
  'ANT',
  'AOA',
  'APE',
  'API3',
  'APT',
  'ARB',
  'ARPA',
  'ARS',
  'ASM',
  'AST',
  'ATA',
  'ATOM',
  'AUCTION',
  'AUD',
  'AUDIO',
  'AURORA',
  'AVAX',
  'AVT',
  'AWG',
  'AXL',
  'AXS',
  'AZN',
  'BADGER',
  'BAL',
  'BAM',
  'BAND',
  'BAT',
  'BBD',
  'BCH',
  'BDT',
  'BGN',
  'BHD',
  'BICO',
  'BIF',
  'BIGTIME',
  'BIT',
  'BLUR',
  'BLZ',
  'BMD',
  'BND',
  'BNT',
  'BOB',
  'BOBA',
  'BOND',
  'BONK',
  'BRL',
  'BSD',
  'BSV',
  'BTC',
  'BTN',
  'BTRST',
  'BUSD',
  'BWP',
  'BYN',
  'BYR',
  'BZD',
  'C98',
  'CAD',
  'CBETH',
  'CDF',
  'CELR',
  'CGLD',
  'CHF',
  'CHZ',
  'CLF',
  'CLP',
  'CLV',
  'CNH',
  'CNY',
  'COMP',
  'COP',
  'COTI',
  'COVAL',
  'CRC',
  'CRO',
  'CRPT',
  'CRV',
  'CTSI',
  'CTX',
  'CUC',
  'CUP',
  'CVC',
  'CVE',
  'CVX',
  'CZK',
  'DAI',
  'DAR',
  'DASH',
  'DDX',
  'DESO',
  'DEXT',
  'DIA',
  'DIMO',
  'DJF',
  'DKK',
  'DNT',
  'DOGE',
  'DOP',
  'DOT',
  'DREP',
  'DYP',
  'DZD',
  'EEK',
  'EGLD',
  'EGP',
  'ELA',
  'ENJ',
  'ENS',
  'EOS',
  'ERN',
  'ETB',
  'ETC',
  'ETH',
  'ETH2',
  'EUR',
  'EUROC',
  'FARM',
  'FET',
  'FIDA',
  'FIL',
  'FIS',
  'FJD',
  'FKP',
  'FLOW',
  'FLR',
  'FORT',
  'FORTH',
  'FOX',
  'FX',
  'GAL',
  'GALA',
  'GBP',
  'GEL',
  'GFI',
  'GGP',
  'GHS',
  'GHST',
  'GIP',
  'GLM',
  'GMD',
  'GMT',
  'GNF',
  'GNO',
  'GNT',
  'GODS',
  'GRT',
  'GST',
  'GTC',
  'GTQ',
  'GUSD',
  'GYD',
  'GYEN',
  'HBAR',
  'HFT',
  'HIGH',
  'HKD',
  'HNL',
  'HNT',
  'HONEY',
  'HOPR',
  'HRK',
  'HTG',
  'HUF',
  'ICP',
  'IDEX',
  'IDR',
  'ILV',
  'IMP',
  'IMX',
  'INDEX',
  'INJ',
  'INR',
  'INV',
  'IOTX',
  'IQD',
  'IRR',
  'ISK',
  'JASMY',
  'JEP',
  'JMD',
  'JOD',
  'JPY',
  'JTO',
  'JUP',
  'KAVA',
  'KEEP',
  'KES',
  'KGS',
  'KHR',
  'KMF',
  'KNC',
  'KRL',
  'KRW',
  'KSM',
  'KWD',
  'KYD',
  'KZT',
  'LAK',
  'LBP',
  'LCX',
  'LDO',
  'LINK',
  'LIT',
  'LKR',
  'LOKA',
  'LOOM',
  'LPT',
  'LQTY',
  'LRC',
  'LRD',
  'LSETH',
  'LSL',
  'LTC',
  'LTL',
  'LVL',
  'LYD',
  'MAD',
  'MAGIC',
  'MANA',
  'MASK',
  'MATH',
  'MATIC',
  'MCO2',
  'MDL',
  'MDT',
  'MEDIA',
  'METIS',
  'MGA',
  'MINA',
  'MIR',
  'MKD',
  'MKR',
  'MLN',
  'MMK',
  'MNDE',
  'MNT',
  'MOBILE',
  'MONA',
  'MOP',
  'MPL',
  'MRO',
  'MRU',
  'MSOL',
  'MTL',
  'MULTI',
  'MUR',
  'MUSE',
  'MVR',
  'MWK',
  'MXC',
  'MXN',
  'MYR',
  'MZN',
  'NAD',
  'NCT',
  'NEAR',
  'NEST',
  'NGN',
  'NIO',
  'NKN',
  'NMR',
  'NOK',
  'NPR',
  'NU',
  'NZD',
  'OCEAN',
  'OGN',
  'OMG',
  'OMR',
  'ONDO',
  'OOKI',
  'OP',
  'ORCA',
  'ORN',
  'OSMO',
  'OXT',
  'PAB',
  'PAX',
  'PEN',
  'PERP',
  'PGK',
  'PHP',
  'PKR',
  'PLA',
  'PLN',
  'PLU',
  'PNG',
  'POLS',
  'POLY',
  'POND',
  'POWR',
  'PRIME',
  'PRO',
  'PRQ',
  'PUNDIX',
  'PYG',
  'PYR',
  'PYUSD',
  'QAR',
  'QI',
  'QNT',
  'QSP',
  'QUICK',
  'RAD',
  'RAI',
  'RARE',
  'RARI',
  'RBN',
  'REN',
  'RENDER',
  'REP',
  'REPV2',
  'REQ',
  'RGT',
  'RLC',
  'RLY',
  'RNDR',
  'RON',
  'ROSE',
  'RPL',
  'RSD',
  'RUB',
  'RWF',
  'SAND',
  'SAR',
  'SBD',
  'SCR',
  'SDG',
  'SEAM',
  'SEI',
  'SEK',
  'SGD',
  'SHIB',
  'SHP',
  'SHPING',
  'SKK',
  'SKL',
  'SLL',
  'SNT',
  'SNX',
  'SOL',
  'SOS',
  'SPA',
  'SPELL',
  'SRD',
  'SSP',
  'STD',
  'STG',
  'STORJ',
  'STRK',
  'STX',
  'SUI',
  'SUKU',
  'SUPER',
  'SUSHI',
  'SVC',
  'SWFTC',
  'SYLO',
  'SYN',
  'SZL',
  'T',
  'THB',
  'TIA',
  'TIME',
  'TJS',
  'TMM',
  'TMT',
  'TND',
  'TONE',
  'TOP',
  'TRAC',
  'TRB',
  'TRIBE',
  'TRU',
  'TRY',
  'TTD',
  'TVK',
  'TWD',
  'TZS',
  'UAH',
  'UGX',
  'UMA',
  'UNFI',
  'UNI',
  'UPI',
  'USD',
  'USDC',
  'USDT',
  'UST',
  'UYU',
  'UZS',
  'VARA',
  'VEF',
  'VELO',
  'VES',
  'VET',
  'VGX',
  'VND',
  'VOXEL',
  'VTHO',
  'VUV',
  'WAMPL',
  'WAXL',
  'WBTC',
  'WCFG',
  'WLUNA',
  'WST',
  'XAF',
  'XAG',
  'XAU',
  'XCD',
  'XCN',
  'XDR',
  'XLM',
  'XMON',
  'XOF',
  'XPD',
  'XPF',
  'XPT',
  'XRP',
  'XTZ',
  'XYO',
  'YER',
  'YFI',
  'YFII',
  'ZAR',
  'ZEC',
  'ZEN',
  'ZETA',
  'ZMK',
  'ZMW',
  'ZRX',
  'ZWD',
];

const popularCurrencies = ['EGP', 'GBP', 'EUR', 'USD'];

export const currencyOptions = Object.keys(Currencies)
  .filter((currency) => supportedCurrencies.includes(currency))
  .map((currency) => ({
    label: getCurrencyName(currency as keyof typeof Currencies),
    value: currency,
  }))
  .sort(
    (a, b) =>
      popularCurrencies.indexOf(b.value) - popularCurrencies.indexOf(a.value)
  );
