import AboutUsIntro from "./components/greeting/AboutUsIntro";
import Mentors from "./components/mentors/Mentors";
import Card from "./components/cards/Card";
import Members from "./components/team-member/Members";

function App() {
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
              />
              <Mentors
                profile={"/images/mentors/teacher-chipor.png"}
                name={"Sreng Chipor"}
                role={"Teacher"}
                position={"Assistant Instructor"}
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
                  profile={"/images/mentors/teacher-chipor.png"}
                  name={"San Monysereyvathana"}
                  team={"BLOG TEAM"}
                  role={"ux/ui designer"}
                />
                <Members
                  profile={"/images/mentors/teacher-chipor.png"}
                  name={"Borem Phanha"}
                  team={"BLOG TEAM"}
                  role={"ux/ui designer"}
                />
                <Members
                  profile={"/images/mentors/teacher-chipor.png"}
                  name={"Hout Sreypov"}
                  team={"BLOG TEAM"}
                  role={"API"}
                />
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 gap-15 md:grid-cols-3 lg:grid-cols-3 mt-15 ">
                <Members
                  profile={"/images/mentors/teacher-chipor.png"}
                  name={"Vy Hourtong"}
                  team={"BLOG TEAM"}
                  role={"API"}
                />
                <Members
                  profile={"/images/mentors/teacher-chipor.png"}
                  name={"Khann Kanhchana"}
                  team={"BLOG TEAM"}
                  role={"Developer"}
                />
                <Members
                  profile={"/images/mentors/teacher-chipor.png"}
                  name={"Sles Rofath"}
                  team={"BLOG TEAM"}
                  role={"Developer"}
                />
              </div>

              {/* third row */}
              <div className="grid grid-cols-1 gap-15 md:grid-cols-3 lg:grid-cols-3 mt-15 mb-15">
                <Members
                  profile={"/images/mentors/teacher-chipor.png"}
                  name={"Houn Thanun"}
                  team={"BLOG TEAM"}
                  role={"Developer"}
                />
                <Members
                  profile={"/images/mentors/teacher-chipor.png"}
                  name={"Chayy Davin"}
                  team={"BLOG TEAM"}
                  role={"Developer"}
                />
                <Members
                  profile={"/images/mentors/teacher-chipor.png"}
                  name={"Heng Meymey"}
                  team={"BLOG TEAM"}
                  role={"Developer"}
                />
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default App;
