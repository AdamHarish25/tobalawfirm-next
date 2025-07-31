// src/app/page.tsx (FINAL DENGAN DESAIN MOBILE-FIRST)
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Database } from "@/Database/WholeData";
import { FaChevronRight, FaStar, FaCompass, FaWallet, FaHandshake, FaClock, FaShieldAlt } from "react-icons/fa";
import Tabs from "@/components/Tabs/Tabs";
import Accordion from "@/components/Accordion/Accordion";
import Link from "next/link";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebase";
import Navbar from '@/components/Navbar';

interface Service {
    id: string;
    title: string;
    subtitle?: string;
}

const Datas = Database.HomeData;

const AccordionChild = ({ children, header, icon }: { children: React.ReactNode, header: string, icon: React.ReactNode }) => (
    <>{children}</>
);

const HomePage_1 = () => {
    const router = useRouter();
    const Data = Datas.page_1;
    return (
        <div className="w-full h-screen bg-cover bg-center bg-black/50 bg-blend-darken relative flex items-center bg-background2">
            <div className="w-full h-full absolute inset-0 bg-black/50" />
            <div className="md:container mx-auto px-4 lg:px-8 z-10">
                <div className="w-full lg:w-1/2 space-y-6 text-white text-center lg:text-left">
                    <h1 className="text-4xl lg:text-5xl lg:text-6xl font-bold font-Playfair_Display">{Data.title}</h1>
                    <p className="text-white/80 md:text-lg">{Data.subtitle}</p>
                    <div className="flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-4 font-Roboto">
                        {Data.button.map((data, index) => (
                            <button key={index} onClick={() => router.push(data.link)} className={index > 0 ? "w-full xs:w-auto flex items-center justify-center text-xs gap-5 bg-transparent rounded-sm border border-white p-4 hover:border-0 hover:bg-white hover:text-black" : "w-full xs:w-auto flex items-center justify-center text-xs gap-5 bg-yellow-500 text-black rounded-sm p-4"}>
                                <p>{data.title}</p> <FaChevronRight />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const HomePage_2 = () => {
    const router = useRouter();
    const Data = Datas.page_2;
    return (
        <div className="w-full md:container mx-auto px-4 lg:px-8 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row justify-around items-center gap-10 lg:gap-16">
                <div className="space-y-8 flex flex-col items-center lg:items-start text-white order-2 lg:order-1 max-w-2xl">
                    <h1 className="text-3xl lg:text-4xl font-Playfair_Display font-bold text-center lg:text-left">{Data.title}</h1>
                    <p className="text-white/60 whitespace-pre-line text-center md:text-lg lg:text-justify">{Data.subtitle}</p>
                    <button onClick={() => router.push(Data.button.link)} className="flex items-center text-sm gap-5 bg-yellow-500 text-black rounded-sm py-3 px-6">
                        <p>{Data.button.title}</p> <FaChevronRight />
                    </button>
                </div>
                <img src={Data.img} alt={Data.title} className="grayscale h-auto w-full max-w-md lg:max-w-fit lg:h-[500px] rounded-lg order-1 lg:order-2" />
            </div>
        </div>
    );
};

const HomePage_3 = () => {
    const Data = Datas.page_3;
    return (
        <div className="w-full bg-dark-gray py-16 lg:py-24">
            <div className="md:container mx-auto px-4 lg:px-8 space-y-16 font-Roboto text-white">
                <div className="w-full text-center">
                    <h1 className="text-3xl lg:text-4xl font-Playfair_Display font-medium">{Data.title}</h1>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                    {Data.cards.map((data, index) => (
                        <div key={index} className="px-5 py-8 flex flex-col items-center text-center gap-5 max-w-xl mx-auto rounded-lg bg-gray-600/50 border border-transparent transition-colors duration-300 hover:border-yellow-500 hover:bg-gray-600">
                            <p className="text-5xl text-yellow-500">{data.icon}</p>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium font-Playfair_Display">{data.title}</h1>
                            <p className="text-white/60 md:text-lg">{data.subtitle}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full text-start">
                    <p className="text-white/60 md:text-lg">*{Data.subtitle}</p>
                </div>
            </div>
        </div>
    );
};

const HomePage_4 = () => {
    const router = useRouter();
    const Data = Datas.page_4;
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const servicesRef = collection(db, "services");
                const q = query(servicesRef, where("isPublished", "==", true), orderBy("title", "asc"), limit(6));
                const querySnapshot = await getDocs(q);
                const servicesData = querySnapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title, subtitle: doc.data().subtitle }));
                setServices(servicesData);
            } catch (error) { console.error("Error fetching services for homepage:", error); }
            finally { setLoading(false); }
        };
        fetchServices();
    }, []);

    return (
        <div className="w-full md:container mx-auto space-y-8 text-white px-4 lg:px-8 py-16 lg:py-24">
            <div className="w-full flex flex-col lg:flex-row gap-6 items-start justify-between">
                <h1 className="text-3xl lg:text-4xl font-medium font-Playfair_Display">{Data.title}</h1>
                <button onClick={() => router.push(Data.button.link)} className="px-6 py-3 transition-colors duration-300 rounded-lg border border-white hover:text-black hover:bg-white flex items-center gap-4 text-sm whitespace-nowrap">
                    <p>{Data.button.title}</p> <FaChevronRight />
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 w-full">
                {loading ? (<p className="col-span-full text-center text-gray-400">Loading services...</p>)
                    : (services.map((data, index) => (
                        <div key={data.id} className="space-y-4 w-full h-full bg-gray-600/50 hover:bg-gray-600 transition-colors duration-300 rounded-lg p-5 flex flex-col items-start text-start cursor-pointer" onClick={() => router.push(`/services/${data.id}`)}>
                            <div className="p-5 w-fit grid place-items-center font-Playfair_Display font-bold rounded-tl-lg rounded-br-lg bg-yellow-500 text-black text-2xl relative"><h1 className="absolute">{index + 1}</h1></div>
                            <h4 className="text-xl font-semibold font-Playfair_Display">{data.title}</h4>
                            {data.subtitle && <p className="text-lg text-white/60">{data.subtitle}</p>}
                        </div>
                    ))
                    )}
            </div>
        </div>
    );
};

const HomePage_5 = () => {
    const Data = Datas.page_5;
    return (
        <div className="w-full py-16 lg:py-24 bg-dark-gray">
            <div className="md:container mx-auto px-4 lg:px-8 space-y-10">
                <div className="w-full text-center">
                    <h1 className="text-2xl lg:text-4xl font-Playfair_Display text-white font-semibold">{Data.title}</h1>
                </div>
                <Tabs tabs={Data.tabs} />
            </div>
        </div>
    );
};

const HomePage_6 = () => {
    const Data = Datas.page_6;
    return (
        <div className="w-full md:container mx-auto space-y-10 px-4 lg:px-8 py-16 lg:py-24 text-white">
            <Accordion>
                {Data.map((data, index) => (
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
    );
};

const HomePage_7 = () => (
    <div className="w-full py-16 lg:py-24 bg-dark-gray">
        <div className="md:container mx-auto px-4 lg:px-8 text-center text-white space-y-8">
            <h1 className="text-3xl lg:text-4xl font-bold font-Playfair_Display">{Datas.page_7.title}</h1>
            <p className="max-w-2xl mx-auto text-gray-300">
                Siap untuk mendiskusikan kebutuhan hukum Anda? Tim kami yang berdedikasi siap membantu. Klik di bawah untuk menemukan cara terbaik menghubungi kami.
            </p>
            <Link href="/contact" className="inline-block bg-yellow-500 text-black font-bold text-lg py-4 px-8 rounded hover:bg-yellow-400 transition-colors duration-300">
                Hubungi Kami Sekarang
            </Link>
        </div>
    </div>
);

export default function Home() {
    return (
        <div className='w-full'>
            <Navbar />
            <HomePage_1 />
            <HomePage_2 />
            <HomePage_3 />
            <HomePage_4 />
            <HomePage_5 />
            <HomePage_6 />
            <HomePage_7 />
        </div>
    );
}