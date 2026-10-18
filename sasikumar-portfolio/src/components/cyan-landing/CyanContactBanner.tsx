import { useState } from "react";
import { Mail, Phone, Linkedin, Github, Send, Copy, Check, Sparkles, CheckCircle2, MessageSquare } from "lucide-react";
import { profile } from "../../data/profile";

export default function CyanContactBanner() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSending(true);

    setTimeout(() => {
      setSending(false);
      setSent(true);
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${name}`
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    }, 800);
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[45rem] w-[45rem] rounded-full bg-cyan/15 blur-[200px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Main Banner Container */}
        <div className="glass-cyan-card relative overflow-hidden rounded-3xl border-2 border-cyan/40 p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(0,240,255,0.25)]">
          {/* Subtle Cyber Corner Badges */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#0099ff]/20 via-transparent to-transparent pointer-events-none" />

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            {/* Left: Headline & Information */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-4 py-1.5 font-mono text-xs font-semibold text-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Sparkles size={14} />
                <span>START A COLLABORATION</span>
              </div>

              {/* The exact requested headline */}
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Let's build something <br />
                <span className="grad-cyan">amazing together</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Have an exciting project, a freelance contract, or looking to hire a dedicated full stack web developer? I am eager to contribute, build scalable systems, and deliver exceptional user experiences.
              </p>

              {/* Quick Contact Info Cards */}
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                {/* Email card */}
                <div className="glass-cyan rounded-2xl p-4 border-cyan/25 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan/10 border border-cyan/30 text-cyan">
                      <Mail size={18} />
                    </span>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">Email Me</div>
                      <div className="text-xs font-semibold text-white truncate max-w-[150px]">
                        {profile.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(profile.email, "email")}
                    className="rounded-lg bg-black/40 p-2 text-slate-300 hover:text-cyan hover:bg-cyan/10 transition"
                    title="Copy Email"
                  >
                    {copiedKey === "email" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Phone card */}
                <div className="glass-cyan rounded-2xl p-4 border-cyan/25 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan/10 border border-cyan/30 text-cyan">
                      <Phone size={18} />
                    </span>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">Direct Phone</div>
                      <div className="text-xs font-semibold text-white">
                        {profile.phone}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(profile.phone, "phone")}
                    className="rounded-lg bg-black/40 p-2 text-slate-300 hover:text-cyan hover:bg-cyan/10 transition"
                    title="Copy Phone"
                  >
                    {copiedKey === "phone" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn glass-cyan !py-2.5 !px-4 !text-xs text-white hover:border-cyan hover:text-cyan"
                >
                  <Linkedin size={15} /> LinkedIn Profile
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn glass-cyan !py-2.5 !px-4 !text-xs text-white hover:border-cyan hover:text-cyan"
                >
                  <Github size={15} /> GitHub Repos
                </a>
              </div>
            </div>

            {/* Right: Interactive Message Form */}
            <div className="glass-cyan rounded-3xl border border-cyan/30 p-6 sm:p-8 shadow-2xl bg-[#080d1e]/85">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cyan/20">
                <MessageSquare size={18} className="text-cyan" />
                <h3 className="font-display text-lg font-bold text-white">
                  Send Me a Direct Message
                </h3>
              </div>

              {sent ? (
                <div className="text-center py-10 space-y-3">
                  <CheckCircle2 size={44} className="mx-auto text-emerald-400 drop-shadow-[0_0_12px_#34d399]" />
                  <h4 className="font-display text-xl font-bold text-white">Message Dispatched!</h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Thank you, {name}! Your default email client has been prepared. I will respond to your inquiry promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setName("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="btn-cyan mt-4 !text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan focus:outline-none focus:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan focus:outline-none focus:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Message / Project Scope *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your project, timeline, or position requirements..."
                      className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan focus:outline-none focus:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-cyan w-full !py-3 !text-sm group"
                  >
                    <Send size={15} className="transition-transform group-hover:translate-x-1" />
                    <span>{sending ? "Preparing Message..." : "Transmit Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
