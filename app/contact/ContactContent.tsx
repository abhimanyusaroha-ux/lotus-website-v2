"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LineReveal from "@/components/LineReveal";

gsap.registerPlugin(ScrollTrigger);

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([eyebrowRef.current, imageRef.current, detailsRef.current], { opacity: 1 });
      const formFields = Array.from(formRef.current?.children || []);
      gsap.set(formFields, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();

    if (eyebrowRef.current) {
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4 },
        0
      );
    }

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
      
      gsap.to(imageInnerRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (formRef.current) {
      const formFields = Array.from(formRef.current.children);
      tl.fromTo(
        formFields,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06 },
        0.8
      );
    }

    if (detailsRef.current) {
      tl.fromTo(
        detailsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.4
      );
    }
    
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    const form = e.currentTarget;
    
    if (form.checkValidity()) {
      gsap.to(formRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.3,
        onComplete: () => {
          setSubmitted(true);
        }
      });
    } else {
      // Allow native browser popups to show if needed, 
      // but we mainly rely on our custom styled invalid state
    }
  };

  useEffect(() => {
    if (submitted) {
      const successEl = document.getElementById("success-message");
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
        <div className="w-full max-w-[560px] mx-auto xl:mx-0 xl:max-w-none">
          <div className="max-w-[560px]">
            <p
              ref={eyebrowRef}
              className="caption font-sans text-gray-600 uppercase tracking-[0.12em]"
              style={{ opacity: 0 }}
            >
              Contact
            </p>
            
            <LineReveal
              as="h1"
              className="display-md font-sans font-bold text-ink mt-6"
              trigger="mount"
              delay={0.1}
            >
              Let's talk.
            </LineReveal>
            
            <LineReveal
              as="p"
              className="body-md font-sans font-light text-ink-muted mt-6 max-w-[420px]"
              trigger="mount"
              delay={0.4}
            >
              Whether you have a building you'd like us to look at, a question about investing with us, or just want to learn more about how we work, we'd like to hear from you. We read everything and reply within a business day.
            </LineReveal>

            <div className="mt-12">
              {submitted ? (
                <div id="success-message" className="py-4" style={{ opacity: 0 }}>
                  <p className="body-md font-sans text-ink">
                    Thank you. We've received your message and will get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form 
                  ref={formRef} 
                  onSubmit={handleSubmit} 
                  className={`space-y-6 ${attemptedSubmit ? 'submitted' : ''}`} 
                  noValidate
                >
                  <style jsx>{`
                    .submitted input:invalid,
                    .submitted textarea:invalid {
                      border-color: var(--ink, #111111);
                    }
                    .submitted input:invalid ~ .error-msg,
                    .submitted textarea:invalid ~ .error-msg {
                      display: block;
                    }
                  `}</style>
                  <div className="group">
                    <label htmlFor="name" className="caption font-sans text-gray-600 uppercase tracking-[0.12em] block mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full h-12 border border-gray-200 bg-canvas rounded-[2px] px-4 body-md font-sans text-ink placeholder:text-gray-400 focus:border-ink focus:outline-none transition-colors duration-200"
                    />
                    <p className="error-msg body-sm text-ink mt-1 hidden">
                      This field is required.
                    </p>
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="caption font-sans text-gray-600 uppercase tracking-[0.12em] block mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full h-12 border border-gray-200 bg-canvas rounded-[2px] px-4 body-md font-sans text-ink placeholder:text-gray-400 focus:border-ink focus:outline-none transition-colors duration-200"
                    />
                    <p className="error-msg body-sm text-ink mt-1 hidden">
                      This field is required.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="subject" className="caption font-sans text-gray-600 uppercase tracking-[0.12em] block mb-2">
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        defaultValue=""
                        className="w-full h-12 border border-gray-200 bg-canvas rounded-[2px] px-4 appearance-none body-md font-sans text-ink focus:border-ink focus:outline-none transition-colors duration-200"
                      >
                        <option value="" disabled className="text-gray-400">Select a topic</option>
                        <option value="invest">I'd like to invest with Lotus</option>
                        <option value="property">I have a property to submit</option>
                        <option value="general">General inquiry</option>
                        <option value="press">Press or media</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="caption font-sans text-gray-600 uppercase tracking-[0.12em] block mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Tell us what's on your mind"
                      className="w-full min-h-[140px] border border-gray-200 bg-canvas rounded-[2px] p-4 body-md font-sans text-ink placeholder:text-gray-400 focus:border-ink focus:outline-none transition-colors duration-200 resize-y"
                    />
                    <p className="error-msg body-sm text-ink mt-1 hidden">
                      This field is required.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full bg-ink text-canvas font-sans font-medium tracking-[0.02em] h-12 px-8 body-sm hover:bg-ink-muted transition-colors duration-150"
                    >
                      Send message
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div ref={detailsRef} style={{ opacity: 0 }}>
              <hr className="border-t-[0.5px] border-gray-200 mt-12 mb-8" />
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:hello@lotuspropertygroup.com"
                  className="body-sm font-sans text-ink underline underline-offset-2 decoration-[1px] hover:decoration-2 transition-all w-fit"
                >
                  hello@lotuspropertygroup.com
                </a>
                <p className="body-sm font-sans text-gray-600">
                  Chicago, IL
                </p>
                <p className="body-sm font-sans text-gray-600 italic">
                  We typically reply within one business day.
                </p>
              </div>
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
          <div ref={imageInnerRef} className="absolute inset-0 w-full h-[110%] -top-[5%]">
            <Image
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2000&q=80"
              alt="Lotus Property Group interior"
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
