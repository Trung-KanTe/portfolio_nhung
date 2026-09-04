import { useState } from 'react'
import { personalInfo } from '../data/portfolioData'
import { FaPhoneAlt } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { WaterfallContainer, WaterfallItem, SectionEyebrow } from './WaterfallReveal'

const FORM_ENDPOINT = ''

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:outline-none'

const inputStyle = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border-soft)',
}

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name')?.toString().trim() ?? ''
    const email = data.get('email')?.toString().trim() ?? ''
    const message = data.get('message')?.toString().trim() ?? ''

    if (!name || !email || !message) {
      setStatus('error')
      setErrorMsg('Please fill in all fields.')
      return
    }

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio contact from ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
      setStatus('success')
      form.reset()
      return
    }

    try {
      setStatus('sending')
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg('Could not send the message. Please email me directly instead.')
    }
  }

  return (
    <section id="contact" className="section-padding pb-32">
      <div className="max-w-5xl mx-auto">
        <WaterfallContainer className="mb-12 max-w-2xl" amount={0.4}>
          <WaterfallItem>
            <SectionEyebrow index={6} label="Let's Talk" />
            <h2 className="section-title text-slate-100">
              Hãy kết nối{' '}
              <span className="gradient-text-shine bg-clip-text text-transparent">
                với tôi.
              </span>
            </h2>
            <p className="text-slate-400 leading-relaxed mt-4">
              Sẵn sàng cho các vị trí Pháp chế - Hành chính - Nhân sự tại doanh nghiệp.
              Tôi thường phản hồi trong vòng 24 giờ.
            </p>
          </WaterfallItem>
        </WaterfallContainer>

        <WaterfallContainer
          className="grid md:grid-cols-[1fr_1.2fr] gap-5"
          amount={0.15}
          staggerChildren={0.1}
        >
          <WaterfallItem className="glass-card-hover p-7">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-5">
              Direct channels
            </p>
            <div className="space-y-4 text-sm">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-slate-200 hover:text-white transition-colors group"
              >
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(219,39,119,0.2), rgba(244,63,94,0.18))',
                    border: '1px solid var(--border-soft)',
                    color: 'var(--aurora-1)',
                  }}
                >
                  <HiOutlineMail className="w-4 h-4" />
                </span>
                <span className="font-mono text-xs">{personalInfo.email}</span>
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-3 text-slate-200 hover:text-white transition-colors group"
              >
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(219,39,119,0.2), rgba(244,63,94,0.18))',
                    border: '1px solid var(--border-soft)',
                    color: 'var(--aurora-1)',
                  }}
                >
                  <FaPhoneAlt className="w-3.5 h-3.5" />
                </span>
                <span className="font-mono text-xs">{personalInfo.phone}</span>
              </a>
            </div>

            <div
              className="mt-7 pt-5 text-xs text-slate-400 leading-relaxed"
              style={{ borderTop: '1px solid var(--border-soft)' }}
            >
              <p>
                Based in <span className="text-slate-200">{personalInfo.address}</span>.
                Available for hybrid or remote roles across Vietnam.
              </p>
            </div>
          </WaterfallItem>

          <WaterfallItem className="glass-card-hover p-7">
            <form onSubmit={handleSubmit} className="space-y-4 text-sm" noValidate>
              <div>
                <label htmlFor="contact-name" className="block text-xs text-slate-400 mb-1.5 font-medium">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={inputClass}
                  style={inputStyle}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs text-slate-400 mb-1.5 font-medium">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                  style={inputStyle}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs text-slate-400 mb-1.5 font-medium">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                  placeholder="Tell me briefly about your project or question"
                />
              </div>

              {status === 'success' && (
                <p className="text-xs text-emerald-400">
                  {FORM_ENDPOINT
                    ? 'Thanks — your message is on its way.'
                    : 'Opening your email client…'}
                </p>
              )}
              {status === 'error' && (
                <p className="text-xs text-rose-400">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </WaterfallItem>
        </WaterfallContainer>
      </div>
    </section>
  )
}
