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
      link: "/contact",
    },
  },

  FooterData: {
    contact: {
      title: "Kontak",
      address:
        "Madison Square SHC 2/51 kota wisata, Gn. putri, Bogor, Jawa Barat 16720",
      list: [
        {
          title: "+62 811-1072-535",
          link: "https://wa.me/628111072535",
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
  },

  HomeData: {
    page_1: {
      title: "Penuhi semua kebutuhan investigasi dan litigasi Anda",
      subtitle:
        "Kantor Hukum kami terdiri dari tim advokat & legal consultant mempunyai integritas tinggi yang mampu dan berpengalaman menangani berbagai perkara hukum.",
      button: [
        {
          link: "/service",
          title: "Layanan Kami",
        },
        {
          link: "/contact",
          title: "Kontak Kami",
        },
      ],
    },

    page_2: {
      title: "Tentang Kami",
      subtitle: `Toba Law Firm adalah lembaga konsultan hukum yang didirikan pada tahun 2024 dengan visi dan misi untuk memberikan bantuan hukum yang berkualitas dan profesional kepada individu dan perusahaan yang menghadapi kesulitan hukum. Kami percaya bahwa setiap orang berhak mendapatkan keadilan dan perlindungan hukum yang sama, dan kami berkomitmen untuk memberikan layanan hukum yang terbaik kepada klien kami.

Dengan tim pengacara yang berpengalaman dan berdedikasi, Toba Law Firm siap membantu klien kami dalam menyelesaikan kasus hukum yang kompleks dan memberikan solusi yang efektif dan efisien. Kami memiliki keahlian dalam berbagai bidang hukum, termasuk litigasi, kontrak, dan hukum bisnis, dan kami siap untuk memberikan bantuan hukum yang tepat kepada klien kami.

Kami memahami bahwa setiap kasus hukum memiliki keunikan dan kompleksitas tersendiri, dan kami berkomitmen untuk memberikan perhatian yang personal dan profesional kepada setiap klien kami. Kami percaya bahwa dengan kerja sama yang erat antara klien dan pengacara, kami dapat mencapai hasil yang terbaik dan memberikan keadilan kepada klien kami.

Toba Law Firm adalah mitra yang dapat diandalkan bagi individu dan perusahaan yang membutuhkan bantuan hukum yang berkualitas dan profesional. Kami siap untuk membantu Anda dalam menyelesaikan kasus hukum Anda dan memberikan solusi yang efektif dan efisien. Hubungi kami hari ini untuk mengetahui lebih lanjut tentang bagaimana kami dapat membantu Anda.`,
      button: {
        link: "/service",
        title: "Layanan Kami",
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
          tabTitle: "Tipe 1",
          title: "Klien Tetap",
          content:
            "Klien (baik perorangan atau perusahaan) yang menunjuk Kantor Kami sebagai pengacara tetap (In House Lawyer) selama jangka waktu tertentu, untuk menangani segala aspek hukum terutama untuk mencegah timbulnya sengketa / masalah hukum.",
          img: background,
        },
        {
          id: 2,
          tabTitle: "Tipe 2",
          title: "Klien Tidak Tetap",
          content:
            "Klien (baik perorangan atau badan hukum) yang secara insidentil menunjuk Kantor Hukum Kami untuk menangani masalah hukum yang dihadapi baik untuk penyelesaian di luar maupun di dalam pengadilan.",
          img: secretary,
        },
        {
          id: 3,
          tabTitle: "Tipe 3",
          title: "Pendampingan dan Pelayanan Hukum",
          content:
            "Bagi PA / KPA / PPK / ULP / Pejabat Pengadaan / PPHP/ PPSPM / Bendahara / APIP yang sedang mengadapi permasalahan hukum Pengadaan.",
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