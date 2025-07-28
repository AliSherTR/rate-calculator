import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomRateCalculator from "../features/custom-rate-calculator/components/custom-rate-calculator";
import SwatTeamCalculator from "../features/swat-rate-calculator/components/swat-team-calculator";

export function RateCardTabs() {
  return (
    <Tabs defaultValue="custom" className="w-full">
      <TabsList className=" p-8 items-center w-full dark:bg-gray-800 rounded-xl">
        <TabsTrigger value="custom" className=" p-5">
          Custom Resource Calculator
        </TabsTrigger>
        <TabsTrigger value="swat" className="p-5">
          SWAT Team Calculator
        </TabsTrigger>
      </TabsList>
      <TabsContent value="custom" className=" mb-5 p-5">
        <CustomRateCalculator />
      </TabsContent>
      <TabsContent value="swat">
        <SwatTeamCalculator />
      </TabsContent>
    </Tabs>
  );
}
