import Image from "next/image";
import { Button } from "@/components/ui/button";
import ReportCard from "@/components/sections/reportCard";

export default function Home() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center z-10'>
      <ReportCard />
    </div>
  );
}
