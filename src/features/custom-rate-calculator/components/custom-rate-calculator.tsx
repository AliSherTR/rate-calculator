import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useCustomRateData } from "../hooks/useCustomRateData";
import { Download } from "lucide-react";
import { generateCustomRateReceipt } from "@/lib/generate-custom-receipt";

export default function CustomRateCalculator() {
  const { data, isLoading, error } = useCustomRateData();

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedSeniority, setSelectedSeniority] = useState<string | null>(
    null
  );

  const [selectedCurrency, setSelectedCurrency] = useState("AED");
  const [exchangeRate, setExchangeRate] = useState(1); // default: AED to AED = 1

  // Calculate the final rate
  const getFinalRate = () => {
    if (!data || !selectedRegion || !selectedRole || !selectedSeniority)
      return "0.00";

    const region = data.regions.find((r) => r.name === selectedRegion);
    const role = data.roles.find((r) => r.name === selectedRole);
    const seniority = data.seniority_levels.find(
      (s) => s.name === selectedSeniority
    );

    if (!region || !role || !seniority) return "0.00";

    const finalRate = role.base_rate * region.multiplier * seniority.multiplier;
    return finalRate.toFixed(2);
  };

  // Set default selections once data is loaded
  if (data && !selectedRegion && !selectedRole && !selectedSeniority) {
    setSelectedRegion(data.regions[0]?.name || null);
    setSelectedRole(data.roles[0]?.name || null);
    setSelectedSeniority(data.seniority_levels[0]?.name || null);
  }

  const fetchExchangeRate = async (targetCurrency: string) => {
    try {
      const res = await fetch("https://api.exchangerate-api.com/v4/latest/AED");
      const json = await res.json();
      const rate = json.rates[targetCurrency];
      if (rate) {
        setExchangeRate(rate);
      } else {
        setExchangeRate(1);
      }
    } catch (error) {
      console.error("Exchange rate fetch failed", error);
      setExchangeRate(1); // fallback
    }
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    fetchExchangeRate(currency);
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <Card className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg dark:shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl">
        <CardContent className="p-6">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg dark:shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl">
        <CardContent className="p-6">
          <p className="text-center text-red-500 dark:text-red-400">
            Error: {error.message}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (
    !data ||
    !data.regions.length ||
    !data.roles.length ||
    !data.seniority_levels.length
  ) {
    return (
      <Card className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg dark:shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl">
        <CardContent className="p-6">
          <p className="text-center text-gray-500 dark:text-gray-400">
            No data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg dark:shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
          Custom Rate Calculator
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select region, role, and seniority for tailored pricing
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Region Select */}
          <div className="space-y-2">
            <Label
              htmlFor="region"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Region
            </Label>
            <Select
              value={selectedRegion || ""}
              onValueChange={setSelectedRegion}
            >
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200 w-full">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                {data.regions.map((region) => (
                  <SelectItem
                    key={region.id}
                    value={region.name}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Role Select */}
          <div className="space-y-2">
            <Label
              htmlFor="role"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Role
            </Label>
            <Select value={selectedRole || ""} onValueChange={setSelectedRole}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200 w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                {data.roles.map((role) => (
                  <SelectItem
                    key={role.id}
                    value={role.name}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Seniority Select */}
          <div className="space-y-2">
            <Label
              htmlFor="seniority"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Seniority
            </Label>
            <Select
              value={selectedSeniority || ""}
              onValueChange={setSelectedSeniority}
            >
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200 w-full">
                <SelectValue placeholder="Select seniority" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                {data.seniority_levels.map((seniority) => (
                  <SelectItem
                    key={seniority.id}
                    value={seniority.name}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {seniority.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-60 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start flex-col md:flex-row md:items-center gap-4">
            <span id="regionVal" hidden>
              {selectedRegion}
            </span>
            <span id="roleVal" hidden>
              {selectedRole}
            </span>
            <span id="seniorityVal" hidden>
              {selectedSeniority}
            </span>
            <span id="rateVal" hidden>
              {getFinalRate()}
            </span>
            <button
              className="mt-4 md:mt-0 py-3 px-4 bg-blue-900 flex gap-2 items-center text-white rounded-lg text-sm"
              onClick={() => generateCustomRateReceipt()}
            >
              <Download className="text-sm" size={18} />
              Download Receipt
            </button>
            <div className=" flex gap-10 items-center  grow justify-end">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Convert to:
                </label>
                <Select
                  value={selectedCurrency}
                  onValueChange={handleCurrencyChange}
                >
                  <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200 w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                    <SelectItem
                      value="AED"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      AED (Base)
                    </SelectItem>
                    <SelectItem
                      value="USD"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      USD
                    </SelectItem>
                    <SelectItem
                      value="EUR"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      EUR
                    </SelectItem>
                    <SelectItem
                      value="GBP"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      GBP
                    </SelectItem>
                    <SelectItem
                      value="PKR"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      PKR
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Estimated Monthly Rate
                </h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                  AED {getFinalRate()}
                </p>
                {selectedCurrency !== "AED" && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ≈ {selectedCurrency}{" "}
                    {(parseFloat(getFinalRate()) * exchangeRate).toFixed(2)}{" "}
                    <br />
                    <span className="text-xs">
                      1 AED = {exchangeRate.toFixed(4)} {selectedCurrency}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
