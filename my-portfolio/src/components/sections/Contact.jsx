import React, { useState } from "react";
import { User, Mail, ArrowRight, CheckCircle2, AlertCircle, Linkedin, Github } from "lucide-react";
import { contact, WEB3FORMS_ACCESS_KEY } from "../../data/contact.js";
import { profile } from "../../data/profile.js";

const socialIcons = {
  LinkedIn: Linkedin,
  GitHub: Github,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validators = {
  name: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Please enter your name.";
    if (trimmed.length < 2) return "That name looks a little short.";
    return "";
  },
  email: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Please enter your email address.";
    if (!EMAIL_PATTERN.test(trimmed)) return "Enter a valid email, like name@example.com.";
    return "";
  },
  message: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Add a quick message so I know what you're reaching out about.";
    if (trimmed.length < 10) return "A few more details would help (10+ characters).";
    return "";
  },
};

const fieldClasses = (hasError) =>
  "flex items-center gap-3 rounded-full border bg-background px-4 py-3 transition-colors focus-within:ring-2 " +
  (hasError
    ? "border-amber focus-within:border-amber focus-within:ring-amber/25"
    : "border-espresso/15 focus-within:border-cerulean focus-within:ring-cerulean/25");

const textareaClasses = (hasError) =>
  "w-full rounded-2xl border bg-background px-4 py-3 text-sm text-espresso placeholder:text-espresso/40 outline-none transition-colors focus:ring-2 " +
  (hasError
    ? "border-amber focus:border-amber focus:ring-amber/25"
    : "border-espresso/15 focus:border-cerulean focus:ring-cerulean/25");

const inputClasses =
  "w-full bg-transparent text-sm text-espresso placeholder:text-espresso/40 outline-none";

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-xs font-medium text-amber">
      <AlertCircle size={14} className="shrink-0" />
      {message}
    </p>
  );
}

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((errs) => ({ ...errs, [name]: validators[name](value) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Once a field has been touched, keep validating live so the error
    // clears the moment it's actually fixed instead of waiting for blur.
    if (touched[name]) {
      setErrors((errs) => ({ ...errs, [name]: validators[name](value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const nextErrors = {
      name: validators.name(values.name || ""),
      email: validators.email(values.email || ""),
      message: validators.message(values.message || ""),
    };
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    const firstInvalidField = Object.keys(nextErrors).find((key) => nextErrors[key]);
    if (firstInvalidField) {
      document.getElementById(firstInvalidField)?.focus();
      return;
    }

    setStatus("sending");
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
        setTouched({ name: false, email: false, message: false });
        setErrors({ name: "", email: "", message: "" });
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
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cerulean/30 text-cerulean transition-colors hover:bg-cerulean hover:text-espresso"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-6 text-left">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-surface">
              Full Name
            </label>
            <div className={fieldClasses(touched.name && !!errors.name)}>
              <User
                size={18}
                className={"shrink-0 " + (touched.name && errors.name ? "text-amber" : "text-espresso/50")}
              />
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                onBlur={handleBlur}
                onChange={handleChange}
                aria-invalid={touched.name && !!errors.name}
                aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                className={inputClasses}
              />
            </div>
            <FieldError id="name-error" message={touched.name ? errors.name : ""} />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-surface">
              Email Address
            </label>
            <div className={fieldClasses(touched.email && !!errors.email)}>
              <Mail
                size={18}
                className={"shrink-0 " + (touched.email && errors.email ? "text-amber" : "text-espresso/50")}
              />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                onBlur={handleBlur}
                onChange={handleChange}
                aria-invalid={touched.email && !!errors.email}
                aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                className={inputClasses}
              />
            </div>
            <FieldError id="email-error" message={touched.email ? errors.email : ""} />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-surface">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Enter your message"
              onBlur={handleBlur}
              onChange={handleChange}
              aria-invalid={touched.message && !!errors.message}
              aria-describedby={touched.message && errors.message ? "message-error" : undefined}
              className={textareaClasses(touched.message && !!errors.message)}
            />
            <FieldError id="message-error" message={touched.message ? errors.message : ""} />
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