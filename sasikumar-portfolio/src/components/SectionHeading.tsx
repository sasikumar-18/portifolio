import Reveal from "./Reveal";

export default function SectionHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="h-7 w-1 shrink-0 rounded-full bg-gradient-to-b from-blue via-silver to-red shadow-[0_0_12px_#00d2ff]"
        />
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
      </div>
      {intro && <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-lg pl-4">{intro}</p>}
    </Reveal>
  );
}
