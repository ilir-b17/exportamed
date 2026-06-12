/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  Banknote,
  FileCheck,
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

function InteractiveNetBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouseRef = React.useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let resizeObserver: ResizeObserver;

    const cellSize = 120; // Wide boxes
    let rows = 0;
    let cols = 0;
    let points: { baseX: number, baseY: number, x: number, y: number, vx: number, vy: number }[][] = [];

    const initNet = () => {
      points = [];
      cols = Math.ceil(canvas.width / cellSize) + 2;
      rows = Math.ceil(canvas.height / cellSize) + 2;

      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          row.push({
            baseX: (j - 1) * cellSize,
            baseY: (i - 1) * cellSize,
            x: (j - 1) * cellSize,
            y: (i - 1) * cellSize,
            vx: 0,
            vy: 0
          });
        }
        points.push(row);
      }
    };

    let time = 0;

    const draw = () => {
      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseActive = mouseRef.current.targetX !== -1000 && mouseRef.current.targetY !== -1000;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const point = points[i][j];

          // Ambient idle weaving
          let waveX = Math.sin(time + j * 0.5 + i * 0.2) * 15;
          let waveY = Math.cos(time + i * 0.5 + j * 0.2) * 15;

          let dx = waveX;
          let dy = waveY;

          if (mouseActive) {
            const distX = mouseX - point.baseX;
            const distY = mouseY - point.baseY;
            const dist = Math.sqrt(distX * distX + distY * distY);
            
            // Interaction radius
            const radius = 350;
            if (dist < radius) {
              const force = (radius - dist) / radius;
              // Push points away from mouse gently
              dx += -(distX / dist) * force * 60;
              dy += -(distY / dist) * force * 60;
            }
          }

          // Spring physics to return to base + offset
          const targetX = point.baseX + dx;
          const targetY = point.baseY + dy;

          point.vx += (targetX - point.x) * 0.06;
          point.vy += (targetY - point.y) * 0.06;

          // Friction
          point.vx *= 0.75;
          point.vy *= 0.75;

          point.x += point.vx;
          point.y += point.vy;
        }
      }

      // Draw the net
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)'; // Very transparent to not distract
      ctx.lineWidth = 1;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const point = points[i][j];

          // Connect to right
          if (j < cols - 1) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(points[i][j + 1].x, points[i][j + 1].y);
            ctx.stroke();
          }

          // Connect to bottom
          if (i < rows - 1) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(points[i + 1][j].x, points[i + 1][j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
        initNet();
      }
    };

    resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    handleResize();
    draw();

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouseRef.current.targetX = e.clientX - rect.left;
        mouseRef.current.targetY = e.clientY - rect.top;
      } else {
        mouseRef.current.targetX = -1000;
        mouseRef.current.targetY = -1000;
      }
    };
    
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none" 
      style={{
        maskImage: 'radial-gradient(circle at center, black 50%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 90%)'
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalogue' | 'privacy'>('home');
  const [inquiryType, setInquiryType] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
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

  const navigateTo = (page: 'home' | 'catalogue' | 'privacy') => {
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
              onClick={() => { setSelectedCategory('All'); navigateTo('catalogue'); }} 
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
                onClick={() => { setSelectedCategory('All'); navigateTo('catalogue'); }}
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
              {/* Interactive Net Background */}
              <InteractiveNetBackground />
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="mx-auto max-w-5xl text-center"
              >
                <motion.div variants={fadeUpText} className="flex flex-col items-center justify-center mb-6">
                  <Logo className="h-[200px] w-[200px] mb-0 opacity-100 transition-transform duration-300 hover:scale-105 drop-shadow-md" />
                  <span className="text-[32px] font-bold tracking-tight text-[#68718e]">ExportaMed</span>
                </motion.div>
                
                <motion.h1 variants={fadeUpText} className="text-4xl font-bold tracking-tight text-slate-900 sm:text-[54px] mb-6 leading-[1.1] max-w-4xl mx-auto">
                  Connecting European Manufacturers with High-Growth Markets
                </motion.h1>
                <motion.p variants={fadeUpText} className="text-lg leading-relaxed text-slate-600 mb-10 max-w-3xl mx-auto font-normal">
                  We streamline international B2B distribution for premium medical devices and clinical consumables. By handling regulatory compliance, cross-border logistics, and local market access, we build secure, high-yield supply chains for manufacturers and distributors alike.
                </motion.p>
                
                <motion.div variants={fadeUpText} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    onClick={() => handleCtaClick('export')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-blue-950 px-8 py-4 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-900 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                  >
                    Partner with Us <ArrowRight className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => { setSelectedCategory('All'); navigateTo('catalogue'); }}
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
                        src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80"
                        alt="Pharmaceutical production line"
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
                        Expand Your Market Footprint, Zero Infrastructure Risk
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-slate-600">
                        Expanding in new international markets can strain internal regulatory and sales bandwidth. ExportaMed acts as your dedicated regional export partner.
                      </p>
                    </div>

                    {/* Bullet Blocks */}
                    <div className="space-y-6 pt-2">
                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-950">
                          <Banknote className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">Upfront Capital</h3>
                          <p className="mt-1 text-sm text-slate-600">We secure transactions with structured, reliable payment terms, absorbing local commercial risks.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-950">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">We Handle the Paperwork</h3>
                          <p className="mt-1 text-sm text-slate-600">We handle the local registration filings, translation mandates, and customs clearings in the destination markets.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-950">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">Brand Protection</h3>
                          <p className="mt-1 text-sm text-slate-600">We maintain strict control over distribution networks to preserve your premium market positioning.</p>
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
                        Access to Premium Products
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-slate-600">
                        Procuring top-tier clinical goods should not mean facing unpredictable lead times or administrative gridlock.
                      </p>
                    </div>

                    {/* Bullet Blocks */}
                    <div className="space-y-6 pt-2">
                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-900">
                          <Ship className="h-5 w-5 text-blue-950" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">Streamlined Supply Chains</h3>
                          <p className="mt-1 text-sm text-slate-600">Direct access to certified European manufacturers, eliminating fragmented secondary brokers</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-900">
                          <FileCheck className="h-5 w-5 text-blue-950" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">Regulatory Facilitation</h3>
                          <p className="mt-1 text-sm text-slate-600">We provide fully compliant documentation sets (DoC, ISO certificates) to guarantee smooth local customs clearance.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-900">
                          <Award className="h-5 w-5 text-blue-950" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">Tailored Portfolios</h3>
                          <p className="mt-1 text-sm text-slate-600">Specializing in high-rotation clinical goods, from precision diamond drills to advanced dental lab consumables</p>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {/* Card 1 */}
                  <motion.div 
                    whileHover={{ y: -4 }}
                    onClick={() => { setSelectedCategory('Precision Dental Consumables'); navigateTo('catalogue'); }}
                    className="bg-white rounded-xl shadow-sm border-[2px] border-slate-200 p-8 flex flex-col justify-between transition-all cursor-pointer hover:border-blue-900 shadow-md"
                  >
                    <div>
                      <div className="h-12 w-12 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center mb-6">
                        <Sparkles className="h-6 w-6 text-blue-950" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Precision Rotary Instruments</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Our flagship clinical vertical. We supply premium diamond burs, tungsten carbides, and surgical cutters designed for maximum tactile precision and minimal vibration.
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
                    onClick={() => { setSelectedCategory('Endodontic & Surgical Systems'); navigateTo('catalogue'); }}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col justify-between transition-all cursor-pointer hover:border-emerald-600/40"
                  >
                    <div>
                      <div className="h-12 w-12 rounded-lg bg-emerald-50 text-emerald-900 flex items-center justify-center mb-6">
                        <Layers className="h-6 w-6 text-emerald-700" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Endodontic & Surgical Systems</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Advanced clinical solutions for complex procedures, including specialized endodontic files, surgical handpieces, and sterile barrier protocols for implantology.
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
                    onClick={() => { setSelectedCategory('Clinical Biomaterials & Restoratives'); navigateTo('catalogue'); }}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col justify-between transition-all cursor-pointer hover:border-indigo-600/40"
                  >
                    <div>
                      <div className="h-12 w-12 rounded-lg bg-indigo-50 text-indigo-900 flex items-center justify-center mb-6">
                        <Package className="h-6 w-6 text-indigo-800" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Clinical Biomaterials & Restoratives</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        A comprehensive portfolio of professional dental materials, including high-strength composites, impression systems, and bonding agents.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-800">
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
        ) : currentPage === 'catalogue' ? (
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
                    <motion.button 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      onClick={() => setSelectedCategory('All')}
                      className={`px-4 py-2 text-xs font-bold rounded transition-all cursor-pointer ${
                        selectedCategory === 'All' 
                          ? 'bg-blue-950 text-white shadow-sm' 
                          : 'bg-white text-slate-600 hover:text-blue-950 border border-slate-200'
                      }`}
                    >
                      Show All ({PRODUCTS.length})
                    </motion.button>
                    {CATEGORIES.map((cat, idx) => {
                      const count = PRODUCTS.filter(p => p.category === cat).length;
                      return (
                        <motion.button 
                          key={cat}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.1 + ((idx + 1) * 0.05) }}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 text-xs font-bold rounded transition-all cursor-pointer ${
                            selectedCategory === cat 
                              ? 'bg-blue-950 text-white shadow-sm' 
                              : 'bg-white text-slate-600 hover:text-blue-950 border border-slate-200'
                          }`}
                        >
                          {cat} ({count})
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Search box input layout */}
                  <div className="relative w-full lg:w-96 order-1 lg:order-2 flex items-center">
                    <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search SKU, key-term, origin..."
                      className="block w-full pl-10 pr-10 py-2.5 text-sm bg-white rounded border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent shadow-sm outline-none placeholder-slate-400 transition-all"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer flex items-center justify-center p-1"
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
        ) : (
          /* PRIVACY POLICY PAGE */
          <motion.div
            key="privacyPage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pt-24 pb-20"
          >
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              <button 
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-blue-950 mb-8 bg-transparent border-none cursor-pointer transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </button>
              
              <article className="prose prose-slate max-w-none text-slate-600 space-y-6">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Privacy Policy</h1>
                <p className="text-sm font-medium text-slate-500 pb-8 border-b border-slate-200">Last Updated: June 2026</p>
                
                <p className="leading-relaxed text-lg">
                  ExportaMed ("we," "our," or "us") operates as a pre-commercial market validation project. We are committed to protecting your privacy and handling your data transparently in accordance with the General Data Protection Regulation (GDPR).
                </p>

                <section className="pt-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">1. Data We Collect</h2>
                  <p className="mb-4">When you interact with our platform or submit an inquiry through our forms, we may collect the following information:</p>
                  <ul className="list-disc pl-5 space-y-2 marker:text-slate-400">
                    <li>Name and professional title.</li>
                    <li>Corporate entity name.</li>
                    <li>Corporate email address and communication preferences.</li>
                    <li>Any specific details provided within your inquiry message.</li>
                  </ul>
                </section>

                <section className="pt-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">2. How and Why We Use Your Data</h2>
                  <p className="mb-4">We collect this data strictly for legitimate market validation interests (Art. 6 para. 1 lit. f GDPR). Your data is used exclusively to:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-6 marker:text-slate-400">
                    <li>Evaluate regional market demand and supplier alignment.</li>
                    <li>Respond directly to your network inquiries or sample requests.</li>
                  </ul>
                  <p>We do not sell, trade, rent, or lease your personal data to third parties. We do not use your data for automated marketing or data-scraping profiling.</p>
                </section>

                <section className="pt-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">3. Data Storage and Retention</h2>
                  <p>Because this is a pre-commercial phase, all data submitted through this website is stored securely on encrypted servers. We retain your contact information only for the duration of this validation phase or until you request its deletion.</p>
                </section>

                <section className="pt-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">4. Your Rights Under GDPR</h2>
                  <p className="mb-4">As a user located in the European Union or interacting with an EU-managed concept, you hold the following rights regarding your data:</p>
                  <ul className="list-disc pl-5 space-y-2 mb-8 marker:text-slate-400">
                    <li><strong>Right to Access:</strong> You can request a copy of the data we hold about you.</li>
                    <li><strong>Right to Rectification:</strong> You can request that we correct inaccurate information.</li>
                    <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You can request that we permanently delete your data at any time.</li>
                  </ul>
                  <p className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    To exercise any of these rights, please contact our data manager directly at: <a href="mailto:office@exportamed.com" className="font-semibold text-blue-900 hover:underline">office@exportamed.com</a>.
                  </p>
                </section>
              </article>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPLIANT GENERAL CONTACT SECTION */}
      {currentPage !== 'privacy' && (
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
              Navigating cross-border medical commerce requires more than logistics — it demands absolute regulatory integrity and clinical understanding.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 sm:p-12 shadow-sm"
          >
            {isMessageSent ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-6">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank you for your message</h3>
                <p className="text-slate-600 mb-8">The message is sent. A trade desk agent will reply within 24 hours.</p>
                <button 
                  onClick={() => {
                    setIsMessageSent(false);
                    setInquiryType('');
                  }}
                  className="px-6 py-3 rounded bg-slate-200 text-sm font-semibold text-slate-900 hover:bg-slate-300 transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
            <form className="space-y-8" onSubmit={(e) => {
              e.preventDefault();
              setIsSending(true);
              
              const name = (document.getElementById('name') as HTMLInputElement).value;
              const company = (document.getElementById('company') as HTMLInputElement).value;
              const email = (document.getElementById('email') as HTMLInputElement).value;
              const type = (document.getElementById('type') as unknown as HTMLSelectElement).value;
              const message = (document.getElementById('message') as HTMLTextAreaElement).value;

              fetch('/api/send-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, company, email, type, message }),
              })
                .then((res) => res.json())
                .then((data: any) => {
                  setIsSending(false);
                  if (data.success) {
                    setIsMessageSent(true);
                  } else {
                    alert(data.error || 'An error occurred while submitting your message. Please try again.');
                  }
                })
                .catch((err) => {
                  setIsSending(false);
                  console.error('Inquiry sending failed:', err);
                  alert('Could not submit inquiry to server. Please check your internet connection or try again.');
                });
            }}>
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
                      className="block w-full rounded border-slate-300 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm bg-white transition-all outline-none text-slate-900 border-none select-none" 
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
                  disabled={isSending}
                  className="w-full sm:w-auto px-8 py-4 rounded bg-blue-950 text-sm font-semibold text-white shadow hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-md cursor-pointer border-none disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSending ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
            </form>
            )}
          </motion.div>
        </div>
      </section>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 pt-[30px] pb-[30px] border-t border-white/10 text-white">
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
              <a href="mailto:office@exportamed.com" className="hover:text-white transition-colors">office@exportamed.com</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('privacy'); }} className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
          <div className="mt-2 border-t border-white/10 pt-2 flex flex-col gap-4">
            <p className="text-xs text-slate-500 max-w-4xl mx-auto text-center leading-relaxed">
              <span className="text-slate-400 font-semibold uppercase tracking-wider mr-1">Disclaimer:</span> 
              ExportaMed is currently undergoing pre-commercial validation and corporate formation. This digital catalog serves exclusively as a portfolio showcase for market research and evaluation. No commercial distribution, data-selling, or trading is currently active.
            </p>
            <p className="text-center text-sm text-slate-500">
              © 2026 ExportaMed. All rights reserved.
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
