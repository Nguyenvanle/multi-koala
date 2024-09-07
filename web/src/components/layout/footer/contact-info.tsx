import { CONTACT_INFO } from "@/types/layout/footer";

export const ContactInfo = () => (
  <div className="flex flex-col">
    <h5 className="font-bold mb-2">Contact Us</h5>
    <p className="text-sm">Email: {CONTACT_INFO.email}</p>
    <p className="text-sm">Phone: {CONTACT_INFO.phone}</p>
    <p className="text-sm">Address: {CONTACT_INFO.address}</p>
  </div>
);
