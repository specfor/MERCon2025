import React from "react";
import SectionHeader from "../components/sectionHeader";
import { createPageHead } from "../components/pageHead";

const RegistrationPage = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* ===== FIXED DARK GREEN BACKGROUND ===== */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgb(14, 46, 32) 0%,
              rgb(8, 26, 18) 45%,
              rgb(2, 6, 4) 80%
            )
          `,
        }}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="w-full pb-10 pt-36 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeader headerText="Registration" textClass="text-white" />

          <p className="para text-gray-200 text-lg max-w-4xl mx-auto leading-relaxed mt-6">
            MERCon 2026 will be held at the University of Moratuwa physically and will facilitate foreign participants
            via online platforms. The following fee categories will be charged to cover IEEE payments, paper management
            systems, online conference platforms, and meals and refreshments.
          </p>
        </div>
      </section>

      {/* ===== REGISTRATION FEES ===== */}
      <section className="w-full py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Registration Fees</h3>

          <p className="para text-gray-300 mb-6">
            <strong>Registration fees are given below.</strong>
          </p>

          <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/5 backdrop-blur-md">
            <table className="w-full border-collapse para text-gray-200">
              <thead>
                <tr className="bg-white/10 text-white">
                  <th className="py-4 px-6 text-left font-semibold border-r border-white/10 align-top">Category</th>
                  <th className="py-4 px-6 text-left font-semibold border-r border-white/10 align-top">
                    Early Bird Registration<br />
                    <span className="text-sm font-normal text-gray-300">(4th July 2026 - 15th July 2026)</span>
                  </th>
                  <th className="py-4 px-6 text-left font-semibold align-top">
                    Normal Registration<br />
                    <span className="text-sm font-normal text-gray-300">(16th July 2026 onwards)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Category 1 - Full Registration */}
                <tr className="bg-white/10 text-white font-semibold">
                  <td colSpan={3} className="py-3 px-6">
                    Category 1 - Full Registration
                  </td>
                </tr>
                {/* Category 1 - Local Authors */}
                <tr className="bg-white/5 text-gray-300 font-medium">
                  <td colSpan={3} className="py-2 px-6 pl-8">
                    Local Authors
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">IEEE Members</td>
                  <td className="py-4 px-6 border-r border-white/10">30,000 LKR</td>
                  <td className="py-4 px-6">32,500 LKR</td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">Non-IEEE Members</td>
                  <td className="py-4 px-6 border-r border-white/10">40,000 LKR</td>
                  <td className="py-4 px-6">45,000 LKR</td>
                </tr>
                {/* Category 1 - International Authors */}
                <tr className="bg-white/5 text-gray-300 font-medium border-b border-white/10 border-t border-white/10">
                  <td colSpan={3} className="py-2 px-6 pl-8">
                    International Authors
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">IEEE Members</td>
                  <td className="py-4 px-6 border-r border-white/10">240 USD</td>
                  <td className="py-4 px-6">290 USD</td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">Non-IEEE Members</td>
                  <td className="py-4 px-6 border-r border-white/10">350 USD</td>
                  <td className="py-4 px-6">400 USD</td>
                </tr>

                {/* Category 2 - Limited Registration */}
                <tr className="bg-white/10 text-white font-semibold">
                  <td colSpan={3} className="py-3 px-6">
                    Category 2 - Limited Registration
                  </td>
                </tr>
                {/* Category 2 - Local Authors */}
                <tr className="bg-white/5 text-gray-300 font-medium">
                  <td colSpan={3} className="py-2 px-6 pl-8">
                    Local Authors
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">IEEE Members</td>
                  <td className="py-4 px-6 border-r border-white/10">22,500 LKR</td>
                  <td className="py-4 px-6">25,000 LKR</td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">Non-IEEE Members</td>
                  <td className="py-4 px-6 border-r border-white/10">30,000 LKR</td>
                  <td className="py-4 px-6">35,000 LKR</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">IEEE Student Member</td>
                  <td className="py-4 px-6 border-r border-white/10">15,000 LKR</td>
                  <td className="py-4 px-6">17,500 LKR</td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">Student Non-IEEE Member</td>
                  <td className="py-4 px-6 border-r border-white/10">20,000 LKR</td>
                  <td className="py-4 px-6">25,000 LKR</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">Non-Presenting Authors</td>
                  <td className="py-4 px-6 border-r border-white/10">5,000 LKR</td>
                  <td className="py-4 px-6">7,500 LKR</td>
                </tr>
                {/* Category 2 - International Authors */}
                <tr className="bg-white/5 text-gray-300 font-medium border-b border-white/10 border-t border-white/10">
                  <td colSpan={3} className="py-2 px-6 pl-8">
                    International Authors
                  </td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">IEEE Members</td>
                  <td className="py-4 px-6 border-r border-white/10">200 USD</td>
                  <td className="py-4 px-6">250 USD</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">Non-IEEE Members</td>
                  <td className="py-4 px-6 border-r border-white/10">300 USD</td>
                  <td className="py-4 px-6">350 USD</td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">Student – IEEE Member</td>
                  <td className="py-4 px-6 border-r border-white/10">100 USD</td>
                  <td className="py-4 px-6">175 USD</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">Student Non-IEEE Member</td>
                  <td className="py-4 px-6 border-r border-white/10">150 USD</td>
                  <td className="py-4 px-6">250 USD</td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">Non-Presenting Authors</td>
                  <td className="py-4 px-6 border-r border-white/10">50 USD</td>
                  <td className="py-4 px-6">75 USD</td>
                </tr>

                {/* Category 3 - Participant Registration */}
                <tr className="bg-white/10 text-white font-semibold">
                  <td colSpan={3} className="py-3 px-6">
                    Category 3 - Participant Registration
                  </td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">Local Participants</td>
                  <td className="py-4 px-6 border-r border-white/10">5,000 LKR</td>
                  <td className="py-4 px-6">7,500 LKR</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">Foreign Participants</td>
                  <td className="py-4 px-6 border-r border-white/10">50 USD</td>
                  <td className="py-4 px-6">75 USD</td>
                </tr>

                {/* Extra Banquet Ticket */}
                <tr className="bg-white/10 text-white font-semibold">
                  <td colSpan={3} className="py-3 px-6">
                    Extra Banquet Ticket (any registration category)
                  </td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">Local Participant</td>
                  <td colSpan={2} className="py-4 px-6">10,000 LKR</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">Foreign Participant</td>
                  <td colSpan={2} className="py-4 px-6">50 USD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== REGISTRATION NOTES ===== */}
      <section className="w-full py-16 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Registration Notes</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-8 border border-white/10">
              <h4 className="text-xl font-semibold text-primary-400 mb-4">Registration Policy</h4>
              <ul className="list-disc list-inside para text-gray-300 space-y-2">
                <li>Each registration is valid for one (1) participant only.</li>
                <li>All participants, including co-authors, are required to register individually if they plan to attend the conference.</li>
                <li>For each accepted paper, at least one author must complete the appropriate conference registration for the paper to be included in the conference technical program.</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-lg p-8 border border-white/10">
              <h4 className="text-xl font-semibold text-primary-400 mb-4">Additional Banquet Tickets</h4>
              <ul className="list-disc list-inside para text-gray-300 space-y-2">
                <li>Participants registered under any registration category may purchase additional banquet tickets separately.</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-lg p-8 border border-white/10 md:col-span-2 overflow-x-auto">
              <h4 className="text-xl font-semibold text-primary-400 mb-4">Registration Benefits</h4>
              
              <table className="w-full min-w-[600px] border-collapse text-sm text-gray-300 mt-4">
                <thead>
                  <tr className="border-b border-white/10 text-white">
                    <th className="py-3 px-4 text-left font-semibold">Benefit</th>
                    <th className="py-3 px-4 text-center font-semibold">Full Registration</th>
                    <th className="py-3 px-4 text-center font-semibold">Limited Author</th>
                    <th className="py-3 px-4 text-center font-semibold">Student</th>
                    <th className="py-3 px-4 text-center font-semibold">Participant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10 bg-white/5">
                    <td className="py-3 px-4">Presentation of up to two (2) papers</td>
                    <td className="py-3 px-4 text-center">
                      <svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </td>
                    <td className="py-3 px-4 text-center"></td>
                    <td className="py-3 px-4 text-center"></td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Presentation of one (1) paper</td>
                    <td className="py-3 px-4 text-center"></td>
                    <td className="py-3 px-4 text-center"></td>
                    <td className="py-3 px-4 text-center">
                      <svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </td>
                    <td className="py-3 px-4 text-center"></td>
                  </tr>
                  <tr className="border-b border-white/10 bg-white/5">
                    <td className="py-3 px-4">Access to all conference sessions</td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Conference pack</td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                  </tr>
                  <tr className="border-b border-white/10 bg-white/5">
                    <td className="py-3 px-4">Morning and afternoon coffee breaks</td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Conference Lunch</td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                  </tr>
                  <tr className="border-b border-white/10 bg-white/5">
                    <td className="py-3 px-4">Conference banquet</td>
                    <td className="py-3 px-4 text-center"><svg className="w-5 h-5 text-primary-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></td>
                    <td className="py-3 px-4 text-center"></td>
                    <td className="py-3 px-4 text-center"></td>
                    <td className="py-3 px-4 text-center"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PAYMENT METHOD ===== */}
      <section className="w-full py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6">Payment Method</h3>

          <div className="bg-white/5 backdrop-blur-md rounded-lg p-8 border border-white/10 text-center">
            <p className="para text-gray-300 mb-4 text-lg">
              Payments are securely processed via the official MERCon Payment Gateway.
            </p>
            <p className="para text-primary-400 font-semibold text-lg">
              We accept <strong>Visa, Mastercard, and UnionPay</strong> cards.
            </p>
          </div>
        </div>
      </section>

      {/* ===== REGISTER CTA ===== */}
      <section className="w-full py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Ready to Register?</h3>

            <p className="para text-gray-300 mb-8 text-lg">
              Click the button below to proceed to the registration and payment system.
            </p>

            <a
              href="https://pay.mercon.uom.lk"
              className="inline-block px-12 py-4 bg-primary-500 text-white font-bold text-lg rounded-full hover:bg-primary-600 transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] hover:scale-105"
            >
              Proceed to Registration & Payment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationPage;

export const Head = createPageHead({
  title: "Registration - MERCon 2026",
  description: "MERCon 2026 registration fees, payment details, and participant categories.",
});
