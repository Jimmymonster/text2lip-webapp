"use client";

import Navbar from "@/components/Navbar";


function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)] min-h-96">
        <div className="flex flex-col w-[80%] h-[80%] min-h-96 justify-center items-center bg-[color:var(--palette2)] rounded-xl px-4 py-4 gap-3" >
          <div className="flex flex-col w-full h-full min-h-80 bg-[color:var(--bg-box-col)] rounded-xl text-[color:var(--text-color-1)] font-inter font-semibold p-4">
            <div className="text-2xl sm:text-4xl h-fit">วิธีใช้เบื้องต้น</div>
            <div className="text-lg sm:text-2xl h-fit"> Text to Speech</div>
            <div className="text-base sm:text-xl h-fit"> - คัดลอกบทความ อัพโหลดไฟล์ หรือพิมพ์ด้วยตัวเอง มาใส่ในช่องข้อความ</div>
            <div className="text-base sm:text-xl h-fit"> - เลือกเสียง และกด submit</div>
            <div className="text-lg sm:text-2xl h-fit"> Text to Lip</div>
            <div className="text-base sm:text-xl h-fit"> - คัดลอกบทความ อัพโหลดไฟล์ หรือพิมพ์ด้วยตัวเอง มาใส่ในช่องข้อความ</div>
            <div className="text-base sm:text-xl h-fit"> - อัพโหลด video mp4 ที่มีหน้าคน</div>
            <div className="text-base sm:text-xl h-fit"> - เลือกเสียง และกด submit</div>
          </div>
        </div>
      </div>
    </div>

  );
}
export default Home;