# 🎓 AI/ML Graduate Programs Guide - Fall 2026-2027

A comprehensive, interactive web application to explore and compare AI/ML graduate programs worldwide for the 2026-2027 admission cycle. Designed specifically for Thai students, featuring detailed information on 15+ top universities across 8 countries.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🔍 University Explorer

- **Smart Filtering**: Filter by country, priority level, funding type, and more
- **Advanced Search**: Search across universities, programs, and research areas
- **Detailed Cards**: Expandable university cards with comprehensive information including:
  - Programs offered (PhD, MS, MPhil, MEng)
  - Research areas and labs
  - Application deadlines
  - Tuition and living costs
  - Visa information and duration
  - Scholarships and funding opportunities
  - English test requirements
  - Key documents needed

### 📅 Deadline Timeline

- **Visual Timeline**: See all application deadlines organized by month
- **Priority Triage System**: Universities grouped by urgency (Nov-Dec, Jan-Feb, Mar+)
- **Quick Overview**: See high-priority programs at a glance
- **Strategic Planning**: Plan your application schedule effectively

### 🌍 Country Comparison

- **Side-by-Side Comparison**: Compare visa policies, job markets, and strategic advantages
- **Detailed Analysis**: In-depth information for each country including:
  - Post-study work visa programs
  - Visa duration
  - Job market outlook
  - Strategic verdicts for Thai students
- **Key Insights**: Curated recommendations on best countries for work, value, and prestige

### 📊 Statistics Dashboard

- Real-time stats showing:
  - Total universities
  - High-priority programs
  - Fully-funded opportunities
  - Number of countries
  - Urgent deadlines (Nov-Dec)

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nacnano/study-abroad.git
   cd study-abroad
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Run the development server**

   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
study-abroad/
├── app/
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Main university listing page
│   ├── country-comparison/        # Country comparison page
│   └── globals.css                # Global styles
├── components/
│   ├── UniversityCard.tsx         # University detail card
│   ├── FilterPanel.tsx            # Filter and search sidebar
│   ├── StatsOverview.tsx          # Statistics dashboard
│   ├── DeadlineTimeline.tsx       # Timeline visualization
│   └── Navigation.tsx             # Top navigation bar
├── data/
│   └── universities.ts            # University and country data
├── types/
│   └── university.ts              # TypeScript interfaces
└── public/                        # Static assets
```

## 🎨 Customization

### Adding More Universities

Edit `data/universities.ts` to add more universities:

```typescript
{
  id: 'unique-id',
  name: 'University Name',
  country: 'Country',
  programs: ['PhD (CS)', 'MS (AI)'],
  researchAreas: ['Machine Learning', 'NLP'],
  applicationDeadline: 'Dec 15, 2025',
  priority: 'High',
  tuitionPerYear: '$50,000 USD',
  livingCostPerYear: '$20,000 USD',
  greRequired: 'No',
  toeflIeltsMin: '100 / 7.0',
  keyDocuments: ['SOP', '3 LORs', 'Transcripts'],
  scholarships: 'Fully funded PhD',
  notes: 'Additional notes',
  visaType: 'F-1 STEM OPT',
  visaDuration: '3 years',
  fundingType: 'Fully Funded',
  programType: 'Mixed'
}
```

## 🎯 Key Information Included

### Universities Covered

- **USA**: MIT, Stanford, CMU, UC Berkeley, University of Washington
- **Canada**: University of Toronto, University of Waterloo
- **UK**: Cambridge, Oxford
- **Switzerland**: ETH Zurich, EPFL
- **Germany**: Technical University of Munich
- **Singapore**: National University of Singapore
- **South Korea**: KAIST
- **Australia**: University of Melbourne

### Information Types

- Application deadlines (Fall 2026 intake)
- Program types (PhD, MS, MPhil, MEng)
- Research areas and labs
- Tuition fees
- Living costs
- Post-study work visas
- Scholarship opportunities
- English language requirements
- GRE requirements
- Strategic analysis for Thai students

## 🛠️ Technologies Used

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Package Manager**: [Bun](https://bun.sh)
- **Deployment**: Ready for [Vercel](https://vercel.com)

## ⚠️ Disclaimer

This application provides general information for educational purposes. Always verify:

- Current application deadlines on university websites
- Visa requirements with official government sources
- Scholarship availability and eligibility
- Tuition and costs (subject to change)

Application requirements and deadlines may change without notice.

---

**Made with ❤️ for Thai students pursuing AI/ML graduate studies**
