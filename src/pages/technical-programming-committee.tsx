import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import SectionHeader from "../components/sectionHeader";
import SpeakerRankGraph, { SpeakerLevel } from "../components/speakerRankGraph";

const trackCoChairLevels: SpeakerLevel[] = [
  {
    levelName: "Mechanical Engineering Systems",
    rank: 1,
    speakers: [
      {
        name: "Dr. Thamasha Samarasinghe",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Thamasha.Samarasinghe.png"
            alt="Dr. Thamasha Samarasinghe"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Prof. R.A.R.C. Gopura",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/R.A.R.C.Gopura.png"
            alt="Prof. R.A.R.C. Gopura"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr Guohong Tian",
        university: "University of Surrey, UK",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Guohong.Tian.png"
            alt="Dr Guohong Tian"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Power Systems, Electrical Machines and High Voltage Engineering",
    rank: 2,
    speakers: [
      {
        name: "Dr. Manuja Gunawardana",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Manuja.Gunawardane.png"
            alt="Dr. Manuja Gunawardana"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Charithri Yapa",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Charithri.Yapa.png"
            alt="Dr. Charithri Yapa"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Mohasha Sampath",
        university: "Nanyang Technological University, Singapore",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Mohasha.Sampath.png"
            alt="Dr. Mohasha Sampath"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Data Science and Artificial Intelligence",
    rank: 3,
    speakers: [
      {
        name: "Dr. Sandareka Wickramanayake",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Sandareka.Wickramanayake.png"
            alt="Dr. Sandareka Wickramanayake"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Akila Pemasiri",
        university: "Queensland University of Technology",
        image: (
          <StaticImage
            src="../images\programming-committee\Dr.Akila.Pemasiri.png"
            alt="Dr. Akila Pemasiri"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Bhagya Samarakon",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Bhagya.Samarakon.png"
            alt="Dr. Bhagya Samarakon"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Natural Language Processing",
    rank: 4,
    speakers: [
      {
        name: "Dr. Nisansa de Silva",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Nisansa.png"
            alt="Dr. Nisansa de Silva"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Mokanarangan  Thayaparan",
        university: "Senior AI (NLP) Engineer, MathWorks",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Mohan.png"
            alt="Dr. Mokanarangan  Thayaparan"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr Surangika Ranathunga",
        university: "Mathematical and Computational Sciences,  Massey University",
        image: (
          <StaticImage
            src="../images\programming-committee\Dr.Surangika.png" 
            alt="Dr Surangika Ranathunga"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Textile and Apparel Engineering",
    rank: 5,
    speakers: [
      {
        name: "Prof. E. A. S. K. Fernando",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.E.A.S.K.Fernando.png"
            alt="Prof. E. A. S. K. Fernando"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Prof. (Mr.) S.A. Ariadurai",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.S.A.Ariadurai.png"
            alt="Prof. (Mr.) S.A. Ariadurai"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Nandula Wanasekara",
        university: "Xplora Ventures Ltd., New Zealand",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Nandula.Wanasekara.png"
            alt="Dr. Nandula Wanasekara"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Chemical and Process Engineering",
    rank: 6,
    speakers: [
      {
        name: "Dr. Hiran Chathuranga",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Hiran.Chathuranga.png"
            alt="Dr. Hiran Chathuranga"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Valentina Zaccaria",
        university: "Mälardalen University, Sweden",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Valentina.Zaccaria.png"
            alt="Dr. Valentina Zaccaria"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Supply Chain, Logistics and Mobility Engineering",
    rank: 7,
    speakers: [
      {
        name: "Prof. H. Niles Perera",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.H.Niles.Perera.png"
            alt="Prof. H. Niles Perera"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Prof. Behnam Fahimnia",
        university: "University of Sydney, Australia",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.Behnam.Fahimnia.png"
            alt="Prof. Behnam Fahimnia"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Sustainable Energy & Environment",
    rank: 8,
    speakers: [
      {
        name: "Dr. Thushara Rathnayake",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Thushara.Rathnayake.png"
            alt="Dr. Thushara Rathnayake"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Shakila Pathirana",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Shakila.Pathirana.png"
            alt="Dr. Shakila Pathirana"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Rajeev Ruparathna",
        university: "University of Windsor, Canada",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Rajeev.Ruparathna.png"
            alt="Dr. Rajeev Ruparathna"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Robotics and Intelligent Systems",
    rank: 9,
    speakers: [
      {
        name: "Dr. Sulochana Sooriyaarachchi",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Sulochana.Sooriyaarachchi.png"
            alt="Dr. Sulochana Sooriyaarachchi"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr R.M.M. Ruwanthika",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.R.M.M.Ruwanthika.png"
            alt="Dr R.M.M. Ruwanthika"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr Viraj Muthugala",
        university: "Singapore University of Technology and Design, Singapore",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Viraj.Muthugala.png"
            alt="Dr Viraj Muthugala"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Image Processing and Computer Vision",
    rank: 10,
    speakers: [
      {
        name: "Dr. Thanuja Ambegoda",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Thanuja.Ambegoda.png"
            alt="Dr. Thanuja Ambegoda"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr Gilbert Lim",
        university: "Chief AI Scientist, EyRIS",
        image: (
          <StaticImage
            src="../images\programming-committee\Dr.Gilbert.Lim.png"
            alt="Dr Gilbert Lim"
            className="w-full h-full"
            objectFit="contain"
          />
        ),
      },
      {
        name: "Dr. Sanka Rasnayaka",
        university: "National University of Singapore, Singapore",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Sanka.Rasnayaka.png"
            alt="Dr. Sanka Rasnayaka"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Materials Science and Engineering",
    rank: 11,
    speakers: [
      {
        name: "Dr Aravinda Abeygunawardane",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr. A.A.G.A.Abeygunawardane.png"
            alt="Dr Aravinda Abeygunawardane"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr Dinesh Attygalle",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Dinesh.Attygalle.png"
            alt="Dr Dinesh Attygalle"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Construction Engineering and Risk Management",
    rank: 12,
    speakers: [
      {
        name: "Dr. Mohamed Nihaaj",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Mohamed.Nihaaj.png"
            alt="Dr. Mohamed Nihaaj"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Prof. Rangika Halwatura",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.Rangika.Halwatura.png"
            alt="Prof. Rangika Halwatura"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Piyaruwan Kaluthantirige",
        university: "Southern Alberta Institute of Technology, Calgary",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Piyaruwan.Kaluthantirige.png"
            alt="Dr. Piyaruwan Kaluthantirige"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Mining, Earth Resources Engineering",
    rank: 13,
    speakers: [
      {
        name: "Dr. Sureka Thiruchittampalam",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Sureka.Thiruchittampalam.png"
            alt="Dr. Sureka Thiruchittampalam"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Prof. Chulantha Jayawardena",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.Chulantha.Jayawardena.png"
            alt="Prof. Chulantha Jayawardena"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "A/Prof. Simit Raval",
        university: "UNSW Sydney, Australia",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.Simit.Raval.png"
            alt="A/Prof. Simit Raval"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Communication and Signal Processing",
    rank: 14,
    speakers: [
      {
        name: "Prof. Tharaka Samarasinghe",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.Tharaka.Samarasinghe.png"
            alt="Prof. Tharaka Samarasinghe"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Samiru Gayan",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Samiru.Gayan.png"
            alt="Dr. Samiru Gayan"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Prof. Madhusanka Liyanage",
        university: "",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.Madhusanka.Liyanage.png"
            alt="Prof. Madhusanka Liyanage"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Electronics, Control, and Instrumentation",
    rank: 15,
    speakers: [
      {
        name: "Dr. Sampath Perera",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Sampath.Perera.png"
            alt="Dr. Sampath Perera"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Wageesha Manamperi",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Wageesha.Manamperi.png"
            alt="Dr. Wageesha Manamperi"
            className="w-full h-full"
            objectFit="contain"
          />
        ),
      },
      {
        name: "Dr. Chamith Wijenayake",
        university: "University Of Queensland, Australia",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Chamith.Wijenayake.png"
            alt="Dr. Chamith Wijenayake"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Structural Engineering and Building Materials",
    rank: 16,
    speakers: [
      {
        name: "Dr. Chathura Rajapakse",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Chathura.Rajapakse.png"
            alt="Dr. Chathura Rajapakse"
            className="w-full h-full"
            objectFit="contain"
          />
        ),
      },
      {
        name: "Dr. Lakshitha Fernando",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Lakshitha.Fernando.png"
            alt="Dr. Lakshitha Fernando"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Hydraulics and Environmental Engineering",
    rank: 17,
    speakers: [
      {
        name: "Dr. Chamal Perera",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Chamal.Perera.png"
            alt="Dr. Chamal Perera"
            className="w-full h-full"
            objectFit="contain"
          />
        ),
      },
      {
        name: "Dr. (Mrs.) Sachithra Imbulana",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Sachithra.Imbulana.png"
            alt="Dr. (Mrs.) Sachithra Imbulana"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Janaka Bamunawala",
        university: "Tohoku University, Japan",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Janaka.Bamunawala.png"
            alt="Dr. Janaka Bamunawala"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Engineering Mathematics, Statistics",
    rank: 18,
    speakers: [
      {
        name: "Dr. (Ms.) J.A.B.U. Jayasinghe",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.J.A.B.U.Jayasinghe.png"
            alt="Dr. (Ms.) J.A.B.U. Jayasinghe"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Ms. D.R.T. Jayasundara",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.D.R.T.Jayasundara.png"
            alt="Ms. D.R.T. Jayasundara"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Transportation Engineering",
    rank: 19,
    speakers: [
      {
        name: "Dr. Chamod Hettiarachchi",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Chamod.Hettiarachchi.png"
            alt="Dr. Chamod Hettiarachchi"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Nalaka Jayantha",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Nalaka.Jayantha.png"
            alt="Dr. Nalaka Jayantha"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Prof. Wasantha Mampearachchi",
        university: "University of South Florida, US",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.Wasantha.Mampearachchi.png"
            alt="Prof. Wasantha Mampearachchi"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Biomedical Engineering",
    rank: 20,
    speakers: [],
  },
  {
    levelName: "Geotechnical Engineering",
    rank: 21,
    speakers: [
      {
        name: "Dr. Sampath Hewage",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Sampath.Hewage.png"
            alt="Dr. Sampath Hewage"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Prof. Nalin De Silva",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.Nalin.De.Silva.png"
            alt="Prof. Nalin De Silva"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Dilan Robert",
        university: "RMIT University, Australia",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Dilan.Robert.png"
            alt="Dr. Dilan Robert"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Micro/Nano Electro Mechanical Systems, Mechatronics, and Micromechatronics",
    rank: 22,
    speakers: [
      {
        name: "Prof. Y.W.R. Amarasinghe",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.Y.W.R.Amarasinghe.png"
            alt="Prof. Y.W.R. Amarasinghe"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Hiroki Tamura",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Hiroki.Tamura.png"
            alt="Dr. Hiroki Tamura"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Dzung Viet Dao",
        university: "Griffith School Of Engineering, Australia",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Dzung.Viet.Dao.png"
            alt="Dr. Dzung Viet Dao"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Software Engineering and Cloud Computing",
    rank: 23,
    speakers: [
      {
        name: "Dr. Kutila Gunasekara",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Kutila.Gunasekara.png"
            alt="Dr. Kutila Gunasekara"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Prof. Indika Perera",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.Indika.Perera.png"
            alt="Prof. Indika Perera"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. Ridwan Shariffdeen",
        university: "National University Of Singapore, Singapore",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Ridwan.Shariffdeen.png"
            alt="Dr. Ridwan Shariffdeen"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    levelName: "Technology Management",
    rank: 24,
    speakers: [
      {
        name: "Dr. Prasanna Illankoon",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Prasanna.Illankoon.png"
            alt="Dr. Prasanna Illankoon"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
      {
        name: "Dr. J.R Gamage",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.J.R.Gamage.png"
            alt="Dr. J.R Gamage"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
].sort((a, b) => a.levelName.localeCompare(b.levelName));

const conferenceChairLevels: SpeakerLevel[] = [
  {
    rank: 1,
    levelName: "Conference Chair",
    speakers: [
      {
        name: "Prof. Lidula N. Widanagama Arachchige",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Prof.Lidula.N.Widanagama.Arachchige.png"
            alt="Prof. Lidula N. Widanagama Arachchige"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    rank: 2,
    levelName: "Technical Program Committee Chair",
    speakers: [
      {
        name: "Dr. Chamira Edussooriya",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Chamira.Edussooriya.png"
            alt="Dr. Chamira Edussooriya"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    rank: 3,
    levelName: "Publication Committee Chair",
    speakers: [
      {
        name: "Dr. Dumith Jayathilaka",
        university: "University of Moratuwa, Sri Lanka",
        image: (
          <StaticImage
            src="../images/programming-committee/Dr.Dumith.Jayathilake.png"
            alt="Dr. Dumith Jayathilaka"
            className="w-full h-full"
            objectFit="cover"
          />
        ),
      },
    ],
  },
  {
    rank: 4,
    levelName: "IEEE Sri Lanka Section Representatives",
    speakers: [
      {
        name: "",
        university: "",
        image: (
          <StaticImage src="../images/programming-committee/.png" alt="" className="w-full h-full" objectFit="cover" />
        ),
      },
    ],
  },
];

const ieeeSriLankaChapterMembers: SpeakerLevel[] = [
  {
    rank: 1,
    levelName: "IEEE Computer Society Sri Lanka",
    speakers: [
      {
        name: "",
        university: "",
        image: (
          <StaticImage src="../images/programming-committee/.png" alt="" className="w-full h-full" objectFit="cover" />
        ),
      },
    ],
  },
  {
    rank: 2,
    levelName: ["IEEE Council on Electronic Design Automation", "IEEE Circuits and Systems Society Sri Lanka"],
    speakers: [
      {
        name: "",
        university: "",
        image: (
          <StaticImage src="../images/programming-committee/.png" alt="" className="w-full h-full" objectFit="cover" />
        ),
      },
    ],
  },
  {
    rank: 3,
    levelName: "IEEE Engineering in Medicine and Biology Society Sri Lanka",
    speakers: [
      {
        name: "",
        university: "",
        image: (
          <StaticImage src="../images/programming-committee/.png" alt="" className="w-full h-full" objectFit="cover" />
        ),
      },
    ],
  },
  {
    rank: 4,
    levelName: "IEEE Geoscience and Remote Sensing Society Sri Lanka",
    speakers: [
      {
        name: "",
        university: "",
        image: (
          <StaticImage src="../images/programming-committee/.png" alt="" className="w-full h-full" objectFit="cover" />
        ),
      },
    ],
  },
  {
    rank: 5,
    levelName: "IEEE Industrial Electronics Society Sri Lanka",
    speakers: [
      {
        name: "",
        university: "",
        image: (
          <StaticImage src="../images/programming-committee/.png" alt="" className="w-full h-full" objectFit="cover" />
        ),
      },
    ],
  },
  {
    rank: 6,
    levelName: "IEEE Industry Applications Society Sri Lanka",
    speakers: [
      {
        name: "",
        university: "",
        image: (
          <StaticImage src="../images/programming-committee/.png" alt="" className="w-full h-full" objectFit="cover" />
        ),
      },
    ],
  },
  {
    rank: 7,
    levelName: "IEEE Power & Energy Society Sri Lanka",
    speakers: [
      {
        name: "",
        university: "",
        image: (
          <StaticImage src="../images/programming-committee/.png" alt="" className="w-full h-full" objectFit="cover" />
        ),
      },
    ],
  },
  {
    rank: 8,
    levelName: "IEEE Signal Processing Society Sri Lanka",
    speakers: [
      {
        name: "",
        university: "",
        image: (
          <StaticImage src="../images/programming-committee/.png" alt="" className="w-full h-full" objectFit="cover" />
        ),
      },
    ],
  },
];

// --- Main Section Component ---
const TechnicalProgrammingCommittee = () => {
  return (
    <section className="w-full py-24 px-4 md:px-8 mt-10 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Main Page Title */}
        <SectionHeader headerText="Technical Programming Committee" textClass="text-black" />

        <SpeakerRankGraph speakerLevels={conferenceChairLevels} />

        <div className="my-20"></div>
        <SectionHeader headerText="Track Co-Chairs" textClass="text-black" />

        <SpeakerRankGraph speakerLevels={trackCoChairLevels} />

        {/* <div className="my-20"></div>
        <SectionHeader headerText="IEEE Sri Lanka Section Chapter Members" textClass="text-black" />

        <SpeakerRankGraph speakerLevels={ieeeSriLankaChapterMembers} /> */}
      </div>
    </section>
  );
};

export default TechnicalProgrammingCommittee;
