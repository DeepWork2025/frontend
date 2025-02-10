import BannerNavbar from "../components/banner/BannerNavbar";
import BannerContent from "../components/banner/BannerContent";

const Banner: React.FC = () => {
  return (
    <div className="banner-page">
      <BannerNavbar />
      <BannerContent />
    </div>
  );
};

export default Banner;
