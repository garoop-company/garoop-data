Create one horizontal animation strip for Codex pet `garuchan-spy-outfit`, state `waiting`.

Use the attached canonical base for identity. Use the attached layout guide only for slot count, spacing, centering, and padding; do not draw the guide.

Output exactly 6 full-body frames in one left-to-right row on flat pure cyan #00FFFF. Treat the row as 6 invisible equal-width slots: one centered complete pose per slot, evenly spaced, with no overlap, clipping, empty slots, labels, or borders.

Identity: same pet in every frame: ピンクの大きな耳と大きな瞳を持つかわいいガルちゃん。お腹のポーチに赤ちゃんがいる。黒いスパイ衣装、黒いサングラス、小さな映画小道具風ピストルを下向きに持つ。小道具は非写実的で発射しない。. Preserve silhouette, face, proportions, markings, palette, material, style, and props.
Style: Pet-safe sprite: compact full-body mascot, readable in a 192x208 cell, clear silhouette, simple face, stable palette/materials, and crisp edges for chroma-key extraction. Style `auto`: Infer the most appropriate pet-safe style from the user request and reference images, then keep that exact style consistent across every row. User style notes: かわいいステッカー/マスコット調を維持。全身、太い輪郭、読みやすい大きな形。サングラス、黒いスーツ、赤ちゃんポーチ、小さな下向きの映画小道具を全行で一貫させる。暴力表現、発射、弾、煙、標的、血、リアルな武器ディテールは入れない。.
Animation continuity: keep apparent pet scale and baseline stable within the row unless the state itself intentionally changes vertical position, such as `jumping`. Move the pose within the slot instead of redrawing the pet larger or smaller frame to frame.

State action: Needs-input loop: expectant asking pose for approval, help, or user input.

State requirements:
- Show that Codex needs approval, help, or user input through an expectant asking pose.
- Keep the motion patient and readable, without turning it into ordinary idle or review.

Clean extraction: crisp opaque edges, safe padding, no scenery, text, guide marks, checkerboard, shadows, glows, motion blur, speed lines, dust, detached effects, stray pixels, or chroma-key colors inside the pet.
