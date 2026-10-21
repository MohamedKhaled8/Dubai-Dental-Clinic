import { createFileRoute } from "@tanstack/react-router";
import { DubaiDentalV2 } from "@/components/v2/DubaiDentalV2";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "مركز دبي لطب الأسنان — الهرم، الجيزة | Dubai Dental Clinic",
      },
      {
        name: "description",
        content:
          "مركز دبي التخصصي لطب وتجميل وزراعة الأسنان في الهرم، الجيزة (٢٠ شارع عز الدين عمر - محطة العريش). رعاية استشارية متكاملة لجراحة وزراعة الأسنان، علاج الجذور، والتقويم الشفاف. هاتف: 01022013314.",
      },
      {
        property: "og:title",
        content: "مركز دبي لطب الأسنان بالهرم | Dubai Dental Clinic",
      },
      {
        property: "og:description",
        content:
          "رعاية تخصصية لطب الأسنان بالهرم: زراعة أسنان، تقويم شفاف، تجميل وفينيرز، وعلاج الجذور. ٢٠ شارع عز الدين عمر، محطة العريش، الهرم. هاتف: 01022013314.",
      },
    ],
  }),
  component: DubaiDentalV2,
});
