import Link from "next/link";

interface AuthFormFooterProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthFormFooter({ text, linkText, href }: AuthFormFooterProps) {
  return (
    <p className="text-sm text-center text-muted-foreground">
      {text}{" "}
      <Link href={href} className="text-primary hover:underline font-medium">
        {linkText}
      </Link>
    </p>
  );
}
