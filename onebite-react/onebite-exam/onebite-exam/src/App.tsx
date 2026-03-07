import './App.css';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';

function App() {
  const isActive = true;
  return (
    <div>
      <Button>버튼!</Button>
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
