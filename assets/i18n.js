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
    ["Skip to content", "跳到内容"],
    ["Gonstead", "Gonstead"],
    ["Animal Chiro", "宠物脊椎矫正"],
    ["About Us", "关于我们"],
    ["News & Updates", "最新消息"],
    ["Shop", "商店"],
    ["Book Assessment", "预约评估"],
    ["Book now", "立即预约"],
    ["WhatsApp Us", "WhatsApp 我们"],
    ["Call", "打电话"],

    /* ---- footer ---- */
    ["A premium chiropractic and movement-recovery clinic at Mid Valley City, Kuala Lumpur, treating the root cause of pain with the Gonstead method.", "吉隆坡 Mid Valley City 的脊椎矫正与运动康复诊所。我们用 Gonstead 疗法找出痛的根源，从源头处理。"],
    ["Care", "诊疗"],
    ["Clinic", "诊所"],
    ["Visit us", "来找我们"],
    ["Gonstead Chiropractic", "Gonstead 脊椎矫正"],
    ["Conditions", "常见症状"],
    ["Gonstead diagnostics", "Gonstead 检查法"],
    ["Patient stories", "患者故事"],
    ["About us", "关于我们"],
    ["Pricing", "收费"],
    ["FAQs", "常见问题"],
    ["Mon to Sat, 9am to 7pm", "星期一至星期六，早上9点到晚上7点"],
    ["© 2026 Aligned Clinic. Helping Malaysia move better.", "© 2026 Aligned Clinic。让马来西亚人动得更自在。"],
    ["Mid Valley City, Kuala Lumpur, Malaysia", "Mid Valley City，吉隆坡，马来西亚"],

    /* ================= INDEX ================= */
    ["We treat the root cause of your pain, not just the symptom. Precise, methodical spinal care built around long-term recovery.", "我们要处理的是痛的根源，不是把症状压下去而已。精准、有章法的脊椎治疗，目标是长期不再复发。"],
    ["Years of practice", "年临床经验"],
    ["Patients realigned", "位患者重新站直"],
    ["Average patient rating", "患者平均评分"],
    ["Aligned exists to find what is actually driving your pain, and to treat that — through the Gonstead Chiropractic system, segment by segment.", "Aligned 存在的意义，就是找出真正让你痛的那个原因，然后处理它。我们用 Gonstead 脊椎矫正系统，一节一节地查。"],
    ["Our doctors take the time it takes. Nothing gets adjusted that the examination has not earned.", "该花多少时间，我们的医生就花多少时间。检查没有证实的地方，我们一节都不会动。"],
    ["Relief should not be temporary.", "舒服，不该只有一阵子。"],
    ["Learn more", "了解更多"],
    ["The gold standard for chiropractic systems", "脊椎矫正的黄金标准"],
    ["Gonstead — precise, full-spine, practised worldwide", "Gonstead：精准、全脊椎，全球通行"],
    ["Too many people live with recurring pain, poor posture, stress and old injuries that quietly limit everyday life. You adapt around it until adapting stops working.", "反复发作的痛、走样的姿势、压力和旧伤，正悄悄缩小太多人的生活范围。你一让再让，直到再也让不下去。"],
    ["Recurring pain", "反复疼痛"],
    ["Poor posture", "姿势不良"],
    ["Old injuries", "旧伤"],
    ["Daily stress", "日常压力"],
    ["The pain", "疼痛"],
    ["cycle", "循环"],
    ["We treat a wide range of conditions. Drag through the deck — or just let it play.", "我们处理的症状很多。滑动卡片看看，或者让它自己播。"],
    ["Drag the cards, or tap one to bring it forward", "滑动卡片，或点一下把它拉到最前"],

    /* conditions — homepage deck */
    ["Slipped Disc", "椎间盘突出"],
    ["Back Pain", "腰背痛"],
    ["Sciatica", "坐骨神经痛"],
    ["Neck Pain", "颈部疼痛"],
    ["Headache & Migraine", "头痛与偏头痛"],
    ["Whiplash", "颈椎挥鞭伤"],
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
    ["A bulging or herniated disc pressing on nearby nerves, causing pain, numbness or weakness.", "椎间盘膨出或突出，压到旁边的神经，于是痛、麻、使不上力。"],
    ["Lower or mid-back pain from poor posture, strain or spinal misalignment that wears you down.", "姿势不良、劳损或脊椎错位带来的下背、中背痛，一天天磨着你。"],
    ["Sharp, radiating pain down the leg from an irritated or compressed sciatic nerve.", "坐骨神经受刺激或被压住，痛感沿着腿一路窜下去。"],
    ["Stiffness and ache from tech-neck, tension or restricted joints in the upper spine.", "长期低头、肌肉紧绷，或颈椎关节卡住，颈就又硬又酸。"],
    ["Recurring head pain often rooted in upper-neck tension and spinal misalignment.", "反复发作的头痛，源头往往在颈椎上段的紧绷与错位。"],
    ["Neck strain after a sudden impact, leaving lingering stiffness, pain and headaches.", "突然撞击后的颈部拉伤，留下挥之不去的僵硬、疼痛和头痛。"],
    ["Restricted, aching shoulders from posture, overuse or underlying joint dysfunction.", "姿势、过度使用，或关节本身的问题，让肩膀又紧又酸。"],
    ["Painful, inflamed tendons on the outer elbow from repetitive gripping and strain.", "反复抓握、用力过度，手肘外侧的肌腱发炎作痛。"],
    ["Tingling, numbness and weakness in the hand from a compressed nerve at the wrist.", "手腕的神经被压住，手掌开始发麻、刺痛、握不住东西。"],
    ["Stiffness or pain in the hip that quietly limits how freely you move and walk.", "髋部僵硬或疼痛，悄悄缩小你走路和活动的范围。"],
    ["Aching or unstable knees from alignment issues, overuse or an old injury.", "关节排列不正、用得太多或旧伤，让膝盖发酸、发软。"],
    ["Strains, sprains and overuse injuries that keep you off the field or out of training.", "拉伤、扭伤和用过头的损伤，让你上不了场、练不下去。"],
    ["A sideways curve of the spine that we assess, monitor and help you manage.", "脊椎往侧边弯，我们为你评估、追踪，并协助控制。"],
    ["Retraining rounded shoulders and a forward head back into healthy alignment.", "把圆肩和前倾的头，重新训练回该在的位置。"],
    ["Gentle, adapted care for back and pelvic comfort, trimester by trimester.", "随着每个孕期调整的温和照顾，让腰背和骨盆舒服一些。"],
    ["Gentle assessments and care tailored to growing spines and developing posture.", "为还在长的脊椎和发育中的姿势，做温和的检查与照顾。"],

    /* services */
    ["Care tailored to your body, and to what the examination actually finds. From precise spinal adjustments to active rehab — and gentle care for the companions who move beside you.", "治疗按你的身体来，也按检查真正查到的来。从精准的脊椎矫正，到主动的康复训练，还有给身边那位毛孩的温和照顾。"],
    ["Chiro Adjustment", "脊椎矫正"],
    ["Specific, full-spine Gonstead adjustments that restore alignment and ease the irritation around the nerve — treating the root cause, not just the symptom.", "精准的全脊椎 Gonstead 矫正，让椎骨回到该在的位置，减轻神经周围的刺激。处理的是根源，不是症状。"],
    ["See the method", "看看这套方法"],
    ["Rehab", "康复训练"],
    ["Targeted movement and strengthening that rebuilds what the pain took away, so the same problem does not return once you are back on your feet.", "针对性的动作与力量训练，把痛拿走的能力练回来。等你重新站起来，同样的问题不会再找上门。"],
    ["Start rehab", "开始康复训练"],
    ["The same precise, gentle philosophy — now for your animals. Chiropractic care designed to keep pets moving comfortably through every life stage.", "同样精准而温和的一套，现在也给你的毛孩。专为宠物设计的脊椎矫正，让它们每个阶段都动得舒服。"],
    ["Explore Animal Chiro", "了解宠物脊椎矫正"],
    ["Adapted to all ages", "不分年龄"],
    ["Children to seniors", "从小孩到长辈"],
    ["Precision", "精准"],
    ["Down to the segment", "精准到每一节"],
    ["Personalised", "量身定制"],
    ["Adjustment just for you", "只属于你的矫正"],
    ["On-site X-ray", "诊所内 X 光"],
    ["Weight-bearing analysis", "站立负重分析"],

    /* gonstead 5 (homepage) */
    ["Precision is not optional. Before a single adjustment is made, the Gonstead system checks your spine five separate ways.", "精准不是加分项，是前提。动手矫正之前，Gonstead 会用五种方式，把你的脊椎分别查一遍。"],
    ["Visualization", "目视观察"],
    ["Reading posture, gait and symmetry for the subtle deviations that point to where the trouble starts.", "看你的站姿、走路和左右对称，找出指向问题源头的细微偏差。"],
    ["Instrumentation", "仪器检测"],
    ["A dual-probe Nervoscope reads small side-to-side differences in skin temperature, flagging the levels worth a closer look.", "双探头 Nervoscope 量出脊椎两侧皮温的细微差异，标出值得细看的节段。"],
    ["Static palpation", "静态触诊"],
    ["Feeling the spine at rest for swelling, tenderness and tight muscles around each segment.", "在放松状态下摸过脊椎，找每一节周围的肿胀、压痛和肌肉紧绷。"],
    ["Motion palpation", "动态触诊"],
    ["Moving the spine through its ranges to find fixed or locked joints that are not travelling freely.", "带着脊椎活动到各个角度，找出卡住、动不开的关节。"],
    ["X-ray analysis", "X 光分析"],
    ["Full-length, weight-bearing radiographs reveal exact alignment and disc integrity under real load.", "站立负重的全脊椎 X 光，看清真实受力下的排列和椎间盘状况。"],

    /* doctors / stories */
    ["Human connection first. You will know your doctor, and your doctor will know your spine.", "先是人，然后才是治疗。你会认得你的医生，你的医生也会认得你的脊椎。"],
    ["Chiropractor · Gonstead System", "脊椎矫正师 · Gonstead 系统"],
    ["Chiropractor · Gonstead System · (sample profile)", "脊椎矫正师 · Gonstead 系统 ·（示范档案）"],
    ["Chiropractor · Sports & Recovery · (sample profile)", "脊椎矫正师 · 运动与恢复 ·（示范档案）"],
    ["Rehab & Movement Therapist · (sample profile)", "康复与动作治疗师 ·（示范档案）"],
    ["Clinic Manager · Patient Care · (sample profile)", "诊所经理 · 患者服务 ·（示范档案）"],
    ["Years of practice (sample)", "年临床经验（示范）"],
    ["Patients realigned (sample)", "位患者重新站直（示范）"],
    ["Average patient rating (sample)", "患者平均评分（示范）"],
    ["Office manager, Cheras (sample)", "办公室经理，蕉赖（示范）"],
    ["Engineer, Kuala Lumpur (sample)", "工程师，吉隆坡（示范）"],
    ["Photographer, Ampang (sample)", "摄影师，安邦（示范）"],
    /* the five team cards on the homepage rail — one per profile on
       about.html. Short card bios, deliberately not the same strings as the
       longer about.html versions. */
    ["Built Aligned around patient education and the kind of careful, full-spine work that holds up over years, not weeks.", "他把 Aligned 建立在两件事上：把话讲清楚，还有扎实的全脊椎治疗。效果要以年算，不是以星期算。"],
    ["Takes the complicated histories. If the five criteria do not agree, she keeps examining until they do.", "病史复杂的个案都交给她。五项检查只要对不上，她就一直查到对上为止。"],
    ["A former competitive athlete. Expect him to watch how you move before he ever touches your spine.", "他以前是运动员。碰你的脊椎之前，他会先看你怎么动。"],
    ["Takes over where the adjustment ends, rebuilding the strength that keeps a corrected spine corrected.", "矫正做完之后就交给她。把力量练回来，脊椎才守得住。"],
    ["The first voice you hear. Bookings, reports and insurance paperwork, all handled before you arrive.", "你第一个听到的声音就是她。预约、报告、保险文件，你还没到就都安排好了。"],
    ["Sports recovery", "运动康复"],
    ["Posture", "姿势体态"],
    ["Chronic pain", "慢性疼痛"],
    ["Sports injury", "运动损伤"],
    ["Active recovery", "主动恢复"],
    ["Strength", "力量训练"],
    ["Mobility", "活动度"],
    ["Movement retraining", "动作重建"],
    ["Bookings", "预约"],
    ["Insurance", "保险"],
    ["More about Dr Daniel", "更多关于 Daniel 医生"],
    ["More about Dr Sarah", "更多关于 Sarah 医生"],
    ["More about Dr Marcus", "更多关于 Marcus 医生"],
    ["More about Jasmine", "更多关于 Jasmine"],
    ["More about Amanda", "更多关于 Amanda"],
    ['"Two years of lower back pain, gone in a structured plan. I finally understand my own spine."', "「下背痛了两年，跟着疗程一步步做，就这样没了。我终于搞懂自己的脊椎是怎么回事。」"],
    ["Office manager, Cheras", "办公室经理，蕉赖"],
    ['"My sciatica used to dictate my week. Now I am back to weekend football with my kids."', "「以前一个星期怎么过，都由坐骨神经痛说了算。现在周末我又能陪孩子踢球了。」"],
    ["Engineer, Kuala Lumpur", "工程师，吉隆坡"],
    ['"The x-ray analysis showed me exactly what was wrong. No guessing, just a clear plan."', "「X 光一摆出来，问题在哪清清楚楚。不用猜，接下来怎么做也很明确。」"],
    ["Photographer, Ampang", "摄影师，安邦"],

    /* journey / collab / pet / final (homepage) */
    ["A guided path that reduces uncertainty at every stage, so you always know what comes next.", "每一步都有人带着走，你随时知道下一步是什么。"],
    ["Listen", "先听你说"],
    ["We take a full history and understand how pain shapes your day.", "完整问过病史，也弄清楚痛怎么影响你的每一天。"],
    ["Assess", "检查"],
    ["Examination, pre-check and weight-bearing x-ray analysis.", "详细检查、预检，加上站立负重 X 光分析。"],
    ["Personalise", "定方案"],
    ["A treatment plan built around your spine and your goals.", "围绕你的脊椎和你的目标，定出治疗方案。"],
    ["Restore", "调回来"],
    ["Specific adjustments and rehab to restore alignment and integrity.", "精准矫正加康复训练，把排列和稳定度调回来。"],
    ["Maintain", "守住它"],
    ["Guidance and follow-up so relief holds for the long term.", "后续的指导与跟进，让舒服的状态守得住。"],
    ["Collaborations & experiences", "合作与活动"],
    ["Sports event support", "体育赛事支援"],
    ["Gonstead seminars", "Gonstead 研讨会"],
    ["Corporate wellness talks", "企业健康讲座"],
    ["Community screenings", "社区义检"],
    ["Working with athletes", "与运动员合作"],
    ["Overseas training", "海外进修"],
    ["The same precise, gentle philosophy, for the companions who move beside you. Chiropractic care designed for pets, now at Aligned.", "同样精准而温和的一套，献给一直跟在你身边的它。专为宠物设计的脊椎矫正，现在 Aligned 也有了。"],
    ["Book a comprehensive assessment at Mid Valley and find out exactly what your spine needs.", "到 Mid Valley 做一次完整评估，看看你的脊椎到底需要什么。"],

    /* landing overlay (homepage) */
    ["🎁 Merdeka special", "🎁 Merdeka 国庆特惠"],
    ["RM50 off your first assessment. New patients only — valid all August.", "首次评估减 RM50，只限新患者，八月整个月都有效。"],
    ["Claim This Offer", "领取优惠"],
    ["📣 What's new", "📣 最新消息"],
    ["Now open on Saturdays — and", "星期六也开门了，还有"],
    ["consultations are here.", "咨询，现已开放。"],
    ["Book your slot", "预约时段"],
    ["💡 This month's health tip", "💡 本月健康贴士"],
    ["Sit less, move more — a 2-minute stretch break every hour keeps your spine happier.", "少坐一点，多动一点。每小时起来伸展两分钟，脊椎会舒服很多。"],

    /* ================= ABOUT ================= */
    ["One clinic, one standard: doctors and a care team who treat the cause, not just the symptom.", "一家诊所，一个标准：医生和团队治的是原因，不只是症状。"],
    ["The beginning", "起点"],
    ["Trained in the Gonstead system", "受训于 Gonstead 系统"],
    ["Years of study under the full-spine Gonstead discipline — precision diagnostics before any adjustment, every time.", "多年钻研全脊椎的 Gonstead 体系。每一次矫正之前，都先把诊断做到位。"],
    ["Founding", "创立"],
    ["Aligned opens its doors", "Aligned 开门营业"],
    ["A clinic built around one promise: patients leave understanding their own spine, not just feeling briefly better.", "一家只为一个承诺而开的诊所：患者走出去时，是真的懂了自己的脊椎，而不只是舒服了一下。"],
    ["Growth", "成长"],
    ["On-site X-ray & rehab care", "诊所内 X 光与康复训练"],
    ["Weight-bearing X-ray analysis and movement rehab brought under one roof, so nothing about your care is guesswork.", "站立负重 X 光分析和运动康复搬进同一个屋檐下，你的治疗里不再有「猜」这回事。"],
    ["Today", "今天"],
    ["Animal Chiro joins the family", "宠物脊椎矫正加入我们"],
    ["The same gentle philosophy, extended to the dogs and cats who move beside us — no referral needed.", "同样温和的一套，延伸到陪着我们走的猫和狗身上，不需要转介信。"],
    ["Founder · Chiropractor · Gonstead System", "创办人 · 脊椎矫正师 · Gonstead 系统"],
    ["Daniel believes recovery is a partnership. His consultations run long, on purpose — because a patient who understands their spine makes better decisions for it, long after they leave the clinic.", "Daniel 相信康复是两个人一起完成的事。他的问诊特别长，是故意的：一个真正懂自己脊椎的患者，离开诊所很久以后，还会为它做出对的选择。"],
    ["He built Aligned around patient education and the kind of careful, full-spine work that holds up over years, not weeks. When he is not adjusting spines, he is probably explaining one — with the X-ray on the screen and a model vertebra in hand.", "他把 Aligned 建立在两件事上：把话讲清楚，以及扎实的全脊椎治疗——效果要以年算，不是以星期算。没在矫正脊椎的时候，他多半在讲解脊椎：屏幕上是 X 光片，手里拿着一节椎骨模型。"],
    ["Registered, Gonstead Chiropractic Society (Australia)", "Gonstead 脊椎矫正学会（澳洲）注册成员"],
    ["Member, Association of Chiropractic Malaysia", "马来西亚脊椎矫正协会会员"],
    ["Focus: full-spine Gonstead, sports recovery, posture", "专长：全脊椎 Gonstead、运动康复、姿势体态"],
    ["Also leads our Animal Chiro care for dogs & cats", "同时主理我们的猫狗脊椎矫正"],
    ['"If I can\'t explain why it hurts, I haven\'t finished examining."', "「如果我讲不出你为什么会痛，那就是我还没检查完。」"],
    ["Sarah is the one who gets the complicated histories. Patients with long, complicated histories tend to end up in her room — and leave with a shorter, clearer story about what is actually going on.", "复杂的病例，最后都会转到 Sarah 手上。那些病史又长又乱的患者常常走进她的诊室，离开时，手上握着一个简短清楚的答案：问题到底出在哪。"],
    ["She is meticulous about the five criteria: if the evidence does not agree, she keeps examining until it does.", "她对五项标准非常执着：只要证据对不上，她就一直查，查到对上为止。"],
    ["Doctor of Chiropractic", "脊椎矫正博士"],
    ["Focus: chronic pain, scoliosis, posture", "专长：慢性疼痛、脊椎侧弯、姿势体态"],
    ['"The spine always tells the truth — you just have to check all five ways."', "「脊椎从来不说谎，只看你有没有把五种方式都查一遍。」"],
    ['A former competitive athlete, Marcus knows what it feels like to be told to "just rest". His work focuses on getting active bodies back to the sport they love — stronger than before the injury.', "Marcus 以前是竞技运动员，被人叫「休息就好」是什么滋味，他最清楚。他专门帮爱动的身体回到自己喜欢的运动上，而且比受伤前更强。"],
    ["Expect him to watch how you move before he ever touches your spine.", "在碰你的脊椎之前，他一定先看你怎么动。"],
    ["Focus: sports injury, active recovery, rehab", "专长：运动损伤、主动康复、复健"],
    ['"Rest treats the calendar. We treat the cause."', "「休息只是在等日子过，我们处理的是原因。」"],
    ["Jasmine takes over where the adjustment ends. Her rehab sessions rebuild the strength and movement habits that keep a corrected spine corrected — so results last beyond the clinic door.", "矫正结束的地方，就是 Jasmine 接手的地方。她的康复训练把力量和动作习惯练回来，让调好的脊椎稳得住，效果一路带出诊所门外。"],
    ["Patients describe her sessions as tough, kind and strangely fun.", "患者说她的训练很严，人很好，而且莫名地好玩。"],
    ["Certified rehabilitation therapist", "认证康复治疗师"],
    ["Focus: strength, mobility, movement retraining", "专长：力量、灵活度、动作再训练"],
    ['"The adjustment opens the door. Movement keeps it open."', "「矫正把门打开，运动让它一直开着。」"],
    ["Amanda is the first voice you hear and the person who makes every visit run on time. From bookings to insurance paperwork to remembering how you take your appointment reminders, she has it handled.", "Amanda 是你听到的第一把声音，也是让每次到访都准时的人。从预约、保险文件，到记得你想怎么收提醒，她全都打点好。"],
    ["If something about your visit could be smoother, she wants to know.", "如果哪里可以更顺一点，她很想听你说。"],
    ["Your first point of contact, in English, 中文 & BM", "第一个接待你的人，英语、中文、马来语都通"],
    ["Bookings, reports & insurance documents", "预约、报告与保险文件"],
    ['"Great care should start before you reach the treatment room."', "「好的照顾，在你走进诊疗室之前就该开始了。」"],
    ["Bright, calm and built for care — swipe through, or better, drop by.", "明亮、安静，为看诊而设。滑动看看，或者干脆亲自来一趟。"],
    ["Reception — The Boulevard, Mid Valley", "接待处 — The Boulevard，Mid Valley"],
    ["Adjustment rooms", "矫正室"],
    ["On-site X-ray suite", "诊所内 X 光室"],
    ["Rehab & movement corner", "康复训练区"],
    ["Parking at The Boulevard / Mid Valley Megamall, a short covered walk away", "The Boulevard／Mid Valley Megamall 都有停车场，走有盖走道过来，几步而已"],
    ["Open in Google Maps", "用 Google 地图打开"],
    ["Book a first assessment with Dr Daniel — 60 to 90 minutes, plain-language answers.", "预约 Daniel 医生的首次评估：60 到 90 分钟，用听得懂的话把话讲清楚。"],

    /* ================= CHIROPRACTIC ================= */
    ["Dr. Clarence S. Gonstead worked on engines before he ever worked on spines. He brought a mechanic's principle to the body —", "Dr. Clarence S. Gonstead 先是修引擎的，后来才开始修脊椎。他把技师那一套道理带到了人体上——"],
    ["a structure is only as sound as its foundation", "一个结构稳不稳，看的是地基"],
    ["— and spent fifty-five years turning it into a system that checks the spine five ways before touching it. His clinic in Mount Horeb, Wisconsin, a town of some 1,400 people, grew large enough to need its own airstrip and a hotel for the patients who travelled in to see him.", "——然后花了五十五年，把它磨成一套「先查五遍，再动手」的系统。他的诊所开在威斯康星州 Mount Horeb，一个只有约 1,400 人的小镇；后来病人多到诊所得自己盖一条飞机跑道，还得盖一间旅馆，让远道而来的人有地方住。"],
    ["See the Method", "看看这套方法"],
    ["“Take your time, give them the utmost of your ability as a chiropractor, find the correct subluxation. Accept it. Correct it. Leave it alone.”", "「慢慢来，把你身为脊椎矫正师的本事全用上，找到那个真正错位的地方。认了它，矫正它，然后别再去碰它。」"],
    ["It all starts with the spine.", "一切都从脊椎开始。"],
    ["Every step, bend and turn runs through it — and so does your nervous system. A spine that moves well is the foundation of a body that works well.", "你每走一步、每弯一次腰、每转一次身，都得经过它，你的神经系统也一样。脊椎动得好，身体才运作得好。"],
    ["Segment by segment.", "一节一节地看。"],
    ['Twenty-four vertebrae, each with its own job. We break the spine down section by section — because "back pain" is never the whole spine, it is a specific level.', "二十四节椎骨，每一节都有自己的工作。我们一段一段拆开来看，因为「背痛」从来不是整条脊椎在痛，而是其中某一节出了事。"],
    ["The subluxation: where movement stops.", "半脱位：动作卡住的地方。"],
    ["When one segment loses its alignment and stops moving freely, the nerves around it are irritated and the body compensates. That is the restriction you feel as pain and stiffness.", "当某一节偏离了位置、动不顺了，周围的神经会被刺激，身体则开始代偿。那份卡住的感觉，就是你说的痛和僵硬。"],
    ["One specific adjustment.", "一次到位的矫正。"],
    ["By hand, only where the evidence points — and nowhere else. A precise correction that restores motion to the exact segment that lost it.", "徒手，而且只动证据指向的那一节，其他地方一概不碰。一次准确的矫正，把动作还给失去它的那一节。"],
    ["Recovery: a happy spine.", "康复：一条舒服的脊椎。"],
    ["With the joint moving and the irritation settling, the body does what it was built to do — heal. Movement returns, and this time it holds.", "关节动起来，刺激慢慢平息，身体就会做它天生会做的事：自己修复。动作回来了，而这一次，它留得住。"],
    ["Experience the Precision", "亲身感受这份精准"],
    ["Most back pain gets a guess. Yours gets a five-point diagnostic system — so when we adjust, we adjust the right segment, in the right direction, at the right time.", "大部分背痛，得到的只是一个猜测。你得到的是一套五项检查，所以我们下手时，会在对的时间、用对的方向，矫正对的那一节。"],
    ["Reading posture, gait and symmetry for the subtle deviations that point to where trouble starts.", "看你的站姿、走路和左右对称，找出指向问题源头的细微偏差。"],
    ["A dual-probe Nervoscope glides down the spine, reading small side-to-side differences in skin temperature that flag a level worth a closer look.", "双探头 Nervoscope 沿着脊椎滑下去，量出两侧皮温的细微差异，标出值得细看的那一节。"],
    ["Moving the spine through its ranges to find joints that are locked or not travelling freely.", "带着脊椎活动到各个角度，找出卡住或动不顺的关节。"],
    ["What brings people through our door.", "大家都是为了什么来的。"],
    ["Sixteen of the most common reasons people walk through our door. If yours is not on the list, message us — the assessment will tell us if chiropractic is right for you.", "以下是大家来找我们的十六个最常见原因。如果你的情况不在里面，直接联系我们，评估会告诉我们脊椎矫正适不适合你。"],
    ["Bulging or herniated discs pressing on nearby nerves.", "椎间盘膨出或突出，压到旁边的神经。"],
    ["Lower or mid-back pain from posture, strain or misalignment.", "姿势、劳损或错位带来的下背、中背痛。"],
    ["Sharp, radiating pain down the leg from a compressed nerve.", "神经被压住，痛感沿着腿一路窜下去。"],
    ["Stiffness from tech-neck, tension or restricted joints.", "长期低头、肌肉紧绷或关节卡住，颈就硬了。"],
    ["Recurring head pain rooted in upper-neck tension.", "源头在颈椎上段的反复头痛。"],
    ["Lingering neck strain after a sudden impact.", "撞击之后一直好不了的颈部拉伤。"],
    ["Restricted, aching shoulders from posture or overuse.", "姿势不良或用过头，肩膀又紧又酸。"],
    ["Inflamed tendons from repetitive gripping and strain.", "反复抓握、用力过度，肌腱发炎。"],
    ["Tingling and weakness from a compressed wrist nerve.", "手腕神经被压住，手开始麻、使不上力。"],
    ["Stiffness that quietly limits how freely you walk.", "悄悄让你走不自在的僵硬。"],
    ["Aching or unstable knees from alignment issues or injury.", "排列不正或受过伤，膝盖发酸、发软。"],
    ["Strains and overuse injuries keeping you out of training.", "让你练不下去的拉伤和过度使用损伤。"],
    ["Sideways spinal curves we assess, monitor and manage.", "脊椎往侧边弯，我们评估、追踪并协助控制。"],
    ["Retraining rounded shoulders and forward head.", "把圆肩和前倾的头重新训练回来。"],
    ["Gentle, adapted care for back and pelvic comfort.", "温和、随身体调整的照顾，让腰背和骨盆舒服些。"],
    ["Gentle assessments tailored to growing spines.", "为还在长的脊椎做的温和检查。"],
    ["You will always know the cost before any treatment begins. Ranges below cover most cases — your exact plan is confirmed at your report.", "治疗开始之前，你一定先知道要花多少钱。以下价格范围涵盖大多数情况，你的实际方案会在讲解报告时确认。"],
    ["Start here", "从这里开始"],
    ["First Assessment", "首次评估"],
    ["one-time, 60–90 minutes", "一次性，60–90 分钟"],
    ["Full history & consultation", "完整病史与问诊"],
    ["Five-point Gonstead examination", "Gonstead 五项检查"],
    ["On-site X-ray analysis (if needed)", "诊所内 X 光分析（有需要才做）"],
    ["Report of findings, in plain language", "检查报告，用听得懂的话讲"],
    ["Ongoing care", "后续治疗"],
    ["Adjustment Session", "矫正疗程"],
    ["per visit, based on your plan", "每次到访，看你的方案"],
    ["Specific Gonstead adjustment", "精准的 Gonstead 矫正"],
    ["Progress re-check each visit", "每次到访都复查进度"],
    ["Rehab & movement guidance", "康复与动作指导"],
    ["Same doctor, every session", "每一次，都是同一位医生"],
    ["Best value", "最划算"],
    ["Care Plans", "疗程配套"],
    ["Package", "配套"],
    ["rates", "优惠价"],
    ["for regular patients", "适合定期来的患者"],
    ["Discounted multi-session rates", "多次疗程有折扣"],
    ["Built around your recovery goals", "按你的康复目标来定"],
    ["Recommended only after assessment", "评估之后才会建议"],
    ["No lock-ins, no pressure", "不绑约，不推销"],
    ["Ask About Plans", "问问配套"],
    ["Start Care", "开始疗程"],
    ["Final pricing is always confirmed with you before treatment starts.", "最终收费一定会在治疗开始前跟你确认。"],
    ["Does a chiropractic adjustment hurt?", "脊椎矫正会不会痛？"],
    ["Most adjustments are painless — many patients describe relief, not pain. The Gonstead approach is specific and controlled: no twisting your whole body, no forcing. Some mild soreness afterwards (like after exercise) is normal for the first day or two.", "大多数矫正不会痛，很多患者形容那是一种松开来的感觉。Gonstead 手法精准而可控：不会把你整个人扭过去，也不会硬来。之后一两天有点酸（像运动后那样）是正常的。"],
    ["How many sessions will I need?", "我需要做几次？"],
    ["It depends on how long the problem has been building and what the examination shows. After your first assessment you will get a clear recommendation — including how many visits, how often, and how we will measure progress. No open-ended plans.", "要看问题累积了多久，也要看检查查到什么。首次评估之后，你会拿到明确的建议：要来几次、多久来一次、我们用什么衡量进度。不会有那种做不完的疗程。"],
    ["Is it safe for children, seniors or pregnancy?", "小孩、长辈或孕妇做，安全吗？"],
    ["We adapt the technique to the body in front of us — gentler, more specific setups for children, older spines and pregnancy. The five-point examination always comes first, so we know what should be adjusted and what should not. No treatment is risk-free. We will talk you through what applies to you before we begin. And we will tell you if you are better served elsewhere.", "我们会看着眼前这个身体调整手法：小孩、年长的脊椎和孕期，用的力更轻、位置更准。五项检查一定先做，我们才知道哪里该动、哪里不该动。没有任何治疗是零风险的，开始之前我们会把与你相关的部分说清楚。如果你更适合看别的专科，我们也会直接讲。"],
    ["Do I need an X-ray?", "一定要拍 X 光吗？"],
    ["Only when your case needs one. Weight-bearing X-rays show alignment under real load, which guides precise care — but if you have recent films, bring them and we may not need new ones.", "有需要才拍。站立负重的 X 光能看到身体真正受力时的排列，让治疗更准。如果你有近期的片子，带过来就好，可能就不必再拍。"],
    ["What is the difference between chiropractic and physiotherapy?", "脊椎矫正和物理治疗有什么不同？"],
    ["Chiropractic focuses on correcting spinal joint misalignment affecting the nervous system; physiotherapy focuses on rehabilitating muscles and movement. They complement each other — our care plans often include rehab-style strengthening once your spine holds its alignment.", "脊椎矫正处理的是影响神经系统的脊椎关节错位；物理治疗着重把肌肉和动作练回来。两者是互补的——等你的脊椎稳住了位置，我们的方案通常也会加入康复式的力量训练。"],
    ["Can I claim insurance?", "可以报保险吗？"],
    ["Some Malaysian insurers and employee benefit plans cover chiropractic care. We will issue receipts and reports you can submit — check with your provider, and message us if they need any supporting documents.", "部分马来西亚保险公司和公司福利计划是涵盖脊椎矫正的。我们会开收据和报告让你提交，你先跟保险公司确认，如果他们要什么证明文件，联系我们就行。"],
    ["Book your first assessment at Mid Valley — 60 to 90 minutes, transparent pricing, plain-language answers.", "到 Mid Valley 预约首次评估：60 到 90 分钟，收费透明，用听得懂的话回答你。"],

    /* ================= PET-CHIRO ================= */
    ["The stairs he now avoids. The jump he won't attempt. The walk that keeps getting shorter. We call it aging — but often it's a spine that has stopped moving the way it should. And that, unlike age, can be helped.", "它开始绕开的那道楼梯。它不再跳的那一跳。越走越短的散步。我们把这些叫做老了，但很多时候，是脊椎不再像从前那样活动。年龄改不了，这个可以。"],
    ["Check the 12 Signs", "看看那 12 个征兆"],
    ["Book Pet Assessment", "预约宠物评估"],
    ["In a pack, a limping dog is a liability. That instinct never left — so by the time you can see stiffness, the problem has usually been there for months.", "在狗群里，一只跛脚的狗是拖累。这份本能一直留在它们身上，所以等你看得出它僵硬时，问题通常已经在那里好几个月了。"],
    ["Silent by design", "天生就会忍"],
    ["Dogs instinctively mask pain and keep up with the pack. They don't complain — they compensate, quietly, until they can't.", "狗会本能地把痛藏起来，硬撑着跟上队伍。它们不抱怨，只是默默用别的地方去补，直到补不下去。"],
    ["1 in 4", "四分之一"],
    ["Already hurting, still young", "还年轻，却已经在痛"],
    ["When researchers screened 123 dogs aged 8 months to 4 years, nearly a quarter — 23.6% — had arthritis painful enough to react to on examination. Not old dogs. Young ones.", "研究人员检查了 123 只 8 个月到 4 岁的狗，接近四分之一（23.6%）有关节炎，而且痛到检查时会有反应。这些不是老狗，是年轻的狗。"],
    ["7 in 10", "十分之七"],
    ["Their owners hadn't noticed", "主人完全没发现"],
    ["Of the 29 dogs in pain, only 9 owners had noticed anything wrong — about 30%. The other seven in ten looked, to the people who loved them, completely fine.", "那 29 只正在痛的狗里，只有 9 位主人觉得有点不对劲，大约三成。其余十分之七，在最疼它们的人眼里，看起来一切正常。"],
    ["2 of 9", "9 位中只有 2 位"],
    ["Even noticing wasn't enough", "发现了，还不够"],
    ["Of the 9 owners who did notice, only 2 had their dog on any treatment for it. Seeing it is not the same as acting on it.", "那 9 位真的发现了的主人当中，只有 2 位带狗去处理。看见，和去做，是两回事。"],
    ["Figures from Enomoto M, et al., “Prevalence of radiographic appendicular osteoarthritis and associated clinical signs in young dogs”, Scientific Reports 14:2827 (2024) — a study of limb joints, not spines. We cite it for what it shows about how early pain starts and how easily it is missed. For context: in UK primary-care records, the median dog is 10.5 years old before arthritis is first diagnosed.", "数据引自 Enomoto M 等，“Prevalence of radiographic appendicular osteoarthritis and associated clinical signs in young dogs”，Scientific Reports 14:2827（2024）。该研究检查的是四肢关节，不是脊椎；我们引用它，是因为它说明了痛可以来得多早、又多容易被忽略。作为对照：在英国的基层兽医记录里，狗平均要到 10.5 岁才第一次被诊断出关节炎。"],
    ["Pain doesn't look like pain", "痛，不一定看起来像痛"],
    ["They don't complain. They adapt.", "它们不会喊痛，只会自己去适应。"],
    ["Chronic pain shows up as behaviour change first — less play, hesitating at stairs, sleeping more. By the time there's an obvious limp, it's already late.", "慢性疼痛最先表现在行为上：玩得少了、在楼梯前迟疑、睡得比以前多。等到看见明显跛行，其实已经迟了。"],
    ["Vertebrae, discs, joints and nerves — the same architecture, carried horizontally instead of upright (and with a few more vertebrae through the chest and lower back). Accidents, or repetitive strain over time, can leave a joint moving less freely than it should, just as they do in us. When one segment stops moving well, the body around it compensates: other joints take the load, muscles guard, movement changes, and the joint can quietly deteriorate over time.", "椎骨、椎间盘、关节、神经，结构和我们一模一样，只是横着扛，不是直着扛（胸段和腰段还多几节）。一次意外，或者日积月累的劳损，都可能让某个关节动得不如从前，跟我们身上发生的事一样。当一节动不顺了，周围的身体就会去补：别的关节分担重量、肌肉绷紧保护、动作跟着变形，而那个关节可能就在这段时间里悄悄退化。"],
    ["It should not. Adjustments for animals use very light, specific pressure — far gentler than human care. Pets tend to settle once they work out that nothing is being forced on them. And if yours tells us they have had enough, we stop. That is the whole rule.", "应该不会。动物的矫正只用很轻、很准的力道，比人的疗程温和得多。宠物一旦发现没有人要勉强它，通常就会自己安定下来。如果它示意够了，我们就停。规矩只有这一条。"],
    ['Not "just age"', "不是「老了而已」"],
    ["Much of what owners file under getting old is restricted joints — and unlike age, a restricted joint is something we can work with.", "很多被主人当成「变老」的表现，其实是关节卡住了。年龄我们没办法，卡住的关节可以。"],
    ["Same segments, same discs, same nerves — just carried horizontally. When one segment stops moving well, the body around it compensates: other joints take the load, muscles guard, and movement quietly reorganises itself.", "一样的节段、一样的椎间盘、一样的神经，只是横着扛。当一节动不顺了，周围的身体就会去补：别的关节分担重量、肌肉绷紧保护，整个动作模式也悄悄改写。"],
    ["That compensation is what you're seeing on the stairs. It looks like aging. Often, it's a joint that simply needs to move again.", "你在楼梯上看到的，就是这种补偿。它看起来很像变老。但往往，只是某个关节需要重新动起来。"],
    ["What seems like aging to you is, often, a joint that simply needs to move again.", "你以为是老了，但很多时候，只是某个关节需要重新动起来。"],
    ["Same joints, same logic", "一样的关节，一样的道理"],
    ["The Gonstead approach, scaled down and softened", "同一套 Gonstead，只是更小、更轻"],
    ["Your pet can't tell you — but movement talks. These twelve quiet changes are the most common first clues that a joint is restricted or the spine is under strain.", "它不会开口，但它的动作会说话。以下十二个不起眼的变化，是关节卡住或脊椎吃力最常见的第一批线索。"],
    ["Won't jump anymore", "不肯跳了"],
    ["Hesitates at the sofa, the car boot or the stairs they used to fly up.", "在沙发、后车厢，或从前一跃而上的楼梯前面犹豫。"],
    ["Walks unevenly", "走路不对称"],
    ["Favouring one side, running at an angle, or an odd swing in the hips.", "偏用一边、跑起来斜斜的，或者屁股摆动怪怪的。"],
    ["Stiff, especially after resting", "僵硬，尤其刚睡醒"],
    ["Slow, careful first steps after a nap — loosening up only after a while.", "睡醒后头几步走得慢又小心，过一阵子才松开来。"],
    ["Flinches when touched", "一碰就缩"],
    ["Ducks, growls or snaps when a specific spot on the back or neck is handled.", "摸到背上或颈上某个位置时，会闪、会低吼，甚至会咬。"],
    ["Licks one spot", "一直舔同一个地方"],
    ["Obsessively licking or chewing a joint, paw or patch along the spine.", "不停地舔或咬某个关节、爪子，或脊椎沿线的某一块。"],
    ["Mood has changed", "脾气变了"],
    ["A playful dog gone withdrawn, or a calm cat suddenly reactive.", "爱玩的狗变得不理人，或本来温顺的猫突然容易发作。"],
    ["Slower at play", "玩起来变慢"],
    ["Less eager to chase, tug or climb — tiring faster than they used to.", "追、拉、爬都没那么起劲了，也比从前更快累。"],
    ["Posture looks off", "姿势怪怪的"],
    ["A rounded back, a low tail carriage, or a head held stiffly to one side.", "背弓着、尾巴垂着，或头僵僵地偏向一边。"],
    ["Sits to one side", "坐姿歪一边"],
    ['The "mermaid sit" — legs swung to one side instead of a square, even sit.', "所谓的「美人鱼坐姿」：两条腿甩向同一边，而不是端正地坐好。"],
    ["Slips while walking", "走一走会打滑"],
    ["Paws losing grip on tiles or wood — back legs sliding on floors that never used to be a problem.", "爪子在瓷砖或木地板上抓不住，后腿在以前从没出过问题的地板上滑开。"],
    ["Sudden aggression", "突然变凶"],
    ["Growling or snapping out of character — pain often shows as aggression before it shows as a limp.", "反常地低吼或咬人。痛这件事，往往先变成脾气，才变成跛行。"],
    ["Limping", "跛行"],
    ["An obvious limp, or a subtle head-bob — weight quietly shifted off a leg that hurts.", "明显的一拐一拐，或走路时头轻轻点动：重心正悄悄从痛的那条腿移开。"],
    ["Ticked more than one?", "中了不止一项？"],
    ["Message us a short video of your pet walking", "拍一段它走路的短片传给我们"],
    ["— it helps us see what you see.", "这样我们才看得见你看见的。"],
    ["Animal spines work like ours: when a joint stops moving well, the body compensates — and pain, stiffness and behaviour changes follow. Animal chiropractic finds those restricted segments and restores their motion with gentle, specific adjustments.", "动物的脊椎跟我们一个道理：一个关节动不顺，身体就会去补，接着就是痛、僵硬和行为改变。宠物脊椎矫正要做的，是找出那些卡住的节段，用温和而精准的手法把动作还给它们。"],
    ["No cracking, no force. Adjustments for animals use far lighter pressure than human care, sized to the animal — a Chihuahua is not adjusted like a Golden Retriever.", "不「咔」一声，也不硬来。动物的矫正力道比人的轻很多，而且按体型来：吉娃娃和金毛，做法完全是两回事。"],
    ["No unnecessary manipulation, no force. Adjustments for animals use far lighter pressure than human care, sized to the animal — a Chihuahua is not adjusted like a Golden Retriever.", "不多做一下，也不硬来。动物的矫正力道比人的轻很多，而且按体型来：吉娃娃和金毛，做法完全是两回事。"],
    ["Gentle, animal-specific techniques — sized to the animal, never forced", "温和、专为动物设计的手法，按它的体型来，绝不勉强"],
    ["Works alongside your vet's care, never against it", "配合你兽医的治疗，不会互相抵触"],
    ["No referral needed", "不用转介信"],
    ["— book directly, bring any vet reports you have", "直接预约就好，手上有兽医报告就带来"],
    ["Dogs & cats welcome", "猫狗都欢迎"],
    ["All breeds, all sizes, all temperaments", "什么品种、什么体型、什么脾气都行"],
    ["Senior pets", "上了年纪的毛孩"],
    ["Ageing joints, arthritis support and easier day-to-day movement.", "老化的关节、关节炎的照顾，让每天的活动轻松一点。"],
    ["Active & sporting dogs", "好动与比赛犬"],
    ["Agility, flyball and park athletes who land hard and turn fast.", "敏捷赛、飞球赛，还有公园里那些落地重、转身快的小选手。"],
    ["Post-injury recovery", "伤后康复"],
    ["Rebuilding comfortable movement after slips, falls or surgery.", "滑倒、跌伤或手术之后，把舒服的动作练回来。"],
    ["Cats too", "猫也一样"],
    ["Quiet limpers and reluctant jumpers — handled calmly, at their pace.", "默默跛着、不太想跳的猫，我们慢慢来，跟着它的节奏。"],
    ["A pet visit is built around trust. We never rush an anxious animal — the first minutes belong to them.", "毛孩来看诊，一切从信任开始。紧张的动物我们从不催，最初那几分钟是留给它的。"],
    ["Chat & history", "先聊聊"],
    ["You tell us what changed. Bring vet reports or scans if you have them.", "你告诉我们它哪里变了。有兽医报告或扫描，带来更好。"],
    ["Gait & posture", "看它怎么动"],
    ["We watch them walk, sit and turn — often the clearest diagnostic we have.", "看它走、看它坐、看它转身。这往往是我们最有用的一项检查。"],
    ["Gentle adjustment", "温和矫正"],
    ["Light, specific corrections, sized to their body and temperament.", "轻而准的矫正，按它的体型和脾气来。"],
    ["Home guidance", "回家怎么做"],
    ["Simple do's and don'ts, and when (or whether) to come back.", "该做什么、别做什么，以及什么时候（或者需不需要）再来。"],
    ["Doctor-led care", "医生亲自看"],
    ["Every pet is seen by Dr Daniel Tan — the same standard as our human patients.", "每一只毛孩都由 Dr Daniel Tan 亲自诊治，标准和人的患者一样。"],
    ["Vet-friendly", "和兽医合作"],
    ["We complement veterinary care and will tell you honestly if a vet visit should come first.", "我们是兽医治疗的补充。如果该先看兽医，我们会直接告诉你。"],
    ["Dogs and cats can be booked directly — no paperwork before the first visit.", "猫狗都可以直接预约，第一次来之前不必准备任何文件。"],
    ["Will it hurt my pet?", "会不会弄痛我的毛孩？"],
    ["No — adjustments for animals use very light, specific pressure. Most pets visibly relax during the session, and many owners are surprised how calm their usually-nervous dog or cat becomes on the table.", "不会。动物的矫正只用很轻、很准的力道。多数毛孩做到一半就明显放松下来，很多主人都很意外：平时紧张兮兮的猫狗，在诊疗台上竟然这么安静。"],
    ["Do I need a referral from my vet?", "需要兽医写转介信吗？"],
    ["No referral is needed — you can book directly for dogs and cats. If your pet has an existing condition, bring any vet reports or X-rays along; they help us build the full picture.", "不需要，猫狗都可以直接预约。如果它本来就有什么状况，把兽医报告或 X 光片带来，能帮我们看得更完整。"],
    ["My cat hates carriers and strangers. Can this still work?", "我的猫讨厌笼子，也怕生。这样还行吗？"],
    ["Yes. Cat visits are paced entirely around the cat — we let them settle, work in short windows, and stop before stress builds. If a session needs to be shorter, we adapt rather than force it.", "行的。猫的看诊完全跟着猫的节奏走：先让它安定下来，分成几小段做，在它开始紧张之前就停。需要缩短就缩短，我们不会硬来。"],
    ["How many sessions will my pet need?", "我的毛孩要做几次？"],
    ["We will not put a number on it before we have seen your pet. Long-standing or age-related cases usually take longer than recent ones. After the first assessment you will get an honest view of what we expect and how we will measure it. If we do not think we can help, we will say so on day one.", "还没见到它之前，我们不会给你一个数字。拖久了或跟年龄有关的情况，通常比新发生的要久一些。首次评估之后，我们会老实告诉你：预期会怎样，以及用什么来衡量。如果我们觉得帮不上忙，第一天就会说。"],
    ["When should I go to the vet instead?", "什么时候该先看兽医？"],
    ["Sudden severe pain, suspected fractures, wounds, fever, or any rapidly worsening condition should go to your vet first. Chiropractic care is for movement and alignment — and we will redirect you to a vet the moment something looks outside our scope.", "突然剧痛、怀疑骨折、有伤口、发烧，或者情况在快速恶化，都请先看兽医。脊椎矫正处理的是活动和排列；一旦发现超出我们范围，我们会马上请你转去兽医那边。"],
    ["Suspected fractures, open wounds, fever, or any rapidly worsening condition should go to your vet first. You may reach out to us if you are unsure — our team will redirect you to a vet the moment something looks outside our scope.", "怀疑骨折、有开放性伤口、发烧，或者情况在快速恶化，都请先看兽医。不确定的话也可以先问我们；一旦发现超出我们的范围，团队会马上请你转去兽医那边。"],
    ["WhatsApp us a short video of your pet walking, or book a gentle first assessment at Mid Valley.", "用 WhatsApp 传一段它走路的短片给我们，或者到 Mid Valley 预约一次温和的首次评估。"],

    /* ================= NEWS ================= */
    ["Clinic announcements, monthly offers, honest spine advice and the occasional very good dog.", "诊所公告、每月优惠、不绕弯的脊椎建议，偶尔还有一只很乖的狗。"],
    ["All", "全部"],
    ["Clinic Updates", "诊所动态"],
    ["Health Tips", "健康贴士"],
    ["Events & Offers", "活动与优惠"],
    ["Pet Corner", "毛孩专区"],
    ["Merdeka special", "Merdeka 国庆特惠"],
    ["Stand tall this Merdeka — RM50 off your first assessment", "这个 Merdeka，把腰挺直：首次评估减 RM50"],
    ["Celebrate independence from aches. All August, new patients get RM50 off the full first assessment: history, five-point Gonstead examination, X-ray analysis if needed, and a plain-language report of findings.", "也让身体独立一次，摆脱酸痛。整个八月，新患者做完整首次评估减 RM50：问病史、Gonstead 五项检查、有需要的话加 X 光分析，还有一份讲人话的检查报告。"],
    ["August 2026", "2026年8月"],
    ["We are now open on Saturdays", "我们星期六也开门了"],
    ["Weekday schedule too tight? Saturday slots are now live, 9am to 7pm — book early, they move fast.", "平日抽不出时间？星期六的时段已经开放，早上9点到晚上7点。要约就趁早，位子走得快。"],
    ["June 2026", "2026年6月"],
    ["Read", "阅读"],
    ["Animal Chiro is here — dogs & cats, no referral needed", "宠物脊椎矫正来了：猫狗都行，不用转介信"],
    ["The same gentle Gonstead philosophy, adapted for four legs. Here is what a first pet visit looks like.", "同样温和的那套 Gonstead，换成四条腿的版本。毛孩第一次来，大概会是这样。"],
    ["5 desk habits your spine will thank you for", "5 个办公室习惯，你的脊椎会谢谢你"],
    ["A 2-minute stretch break every hour beats an expensive chair. Small habits, compounding relief.", "每小时起来伸展两分钟，比一张贵椅子还有用。小习惯，慢慢累积成大改善。"],
    ["Slipped disc: do you really need surgery?", "椎间盘突出，真的要开刀吗？"],
    ["Surgery is not usually the first step for a disc problem. What the research says — and when surgery genuinely is the answer.", "椎间盘的问题，开刀通常不是第一步。研究怎么说，以及什么时候开刀才真的是答案。"],
    ["May 2026", "2026年5月"],
    ["What makes Gonstead different from a regular adjustment?", "Gonstead 和一般的矫正差在哪里？"],
    ["Five diagnostic checks before a single correction. Why specificity beats the all-over crack.", "动手之前，先做五项检查。为什么「准」比全身「咔咔」有用。"],
    ["Bring a friend: referral perks for existing patients", "带个朋友来：老患者的介绍福利"],
    ["Good spines are contagious. Refer a friend and you both get a little something on your next visit.", "好脊椎是会传染的。介绍一位朋友来，你们下次到访都有小回馈。"],
    ["Monthly updates, health tips and first dibs on promo slots — straight to WhatsApp, no spam.", "每月动态、健康贴士，还有优惠时段的优先通知，直接发到你的 WhatsApp，不会乱发。"],
    ["Get Updates on WhatsApp", "用 WhatsApp 收更新"],
    ["Follow on Instagram", "在 Instagram 追踪我们"],

    /* ================= SHOP ================= */
    ["We only sell what we prescribe. Four recovery essentials, hand-picked by Dr Daniel — no fillers, no gimmicks, ordered in one WhatsApp message.", "我们只卖自己会推荐的东西。四样康复必需品，Dr Daniel 一件件挑过：不凑数，不搞噱头，一条 WhatsApp 就能下单。"],
    ["Scroll to browse", "往下滑看看"],
    ["01 / 04 — Sleep", "01 / 04 — 睡"],
    ["Eight hours a night is your longest treatment session — make it count. Contoured to keep the neck's natural curve supported whether you sleep on your back or side.", "一晚八小时，是你一天里最长的一次「治疗」，别浪费。弧形设计，不管你仰睡还是侧睡，都托得住颈椎原本的弧度。"],
    ["Back & side sleepers", "仰睡侧睡都合用"],
    ["Two height profiles", "两种高度可选"],
    ["Hypoallergenic foam", "低致敏泡棉"],
    ["Order via WhatsApp", "用 WhatsApp 下单"],
    ["02 / 04 — Sit", "02 / 04 — 坐"],
    ["For the office chair, the car seat, and every long Grab ride in between. Fills the gap your lower back has been bracing against all day.", "给办公椅、车座，还有中间每一趟塞车的 Grab。把你下背撑了一整天的那个空位填起来。"],
    ["Office & car", "办公室、车上都能用"],
    ["Anti-slip strap", "防滑绑带"],
    ["Breathable mesh cover", "透气网布套"],
    ["03 / 04 — Stand", "03 / 04 — 站"],
    ["A gentle reminder, not a cage. Worn 20–30 minutes a day to retrain rounded shoulders while your adjustments hold the new alignment.", "它是提醒，不是束缚。每天戴 20–30 分钟，趁矫正把新的排列稳住的时候，顺便把圆肩练回来。"],
    ["20–30 min a day", "每天 20–30 分钟"],
    ["Adjustable fit", "松紧可调"],
    ["Wearable under clothes", "可以穿在衣服里"],
    ["04 / 04 — Give", "04 / 04 — 送"],
    ['For the parent who "is fine", the friend who cracks their own neck, the runner who limps on Mondays. A voucher toward any assessment or session — human or pet.', "送给那位说「我没事」的爸妈、那位自己扭脖子的朋友、那位每逢星期一就一拐一拐的跑者。任何评估或疗程都能用的礼券，人和毛孩都适用。"],
    ["Digital or printed card", "电子卡或实体卡"],
    ["Valid for any service", "所有服务都能用"],
    ["6-month validity", "有效期 6 个月"],
    ["1. Message us", "1. 传个信息给我们"],
    ['Tap "Order via WhatsApp" — the message is pre-filled with your item. Ask us anything before you commit.', "点「用 WhatsApp 下单」，信息里已经填好你选的东西。决定之前，想问什么尽管问。"],
    ["2. Pay your way", "2. 你方便怎么付都行"],
    ["Bank transfer or Touch 'n Go by WhatsApp, or pay at the clinic when you collect. Receipt included.", "用 WhatsApp 银行转账或 Touch 'n Go，或者来拿的时候在诊所付。收据一定有。"],
    ["3. Collect or deliver", "3. 自取或寄送"],
    ["Pick up at Mid Valley with a free fitting from our team, or we ship anywhere in Malaysia.", "到 Mid Valley 自取，我们团队免费帮你调到合身；或者我们寄到马来西亚任何地方。"],
    ["Wrong size or firmness? Exchange within 7 days, unused.", "尺寸不对、软硬不合？未使用的话，7 天内可以换。"],
    ['"Patients kept asking what pillow to buy, so I did the homework once, properly. This is the shortlist — the same four things I recommend in the treatment room. If you don\'t need it, I\'ll tell you."', "「患者一直问我该买什么枕头，那我就认真做一次功课。这就是最后留下的名单，跟我在诊疗室里推荐的是同样四样。如果你其实不需要，我也会直接告诉你。」"],
    ["— Dr Daniel Tan, Aligned", "—— Dr Daniel Tan，Aligned"],
    ["The right pillow supports a healthy spine — the assessment is what gets you one. Start there.", "好枕头撑得住一条健康的脊椎；但让脊椎健康起来的，是评估。先从那里开始。"]
  ];

  /* ================================================================
     HEAD — [ English innerHTML, 中文 innerHTML ] for .tsplit headings
     (matched by plain text, so the reveal animation's word-splitting
     does not break the swap). Proper names are intentionally left in
     English on both sides — they are not in this list.
     ================================================================ */
  var HEAD = [
    /* index */
    ['A New <span class="alt">Definition</span> Of Health', '重新<span class="alt">定义</span>健康'],
    ["Movement is <em>freedom.</em>", "能动，就是<em>自由。</em>"],
    ['Back pain, a stiff neck, or pain that <span class="u">keeps coming back?</span>', '腰酸、颈硬，还是<span class="u">怎么都好不了的痛？</span>'],
    ["What are we helping you with?", "你是哪里不舒服？"],
    ["Our services.", "我们能做的。"],
    ["Five-point diagnostics, down to the segment.", "五项检查，准到每一节。"],
    ["The team behind every adjustment.", "每一次矫正，背后都有一整个团队。"],
    ["Happy patients.", "他们后来怎么样了。"],
    ["Five steps, from listening to lasting.", "五个步骤，从听你说起，到不再复发。"],
    ["Now with Animal Chiro.", "现在，毛孩也能来。"],
    ["Your body has carried you this far. <em>Let's help it carry you further.</em>", "身体载着你走到今天。<em>让它能陪你走得更远。</em>"],

    /* about */
    ['The people behind <span class="alt">Aligned.</span>', '<span class="alt">Aligned</span> 核心团队'],
    ["Small clinic. Stubborn standards.", "诊所不大，标准很硬。"],
    ["Meet the team.", "来认识我们。"],
    ["Come see where the work happens.", "来看看我们做事的地方。"],
    ["Right in Mid Valley City.", "就在 Mid Valley City。"],
    ["Now you know us. <em>Let us get to know your spine.</em>", "你已经认识我们了。<em>也让我们认识你的脊椎。</em>"],

    /* chiropractic */
    ['Built by a mechanic. <span class="alt">Trusted for a century.</span>', '一个技师想出来的方法，<span class="alt">用了一百年。</span>'],
    ["The five criteria, in detail.", "五项标准，逐一说清楚。"],
    ["What brings people through our door.", "大家都是为了什么来的。"],
    ["No hidden fees. No surprise add-ons.", "没有隐藏收费，账单不会吓你一跳。"],
    ["Common FAQ.", "大家常问的问题。"],
    ["Stop living in pain. <em>Find out what is causing it.</em>", "别再忍着痛过日子。<em>先弄清楚它从哪来。</em>"],

    /* pet-chiro */
    ["Your dog is not getting lazy. <span class=\"alt\">He is getting stuck.</span>", '它不是变懒了，<span class="alt">是卡住了。</span>'],
    ["Dogs are built to hide it.", "狗天生就懂得忍。"],
    ["His spine works on the same principles as yours.", "它的脊椎，和你的一个道理。"],
    ["Watch what he does, not what he says.", "它不会说，但它做给你看。"],
    ["Chiropractic, translated for four legs.", "同一套脊椎矫正，四条腿的版本。"],
    ["From senior nappers to weekend sprinters.", "从爱睡的老伙伴，到周末的小飞毛腿。"],
    ["Calm, unhurried, at their pace.", "不急、不催，跟着它的节奏。"],
    ["Handled like family. Because they are.", "当家人一样对待。因为它本来就是。"],
    ["What pet parents usually ask.", "毛孩家长最常问的。"],
    ["They'd book it themselves <em>if they had thumbs.</em>", "要是它们有拇指，<em>早就自己去预约了。</em>"],

    /* news */
    ["What's new <em>at Aligned.</em>", "Aligned <em>最近发生了什么。</em>"],
    ["Never miss an offer or an opening.", "优惠和空档，别错过。"],
    ["Read enough. <em>Feel the difference instead.</em>", "看够了吗？<em>不如亲身感受一次。</em>"],

    /* shop */
    ["Recover at home, <em>the aligned way.</em>", "回到家，<em>也继续康复。</em>"],
    ["Cervical Support Pillow", "颈椎支撑枕"],
    ["Lumbar Support Cushion", "腰部支撑靠垫"],
    ["Posture Trainer", "体态矫正带"],
    ["Gift a Spine Check", "送一次脊椎检查"],
    ["Three steps. No checkout maze.", "三个步骤，不用绕来绕去结账。"],
    ["Tools help. <em>Alignment fixes.</em>", "工具帮得上忙，<em>矫正才治本。</em>"]
  ];

  /* ---------- left-rail section labels (homepage) ---------- */
  var PROG = {
    "Home": "首页",
    "Our Belief": "我们的信念",
    "The Problem": "问题在哪",
    "Self-Check": "自我检查",
    "Services": "服务",
    "Gonstead": "Gonstead",
    "About Us": "关于我们",
    "Stories": "患者故事",
    "Your Journey": "疗程流程",
    "Collaborations": "合作与活动",
    "Animal Chiro": "宠物脊椎矫正",
    "Contact": "联系我们"
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
