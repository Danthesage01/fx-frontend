// "use client";

// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { selectIsAuthenticated } from "@/lib/features/auth/authSlice";
// import {
//   ArrowRightLeft,
//   TrendingUp,
//   RefreshCw,
//   ChevronDown,
//   BarChart3,
//   DollarSign,
//   Globe,
//   Activity,
//   LucideIcon,
// } from "lucide-react";

// // TypeScript interfaces
// interface Currency {
//   code: string;
//   name: string;
//   flag: string;
//   symbol: string;
// }

// interface DashboardStat {
//   title: string;
//   value: string;
//   subtext: string;
//   icon: LucideIcon;
//   color: string;
//   bgColor: string;
// }

// interface ExchangeRates {
//   [key: string]: number;
// }

// export default function FxConverter(): JSX.Element {
//   const [fromCurrency, setFromCurrency] = useState<string>("USD");
//   const [toCurrency, setToCurrency] = useState<string>("NGN");
//   const [amount, setAmount] = useState<string>("1000.00");
//   const [convertedAmount, setConvertedAmount] = useState<string>("");
//   const [exchangeRate, setExchangeRate] = useState<number | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
//   const isAuthenticated = useSelector(selectIsAuthenticated);

//   // Mock exchange rates - in real app, this would come from an API
//   const exchangeRates: ExchangeRates = {
//     "USD-NGN": 1580.0,
//     "EUR-NGN": 1720.25,
//     "GBP-NGN": 1995.75,
//     "USD-EUR": 0.92,
//     "USD-GBP": 0.79,
//     "EUR-GBP": 0.86,
//     "NGN-USD": 0.000633,
//     "NGN-EUR": 0.000581,
//     "NGN-GBP": 0.000501,
//     "EUR-USD": 1.09,
//     "GBP-USD": 1.27,
//     "GBP-EUR": 1.16,
//   };

//   const currencies: Currency[] = [
//     { code: "USD", name: "US Dollar", flag: "🇺🇸", symbol: "$" },
//     { code: "EUR", name: "Euro", flag: "🇪🇺", symbol: "€" },
//     { code: "GBP", name: "British Pound", flag: "🇬🇧", symbol: "£" },
//     { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬", symbol: "₦" },
//     { code: "GHS", name: "Ghanaian Cedi", flag: "🇬🇭", symbol: "₵" },
//     { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪", symbol: "KSh" },
//   ];

//   // Mock dashboard stats
//   const dashboardStats: DashboardStat[] = [
//     {
//       title: "Total USD Converted",
//       value: "$12,450",
//       subtext: "Total USD Converted",
//       icon: DollarSign,
//       color: "text-blue-600",
//       bgColor: "bg-blue-50",
//     },
//     {
//       title: "Total NGN Received",
//       value: "₦8,945,000",
//       subtext: "Total NGN Received",
//       icon: TrendingUp,
//       color: "text-green-600",
//       bgColor: "bg-green-50",
//     },
//     {
//       title: "Total Conversions",
//       value: "47",
//       subtext: "Total Conversions",
//       icon: BarChart3,
//       color: "text-purple-600",
//       bgColor: "bg-purple-50",
//     },
//     {
//       title: "Currency Pairs",
//       value: "5",
//       subtext: "Currency Pairs",
//       icon: Globe,
//       color: "text-orange-600",
//       bgColor: "bg-orange-50",
//     },
//   ];

//   useEffect(() => {
//     calculateConversion();
//   }, [fromCurrency, toCurrency, amount]);

//   const calculateConversion = (): void => {
//     if (!amount || isNaN(parseFloat(amount))) {
//       setConvertedAmount("");
//       setExchangeRate(null);
//       return;
//     }

//     const rateKey: string = `${fromCurrency}-${toCurrency}`;
//     const rate: number | undefined = exchangeRates[rateKey];

//     if (rate) {
//       const result: number = parseFloat(amount) * rate;
//       setConvertedAmount(
//         result.toLocaleString("en-US", {
//           minimumFractionDigits: 2,
//           maximumFractionDigits: 2,
//         })
//       );
//       setExchangeRate(rate);
//     } else {
//       setConvertedAmount("Rate not available");
//       setExchangeRate(null);
//     }
//   };

//   const swapCurrencies = (): void => {
//     setFromCurrency(toCurrency);
//     setToCurrency(fromCurrency);
//   };

//   const refreshRates = (): void => {
//     setIsLoading(true);
//     setLastUpdated(new Date());
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   };

//   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setAmount(e.target.value);
//   };

//   const handleFromCurrencyChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ): void => {
//     setFromCurrency(e.target.value);
//   };

//   const handleToCurrencyChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ): void => {
//     setToCurrency(e.target.value);
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Dashboard
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300 mt-1">
//             Convert currencies with real-time exchange rates
//           </p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {dashboardStats.map((stat: DashboardStat, index: number) => {
//           const IconComponent = stat.icon;
//           return (
//             <div
//               key={index}
//               className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div
//                   className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
//                 >
//                   <IconComponent className={`h-6 w-6 ${stat.color}`} />
//                 </div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
//                   {stat.value}
//                 </div>
//                 <div className="text-sm text-gray-600 dark:text-gray-400">
//                   {stat.subtext}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* FX Converter */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             New Conversion
//           </h2>
//           <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//             <Activity className="h-4 w-4 text-green-500" />
//             <span>Live Rate</span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
//           {/* From Currency */}
//           <div className="space-y-4">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               From
//             </label>
//             <div className="relative">
//               <select
//                 value={fromCurrency}
//                 onChange={handleFromCurrencyChange}
//                 className="w-full p-4 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white dark:bg-gray-700 text-lg font-medium"
//               >
//                 {currencies.map((currency: Currency) => (
//                   <option
//                     key={currency.code}
//                     value={currency.code}
//                   >
//                     {currency.code} - {currency.name}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//             </div>

//             <input
//               type="text"
//               value={amount}
//               onChange={handleAmountChange}
//               placeholder="Enter amount"
//               className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-medium bg-white dark:bg-gray-700"
//             />
//           </div>

//           {/* Swap Button */}
//           <div className="flex items-center justify-center lg:hidden">
//             <button
//               onClick={swapCurrencies}
//               className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg"
//               type="button"
//             >
//               <ArrowRightLeft className="h-5 w-5" />
//             </button>
//           </div>

//           {/* To Currency */}
//           <div className="space-y-4">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               To
//             </label>
//             <div className="relative">
//               <select
//                 value={toCurrency}
//                 onChange={handleToCurrencyChange}
//                 className="w-full p-4 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white dark:bg-gray-700 text-lg font-medium"
//               >
//                 {currencies.map((currency: Currency) => (
//                   <option
//                     key={currency.code}
//                     value={currency.code}
//                   >
//                     {currency.code} - {currency.name}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//             </div>

//             <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-lg font-bold text-gray-900 dark:text-white min-h-[56px] flex items-center">
//               {convertedAmount || "--"}
//             </div>
//           </div>

//           {/* Desktop Swap Button */}
//           <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
//             <button
//               onClick={swapCurrencies}
//               className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors shadow-lg"
//               type="button"
//             >
//               <ArrowRightLeft className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Exchange Rate Info */}
//         {exchangeRate && (
//           <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
//             <div className="flex items-center justify-between">
//               <span className="text-blue-800 dark:text-blue-200 font-medium">
//                 Exchange Rate: 1 {fromCurrency} ={" "}
//                 {exchangeRate.toLocaleString("en-US", {
//                   minimumFractionDigits: 4,
//                 })}{" "}
//                 {toCurrency}
//               </span>
//               <div className="flex items-center text-green-600 text-sm">
//                 <TrendingUp className="h-4 w-4 mr-1" />
//                 <span>Live Rate</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Convert Button */}
//         <div className="mt-8">
//           <button
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
//             type="button"
//           >
//             Convert Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// Updated FxConverter component using the RTK Query hooks
