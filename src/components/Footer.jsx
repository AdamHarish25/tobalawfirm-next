// src/components/Footer.jsx (FINAL)
'use client';

import { useRouter } from "next/navigation";
import { Database } from "../Database/WholeData";
import Link from 'next/link';

const Footer = () => {
    const className = {
        container: "w-full p-10 grid grid-cols-1 place-items-start md:grid-cols-2 gap-5 md:place-items-center",
        innerBox: "h-full flex flex-col justify-start gap-6 text-white/60",
        title: "font-medium font-Playfair_Display text-white",
        paragraph: "text-white/80",
        listBox: "space-y-3 list-none",
        list: "hover:text-white hover:font-medium transform duration-200 cursor-pointer",
        socialListBox: "flex items-center gap-5",
        socialList: "block w-fit p-4 rounded-full bg-white/20 text-white hover:bg-yellow-500 transform duration-200 cursor-pointer"
    };

    const Data = Database.FooterData;
    const router = useRouter();

    return (
      <div className={className.container}>
        <div className={className.innerBox}>
          <h1 className={className.title}>{Data.contact.title}</h1>
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
          <h1 className={className.title}>{Data.links.title}</h1>
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
                <a href={item.link} target="_blank" rel="noopener noreferrer" className={className.socialList}>
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default Footer;