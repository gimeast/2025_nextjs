import './App.css';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';
import { toast } from 'sonner';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel.tsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx';
import { Ghost } from 'lucide-react';

function App() {
  const isActive = true;
  return (
    <div className="p-5">
      <Ghost className="h-10 w-10" />
      <AlertDialog>
        <AlertDialogTrigger>Show Alert Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Title</AlertDialogTitle>
            <AlertDialogDescription>Desc</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => console.log('cancel')}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => console.log('action')}>
              Action
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <div>body</div>
        </DialogContent>
      </Dialog>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>Content!</PopoverContent>
      </Popover>
      <Carousel className="mx-10">
        <CarouselContent>
          <CarouselItem className="basis-1/3">1</CarouselItem>
          <CarouselItem className="basis-1/3">2</CarouselItem>
          <CarouselItem className="basis-1/3">3</CarouselItem>
          <CarouselItem className="basis-1/3">4</CarouselItem>
          <CarouselItem className="basis-1/3">5</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Toaster />
      <Input placeholder="입력..." />
      <Textarea />
      <Button
        onClick={() =>
          toast('이벤트 발생!', {
            position: 'top-center',
          })
        }
      >
        Sonner Event 버튼!
      </Button>
      <Button variant="destructive">버튼</Button>
      <Button variant="ghost">버튼</Button>
      <Button variant="link">버튼</Button>
      <Button variant="outline">버튼</Button>
      <Button variant="secondary">버튼</Button>
      <div
        className={cn(
          'w-10 text-sm',
          isActive ? 'text-green-500' : 'text-red-500',
        )}
      >
        isActive
      </div>
      <div className="text-primary">Primary</div>
      <div className="text-muted">Muted</div>
      <div className="text-destructive">Destructive</div>
    </div>
  );
}

export default App;
