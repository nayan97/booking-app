import Marquee from "react-fast-marquee";

const clientLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
  "https://1000logos.net/wp-content/uploads/2021/11/Nike-Logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Microsoft_logo_(2012).svg"
];

const ClientsSection = () => {
  return (
    <div className="bg-amber-50 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Trusted by Top Brands</h2>
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {clientLogos.map((logo, idx) => (
          <div key={idx} className="mx-8">
            <img src={logo} alt={`Client ${idx + 1}`} className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition duration-300" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientsSection;
