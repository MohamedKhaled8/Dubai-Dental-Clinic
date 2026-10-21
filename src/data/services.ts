import type { Service } from "./types";

export const servicesData: Service[] = [
  {
    id: "dental-implants",
    slug: "dental-implants",
    name: { ar: "زراعة الأسنان", en: "Dental Implants" },
    tagline: {
      ar: "تعويض دائم وثابت للأسنان المفقودة بجذور تيتانيوم حيوية",
      en: "Permanent root replacement using biocompatible titanium fixtures",
    },
    iconName: "Anchor",
    overview: [
      {
        ar: "زراعة الأسنان هي المعيار الذهبي لتعويض سن أو أكثر مفقود. تتكون الزرعة من دعامة صغيرة مصنوعة من التيتانيوم الطبي توضع في عظم الفك جراحياً لتلتحم به حيوياً وتعمل كجذر بديل يحمل تاجاً خزفياً مطابقاً لشكل ولون الأسنان الطبيعية.",
        en: "Dental implants represent the modern standard for replacing missing teeth. A biocompatible titanium post is placed into the jawbone, where it naturally integrates over time to anchor a custom crown that matches your natural smile.",
      },
      {
        ar: "نبدأ في مركز دبي لطب الأسنان بالهرم بفحص سريري شامل مدعوم بالأشعة المقطعية ثلاثية الأبعاد (CBCT) لتقييم كثافة العظم وموقع الأعصاب والجيوب الأنفية، مما يتيح للأخصائي وضع خطة موجهة ودقيقة تلائم حالتك تماماً.",
        en: "At Dubai Dental Clinic Al-Haram, we begin with comprehensive clinical examination and 3D CBCT imaging to evaluate bone volume and anatomical boundaries, allowing our specialists to plan a precise, guided treatment tailored to you.",
      },
      {
        ar: "تساعد الزراعة في الحفاظ على عظام الفك من التآكل التدريجي بعد الخلع، وتحمي الأسنان المجاورة من الميل أو التحرك، وتعيد القدرة الطبيعية على مضغ الطعام والتحدث بثقة.",
        en: "Implants help preserve jawbone structure that naturally recedes after tooth loss, stabilize neighboring teeth from shifting, and restore natural chewing function and confidence.",
      },
    ],
    whoItIsFor: [
      { ar: "من فقد سناً أو أكثر ويرغب في حل دائم دون برد الأسنان المجاورة", en: "Patients missing one or more teeth seeking a permanent solution without trimming adjacent teeth" },
      { ar: "من يعاني من صعوبة المضغ بسبب فقدان الضروس الخلفية", en: "Individuals experiencing chewing difficulties due to lost molars" },
      { ar: "من يرغب في تثبيت أطقم الأسنان غير المستقرة", en: "Those looking to securely stabilize removable dentures" },
      { ar: "البالغون الذين اكتمل نمو الفكين لديهم ويتمتعون بصحة لثوية جيدة", en: "Adults with completed jaw growth and manageable oral health" },
    ],
    whatToExpect: [
      {
        title: { ar: "١. الفحص والمسح الرقمي ثلاثي الأبعاد", en: "1. Comprehensive 3D Evaluation" },
        desc: {
          ar: "فحص سريري كامل، وأشعة مقطعية CBCT لتقييم العظم، مع مناقشة واضحة لكافة البدائل والخطوات.",
          en: "Clinical exam and 3D CBCT scan to evaluate bone volume, accompanied by a clear discussion of all options.",
        },
      },
      {
        title: { ar: "٢. تثبيت دعامة التيتانيوم الموجهة", en: "2. Precision Fixture Placement" },
        desc: {
          ar: "إجراء جراحي دقيق تحت التخدير الموضعي لوضع زرعة التيتانيوم في موضعها المخطط له.",
          en: "Delicate surgical placement of the titanium implant post in its planned position under local anesthesia.",
        },
      },
      {
        title: { ar: "٣. مرحلة الاندماج العظمي والالتئام", en: "3. Healing & Osseointegration" },
        desc: {
          ar: "فترة تمتد من شهرين إلى عدة أشهر يلتحم خلالها العظم بالزرعة؛ يتم توفير حلول مؤقتة عند الحاجة التجميلية.",
          en: "A period where bone integrates with the titanium surface; aesthetic temporary options are provided as needed.",
        },
      },
      {
        title: { ar: "٤. أخذ الطبعة الرقمية وتثبيت التاج الدائم", en: "4. Digital Scan & Permanent Crown" },
        desc: {
          ar: "مسح رقمي دقيق لتصنيع تاج من الزيركون أو الإيماكس وتثبيته ومراجعة الإطباق والتناسق.",
          en: "Digital intraoral scan to craft a custom Zirconia or E-max crown, followed by final bonding and bite balance check.",
        },
      },
    ],
    faqs: [
      {
        q: { ar: "هل زراعة الأسنان تناسب كبار السن أو مرضى السكري؟", en: "Are implants suitable for seniors or individuals with diabetes?" },
        a: {
          ar: "نعم، في حال كان السكري منتظماً ومسيطر عليه، ومع التقييم الطبي الصحيح، فإن الزراعة تناسب مختلف الأعمار بعد اكتمال نمو الفك.",
          en: "Yes, provided systemic conditions like diabetes are well-managed and monitored. Implants can be performed successfully across adult age groups.",
        },
      },
      {
        q: { ar: "كم تستغرق جلسة الزراعة نفسها؟", en: "How long does the implant placement procedure take?" },
        a: {
          ar: "تستغرق الجراحة للسن الواحد عادة بين ٣٠ إلى ٦٠ دقيقة تحت التخدير الموضعي، وتتم بأعلى درجات الهدوء والتعقيم.",
          en: "A single implant placement typically takes between 30 to 60 minutes under local anesthesia in a sterile, calm environment.",
        },
      },
      {
        q: { ar: "هل أحتاج إلى زراعة عظم قبل الإجراء؟", en: "Will I need bone grafting prior to implant placement?" },
        a: {
          ar: "يحدد ذلك الفحص والأشعة المقطعية؛ إذا كان الفقد قديماً وتآكل العظم، قد ينصح الأخصائي بإضافة عظمي لضمان ثبات الزرعة.",
          en: "This depends on bone dimensions on your 3D scan. If bone volume has receded, guided bone augmentation may be recommended for lasting stability.",
        },
      },
      {
        q: { ar: "كم تدوم زرعة الأسنان؟", en: "How long can a dental implant last?" },
        a: {
          ar: "مع العناية اليومية الجيدة، وتنظيف الأسنان بالفرشاة والخيط، والمتابعة الدورية كل ٦ أشهر، يمكن أن تدوم الزرعة لعقود طويلة.",
          en: "With thorough daily oral hygiene, flossing, and regular dental check-ups every 6 months, dental implants can function reliably for decades.",
        },
      },
    ],
    relatedDoctorIds: ["amr-adel", "ahmed-hany"],
    visible: true,
    needsConfirmation: false,
  },
  {
    id: "scaling-polishing",
    slug: "scaling-polishing",
    name: { ar: "تنظيف وتلميع الأسنان", en: "Scaling & Polishing" },
    tagline: {
      ar: "إزالة الجير المتراكم والتصبغات للحفاظ على صحة اللثة وانتعاش الفم",
      en: "Ultrasonic removal of hardened plaque and stains for healthy gums",
    },
    iconName: "Sparkles",
    overview: [
      {
        ar: "تنظيف الأسنان الاحترافي هو خط الدفاع الأول لصحة الفم واللثة. يقوم الطبيب باستخدام أجهزة الموجات فوق الصوتية الدقيقة لإزالة الترسبات الجيرية والبكتيرية التي تتصلب حول أعناق الأسنان وتحت خط اللثة ولا يمكن للفرشاة المنزلية إزالتها.",
        en: "Professional dental scaling is the cornerstone of oral and periodontal health. Using calibrated ultrasonic instruments, your dentist removes calcified plaque and bacterial deposits beneath and around the gumline that everyday brushing cannot reach.",
      },
      {
        ar: "يعقب التنظيف تلميع ناعم لسطح الأسنان بمعجون طبي يزيل التصبغات السطحية الناتجة عن القهوة أو الشاي أو التدخين، مما يعيد للأسنان ملمسها الأملس ويقلل من سرعة التصاق الجير مستقبلاً.",
        en: "Scaling is followed by gentle paste polishing to remove extrinsic stains caused by tea, coffee, or smoking, restoring smooth enamel surfaces and reducing future plaque adhesion.",
      },
    ],
    whoItIsFor: [
      { ar: "لكل مراجع كإجراء وقائي دوري كل ٦ أشهر للحفاظ على صحة الفم", en: "Every individual as a routine preventive visit every 6 months" },
      { ar: "من يلاحظ نزيفاً بسيطاً في اللثة أثناء تفريش الأسنان", en: "Those noticing minor bleeding while brushing" },
      { ar: "من يعاني من تصبغات ناتجة عن المشروبات أو التدخين", en: "Anyone with surface stains from beverages or smoking" },
      { ar: "من يعاني من رائحة فم غير مستحبة ناتجة عن تراكم الجير", en: "Those experiencing persistent breath concerns linked to plaque" },
    ],
    whatToExpect: [
      {
        title: { ar: "١. فحص اللثة والأسنان", en: "1. Periodontal Examination" },
        desc: {
          ar: "تقييم سريري شامل لحالة اللثة وعمق الجيوب اللثوية ورصد أي مؤشرات للالتهاب.",
          en: "Assessment of gum margins and pocket depths to identify any signs of inflammation.",
        },
      },
      {
        title: { ar: "٢. إزالة الجير بالموجات فوق الصوتية", en: "2. Ultrasonic Tartar Removal" },
        desc: {
          ar: "تفتيت الترسبات الجيرية بأداة مائية دقيقة ومريحة دون خدش طبقة المينا.",
          en: "Gentle disintegration of hard deposits using water-cooled ultrasonic micro-vibrations.",
        },
      },
      {
        title: { ar: "٣. التلميع وإرشادات العناية", en: "3. Polishing & Home-Care Advice" },
        desc: {
          ar: "تلميع لطيف للأسنان وشرح وافٍ لطريقة استخدام الخيط والفرشاة المناسبة لحالتك.",
          en: "Fine polish to smooth enamel, followed by personalized guidance on brushing and flossing technique.",
        },
      },
    ],
    faqs: [
      {
        q: { ar: "هل تنظيف الجير يضعف مينا الأسنان أو يسبب فراغات؟", en: "Does scaling weaken enamel or create artificial gaps?" },
        a: {
          ar: "لا إطلاقاً؛ تنظيف الأسنان يزيل طبقة الجير المتراكمة فقط ولا يؤثر على المينا. الفراغات التي قد يلاحظها البعض هي المساحات الطبيعية بين الأسنان التي كان الجير المتورم يملؤها.",
          en: "No. Scaling only removes calcified calculus and does not remove enamel. Any perceived spaces are natural tooth contours previously blocked by swollen gums and plaque.",
        },
      },
      {
        q: { ar: "كم مرة يجب تنظيف الأسنان عند الطبيب؟", en: "How often should I have my teeth professionally cleaned?" },
        a: {
          ar: "يُنصح عموماً بجلسة وقائية كل ٦ أشهر، وقد يوصي الطبيب بفترات أقصر في حال وجود استعداد وراثي لتراكم الجير أو التهاب اللثة.",
          en: "Every 6 months is generally recommended for healthy maintenance, though patients with periodontal history may benefit from visits every 3 to 4 months.",
        },
      },
      {
        q: { ar: "هل جلسة التنظيف مؤلمة؟", en: "Is the cleaning appointment uncomfortable?" },
        a: {
          ar: "الإجراء مريح بوجه عام. في حال كانت الأسنان حساسة، يمكن للطبيب تعديل قوة الجهاز أو وضع جل مهدئ لضمان راحتك التامة.",
          en: "The procedure is gentle and non-invasive. For patients with root sensitivity, topical soothing gels or calibrated low-vibration settings ensure comfort.",
        },
      },
      {
        q: { ar: "ما الفرق بين تنظيف الأسنان وتبييض الأسنان؟", en: "What is the difference between scaling and teeth whitening?" },
        a: {
          ar: "التنظيف يزيل الجير والتصبغات الخارجية السطحية ويعيد السن للونه الطبيعي، بينما التبييض يعالج لون السن الداخلي باستخدام مواد تفتيح مخصصة.",
          en: "Scaling removes tartar and extrinsic stains to restore your natural tooth shade, whereas whitening alters internal tooth shade using active brightening agents.",
        },
      },
    ],
    relatedDoctorIds: ["ahmed-karam"],
    visible: true,
    needsConfirmation: false,
  },
  {
    id: "pediatric-dentistry",
    slug: "pediatric-dentistry",
    name: { ar: "طب أسنان الأطفال", en: "Pediatric Dentistry" },
    tagline: {
      ar: "رعاية هادئة ومطمئنة تصنع علاقة إيجابية تدوم مع طبيب الأسنان",
      en: "Gentle, fear-free dental care building positive lifelong habits",
    },
    iconName: "Baby",
    overview: [
      {
        ar: "طب أسنان الأطفال في مركز دبي لطب الأسنان مصمم بالكامل حول نفسية الطفل. ندرك أن التجربة الأولى قد تشكل نظرة الطفل لطبيب الأسنان طوال حياته، ولذلك نعتمد أسلوباً هادئاً وودوداً يشجع الطفل ويزيل أي خوف أو توتر.",
        en: "Pediatric dental care at Dubai Dental Clinic is crafted around a child's comfort and emotional well-being. We understand that early visits shape lifelong attitudes toward oral health, which is why our approach is patient, gentle, and warm.",
      },
      {
        ar: "يقدم أخصائي أسنان الأطفال د. عمر مخلوف فحصاً شاملاً للأسنان اللبنية ومتابعة بزوغ الأسنان الدائمة، وجلسات الفلورايد المقوي للمينا، وسد الشقوق المانع للتسوس (Fissure Sealants)، بالإضافة لعلاج التسوس بلطف وتوجيه الوالدين.",
        en: "Dr. Omar Makhlouf provides comprehensive monitoring of baby teeth, eruption guides for permanent dentition, enamel-strengthening fluoride applications, fissure sealants, and conservative decay treatment with parent guidance.",
      },
    ],
    whoItIsFor: [
      { ar: "الأطفال من سن ظهور أول سن (حوالي عمر سنة) للفحص الوقائي", en: "Infants from the arrival of the first tooth for early preventive guidance" },
      { ar: "الأطفال الذين يعانون من تسوس مبكر أو ألم في الأسنان اللبنية", en: "Children with early childhood caries or sensitive teeth" },
      { ar: "الأطفال الذين يشعرون بالخوف أو القلق من زيارة الطبيب", en: "Children who feel anxious or apprehensive about clinic visits" },
      { ar: "الوالدون الراغبون في وضع خطة وقائية تحمي أسنان أطفالهم", en: "Parents seeking structured preventive routines and dietary guidance" },
    ],
    whatToExpect: [
      {
        title: { ar: "١. استقبال هادئ والتعرف على العيادة", en: "1. Gentle Welcome & Familiarization" },
        desc: {
          ar: "مساحة لطيفة يتعرف فيها الطفل على الطبيب والأدوات بأسلوب تفاعلي مريح دون أي ضغط.",
          en: "A welcoming introduction where your child gets familiar with the doctor and environment at their own pace.",
        },
      },
      {
        title: { ar: "٢. فحص دوري دقيق", en: "2. Thorough Check-Up" },
        desc: {
          ar: "معاينة الأسنان اللبنية ونمو الفكين والتأكد من سلامة اللثة وخلوها من التسوس.",
          en: "Careful check of primary teeth, gum margins, and jaw alignment to detect any early decay.",
        },
      },
      {
        title: { ar: "٣. الإجراء الوقائي وإرشاد الوالدين", en: "3. Preventive Care & Parent Guidance" },
        desc: {
          ar: "تطبيق جلسة الفلورايد أو العلاج اللازم مع نصائح مبسطة للطفل وللأسرة للعناية المنزلية.",
          en: "Application of protective fluoride or conservative treatment, with practical home-care tips for the family.",
        },
      },
    ],
    faqs: [
      {
        q: { ar: "متى يجب أن تكون الزيارة الأولى لطفلي لطبيب الأسنان؟", en: "When should my child's first dental appointment take place?" },
        a: {
          ar: "توصي الجمعيات الدولية لطب الأسنان بأن تكون الزيارة الأولى مع ظهور أول سن لبني أو بحلول عامه الأول للاطمئنان والتوجيه الوقائي.",
          en: "International pediatric associations recommend the first visit by the eruption of the first tooth or by the child's first birthday.",
        },
      },
      {
        q: { ar: "لماذا نهتم بالأسنان اللبنية طالما أنها ستتبدل لاحقاً؟", en: "Why treat primary baby teeth if they will eventually fall out?" },
        a: {
          ar: "الأسنان اللبنية تحافظ على المسافات المناسبة للأسنان الدائمة وتساعد على النطق السليم والمضغ؛ إهمال تسوسها قد يضر ببراعم الأسنان الدائمة تحتها.",
          en: "Baby teeth hold the space for incoming permanent teeth and facilitate proper speech and nutrition. Untreated decay can affect the developing permanent tooth buds underneath.",
        },
      },
      {
        q: { ar: "كيف أهيئ طفلي للزيارة الأولى في المنزل؟", en: "How should I prepare my child at home before their visit?" },
        a: {
          ar: "تحدث بإيجابية وبكلمات بسيطة مثل «سنذهب لنتعرف على صديقنا الطبيب لنعد أسنانك الجميلة»، وتجنب استخدام كلمات مثل «إبرة» أو «ألم».",
          en: "Keep explanations simple and encouraging. Frame it as a fun visit to count teeth, avoiding fear-triggering words like 'shots' or 'pain'.",
        },
      },
      {
        q: { ar: "ما هي مادة سد الشقوق (Fissure Sealant)؟", en: "What are dental fissure sealants?" },
        a: {
          ar: "طبقة واقية شفافة توضع على التجاويف العميقة في الضروس الخلفية لتمنع استقرار بقايا الطعام والبكتيريا، مما يقلل خطر التسوس بنسبة كبيرة.",
          en: "A clear protective coating applied into the deep grooves of permanent molars to block food debris and bacteria from causing decay.",
        },
      },
    ],
    relatedDoctorIds: ["omar-makhlouf"],
    visible: true,
    needsConfirmation: false,
  },
  {
    id: "orthodontics",
    slug: "orthodontics",
    name: { ar: "تقويم الأسنان", en: "Orthodontics" },
    tagline: {
      ar: "تحسين اصطفاف الأسنان وتوازن العضة للبالغين والمراهقين",
      en: "Aligning teeth and perfecting occlusal balance for teens and adults",
    },
    iconName: "AlignCenter",
    overview: [
      {
        ar: "تقويم الأسنان ليس مجرد تجميل للابتسامة، بل هو علاج وظيفي متكامل يعيد توزيع قوى المضغ بشكل سليم، ويصحح تزاحم أو تباعد الأسنان، ويحسن إطباق الفكين العلوي والسفلي، مما يسهل تنظيف الأسنان ويحميها من التآكل غير المتكافئ.",
        en: "Orthodontic treatment goes beyond aesthetic realignment; it balances chewing forces, corrects crowding and spacing, and aligns the upper and lower jaws for optimal joint health and easier daily hygiene.",
      },
      {
        ar: "يقوم أخصائي التقويم د. شريف فتحي بدراسة شاملة للصور الشعاعية والقياسات الرقمية لتحديد نوع التقويم الملائم لحالتك، سواء التقويم المعدني الدقيق أو التقويم الشفاف (Aligners) أو الخزفي.",
        en: "Orthodontist Dr. Sherif Fathy conducts thorough cephalometric and 3D digital assessments to determine the most effective system for your needs, from ceramic and metal appliances to clear aligners.",
      },
    ],
    whoItIsFor: [
      { ar: "من يعاني من تزاحم أو تراكب في الأسنان الأمامية أو الخلفية", en: "Those with crowded, overlapping, or rotated teeth" },
      { ar: "من لديه فراغات واسعة بين الأسنان تؤثر على الابتسامة", en: "Patients with noticeable gaps or spacing issues" },
      { ar: "حالات عدم تطابق العضة (العضة المفتوحة، العميقة، أو المعكوسة)", en: "Bite discrepancies including overbite, underbite, and crossbite" },
      { ar: "المراهقون والبالغون الراغبون في ابتسامة متناسقة وثابتة", en: "Teens and adults looking for long-term dental alignment and harmony" },
    ],
    whatToExpect: [
      {
        title: { ar: "١. الاستشارة والتحليل الإشعاعي", en: "1. Consultation & Diagnostic Cephalometrics" },
        desc: {
          ar: "أخذ القياسات والصور والأشعة البانورامية والسيفالومترية لتحليل علاقة الأسنان بالفكين.",
          en: "Cephalometric and panoramic imaging alongside dental impressions to map your unique bite architecture.",
        },
      },
      {
        title: { ar: "٢. مناقشة خطة العلاج ونوع الجهاز", en: "2. Treatment Plan Discussion" },
        desc: {
          ar: "عرض الخيارات (المعدني، الخزفي، أو الشفاف) وتحديد المدة التقديرية وجدول الزيارات.",
          en: "Reviewing appliance options (metal, ceramic, or clear aligners) with estimated timeline and visit schedule.",
        },
      },
      {
        title: { ar: "٣. تركيب التقويم والمتابعة الدورية", en: "3. Fitting & Routine Adjustments" },
        desc: {
          ar: "تثبيت الجهاز بدقة وزيارات شهرية لمتابعة حركة الأسنان وتعديل القوى تدريجياً.",
          en: "Precise bracket or aligner delivery, followed by periodic monthly reviews to guide tooth movements.",
        },
      },
      {
        title: { ar: "٤. التثبيت النهائي (Retention)", en: "4. Retention Phase" },
        desc: {
          ar: "إزالة الجهاز وتركيب مثبت شفاف أو سلكي دائم للحفاظ على استقرار النتيجة لسنوات طويلة.",
          en: "Removal of appliances and fitting of fixed or removable retainers to maintain results permanently.",
        },
      },
    ],
    faqs: [
      {
        q: { ar: "هل يناسب تقويم الأسنان البالغين بعد سن الثلاثين؟", en: "Can adults over 30 benefit from orthodontic treatment?" },
        a: {
          ar: "نعم تماماً، تتحرك الأسنان بالاستجابة للضغط الحيوي في أي عمر طالما كانت اللثة وعظام الفك سليمة وصحية.",
          en: "Absolutely. Teeth respond to gentle calibrated forces at any age, provided the gums and supporting bone are healthy.",
        },
      },
      {
        q: { ar: "كم تستغرق مدة علاج تقويم الأسنان عادة؟", en: "How long does orthodontic treatment typically take?" },
        a: {
          ar: "تتراوح المدة عادة بين ٦ أشهر إلى ١٨ شهراً حسب درجة التزاحم أو صعوبة العضة، ويتم توضيح ذلك في أول استشارة.",
          en: "Treatment usually spans from 6 to 18 months depending on complexity, which the specialist explains during consultation.",
        },
      },
      {
        q: { ar: "هل يسبب التقويم ألماً؟", en: "Does braces adjustment cause pain?" },
        a: {
          ar: "قد يشعر المراجع بضغط خفيف أو حساسية بسيطة في الأيام الأولى بعد الشد، وهو شعور طبيعي يزول سريعاً.",
          en: "Patients may feel mild pressure or soreness for 2 to 3 days after each adjustment as teeth begin moving; this subsides quickly.",
        },
      },
      {
        q: { ar: "هل التقويم الشفاف مناسب لجميع الحالات؟", en: "Are clear aligners suitable for all orthodontic cases?" },
        a: {
          ar: "يناسب التقويم الشفاف أغلب حالات التزاحم الخفيف إلى المتوسط، بينما قد تفضل الأجهزة الثابتة في بعض الحالات الجراحية أو المعقدة.",
          en: "Clear aligners are highly effective for mild to moderate crowding and spacing, though complex skeletal bite issues may benefit more from fixed systems.",
        },
      },
    ],
    relatedDoctorIds: ["sherif-fathy"],
    visible: true,
    needsConfirmation: false,
  },
  {
    id: "dental-veneers",
    slug: "dental-veneers",
    name: { ar: "فينير الأسنان وتصميم الابتسامة", en: "Dental Veneers & Smile Design" },
    tagline: {
      ar: "عدسات خزفية بالغة الرقة لتحسين مظهر وتناسق ولون الأسنان الأمامية",
      en: "Ultra-thin ceramic shells enhancing front tooth shape, symmetry, and shade",
    },
    iconName: "Smile",
    overview: [
      {
        ar: "عدسات الفينيرز هي قشور خزفية مخصصة وفائقة الرقة تُصنع من خامات السيراميك النقي مثل الإيماكس (E-max)، ويتم تثبيتها بعناية على السطح الأمامي للأسنان لمعالجة التصبغات العميقة، التآكل، أو التفاوت في أطوال وأشكال الأسنان.",
        en: "Dental veneers are micro-thin, custom-crafted ceramic facings made of high-translucency materials such as E-max. They bond securely to the front surface of teeth to correct deep discoloration, minor chips, and asymmetry.",
      },
      {
        ar: "نعتمد في مركز دبي لطب الأسنان على مفهوم التحضير الدقيق المحافظ (Minimal-Prep) للحفاظ على أكبر قدر ممكن من مينا السن الطبيعية، مع محاكاة بصرية رقمية لشكل الابتسامة قبل اتخاذ أي قرار نهائي.",
        en: "At Dubai Dental Clinic, we focus on conservative, minimal-preparation techniques to preserve natural enamel integrity, paired with aesthetic pre-visualization before final bonding.",
      },
    ],
    whoItIsFor: [
      { ar: "من يعاني من تصبغات داخلية عميقة لا تستجيب للتبييض التقليدي", en: "Patients with intrinsic stains unresponsive to standard bleaching" },
      { ar: "الأسنان المتشققة أو المتآكلة الحواف", en: "Teeth with chipped edges or uneven wear" },
      { ar: "من لديه فوارق طفيفة أو عدم انتظام في أشكال الأسنان الأمامية", en: "Those looking to harmonize slightly uneven front teeth" },
      { ar: "من يرغب في ابتسامة مشرقة ومتقنة بمظهر طبيعي غير مصطنع", en: "Individuals seeking a refined, luminous smile with natural light reflection" },
    ],
    whatToExpect: [
      {
        title: { ar: "١. الاستشارة الجمالية وتصميم الابتسامة", en: "1. Aesthetic Consultation & Mockup" },
        desc: {
          ar: "دراسة ملامح الوجه وحركة الشفاه واختيار درجة اللون وشكل الأسنان المتناسق مع شخصيتك.",
          en: "Detailed evaluation of smile dynamics, lip lines, and shade matching in natural light.",
        },
      },
      {
        title: { ar: "٢. التجهيز المحافظ وأخذ الطبعة الرقمية", en: "2. Conservative Prep & Digital Scan" },
        desc: {
          ar: "صقل ميكروني سطحي خفيف وأخذ مسح رقمي ثلاثي الأبعاد يُرسل للمعمل التخصصي.",
          en: "Subtle micro-preparation and 3D intraoral optical scanning sent to master ceramic technicians.",
        },
      },
      {
        title: { ar: "٣. التثبيت والمراجعة الدقيقة", en: "3. Precision Bonding & Occlusion Check" },
        desc: {
          ar: "تجربة العدسات والتأكد من مطابقة اللون والشكل قبل التثبيت الدائم بمواد لاصقة متطورة.",
          en: "Try-in phase to confirm aesthetics and comfort, followed by permanent adhesive bonding and bite check.",
        },
      },
    ],
    faqs: [
      {
        q: { ar: "هل يتطلب الفينير نحتاً كبيراً للأسنان؟", en: "Do veneers require extensive tooth shaving?" },
        a: {
          ar: "في تقنيات الفينير الحديثة المحافظة، يكون الصقل في حدود أجزاء من المليمتر فقط في طبقة المينا، وبعض الحالات قد تتطلب تحضيراً طفيفاً جداً.",
          en: "Modern minimal-prep veneers involve only fractional millimeter refinement of surface enamel, preserving natural tooth structure.",
        },
      },
      {
        q: { ar: "هل يتغير لون الفينير مع شرب القهوة والشاي؟", en: "Do porcelain veneers stain over time with coffee or tea?" },
        a: {
          ar: "خزف الإيماكس المعالج حرارياً غير مسامي ومقاوم جداً للتصبغات، مما يحافظ على بريقه ولونه لسنوات طويلة.",
          en: "High-grade dental ceramics are non-porous and highly resistant to stain accumulation from food, coffee, or tea.",
        },
      },
      {
        q: { ar: "كم تدوم عدسات الفينير؟", en: "What is the expected lifespan of dental veneers?" },
        a: {
          ar: "تدوم العدسات عادة بين ١٠ إلى ١٥ عاماً أو أكثر مع الالتزام بالعناية الفموية الجيدة وتجنب العادات الضارة كقضم الأشياء الصلبة.",
          en: "With regular home care and periodic dental cleanings, veneers typically serve comfortably for 10 to 15 years or longer.",
        },
      },
      {
        q: { ar: "ما الفرق بين الفينير والتاج (الكراون)؟", en: "How do veneers differ from full dental crowns?" },
        a: {
          ar: "الفينير يغطي السطح الأمامي فقط للأغراض التجميلية، بينما التاج يحيط بالسن كاملاً لحمايته بعد علاج العصب أو التلف الشديد.",
          en: "Veneers cover only the visible front surface of the tooth for aesthetics, whereas crowns envelop the entire tooth to rebuild structurally compromised teeth.",
        },
      },
    ],
    relatedDoctorIds: ["ahmed-karam"],
    visible: true,
    needsConfirmation: false,
  },
  {
    id: "root-canal",
    slug: "root-canal",
    name: { ar: "علاج جذور الأسنان", en: "Root Canal Treatment" },
    tagline: {
      ar: "علاج عصب السن للحفاظ على السن الطبيعي ومنع الحاجة لخلعه",
      en: "Preserving your natural tooth through precise endodontic therapy",
    },
    iconName: "Activity",
    overview: [
      {
        ar: "عندما يصل التسوس العميق أو الكسر إلى اللب الداخلي للسن (حجرة العصب والأوعية الدموية)، يحدث التهاب شديد أو عدوى بكتيرية تسبب ألماً حاداً. يهدف علاج الجذور إلى إزالة النسيج المصاب بدقة متناهية للحفاظ على السن الطبيعي في مكانه وتجنب خلع السن.",
        en: "When deep decay or fractures reach the inner dental pulp, bacterial infection causes sharp throbbing discomfort. Root canal treatment thoroughly clears infected tissue, cleanses root canals, and seals them to save your natural tooth from extraction.",
      },
      {
        ar: "نستخدم محددات الذروة الإلكترونية (Apex Locators) والأدوات الآلية المرنة لضمان تنظيف القنوات الجذرية كاملة حتى نهايتها التشريحية، يعقبها حشوها بمواد حيوية معقمة لمنع أي ارتداد للبكتيريا.",
        en: "Using digital apex locators and flexible rotary nickel-titanium instruments, our clinicians cleanse and shape root canals to their exact anatomical tip before sealing with biocompatible materials.",
      },
    ],
    whoItIsFor: [
      { ar: "من يعاني من ألم نابض ومستمر في الضرس يزداد مع المشروبات الساخنة", en: "Patients experiencing persistent throbbing pain exacerbated by warmth" },
      { ar: "وجود انتفاخ أو حساسية شديدة في اللثة حول السن المصاب", en: "Swelling or localized tenderness near the tooth root" },
      { ar: "الأسنان ذات التسوس العميق جداً القريب من العصب", en: "Teeth with deep extensive decay nearing the pulp chamber" },
      { ar: "الأسنان المتعرضة لصدمات أو كسور كشفت عصب السن", en: "Traumatized or fractured teeth with exposed nerve tissue" },
    ],
    whatToExpect: [
      {
        title: { ar: "١. التشخيص الشعاعي والتخدير الفعال", en: "1. Diagnosis & Local Anesthesia" },
        desc: {
          ar: "أشعة رقمية دقيقة لتحديد مسار الجذور، وتخدير موضعي يضمن إجراء الجلسة براحة تامة.",
          en: "Targeted digital X-ray to inspect root anatomy, followed by profound local anesthesia for comfort.",
        },
      },
      {
        title: { ar: "٢. تنظيف وتعقيم القنوات الآلي", en: "2. Rotary Cleaning & Disinfection" },
        desc: {
          ar: "إزالة نسيج العصب الملتهب وتطهير القنوات بمحاليل طبية معقمة تمنع البكتيريا.",
          en: "Meticulous removal of inflamed pulp and thorough chemical irrigation of canals.",
        },
      },
      {
        title: { ar: "٣. حشو الجذور والترميم", en: "3. Hermetic Sealing & Restoration" },
        desc: {
          ar: "حشو القنوات بمادة الجوتا بيركا الطبية، ووضع حشوة محكمة، تمهيداً لحماية السن بتاج داعم.",
          en: "Hermetic sealing with gutta-percha, followed by coronal restoration and crown recommendation.",
        },
      },
    ],
    faqs: [
      {
        q: { ar: "هل علاج الجذور مؤلم كما هو شائع؟", en: "Is a root canal as painful as commonly feared?" },
        a: {
          ar: "مع التخدير الموضعي الحديث والتقنيات الآلية، يكون الإجراء مماثلاً لجلسة الحشو العادي، بل إن هدفه الأساسي هو تخليصك من ألم العصب.",
          en: "Modern local anesthetics make the procedure virtually identical in sensation to a routine filling. The goal of the procedure is to relieve the acute nerve ache.",
        },
      },
      {
        q: { ar: "كم جلسة يتطلب علاج الجذور؟", en: "How many sessions are required for root canal therapy?" },
        a: {
          ar: "في معظم الحالات يتم العلاج في جلسة أو جلستين حسب وجود صديد أو التهاب حاد يتطلب وضع علاج موضعي مؤقت.",
          en: "Most cases are completed in 1 or 2 visits, depending on whether active acute swelling requires interim medicated dressing.",
        },
      },
      {
        q: { ar: "هل من الضروري تركيب تاج (طربوش) بعد علاج العصب؟", en: "Is a crown strictly necessary after root canal treatment?" },
        a: {
          ar: "يُنصح بشدة بتركيب تاج للضروس الخلفية لأن السن بعد علاج العصب يفقد رطوبته ويصبح أكثر هشاشة وقابلية للكسر تحت قوى المضغ.",
          en: "Yes, particularly for posterior molars. Removing the pulp leaves the tooth more brittle; a crown distributes chewing forces and prevents catastrophic fractures.",
        },
      },
      {
        q: { ar: "ماذا لو فضلت خلع السن بدلاً من علاج العصب؟", en: "What if I choose extraction instead of root canal therapy?" },
        a: {
          ar: "الحفاظ على سنك الطبيعي هو الخيار الأفضل دائماً؛ خلع السن يتطلب لاحقاً زراعة أو جسراً لتعويضه ومنع تحرك باقي الأسنان.",
          en: "Saving your natural tooth root is always clinically preferred. Extraction necessitates subsequent implants or bridges to prevent adjacent teeth from drifting.",
        },
      },
    ],
    relatedDoctorIds: ["ahmed-karam"],
    visible: true,
    needsConfirmation: false,
  },
  {
    id: "gum-treatment",
    slug: "gum-treatment",
    name: { ar: "علاج وجراحة اللثة", en: "Gum Treatment & Periodontics" },
    tagline: {
      ar: "تشخيص وعلاج التهابات اللثة والجيوب العميقة لحماية أساس الأسنان",
      en: "Diagnosis and care for gingivitis and periodontal pocket conditions",
    },
    iconName: "HeartPulse",
    overview: [
      {
        ar: "صحة اللثة هي الأساس الحقيقي لثبات الأسنان وجمالها. تبدأ مشاكل اللثة عادة بالتهاب بسيط (Gingivitis) يظهر في شكل نزيف أثناء التفريش، وفي حال إهماله قد يتطور إلى التهاب الأنسجة الداعمة (Periodontitis) وتكون جيوب لثوية تؤثر على عظم الفك.",
        en: "Gums provide the living foundation for every tooth. Early inflammation (gingivitis) causes bleeding during brushing; if left unattended, it can progress to periodontitis with deeper pockets and bone resorption.",
      },
      {
        ar: "نقدم في مركز دبي لطب الأسنان بروتوكولات علاجية تبدأ بالتقليح العميق وكشط الجذور (Root Planing) لتنعيم أسطح الجذور وإزالة المستعمرات البكتيرية، مع متابعات دورية منتظمة لاستعادة ثبات ونضارة اللثة.",
        en: "At Dubai Dental Clinic, we offer tailored periodontal therapies ranging from deep subgingival scaling and root planing to smooth root surfaces, alongside structured recall visits to stabilize the periodontal foundation.",
      },
    ],
    whoItIsFor: [
      { ar: "من يلاحظ نزيفاً متكرراً عند تفريش الأسنان أو تناول أطعمة صلبة", en: "Individuals experiencing recurring bleeding during daily oral care" },
      { ar: "تورم اللثة وتغير لونها إلى الأحمر الداكن", en: "Noticeable redness, swelling, or puffiness in gum tissue" },
      { ar: "انحسار اللثة وظهور أعناق أو جذور الأسنان", en: "Receding gums exposing sensitive root margins" },
      { ar: "حركة خفيفة في بعض الأسنان أو رائحة فم مستمرة", en: "Slight tooth mobility or persistent bad breath" },
    ],
    whatToExpect: [
      {
        title: { ar: "١. قياس عمق الجيوب اللثوية", en: "1. Periodontal Pocket Probing" },
        desc: {
          ar: "فحص دقيق باستخدام مقياس لثوي ميكروني لتحديد درجة الالتهاب وحجم الجيوب حول كل سن.",
          en: "Gentle millimeter mapping of pocket depths around all teeth to diagnose severity.",
        },
      },
      {
        title: { ar: "٢. التنظيف العميق وكشط الجذور", en: "2. Deep Subgingival Scaling" },
        desc: {
          ar: "إزالة الرواسب البكتيرية العميقة تحت خط اللثة تحت التخدير الموضعي المريح.",
          en: "Targeted removal of subgingival deposits and root planing under soothing local anesthesia.",
        },
      },
      {
        title: { ar: "٣. جلسات المتابعة والتقييم الدوري", en: "3. Re-evaluation & Maintenance" },
        desc: {
          ar: "إعادة قياس الجيوب بعد عدة أسابيع للتأكد من التئام اللثة وعودتها للالتصاق بالأسنان.",
          en: "Pocket re-measurement after healing to confirm reattachment and ongoing tissue firmness.",
        },
      },
    ],
    faqs: [
      {
        q: { ar: "هل يمكن أن تعود اللثة المنحسرة إلى موضعها؟", en: "Can severely receded gums grow back on their own?" },
        a: {
          ar: "الأنسجة المفقودة لا تعود تلقائياً، ولكن العلاج يوقف استمرار التراجع، وتوجد إجراءات جراحية تجميلية متقدمة لتغطية الجذور عند الحاجة.",
          en: "Receded tissue does not regenerate spontaneously, but treatment halts progression; specialized mucogingival grafting can restore coverage if indicated.",
        },
      },
      {
        q: { ar: "ما أسباب نزيف اللثة المفاجئ؟", en: "What causes unexpected gum bleeding?" },
        a: {
          ar: "السبب الأكثر شيوعاً هو تراكم طبقة البلاك البكتيرية على حواف الأسنان، وقد تساهم التغيرات الهرمونية أو بعض الأدوية في زيادة الاستجابة.",
          en: "The primary cause is plaque biofilm accumulation at the gum margins, sometimes amplified by systemic changes or specific medications.",
        },
      },
      {
        q: { ar: "كم تستغرق اللثة حتى تلتئم بعد التنظيف العميق؟", en: "How long does gum tissue take to heal after deep cleaning?" },
        a: {
          ar: "تبدأ اللثة في استعادة لونها الوردي وتماسكها خلال أسبوع إلى أسبوعين، ويكتمل التقييم النهائي بعد ٤ إلى ٦ أسابيع.",
          en: "Noticeable improvement in firmness and color occurs within 7 to 14 days, with definitive periodontal re-evaluation at 4 to 6 weeks.",
        },
      },
    ],
    relatedDoctorIds: ["ahmed-karam"],
    visible: true,
    needsConfirmation: false,
  },
  {
    id: "fixed-prosthesis",
    slug: "fixed-prosthesis",
    name: { ar: "التركيبات الثابتة (الزيركون والإيماكس)", en: "Fixed Prosthesis (Zirconia & E-max)" },
    tagline: {
      ar: "تيجان وجسور خزفية دقيقة تعيد بناء قوة وتناسق الأسنان المتضررة",
      en: "Precision CAD/CAM crowns and bridges in high-grade ceramic materials",
    },
    iconName: "Crown",
    overview: [
      {
        ar: "التركيبات الثابتة هي الحل الأمثل لترميم الأسنان التي تعرضت لتلف كبير أو بعد علاج الجذور، أو لتعويض سن مفقود عن طريق الجسور الثابتة. نستخدم في مركز دبي لطب الأسنان أفضل خامات السيراميك الألمانية المعتمدة دولياً، وعلى رأسها الزيركونيا فائق الصلابة وخزف الإيماكس عالي الشفافية.",
        en: "Fixed dental restorations rebuild extensively damaged teeth or replace missing teeth via dental bridges. At Dubai Dental Clinic, we utilize internationally certified materials including high-strength Zirconia and lifelike E-max ceramics.",
      },
      {
        ar: "تُصنع التركيبات عبر تقنية التصميم والتصنيع المحوسب (CAD/CAM) لضمان انطباق حواف التاج بدقة متناهية تحمي السن من التسرب البكتيري وتطابق العضة الطبيعية دون أي انزعاج.",
        en: "Every crown and bridge is engineered with precision CAD/CAM milling to ensure microscopic margin closure, protecting against bacterial leakage and harmonizing seamlessly with your bite.",
      },
    ],
    whoItIsFor: [
      { ar: "الأسنان التي خضعت لعلاج الجذور وتحتاج لحماية من الكسر", en: "Endodontically treated teeth requiring structural reinforcement" },
      { ar: "الأسنان المتكسرة أو المتآكلة نتيجة الحك الليلي (الصرير)", en: "Fractured teeth or those severely worn by nocturnal bruxism" },
      { ar: "تعويض سن مفقود بجسر ثابت بين سنين سليمين", en: "Bridging single missing teeth between healthy abutment teeth" },
      { ar: "استبدال التيجان القديمة ذات الحواف المعدنية الداكنة", en: "Replacing aged metal-fused crowns showing dark lines at the gumline" },
    ],
    whatToExpect: [
      {
        title: { ar: "١. تجهيز السن وأخذ الطبعة الرقمية", en: "1. Tooth Preparation & Optical Scan" },
        desc: {
          ar: "تحضير ميكروني للسن وأخذ مسح رقمي ثلاثي الأبعاد بالألوان الطبيعية دون استخدام معجون الطبعات.",
          en: "Subtle anatomical shaping and digital 3D scanning without paste-based impression trays.",
        },
      },
      {
        title: { ar: "٢. تركيب تاج مؤقت لحماية السن", en: "2. Provisional Protective Crown" },
        desc: {
          ar: "وضع تاج مؤقت مريح يحافظ على السن ووظيفة المضغ أثناء تصنيع التركيبة الدائمة في المعمل.",
          en: "Placement of an aesthetic provisional crown to safeguard the tooth while the master restoration is milled.",
        },
      },
      {
        title: { ar: "٣. التثبيت النهائي ومراجعة الإطباق", en: "3. Delivery & Bite Articulation" },
        desc: {
          ar: "فحص دقة الانطباق واللون وتثبيت التاج بأسمنت طبي معتمد ومراجعة حركات الفك لضمان الراحة التامة.",
          en: "Careful shade and margin verification, followed by resin cementation and occlusal fine-tuning.",
        },
      },
    ],
    faqs: [
      {
        q: { ar: "ما الفرق بين تيجان الزيركون وتيجان الإيماكس؟", en: "What is the difference between Zirconia and E-max crowns?" },
        a: {
          ar: "الزيركونيا يتميز بصلابة فائقة تجعله مثالياً للضروس الخلفية والجسور، بينما الإيماكس يتمتع بشفافية ضوئية مذهلة تحاكي الأسنان الطبيعية بدقة ويفضل للأسنان الأمامية.",
          en: "Zirconia offers immense fracture resistance ideal for posterior molars and bridges, while E-max offers supreme optical translucency best suited for anterior visible teeth.",
        },
      },
      {
        q: { ar: "هل تظهر خطوط داكنة حول اللثة مع الوقت؟", en: "Will a dark line appear along the gumline in the future?" },
        a: {
          ar: "لا، لأن خامات الزيركون والإيماكس خالية تماماً من المعادن (Metal-Free)، وبالتالي لا تسبب أي اسوداد أو تصبغ لحواف اللثة.",
          en: "No. Because modern ceramic restorations are entirely metal-free, there is no metallic sub-structure to cause dark shadows at the gum margin.",
        },
      },
      {
        q: { ar: "كم تدوم التركيبات الثابتة؟", en: "How long do custom crowns typically last?" },
        a: {
          ar: "مع العناية بالفرشاة والخيط الطبي والمتابعة الدورية، تدوم التركيبات الثابتة عادة من ١٠ إلى ٢٠ عاماً بكفاءة عالية.",
          en: "With conscientious home oral hygiene and periodic check-ups, fixed crowns and bridges routinely function for 10 to 20 years.",
        },
      },
    ],
    relatedDoctorIds: ["amr-adel", "ahmed-hany"],
    visible: true,
    needsConfirmation: false,
  },
  {
    id: "dental-fillings",
    slug: "dental-fillings",
    name: { ar: "حشوات الأسنان التجميلية", en: "Aesthetic Dental Fillings" },
    tagline: {
      ar: "ترميم الأسنان المتسوسة بحشوات الكومبوزيت التجميلية بلون السن",
      en: "Tooth-colored composite restorations blending seamlessly with enamel",
    },
    iconName: "CircleDot",
    overview: [
      {
        ar: "تهدف الحشوات التجميلية إلى إزالة التسوس مبكراً وترميم الجزء المتضرر من السن باستخدام خامات الكومبوزيت المتقدمة التي تتطابق بدقة مع درجات لون الأسنان الطبيعية، وتلتصق بطبقات المينا والعاج كيميائياً لتعيد للسن صلابته الأصلية.",
        en: "Aesthetic tooth-colored fillings halt decay early and restore damaged tooth structure using modern nano-hybrid composites that fuse chemically with enamel and dentin, matching your natural tooth color.",
      },
      {
        ar: "نعتمد تقنيات العزل الطبي المتقن (Dental Dam) لضمان جفاف السن وخلوه التام من الرطوبة أثناء وضع طبقات الحشوة وتصليدها بالضوء، مما يضمن أقصى قوة التصاق وعمراً افتراضياً طويلاً.",
        en: "We utilize isolation protocols to ensure complete moisture control during layering and photopolymerization, securing optimal bond strength and preventing recurrent micro-decay.",
      },
    ],
    whoItIsFor: [
      { ar: "حالات التسوس الحديث أو المتوسط في الأسنان الأمامية أو الخلفية", en: "Teeth with early to moderate decay in front or back teeth" },
      { ar: "كسور طفيفة أو شروخ سطحية في حواف الأسنان", en: "Small chips or superficial enamel fractures" },
      { ar: "الرغبة في استبدال الحشوات الفضية القديمة (الزئبقية) بحشوات تجميلية آمنة", en: "Patients wishing to replace aged dark amalgam fillings with aesthetic composites" },
      { ar: "سد التجاويف وحماية الأسنان الحساسة من تآكل الأحماض", en: "Sealing cervical erosion defects and sensitive root notches" },
    ],
    whatToExpect: [
      {
        title: { ar: "١. الفحص وإزالة التسوس الدقيقة", en: "1. Diagnosis & Conservative Excavation" },
        desc: {
          ar: "تنظيف منطقة التسوس بحرص شديد للحفاظ على أكبر قدر من نسيج السن السليم.",
          en: "Delicate removal of decayed tissue while conserving sound natural enamel.",
        },
      },
      {
        title: { ar: "٢. مطابقة اللون والوضع الطبقي", en: "2. Shade Selection & Incremental Layering" },
        desc: {
          ar: "اختيار درجة اللون المناسبة ووضع الحشوة على طبقات مع تصليب كل طبقة بضوء خاص.",
          en: "Precision shade matching and layered application with light-curing activation.",
        },
      },
      {
        title: { ar: "٣. ضبط العضة والتلميع", en: "3. Occlusal Balancing & Fine Polish" },
        desc: {
          ar: "فحص الإطباق بدقة بورق الكربون وتلميع الحشوة حتى تكتسب ملمساً ناعماً مطابقاً للسن.",
          en: "Bite verification using articulating ribbon and polishing to an enamel-like sheen.",
        },
      },
    ],
    faqs: [
      {
        q: { ar: "هل الحشو بالليزر متاح لديكم؟ [يحتاج تأكيد]", en: "Is laser dental filling technology available? [CONFIRM]" },
        a: {
          ar: "يُقصد بالحشو بالليزر في العرف الشائع تصليد الحشوات التجميلية بالضوء الأزرق الخاص (Curing Light)؛ أما استخدام أجهزة الليزر في تحضير السن فيحتاج إلى تأكيد من العيادة قبل الإجراء.",
          en: "Popularly referred to as laser filling, this usually describes high-intensity light-cured composite bonding. True laser cavity preparation requires specific clinic confirmation.",
        },
      },
      {
        q: { ar: "كم تدوم الحشوات التجميلية؟", en: "How long do composite fillings typically last?" },
        a: {
          ar: "تدوم حشوات الكومبوزيت المتقنة عادة من ٥ إلى ١٠ سنوات مع المحافظة على نظافة الأسنان وتجنب الضغط المفرط.",
          en: "High-grade nano-hybrid composites routinely serve for 5 to 10 years with diligent brushing, flossing, and regular exams.",
        },
      },
      {
        q: { ar: "هل من الطبيعي الشعور بحساسية بعد الحشو مباشرة؟", en: "Is post-filling sensitivity normal?" },
        a: {
          ar: "نعم، قد يشعر المراجع بحساسية طفيفة مع المشروبات الباردة لعدة أيام بعد الجلسة، وتهدأ تدريجياً مع التئام السن.",
          en: "Mild sensitivity to cold temperatures is normal for a few days following cavity restoration and resolves spontaneously as the tooth recovers.",
        },
      },
    ],
    relatedDoctorIds: ["ahmed-karam"],
    visible: true,
    needsConfirmation: false,
  },
  {
    id: "general-anesthesia",
    slug: "general-anesthesia",
    name: { ar: "التخدير الكلي للأسنان", en: "General Anesthesia for Dentistry" },
    tagline: {
      ar: "خيار رعاية متقدم للحالات التي تحتاج علاجاً شاملاً تحت إشراف طبي متخصص",
      en: "Hospital-supported comprehensive dental care for selected cases",
    },
    iconName: "Shield",
    overview: [
      {
        ar: "يعد التخدير الكلي خياراً علاجياً استثنائياً يلجأ إليه الأطباء في حالات محددة، مثل الأطفال ذوي الاحتياجات الخاصة أو الأطفال صغار السن الذين يعانون من تسوسات متعددة شديدة ولا يمكن إجراؤها على كرسي العيادة، أو المراجعين الذين يعانون من رهاب شديد من علاج الأسنان.",
        en: "General anesthesia is a clinical option reserved for specific situations, such as young children requiring extensive dental rehabilitation, individuals with special needs, or patients with severe dental phobia who cannot be treated in a conventional dental chair.",
      },
      {
        ar: "يتم هذا الإجراء بالكامل داخل مستشفى مجهز وتحت إشراف استشاري تخدير معتمد، حيث يقوم طبيب الأسنان بإنجاز كافة المعالجات الضرورية في جلسة نوم واحدة آمنة.",
        en: "This procedure is conducted in a fully equipped hospital environment under the direct supervision of certified anesthesiologists, enabling the dental team to complete all restorative needs in a single controlled session.",
      },
    ],
    whoItIsFor: [
      { ar: "الأطفال الصغار المصابون بتسوس واسع النطاق في معظم الأسنان", en: "Young children with rampant early childhood caries across multiple teeth" },
      { ar: "أصحاب الهمم وذوو الاحتياجات الخاصة الذين يصعب تعاونهم على الكرسي", en: "Individuals with special needs where in-chair cooperation is not clinically feasible" },
      { ar: "المراجعون المصابون بحالات رهاب حاد (Dentophobia) موثقة", en: "Patients with acute, medically documented dental phobia" },
      { ar: "الإجراءات الجراحية المعقدة التي ينصح الأخصائي بإجرائها تحت التخدير الكلي", en: "Complex multi-stage surgical cases where full anesthesia is clinically indicated" },
    ],
    whatToExpect: [
      {
        title: { ar: "١. التقييم السريري وفحوصات ما قبل التخدير", en: "1. Pre-Anesthetic Medical Assessment" },
        desc: {
          ar: "فحص سريري كامل، تحاليل دم، واستشارة طبيب التخدير للتأكد من الملاءمة الصحية التامة.",
          en: "Complete physical exam, laboratory blood tests, and anesthesia consultation to confirm safety.",
        },
      },
      {
        title: { ar: "٢. إنجاز العلاج الشامل في جلسة واحدة", en: "2. Comprehensive Single-Session Treatment" },
        desc: {
          ar: "يقوم فريق الأسنان بإجراء جميع الحشوات وعلاج الجذور والوقاية بينما يكون المريض نائماً تماماً.",
          en: "Completion of all required restorations, pulpal therapies, and cleanings while the patient sleeps comfortably.",
        },
      },
      {
        title: { ar: "٣. الإفاقة والمتابعة المنزلية", en: "3. Safe Recovery & Home Discharge" },
        desc: {
          ar: "مراقبة المؤشرات الحيوية في غرفة الإفاقة حتى استعادة الوعي التام والاطمئنان قبل مغادرة المستشفى.",
          en: "Vital signs monitoring in recovery until full alert discharge, followed by clear home-care instructions.",
        },
      },
    ],
    faqs: [
      {
        q: { ar: "هل التخدير الكلي آمن للأطفال؟", en: "Is general anesthesia safe for pediatric patients?" },
        a: {
          ar: "نعم، عندما يتم في بيئة مستشفى معتمدة ومجهزة مع استشاري تخدير متخصص وبعد إجراء كافة الفحوصات الطبية اللازمة.",
          en: "Yes, when conducted within an accredited hospital setting by specialized anesthesiologists after comprehensive pre-operative screening.",
        },
      },
      {
        q: { ar: "هل يوفر مركز دبي لطب الأسنان هذه الخدمة دائماً؟", en: "Is this service continuously available at Dubai Dental Clinic?" },
        a: {
          ar: "توفر هذه الخدمة والترتيبات مع المستشفيات المعتمدة يحتاج إلى تأكيد مسبق وتنسيق مباشر مع إدارة المركز بالهرم.",
          en: "Scheduling and hospital coordination for general anesthesia require prior case-by-case confirmation with clinic administration in Al-Haram.",
        },
      },
      {
        q: { ar: "كم من الوقت يستمر الإجراء في المستشفى؟", en: "How long does the entire hospital visit take?" },
        a: {
          ar: "يستغرق الإجراء العلاجي عادة من ساعة إلى ثلاث ساعات حسب عدد الأسنان، بالإضافة إلى ساعتين للملاحظة في الإفاقة قبل العودة للمنزل في نفس اليوم.",
          en: "The active dental session takes approximately 1 to 3 hours depending on case volume, followed by 2 hours in recovery before same-day discharge.",
        },
      },
    ],
    relatedDoctorIds: ["omar-makhlouf"],
    visible: true,
    needsConfirmation: false,
  },

  // Optional unconfirmed services (visible: false, needsConfirmation: true)
  {
    id: "teeth-whitening",
    slug: "teeth-whitening",
    name: { ar: "تبييض الأسنان بالعيادة", en: "In-Office Teeth Whitening" },
    tagline: {
      ar: "تفتيح لون الأسنان بدرجات آمنة تحت إشراف طبي",
      en: "Controlled dental bleaching under professional clinical supervision",
    },
    iconName: "Sun",
    overview: [
      {
        ar: "خدمة غير مفعلة افتراضياً حتى التأكيد من العيادة.",
        en: "Unpublished service pending confirmation with clinic management.",
      },
    ],
    whoItIsFor: [],
    whatToExpect: [],
    faqs: [],
    relatedDoctorIds: ["ahmed-karam"],
    visible: false,
    needsConfirmation: true,
  },
  {
    id: "removable-dentures",
    slug: "removable-dentures",
    name: { ar: "التركيبات المتحركة", en: "Removable Dentures" },
    tagline: {
      ar: "أطقم الأسنان الجزئية والكاملة المتحركة",
      en: "Partial and complete removable dental prosthetics",
    },
    iconName: "Layers",
    overview: [
      {
        ar: "خدمة غير مفعلة افتراضياً حتى التأكيد من العيادة.",
        en: "Unpublished service pending confirmation with clinic management.",
      },
    ],
    whoItIsFor: [],
    whatToExpect: [],
    faqs: [],
    relatedDoctorIds: ["ahmed-karam"],
    visible: false,
    needsConfirmation: true,
  },
  {
    id: "oral-surgery",
    slug: "oral-surgery",
    name: { ar: "جراحة الفم والأسنان", en: "Oral Surgery & Tooth Extraction" },
    tagline: {
      ar: "جراحات ضرس العقل والخلع الجراحي المتقدم",
      en: "Wisdom teeth extraction and minor oral surgery",
    },
    iconName: "Scissors",
    overview: [
      {
        ar: "خدمة غير مفعلة افتراضياً حتى التأكيد من العيادة.",
        en: "Unpublished service pending confirmation with clinic management.",
      },
    ],
    whoItIsFor: [],
    whatToExpect: [],
    faqs: [],
    relatedDoctorIds: ["amr-adel", "ahmed-hany"],
    visible: false,
    needsConfirmation: true,
  },
];
