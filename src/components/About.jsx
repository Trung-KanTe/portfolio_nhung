import { personalInfo } from '../data/portfolioData'
import { WaterfallContainer, WaterfallItem, SectionEyebrow } from './WaterfallReveal'
import WordReveal from './WordReveal'

const PILLARS = [
  {
    label: 'Công việc của tôi',
    body:
      'Quản lý văn phòng, hỗ trợ tuyển dụng và onboard nhân sự mới, soạn thảo hợp đồng, xử lý các công việc hành chính - pháp lý hàng ngày trong doanh nghiệp.',
  },
  {
    label: 'Cách tôi làm việc',
    body:
      'Tỉ mỉ, cẩn thận, và chủ động. Tôi luôn đảm bảo mọi quy trình được thực hiện đúng quy định pháp luật và chính sách công ty, đồng thời tối ưu hiệu quả công việc.',
  },
  {
    label: 'Mục tiêu phát triển',
    body:
      'Phát triển chuyên sâu trong lĩnh vực HR & Admin tại doanh nghiệp, kết hợp nền tảng pháp lý để hỗ trợ tuân thủ quy định và xây dựng văn hóa doanh nghiệp.',
  },
]

const ABOUT_PARAGRAPH =
  "Tôi bắt đầu sự nghiệp từ vị trí thực tập sinh hành chính - pháp lý tại AXYS và phòng Hành chính Nhân sự tại Mắt Bão. Với nền tảng Luật Kinh Tế từ Đại học Kinh Tế - Tài Chính TP.HCM, tôi có khả năng kết hợp kiến thức pháp lý vào công việc hành chính nhân sự — từ soạn thảo hợp đồng, quản lý văn phòng đến hỗ trợ tuyển dụng và tổ chức sự kiện nội bộ."

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <WaterfallContainer
          className="grid md:grid-cols-[1.4fr_1fr] items-end gap-8 mb-12"
          amount={0.3}
        >
          <WaterfallItem>
            <SectionEyebrow index={1} label="About Me" />
            <h2 className="section-title text-slate-100">
              Tận tâm vì <span className="gradient-text-shine bg-clip-text text-transparent">doanh nghiệp</span>.
            </h2>
            <WordReveal
              text={ABOUT_PARAGRAPH}
              className="text-slate-400 max-w-2xl leading-relaxed mt-4"
            />
          </WaterfallItem>

          <WaterfallItem>
            <div className="text-sm text-slate-400 space-y-1.5 md:text-right">
              <p>
                <span className="text-slate-300 font-medium">Name </span>
                <span className="font-mono text-slate-200">{personalInfo.name}</span>
              </p>
              <p>
                <span className="text-slate-300 font-medium">Location </span>
                <span className="font-mono text-slate-200">{personalInfo.address}</span>
              </p>
              <p>
                <span className="text-slate-300 font-medium">Email </span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="font-mono text-accent-violet hover:text-accent-fuchsia transition-colors"
                >
                  {personalInfo.email}
                </a>
              </p>
            </div>
          </WaterfallItem>
        </WaterfallContainer>

        <WaterfallContainer
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          amount={0.15}
          staggerChildren={0.1}
        >
          {PILLARS.map((p, i) => (
            <WaterfallItem
              key={p.label}
              className={`glass-card-hover p-6 ${
                i === 1 ? 'lg:translate-y-6' : ''
              } ${i === 2 ? 'lg:translate-y-12' : ''}`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-100">{p.label}</h3>
                <span className="font-mono text-[10px] text-accent-violet/70 tracking-wider">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{p.body}</p>
            </WaterfallItem>
          ))}
        </WaterfallContainer>
      </div>
    </section>
  )
}
