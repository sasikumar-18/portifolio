import type { ReactNode } from "react";
import { isPlaceholder } from "../data/profile";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  download?: boolean;
  external?: boolean;
  label?: string;
};

/**
 * Renders a real link when `href` is filled in. While it is still a placeholder
 * it renders a clearly disabled control, so the site never ships a dead link.
 */
export default function SmartLink({ href, className = "", children, download, external = true, label }: Props) {
  if (isPlaceholder(href)) {
    return (
      <span
        role="link"
        aria-disabled="true"
        title="Not available yet"
        className={`${className} cursor-not-allowed opacity-45`}
        aria-label={label ? `${label} (not available yet)` : undefined}
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      className={className}
      aria-label={label}
      download={download ? "" : undefined}
      {...(external && !href.startsWith("mailto:") && !download
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}
