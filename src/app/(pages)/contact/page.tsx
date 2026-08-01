import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { PageHero } from "@/components/sections/contact/PageHero";
import { SocialLinks } from "@/components/sections/contact/SocialLinks";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero />
      <ContactForm />
      <ContactInfo />
      <SocialLinks />
    </div>
  );
}
