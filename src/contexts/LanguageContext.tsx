import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type Language = "en" | "ar";

const translations = {
  // ── Header / Global ──
  "system.online": { en: "System Online", ar: "النظام متصل" },
  "eva.transport": { en: "EVA Transport", ar: "إيفا للنقل" },
  "footer.rights": { en: "© 2026 All rights reserved. Built with precision.", ar: "© 2026 جميع الحقوق محفوظة. صُمم بدقة." },
  "footer.eva": { en: "EVA Transport", ar: "إيفا للنقل" },
  "footer.copyright": { en: "© 2026 EVA Transport. All rights reserved.", ar: "© 2026 إيفا للنقل. جميع الحقوق محفوظة." },
  "footer.privacy": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  "footer.terms": { en: "Terms of Service", ar: "شروط الخدمة" },
  "fleet.system": { en: "Fleet Management System", ar: "نظام إدارة الأسطول" },

  // ── Hero ──
  "hero.badge": { en: "Enterprise Fleet Management", ar: "إدارة أسطول المؤسسات" },
  "hero.line1": { en: "Smart Employee", ar: "نقل الموظفين" },
  "hero.line2": { en: "Transportation", ar: "الذكي" },
  "hero.desc": { en: "Effortless route planning for Workers, Bus Drivers, Truck Drivers, and Supervisors. Route selection, attendance tracking, real-time notifications, smart pickup, and heatmap analytics.", ar: "تخطيط مسارات سهل للعمال وسائقي الحافلات وسائقي الشاحنات والمشرفين. اختيار المسارات وتتبع الحضور والإشعارات الفورية والاستلام الذكي وتحليلات الخرائط الحرارية." },
  "hero.explore": { en: "Explore", ar: "استكشف" },
  "hero.getstarted": { en: "Get Started", ar: "ابدأ الآن" },
  "hero.learnmore": { en: "Learn More", ar: "اعرف أكثر" },

  // ── Stats ──
  "stat.uptime": { en: "Uptime", ar: "وقت التشغيل" },
  "stat.trips": { en: "Trips Daily", ar: "رحلة يومياً" },
  "stat.gps": { en: "GPS Refresh", ar: "تحديث GPS" },
  "stat.savings": { en: "Cost Savings", ar: "توفير التكاليف" },

  // ── Features ──
  "features.badge": { en: "Platform Capabilities", ar: "قدرات المنصة" },
  "features.title": { en: "Built for the Future", ar: "مبني للمستقبل" },
  "features.subtitle": { en: "Everything you need to manage fleet operations efficiently at scale.", ar: "كل ما تحتاجه لإدارة عمليات الأسطول بكفاءة على نطاق واسع." },
  "feature.tracking": { en: "Real-Time Tracking", ar: "التتبع المباشر" },
  "feature.tracking.desc": { en: "Live GPS positions for your entire fleet updated every second.", ar: "مواقع GPS الحية لأسطولك بالكامل تُحدّث كل ثانية." },
  "feature.routing": { en: "Smart Routing", ar: "التوجيه الذكي" },
  "feature.routing.desc": { en: "AI-optimized routes that save fuel and reduce travel time.", ar: "مسارات محسّنة بالذكاء الاصطناعي توفر الوقود وتقلل وقت السفر." },
  "feature.analytics": { en: "Advanced Analytics", ar: "تحليلات متقدمة" },
  "feature.analytics.desc": { en: "Deep insights into fleet performance and efficiency metrics.", ar: "رؤى عميقة حول أداء الأسطول ومقاييس الكفاءة." },
  "feature.alerts": { en: "Instant Alerts", ar: "تنبيهات فورية" },
  "feature.alerts.desc": { en: "Real-time notifications for arrivals, delays, and emergencies.", ar: "إشعارات فورية للوصول والتأخير وحالات الطوارئ." },
  "feature.smartpickup": { en: "Smart Pickup", ar: "الاستلام الذكي" },
  "feature.smartpickup.desc": { en: "Users request pickup from their location. The closest bus is assigned automatically.", ar: "يطلب المستخدمون الاستلام من موقعهم. يتم تعيين أقرب حافلة تلقائياً." },
  "feature.heatmap": { en: "Heatmap Analytics", ar: "تحليلات الخريطة الحرارية" },
  "feature.heatmap.desc": { en: "Visualize congestion and high-density areas along routes for supervisors.", ar: "تصور الازدحام والمناطق عالية الكثافة على المسارات للمشرفين." },

  // ── How It Works ──
  "howitworks.badge": { en: "How It Works", ar: "كيف يعمل" },
  "howitworks.title": { en: "Three Simple Steps", ar: "ثلاث خطوات بسيطة" },
  "howitworks.1.title": { en: "Select Your Role", ar: "اختر دورك" },
  "howitworks.1.desc": { en: "Choose your role as Worker, Bus Driver, Truck Driver, or Supervisor to get started.", ar: "اختر دورك كعامل أو سائق حافلة أو سائق شاحنة أو مشرف للبدء." },
  "howitworks.2.title": { en: "Track & Navigate", ar: "تتبع وتنقل" },
  "howitworks.2.desc": { en: "View live maps, optimized routes, and real-time status updates from your dashboard.", ar: "اعرض الخرائط الحية والمسارات المحسنة والتحديثات الفورية من لوحة التحكم." },
  "howitworks.3.title": { en: "Arrive Safely", ar: "تصل بأمان" },
  "howitworks.3.desc": { en: "Smart notifications, attendance tracking, and feedback ensure a smooth experience.", ar: "الإشعارات الذكية وتتبع الحضور والتقييم تضمن تجربة سلسة." },

  // ── Testimonials ──
  "testimonials.badge": { en: "What People Say", ar: "ماذا يقول الناس" },
  "testimonials.title": { en: "Trusted by Thousands", ar: "موثوق من الآلاف" },
  "testimonial.1.name": { en: "Ahmed Hassan", ar: "أحمد حسن" },
  "testimonial.1.role": { en: "Worker", ar: "عامل" },
  "testimonial.1.text": { en: "EVA Route transformed my daily commute. I never miss my bus anymore with the real-time tracking.", ar: "حوّل EVA Route تنقلي اليومي. لم أعد أفوّت حافلتي بفضل التتبع المباشر." },
  "testimonial.2.name": { en: "Omar Khalil", ar: "عمر خليل" },
  "testimonial.2.role": { en: "Bus Driver", ar: "سائق حافلة" },
  "testimonial.2.text": { en: "The optimized routes save me 30 minutes daily. The worker location feature is a game changer.", ar: "المسارات المحسنة توفر لي 30 دقيقة يومياً. ميزة مواقع العمال غيّرت كل شيء." },
  "testimonial.3.name": { en: "Fatma Said", ar: "فاطمة سعيد" },
  "testimonial.3.role": { en: "Supervisor", ar: "مشرفة" },
  "testimonial.3.text": { en: "Full fleet visibility and analytics help me make data-driven decisions every day.", ar: "الرؤية الكاملة للأسطول والتحليلات تساعدني في اتخاذ قرارات مبنية على البيانات يومياً." },

  // ── CTA ──
  "cta.title": { en: "Ready to Transform Your Fleet?", ar: "مستعد لتحويل أسطولك؟" },
  "cta.desc": { en: "Join thousands of companies using EVA Route for smarter transportation management.", ar: "انضم لآلاف الشركات التي تستخدم EVA Route لإدارة النقل الأذكى." },
  "cta.feature1": { en: "Free to start", ar: "مجاني للبدء" },
  "cta.feature2": { en: "Enterprise ready", ar: "جاهز للمؤسسات" },

  // ── Roles ──
  "roles.badge": { en: "Get Started", ar: "ابدأ الآن" },
  "roles.title": { en: "Select Your Role", ar: "اختر دورك" },
  "roles.desc": { en: "Choose your role to explore the platform and get started with your personalized experience.", ar: "اختر دورك لاستكشاف المنصة والبدء بتجربتك المخصصة." },
  "role.worker": { en: "Worker", ar: "عامل" },
  "role.worker.desc": { en: "Track buses & communicate with drivers", ar: "تتبع الحافلات والتواصل مع السائقين" },
  "role.bus": { en: "Bus Driver", ar: "سائق حافلة" },
  "role.bus.desc": { en: "Manage routes & worker pickups", ar: "إدارة المسارات واستلام العمال" },
  "role.truck": { en: "Truck Driver", ar: "سائق شاحنة" },
  "role.truck.desc": { en: "Handle deliveries & logistics", ar: "إدارة التوصيل والخدمات اللوجستية" },
  "role.admin": { en: "Supervisor", ar: "مشرف" },
  "role.admin.desc": { en: "Full system control & analytics", ar: "التحكم الكامل بالنظام والتحليلات" },
  "role.enter": { en: "Enter", ar: "دخول" },

  // ── Login Page ──
  "login.welcome": { en: "Welcome back", ar: "مرحباً بعودتك" },
  "login.signin": { en: "Sign In", ar: "تسجيل الدخول" },
  "login.create": { en: "Create Account", ar: "إنشاء حساب" },
  "login.role": { en: "Your Role", ar: "دورك" },
  "login.name": { en: "Full Name", ar: "الاسم الكامل" },
  "login.name.placeholder": { en: "Your full name", ar: "اسمك الكامل" },
  "login.email": { en: "Email Address", ar: "البريد الإلكتروني" },
  "login.email.placeholder": { en: "name@company.com", ar: "name@company.com" },
  "login.password": { en: "Password", ar: "كلمة المرور" },
  "login.confirm": { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
  "login.submit.signin": { en: "Sign In", ar: "تسجيل الدخول" },
  "login.submit.create": { en: "Create Account", ar: "إنشاء حساب" },
  "login.has.account": { en: "Already have an account? ", ar: "لديك حساب بالفعل؟ " },
  "login.no.account": { en: "Don't have an account? ", ar: "ليس لديك حساب؟ " },
  "login.switch.signin": { en: "Sign in", ar: "سجل دخولك" },
  "login.switch.create": { en: "Create one", ar: "أنشئ حساباً" },
  "login.back": { en: "← Back to role selection", ar: "← العودة لاختيار الدور" },
  "login.error.fields": { en: "Please fill in all required fields.", ar: "يرجى ملء جميع الحقول المطلوبة." },
  "login.error.name": { en: "Please enter your full name.", ar: "يرجى إدخال اسمك الكامل." },
  "login.error.password": { en: "Passwords do not match.", ar: "كلمات المرور غير متطابقة." },
  "login.success.title": { en: "Welcome aboard!", ar: "مرحباً بك!" },
  "login.success.desc": { en: "Redirecting to your dashboard...", ar: "جارٍ التوجيه إلى لوحة التحكم..." },
  "login.visual.title1": { en: "Excellence in", ar: "التميز في" },
  "login.visual.title2": { en: "Transportation", ar: "النقل" },
  "login.visual.desc": { en: "Managing the world's finest fleet operations with precision, reliability, and uncompromising standards of service.", ar: "إدارة أرقى عمليات الأساطيل في العالم بدقة وموثوقية ومعايير خدمة لا تقبل المساومة." },
  "login.visual.footer": { en: "© 2026 EVA Transportation Group", ar: "© 2026 مجموعة إيفا للنقل" },
  "login.google": { en: "Continue with Google", ar: "المتابعة مع Google" },
  "login.or": { en: "or", ar: "أو" },

  // ── Role Introduction ──
  "intro.skip": { en: "Skip to Login →", ar: "← تخطي إلى الدخول" },
  "intro.scroll": { en: "Scroll to explore", ar: "مرر للاستكشاف" },
  "intro.features": { en: "Features", ar: "المميزات" },
  "intro.features.title": { en: "Everything You Need", ar: "كل ما تحتاجه" },
  "intro.preview": { en: "Live Preview", ar: "معاينة مباشرة" },
  "intro.benefits": { en: "Benefits", ar: "الفوائد" },
  "intro.benefits.title": { en: "Why EVA Transport?", ar: "لماذا إيفا للنقل؟" },
  "intro.cta.title": { en: "Ready to Get Started?", ar: "مستعد للبدء؟" },
  "intro.cta.desc": { en: "Sign in or create your account to access your personalized dashboard.", ar: "سجل الدخول أو أنشئ حسابك للوصول إلى لوحة التحكم المخصصة." },
  "intro.cta.button": { en: "Continue to Login", ar: "متابعة تسجيل الدخول" },
  "intro.notification": { en: "Bus arriving in 2 min", ar: "الحافلة تصل خلال دقيقتين" },

  // Role intro content
  "role.worker.title": { en: "Your Commute,\nReimagined", ar: "تنقلك،\nبمفهوم جديد" },
  "role.worker.subtitle": { en: "Worker Platform", ar: "منصة العامل" },
  "role.worker.heroDesc": { en: "Track buses in real-time, know exact arrival times, and communicate directly with drivers — all from your phone.", ar: "تتبع الحافلات مباشرة، واعرف أوقات الوصول الدقيقة، وتواصل مع السائقين — كل ذلك من هاتفك." },
  "role.bus.title": { en: "Drive Smarter,\nNot Harder", ar: "قُد بذكاء،\nوليس بجهد" },
  "role.bus.subtitle": { en: "Bus Driver Platform", ar: "منصة سائق الحافلة" },
  "role.bus.heroDesc": { en: "View worker locations, follow optimized routes, manage pickups, and stay connected with your team in real-time.", ar: "اعرض مواقع العمال، اتبع المسارات المحسّنة، أدِر عمليات الاستلام، وابقَ على تواصل مع فريقك." },
  "role.truck.title": { en: "Deliver With\nConfidence", ar: "وصّل\nبثقة" },
  "role.truck.subtitle": { en: "Truck Driver Platform", ar: "منصة سائق الشاحنة" },
  "role.truck.heroDesc": { en: "Follow delivery routes, update statuses in real-time, report issues, and keep the logistics chain running smoothly.", ar: "اتبع مسارات التوصيل، حدّث الحالات مباشرة، أبلغ عن المشاكل، وحافظ على سلاسة سلسلة الخدمات اللوجستية." },
  "role.admin.title": { en: "Command Your\nEntire Fleet", ar: "تحكّم\nبأسطولك بالكامل" },
  "role.admin.subtitle": { en: "Supervisor Platform", ar: "منصة المشرف" },
  "role.admin.heroDesc": { en: "Full visibility over every bus, truck, driver, and worker. Analytics, communications, and control — all in one dashboard.", ar: "رؤية كاملة لكل حافلة وشاحنة وسائق وعامل. تحليلات واتصالات وتحكم — كل ذلك في لوحة واحدة." },

  // Role intro features
  "role.worker.f1": { en: "Live Bus Tracking", ar: "تتبع الحافلات المباشر" },
  "role.worker.f1.desc": { en: "See every bus on an interactive real-time map with GPS accuracy.", ar: "شاهد كل حافلة على خريطة تفاعلية بدقة GPS." },
  "role.worker.f2": { en: "Routes & Arrivals", ar: "المسارات والوصول" },
  "role.worker.f2.desc": { en: "Know your bus route, stops, and estimated arrival times instantly.", ar: "اعرف مسار حافلتك ومحطاتها وأوقات الوصول المتوقعة." },
  "role.worker.f3": { en: "Quick Messages", ar: "رسائل سريعة" },
  "role.worker.f3.desc": { en: "Send messages to your driver — request stops or report issues.", ar: "أرسل رسائل لسائقك — اطلب توقف أو بلّغ عن مشكلة." },
  "role.worker.f4": { en: "Nearby Stop Requests", ar: "طلب التوقف القريب" },
  "role.worker.f4.desc": { en: "Request the driver to stop at the nearest location to you.", ar: "اطلب من السائق التوقف في أقرب موقع لك." },
  "role.worker.f5": { en: "Smart Notifications", ar: "إشعارات ذكية" },
  "role.worker.f5.desc": { en: "Get alerts when your bus is approaching or there's a delay.", ar: "احصل على تنبيهات عند اقتراب حافلتك أو وجود تأخير." },
  "role.worker.f6": { en: "Report Problems", ar: "الإبلاغ عن مشاكل" },
  "role.worker.f6.desc": { en: "Report issues directly and get immediate admin attention.", ar: "بلّغ عن المشاكل مباشرة واحصل على اهتمام الإدارة فوراً." },

  "role.bus.f1": { en: "Worker Locations", ar: "مواقع العمال" },
  "role.bus.f1.desc": { en: "See all workers waiting at assigned pickup points on your route.", ar: "شاهد جميع العمال المنتظرين في نقاط الاستلام على مسارك." },
  "role.bus.f2": { en: "Optimized Routes", ar: "مسارات محسّنة" },
  "role.bus.f2.desc": { en: "Follow AI-optimized routes that minimize travel time and fuel.", ar: "اتبع مسارات محسّنة بالذكاء الاصطناعي لتقليل الوقت والوقود." },
  "role.bus.f3": { en: "Pickup Schedules", ar: "جداول الاستلام" },
  "role.bus.f3.desc": { en: "Manage your pickup schedule with real-time adjustments.", ar: "أدِر جدول استلامك مع تعديلات في الوقت الفعلي." },
  "role.bus.f4": { en: "Status Updates", ar: "تحديث الحالة" },
  "role.bus.f4.desc": { en: "Notify workers and admin about traffic delays or breakdowns.", ar: "أبلغ العمال والإدارة عن التأخير أو الأعطال." },
  "role.bus.f5": { en: "Team Communication", ar: "تواصل الفريق" },
  "role.bus.f5.desc": { en: "Chat with workers and supervisors directly from the app.", ar: "تحدث مع العمال والمشرفين مباشرة من التطبيق." },
  "role.bus.f6": { en: "Turn-by-Turn Nav", ar: "ملاحة مفصّلة" },
  "role.bus.f6.desc": { en: "Built-in navigation with route guidance and live traffic.", ar: "ملاحة مدمجة مع إرشاد المسار وحركة المرور الحية." },

  "role.truck.f1": { en: "Delivery Routes", ar: "مسارات التوصيل" },
  "role.truck.f1.desc": { en: "Optimized delivery routes with multiple checkpoint support.", ar: "مسارات توصيل محسّنة مع دعم نقاط تفتيش متعددة." },
  "role.truck.f2": { en: "Status Updates", ar: "تحديث الحالة" },
  "role.truck.f2.desc": { en: "Update delivery status at each checkpoint with one tap.", ar: "حدّث حالة التوصيل في كل نقطة تفتيش بلمسة واحدة." },
  "role.truck.f3": { en: "Traffic Reports", ar: "تقارير المرور" },
  "role.truck.f3.desc": { en: "Report road conditions and traffic to help reroute logistics.", ar: "أبلغ عن حالة الطريق لمساعدة إعادة توجيه اللوجستيات." },
  "role.truck.f4": { en: "Admin Communication", ar: "التواصل مع الإدارة" },
  "role.truck.f4.desc": { en: "Direct line to supervisors for urgent delivery decisions.", ar: "خط مباشر للمشرفين للقرارات العاجلة." },
  "role.truck.f5": { en: "Cargo Tracking", ar: "تتبع الشحنات" },
  "role.truck.f5.desc": { en: "Track cargo details, quantities, and delivery requirements.", ar: "تتبع تفاصيل الشحنات والكميات ومتطلبات التوصيل." },
  "role.truck.f6": { en: "Route Guidance", ar: "إرشاد المسار" },
  "role.truck.f6.desc": { en: "GPS navigation optimized for truck-specific road restrictions.", ar: "ملاحة GPS محسّنة لقيود طرق الشاحنات." },

  "role.admin.f1": { en: "Fleet Overview", ar: "نظرة عامة على الأسطول" },
  "role.admin.f1.desc": { en: "See every vehicle on a live map with real-time status indicators.", ar: "شاهد كل مركبة على خريطة حية مع مؤشرات حالة." },
  "role.admin.f2": { en: "Analytics Dashboard", ar: "لوحة التحليلات" },
  "role.admin.f2.desc": { en: "Performance metrics, route efficiency, and operational insights.", ar: "مقاييس الأداء وكفاءة المسارات والرؤى التشغيلية." },
  "role.admin.f3": { en: "Team Management", ar: "إدارة الفريق" },
  "role.admin.f3.desc": { en: "Manage drivers, workers, routes, and schedules from one place.", ar: "أدِر السائقين والعمال والمسارات من مكان واحد." },
  "role.admin.f4": { en: "Alert Center", ar: "مركز التنبيهات" },
  "role.admin.f4.desc": { en: "Receive and manage all alerts, reports, and notifications.", ar: "استقبل وأدِر جميع التنبيهات والتقارير والإشعارات." },
  "role.admin.f5": { en: "Broadcast Messages", ar: "رسائل جماعية" },
  "role.admin.f5.desc": { en: "Send messages to individuals, groups, or the entire fleet.", ar: "أرسل رسائل للأفراد أو المجموعات أو الأسطول بالكامل." },
  "role.admin.f6": { en: "Quick Actions", ar: "إجراءات سريعة" },
  "role.admin.f6.desc": { en: "Reassign routes, respond to emergencies, and approve requests.", ar: "أعد تعيين المسارات واستجب للطوارئ ووافق على الطلبات." },

  // Role intro benefits
  "role.worker.b1": { en: "Save 30+ minutes daily with live ETAs", ar: "وفّر 30+ دقيقة يومياً مع أوقات الوصول المباشرة" },
  "role.worker.b2": { en: "Never miss your ride with smart alerts", ar: "لا تفوّت رحلتك مع التنبيهات الذكية" },
  "role.worker.b3": { en: "Direct driver communication", ar: "تواصل مباشر مع السائق" },
  "role.worker.b4": { en: "Instant issue resolution", ar: "حل فوري للمشاكل" },
  "role.bus.b1": { en: "Reduce route time by 25%", ar: "قلّل وقت المسار بنسبة 25%" },
  "role.bus.b2": { en: "Zero missed pickups", ar: "صفر استلامات فائتة" },
  "role.bus.b3": { en: "Instant admin support", ar: "دعم إداري فوري" },
  "role.bus.b4": { en: "Stress-free driving experience", ar: "تجربة قيادة بدون توتر" },
  "role.truck.b1": { en: "On-time delivery rate 98%+", ar: "معدل التوصيل في الوقت +98%" },
  "role.truck.b2": { en: "Fewer route deviations", ar: "انحرافات أقل عن المسار" },
  "role.truck.b3": { en: "Instant issue escalation", ar: "تصعيد فوري للمشاكل" },
  "role.truck.b4": { en: "Complete cargo visibility", ar: "رؤية كاملة للشحنات" },
  "role.admin.b1": { en: "100% fleet visibility", ar: "رؤية 100% للأسطول" },
  "role.admin.b2": { en: "50% faster incident response", ar: "استجابة أسرع 50% للحوادث" },
  "role.admin.b3": { en: "Data-driven decisions", ar: "قرارات مبنية على البيانات" },
  "role.admin.b4": { en: "Unified communication hub", ar: "مركز تواصل موحد" },

  // Role intro demo titles
  "role.worker.demo": { en: "Watch Your Bus Arrive", ar: "شاهد حافلتك تصل" },
  "role.worker.demoDesc": { en: "The live map shows buses moving in real-time along their routes. Workers at each stop see arrival countdowns and can interact with drivers.", ar: "تُظهر الخريطة الحية الحافلات وهي تتحرك على مساراتها. يرى العمال في كل محطة العد التنازلي للوصول." },
  "role.bus.demo": { en: "Your Route, Your Dashboard", ar: "مسارك، لوحتك" },
  "role.bus.demoDesc": { en: "Watch as worker markers appear along your route. Status updates flow in real-time, and your schedule adapts dynamically to conditions.", ar: "شاهد علامات العمال على مسارك. تتدفق التحديثات مباشرة ويتكيف جدولك ديناميكياً." },
  "role.truck.demo": { en: "Track Every Delivery", ar: "تتبع كل توصيلة" },
  "role.truck.demoDesc": { en: "See your truck moving along logistics routes with delivery checkpoints lighting up as you progress. Cargo status updates flow in real-time.", ar: "شاهد شاحنتك تتحرك على المسارات مع إضاءة نقاط التفتيش. تتدفق تحديثات الشحن مباشرة." },
  "role.admin.demo": { en: "Your Fleet at a Glance", ar: "أسطولك في لمحة" },
  "role.admin.demoDesc": { en: "The command center shows every vehicle, worker, and route in real-time. Drill into any metric, communicate with anyone, and make decisions instantly.", ar: "يُظهر مركز القيادة كل مركبة وعامل ومسار مباشرة. تعمّق في أي مقياس وتواصل مع أي شخص." },

  // Map visualization labels
  "map.stop": { en: "Stop", ar: "محطة" },
  "map.pickup": { en: "Pickup", ar: "استلام" },
  "map.checkpoint": { en: "Checkpoint", ar: "نقطة تفتيش" },
  "map.delivery": { en: "Delivery", ar: "توصيل" },

  // ── Dashboard ──
  "dash.portal": { en: "Portal", ar: "بوابة" },
  "nav.dashboard": { en: "Dashboard", ar: "لوحة التحكم" },
  "nav.map": { en: "Live Map", ar: "الخريطة الحية" },
  "nav.messages": { en: "Messages", ar: "الرسائل" },
  "nav.notifications": { en: "Notifications", ar: "الإشعارات" },
  "nav.report": { en: "Report Issue", ar: "الإبلاغ عن مشكلة" },
  "nav.routemap": { en: "Route Map", ar: "خريطة المسار" },
  "nav.workers": { en: "Workers", ar: "العمال" },
  "nav.status": { en: "Status Update", ar: "تحديث الحالة" },
  "nav.deliveries": { en: "Deliveries", ar: "التوصيلات" },
  "nav.reports": { en: "Reports", ar: "التقارير" },
  "nav.tracking": { en: "Live Tracking", ar: "التتبع المباشر" },
  "nav.users": { en: "Users", ar: "المستخدمون" },
  "nav.analytics": { en: "Analytics", ar: "التحليلات" },
  "nav.settings": { en: "Settings", ar: "الإعدادات" },
  "nav.schedule": { en: "Schedule", ar: "الجدول" },

  // ── Worker Dashboard ──
  "worker.nextbus": { en: "Next Bus", ar: "الحافلة التالية" },
  "worker.eta": { en: "ETA", ar: "وقت الوصول" },
  "worker.stop": { en: "Your Stop", ar: "محطتك" },
  "worker.alerts": { en: "Alerts", ar: "تنبيهات" },
  "worker.report.title": { en: "Report an Issue", ar: "الإبلاغ عن مشكلة" },
  "worker.report.placeholder": { en: "Describe your issue...", ar: "اوصف مشكلتك..." },
  "worker.report.submit": { en: "Submit Report", ar: "إرسال البلاغ" },
  "worker.schedule.title": { en: "Today's Schedule", ar: "جدول اليوم" },
  "worker.quickactions": { en: "Quick Actions", ar: "إجراءات سريعة" },
  "worker.action.absence": { en: "Request Absence", ar: "طلب غياب" },
  "worker.action.schedule": { en: "View Schedule", ar: "عرض الجدول" },
  "worker.action.route": { en: "Select Route", ar: "اختيار المسار" },
  "schedule.pickup": { en: "Bus Pickup", ar: "استلام الحافلة" },
  "schedule.arrive": { en: "Arrive at Work", ar: "الوصول للعمل" },
  "schedule.departure": { en: "Departure", ar: "المغادرة" },
  "schedule.dropoff": { en: "Drop-off at Home", ar: "الإنزال في المنزل" },
  "schedule.confirmed": { en: "Confirmed", ar: "مؤكد" },
  "schedule.ontrack": { en: "On Track", ar: "في الموعد" },
  "schedule.pending": { en: "Pending", ar: "قيد الانتظار" },

  // ── Bus Driver Dashboard ──
  "bus.assigned": { en: "Workers Assigned", ar: "العمال المعيّنون" },
  "bus.stops": { en: "Stops Remaining", ar: "المحطات المتبقية" },
  "bus.progress": { en: "Route Progress", ar: "تقدم المسار" },
  "bus.status": { en: "Status", ar: "الحالة" },
  "bus.ontime": { en: "On Time", ar: "في الوقت" },
  "bus.delayed": { en: "Delayed", ar: "متأخر" },
  "bus.blocked": { en: "Road Blocked", ar: "طريق مسدود" },
  "bus.traffic": { en: "Heavy Traffic", ar: "ازدحام مروري" },
  "bus.breakdown": { en: "Breakdown", ar: "عطل" },
  "bus.picklist": { en: "Worker Pickup List", ar: "قائمة استلام العمال" },
  "bus.update.title": { en: "Update Bus Status", ar: "تحديث حالة الحافلة" },
  "bus.status.updated": { en: "Status updated:", ar: "تم تحديث الحالة:" },

  // Worker statuses
  "status.waiting": { en: "Waiting", ar: "ينتظر" },
  "status.late": { en: "Late", ar: "متأخر" },
  "status.pickedup": { en: "Picked Up", ar: "تم الاستلام" },

  // ── Truck Driver Dashboard ──
  "truck.today": { en: "Today's Deliveries", ar: "توصيلات اليوم" },
  "truck.completed": { en: "Completed", ar: "مكتملة" },
  "truck.distance": { en: "Distance Left", ar: "المسافة المتبقية" },
  "truck.nextstop": { en: "Next Stop", ar: "المحطة التالية" },
  "truck.deliveries": { en: "Deliveries", ar: "التوصيلات" },
  "delivery.intransit": { en: "In Transit", ar: "قيد النقل" },
  "delivery.pending": { en: "Pending", ar: "معلّق" },
  "delivery.delivered": { en: "Delivered", ar: "تم التوصيل" },

  // ── Admin Dashboard ──
  "admin.totalworkers": { en: "Total Workers", ar: "إجمالي العمال" },
  "admin.activebuses": { en: "Active Buses", ar: "حافلات نشطة" },
  "admin.activetrucks": { en: "Active Trucks", ar: "شاحنات نشطة" },
  "admin.openreports": { en: "Open Reports", ar: "بلاغات مفتوحة" },
  "admin.users": { en: "System Users", ar: "مستخدمو النظام" },
  "admin.adduser": { en: "+ Add User", ar: "+ إضافة مستخدم" },
  "admin.ontimerate": { en: "On-Time Rate", ar: "معدل الالتزام بالوقت" },
  "admin.avgtrip": { en: "Avg Trip Duration", ar: "متوسط مدة الرحلة" },
  "admin.activeworkers": { en: "Active Workers", ar: "عمال نشطون" },
  "admin.performance": { en: "Performance Overview", ar: "نظرة عامة على الأداء" },
  "admin.reports": { en: "System Reports", ar: "تقارير النظام" },
  "admin.quickactions": { en: "Quick Actions", ar: "إجراءات سريعة" },
  "admin.sendreplacement": { en: "Send Replacement Bus", ar: "إرسال حافلة بديلة" },
  "admin.broadcast": { en: "Broadcast Notification", ar: "إرسال إشعار عام" },
  "admin.viewreports": { en: "View All Reports", ar: "عرض جميع التقارير" },

  // ── Activity Feed ──
  "activity.title": { en: "Recent Activity", ar: "النشاط الأخير" },
  "activity.1": { en: "Bus A-01 departed from Station 3", ar: "انطلقت الحافلة A-01 من المحطة 3" },
  "activity.2": { en: "Driver Omar marked route complete", ar: "أنهى السائق عمر المسار" },
  "activity.3": { en: "Traffic delay on Route B", ar: "تأخير مروري في المسار B" },
  "activity.4": { en: "Bus B-01 estimated 5 min late", ar: "الحافلة B-01 متأخرة 5 دقائق" },
  "activity.5": { en: "New worker Ahmed joined the system", ar: "انضم العامل أحمد للنظام" },
  "time.2min": { en: "2 min ago", ar: "منذ دقيقتين" },
  "time.8min": { en: "8 min ago", ar: "منذ 8 دقائق" },
  "time.15min": { en: "15 min ago", ar: "منذ 15 دقيقة" },
  "time.20min": { en: "20 min ago", ar: "منذ 20 دقيقة" },
  "time.1hr": { en: "1 hr ago", ar: "منذ ساعة" },

  // ── Quick Messages ──
  "qm.title": { en: "Quick Messages", ar: "رسائل سريعة" },
  "qm.late": { en: "I will be late", ar: "سأتأخر" },
  "qm.absent": { en: "I will not come today", ar: "لن أحضر اليوم" },
  "qm.stop": { en: "Please stop here", ar: "من فضلك توقف هنا" },
  "qm.issue": { en: "Report an issue", ar: "الإبلاغ عن مشكلة" },
  "qm.sent": { en: "Message sent:", ar: "تم إرسال الرسالة:" },

  // ── 404 ──
  "notfound.title": { en: "404", ar: "404" },
  "notfound.desc": { en: "Oops! Page not found", ar: "عفواً! الصفحة غير موجودة" },
  "notfound.back": { en: "Return to Home", ar: "العودة للرئيسية" },

  // Days
  "day.mon": { en: "Mon", ar: "إثنين" },
  "day.tue": { en: "Tue", ar: "ثلاثاء" },
  "day.wed": { en: "Wed", ar: "أربعاء" },
  "day.thu": { en: "Thu", ar: "خميس" },
  "day.fri": { en: "Fri", ar: "جمعة" },
  "day.sat": { en: "Sat", ar: "سبت" },
  "day.sun": { en: "Sun", ar: "أحد" },
} as const;

export type TranslationKey = keyof typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("eva-lang");
    return (saved === "ar" ? "ar" : "en") as Language;
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("eva-lang", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, []);

  React.useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback((key: TranslationKey): string => {
    const entry = translations[key];
    return entry?.[language] ?? key;
  }, [language]);

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};