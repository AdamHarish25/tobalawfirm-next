// src/components/Accordion/AccordionChild.jsx -> .tsx (props diketik agar lolos tsc)
// WAJIB 'use client': Accordion (client) membaca child.props.header/icon.
// Jika wrapper ini Server Component, Next merender-nya di server lebih dulu
// dan yang sampai ke Accordion tinggal fragment hasil render -> header kosong.
// Sebagai Client Component, elemen diteruskan by-reference beserta props-nya.
'use client';

import type { ReactNode } from 'react';

interface AccordionChildProps {
  children: ReactNode;
  header: string;
  icon: ReactNode;
}

const AccordionChild = ({ children }: AccordionChildProps) => (<>{children}</>);

export default AccordionChild;
