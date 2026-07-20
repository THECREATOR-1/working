import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, Send } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import Container from '../ui/Container';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import GlassPanel from '../ui/GlassPanel';
import { useReveal } from '../../hooks/useReveal';

const PROJECT_TYPES = ['Website', 'Web App', 'E-commerce', 'Design System', 'Other'];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', project_type: '', message: '' });
  const formRef = useReveal<HTMLFormElement>({ y: 28, duration: 0.9 });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    const { error } = await supabase.from('inquiries').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      project_type: form.project_type || null,
      message: form.message.trim(),
    });
    if (error) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setForm({ name: '', email: '', project_type: '', message: '' });
  };

  const inputCls =
    'w-full rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-sm text-white placeholder:text-muted/60 transition-colors duration-300 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30';

  return (
    <Section id="contact">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionTitle
              eyebrow="Contact"
              title="Let's build something worth remembering."
              description="Tell me about your project. I take on a limited number of engagements at a time so each one gets the attention it deserves."
            />
            <div className="mt-10 flex flex-col gap-4">
              <a
                href="mailto:hello@axiom.studio"
                className="group inline-flex items-center gap-3 text-lg text-white"
                data-cursor="hover"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-colors group-hover:text-accent-cyan">
                  @
                </span>
                hello@axiom.studio
              </a>
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                Typical response time within 24 hours. For larger scopes, a discovery call comes first.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              aria-label="Project inquiry form"
              className="glass-strong rounded-3xl p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs tracking-widest text-muted">
                    NAME
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs tracking-widest text-muted">
                    EMAIL
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputCls}
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="project_type" className="mb-2 block text-xs tracking-widest text-muted">
                  PROJECT TYPE
                </label>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, project_type: t })}
                      data-cursor="hover"
                      className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                        form.project_type === t
                          ? 'border-accent/60 bg-accent/15 text-white'
                          : 'border-white/10 bg-white/[0.02] text-muted hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="mb-2 block text-xs tracking-widest text-muted">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputCls} resize-none`}
                  placeholder="What are you building? Timeline, goals, links — anything that helps."
                />
              </div>

              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  data-cursor="hover"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink-950 transition-all duration-300 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
                  {status === 'success' && <Check size={16} />}
                  {(status === 'idle' || status === 'error') && (
                    <>
                      Send inquiry
                      <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                  {status === 'loading' && 'Sending…'}
                  {status === 'success' && 'Sent'}
                </button>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-accent-cyan"
                    >
                      Thanks — I&apos;ll be in touch shortly.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-accent-orange"
                    >
                      Something went wrong. Please try again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}
