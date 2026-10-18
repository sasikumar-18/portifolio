import { useState } from "react";
import { Copy, Check, Mail, Phone, Linkedin, Github, Send, Terminal, CheckCircle2, AlertCircle } from "lucide-react";
import { profile } from "../../../data/profile";

export default function ContactTab() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const envEntries = [
    { key: "DEVELOPER_NAME", value: `"${profile.name}"` },
    { key: "PRIMARY_ROLE", value: `"${profile.role}"` },
    { key: "CONTACT_EMAIL", value: `"${profile.email}"`, copyVal: profile.email },
    { key: "CONTACT_PHONE", value: `"${profile.phone}"`, copyVal: profile.phone },
    { key: "LINKEDIN_URL", value: `"${profile.linkedin}"`, copyVal: profile.linkedin },
    { key: "GITHUB_URL", value: `"${profile.github}"`, copyVal: profile.github },
    { key: "LOCATION", value: `"${profile.location}"` },
    { key: "STATUS", value: `"AVAILABLE_FOR_ENGINEERING_ROLES"` },
    { key: "DEGREE", value: `"B.Tech, Information Technology (JNTUA)"` },
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in all required fields before dispatching.");
      return;
    }
    setErrorMsg("");
    setSending(true);

    // Simulate dispatch
    setTimeout(() => {
      setSending(false);
      setSentSuccess(true);
      // Construct mailto link as fallback backup
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        subject || `Portfolio Message from ${name}`
      )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    }, 1000);
  };

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e] text-[#d4d4d4] select-text">
      {/* Tab Control Bar */}
      <div className="flex items-center justify-between border-b border-[#2d2d2d] bg-[#252526] px-4 py-2 text-xs">
        <span className="font-mono text-[#858585]">&gt; sasikumar-portfolio / .env.production</span>
        <span className="font-mono text-[11px] text-emerald-400">● 200 OK</span>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-auto p-5 lg:p-7">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Environment Variables Editor */}
          <div className="rounded-2xl border border-[#2d2d2d] bg-[#252526] p-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#333333] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#38bdf8]">
                  # SYSTEM CONFIGURATION / CONTACT VARIABLES
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#858585]">UTF-8 · LF</span>
            </div>

            <div className="mt-4 font-mono text-xs leading-7">
              {envEntries.map(({ key, value, copyVal }, i) => (
                <div
                  key={key}
                  className="group flex flex-wrap items-center justify-between rounded px-2 py-0.5 hover:bg-[#1e1e1e]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 select-none text-right text-[11px] text-[#858585]">
                      {i + 1}
                    </span>
                    <span className="font-bold text-[#9cdcfe]">{key}</span>
                    <span className="text-[#d4d4d4]">=</span>
                    <span className="text-[#ce9178] break-all">{value}</span>
                  </div>

                  {copyVal && (
                    <button
                      onClick={() => handleCopy(copyVal, key)}
                      className="ml-auto opacity-0 group-hover:opacity-100 flex items-center gap-1 rounded bg-[#333333] px-2 py-0.5 text-[10px] text-white transition hover:bg-[#007acc]"
                      title="Copy value"
                    >
                      {copiedKey === key ? (
                        <>
                          <Check size={11} className="text-emerald-400" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy size={11} /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact Buttons */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-xl border border-[#2d2d2d] bg-[#252526] p-4 transition hover:border-[#007acc] hover:shadow-lg"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#007acc]/15 text-[#38bdf8]">
                <Mail size={18} />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-[#858585]">Direct Email</div>
                <div className="truncate text-xs font-semibold text-white">
                  {profile.email}
                </div>
              </div>
            </a>

            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-3 rounded-xl border border-[#2d2d2d] bg-[#252526] p-4 transition hover:border-[#007acc] hover:shadow-lg"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#ff003c]/15 text-[#ff003c]">
                <Phone size={18} />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-[#858585]">Phone / WhatsApp</div>
                <div className="truncate text-xs font-semibold text-white">
                  {profile.phone}
                </div>
              </div>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-[#2d2d2d] bg-[#252526] p-4 transition hover:border-[#007acc] hover:shadow-lg"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#007acc]/15 text-[#38bdf8]">
                <Linkedin size={18} />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-[#858585]">LinkedIn Profile</div>
                <div className="truncate text-xs font-semibold text-white">
                  singanaboyina-sasikumar
                </div>
              </div>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-[#2d2d2d] bg-[#252526] p-4 transition hover:border-[#007acc] hover:shadow-lg"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-white">
                <Github size={18} />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-[#858585]">GitHub</div>
                <div className="truncate text-xs font-semibold text-white">
                  github.com/sasikumar-18
                </div>
              </div>
            </a>
          </div>

          {/* Interactive Message Dispatcher Form */}
          <div className="rounded-2xl border border-[#2d2d2d] bg-[#252526] p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between border-b border-[#333333] pb-3">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-[#38bdf8]" />
                <h3 className="font-display text-sm font-bold text-white uppercase">
                  Transmit Direct Message
                </h3>
              </div>
              <span className="font-mono text-[11px] text-[#858585]">POST /api/v1/contact</span>
            </div>

            {sentSuccess ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                <CheckCircle2 size={36} className="mx-auto text-emerald-400" />
                <h4 className="mt-2 text-base font-bold text-white">Transmission Successful</h4>
                <p className="mt-1 text-xs text-[#cccccc]">
                  Thank you! Your message client has been initialized with Singanaboyina Sasikumar.
                </p>
                <button
                  onClick={() => {
                    setSentSuccess(false);
                    setName("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                  }}
                  className="mt-4 rounded-lg bg-[#007acc] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0098ff]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4">
                {errorMsg && (
                  <div className="flex items-center gap-2 rounded-lg border border-[#ff003c]/40 bg-[#ff003c]/10 p-3 text-xs text-[#ff003c]">
                    <AlertCircle size={14} /> {errorMsg}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block font-mono text-xs text-[#858585]">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Satya Nadella"
                      className="mt-1 w-full rounded-lg border border-[#383838] bg-[#1e1e1e] p-2.5 text-xs text-white placeholder-[#858585] focus:border-[#007acc] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#858585]">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="mt-1 w-full rounded-lg border border-[#383838] bg-[#1e1e1e] p-2.5 text-xs text-white placeholder-[#858585] focus:border-[#007acc] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#858585]">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Project Inquiry / Opportunity"
                    className="mt-1 w-full rounded-lg border border-[#383838] bg-[#1e1e1e] p-2.5 text-xs text-white placeholder-[#858585] focus:border-[#007acc] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#858585]">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hello Sasikumar, we came across your portfolio and would love to discuss..."
                    className="mt-1 w-full rounded-lg border border-[#383838] bg-[#1e1e1e] p-2.5 text-xs text-white placeholder-[#858585] focus:border-[#007acc] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-2 rounded-lg bg-[#007acc] px-5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#0098ff] disabled:opacity-50"
                >
                  <Send size={13} /> {sending ? "Compiling & Sending..." : "Transmit Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
