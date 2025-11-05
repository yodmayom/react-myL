import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [open, setOpen] = useState(false);

  // สร้างหัวใจเยอะ ๆ แบบสุ่ม (80 ดวง)
  const hearts = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100, // ตำแหน่งแนวนอน (%)
    size: Math.random() * 40 + 30, // ขนาดหัวใจ (ใหญ่ขึ้น)
    delay: Math.random() * 6, // เวลาหน่วงเริ่มตก
    duration: Math.random() * 7 + 6, // ความเร็วในการตก
    rotate: Math.random() * 360, // มุมหมุนสุ่ม
  }));

  return (
    <div
      className={`relative flex justify-center items-center w-screen h-screen overflow-hidden transition-all duration-500 ${
        open ? "backdrop-blur-md bg-rose-100/50" : "bg-gradient-to-b from-pink-50 to-rose-100"
      }`}
    >
      {/* หัวใจตกจากขอบบนสุด */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-red-500 select-none pointer-events-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            top: "-100px", // เริ่มจากเหนือขอบบนของ viewport
            rotate: h.rotate,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: "120vh", opacity: [0.9, 1, 0.3] }}
          transition={{
            delay: h.delay,
            duration: h.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* คลิกพื้นหลังเพื่อปิด */}
      {open && <div className="absolute inset-0 z-10" onClick={() => setOpen(false)} />}

      {/* ซองจดหมาย */}
      <motion.div
        onClick={() => !open && setOpen(true)}
        className="relative z-20 cursor-pointer select-none"
        initial={{ rotate: -3 }}
        animate={{ rotate: open ? 0 : -3, scale: open ? 0.95 : 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        {/* ตัวซอง */}
        <div className="relative w-80 h-52 bg-[#f7e4b5] border border-amber-600 shadow-lg rounded-b-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdf3d6] to-[#f2d58f]" />

          {/* ฝาสามเหลี่ยม */}
          <motion.div
            className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[100px] border-l-transparent border-r-transparent origin-top"
            style={{
              borderTopColor: "#f4ce75",
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.15)) brightness(0.98)",
            }}
            animate={{ rotateX: open ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* จุดแดงตรงปลายฝาซอง */}
            <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 rounded-full border-2 border-red-800 shadow-md" />
          </motion.div>
        </div>
      </motion.div>

      {/* กระดาษข้อความ */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute z-30 w-[420px] h-[320px] bg-[#fffdf5] shadow-xl border border-amber-200 rounded-lg flex justify-center items-center p-6"
            initial={{ opacity: 0, y: 200, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            exit={{ opacity: 0, y: 200, rotate: -3 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* มุมพับ + หัวใจ */}
            <motion.div
              className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#f7e4b5] to-[#fdf3d6] rounded-br-lg shadow-md origin-top-left"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
              animate={{ rotateX: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute top-[6px] left-[6px] text-red-600 text-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                ❤️
              </motion.div>
            </motion.div>

            <p className="text-amber-900 text-xl leading-relaxed font-serif text-center px-4">
              💌 "อันนี้เค้าเองนะคะ เค้าอยากทำมาเพื่อขอโทษแฟนหลายๆอย่าเลยวันนี้วันนี้พี่ทำให้หนูเสียใจ ทำให้หนูร้องไห้มั้ยไม่รู้ แถมไม่ได้ไปลอยกระทงด้วย แถมเมินด้วย พี่อยากขอโทษทั้งหมดที่พี่ทำไป พี่ขอโทษนะคะพี่รักหนูน่ะคะอย่าโกรธพี่เลยนะคะ พี่ทำงานจนไม่สนใจแบบนี้แต่พอมีเวลาพี่จะคุยด้วยตลอดเลยนะคะ เลิฟๆ 💗💗"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
