import logo from "../../../assets/images/logo_splash.jpg";

const LogoSection = () => {
  return (
<div className="w-1/2 bg-custom-blue flex items-center justify-center">
        <div className="bg-white rounded-full p-8">
          <img
            src={logo}
            alt="Illustration"
            className="w-48 h-auto"
          />
        </div>
      </div> 
  );
};

export default LogoSection;
