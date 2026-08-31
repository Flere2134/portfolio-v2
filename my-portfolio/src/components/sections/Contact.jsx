import React, { useState } from "react";
import { User, Mail, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { contact, WEB3FORMS_ACCESS_KEY } from "../../data/contact.js";

const fieldClasses =
  "flex items-center gap-3 rounded-full border border-espresso/15 bg-background px-4 py-3 transition-colors focus-within:border-cerulean focus-within:ring-2 focus-within:ring-cerulean/25 dark:border-dark-surface dark:bg-dark-surface";

const inputClasses =
  "w-full bg-transparent text-sm text-espresso placeholder:text-espresso/40 outline-none dark:text-background dark:placeholder:text-surface/60";

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
    <section
      id="contact"
      className="w-full border-t border-espresso/10 bg-background px-6 py-24 dark:border-surface/10 dark:bg-espresso md:px-10"
    >
      <div className="mx-auto max-w-xl text-center">
        <span className="inline-flex items-center rounded-full bg-surface px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-teal dark:bg-dark-surface dark:text-cerulean">
          {contact.badge}
        </span>

        <h2 className="mt-5 text-4xl font-bold tracking-tight text-teal dark:text-dark-brand md:text-5xl">
          {contact.heading}
        </h2>

        <p className="mt-4 text-espresso/70 dark:text-surface">
          {contact.subheading}{" "}
          <a
            href={`mailto:${contact.email}`}
            className="text-cerulean hover:underline"
          >
            {contact.email}
          </a>
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6 text-left">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-espresso dark:text-background">
              Full Name
            </label>
            <div className={fieldClasses}>
              <User size={18} className="shrink-0 text-espresso/50 dark:text-surface/70" />
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
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-espresso dark:text-background">
              Email Address
            </label>
            <div className={fieldClasses}>
              <Mail size={18} className="shrink-0 text-espresso/50 dark:text-surface/70" />
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
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-espresso dark:text-background">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Enter your message"
              className="w-full rounded-2xl border border-espresso/15 bg-background px-4 py-3 text-sm text-espresso placeholder:text-espresso/40 outline-none transition-colors focus:border-cerulean focus:ring-2 focus:ring-cerulean/25 dark:border-dark-surface dark:bg-dark-surface dark:text-background dark:placeholder:text-surface/60"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-cerulean px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-teal dark:hover:bg-dark-brand disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Submit Form"}
            {status !== "sending" && <ArrowRight size={16} />}
          </button>

          {status === "success" && (
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-teal dark:text-dark-brand">
              <CheckCircle2 size={16} />
              Message sent — thanks for reaching out!
            </p>
          )}
          {status === "error" && (
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-amber dark:text-dark-accent">
              <AlertCircle size={16} />
              Something went wrong — try again, or email directly above.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}