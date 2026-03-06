import React from "react";
import SectionHeader from "../components/sectionHeader";

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
            MERCon 2025 will be held at the University of Moratuwa physically and
            will facilitate foreign participants via online platforms. The
            following fee categories will be charged to cover IEEE payments,
            paper management systems, online conference platforms, and meals and
            refreshments.
          </p>
        </div>
      </section>

      {/* ===== REGISTRATION FEES ===== */}
      <section className="w-full py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Registration Fees
          </h3>

          <p className="para text-gray-300 mb-6">
            <strong>Registration fees are given below.</strong>
          </p>

          <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/5 backdrop-blur-md">
            <table className="w-full border-collapse para text-gray-200">
              <thead>
                <tr className="bg-white/10 text-white">
                  <th className="py-4 px-6 text-left font-semibold border-r border-white/10">
                    Category
                  </th>
                  <th className="py-4 px-6 text-left font-semibold border-r border-white/10">
                    Early Bird Registration
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">
                    Normal Registration
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Author Registration - Local Authors */}
                <tr className="bg-white/10 text-white font-semibold">
                  <td colSpan={3} className="py-3 px-6">
                    Author Registration - Local Authors
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">
                    IEEE Members
                  </td>
                  <td className="py-4 px-6 border-r border-white/10">22,500 LKR</td>
                  <td className="py-4 px-6">25,000 LKR</td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">
                    Non-IEEE Members
                  </td>
                  <td className="py-4 px-6 border-r border-white/10">30,000 LKR</td>
                  <td className="py-4 px-6">35,000 LKR</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">
                    IEEE Student Member
                  </td>
                  <td className="py-4 px-6 border-r border-white/10">15,000 LKR</td>
                  <td className="py-4 px-6">17,500 LKR</td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">
                    Student Non-IEEE Member
                  </td>
                  <td className="py-4 px-6 border-r border-white/10">20,000 LKR</td>
                  <td className="py-4 px-6">25,000 LKR</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">
                    Non-Presenting Authors
                  </td>
                  <td className="py-4 px-6 border-r border-white/10">5,000 LKR</td>
                  <td className="py-4 px-6">7,500 LKR</td>
                </tr>

                {/* Author Registration - International Authors */}
                <tr className="bg-white/10 text-white font-semibold">
                  <td colSpan={3} className="py-3 px-6">
                    Author Registration - International Authors
                  </td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">
                    IEEE Members
                  </td>
                  <td className="py-4 px-6 border-r border-white/10">200 USD</td>
                  <td className="py-4 px-6">250 USD</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">
                    Non-IEEE Members
                  </td>
                  <td className="py-4 px-6 border-r border-white/10">300 USD</td>
                  <td className="py-4 px-6">350 USD</td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">
                    Student – IEEE Member
                  </td>
                  <td className="py-4 px-6 border-r border-white/10">100 USD</td>
                  <td className="py-4 px-6">175 USD</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">
                    Student Non-IEEE Member
                  </td>
                  <td className="py-4 px-6 border-r border-white/10">150 USD</td>
                  <td className="py-4 px-6">250 USD</td>
                </tr>
                <tr className="border-b border-white/10 bg-white/5">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">
                    Non-Presenting Authors
                  </td>
                  <td className="py-4 px-6 border-r border-white/10">50 USD</td>
                  <td className="py-4 px-6">75 USD</td>
                </tr>

                {/* Participant Registration */}
                <tr className="bg-white/10 text-white font-semibold">
                  <td colSpan={3} className="py-3 px-6">
                    Participant Registration
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-6 border-r border-white/10 pl-10">
                    Local Participants
                  </td>
                  <td className="py-4 px-6 border-r border-white/10">5,000 LKR</td>
                  <td className="py-4 px-6">7,500 LKR</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 border-r border-white/10 pl-10">
                    Foreign Participants
                  </td>
                  <td className="py-4 px-6 border-r border-white/10">50 USD</td>
                  <td className="py-4 px-6">75 USD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== PAYMENT METHOD ===== */}
      <section className="w-full py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6">
            Payment Method
          </h3>

          <p className="para text-gray-300 mb-8">
            You can pay via one of the following options:
          </p>

          <div className="space-y-10">
            {/* Local Authors */}
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-8 border-l-4 border-primary-500">
              <h4 className="text-xl font-bold text-white mb-4">
                For Authors with Local Affiliations
              </h4>

              <p className="para text-gray-300 mb-4">
                Option 1: Pay to any Bank of Ceylon branch or via online banking.
              </p>

              <ul className="para text-gray-300 space-y-2 ml-4">
                <li><strong>Account No:</strong> 307829</li>
                <li><strong>Account Name:</strong> Bursar, University of Moratuwa</li>
                <li><strong>Bank:</strong> Bank of Ceylon, Katubedda Branch</li>
              </ul>

              <p className="para text-gray-400 mt-4 text-sm">
                Use “MERCon 2026 - EDAS paper ID” as the payment reference.
              </p>
            </div>

            {/* Foreign Authors */}
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-8 border-l-4 border-primary-600">
              <h4 className="text-xl font-bold text-white mb-4">
                For Authors with Foreign Affiliations
              </h4>

              <p className="para text-gray-300 mb-4">
                Payment must be completed as a bank transfer.
              </p>

              <ul className="para text-gray-300 space-y-2 ml-4">
                <li><strong>Account No:</strong> 307829</li>
                <li><strong>Account Name:</strong> Bursar, University of Moratuwa</li>
                <li><strong>SWIFT Code:</strong> BCEYLKLX</li>
                <li><strong>Branch Code:</strong> 030</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REGISTER CTA ===== */}
      <section className="w-full py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">
              Ready to Register?
            </h3>

            <p className="para text-gray-300 mb-8 text-lg">
              Click the button below to proceed with registration.
            </p>

            <a
              href="https://forms.gle/bnYtSPhywcDxGE5D6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 bg-primary-500 text-white font-semibold text-lg rounded-full hover:bg-primary-600 transition-all duration-300 shadow-lg hover:scale-105"
            >
              Register Here
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationPage;
