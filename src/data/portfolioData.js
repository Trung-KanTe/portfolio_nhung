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
    'Nhân viên Hành chính - Nhân sự với nền tảng Luật Kinh Tế và kinh nghiệm thực tế tại các doanh nghiệp lớn như Mắt Bão và AXYS. Có khả năng quản lý văn phòng, hỗ trợ tuyển dụng, soạn thảo hợp đồng, và xử lý các công việc hành chính - pháp lý. Đồng tác giả nhiều bài nghiên cứu khoa học được xuất bản. Mong muốn phát triển sự nghiệp trong lĩnh vực nhân sự và hành chính doanh nghiệp.',
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
          'Mua sắm và quản lý tài sản, thiết bị; theo dõi vật phẩm dùng chung. Liên hệ, làm việc với nhà cung cấp.',
          'Quản lý văn phòng phẩm, thư từ — công văn.',
          'Kiểm tra hóa đơn, tạo PO; kiểm soát chi phí hành chính & pantry.',
          'Sắp xếp về máy bay, khách sạn công tác theo quy định.',
          'Phụ trách hiệu quả, gửi đến hàng ngày.',
        ],
      },
      {
        name: 'Hỗ trợ Nhân sự & Tuyển dụng',
        details: [
          'Hỗ trợ soạn thảo hợp đồng liên quan đến cho thuê văn phòng.',
          'Hệ thống hỗ trợ dịch vụ gửi đến hàng ngày.',
          'Hỗ trợ các công việc hành chính chính văn phòng đối soát thư từ, hợp đồng.',
          'Quản lý thẻ Grab, xanh SM của nhân sự.',
          'Sinh nhật, thăm hỏi đau ốm nhân viên.',
          'Tuyển dụng nội bộ. Onboard nhân sự mới. Truyền thông, sự kiện nội bộ.',
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
          'Hỗ trợ tạo quy trình cho phòng ban.',
          'Hỗ trợ trả các công việc hành chính chính văn phòng đối soát thư từ, hợp đồng dịch vụ gửi đến hàng ngày.',
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
        name: 'Thực tập sinh vị trí hành chính - pháp lý công ty',
        details: [
          'Hỗ trợ soạn thảo hợp đồng liên quan đến cho thuê văn phòng.',
          'Hỗ trợ tạo quy trình cho phòng ban.',
          'Hỗ trợ trả các công việc hành chính chính văn phòng đối soát thư từ, hợp đồng dịch vụ gửi đến hàng ngày.',
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
