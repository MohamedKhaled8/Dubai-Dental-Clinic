import type { BlogPost } from "./types";

export const postsData: BlogPost[] = [
  {
    id: "first-dental-visit",
    slug: "what-to-expect-at-your-first-dental-visit",
    title: {
      ar: "ماذا تتوقع في زيارتك الأولى لطبيب الأسنان؟",
      en: "What to Expect at Your First Dental Visit",
    },
    excerpt: {
      ar: "دليل مبسط يوضح لك خطوات الاستشارة الأولى وكيف تحول الزيارة إلى تجربة هادئة ومريحة.",
      en: "A clear, reassuring walkthrough of your initial consultation and how to prepare comfortably.",
    },
    category: { ar: "دليل المراجع", en: "Patient Guide" },
    readTime: { ar: "٤ دقائق قراءة", en: "4 min read" },
    publishedAt: { ar: "أكتوبر ٢٠٢٦", en: "October 2026" },
    content: [
      {
        ar: "تبدأ الزيارة الناجحة في عيادات طب الأسنان دائماً بحوار مريح والاستماع الجيد. في مركز دبي لطب الأسنان بالهرم، لا نهدف إلى البدء في أي تدخل علاجي قبل أن يشعر المراجع بالاطمئنان التام، ويتعرف على الطبيب، ويشرح مشاكله أو مخاوفه السابقة.",
        en: "A rewarding dental visit begins with attentive listening. At Dubai Dental Clinic Al-Haram, our primary focus during your first visit is to understand your goals, listen to any previous dental concerns, and build mutual trust before deciding on any procedure.",
      },
      {
        ar: "تتضمن الجلسة الأولى فحصاً بصرياً دقيقاً لجميع الأسنان والأنسجة اللثوية، مع فحص مفصل الفك وطريقة الإطباق. وعند الحاجة، يتم التقاط صور شعاعية رقمية خفيفة الجرعة (Digital X-rays) أو مسح ثلاثي الأبعاد لفهم ما يحدث تحت سطح اللثة وبين الأسنان بدقة تامة.",
        en: "Your first appointment includes a comprehensive visual examination of teeth and gums, occlusal alignment, and jaw joint movement. When clinically appropriate, low-dose digital radiographs or optical scans are taken to evaluate what lies beneath the surface.",
      },
      {
        ar: "في نهاية الزيارة، يشرح الطبيب للمراجع تقرير الفحص بلغة بسيطة، ويعرض الخيارات العلاجية والبدائل مع جدول زمني مقترح وتفصيل مالي واضح، بحيث يغادر المراجع ولديه تصور كامل دون أي غموض أو ضغط.",
        en: "At the conclusion of the check-up, your doctor reviews the diagnostic findings in plain, accessible language, outlining potential options, timelines, and costs so you can make informed decisions at your own pace.",
      },
    ],
  },
  {
    id: "caring-for-childrens-teeth",
    slug: "caring-for-childrens-teeth",
    title: {
      ar: "العناية بأسنان طفلك: خطوات لبناء ابتسامة صحية منذ البداية",
      en: "Caring for Children's Teeth: Healthy Foundations from the Start",
    },
    excerpt: {
      ar: "نصائح عملية للوالدين حول تنظيف أسنان الرضع والأطفال والوقاية من تسوس الأسنان اللبنية المبكر.",
      en: "Practical pediatric guidance for parents on cleaning primary teeth and preventing early childhood caries.",
    },
    category: { ar: "طب أسنان الأطفال", en: "Pediatric Care" },
    readTime: { ar: "٥ دقائق قراءة", en: "5 min read" },
    publishedAt: { ar: "سبتمبر ٢٠٢٦", en: "September 2026" },
    content: [
      {
        ar: "يعتقد الكثيرون خطأً أن الأسنان اللبنية لا تحتاج إلى عناية كبيرة لأنها ستسقط في النهاية. لكن الحقيقة الطبية تؤكد أن الأسنان اللبنية تلعب دوراً محورياً في مساعدة الطفل على المضغ السليم، وتطور النطق، وحفظ المسافات اللازمة لظهور الأسنان الدائمة في مكانها الصحيح.",
        en: "A common misconception is that primary baby teeth do not require strict attention because they eventually fall out. In reality, primary teeth are essential for nutrition, speech development, and preserving space for incoming permanent teeth.",
      },
      {
        ar: "تبدأ العناية قبل بزوغ الأسنان بمسح لثة الرضيع بقطعة قماش ناعمة ومبللة بعد الرضاعة. ومع ظهور أول سن، يجب استخدام فرشاة أسنان مخصصة للأطفال ذات شعيرات ناعمة جداً مع كمية ضئيلة من معجون الأسنان بحجم حبة الأرز.",
        en: "Care begins even before the first tooth erupts by gently wiping infant gums with a soft damp cloth. As soon as the first tooth emerges, use a small, ultra-soft pediatric toothbrush with a smear of fluoride toothpaste the size of a rice grain.",
      },
      {
        ar: "كما يُنصح بتجنب نوم الطفل وفي فمه زجاجة الحليب أو العصائر المحلاة، لأن السكريات تبقى محيطة بالأسنان طوال ساعات الليل مسببة ما يعرف بـ«تسوس زجاجة الرضاعة» (Nursing Bottle Caries).",
        en: "Parents should also avoid letting toddlers fall asleep with bottles containing milk or juices, as lingering sugars pool around tooth enamel overnight, precipitating aggressive early childhood bottle decay.",
      },
    ],
  },
  {
    id: "how-dental-implants-are-planned",
    slug: "how-dental-implants-are-planned",
    title: {
      ar: "كيف يتم التخطيط لزراعة الأسنان الحديثة؟",
      en: "How Dental Implants Are Planned in Modern Practice",
    },
    excerpt: {
      ar: "نظرة متعمقة على دور الأشعة ثلاثية الأبعاد والتوجيه الحاسوبي في رفع نسب نجاح وأمان زراعة الأسنان.",
      en: "An inside look at how 3D CBCT tomography and digital surgical guides ensure precision implant outcomes.",
    },
    category: { ar: "زراعة الأسنان", en: "Implantology" },
    readTime: { ar: "٦ دقائق قراءة", en: "6 min read" },
    publishedAt: { ar: "أغسطس ٢٠٢٦", en: "August 2026" },
    content: [
      {
        ar: "تطورت زراعة الأسنان خلال العقدين الماضيين من إجراء يعتمد على التقدير السريري إلى علم رقمي موجه فائق الدقة. اليوم، لا تبدأ أي عملية زراعة موثوقة في مركز دبي لطب الأسنان دون دراسة مسبقة للأشعة المقطعية ثلاثية الأبعاد (CBCT).",
        en: "Dental implantology has evolved from an empirical surgical discipline into an exact digital science. At Dubai Dental Clinic, every implant journey begins with high-resolution 3D cone-beam computed tomography (CBCT).",
      },
      {
        ar: "تتيح هذه الأشعة للأخصائي رؤية مقاطع ميكرونية لعظام الفك، وقياس الارتفاع والعرض بدقة، وتحديد مسار العصب الفكي السفلي وحدود الجيوب الأنفية العلوية، مما يمنع حدوث أي إصابات تشريحية تماماً.",
        en: "This diagnostic modality provides sub-millimeter views of bone height, width, and trabecular density, allowing surgeons to precisely map mandibular nerve canals and maxillary sinus floors to ensure zero anatomical risk.",
      },
      {
        ar: "عبر برمجيات التخطيط الجراحي، يتم تصميم دليل جراحي (Surgical Stent) يطبع بتقنية الطباعة ثلاثية الأبعاد، ويوجه مثقاب الطبيب بالزاوية والعمق والموضع المحدد مسبقاً بنسبة خطأ لا تتجاوز كسور المليمتر، مما يقلل من حجم الجرح ويسرع الالتئام بشكل ملحوظ.",
        en: "Through computer-guided planning, custom 3D-printed surgical stents are fabricated to guide the implant drill at predetermined angulations and depths, minimizing soft-tissue disruption and speeding recovery.",
      },
    ],
  },
  {
    id: "daily-gum-care-basics",
    slug: "daily-gum-care-basics",
    title: {
      ar: "أساسيات العناية اليومية بصحة اللثة ومنع الالتهابات",
      en: "Daily Gum Care Basics: Protecting Your Periodontal Health",
    },
    excerpt: {
      ar: "عادات بسيطة ومثبتة علمياً تحمي أنسجة اللثة وتمنع النزيف وتراكم الجير بين الأسنان.",
      en: "Scientifically backed daily habits that strengthen gum attachments and prevent inflammation.",
    },
    category: { ar: "صحة اللثة", en: "Periodontics" },
    readTime: { ar: "٤ دقائق قراءة", en: "4 min read" },
    publishedAt: { ar: "يوليو ٢٠٢٦", en: "July 2026" },
    content: [
      {
        ar: "الأسنان السليمة تحتاج إلى لثة قوية تدعمها. للأسف، يعتقد البعض أن تنظيف أسطح الأسنان بالفرشاة فقط كافٍ للحفاظ على صحة الفم، متجاهلين أن نحو ٤٠٪ من أسطح الأسنان تقع في المساحات البينية الضيقة التي لا تصل إليها شعيرات الفرشاة العادية.",
        en: "Healthy teeth require a resilient periodontal foundation. Brushing only the outer and inner tooth surfaces cleans about 60% of dentition, leaving interdental contact zones vulnerable to bacterial biofilm build-up.",
      },
      {
        ar: "استخدام الخيط الطبي اليومي أو الفرشاة البينية (Interdental Brush) هو السبيل الوحيد لإزالة البلاك بين الأسنان ومنع تصلبه إلى جير يسبب التهاب اللثة ونزيفها. ينصح بتمرير الخيط بلطف حول انحناء كل سن دون الضغط العنيف على اللثة.",
        en: "Daily flossing or the use of calibrated interdental brushes is the only proven method to dislodge interproximal plaque before it calcifies into calculus. Curve the floss around the contour of each tooth gently without snapping into delicate papillae.",
      },
      {
        ar: "إذا لاحظت خروج قطرات من الدم أثناء تفريش الأسنان، فلا تتوقف عن التنظيف ظناً منك أنك تؤذي اللثة؛ النزيف علامة على وجود بكتيريا تحتاج إلى إزالة، مع ضرورة مراجعة طبيب الأسنان لفحص اللثة وتنظيف الجير المتراكم.",
        en: "If you notice minor bleeding while brushing, do not stop hygiene routines out of fear; bleeding indicates active bacterial inflammation. Maintain gentle care and schedule a professional cleaning to remove calcified deposits.",
      },
    ],
  },
];
