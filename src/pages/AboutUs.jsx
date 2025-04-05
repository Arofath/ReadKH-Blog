
import React from "react";
import AboutUsIntro from "../components/greeting/AboutUsIntro";
import Mentors from "../components/mentors/Mentors";
import Card from "../components/card/Card";
import Members from "../components/team-member/Members";


function AboutUs() {
  return (
    <>
      <header>
        <nav></nav>
      </header>
      <main>
        <section className="max-w-7xl mx-auto text-center sm:px-8 lg:px-16">
          <div className="w-full max-w-7xl mt-20 mx-auto flex flex-col items-center px-10 md:px-16 lg:px-16">
            <img src="/images/readKh/readKh.png" alt="ReadKh" />
          </div>

          <AboutUsIntro />

          <Card />

          {/* Mentor */}
          <section className="flex flex-col items-center mt-6">
            <h4 className="text-3xl sm:text-3xl font-medium text-[#A27B5C] mb-15">
              Mentors
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-15">
              <Mentors
                profile={"/images/mentors/teacher-chhaya.jpg"}
                name={"Chan Chhaya"}
                role={"Teacher"}
                position={"Senior Instructor"}
                facebook={"https://www.facebook.com/chhayadevkh"}
                github={"https://github.com/it-chhaya"}
              />
              <Mentors
                profile={"/images/mentors/teacher-chipor.png"}
                name={"Sreng Chipor"}
                role={"Teacher"}
                position={"Assistant Instructor"}
                facebook={"https://web.facebook.com/sreng.chipor"}
                github={"https://github.com/jiporCK"}
              />
            </div>
          </section>

          {/* Team Member */}
          <section className="flex flex-col items-center mt-18">
            <h4 className="text-3xl font-medium text-[#A27B5C]">
              Team Members
            </h4>
            <div className="flex flex-col item-center">
              {/* First Row*/}
              <div className="grid grid-cols-1 gap-15 md:grid-cols-3 lg:grid-cols-3 mt-15">
                <Members
                  profile={"/images/team-member/san_monysereyvathana.JPG"}
                  name={"San Monysereyvathana"}
                  team={"General Leader"}
                  role={"ux/ui designer"}
                  facebook={"https://www.facebook.com/profile.php?id=100065689605041"}
                  github={"https://github.com/vathanavath"}
                />
                <Members
                  profile={"/images/team-member/huot_sreypov.JPG"}
                  name={"Huot Sreypov"}
                  team={"Sub Leader"}
                  role={"API"}
                  facebook={"https://www.facebook.com/share/1Jd42J4TvT/"}
                  github={"https://github.com/sreypov-hout"}
                />
                <Members
                  profile={"/images/team-member/vy_hourtong.JPG"}
                  name={"Vy Hourtong"}
                  team={"Member"}
                  role={"API"}
                  facebook={"https://www.facebook.com/share/1Bea3eAiZz/?mibextid=wwXIfr"}
                  github={"https://github.com/Vyhourtong"}
                />
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 gap-15 md:grid-cols-3 lg:grid-cols-3 mt-15 ">
                <Members
                  profile={"/images/team-member/sles_rofath.JPG"}
                  name={"Sles Rofath"}
                  team={"Member"}
                  role={"Developer"}
                  facebook={"https://www.facebook.com/arofath.stn"}
                  github={"https://github.com/Arofath"}
                />
                <Members
                  profile={"/images/team-member/huon_thanun.JPG"}
                  name={"Huon Thanun"}
                  team={"Member"}
                  role={"Developer"}
                  facebook={"https://www.facebook.com/share/16QeYJfu5n/"}
                  github={"https://github.com/huon-thanun"}
                />
                <Members
                  profile={"/images/team-member/chhay_davin.JPG"}
                  name={"Chhay Davin"}
                  team={"Member"}
                  role={"Developer"}
                  facebook={"https://www.facebook.com/share/15JJ8AZQpA/?mibextid=qi2Omg"}
                  github={"https://github.com/ArthurLeyVin"}
                />
              </div>

              {/* third row */}
              <div className="grid grid-cols-1 gap-15 md:grid-cols-3 lg:grid-cols-3 mt-15 mb-15">
                <Members
                  profile={"/images/team-member/heng_meymey.JPG"}
                  name={"Heng Meymey"}
                  team={"Member"}
                  role={"Developer"}
                  facebook={"https://www.facebook.com/jasmine.jessica462"}
                  github={"https://github.com/hengmeymey15"}
                  
                />
                <Members
                  profile={"/images/team-member/broem_panha.JPG"}
                  name={"Broem Panha"}
                  team={"Member"}
                  role={"ux/ui designer"}
                  facebook={"https://www.facebook.com/share/1Bc1gnkna3/?mibextid=wwXIfr"}
                  github={"https://github.com/PaNha-7685"}
                />
                <Members
                  profile={"/images/team-member/khann_khanchana.JPG"}
                  name={"Khann Kanhchana"}
                  team={"Member"}
                  role={"Developer"}
                  facebook={"https://www.facebook.com/kanh.chana.9277?mibextid=LQQJ4d"}
                  github={"https://github.com/khannkanhchana"}
                />
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
  
  export default AboutUs;