import React from 'react';
import { X, Shield, FileText, Mail, Info, ExternalLink } from 'lucide-react';

interface StaticModalProps {
  type: 'about' | 'contact' | 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const StaticModal: React.FC<StaticModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white text-base">
            {type === 'about' && <Info className="w-5 h-5 text-indigo-500" />}
            {type === 'contact' && <Mail className="w-5 h-5 text-indigo-500" />}
            {type === 'privacy' && <Shield className="w-5 h-5 text-indigo-500" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-indigo-500" />}
            <span className="capitalize">
              {type === 'about' ? 'About NEWUPDATE Desk' : type === 'privacy' ? 'Privacy Policy' : type === 'terms' ? 'Terms of Service' : 'Contact Editorial Desk'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {type === 'about' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">
                  NEWUPDATE: Next-Gen Autonomous AI Journalism
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Real-time intelligence, multi-domain digests, and verified AI reporting.
                </p>
              </div>
              <p>
                <strong>NEWUPDATE</strong> is a state-of-the-art digital news publication powered by advanced server-side Gemini 3.6 Flash artificial intelligence models with real-time Google Search grounding. Our mission is to research, synthesize, and deliver factual, original, and deeply contextual journalism 24/7 across 14 key global domains including Technology, AI, Cybersecurity, Business, Finance, Science, and World affairs.
              </p>
              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
                <div className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">Core Editorial Standards:</div>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li><strong>Live Grounding:</strong> Verifiable facts cross-referenced against real-time global news feeds.</li>
                  <li><strong>Original Synthesis:</strong> Multi-source news converted into concise, readable journalistic reports.</li>
                  <li><strong>Transparency & Disclosures:</strong> Full adherence to FTC affiliate guidelines and Google AdSense policies.</li>
                  <li><strong>Multi-Format Access:</strong> Integrated text summaries, interactive FAQs, and crystal-clear voice audio narration.</li>
                </ul>
              </div>
            </div>
          )}

          {type === 'contact' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Contact Editorial & Support</h3>
                <p className="text-xs text-slate-400 mt-1">Get in touch with the NEWUPDATE newsroom and press desk.</p>
              </div>
              <p>Have breaking news tips, correction requests, feedback, or sponsorship inquiries? Reach out to our dedicated desks:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Editorial & Newsroom:</span>
                  <a href="mailto:editor@newupdate.ai" className="text-indigo-500 hover:underline">editor@newupdate.ai</a>
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Advertising & Partnerships:</span>
                  <a href="mailto:ads@newupdate.ai" className="text-indigo-500 hover:underline">ads@newupdate.ai</a>
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Privacy & Legal Desks:</span>
                  <a href="mailto:privacy@newupdate.ai" className="text-indigo-500 hover:underline">privacy@newupdate.ai</a>
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Technical Support:</span>
                  <a href="mailto:tech@newupdate.ai" className="text-indigo-500 hover:underline">tech@newupdate.ai</a>
                </div>
              </div>
            </div>
          )}

          {type === 'privacy' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">NEWUPDATE Privacy Policy</h3>
                <p className="text-xs text-slate-400 mt-1">Last Updated: July 30, 2026</p>
              </div>

              <p>
                At <strong>NEWUPDATE</strong> ("we", "us", or "our"), respecting your privacy and protecting your personal information is fundamental to our operating standards. This Privacy Policy outlines how we collect, use, and safeguard information when you visit and interact with <strong>newupdate.ai</strong>.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  1. Information We Collect
                </h4>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>Voluntarily Provided Information:</strong> When you subscribe to our newsletter, post comments on articles, submit sponsored coverage applications, or contact our support team, we may collect your name, email address, and message content.
                  </li>
                  <li>
                    <strong>Automated Usage Data:</strong> As with most digital publications, our servers automatically collect non-identifying diagnostic information including browser type, operating system, device details, IP address, referring URLs, pages visited, and time spent on site.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  2. Cookies and Advertising (Google AdSense)
                </h4>
                <p>
                  NEWUPDATE uses standard web cookies and third-party advertising platforms, including <strong>Google AdSense</strong>, to display relevant advertisements to site visitors.
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    Third-party vendors, including Google, use cookies (such as the DoubleClick cookie) to serve ads based on your prior visits to NEWUPDATE or other websites on the Internet.
                  </li>
                  <li>
                    Google's use of advertising cookies enables it and its partners to serve personalized ads based on your browsing patterns across participating web domains.
                  </li>
                  <li>
                    <strong>Opting Out of Personalized Ads:</strong> You may opt out of personalized advertising by visiting Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline inline-flex items-center gap-0.5">Ad Settings <ExternalLink className="w-3 h-3" /></a> or by opting out of third-party vendor cookies via <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline inline-flex items-center gap-0.5">aboutads.info <ExternalLink className="w-3 h-3" /></a>.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  3. Amazon Affiliate Disclosure
                </h4>
                <p>
                  NEWUPDATE is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for websites to earn advertising fees by advertising and linking to Amazon.com.
                </p>
                <p className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl font-medium text-amber-900 dark:text-amber-200">
                  <em>As an Amazon Associate, I earn from qualifying purchases.</em> When you click on product links or recommended books on NEWUPDATE and make a purchase, we may receive a small affiliate commission at no extra cost to you.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  4. Data Security & Contact
                </h4>
                <p>
                  We employ industry-standard encryption protocols and secure storage measures to safeguard user subscriptions and comments against unauthorized access. We do not sell or rent personal email addresses to third-party data brokers.
                </p>
                <p>
                  For privacy questions, data requests, or consent preferences, please contact our Data Protection Officer at <a href="mailto:privacy@newupdate.ai" className="text-indigo-500 hover:underline">privacy@newupdate.ai</a>.
                </p>
              </div>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif">NEWUPDATE Terms of Service</h3>
                <p className="text-xs text-slate-400 mt-1">Last Updated: July 30, 2026</p>
              </div>

              <p>
                Welcome to <strong>NEWUPDATE</strong>. By accessing or using our website, web applications, or RSS feeds, you agree to comply with and be bound by the following Terms of Service. Please review them carefully.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  1. AI-Generated & Assisted Content Disclaimer
                </h4>
                <p>
                  Articles, digests, summaries, audio narrations, and FAQs on NEWUPDATE are synthesized using autonomous artificial intelligence systems combined with real-time news indexing.
                </p>
                <p>
                  While we endeavor to verify information through reputable search sources, AI models may occasionally produce inadvertent inaccuracies, outdated facts, or interpretation errors. All published material is provided solely for general informational and educational purposes.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  2. No Professional Advice & Limitation of Liability
                </h4>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>Not Financial or Legal Advice:</strong> Coverage concerning finance, cryptocurrency, stocks, legal policy, health, or technology does NOT constitute financial, legal, medical, or investment advice.
                  </li>
                  <li>
                    <strong>User Responsibility:</strong> Readers are solely responsible for independently verifying information before making financial, operational, health, or career decisions.
                  </li>
                  <li>
                    <strong>Liability Cap:</strong> To the fullest extent permitted by law, NEWUPDATE, its creators, and affiliates shall not be liable for any direct, indirect, incidental, or consequential damages resulting from reliance on any content published on our platform.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  3. External & Affiliate Links
                </h4>
                <p>
                  NEWUPDATE contains links to third-party sites, original news sources, sponsored marketplace tools, and affiliate merchants (including Amazon.com). We do not control or assume responsibility for the content, privacy practices, or availability of external third-party services.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  4. Intellectual Property & Acceptable Use
                </h4>
                <p>
                  All custom logos, site graphics, software design, and synthesized text on NEWUPDATE are protected by international copyright laws. Automated scraping or bulk commercial re-publishing without express written permission is strictly prohibited.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  5. Contact Information
                </h4>
                <p>
                  Questions regarding these Terms of Service should be directed to our legal team at <a href="mailto:legal@newupdate.ai" className="text-indigo-500 hover:underline">legal@newupdate.ai</a> or <a href="mailto:editor@newupdate.ai" className="text-indigo-500 hover:underline">editor@newupdate.ai</a>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

