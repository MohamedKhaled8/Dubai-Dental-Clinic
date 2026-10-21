import { createFileRoute } from "@tanstack/react-router";
import { DentiaHomepage10 } from "@/components/DentiaHomepage10";

export const Route = createFileRoute("/dentia")({
  head: () => ({
    meta: [
      {
        title: "Dentia — Dentist & Dental Clinic Website | Homepage 10",
      },
      {
        name: "description",
        content:
          "Dentia Dentist & Dental Clinic Template - Expert Care, Smile Brighter, Healthy Teeth with interactive video background.",
      },
      {
        property: "og:title",
        content: "Dentia — Dentist & Dental Clinic Website",
      },
      {
        property: "og:description",
        content:
          "Dentia Homepage 10 with interactive background video, rotating animated headlines, and full dental clinic appointment booking.",
      },
    ],
  }),
  component: DentiaHomepage10,
});
