import styles from "./footer.module.css"
import LinkedinIcon from "./icon/linkedinIcon";
import InstaIcon from "./icon/instaIcon";
import MailIcon from "./icon/mailIcon";
import WhatsappIcon from "./icon/whatsappIcon";
import { Gilda_Display } from "next/font/google";

const gilda = Gilda_Display({ subsets: ["latin"], weight: "400" });

export default function Footer(){
    return(
        <div className={`${styles.background} flex flex-col items-center p-[80px] space-y-[40px]`}>
            <div className="flex flex-col items-center text-[16px]">
                <div className="text-[24px]">Contact Us</div>
                <div className={`${gilda.className} text-[48px]`}>Stay connected with Magna Partners!</div>
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-[100px]">
                <div className="flex space-x-3 items-center">
                    <div className="flex items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
                        <MailIcon size={15} color="white" />
                    </div>
                    <div>magna.partners@gmail.com</div>
                </div>
                <div className="flex space-x-3 items-center">
                    <div className="flex items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
                        <InstaIcon size={15} color="white" />
                    </div>
                    <div>@magna.partners</div>
                </div>
                <div className="flex space-x-3 items-center">
                    <div className="flex items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
                        <WhatsappIcon size={15} color="white" />
                    </div>
                    <div>+628999009029</div>
                </div>
                <div className="flex space-x-3 items-center">
                    <div className="flex items-center justify-center rounded-full border border-white w-[30px] h-[30px]">
                        <LinkedinIcon size={15} color="white"/>
                    </div>
                    <div>Magna Partners</div>
                </div>
            </div>
        </div>
    )
}