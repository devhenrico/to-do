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
      className="relative w-full cursor-pointer rounded-xl py-4 text-xs sm:py-5 sm:text-sm"
      disabled={loading}
    >
      {loading ? loadingLabel : label}
      <ArrowRight className="absolute right-2 h-4 w-4 rounded-full bg-white p-1 text-black sm:right-3 sm:h-5 sm:w-5" />
    </Button>
  );
}
