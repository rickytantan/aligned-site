# Aligned V5 — Image Generation Plan (MCP-ready)

Direction locked with Ricky (2026-07-09):
- **One shared set of 16 condition images** used by BOTH the home-page coverflow deck and the Gonstead conditions grid.
- **Lifestyle symptom moments** (not clinical scenes) for the 16 conditions.
- **Pets: dogs + 2–3 cats, candid home settings** for the 12 signs.
- **Pain shown subtle & dignified** — a hand on the area, a pause mid-movement; no dramatic wincing.

Total to generate: **28 images** (16 conditions + 12 pet signs).

---

## 1. Global generation settings

| Setting | Value |
|---|---|
| Orientation | Landscape, **3:2** (e.g. 1536×1024, or the model's largest 3:2 option) |
| Composition rule | Subject centred with breathing room on all sides — the same file is cropped to ~3:2 (home deck, 640×420) and ~4:3 (Gonstead grid, 500×380) by CSS `object-fit: cover`, so nothing critical near the left/right edges |
| Output format | JPG, quality 85+ |
| Human subjects | East / Southeast Asian (site is a Malaysian clinic — settings can quietly read as SEA: tiled floors, condo interiors, tropical daylight, badminton court) |
| Color | Clean neutral white balance. **Never sepia, never yellow/orange/warm cast.** |

### STYLE_PREFIX (prepend to every prompt verbatim)

> Ultra-realistic candid editorial photograph, shot on Sony A7R V with an 85mm f/1.8 G Master lens, natural available daylight, clean neutral white balance, true-to-life Sony color science with crisp neutral tones and natural skin rendering, high definition, shallow depth of field, clean uncluttered premium healthcare-brand aesthetic.

### NEGATIVE_PROMPT (pass on every generation; if the model has no negative field, append as "Avoid: …")

> sepia, yellow tint, orange color cast, warm vintage filter, golden-hour haze, HDR glow, oversaturated, studio flash look, stock-photo posed smile, exaggerated pain expression, cartoon, illustration, 3D render, painting, deformed hands, extra fingers, distorted anatomy, watermark, text, logo, borders

### MCP execution notes

- Use the connected OpenArt MCP (`openart_generate_image`); pick a photorealistic model, landscape 3:2, 1 image per prompt, review, regenerate only failures.
- Final prompt per image = `STYLE_PREFIX + " " + scene text below`.
- Save outputs with the exact filenames below — they match the picsum seed slugs already in the code, so the swap is mechanical.

---

## 2. Conditions set — 16 images (shared: home deck + Gonstead grid)

Save to: `images/conditions/<slug>.jpg`

| # | Slug | Scene prompt (append to STYLE_PREFIX) |
|---|---|---|
| 01 | `slipped-disc` | An Asian man in his 40s pauses while lifting a cardboard moving box in a bright modern living room, one hand pressed flat against his lower back, eyes briefly closed, posture careful and controlled. Soft window daylight, white walls, light tiled floor. |
| 02 | `back-pain` | An Asian woman in her early 30s at a tidy home-office desk leans back in her chair, one hand kneading her lower back, laptop open in front of her. Bright morning daylight from a side window, minimal neutral interior. |
| 03 | `sciatica` | An Asian man in his 30s getting out of a parked car pauses halfway, one hand tracing down the back of his thigh, expression composed but hesitant. Clean daylight in a residential driveway, shallow background blur. |
| 04 | `neck-pain` | A young Asian woman lowers her phone and rubs the back of her neck with one hand, chin dipped from long screen use. Seated by a café window, soft neutral daylight, minimal styling. |
| 05 | `migraine` | An Asian woman in her 30s at a desk in a dim, cool-lit room presses two fingertips to her temple, eyes closed, laptop glow soft on her face. Composed, quiet, dignified — no dramatic grimace. |
| 06 | `whiplash` | An Asian man seated in a parked car turns his head slowly, one hand supporting the side of his neck, seatbelt still on. Neutral daylight through the windscreen, calm and understated. |
| 07 | `shoulder-pain` | A middle-aged Asian man reaching toward a high kitchen shelf stops mid-reach, his other hand gripping the top of his shoulder. Bright clean kitchen, white cabinetry, natural daylight. |
| 08 | `tennis-elbow` | An Asian man in his 30s on an indoor badminton court lowers his racket and wraps his opposite hand around his outer elbow and forearm. Cool even sports-hall lighting, green court blurred behind. |
| 09 | `carpal-tunnel` | Close crop of an Asian woman's hands at a laptop keyboard, one hand massaging the opposite wrist, fingers slightly flexed. Clean white desk, soft neutral daylight, shallow depth of field. |
| 10 | `hip-pain` | An Asian woman in her 60s pauses on a morning walk in a leafy tropical park, one hand resting on her hip, weight shifted to one leg. Fresh green background bokeh, cool clean daylight. |
| 11 | `knee-pain` | An Asian male runner in his 30s crouched at the edge of a park jogging path, hand cupped over one knee, breathing steady. Overcast neutral daylight, path receding in soft blur. |
| 12 | `sports-injury` | A young Asian futsal player seated on a gym bench at courtside, leaning forward to hold his taped ankle, water bottle beside him. Cool indoor sports lighting, honest and calm. |
| 13 | `scoliosis` | A teenage Asian girl seen from behind standing before a bedroom mirror in a loose t-shirt, one shoulder sitting subtly higher than the other as she checks her posture. Bright soft daylight, tidy neutral room. |
| 14 | `posture` | Side profile of an Asian office worker at a laptop with rounded shoulders and forward head posture, silhouetted against a large bright window. Clean minimal workspace, cool daylight. |
| 15 | `pregnancy` | A pregnant Asian woman in her third trimester stands by a bright window, both hands gently supporting her lower back, serene expression. Airy neutral interior, soft flattering daylight. |
| 16 | `paediatric` | An Asian child around 7 years old wearing a heavy school backpack stands slightly hunched under its weight while a parent kneels to adjust the straps. Bright home entryway, natural daylight, warm-hearted but neutral-toned. |

### 2b. Home "What are we helping you with?" deck — v2 痛点 X-ray overlay (FINAL PLAN, locked 2026-07-09)

Direction confirmed with Ricky:
- All 16 condition images get the **red 痛点 X-ray overlay** (style validated in the 2026-07-09 test batch).
- **Mood is mixed per image** — dim cinematic scenes for indoor/evening/sedentary conditions, bright neutral daylight for outdoor/active/gentle ones. The `Mood` column below is binding.
- Scenarios rewritten to be **hyper-relatable daily-life moments** (e.g. neck pain from lying on a couch armrest), SEA/Malaysian context.
- Subjects: East/Southeast Asian. Discomfort **composed and dignified** — a pause, a hand on the area, never dramatic wincing.
- Color: **true-to-life Sony color science, crisp neutral white balance — never sepia, never yellow/orange/warm cast** (state this inside every prompt; Nano Banana has no negative-prompt field).

#### MCP execution (exact)

- Tool: `openart_generate_image`
- Model: `nano-banana-pro` (preferred — faster, anchors the skeleton inside the body better). Fallback: `gpt-image-2` with `resolutionTier:"2k"`, `quality:"medium"` (high quality not needed; medium is close and much faster).
- Params per run (Nano Banana Pro):
  ```json
  {
    "prompt": "<ASSEMBLED PROMPT>",
    "imageCount": 1,
    "aspectRatio": "4:3",
    "resolution": "2K",
    "autoEnhancePrompt": false
  }
  ```
- One image per prompt; review; regenerate only failures. Common failures to check: skeleton overlay floating **outside** the body, oversized/rotated pelvis, double skull, **extra limbs** in poses where both arms do different things, **expression too neutral** (no discomfort at all).
- Prompt hardening learned from the 2026-07-09 batch: (a) for any pose with both arms in different positions, spell out each arm's role explicitly and append "He/She has exactly two arms and two hands, correct human anatomy. No extra limbs, no extra arms, no extra hands, no duplicated body parts."; (b) if the expression comes back blank, replace the expression sentence with "Her/His face clearly shows discomfort: brows gently drawn together, eyes narrowed or briefly closed, lips pressed tight as she/he holds back a wince — real visible pain in the expression, yet dignified and restrained, not screaming or exaggerated."; (c) for limb joints (shoulder, elbow, wrist, knee, ankle) prefer a **small contained X-ray window** over the joint instead of a full-skeleton overlay: "A small, contained see-through cutaway X-ray window over the [joint] area ONLY … Absolutely no bones drawn anywhere else — no forearm bones, no hand bones, no ribcage, no spine; everywhere outside that small window the person stays fully photorealistic." Full-skeleton overlays on crossed/raised arms tend to render as phantom limbs.
- Output is PNG ~2400×1792 → convert to JPG q85, save as `images/conditions/<slug>.jpg` (slugs below match the code's picsum seeds; wiring steps in §4).
- Composition: subject centred with breathing room; the glowing region must sit in the middle 70% of the frame (deck crops to ~3:2, grid to 4:3 via `object-fit: cover`).

#### PROMPT_TEMPLATE v3 — CURRENT (2026-07-20, after Daniel's review)

**Daniel's feedback on the v2 set: the faces show no 痛/不适 at all, everything is too dark, and the red is too loud.** All three faults were baked into the v2 template itself, so v2 is retired — use v3 below for every remaining image.

What changed and why:
- **Expression.** v2's "Composed, dignified expression showing quiet discomfort … never dramatic wincing" over-corrected into a blank face — the tennis-elbow model was outright smirking. v3 replaces it with a specific, FACS-grounded description (brow lowerer + orbital tightening + jaw set), because naming the muscles gets a real face where naming the mood does not. The "not a grimace" guard is kept but demoted below the positive description, and Ricky's brief stands: 表情不要过度疼痛一眼假 AI，表情必须有细节.
- **Light.** v2's `DIM` mood ("dim moody slate-navy interior, cool evening tones") is **deleted** — it is what made sciatica and whiplash near-black. Every scene is now daylight. Dusk/night settings were rewritten to daytime equivalents (the ride-hailing driver now steps out mid-morning, the rear-end bump happens at a sunlit traffic light).
- **Red.** "glows bright neon red with a soft radiating red pain aura" → a restrained inflamed-tissue tint confined to the joint, with explicit bans on halos, concentric rings and shockwave circles. Ricky: the red need not be obvious, accuracy matters more.
- **Anatomy.** Containment is now stated as a hard requirement. Both first-pass whiplash draws put the cervical spine *outside* the neck, floating over the car seat; the reshoot added the CONTAINMENT IS CRITICAL block and fixed it.

> Photorealistic editorial photograph for a chiropractic clinic, with a subtle anatomical X-ray overlay.
>
> SCENE: **[SCENE]**
>
> FACIAL EXPRESSION — the single most important element of this photograph: a real, restrained expression of physical discomfort, caught mid-moment. The inner ends of both eyebrows pull down and together, leaving a clear vertical crease between the brows. The eyes narrow and tighten, upper lids lowered, fine creases at the outer corners. The cheek and nostril on the sore side lift very slightly. The jaw is set with the back teeth lightly clenched so the muscle stands out along the jawline; the lips press into a thin flat line, parted just enough to hold a breath. The head tilts a few degrees away from the sore side and the tendons in the neck show. The knuckles of the hand touching the sore area are pale from the pressure. **[ONE LINE OF BACKSTORY — "this is a person who has lived with this ache for weeks", "a club player whose elbow has been getting worse for a month"]** — believable, understated, human. Absolutely NOT smiling, NOT smirking, NOT serene, NOT calm, NOT neutral or blank-faced, and NOT a theatrical open-mouthed grimace or exaggerated cartoon wince.
>
> LIGHT AND COLOUR: true-to-life colour, bright and full of life. Natural healthy skin with visible warmth and blood in the face, clean neutral white balance, soft directional daylight, open shadows that keep their detail. Rich but natural saturation. Full-frame camera, 50mm lens, shallow depth of field, high definition, candid documentary feel. NOT dark, NOT dim, NOT moody, no cinematic navy or teal shadow grading, no crushed blacks, no sepia, no heavy yellow cast.
>
> ANATOMICAL OVERLAY: over the **[REGION]** only, a partial see-through cutaway revealing the skeleton beneath the skin. Medical-illustration accuracy — correct bone shapes, correct vertebra count, joints in their true anatomical positions and proportions, the entire overlay contained strictly inside the body outline. **[GLOW]** is tinted a restrained deep red, like inflamed tissue seen through skin: low intensity, soft-edged, confined to the joint itself. **[FAINT]** are faint cool-white translucent linework fading into skin and clothing. NO neon, NO bright glowing halo, NO concentric rings or shockwave circles, NO lens flare, NO sci-fi hologram look. The rest of the person stays fully photorealistic.
>
> No text, no labels, no arrows, no watermark.

**Add for any neck/spine shot** (a first-pass whiplash failure — the spine rendered beside the person, over the car seat), replacing the first line of the overlay block:

> ANATOMICAL OVERLAY — CONTAINMENT IS CRITICAL: … The column must sit ENTIRELY INSIDE the outline of his actual neck, centred exactly where a real spine would be. The overlay must NEVER extend past the edge of his skin onto the car seat, the headrest, the window or the background — not one millimetre outside the body. … NO floating skeleton beside the person.

**Add whenever a first pass renders vertebra labels** (one whiplash draw came back with C3–C7 printed on the bones):

> Absolutely no text anywhere in the image: no vertebra labels, no C1 C2 C3 C4 C5 C6 C7 markings, no numbers, no captions, no arrows, no watermark.

**Run settings:** OpenArt MCP, `nano-banana-pro`, `text2image`, `autoEnhancePrompt:false`, **4:3**, **2K**, `imageCount: 2`. 80 credits per condition — always draw 2 and pick, the expression is the coin-flip. Output is 2400×1792 PNG → `sips -Z 1280` → JPEG q78 → `images/conditions/<slug>.jpg` (matches the existing set at 1280×955, ~200–260KB).

**Status: 6 of 16 regenerated on v3 (2026-07-20)** — `sciatica`, `whiplash`, `tennis-elbow`, `hip-pain`, `knee-pain`, `sports-injury`. Originals recoverable from commit `45b8d4e`. The remaining 10 still carry the dark v2 look and should be re-run on v3 for a consistent set: `slipped-disc`, `back-pain`, `neck-pain`, `migraine`, `shoulder-pain`, `carpal-tunnel`, `scoliosis`, `posture`, `pregnancy`, `paediatric`.

**Also worth carrying over from the sports-injury run:** the v2 image had the red spread over the *entire* lower leg rather than the ankle — for any limb-joint condition, name the joint anatomically ("where the lower ends of the shin bones meet the talus") and add "confined to the joint itself", or the model floods the whole limb. The two-arms/two-legs guard from §"Prompt hardening" is still worth appending to any seated or crossed-limb pose. Note the scene text in the §"Per-image spec" table below is still v2 — reuse the SCENE column but **ignore its Mood column entirely** and rewrite any dusk/night setting as daylight.

#### PROMPT_TEMPLATE v2 (RETIRED — kept for reference only, do not use)

> Premium medical visualization for a chiropractic clinic, photorealistic with anatomical overlay. **[SCENE]** **[MOOD]** Composed, dignified expression showing quiet discomfort — a pause, a held breath — never dramatic wincing. True-to-life Sony color science, crisp neutral white balance, natural skin rendering, high definition, clean premium healthcare-brand aesthetic. Over the **[REGION]**, a partial see-through cutaway X-ray effect: high-quality translucent skeletal illustration, anatomically correct proportions, kept strictly inside the body, where the **[GLOW]** glows bright neon red with a soft radiating red pain aura, while the **[FAINT]** are drawn as faint cool-white glowing linework fading into skin and clothing. The rest of the person stays fully photorealistic. No text, no labels, no arrows, no watermark, no sepia, no yellow or warm color cast.

**MOOD strings (verbatim):**
- `DIM` → "Dim moody slate-navy interior, cinematic soft rim lighting, cool evening tones."
- `DAY` → "Bright clean interior with neutral daylight, airy and uncluttered; keep the scene's shadows cool and neutral so the red glow stays highly readable."
- `SPORT` → "Cool even indoor sports-hall lighting, clean neutral tones."

#### Per-image spec — 16 conditions

| # | Slug | Mood | SCENE | REGION | GLOW (red) | FAINT (white) |
|---|---|---|---|---|---|---|
| 01 | `slipped-disc` | DAY | An Asian man in his 40s in a condo living room, caught mid-lift as he hoists a full 19-litre water-dispenser bottle, body braced, one hand flying to his lower back. | lower back | one lumbar disc and its two adjacent vertebrae, a single brightest point | rest of the lumbar spine and pelvis |
| 02 | `back-pain` | DIM | An Asian woman in her early 30s at a tidy home-office desk late in the evening leans back in her chair, one hand kneading her lower back, laptop open in front of her, side profile. | lower back | lumbar vertebrae | ribcage and pelvis |
| 03 | `sciatica` | DIM | An Asian man in his 30s, a ride-hailing driver, steps out of his parked car at dusk after hours behind the wheel and pauses halfway, one hand tracing down the back of his thigh, three-quarter rear angle. | lower back and the back of one thigh | lower lumbar spine and sacrum, plus a thin bright red nerve line radiating from the spine through the buttock down the back of the thigh | pelvis and femur, anatomically correct and kept inside the body |
| 04 | `neck-pain` | DIM | A young Asian woman lying on a living-room sofa at night, head propped at an awkward sharp angle against the hard armrest while she watches TV, one hand reaching to rub the back of her bent neck, soft TV glow on her face. | bent neck | cervical vertebrae at the sharp bend | skull and upper thoracic spine |
| 05 | `migraine` | DIM | An Asian woman in her 30s at a desk in a dim cool-lit room presses two fingertips to her temple, eyes closed, laptop glow soft on her face, side profile. | head and upper neck | upper cervical vertebrae and the base of the skull, with a faint red halo at the temple | skull and jaw |
| 06 | `whiplash` | DIM | An Asian man seated in his parked car at dusk after a minor rear-end bump, seatbelt still on, turning his head slowly with one hand supporting the side of his neck. | neck | the full cervical spine | skull, collarbones and upper ribcage |
| 07 | `shoulder-pain` | DAY | A middle-aged Asian man in a bright service-yard hanging laundry, frozen mid-reach with a shirt toward the high drying rack, his other hand gripping the top of his shoulder. | raised shoulder | the shoulder joint where the arm meets the shoulder blade | shoulder blade, collarbone and upper arm bone |
| 08 | `tennis-elbow` | SPORT | An Asian man in his 30s on an indoor badminton court lowers his racket between rallies and wraps his opposite hand around his outer elbow and forearm, green court blurred behind. | racket arm's elbow | the outer elbow joint and the muscle attachment on the outer forearm | upper arm and forearm bones |
| 09 | `carpal-tunnel` | DIM | Close crop of an Asian woman's hands at a laptop keyboard late at night, one hand massaging the opposite wrist, fingers slightly flexed, desk lamp pooling light on the desk. | massaged wrist | the small carpal bones and the narrow tunnel at the base of the palm | forearm bones and finger bones |
| 10 | `hip-pain` | DAY | An Asian woman in her 60s pauses on her morning walk in a leafy tropical park, one hand resting on her hip, weight shifted to the other leg, fresh green bokeh. | standing hip | the hip joint where the thigh bone meets the pelvis | pelvis and upper femur |
| 11 | `knee-pain` | DAY | An Asian man in his 30s pauses mid-flight on the concrete stairs of an apartment block, one hand cupped over his knee, the remaining steps rising behind him. | bent knee | the kneecap and the joint surfaces behind it | thigh and shin bones |
| 12 | `sports-injury` | SPORT | A young Asian futsal player seated on a gym bench at courtside, leaning forward to hold his taped ankle, water bottle beside him. | taped ankle | the ankle joint and the lower ends of the shin bones | foot bones and lower leg |
| 13 | `scoliosis` | DAY | A teenage Asian girl seen from behind standing before a bedroom mirror in a loose t-shirt, one shoulder sitting subtly higher than the other as she checks her posture. | back | the apex vertebrae at the curve's peak | the full spine drawn faint white so the sideways S-curve reads clearly, plus shoulder blades |
| 14 | `posture` | DIM | Side profile of an Asian office worker at a laptop in the evening, rounded shoulders and forward head posture, desk lamp glow, minimal workspace. | neck and upper back | the hinge where the neck meets the upper back | skull, cervical spine and upper ribcage showing the forward-head angle |
| 15 | `pregnancy` | DAY | A pregnant Asian woman in her third trimester stands by a bright window, both hands gently supporting her lower back, serene. | lower back | lower lumbar spine and the two sacroiliac joints, **gentle low-intensity glow** — soft warm red, no harsh neon | pelvis |
| 16 | `paediatric` | DAY | An Asian child around 7 wearing a clearly heavy school backpack stands slightly hunched under its weight in a bright home entryway while a parent kneels to adjust the straps. | child's upper back | thoracic vertebrae under the backpack straps, **gentle low-intensity glow** — soft red, reassuring not alarming | ribcage and shoulders |

**Assembled example (04 `neck-pain`) — copy this pattern for every row:**

> Premium medical visualization for a chiropractic clinic, photorealistic with anatomical overlay. A young Asian woman lying on a living-room sofa at night, head propped at an awkward sharp angle against the hard armrest while she watches TV, one hand reaching to rub the back of her bent neck, soft TV glow on her face. Dim moody slate-navy interior, cinematic soft rim lighting, cool evening tones. Composed, dignified expression showing quiet discomfort — a pause, a held breath — never dramatic wincing. True-to-life Sony color science, crisp neutral white balance, natural skin rendering, high definition, clean premium healthcare-brand aesthetic. Over the bent neck, a partial see-through cutaway X-ray effect: high-quality translucent skeletal illustration, anatomically correct proportions, kept strictly inside the body, where the cervical vertebrae at the sharp bend glow bright neon red with a soft radiating red pain aura, while the skull and upper thoracic spine are drawn as faint cool-white glowing linework fading into skin and clothing. The rest of the person stays fully photorealistic. No text, no labels, no arrows, no watermark, no sepia, no yellow or warm color cast.

**Status:** test batch 2026-07-09 (back-pain, neck-pain, sciatica on Nano Banana Pro + GPT Image 2) approved. Note the tested back-pain/neck-pain/sciatica used older desk/café/car scenes — regenerate all three with the table above so scenarios match. 痛点 X-ray direction confirmed; remaining 13 + 3 refreshed = 16 to generate.

---

## 3. Pet signs set — 12 images (pet-chiro page)

Save to: `images/pet-signs/<slug>.jpg`
Casting: 9 dogs (varied breeds/sizes/ages) + 3 cats (#04 flinch, #06 mood, #11 aggression). Candid home settings; tiled/wood floors are typical SEA homes and directly relevant to the "slips" sign.

| # | Slug | Scene prompt (append to STYLE_PREFIX) |
|---|---|---|
| 01 | `sign-jump` | A senior corgi stands at the foot of a grey fabric sofa looking up at the cushion, front paws planted, visibly hesitating to jump. Bright living room, neutral daylight, low camera angle at dog height. |
| 02 | `sign-gait` | A golden retriever walking across a light wooden floor at a subtle diagonal crab-walk angle, hips slightly offset from its shoulders. Low tracking camera angle, clean bright hallway, motion natural not blurred. |
| 03 | `sign-stiff` | An older black labrador rising slowly from its dog bed, front legs stretched forward while the hindquarters still rest, joints visibly careful. Soft morning daylight across a tiled floor. |
| 04 | `sign-touch` | A domestic shorthair cat ducking its body low and away from a person's hand reaching toward its lower back, ears turned back slightly. Neutral sofa setting, soft window light, subtle and tasteful. |
| 05 | `sign-lick` | A shiba inu curled on a woven rug, intently licking one hip joint, fur at the spot slightly ruffled from repetition. Clean bright living room, shallow depth of field. |
| 06 | `sign-mood` | A tabby cat withdrawn beneath a dining table, resting low with paws tucked, gaze up and wary, a favourite toy lying untouched nearby. Quiet neutral daylight, gentle mood without gloom. |
| 07 | `sign-play` | A border collie lying flat in a small tropical garden beside a tennis ball it hasn't chased, chin near the grass, eyes on the ball. Bright overcast daylight, fresh green tones kept neutral. |
| 08 | `sign-posture` | Clean side profile of a beagle standing on a wooden floor with a subtly rounded, arched back and low tail carriage. Minimal bright background so the topline silhouette reads clearly. |
| 09 | `sign-sit` | A labrador sitting in the classic "mermaid sit" — both hind legs swung to one side instead of square beneath it — photographed front-on at floor level in a bright living room. |
| 10 | `sign-slip` | A senior golden retriever caught mid-step on glossy ceramic floor tiles, hind paws splayed slightly outward as they lose grip. Candid low angle, bright clean home interior, no distress. |
| 11 | `sign-aggression` | A domestic cat with flattened ears and tense, coiled posture reacting as a hand approaches its hindquarters, tail low and stiff. Controlled, tasteful moment — alert body language, not violence. Neutral home setting. |
| 12 | `sign-limp` | A jack russell terrier mid-stride on a garden path holding one front paw slightly lifted off the ground, weight shifted to the other legs. Neutral daylight, shallow background blur. |

### 3b. Pain-point (痛点) X-ray overlay variant — v2 style

Upgrade of the pet-signs set for stronger visual impact (reference: IG "how to carry your small dog" post — realistic pet + glowing skeleton overlay on dark background). Generated with OpenArt / Nano Banana Pro, text2image, 4:3, 2K, 1 image per run.

**STYLE_PREFIX (v2):**
> Premium veterinary medical visualization, photorealistic with anatomical overlay. [SCENE — reuse the scene from the table above, but re-set it in a dark moody slate-navy environment with cinematic soft rim lighting on the fur.] Over the [AFFECTED REGION], a partial see-through cutaway X-ray effect: high-quality translucent skeletal illustration where the [AFFECTED BONES/JOINTS] glow bright neon red with a soft radiating red pain aura, while the surrounding skeleton is drawn as faint cool-white glowing linework fading into the fur. The rest of the animal stays fully photorealistic. No text, no labels, no arrows, no watermark.

**Pain-point mapping per sign:**

| Slug | Affected region glowing red |
|---|---|
| sign-jump | lumbar spine, pelvis + hip joints |
| sign-gait | pelvis + one hip, sacroiliac area |
| sign-stiff | hip joints + lower lumbar vertebrae |
| sign-touch | mid–lower back vertebrae under the approaching hand |
| sign-lick | the licked hip joint |
| sign-mood | whole spine faint red (diffuse discomfort) |
| sign-play | hips + stifles (knees) |
| sign-posture | arched thoracolumbar spine |
| sign-sit | pelvis + hip joints (asymmetric, one side brighter) |
| sign-slip | hind-limb hips, stifles + hocks |
| sign-aggression | lumbar spine + hindquarters near the hand |
| sign-limp | shoulder, elbow + carpus of the lifted front leg |

Test batch generated 2026-07-09: sign-jump, sign-stiff, sign-limp.

---

## 4. Wiring the images into the site (after generation)

1. **Home deck** — [index.html:1650](index.html): change the JS card template from
   `'https://picsum.photos/seed/aligned-'+c.s+'/640/420'` → `'images/conditions/'+c.s+'.jpg'`.
   (The `s:` slugs in the `CONDS` array at line 1614 already match the filenames above.)
2. **Gonstead grid** — [chiropractic.html:276–291](chiropractic.html): replace each
   `https://picsum.photos/seed/aligned-<slug>/500/380` with `images/conditions/<slug>.jpg`.
   Note two seed-name mismatches vs the table slugs: the page uses `aligned-headache…` under seed `aligned-migraine` ✔ (matches) and `aligned-posture` ✔ — all 16 seeds match the slugs exactly, so it's a find-and-replace.
3. **Pet signs** — [pet-chiro.html:199–210](pet-chiro.html): replace each
   `https://picsum.photos/seed/aligned-sign-<slug>/500/380` with `images/pet-signs/sign-<slug>.jpg`
   (seeds: jump, gait, stiff, touch, lick, mood, play, posture, sit, slip, aggression, limp).
4. Add descriptive `alt` text per image while swapping (Gonstead + pet cards currently have empty `alt`).

---

## 5. Banner backgrounds — 12 images (sections that currently recycle `gonstead-exam.jpg` / `hero-poster.jpg`)

Save to: `images/banners/<slug>.jpg`

These all sit **behind a dark scrim with light text on top**, so every image must be:
- **Dim, cinematic, low overall luminance** — slate-navy shadows, soft rim light (same DIM mood as §2b).
- **Quiet in the centre** — headline text sits mid-frame; keep the subject offset and detail away from dead centre.
- **Face-safe** — practitioner faces turned away, cropped out, or softly out of focus. These images imply "our clinic / our doctor"; an identifiable AI face would fabricate a staff member. Hands, instruments and backs carry the story. (Long-term, replace the CTA/practitioner banners with real clinic photography; generative is the launch version.)

MCP: `openart_generate_image`, Nano Banana Pro, `autoEnhancePrompt:false`, 2K. Aspect: **16:9** for full-bleed banners, **3:4 portrait** for the Journey strips. Prepend the §1 STYLE_PREFIX, append the anti-warm/no-text tail from §2b.

### 5a. Gonstead method banner — 5 layers (index.html:1104–1108, hover-swapped, one per diagnostic step)

Layer order must match tile order `data-i="0…4"`. 16:9.

| # | Slug | Tile | Scene prompt (append to STYLE_PREFIX) |
|---|---|---|---|
| 01 | `gonstead-01-visualization` | Visualization | Seen over a chiropractor's blurred shoulder in the dim foreground, an Asian patient stands upright against a plain slate-grey clinic wall being visually assessed, subtle asymmetry in shoulder height. Dim moody slate-navy clinic, one soft window rim light tracing the patient's silhouette. Patient positioned in the left third, generous dark negative space right. No faces clearly visible. |
| 02 | `gonstead-02-instrumentation` | Instrumentation | Extreme close-up of a practitioner's hands gliding a dual-probe Nervoscope instrument down the bare upper spine of a patient, the two metal probes straddling the vertebrae. Dim cinematic slate-navy room, a single soft light raking across the skin so the spine's contour reads clearly. Hands and instrument in the lower-left third, deep soft-focus darkness above. No faces. |
| 03 | `gonstead-03-static-palpation` | Static palpation | Close-up of a practitioner's two thumbs pressing gently either side of a patient's mid spine, patient lying prone on a chiropractic bench, skin and thumbs sharply focused. Dim moody slate-navy clinic, soft rim light along the back's curve. Subject low in frame, dark quiet upper half. No faces. |
| 04 | `gonstead-04-motion-palpation` | Motion palpation | An Asian patient seated on a chiropractic bench seen from behind, torso gently rotated to one side while a practitioner's hand contacts the lower spine guiding the movement, sense of controlled motion. Dim cinematic slate-navy clinic, rim light on the turning shoulder. Subjects offset right, dark negative space left. Faces turned away. |
| 05 | `gonstead-05-xray-analysis` | X-ray analysis | A full-length weight-bearing spinal X-ray film clipped to a glowing lightbox in a dark room, a hand holding a fine pencil and clear ruler drawing precise measurement lines across the vertebrae. The lightbox is the only light source, cool blue-white glow. Film offset left, hand entering from lower right, dark negative space around. No text or labels readable on the film. |

### 5b. Service journey strips — 5 portraits (index.html:1236–1240, split-photo background)

Each `<span>` shows one tall strip; generate **3:4 portrait**, subject centred vertically. Order = step order.

| # | Slug | Step | Scene prompt (append to STYLE_PREFIX) |
|---|---|---|---|
| 01 | `journey-01-listen` | Listen | Close crop of a consultation across a warm wooden desk: a patient's clasped hands in the foreground, a practitioner's hands with a pen and paper intake form listening opposite, shallow focus. Dim calm slate-navy consult room, soft lamp pool of light on the desk. No faces. |
| 02 | `journey-02-assess` | Assess | A practitioner's hands checking the level of an Asian patient's hips from behind, thumbs resting on the pelvic crests, patient standing in a dim examination room. Cool cinematic rim light outlining the standing figure. Faces out of frame. |
| 03 | `journey-03-personalise` | Personalise | A practitioner's hand pointing with a pen at a lumbar vertebra on a white anatomical spine model on a desk, a spinal X-ray glowing softly on a screen behind, patient's shoulder blurred in the foreground. Dim slate-navy consult room, focused pool of light on the spine model. No faces. |
| 04 | `journey-04-restore` | Restore | An Asian patient lying on their side on a chiropractic bench receiving a precise lumbar adjustment, practitioner's hands stacked in a specific contact on the lower spine, composed and calm. Dim cinematic clinic, soft rim light along the patient's side. Faces turned away or softly blurred. |
| 05 | `journey-05-maintain` | Maintain | An Asian woman in her 30s in activewear standing tall at a leafy park at first light, arms stretched overhead in an easy morning reach, posture upright and free. Cool fresh early-morning light kept dim and cinematic, green bokeh, figure silhouetted with a soft rim glow. Face small in frame or turned away. |

### 5c. Shared page banners — 2 images

| Slug | Used at | Ratio | Scene prompt (append to STYLE_PREFIX) |
|---|---|---|---|
| `cta-adjustment` | Final CTA band on about.html:299, chiropractic.html:385, shop.html:258, news.html:201 (one shared file) | 16:9 | Wide cinematic shot of a chiropractic adjustment in progress: patient prone on the bench, practitioner leaning in with a precise pisiform contact on the lower spine, both figures small and offset in the left third of a dim slate-navy clinic, vast dark negative space across the rest of the frame for headline text. Single soft rim light. Faces turned away. |
| `fhero-gonstead-legacy` | chiropractic.html:193 founder hero ("Built by an engineer.") | 16:9 | A 1920s engineer's drafting table in a dark room: a technical blueprint drawing of a human spine with fine measurement lines and annotations, a brass drafting compass and steel ruler resting on the paper, warm desk lamp glow kept low and moody against deep shadow. Vintage engineering atmosphere, subject offset low-left, dark negative space upper right. Any lettering on the blueprint must be indistinct and unreadable. |

### 5d. Promo slots — 1 image (+1 reuse)

| Slug | Used at | Ratio | Scene prompt (append to STYLE_PREFIX) |
|---|---|---|---|
| `news-featured-offer` | news.html:115 featured card (RM50 first-assessment offer) + reuse on landing modal voucher tile index.html:887 | 16:9 | A bright, welcoming first-assessment moment: a clinic reception desk in soft daylight with a clipboard intake form, a warm cup of tea and a small potted plant, an Asian receptionist's hands passing the clipboard forward, shallow depth of field. Brighter than the banner set but still clean neutral daylight — this card sits on a light page with no scrim. No faces, no readable text. |

**Reuse, don't generate:** the Problem section background at index.html:997 — swap `gonstead-exam.jpg` for `images/conditions/back-pain.jpg` (DIM mood, already on-message).

### 5e. Wiring after generation

1. **Gonstead banner** — index.html:1104–1108: replace the five `background-image` URLs in layer order with `images/banners/gonstead-01-visualization.jpg` … `gonstead-05-xray-analysis.jpg`.
2. **Journey strips** — index.html:1236–1240: replace the five span URLs in step order with `images/banners/journey-01-listen.jpg` … `journey-05-maintain.jpg`.
3. **Final CTA ×4** — about.html:299, chiropractic.html:385, shop.html:258, news.html:201: point all four at `images/banners/cta-adjustment.jpg`.
4. **Founder hero** — chiropractic.html:193 → `images/banners/fhero-gonstead-legacy.jpg`.
5. **News featured + landing tile** — news.html:115 and index.html:887 → `images/banners/news-featured-offer.jpg`.
6. **Problem bg** — index.html:997 → `images/conditions/back-pain.jpg` (no new file).
