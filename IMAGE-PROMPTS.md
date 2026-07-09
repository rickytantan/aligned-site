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

#### PROMPT_TEMPLATE (assemble per image)

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
