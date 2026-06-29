export type EmrLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  comingSoon?: boolean;
  detail: string;
};

export const emrLogos: EmrLogo[] = [
  {
    name: "ModMed",
    src: "/logos/modmed.png",
    width: 200,
    height: 60,
    detail:
      "Send finished quote PDFs straight to the patient's ModMed chart. No downloading and re-uploading. It's one click from quote to chart.",
  },
  {
    name: "DrChrono",
    src: "/logos/drchrono.png",
    width: 200,
    height: 70,
    detail:
      "Push quotes directly into DrChrono patient records. Every estimate stays attached to the chart where your team already works.",
  },
  {
    name: "GoHighLevel",
    src: "/logos/ghl.png",
    width: 1853,
    height: 420,
    detail:
      "Attach quote PDFs to GoHighLevel contacts automatically. Trigger follow-up workflows the moment a quote is sent.",
  },
  {
    name: "Nextech",
    src: "/logos/nextech.svg",
    width: 167,
    height: 28,
    detail:
      "Send finished quote PDFs straight to the patient's Nextech chart. No downloading and re-uploading. It's one click from quote to chart.",
  },
];
