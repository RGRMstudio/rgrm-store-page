import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/raguiromo.studio', icon: '📷' },
    { name: 'Facebook', url: 'https://facebook.com/Raguiromo.Studio', icon: '📘' },
    { name: 'X/Twitter', url: 'https://x.com/raguiromostudio', icon: '🐦' },
    { name: 'TikTok', url: 'https://tiktok.com/@rgrmstudio', icon: '🎵' },
    { name: 'Pinterest', url: 'https://pinterest.com/raguiromostudio', icon: '📌' },
  ];

  return (
    <footer className="bg-black border-t border-white/10 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-white font-bold text-lg">RaGuiRoMo</h3>
          <p className="text-gray-500 text-sm">Industrial Art Machine</p>
          <p className="text-gray-600 text-xs mt-1">© 2026 All Rights Reserved</p>
        </div>

        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#BC2026] transition-colors text-base"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
