/* ALIGNED — bilingual engine (English / 简体中文)
   ------------------------------------------------------------------
   The language pill in the nav switches the whole site between English
   and Simplified Chinese and remembers the choice (localStorage).

   How it works, without touching page markup:
   - TEXT pairs translate ordinary text nodes (paragraphs, list items,
     buttons, captions…). Surrounding markup and icons are preserved
     because only the text node itself is swapped.
   - HEAD pairs translate the animated split headings (.tsplit). Those
     get chopped into per-word spans by the reveal animation, so they
     are matched by their plain text and their innerHTML is replaced.
   - PROG maps the left-rail section labels on the homepage; the inline
     script asks window.AlignedI18n.t() for the current language.
   The pill always shows the language you can switch TO. */
(function () {
  "use strict";

  /* ---------- normalise: collapse whitespace, trim ---------- */
  function norm(s) { return (s || "").replace(/\s+/g, " ").trim(); }

  var _tmp = document.createElement("div");
  function textOf(html) { _tmp.innerHTML = html; return norm(_tmp.textContent); }

  /* ================================================================
     TEXT — [ English, 简体中文 ] for plain text nodes
     ================================================================ */
  var TEXT = [
    /* ---- nav / shared chrome ---- */
    ["Skip to content", "跳至内容"],
    ["Gonstead", "冈斯特"],
    ["Animal Chiro", "动物脊椎矫正"],
    ["About Us", "关于我们"],
    ["News & Updates", "最新消息"],
    ["Shop", "商店"],
    ["Book Assessment", "预约评估"],
    ["Book now", "立即预约"],
    ["WhatsApp Us", "WhatsApp 联系我们"],
    ["Call", "致电"],

    /* ---- footer ---- */
    ["A premium chiropractic and movement-recovery clinic at Mid Valley City, Kuala Lumpur, treating the root cause of pain with the Gonstead method.", "位于吉隆坡 Mid Valley City 的高端脊椎矫正与运动康复诊所，以冈斯特疗法从根源解决疼痛。"],
    ["Care", "诊疗"],
    ["Clinic", "诊所"],
    ["Visit us", "到访我们"],
    ["Gonstead Chiropractic", "冈斯特脊椎矫正"],
    ["Conditions", "常见症状"],
    ["Gonstead diagnostics", "冈斯特诊断"],
    ["Patient stories", "患者故事"],
    ["About us", "关于我们"],
    ["Pricing", "收费"],
    ["FAQs", "常见问题"],
    ["Mon to Sat, 9am to 7pm", "周一至周六，上午9点至晚上7点"],
    ["© 2026 Aligned Clinic. Helping Malaysia move better.", "© 2026 Aligned Clinic。助力马来西亚更好地活动。"],
    ["Mid Valley City, Kuala Lumpur, Malaysia", "Mid Valley City，吉隆坡，马来西亚"],

    /* ================= INDEX ================= */
    ["We treat the root cause of your pain, not just the symptom. Precise, methodical spinal care built around long-term recovery.", "我们治疗疼痛的根源，而不只是症状。精准、有章法的脊椎护理，专为长期康复而设。"],
    ["Years of practice", "年临床经验"],
    ["Patients realigned", "位患者重获平衡"],
    ["Average patient rating", "平均患者评分"],
    ["Aligned exists to find what is actually driving your pain, and to treat that — through the Gonstead Chiropractic system, segment by segment.", "Aligned 的存在，是为了找出真正引发你疼痛的原因，并治疗它——通过冈斯特脊椎矫正系统，一节一节地来。"],
    ["Our doctors take the time it takes. Nothing gets adjusted that the examination has not earned.", "我们的医生该花多少时间，就花多少时间。检查没有证实的地方，我们不会去矫正。"],
    ["Relief should not be temporary.", "缓解不该只是暂时的。"],
    ["Learn more", "了解更多"],
    ["The gold standard for chiropractic systems", "脊椎矫正系统的黄金标准"],
    ["Gonstead — precise, full-spine, practised worldwide", "冈斯特——精准、全脊椎、全球通行"],
    ["Too many people live with recurring pain, poor posture, stress and old injuries that quietly limit everyday life. You adapt around it until adapting stops working.", "太多人长期忍受反复的疼痛、不良姿势、压力和旧伤，悄悄限制着日常生活。你不断迁就，直到再也迁就不了。"],
    ["Recurring pain", "反复疼痛"],
    ["Poor posture", "不良姿势"],
    ["Old injuries", "旧患"],
    ["Daily stress load", "日常压力"],
    ["The pain", "疼痛"],
    ["cycle", "循环"],
    ["We treat a wide range of conditions. Drag through the deck — or just let it play.", "我们治疗多种症状。拖动卡片浏览——或让它自动播放。"],
    ["Drag the cards, or tap one to bring it forward", "拖动卡片，或点击将其移到最前"],

    /* conditions — homepage deck */
    ["Slipped Disc", "椎间盘突出"],
    ["Back Pain", "腰背痛"],
    ["Sciatica", "坐骨神经痛"],
    ["Neck Pain", "颈部疼痛"],
    ["Headache & Migraine", "头痛与偏头痛"],
    ["Whiplash", "挥鞭伤"],
    ["Shoulder Pain", "肩部疼痛"],
    ["Tennis Elbow", "网球肘"],
    ["Carpal Tunnel", "腕管综合症"],
    ["Hip Pain", "髋部疼痛"],
    ["Knee Pain", "膝盖疼痛"],
    ["Sports Injury", "运动损伤"],
    ["Scoliosis", "脊椎侧弯"],
    ["Posture Correction", "体态矫正"],
    ["Pregnancy", "孕期护理"],
    ["Paediatric", "儿童护理"],
    ["A bulging or herniated disc pressing on nearby nerves, causing pain, numbness or weakness.", "椎间盘膨出或突出压迫邻近神经，引起疼痛、麻木或无力。"],
    ["Lower or mid-back pain from poor posture, strain or spinal misalignment that wears you down.", "因不良姿势、劳损或脊椎错位引起的下背或中背疼痛，日渐消耗你。"],
    ["Sharp, radiating pain down the leg from an irritated or compressed sciatic nerve.", "坐骨神经受刺激或压迫，引起沿腿部放射的剧痛。"],
    ["Stiffness and ache from tech-neck, tension or restricted joints in the upper spine.", "因低头族、紧张或上段脊椎关节受限而引起的僵硬与酸痛。"],
    ["Recurring head pain often rooted in upper-neck tension and spinal misalignment.", "反复的头痛，常源于颈上段紧张与脊椎错位。"],
    ["Neck strain after a sudden impact, leaving lingering stiffness, pain and headaches.", "突然撞击后的颈部拉伤，留下持续的僵硬、疼痛与头痛。"],
    ["Restricted, aching shoulders from posture, overuse or underlying joint dysfunction.", "因姿势、过度使用或潜在关节功能障碍引起的肩部受限与酸痛。"],
    ["Painful, inflamed tendons on the outer elbow from repetitive gripping and strain.", "因反复抓握与劳损，导致肘外侧肌腱疼痛发炎。"],
    ["Tingling, numbness and weakness in the hand from a compressed nerve at the wrist.", "手腕神经受压，引起手部刺痛、麻木与无力。"],
    ["Stiffness or pain in the hip that quietly limits how freely you move and walk.", "髋部的僵硬或疼痛，悄悄限制你行动与行走的自如。"],
    ["Aching or unstable knees from alignment issues, overuse or an old injury.", "因力线问题、过度使用或旧伤引起的膝盖酸痛或不稳。"],
    ["Strains, sprains and overuse injuries that keep you off the field or out of training.", "拉伤、扭伤与过度使用损伤，让你无法上场或训练。"],
    ["A sideways curve of the spine that we assess, monitor and help you manage.", "脊椎的侧向弯曲，我们为你评估、监测并协助管理。"],
    ["Retraining rounded shoulders and a forward head back into healthy alignment.", "重新训练圆肩与头部前倾，回到健康的体态力线。"],
    ["Gentle, adapted care for back and pelvic comfort, trimester by trimester.", "温和、因人而调的护理，呵护整个孕期的腰背与骨盆舒适。"],
    ["Gentle assessments and care tailored to growing spines and developing posture.", "为成长中的脊椎与发育中的体态量身定制的温和评估与护理。"],

    /* services */
    ["Care tailored to your body, and to what the examination actually finds. From precise spinal adjustments to active rehab — and gentle care for the companions who move beside you.", "为你的身体、也为检查的实际发现量身定制的护理。从精准的脊椎矫正到主动康复——以及为陪伴你的毛孩提供的温和护理。"],
    ["Chiro Adjustment", "脊椎矫正"],
    ["Specific, full-spine Gonstead adjustments that restore alignment and ease the irritation around the nerve — treating the root cause, not just the symptom.", "精准的全脊椎冈斯特矫正，恢复力线、缓解神经周围的刺激——从根源治疗，而不只是症状。"],
    ["See the method", "了解方法"],
    ["Rehab", "康复训练"],
    ["Targeted movement and strengthening that rebuilds what the pain took away, so the same problem does not return once you are back on your feet.", "有针对性的运动与强化训练，重建疼痛夺走的能力，让你重新站起来后同样的问题不再复发。"],
    ["Start rehab", "开始康复"],
    ["The same precise, gentle philosophy — now for your animals. Chiropractic care designed to keep pets moving comfortably through every life stage.", "同样精准而温和的理念——现在为你的动物服务。专为宠物设计的脊椎护理，让它们在每个生命阶段都活动自如。"],
    ["Explore Animal Chiro", "了解动物脊椎矫正"],
    ["Adapted to all ages", "因龄而调"],
    ["Children to seniors", "从儿童到长者"],
    ["Precision", "精准"],
    ["Down to the segment", "精确到每一节脊椎"],
    ["Personalised", "个性化"],
    ["Adjustment just for you", "为你量身的矫正"],
    ["On-site X-ray", "院内X光"],
    ["Weight-bearing analysis", "负重分析"],

    /* gonstead 5 (homepage) */
    ["Precision is not optional. Hover or tap each step to see it — the Gonstead system checks your spine five ways before a single adjustment is made.", "精准并非可选项。悬停或点击每个步骤查看——冈斯特系统在做任何矫正前，会以五种方式检查你的脊椎。"],
    ["Visualization", "视觉观察"],
    ["Reading posture, gait and symmetry for the subtle deviations that point to where the trouble starts.", "观察姿势、步态与对称性，捕捉指向问题起点的细微偏差。"],
    ["Instrumentation", "仪器检测"],
    ["A dual-probe Nervoscope reads small side-to-side differences in skin temperature, flagging the levels worth a closer look.", "双探头神经温度仪读取两侧皮温的细微差异，标示出值得进一步检查的节段。"],
    ["Static palpation", "静态触诊"],
    ["Feeling the spine at rest for swelling, tenderness and tight muscles around each segment.", "在静止状态下触摸脊椎，检查每一节周围的肿胀、压痛与肌肉紧绷。"],
    ["Motion palpation", "动态触诊"],
    ["Moving the spine through its ranges to find fixed or locked joints that are not travelling freely.", "让脊椎活动至各个范围，找出固定或卡住、无法自由活动的关节。"],
    ["X-ray analysis", "X光分析"],
    ["Full-length, weight-bearing radiographs reveal exact alignment and disc integrity under real load.", "全长负重X光片，揭示真实负荷下的精确力线与椎间盘状况。"],

    /* doctors / stories */
    ["Human connection first. You will know your doctor, and your doctor will know your spine.", "以人为本。你会认识你的医生，你的医生也会了解你的脊椎。"],
    ["Chiropractor · Gonstead System", "脊椎矫正师 · 冈斯特系统"],
    ["Chiropractor · Gonstead System · (sample profile)", "脊椎矫正师 · 冈斯特系统 ·（示意档案）"],
    ["Chiropractor · Sports & Recovery · (sample profile)", "脊椎矫正师 · 运动与恢复 ·（示意档案）"],
    ["Rehab & Movement Therapist · (sample profile)", "康复与动作治疗师 ·（示意档案）"],
    ["Clinic Manager · Patient Care · (sample profile)", "诊所经理 · 患者服务 ·（示意档案）"],
    ["Years of practice (sample)", "执业年数（示意）"],
    ["Patients realigned (sample)", "已矫正患者（示意）"],
    ["Average patient rating (sample)", "患者平均评分（示意）"],
    ["Office manager, Cheras (sample)", "办公室经理，蕉赖（示意）"],
    ["Engineer, Kuala Lumpur (sample)", "工程师，吉隆坡（示意）"],
    ["Photographer, Ampang (sample)", "摄影师，安邦（示意）"],
    ["Believes recovery is a partnership. Daniel built Aligned around patient education and the kind of careful, full-spine work that holds up over years, not weeks. Registered with the Gonstead Chiropractic Society (Australia) and the Association of Chiropractic Malaysia.", "他相信康复是一场合作。Daniel 以患者教育为核心创立 Aligned，坚持细致的全脊椎护理，效果以年计而非以周计。注册于冈斯特脊椎矫正学会（澳大利亚）及马来西亚脊椎矫正协会。"],
    ["Sports recovery", "运动康复"],
    ["Posture", "体态"],
    ["More about Dr Daniel", "更多关于 Daniel 医生"],
    ['"Two years of lower back pain, gone in a structured plan. I finally understand my own spine."', "「两年的下背痛，在有条理的疗程中消失了。我终于了解自己的脊椎。」"],
    ["Office manager, Cheras", "办公室经理，蕉赖"],
    ['"My sciatica used to dictate my week. Now I am back to weekend football with my kids."', "「坐骨神经痛曾主宰我的一周。如今我又能在周末陪孩子踢球了。」"],
    ["Engineer, Kuala Lumpur", "工程师，吉隆坡"],
    ['"The x-ray analysis showed me exactly what was wrong. No guessing, just a clear plan."', "「X光分析清楚显示问题所在。不用猜测，只有明确的方案。」"],
    ["Photographer, Ampang", "摄影师，安邦"],

    /* journey / collab / pet / final (homepage) */
    ["A guided path that reduces uncertainty at every stage, so you always know what comes next.", "一条循序渐进的路径，减少每个阶段的不确定，让你始终知道下一步是什么。"],
    ["Listen", "倾听"],
    ["We take a full history and understand how pain shapes your day.", "我们详细了解病史，理解疼痛如何影响你的每一天。"],
    ["Assess", "评估"],
    ["Examination, pre-check and weight-bearing x-ray analysis.", "检查、预检以及负重X光分析。"],
    ["Personalise", "定制"],
    ["A treatment plan built around your spine and your goals.", "围绕你的脊椎与目标制定治疗方案。"],
    ["Restore", "修复"],
    ["Specific adjustments and rehab to restore alignment and integrity.", "精准矫正与康复训练，恢复力线与结构完整。"],
    ["Maintain", "维持"],
    ["Guidance and follow-up so relief holds for the long term.", "指导与跟进，让缓解长期保持。"],
    ["Collaborations & experiences", "合作与体验"],
    ["Sports event support", "体育赛事支持"],
    ["Gonstead seminars", "冈斯特研讨会"],
    ["Corporate wellness talks", "企业健康讲座"],
    ["Community screenings", "社区筛查"],
    ["Working with athletes", "与运动员合作"],
    ["Overseas training", "海外培训"],
    ["The same precise, gentle philosophy, for the companions who move beside you. Chiropractic care designed for pets, now at Aligned.", "同样精准而温和的理念，献给陪伴你身边的伙伴。专为宠物设计的脊椎护理，现已登陆 Aligned。"],
    ["Book a comprehensive assessment at Mid Valley and find out exactly what your spine needs.", "在 Mid Valley 预约一次全面评估，了解你的脊椎究竟需要什么。"],

    /* landing overlay (homepage) */
    ["🎁 Merdeka special", "🎁 默迪卡特惠"],
    ["RM50 off your first assessment. New patients only — valid all August.", "首次评估立减 RM50。仅限新患者——整个八月有效。"],
    ["Claim This Offer", "领取优惠"],
    ["📣 What's new", "📣 最新消息"],
    ["Now open on Saturdays — and", "周六现已营业——"],
    ["consultations are here.", "咨询现已开放。"],
    ["Book your slot", "预约你的时段"],
    ["💡 This month's health tip", "💡 本月健康贴士"],
    ["Sit less, move more — a 2-minute stretch break every hour keeps your spine happier.", "少坐多动——每小时做2分钟伸展，让你的脊椎更舒畅。"],

    /* ================= ABOUT ================= */
    ["One clinic, one standard: doctors and a care team who treat the cause, not just the symptom.", "一家诊所，一个标准：医生与护理团队治疗病根，而不只是症状。"],
    ["The beginning", "起点"],
    ["Trained in the Gonstead system", "接受冈斯特系统训练"],
    ["Years of study under the full-spine Gonstead discipline — precision diagnostics before any adjustment, every time.", "多年钻研全脊椎冈斯特体系——每一次矫正前，都先精准诊断。"],
    ["Founding", "创立"],
    ["Aligned opens its doors", "Aligned 正式开业"],
    ["A clinic built around one promise: patients leave understanding their own spine, not just feeling briefly better.", "一家围绕一个承诺建立的诊所：患者离开时能了解自己的脊椎，而不只是短暂好转。"],
    ["Growth", "成长"],
    ["On-site X-ray & rehab care", "院内X光与康复护理"],
    ["Weight-bearing X-ray analysis and movement rehab brought under one roof, so nothing about your care is guesswork.", "负重X光分析与运动康复集于一处，让你的护理不再有任何猜测。"],
    ["Today", "今天"],
    ["Animal Chiro joins the family", "动物脊椎矫正加入大家庭"],
    ["The same gentle philosophy, extended to the dogs and cats who move beside us — no referral needed.", "同样温和的理念，延伸至陪伴我们的猫狗——无需转介。"],
    ["Founder · Chiropractor · Gonstead System", "创办人 · 脊椎矫正师 · 冈斯特系统"],
    ["Daniel believes recovery is a partnership. His consultations run long, on purpose — because a patient who understands their spine makes better decisions for it, long after they leave the clinic.", "Daniel 相信康复是一场合作。他的问诊刻意拉长——因为了解自己脊椎的患者，即使离开诊所很久，也能为它做出更好的决定。"],
    ["He built Aligned around patient education and the kind of careful, full-spine work that holds up over years, not weeks. When he is not adjusting spines, he is probably explaining one — with the X-ray on the screen and a model vertebra in hand.", "他以患者教育为核心创立 Aligned，坚持细致的全脊椎护理，效果以年计而非以周计。不在矫正脊椎时，他多半在讲解脊椎——屏幕上是X光片，手里拿着脊椎模型。"],
    ["Registered, Gonstead Chiropractic Society (Australia)", "注册于冈斯特脊椎矫正学会（澳大利亚）"],
    ["Member, Association of Chiropractic Malaysia", "马来西亚脊椎矫正协会会员"],
    ["Focus: full-spine Gonstead, sports recovery, posture", "专长：全脊椎冈斯特、运动康复、体态"],
    ["Also leads our Animal Chiro care for dogs & cats", "同时主理我们的猫狗动物脊椎矫正护理"],
    ['"If I can\'t explain why it hurts, I haven\'t finished examining."', "「如果我无法解释为什么会痛，那我的检查就还没做完。」"],
    ["Sarah is the one who gets the complicated histories. Patients with long, complicated histories tend to end up in her room — and leave with a shorter, clearer story about what is actually going on.", "Sarah 以发现别人遗漏之处著称。病史冗长复杂的患者往往会来到她的诊室——离开时，对自己的状况有了更简短、更清晰的答案。"],
    ["She is meticulous about the five criteria: if the evidence does not agree, she keeps examining until it does.", "她对五项标准一丝不苟：只要证据不一致，她就会一直检查到一致为止。"],
    ["Doctor of Chiropractic", "脊椎矫正博士"],
    ["Focus: chronic pain, scoliosis, posture", "专长：慢性疼痛、脊椎侧弯、体态"],
    ['"The spine always tells the truth — you just have to check all five ways."', "「脊椎从不说谎——你只需用五种方式去检查。」"],
    ['A former competitive athlete, Marcus knows what it feels like to be told to "just rest". His work focuses on getting active bodies back to the sport they love — stronger than before the injury.', "作为前竞技运动员，Marcus 深知被叫「多休息」是什么滋味。他专注于让活跃的身体重返所爱的运动——比受伤前更强壮。"],
    ["Expect him to watch how you move before he ever touches your spine.", "在触碰你的脊椎之前，他一定会先观察你如何活动。"],
    ["Focus: sports injury, active recovery, rehab", "专长：运动损伤、主动康复、复健"],
    ['"Rest treats the calendar. We treat the cause."', "「休息只是熬日子，我们治的是病根。」"],
    ["Jasmine takes over where the adjustment ends. Her rehab sessions rebuild the strength and movement habits that keep a corrected spine corrected — so results last beyond the clinic door.", "矫正结束的地方，就是 Jasmine 接手的地方。她的康复训练重建力量与动作习惯，让矫正后的脊椎保持稳定——效果延续到诊所门外。"],
    ["Patients describe her sessions as tough, kind and strangely fun.", "患者形容她的训练严格、亲切，又出奇地有趣。"],
    ["Certified rehabilitation therapist", "认证康复治疗师"],
    ["Focus: strength, mobility, movement retraining", "专长：力量、灵活度、动作再训练"],
    ['"The adjustment opens the door. Movement keeps it open."', "「矫正打开了那扇门，运动让它保持敞开。」"],
    ["Amanda is the first voice you hear and the person who makes every visit run on time. From bookings to insurance paperwork to remembering how you take your appointment reminders, she has it handled.", "Amanda 是你最先听到的声音，也是让每次到访准时顺畅的人。从预约、保险文件，到记住你偏好的提醒方式，她都一手打理。"],
    ["If something about your visit could be smoother, she wants to know.", "如果你的到访有任何能更顺畅的地方，她都想知道。"],
    ["Your first point of contact, in English, 中文 & BM", "你的第一联络人，通晓英语、中文与马来语"],
    ["Bookings, reports & insurance documents", "预约、报告与保险文件"],
    ['"Great care should start before you reach the treatment room."', "「优质的护理，应在你走进诊疗室之前就开始。」"],
    ["Bright, calm and built for care — swipe through, or better, drop by.", "明亮、宁静，为护理而建——滑动浏览，或者更好，亲自来看看。"],
    ["Reception — The Boulevard, Mid Valley", "接待处 — The Boulevard，Mid Valley"],
    ["Adjustment rooms", "矫正室"],
    ["On-site X-ray suite", "院内X光室"],
    ["Rehab & movement corner", "康复与运动区"],
    ["Parking at The Boulevard / Mid Valley Megamall, a short covered walk away", "The Boulevard／Mid Valley Megamall 设有停车场，有盖走道，几步即达"],
    ["Open in Google Maps", "在 Google 地图打开"],
    ["Book a first assessment with Dr Daniel — 60 to 90 minutes, plain-language answers.", "预约 Daniel 医生的首次评估——60 至 90 分钟，用平实的语言为你解答。"],

    /* ================= CHIROPRACTIC ================= */
    ["Dr. Clarence S. Gonstead worked on engines before he ever worked on spines. He brought a mechanic's principle to the body —", "Dr. Clarence S. Gonstead 在钻研脊椎之前，先钻研的是引擎。他把技师的一个原则带到了人体——"],
    ["a structure is only as sound as its foundation", "结构的稳固程度取决于它的地基"],
    ["— and spent fifty-five years turning it into a system that checks the spine five ways before touching it. His clinic in Mount Horeb, Wisconsin, a town of some 1,400 people, grew large enough to need its own airstrip and a hotel for the patients who travelled in to see him.", "——并用五十五年，把它发展成一套在动手之前先从五个方面检查脊椎的系统。他在威斯康星州 Mount Horeb（一个约 1,400 人的小镇）的诊所，规模大到需要自己的飞机跑道，以及一间供远道而来的患者住宿的酒店。"],
    ["See the Method", "观看方法"],
    ["“Take your time, give them the utmost of your ability as a chiropractor, find the correct subluxation. Accept it. Correct it. Leave it alone.”", "「不要急，把你身为脊椎矫正师的全部本事拿出来，找到那个正确的半脱位。接受它。矫正它。然后放手。」"],
    ["It all starts with the spine.", "一切从脊椎开始。"],
    ["Every step, bend and turn runs through it — and so does your nervous system. A spine that moves well is the foundation of a body that works well.", "每一次迈步、弯腰与转身都经过它——你的神经系统亦然。活动良好的脊椎，是身体正常运作的根基。"],
    ["Segment by segment.", "逐节分析。"],
    ['Twenty-four vertebrae, each with its own job. We break the spine down section by section — because "back pain" is never the whole spine, it is a specific level.', "二十四节椎骨，各司其职。我们逐段分析脊椎——因为「背痛」从来不是整条脊椎的问题，而是某一特定节段。"],
    ["The subluxation: where movement stops.", "半脱位：活动停止之处。"],
    ["When one segment loses its alignment and stops moving freely, the nerves around it are irritated and the body compensates. That is the restriction you feel as pain and stiffness.", "当某一节段失去力线、无法自由活动，周围的神经便受到刺激，身体则代偿。那种受限，就是你感觉到的疼痛与僵硬。"],
    ["One specific adjustment.", "一次精准矫正。"],
    ["By hand, only where the evidence points — and nowhere else. A precise correction that restores motion to the exact segment that lost it.", "徒手施行，只在证据指向之处——绝不多做。精准的矫正，让失去活动的那一节段恢复动作。"],
    ["Recovery: a happy spine.", "康复：一条舒畅的脊椎。"],
    ["With the joint moving and the irritation settling, the body does what it was built to do — heal. Movement returns, and this time it holds.", "当关节恢复活动、刺激逐渐平息，身体便会做它天生该做的事——自我修复。活动恢复，而这一次，效果得以保持。"],
    ["Experience the Precision", "体验这份精准"],
    ["Most back pain gets a guess. Yours gets a five-point diagnostic system — so when we adjust, we adjust the right segment, in the right direction, at the right time.", "大多数背痛只能靠猜。而你的问题会得到一套五项诊断系统——因此当我们矫正时，会在正确的时间、以正确的方向，矫正正确的节段。"],
    ["Reading posture, gait and symmetry for the subtle deviations that point to where trouble starts.", "观察姿势、步态与对称性，捕捉指向问题起点的细微偏差。"],
    ["A dual-probe Nervoscope glides down the spine, reading small side-to-side differences in skin temperature that flag a level worth a closer look.", "双探头神经温度仪沿脊椎滑行，读取两侧皮温的细微差异，标示出值得进一步检查的节段。"],
    ["Moving the spine through its ranges to find joints that are locked or not travelling freely.", "让脊椎活动至各个范围，找出卡住或无法自由活动的关节。"],
    ["What brings people through our door.", "人们为什么走进我们的诊所。"],
    ["Sixteen of the most common reasons people walk through our door. If yours is not on the list, message us — the assessment will tell us if chiropractic is right for you.", "人们走进我们诊所最常见的十六个原因。如果你的问题不在列表上，请联系我们——评估会告诉我们脊椎矫正是否适合你。"],
    ["Bulging or herniated discs pressing on nearby nerves.", "椎间盘膨出或突出，压迫邻近神经。"],
    ["Lower or mid-back pain from posture, strain or misalignment.", "因姿势、劳损或错位引起的下背或中背疼痛。"],
    ["Sharp, radiating pain down the leg from a compressed nerve.", "神经受压，引起沿腿部放射的剧痛。"],
    ["Stiffness from tech-neck, tension or restricted joints.", "因低头族、紧张或关节受限引起的僵硬。"],
    ["Recurring head pain rooted in upper-neck tension.", "源于颈上段紧张的反复头痛。"],
    ["Lingering neck strain after a sudden impact.", "突然撞击后持续的颈部拉伤。"],
    ["Restricted, aching shoulders from posture or overuse.", "因姿势或过度使用引起的肩部受限与酸痛。"],
    ["Inflamed tendons from repetitive gripping and strain.", "因反复抓握与劳损引起的肌腱发炎。"],
    ["Tingling and weakness from a compressed wrist nerve.", "手腕神经受压引起的刺痛与无力。"],
    ["Stiffness that quietly limits how freely you walk.", "悄悄限制你行走自如的僵硬。"],
    ["Aching or unstable knees from alignment issues or injury.", "因力线问题或受伤引起的膝盖酸痛或不稳。"],
    ["Strains and overuse injuries keeping you out of training.", "让你无法训练的拉伤与过度使用损伤。"],
    ["Sideways spinal curves we assess, monitor and manage.", "我们评估、监测并管理的脊椎侧向弯曲。"],
    ["Retraining rounded shoulders and forward head.", "重新训练圆肩与头部前倾。"],
    ["Gentle, adapted care for back and pelvic comfort.", "温和、因人而调的护理，呵护腰背与骨盆舒适。"],
    ["Gentle assessments tailored to growing spines.", "为成长中的脊椎量身定制的温和评估。"],
    ["You will always know the cost before any treatment begins. Ranges below cover most cases — your exact plan is confirmed at your report.", "在任何治疗开始前，你都会清楚知道费用。以下价格区间涵盖大多数情况——你的确切方案将在报告时确认。"],
    ["Start here", "从这里开始"],
    ["First Assessment", "首次评估"],
    ["one-time, 60–90 minutes", "一次性，60–90 分钟"],
    ["Full history & consultation", "完整病史与问诊"],
    ["Five-point Gonstead examination", "五项冈斯特检查"],
    ["On-site X-ray analysis (if needed)", "院内X光分析（如有需要）"],
    ["Report of findings, in plain language", "以平实语言呈现的检查报告"],
    ["Ongoing care", "持续护理"],
    ["Adjustment Session", "矫正疗程"],
    ["per visit, based on your plan", "每次到访，依你的方案而定"],
    ["Specific Gonstead adjustment", "精准的冈斯特矫正"],
    ["Progress re-check each visit", "每次到访复查进展"],
    ["Rehab & movement guidance", "康复与运动指导"],
    ["Same doctor, every session", "每次疗程，同一位医生"],
    ["Best value", "超值之选"],
    ["Care Plans", "护理套餐"],
    ["Package", "套餐"],
    ["rates", "优惠价"],
    ["for regular patients", "适合定期就诊的患者"],
    ["Discounted multi-session rates", "多疗程折扣价"],
    ["Built around your recovery goals", "围绕你的康复目标制定"],
    ["Recommended only after assessment", "仅在评估后推荐"],
    ["No lock-ins, no pressure", "无捆绑，无压力"],
    ["Ask About Plans", "咨询套餐"],
    ["Final pricing is always confirmed with you before treatment starts.", "最终收费总会在治疗开始前与你确认。"],
    ["Does a chiropractic adjustment hurt?", "脊椎矫正会痛吗？"],
    ["Most adjustments are painless — many patients describe relief, not pain. The Gonstead approach is specific and controlled: no twisting your whole body, no forcing. Some mild soreness afterwards (like after exercise) is normal for the first day or two.", "大多数矫正是无痛的——许多患者形容那是放松，而非疼痛。冈斯特手法精准而可控：不扭转整个身体，不强行施力。事后一两天出现轻微酸痛（像运动后一样）是正常的。"],
    ["How many sessions will I need?", "我需要多少次疗程？"],
    ["It depends on how long the problem has been building and what the examination shows. After your first assessment you will get a clear recommendation — including how many visits, how often, and how we will measure progress. No open-ended plans.", "这取决于问题积累了多久，以及检查结果如何。首次评估后，你会得到明确的建议——包括需要几次、多久一次，以及我们如何衡量进展。绝无无止境的方案。"],
    ["Is it safe for children, seniors or pregnancy?", "对儿童、长者或孕妇安全吗？"],
    ["We adapt the technique to the body in front of us — gentler, more specific setups for children, older spines and pregnancy. The five-point examination always comes first, so we know what should be adjusted and what should not. No treatment is risk-free. We will talk you through what applies to you before we begin. And we will tell you if you are better served elsewhere.", "我们会针对眼前这个身体调整手法——对儿童、年长的脊椎与孕期，采用更温和、更精准的方式。五项检查永远排在最前，好让我们知道什么该矫正、什么不该。没有任何治疗是零风险的。开始之前，我们会向你说明与你相关的部分。若我们认为其他专业更适合你，也会直说。"],
    ["Do I need an X-ray?", "我需要拍X光吗？"],
    ["Only when your case needs one. Weight-bearing X-rays show alignment under real load, which guides precise care — but if you have recent films, bring them and we may not need new ones.", "只在你的情况需要时才拍。负重X光显示真实负荷下的力线，指导精准护理——但如果你有近期的片子，带来即可，我们或许无需重拍。"],
    ["What is the difference between chiropractic and physiotherapy?", "脊椎矫正与物理治疗有什么区别？"],
    ["Chiropractic focuses on correcting spinal joint misalignment affecting the nervous system; physiotherapy focuses on rehabilitating muscles and movement. They complement each other — our care plans often include rehab-style strengthening once your spine holds its alignment.", "脊椎矫正着重矫正影响神经系统的脊椎关节错位；物理治疗着重康复肌肉与动作。两者相辅相成——一旦你的脊椎保持力线，我们的护理方案常会加入康复式的强化训练。"],
    ["Can I claim insurance?", "我可以申请保险理赔吗？"],
    ["Some Malaysian insurers and employee benefit plans cover chiropractic care. We will issue receipts and reports you can submit — check with your provider, and message us if they need any supporting documents.", "部分马来西亚保险公司及员工福利计划涵盖脊椎矫正护理。我们会开具可供提交的收据与报告——请向你的保险公司查询，如需任何证明文件，请联系我们。"],
    ["Book your first assessment at Mid Valley — 60 to 90 minutes, transparent pricing, plain-language answers.", "在 Mid Valley 预约你的首次评估——60 至 90 分钟，收费透明，用平实语言为你解答。"],

    /* ================= PET-CHIRO ================= */
    ["The stairs he now avoids. The jump he won't attempt. The walk that keeps getting shorter. We call it aging — but often it's a spine that has stopped moving the way it should. And that, unlike age, can be helped.", "它如今回避的楼梯。它不再尝试的跳跃。越走越短的散步。我们称之为衰老——但往往是脊椎不再正常活动。而这，与年龄不同，是可以改善的。"],
    ["Check the 12 Signs", "查看 12 个征兆"],
    ["Book Pet Assessment", "预约宠物评估"],
    ["In a pack, a limping dog is a liability. That instinct never left — so by the time you can see stiffness, the problem has usually been there for months.", "在群体中，跛行的狗是个累赘。这种本能从未消失——所以当你能看出僵硬时，问题通常已存在数月。"],
    ["Silent by design", "天生沉默"],
    ["Dogs instinctively mask pain and keep up with the pack. They don't complain — they compensate, quietly, until they can't.", "狗会本能地掩饰疼痛、跟上群体。它们不会抱怨——只会默默代偿，直到再也撑不住。"],
    ["1 in 4", "四分之一"],
    ["Already hurting, still young", "已在疼痛，却还年轻"],
    ["When researchers screened 123 dogs aged 8 months to 4 years, nearly a quarter — 23.6% — had arthritis painful enough to react to on examination. Not old dogs. Young ones.", "研究人员筛查了 123 只 8 个月至 4 岁的狗，其中近四分之一（23.6%）患有关节炎，且在检查时疼得会有反应。不是老狗，是年轻的狗。"],
    ["7 in 10", "十分之七"],
    ["Their owners hadn't noticed", "主人并未察觉"],
    ["Of the 29 dogs in pain, only 9 owners had noticed anything wrong — about 30%. The other seven in ten looked, to the people who loved them, completely fine.", "在这 29 只处于疼痛中的狗里，只有 9 位主人察觉到不对劲——约 30%。其余十分之七，在最爱它们的人眼中，看起来完全没事。"],
    ["2 of 9", "9 只中仅 2 只"],
    ["Even noticing wasn't enough", "察觉了，也还不够"],
    ["Of the 9 owners who did notice, only 2 had their dog on any treatment for it. Seeing it is not the same as acting on it.", "在这 9 位确实察觉到的主人当中，只有 2 位让狗接受了任何处理。看见，不等于采取行动。"],
    ["Figures from Enomoto M, et al., “Prevalence of radiographic appendicular osteoarthritis and associated clinical signs in young dogs”, Scientific Reports 14:2827 (2024) — a study of limb joints, not spines. We cite it for what it shows about how early pain starts and how easily it is missed. For context: in UK primary-care records, the median dog is 10.5 years old before arthritis is first diagnosed.", "数据引自 Enomoto M 等人，“Prevalence of radiographic appendicular osteoarthritis and associated clinical signs in young dogs”，Scientific Reports 14:2827（2024）——该研究检查的是四肢关节，而非脊椎。我们引用它，是因为它揭示了疼痛开始得多早、又有多容易被忽略。作为参照：在英国基层兽医诊疗记录中，狗要到 10.5 岁（中位数）才首次被诊断出关节炎。"],
    ["Pain doesn't look like pain", "疼痛，看起来不像疼痛"],
    ["They don't complain. They adapt.", "它们不抱怨，只是适应。"],
    ["Chronic pain shows up as behaviour change first — less play, hesitating at stairs, sleeping more. By the time there's an obvious limp, it's already late.", "慢性疼痛最先表现为行为改变——玩得少了、在楼梯前犹豫、睡得更多。等到出现明显跛行，往往已经晚了。"],
    ["Vertebrae, discs, joints and nerves — the same architecture, carried horizontally instead of upright (and with a few more vertebrae through the chest and lower back). Accidents, or repetitive strain over time, can leave a joint moving less freely than it should, just as they do in us. When one segment stops moving well, the body around it compensates: other joints take the load, muscles guard, movement changes, and the joint can quietly deteriorate over time.", "椎骨、椎间盘、关节与神经——相同的结构，只是水平承载而非直立（胸段与腰段还多出几节椎骨）。意外，或长期的重复劳损，都可能让关节活动不如应有的顺畅，就像发生在我们身上一样。当某一节段活动变差，周围的身体便会代偿：其他关节分担负荷、肌肉紧绷防护、动作随之改变，而这个关节可能就在不知不觉中逐渐退化。"],
    ["It should not. Adjustments for animals use very light, specific pressure — far gentler than human care. Pets tend to settle once they work out that nothing is being forced on them. And if yours tells us they have had enough, we stop. That is the whole rule.", "应该不会。动物的矫正使用非常轻柔、精准的力道——远比人的疗程温和。宠物一旦发现没有任何强迫，通常就会安定下来。若你的宠物示意它受够了，我们就停下。规矩就这一条。"],
    ['Not "just age"', "不只是「老了」"],
    ["Much of what owners file under getting old is restricted joints — and unlike age, a restricted joint is something we can work with.", "许多被主人归为「变老」的现象，其实是关节受限——而与年龄不同，受限的关节是我们可以处理的。"],
    ["Same segments, same discs, same nerves — just carried horizontally. When one segment stops moving well, the body around it compensates: other joints take the load, muscles guard, and movement quietly reorganises itself.", "相同的节段、相同的椎间盘、相同的神经——只是水平承载。当某一节段活动变差，周围的身体便会代偿：其他关节分担负荷、肌肉紧绷防护，动作也悄悄地重新组织。"],
    ["That compensation is what you're seeing on the stairs. It looks like aging. Often, it's a joint that simply needs to move again.", "你在楼梯上看到的，正是这种代偿。它看起来像衰老。但往往，只是一个需要重新活动的关节。"],
    ["Same joints, same logic", "相同的关节，相同的道理"],
    ["The Gonstead approach, scaled down and softened", "冈斯特手法，缩小并柔化"],
    ["Your pet can't tell you — but movement talks. These twelve quiet changes are the most common first clues that a joint is restricted or the spine is under strain.", "你的宠物无法开口——但动作会说话。这十二个悄悄的变化，是关节受限或脊椎受压最常见的早期线索。"],
    ["Won't jump anymore", "不再跳跃"],
    ["Hesitates at the sofa, the car boot or the stairs they used to fly up.", "在沙发、后车厢或曾一跃而上的楼梯前犹豫。"],
    ["Walks unevenly", "走路不平衡"],
    ["Favouring one side, running at an angle, or an odd swing in the hips.", "偏向一侧、斜着跑，或臀部摆动异常。"],
    ["Stiff, especially after resting", "僵硬，尤其休息后"],
    ["Slow, careful first steps after a nap — loosening up only after a while.", "小睡后头几步缓慢而小心——过一会儿才舒展开来。"],
    ["Flinches when touched", "被触碰会退缩"],
    ["Ducks, growls or snaps when a specific spot on the back or neck is handled.", "当背部或颈部某处被触碰时，会躲避、低吼或咬人。"],
    ["Licks one spot", "反复舔同一处"],
    ["Obsessively licking or chewing a joint, paw or patch along the spine.", "执着地舔咬某个关节、爪子或脊椎沿线的某处。"],
    ["Mood has changed", "性情变了"],
    ["A playful dog gone withdrawn, or a calm cat suddenly reactive.", "爱玩的狗变得孤僻，或温顺的猫突然易怒。"],
    ["Slower at play", "玩耍变慢"],
    ["Less eager to chase, tug or climb — tiring faster than they used to.", "不再热衷追逐、拉扯或攀爬——比以前更快疲累。"],
    ["Posture looks off", "体态看起来不对"],
    ["A rounded back, a low tail carriage, or a head held stiffly to one side.", "弓背、垂尾，或头僵硬地偏向一侧。"],
    ["Sits to one side", "偏向一侧坐"],
    ['The "mermaid sit" — legs swung to one side instead of a square, even sit.', "「美人鱼坐姿」——双腿甩向一侧，而非端正对称地坐。"],
    ["Slips while walking", "走路打滑"],
    ["Paws losing grip on tiles or wood — back legs sliding on floors that never used to be a problem.", "爪子在瓷砖或木地板上打滑——后腿在从前毫无问题的地板上滑动。"],
    ["Sudden aggression", "突然变凶"],
    ["Growling or snapping out of character — pain often shows as aggression before it shows as a limp.", "反常地低吼或咬人——疼痛往往先表现为攻击性，才表现为跛行。"],
    ["Limping", "跛行"],
    ["An obvious limp, or a subtle head-bob — weight quietly shifted off a leg that hurts.", "明显的跛行，或细微的点头——重心悄悄从疼痛的那条腿移开。"],
    ["Ticked more than one?", "符合不止一项？"],
    ["Message us a short video of your pet walking", "发一段宠物走路的短视频给我们"],
    ["— it helps us see what you see.", "——这能帮我们看到你所看到的。"],
    ["Animal spines work like ours: when a joint stops moving well, the body compensates — and pain, stiffness and behaviour changes follow. Animal chiropractic finds those restricted segments and restores their motion with gentle, specific adjustments.", "动物的脊椎和我们的一样：当关节活动变差，身体便会代偿——随之而来的是疼痛、僵硬与行为变化。动物脊椎矫正找出这些受限的节段，以温和、精准的矫正恢复它们的活动。"],
    ["No cracking, no force. Adjustments for animals use far lighter pressure than human care, sized to the animal — a Chihuahua is not adjusted like a Golden Retriever.", "不「咔哒」作响，不强行施力。动物的矫正所用力度远小于人类护理，并依动物体型而定——吉娃娃的矫正方式绝不同于金毛寻回犬。"],
    ["Gentle, animal-specific techniques — sized to the animal, never forced", "温和、专为动物设计的手法——依动物体型调整，绝不强迫"],
    ["Works alongside your vet's care, never against it", "与你兽医的护理相辅相成，绝不冲突"],
    ["No referral needed", "无需转介"],
    ["— book directly, bring any vet reports you have", "——直接预约，带上你手上的任何兽医报告"],
    ["Dogs & cats welcome", "欢迎猫狗"],
    ["All breeds, all sizes, all temperaments", "所有品种、体型与性情"],
    ["Senior pets", "年长宠物"],
    ["Ageing joints, arthritis support and easier day-to-day movement.", "老化的关节、关节炎支持，以及更轻松的日常活动。"],
    ["Active & sporting dogs", "活跃与运动犬"],
    ["Agility, flyball and park athletes who land hard and turn fast.", "敏捷赛、飞球赛与公园里落地重、转身快的运动健将。"],
    ["Post-injury recovery", "伤后康复"],
    ["Rebuilding comfortable movement after slips, falls or surgery.", "在滑倒、跌落或手术后，重建舒适的活动。"],
    ["Cats too", "猫咪也可以"],
    ["Quiet limpers and reluctant jumpers — handled calmly, at their pace.", "默默跛行、不愿跳跃的猫——平静地、依它的节奏处理。"],
    ["A pet visit is built around trust. We never rush an anxious animal — the first minutes belong to them.", "宠物的到访以信任为本。我们从不催促焦虑的动物——最初的几分钟属于它们。"],
    ["Chat & history", "沟通与病史"],
    ["You tell us what changed. Bring vet reports or scans if you have them.", "你告诉我们有什么变化。如有兽医报告或扫描，请带上。"],
    ["Gait & posture", "步态与体态"],
    ["We watch them walk, sit and turn — often the clearest diagnostic we have.", "我们观察它们走、坐、转身——这往往是我们最清晰的诊断。"],
    ["Gentle adjustment", "温和矫正"],
    ["Light, specific corrections, sized to their body and temperament.", "轻柔、精准的矫正，依它们的体型与性情而定。"],
    ["Home guidance", "居家指导"],
    ["Simple do's and don'ts, and when (or whether) to come back.", "简单的宜与忌，以及何时（或是否）需要复诊。"],
    ["Doctor-led care", "医生主理的护理"],
    ["Every pet is seen by Dr Daniel Tan — the same standard as our human patients.", "每只宠物都由 Dr Daniel Tan 亲自诊治——与我们人类患者同样的标准。"],
    ["Vet-friendly", "兽医友好"],
    ["We complement veterinary care and will tell you honestly if a vet visit should come first.", "我们是兽医护理的补充，若该先看兽医，我们会如实相告。"],
    ["Dogs and cats can be booked directly — no paperwork before the first visit.", "猫狗可直接预约——首次到访前无需任何文件。"],
    ["Will it hurt my pet?", "会弄疼我的宠物吗？"],
    ["No — adjustments for animals use very light, specific pressure. Most pets visibly relax during the session, and many owners are surprised how calm their usually-nervous dog or cat becomes on the table.", "不会——动物的矫正只用非常轻柔、精准的力度。多数宠物在过程中会明显放松，许多主人惊讶于平时紧张的猫狗，在治疗台上竟如此平静。"],
    ["Do I need a referral from my vet?", "我需要兽医的转介吗？"],
    ["No referral is needed — you can book directly for dogs and cats. If your pet has an existing condition, bring any vet reports or X-rays along; they help us build the full picture.", "无需转介——猫狗都可直接预约。如果你的宠物有既有病症，请带上任何兽医报告或X光片；它们能帮我们了解全貌。"],
    ["My cat hates carriers and strangers. Can this still work?", "我的猫讨厌笼子和陌生人。这样还行得通吗？"],
    ["Yes. Cat visits are paced entirely around the cat — we let them settle, work in short windows, and stop before stress builds. If a session needs to be shorter, we adapt rather than force it.", "行得通。猫的到访完全依猫的节奏进行——我们让它们安定下来，在短时段内进行，并在压力累积前停止。若疗程需要更短，我们会调整而非强求。"],
    ["How many sessions will my pet need?", "我的宠物需要多少次疗程？"],
    ["We will not put a number on it before we have seen your pet. Long-standing or age-related cases usually take longer than recent ones. After the first assessment you will get an honest view of what we expect and how we will measure it. If we do not think we can help, we will say so on day one.", "在见到你的宠物之前，我们不会给出一个数字。长期或与年龄相关的情况，通常比新近的问题需要更久。首次评估后，你会得到一个诚实的看法：我们预期什么，以及我们将如何衡量。若我们认为帮不上忙，第一天就会告诉你。"],
    ["When should I go to the vet instead?", "什么情况该先看兽医？"],
    ["Sudden severe pain, suspected fractures, wounds, fever, or any rapidly worsening condition should go to your vet first. Chiropractic care is for movement and alignment — and we will redirect you to a vet the moment something looks outside our scope.", "突发剧痛、疑似骨折、伤口、发烧，或任何迅速恶化的情况，都应先看兽医。脊椎矫正针对的是活动与力线——一旦发现超出我们范围的状况，我们会立即请你转诊兽医。"],
    ["WhatsApp us a short video of your pet walking, or book a gentle first assessment at Mid Valley.", "用 WhatsApp 发一段宠物走路的短视频给我们，或在 Mid Valley 预约一次温和的首次评估。"],

    /* ================= NEWS ================= */
    ["Clinic announcements, monthly offers, honest spine advice and the occasional very good dog.", "诊所公告、每月优惠、诚实的脊椎建议，以及偶尔出现的超乖狗狗。"],
    ["All", "全部"],
    ["Clinic Updates", "诊所动态"],
    ["Health Tips", "健康贴士"],
    ["Events & Offers", "活动与优惠"],
    ["Pet Corner", "宠物专区"],
    ["Merdeka special", "默迪卡特惠"],
    ["Stand tall this Merdeka — RM50 off your first assessment", "这个默迪卡，挺直腰板——首次评估立减 RM50"],
    ["Celebrate independence from aches. All August, new patients get RM50 off the full first assessment: history, five-point Gonstead examination, X-ray analysis if needed, and a plain-language report of findings.", "庆祝摆脱酸痛的独立。整个八月，新患者可享完整首次评估立减 RM50：病史、五项冈斯特检查、必要时的X光分析，以及一份平实易懂的检查报告。"],
    ["August 2026", "2026年8月"],
    ["We are now open on Saturdays", "我们现在周六也营业了"],
    ["Weekday schedule too tight? Saturday slots are now live, 9am to 7pm — book early, they move fast.", "平日时间太紧？周六时段现已开放，上午9点至晚上7点——请尽早预约，名额抢手。"],
    ["June 2026", "2026年6月"],
    ["Read", "阅读"],
    ["Animal Chiro is here — dogs & cats, no referral needed", "动物脊椎矫正来了——猫狗皆宜，无需转介"],
    ["The same gentle Gonstead philosophy, adapted for four legs. Here is what a first pet visit looks like.", "同样温和的冈斯特理念，为四条腿而调整。以下是宠物首次到访的样子。"],
    ["5 desk habits your spine will thank you for", "5 个让脊椎感激你的办公习惯"],
    ["A 2-minute stretch break every hour beats an expensive chair. Small habits, compounding relief.", "每小时2分钟的伸展休息，胜过一把昂贵的椅子。小习惯，累积成大缓解。"],
    ["Slipped disc: do you really need surgery?", "椎间盘突出：你真的需要手术吗？"],
    ["Surgery is not usually the first step for a disc problem. What the research says — and when surgery genuinely is the answer.", "椎间盘问题，手术通常不是第一步。研究怎么说——以及何时手术才真的是答案。"],
    ["May 2026", "2026年5月"],
    ["What makes Gonstead different from a regular adjustment?", "冈斯特与普通矫正有何不同？"],
    ["Five diagnostic checks before a single correction. Why specificity beats the all-over crack.", "在做任何矫正前，先做五项诊断检查。为何精准胜过全身「咔哒」。"],
    ["Bring a friend: referral perks for existing patients", "带上朋友：老患者的转介福利"],
    ["Good spines are contagious. Refer a friend and you both get a little something on your next visit.", "好脊椎会「传染」。转介一位朋友，你们下次到访都能获得小小回馈。"],
    ["Monthly updates, health tips and first dibs on promo slots — straight to WhatsApp, no spam.", "每月更新、健康贴士，以及优惠时段的优先预订——直接发到 WhatsApp，绝无骚扰。"],
    ["Get Updates on WhatsApp", "在 WhatsApp 获取更新"],
    ["Follow on Instagram", "在 Instagram 关注我们"],

    /* ================= SHOP ================= */
    ["We only sell what we prescribe. Four recovery essentials, hand-picked by Dr Daniel — no fillers, no gimmicks, ordered in one WhatsApp message.", "我们只卖我们会推荐的东西。四款康复必需品，由 Dr Daniel 亲自甄选——没有凑数，没有噱头，一条 WhatsApp 消息即可下单。"],
    ["Scroll to browse", "向下滚动浏览"],
    ["01 / 04 — Sleep", "01 / 04 — 睡眠"],
    ["Eight hours a night is your longest treatment session — make it count. Contoured to keep the neck's natural curve supported whether you sleep on your back or side.", "一晚八小时，是你最长的一次「治疗」——别浪费它。符合人体工学的曲线设计，无论仰睡还是侧睡，都能托住颈部的自然弧度。"],
    ["Back & side sleepers", "仰睡与侧睡皆宜"],
    ["Two height profiles", "两种高度"],
    ["Hypoallergenic foam", "低致敏泡棉"],
    ["Order via WhatsApp", "透过 WhatsApp 下单"],
    ["02 / 04 — Sit", "02 / 04 — 久坐"],
    ["For the office chair, the car seat, and every long Grab ride in between. Fills the gap your lower back has been bracing against all day.", "为办公椅、车座，以及中间每一趟漫长的 Grab 车程而设。填补你下背一整天苦苦支撑的空隙。"],
    ["Office & car", "办公室与车用"],
    ["Anti-slip strap", "防滑绑带"],
    ["Breathable mesh cover", "透气网布套"],
    ["03 / 04 — Stand", "03 / 04 — 站姿"],
    ["A gentle reminder, not a cage. Worn 20–30 minutes a day to retrain rounded shoulders while your adjustments hold the new alignment.", "温和的提醒，而非束缚。每天佩戴20–30分钟，在矫正维持新力线的同时，重新训练圆肩。"],
    ["20–30 min a day", "每天20–30分钟"],
    ["Adjustable fit", "松紧可调"],
    ["Wearable under clothes", "可穿在衣服内"],
    ["04 / 04 — Give", "04 / 04 — 赠礼"],
    ['For the parent who "is fine", the friend who cracks their own neck, the runner who limps on Mondays. A voucher toward any assessment or session — human or pet.', "送给那位「我没事」的父母、那位自己扭脖子的朋友、那位每逢周一就跛脚的跑者。一张可用于任何评估或疗程的礼券——人或宠物皆可。"],
    ["Digital or printed card", "电子或实体卡"],
    ["Valid for any service", "适用于任何服务"],
    ["6-month validity", "6个月有效期"],
    ["1. Message us", "1. 联系我们"],
    ['Tap "Order via WhatsApp" — the message is pre-filled with your item. Ask us anything before you commit.', "点击「透过 WhatsApp 下单」——消息已预填你选的商品。下单前尽管向我们询问。"],
    ["2. Pay your way", "2. 随你付款"],
    ["Bank transfer or Touch 'n Go by WhatsApp, or pay at the clinic when you collect. Receipt included.", "透过 WhatsApp 银行转账或 Touch 'n Go，或取货时在诊所付款。附收据。"],
    ["3. Collect or deliver", "3. 自取或配送"],
    ["Pick up at Mid Valley with a free fitting from our team, or we ship anywhere in Malaysia.", "在 Mid Valley 自取并由我们团队免费调校，或我们配送至马来西亚各地。"],
    ["Wrong size or firmness? Exchange within 7 days, unused.", "尺寸或软硬不合？未使用可在7天内更换。"],
    ['"Patients kept asking what pillow to buy, so I did the homework once, properly. This is the shortlist — the same four things I recommend in the treatment room. If you don\'t need it, I\'ll tell you."', "「患者不断问我该买什么枕头，于是我认真地做了一次功课。这就是精选清单——正是我在诊疗室里推荐的那四样。如果你不需要，我会直接告诉你。」"],
    ["— Dr Daniel Tan, Aligned", "—— Dr Daniel Tan，Aligned"],
    ["The right pillow supports a healthy spine — the assessment is what gets you one. Start there.", "合适的枕头能支撑健康的脊椎——但让你拥有健康脊椎的，是评估。从这里开始。"]
  ];

  /* ================================================================
     HEAD — [ English innerHTML, 中文 innerHTML ] for .tsplit headings
     (matched by plain text, so the reveal animation's word-splitting
     does not break the swap). Proper names are intentionally left in
     English on both sides — they are not in this list.
     ================================================================ */
  var HEAD = [
    /* index */
    ['A New <span class="alt">Definition</span> Of Health', '健康的<span class="alt">全新定义</span>'],
    ["Movement is <em>freedom.</em>", "运动即<em>自由。</em>"],
    ['Back pain, a stiff neck, or pain that <span class="u">keeps coming back?</span>', '腰背痛、颈部僵硬，还是<span class="u">反复发作的疼痛？</span>'],
    ["What are we helping you with?", "我们能帮你解决什么？"],
    ["Our services.", "我们的服务。"],
    ["Five-point diagnostics, down to the segment.", "五项精准诊断，细致入微。"],
    ["The doctor behind every adjustment.", "每一次矫正，都有医生亲自把关。"],
    ["Happy patients.", "满意的患者。"],
    ["Five steps, from listening to lasting.", "五个步骤，从倾听到长效康复。"],
    ["Now with Animal Chiro.", "现已推出动物脊椎矫正。"],
    ["Your body has carried you this far. <em>Let's help it carry you further.</em>", "你的身体已带你走了这么远。<em>让我们助它带你走得更远。</em>"],

    /* about */
    ['The people behind <span class="alt">Aligned.</span>', 'Aligned 背后的<span class="alt">团队。</span>'],
    ["Small clinic. Stubborn standards.", "小小诊所，执着标准。"],
    ["Meet the team.", "认识我们的团队。"],
    ["Come see where the work happens.", "来看看我们工作的地方。"],
    ["Right in Mid Valley City.", "就在 Mid Valley City。"],
    ["Now you know us. <em>Let us get to know your spine.</em>", "现在你了解我们了。<em>也让我们了解你的脊椎。</em>"],

    /* chiropractic */
    ['Built by a mechanic. <span class="alt">Trusted for a century.</span>', '由技师创立，<span class="alt">历经百年信赖。</span>'],
    ["The five criteria, in detail.", "五项标准，逐一详解。"],
    ["What brings people through our door.", "人们为什么走进我们的诊所。"],
    ["No hidden fees. No surprise add-ons.", "没有隐藏费用，没有额外惊喜账单。"],
    ["Common FAQ.", "常见问题。"],
    ["Stop living in pain. <em>Find out what is causing it.</em>", "别再忍痛度日。<em>找出真正的病根。</em>"],

    /* pet-chiro */
    ["Your dog is not getting lazy. <span class=\"alt\">He is getting stuck.</span>", '你的狗狗不是变懒了，<span class="alt">而是身体「卡住」了。</span>'],
    ["Dogs are built to hide it.", "狗狗天生懂得隐藏疼痛。"],
    ["His spine works on the same principles as yours.", "它的脊椎，和你遵循同样的原理。"],
    ["Watch what he does, not what he says.", "看它怎么做，而不是听它怎么说。"],
    ["Chiropractic, translated for four legs.", "脊椎矫正，为四条腿而生。"],
    ["From senior nappers to weekend sprinters.", "从爱睡的老伙伴到周末小飞毛腿。"],
    ["Calm, unhurried, at their pace.", "平静、不催促，跟着它的节奏。"],
    ["Handled like family. Because they are.", "像家人一样对待，因为它们就是。"],
    ["What pet parents usually ask.", "毛孩家长最常问的问题。"],
    ["They'd book it themselves <em>if they had thumbs.</em>", "如果它们有拇指，<em>早就自己预约了。</em>"],

    /* news */
    ["What's new <em>at Aligned.</em>", "Aligned 的<em>最新动态。</em>"],
    ["Never miss an offer or an opening.", "不错过任何优惠与空档。"],
    ["Read enough. <em>Feel the difference instead.</em>", "看得够多了。<em>不如亲身感受不同。</em>"],

    /* shop */
    ["Recover at home, <em>the aligned way.</em>", "在家康复，<em>以 Aligned 的方式。</em>"],
    ["Cervical Support Pillow", "颈椎支撑枕"],
    ["Lumbar Support Cushion", "腰部支撑靠垫"],
    ["Posture Trainer", "体态矫正带"],
    ["Gift a Spine Check", "送一次脊椎检查"],
    ["Three steps. No checkout maze.", "三个步骤，没有繁琐结账。"],
    ["Tools help. <em>Alignment fixes.</em>", "工具有帮助，<em>矫正才治本。</em>"]
  ];

  /* ---------- left-rail section labels (homepage) ---------- */
  var PROG = {
    "Home": "首页",
    "Our Belief": "我们的信念",
    "The Problem": "问题所在",
    "Self-Check": "自我检测",
    "Services": "服务",
    "Gonstead": "冈斯特",
    "About Us": "关于我们",
    "Stories": "患者故事",
    "Your Journey": "你的疗程",
    "Collaborations": "合作与活动",
    "Animal Chiro": "动物脊椎矫正",
    "Contact": "联系"
  };

  /* ---------- build lookup maps ---------- */
  var FWD = {};                 // normalised English -> 中文 (text nodes)
  TEXT.forEach(function (p) { FWD[norm(p[0])] = p[1]; });
  Object.keys(PROG).forEach(function (k) { FWD[norm(k)] = PROG[k]; });

  var HEADMAP = {};             // normalised text -> {en, zh}
  HEAD.forEach(function (p) {
    var e = { en: p[0], zh: p[1] };
    HEADMAP[textOf(p[0])] = e;
    HEADMAP[textOf(p[1])] = e;
  });

  /* ---------- collect translatable nodes once ---------- */
  var STORE = "aligned-lang";
  var langBtn = document.getElementById("langBtn");
  var listeners = [];
  var cur = "en";

  var textTargets = [];  // { node, orig, lead, trail, zh }
  var headTargets = [];  // .tsplit elements

  function collect() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (p.closest("script,style,noscript,.tsplit,#langBtn,#navToggle,#vprogLabel")) {
          return NodeFilter.FILTER_REJECT;
        }
        return norm(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      var orig = n.nodeValue;
      var zh = FWD[norm(orig)];
      if (!zh) continue;
      var lead = orig.slice(0, orig.length - orig.replace(/^\s+/, "").length);
      var trail = orig.slice(orig.replace(/\s+$/, "").length);
      textTargets.push({ node: n, orig: orig, lead: lead, trail: trail, zh: zh });
    }
    headTargets = Array.prototype.slice.call(document.querySelectorAll(".tsplit"));
  }

  /* ---------- apply a language ---------- */
  function paintPill(lang) {
    if (!langBtn) return;
    langBtn.innerHTML = '<i class="ph ph-globe"></i> ' + (lang === "zh" ? "EN" : "中文");
    langBtn.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
  }

  function apply(lang) {
    var zh = lang === "zh";
    textTargets.forEach(function (t) {
      t.node.nodeValue = zh ? (t.lead + t.zh + t.trail) : t.orig;
    });
    headTargets.forEach(function (el) {
      var e = HEADMAP[norm(el.textContent)];
      if (e) { el.innerHTML = e[lang]; el.classList.add("ts-in"); }
    });
    document.documentElement.lang = zh ? "zh" : "en";
    paintPill(lang);
    cur = lang;
    listeners.forEach(function (cb) { try { cb(lang); } catch (err) {} });
    // fire a DOM event too — decoupled from load order, so scripts that
    // ran before this file (the homepage inline script) can still listen.
    try { document.dispatchEvent(new CustomEvent("aligned:lang", { detail: lang })); } catch (err) {}
  }

  /* ---------- public API (assigned before init so listeners firing
     during the initial apply() can already use it) ---------- */
  window.AlignedI18n = {
    get lang() { return cur; },
    t: function (en) { return cur === "zh" ? (FWD[norm(en)] || en) : en; },
    onChange: function (cb) { if (typeof cb === "function") listeners.push(cb); }
  };

  /* ---------- init ---------- */
  collect();
  var stored = "en";
  try { stored = localStorage.getItem(STORE) || "en"; } catch (err) {}
  paintPill(stored);
  if (stored === "zh") { apply("zh"); } else { cur = "en"; }

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      var next = cur === "en" ? "zh" : "en";
      try { localStorage.setItem(STORE, next); } catch (err) {}
      apply(next);
    });
  }
})();
