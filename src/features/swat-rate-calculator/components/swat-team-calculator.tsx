import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useSwatTeamData } from "../hooks/useSwatTeamRate";
import { generatePDFReceipt } from "@/lib/generate-receipt";
import { Download } from "lucide-react";

const SWAT_DISCOUNT = 0.8; // 20% discount

export default function SwatTeamCalculator() {
  const { data, isLoading, error } = useSwatTeamData();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedSeniority, setSelectedSeniority] = useState<string | null>(
    null
  );
  const [selectedWorkload, setSelectedWorkload] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  useEffect(() => {
    if (
      data &&
      !selectedRole &&
      !selectedSeniority &&
      !selectedWorkload &&
      !selectedDuration
    ) {
      setSelectedRole(data.roles[0]?.name || null);
      setSelectedSeniority(data.seniority_levels[0]?.name || null);
      setSelectedWorkload(data.workloads[0]?.name || null);
      setSelectedDuration(data.durations[0]?.name || null);
    }
  }, [data]);

  const getFinalRate = () => {
    if (
      !data ||
      !selectedRole ||
      !selectedSeniority ||
      !selectedWorkload ||
      !selectedDuration
    )
      return 0;

    const role = data.roles.find((r) => r.name === selectedRole);
    const seniority = data.seniority_levels.find(
      (s) => s.name === selectedSeniority
    );
    const workload = data.workloads.find((w) => w.name === selectedWorkload);
    const duration = data.durations.find((d) => d.name === selectedDuration);

    if (!role || !seniority || !workload || !duration) return 0;

    const finalRate =
      role.base_rate *
      seniority.multiplier *
      workload.percentage *
      duration.discount *
      SWAT_DISCOUNT;

    return finalRate.toFixed(2);
  };

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
    !data.roles.length ||
    !data.seniority_levels.length ||
    !data.workloads.length ||
    !data.durations.length
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
    <Card className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
          SWAT Team Calculator
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Discount : 20%
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select role, seniority, workload, and duration for tailored pricing
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                <SelectValue placeholder="Role" />
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
                <SelectValue placeholder="Seniority" />
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

          {/* Workload Select */}
          <div className="space-y-2">
            <Label
              htmlFor="workload"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Workload
            </Label>
            <Select
              value={selectedWorkload || ""}
              onValueChange={setSelectedWorkload}
            >
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200 w-full">
                <SelectValue placeholder="Workload" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                {data.workloads.map((workload) => (
                  <SelectItem
                    key={workload.id}
                    value={workload.name}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {workload.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration Select */}
          <div className="space-y-2">
            <Label
              htmlFor="duration"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Duration
            </Label>
            <Select
              value={selectedDuration || ""}
              onValueChange={setSelectedDuration}
            >
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200 w-full">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600">
                {data.durations.map((duration) => (
                  <SelectItem
                    key={duration.id}
                    value={duration.name}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {duration.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Final Rate Display */}
        <div className="mt-60 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-right border border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <span id="roleVal" hidden>
            {selectedRole}
          </span>
          <span id="seniorityVal" hidden>
            {selectedSeniority}
          </span>
          <span id="workloadVal" hidden>
            {selectedWorkload}
          </span>
          <span id="durationVal" hidden>
            {selectedDuration}
          </span>
          <span id="rateVal" hidden>
            {getFinalRate()}
          </span>

          <div>
            <button
              className=" py-3 px-4 bg-blue-900 flex gap-2 items-center text-white rounded-lg text-sm"
              onClick={() => generatePDFReceipt()}
            >
              <Download className=" text-sm" size={18} />
              Download Receipt
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Estimated Monthly Rate
            </h3>

            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              AED {getFinalRate()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
