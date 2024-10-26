
import React from "react";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "../../Review_Bento";

 function FeaturedSection() {
  return (
    <BentoGrid className="max-w-4xl mx-auto mb-10 mt-10">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={<img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-xl" />}
          // icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "Scheduling Simplified",
    description: "Easily book and manage meetings with integrated scheduling.",
    image: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/GetReadyToMeet_RWJPiD?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=2000&hei=1200&qlt=90&fit=constrain", // Replace with actual image URL
    // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Seamless Collaboration",
    description: "Collaborate with team members in real-time with ease.",
    image: "https://cdn.pixabay.com/photo/2017/12/21/12/08/consulting-3031678_640.jpg", // Replace with actual image URL
    // icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Intuitive Design",
    description: "Experience a user-friendly interface for all your meeting needs.",
    image: "https://media.istockphoto.com/id/489168376/photo/closeup-hand-holding-digital-tablet-show-analyzing-graph.jpg?s=612x612&w=0&k=20&c=sKz_T9IXT_xsHHyrSHgRn94u8VpG5ones6T1ae9mjAs=", // Replace with actual image URL
    // icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    // title: "Enhanced Communication",
    // description: "Utilize powerful tools for clear and effective communication.",
    image: "https://thumbs.dreamstime.com/b/businessman-having-business-meeting-making-video-call-laptop-indoor-black-businessman-having-online-business-meeting-208032144.jpg", // Replace with actual image URL
    // icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    // title: "Knowledge Sharing",
    // description: "Share documents and resources effortlessly within meetings.",
    image: "https://images.pexels.com/photos/7793688/pexels-photo-7793688.jpeg", // Replace with actual image URL
    // icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
 
];
export default FeaturedSection;