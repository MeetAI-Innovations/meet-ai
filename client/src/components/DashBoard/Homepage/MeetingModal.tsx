import React, { Children, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import Button from '@mui/material/Button';


interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({ isOpen, onClose, title, className, handleClick, buttonText }: MeetingModalProps) => {
  return isOpen ? (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col  gap-6 border-b-indigo-50 bg-black-200 px-6 py-9 text-white">
        <div className="flex  flex-col gap-6 justify-center items-center">
          <h1 className={cn('text-3xl font-bold leading-[42px]',className)}>{title}</h1>
            <Button className="bg-blue-1 text-white w-90 h-13 focus-visible:ring-offset-0 " onClick={handleClick}> {buttonText||'Schedule Meeting'}
              
            </Button>
        </div>
        
      </DialogContent>
    </Dialog>
  ) : null;
};

export default MeetingModal;