import { Spinner } from "@/components/ui/spinner";

export default function TodoReadLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner className="size-14" />
    </div>
  );
}
