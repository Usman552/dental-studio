/**
 * Every photograph on the site, in one place.
 * All images are from Unsplash (https://unsplash.com/license) and each is used once.
 * To customise for a clinic, replace `src` with your own photography and update `alt`.
 */

export type Photo = { src: string; alt: string };

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const images = {
  hero: {
    desktop: {
      src: unsplash("1489278353717-f64c6ee8a4d2"),
      alt: "Close-up of a woman laughing, her natural smile framed by loose dark curls in warm light",
    },
    mobile: {
      src: unsplash("1654373535457-383a0a4d00f9"),
      alt: "Close-up of a natural, healthy smile with soft rose lips",
    },
  },
  intro: {
    portrait: {
      src: unsplash("1567516364473-233c4b6fcfbe"),
      alt: "A woman glancing downward with a quiet, relaxed smile",
    },
    detail: {
      src: unsplash("1606811856475-5e6fcdc6e509"),
      alt: "A dental mirror and explorer resting on a pale surface",
    },
  },
  treatments: {
    cosmetic: {
      src: unsplash("1650803075918-efbee311735d"),
      alt: "A smiling patient relaxing in a treatment chair during a cosmetic dental appointment",
    },
    whitening: {
      src: unsplash("1677026010083-78ec7f1b84ed"),
      alt: "Profile close-up of a smile with naturally bright teeth against a white background",
    },
    veneers: {
      src: unsplash("1675526607070-f5cbd71dde92"),
      alt: "A woman smiling broadly against a deep teal background",
    },
    implants: {
      src: unsplash("1771442873035-474765b40ac6"),
      alt: "A gloved hand holding a dental implant post with a ceramic crown",
    },
    aligners: {
      src: unsplash("1777793636393-a0fec488f3fb"),
      alt: "A woman fitting a clear aligner over her teeth",
    },
    preventive: {
      src: unsplash("1777446523856-e7acffa844a7"),
      alt: "Bamboo toothbrushes in a glass jar beside eucalyptus leaves",
    },
    makeover: {
      src: unsplash("1617812191081-2a24e3f30e45"),
      alt: "A woman with curly hair laughing openly in natural light",
    },
  },
  transformation: {
    before: {
      src: unsplash("1663182245833-7dd667277043"),
      alt: "Illustrative example: close-up of a smile with uneven tooth shade",
    },
    after: {
      src: unsplash("1663182234283-28941e7612da"),
      alt: "Illustrative example: close-up of a different smile with an even, natural shade",
    },
  },
  dentist: {
    portrait: {
      src: unsplash("1706565029539-d09af5896340"),
      alt: "Portrait of a dentist in a white jacket against a dark studio background",
    },
    detail: {
      src: unsplash("1777445826358-f95518f49b44"),
      alt: "A dentist’s hands explaining a treatment using a dental model",
    },
  },
  visit: {
    reception: {
      src: unsplash("1505410603994-c3ac6269711f"),
      alt: "A calm reception with warm timber walls, linear lighting and a stone floor",
    },
    lounge: {
      src: unsplash("1731514709874-30eead90613b"),
      alt: "A quiet lounge with arched alcoves and cane-backed timber chairs",
    },
    consultation: {
      src: unsplash("1777331903190-341a3dd0441b"),
      alt: "A dentist in conversation with a relaxed patient in a bright, modern treatment room",
    },
    room: {
      src: unsplash("1704455306251-b4634215d98f"),
      alt: "A clean, contemporary treatment room with a modern dental chair",
    },
    reveal: {
      src: unsplash("1785860817740-c95735ba03b1"),
      alt: "A patient in a treatment chair smiling at her reflection in a hand mirror",
    },
  },
  journal: {
    consultation: {
      src: unsplash("1771442873038-dda05b6ca447"),
      alt: "A gloved hand holding a set of dental examination instruments",
    },
    shade: {
      src: unsplash("1664529845836-433c172142ca"),
      alt: "A shade guide held beside natural teeth to compare tone",
    },
    digital: {
      src: unsplash("1600170311833-c2cf5280ce49"),
      alt: "A gloved hand pointing at a digital dental scan on a tablet",
    },
    ritual: {
      src: unsplash("1772911141531-f290e6a512c3"),
      alt: "A single white toothbrush resting on a soft grey surface",
    },
    implants: {
      src: unsplash("1777444270707-850bfe730c10"),
      alt: "A dental model showing an implant beside natural teeth",
    },
  },
  appointment: {
    portrait: {
      src: unsplash("1662850886700-4ec19bd30d11"),
      alt: "A smiling woman with curly hair leaning on a timber table",
    },
  },
} satisfies Record<string, Record<string, Photo | Record<string, Photo>>>;
