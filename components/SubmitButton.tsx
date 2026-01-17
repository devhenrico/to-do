import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  label: string;
  loadingLabel: string;
  loading: boolean;
}

export function SubmitButton({
  label,
  loadingLabel,
  loading,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className="w-full cursor-pointer rounded-xl relative"
      disabled={loading}
    >
      {loading ? loadingLabel : label}
      <ArrowRight className="h-5 w-5 absolute right-3 bg-white text-black rounded-full p-1" />
    </Button>
  );
}
