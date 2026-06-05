/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useId, useState, useEffect, MouseEvent } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Globe, 
  Award, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Ship, 
  Check, 
  ChevronRight, 
  Package, 
  Sparkles,
  Layers,
  Thermometer,
  Shield,
  Clock,
  Menu,
  X,
  Search,
  Filter,
  ArrowLeft,
  ExternalLink,
  Download,
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES, Product } from './data';

const fadeUpText = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

function Logo({ className }: { className?: string }) {
  return (
    <img 
      src="/logo.png" 
      alt="ExportaMed Logo" 
      className={`object-contain ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalogue'>('home');
  const [inquiryType, setInquiryType] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Catalogue states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalProduct(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (page: 'home' | 'catalogue') => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCtaClick = (type: string) => {
    setInquiryType(type);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireProduct = (product: Product) => {
    setInquiryType('catalogue');
    
    // Auto-populate message text for B2B procurement
    const messageField = document.getElementById('message') as HTMLTextAreaElement | null;
    const bodyText = `Dear ExportaMed Desk,

We are interested in requesting priority export pricing and compliance datasheets for:
- SKU Reference: ${product.sku}
- Product: ${product.name}
- Origin: ${product.origin}
- Certifications: ${product.certifications.join(', ')}

Please provide standard shipping lead times, MOQ, and wholesale pricing. Thank you.`;
    
    if (messageField) {
      messageField.value = bodyText;
    }
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Filter products based on search query and category filters
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <button 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 active:scale-95 transition-transform bg-transparent border-none text-left cursor-pointer"
          >
            <Logo className="h-9 w-9" />
            <span className="text-xl font-bold tracking-tight text-slate-900">ExportaMed</span>
          </button>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigateTo('home')} 
              className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-blue-900 font-semibold' : 'text-slate-600 hover:text-blue-900'}`}
            >
              Home
            </button>
            <a 
              href="#sell-through-us" 
              onClick={(e) => handleNavClick(e, 'sell-through-us')}
              className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
            >
              Sell Through Us
            </a>
            <a 
              href="#buy-from-us" 
              onClick={(e) => handleNavClick(e, 'buy-from-us')}
              className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors"
            >
              Buy From Us
            </a>
            <button 
              onClick={() => navigateTo('catalogue')} 
              className={`text-sm font-medium transition-colors ${currentPage === 'catalogue' ? 'text-blue-900 font-semibold' : 'text-slate-600 hover:text-blue-900'}`}
            >
              Product Catalogue
            </button>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')}
              className="text-sm font-medium bg-blue-950 text-white hover:bg-blue-900 transition-colors px-5 py-2.5 rounded shadow-sm"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            id="mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-200 bg-white px-6 py-5 space-y-4"
            >
              <button 
                onClick={() => navigateTo('home')}
                className={`block w-full text-left text-base font-medium ${currentPage === 'home' ? 'text-blue-900 font-semibold' : 'text-slate-600'}`}
              >
                Home
              </button>
              <a 
                href="#sell-through-us" 
                onClick={(e) => handleNavClick(e, 'sell-through-us')}
                className="block text-base font-medium text-slate-600 hover:text-blue-900"
              >
                Sell Through Us
              </a>
              <a 
                href="#buy-from-us" 
                onClick={(e) => handleNavClick(e, 'buy-from-us')}
                className="block text-base font-medium text-slate-600 hover:text-blue-900"
              >
                Buy From Us
              </a>
              <button 
                onClick={() => navigateTo('catalogue')}
                className={`block w-full text-left text-base font-medium ${currentPage === 'catalogue' ? 'text-blue-900 font-semibold' : 'text-slate-600'}`}
              >
                Product Catalogue
              </button>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className="block text-center text-sm font-medium bg-blue-950 text-white hover:bg-blue-900 py-3 rounded shadow-sm"
              >
                Contact
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* RENDER DYNAMIC PAGES */}
      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div
            key="homePage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* HERO */}
            <section className="relative overflow-hidden bg-white px-6 pt-[140px] pb-[80px] lg:px-8">
              {/* Background Net pattern */}
              <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    maskImage: 'radial-gradient(circle at center, black 50%, transparent 90%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 90%)'
                  }}
                >
                  <motion.div 
                    className="absolute -inset-[50%] opacity-[0.15]"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)',
                      backgroundSize: '56px 56px',
                      transform: 'rotate(12deg)'
                    }}
                    animate={{
                      x: [0, -56],
                      y: [0, -56],
                    }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 24 }}
                  />
                  <motion.div 
                    className="absolute -inset-[50%] opacity-[0.1]"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #2563eb 1.5px, transparent 1.5px), linear-gradient(to bottom, #2563eb 1.5px, transparent 1.5px)',
                      backgroundSize: '72px 72px',
                      transform: 'rotate(-8deg)'
                    }}
                    animate={{
                      x: [0, 72],
                      y: [0, -72],
                    }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                  />
                  <svg className="absolute inset-0 w-full h-full opacity-[0.25]" xmlns="http://www.w3.org/2000/svg">
                    <g strokeWidth="2.5" fill="none">
                      <motion.path 
                        d="M -100,200 Q 300,50 700,250 T 1500,150" 
                        stroke="#3b82f6"
                        animate={{ d: [
                          "M -100,200 Q 300,50 700,250 T 1500,150",
                          "M -100,180 Q 350,90 750,220 T 1500,180",
                          "M -100,200 Q 300,50 700,250 T 1500,150"
                        ]}}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.path 
                        d="M -100,400 Q 400,200 800,450 T 1500,350" 
                        stroke="#54788D"
                        animate={{ d: [
                          "M -100,400 Q 400,200 800,450 T 1500,350",
                          "M -100,420 Q 380,180 820,430 T 1500,320",
                          "M -100,400 Q 400,200 800,450 T 1500,350"
                        ]}}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </g>
                  </svg>
                </div>
              </div>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="mx-auto max-w-5xl text-center"
              >
                <motion.div variants={fadeUpText} className="flex flex-col items-center justify-center mb-6">
                  <Logo className="h-[200px] w-[200px] mb-0 opacity-100 transition-transform duration-300 hover:scale-105 drop-shadow-md" />
                  <span className="text-[27px] font-bold tracking-[0.2em] text-[#54788D]">ExportaMed</span>
                </motion.div>
                
                <motion.h1 variants={fadeUpText} className="text-4xl font-bold tracking-tight text-slate-900 sm:text-[54px] mb-6 leading-[1.1] max-w-4xl mx-auto">
                  Premium Medical Supplies. Delivered Globally.
                </motion.h1>
                <motion.p variants={fadeUpText} className="text-lg leading-relaxed text-slate-600 mb-10 max-w-3xl mx-auto font-normal">
                  We bring top-tier European and US healthcare products to growing markets worldwide. Fast logistics, secure payments, and zero cross-border hassle.
                </motion.p>
                
                <motion.div variants={fadeUpText} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    onClick={() => handleCtaClick('export')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-blue-950 px-8 py-4 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-900 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                  >
                    Partner as a Supplier <ArrowRight className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => navigateTo('catalogue')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    View Our Catalogue
                  </button>
                </motion.div>
              </motion.div>
            </section>

            {/* FOR MANUFACTURERS (Sell Through Us) */}
            <section id="sell-through-us" className="pt-[100px] pb-[100px] bg-slate-50 border-t border-slate-200">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  
                  {/* Visual Column */}
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3] shadow-lg border border-slate-200"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                        alt="Sterile high-precision manufacturing lab"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 to-transparent" />
                    </motion.div>
                  </div>

                  {/* Editorial Copy Column */}
                  <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
                    <div>
                      <span className="text-xs font-bold tracking-widest text-blue-800 uppercase bg-blue-100/80 px-3.5 py-1.5 rounded-full inline-block mb-4">
                        FOR MANUFACTURERS
                      </span>
                      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Grow Your Global Sales With Zero Risk.
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-slate-600">
                        Expand into new markets without the red tape. We buy your products directly, pay upfront, and handle all the export logistics and local compliance. You focus on manufacturing; we focus on scaling your reach.
                      </p>
                    </div>

                    {/* Bullet Blocks */}
                    <div className="space-y-6 pt-2">
                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-950">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">Direct Purchases</h3>
                          <p className="mt-1 text-sm text-slate-600">We buy from you on fast 3-5 day terms.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-950">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">We Handle the Paperwork</h3>
                          <p className="mt-1 text-sm text-slate-600">Total management of customs and local registrations.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-950">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">Guaranteed Growth</h3>
                          <p className="mt-1 text-sm text-slate-600">Exclusive contracts with clear, scalable volume targets.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* FOR DISTRIBUTORS (Buy From Us) */}
            <section id="buy-from-us" className="pt-[100px] pb-[100px] bg-white">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  
                  {/* Copy Column */}
                  <div className="lg:col-span-7 space-y-8">
                    <div>
                      <span className="text-xs font-bold tracking-widest text-[#54788D] uppercase bg-[#54788D]/10 px-3.5 py-1.5 rounded-full inline-block mb-4">
                        FOR DISTRIBUTORS
                      </span>
                      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Premium Healthcare Products You Can Trust.
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-slate-600">
                        Get direct access to the highest-quality dental, medical, and hygiene supplies from Europe and the US. We offer flexible payment terms and reliable shipping so you can keep your customers happy and your business growing.
                      </p>
                    </div>

                    {/* Bullet Blocks */}
                    <div className="space-y-6 pt-2">
                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-900">
                          <Award className="h-5 w-5 text-blue-950" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">Top-Tier Brands</h3>
                          <p className="mt-1 text-sm text-slate-600">Exclusive access to precision European and US instruments.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-900">
                          <DollarSign className="h-5 w-5 text-blue-950" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">Smart Financing</h3>
                          <p className="mt-1 text-sm text-slate-600">Flexible credit terms designed to match your cash flow.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-900">
                          <Ship className="h-5 w-5 text-blue-950" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">Reliable Supply</h3>
                          <p className="mt-1 text-sm text-slate-600">Consistent, fully insured shipments right to your local port.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Column */}
                  <div className="lg:col-span-5 order-last">
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3] shadow-lg border border-slate-200"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
                        alt="Modern global logistics harbor and container shipments"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-blue-950/20 to-transparent" />
                    </motion.div>
                  </div>

                </div>
              </div>
            </section>

            {/* CORE CATEGORIES GRID PREVIEW */}
            <section id="catalogue" className="pt-[100px] pb-[100px] bg-slate-50 border-t border-b border-slate-200">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center mb-16">
                  <span className="text-xs font-bold tracking-widest text-[#54788D] uppercase bg-[#54788D]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
                    OFFERING RANGE
                  </span>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Explore Our Core Categories
                  </h2>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
                    High-margin, fully certified consumables ready for international dispatch.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                  {/* Card 1 */}
                  <motion.div 
                    whileHover={{ y: -4 }}
                    onClick={() => { setSelectedCategory('Precision Dental Consumables'); navigateTo('catalogue'); }}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col justify-between transition-all cursor-pointer hover:border-blue-900/40"
                  >
                    <div>
                      <div className="h-12 w-12 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center mb-6">
                        <Sparkles className="h-6 w-6 text-blue-950" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Precision Dental Consumables</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Diamond drills, burs, and clinical composites engineered for perfection.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-950">
                      <span>Explore Products</span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div 
                    whileHover={{ y: -4 }}
                    onClick={() => { setSelectedCategory('Laboratory Reagents'); navigateTo('catalogue'); }}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col justify-between transition-all cursor-pointer hover:border-emerald-600/40"
                  >
                    <div>
                      <div className="h-12 w-12 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center mb-6">
                        <Layers className="h-6 w-6 text-emerald-700" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Laboratory Reagents</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        High-purity diagnostic reagents and testing supplies for professional labs.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                      <span>Explore Products</span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </motion.div>

                  {/* Card 3 */}
                  <motion.div 
                    whileHover={{ y: -4 }}
                    onClick={() => { setSelectedCategory('Surgical & Clinical'); navigateTo('catalogue'); }}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col justify-between transition-all cursor-pointer hover:border-indigo-600/40"
                  >
                    <div>
                      <div className="h-12 w-12 rounded-lg bg-indigo-50 text-indigo-900 flex items-center justify-center mb-6">
                        <Package className="h-6 w-6 text-indigo-800" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Surgical & Clinical</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Everyday medical disposables and clinical barrier protection for cleanrooms.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-800">
                      <span>Explore Products</span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </motion.div>

                  {/* Card 4 */}
                  <motion.div 
                    whileHover={{ y: -4 }}
                    onClick={() => { setSelectedCategory('Consumer Hygiene'); navigateTo('catalogue'); }}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col justify-between transition-all cursor-pointer hover:border-cyan-600/40"
                  >
                    <div>
                      <div className="h-12 w-12 rounded-lg bg-cyan-50 text-cyan-900 flex items-center justify-center mb-6">
                        <Award className="h-6 w-6 text-cyan-800" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Consumer Hygiene</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Premium preventive oral care and daily personal wellness products.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-cyan-800">
                      <span>Explore Products</span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </motion.div>
                </div>

                {/* Bold Call to Action */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-gradient-to-r from-blue-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8"
                >
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
                  <div className="space-y-3 text-center md:text-left z-10">
                    <h3 className="text-xl sm:text-2xl font-bold">Request Full 2026 Inventory & Pricing List</h3>
                    <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light">
                      Secure our wholesale catalogue including precise dynamic SKU pricing, localized certificates, and regional dispatch schedules.
                    </p>
                  </div>
                  <button 
                    onClick={() => { setSelectedCategory('All'); navigateTo('catalogue'); }}
                    className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded bg-white px-6 py-3.5 text-sm font-bold text-blue-950 shadow-md transition-all hover:bg-slate-100 active:scale-95 z-10 cursor-pointer border-none"
                  >
                    Request Price List <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* EXPLORE CATALOGUE PAGE (VIBRANT & INTERACTIVE INVENTORY) */
          <motion.div
            key="cataloguePage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header intro of full inventory */}
            <section className="relative overflow-hidden bg-white border-b border-slate-200 px-6 pt-[140px] pb-16 lg:px-8">
              {/* Slate styling mesh */}
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
              
              <div className="mx-auto max-w-7xl">
                <button 
                  onClick={() => navigateTo('home')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-blue-950 mb-6 bg-transparent border-none cursor-pointer transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Overview
                </button>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8">
                    <span className="text-xs font-bold tracking-widest text-blue-800 uppercase bg-blue-100/80 px-3.5 py-1.5 rounded-full inline-block mb-3">
                      GLOBAL TRADE CATALOGUE • 2026
                    </span>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                      Explore Our Clinical Inventory
                    </h1>
                    <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 max-w-3xl">
                      High-margin, fully certified B2B medical consumables, laboratory reagents, and clinical protection ready for expedited international dispatch. Filters and search live data below.
                    </p>
                  </div>
                  
                  {/* Dynamic stats banner right on high commercial page */}
                  <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between h-full">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wider uppercase">
                        <Globe className="h-4 w-4 text-blue-950" /> Logistical Coverage
                      </div>
                      <div className="text-2xl font-bold text-slate-900">
                        USA, EU, & Emerging Markets
                      </div>
                      <p className="text-xs text-slate-500">
                        We resolve complex cross-border documentation, duty clearing, and secure fast shipping.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-200 mt-4 flex items-center justify-between text-xs text-slate-600">
                      <span>Total Active Lines: <strong>12 SKUs</strong></span>
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> Vetted & Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CATALOG FILTERING & PRODUCTS GRID */}
            <section className="py-12 bg-slate-50 min-h-[600px] border-b border-slate-200">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                
                {/* Search & Filter bar layout */}
                <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-between mb-10 pb-6 border-b border-slate-200">
                  
                  {/* Category Chips */}
                  <div className="flex flex-wrap gap-2 items-center order-2 lg:order-1">
                    <button 
                      onClick={() => setSelectedCategory('All')}
                      className={`px-4 py-2 text-xs font-bold rounded transition-all cursor-pointer ${
                        selectedCategory === 'All' 
                          ? 'bg-blue-950 text-white shadow-sm' 
                          : 'bg-white text-slate-600 hover:text-blue-950 border border-slate-200'
                      }`}
                    >
                      Show All ({PRODUCTS.length})
                    </button>
                    {CATEGORIES.map(cat => {
                      const count = PRODUCTS.filter(p => p.category === cat).length;
                      return (
                        <button 
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 text-xs font-bold rounded transition-all cursor-pointer ${
                            selectedCategory === cat 
                              ? 'bg-blue-950 text-white shadow-sm' 
                              : 'bg-white text-slate-600 hover:text-blue-950 border border-slate-200'
                          }`}
                        >
                          {cat} ({count})
                        </button>
                      );
                    })}
                  </div>

                  {/* Search box input layout */}
                  <div className="relative w-full lg:w-96 order-1 lg:order-2">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Search className="h-4.5 w-4.5" />
                    </div>
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search SKU, key-term, origin..."
                      className="block w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent shadow-sm outline-none placeholder-slate-400 transition-all"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Empty product fallback state page */}
                {filteredProducts.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-white border border-slate-200 rounded-xl max-w-xl mx-auto p-8"
                  >
                    <Info className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No Matching SKUs Found</h3>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                      We couldn't locate products fitting search tag "{searchQuery}". Try refining your query or resetting filters.
                    </p>
                    <button 
                      onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                      className="inline-flex items-center gap-2 rounded bg-blue-950 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-900 cursor-pointer border-none"
                    >
                      Reset All Filters
                    </button>
                  </motion.div>
                ) : (
                  /* Products layout grid */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                      <motion.div 
                        layout
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between transition-all group"
                      >
                        {/* Interactive thumbnail & origin tag */}
                        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded shadow-sm text-xs font-semibold text-slate-800 flex items-center gap-1.5 border border-slate-200">
                            <span className="text-sm">📍</span> {product.origin}
                          </div>
                          
                          {/* Sku overlay branding */}
                          <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-bold tracking-widest text-slate-300 font-mono">
                            SKU • {product.sku}
                          </div>
                        </div>

                        {/* Text summary info */}
                        <div className="p-6 flex-grow space-y-4">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-900 block mb-1.5">
                              {product.category}
                            </span>
                            <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-950 transition-colors">
                              {product.name}
                            </h3>
                          </div>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                          
                          {/* Specifications table inside card */}
                          <div className="bg-slate-50 border border-slate-150 rounded-lg p-3.5 space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Pack Format:</span>
                              <span className="font-medium text-slate-700 text-right">{product.packSize}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Certifications:</span>
                              <span className="font-semibold text-blue-950 text-right">
                                {product.certifications.join(', ')}
                              </span>
                            </div>
                            <div className="flex justify-between pt-1.5 border-t border-slate-150">
                              <span className="text-slate-400 font-medium">Core Asset:</span>
                              <span className="text-slate-600 italic font-medium truncate max-w-[160px]" title={product.keySpec}>
                                {product.keySpec}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive button choices for B2B desk */}
                        <div className="px-6 pb-6 pt-1 flex gap-2 border-t border-slate-100">
                          <button 
                            onClick={() => handleInquireProduct(product)}
                            className="flex-grow inline-flex items-center justify-center gap-1.5 rounded bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold py-3 px-2.5 shadow-sm transition-all cursor-pointer border-none"
                          >
                            Inquire SKU <ArrowRight className="h-3 w-3 shadow-sm" />
                          </button>
                          
                          <button 
                            onClick={() => setActiveModalProduct(product)}
                            className="inline-flex items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold py-3 px-3.5 shadow-sm transition-all cursor-pointer"
                            title="View Regulatory Specs"
                          >
                            Tech Sheet
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPLIANT GENERAL CONTACT SECTION */}
      <section id="contact" className="pt-[100px] pb-[100px] bg-white border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-[#54788D] uppercase bg-[#54788D]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              GET STARTED
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
              Let’s Grow Your Business.
            </h2>
            <p className="text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
              For manufacturers seeking a zero-friction export partner, or regional distributors requiring access to premium clinical supply lines, contact our trade desk.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 sm:p-12 shadow-sm"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-900">Name</label>
                  <div className="mt-2 text-slate-900">
                    <input 
                      type="text" 
                      id="name" 
                      className="block w-full rounded border-slate-300 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm bg-white transition-all outline-none" 
                      placeholder="Your name"
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium leading-6 text-slate-900">Corporate Entity</label>
                  <div className="mt-2 text-slate-900">
                    <input 
                      type="text" 
                      id="company" 
                      className="block w-full rounded border-slate-300 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm bg-white transition-all outline-none" 
                      placeholder="Company name"
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">Corporate Email</label>
                  <div className="mt-2 text-slate-900">
                    <input 
                      type="email" 
                      id="email" 
                      className="block w-full rounded border-slate-300 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm bg-white transition-all outline-none" 
                      placeholder="you@company.com"
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium leading-6 text-slate-900">Inquiry Type</label>
                  <div className="mt-2 text-slate-900">
                    <select 
                      id="type" 
                      className="block w-full rounded border-slate-300 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm bg-white transition-all outline-none text-slate-900 bg-white select-none" 
                      required 
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                    >
                      <option value="" disabled>Select an option</option>
                      <option value="export">Manufacturer Export / Sell Through Us</option>
                      <option value="distribution">Regional Distribution / Buy From Us</option>
                      <option value="catalogue">Catalogue Inventory & Price List Request</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium leading-6 text-slate-900">Message</label>
                  <div className="mt-2 text-slate-900">
                    <textarea 
                      id="message" 
                      rows={6} 
                      className="block w-full rounded border-slate-300 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm bg-white transition-all resize-none outline-none font-sans" 
                      placeholder="Please details your product offerings or geographical requirements..."
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button 
                  type="submit" 
                  onClick={() => alert('Corporate inquiry submitted securely. A trade Desk agent will reply within 24 hours.')}
                  className="w-full sm:w-auto px-8 py-4 rounded bg-blue-950 text-sm font-semibold text-white shadow hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-md cursor-pointer border-none"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-16 border-t border-white/10 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <button 
              onClick={() => navigateTo('home')} 
              className="flex items-center gap-3 bg-transparent border-none cursor-pointer"
            >
              <Logo className="h-8 w-8 opacity-90" />
              <span className="text-lg font-bold tracking-tight text-white">ExportaMed</span>
            </button>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Trade</a>
              <a href="#" className="hover:text-white transition-colors">Regulatory Disclosures</a>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8">
            <p className="text-center text-sm text-slate-500">
              © 2026 ExportaMed. All rights reserved. Registered global medical distributors.
            </p>
          </div>
        </div>
      </footer>

      {/* IMPRESSIVE COMPLIANCE & SPECS MODAL */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-250 overflow-hidden"
            >
              {/* Close Button top-right */}
              <button 
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors bg-white/85 shadow-sm border border-slate-150 z-10 cursor-pointer"
                aria-label="Close panel"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Cover Graphic details */}
              <div className="relative aspect-[21/9] bg-slate-150 overflow-hidden w-full">
                <img 
                  src={activeModalProduct.image} 
                  alt={activeModalProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/20" />
                <div className="absolute bottom-4 left-6">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#54788D] bg-white px-2 py-0.5 rounded-full inline-block mb-1.5">
                    {activeModalProduct.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                    {activeModalProduct.name}
                  </h2>
                </div>
              </div>

              {/* Tech Spec content info */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">SKU REF / REGULATORY METADATA</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-700 font-mono">
                      SKU: {activeModalProduct.sku}
                    </span>
                    <span className="px-3 py-1 bg-blue-50 border border-blue-100 rounded text-xs font-semibold text-blue-900">
                      Origin: {activeModalProduct.origin}
                    </span>
                    <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded text-xs font-semibold text-emerald-800">
                      Distribution Hub: Fast dispatch
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">TECHNICAL DESCRIPTION</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {activeModalProduct.longDescription}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="border border-slate-150 rounded-lg p-4 bg-slate-50">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">PACK FORMAT</h4>
                    <span className="text-sm font-semibold text-slate-800">{activeModalProduct.packSize}</span>
                  </div>
                  <div className="border border-slate-150 rounded-lg p-4 bg-slate-50">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">COMPLIANCE CERTIFICATES</h4>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeModalProduct.certifications.map(cert => (
                        <span key={cert} className="inline-flex items-center gap-1 bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded text-xs font-semibold">
                          <Check className="h-3 w-3 text-emerald-600" /> {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 justify-end">
                  <button 
                    onClick={() => setActiveModalProduct(null)}
                    className="w-full sm:w-auto px-5 py-3 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    Close Sheet
                  </button>
                  <button 
                    onClick={() => {
                      setActiveModalProduct(null);
                      handleInquireProduct(activeModalProduct);
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer border-none shadow-sm"
                  >
                    Send Specs to Inquiry <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
