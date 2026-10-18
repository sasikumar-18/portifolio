import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Github, Linkedin, Loader2, Mail, Phone, Send, Sparkles } from "lucide-react";
import { profile } from "../data/profile";
import Contact3DObject from "./3d/Contact3DObject";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) || "";
const empty: Fields = { name: "", email: "", subject: "", message: "" };

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.subject.trim().length < 3) e.subject = "Subject must be at least 3 characters.";
  if (v.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
  return e;
}

const labels: Record<keyof Fields, string> = { name: "Name", email: "Email", subject: "Subject", message: "Message" };

export default function Contact() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [isFocused, setIsFocused] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof Fields]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }

    if (ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("bad response");
        setStatus("sent");
        setValues(empty);
      } catch {
        setStatus("error");
      }
    } else {
      const body = `${values.message}\n\n— Sent from 3D Workstation Portfolio by ${values.name} (${values.email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-silver/20 bg-black/70 px-4 py-3 text-sm text-white placeholder:text-silver-dark font-medium transition focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/30 aria-[invalid=true]:border-red";

  return (
    <section id="contact" className="section-pad">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left Side: 3D Object & Direct Comms */}
        <Reveal>
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-blue tracking-wider uppercase mb-2">
              <Sparkles size={14} className="text-red" /> Reactive 3D Workstation Core
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Have an opportunity? <br />
              <span className="grad-text">Let's build something real.</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-silver">
              Open to Software Engineer, Full-Stack Developer, and Machine Learning engineering roles. Reach out through the form or connect via direct channels.
            </p>

            {/* Interactive 3D Reactive Core */}
            <div className="my-6 glass-card rounded-2xl border border-silver/20 bg-[#070916]/85 p-2 overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              <Contact3DObject isFocused={isFocused} />
              <p className="text-center font-mono text-[11px] text-silver-dark pb-2">
                {isFocused ? "CORE OVERCLOCKED: INPUT STREAM ACTIVE" : "FOCUS INPUT FIELD TO ACCELERATE 3D CORE"}
              </p>
            </div>

            {/* Direct Comms Channels */}
            <div className="flex flex-wrap gap-2.5">
              <MagneticButton href={`mailto:${profile.email}`} strength={15}>
                <span className="glass inline-flex items-center gap-2 rounded-xl border border-silver/20 px-4 py-2.5 text-xs font-semibold text-white hover:border-blue hover:text-blue transition">
                  <Mail size={15} className="text-blue" /> {profile.email}
                </span>
              </MagneticButton>

              <MagneticButton href={`tel:${profile.phone.replace(/[\s+]/g, "")}`} strength={15}>
                <span className="glass inline-flex items-center gap-2 rounded-xl border border-silver/20 px-4 py-2.5 text-xs font-semibold text-white hover:border-red hover:text-red transition">
                  <Phone size={15} className="text-red" /> {profile.phone}
                </span>
              </MagneticButton>

              <MagneticButton href={profile.linkedin} strength={15}>
                <span className="glass inline-flex items-center gap-2 rounded-xl border border-silver/20 px-4 py-2.5 text-xs font-semibold text-white hover:border-blue hover:text-blue transition">
                  <Linkedin size={15} className="text-blue" /> LinkedIn
                </span>
              </MagneticButton>

              <MagneticButton href={profile.github} strength={15}>
                <span className="glass inline-flex items-center gap-2 rounded-xl border border-silver/20 px-4 py-2.5 text-xs font-semibold text-white hover:border-red hover:text-red transition">
                  <Github size={15} className="text-red" /> GitHub
                </span>
              </MagneticButton>
            </div>
          </div>
        </Reveal>

        {/* Right Side: Animated Form with Validation */}
        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="glass-card space-y-5 rounded-3xl border border-silver/20 bg-[#080916]/95 p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {(["name", "email"] as const).map((k) => (
                <div key={k}>
                  <label htmlFor={`f-${k}`} className="mb-1.5 block font-mono text-xs font-bold text-silver-light uppercase">
                    {labels[k]}
                  </label>
                  <input
                    id={`f-${k}`}
                    name={k}
                    type={k === "email" ? "email" : "text"}
                    autoComplete={k}
                    value={values[k]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={onChange}
                    aria-invalid={!!errors[k]}
                    aria-describedby={errors[k] ? `e-${k}` : undefined}
                    placeholder={k === "name" ? "Your Name" : "your@company.com"}
                    className={inputClass}
                  />
                  {errors[k] && (
                    <p id={`e-${k}`} role="alert" className="mt-1.5 text-xs font-medium text-red">
                      {errors[k]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="f-subject" className="mb-1.5 block font-mono text-xs font-bold text-silver-light uppercase">
                Subject
              </label>
              <input
                id="f-subject"
                name="subject"
                type="text"
                value={values.subject}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={onChange}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "e-subject" : undefined}
                placeholder="Software Engineering Opportunity"
                className={inputClass}
              />
              {errors.subject && (
                <p id="e-subject" role="alert" className="mt-1.5 text-xs font-medium text-red">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="f-message" className="mb-1.5 block font-mono text-xs font-bold text-silver-light uppercase">
                Message
              </label>
              <textarea
                id="f-message"
                name="message"
                rows={5}
                value={values.message}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={onChange}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "e-message" : undefined}
                placeholder="Share project scope, role requirements, or collaboration goals..."
                className={`${inputClass} resize-y`}
              />
              {errors.message && (
                <p id="e-message" role="alert" className="mt-1.5 text-xs font-medium text-red">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full !py-3.5 disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin text-black" /> Transmitting…
                </>
              ) : (
                <>
                  <Send size={16} /> Send Transmission
                </>
              )}
            </button>

            {/* Status Messages */}
            <div aria-live="polite" className="min-h-[1.5rem]">
              <AnimatePresence mode="wait">
                {status === "sent" && (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm font-semibold text-emerald-300"
                  >
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span>Transmission delivered. Thank you, I will get back to you promptly.</span>
                  </motion.div>
                )}

                {status === "mailto" && (
                  <motion.div
                    key="mailto"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border border-blue/30 bg-blue/10 p-3 text-sm text-blue"
                  >
                    Opening your default email client with your message payload.
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border border-red/30 bg-red/10 p-3 text-sm text-red"
                  >
                    Transmission error. Please verify connection or email directly at {profile.email}.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
