import { socials } from "@/lib/content";

type Name = (typeof socials)[number]["name"];

const paths: Record<Name, string> = {
  X: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77zm-1.08 16.17h1.7L7.4 4.74H5.58z",
  LinkedIn:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.83v1.54h.06c.53-1 1.84-2.05 3.8-2.05 4.06 0 4.81 2.67 4.81 6.15V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V21h-4z",
  Facebook:
    "M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63A21 21 0 0 0 14.25 4.5c-2.25 0-3.79 1.37-3.79 3.9v2.16H7.92v2.94h2.54V21z",
  Instagram:
    "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.8-8.85a1.08 1.08 0 1 0 0 2.16 1.08 1.08 0 0 0 0-2.16zM21.95 8.1c-.06-1.4-.37-2.64-1.4-3.65S18.3 3.11 16.9 3.05C15.45 2.97 8.55 2.97 7.1 3.05c-1.4.06-2.63.38-3.65 1.4S2.11 6.7 2.05 8.1c-.08 1.45-.08 6.35 0 7.8.06 1.4.37 2.64 1.4 3.65s2.25 1.34 3.65 1.4c1.45.08 8.35.08 9.8 0 1.4-.06 2.64-.37 3.65-1.4s1.34-2.25 1.4-3.65c.08-1.45.08-6.34 0-7.8zM20 17.84a3.06 3.06 0 0 1-1.72 1.72c-1.2.47-4 .36-5.3.36s-4.12.1-5.3-.36A3.06 3.06 0 0 1 5.96 17.84c-.47-1.2-.36-4-.36-5.3s-.1-4.12.36-5.3A3.06 3.06 0 0 1 7.68 5.5c1.2-.47 4-.36 5.3-.36s4.12-.1 5.3.36A3.06 3.06 0 0 1 20 7.22c.47 1.2.36 4 .36 5.3s.11 4.12-.36 5.32z",
  YouTube:
    "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z",
};

export function SocialLinks({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const base =
    tone === "dark"
      ? "border-white/15 text-fog hover:border-white hover:text-white"
      : "border-line text-slate hover:border-ink hover:text-ink bg-white";
  return (
    <ul className="flex flex-wrap gap-2.5">
      {socials.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Thinkverses on ${s.name} (opens in a new tab)`}
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 ${base}`}
          >
            <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" fill="currentColor" aria-hidden="true">
              <path d={paths[s.name]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
