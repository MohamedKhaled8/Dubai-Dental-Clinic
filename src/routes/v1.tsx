import { createFileRoute } from "@tanstack/react-router";
import { OrisDentalTemplate } from "@/components/OrisDentalTemplate";

export const Route = createFileRoute("/v1")({
  head: () => ({
    meta: [
      {
        title: "Dubai Dental Clinic | عيادة دبي لطب الأسنان",
      },
      {
        name: "description",
        content:
          "Dubai Dental Clinic - Specialist dental care in cosmetic dentistry, guided implants, and aligners.",
      },
      {
        property: "og:title",
        content: "Dubai Dental Clinic | عيادة دبي لطب الأسنان",
      },
      {
        property: "og:description",
        content:
          "Specialist dental care with 3D digital planning, guided implants, and certified consultants.",
      },
    ],
  }),
  component: OrisDentalTemplate,
});
