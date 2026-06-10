export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'Precision Dental Consumables' | 'Laboratory Reagents' | 'Surgical & Clinical';
  description: string;
  longDescription: string;
  origin: string;
  packSize: string;
  certifications: string[];
  keySpec: string;
  image: string;
}

export const CATEGORIES = [
  'Precision Dental Consumables',
  'Laboratory Reagents',
  'Surgical & Clinical'
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'dent-01',
    sku: 'NXT-DEN-882-FG',
    name: 'Diamond Burs',
    category: 'Precision Dental Consumables',
    description: 'Premium electroplated natural diamond grit for high speed clinical friction grip preparation.',
    longDescription: 'Engineered in Germany, these FG diamond burs utilize selected natural diamond crystals bonded via state-of-the-art galvanic electroplating. This ensures maximum cutting efficiency, zero structural vibrations, and superior durability under high rotational speeds.',
    origin: 'Germany',
    packSize: '5 burs per blister pack',
    certifications: ['CE 0123', 'FDA Cleared', 'ISO 13485'],
    keySpec: '135°C Autoclavable, Multi-grit Selection',
    image: '/diamond-bur-sphere.png'
  },
  {
    id: 'dent-02',
    sku: 'NXT-DEN-455-ZC',
    name: 'Tungsten Carbide Burs',
    category: 'Precision Dental Consumables',
    description: 'High-performance precision-cut tungsten carbide operative burs for efficient cavity preparation and crown sectioning.',
    longDescription: 'Manufactured from a single piece of premium-grade tungsten carbide to ensure concentricity and eliminate breakage. The advanced blade geometry provides exceptionally smooth cutting, minimal chatter, and superior debris clearance during high-speed operative procedures.',
    origin: 'Switzerland',
    packSize: '5 burs per pack',
    certifications: ['CE Certified', 'ISO 13485', 'FDA Cleared'],
    keySpec: 'One-piece construction, Anti-vibration blade geometry',
    image: '/tungsten-carbite-bur.png'
  },
  {
    id: 'dent-03',
    sku: 'NXT-DEN-901-KF',
    name: 'Laboratory & CAD/CAM Rotary Instruments',
    category: 'Precision Dental Consumables',
    description: 'High-precision rotary instruments and milling burs optimized for dental laboratories and CAD/CAM milling machines.',
    longDescription: 'Designed for extreme accuracy and extended tool life in digital dentistry workflows. These CAD/CAM milling burs feature specialized diamond and carbide coatings to ensure flawless margins and smooth surface finishes on zirconia, lithium disilicate, and PMMA dental restorations.',
    origin: 'Germany',
    packSize: '3 burs per autoclavable cassette',
    certifications: ['ISO 13485', 'CE 0123', 'FDA Cleared'],
    keySpec: 'Optimized for CAD/CAM milling systems, Extended tool life',
    image: '/CADCAM-milling-bur.jpg'
  },
  {
    id: 'reag-01',
    sku: 'NXT-DEN-122-SS',
    name: 'Steel Burs',
    category: 'Precision Dental Consumables',
    description: 'High-quality stainless steel rotary burs for rapid dentin removal and general excavation.',
    longDescription: 'Manufactured from high-grade hardened surgical steel to deliver reliable, aggressive cutting efficiency and longevity. Ideal for safe dentin removal, pediatric dentistry, and gross reduction under low speed operations.',
    origin: 'Germany',
    packSize: '10 burs per pack',
    certifications: ['CE Certified', 'ISO 13485', 'FDA Cleared'],
    keySpec: 'Durable surgical steel, optimal for low-speed handpieces',
    image: '/Steel-bur.png'
  },
  {
    id: 'reag-02',
    sku: 'NXT-DEN-605-AP',
    name: 'Abrasives & Polishers',
    category: 'Precision Dental Consumables',
    description: 'High-quality dental polishers and abrasives for composite, ceramic, and amalgam restorations.',
    longDescription: 'A comprehensive system of finishing and polishing instruments engineered for sequential use. Achieves a brilliant, high-gloss enamel-like finish on composites and ceramics without compromising the surface structure or causing micro-fractures.',
    origin: 'Germany',
    packSize: '12 polishers per assortment',
    certifications: ['CE Certified', 'ISO 13485', 'FDA Cleared'],
    keySpec: 'Diamond-impregnated silicone, Autoclavable',
    image: '/abrasives-and-polishers.png'
  },
  {
    id: 'reag-03',
    sku: 'NXT-DEN-931-PE',
    name: 'Pulp Extractor',
    category: 'Precision Dental Consumables',
    description: 'Precision barbed broaches for effective and safe intact pulp extirpation.',
    longDescription: 'High-quality stainless steel barbed broaches designed for the fast and complete removal of pulpal tissue from root canals. The spirally arranged barbs engage the pulp tissue securely, ensuring an intact extraction and minimizing the risk of canal blockage.',
    origin: 'Switzerland',
    packSize: '10 broaches per pack',
    certifications: ['CE Certified', 'ISO 13485', 'FDA Cleared'],
    keySpec: 'Stainless steel, color-coded handles',
    image: '/pulp-extractor.jpg'
  },
  {
    id: 'surg-03',
    sku: 'NXT-SUR-458-OP',
    name: 'Operative Instruments',
    category: 'Surgical & Clinical',
    description: 'High-quality dental operative instruments used in restorative dentistry to rebuild, repair, or restore tooth structures.',
    longDescription: 'Premium grade operative instruments engineered from surgical stainless steel. These instruments provide exceptional tactile sensitivity and precision for all restorative procedures. The comprehensive set includes excavators, pluggers, burnishers, and carvers designed for optimal material placement, shaping, and finishing of direct restorations.',
    origin: 'Germany',
    packSize: '10 instruments per set',
    certifications: ['CE 0123', 'FDA 510(k)', 'ISO 13485'],
    keySpec: 'Autoclavable stainless steel, Ergonomic handle design',
    image: '/operative-instruments.jpg'
  }
];
