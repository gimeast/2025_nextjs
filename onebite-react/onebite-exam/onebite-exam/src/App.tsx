import './App.css';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';
import { toast } from 'sonner';

function App() {
  const isActive = true;
  return (
    <div className="p-5">
      <Toaster />
      <Input placeholder="입력..." value="기본값" />
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
