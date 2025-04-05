export default function Card() {
  return (
    <>
      <section className="mt-6">
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
            <div className="flex flex-col items-center p-6 bg-[#FDFCF7] rounded-xl">
              <img
                src="/images/cards-images/advanced-ai.png"
                alt="Advanced-Ai"
              />
              <h3 className="text-lg font-semibold mt-3">Advanced AI Models</h3>
              <p className="text-center text-gray-600 text-sm">
                Access multiple frontier models like Claude, GPT-4, Command R+,
                and Mistral Large.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#FDFCF7] rounded-xl">
              <img
                className="mt-3 mb-2.5"
                src="/images/cards-images/language-support.png"
                alt="Language-support"
              />
              <h3 className="text-lg font-semibold mt-2">Multilingual Support</h3>
              <p className="text-center text-gray-600 text-sm">
                Write in any language and even provide instructions in your
                native tongue.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#FDFCF7] rounded-xl">
              <img
                src="/images/cards-images/customize-writing.png"
                alt="Customize-writing"
              />
              <h3 className="text-lg font-semibold mt-3">Customizable Writing</h3>
              <p className="text-center text-gray-600 text-sm">
                Define your unique writing style, genre, and narrative
                structure.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-[#FDFCF7] rounded-xl">
              <img
                src="/images/cards-images/character-development.png"
                alt="Caracter-development"
              />
              <h3 className="text-lg font-semibold mt-3">Character Development</h3>
              <p className="text-center text-gray-600 text-sm">
                Create deep, evolving characters with detailed backgrounds and
                personalities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



