import { createFileRoute } from "@tanstack/react-router";
import { DubaiDentalV2 } from "@/components/v2/DubaiDentalV2";

export const Route = createFileRoute("/v2")({
  head: () => ({
    meta: [
      {
        title: "مركز دبي لطب وجراحة الأسنان — الهرم | Dubai Dental Clinic",
      },
      {
        name: "description",
        content:
          "مركز دبي لطب وتجميل الأسنان بالهرم: زراعة أسنان، تقويم شفاف، تجميل وفينيرز، وعلاج الجذور بإشراف نخبة من الأطباء. ٢٠ شارع عز الدين عمر، محطة العريش. هاتف: 01022013314.",
      },
      {
        property: "og:title",
        content: "مركز دبي لطب الأسنان بالهرم | Dubai Dental Clinic",
      },
      {
        property: "og:description",
        content:
          "رعاية تخصصية راقية لطب الأسنان بالهرم. جراحات الزراعة والتقويم وعلاج الجذور بدون ألم. هاتف: 01022013314.",
      },
    ],
  }),
  component: DubaiDentalV2,
});
