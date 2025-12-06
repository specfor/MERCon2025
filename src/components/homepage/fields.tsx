import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link as GatsbyLink } from "gatsby";

const iconClass: string =
  "w-full h-full filter-[invert(53%)_sepia(68%)_saturate(466%)_hue-rotate(99deg)_brightness(93%)_contrast(88%)]";

const trackImages = {
  track1: (
    <StaticImage
      src="../../images/tracks/1y.png"
      alt="Data Science and Artificial Intelligence"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track2: (
    <StaticImage
      src="../../images/tracks/2y.png"
      alt="Biomedical Engineering"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track3: (
    <StaticImage
      src="../../images/tracks/3y.png"
      alt="Chemical Engineering"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track4: (
    <StaticImage src="../../images/tracks/4y.png" alt="Civil Engineering" objectFit="contain" className={iconClass} />
  ),
  track5: (
    <StaticImage
      src="../../images/tracks/5y.png"
      alt="Environmental Engineering"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track6: (
    <StaticImage
      src="../../images/tracks/6y.png"
      alt="Electronic Engineering"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track7: (
    <StaticImage
      src="../../images/tracks/7y.png"
      alt="Engineering Mathematics & Statistics"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track8: (
    <StaticImage src="../../images/tracks/8y.png" alt="Signal Processing" objectFit="contain" className={iconClass} />
  ),
  track9: (
    <StaticImage
      src="../../images/tracks/9y.png"
      alt="Materials Science and Engineering"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track10: (
    <StaticImage
      src="../../images/tracks/10y.png"
      alt="Mechanical Engineering Systems"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track11: (
    <StaticImage
      src="../../images/tracks/11y.png"
      alt="Micro/Nano Electro Mechanical Systems"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track12: (
    <StaticImage
      src="../../images/tracks/12y.png"
      alt="Mining and Mineral Exploration"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track13: (
    <StaticImage
      src="../../images/tracks/13y.png"
      alt="Electrical Machines & Solid State Drives"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track14: (
    <StaticImage
      src="../../images/tracks/14y.png"
      alt="Robotics and Intelligent Systems"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track15: (
    <StaticImage
      src="../../images/tracks/15y.png"
      alt="Software Engineering and Cloud Computing"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track16: (
    <StaticImage src="../../images/tracks/16y.png" alt="Sustainable Energy" objectFit="contain" className={iconClass} />
  ),
  track17: (
    <StaticImage
      src="../../images/tracks/17y.png"
      alt="Textile and Apparel"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track18: (
    <StaticImage
      src="../../images/tracks/18y.png"
      alt="Engineering Technology Management"
      objectFit="contain"
      className={iconClass}
    />
  ),
  track19: (
    <StaticImage
      src="../../images/tracks/19y.png"
      alt="Transportation Engineering and Logistics"
      objectFit="contain"
      className={iconClass}
    />
  ),
};

const ResearchFields: React.FC = () => (
  <div className="max-w-5xl mx-auto">
    <h3 className="text-base md:text-lg text-center text-gray-200 mb-12">
      MERCon 2025 solicits research papers describing significant & innovative research contributions to following areas
      of engineering. We will invite submissions on a wide range of research topics.
    </h3>

    <h3 className="text-2xl font-bold text-center text-white mb-12">
      Papers can be submitted to the conference under the following regular tracks.
    </h3>

    {/* Tracks Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 justify-items-center gap-10">
      {[
        { title: "Data Science and Artificial Intelligence", key: "track1" },
        { title: "Biomedical Engineering", key: "track2" },
        { title: "Chemical Engineering", key: "track3" },
        { title: "Civil Engineering", key: "track4" },
        { title: "Environmental Engineering", key: "track5" },
        { title: "Electronic Engineering", key: "track6" },
        { title: "Engineering Mathematics & Statistics", key: "track7" },
        { title: "Signal Processing", key: "track8" },
        { title: "Materials Science and Engineering", key: "track9" },
        { title: "Mechanical Engineering Systems", key: "track10" },
        { title: "Micro/Nano Electro Mechanical Systems, Mechatronics, and Micromechatronics", key: "track11" },
        { title: "Mining and Mineral Exploration", key: "track12" },
        { title: "Electrical Machines & Solid State Drives", key: "track13" },
        { title: "Robotics and Intelligent Systems", key: "track14" },
        { title: "Software Engineering and Cloud Computing", key: "track15" },
        { title: "Sustainable Energy", key: "track16" },
        { title: "Textile and Apparel", key: "track17" },
        { title: "Engineering Technology Management", key: "track18" },
        { title: "Transportation Engineering and Logistics", key: "track19" },
      ].map((track, index) => (
        <GatsbyLink key={index} to="/call-for-papers" className="block">
          <div className="flex flex-col items-center">
            <div className="border-2 w-full max-w-32 md:max-w-48 h-fit border-primary-800 rounded-3xl hover:border-primary-500 transition-all">
              <div className="w-full h-auto p-10 aspect-square rounded-4xl hover:scale-110">
                {trackImages[track.key as keyof typeof trackImages]}
              </div>
            </div>
            <p className="p-4 text-center text-gray-300 text-sm font-medium group-hover:text-primary-500 transition-colors grow flex items-start justify-center">
              {track.title}
            </p>
          </div>
        </GatsbyLink>
      ))}
    </div>
  </div>
);

export default ResearchFields;
