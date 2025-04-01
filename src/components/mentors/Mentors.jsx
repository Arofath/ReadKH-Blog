export default function Mentors() {
  return (
    <>
      <section className="flex flex-col items-center">
        <h4 className="text-3xl font-medium text-[#A27B5C] mb-8">Mentors</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mentor Card 1 */}
          <div className="w-full max-w-sm bg-white border border-gray-300 rounded-2xl p-6 shadow-lg flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden flex justify-center items-center">
              <img
                className="w-full h-full object-cover"
                src="/images/mentors/teacher-chhaya.jpg"
                alt="Teacher-Chhaya"
              />
            </div>
            <h5 className="mt-3 text-xl font-semibold text-gray-900">
              Chan Chhaya
            </h5>
            <small className="text-sm text-gray-500 mt-2">Teacher</small>
            <p className="text-sm uppercase text-[#A27B5C] font-medium mt-2">
              Senior Instructor
            </p>

            {/* Social Icons */}
            <div className="flex space-x-5 mt-4 text-gray-700">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-pinterest-p"></i>
              <i className="fa-brands fa-x-twitter"></i>
            </div>
          </div>

          {/* Mentor Card 2 */}
          <div className="w-full max-w-sm bg-white border border-gray-300 rounded-2xl p-6 shadow-lg flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden flex justify-center items-center">
              <img
                className="w-full h-full object-cover"
                src="/images/mentors/teacher-chipor.png"
                alt="Teacher-Chipor"
              />
            </div>
            <h5 className="mt-3 text-xl font-semibold text-gray-900">
              Sreng Chipor
            </h5>
            <small className="text-sm text-gray-500 mt-2">Teacher</small>
            <p className="text-sm uppercase text-[#A27B5C] font-medium mt-2">
              Assistant Instructor
            </p>

            {/* Social Icons */}
            <div className="flex space-x-5 mt-4 text-gray-700">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-pinterest-p"></i>
              <i className="fa-brands fa-x-twitter"></i>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

{
  /* <section>
            <h4 className="text-3xl text-[#A27B5C] font-medium mb-4 text-center">Mentor</h4>
            <div className="grid grid-cols-2 text-center">
                <div>
                    <img className="rounded-full" src="/public/images/mentors/teacher-chhaya.jpg" alt="Teacher-Chhaya" />
                    <p className="text-xl font-medium">Chan Chhaya</p>
                    <small className="text-[#666666]">Teacher</small>
                    <p className="text-base uppercase text-[#A27B5C]">Senior Instructor</p>
                    
                </div>
                <div>
                    <img className="rounded-full" src="/public/images/mentors/teacher-chipor.png" alt="Teacher-Chipor" />
                    <p className="text-xl font-medium">Sreng Chipor</p>
                    <small className="text-[#666666]">Teacher</small>
                    <p className="text-base uppercase text-[#A27B5C]">Assistant Instructor</p>
                </div>
            </div>
        </section> */
}

{
  /* <section className="flex justify-center">
        <h4 className="text-3xl text-[#A27B5C] font-medium mb-4 text-center">Mentor</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="w-full max-w-sm bg-white border border-gray-500 rounded-lg flex flex-col items-center">
            <div class="flex flex-col items-center pb-10">
              <img
                class="w-24 h-24 mb-3 rounded-full"
                src="/public/images/mentors/teacher-chhaya.jpg"
                alt="Teacher-Chhaya"
              />
              <h5 class="mb-1 text-xl font-medium text-gray-900 ">
                Chan Chhaya 
              </h5>
              <small class="text-sm text-[#666666] dark:text-gray-400">
                Teacher
              </small>
              <p className="text-base uppercase text-[#A27B5C]">Senior Instructor</p>
            </div>
          </div>

          <div class="w-full max-w-sm bg-white border border-gray-500 rounded-lg">
            <div class="flex flex-col items-center pb-10">
              <img
                class="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="public/images/mentors/teacher-chipor.png"
                alt="Teacher-Chipor"
              />
              <h5 class="mb-2 text-xl font-medium text-gray-900 ">
                Sreng Chipor 
              </h5>
              <small class="text-sm text-[#666666] dark:text-gray-400 mb-2">
                Teacher
              </small>
              <p className="text-base uppercase text-[#A27B5C]">Assistant Instructor</p>
            </div>
          </div>
        </div>
      </section> */
}
