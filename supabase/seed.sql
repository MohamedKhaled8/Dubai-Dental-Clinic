-- ==============================================================================
-- DUBAI DENTAL CLINIC / EVIA V2 - SEED DATA SCRIPT
-- ==============================================================================

-- 1. CLINIC SETTINGS SEED
INSERT INTO public.v2_clinic_settings (
    id, clinic_name_ar, clinic_name_en, tagline_ar, tagline_en,
    phone, secondary_phone, whatsapp, email,
    address_ar, address_en, google_maps_url,
    opening_hours_ar, opening_hours_en,
    hero_title_ar, hero_title_en,
    hero_subtitle_ar, hero_subtitle_en,
    hero_image
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'مركز دبي لطب الأسنان',
    'Dubai Dental Clinic',
    'صرح طبي متكامل يجمع بين الدقة والراحة',
    'Modern, Thoughtful Dentistry | Boutique Dental Studio',
    '01022013314',
    '0235824555',
    '201022013314',
    'info@dubaidentalclinic.com',
    '20 شارع عز الدين عمر، الهرم، محافظة الجيزة، مصر',
    '20 Ezz El-Din Omar St., Al-Haram, Giza Governorate, Egypt',
    'https://maps.app.goo.gl/1gT1YVbbhyr8GPvf9',
    'السبت - الخميس: 10:00 صباحاً - 10:00 مساءً | الجمعة: 2:00 ظهراً - 9:00 مساءً',
    'Sat - Thu: 10:00 AM - 10:00 PM | Fri: 02:00 PM - 09:00 PM',
    'طب أسنان يمنحك راحة كنقاء ضوء النهار',
    'Dentistry that feels like daylight',
    'صرح طبي متكامل في الهرم والجيزة يجمع بين الحرفية الطبية الدقيقة، أحدث التقنيات الرقمية، وتجربة علاجية مريحة بلا أي ألم.',
    'A premier dental center in Giza combining clinical excellence, advanced 3D technology, and a calm, painless patient journey.',
    'https://framerusercontent.com/images/Lvb4MdoHeC9h7FdsuKxuIuJLje8.png'
) ON CONFLICT (id) DO UPDATE SET
    clinic_name_ar = EXCLUDED.clinic_name_ar,
    phone = EXCLUDED.phone,
    whatsapp = EXCLUDED.whatsapp;

-- 2. SERVICES SEED
INSERT INTO public.v2_services (
    slug, category_en, category_ar, title_en, title_ar,
    price_en, price_ar, numeric_price, duration_en, duration_ar,
    description_en, description_ar, image_url,
    steps_en, steps_ar, includes_en, includes_ar, sort_order, is_active
) VALUES
(
    'routine-checkup', 'General', 'طب الأسنان العام',
    'Routine Checkup & Cleaning', 'الفحص الدوري والتنظيف الاحترافي',
    'from $99', 'يبدأ من 99 دولار', 99.00,
    '45 minutes', '45 دقيقة',
    'A thorough exam, polish, and health check so small issues get caught long before they become big ones.',
    'فحص شامل بالميكروسكوب الرقمي، وإزالة الجير بالموجات فوق الصوتية، وتلميع المينا لمنع أي مضاعفات قبل حدوثها.',
    'https://framerusercontent.com/images/6L6rARaEumHGgeVgUAAA89AArc.jpg',
    '["Ultra-high definition 3D intraoral diagnostic imaging", "Ultrasonic tartar & biofilm scaling with warm saline irrigation", "Air-flow stain polishing and enamel fluoride re-mineralization", "Comprehensive consultation & personalized oral health roadmap"]'::jsonb,
    '["تصوير بانورامي وفحص رقمي ثلاثي الأبعاد فائق الدقة", "تنظيف الجير والتكلسات بجهاز الموجات فوق الصوتية الملطف", "تلميع الأسنان بتقنية Air-Flow وإزالة التصبغات الدقيقة", "تقرير طبي مفصل وخطة عناية وقائية منزلية مخصصة"]'::jsonb,
    '["3D Digital Bite Scan", "Oral Cancer & Gum Screening", "Custom Treatment Roadmap", "Zero Sensitivity Guarantee"]'::jsonb,
    '["مسح رقمي ثلاثي الأبعاد للإطباق", "فحص شامل لصحة اللثة والأنسجة الفموية", "خطة وقائية مفصلة لكافة الأسنان", "جلسة خالية من التحسس أو الألم"]'::jsonb,
    1, true
),
(
    'smile-makeover', 'Cosmetic', 'تجميل الأسنان والابتسامة',
    'Complete Smile Makeover', 'تصميم الابتسامة الشامل (فينير)',
    'from $2,500', 'يبدأ من 2,500 دولار', 2500.00,
    '2 to 3 visits', '2 إلى 3 زيارات',
    'A tailored combination of treatments designed to completely transform your smile, from alignment to whitening to contouring.',
    'باقة متكاملة تجمع بين عدسات الفينير فائقة النحافة، وتنسيق خط اللثة، وتبييض الليزر لابتسامة ساحرة وطبيعية.',
    'https://framerusercontent.com/images/low6g1dPrrjNXHssKWSuVOvGJlo.png',
    '["Digital Smile Design (DSD) live mock-up simulation on your face", "Minimal surface preparation with microscopic preservation", "Handcrafted European ceramic fabrication with natural translucency", "Permanent precision bonding with 10-year aesthetic guarantee"]'::jsonb,
    '["معاينة حية لشكل الابتسامة على ملامح وجهك قبل البدء (DSD)", "تحضير ميكروسكوبي طفيف دون الإضرار ببنية السن الطبيعية", "تصنيع يدوي فائق الدقة في أرقى معامل الخزف السويسرية", "تثبيت نهائي متين مع ضمان جمالي ووظيفي لمدة 10 سنوات"]'::jsonb,
    '["Live 3D Digital Simulation", "Custom Shade Matching", "Bespoke Porcelain Veneers", "Night Guard & Maintenance Kit"]'::jsonb,
    '["محاكاة رقمية ثلاثية الأبعاد لشكل الابتسامة", "تطابق مثالي لدرجة بياض وشفافية الأسنان الطبيعية", "عدسات بورسلين مخصصة يدوياً لكل سن", "واقي ليلي مجاني ومجموعة العناية المتقدمة"]'::jsonb,
    2, true
),
(
    'crowns-bridge', 'Restorative', 'التركيبات والترميم',
    'Crowns & Bridge Repair', 'تيجان وجسور الأسنان التعويضية',
    'from $180', 'يبدأ من 180 دولار', 180.00,
    'Single visit (60-90 mins)', 'زيارة واحدة (60 - 90 دقيقة)',
    'Durable, natural-looking repairs that restore strength and bite, often finished comfortably in a single visit.',
    'ترميمات متينة من الزيركونيا والإيماكس تستعيد قوة المضغ والشكل الطبيعي للسن في زيارة واحدة بتقنية CAD/CAM.',
    'https://framerusercontent.com/images/5lcMiI0nFXglYbDBiP7kBLuZi8A.png',
    '["Digital scan of the broken or decayed tooth (no messy putties)", "In-house 3D CAD/CAM robotic milling while you relax", "Custom shade glazing and furnace crystallization", "Immediate permanent bonding and bite pressure balancing"]'::jsonb,
    '["مسح ضوئي رقمي بدون مقاسات أو معجون تقليدي مزعج", "خرط آلي مباشر بتقنية CAD/CAM داخل المركز وأنت مسترخٍ", "تلوين وتزجيج حراري مطابق للأسنان المجاورة في الفرن الخاص", "تثبيت فوري متين وضبط دقيق لقوى الإطباق"]'::jsonb,
    '["Zero Impression Trays", "Same-Day Final Fit", "High-Strength German Zirconia", "5-Year Structural Warranty"]'::jsonb,
    '["بدون قوالب معجون مزعجة نهائياً", "تركيب نهائي متكامل في نفس اليوم", "خامات زيركون ألمانية فائقة الصلابة والمتانة", "ضمان كتابي لمدة 5 سنوات ضد الكسر"]'::jsonb,
    3, true
) ON CONFLICT (slug) DO UPDATE SET
    title_ar = EXCLUDED.title_ar,
    title_en = EXCLUDED.title_en,
    price_ar = EXCLUDED.price_ar,
    price_en = EXCLUDED.price_en;

-- 3. DOCTORS SEED
INSERT INTO public.v2_doctors (
    slug, name_en, name_ar, role_en, role_ar,
    credentials_en, credentials_ar, bio_en, bio_ar, image_url,
    specialties_en, specialties_ar, sort_order, is_active
) VALUES
(
    'emma-carter', 'Dr. Emma Carter', 'د. إيما كارتر',
    'Lead Dentist & Founder', 'رئيسة الأطباء والمؤسسة',
    'DDS, 15+ years experience', 'دكتوراه جراحة الأسنان، خبرة 15+ عاماً',
    'Dr. Carter founded Evia Dental with a mission to eliminate clinical coldness from dentistry. A graduate of Columbia University College of Dental Medicine, she specializes in minimally invasive restorative care and comprehensive aesthetic transformations.',
    'أسست الدكتورة كارتر عيادات إيفيا بهدف تحويل زيارة طبيب الأسنان إلى تجربة مريحة وهادئة. تخرجت من كلية طب الأسنان بجامعة كولومبيا، وتتخصص في الترميمات التجميلية الدقيقة وأحدث تقنيات الحفاظ على بنية السن الطبيعية.',
    'https://framerusercontent.com/images/c9k8c6DbLfaYdip1wvlaDSZRXO0.png',
    '["Biomimetic Restorations", "Smile Design", "Comprehensive Diagnostics"]'::jsonb,
    '["الترميمات الحيوية الدقيقة", "تصميم الابتسامة الرقمي", "التشخيص الشامل ثلاثي الأبعاد"]'::jsonb,
    1, true
),
(
    'michael-bennett', 'Dr. Michael Bennett', 'د. مايكل بينيت',
    'Cosmetic Dentist', 'استشاري تجميل الأسنان',
    'DMD, 12+ years experience', 'دكتوراه طب الأسنان، خبرة 12+ عاماً',
    'Specializing in porcelain veneers and composite bonding, Dr. Bennett works with bespoke European ceramic labs to craft restorations that mimic natural light reflection and enamel translucency.',
    'متخصص في الفينير والعدسات الخزفية والحشوات التجميلية المتقدمة. يتعاون مع أرقى معامل الخزف الأوروبية لابتكار ابتسامات تبدو طبيعية ومشرقة بنسبة 100%.',
    'https://framerusercontent.com/images/Inv67mv3QzPkV75rJDelMgkoxYo.png',
    '["Ultra-Thin Porcelain Veneers", "Enamel Micro-Contouring", "Laser Whitening"]'::jsonb,
    '["عدسات الفينير فائقة النحافة", "نحت المينا الدقيق", "التبييض بالليزر المتقدم"]'::jsonb,
    2, true
),
(
    'sophia-mitchell', 'Dr. Sophia Mitchell', 'د. صوفيا ميتشل',
    'Prosthodontist', 'استشارية الاستعاضة السنية والتركيبات',
    'DDS, 10+ years experience', 'دكتوراه جراحة وتجميل الأسنان، خبرة 10+ سنوات',
    'A board-certified Prosthodontist, Dr. Mitchell restores damaged bites, occlusions, and missing teeth with precision digital workflows and same-day ceramic restorations.',
    'استشارية معتمدة في الاستعاضة الصناعية وتركيبات الأسنان الدقيقة. تتولى إعادة تأهيل الإطباق الكامل واستعادة الأسنان المفقودة بتقنيات التصنيع الرقمي في نفس اليوم.',
    'https://framerusercontent.com/images/DxWAigfgltE6lyoMTcXEV5orwcQ.png',
    '["Full Mouth Reconstruction", "Zirconia & E.max Bridges", "TMJ Balance"]'::jsonb,
    '["إعادة التأهيل الكامل للفكين", "جسور الزيركون والإيماكس", "توازن مفصل الفك"]'::jsonb,
    3, true
),
(
    'james-anderson', 'Dr. James Anderson', 'د. جيمس أندرسون',
    'Oral Surgeon & Implantologist', 'استشاري جراحة الفم وزراعة الأسنان',
    'DMD, 14+ years experience', 'دكتوراه جراحة الفم، خبرة 14+ عاماً',
    'Dr. Anderson is renowned for 3D guided dental implant placement and pain-free surgical procedures, utilizing CBCT computer navigation to deliver instant stability with minimal downtime.',
    'رائد في زراعة الأسنان الرقمية الموجهة بالحاسوب بدون شق جراحي، وتسكين الألم الموضعي المتقدم، مما يوفر نسب نجاح تتجاوز 99% بأقصر فترة تعافي ممكنة.',
    'https://framerusercontent.com/images/bi3ahG0U6hI67U3gTHhyM0uNk.png',
    '["Guided Dental Implants", "Bone Grafting", "Wisdom Teeth Microsurgery"]'::jsonb,
    '["الزراعة الموجهة ثلاثية الأبعاد", "تطعيم العظام والجيوب الأنفية", "جراحة ضروس العقل بالميكروسكوب"]'::jsonb,
    4, true
),
(
    'olivia-parker', 'Dr. Olivia Parker', 'د. أوليفيا باركر',
    'General & Preventive Dentist', 'أخصائية طب الأسنان العام والوقائي',
    'DDS, 8+ years experience', 'دكتوراه جراحة الأسنان، خبرة 8+ سنوات',
    'Passionate about preventative health and anxiety-free visits, Dr. Parker ensures patients experience thorough yet exceptionally gentle cleanings and restorations.',
    'تكرس اهتمامها للعناية الوقائية الشاملة وعلاج رهاب الأسنان. تضمن للمرضى جلسات تنظيف وإزالة جير فائقة النعومة مع متابعة دورية دقيقة.',
    'https://framerusercontent.com/images/E8REOdaSdSabfRQYAj5u7ZGSVMQ.png',
    '["Microscopic Endodontics", "Deep Periodontal Therapy", "Preventive Care"]'::jsonb,
    '["علاج العصب بالميكروسكوب", "علاج اللثة المتقدم", "العناية الوقائية الدورية"]'::jsonb,
    5, true
),
(
    'daniel-brooks', 'Dr. Daniel Brooks', 'د. دانيال بروكس',
    'Orthodontist', 'استشاري تقويم الأسنان والفكين',
    'DMD, 11+ years experience', 'دكتوراه تقويم الأسنان، خبرة 11+ عاماً',
    'A diamond-level clear aligner specialist, Dr. Brooks crafts seamless bite corrections for teens and adults using digital 3D biomechanics without unsightly brackets.',
    'استشاري تقويم معتمد بدرجة ماسية في التقويم الشفاف (Invisalign). يقوم بتصحيح تزاحم واعوجاج الأسنان بدون أسلاك معدنية ظاهرة.',
    'https://framerusercontent.com/images/43Vn5CC4q5Qjs6UCpUYM9UX88U.png',
    '["Invisalign Clear Aligners", "Early Interceptive Ortho", "Bite Architecture"]'::jsonb,
    '["التقويم الشفاف الذكي", "تعديل نمو الفكين", "هندسة الإطباق السليم"]'::jsonb,
    6, true
) ON CONFLICT (slug) DO NOTHING;

-- 4. REVIEWS SEED
INSERT INTO public.v2_reviews (
    name_en, name_ar, treatment_en, treatment_ar, rating,
    quote_en, quote_ar, date_en, date_ar, initials, accent_color, sort_order, is_published
) VALUES
(
    'Sara Mohamed', 'سارة محمد',
    'Cosmetic Smile & Consultation', 'تجميل الأسنان واستشارة شاملة', 5.0,
    'One of the best dental clinics I have ever visited! The reception team was very polite, and the doctor was patient, explaining every detail. I felt genuine care and comfort.',
    'من أفضل العيادات اللي اتعاملت معاها، الاستقبال محترم جداً والدكتور كان صبور وشرحلي كل حاجة بالتفصيل. حسيت باهتمام حقيقي وراحة تامة.. شكراً ليكم جداً على النتيجة الرائعة.',
    'Verified Review · 1 month ago', 'تقييم موثق · منذ شهر', 'SM', 'from-blue-600 to-indigo-700', 1, true
),
(
    'Mahmoud Abdel-Hamid', 'محمود عبد الحميد',
    '9 Fillings & Zirconia Crown', '9 حشوات تجميلية وطربوش زيركون', 5.0,
    'A fantastic clinic with an extraordinarily skilled doctor. I had about 9 fillings and a zirconia crown done—the precision and result are top-tier.',
    'المكان كويس جداً والدكتور شاطر ومحترف.. عملت حوالي 9 حشوات وطربوش زيركون وبسم الله ما شاء الله النتيجة ممتازة جداً، وبنات العيادة والاستقبال محترمين والمعاملة راقية للغاية.',
    'Verified Review · 2 months ago', 'تقييم موثق · منذ شهرين', 'MA', 'from-teal-600 to-emerald-700', 2, true
),
(
    'Mohamed Ezz', 'محمد عز',
    'Root Canal & Painless Restoration', 'علاج جذور وترميم بدون ألم', 5.0,
    'The doctor''s hands are pure gold! Absolutely gentle and zero pain throughout. The reception team is wonderful and welcoming.',
    'الدكتور بسم الله ما شاء الله إيده تتلف في حرير، والسكرتارية تبارك الرحمن في الذوق والتعاون. تجربة ممتازة جداً والشغل متقن لأبعد حد وبدون أي إحساس بالألم.',
    'Verified Review · 3 months ago', 'تقييم موثق · منذ 3 أشهر', 'ME', 'from-sky-600 to-blue-700', 3, true
),
(
    'Faisal Al-Isaie', 'أ. فيصل العيسائي',
    'Dental Surgery & Implants', 'جراحة وزراعة الأسنان', 5.0,
    'An outstanding experience and high-end medical service in dentistry. Exceptional punctuality and doctors with the highest standards of professionalism.',
    'تجربة ممتازة وخدمة طبية راقية جداً في طب وجراحة الأسنان، دقة عالية في المواعيد وأطباء على أعلى مستوى من الاحترافية والاهتمام ومتابعة الحالة بعد الزيارة.',
    'Verified Review · 4 months ago', 'تقييم موثق · منذ 4 أشهر', 'FA', 'from-indigo-600 to-purple-700', 4, true
);

-- 5. FAQS SEED
INSERT INTO public.v2_faqs (
    question_en, question_ar, answer_en, answer_ar, category, sort_order, is_published
) VALUES
(
    'What dental services do you offer?',
    'ما هي الخدمات والتخصصات المتاحة لديكم؟',
    'We provide comprehensive general, cosmetic, and restorative dental care — from routine checkups, cleanings, and 3D digital scans to porcelain veneers, crowns, bridges, Invisalign clear aligners, and dental implants.',
    'نقدم رعاية سنية متكاملة تشمل الفحص الدوري، تنظيف وتلميع الأسنان، الأشعة ثلاثية الأبعاد، عدسات الفينير، تيجان وجسور الزيركون في نفس اليوم، زراعة الأسنان الرقمية، والتقويم الشفاف.',
    'general', 1, true
),
(
    'How often should I visit the dentist?',
    'كم مرة يجب أن أزور طبيب الأسنان؟',
    'For most healthy adults and children, we recommend visiting every 6 months for a routine examination and professional cleaning.',
    'نوصي بزيارة الفحص الدوري والتنظيف الوقائي كل 6 أشهر لضمان سلامة اللثة والأسنان. قد يُنصح بزيارات أقرب للمرضى الذين يخضعون لعلاج تقويمي أو عناية خاصة باللثة.',
    'general', 2, true
),
(
    'Is teeth whitening safe?',
    'هل جلسات تبييض الأسنان آمنة للمينا؟',
    'Yes. Professional teeth whitening overseen by our clinicians is thoroughly tested, pH-balanced, and protects your enamel while gently lifting deep stains.',
    'نعم، تبييض الأسنان الاحترافي تحت إشراف أطبائنا آمن تماماً على مينا الأسنان ومتوازن كيميائياً. نستخدم محاليل مهدئة تمنع أي تحسس بعد الجلسة.',
    'cosmetic', 3, true
);

-- 6. CASES SEED
INSERT INTO public.v2_cases (
    title_en, title_ar, category, before_image, after_image,
    description_en, description_ar, tags, sort_order, is_published
) VALUES
(
    'Porcelain Veneers Transformation',
    'تجميل الأسنان بعدسات الفينير السويسرية',
    'Veneers & Aesthetics',
    'https://framerusercontent.com/images/E5VtCUtG8dUklZWKGgyK4GdtDA.png',
    'https://framerusercontent.com/images/Oqy9319b2uv11O0YWGDDUoh5c.png',
    'Complete upper arch aesthetic restoration with minimal preparation and high translucency ceramics.',
    'إعادة تأهيل تجميلي متكامل للفك العلوي باستخدام عدسات فائقة النحافة تحافظ على بنية الأسنان الطبيعية.',
    '["Veneers", "Smile Design", "Whitening"]'::jsonb,
    1, true
);
