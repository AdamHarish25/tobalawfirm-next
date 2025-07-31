// src/app/team/page.tsx (FINAL DENGAN LAYOUT KONSISTEN)
'use client';

import { FaChevronRight } from "react-icons/fa";
import { Database } from "@/Database/WholeData";
import { useRouter } from "next/navigation";
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from "@/components/Navbar";

const Datas = Database.TeamData;

const TeamPage_1 = () => (
    <div className="w-full py-20 bg-dark-gray text-center text-white">
        <h1 className="text-3xl md:text-5xl font-Playfair_Display font-medium">{Datas.page_1.title}</h1>
    </div>
);

const TeamPage_2 = () => {
    const router = useRouter();
    const Data = Datas.page_2;
    return (
        <div className="w-full md:container mx-auto px-4 lg:px-8 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row justify-around items-center gap-10 lg:gap-16">
                <div className="space-y-8 flex flex-col items-center lg:items-start text-white order-2 lg:order-1 max-w-2xl">
                    <h1 className="text-3xl lg:text-4xl font-Playfair_Display font-bold text-center lg:text-left">{Data.title}</h1>
                    <p className="text-white/60 whitespace-pre-line text-center lg:text-justify">{Data.subtitle}</p>
                    <button onClick={() => router.push(Data.button.link)} className="flex items-center text-sm gap-5 bg-yellow-500 text-black rounded-sm py-3 px-6">
                        <p>{Data.button.title}</p> <FaChevronRight />
                    </button>
                </div>
                <Image src={Data.img} alt="Tim Toba Lawfirm" sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw" width={500} height={500} className="grayscale h-auto w-full max-w-md lg:max-w-fit lg:h-[500px] rounded-lg order-1 lg:order-2" />
            </div>
        </div>
    );
};

const TeamPage_3 = () => (
    <div className="w-full bg-dark-gray py-16 lg:py-24">
        <div className="md:container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 place-items-start">
            {Datas.page_3.map((data, idx) => (
                <div key={idx} className="w-full flex flex-col items-center gap-5 p-5">
                    <Image className="w-60 h-60 rounded-full object-cover object-top" alt={data.name} src={data.img} width={240} height={240} />
                    <div className="space-y-4 text-center text-white">
                        <h1 className="text-2xl md:text-3xl font-semibold font-Playfair_Display">{data.name}</h1>
                        <h4 className="text-lg font-Poppins font-medium text-yellow-500">{data.role}</h4>
                        <ul className="flex items-center justify-center gap-5 list-none">
                            {data.socials.map((social, idx2) => (
                                <li key={idx2}>
                                    <a href={social.link} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-white/70 hover:text-white">
                                        {social.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default function TeamPage() {
    return (
        <div className="w-full font-Roboto text-white bg-dark-white pt-24">
            <Head>
                <title>Tim Kami - Toba Lawfirm</title>
                <meta name="description" content="Lawfirm yang baik memiliki tim yang solid, berpengalaman, dan profesional. Pelajari lebih lanjut tentang tim kami di Toba Lawfirm." />
            </Head>
            <Navbar />
            <TeamPage_1 />
            <TeamPage_2 />
            <TeamPage_3 />
        </div>
    );
}