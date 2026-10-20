import { ContactPageData } from "@/types/contactPage";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";

type Props = {
  data: {
    info: ContactPageData["contactInformation"],
    form: ContactPageData["contactForm"]
  }
}

const ContactSection = ({data}:Props) => {
  return (
    <section className="bg-secondary-backgound px-5 py-20 md:px-8 md:py-26 lg:py-32">
      <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex w-full lg:col-span-5">
          <ContactInformation data={data.info}/>
        </div>

        <div className="flex w-full lg:col-span-7">
          <ContactForm data={data.form}/>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;