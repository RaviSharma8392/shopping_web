import React from "react";
import { NavLink } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      {/* OUR STORY */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-pink-700 mb-6">Our Story</h1>

        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          ANJANI & VISHAL — CO-FOUNDERS
        </h3>

        <p className="mb-4">
          Named after a gracious and joyful woman, <strong>bAbli</strong> was
          born to bring you back to your comfort place — a space where
          simplicity, youthfulness, and confidence flow naturally.
        </p>

        <p className="mb-4">
          Our roots lie deeply in the textile traditions of rural India. Fashion
          is an inheritance for us — passed down through generations who valued
          craftsmanship, sustainability, and the quiet beauty of organic
          fabrics.
        </p>

        <p className="mb-4">
          At bAbli, we embrace every shape, size, and style. Whether you prefer
          playful prints or elegant basics, each piece is designed to drape you
          with grace — the same grace you already carry within yourself.
        </p>

        <p className="font-semibold text-pink-700 mt-6">
          SUSTAINABLE US, FOR THE SUSTAINABLE YOU!
        </p>
      </section>

      {/* CLIENT REVIEWS */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-pink-700 mb-6">
          What Our Customers Say
        </h2>

        <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 shadow-sm">
          <p className="italic text-gray-700 mb-4">
            “Hello, I received my parcel… this was my first order from Babli and
            I can’t believe the level of cute packaging! Each top packed safely
            in its own cloth bag — I absolutely loved it. The fabric feels
            amazing. Honestly, I think I’m going to order all the tops and
            kurtis next! I even planned to gift some of them, but now I’m not
            sure I want to part with any of it.”
          </p>

          <p className="text-right font-semibold text-gray-800">
            — Shivangi Khetan
          </p>
        </div>
      </section>

      {/* SLIDER HEADINGS / NAVIGATION INDICATORS */}
      <section className="mb-20 flex items-center justify-center gap-6 text-pink-700 font-medium">
        <button className="hover:underline">Go to item 1</button>
        <button className="hover:underline">Go to item 2</button>
        <button className="hover:underline">Go to item 3</button>
      </section>

      {/* YOU & BABLI */}
      <section className="text-center my-16">
        <h2 className="text-4xl font-bold text-pink-700 mb-3">You & Babli !</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A celebration of real women, real stories, and real style. This
          journey is as much yours as it is ours.
        </p>
      </section>
    </div>
  );
}
