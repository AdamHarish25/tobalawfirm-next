// src/app/page.tsx (PHASE 2 - server component, ISR 60s, CTA diperbesar + trust strip)
import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { FaChevronRight, FaCheckCircle, FaStar, FaQuoteLeft } from "react-icons/fa";
import Tabs from "@/components/Tabs/Tabs";
import Accordion from "@/components/Accordion/Accordion";
import AccordionChild from "@/components/Accordion/AccordionChild";
import Faq from "@/components/Faq/Faq";
import LeadForm from "@/components/LeadFormLazy";
import Link from "next/link";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebase";
import { Database } from "@/Database/WholeData";
import Navbar from '@/components/Navbar';
import StatsCounter from '@/components/StatsCounter';
import Image from 'next/image';

export const revalidate = 60;

export const metadata: Metadata = {
    title: 'Pengacara Bisnis & Litigasi di Bogor',
    description: 'Toba Law Firm — advokat & konsultan hukum berpengalaman untuk sengketa bisnis, kontrak, dan perkara perdata. Konsultasi awal gratis via WhatsApp.',
};

interface Service {
    id: string;
    title: string;
    slug: string;
    subtitle?: string;
}

// Fetch di server (di-cache 60 detik) — pola sama seperti service/page.tsx
async function getPublishedServices(): Promise<Service[] | null> {
    try {
        const servicesRef = collection(db, "services");
        const q = query(servicesRef, where("isPublished", "==", true), orderBy("title", "asc"), limit(6));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            slug: doc.data().slug,
            subtitle: doc.data().subtitle,
        }));
    } catch (error) {
        console.error("Error fetching services for homepage:", error);
        return null;
    }
}

const Datas = Database.HomeData;

const HomePage_1 = () => {
    const Data = Datas.page_1;
    return (
        <div className="w-full min-h-screen bg-cover bg-center relative flex items-center bg-background2">
            <div className="w-full h-full absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            <div className="md:container mx-auto px-4 lg:px-8 z-10 pt-28 pb-16">
                <div className="w-full lg:w-1/2 space-y-6 text-white text-center lg:text-left">
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-Playfair_Display leading-tight">{Data.title}</h1>
                    <p className="text-white/80 md:text-lg">{Data.subtitle}</p>
                    <div className="flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-4 font-Roboto">
                        {Data.button.map((data, index) => {
                            const cls = index > 0 ? "w-full xs:w-auto flex items-center justify-center text-sm gap-3 bg-transparent rounded-sm border border-white px-8 py-4 hover:bg-white hover:text-black transition-colors" : "w-full xs:w-auto flex items-center justify-center text-sm font-semibold gap-3 bg-gold text-black rounded-sm px-8 py-4 hover:bg-gold-soft transition-colors";
                            return data.external ? (
                                <a key={index} href={data.link} target="_blank" rel="noopener noreferrer" className={cls}>
                                    <span>{data.title}</span> <FaChevronRight />
                                </a>
                            ) : (
                                <Link key={index} href={data.link} className={cls}>
                                    <span>{data.title}</span> <FaChevronRight />
                                </Link>
                            );
                        })}
                    </div>
                    <ul className="flex flex-col xs:flex-row flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-2 text-sm text-white/75">
                        {Data.trust.map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <FaCheckCircle className="text-gold shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const HomePage_2 = () => {
    const Data = Datas.page_2;
    return (
        <div className="w-full md:container mx-auto px-4 lg:px-8 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row justify-around items-center gap-10 lg:gap-16">
                <div className="space-y-8 flex flex-col items-center lg:items-start text-white order-2 lg:order-1 max-w-2xl">
                    <h2 className="text-3xl lg:text-4xl font-Playfair_Display font-bold text-center lg:text-left">{Data.title}</h2>
                    <p className="text-white/75 text-center md:text-lg lg:text-justify">{Data.excerpt}</p>
                    <ul className="w-full space-y-3">
                        {Data.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-white/80 text-center lg:text-left md:text-lg">
                                <FaCheckCircle className="text-gold shrink-0 mt-1" /> {point}
                            </li>
                        ))}
                    </ul>
                    <StatsCounter stats={Data.stats} />
                    <Link href={Data.button.link} className="flex items-center text-sm font-semibold gap-3 bg-gold text-black rounded-sm py-3 px-6 hover:bg-gold-soft transition-colors">
                        <span>{Data.button.title}</span> <FaChevronRight />
                    </Link>
                </div>
                <Image src={Data.img} alt="Tentang Toba Law Firm" width={500} height={500} className="grayscale h-auto w-full max-w-md lg:max-w-fit lg:h-[500px] rounded-lg order-1 lg:order-2" />
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
                    <h2 className="text-3xl lg:text-4xl font-Playfair_Display font-medium">{Data.title}</h2>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                    {Data.cards.map((data, index) => (
                        <div key={index} className="px-5 py-8 flex flex-col items-center text-center gap-5 max-w-xl mx-auto rounded-lg bg-gray-600/50 border border-transparent transition-colors duration-300 hover:border-gold hover:bg-gray-600">
                            <p className="text-5xl text-gold">{data.icon}</p>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-medium font-Playfair_Display">{data.title}</h3>
                            <p className="text-white/75 md:text-lg">{data.subtitle}</p>
                        </div>
                    ))}
                </div>
                <div className="w-full text-start">
                    <p className="text-white/75 md:text-lg">*{Data.subtitle}</p>
                </div>
            </div>
        </div>
    );
};

const ServicesSkeleton = () => (
    <div className="w-full md:container mx-auto space-y-8 text-white px-4 lg:px-8 py-16 lg:py-24" aria-busy="true" aria-label="Memuat layanan">
        <div className="w-full h-10 bg-gray-600/50 rounded-lg animate-pulse max-w-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 w-full">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4 w-full rounded-lg p-5 bg-gray-600/30 animate-pulse">
                    <div className="w-14 h-14 rounded-tl-lg rounded-br-lg bg-gray-600" />
                    <div className="h-6 bg-gray-600 rounded w-3/4" />
                    <div className="h-4 bg-gray-600 rounded w-full" />
                </div>
            ))}
        </div>
    </div>
);

// Section layanan: server-rendered, link ke /layanan/[slug] (bukan /services/:id yang 404)
const HomeServices = async () => {
    const Data = Datas.page_4;
    const services = await getPublishedServices();

    return (
        <div className="w-full md:container mx-auto space-y-8 text-white px-4 lg:px-8 py-16 lg:py-24">
            <div className="w-full flex flex-col lg:flex-row gap-6 items-start justify-between">
                <h2 className="text-3xl lg:text-4xl font-medium font-Playfair_Display">{Data.title}</h2>
                <Link href={Data.button.link} className="px-6 py-3 transition-colors duration-300 rounded-lg border border-white hover:text-black hover:bg-white flex items-center gap-4 text-sm whitespace-nowrap">
                    <span>{Data.button.title}</span> <FaChevronRight />
                </Link>
            </div>
            {services === null ? (
                <div className="w-full text-center rounded-lg border border-white/10 bg-gray-600/30 p-10 space-y-4">
                    <p className="text-white/75">Layanan tidak dapat dimuat saat ini. Silakan coba lagi atau hubungi kami langsung.</p>
                    <div className="flex flex-col xs:flex-row items-center justify-center gap-4">
                        <Link href="/service" className="px-6 py-3 rounded-lg bg-gold text-black text-sm font-semibold hover:bg-gold-soft transition-colors">
                            Coba Lagi
                        </Link>
                        <Link href="/contact" className="px-6 py-3 rounded-lg border border-white text-sm hover:bg-white hover:text-black transition-colors">
                            Hubungi Kami
                        </Link>
                    </div>
                </div>
            ) : services.length === 0 ? (
                <p className="col-span-full text-center text-gray-400">Belum ada layanan yang dipublikasikan.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 w-full">
                    {services.map((data, index) => (
                        <Link key={data.id} href={data.slug ? `/layanan/${data.slug}` : "/service"} className="space-y-4 w-full h-full bg-gray-600/50 hover:bg-gray-600 hover:border-gold border border-transparent transition-colors duration-300 rounded-lg p-5 flex flex-col items-start text-start">
                            <div className="p-5 w-fit grid place-items-center font-Playfair_Display font-bold rounded-tl-lg rounded-br-lg bg-gold text-black text-2xl relative"><span className="absolute">{index + 1}</span></div>
                            <h3 className="text-xl font-semibold font-Playfair_Display">{data.title}</h3>
                            {data.subtitle && <p className="text-lg text-white/75">{data.subtitle}</p>}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

const HomeTestimonials = () => {
    const Data = Datas.page_8;
    return (
        <div className="w-full md:container mx-auto px-4 lg:px-8 py-16 lg:py-24 text-white">
            <div className="text-center space-y-3 mb-12">
                <h2 className="text-3xl lg:text-4xl font-Playfair_Display font-semibold">{Data.title}</h2>
                <p className="text-white/60 md:text-lg">{Data.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Data.testimonials.map((t, idx) => (
                    <figure key={idx} className="flex flex-col gap-4 p-6 md:p-8 rounded-xl bg-dark-gray border border-white/10 hover:border-gold/60 transition-colors">
                        <FaQuoteLeft className="text-gold text-2xl" />
                        <blockquote className="text-white/80 md:text-lg leading-relaxed flex-1">“{t.quote}”</blockquote>
                        <div className="flex gap-1 text-gold" aria-label="Rating 5 dari 5">
                            {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} />)}
                        </div>
                        <figcaption>
                            <p className="font-semibold text-white">{t.name}</p>
                            <p className="text-sm text-white/50">{t.role}</p>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </div>
    );
};

const HomeSteps = () => {
    const Data = Datas.page_9;
    return (
        <div className="w-full bg-dark-gray py-16 lg:py-24">
            <div className="md:container mx-auto px-4 lg:px-8 text-white">
                <div className="text-center space-y-3 mb-12">
                    <h2 className="text-3xl lg:text-4xl font-Playfair_Display font-semibold">{Data.title}</h2>
                    <p className="text-white/60 md:text-lg">{Data.subtitle}</p>
                </div>
                <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none">
                    {Data.steps.map((step, idx) => (
                        <li key={idx} className="relative p-6 md:p-8 rounded-xl bg-white/5 border border-white/10 space-y-3">
                            <span className="inline-grid place-items-center w-12 h-12 rounded-full bg-gold text-black font-bold font-Playfair_Display text-xl">{idx + 1}</span>
                            <h3 className="text-xl font-semibold font-Playfair_Display">{step.title}</h3>
                            <p className="text-white/70 leading-relaxed">{step.desc}</p>
                        </li>
                    ))}
                </ol>
                <div className="text-center mt-10">
                    {Data.button.external ? (
                        <a href={Data.button.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gold text-black font-semibold text-base py-4 px-8 rounded hover:bg-gold-soft transition-colors">
                            <span>{Data.button.title}</span> <FaChevronRight />
                        </a>
                    ) : (
                        <Link href={Data.button.link} className="inline-flex items-center gap-3 bg-gold text-black font-semibold text-base py-4 px-8 rounded hover:bg-gold-soft transition-colors">
                            <span>{Data.button.title}</span> <FaChevronRight />
                        </Link>
                    )}
                </div>
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
                    <h2 className="text-2xl lg:text-4xl font-Playfair_Display text-white font-semibold">{Data.title}</h2>
                </div>
                <Tabs tabs={Data.tabs} />
            </div>
        </div>
    );
};

const HomePage_6 = () => {
    
    return (
        <div className="w-full md:container mx-auto space-y-10 px-4 lg:px-8 py-16 lg:py-24 text-white">
            <Accordion>
                {Datas.page_6.map((data, index) => (
                    <AccordionChild key={index} header={data.title} icon={data.icon}>
                        <div className="w-full max-w-4xl mx-auto px-2 py-6 md:p-10">
                            <ul className="w-full space-y-4 md:space-y-5 list-none">
                                {data.content.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4 md:gap-5 p-5 md:p-6 rounded-xl bg-white/5 border border-white/10 hover:border-gold/60 transition-colors">
                                        <span className="shrink-0 w-9 h-9 md:w-10 md:h-10 grid place-items-center rounded-full bg-gold text-black font-bold font-Playfair_Display text-base md:text-lg">{idx + 1}</span>
                                        <p className="text-white/80 text-base md:text-lg leading-relaxed pt-1 md:pt-0.5">{item.title}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AccordionChild>
                ))}
            </Accordion>
        </div>
    );
};

const HomeFaq = () => {
    const Data = Datas.page_10;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": Data.faqs.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
    };
    return (
        <div className="w-full md:container mx-auto px-4 lg:px-8 py-16 lg:py-24 text-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="text-center space-y-3 mb-12">
                <h2 className="text-3xl lg:text-4xl font-Playfair_Display font-semibold">{Data.title}</h2>
                <p className="text-white/60 md:text-lg">{Data.subtitle}</p>
            </div>
            <Faq items={Data.faqs} />
        </div>
    );
};

const HomePage_7 = () => (
    <div className="w-full py-16 lg:py-24 bg-dark-gray">
        <div className="md:container mx-auto px-4 lg:px-8 text-center text-white space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold font-Playfair_Display">{Datas.page_7.title}</h2>
            <p className="max-w-2xl mx-auto text-gray-300">
                Siap untuk mendiskusikan kebutuhan hukum Anda? Isi form singkat — kami lanjutkan ke WhatsApp. Atau hubungi langsung:
            </p>
            <LeadForm source="homepage-cta" />
            <div className="flex flex-col xs:flex-row items-center justify-center gap-4">
                <a href="https://wa.me/6281118414832?text=Halo%2C%20saya%20ingin%20konsultasi%20gratis." target="_blank" rel="noopener noreferrer" className="inline-block bg-gold text-black font-bold text-base py-4 px-8 rounded hover:bg-gold-soft transition-colors duration-300">
                    Chat WhatsApp
                </a>
                <a href="tel:+6281118414832" className="inline-block border border-white/30 text-white font-semibold text-base py-4 px-8 rounded hover:bg-white hover:text-black transition-colors duration-300">
                    +62 811-1841-4832
                </a>
            </div>
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
            <Suspense fallback={<ServicesSkeleton />}>
                <HomeServices />
            </Suspense>
            <HomeTestimonials />
            <HomeSteps />
            <HomePage_5 />
            <HomePage_6 />
            <HomeFaq />
            <HomePage_7 />
        </div>
    );
}
