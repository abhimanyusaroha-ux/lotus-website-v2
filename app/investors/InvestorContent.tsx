"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export function InvestorContent() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const emailFieldRef = useRef<HTMLDivElement>(null);
  const passwordFieldRef = useRef<HTMLDivElement>(null);
  const submitGroupRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([
        headingRef.current,
        subtextRef.current,
        bottomRef.current,
        imageRef.current
      ], { opacity: 1 });
      const formFields = Array.from(formRef.current?.children || []);
      gsap.set(formFields, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();

    // t=0.15s: heading fades in
    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.15
      );
    }

    // t=0.3s: subtext fades in
    if (subtextRef.current) {
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.3
      );
    }

    // form fields stagger in
    if (formRef.current) {
      const emailField = emailFieldRef.current;
      const passwordField = passwordFieldRef.current;
      const bottomGroup = submitGroupRef.current;
      
      tl.fromTo(
        emailField,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.5
      );
      
      tl.fromTo(
        passwordField,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.6
      );
      
      tl.fromTo(
        bottomGroup,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.7
      );
    }

    // t=0.6s: right image clip-path reveal starts
    if (imageRef.current && imageInnerRef.current) {
      tl.fromTo(
        imageRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.out" },
        0.6
      );
      tl.fromTo(
        imageInnerRef.current,
        { scale: 1.06 },
        { scale: 1, duration: 1.6, ease: "power3.out" },
        0.6
      );
    }

    // t=1.2s: bottom line fades in
    if (bottomRef.current) {
      tl.fromTo(
        bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.2
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    const form = e.currentTarget;
    
    if (form.checkValidity()) {
      setSubmitting(true);
      
      // Simulate network request
      setTimeout(() => {
        setSubmitting(false);
        gsap.to(formRef.current, {
          opacity: 0,
          y: -8,
          duration: 0.3,
          onComplete: () => {
            setSubmitted(true);
          }
        });
      }, 1500);
    }
  };

  useEffect(() => {
    if (submitted) {
      const successEl = document.getElementById("post-submit-message");
      if (successEl) {
        gsap.fromTo(
          successEl,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
      }
    }
  }, [submitted]);

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-canvas relative">
      <div className="w-full md:w-[55%] xl:w-1/2 flex flex-col justify-start pt-[120px] pb-12 min-[768px]:pt-[140px] min-[768px]:pb-[64px] pl-[max(120px,calc((100vw-1440px)/2+120px))] max-[1024px]:!pl-12 max-[640px]:!px-6 pr-[64px] max-[1024px]:pr-12">
        <div className="w-full max-w-[560px] mx-auto xl:mx-0 xl:max-w-none relative min-h-[500px] flex flex-col justify-center">
          
          <div className="max-w-[380px] max-[768px]:mx-auto max-[768px]:text-center">
            <h1
              ref={headingRef}
              className="font-sans font-bold text-ink"
              style={{ fontSize: "40px", lineHeight: 1.1, letterSpacing: "-0.02em", opacity: 0 }}
            >
              Investor portal
            </h1>
            
            <p
              ref={subtextRef}
              className="body-md font-sans font-light text-gray-600 mt-4"
              style={{ opacity: 0 }}
            >
              Access your portfolio, quarterly reports, K-1 documents, and capital call notices. This portal is available to current Lotus partners.
            </p>

            <div className="mt-12 min-h-[300px]">
              {/* Coming soon message — login form temporarily disabled. Restore by setting this to `false`. */}
              {true ? (
                <div>
                  <p className="body-sm font-sans font-normal text-ink-muted">
                    Coming soon.
                  </p>
                </div>
              ) : submitted ? (
                <div id="post-submit-message" style={{ opacity: 0 }}>
                  <p className="body-sm font-sans font-normal text-ink-muted">
                    This portal is currently in development. If you're a current investor and need access to your documents, please contact us at <a href="mailto:hello@lotuspropertygroup.com" className="text-ink underline underline-offset-2 decoration-[1px] hover:decoration-2 transition-all">hello@lotuspropertygroup.com</a> and we'll send them directly.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setAttemptedSubmit(false);
                      setTimeout(() => {
                        gsap.set(formRef.current, { opacity: 1, y: 0 });
                        gsap.set(Array.from(formRef.current?.children || []), { opacity: 1, y: 0 });
                      }, 50);
                    }}
                    className="mt-4 body-sm font-sans text-gray-600 underline underline-offset-2 decoration-[1px] hover:text-ink hover:decoration-2 transition-all"
                  >
                    ← Back to login
                  </button>
                </div>
              ) : (
                <form 
                  ref={formRef} 
                  onSubmit={handleSubmit} 
                  className={`space-y-6 ${attemptedSubmit ? 'submitted' : ''} max-[768px]:text-left`}
                  noValidate
                >
                  <style jsx>{`
                    .submitted input:invalid {
                      border-color: var(--ink, #111111);
                    }
                    .submitted input:invalid ~ .error-msg {
                      display: block;
                    }
                    @keyframes pulse-opacity {
                      0% { opacity: 0.6; }
                      50% { opacity: 1; }
                      100% { opacity: 0.6; }
                    }
                    .loading-text {
                      animation: pulse-opacity 1.2s infinite;
                    }
                  `}</style>
                  
                  <div ref={emailFieldRef} className="group" style={{ opacity: 0 }}>
                    <label htmlFor="email" className="caption font-sans text-gray-600 uppercase tracking-[0.12em] block mb-2">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full h-12 border border-gray-200 bg-canvas rounded-[2px] px-4 body-md font-sans text-ink placeholder:text-gray-400 focus:border-ink focus:outline-none transition-colors duration-200"
                      disabled={submitting}
                    />
                    <p className="error-msg body-sm text-ink mt-1 hidden">
                      This field is required.
                    </p>
                  </div>

                  <div ref={passwordFieldRef} className="group" style={{ opacity: 0 }}>
                    <label htmlFor="password" className="caption font-sans text-gray-600 uppercase tracking-[0.12em] block mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Enter your password"
                        className="w-full h-12 border border-gray-200 bg-canvas rounded-[2px] px-4 pr-12 body-md font-sans text-ink placeholder:text-gray-400 focus:border-ink focus:outline-none transition-colors duration-200"
                        disabled={submitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ink transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        disabled={submitting}
                      >
                        {showPassword ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="error-msg body-sm text-ink mt-1 hidden">
                      This field is required.
                    </p>
                  </div>

                  <div ref={submitGroupRef} style={{ opacity: 0 }}>
                    <div className="flex justify-end mb-8 mt-2">
                      <button type="button" className="body-sm font-sans text-gray-600 underline underline-offset-2 decoration-[1px] hover:text-ink hover:decoration-2 transition-all">
                        Forgot your password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center rounded-full bg-ink text-canvas font-sans font-medium tracking-[0.02em] h-[52px] px-8 body-sm hover:bg-ink-muted transition-colors duration-150 disabled:opacity-80"
                    >
                      {submitting ? (
                        <span className="loading-text">Signing in...</span>
                      ) : (
                        "Sign in"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            <div 
              ref={bottomRef} 
              style={{ opacity: 0 }} 
              className="absolute bottom-[-32px] left-0 max-[768px]:relative max-[768px]:bottom-auto max-[768px]:mt-12 max-[768px]:text-center w-full"
            >
              <p className="body-sm font-sans text-gray-400">
                Not an investor yet? <Link href="/about" className="text-gray-600 underline underline-offset-2 decoration-[1px] hover:text-ink hover:decoration-2 transition-all">Learn about partnering with us →</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-[45%] xl:w-1/2 h-screen sticky top-0 bg-canvas pr-[max(0px,calc((100vw-1440px)/2+120px))]">
        <div
          ref={imageRef}
          className="relative w-full h-full overflow-hidden bg-gray-100"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <div ref={imageInnerRef} className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2400&q=80"
              alt="Lotus Property Group private office interior"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1279px) 45vw, 50vw"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
