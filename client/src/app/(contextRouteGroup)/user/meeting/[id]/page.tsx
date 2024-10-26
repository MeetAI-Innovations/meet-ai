
import { Metadata } from "next";
import MeetingPage from "./MeetingPage";
import RootLayout from "./layout";
import { cn } from '@/lib/utils';

interface PageProps {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: PageProps): Metadata {
  return {
    title: `Meeting ${id}`,
    description:`details of meeting ${id}`
  };
}

export default function page({ params: { id } }: PageProps) {

  console.log(id);
  const metadata = generateMetadata({params:{id}})
  return (
   
    <MeetingPage id={id}/>
   
  )
}
