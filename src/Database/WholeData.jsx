// src/Database/WholeData.jsx (FINAL)

import { AiOutlineMessage } from "react-icons/ai";
import { FaClock, FaCompass, FaEnvelope, FaFacebookF, FaHandshake, FaHome, FaInstagram, FaPhone, FaShieldAlt, FaStar, FaWallet, FaYoutube } from "react-icons/fa";

// SEMUA GAMBAR SEKARANG MENJADI STRING PATH DARI FOLDER /public
const Logo = "/images/Logo.jpg";
const Profile = "/images/profile.jpg";
const hammer = '/images/judgesHammer.jpg';
const secretary = '/images/noteTaker.jpg';
const background = '/images/background.jpg';
const handshaking = '/images/businessmenShakingHands.jpg';
const hourglass = '/images/hourglass.jpg';
const teamMember1 = '/images/Team/team1.jpeg';
const teamMember2 = "/images/Team/team2.jpeg";
const teamMember3 = "/images/Team/member3.jpg";

// Nomor WA pusat + builder link WA dengan pesan prefilled.
// Semua CTA kontak pakai ini agar 1 pintu dan pesannya kontekstual.
export const WA_NUMBER = "6281118414832";
export const waLink = (message) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

export const Database = {
  NavbarData: {
    navigateList: [
      {
        title: "Beranda",
        link: "/",
      },
      {
        title: "Layanan",
        link: "/service",
      },
      {
        title: "Tentang",
        link: "/about",
      },
      {
        title: "Tim",
        link: "/team",
      },
      {
        title: "Blog kami",
        link: "/artikel",
      }
    ],

    logo: Logo,

    button: {
      icon: <AiOutlineMessage />,
      title: "Hubungi Kami",
      link: waLink("Halo Toba Law Firm, saya ingin konsultasi hukum. Bisa berikan info lebih lanjut?"),
      external: true,
    },
  },

  FooterData: {
    contact: {
      title: "Kontak",
      address:
        "Madison Square SHC 2/51 kota wisata, Gn. putri, Bogor, Jawa Barat 16720",
      list: [
        {
          title: "+62 811-1841-4832",
          link: "https://wa.me/6281118414832",
        },
        {
          title: "tobalawfirm01@tobalaw.my.id",
          link: "mailto:tobalawfirm01@tobalaw.my.id",
        },
      ],
    },

    links: {
      title: "Links",
      list: [
        {
          title: "Layanan Kami",
          link: "/service",
        },
        {
          title: "Tentang Kami",
          link: "/about",
        },
        {
          title: "Tim Kami",
          link: "/team",
        },
        {
          title: "Beranda",
          link: "/",
        },
      ],

      socialList: [
        {
          icon: <FaYoutube />,
          link: "https://youtube.com",
        },
        {
          icon: <FaFacebookF />,
          link: "https://Facebook.com",
        },
        {
          icon: <FaInstagram />,
          link: "https://Instagram.com",
        },
      ],
    },

    hours: {
      title: "Jam Operasional",
      list: [
        "Senin – Jumat: 09.00 – 17.00",
        "Sabtu: 09.00 – 13.00",
        "Minggu & libur: via WhatsApp",
      ],
    },

    bottom: {
      copyright: "© 2026 Toba Law Firm. Hak cipta dilindungi.",
      list: [
        { title: "Kebijakan Privasi", link: "/contact" },
        { title: "Syarat & Ketentuan", link: "/contact" },
      ],
    },
  },

  HomeData: {
    page_1: {
      title: "Pengacara Bisnis & Litigasi Terpercaya di Bogor",
      subtitle:
        "Didampingi advokat berpengalaman untuk sengketa bisnis, kontrak, dan perkara perdata. Konsultasi awal gratis, respon cepat via WhatsApp.",
      button: [
        {
          link: waLink("Halo Toba Law Firm, saya ingin konsultasi gratis mengenai kasus saya."),
          title: "Konsultasi Gratis",
          external: true,
        },
        {
          link: "/service",
          title: "Lihat Layanan",
        },
      ],
      trust: [
        "★ 4.9/5 dari klien",
        "100+ kasus ditangani",
        "Respon < 5 menit",
      ],
    },

    page_2: {
      title: "Tentang Kami",
      subtitle: `Toba Law Firm adalah lembaga konsultan hukum yang didirikan pada tahun 2024 dengan visi dan misi untuk memberikan bantuan hukum yang berkualitas dan profesional kepada individu dan perusahaan yang menghadapi kesulitan hukum. Kami percaya bahwa setiap orang berhak mendapatkan keadilan dan perlindungan hukum yang sama, dan kami berkomitmen untuk memberikan layanan hukum yang terbaik kepada klien kami.

Dengan tim pengacara yang berpengalaman dan berdedikasi, Toba Law Firm siap membantu klien kami dalam menyelesaikan kasus hukum yang kompleks dan memberikan solusi yang efektif dan efisien. Kami memiliki keahlian dalam berbagai bidang hukum, termasuk litigasi, kontrak, dan hukum bisnis, dan kami siap untuk memberikan bantuan hukum yang tepat kepada klien kami.

Kami memahami bahwa setiap kasus hukum memiliki keunikan dan kompleksitas tersendiri, dan kami berkomitmen untuk memberikan perhatian yang personal dan profesional kepada setiap klien kami. Kami percaya bahwa dengan kerja sama yang erat antara klien dan pengacara, kami dapat mencapai hasil yang terbaik dan memberikan keadilan kepada klien kami.

Toba Law Firm adalah mitra yang dapat diandalkan bagi individu dan perusahaan yang membutuhkan bantuan hukum yang berkualitas dan profesional. Kami siap untuk membantu Anda dalam menyelesaikan kasus hukum Anda dan memberikan solusi yang efektif dan efisien. Hubungi kami hari ini untuk mengetahui lebih lanjut tentang bagaimana kami dapat membantu Anda.`,
      // PHASE 3: versi ringkas untuk homepage (full subtitle tetap dipakai di /about)
      excerpt: `Toba Law Firm adalah konsultan hukum yang didirikan pada 2024 untuk memberikan bantuan hukum berkualitas kepada individu dan perusahaan. Kami percaya setiap orang berhak atas keadilan dan perlindungan hukum yang sama.`,
      points: [
        "Advokat berpengalaman di litigasi, kontrak, dan hukum bisnis",
        "Perhatian personal untuk setiap keunikan kasus Anda",
        "Solusi efektif dan efisien, jalur litigasi maupun non-litigasi",
        "Komunikasi transparan sejak konsultasi pertama",
      ],
      // ANGKA PLACEHOLDER — ganti dengan data riil sebelum pasang iklan
      stats: [
        { value: 100, suffix: "+", label: "Kasus Ditangani" },
        { value: 50, suffix: "+", label: "Klien Percaya" },
        { value: 15, suffix: "+", label: "Bidang Hukum" },
        { value: 5, suffix: "+", label: "Tahun Pengalaman" },
      ],
      button: {
        link: "/about",
        title: "Selengkapnya Tentang Kami",
      },

      img: Profile,
    },

    page_3: {
      title: "Keuntungan menggunakan Jasa Kami",
      subtitle:
        "Tim kami terdiri dari advokat dan konsultan hukum berintegritas dengan pengalaman luas dalam menangani beragam kasus hukum. Pendekatan kami didasarkan pada hukum dan peraturan yang mengatur setiap bidang, dan kami memberikan pelatihan hukum kepada advokat dan masyarakat. ",

      cards: [
        {
          title: "Pengelolaan Biaya Perlindungan Terencana",
          subtitle:
            "Memperkirakan biaya perlindungan hukum untuk setiap aktivitas bisnis tahunan.",
          icon: <FaWallet />,
        },
        {
          title: "Dukungan Hukum Proaktif",
          subtitle:
            "Memberikan nasihat dan bantuan hukum berkala sesuai kebutuhan.",
          icon: <FaHandshake />,
        },
        {
          title: "Solusi Hukum Tepat Waktu",
          subtitle:
            "Tersedia untuk dihubungi saat aktivitas bisnis dilakukan, baik untuk pencegahan maupun masalah hukum yang muncul.",
          icon: <FaClock />,
        },
        {
          title: "Perlindungan Berkelas Atas Masalah Hukum",
          subtitle:
            "Bertindak cepat dalam menangani masalah hukum yang dapat berdampak pada aset dan citra perusahaan.",
          icon: <FaShieldAlt />,
        },
      ],
    },

    page_4: {
      title: "Layanan Kami",
      button: {
        link: "/service",
        title: "Lihat Lebih Banyak",
      },
      // Data ini akan diambil dari firebase di komponen HomePage_4
      services: [], 
    },

    page_5: {
      title: "Klien Kami",
      tabs: [
        {
          id: 1,
          tabTitle: "Pengacara Tetap",
          title: "Klien Tetap (Retainer)",
          content:
            "Klien (baik perorangan atau perusahaan) yang menunjuk Kantor Kami sebagai pengacara tetap (In House Lawyer) selama jangka waktu tertentu, untuk menangani segala aspek hukum terutama untuk mencegah timbulnya sengketa / masalah hukum.",
          // HARGA PLACEHOLDER — konfirmasi ke owner sebelum iklan
          price: "Mulai dari Rp 5 jt/bln",
          cta: { title: "Minta Penawaran", link: waLink("Halo, saya ingin menanyakan paket pengacara tetap (retainer)."), external: true },
          img: background,
        },
        {
          id: 2,
          tabTitle: "Kasus Insidentil",
          title: "Klien Tidak Tetap",
          content:
            "Klien (baik perorangan atau badan hukum) yang secara insidentil menunjuk Kantor Hukum Kami untuk menangani masalah hukum yang dihadapi baik untuk penyelesaian di luar maupun di dalam pengadilan.",
          price: "Estimasi per kasus",
          cta: { title: "Konsultasi Kasus", link: waLink("Halo, saya ingin konsultasi mengenai kasus hukum saya."), external: true },
          img: secretary,
        },
        {
          id: 3,
          tabTitle: "Pendampingan Pengadaan",
          title: "Pendampingan dan Pelayanan Hukum",
          content:
            "Bagi PA / KPA / PPK / ULP / Pejabat Pengadaan / PPHP/ PPSPM / Bendahara / APIP yang sedang mengadapi permasalahan hukum Pengadaan.",
          price: "Sesuai kebutuhan",
          cta: { title: "Diskusi Kebutuhan", link: waLink("Halo, saya ingin diskusi pendampingan hukum pengadaan."), external: true },
          img: hammer,
        },
      ],
    },

    page_6: [
      {
        title: "Visi",
        icon: <FaStar />,
        content: [
          {
            title:
              "Mewujudkan penegakan hukum yang benar, adil, bermartabat serta jasa pelayanan hukum prima dan partisipatif",
          },
          {
            title:
              "Menjadi Pusat Pelatihan yang dipilih untuk kualitas dan kinerja yang kami tawarkan melalui produk dan layanan kami",
          },
        ],
      },
      {
        title: "Misi",
        icon: <FaCompass />,
        content: [
          {
            title:
              "Menyelesaikan perkara/kasus melalui jalur litigasi & non-litigasi",
          },
          {
            title: "Pendokumentasian serta akses informasi yang komprehensif",
          },
          {
            title:
              "Jaringan kerjasama yang kooperatif dan akomodatif dengan berprinsip pada kode etik profesi, pengembangan sumber daya hukum internal yang progresif, egaliter dan profesional",
          },
          {
            title:
              "Untuk secara konsisten memberikan dan meningkatkan nilai bagi klien dan karyawan kami dengan berkomitmen untuk terus memiliki keunggulan kompetitif, melalui kegiatan harian yang terperinci yang didorong oleh wawasan dunia nyata dan tetap bertanggung jawab terhadap tujuan kami",
          },
        ],
      },
    ],

    page_7: {
      title: "Hubungi Kami",
    },

    // TESTIMONI PLACEHOLDER — wajib ganti testimoni asli + izin tertulis sebelum iklan
    page_8: {
      title: "Kata Mereka Tentang Kami",
      subtitle: "Kepercayaan klien adalah reputasi kami.",
      testimonials: [
        {
          quote: "Kasus sengketa bisnis kami selesai lebih cepat dari estimasi. Komunikasi jelas di setiap tahap.",
          name: "H. S.",
          role: "Direktur, Perusahaan Dagang — Bogor",
        },
        {
          quote: "Didampingi dari somasi sampai sidang. Saya selalu tahu posisi kasus saya.",
          name: "R. A.",
          role: "Klien Perdata — Depok",
        },
        {
          quote: "Kontrak-kontrak perusahaan kami sekarang rapi dan aman. Layak jadi retainer tahunan.",
          name: "M. T.",
          role: "Owner, Jasa Konstruksi — Jakarta",
        },
      ],
    },

    page_9: {
      title: "Mudah Memulai",
      subtitle: "Tiga langkah dari chat pertama sampai kasus ditangani.",
      steps: [
        {
          title: "Chat via WhatsApp",
          desc: "Ceritakan masalah Anda. Gratis, tanpa komitmen, respon di jam kerja.",
        },
        {
          title: "Analisa & Estimasi",
          desc: "Kami pelajari dokumen, jelaskan posisi hukum dan estimasi biaya transparan.",
        },
        {
          title: "Pendampingan",
          desc: "Surat kuasa ditandatangani, tim mulai bekerja dan lapor berkala.",
        },
      ],
      button: { title: "Mulai Langkah 1 — Gratis", link: waLink("Halo, saya ingin mulai konsultasi gratis."), external: true },
    },

    page_10: {
      title: "Pertanyaan Umum",
      subtitle: "Jawaban cepat sebelum Anda menghubungi kami.",
      faqs: [
        {
          q: "Berapa biaya konsultasi awal?",
          a: "Konsultasi awal via WhatsApp tidak dipungut biaya. Untuk pendalaman dokumen atau meeting, kami beri estimasi transparan di awal — tidak ada biaya siluman.",
        },
        {
          q: "Berapa lama penanganan kasus?",
          a: "Tergantung jenis perkara. Sengketa sederhana bisa selesai dalam hitungan minggu lewat negosiasi, sedangkan litigasi mengikuti jadwal pengadilan. Estimasi waktu selalu kami sampaikan setelah analisa dokumen.",
        },
        {
          q: "Wilayah mana saja yang dilayani?",
          a: "Kantor kami di Bogor dan melayani Jabodetabek secara langsung. Untuk luar daerah, pendampingan dimungkinkan secara hybrid setelah asesmen awal.",
        },
        {
          q: "Dokumen apa yang perlu saya siapkan?",
          a: "Siapkan KTP, kronologi singkat, dan dokumen terkait (kontrak, somasi, putusan, atau bukti komunikasi). Semakin lengkap, semakin cepat analisa kami.",
        },
        {
          q: "Bagaimana sistem retainer untuk perusahaan?",
          a: "Perusahaan menunjuk kami sebagai pengacara tetap dengan biaya bulanan. Mencakup review kontrak, nasihat berkala, dan prioritas penanganan sengketa.",
        },
        {
          q: "Apakah data dan privasi saya aman?",
          a: "Ya. Seluruh informasi klien bersifat rahasia dan dilindungi kode etik advokat. Dokumen hanya diakses tim yang menangani kasus Anda.",
        },
      ],
    },
  },

  ServiceData: {
    page_1: {
      title: "Layanan Kami",
    },
    // Data ini akan diambil dari Firebase di halaman layanan
    page_2: [],
  },

  AboutData: {
    page_1: {
      title: "Tentang Kami",
    },
    page_2: {
      title: "About Us",
      subtitle: `Toba Law Firm adalah lembaga konsultan hukum yang didirikan pada tahun 2024 dengan visi dan misi untuk memberikan bantuan hukum yang berkualitas dan profesional kepada individu dan perusahaan yang menghadapi kesulitan hukum. Kami percaya bahwa setiap orang berhak mendapatkan keadilan dan perlindungan hukum yang sama, dan kami berkomitmen untuk memberikan layanan hukum yang terbaik kepada klien kami.

Dengan tim pengacara yang berpengalaman dan berdedikasi, Toba Law Firm siap membantu klien kami dalam menyelesaikan kasus hukum yang kompleks dan memberikan solusi yang efektif dan efisien. Kami memiliki keahlian dalam berbagai bidang hukum, termasuk litigasi, kontrak, dan hukum bisnis, dan kami siap untuk memberikan bantuan hukum yang tepat kepada klien kami.

Kami memahami bahwa setiap kasus hukum memiliki keunikan dan kompleksitas tersendiri, dan kami berkomitmen untuk memberikan perhatian yang personal dan profesional kepada setiap klien kami. Kami percaya bahwa dengan kerja sama yang erat antara klien dan pengacara, kami dapat mencapai hasil yang terbaik dan memberikan keadilan kepada klien kami.

Toba Law Firm adalah mitra yang dapat diandalkan bagi individu dan perusahaan yang membutuhkan bantuan hukum yang berkualitas dan profesional. Kami siap untuk membantu Anda dalam menyelesaikan kasus hukum Anda dan memberikan solusi yang efektif dan efisien. Hubungi kami hari ini untuk mengetahui lebih lanjut tentang bagaimana kami dapat membantu Anda. `,
      button: {
        link: "/service",
        title: "Layanan Kami",
      },
      img: teamMember3,
    },

    page_3: [
      {
        title: "Visi",
        icon: <FaStar />,
        content: [
          { title: "Mewujudkan penegakan hukum yang benar, adil, bermartabat serta jasa pelayanan hukum prima dan partisipatif" },
          { title: "Menjadi Pusat Pelatihan yang dipilih untuk kualitas dan kinerja yang kami tawarkan melalui produk dan layanan kami" },
        ],
      },
      {
        title: "Misi",
        icon: <FaCompass />,
        content: [
          { title: "Menyelesaikan perkara/kasus melalui jalur litigasi & non-litigasi" },
          { title: "Pendokumentasian serta akses informasi yang komprehensif" },
          { title: "Jaringan kerjasama yang kooperatif dan akomodatif dengan berprinsip pada kode etik profesi, pengembangan sumber daya hukum internal yang progresif, egaliter dan profesional" },
          { title: "Untuk secara konsisten memberikan dan meningkatkan nilai bagi klien dan karyawan kami dengan berkomitmen untuk terus memiliki keunggulan kompetitif, melalui kegiatan harian yang terperinci yang didorong oleh wawasan dunia nyata dan tetap bertanggung jawab terhadap tujuan kami" },
        ],
      },
    ],
  },

  TeamData: {
    page_1: {
      title: "Tim Kami",
    },
    page_2: {
      title: "About Us",
      subtitle: `Toba Law Firm adalah lembaga konsultan hukum yang didirikan pada tahun 2024 dengan visi dan misi untuk memberikan bantuan hukum yang berkualitas dan profesional kepada individu dan perusahaan yang menghadapi kesulitan hukum. Kami percaya bahwa setiap orang berhak mendapatkan keadilan dan perlindungan hukum yang sama, dan kami berkomitmen untuk memberikan layanan hukum yang terbaik kepada klien kami.

Dengan tim pengacara yang berpengalaman dan berdedikasi, Toba Law Firm siap membantu klien kami dalam menyelesaikan kasus hukum yang kompleks dan memberikan solusi yang efektif dan efisien. Kami memiliki keahlian dalam berbagai bidang hukum, termasuk litigasi, kontrak, dan hukum bisnis, dan kami siap untuk memberikan bantuan hukum yang tepat kepada klien kami.

Kami memahami bahwa setiap kasus hukum memiliki keunikan dan kompleksitas tersendiri, dan kami berkomitmen untuk memberikan perhatian yang personal dan profesional kepada setiap klien kami. Kami percaya bahwa dengan kerja sama yang erat antara klien dan pengacara, kami dapat mencapai hasil yang terbaik dan memberikan keadilan kepada klien kami.

Toba Law Firm adalah mitra yang dapat diandalkan bagi individu dan perusahaan yang membutuhkan bantuan hukum yang berkualitas dan profesional. Kami siap untuk membantu Anda dalam menyelesaikan kasus hukum Anda dan memberikan solusi yang efektif dan efisien. Hubungi kami hari ini untuk mengetahui lebih lanjut tentang bagaimana kami dapat membantu Anda. `,
      button: {
        link: "/service",
        title: "Layanan Kami",
      },
      img: handshaking,
    },
    page_3: [
      {
        name: "Melanie Ivone",
        img: teamMember1,
        class: "",
        role: "Konsultan Hukum",
        socials: [
          { icon: <FaInstagram />, link: "https://instagram.com" },
          { icon: <FaFacebookF />, link: "https://facebook.com" },
        ],
      },
      {
        name: "Adv Diansyah Putra Gumay, SH,MM,.",
        img: teamMember2,
        class: "",
        role: "Konsultan & Law Partner",
        socials: [
          { icon: <FaInstagram />, link: "https://instagram.com" },
          { icon: <FaFacebookF />, link: "https://facebook.com" },
        ],
      },
    ],
  },
};