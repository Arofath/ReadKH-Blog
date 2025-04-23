export default function Card() {
  return (
    <>
      <section className="mt-6">
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
            <div className="flex flex-col items-center p-6 bg-[#FDFCF7] dark:bg-gray-900 rounded-xl">
              <h3 className="text-xl font-semibold text-[#A27B5C] dark:text-yellow-400">
                Our Mission
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300 text-lg mt-2">
                To create a safe, inspiring space for writers and readers. We
                empower young voices, preserve cultural stories, and support
                self-expression through writing.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#FDFCF7] dark:bg-gray-900 rounded-xl">
              <h3 className="text-xl font-semibold text-[#A27B5C] dark:text-yellow-400">
                Our Vision
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300 text-lg mt-2">
                A world where stories unite hearts, cultures, and generations.
                We envision a future where everyone can share, learn, and grow
                through storytelling.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#FDFCF7] dark:bg-gray-900 rounded-xl">
              <h3 className="text-xl font-semibold text-[#A27B5C] dark:text-yellow-400">
                Our Core Values
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300 text-lg mt-2">
                We celebrate creativity, empathy, and inclusiveness, welcoming
                diverse voices and ideas. We support growth through learning,
                reflection, and positive change.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#FDFCF7] dark:bg-gray-900 rounded-xl">
              <h3 className="text-xl font-semibold text-[#A27B5C] dark:text-yellow-400">
                Why We Started
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300 text-lg mt-2">
                ReadKH was founded by passionate students and creators to blend
                personal growth, education, and cultural pride into one
                platform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
