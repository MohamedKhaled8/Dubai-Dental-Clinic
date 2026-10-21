import { createFileRoute } from "@tanstack/react-router";
import { OrisDentalTemplate } from "@/components/OrisDentalTemplate";

export const Route = createFileRoute("/oris")({
  head: () => ({
    meta: [
      {
        title: "مركز دبي لطب الأسنان — رعاية تخصصية بالهرم | Dubai Dental Clinic",
      },
      {
        name: "description",
        content:
          "Specialist dental care in Al-Haram, Giza: 3D dental implants, clear aligners, root canals, and veneers at 20 Ezz El-Din Omar St. Call 01022013314.",
      },
    ],
  }),
  component: OrisDentalTemplate,
});
