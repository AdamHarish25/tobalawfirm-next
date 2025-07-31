// src/app/about/page.tsx (FINAL DENGAN LAYOUT KONSISTEN)
'use client';

import { useRouter } from "next/navigation";
import { Database } from "@/Database/WholeData";
import { FaChevronRight, FaStar, FaCompass } from "react-icons/fa";
import Accordion from "@/components/Accordion/Accordion";
import React from 'react';
import Head from 'next/head';
import Navbar from "@/components/Navbar";

const Datas = Database.AboutData;

const AccordionChild = ({ children, header, icon }: { children: React.ReactNode, header: string, icon: React.ReactNode }) => (
    <>{children}</>
);

const AboutPage_1 = () => (
    <div className="w-full pt-48 pb-16 bg-dark-gray text-center text-white">
        <h1 className="text-3xl md:text-5xl font-medium font-Playfair_Display">{Datas.page_1.title}</h1>
    </div>
);

const AboutPage_2 = () => {
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
                <img src={Data.img} alt="Tentang Toba Lawfirm" className="grayscale h-auto w-full max-w-md lg:max-w-fit lg:h-[500px] rounded-lg order-1 lg:order-2" />
            </div>
        </div>
    );
};

const AboutPage_3 = () => (
    <div className="w-full bg-dark-gray py-16 lg:py-24">
        <div className="md:container mx-auto px-4 lg:px-8 space-y-10 text-white">
            <Accordion>
                {Datas.page_3.map((data, index) => (
                    <AccordionChild key={index} header={data.title} icon={data.icon}>
                        <div className="w-full grid grid-cols-1 gap-10 lg:grid-cols-2 place-items-center p-4 lg:p-10">
                            <h1 className="text-4xl lg:text-5xl font-Playfair_Display font-semibold">{data.title}</h1>
                            <ul className="w-full space-y-3 text-white/60 list-decimal text-base lg:text-lg pl-5">
                                {data.content.map((item, idx) => <li key={idx}>{item.title}</li>)}
                            </ul>
                        </div>
                    </AccordionChild>
                ))}
            </Accordion>
        </div>
    </div>
);

export default function AboutPage() {
    return (
        <div className="w-full font-Roboto text-white bg-dark-white">
            <Head>
                <title>Tentang Kami - Toba Lawfirm</title>
                <meta name="description" content="Pelajari tentang Visi, Misi dan Sejarah TobaLawfirm." />
            </Head>
            <Navbar/>
            <AboutPage_1 />
            <AboutPage_2 />
            <AboutPage_3 />
        </div>
    );
}