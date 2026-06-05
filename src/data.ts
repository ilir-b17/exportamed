export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'Precision Dental Consumables' | 'Laboratory Reagents' | 'Surgical & Clinical' | 'Consumer Hygiene';
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
  'Surgical & Clinical',
  'Consumer Hygiene'
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'dent-01',
    sku: 'NXT-DEN-882-FG',
    name: 'Precision Diamond Burs (FG Series)',
    category: 'Precision Dental Consumables',
    description: 'Premium electroplated natural diamond grit for high speed clinical friction grip preparation.',
    longDescription: 'Engineered in Germany, these FG diamond burs utilize selected natural diamond crystals bonded via state-of-the-art galvanic electroplating. This ensures maximum cutting efficiency, zero structural vibrations, and superior durability under high rotational speeds.',
    origin: 'Germany',
    packSize: '5 burs per blister pack',
    certifications: ['CE 0123', 'FDA Cleared', 'ISO 13485'],
    keySpec: '135°C Autoclavable, Multi-grit Selection',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dent-02',
    sku: 'NXT-DEN-455-ZC',
    name: 'Universal Nano-Hybrid Composite',
    category: 'Precision Dental Consumables',
    description: 'Light-curing radioopaque universal restorative composite with 82% sub-micron zirconia silica filler.',
    longDescription: 'A premier dental composite delivering exceptionally high wear resistance, pristine lifelike enamel polish, and minimal polymerization shrinkage. Ideal for both anterior and posterior restorations, with optimized non-sticky handling.',
    origin: 'United States',
    packSize: '4g syringe / 20 caps',
    certifications: ['FDA Approved', 'CE Certified', 'ISO 14001'],
    keySpec: '82% Inorganic Filler, Low 1.6% Shrinkage',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dent-03',
    sku: 'NXT-DEN-901-KF',
    name: 'Endodontic K-Files, Stainless Steel',
    category: 'Precision Dental Consumables',
    description: 'Supreme flexibility and high-torque fracture resistance for precision root canal treatment.',
    longDescription: 'Crafted from high-tensile stainless steel, these clinical endodontic hand-files feature a square cross-section to optimize cleaning efficiency. Designed with non-cutting safety tips and exact ISO taper standards for safe lateral debridement.',
    origin: 'Germany',
    packSize: '6 files per slide box',
    certifications: ['CE Certified', 'ISO 13485', 'EU MDR Compliant'],
    keySpec: 'ISO Standard Color-coded Handles, High Shear Strengths',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'reag-01',
    sku: 'NXT-RE-220-GL',
    name: 'Enzymatic Glucose Assay Kit',
    category: 'Laboratory Reagents',
    description: 'Photometric diagnostic reagent system for precision automated clinical chemistry analyzers.',
    longDescription: 'High-purity diagnostic reagent designed for the quantitative in vitro determination of glucose in serum or plasma. Perfect linearity up to 500 mg/dL with negligible cross-reactivity or interference from normal uric load.',
    origin: 'Germany',
    packSize: '4 x 100mL dual-bottle kits',
    certifications: ['CE-IVD Registered', 'ISO 13485', 'WHO GMP Compliant'],
    keySpec: '24-Month Shelf Life, Ready-to-Use (R1/R2) Setup',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'reag-02',
    sku: 'NXT-RE-411-PBS',
    name: 'PBS Buffered Saline (10x Concentrate)',
    category: 'Laboratory Reagents',
    description: 'High-purity pyrogen-free cell culture grade phosphate-buffered saline solution.',
    longDescription: 'Physiological buffer optimized for molecular biology, immunological assays, tissue processing, and general histology wash protocols. Strictly filtered to 0.1 µm, certified endotoxin-free, DNase-free, and RNase-free.',
    origin: 'United States',
    packSize: '500mL heavy-duty sterile bottle',
    certifications: ['ISO 13485', 'USP Grade Ingredients'],
    keySpec: 'pH 7.4 ± 0.1 on dilution, Ultrapure formulation',
    image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'reag-03',
    sku: 'NXT-RE-889-PCR',
    name: 'Hot-Start qPCR MasterMix (2X)',
    category: 'Laboratory Reagents',
    description: 'Optimized real-time PCR amplification mix with antibody-mediated heat-activable polymerase.',
    longDescription: 'Double-strength, optimized MasterMix containing a premium chemical hot-start Taq polymerase, ultra-pure dNTPs, a passive reference dye, and state-of-the-art reaction buffers. Engineered to prevent early unspecific amplification at room temperature.',
    origin: 'United States',
    packSize: '5 x 1.25mL vials (500 rxns)',
    certifications: ['ISO 13485 Certified', 'Certified DNase/RNase Free'],
    keySpec: 'Highly Sensitive Target Detection down to single-copy',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'surg-01',
    sku: 'NXT-SUR-400-SG',
    name: 'Sterile SMS Surgical Gowns (Level 3)',
    category: 'Surgical & Clinical',
    description: 'High protection spunbond-meltblown clinical defensive gowns with critical ultrasonic seams.',
    longDescription: 'Surgical gown constructed from dynamic multi-layer SMS fabric to present strong fluid repel properties and breathability. Delivers reliable, fluid-impact protection across critical chest, seam, and arm zones as certified by ANSI/AAMI PB70 protocols.',
    origin: 'United States',
    packSize: '50 units per reinforced carton',
    certifications: ['AAMI Level 3 Certified', 'CE Mark', 'FDA 510(k)'],
    keySpec: 'Lint-free, Breathable antistatic treatment, Double back ties',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'surg-02',
    sku: 'NXT-SUR-102-GL',
    name: 'Medical Nitrile Examination Gloves',
    category: 'Surgical & Clinical',
    description: 'Powder-free, chemo-rated heavy duty nitrile barriers with micro-textured skin grip.',
    longDescription: 'High-density nitrile examination gloves offering premium puncture resistance, comfortable elastic contouring, and chemotherapeutic fluid resistance. Designed for heavy laboratory, surgical suite, and dental clinic safety barriers.',
    origin: 'Malaysia / Germany Hub',
    packSize: '100 pieces per dispenser box',
    certifications: ['EN 455 (1-4)', 'ASTM D6319', 'FDA 510(k)'],
    keySpec: 'AQL 1.5, Chemo-rated according to ASTM D6978',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'surg-03',
    sku: 'NXT-SUR-942-MK',
    name: 'Clinical Face Masks (Type IIR)',
    category: 'Surgical & Clinical',
    description: 'Premium triple-layer fluid-resistant protection with soft comfort earloops.',
    longDescription: 'Medical grade masks certified to EN 14683 Type IIR specifications, providing ≥ 98% Bacterial Filtration Efficiency (BFE) and high splash resistance pressure at 120 mmHg. Constructed with non-irritating skin-safe inner linings.',
    origin: 'Germany',
    packSize: '50 masks per retail dispenser',
    certifications: ['EN 14683 Type IIR', 'CE Declaration of Conformity'],
    keySpec: '≥ 98% Bacterial Filtration (BFE), Splash Resistant',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hyg-01',
    sku: 'NXT-HYG-301-CH',
    name: 'Chlorhexidine Antiseptic Mouthwash',
    category: 'Consumer Hygiene',
    description: '0.2% concentration professional oral solution for intensive pre-and-post clinical periodontal hygiene.',
    longDescription: 'An alcohol-free, highly potent antiseptic oral wash formulated specifically for professional periodontal care. Effectively inhibits plaque biofilm growth, safeguards healing tissues, and offers prolonged modern bacterial control.',
    origin: 'France',
    packSize: '300mL amber clinical bottle',
    certifications: ['CE Registered', 'ISO 9001', 'GMP Standard'],
    keySpec: '0.20% Active Chlorhexidine Digluconate, Non-burning Formula',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hyg-02',
    sku: 'NXT-HYG-110-WX',
    name: 'Orthodontic Soft Relief Wax',
    category: 'Consumer Hygiene',
    description: 'Premium medical-grade protective wax for orthodontic brackets and wire relief.',
    longDescription: 'Pre-cut medical grade silicone-paraffin clinical relief wax. Forms a smooth, micro-barrier covering sharp brackets and ligatures, reducing mucous membrane friction and accelerating oral tissue irritation healing.',
    origin: 'United States',
    packSize: '50 small patient cases per carton',
    certifications: ['FDA Approved Medical Device', 'ISO 22716'],
    keySpec: 'Unscented, High Adhesion Cohesive Blend',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hyg-03',
    sku: 'NXT-HYG-505-IB',
    name: 'Interdental Micro-fiber Brushes',
    category: 'Consumer Hygiene',
    description: 'Ultra-thin clinical grade ergonomic silicone interdental brushes for active plaque control.',
    longDescription: 'Specially engineered high-density soft silicone rubber bristles that adapt to irregular interproximal spaces. Built with a robust metal-free flexible plastic core representing ultimate comfort and gentle gingival massage.',
    origin: 'France',
    packSize: '40 brushes per patient card',
    certifications: ['ISO 13485', 'CE Certified', 'ISO 9001'],
    keySpec: '0.4mm wire-equivalent slim tip, Ergonomic Non-slip Grip',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&q=80'
  }
];
