"use client";

import { useState } from "react";
import {
  ArrowRightLeft,
  TrendingUp,
  ChevronDown,
  BarChart3,
  DollarSign,
  Globe,
  Activity,
  LucideIcon,
} from "lucide-react";
import {
  useGetSupportedCurrenciesQuery,
  useGetExchangeRateQuery,
  useCreateConversionMutation,
  useGetConversionSummaryQuery,
  ConversionRequest,
} from "@/lib/apiServices/conversionApi";

// TypeScript interfaces
interface Currency {
  code: string;
  name: string;
  flag: string;
  symbol: string;
}

interface DashboardStat {
  title: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export default function FxConverter(): JSX.Element {
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("NGN");
  const [amount, setAmount] = useState<string>("1000.00");

  // RTK Query hooks
  const { data: currenciesData, isLoading: currenciesLoading } =
    useGetSupportedCurrenciesQuery();

  const {
    data: rateData,
    isLoading: rateLoading,
    error: rateError,
  } = useGetExchangeRateQuery(
    { from: fromCurrency, to: toCurrency },
    { skip: !fromCurrency || !toCurrency || fromCurrency === toCurrency }
  );

  const {
    data: summaryData,
    isLoading: summaryLoading,
    refetch: refetchSummary,
  } = useGetConversionSummaryQuery();

  const [
    createConversion,
    { isLoading: isConverting, error: conversionError },
  ] = useCreateConversionMutation();

  // Extract data from RTK Query responses
  const currencies = currenciesData?.data.currencies || [];
  const exchangeRate = rateData?.data.rate;
  const summary = summaryData?.data.stats;

  const currencyDetails: Currency[] = [
    { code: "USD", name: "US Dollar", flag: "🇺🇸", symbol: "$" },
    { code: "EUR", name: "Euro", flag: "🇪🇺", symbol: "€" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧", symbol: "£" },
    { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬", symbol: "₦" },
    { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", symbol: "A$" },
    { code: "CHF", name: "Swiss Franc", flag: "🇨🇭", symbol: "CHF" },
    { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", symbol: "¥" },
    { code: "INR", name: "Indian Rupee", flag: "🇮🇳", symbol: "₹" },
    { code: "KRW", name: "South Korean Won", flag: "🇰🇷", symbol: "₩" },
    { code: "MXN", name: "Mexican Peso", flag: "🇲🇽", symbol: "$" },
    { code: "RUB", name: "Russian Ruble", flag: "🇷🇺", symbol: "₽" },
    { code: "ZAR", name: "South African Rand", flag: "🇿🇦", symbol: "R" },
    { code: "BRL", name: "Brazilian Real", flag: "🇧🇷", symbol: "R$" },
    { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", symbol: "S$" },
    { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰", symbol: "HK$" },
    { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴", symbol: "kr" },
    { code: "SEK", name: "Swedish Krona", flag: "🇸🇪", symbol: "kr" },
    { code: "PLN", name: "Polish Złoty", flag: "🇵🇱", symbol: "zł" },
  ];

  // Calculate converted amount
  const convertedAmount =
    exchangeRate && amount && !isNaN(parseFloat(amount))
      ? (parseFloat(amount) * exchangeRate).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "";

  const handleConvert = async () => {
    if (!amount || !fromCurrency || !toCurrency || !exchangeRate) return;

    const conversionData: ConversionRequest = {
      fromCurrency,
      toCurrency,
      amount: parseFloat(amount),
    };

    try {
      await createConversion(conversionData).unwrap();
      // Refetch summary to update stats
      refetchSummary();
    } catch (error) {
      console.error("Conversion failed:", error);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Generate dashboard stats from real API data
  const getDashboardStats = (): DashboardStat[] => {
    if (!summary || summaryLoading) {
      return [
        {
          title: "Total Conversions",
          value: summaryLoading ? "..." : "0",
          subtext: "Start your first conversion",
          icon: ArrowRightLeft,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          title: "Amount Converted",
          value: summaryLoading ? "..." : "$0.00",
          subtext: "Total amount converted",
          icon: DollarSign,
          color: "text-green-600",
          bgColor: "bg-green-50",
        },
        {
          title: "Currency Pairs",
          value: summaryLoading ? "..." : "0",
          subtext: "Unique currency pairs used",
          icon: Globe,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
        },
        {
          title: "Average Amount",
          value: summaryLoading ? "..." : "$0.00",
          subtext: "Average per conversion",
          icon: BarChart3,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
      ];
    }

    return [
      {
        title: "Total Conversions",
        value: summary.totalConversions.toString(),
        subtext: "Total conversions made",
        icon: ArrowRightLeft,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
      },
      {
        title: "Amount Converted",
        value: `$${summary.totalAmountConverted.toLocaleString()}`,
        subtext: "Total USD amount converted",
        icon: DollarSign,
        color: "text-green-600",
        bgColor: "bg-green-50",
      },
      {
        title: "Currency Pairs",
        value: summary.uniqueCurrencyPairs.toString(),
        subtext: "Unique currency pairs used",
        icon: Globe,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
      },
      {
        title: "Average Amount",
        value: `$${summary.avgConversionAmount.toLocaleString()}`,
        subtext: "Average per conversion",
        icon: BarChart3,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      },
    ];
  };

  const dashboardStats = getDashboardStats();

  const getCurrencyDetails = (code: string) => {
    return (
      currencyDetails.find((c) => c.code === code) || {
        code,
        name: code,
        flag: "🌐",
        symbol: code,
      }
    );
  };

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Convert currencies with live exchange rates
          </p>
        </div>
        {summary && (
          <div className="text-right">
            <p className="text-sm text-gray-500">Last conversion</p>
            <p className="text-sm font-medium">
              {new Date(summary.lastConversion).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <IconComponent className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FX Converter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            New Conversion
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Activity
              className={`h-4 w-4 ${rateLoading ? "text-yellow-500" : "text-green-500"}`}
            />
            <span>{rateLoading ? "Loading Rate..." : "Live Rate"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* From Currency */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              From
            </label>
            <div className="relative">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                disabled={currenciesLoading}
                className="w-full p-4 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white dark:bg-gray-700 text-lg font-medium disabled:opacity-50"
              >
                {currenciesLoading ? (
                  <option>Loading currencies...</option>
                ) : (
                  currencies.map((currencyCode) => {
                    const details = getCurrencyDetails(currencyCode);
                    return (
                      <option
                        key={currencyCode}
                        value={currencyCode}
                      >
                        {details.flag} {currencyCode} - {details.name}
                      </option>
                    );
                  })
                )}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-medium bg-white dark:bg-gray-700"
            />
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center lg:hidden">
            <button
              onClick={swapCurrencies}
              disabled={currenciesLoading}
              className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-full transition-colors shadow-lg"
              type="button"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </button>
          </div>

          {/* To Currency */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              To
            </label>
            <div className="relative">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                disabled={currenciesLoading}
                className="w-full p-4 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white dark:bg-gray-700 text-lg font-medium disabled:opacity-50"
              >
                {currenciesLoading ? (
                  <option>Loading currencies...</option>
                ) : (
                  currencies.map((currencyCode) => {
                    const details = getCurrencyDetails(currencyCode);
                    return (
                      <option
                        key={currencyCode}
                        value={currencyCode}
                      >
                        {details.flag} {currencyCode} - {details.name}
                      </option>
                    );
                  })
                )}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-lg font-bold text-gray-900 dark:text-white min-h-[56px] flex items-center">
              {rateLoading ? "Calculating..." : convertedAmount || "--"}
            </div>
          </div>

          {/* Desktop Swap Button */}
          <div className="hidden lg:flex pt-8 items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={swapCurrencies}
              disabled={currenciesLoading}
              className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-full transition-colors shadow-lg"
              type="button"
            >
              <ArrowRightLeft className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Exchange Rate Info */}
        {exchangeRate && !rateLoading && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <span className="text-blue-800 dark:text-blue-200 font-medium">
                Exchange Rate: 1 {fromCurrency} ={" "}
                {exchangeRate.toLocaleString("en-US", {
                  minimumFractionDigits: 4,
                })}{" "}
                {toCurrency}
              </span>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>Live Rate</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Messages */}
        {rateError && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200 text-sm">
              Error loading exchange rate. Please try again.
            </p>
          </div>
        )}

        {conversionError && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200 text-sm">
              Error creating conversion. Please try again.
            </p>
          </div>
        )}

        {/* Convert Button */}
        <div className="mt-8">
          <button
            onClick={handleConvert}
            disabled={isConverting || !amount || !exchangeRate || rateLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
            type="button"
          >
            {isConverting ? "Converting..." : "Convert Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
