import amazonPayLogo from "../../assets/images/amazon-pay.png";
import amricanExpressLogo from "../../assets/images/American-Express-Color.png";
import mastercardPayLogo from "../../assets/images/mastercard.webp";
import paypalPayLogo from "../../assets/images/paypal.png";
import googlePlay from "../../assets/images/get-google-play.png";
import appStore from "../../assets/images/get-apple-store.png";
import { useSelector } from "react-redux";
export default function Footer() {
  const translation =useSelector((state)=>state.langSlicer.translation)

  return (
    <>
      <footer className=" mt-[100px] relative z-[999999] bg-black text-white py-4   dark:text-slate-100 dark:bg-gray-950">
        <div className="mx-auto customContainer">
          <h2 className="text-2xl font-semibold">{translation.GetApp}</h2>
          <p className="my-3">
          {translation.SendYou}{" "}
          </p>

          <div className="flex gap-4">
            <input
              type="text"
              className="form-control flex-grow p-3 rounded"
              placeholder="Email...."
            />
            <button className="btn transition-all rounded p-2 bg-main border hover:bg-slate-400 hover:text-black font-semibold text-white">{translation.appLink}</button>
          </div>

          <div className="flex flex-wrap justify-between items-center p-2 my-3">
            <div className=" flex flex-wrap w-full mb-2 md:mb-0 md:w-1/2   gap-2 items-center">
              <span className="font-semibold">Payments Partners</span>
              <div className="flex flex-wrap gap-2 items-center">
                <img src={amazonPayLogo} className="w-16" alt="" />
                <img src={amricanExpressLogo} className="w-16" alt="" />
                <img src={mastercardPayLogo} className="w-16" alt="" />
                <img src={paypalPayLogo} className="w-16" alt="" />
              </div>
            </div>
            <div className="flex flex-wrap w-full  md:w-1/2 gap-2 items-center">
              <span className="font-semibold">{translation.getdel}</span>
              <div className="flex gap-2 items-center">
                <img src={googlePlay} className="w-16" alt="" />
                <img src={appStore} className="w-16" alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
