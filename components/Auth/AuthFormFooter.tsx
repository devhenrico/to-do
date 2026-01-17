import Link from "next/link";

interface AuthFormFooterProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthFormFooter({ text, linkText, href }: AuthFormFooterProps) {
  return (
    <p className="text-muted-foreground text-center text-xs font-medium sm:text-sm">
      {text}{" "}
      <Link href={href} className="text-primary font-semibold hover:underline">
        {linkText}
      </Link>
    </p>
  );
}
