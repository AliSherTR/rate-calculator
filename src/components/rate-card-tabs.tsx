import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomRateCalculator from "../features/custom-rate-calculator/components/custom-rate-calculator";
import SwatTeamCalculator from "../features/swat-rate-calculator/components/swat-team-calculator";

export function RateCardTabs() {
  return (
    <Tabs defaultValue="custom" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="custom">Custom Resource Calculator</TabsTrigger>
        <TabsTrigger value="swat">SWAT Team Calculator</TabsTrigger>
      </TabsList>
      <TabsContent value="custom" className=" mb-5">
        <CustomRateCalculator />
      </TabsContent>
      <TabsContent value="swat">
        <SwatTeamCalculator />
      </TabsContent>
    </Tabs>
  );
}
