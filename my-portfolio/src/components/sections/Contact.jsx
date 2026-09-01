import React, { useState } from "react";
import { User, Mail, ArrowRight, CheckCircle2, AlertCircle, Linkedin, Github } from "lucide-react";
import { contact, WEB3FORMS_ACCESS_KEY } from "../../data/contact.js";
import { profile } from "../../data/profile.js";

const socialIcons = {
  LinkedIn: Linkedin,
  GitHub: Github,
};

const fieldClasses =
  "flex items-center gap-3 rounded-full border border-espresso/15 bg-background px-4 py-3 transition-colors focus-within:border-cerulean focus-within:ring-2 focus-within:ring-cerulean/25";

const inputClasses =
  "w-full bg-transparent text-sm text-espresso placeholder:text-espresso/40 outline-none";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", contact.emailSubject);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full bg-espresso">
      { /*gradient lines above the contact form section */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-amber/10 to-transparent" />

      <div className="relative px-6 py-24 md:px-10">
        <div className="mx-auto max-w-xl text-center">
        <span className="inline-flex items-center rounded-full bg-background/10 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-cerulean">
          {contact.badge}
        </span>

        <h2 className="mt-5 text-4xl font-bold tracking-tight text-background md:text-5xl">
          {contact.heading}
        </h2>

        <p className="mt-4 text-surface">
          {contact.subheading}{" "}
          <a
            href={`mailto:${contact.email}`}
            className="text-cerulean hover:underline"
          >
            {contact.email}
          </a>
        </p>

        {/* Social icons — an option alongside email/the form below */}
        <div className="mt-5 flex items-center justify-center gap-3">
          {profile.socials.map(({ label, href }) => {
            const Icon = socialIcons[label];
            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cerulean/30 text-cerulean transition-colors hover:bg-cerulean hover:text-espresso"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6 text-left">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-surface">
              Full Name
            </label>
            <div className={fieldClasses}>
              <User size={18} className="shrink-0 text-espresso/50" />
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your full name"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-surface">
              Email Address
            </label>
            <div className={fieldClasses}>
              <Mail size={18} className="shrink-0 text-espresso/50" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email address"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-surface">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Enter your message"
              className="w-full rounded-2xl border border-espresso/15 bg-background px-4 py-3 text-sm text-espresso placeholder:text-espresso/40 outline-none transition-colors focus:border-cerulean focus:ring-2 focus:ring-cerulean/25"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-cerulean px-6 py-3.5 text-sm font-semibold text-espresso transition-colors hover:bg-background disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Submit Form"}
            {status !== "sending" && <ArrowRight size={16} />}
          </button>

          {status === "success" && (
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-cerulean">
              <CheckCircle2 size={16} />
              Message sent — thanks for reaching out!
            </p>
          )}
          {status === "error" && (
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-amber">
              <AlertCircle size={16} />
              Something went wrong — try again, or email directly above.
            </p>
          )}
        </form>
        </div>
      </div>
    </section>
  );
}