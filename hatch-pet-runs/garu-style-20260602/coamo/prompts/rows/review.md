Create one horizontal animation strip for Codex pet `coamo`, state `review`.

Use the attached canonical base for identity. Use the attached layout guide only for slot count, spacing, centering, and padding; do not draw the guide.

Output exactly 6 full-body frames in one left-to-right row on flat pure green #00FF00. Treat the row as 6 invisible equal-width slots: one centered complete pose per slot, evenly spaced, with no overlap, clipping, empty slots, labels, or borders.

Identity: same pet in every frame: pink koala mascot with round fluffy ears, oval nose, cream belly, tiny paws. Reference style lock: soft pastel pink base, deep rose thick rounded outlines, huge glossy round eyes with white star highlights, rosy cheeks, cream-white muzzle/chest/belly accents, plush baby proportions, cute front-facing mascot, clean whole-body sprite, no black background, no shadow.. Japanese display concept: こあも: 眠そうなコアラ。ふわふわ耳と白いお腹で、休憩のタイミングを教えてくれる。. Preserve silhouette, face, proportions, markings, palette, material, style, and props.
Style: Pet-safe sprite: compact full-body mascot, readable in a 192x208 cell, clear silhouette, simple face, stable palette/materials, and crisp edges for chroma-key extraction. Style `auto`: Infer the most appropriate pet-safe style from the user request and reference images, then keep that exact style consistent across every row. User style notes: Reference style lock: soft pastel pink base, deep rose thick rounded outlines, huge glossy round eyes with white star highlights, rosy cheeks, cream-white muzzle/chest/belly accents, plush baby proportions, cute front-facing mascot, clean whole-body sprite, no black background, no shadow..
Animation continuity: keep apparent pet scale and baseline stable within the row unless the state itself intentionally changes vertical position, such as `jumping`. Move the pose within the slot instead of redrawing the pet larger or smaller frame to frame.

State action: Ready-review loop: focused inspection of completed output with lean, blink, narrowed eyes, head tilt, or paw pose.

State requirements:
- Show review through lean, blink, narrowed eyes, head tilt, or paw/hand position.
- Do not add magnifying glasses, papers, code, UI, punctuation, symbols, or other new props unless they already exist in the base pet identity.

Clean extraction: crisp opaque edges, safe padding, no scenery, text, guide marks, checkerboard, shadows, glows, motion blur, speed lines, dust, detached effects, stray pixels, or chroma-key colors inside the pet.
