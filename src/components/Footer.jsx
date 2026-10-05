// src/components/Footer.jsx (PHASE 2 - 4 kolom + copyright bar)
import { Database } from "../Database/WholeData";
import { FaClock } from "react-icons/fa";
import Link from 'next/link';

const Footer = () => {
    const className = {
        container: "w-full px-10 pt-10 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10",
        innerBox: "h-full flex flex-col justify-start gap-6 text-white/60",
        title: "font-medium font-Playfair_Display text-white",
        paragraph: "text-white/80",
        listBox: "space-y-3 list-none",
        list: "hover:text-white hover:font-medium transform duration-200 cursor-pointer",
        socialListBox: "flex items-center gap-5",
        socialList: "block w-fit p-4 rounded-full bg-white/20 text-white hover:bg-gold hover:text-black transform duration-200 cursor-pointer"
    };

    const Data = Database.FooterData;

    return (
      <footer className="w-full bg-dark-white border-t border-white/10">
        <div className={className.container}>
          <div className={className.innerBox}>
            <h2 className={className.title}>{Data.contact.title}</h2>
            <p className={className.paragraph}>{Data.contact.address}</p>
            <ul className={className.listBox}>
              {Data.contact.list.map((item, idx) => (
                <li key={idx}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className={className.list}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={className.innerBox}>
            <h2 className={className.title}>{Data.links.title}</h2>
            <ul className={className.listBox}>
              {Data.links.list.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.link} className={className.list}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className={className.socialListBox}>
              {Data.links.socialList.map((item, idx) => (
                <li key={idx}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" aria-label={`Toba Lawfirm di media sosial ${idx + 1}`} className={className.socialList}>
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={className.innerBox}>
            <h2 className={className.title}>{Data.hours.title}</h2>
            <ul className={className.listBox}>
              {Data.hours.list.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <FaClock className="mt-1 shrink-0 text-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={className.innerBox}>
            <h2 className={className.title}>Konsultasi Gratis</h2>
            <p className={className.paragraph}>Ceritakan kebutuhan hukum Anda. Kami respon di jam kerja, tanpa biaya awal.</p>
            <div className="flex flex-col gap-3">
              <a href="https://wa.me/6281118414832?text=Halo%2C%20saya%20ingin%20konsultasi%20gratis." target="_blank" rel="noopener noreferrer" className="inline-block text-center bg-gold text-black font-semibold text-sm py-3 px-6 rounded hover:bg-gold-soft transition-colors">
                Chat WhatsApp
              </a>
              <a href="tel:+6281118414832" className="inline-block text-center border border-white/30 text-white text-sm py-3 px-6 rounded hover:bg-white hover:text-black transition-colors">
                +62 811-1841-4832
              </a>
            </div>
          </div>
        </div>

        <div className="w-full px-10 py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>{Data.bottom.copyright}</p>
          <ul className="flex items-center gap-5 list-none">
            {Data.bottom.list.map((item, idx) => (
              <li key={idx}>
                <Link href={item.link} className="hover:text-white transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    );
}

export default Footer;
