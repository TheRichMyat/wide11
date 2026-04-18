'use client';
import { useState, useEffect, useRef } from "react";

const P = {
  hero: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
  about: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
  stats: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200",
  h1: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
  h2: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
  off: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800",
  rest: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800",
  res: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
  mnt: "https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=800",
  pk: "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=800",
  fb: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
};

const YELLOW = "#ffc300";
const WHITE = "#ededed";
const FD = "'Playfair Display', Georgia, serif";
const FB = "'DM Sans', sans-serif";

function useC(theme) {
  if (theme === "dark") return { bg:"#0D0D0D", bg2:"#151515", bg3:"#1D1D1D", dark:"#0A0A0A", yellow:YELLOW, text:WHITE, text2:"#A8A19A", text3:"#6A655F", border:"#282828", card:"#1A1A1A" };
  return { bg:"#FFFFFF", bg2:"#F5F3F0", bg3:WHITE, dark:"#1B2230", yellow:YELLOW, text:"#2A2A2A", text2:"#5A5A5A", text3:"#9A9590", border:"#E0DCD6", card:"#FFFFFF" };
}

const TX = {
  en: {
    nav:{home:"Home",about:"About",services:"Services",careers:"Careers",portfolio:"Portfolio",contact:"Contact"},
    hero:{l1:"Crafting Spaces That",l2:"Tell Your Story",sub:"We transform ordinary spaces into extraordinary environments with our bespoke design solutions and expert craftsmanship.",cta:"View Our Portfolio"},
    stats:{a:"12+",al:"Years Experience",b:"400+",bl:"Projects Completed",c:"80\u201390",cl:"Team Members",d:"100%",dl:"Client Commitment"},
    about:{title:"Our Story",p1:"WIDE-ELEVEN CO., LTD. has been established since February of 2014, prioritizing in the industry of interior design & construction. We are committed to provide the best interior construction services to our clients by transforming their dreaming design of space into reality, within the budget and time frame as allowed.",p2:"Over the past 12 years, we have expanded gradually, and have been working on more than 400 projects to date, with an accumulative number of clients coming from the appraisal for our credibility, speed and quality of work.",ms:"Our Mission",mt:"To transform every client's vision into reality through exceptional craftsmanship, innovative design solutions, and unwavering commitment to quality \u2014 on time, within budget, and beyond expectations.",bg:"Years of Excellence"},
    cli:{title:"Our Clients & Partners"},
    svc:{title:"Our Expertise",items:[{t:"Design (Perspective & Shop Drawing) & Space Planning",d:"Perspective & shop drawings, space planning and design consultation tailored to your vision."},{t:"Interior Fitting Out",d:"Full interior fit-out services for residential, commercial, hospitality and retail spaces."},{t:"Refurnishing Works",d:"Professional refurnishing and upgrading works to breathe new life into existing spaces."},{t:"MEP Works (Mechanical, Electrical, Plumbing)",d:"Mechanical, electrical and plumbing works carried out by trained in-house specialists."},{t:"Consultation & Budget Estimation",d:"Expert consultation, advice, and accurate budget estimation for renovation and construction projects of any scale."}]},
    port:{title:"Featured Projects",all:"View All Projects",det:"View Details",at:"All Projects",as:"Explore our complete portfolio.",cat:"Category",yr:"Year",pd:"Period",sc:"Scope",cl:"Client",loc:"Location",cost:"Project Value",bk:"Back",imgs:"Project Gallery"},
    ct:{title:"Get In Touch",sub:"Tell us about your vision and we will bring it to life.",em:"Email Us",ca:"Call Us",vi:"Visit Us",fn:"Full Name *",fe:"Email Address *",fp:"Phone (optional)",fm:"Tell us about your project *",sn:"Send Message",st:"Message sent!",sg:"Sending..."},
    ft:{tg:"Transforming spaces, elevating lives since 2014.",th:"\u0E1A\u0E23\u0E34\u0E29\u0E31\u0E17 \u0E44\u0E27\u0E14\u0E4C-\u0E2D\u0E34\u0E40\u0E25\u0E1F\u0E40\u0E27\u0E48\u0E19 \u0E08\u0E33\u0E01\u0E31\u0E14",nv:"Navigation",co:"Contact",rg:"2026 Wide-Eleven Co., Ltd. All rights reserved."},
    ad:{ti:"Admin Panel",lg:"Admin Login",pw:"Password",en:"Enter",pr:"Projects",ct:"Clients",ca:"Categories",an:"Add New",ed:"Edit",dl:"Delete",sv:"Save",cn:"Cancel",bk:"Back to Site",pn:"Project Name",pc:"Category",py:"Year",pp:"Period",ps:"Scope",pcl:"Client",pl:"Location",pv:"Project Value",pi:"Cover Image",pd:"Description",cn2:"Client Name",cl:"Logo",up:"Upload",ou:"Or paste URL",np:"No projects yet.",nc:"No clients yet.",ac:"Add Category",acn:"Category Name",gi:"Gallery Images (up to 15)",addImg:"Add Image",rmImg:"Remove",ba:"Before/After Images",bab:"Before",baa:"After",bap:"Add Pair",bar:"Remove Pair",jb:"Careers",jt:"Job Title",jdp:"Department",jlc:"Location",jds:"Job Description",jrq:"Requirements (one per line)",jem:"Apply Email",iac:"Active",jin:"Inactive",tgl:"Toggle Active",nj:"No job postings yet."},
    careers:{title:"Join Our Team",sub:"We're looking for talented individuals to help us create extraordinary spaces.",none:"No open positions at this time. Please check back soon.",det:"View Details",apply:"Apply Now",bk:"Back to Careers",desc:"About This Role",reqs:"Requirements",cta:"Interested in this position?"}
  },
  th: {
    nav:{home:"หน้าแรก",about:"เกี่ยวกับเรา",services:"บริการ",careers:"ร่วมงานกับเรา",portfolio:"ผลงาน",contact:"ติดต่อ"},
    hero:{l1:"สร้างสรรค์พื้นที่",l2:"ที่บอกเล่าตัวตนของคุณ",sub:"เราเปลี่ยนพื้นที่ธรรมดาให้กลายเป็นสภาพแวดล้อมที่พิเศษ ด้วยโซลูชันการออกแบบเฉพาะตัวและฝีมือช่างระดับมืออาชีพ",cta:"ดูผลงานของเรา"},
    stats:{a:"12+",al:"ปีประสบการณ์",b:"400+",bl:"โครงการที่สำเร็จ",c:"80\u201390",cl:"สมาชิกทีมงาน",d:"100%",dl:"ความมุ่งมั่นต่อลูกค้า"},
    about:{title:"เรื่องราวของเรา",p1:"บริษัท ไวด์-อีเลฟเว่น จำกัด ก่อตั้งขึ้นเมื่อเดือนกุมภาพันธ์ พ.ศ. 2557 โดยมุ่งเน้นในอุตสาหกรรมออกแบบและก่อสร้างตกแต่งภายใน เรามุ่งมั่นมอบบริการก่อสร้างตกแต่งภายในที่ดีที่สุดให้กับลูกค้า โดยเปลี่ยนการออกแบบพื้นที่ในฝันให้กลายเป็นความจริง ภายใต้งบประมาณและกรอบเวลาที่กำหนด",p2:"ตลอดระยะเวลากว่า 12 ปีที่ผ่านมา เราเติบโตอย่างต่อเนื่อง และได้ดำเนินงานมากกว่า 400 โครงการจนถึงปัจจุบัน ด้วยจำนวนลูกค้าที่เพิ่มขึ้นจากการยอมรับในความน่าเชื่อถือ ความรวดเร็ว และคุณภาพของงาน",ms:"พันธกิจของเรา",mt:"เปลี่ยนวิสัยทัศน์ของลูกค้าทุกรายให้เป็นจริง ด้วยฝีมือช่างชั้นยอด โซลูชันการออกแบบที่สร้างสรรค์ และความมุ่งมั่นในคุณภาพอย่างไม่ลดละ \u2014 ตรงเวลา ตามงบประมาณ และเหนือความคาดหมาย",bg:"ปีแห่งความเป็นเลิศ"},
    cli:{title:"ลูกค้าและพันธมิตรของเรา"},
    svc:{title:"ความเชี่ยวชาญของเรา",items:[{t:"ออกแบบ (Perspective & Shop Drawing) และวางผังพื้นที่",d:"งานเขียนแบบ Perspective และ Shop Drawing วางผังพื้นที่ และให้คำปรึกษาด้านการออกแบบที่ตรงตามวิสัยทัศน์ของคุณ"},{t:"งานตกแต่งภายใน",d:"บริการตกแต่งภายในครบวงจร สำหรับที่อยู่อาศัย อาคารพาณิชย์ โรงแรม และร้านค้าปลีก"},{t:"งานรีเฟอร์นิช",d:"งานปรับปรุงและอัพเกรดอย่างมืออาชีพ เพื่อเติมชีวิตใหม่ให้กับพื้นที่เดิมของคุณ"},{t:"งานระบบ MEP (เครื่องกล ไฟฟ้า ประปา)",d:"งานระบบเครื่องกล ไฟฟ้า และประปา ดำเนินการโดยทีมผู้เชี่ยวชาญเฉพาะทางภายในบริษัท"},{t:"ที่ปรึกษาและประมาณราคา",d:"บริการให้คำปรึกษาจากผู้เชี่ยวชาญ พร้อมประมาณราคาอย่างแม่นยำ สำหรับโครงการปรับปรุงและก่อสร้างทุกขนาด"}]},
    port:{title:"โครงการเด่น",all:"ดูโครงการทั้งหมด",det:"ดูรายละเอียด",at:"โครงการทั้งหมด",as:"สำรวจผลงานทั้งหมดของเรา",cat:"ประเภท",yr:"ปี",pd:"ระยะเวลา",sc:"ขอบเขตงาน",cl:"ลูกค้า",loc:"สถานที่",cost:"มูลค่าโครงการ",bk:"กลับ",imgs:"แกลเลอรีโครงการ"},
    ct:{title:"ติดต่อเรา",sub:"บอกเล่าวิสัยทัศน์ของคุณ แล้วเราจะทำให้เป็นจริง",em:"อีเมล",ca:"โทรศัพท์",vi:"ที่อยู่",fn:"ชื่อ-นามสกุล *",fe:"อีเมล *",fp:"เบอร์โทรศัพท์ (ไม่บังคับ)",fm:"เล่าให้เราฟังเกี่ยวกับโครงการของคุณ *",sn:"ส่งข้อความ",st:"ส่งข้อความสำเร็จ!",sg:"กำลังส่ง..."},
    ft:{tg:"เปลี่ยนพื้นที่ ยกระดับชีวิต ตั้งแต่ พ.ศ. 2557",th:"บริษัท ไวด์-อีเลฟเว่น จำกัด",nv:"เมนู",co:"ติดต่อ",rg:"\u00A9 2569 บริษัท ไวด์-อีเลฟเว่น จำกัด สงวนลิขสิทธิ์"},
    ad:{ti:"แผงควบคุม",lg:"เข้าสู่ระบบผู้ดูแล",pw:"รหัสผ่าน",en:"เข้าสู่ระบบ",pr:"โครงการ",ct:"ลูกค้า",ca:"ประเภท",an:"เพิ่มใหม่",ed:"แก้ไข",dl:"ลบ",sv:"บันทึก",cn:"ยกเลิก",bk:"กลับหน้าเว็บ",pn:"ชื่อโครงการ",pc:"ประเภท",py:"ปี",pp:"ระยะเวลา",ps:"ขอบเขตงาน",pcl:"ลูกค้า",pl:"สถานที่",pv:"มูลค่าโครงการ",pi:"รูปปก",pd:"รายละเอียด",cn2:"ชื่อลูกค้า",cl:"โลโก้",up:"อัปโหลด",ou:"หรือวาง URL",np:"ยังไม่มีโครงการ",nc:"ยังไม่มีลูกค้า",ac:"เพิ่มประเภท",acn:"ชื่อประเภท",gi:"รูปแกลเลอรี (สูงสุด 15 รูป)",addImg:"เพิ่มรูป",rmImg:"ลบ",ba:"รูปก่อน/หลัง",bab:"ก่อน",baa:"หลัง",bap:"เพิ่มคู่",bar:"ลบคู่",jb:"งาน",jt:"ตำแหน่งงาน",jdp:"แผนก",jlc:"สถานที่",jds:"รายละเอียดงาน",jrq:"คุณสมบัติ (บรรทัดละหนึ่งข้อ)",jem:"อีเมลสมัครงาน",iac:"เปิดรับ",jin:"ปิดรับ",tgl:"สลับสถานะ",nj:"ยังไม่มีตำแหน่งงาน"},
    careers:{title:"ร่วมทีมกับเรา",sub:"เรากำลังมองหาผู้มีความสามารถมาร่วมสร้างสรรค์พื้นที่ที่ยอดเยี่ยมด้วยกัน",none:"ขณะนี้ยังไม่มีตำแหน่งงานที่เปิดรับ โปรดติดตามการอัปเดตจากเรา",det:"ดูรายละเอียด",apply:"สมัครเลย",bk:"กลับไปหน้างาน",desc:"เกี่ยวกับตำแหน่งนี้",reqs:"คุณสมบัติ",cta:"สนใจตำแหน่งนี้?"}
  }
};

const DEM_P = [
  {id:"1",name:"Interior Fitting-Out AVC Guestroom",category:"Hotel Projects",year:"2016",scope:"Demolition, Fitting-Out",client:"Anantara Vacation Club",location:"Bangkok",cost:"2,500,000",image:P.h1,gallery:[P.h1,P.h2,P.res],description:"Complete interior renovation of luxury guestroom units."},
  {id:"2",name:"Lobby and Reception Park Hyatt",category:"Hotel Projects",year:"2019",scope:"Fitting-Out, MEP",client:"Park Hyatt Bangkok",location:"Ploenchit",cost:"8,500,000",image:P.h2,gallery:[P.h2,P.pk],description:"Full lobby renovation for Park Hyatt Bangkok."},
  {id:"3",name:"Corporate Office Sathorn Tower",category:"Commercial",year:"2021",scope:"Design, Construction, MEP",client:"Sathorn Business Group",location:"Sathorn",cost:"12,000,000",image:P.off,gallery:[P.off],description:"Modern open-plan office with integrated MEP."},
  {id:"4",name:"Fine Dining Restaurant Sukhumvit",category:"F&B",year:"2022",scope:"Design, Fitting-Out",client:"Siam Gastronomy",location:"Sukhumvit",cost:"4,200,000",image:P.rest,gallery:[P.rest,P.res],description:"Elegant restaurant with custom millwork."},
  {id:"5",name:"Luxury Residence Thonglor",category:"Residential",year:"2023",scope:"Design, Refurnishing",client:"Private Client",location:"Thonglor",cost:"6,800,000",image:P.res,gallery:[P.res,P.h1,P.off],description:"Full renovation with high-end finishes."},
  {id:"6",name:"Rosewood Bangkok Maintenance",category:"Hotel Projects",year:"2024",scope:"Building Maintenance",client:"Rosewood Bangkok",location:"Ploenchit",cost:"N/A",image:P.mnt,gallery:[P.mnt],description:"Skilled daily manpower as hotel maintenance team."}
];
const DEM_C = [{id:"1",name:"Park Hyatt Bangkok",logo:P.pk},{id:"2",name:"Rosewood Bangkok",logo:P.mnt},{id:"3",name:"Anantara Riverside",logo:P.h1},{id:"4",name:"Sathorn Business Group",logo:P.off}];
const DEF_CATS = ["Hotel Projects","Office Projects","Fitness Center Extension Projects"];

import { api } from '@/lib/api-client';

function f2b(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file)})}
// Intersection observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.7s ease " + delay + "s, transform 0.7s ease " + delay + "s" }}>
      {children}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home");
  const [selP, setSelP] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const [projects, setProjects] = useState(DEM_P);
  const [clients, setClients] = useState(DEM_C);
  const [cats, setCats] = useState(DEF_CATS);
  const [jobs, setJobs] = useState([]);
  const [auth, setAuth] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const wr = useRef(null);
  const t = TX[lang];
  const c = useC(theme);

  useEffect(() => { setTimeout(() => setPageLoading(false), 600); }, []);
  useEffect(() => {
    (async () => {
      try {
        const [pp, cc, ca, jj] = await Promise.all([
          api.getProjects().catch(() => null),
          api.getClients().catch(() => null),
          api.getCategories().catch(() => null),
          api.getJobs().catch(() => null),
        ]);
        if (pp && pp.length > 0) setProjects(pp);
        if (cc && cc.length > 0) setClients(cc);
        if (ca && ca.length > 0) setCats(ca.map(c => c.name || c));
        if (jj) setJobs(jj);
      } catch (e) { console.error('Failed to load data:', e); }
      setLoaded(true);
    })();
  }, []);
  // No more save-on-change — data is persisted via API calls in admin
  useEffect(() => { const el = wr.current; if (!el) return; const h = () => setScrolled(el.scrollTop > 50); el.addEventListener("scroll", h); return () => el.removeEventListener("scroll", h); }, []);

  const go = (pg, pr) => { setPage(pg); setSelP(pr || null); setMob(false); setTimeout(() => { if (wr.current) wr.current.scrollTop = 0; }, 10); };
  const scrollTo = (id) => { setMob(false); if (page !== "home") { setPage("home"); setTimeout(() => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 150); } else { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); } };

  // Page load overlay
  if (pageLoading) return (
    <div style={{ fontFamily: FB, background: "#0D0D0D", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
      <div style={{ fontFamily: FD, fontSize: "1.8rem", fontWeight: 700, color: YELLOW, letterSpacing: "2px" }}>W</div>
      <div style={{ width: 40, height: 2, background: YELLOW, animation: "pulse 1.2s infinite" }} />
    </div>
  );

  const isHome = page === "home";
  const navSolid = scrolled || !isHome;
  const navBg = navSolid ? (theme === "light" ? "#FFFFFF" : "#0D0D0D") : "transparent";

  if (page === "admin") return (
    <div ref={wr} style={{ fontFamily: FB, background: c.bg, color: c.text, height: "100vh", overflowY: "auto" }}>
      <Fonts /><Admin t={t} c={c} theme={theme} projects={projects} setProjects={setProjects} clients={clients} setClients={setClients} cats={cats} setCats={setCats} jobs={jobs} setJobs={setJobs} auth={auth} setAuth={setAuth} onBack={() => go("home")} />
    </div>
  );

  return (
    <div ref={wr} style={{ fontFamily: FB, background: c.bg, color: c.text, height: "100vh", overflowY: "auto", transition: "background .4s, color .4s" }}>
      <Fonts />
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "0.7rem 6%", display: "flex", alignItems: "center", justifyContent: "space-between", background: theme === "light" ? "#FFFFFF" : "#0D0D0D", borderBottom: "1px solid " + c.border, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <a onClick={() => go("home")} style={{ cursor: "pointer", textDecoration: "none" }}>
          <span style={{ fontFamily: FD, fontSize: "clamp(0.75rem, 2.5vw, 1.1rem)", fontWeight: 700, color: c.text }}><span style={{ fontSize: "clamp(0.9rem, 3vw, 1.35rem)" }}>W</span>IDE-ELEVEN CO., LTD.</span>
        </a>
        <div className="dknv" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {["home","about","services"].map(id => <a key={id} onClick={() => scrollTo(id)} style={{ fontSize: "0.78rem", fontWeight: 500, color: c.text2, textDecoration: "none", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}>{t.nav[id]}</a>)}
          <a onClick={() => go("careers")} style={{ fontSize: "0.78rem", fontWeight: 500, color: c.text2, textDecoration: "none", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}>{t.nav.careers}</a>
          <a onClick={() => go("portfolio")} style={{ fontSize: "0.78rem", fontWeight: 500, color: c.text2, textDecoration: "none", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}>{t.nav.portfolio}</a>
          <a onClick={() => scrollTo("contact")} style={{ fontSize: "0.78rem", fontWeight: 500, color: c.text2, textDecoration: "none", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer" }}>{t.nav.contact}</a>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button onClick={() => setLang(l => l === "en" ? "th" : "en")} style={{ background: "none", border: "1px solid " + c.border, color: c.text, fontFamily: FB, fontSize: "0.72rem", padding: "5px 10px", cursor: "pointer", letterSpacing: "1px", fontWeight: 500, borderRadius: 3 }}>{lang === "en" ? "\u0E44\u0E17\u0E22" : "EN"}</button>
          <button onClick={() => setTheme(x => x === "light" ? "dark" : "light")} style={{ background: "none", border: "1px solid " + c.border, color: c.text, fontSize: "0.9rem", padding: "4px 8px", cursor: "pointer", borderRadius: 3 }}>{theme === "light" ? "\u263E" : "\u2600"}</button>
          <button className="mbt" onClick={() => setMob(true)} style={{ display: "none", background: "none", border: "none", color: c.text, fontSize: "1.4rem", cursor: "pointer" }}>{"\u2630"}</button>
        </div>
      </nav>

      {mob && <div style={{ position: "fixed", inset: 0, background: theme === "light" ? "rgba(255,255,255,.97)" : "rgba(13,13,13,.97)", backdropFilter: "blur(20px)", zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.8rem" }}>
        <button onClick={() => setMob(false)} style={{ position: "absolute", top: "1.2rem", right: "1.5rem", background: "none", border: "none", color: c.text, fontSize: "1.8rem", cursor: "pointer" }}>{"\u2715"}</button>
        {["home","about","services"].map(id => <a key={id} onClick={() => scrollTo(id)} style={{ fontFamily: FD, fontSize: "1.6rem", color: c.text, textDecoration: "none", cursor: "pointer" }}>{t.nav[id]}</a>)}
        <a onClick={() => go("careers")} style={{ fontFamily: FD, fontSize: "1.6rem", color: c.text, textDecoration: "none", cursor: "pointer" }}>{t.nav.careers}</a>
        <a onClick={() => go("portfolio")} style={{ fontFamily: FD, fontSize: "1.6rem", color: c.text, textDecoration: "none", cursor: "pointer" }}>{t.nav.portfolio}</a>
        <a onClick={() => scrollTo("contact")} style={{ fontFamily: FD, fontSize: "1.6rem", color: c.text, textDecoration: "none", cursor: "pointer" }}>{t.nav.contact}</a>
      </div>}

      {page === "home" && <HomePage t={t} c={c} theme={theme} projects={projects} clients={clients} onAll={() => go("portfolio")} onProj={p => go("project", p)} />}
      {page === "portfolio" && <AllProjects t={t} c={c} projects={projects} cats={cats} onProj={p => go("project", p)} onBack={() => go("home")} />}
      {page === "project" && selP && <ProjDetail t={t} c={c} theme={theme} project={selP} onBack={() => go("portfolio")} />}
      {page === "careers" && <CareersPage t={t} c={c} theme={theme} jobs={jobs} onJob={j => go("job", j)} />}
      {page === "job" && selP && <JobDetail t={t} c={c} theme={theme} job={selP} onBack={() => go("careers")} />}
      <ChatWidget />

      <footer style={{ padding: "3rem 6% 1.5rem", borderTop: "1px solid " + c.border, background: c.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr", gap: "2.5rem", marginBottom: "2rem" }} className="fgr">
          <div><div style={{ fontFamily: FD, fontSize: "1rem", fontWeight: 700, color: c.text, marginBottom: "0.4rem" }}><span style={{ fontSize: "1.2rem" }}>W</span>IDE-ELEVEN CO., LTD.</div><p style={{ fontSize: "0.8rem", color: c.text2, lineHeight: 1.7 }}>{t.ft.tg}</p><p style={{ fontSize: "0.72rem", color: c.text3 }}>{t.ft.th}</p></div>
          <div><h5 style={{ fontSize: "0.66rem", letterSpacing: "2px", color: YELLOW, textTransform: "uppercase", marginBottom: "0.6rem", fontWeight: 600 }}>{t.ft.nv}</h5>{["home","about","services","contact"].map(id => <a key={id} onClick={() => scrollTo(id)} style={{ display: "block", fontSize: "0.8rem", color: c.text2, textDecoration: "none", padding: "0.1rem 0", cursor: "pointer" }}>{t.nav[id]}</a>)}<a onClick={() => go("portfolio")} style={{ display: "block", fontSize: "0.8rem", color: c.text2, textDecoration: "none", padding: "0.1rem 0", cursor: "pointer" }}>{t.nav.portfolio}</a><a onClick={() => go("careers")} style={{ display: "block", fontSize: "0.8rem", color: c.text2, textDecoration: "none", padding: "0.1rem 0", cursor: "pointer" }}>{t.nav.careers}</a></div>
          <div><h5 style={{ fontSize: "0.66rem", letterSpacing: "2px", color: YELLOW, textTransform: "uppercase", marginBottom: "0.6rem", fontWeight: 600 }}>{t.ft.co}</h5><p style={{ fontSize: "0.78rem", color: c.text2, lineHeight: 1.8 }}>Tel: 02-409-2308<br />wide11bangkok@gmail.com<br />8/110 Soi Thian Talay 7<br />Bang Khun Thian, Bangkok 10150</p></div>
        </div>
        <div style={{ textAlign: "center", paddingTop: "1rem", borderTop: "1px solid " + c.border }}><p style={{ fontSize: "0.68rem", color: c.text3 }}>{t.ft.rg}</p><a onClick={() => go("admin")} style={{ fontSize: "0.6rem", color: c.text3, textDecoration: "none", cursor: "pointer" }}>Admin</a></div>
      </footer>
    </div>
  );
}

function Fonts() { return null; }

function HomePage({ t, c, theme, projects, clients, onAll, onProj }) {
  return <div>
    {/* HERO */}
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 6%", position: "relative", backgroundImage: "url(" + P.hero + ")", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,.7) 0%, rgba(0,0,0,.4) 60%, rgba(0,0,0,.25) 100%)" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 620, paddingTop: "5rem" }}>
        <Reveal><h1 style={{ fontFamily: FD, fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)", fontWeight: 700, lineHeight: 1.1, color: "#fff", marginBottom: "1.5rem" }}>{t.hero.l1}<br />{t.hero.l2}</h1></Reveal>
        <Reveal delay={0.15}><p style={{ fontSize: "1rem", color: "rgba(255,255,255,.82)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 480 }}>{t.hero.sub}</p></Reveal>
        <Reveal delay={0.3}><button onClick={onAll} style={{ padding: "1rem 2.5rem", background: YELLOW, color: "#111", fontFamily: FB, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", border: "none", cursor: "pointer" }}>{t.hero.cta}</button></Reveal>
      </div>
    </section>

    {/* STATS */}
    <section style={{ background: c.dark, padding: "4rem 6%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(" + P.stats + ")", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.12 }} />
      <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }} className="sgr">
        {[[t.stats.a, t.stats.al], [t.stats.b, t.stats.bl], [t.stats.c, t.stats.cl], [t.stats.d, t.stats.dl]].map(([v, l], i) => (
          <Reveal key={i} delay={i * 0.1}><div><div style={{ fontFamily: FD, fontSize: "clamp(2rem, 3.5vw, 3.2rem)", fontWeight: 600, color: YELLOW }}>{v}</div><div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,.55)", letterSpacing: "3px", textTransform: "uppercase", marginTop: ".4rem" }}>{l}</div></div></Reveal>
        ))}
      </div>
    </section>

    {/* ABOUT */}
    <section id="about" style={{ background: c.bg2, padding: "5.5rem 6%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "center" }} className="hgr">
        <Reveal><div style={{ position: "relative" }}>
          <img src={P.about} alt="Interior" style={{ width: "100%", display: "block" }} />
        </div></Reveal>
        <Reveal delay={0.2}><div>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 600, marginBottom: "1.2rem", color: c.text }}>{t.about.title}</h2>
          <p style={{ fontSize: "0.92rem", color: c.text2, lineHeight: 1.8, marginBottom: "1rem" }}>{t.about.p1}</p>
          <p style={{ fontSize: "0.92rem", color: c.text2, lineHeight: 1.8, marginBottom: "1.5rem" }}>{t.about.p2}</p>
          <div style={{ borderLeft: "3px solid " + YELLOW, padding: "1.2rem 1.5rem", background: theme === "light" ? "#fff" : c.bg3, borderRadius: "0 6px 6px 0" }}>
            <div style={{ fontSize: "0.68rem", letterSpacing: "2px", textTransform: "uppercase", color: c.text3, marginBottom: ".4rem", fontWeight: 600 }}>{t.about.ms}</div>
            <p style={{ fontFamily: FD, fontSize: "1rem", color: c.text, lineHeight: 1.7 }}>{t.about.mt}</p>
          </div>
        </div></Reveal>
      </div>
    </section>

    {/* CLIENTS */}
    <Reveal><section id="clients" style={{ background: c.bg, padding: "4.5rem 6%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: FD, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 600, marginBottom: ".4rem" }}>{t.cli.title}</h2>
        <div style={{ width: 45, height: 3, background: YELLOW, margin: ".6rem auto 2rem", borderRadius: 2 }} />
        <Carousel clients={clients} c={c} />
      </div>
    </section></Reveal>

    {/* SERVICES */}
    <section id="services" style={{ background: c.bg2, padding: "5.5rem 6%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <Reveal><h2 style={{ fontFamily: FD, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 600, marginBottom: ".4rem" }}>{t.svc.title}</h2><div style={{ width: 45, height: 3, background: YELLOW, margin: ".6rem auto 2.5rem", borderRadius: 2 }} /></Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", justifyContent: "center" }} className="svcgr">
          {t.svc.items.map((s, i) => (
            <Reveal key={i} delay={i * 0.05} style={{ width: "calc(33.333% - 0.8rem)", minWidth: 250 }}><div style={{ background: theme === "light" ? "#fff" : c.bg3, padding: "1.8rem 1.3rem", borderRadius: 10, textAlign: "left", border: "1px solid " + c.border, transition: "transform .3s", cursor: "default", height: "100%" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(255,195,0,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#b8920a", marginBottom: "1rem", fontSize: "1.1rem", fontWeight: 700, fontFamily: FD }}>{String(i + 1).padStart(2, "0")}</div>
              <h3 style={{ fontFamily: FD, fontSize: "1.05rem", fontWeight: 600, marginBottom: ".5rem", color: c.text }}>{s.t}</h3>
              <p style={{ fontSize: "0.82rem", color: c.text2, lineHeight: 1.7 }}>{s.d}</p>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* PORTFOLIO */}
    <section id="portfolio" style={{ background: c.dark, padding: "5.5rem 6%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 600, color: "#fff", marginBottom: ".4rem" }}>{t.port.title}</h2>
          <div style={{ width: 45, height: 3, background: YELLOW, margin: ".6rem auto 0", borderRadius: 2 }} />
        </div></Reveal>
        <PortfolioSlider projects={projects} onProj={onProj} t={t} />
        <Reveal><div style={{ textAlign: "center", marginTop: "2rem" }}><a onClick={onAll} style={{ fontSize: "0.82rem", color: YELLOW, textDecoration: "none", cursor: "pointer", letterSpacing: "1px" }}>{t.port.all} {"\u2192"}</a></div></Reveal>
      </div>
    </section>

    {/* CONTACT */}
    <section id="contact" style={{ background: c.bg, padding: "5.5rem 6%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><div style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 600, marginBottom: ".4rem" }}>{t.ct.title}</h2>
          <div style={{ width: 45, height: 3, background: YELLOW, margin: ".6rem 0 .8rem", borderRadius: 2 }} />
          <p style={{ fontSize: "0.92rem", color: c.text2 }}>{t.ct.sub}</p>
        </div></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem", alignItems: "start" }} className="cgr">
          <Reveal delay={0.1}><div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
            {[[t.ct.ca, "02-409-2308"], [t.ct.em, "wide11bangkok@gmail.com"], [t.ct.vi, "8/110 Soi Thian Talay 7 (Soi Tientalay 7), Bang Khun Thian, Bangkok 10150"]].map(([lb, val]) => (
              <div key={lb}>
                <h4 style={{ fontSize: "0.68rem", letterSpacing: "2px", color: YELLOW, textTransform: "uppercase", marginBottom: ".4rem", fontWeight: 600 }}>{lb}</h4>
                <p style={{ fontSize: "0.92rem", color: c.text2, lineHeight: 1.7 }}>{val}</p>
              </div>
            ))}
          </div></Reveal>
          <Reveal delay={0.2}><CForm t={t} c={c} /></Reveal>
        </div>
      </div>
    </section>
  </div>;
}

function PortfolioSlider({ projects, onProj, t }) {
  const scrollRef = useRef(null);
  const scrollBy = (dir) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector('.pcard');
    const w = card ? card.offsetWidth + 16 : 300;
    scrollRef.current.scrollBy({ left: dir * w, behavior: 'smooth' });
  };
  const items = projects.slice(0, 3);
  return (
    <div style={{ position: "relative" }}>
      <div ref={scrollRef} className="pgr" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
        {items.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1}><div className="pcard" onClick={() => onProj(p)} style={{ background: "#222", borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "transform .3s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
            <div style={{ overflow: "hidden", height: 220 }}><img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s" }} onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; }} onMouseLeave={e => { e.target.style.transform = ""; }} onError={e => { e.target.src = P.fb; }} /></div>
            <div style={{ padding: "1.3rem" }}>
              <h3 style={{ fontFamily: FD, fontSize: "1.08rem", fontWeight: 600, color: "#fff", marginBottom: ".4rem", lineHeight: 1.3 }}>{p.name}</h3>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,.5)", marginBottom: "1.1rem" }}>{(p.description || "").substring(0, 55)}...</p>
              <div style={{ display: "inline-block", padding: ".55rem 1.8rem", border: "1px solid rgba(255,255,255,.25)", color: "#fff", fontSize: "0.7rem", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500 }}>{t.port.det}</div>
            </div>
          </div></Reveal>
        ))}
      </div>
      <div className="pslnav" style={{ display: "none", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={() => scrollBy(-1)} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.25)", color: "#fff", fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>&#8249;</button>
        <button onClick={() => scrollBy(1)} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.25)", color: "#fff", fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>&#8250;</button>
      </div>
    </div>
  );
}

function Carousel({ clients, c }) {
  if (!clients.length) return null;
  const doubled = [...clients, ...clients];
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div style={{
        display: "flex",
        gap: "2.5rem",
        animation: "marquee " + (clients.length * 4) + "s linear infinite",
        width: "max-content"
      }}>
        {doubled.map((cl, i) => (
          <div key={cl.id + "-" + i} style={{ flex: "0 0 180px", textAlign: "center" }}>
            <div style={{
              height: 80, border: "1px solid " + c.border, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: ".8rem", background: c.bg2, overflow: "hidden"
            }}>
              <img src={cl.logo} alt={cl.name} style={{
                maxWidth: "100%", maxHeight: "100%", objectFit: "contain",
                filter: "grayscale(100%)", transition: "filter .3s"
              }}
                onMouseEnter={e => { e.target.style.filter = "none"; }}
                onMouseLeave={e => { e.target.style.filter = "grayscale(100%)"; }}
                onError={e => { e.target.style.display = "none"; }}
              />
            </div>
            <div style={{
              fontSize: "0.65rem", color: c.text3, marginTop: ".4rem",
              letterSpacing: "1px", textTransform: "uppercase"
            }}>{cl.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CForm({ t, c }) {
  const [f, sF] = useState({ name: "", email: "", phone: "", msg: "" });
  const [st, sSt] = useState("idle");
  const go = async () => {
    if (!f.name || !f.email || !f.msg) return;
    sSt("sending");
    try {
      await api.sendContact({ name: f.name, email: f.email, phone: f.phone, message: f.msg });
      sSt("sent");
      setTimeout(() => { sSt("idle"); sF({ name: "", email: "", phone: "", msg: "" }); }, 3500);
    } catch (e) {
      sSt("idle");
      alert("Failed to send message. Please try again or email us directly.");
    }
  };
  const iS = { width: "100%", padding: ".82rem 1rem", background: c.bg2, border: "1px solid " + c.border, color: c.text, fontFamily: FB, fontSize: ".88rem", borderRadius: 5 };
  return <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <input style={iS} placeholder={t.ct.fn} value={f.name} onChange={e => sF(x => ({ ...x, name: e.target.value }))} />
    <input style={iS} type="email" placeholder={t.ct.fe} value={f.email} onChange={e => sF(x => ({ ...x, email: e.target.value }))} />
    <input style={iS} placeholder={t.ct.fp} value={f.phone} onChange={e => sF(x => ({ ...x, phone: e.target.value }))} />
    <textarea style={{ ...iS, minHeight: 120, resize: "vertical" }} placeholder={t.ct.fm} value={f.msg} onChange={e => sF(x => ({ ...x, msg: e.target.value }))} />
    {st === "sent" ? <div style={{ padding: ".8rem", background: "rgba(255,195,0,.1)", border: "1px solid " + YELLOW, borderRadius: 5, color: "#b8920a", textAlign: "center", fontSize: ".88rem" }}>{t.ct.st}</div>
    : <button onClick={go} disabled={st === "sending"} style={{ alignSelf: "flex-start", padding: ".85rem 2.2rem", background: YELLOW, color: "#111", fontFamily: FB, fontSize: ".78rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 3, opacity: st === "sending" ? 0.6 : 1 }}>{st === "sending" ? t.ct.sg : t.ct.sn}</button>}
  </div>;
}

function AllProjects({ t, c, projects, cats, onProj, onBack }) {
  const [filter, setFilter] = useState("All");
  const allCats = ["All", ...cats];
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);
  return <div style={{ paddingTop: "7rem" }}>
    <div style={{ textAlign: "center", padding: "0 6% 1.5rem" }}>
    <button onClick={onBack} style={{ padding: ".5rem 1.5rem", background: "#111", color: YELLOW, border: "none", fontFamily: FB, fontSize: ".78rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", borderRadius: 3 }}>{"\u2190 " + t.port.bk}</button>
      <h1 style={{ fontFamily: FD, fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 600, margin: ".8rem 0 .4rem" }}>{t.port.at}</h1>
      <p style={{ color: c.text2, fontSize: ".9rem" }}>{t.port.as}</p>
    </div>
    <div style={{ display: "flex", gap: ".4rem", justifyContent: "center", flexWrap: "wrap", padding: "0 6% 2rem" }}>
      {allCats.map(cat => <button key={cat} onClick={() => setFilter(cat)} style={{ padding: ".4rem 1rem", background: filter === cat ? YELLOW : "transparent", border: "1px solid " + (filter === cat ? YELLOW : c.border), color: filter === cat ? "#111" : c.text2, fontFamily: FB, fontSize: ".7rem", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", borderRadius: 3, fontWeight: filter === cat ? 700 : 400 }}>{cat}</button>)}
    </div>
    <div style={{ padding: "0 6% 4rem", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "1.3rem" }}>
        {filtered.map((p, i) => <Reveal key={p.id} delay={i * 0.05}><div onClick={() => onProj(p)} style={{ border: "1px solid " + c.border, borderRadius: 10, overflow: "hidden", cursor: "pointer", background: c.bg2, transition: "transform .3s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
          <img src={p.image} alt={p.name} style={{ width: "100%", height: 200, objectFit: "cover" }} onError={e => { e.target.src = P.fb; }} />
          <div style={{ padding: "1.1rem" }}>
            <div style={{ fontSize: ".62rem", color: YELLOW, letterSpacing: "2px", textTransform: "uppercase", marginBottom: ".3rem" }}>{p.category}</div>
            <h3 style={{ fontFamily: FD, fontSize: "1rem", fontWeight: 600, marginBottom: ".6rem", lineHeight: 1.3, color: c.text }}>{p.name}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: ".15rem .6rem", fontSize: ".72rem" }}>
              <span style={{ color: c.text3, textTransform: "uppercase", letterSpacing: "1px" }}>{t.port.yr}</span><span style={{ color: c.text2 }}>{p.year}</span>
              {p.period && <><span style={{ color: c.text3, textTransform: "uppercase", letterSpacing: "1px" }}>{t.port.pd}</span><span style={{ color: c.text2 }}>{p.period}</span></>}
              <span style={{ color: c.text3, textTransform: "uppercase", letterSpacing: "1px" }}>{t.port.sc}</span><span style={{ color: c.text2 }}>{p.scope}</span>
              {p.cost && <><span style={{ color: c.text3, textTransform: "uppercase", letterSpacing: "1px" }}>{t.port.cost}</span><span style={{ color: c.text2 }}>{p.cost}</span></>}
            </div>
          </div>
        </div></Reveal>)}
      </div>
    </div>
  </div>;
}

function ProjDetail({ t, c, theme, project, onBack }) {
  const [activeImg, setActiveImg] = useState(0);
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const prev = () => setActiveImg(i => (i - 1 + gallery.length) % gallery.length);
  const next = () => setActiveImg(i => (i + 1) % gallery.length);

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (gallery.length <= 1) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gallery.length]);

  return <div style={{ paddingTop: "7rem", maxWidth: 900, margin: "0 auto", padding: "7rem 6% 4rem" }}>
    <button onClick={onBack} style={{ padding: ".5rem 1.5rem", background: "#111", color: YELLOW, border: "none", fontFamily: FB, fontSize: ".78rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", borderRadius: 3 }}>{"\u2190 " + t.port.bk}</button>
    <Reveal>
      <div style={{ position: "relative", marginTop: "1.2rem", marginBottom: "1rem", maxHeight: 500, display: "flex", alignItems: "center", justifyContent: "center", background: "#000", borderRadius: 8, overflow: "hidden" }}>
        <img src={gallery[activeImg] || project.image} alt={project.name} style={{ maxWidth: "100%", maxHeight: 500, objectFit: "contain", display: "block", transition: "opacity .3s" }} onError={e => { e.target.src = P.fb; }} />
      </div>
      {gallery.length > 1 && <div style={{ display: "flex", alignItems: "center", gap: ".8rem", marginBottom: "1rem" }}>
        <button onClick={prev} style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: theme === "light" ? c.bg2 : "rgba(255,255,255,.1)", border: "1px solid " + c.border, color: c.text, fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>&#8249;</button>
        <div style={{ flex: 1, display: "flex", gap: ".4rem", overflowX: "auto", paddingBottom: ".3rem", scrollbarWidth: "none" }}>
          {gallery.map((img, i) => <img key={i} src={img} alt="" onClick={() => setActiveImg(i)} style={{ flexShrink: 0, width: 64, height: 48, objectFit: "cover", borderRadius: 4, cursor: "pointer", border: i === activeImg ? "2px solid " + YELLOW : "2px solid transparent", opacity: i === activeImg ? 1 : 0.5, transition: "all .2s" }} onError={e => { e.target.style.display = "none"; }} />)}
        </div>
        <button onClick={next} style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: theme === "light" ? c.bg2 : "rgba(255,255,255,.1)", border: "1px solid " + c.border, color: c.text, fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>&#8250;</button>
      </div>}
    </Reveal>
    <Reveal delay={0.1}>
      <h1 style={{ fontFamily: FD, fontSize: "2rem", fontWeight: 600, marginBottom: "1.2rem" }}>{project.name}</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1.2rem", padding: "1.2rem 0", borderTop: "1px solid " + c.border, borderBottom: "1px solid " + c.border, marginBottom: "1.5rem" }}>
        {[[t.port.cat, project.category], [t.port.yr, project.year], ...(project.period ? [[t.port.pd, project.period]] : []), [t.port.sc, project.scope], [t.port.cl, project.client], [t.port.loc, project.location], [t.port.cost, project.cost || "N/A"]].map(([l, v]) => <div key={l}><div style={{ fontSize: ".65rem", color: c.text3, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: ".15rem" }}>{l}</div><div style={{ fontSize: ".92rem", color: c.text }}>{v}</div></div>)}
      </div>
      <p style={{ fontSize: ".95rem", color: c.text2, lineHeight: 1.8 }}>{project.description}</p>
      {project.before_after && project.before_after.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontFamily: FD, fontSize: "1.3rem", fontWeight: 600, marginBottom: "1rem", color: c.text }}>Before &amp; After</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {project.before_after.map((pair, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="hgr">
                <div>
                  <div style={{ fontSize: ".65rem", letterSpacing: "2px", textTransform: "uppercase", color: c.text3, marginBottom: ".4rem", fontWeight: 600 }}>Before</div>
                  {pair.before ? <img src={pair.before} alt="Before" style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid " + c.border }} onError={e => { e.target.style.display = "none"; }} /> : <div style={{ height: 160, background: c.bg2, borderRadius: 8, border: "1px dashed " + c.border }} />}
                </div>
                <div>
                  <div style={{ fontSize: ".65rem", letterSpacing: "2px", textTransform: "uppercase", color: c.text3, marginBottom: ".4rem", fontWeight: 600 }}>After</div>
                  {pair.after ? <img src={pair.after} alt="After" style={{ width: "100%", height: "auto", borderRadius: 8, border: "1px solid " + c.border }} onError={e => { e.target.style.display = "none"; }} /> : <div style={{ height: 160, background: c.bg2, borderRadius: 8, border: "1px dashed " + c.border }} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Reveal>
  </div>;
}

function Admin({ t, c, theme, projects, setProjects, clients, setClients, cats, setCats, jobs, setJobs, auth, setAuth, onBack }) {
  const [tab, setTab] = useState("projects");
  const [editing, setEditing] = useState(null);
  const [fd, setFd] = useState({});
  const [newCat, setNewCat] = useState("");
  const [catObjs, setCatObjs] = useState([]);

  // Load full category objects for delete operations
  useEffect(() => {
    if (auth) api.getCategories().then(data => setCatObjs(data || [])).catch(() => {});
  }, [auth, cats]);

  if (!auth) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><ALogin t={t} c={c} onAuth={() => setAuth(true)} onBack={onBack} /></div>;

  const startNew = () => { if (tab === "projects") setFd({ name: "", category: cats[0] || "", year: "2024", period: "", scope: "", client: "", location: "", cost: "", image: "", gallery: [], before_after: [], description: "" }); else if (tab === "careers") setFd({ title: "", department: "", location: "", description: "", requirements: "", apply_email: "", is_active: true }); else setFd({ name: "", logo: "" }); setEditing("new"); };
  const toggleJob = async (job) => { try { const updated = await api.updateJob(job.id, { ...job, is_active: !job.is_active }); setJobs(jobs.map(j => j.id === job.id ? updated : j)); } catch (e) { alert('Error: ' + e.message); } };
  const startEdit = item => { setFd({ ...item, gallery: item.gallery || [], before_after: item.before_after || [] }); setEditing(item); };
  const isDemo = (id) => typeof id === 'string' && /^\d+$/.test(id);
  const save = async () => {
    try {
      if (tab === "projects") {
        if (editing === "new" || isDemo(editing.id)) {
          const created = await api.createProject(fd);
          if (isDemo(editing.id)) setProjects([created, ...projects.filter(p => p.id !== editing.id)]);
          else setProjects([created, ...projects]);
        } else {
          const updated = await api.updateProject(editing.id, fd);
          setProjects(projects.map(p => p.id === editing.id ? updated : p));
        }
      } else if (tab === "careers") {
        if (editing === "new") {
          const created = await api.createJob(fd);
          setJobs([created, ...jobs]);
        } else {
          const updated = await api.updateJob(editing.id, fd);
          setJobs(jobs.map(j => j.id === editing.id ? updated : j));
        }
      } else {
        if (editing === "new" || isDemo(editing.id)) {
          const created = await api.createClient(fd);
          if (isDemo(editing.id)) setClients([created, ...clients.filter(x => x.id !== editing.id)]);
          else setClients([created, ...clients]);
        } else {
          const updated = await api.updateClient(editing.id, fd);
          setClients(clients.map(x => x.id === editing.id ? updated : x));
        }
      }
      setEditing(null);
    } catch (e) { alert('Error saving: ' + e.message); }
  };
  const del = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      if (tab === "careers") { await api.deleteJob(id); setJobs(jobs.filter(j => j.id !== id)); return; }
      if (isDemo(id)) {
        // Demo data — just remove from local state
        if (tab === "projects") setProjects(projects.filter(p => p.id !== id));
        else setClients(clients.filter(x => x.id !== id));
        return;
      }
      if (tab === "projects") { await api.deleteProject(id); setProjects(projects.filter(p => p.id !== id)); }
      else { await api.deleteClient(id); setClients(clients.filter(x => x.id !== id)); }
    } catch (e) { alert('Error deleting: ' + e.message); }
  };
  const addCat = async () => {
    if (!newCat.trim() || cats.includes(newCat.trim())) return;
    try {
      await api.createCategory({ name: newCat.trim() });
      setCats([...cats, newCat.trim()]);
      setNewCat("");
    } catch (e) { alert('Error: ' + e.message); }
  };
  const handleFile = async (e, field) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const { url } = await api.uploadImage(file);
      setFd(f => ({ ...f, [field]: url }));
    } catch (err) { alert('Upload failed: ' + err.message); }
  };
  const addGalleryImg = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if ((fd.gallery || []).length >= 15) return;
    try {
      const { url } = await api.uploadImage(file);
      setFd(f => ({ ...f, gallery: [...(f.gallery || []), url] }));
    } catch (err) { alert('Upload failed: ' + err.message); }
  };
  const rmGalleryImg = (i) => { setFd(f => ({ ...f, gallery: (f.gallery || []).filter((_, idx) => idx !== i) })); };

  const iS = { width: "100%", padding: ".7rem", background: c.bg2, border: "1px solid " + c.border, color: c.text, fontFamily: FB, fontSize: ".86rem", borderRadius: 4 };
  const lS = { fontSize: ".66rem", letterSpacing: "1.5px", textTransform: "uppercase", color: c.text3, display: "block", marginBottom: ".2rem", fontWeight: 500 };
  const bS = (pri, dng) => ({ display: "inline-block", padding: ".45rem 1rem", fontSize: ".7rem", letterSpacing: "1px", textTransform: "uppercase", border: "1px solid " + (dng ? "#c44" : pri ? YELLOW : c.border), background: pri ? YELLOW : "none", color: pri ? "#111" : dng ? "#c44" : c.text2, cursor: "pointer", fontFamily: FB, borderRadius: 3, marginRight: ".4rem", marginBottom: ".3rem", fontWeight: pri ? 700 : 400 });

  return <div style={{ padding: "2rem", maxWidth: 960, margin: "0 auto" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid " + c.border, flexWrap: "wrap", gap: ".5rem" }}>
      <h1 style={{ fontFamily: FD, fontSize: "1.6rem", fontWeight: 600, color: theme === "dark" ? YELLOW : "#1B2230" }}>{t.ad.ti}</h1>
      <div style={{ display: "flex", gap: ".5rem" }}>
        <button style={bS(false, false)} onClick={onBack}>{"\u2190 " + t.ad.bk}</button>
        <button style={bS(false, true)} onClick={() => { api.logout(); onBack(); }}>Logout</button>
      </div>
    </div>
    <div style={{ display: "flex", gap: 0, marginBottom: "1.5rem", flexWrap: "wrap" }}>
      {[["projects", t.ad.pr], ["clients", t.ad.ct], ["categories", t.ad.ca], ["careers", t.ad.jb]].map(([k, lb]) => <button key={k} onClick={() => { setTab(k); setEditing(null); }} style={{ padding: ".6rem 1.5rem", background: tab === k ? YELLOW : "none", border: "1px solid " + (tab === k ? YELLOW : c.border), color: tab === k ? "#111" : c.text2, fontFamily: FB, fontSize: ".75rem", letterSpacing: "1px", cursor: "pointer", fontWeight: tab === k ? 700 : 400 }}>{lb}</button>)}
    </div>

    {tab === "categories" && <div>
      <div style={{ display: "flex", gap: ".5rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
        <input style={{ ...iS, width: 220 }} placeholder={t.ad.acn} value={newCat} onChange={e => setNewCat(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addCat(); }} />
        <button style={bS(true, false)} onClick={addCat}>{t.ad.ac}</button>
      </div>
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>{cats.map(cat => { const catObj = catObjs.find(co => co.name === cat); return <div key={cat} style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".4rem .8rem", border: "1px solid " + c.border, borderRadius: 4, fontSize: ".8rem", color: c.text }}>{cat}<button onClick={async () => { if (catObj) { try { await api.deleteCategory(catObj.id); } catch {} } setCats(cats.filter(x => x !== cat)); }} style={{ background: "none", border: "none", color: "#c44", cursor: "pointer", fontSize: ".9rem", lineHeight: 1 }}>{"\u00D7"}</button></div>; })}</div>
    </div>}

    {tab !== "categories" && tab !== "careers" && editing && <div style={{ maxWidth: 520, display: "flex", flexDirection: "column", gap: ".8rem" }}>
      {tab === "projects" ? <div style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}>
        <div><label style={lS}>{t.ad.pn}</label><input style={iS} value={fd.name || ""} onChange={e => setFd(f => ({ ...f, name: e.target.value }))} /></div>
        <div><label style={lS}>{t.ad.pc}</label><select style={iS} value={fd.category || ""} onChange={e => setFd(f => ({ ...f, category: e.target.value }))}>{cats.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".8rem" }}>
          <div><label style={lS}>{t.ad.py}</label><input style={iS} value={fd.year || ""} onChange={e => setFd(f => ({ ...f, year: e.target.value }))} /></div>
          <div><label style={lS}>{t.ad.pp}</label><input style={iS} placeholder="e.g. Jan 2023 — Mar 2023" value={fd.period || ""} onChange={e => setFd(f => ({ ...f, period: e.target.value }))} /></div>
        </div>
        <div><label style={lS}>{t.ad.ps}</label><input style={iS} value={fd.scope || ""} onChange={e => setFd(f => ({ ...f, scope: e.target.value }))} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".8rem" }}>
          <div><label style={lS}>{t.ad.pcl}</label><input style={iS} value={fd.client || ""} onChange={e => setFd(f => ({ ...f, client: e.target.value }))} /></div>
          <div><label style={lS}>{t.ad.pl}</label><input style={iS} value={fd.location || ""} onChange={e => setFd(f => ({ ...f, location: e.target.value }))} /></div>
        </div>
        <div><label style={lS}>{t.ad.pv}</label><input style={iS} placeholder="e.g. 5,000,000" value={fd.cost || ""} onChange={e => setFd(f => ({ ...f, cost: e.target.value }))} /></div>
        <div>
          <label style={lS}>{t.ad.pi}</label>
          <div style={{ display: "flex", gap: ".5rem", alignItems: "center", flexWrap: "wrap" }}>
            <label style={{ ...bS(false, false), cursor: "pointer" }}><input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleFile(e, "image")} />{t.ad.up}</label>
            <span style={{ fontSize: ".72rem", color: c.text3 }}>{t.ad.ou}</span>
          </div>
          <input style={{ ...iS, marginTop: ".4rem" }} placeholder="https://..." value={(fd.image || "").startsWith("data:") ? "[Uploaded]" : fd.image || ""} onChange={e => setFd(f => ({ ...f, image: e.target.value }))} />
          {fd.image && <img src={fd.image} alt="" style={{ width: 100, height: 65, objectFit: "cover", borderRadius: 4, marginTop: ".4rem", border: "1px solid " + c.border }} onError={e => { e.target.style.display = "none"; }} />}
        </div>
        <div>
          <label style={lS}>{t.ad.gi}</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: ".4rem", marginBottom: ".5rem" }}>
            {(fd.gallery || []).map((img, i) => <div key={i} style={{ position: "relative" }}>
              <img src={img} alt="" style={{ width: "100%", height: 50, objectFit: "cover", borderRadius: 4, border: "1px solid " + c.border }} onError={e => { e.target.style.display = "none"; }} />
              <button onClick={() => rmGalleryImg(i)} style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: "50%", background: "#c44", color: "#fff", border: "none", fontSize: "0.6rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{"\u00D7"}</button>
            </div>)}
          </div>
          {(fd.gallery || []).length < 15 && <label style={{ ...bS(false, false), cursor: "pointer", fontSize: ".65rem" }}><input type="file" accept="image/*" style={{ display: "none" }} onChange={addGalleryImg} />{t.ad.addImg} ({(fd.gallery || []).length}/15)</label>}
        </div>
        <div>
          <label style={lS}>{t.ad.ba}</label>
          {(fd.before_after || []).map((pair, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: ".4rem", marginBottom: ".5rem", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: ".6rem", color: c.text3, marginBottom: ".2rem" }}>{t.ad.bab}</div>
                <label style={{ ...bS(false, false), cursor: "pointer", fontSize: ".6rem", display: "block", textAlign: "center" }}>
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={async e => { const file = e.target.files && e.target.files[0]; if (!file) return; try { const { url } = await api.uploadImage(file); setFd(f => { const ba = [...(f.before_after || [])]; ba[i] = { ...ba[i], before: url }; return { ...f, before_after: ba }; }); } catch (err) { alert('Upload failed: ' + err.message); } }} />
                  {t.ad.up}
                </label>
                {pair.before && <img src={pair.before} alt="" style={{ width: "100%", height: 45, objectFit: "cover", borderRadius: 3, marginTop: ".2rem", border: "1px solid " + c.border }} onError={e => { e.target.style.display = "none"; }} />}
              </div>
              <div>
                <div style={{ fontSize: ".6rem", color: c.text3, marginBottom: ".2rem" }}>{t.ad.baa}</div>
                <label style={{ ...bS(false, false), cursor: "pointer", fontSize: ".6rem", display: "block", textAlign: "center" }}>
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={async e => { const file = e.target.files && e.target.files[0]; if (!file) return; try { const { url } = await api.uploadImage(file); setFd(f => { const ba = [...(f.before_after || [])]; ba[i] = { ...ba[i], after: url }; return { ...f, before_after: ba }; }); } catch (err) { alert('Upload failed: ' + err.message); } }} />
                  {t.ad.up}
                </label>
                {pair.after && <img src={pair.after} alt="" style={{ width: "100%", height: 45, objectFit: "cover", borderRadius: 3, marginTop: ".2rem", border: "1px solid " + c.border }} onError={e => { e.target.style.display = "none"; }} />}
              </div>
              <button onClick={() => setFd(f => ({ ...f, before_after: (f.before_after || []).filter((_, idx) => idx !== i) }))} style={{ ...bS(false, true), alignSelf: "flex-start", marginTop: "1.2rem" }}>{t.ad.bar}</button>
            </div>
          ))}
          {(fd.before_after || []).length < 5 && <button style={bS(false, false)} onClick={() => setFd(f => ({ ...f, before_after: [...(f.before_after || []), { before: "", after: "" }] }))}>{t.ad.bap} ({(fd.before_after || []).length}/5)</button>}
        </div>
        <div><label style={lS}>{t.ad.pd}</label><textarea style={{ ...iS, minHeight: 80, resize: "vertical" }} value={fd.description || ""} onChange={e => setFd(f => ({ ...f, description: e.target.value }))} /></div>
      </div> : <div style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}>
        <div><label style={lS}>{t.ad.cn2}</label><input style={iS} value={fd.name || ""} onChange={e => setFd(f => ({ ...f, name: e.target.value }))} /></div>
        <div>
          <label style={lS}>{t.ad.cl}</label>
          <div style={{ display: "flex", gap: ".5rem", alignItems: "center", flexWrap: "wrap" }}>
            <label style={{ ...bS(false, false), cursor: "pointer" }}><input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleFile(e, "logo")} />{t.ad.up}</label>
            <span style={{ fontSize: ".72rem", color: c.text3 }}>{t.ad.ou}</span>
          </div>
          <input style={{ ...iS, marginTop: ".4rem" }} placeholder="https://..." value={(fd.logo || "").startsWith("data:") ? "[Uploaded]" : fd.logo || ""} onChange={e => setFd(f => ({ ...f, logo: e.target.value }))} />
          {fd.logo && <img src={fd.logo} alt="" style={{ width: 80, height: 55, objectFit: "contain", borderRadius: 4, marginTop: ".4rem", border: "1px solid " + c.border }} onError={e => { e.target.style.display = "none"; }} />}
        </div>
      </div>}
      <div style={{ display: "flex", gap: ".5rem", marginTop: ".5rem" }}><button style={bS(true, false)} onClick={save}>{t.ad.sv}</button><button style={bS(false, false)} onClick={() => setEditing(null)}>{t.ad.cn}</button></div>
    </div>}

    {tab !== "categories" && tab !== "careers" && !editing && <div>
      <div style={{ marginBottom: "1.2rem" }}><button style={bS(true, false)} onClick={startNew}>{t.ad.an}</button></div>
      {(tab === "projects" ? projects : clients).length === 0 ? <div style={{ textAlign: "center", padding: "2rem", color: c.text3, border: "1px dashed " + c.border, borderRadius: 8 }}>{tab === "projects" ? t.ad.np : t.ad.nc}</div>
      : <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>{(tab === "projects" ? ["", t.ad.pn, t.ad.pc, t.ad.py, ""] : ["", t.ad.cn2, ""]).map((h, i) => <th key={i} style={{ textAlign: "left", padding: ".55rem .7rem", fontSize: ".66rem", letterSpacing: "1.5px", textTransform: "uppercase", color: c.text3, borderBottom: "1px solid " + c.border }}>{h}</th>)}</tr></thead>
        <tbody>{(tab === "projects" ? projects : clients).map(item => <tr key={item.id}>
          <td style={{ padding: ".55rem .7rem", borderBottom: "1px solid " + c.border, width: 60 }}><img src={tab === "projects" ? item.image : item.logo} alt="" style={{ width: 50, height: 34, objectFit: "cover", borderRadius: 3 }} onError={e => { e.target.style.display = "none"; }} /></td>
          <td style={{ padding: ".55rem .7rem", borderBottom: "1px solid " + c.border, fontWeight: 500, fontSize: ".85rem" }}>{item.name}</td>
          {tab === "projects" && <><td style={{ padding: ".55rem .7rem", borderBottom: "1px solid " + c.border, color: c.text2, fontSize: ".8rem" }}>{item.category}</td><td style={{ padding: ".55rem .7rem", borderBottom: "1px solid " + c.border, color: c.text2, fontSize: ".8rem" }}>{item.year}</td></>}
          <td style={{ padding: ".55rem .7rem", borderBottom: "1px solid " + c.border, whiteSpace: "nowrap" }}>
            <button style={bS(false, false)} onClick={() => startEdit(item)}>{t.ad.ed}</button>
            <button style={bS(false, true)} onClick={() => del(item.id)}>{t.ad.dl}</button>
          </td>
        </tr>)}</tbody>
      </table></div>}
    </div>}

    {tab === "careers" && editing && <div style={{ maxWidth: 520, display: "flex", flexDirection: "column", gap: ".8rem" }}>
      <div><label style={lS}>{t.ad.jt}</label><input style={iS} value={fd.title || ""} onChange={e => setFd(f => ({ ...f, title: e.target.value }))} /></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".8rem" }}>
        <div><label style={lS}>{t.ad.jdp}</label><input style={iS} value={fd.department || ""} onChange={e => setFd(f => ({ ...f, department: e.target.value }))} /></div>
        <div><label style={lS}>{t.ad.jlc}</label><input style={iS} value={fd.location || ""} onChange={e => setFd(f => ({ ...f, location: e.target.value }))} /></div>
      </div>
      <div><label style={lS}>{t.ad.jds}</label><textarea style={{ ...iS, minHeight: 100, resize: "vertical" }} value={fd.description || ""} onChange={e => setFd(f => ({ ...f, description: e.target.value }))} /></div>
      <div><label style={lS}>{t.ad.jrq}</label><textarea style={{ ...iS, minHeight: 120, resize: "vertical" }} placeholder={"- Bachelor's degree in relevant field\n- 3+ years experience\n- Strong communication skills"} value={fd.requirements || ""} onChange={e => setFd(f => ({ ...f, requirements: e.target.value }))} /></div>
      <div><label style={lS}>{t.ad.jem}</label><input type="email" style={iS} placeholder="wide11bangkok@gmail.com" value={fd.apply_email || ""} onChange={e => setFd(f => ({ ...f, apply_email: e.target.value }))} /></div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <label style={lS}>{t.ad.iac}</label>
        <button onClick={() => setFd(f => ({ ...f, is_active: !f.is_active }))} style={{ padding: ".3rem .9rem", fontSize: ".7rem", borderRadius: 20, border: "1px solid " + (fd.is_active ? "#4caf50" : c.border), background: fd.is_active ? "#4caf50" : "none", color: fd.is_active ? "#fff" : c.text2, cursor: "pointer", fontFamily: FB, fontWeight: 600, letterSpacing: ".5px" }}>{fd.is_active ? t.ad.iac : t.ad.jin}</button>
      </div>
      <div style={{ display: "flex", gap: ".5rem", marginTop: ".5rem" }}><button style={bS(true, false)} onClick={save}>{t.ad.sv}</button><button style={bS(false, false)} onClick={() => setEditing(null)}>{t.ad.cn}</button></div>
    </div>}

    {tab === "careers" && !editing && <div>
      <div style={{ marginBottom: "1.2rem" }}><button style={bS(true, false)} onClick={startNew}>{t.ad.an}</button></div>
      {jobs.length === 0
        ? <div style={{ textAlign: "center", padding: "2rem", color: c.text3, border: "1px dashed " + c.border, borderRadius: 8 }}>{t.ad.nj}</div>
        : <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["", t.ad.jt, t.ad.jdp, t.ad.jlc, ""].map((h, i) => <th key={i} style={{ textAlign: "left", padding: ".55rem .7rem", fontSize: ".66rem", letterSpacing: "1.5px", textTransform: "uppercase", color: c.text3, borderBottom: "1px solid " + c.border }}>{h}</th>)}</tr></thead>
          <tbody>{jobs.map(job => <tr key={job.id}>
            <td style={{ padding: ".55rem .7rem", borderBottom: "1px solid " + c.border, width: 80 }}>
              <span style={{ display: "inline-block", padding: ".2rem .6rem", borderRadius: 10, fontSize: ".65rem", background: job.is_active ? "#4caf50" : "#777", color: "#fff", fontWeight: 600, whiteSpace: "nowrap" }}>{job.is_active ? t.ad.iac : t.ad.jin}</span>
            </td>
            <td style={{ padding: ".55rem .7rem", borderBottom: "1px solid " + c.border, fontWeight: 500, fontSize: ".85rem" }}>{job.title}</td>
            <td style={{ padding: ".55rem .7rem", borderBottom: "1px solid " + c.border, color: c.text2, fontSize: ".8rem" }}>{job.department}</td>
            <td style={{ padding: ".55rem .7rem", borderBottom: "1px solid " + c.border, color: c.text2, fontSize: ".8rem" }}>{job.location}</td>
            <td style={{ padding: ".55rem .7rem", borderBottom: "1px solid " + c.border, whiteSpace: "nowrap" }}>
              <button style={bS(false, false)} onClick={() => toggleJob(job)}>{t.ad.tgl}</button>
              <button style={bS(false, false)} onClick={() => startEdit(job)}>{t.ad.ed}</button>
              <button style={bS(false, true)} onClick={() => del(job.id)}>{t.ad.dl}</button>
            </td>
          </tr>)}</tbody>
        </table></div>}
    </div>}
  </div>;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: ".6rem" }}>
      {open && <>
        <a href="https://line.me/ti/p/PLACEHOLDER" target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: ".6rem", padding: ".6rem 1rem", background: "#06C755", color: "#fff", borderRadius: 50, textDecoration: "none", fontSize: ".82rem", fontWeight: 600, fontFamily: "'DM Sans',sans-serif", boxShadow: "0 2px 8px rgba(0,0,0,.2)", whiteSpace: "nowrap", transition: "opacity .2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity=".85"} onMouseLeave={e => e.currentTarget.style.opacity="1"}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
          LINE
        </a>
        <a href="https://wa.me/6624092308" target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: ".6rem", padding: ".6rem 1rem", background: "#25D366", color: "#fff", borderRadius: 50, textDecoration: "none", fontSize: ".82rem", fontWeight: 600, fontFamily: "'DM Sans',sans-serif", boxShadow: "0 2px 8px rgba(0,0,0,.2)", whiteSpace: "nowrap", transition: "opacity .2s" }}
          onMouseEnter={e => e.currentTarget.style.opacity=".85"} onMouseLeave={e => e.currentTarget.style.opacity="1"}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </a>
      </>}
      <button onClick={() => setOpen(o => !o)}
        style={{ width: 52, height: 52, borderRadius: "50%", background: YELLOW, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,.25)", transition: "transform .2s" }}
        onMouseEnter={e => e.currentTarget.style.transform="scale(1.08)"} onMouseLeave={e => e.currentTarget.style.transform=""}>
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="#111"><path d="M18 6L6 18M6 6l12 12" stroke="#111" strokeWidth="2.5" strokeLinecap="round"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="#111"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>}
      </button>
    </div>
  );
}

function ALogin({ t, c, onAuth, onBack }) {
  const [email, setEmail] = useState("");
  const [pw, sPw] = useState("");
  const [err, sErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Check existing session on mount
  useEffect(() => {
    const session = api.getSession();
    if (session) onAuth();
  }, []);

  const go = async () => {
    if (!email || !pw) { sErr("Email and password required"); return; }
    setLoading(true);
    sErr("");
    try {
      await api.login(email, pw);
      onAuth();
    } catch (e) {
      sErr("Invalid email or password");
    }
    setLoading(false);
  };

  return <div style={{ width: 340, padding: "2.2rem", border: "1px solid " + c.border, borderRadius: 10, textAlign: "center", background: c.bg }}>
    <h2 style={{ fontFamily: FD, fontSize: "1.5rem", fontWeight: 600, color: YELLOW, marginBottom: "1.2rem" }}>{t.ad.lg}</h2>
    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => { if (e.key === "Enter") go(); }} style={{ width: "100%", padding: ".7rem", background: c.bg2, border: "1px solid " + (err ? "#c44" : c.border), color: c.text, fontFamily: FB, textAlign: "center", borderRadius: 5, marginBottom: ".5rem" }} />
    <input type="password" placeholder={t.ad.pw} value={pw} onChange={e => sPw(e.target.value)} onKeyDown={e => { if (e.key === "Enter") go(); }} style={{ width: "100%", padding: ".7rem", background: c.bg2, border: "1px solid " + (err ? "#c44" : c.border), color: c.text, fontFamily: FB, textAlign: "center", borderRadius: 5, marginBottom: ".6rem" }} />
    <button onClick={go} disabled={loading} style={{ width: "100%", padding: ".7rem", background: YELLOW, color: "#111", border: "none", fontFamily: FB, fontSize: ".75rem", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: 3, fontWeight: 700, opacity: loading ? 0.6 : 1 }}>{loading ? "..." : t.ad.en}</button>
    {err && <p style={{ color: "#c44", fontSize: ".75rem", marginTop: ".5rem" }}>{err}</p>}
    <a onClick={onBack} style={{ fontSize: ".7rem", color: c.text3, cursor: "pointer", textDecoration: "none", marginTop: ".75rem", display: "inline-block" }}>{"\u2190 " + t.ad.bk}</a>
  </div>;
}

function CareersPage({ t, c, theme, jobs, onJob }) {
  const [expanded, setExpanded] = useState(null);
  const activeJobs = (jobs || []).filter(j => j.is_active);

  return <div style={{ minHeight: "80vh", background: c.bg }}>
    <div style={{ background: c.bg2, padding: "5rem 6% 3.5rem", borderBottom: "1px solid " + c.border }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><p style={{ fontSize: ".72rem", letterSpacing: "3px", textTransform: "uppercase", color: YELLOW, fontWeight: 600, marginBottom: ".6rem" }}>Wide-Eleven Co., Ltd.</p></Reveal>
        <Reveal delay={0.1}><h1 style={{ fontFamily: FD, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: c.text, marginBottom: ".8rem", lineHeight: 1.15 }}>{t.careers.title}</h1></Reveal>
        <Reveal delay={0.2}><p style={{ fontSize: "1rem", color: c.text2, maxWidth: 520, lineHeight: 1.75 }}>{t.careers.sub}</p></Reveal>
      </div>
    </div>

    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3.5rem 6%" }}>
      {activeJobs.length === 0
        ? <Reveal><div style={{ textAlign: "center", padding: "5rem 0", color: c.text3 }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>💼</div>
            <p style={{ fontFamily: FD, fontSize: "1.3rem", color: c.text2 }}>{t.careers.none}</p>
          </div></Reveal>
        : <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {activeJobs.map((job, idx) => (
              <Reveal key={job.id} delay={idx * 0.05}>
                <div style={{ background: c.card, border: "1px solid " + c.border, borderRadius: 10, overflow: "hidden", boxShadow: expanded === job.id ? "0 4px 20px rgba(0,0,0,.08)" : "none", transition: "box-shadow .2s" }}>
                  <div onClick={() => setExpanded(expanded === job.id ? null : job.id)} style={{ padding: "1.6rem 1.8rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <h3 style={{ fontFamily: FD, fontSize: "1.15rem", fontWeight: 600, color: c.text, marginBottom: ".45rem" }}>{job.title}</h3>
                      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
                        {job.department && <span style={{ fontSize: ".78rem", color: YELLOW, fontWeight: 700, letterSpacing: ".5px" }}>{job.department}</span>}
                        {job.location && <span style={{ fontSize: ".78rem", color: c.text3 }}>{"📍 " + job.location}</span>}
                      </div>
                    </div>
                    <span style={{ fontSize: "1.1rem", color: c.text3, transition: "transform .25s", transform: expanded === job.id ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0, marginTop: ".2rem" }}>{"▾"}</span>
                  </div>
                  {expanded === job.id && <div style={{ padding: "0 1.8rem 1.6rem", borderTop: "1px solid " + c.border }}>
                    <p style={{ color: c.text2, fontSize: ".9rem", lineHeight: 1.8, paddingTop: "1rem", marginBottom: "1.2rem" }}>{job.description}</p>
                    <button onClick={() => onJob(job)} style={{ padding: ".65rem 1.8rem", background: YELLOW, color: "#111", border: "none", fontFamily: FB, fontSize: ".78rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: 3 }}>{t.careers.det}</button>
                  </div>}
                </div>
              </Reveal>
            ))}
          </div>}
    </div>
  </div>;
}

function JobDetail({ t, c, theme, job, onBack }) {
  const applyEmail = job.apply_email || "wide11bangkok@gmail.com";
  const subject = encodeURIComponent("Application for " + job.title);
  const body = encodeURIComponent(
    "Hi Wide-Eleven Team,\n\nI am interested in applying for the " + job.title + " position.\n\nPlease find my details below:\n\nName: \nPhone: \nEmail: \nYears of Experience: \n\nI look forward to hearing from you.\n\nBest regards,"
  );
  const mailHref = "mailto:" + applyEmail + "?subject=" + subject + "&body=" + body;
  const reqs = (job.requirements || "").split("\n").filter(r => r.trim());

  return <div style={{ minHeight: "80vh", background: c.bg }}>
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "3.5rem 6% 5rem" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: c.text2, fontFamily: FB, fontSize: ".78rem", cursor: "pointer", marginBottom: "2.5rem", letterSpacing: "1.5px", textTransform: "uppercase", padding: 0, display: "flex", alignItems: "center", gap: ".4rem" }}>{"← " + t.careers.bk}</button>

      <Reveal>
        <div style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid " + c.border }}>
          <p style={{ fontSize: ".7rem", letterSpacing: "2px", textTransform: "uppercase", color: YELLOW, fontWeight: 600, marginBottom: ".5rem" }}>Wide-Eleven Co., Ltd.</p>
          <h1 style={{ fontFamily: FD, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: c.text, marginBottom: ".8rem", lineHeight: 1.15 }}>{job.title}</h1>
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.8rem", alignItems: "center" }}>
            {job.department && <span style={{ fontSize: ".85rem", color: YELLOW, fontWeight: 700 }}>{job.department}</span>}
            {job.location && <span style={{ fontSize: ".85rem", color: c.text3 }}>{"📍 " + job.location}</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
            <a href={mailHref} style={{ display: "inline-block", padding: ".85rem 2.4rem", background: YELLOW, color: "#111", fontFamily: FB, fontSize: ".82rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: 3, textDecoration: "none" }}>{t.careers.apply}</a>
            <span style={{ fontSize: ".82rem", color: c.text3 }}>{"or email: "}<a href={"mailto:" + applyEmail} style={{ color: c.text2, textDecoration: "underline", textUnderlineOffset: 3 }}>{applyEmail}</a></span>
          </div>
        </div>
      </Reveal>

      {job.description && <Reveal delay={0.1}>
        <div style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid " + c.border }}>
          <h2 style={{ fontFamily: FD, fontSize: "1.2rem", fontWeight: 600, color: c.text, marginBottom: "1rem" }}>{t.careers.desc}</h2>
          <p style={{ color: c.text2, fontSize: ".95rem", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{job.description}</p>
        </div>
      </Reveal>}

      {reqs.length > 0 && <Reveal delay={0.15}>
        <div style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid " + c.border }}>
          <h2 style={{ fontFamily: FD, fontSize: "1.2rem", fontWeight: 600, color: c.text, marginBottom: "1rem" }}>{t.careers.reqs}</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {reqs.map((r, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: ".7rem", padding: ".45rem 0", color: c.text2, fontSize: ".9rem", lineHeight: 1.75 }}>
                <span style={{ color: YELLOW, fontWeight: 700, flexShrink: 0, marginTop: ".15rem", fontSize: "1rem" }}>{"•"}</span>
                <span>{r.replace(/^[-•*]\s*/, "").trim()}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>}

      <Reveal delay={0.2}>
        <div style={{ padding: "2.2rem", background: c.bg2, borderRadius: 10, textAlign: "center", border: "1px solid " + c.border }}>
          <p style={{ fontFamily: FD, fontSize: "1.1rem", color: c.text, marginBottom: "1.2rem" }}>{t.careers.cta}</p>
          <a href={mailHref} style={{ display: "inline-block", padding: ".9rem 2.8rem", background: YELLOW, color: "#111", fontFamily: FB, fontSize: ".82rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: 3, textDecoration: "none" }}>{t.careers.apply}</a>
          <p style={{ marginTop: ".9rem", fontSize: ".8rem", color: c.text3 }}>{"or email us at "}<a href={"mailto:" + applyEmail} style={{ color: c.text2, textDecoration: "underline", textUnderlineOffset: 3 }}>{applyEmail}</a></p>
        </div>
      </Reveal>
    </div>
  </div>;
}
