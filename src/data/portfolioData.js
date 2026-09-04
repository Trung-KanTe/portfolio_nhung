import { FaGraduationCap, FaBalanceScale, FaFileContract, FaUsers, FaBook } from 'react-icons/fa'
import {
  HiOutlineBriefcase,
  HiOutlineDocumentText,
  HiOutlineClipboardDocumentList,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineGlobeAlt,
} from 'react-icons/hi2'
import { BsGearFill, BsLightningChargeFill, BsPeopleFill } from 'react-icons/bs'

export const personalInfo = {
  name: 'Vũ Thị Hồng Nhung',
  title: 'Nhân Viên Hành Chính - Nhân Sự',
  phone: '0975142173',
  email: 'hongnhungvu711@gmail.com',
  address: 'Quận 12, Thành phố Hồ Chí Minh',
  linkedin: '',
  avatarUrl: '/avatar.jpg',
  cvUrl: '/CV_VuThiHongNhung.pdf',
  typingTexts: [
    'HR Admin Officer',
    'Nhân Viên Hành Chính',
    'Legal & Compliance',
    'Office Management',
  ],
  objective:
    'Định hướng phát triển sự nghiệp trong lĩnh vực Pháp chế doanh nghiệp, tận dụng nền tảng pháp luật, kiến thức chuyên sâu đang được đào tạo và kinh nghiệm Hành chính – Nhân sự để từng bước phát triển chuyên môn về hợp đồng, tuân thủ pháp luật và quản trị nội bộ doanh nghiệp.',
}

export const stats = [
  { value: '3+', label: 'Bài nghiên cứu' },
  { value: '2', label: 'Công ty thực tập' },
  { value: 'B2', label: 'VSTEP English' },
  { value: 'UEF', label: 'Luật Kinh Tế' },
]

export const experiences = [
  {
    company: 'CÔNG TY CỔ PHẦN MẮT BÃO',
    location: 'TP. Hồ Chí Minh',
    role: 'Admin Officer',
    period: '08/2025 — Hiện tại',
    type: 'current',
    projects: [
      {
        name: 'Quản lý Văn phòng & Hành chính',
        details: [
          'Mua sắm và quản lý tài sản, thiết bị; theo dõi vật phẩm dùng chung; liên hệ và làm việc với nhà cung cấp.',
          'Quản lý văn phòng phẩm, thư từ và công văn đến - đi.',
          'Kiểm tra hóa đơn, tạo đề nghị mua hàng (PO); kiểm soát chi phí hành chính và pantry.',
          'Sắp xếp vé máy bay, khách sạn cho công tác theo đúng quy định công ty.',
          'Đối soát và xử lý thư từ, chứng từ hành chính hàng ngày.',
        ],
      },
      {
        name: 'Hỗ trợ Nhân sự & Tuyển dụng',
        details: [
          'Hỗ trợ tuyển dụng nội bộ và onboard nhân sự mới.',
          'Quản lý thẻ Grab, Xanh SM cho nhân sự.',
          'Tổ chức sinh nhật, thăm hỏi ốm đau và các hoạt động chăm lo nhân viên.',
          'Truyền thông nội bộ và tổ chức sự kiện cho công ty.',
        ],
      },
    ],
    techStack: ['Microsoft Office', 'Quản lý văn phòng', 'Hành chính', 'Tuyển dụng', 'Onboard'],
  },
  {
    company: 'CÔNG TY CỔ PHẦN MẮT BÃO',
    location: 'TP. Hồ Chí Minh',
    role: 'Thực tập sinh — Phòng Hành chính Nhân sự',
    period: '06/2025 — 07/2025',
    type: 'past',
    projects: [
      {
        name: 'Hỗ trợ phòng ban Hành chính - Nhân sự',
        details: [
          'Hỗ trợ xây dựng và chuẩn hóa quy trình cho phòng ban.',
          'Hỗ trợ xử lý công việc hành chính văn phòng: đối soát thư từ, hợp đồng dịch vụ nhận hàng ngày.',
        ],
      },
    ],
    techStack: ['Hành chính', 'Văn phòng', 'Quy trình'],
  },
  {
    company: 'CÔNG TY CỔ PHẦN AXYS',
    location: 'TP. Hồ Chí Minh',
    role: 'Thực tập sinh — Vị trí Hành chính - Pháp lý',
    period: '04/2025 — 06/2025',
    type: 'past',
    projects: [
      {
        name: 'Thực tập sinh Hành chính - Pháp lý',
        details: [
          'Hỗ trợ soạn thảo hợp đồng, tập trung vào hợp đồng thuê văn phòng.',
          'Hỗ trợ xây dựng quy trình làm việc cho phòng ban.',
          'Đối soát thư từ, hợp đồng dịch vụ và xử lý công việc hành chính văn phòng hàng ngày.',
        ],
      },
    ],
    techStack: ['Pháp lý', 'Hợp đồng', 'Hành chính', 'Văn phòng'],
  },
]

export const projects = [
  {
    title: 'Pháp luật và Điều kiện nhập khẩu và kinh doanh sinh vật ngoại lai',
    subtitle: 'Đồng tác giả — NXB Đại học Quốc Gia TP.HCM',
    description:
      'Nghiên cứu về khung pháp lý điều chỉnh hoạt động nhập khẩu và kinh doanh sinh vật ngoại lai tại Việt Nam. Phân tích các quy định hiện hành và đề xuất giải pháp hoàn thiện.',
    tags: ['Luật Môi trường', 'Sinh vật ngoại lai', 'Pháp luật Việt Nam'],
    color: 'from-emerald-500 to-teal-600',
    icon: '📚',
  },
  {
    title: 'Kinh nghiệm Thái Lan và quản lý sinh vật ngoại lai',
    subtitle: 'Đồng tác giả — Tạp chí Luật sử Việt Nam',
    description:
      'Bài viết nghiên cứu kinh nghiệm quốc tế của Thái Lan trong quản lý sinh vật ngoại lai, từ đó gợi mở các giải pháp phù hợp cho Việt Nam.',
    tags: ['Luật So sánh', 'Thái Lan', 'Quản lý sinh vật'],
    color: 'from-blue-500 to-indigo-600',
    icon: '🌏',
  },
  {
    title: 'Cơ chế trách nhiệm mở rộng của nhà sản xuất trong quản lý chất thải điện tử',
    subtitle: 'Hội thảo Quốc Gia Luật, Công lý và Phát triển lần II — 2026',
    description:
      'Nghiên cứu kinh nghiệm quốc tế về cơ chế trách nhiệm mở rộng của nhà sản xuất (EPR) trong quản lý chất thải điện tử, trong mối liên hệ với hoạt động kinh tế tuần hoàn.',
    tags: ['Kinh tế tuần hoàn', 'EPR', 'Chất thải điện tử', 'Luật Quốc tế'],
    color: 'from-violet-500 to-purple-600',
    icon: '♻️',
  },
]

export const skillCategories = [
  {
    title: 'Hành chính & Văn phòng',
    icon: HiOutlineBriefcase,
    skills: [
      { name: 'Quản lý văn phòng' },
      { name: 'Soạn thảo văn bản' },
      { name: 'Quản lý hồ sơ' },
      { name: 'Tiếp nhận & xử lý công văn' },
      { name: 'Quản lý tài sản' },
      { name: 'Đặt vé & khách sạn công tác' },
      { name: 'Kiểm soát chi phí' },
      { name: 'Quản lý nhà cung cấp' },
    ],
  },
  {
    title: 'Nhân sự & Tuyển dụng',
    icon: BsPeopleFill,
    skills: [
      { name: 'Tuyển dụng' },
      { name: 'Onboard nhân sự mới' },
      { name: 'Quản lý hợp đồng lao động' },
      { name: 'Chấm công & bảng lương' },
      { name: 'Phúc lợi nhân viên' },
      { name: 'Truyền thông nội bộ' },
      { name: 'Tổ chức sự kiện' },
      { name: 'Quản lý BHXH, BHYT' },
    ],
  },
  {
    title: 'Pháp lý & Hợp đồng',
    icon: HiOutlineDocumentText,
    skills: [
      { name: 'Soạn thảo hợp đồng' },
      { name: 'Rà soát pháp lý' },
      { name: 'Luật Lao động' },
      { name: 'Luật Doanh nghiệp' },
      { name: 'Luật Thương mại' },
      { name: 'Tuân thủ pháp luật' },
      { name: 'Hồ sơ pháp lý doanh nghiệp' },
    ],
  },
  {
    title: 'Tin học & Công cụ',
    icon: BsGearFill,
    skills: [
      { name: 'Microsoft Word' },
      { name: 'Microsoft Excel' },
      { name: 'Microsoft PowerPoint' },
      { name: 'Google Workspace' },
      { name: 'Email chuyên nghiệp' },
      { name: 'Phần mềm quản lý nhân sự' },
      { name: 'Canva' },
    ],
  },
  {
    title: 'Nghiên cứu & Xuất bản',
    icon: HiOutlineAcademicCap,
    skills: [
      { name: 'Nghiên cứu khoa học' },
      { name: 'Viết bài báo học thuật' },
      { name: 'Phân tích pháp luật so sánh' },
      { name: 'Luật Môi trường' },
      { name: 'Kinh tế tuần hoàn' },
      { name: 'Trình bày tại hội thảo' },
    ],
  },
  {
    title: 'Kỹ năng mềm',
    icon: BsLightningChargeFill,
    skills: [
      { name: 'Giao tiếp' },
      { name: 'Làm việc nhóm' },
      { name: 'Quản lý thời gian' },
      { name: 'Tỉ mỉ, cẩn thận' },
      { name: 'Giải quyết vấn đề' },
      { name: 'Đa nhiệm' },
      { name: 'Tiếng Anh — B2 (VSTEP)' },
      { name: 'Thái độ tích cực' },
    ],
  },
]

export const awards = [
  {
    name: 'Đồng tác giả sách — NXB Đại học Quốc Gia TP.HCM',
    date: '2025',
    detail: '"Pháp luật và Điều kiện nhập khẩu và kinh doanh sinh vật ngoại lai"',
  },
  {
    name: 'Đồng tác giả — Tạp chí Luật sử Việt Nam',
    date: '2025',
    detail: '"Kinh nghiệm Thái Lan và quản lý sinh vật ngoại lai và gợi mở cho Việt Nam"',
  },
  {
    name: 'Đồng tác giả — Hội thảo Quốc Gia Luật, Công lý và Phát triển lần II',
    date: '2026',
    detail: '"Kinh nghiệm quốc tế và cơ chế trách nhiệm mở rộng của nhà sản xuất trong quản lý chất thải điện tử trong mối liên hệ với hoạt động kinh tế tuần hoàn"',
  },
]

export const education = {
  degree: 'Cử nhân Luật Kinh Tế',
  school: 'Đại học Kinh Tế - Tài Chính TP. Hồ Chí Minh (UEF)',
  period: '2021 — 2025',
  gpa: '',
  honor: 'Chuyên ngành: Luật Tài Chính - Ngân Hàng',
}

export const certification = {
  name: 'VSTEP — Level B2',
  date: '2024 — 2026',
  score: 'Chứng chỉ tiếng Anh VSTEP',
}

export const courses = [
  {
    name: 'Chứng chỉ tin học văn phòng cơ bản',
    issuer: 'Vstep',
    date: '2024',
    duration: '',
    certificateId: '',
    description: 'Chứng chỉ tin học văn phòng cơ bản 2024.',
  },
  {
    name: 'Chứng chỉ tin học văn phòng nâng cao',
    issuer: 'Vstep',
    date: '2024',
    duration: '',
    certificateId: '',
    description: 'Chứng chỉ tin học văn phòng nâng cao 2024. Đang theo học chương trình thạc sĩ luật kinh tế.',
  },
]
