import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Github, Linkedin, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";
import { personalInfo } from "../../data/portfolioData";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!formData.message.trim()) errs.message = "Message cannot be empty";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    // Simulate network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 sm:px-8 relative overflow-hidden bg-black/[0.02] dark:bg-white/[0.02]">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00f0ff] bg-[#00f0ff]/10 px-3 py-1 rounded-full border border-[#00f0ff]/30">
            06 // GET IN TOUCH
          </span>
          <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
        </motion.div>

        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-black dark:text-white uppercase tracking-tight">
          LET&apos;S BUILD SOMETHING <br />
          <span className="text-neutral-400 dark:text-neutral-500">EXCEPTIONAL TOGETHER.</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Direct Contact Info & Socials */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Whether you have a new venture, an engineering challenge, or want to discuss full-time
              opportunities in full-stack web and machine learning, my inbox is always open.
            </p>

            {/* Direct Cards */}
            <div className="space-y-3 pt-4">
              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-[#ffffff] dark:bg-[#121212] border border-black/10 dark:border-white/10 flex items-center justify-between group hover:border-[#00f0ff] transition-colors">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 flex-1 min-w-0"
                  title="Send email to Sasikumar"
                >
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#0284c7] dark:text-[#00f0ff] group-hover:scale-105 transition-transform flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Direct Email
                    </span>
                    <p className="text-xs sm:text-sm font-mono font-bold text-black dark:text-white break-all group-hover:text-[#00f0ff] transition-colors">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>
                <button
                  onClick={() => copyToClipboard(personalInfo.email, "email")}
                  aria-label="Copy Email address"
                  title="Copy email to clipboard"
                  className="p-2 ml-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-[#00f0ff] hover:text-black transition-colors flex-shrink-0"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[#00f0ff]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-2xl bg-[#ffffff] dark:bg-[#121212] border border-black/10 dark:border-white/10 flex items-center justify-between group hover:border-[#00f0ff] transition-colors">
                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 flex-1 min-w-0"
                  title="Call Sasikumar"
                >
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#0284c7] dark:text-[#00f0ff] group-hover:scale-105 transition-transform flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Mobile &bull; WhatsApp
                    </span>
                    <p className="text-xs sm:text-sm font-mono font-bold text-black dark:text-white group-hover:text-[#00f0ff] transition-colors">
                      {personalInfo.phone}
                    </p>
                  </div>
                </a>
                <button
                  onClick={() => copyToClipboard(personalInfo.phone, "phone")}
                  aria-label="Copy Phone number"
                  title="Copy phone number to clipboard"
                  className="p-2 ml-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-[#00f0ff] hover:text-black transition-colors flex-shrink-0"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-[#00f0ff]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-[#ffffff] dark:bg-[#121212] border border-black/10 dark:border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#0284c7] dark:text-[#00f0ff]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Location
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-black dark:text-white">
                    {personalInfo.location} (Open to Relocation / Remote)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-8 mt-8 border-t border-black/10 dark:border-white/10 flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white transition-all"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Animated Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#ffffff] dark:bg-[#121212] border border-black/10 dark:border-white/10 shadow-xl relative overflow-hidden">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#00f0ff] flex items-center justify-center text-black mb-6 shadow-[0_0_25px_rgba(0,240,255,0.6)]">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-black dark:text-white uppercase mb-2">
                  Message Dispatched!
                </h3>
                <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                  Thank you for reaching out. I've received your note and will get back to you promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00f0ff] hover:text-black transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className={`w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border ${
                        errors.name ? "border-red-500" : "border-black/10 dark:border-white/10"
                      } focus:border-[#00f0ff] focus:outline-none text-sm text-black dark:text-white transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className={`w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border ${
                        errors.email ? "border-red-500" : "border-black/10 dark:border-white/10"
                      } focus:border-[#00f0ff] focus:outline-none text-sm text-black dark:text-white transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                    Subject / Project Scope
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Full-Stack Web App / ML Capstone / Role Inquiry"
                    className="w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 focus:border-[#00f0ff] focus:outline-none text-sm text-black dark:text-white transition-colors"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, or engineering goals..."
                    className={`w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border ${
                      errors.message ? "border-red-500" : "border-black/10 dark:border-white/10"
                    } focus:border-[#00f0ff] focus:outline-none text-sm text-black dark:text-white transition-colors resize-none`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-red-500 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#00f0ff] hover:bg-[#66f4ff] text-black font-display font-bold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="font-mono text-xs">TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
