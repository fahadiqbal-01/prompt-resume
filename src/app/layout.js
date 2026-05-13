import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const title = "PromptResume | AI Resume Builder";
const description =
  "Create ATS-friendly resumes with AI suggestions, live preview, and one-click PDF export.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | PromptResume",
  },
  description,
  applicationName: "PromptResume",
  keywords: [
    "AI resume builder",
    "ATS resume",
    "resume generator",
    "resume PDF",
    "job application",
  ],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "PromptResume",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
