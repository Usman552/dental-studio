import { images, type Photo } from "./images";

/**
 * Clinic details. These are sample values for this concept site —
 * replace them with the clinic's real information before launch.
 */
export const clinic = {
  name: "Lumière Dental Studio",
  shortName: "Lumière",
  tagline: "A New Perspective on Your Smile.",
  phone: "+1 (555) 014-2200",
  phoneHref: "tel:+15550142200",
  email: "studio@lumieredental.example",
  address: ["18 Atelier Lane, Suite 2", "City Centre"],
  mapHref: "#visit",
  hours: [
    { days: "Monday – Thursday", time: "08:30 – 19:00" },
    { days: "Friday", time: "08:30 – 17:00" },
    { days: "Saturday", time: "09:00 – 14:00" },
    { days: "Sunday", time: "Closed" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
  ],
} as const;

export const navigation = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Treatments", href: "#treatments" },
  { label: "Results", href: "#transformation" },
  { label: "Dentist", href: "#dentist" },
  { label: "Your Visit", href: "#visit" },
  { label: "Journal", href: "#journal" },
] as const;

export type TreatmentLayout = "wide" | "tall" | "offset" | "portrait" | "split";

export type Treatment = {
  slug: string;
  name: string;
  /** Split for the display headline: [roman, italic] */
  title: [string, string];
  kicker: string;
  summary: string;
  details: string[];
  suitedTo: string[];
  steps: { title: string; text: string }[];
  image: Photo;
  layout: TreatmentLayout;
};

export const treatments: Treatment[] = [
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    title: ["Cosmetic", "Dentistry"],
    kicker: "Refinement",
    summary:
      "Considered adjustments to shape, shade and symmetry, so your smile looks like you, only more at ease.",
    details: [
      "Cosmetic dentistry brings together several techniques, from bonding and contouring to crowns and veneers, to improve how teeth look while respecting how they function.",
      "Every plan starts with your face, not a catalogue. We consider lip line, proportion and skin tone so that changes feel natural in conversation, in photographs and up close.",
    ],
    suitedTo: ["Chipped or worn edges", "Small gaps", "Uneven shape or length", "Old restorations you'd like to refresh"],
    steps: [
      { title: "Consultation", text: "A conversation about what you notice and what you'd like to change." },
      { title: "Design", text: "Photographs and records help us map proportions before any treatment." },
      { title: "Refine", text: "Treatment is carried out in stages, with time to review each step together." },
    ],
    image: images.treatments.cosmetic,
    layout: "wide",
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    title: ["Teeth", "Whitening"],
    kicker: "Luminosity",
    summary:
      "Professionally supervised whitening that lifts the shade of natural teeth gently, guided by what suits your complexion.",
    details: [
      "Professional whitening uses carefully controlled products to lighten the natural shade of teeth. Because it's supervised, the strength and timing can be adjusted to your sensitivity.",
      "We aim for brightness that looks healthy rather than artificial. Results vary from person to person and depend on your starting shade and daily habits.",
    ],
    suitedTo: ["Gradual yellowing", "Staining from coffee, tea or wine", "Brightening before an occasion"],
    steps: [
      { title: "Assessment", text: "A check of gum health and existing restorations, which do not whiten." },
      { title: "Shade mapping", text: "We record your current shade and agree a natural target." },
      { title: "Whitening", text: "In-studio, at-home with custom trays, or a combination of both." },
    ],
    image: images.treatments.whitening,
    layout: "tall",
  },
  {
    slug: "porcelain-veneers",
    name: "Porcelain Veneers",
    title: ["Porcelain", "Veneers"],
    kicker: "Craft",
    summary:
      "Fine, handcrafted porcelain layers that can refine colour, shape and alignment, designed tooth by tooth.",
    details: [
      "Veneers are thin shells of porcelain bonded to the front of teeth. They can change shade, shape and the appearance of alignment in a single, carefully planned treatment.",
      "Most veneers require some preparation of the natural tooth, so we'll discuss conservative options and whether veneers are the right choice for you.",
    ],
    suitedTo: ["Discolouration that doesn't respond to whitening", "Worn or irregular teeth", "Restoring a balanced smile line"],
    steps: [
      { title: "Smile design", text: "Digital planning and, where helpful, a trial smile you can preview." },
      { title: "Preparation", text: "Teeth are prepared conservatively and impressions or scans are taken." },
      { title: "Placement", text: "Your veneers are checked, adjusted and bonded with precision." },
    ],
    image: images.treatments.veneers,
    layout: "offset",
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    title: ["Dental", "Implants"],
    kicker: "Foundation",
    summary:
      "A considered way to replace missing teeth, combining a discreet implant with a crown matched to your smile.",
    details: [
      "A dental implant is a small titanium post placed in the jawbone, which supports a crown, bridge or denture. Implants are planned around the health of your gums and bone.",
      "Treatment usually takes place over several months to allow healing. We'll talk through every stage, the alternatives, and what aftercare involves.",
    ],
    suitedTo: ["Replacing a single missing tooth", "Supporting a bridge", "Stabilising a denture"],
    steps: [
      { title: "Planning", text: "A thorough examination with imaging to assess suitability." },
      { title: "Placement", text: "The implant is placed and given time to integrate with the bone." },
      { title: "Restoration", text: "A crown is custom-made to match neighbouring teeth." },
    ],
    image: images.treatments.implants,
    layout: "portrait",
  },
  {
    slug: "clear-aligners",
    name: "Invisalign & Clear Aligners",
    title: ["Clear", "Aligners"],
    kicker: "Alignment",
    summary:
      "Discreet, removable aligners that move teeth gradually, planned digitally and reviewed in person.",
    details: [
      "Clear aligners are a series of removable trays that gently move teeth over time. They're nearly invisible and can be taken out to eat, drink and clean.",
      "Your treatment is planned digitally, so you can see the proposed movement before you begin. Wearing aligners as directed is key to progress.",
    ],
    suitedTo: ["Crowding", "Spacing", "Mild to moderate bite concerns", "Relapse after previous braces"],
    steps: [
      { title: "Scan", text: "A digital scan replaces traditional impressions." },
      { title: "Preview", text: "We review the planned tooth movement together." },
      { title: "Progress", text: "Regular check-ins keep treatment on track." },
    ],
    image: images.treatments.aligners,
    layout: "split",
  },
  {
    slug: "preventive-dentistry",
    name: "Preventive Dentistry",
    title: ["Preventive", "Care"],
    kicker: "Ritual",
    summary:
      "Unhurried check-ups and hygiene visits that keep your smile healthy, the quiet foundation of everything we do.",
    details: [
      "Prevention is the most valuable dentistry there is. Regular examinations and professional cleaning help identify concerns early, when they're simplest to manage.",
      "Our hygiene appointments are paced for comfort, with practical, judgement-free guidance for your daily routine at home.",
    ],
    suitedTo: ["Routine examinations", "Professional cleaning", "Gum health", "Personalised home-care advice"],
    steps: [
      { title: "Examine", text: "A full check of teeth, gums and soft tissues." },
      { title: "Clean", text: "Gentle removal of plaque and tartar with a polish to finish." },
      { title: "Advise", text: "Simple, tailored guidance for the months ahead." },
    ],
    image: images.treatments.preventive,
    layout: "wide",
  },
  {
    slug: "smile-makeovers",
    name: "Smile Makeovers",
    title: ["Smile", "Makeovers"],
    kicker: "Composition",
    summary:
      "A complete, staged plan that combines treatments to balance health, function and beauty.",
    details: [
      "A smile makeover brings several treatments together, such as aligners, whitening, bonding or veneers, sequenced into one cohesive plan.",
      "We'll design your makeover in stages, so you understand each step, its timing and its cost before deciding how to proceed.",
    ],
    suitedTo: ["Multiple aesthetic concerns", "Combining alignment and restoration", "A long-considered change"],
    steps: [
      { title: "Discover", text: "An in-depth consultation with photographs and digital records." },
      { title: "Compose", text: "A personalised plan, sequenced and clearly costed." },
      { title: "Reveal", text: "Treatment unfolds in stages, reviewed together throughout." },
    ],
    image: images.treatments.makeover,
    layout: "tall",
  },
];

export const visitSteps = [
  {
    title: "Arrival",
    text: "A calm, softly lit reception. No clipboards: your details are prepared before you arrive.",
    image: images.visit.reception,
  },
  {
    title: "The Lounge",
    text: "Unhurried moments in a quiet lounge, with time to settle before your appointment begins.",
    image: images.visit.lounge,
  },
  {
    title: "Conversation",
    text: "Every visit starts with listening. We explain what we see and what your options are, in plain language.",
    image: images.visit.consultation,
  },
  {
    title: "Treatment",
    text: "Bright, contemporary rooms with modern equipment, and a pace that respects your comfort.",
    image: images.visit.room,
  },
  {
    title: "The Reveal",
    text: "Time to see your smile, ask questions and leave with clear aftercare guidance.",
    image: images.visit.reveal,
  },
];

/**
 * DEMONSTRATION TESTIMONIALS
 * These are illustrative sample quotes written for this concept site.
 * They are not real patient reviews and must be replaced with genuine,
 * consented feedback before launch.
 */
export const stories = [
  {
    quote:
      "I came in expecting to be told everything that was wrong. Instead, we talked about what I wanted, and the plan felt like mine.",
    name: "Sample patient A.",
    treatment: "Porcelain Veneers",
  },
  {
    quote:
      "The calm of the studio is the first thing you notice. The second is how carefully everything is explained before anything begins.",
    name: "Sample patient M.",
    treatment: "Preventive Care",
  },
  {
    quote:
      "I'd put off aligners for years. Seeing the digital plan before starting made the decision feel simple.",
    name: "Sample patient J.",
    treatment: "Clear Aligners",
  },
  {
    quote:
      "Subtle was the brief, and subtle is what I got. People say I look well; nobody asks what I've had done.",
    name: "Sample patient R.",
    treatment: "Teeth Whitening",
  },
];

export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: Photo;
  body: string[];
};

/** General educational content. Not a substitute for personal professional advice. */
export const articles: Article[] = [
  {
    slug: "first-consultation",
    category: "The Studio",
    title: "What really happens at a first consultation",
    excerpt:
      "No pressure, no surprises: a guide to the conversation that shapes every treatment plan.",
    readTime: "4 min read",
    image: images.journal.consultation,
    body: [
      "A first consultation is, above all, a conversation. It's an opportunity to talk about what you notice in your smile, what has been bothering you, and what you'd like to feel when you leave.",
      "Your dentist will usually carry out a full examination of the teeth, gums and soft tissues. Depending on your concerns, photographs, a digital scan or X-rays may be recommended to see what can't be seen by eye.",
      "From there, you should expect a clear explanation of your options, including the option to do nothing, along with the benefits, limitations, timings and costs of each.",
      "A good consultation never rushes a decision. Take the plan home, ask questions, and come back when you're ready.",
    ],
  },
  {
    slug: "choosing-your-shade",
    category: "Aesthetics",
    title: "Choosing a shade that looks natural, not new",
    excerpt: "Why the whitest result is rarely the most beautiful one.",
    readTime: "3 min read",
    image: images.journal.shade,
    body: [
      "Natural teeth are not a single flat colour. They're slightly warmer near the gum and more translucent towards the edge, and that variation is part of what makes a smile look real.",
      "When planning whitening or restorations, a shade guide helps compare tones in daylight-balanced conditions. Your skin tone, the whites of your eyes and even your usual lip colour all influence what looks harmonious.",
      "A useful rule of thumb: aim for teeth that look healthy in conversation, not luminous in a photograph's flash.",
    ],
  },
  {
    slug: "digital-dentistry",
    category: "Technology",
    title: "Digital scans, explained in plain language",
    excerpt: "How 3D imaging is replacing impression trays, and what it means for planning.",
    readTime: "5 min read",
    image: images.journal.digital,
    body: [
      "An intraoral scanner is a small wand that captures thousands of images of your teeth to create an accurate 3D model, usually in a few minutes.",
      "For many people, the biggest benefit is comfort: no impression trays. For planning, a digital model makes it easier to preview aligner movement or the proportions of new restorations.",
      "Scans are one tool among many. They're most valuable when combined with a careful examination and an honest conversation about your goals.",
    ],
  },
  {
    slug: "daily-ritual",
    category: "Care",
    title: "The two-minute ritual: small habits, lasting health",
    excerpt: "Simple, evidence-informed habits for a healthier mouth at home.",
    readTime: "3 min read",
    image: images.journal.ritual,
    body: [
      "Brushing twice a day for two minutes with a fluoride toothpaste remains the foundation of good oral health. Technique matters more than force: gentle, small circles along the gumline.",
      "Clean between your teeth daily with floss or interdental brushes; your hygienist can recommend the right size for you.",
      "Spit, don't rinse, after brushing so fluoride can stay on the teeth for longer. And keep regular check-ups, even when nothing hurts.",
    ],
  },
  {
    slug: "understanding-implants",
    category: "Restorative",
    title: "Understanding implants before you decide",
    excerpt: "The questions worth asking, and what the journey usually involves.",
    readTime: "6 min read",
    image: images.journal.implants,
    body: [
      "Dental implants are one of several ways to replace a missing tooth. Alternatives include bridges and removable dentures, and each has different considerations.",
      "Implant treatment typically involves an assessment of bone and gum health, placement of the implant, a healing period, and finally the fitting of a custom crown.",
      "Useful questions to ask include: what are my alternatives, how long will treatment take, what does aftercare involve, and what happens if something needs attention later on?",
    ],
  },
];
