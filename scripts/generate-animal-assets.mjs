import { mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.join(process.cwd(), "public", "animal");

const animals = `
Aardvark|mammal
African Buffalo|mammal
African Elephant|mammal
African Wild Dog|mammal
Albatross|bird
Alligator|reptile
Alpaca|mammal
Anaconda|reptile
Angelfish|fish
Anteater|mammal
Antelope|mammal
Arctic Fox|mammal
Armadillo|mammal
Axolotl|amphibian
Baboon|mammal
Badger|mammal
Bald Eagle|bird
Bandicoot|mammal
Barn Owl|bird
Barracuda|fish
Basilisk Lizard|reptile
Bat|mammal
Beaver|mammal
Bengal Tiger|mammal
Bison|mammal
Black Bear|mammal
Blue Jay|bird
Blue Whale|mammal
Boa Constrictor|reptile
Bobcat|mammal
Bonobo|mammal
Bottlenose Dolphin|mammal
Bowerbird|bird
Box Turtle|reptile
Brown Bear|mammal
Budgerigar|bird
Butterfly|insect
Camel|mammal
Capybara|mammal
Caracal|mammal
Cardinal|bird
Cassowary|bird
Cat|mammal
Caterpillar|insect
Cheetah|mammal
Chicken|bird
Chimpanzee|mammal
Chinchilla|mammal
Chipmunk|mammal
Chameleon|reptile
Clownfish|fish
Cobra|reptile
Cockatoo|bird
Cod|fish
Coelacanth|fish
Condor|bird
Coral Snake|reptile
Cormorant|bird
Coyote|mammal
Crab|crustacean
Crane|bird
Crocodile|reptile
Crow|bird
Cuttlefish|mollusk
Deer|mammal
Dingo|mammal
Dog|mammal
Dolphin|mammal
Donkey|mammal
Dragonfly|insect
Dugong|mammal
Duck|bird
Echidna|mammal
Eel|fish
Elephant Seal|mammal
Emperor Penguin|bird
Emu|bird
Falcon|bird
Fennec Fox|mammal
Ferret|mammal
Firefly|insect
Flamingo|bird
Flying Squirrel|mammal
Fox|mammal
Frilled Lizard|reptile
Frog|amphibian
Gazelle|mammal
Gecko|reptile
Gibbon|mammal
Gila Monster|reptile
Giraffe|mammal
Goat|mammal
Goose|bird
Gorilla|mammal
Grasshopper|insect
Great White Shark|fish
Green Sea Turtle|reptile
Groundhog|mammal
Guinea Pig|mammal
Hamster|mammal
Hare|mammal
Hawk|bird
Hedgehog|mammal
Hippopotamus|mammal
Hornbill|bird
Horse|mammal
Hummingbird|bird
Hyena|mammal
Ibis|bird
Iguana|reptile
Impala|mammal
Jackal|mammal
Jaguar|mammal
Jellyfish|cnidarian
Kangaroo|mammal
King Cobra|reptile
Kingfisher|bird
Kiwi|bird
Koala|mammal
Komodo Dragon|reptile
Kookaburra|bird
Lemur|mammal
Leopard|mammal
Lion|mammal
Llama|mammal
Lobster|crustacean
Lynx|mammal
Macaw|bird
Manatee|mammal
Mandrill|mammal
Manta Ray|fish
Meerkat|mammal
Mole|mammal
Mongoose|mammal
Monitor Lizard|reptile
Moose|mammal
Moray Eel|fish
Moth|insect
Mountain Goat|mammal
Mouse|mammal
Narwhal|mammal
Newt|amphibian
Nightingale|bird
Octopus|mollusk
Okapi|mammal
Opossum|mammal
Orangutan|mammal
Orca|mammal
Ostrich|bird
Otter|mammal
Owl|bird
Panda|mammal
Pangolin|mammal
Panther|mammal
Parrot|bird
Peacock|bird
Pelican|bird
Peregrine Falcon|bird
Pig|mammal
Platypus|mammal
Polar Bear|mammal
Porcupine|mammal
Prairie Dog|mammal
Praying Mantis|insect
Puffin|bird
Python|reptile
Quail|bird
Quokka|mammal
Rabbit|mammal
Raccoon|mammal
Rat|mammal
Raven|bird
Red Panda|mammal
Reindeer|mammal
Rhinoceros|mammal
Roadrunner|bird
Salamander|amphibian
Salmon|fish
Scorpion|arachnid
Seahorse|fish
Seal|mammal
Sea Lion|mammal
Sea Otter|mammal
Sheep|mammal
Shrimp|crustacean
Skunk|mammal
Sloth|mammal
Snail|mollusk
Snake|reptile
Snow Leopard|mammal
Sparrow|bird
Spider|arachnid
Squid|mollusk
Squirrel|mammal
Starfish|echinoderm
Stingray|fish
Swan|bird
Tapir|mammal
Tasmanian Devil|mammal
Toucan|bird
Trout|fish
Tuna|fish
Turkey|bird
Walrus|mammal
Warthog|mammal
Wasp|insect
Weasel|mammal
Whale Shark|fish
Wolf|mammal
Wombat|mammal
Woodpecker|bird
Yak|mammal
Zebra|mammal
Zebu|mammal
Addax|mammal
Agama Lizard|reptile
Arapaima|fish
Asian Elephant|mammal
Asian Small-clawed Otter|mammal
Atlantic Puffin|bird
Aye-aye|mammal
Bearded Dragon|reptile
Beluga Whale|mammal
Binturong|mammal
Black Mamba|reptile
Black Swan|bird
Blue Morpho Butterfly|insect
Blue-footed Booby|bird
Bontebok|mammal
Bushbaby|mammal
Caecilian|amphibian
Caribou|mammal
Carp|fish
Chamois|mammal
Clam|mollusk
Clouded Leopard|mammal
Coati|mammal
Cockroach|insect
Common Loon|bird
Cougar|mammal
Dama Gazelle|mammal
Dik-dik|mammal
Eagle Ray|fish
Eastern Newt|amphibian
Electric Eel|fish
Elk|mammal
Fiddler Crab|crustacean
Fin Whale|mammal
Fossa|mammal
Galapagos Tortoise|reptile
Gar|fish
Gharial|reptile
Giant Clam|mollusk
Giant Panda|mammal
Golden Eagle|bird
Golden Lion Tamarin|mammal
Grouper|fish
Guanaco|mammal
Harbor Porpoise|mammal
Harp Seal|mammal
Harpy Eagle|bird
Hercules Beetle|insect
Hermit Crab|crustacean
Hoatzin|bird
Horseshoe Crab|arachnid
Ibex|mammal
Indri|mammal
Japanese Macaque|mammal
Kakapo|bird
Kea|bird
Kudu|mammal
Leaf-tailed Gecko|reptile
Leatherback Turtle|reptile
Lionfish|fish
Little Penguin|bird
Lungfish|fish
Malayan Tapir|mammal
Mallard|bird
Mantis Shrimp|crustacean
Margay|mammal
Marmoset|mammal
Musk Ox|mammal
Nautilus|mollusk
Nile Monitor|reptile
Ocelot|mammal
Olm|amphibian
Oni|mythical
Oryx|mammal
Pacu|fish
Pika|mammal
Poison Dart Frog|amphibian
Proboscis Monkey|mammal
Puma|mammal
Quetzal|bird
Red Fox|mammal
Rhea|bird
Ring-tailed Lemur|mammal
Rockhopper Penguin|bird
Saiga Antelope|mammal
Sawfish|fish
Serval|mammal
Shoebill|bird
Siberian Husky|mammal
Sifaka|mammal
Slow Loris|mammal
Snowy Owl|bird
Spectacled Bear|mammal
Spider Monkey|mammal
Sun Bear|mammal
Tamarin|mammal
Tarsier|mammal
Thorny Devil|reptile
Tiger Shark|fish
Tortoise|reptile
Tree Frog|amphibian
Vicuna|mammal
Viper|reptile
Water Buffalo|mammal
Whale|mammal
Wildebeest|mammal
Wolverine|mammal
Wrasse|fish
Yellowfin Tuna|fish
`.trim().split("\n").map((line) => {
  const [name, group] = line.split("|");
  return { name, group };
});

const palettes = [
  ["#F7C873", "#3A445D", "#FFF3D6"],
  ["#8ED1C6", "#24524A", "#E7FFF9"],
  ["#F08A7A", "#4A2A35", "#FFF0EC"],
  ["#A6C8FF", "#263A63", "#EDF4FF"],
  ["#B7D77A", "#2F4C24", "#F2FFE0"],
  ["#D7A7F2", "#513062", "#FBEEFF"],
  ["#FFB366", "#59361D", "#FFF1DE"],
  ["#9CD6F0", "#1B4B61", "#EAF9FF"],
];

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const esc = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function hash(value) {
  let h = 2166136261;
  for (const char of value) {
    h ^= char.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function animalShape(group, i, fg, ink, light) {
  const spot = i % 5;
  if (group === "bird") {
    return `
      <path d="M86 168c18-52 59-75 108-58 28 10 49 33 56 61-40 21-94 22-164-3Z" fill="${fg}"/>
      <path d="M194 110c26-28 65-24 86 2-20 7-43 14-68 23Z" fill="${light}"/>
      <path d="M247 128l43-15-28 31Z" fill="#F3A53A"/>
      <circle cx="225" cy="121" r="6" fill="${ink}"/>
      <path d="M123 168c19 16 41 23 65 23" stroke="${ink}" stroke-width="8" stroke-linecap="round" opacity=".35"/>
      <path d="M147 183l-14 33M178 188l7 32" stroke="${ink}" stroke-width="7" stroke-linecap="round"/>
      ${spot === 0 ? `<path d="M84 166c-22-25-22-51 0-79 14 29 20 56 0 79Z" fill="${light}"/>` : ""}
    `;
  }
  if (group === "fish") {
    return `
      <path d="M78 162c43-63 123-68 183 0-60 68-140 63-183 0Z" fill="${fg}"/>
      <path d="M76 162l-42-43c-5 28-4 57 0 86Z" fill="${light}"/>
      <path d="M151 111c16-22 39-32 66-30-11 18-24 35-39 49Z" fill="${light}"/>
      <path d="M151 213c16 22 39 32 66 30-11-18-24-35-39-49Z" fill="${light}"/>
      <circle cx="231" cy="151" r="7" fill="${ink}"/>
      <path d="M134 142c19 12 19 28 0 40M174 131c22 18 22 43 0 62" stroke="${ink}" stroke-width="7" stroke-linecap="round" opacity=".28"/>
    `;
  }
  if (group === "reptile" || group === "amphibian") {
    return `
      <path d="M73 174c29-47 83-70 159-50 35 9 56 26 64 51-27 31-84 38-164 20-25-6-45-13-59-21Z" fill="${fg}"/>
      <path d="M70 174c-17 13-35 17-54 12 17-14 35-23 55-27Z" fill="${light}"/>
      <circle cx="250" cy="143" r="8" fill="${ink}"/>
      <path d="M111 190l-17 31M152 199l8 33M214 192l25 25" stroke="${ink}" stroke-width="8" stroke-linecap="round"/>
      <path d="M111 139c28-13 69-14 123 4" stroke="${light}" stroke-width="14" stroke-linecap="round" opacity=".8"/>
      ${group === "amphibian" ? `<circle cx="229" cy="134" r="16" fill="${light}"/><circle cx="254" cy="135" r="16" fill="${light}"/>` : ""}
    `;
  }
  if (group === "insect" || group === "arachnid") {
    const legs = group === "arachnid" ? 4 : 3;
    return `
      <ellipse cx="162" cy="162" rx="48" ry="61" fill="${fg}"/>
      <circle cx="229" cy="154" r="34" fill="${light}"/>
      <circle cx="247" cy="143" r="5" fill="${ink}"/>
      ${Array.from({ length: legs }, (_, n) => {
        const y = 126 + n * 24;
        return `<path d="M154 ${y}c-42-22-72-20-94 7M169 ${y + 6}c42-22 72-20 94 7" stroke="${ink}" stroke-width="8" stroke-linecap="round" opacity=".68"/>`;
      }).join("")}
      ${group === "insect" ? `<path d="M129 117c-28-44-3-73 36-50 30 18 41 52 17 78Z" fill="${light}" opacity=".78"/><path d="M182 118c28-44 3-73-36-50-30 18-41 52-17 78Z" fill="${light}" opacity=".58"/>` : ""}
      <path d="M162 108v108" stroke="${ink}" stroke-width="6" opacity=".3"/>
    `;
  }
  if (group === "crustacean" || group === "mollusk" || group === "echinoderm" || group === "cnidarian") {
    if (group === "cnidarian") {
      return `
        <path d="M98 151c8-58 116-58 124 0 2 14-17 31-62 31s-64-17-62-31Z" fill="${fg}"/>
        <path d="M109 174c7 22 5 42-6 61M143 181c-13 25-14 48-3 68M176 181c13 25 14 48 3 68M211 174c-7 22-5 42 6 61" stroke="${ink}" stroke-width="8" stroke-linecap="round" opacity=".7"/>
        <circle cx="143" cy="145" r="6" fill="${ink}"/><circle cx="177" cy="145" r="6" fill="${ink}"/>
      `;
    }
    if (group === "echinoderm") {
      return `
        <path d="M160 68l26 65 70-6-54 45 27 65-69-37-69 37 27-65-54-45 70 6Z" fill="${fg}"/>
        <circle cx="160" cy="162" r="38" fill="${light}" opacity=".72"/>
        <circle cx="145" cy="154" r="5" fill="${ink}"/><circle cx="175" cy="154" r="5" fill="${ink}"/>
      `;
    }
    return `
      <ellipse cx="158" cy="164" rx="72" ry="47" fill="${fg}"/>
      <path d="M92 158c-25-22-37-45-34-69 23 8 44 29 63 62M224 158c25-22 37-45 34-69-23 8-44 29-63 62" fill="${light}"/>
      <circle cx="134" cy="144" r="6" fill="${ink}"/><circle cx="184" cy="144" r="6" fill="${ink}"/>
      <path d="M101 190l-33 29M132 204l-16 36M185 204l16 36M216 190l33 29" stroke="${ink}" stroke-width="8" stroke-linecap="round" opacity=".7"/>
    `;
  }
  return `
    <ellipse cx="159" cy="167" rx="83" ry="57" fill="${fg}"/>
    <circle cx="228" cy="132" r="43" fill="${fg}"/>
    <path d="M196 100l-15-36 39 19M252 100l25-30 7 43" fill="${fg}"/>
    <ellipse cx="245" cy="139" rx="17" ry="13" fill="${light}"/>
    <circle cx="216" cy="122" r="6" fill="${ink}"/>
    <circle cx="251" cy="120" r="6" fill="${ink}"/>
    <path d="M91 176c-35-22-48-51-39-87 30 25 50 52 59 83" fill="${fg}"/>
    <path d="M108 212l-15 37M162 221l-3 41M216 208l18 36" stroke="${ink}" stroke-width="10" stroke-linecap="round"/>
    ${spot === 1 ? `<path d="M112 150c27-24 70-27 111-8" stroke="${light}" stroke-width="16" stroke-linecap="round" opacity=".74"/>` : ""}
    ${spot === 2 ? `<circle cx="128" cy="153" r="14" fill="${light}" opacity=".7"/><circle cx="177" cy="187" r="18" fill="${light}" opacity=".7"/>` : ""}
  `;
}

function svgFor(animal, index) {
  const [fg, ink, light] = palettes[hash(animal.name) % palettes.length];
  const title = esc(animal.name);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">A stylized ${esc(animal.group)} illustration for ${title}, without background or label text.</desc>
  <g>${animalShape(animal.group, index, fg, ink, light)}</g>
</svg>
`;
}

await mkdir(outputDir, { recursive: true });

const existingFiles = await readdir(outputDir);
await Promise.all(existingFiles
  .filter((filename) => /^\d{3}-[a-z0-9-]+\.(svg|webp)$/.test(filename))
  .map((filename) => rm(path.join(outputDir, filename))));

const entries = animals.map((animal, index) => {
  const slug = slugify(animal.name);
  const basename = `${String(index + 1).padStart(3, "0")}-${slug}`;
  const filename = `${basename}.svg`;
  return { ...animal, filename, path: `/animal/${filename}` };
});

await Promise.all(entries.map((entry, index) => writeFile(
  path.join(outputDir, entry.filename),
  svgFor(entry, index),
)));

await writeFile(path.join(outputDir, "index.json"), `${JSON.stringify({
  count: entries.length,
  format: "svg",
  generatedBy: "scripts/generate-animal-assets.mjs",
  animals: entries,
}, null, 2)}\n`);

const grouped = entries.reduce((acc, entry) => {
  acc[entry.group] ??= [];
  acc[entry.group].push(entry);
  return acc;
}, {});

const svgBytes = (await Promise.all(entries.map((entry) => stat(path.join(outputDir, entry.filename)))))
  .reduce((total, file) => total + file.size, 0);

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

const readme = `# 動物画像

\`public/animal\` に配置した動物画像セットです。SVG 形式で ${entries.length} 種類あります。

## 形式

このセットでは SVG を採用しています。現在の SVG 合計サイズは約 ${formatBytes(svgBytes)} です。各画像は背景なし、表示文字なしのイラストのみです。

## ファイル

- 画像: \`001-aardvark.svg\` のような連番付き kebab-case ファイル
- 一覧データ: \`index.json\`
- パス例: \`/animal/001-aardvark.svg\`

## 種類別の数

${Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([group, items]) => `- ${group}: ${items.length}`).join("\n")}

## 動物一覧

動物名はファイル名と対応する英名で記載しています。

${entries.map((entry) => `- ${entry.name} - \`${entry.filename}\``).join("\n")}
`;

await writeFile(path.join(outputDir, "README.md"), readme);

console.log(`Generated ${entries.length} animal SVG files in ${outputDir}`);
