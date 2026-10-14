import kalamkari from "@/assets/kalamkari.jpg";
import kondapalli from "@/assets/kondapalli.jpg";
import pochampally from "@/assets/pochampally.jpg";
import bluePottery from "@/assets/blue-pottery.jpg";
import madhubani from "@/assets/madhubani.jpg";
import channapatna from "@/assets/channapatna.jpg";
import banarasi from "@/assets/banarasi.jpg";

export interface Product {
  id: string;
  name: string;
  state: string;
  category: string;
  description: string;
  significance: string;
  materials: string[];
  method: string;
  image: string;
  price: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "kalamkari-textiles",
    name: "Kalamkari Hand-Painted Textiles",
    state: "Andhra Pradesh",
    category: "Textiles",
    description:
      "Hand-drawn and hand-painted cotton fabric featuring mythological scenes, florals and peacocks rendered with a bamboo 'kalam' pen.",
    significance:
      "Kalamkari is a 3,000-year-old art form from Srikalahasti and Machilipatnam, traditionally used to narrate epics like the Ramayana and Mahabharata on temple hangings.",
    materials: ["Cotton fabric", "Natural dyes (indigo, madder, myrobalan)", "Bamboo kalam pen", "Jaggery & iron mordants"],
    method:
      "Artisans sketch freehand with a bamboo pen, then dye the cloth in successive baths of natural dyes, washing it in running river water between each stage — a process that can take weeks.",
    image: kalamkari,
    price: "₹2,400 – ₹18,000",
  },
  {
    id: "kondapalli-toys",
    name: "Kondapalli Wooden Toys",
    state: "Andhra Pradesh",
    category: "Toys & Decor",
    description:
      "Lightweight, brightly painted wooden figurines depicting village life, dancers, animals and mythological characters.",
    significance:
      "Crafted for over 400 years by the Aryakhshatriya artisan community of Kondapalli village, these toys hold a Geographical Indication (GI) tag and are central to festive Bommala Koluvu displays.",
    materials: ["Tella Poniki (soft white wood)", "Sawdust & tamarind-seed paste", "Vegetable and enamel paints"],
    method:
      "Each part is carved separately from soft poniki wood, joined with a paste of sawdust and tamarind seed, then smoothed, primed and hand-painted in vivid colours.",
    image: kondapalli,
    price: "₹350 – ₹4,500",
  },
  {
    id: "pochampally-ikat",
    name: "Pochampally Ikat Weave",
    state: "Telangana",
    category: "Textiles",
    description:
      "Silk and cotton sarees with mesmerising geometric patterns created by resist-dyeing the threads before weaving.",
    significance:
      "Pochampally Ikat is GI-tagged and woven in the village of Pochampally, a UNESCO-recognised craft cluster. The blurred 'chowka' diamond motifs are a signature of Telangana's loom heritage.",
    materials: ["Mulberry silk or cotton yarn", "Natural & azo-free dyes", "Pit loom"],
    method:
      "Warp and weft threads are tied and dyed in precise sequences before weaving, so the pattern emerges only when the pre-dyed threads align on the loom — a feat of memory and mathematics.",
    image: pochampally,
    price: "₹3,500 – ₹45,000",
  },
  {
    id: "jaipur-blue-pottery",
    name: "Jaipur Blue Pottery",
    state: "Rajasthan",
    category: "Pottery & Ceramics",
    description:
      "Cobalt-blue and turquoise glazed vases, plates and tiles with delicate floral and animal motifs.",
    significance:
      "Brought to Jaipur via Persia and Central Asia, blue pottery is one of the few pottery traditions that uses no clay — its quartz-based body is unique to Jaipur and GI-protected.",
    materials: ["Quartz stone powder", "Glass & multani mitti", "Cobalt oxide pigments", "Glaze of powdered glass"],
    method:
      "A dough of quartz, glass and fuller's earth is moulded, sun-dried, hand-painted with cobalt oxide, dipped in glaze and fired once at low temperature in a wood kiln.",
    image: bluePottery,
    price: "₹500 – ₹12,000",
  },
  {
    id: "madhubani-painting",
    name: "Madhubani Folk Painting",
    state: "Bihar",
    category: "Art & Paintings",
    description:
      "Vibrant folk paintings of deities, nature and the 'tree of life', filled edge-to-edge with intricate line work.",
    significance:
      "Practised by women of the Mithila region for centuries on mud walls during weddings and festivals, Madhubani (Mithila) art is now a GI-tagged art form celebrated worldwide.",
    materials: ["Handmade paper or cloth", "Natural pigments (turmeric, indigo, lampblack)", "Twigs, nibs & brushes"],
    method:
      "Artists outline forms with twigs or nibs and fill every space with fine hatching and double-line borders — traditionally no space is left empty, symbolising abundance.",
    image: madhubani,
    price: "₹800 – ₹25,000",
  },
  {
    id: "channapatna-toys",
    name: "Channapatna Lacquer Toys",
    state: "Karnataka",
    category: "Toys & Decor",
    description:
      "Glossy, child-safe wooden toys — stacking rings, tops and pull-along animals — turned on lathes and finished with natural lac.",
    significance:
      "A 200-year-old GI-tagged craft from the 'toy town' of Channapatna, patronised by Tipu Sultan, renowned for its non-toxic vegetable-dye lacquer finish.",
    materials: ["Ivory wood (hale mara)", "Natural lac", "Vegetable dyes", "Screw-pine leaf polish"],
    method:
      "Seasoned ivory wood is turned on a lathe, then coloured lac sticks are pressed against the spinning wood; friction melts the lac into a glossy, seamless coating.",
    image: channapatna,
    price: "₹250 – ₹3,000",
  },
  {
    id: "banarasi-silk-saree",
    name: "Banarasi Silk Saree",
    state: "Uttar Pradesh",
    category: "Textiles",
    description:
      "Opulent silk sarees woven with real gold and silver zari brocade, featuring Mughal-inspired floral and paisley jaal patterns.",
    significance:
      "Woven in Varanasi since Mughal times, the GI-tagged Banarasi saree is the centrepiece of Indian bridal trousseaus and can take weavers weeks to months to complete.",
    materials: ["Pure mulberry silk", "Gold & silver zari thread", "Jacquard punch cards"],
    method:
      "Two weavers work a pit loom together, following naksha-patta punch-card designs; the zari motifs are woven as supplementary weft, creating raised brocade patterns.",
    image: banarasi,
    price: "₹8,000 – ₹2,50,000",
  },
];

export const STATES = [...new Set(PRODUCTS.map((p) => p.state))];
export const CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))];
