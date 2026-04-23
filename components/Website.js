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
  return { bg:"#FAFAF8", bg2:"#EFEBE4", bg3:"#E4DED6", dark:"#1B2230", yellow:YELLOW, text:"#1A1A1A", text2:"#444140", text3:"#6E6860", border:"#C4BAB0", card:"#FFFFFF" };
}

const TX = {
  en: {
    nav:{home:"Home",about:"About",services:"Services",careers:"Careers",portfolio:"Portfolio",contact:"Contact"},
    hero:{eyebrow:"Premium Interior Design & Construction",l1:"Crafting Exceptional Spaces.",l2:"Built on Trust.",sub:"We transform ordinary spaces into extraordinary environments with bespoke design solutions and expert craftsmanship.",cta:"Start Your Project",cta2:"View Our Work"},
    stats:{a:"12+",al:"Years Experience",b:"400+",bl:"Projects Completed",c:"80\u201390",cl:"Team Members",d:"100%",dl:"Client Commitment"},
    about:{title:"Our Story",p1:"WIDE-ELEVEN CO., LTD. has been established since February of 2014, prioritizing in the industry of interior design & construction. We are committed to provide the best interior construction services to our clients by transforming their dreaming design of space into reality, within the budget and time frame as allowed.",p2:"Over the past 12 years, we have expanded gradually, and have been working on more than 400 projects to date, with an accumulative number of clients coming from the appraisal for our credibility, speed and quality of work.",ms:"Our Mission",mt:"To transform every client's vision into reality through exceptional craftsmanship, innovative design solutions, and unwavering commitment to quality \u2014 on time, within budget, and beyond expectations.",bg:"Years of Excellence"},
    cli:{title:"Our Clients & Partners"},
    svc:{title:"Our Expertise",heading:"End-to-End Solutions, Tailored for You",items:[{t:"Design (Perspective & Shop Drawing) & Space Planning",s:"Design & Planning",d:"Perspective & shop drawings, space planning and design consultation tailored to your vision."},{t:"Interior Fitting Out",s:"Interior Fit-Out",d:"Full interior fit-out services for residential, commercial, hospitality and retail spaces."},{t:"Refurnishing Works",s:"Refurbishing Works",d:"Professional refurnishing and upgrading works to breathe new life into existing spaces."},{t:"MEP Works (Mechanical, Electrical, Plumbing)",s:"MEP Works",d:"Mechanical, electrical and plumbing works carried out by trained in-house specialists."},{t:"Consultation & Budget Estimation",s:"Budget Estimation",d:"Expert consultation, advice, and accurate budget estimation for renovation and construction projects of any scale."}]},
    port:{eyebrow:"Featured Projects",title:"Spaces We're Proud Of",subtitle:"A glimpse of recent projects where craftsmanship meets vision.",all:"View All Projects",det:"View Details",more:"View Project",at:"All Projects",as:"Explore our complete portfolio.",cat:"Category",yr:"Year",pd:"Period",sc:"Scope",cl:"Client",loc:"Location",cost:"Project Value",bk:"Back",imgs:"Project Gallery"},
    ct:{eyebrow:"Get In Touch",heading:"Let's Build Something Amazing Together",title:"Get In Touch",sub:"Tell us about your vision and we will bring it to life.",em:"Email Us",ca:"Call Us",vi:"Visit Us",fn:"Full Name *",fe:"Email Address *",fp:"Phone (optional)",fm:"Tell us about your project *",sn:"Send Message",st:"Message sent!",sg:"Sending..."},
    ft:{tg:"Transforming spaces, elevating lives since 2014.",th:"\u0E1A\u0E23\u0E34\u0E29\u0E31\u0E17 \u0E44\u0E27\u0E14\u0E4C-\u0E2D\u0E34\u0E40\u0E25\u0E1F\u0E40\u0E27\u0E48\u0E19 \u0E08\u0E33\u0E01\u0E31\u0E14",nv:"Navigation",co:"Contact",rg:"2026 Wide-Eleven Co., Ltd. All rights reserved.",cta:"Let's Build Something Amazing Together",ctaSub:"Ready to transform your space? Let's start the conversation today.",ctaBtn:"Get In Touch"},
    ad:{ti:"Admin Panel",lg:"Admin Login",pw:"Password",en:"Enter",pr:"Projects",ct:"Clients",ca:"Categories",an:"Add New",ed:"Edit",dl:"Delete",sv:"Save",cn:"Cancel",bk:"Back to Site",pn:"Project Name",pc:"Category",py:"Year",pp:"Period",ps:"Scope",pcl:"Client",pl:"Location",pv:"Project Value",pi:"Cover Image",pd:"Description",cn2:"Client Name",cl:"Logo",up:"Upload",ou:"Or paste URL",np:"No projects yet.",nc:"No clients yet.",ac:"Add Category",acn:"Category Name",gi:"Gallery Images (up to 15)",addImg:"Add Image",rmImg:"Remove",ba:"Before/After Images",bab:"Before",baa:"After",bap:"Add Pair",bar:"Remove Pair",jb:"Careers",jt:"Job Title",jdp:"Department",jlc:"Location",jds:"Job Description",jrq:"Requirements (one per line)",jem:"Apply Email",iac:"Active",jin:"Inactive",tgl:"Toggle Active",nj:"No job postings yet."},
    careers:{title:"Join Our Team",sub:"We're looking for talented individuals to help us create extraordinary spaces.",none:"No open positions at this time. Please check back soon.",det:"View Details",apply:"Apply Now",bk:"Back to Careers",desc:"About This Role",reqs:"Requirements",cta:"Interested in this position?"}
  },
  th: {
    nav:{home:"หน้าแรก",about:"เกี่ยวกับเรา",services:"บริการ",careers:"ร่วมงานกับเรา",portfolio:"ผลงาน",contact:"ติดต่อ"},
    hero:{eyebrow:"งานออกแบบและก่อสร้างตกแต่งภายในระดับพรีเมียม",l1:"รังสรรค์พื้นที่อันเป็นเอกลักษณ์.",l2:"บนรากฐานแห่งความไว้วางใจ.",sub:"เราเปลี่ยนพื้นที่ธรรมดาให้กลายเป็นสิ่งพิเศษ ด้วยโซลูชันการออกแบบเฉพาะตัวและงานฝีมือจากผู้เชี่ยวชาญ",cta:"เริ่มโปรเจกต์ของคุณ",cta2:"ดูผลงานของเรา"},
    stats:{a:"12+",al:"ปีประสบการณ์",b:"400+",bl:"โครงการที่สำเร็จ",c:"80\u201390",cl:"สมาชิกทีมงาน",d:"100%",dl:"ความมุ่งมั่นต่อลูกค้า"},
    about:{title:"เรื่องราวของเรา",p1:"บริษัท ไวด์-อีเลฟเว่น จำกัด ก่อตั้งขึ้นเมื่อเดือนกุมภาพันธ์ พ.ศ. 2557 โดยมุ่งเน้นในอุตสาหกรรมออกแบบและก่อสร้างตกแต่งภายใน เรามุ่งมั่นมอบบริการก่อสร้างตกแต่งภายในที่ดีที่สุดให้กับลูกค้า โดยเปลี่ยนการออกแบบพื้นที่ในฝันให้กลายเป็นความจริง ภายใต้งบประมาณและกรอบเวลาที่กำหนด",p2:"ตลอดระยะเวลากว่า 12 ปีที่ผ่านมา เราเติบโตอย่างต่อเนื่อง และได้ดำเนินงานมากกว่า 400 โครงการจนถึงปัจจุบัน ด้วยจำนวนลูกค้าที่เพิ่มขึ้นจากการยอมรับในความน่าเชื่อถือ ความรวดเร็ว และคุณภาพของงาน",ms:"พันธกิจของเรา",mt:"เปลี่ยนวิสัยทัศน์ของลูกค้าทุกรายให้เป็นจริง ด้วยฝีมือช่างชั้นยอด โซลูชันการออกแบบที่สร้างสรรค์ และความมุ่งมั่นในคุณภาพอย่างไม่ลดละ \u2014 ตรงเวลา ตามงบประมาณ และเหนือความคาดหมาย",bg:"ปีแห่งความเป็นเลิศ"},
    cli:{title:"ลูกค้าและพันธมิตรของเรา"},
    svc:{title:"ความเชี่ยวชาญของเรา",heading:"โซลูชันครบวงจร ปรับให้เหมาะกับคุณ",items:[{t:"ออกแบบ (Perspective & Shop Drawing) และวางผังพื้นที่",s:"ออกแบบและวางแผน",d:"งานเขียนแบบ Perspective และ Shop Drawing วางผังพื้นที่ และให้คำปรึกษาด้านการออกแบบที่ตรงตามวิสัยทัศน์ของคุณ"},{t:"งานตกแต่งภายใน",s:"ตกแต่งภายใน",d:"บริการตกแต่งภายในครบวงจร สำหรับที่อยู่อาศัย อาคารพาณิชย์ โรงแรม และร้านค้าปลีก"},{t:"งานรีเฟอร์นิช",s:"งานปรับปรุง",d:"งานปรับปรุงและอัพเกรดอย่างมืออาชีพ เพื่อเติมชีวิตใหม่ให้กับพื้นที่เดิมของคุณ"},{t:"งานระบบ MEP (เครื่องกล ไฟฟ้า ประปา)",s:"งานระบบ MEP",d:"งานระบบเครื่องกล ไฟฟ้า และประปา ดำเนินการโดยทีมผู้เชี่ยวชาญเฉพาะทางภายในบริษัท"},{t:"ที่ปรึกษาและประมาณราคา",s:"ประเมินงบประมาณ",d:"บริการให้คำปรึกษาจากผู้เชี่ยวชาญ พร้อมประมาณราคาอย่างแม่นยำ สำหรับโครงการปรับปรุงและก่อสร้างทุกขนาด"}]},
    port:{eyebrow:"ผลงานเด่น",title:"พื้นที่ที่เราภาคภูมิใจ",subtitle:"ตัวอย่างผลงานที่ผสานฝีมืองานช่างเข้ากับวิสัยทัศน์ของลูกค้า",all:"ดูโครงการทั้งหมด",det:"ดูรายละเอียด",more:"ดูโครงการ",at:"โครงการทั้งหมด",as:"สำรวจผลงานทั้งหมดของเรา",cat:"ประเภท",yr:"ปี",pd:"ระยะเวลา",sc:"ขอบเขตงาน",cl:"ลูกค้า",loc:"สถานที่",cost:"มูลค่าโครงการ",bk:"กลับ",imgs:"แกลเลอรีโครงการ"},
    ct:{eyebrow:"ติดต่อเรา",heading:"มาร่วมสร้างสรรค์สิ่งที่ยอดเยี่ยมไปด้วยกัน",title:"ติดต่อเรา",sub:"บอกเล่าวิสัยทัศน์ของคุณ แล้วเราจะทำให้เป็นจริง",em:"อีเมล",ca:"โทรศัพท์",vi:"ที่อยู่",fn:"ชื่อ-นามสกุล *",fe:"อีเมล *",fp:"เบอร์โทรศัพท์ (ไม่บังคับ)",fm:"เล่าให้เราฟังเกี่ยวกับโครงการของคุณ *",sn:"ส่งข้อความ",st:"ส่งข้อความสำเร็จ!",sg:"กำลังส่ง..."},
    ft:{tg:"เปลี่ยนพื้นที่ ยกระดับชีวิต ตั้งแต่ พ.ศ. 2557",th:"บริษัท ไวด์-อีเลฟเว่น จำกัด",nv:"เมนู",co:"ติดต่อ",rg:"\u00A9 2569 บริษัท ไวด์-อีเลฟเว่น จำกัด สงวนลิขสิทธิ์",cta:"มาร่วมสร้างสรรค์สิ่งที่ยอดเยี่ยมไปด้วยกัน",ctaSub:"พร้อมเปลี่ยนแปลงพื้นที่ของคุณแล้วหรือยัง? มาเริ่มต้นพูดคุยกันวันนี้",ctaBtn:"ติดต่อเรา"},
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

      <footer style={{ padding: "3.5rem 6% 1.5rem", background: "#0f0f0f", color: "rgba(255,255,255,.7)", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1.2fr", gap: "3rem", marginBottom: "2.5rem" }} className="fgr">
          <div>
            <h3 style={{ fontFamily: FD, fontSize: "1.15rem", fontWeight: 600, color: "#fff", marginBottom: "0.9rem", letterSpacing: "0.5px" }}><span style={{ fontSize: "1.35rem" }}>W</span>IDE-ELEVEN CO., LTD.</h3>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,.6)", lineHeight: 1.75, marginBottom: "0.5rem" }}>{t.ft.tg}</p>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,.4)" }}>{t.ft.th}</p>
          </div>
          <div>
            <h4 style={{ fontSize: "0.66rem", letterSpacing: "2.8px", color: YELLOW, textTransform: "uppercase", marginBottom: "1.1rem", fontWeight: 600 }}>{t.ft.nv}</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.45rem 1rem" }}>
              {["home","about","services","contact"].map(id => <a key={id} onClick={() => scrollTo(id)} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,.68)", textDecoration: "none", cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = YELLOW} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.68)"}>{t.nav[id]}</a>)}
              <a onClick={() => go("portfolio")} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,.68)", textDecoration: "none", cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = YELLOW} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.68)"}>{t.nav.portfolio}</a>
              <a onClick={() => go("careers")} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,.68)", textDecoration: "none", cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = YELLOW} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.68)"}>{t.nav.careers}</a>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: "0.66rem", letterSpacing: "2.8px", color: YELLOW, textTransform: "uppercase", marginBottom: "1.1rem", fontWeight: 600 }}>{t.ft.co}</h4>
            <div style={{ fontSize: "0.83rem", color: "rgba(255,255,255,.68)", lineHeight: 1.9 }}>
              <div>Tel: 02-409-2308</div>
              <div>wide11bangkok@gmail.com</div>
              <div>8/110 Soi Thian Talay 7,<br />Bang Khun Thian, Bangkok 10150</div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingTop: "1.3rem", borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,.45)", margin: 0 }}>{t.ft.rg}</p>
          <a onClick={() => go("admin")} style={{ fontSize: "0.65rem", color: "rgba(255,255,255,.35)", textDecoration: "none", cursor: "pointer", letterSpacing: "1.8px", textTransform: "uppercase" }}>Admin</a>
        </div>
      </footer>
    </div>
  );
}

function Fonts() { return null; }

function StatIcon({ idx }) {
  const s = { width: 30, height: 30, stroke: "currentColor", strokeWidth: 1.5, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  // 0 Years Experience — clock
  if (idx === 0) return (<svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
  // 1 Projects Completed — check circle
  if (idx === 1) return (<svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>);
  // 2 Team — people
  if (idx === 2) return (<svg {...s} viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c.5-3.5 3-5 6-5s5.5 1.5 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M21 18c-.3-2.3-1.8-3.5-4-3.5"/></svg>);
  // 3 Client Commitment — heart
  return (<svg {...s} viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"/></svg>);
}

function ServiceIcon({ idx, color }) {
  const s = { width: 28, height: 28, stroke: color, strokeWidth: 1.4, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  // 0 Design & Space Planning — drafting/ruler + pencil
  if (idx === 0) return (
    <svg {...s} viewBox="0 0 24 24"><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 3v18"/><path d="M14 14l4 4"/></svg>
  );
  // 1 Interior Fitting Out — sofa/chair
  if (idx === 1) return (
    <svg {...s} viewBox="0 0 24 24"><path d="M3 11v6a1 1 0 001 1h16a1 1 0 001-1v-6"/><path d="M5 11V8a3 3 0 013-3h8a3 3 0 013 3v3"/><path d="M3 11a2 2 0 014 0v3M17 11a2 2 0 014 0v3"/><path d="M7 18v2M17 18v2"/></svg>
  );
  // 2 Refurnishing — paint brush / refresh
  if (idx === 2) return (
    <svg {...s} viewBox="0 0 24 24"><path d="M4 21h4l10-10a2.83 2.83 0 10-4-4L4 17v4z"/><path d="M13 7l4 4"/><path d="M18 3l3 3"/></svg>
  );
  // 3 MEP — lightning/bolt in circle
  if (idx === 3) return (
    <svg {...s} viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>
  );
  // 4 Consultation & Budget — chart / clipboard
  return (
    <svg {...s} viewBox="0 0 24 24"><path d="M9 4h6a1 1 0 011 1v2H8V5a1 1 0 011-1z"/><path d="M6 7h12v13a1 1 0 01-1 1H7a1 1 0 01-1-1V7z"/><path d="M9 12l2 2 4-4"/></svg>
  );
}

function HomePage({ t, c, theme, projects, clients, onAll, onProj }) {
  const scrollToId = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); };
  return <div>
    {/* HERO */}
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 6%", position: "relative", backgroundImage: "url(" + P.hero + ")", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,.78) 0%, rgba(0,0,0,.55) 50%, rgba(0,0,0,.22) 100%)" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, paddingTop: "4rem" }}>
        <Reveal><div style={{ fontSize: "0.72rem", color: YELLOW, letterSpacing: "4px", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.1rem" }}>{t.hero.eyebrow}</div></Reveal>
        <Reveal delay={0.1}><h1 style={{ fontFamily: FD, fontSize: "clamp(2.6rem, 6vw, 4.8rem)", fontWeight: 500, lineHeight: 1.1, marginBottom: "1.6rem", letterSpacing: "-0.5px" }}>
          <span style={{ color: "#fff" }}>{t.hero.l1}</span><br />
          <span style={{ color: YELLOW }}>{t.hero.l2}</span>
        </h1></Reveal>
        <Reveal delay={0.2}><p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,.8)", lineHeight: 1.7, marginBottom: "2.2rem", maxWidth: 540 }}>{t.hero.sub}</p></Reveal>
        <Reveal delay={0.3}><div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button onClick={() => scrollToId("contact")} style={{ padding: "0.95rem 2.1rem", background: YELLOW, color: "#111", fontFamily: FB, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "transform .2s, box-shadow .2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 22px rgba(255,195,0,.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>{t.hero.cta}</button>
          <button onClick={onAll} style={{ padding: "0.95rem 2.1rem", background: "transparent", color: "#fff", fontFamily: FB, fontSize: "0.78rem", fontWeight: 500, letterSpacing: "2.5px", textTransform: "uppercase", border: "1px solid rgba(255,255,255,.6)", cursor: "pointer", transition: "background .2s, border-color .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.12)"; e.currentTarget.style.borderColor = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,.6)"; }}>{t.hero.cta2}</button>
        </div></Reveal>
      </div>
    </section>

    {/* STATS — always dark, attached directly below hero */}
    <section style={{ background: "#1a1a1a", padding: "2rem 6%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }} className="sgr">
        {[
          { v: t.stats.a, l: t.stats.al, ic: 0 },
          { v: t.stats.b, l: t.stats.bl, ic: 1 },
          { v: t.stats.c, l: t.stats.cl, ic: 2 },
          { v: t.stats.d, l: t.stats.dl, ic: 3 },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.3rem", borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,.14)" }} className="statItem">
              <div style={{ flexShrink: 0, color: YELLOW }}><StatIcon idx={s.ic} /></div>
              <div>
                <div style={{ fontFamily: FD, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 500, color: "#fff", lineHeight: 1.1 }}>{s.v}</div>
                <div style={{ fontSize: "0.66rem", color: "rgba(255,255,255,.6)", letterSpacing: "2.5px", textTransform: "uppercase", marginTop: ".35rem" }}>{s.l}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* PORTFOLIO — Spaces We're Proud Of */}
    <section id="portfolio" style={{ background: theme === "light" ? "#f5f1ea" : c.bg2, padding: "5rem 6% 5.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div className="portHeader" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "0.7rem", color: YELLOW, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.8rem" }}>{t.port.eyebrow}</div>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", fontWeight: 500, color: c.text, lineHeight: 1.15, margin: 0 }}>{t.port.title}</h2>
            </div>
            <a onClick={onAll} style={{ fontSize: "0.72rem", color: c.text, letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", textDecoration: "none", transition: "color .2s", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              onMouseEnter={e => e.currentTarget.style.color = YELLOW}
              onMouseLeave={e => e.currentTarget.style.color = c.text}>{t.port.all} <span style={{ color: YELLOW }}>{"\u2192"}</span></a>
          </div>
        </Reveal>
        <PortfolioSlider projects={projects} onProj={onProj} t={t} c={c} theme={theme} />
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

    {/* SERVICES */}
    <section id="services" style={{ background: c.bg, padding: "5.5rem 6%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ fontSize: "0.7rem", color: YELLOW, letterSpacing: "3.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.8rem" }}>{t.svc.title}</div>
          <h2 style={{ fontFamily: FD, fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", fontWeight: 500, marginBottom: ".9rem", color: c.text, lineHeight: 1.2 }}>{t.svc.heading}</h2>
          <div style={{ width: 64, height: 2, background: YELLOW, margin: "0 auto 3.5rem" }} />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "2rem", alignItems: "start" }} className="svcgr">
          {t.svc.items.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ textAlign: "center", padding: "0 0.3rem" }}>
                <div style={{ width: 76, height: 76, borderRadius: "50%", border: "1px solid " + (theme === "light" ? "rgba(0,0,0,.12)" : "rgba(255,255,255,.18)"), display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.4rem", background: "transparent", transition: "border-color .3s, transform .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = YELLOW; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = theme === "light" ? "rgba(0,0,0,.12)" : "rgba(255,255,255,.18)"; e.currentTarget.style.transform = ""; }}>
                  <ServiceIcon idx={i} color={c.text} />
                </div>
                <h3 style={{ fontFamily: FD, fontSize: "1.1rem", fontWeight: 500, marginBottom: ".9rem", color: c.text, lineHeight: 1.3 }}>{s.s || s.t}</h3>
                <p style={{ fontSize: "0.76rem", color: c.text2, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
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

    {/* CONTACT — compact split layout */}
    <section id="contact" style={{ background: c.bg2, padding: "4rem 6%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "3.5rem", alignItems: "start" }} className="cgr">
          <Reveal>
            <div>
              <div style={{ fontSize: "0.72rem", color: YELLOW, letterSpacing: "3.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.75rem" }}>{t.ct.eyebrow}</div>
              <h2 style={{ fontFamily: FD, fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)", fontWeight: 500, color: c.text, lineHeight: 1.2, marginBottom: "0.85rem" }}>{t.ct.heading}</h2>
              <div style={{ width: 48, height: 2, background: YELLOW, marginBottom: "1.25rem" }} />
              <p style={{ fontSize: "0.92rem", color: c.text2, lineHeight: 1.65, marginBottom: "1.75rem", maxWidth: 440 }}>{t.ct.sub}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={YELLOW} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z"/></svg>), val: "02-409-2308", align: "center" },
                  { icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={YELLOW} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>), val: "wide11bangkok@gmail.com", align: "center" },
                  { icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={YELLOW} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>), val: "8/110 Soi Thian Talay 7,\nBang Khun Thian, Bangkok 10150", align: "flex-start" },
                ].map((row, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "0.7rem", alignItems: row.align }}>
                    <div style={{ flexShrink: 0, marginTop: row.align === "flex-start" ? 3 : 0 }}>{row.icon}</div>
                    <p style={{ fontSize: "0.9rem", color: c.text, lineHeight: 1.55, whiteSpace: "pre-line" }}>{row.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <CForm t={t} c={c} theme={theme} />
          </Reveal>
        </div>
      </div>
    </section>
  </div>;
}

function PortfolioSlider({ projects, onProj, t, c, theme }) {
  const perSlide = 3;
  const totalSlides = Math.max(1, Math.ceil(projects.length / perSlide));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const pauseTimerRef = useRef(null);

  const pauseAutoRotate = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => { setIsPaused(false); }, 12000);
  };

  // Clamp current slide if projects shrink
  useEffect(() => {
    if (currentSlide >= totalSlides) setCurrentSlide(0);
  }, [totalSlides, currentSlide]);

  // Auto-rotate
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  // IntersectionObserver for in-view gating of keyboard
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(([entry]) => { setIsInView(entry.isIntersecting); }, { threshold: 0.2 });
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (!isInView || totalSlides <= 1) return;
      if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        pauseAutoRotate();
      } else if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        pauseAutoRotate();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isInView, totalSlides]);

  // Cleanup pause timer
  useEffect(() => () => { if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current); }, []);

  // Build slides array
  const slides = [];
  for (let i = 0; i < projects.length; i += perSlide) {
    slides.push(projects.slice(i, i + perSlide));
  }
  if (slides.length === 0) slides.push([]);

  const showDots = projects.length > perSlide;

  return (
    <div ref={sectionRef} style={{ position: "relative" }}>
      <div style={{ overflow: "hidden" }}>
        <div style={{
          display: "flex",
          width: "100%",
          transform: "translateX(-" + (currentSlide * 100) + "%)",
          transition: "transform .5s ease-out"
        }}>
          {slides.map((slide, sIdx) => (
            <div key={sIdx} className="pgr" style={{ flex: "0 0 100%", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.4rem" }}>
              {slide.map((p, i) => (
                <div key={p.id} className="pcard ovcard" onClick={() => onProj(p)} style={{ position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: "4 / 5", background: "#111" }}>
                  <img src={p.image} alt={p.name} className="ovimg" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform .7s ease" }} onError={e => { e.target.src = P.fb; }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.55) 45%, rgba(0,0,0,.05) 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.6rem 1.5rem 1.7rem", color: "#fff" }}>
                    <div style={{ fontSize: "0.64rem", color: YELLOW, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.55rem" }}>{p.category || "Project"}</div>
                    <h3 style={{ fontFamily: FD, fontSize: "1.15rem", fontWeight: 500, color: "#fff", lineHeight: 1.3, marginBottom: "1.1rem" }}>{p.name}</h3>
                    <div className="ovpill" style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", padding: "0.6rem 1.1rem", border: "1px solid rgba(255,255,255,.45)", color: "#fff", fontSize: "0.66rem", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, transition: "background .25s, color .25s, border-color .25s" }}>{t.port.more} <span>{"\u2192"}</span></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {showDots && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}>
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentSlide(i); pauseAutoRotate(); }}
              aria-label={"Go to slide " + (i + 1)}
              style={{
                height: 8,
                width: currentSlide === i ? 24 : 8,
                borderRadius: 999,
                background: currentSlide === i ? YELLOW : (theme === "light" ? "rgba(0,0,0,.25)" : "rgba(255,255,255,.25)"),
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width .3s ease, background .3s ease"
              }}
            />
          ))}
        </div>
      )}
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
          <div key={cl.id + "-" + i} style={{ flex: "0 0 160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={cl.logo} alt={cl.name} style={{
              maxWidth: "100%", maxHeight: 56, objectFit: "contain",
              filter: "grayscale(100%)", opacity: 0.6, transition: "filter .3s, opacity .3s"
            }}
              onMouseEnter={e => { e.target.style.filter = "none"; e.target.style.opacity = 1; }}
              onMouseLeave={e => { e.target.style.filter = "grayscale(100%)"; e.target.style.opacity = 0.6; }}
              onError={e => { e.target.style.display = "none"; }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CForm({ t, c, theme }) {
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
  const borderC = theme === "light" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)";
  const iS = { width: "100%", padding: "0.9rem 1rem", background: "transparent", border: "1px solid " + borderC, color: c.text, fontFamily: FB, fontSize: ".88rem", borderRadius: 0, transition: "border-color .2s" };
  const onFocus = e => { e.target.style.borderColor = YELLOW; };
  const onBlur = e => { e.target.style.borderColor = borderC; };
  return <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }} className="cfgr">
      <input style={iS} onFocus={onFocus} onBlur={onBlur} placeholder={t.ct.fn} value={f.name} onChange={e => sF(x => ({ ...x, name: e.target.value }))} />
      <input style={iS} onFocus={onFocus} onBlur={onBlur} type="email" placeholder={t.ct.fe} value={f.email} onChange={e => sF(x => ({ ...x, email: e.target.value }))} />
    </div>
    <input style={iS} onFocus={onFocus} onBlur={onBlur} placeholder={t.ct.fp} value={f.phone} onChange={e => sF(x => ({ ...x, phone: e.target.value }))} />
    <textarea style={{ ...iS, minHeight: 120, resize: "vertical" }} onFocus={onFocus} onBlur={onBlur} placeholder={t.ct.fm} value={f.msg} onChange={e => sF(x => ({ ...x, msg: e.target.value }))} />
    {st === "sent" ? <div style={{ padding: ".8rem", background: "rgba(255,195,0,.1)", border: "1px solid " + YELLOW, borderRadius: 0, color: "#b8920a", textAlign: "center", fontSize: ".88rem" }}>{t.ct.st}</div>
    : <button onClick={go} disabled={st === "sending"} style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.7rem", background: YELLOW, color: "#111", fontFamily: FB, fontSize: ".72rem", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 0, opacity: st === "sending" ? 0.6 : 1, transition: "background .2s, color .2s" }}
      onMouseEnter={e => { if (st !== "sending") { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; } }}
      onMouseLeave={e => { e.currentTarget.style.background = YELLOW; e.currentTarget.style.color = "#111"; }}>
      {st === "sending" ? t.ct.sg : t.ct.sn} <span>{"\u2192"}</span></button>}
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
                <div style={{ background: c.card, border: "1px solid " + c.border, borderRadius: 10, overflow: "hidden", boxShadow: expanded === job.id ? "0 6px 28px rgba(0,0,0,.11)" : theme === "light" ? "0 2px 12px rgba(0,0,0,.07)" : "none", transition: "box-shadow .25s" }}>
                  <div onClick={() => setExpanded(expanded === job.id ? null : job.id)} style={{ padding: "1.6rem 1.8rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <h3 style={{ fontFamily: FD, fontSize: "1.15rem", fontWeight: 600, color: c.text, marginBottom: ".45rem" }}>{job.title}</h3>
                      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
                        {job.department && <span style={{ fontSize: ".78rem", color: YELLOW, fontWeight: 700, letterSpacing: ".5px" }}>{job.department}</span>}
                        {job.location && <span style={{ fontSize: ".78rem", color: c.text3 }}>{"📍 " + job.location}</span>}
                      </div>
                    </div>
                    <span style={{ fontSize: "1.3rem", color: c.text2, transition: "transform .25s", transform: expanded === job.id ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0, marginTop: ".2rem" }}>{"▾"}</span>
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
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)); }, []);

  const applyEmail = job.apply_email || "wide11bangkok@gmail.com";
  const subject = encodeURIComponent("Application for " + job.title);
  const body = encodeURIComponent(
    "Hi Wide-Eleven Team,\n\nI am interested in applying for the " + job.title + " position.\n\nPlease find my details below:\n\nName: \nPhone: \nEmail: \nYears of Experience: \n\nI look forward to hearing from you.\n\nBest regards,"
  );
  // Mobile: mailto opens Gmail app directly. Desktop: Gmail web compose.
  const mailHref = isMobile
    ? "mailto:" + applyEmail + "?subject=" + subject + "&body=" + body
    : "https://mail.google.com/mail/?view=cm&to=" + encodeURIComponent(applyEmail) + "&su=" + subject + "&body=" + body;
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
            <a href={mailHref} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: ".85rem 2.4rem", background: YELLOW, color: "#111", fontFamily: FB, fontSize: ".82rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: 3, textDecoration: "none" }}>{t.careers.apply}</a>
            <span style={{ fontSize: ".82rem", color: c.text3 }}>{"or email: "}<span style={{ color: c.text2, userSelect: "all" }}>{applyEmail}</span></span>
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
          <a href={mailHref} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: ".9rem 2.8rem", background: YELLOW, color: "#111", fontFamily: FB, fontSize: ".82rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: 3, textDecoration: "none" }}>{t.careers.apply}</a>
          <p style={{ marginTop: ".9rem", fontSize: ".8rem", color: c.text3 }}>{"or email us at "}<span style={{ color: c.text2, userSelect: "all" }}>{applyEmail}</span></p>
        </div>
      </Reveal>
    </div>
  </div>;
}
