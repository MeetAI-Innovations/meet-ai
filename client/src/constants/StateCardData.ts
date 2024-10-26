import add from '@/assets/icons/add-meeting.svg';
import join from '@/assets/icons/join-meeting.svg';
import schedule from '@/assets/icons/schedule.svg';
import recording from '@/assets/icons/share.svg';

export interface StateCardItem {
  title: string;
  description: string;
  iconColor: string;
  iconbg: string;
  img: any;
  isState: 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | 'isPrivateMeeting';
}

export const StateCardData: StateCardItem[] = [
  {
    title: "New Meeting",
    description: "Start an instant meeting",
    iconColor: "#ffffff",
    iconbg: "#FFAF00",
    img: add,
    isState: 'isInstantMeeting',
  },
  {
    title: "Join Meeting",
    description: "Join an existing meeting",
    iconColor:"#4cceac",
    iconbg: "#0F67B1",
    img: join,
    isState: 'isJoiningMeeting',
  },
  {
    title: "Schedule Meeting",
    description: "Plan your meeting",
    iconColor: "#ffffff",
    iconbg: "#921A40",
    img: schedule,
    isState: 'isScheduleMeeting',
  },
  {
    title: "Private Meeting",
    description: "Start a private meeting",
    iconColor: "#ffffff",
    iconbg: "#ff5722", // Custom color for the private meeting
    img: schedule, // You can change this to another icon
    isState: 'isPrivateMeeting',
  },
];
