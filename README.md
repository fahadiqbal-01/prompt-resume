# Prompt Resume

A minimal, AI-assisted resume builder for modern professionals.

Prompt Resume transforms raw career data into polished, ATS-optimized, and beautifully formatted A4 PDFs. It leverages AI to handle the tedious aspects of resume writing—grammar, keyword optimization, and professional phrasing—while keeping you in complete control of the final output.

## Features

- **AI-Powered Optimization**: Paste your raw experience; get back high-impact, quantified bullet points and professional summaries tailored to your target role.
- **ATS Keyword Matching**: The AI analyzes your target role and suggests missing skills or keywords to improve your resume's strength score.
- **True A4 PDF Export**: Built with `@react-pdf/renderer` for flawless, pixel-perfect A4 printing. No weird browser styling quirks or screenshot artifacts—just clean, selectable text.
- **Smart Layouts**: Clean, single-column design engineered for maximum readability and ATS parsing.
- **Interactive Analysis Panel**: View your resume's strength score and click to add AI-suggested missing skills directly into your document.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **PDF Generation**: [@react-pdf/renderer](https://react-pdf.org/)
- **AI Integration**: OpenRouter (Google Gemini 2.0 Flash)

## Getting Started

### Prerequisites

Ensure you have Node.js installed. You will also need an API key from [OpenRouter](https://openrouter.ai/).

### Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/yourusername/prompt-resume.git](https://github.com/yourusername/prompt-resume.git)
    cd prompt-resume
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Set up your environment variables:
    Create a `.env.local` file in the root directory and add your OpenRouter API key:

    ```env
    OPENROUTER_API_KEY=your_api_key_here
    ```

4.  Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## How it Works

1.  **Input**: Fill out the multi-step form with your basic details, raw experience, education, and skills.
2.  **Generate**: Hit "Generate with AI." The app sends your data to the AI model, which rewrites your content for impact and ATS compatibility.
3.  **Review & Refine**: Check the AI analysis panel. Add suggested skills with a click, and review your polished resume in the live preview.
4.  **Export**: Download a clean, perfectly scaled A4 PDF ready for your next application.

## License

[MIT](LICENSE)

---

_Built by Fahad Iqbal._
