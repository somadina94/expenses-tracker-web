import { cn } from "@/lib/utils";

type PlanaryLogoProps = {
  className?: string;
  iconOnly?: boolean;
};

export function PlanaryLogo({ className, iconOnly }: PlanaryLogoProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-hidden={iconOnly}
    >
      <svg
        viewBox="0 0 40 40"
        className="size-9 shrink-0 text-primary"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          className="stroke-current"
          strokeWidth="1.25"
          opacity="0.35"
        />
        <path
          d="M12 28V12h5.2c3.8 0 6.4 2.1 6.4 5.4 0 3.3-2.6 5.5-6.4 5.5H16v5.1H12Zm7.8-9.2c1.9 0 3-1 3-2.4 0-1.5-1.1-2.4-3-2.4H16v4.8h3.8Z"
          className="fill-current"
        />
        <path
          d="M26 12l6 16h-2.4l-1.4-3.8h-5.6L21.2 28h-2.5l5.8-16H26Zm-.2 10.2L24.3 16l-1.5 6.2h3Z"
          className="fill-accent"
        />
      </svg>
      {!iconOnly && (
        <span className="font-display text-2xl tracking-tight text-foreground">
          Planary
        </span>
      )}
    </span>
  );
}
