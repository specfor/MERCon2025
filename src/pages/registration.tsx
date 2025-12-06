import React from "react";
import SectionHeader from "../components/sectionHeader";

const RegistrationPage = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full py-12 px-6 pt-18  bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mt-5 mb-4">
            <SectionHeader headerText="Registration" textClass="text-black" />
            <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed mt-6">
              MERCon 2025 will be held at the University of Moratuwa physically and it will facilitate foreign
              participants via online platform. The following fee categories will be charged from each paper to
              cover IEEE payments, payment for paper management system, online conference management
              systems, and meals and refreshments.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Fees Section */}
      <section className="w-full py-6 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Registration Fees</h3>
            <p className="text-gray-600 mb-6">
              <strong>Registration fees are given below.</strong>
            </p>
          </div>

          {/* Fees Table */}
          <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary-500 text-white">
                  <th className="py-4 px-6 text-left font-semibold border-r border-primary-400">
                    Author Category
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 border-r border-gray-200">
                    Presenting authors with <strong>local affiliations</strong> and <strong>IEEE membership</strong>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">LKR 20,000/- per paper</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors bg-gray-50">
                  <td className="py-4 px-6 border-r border-gray-200">
                    Presenting authors with <strong>local affiliations without IEEE membership</strong>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">LKR 22,000/- per paper</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 border-r border-gray-200">
                    <strong>Non-presenting authors</strong> and <strong>other participants</strong> for the main
                    conference on the 14<sup>th</sup> and 15<sup>th</sup> August
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">LKR 2,000/- per person</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors bg-gray-50">
                  <td className="py-4 px-6 border-r border-gray-200">
                    Authors with <strong>international affiliations</strong> and <strong>IEEE membership</strong>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">USD 100 per paper</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 border-r border-gray-200">
                    Other authors with <strong>international affiliations</strong>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">USD 120 per paper</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Payment Method Section */}
      <section className="w-full py-16 px-6 bg-white-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 ">Payment Method</h3>
          <p className="text-gray-600 mb-8">You can pay via one of the following options:</p>

          <div className="space-y-8">
            {/* Payment Options */}
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-primary-500">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                For Authors with local affiliations:
              </h4>

              <div className="space-y-6">
                {/* Option 1 */}
                <div className="pl-4">
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-start">
                    <span className="pt-1">
                      Option 1: You may pay to any Bank of Ceylon branch or pay via online banking facilities. Use
                      following details:
                    </span>
                  </h5>
                  <div className="ml-11 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <strong>Account No:</strong> 307829
                      </li>
                      <li>
                        <strong>Account Name:</strong> Bursar, University of Moratuwa
                      </li>
                      <li>
                        <strong>Bank Name:</strong> Bank of Ceylon, Katubedda Branch
                      </li>
                    </ul>
                  </div>
                  <p className="ml-11 mt-4 text-gray-600 text-sm leading-relaxed">
                    Clearly indicate your Name and Telephone number. Use "MERCon 2025-EDAS paper ID" as reason/memo
                    for payment. Please ask the bank teller to print these on deposit slip. If you are transferring
                    via online banking, indicate the reason as "MERCon 2025-EDAS paper ID".
                  </p>
                </div>

                {/* Option 2 */}
                <div className="pl-4">
                  <h5 className="font-semibold text-gray-800 mb-2 flex items-start">
                    <span className="pt-1">
                      Option 2: To Shroff counter of the University of Moratuwa. Counter is open on weekdays from
                      9.00 am - 12.30 pm and 1.30 pm - 3.00 pm.
                    </span>
                  </h5>
                </div>
              </div>

              <hr className="my-8 border-gray-300" />

              <h4 className="text-xl font-bold text-gray-900 mb-4">
                For Authors with foreign affiliations:
              </h4>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Payment needs to be completed as a bank transfer. Transfer details should be updated in the author
                  registration form or email to the conference secretariat.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      <strong>Account No:</strong> 307829
                    </li>
                    <li>
                      <strong>Account Name:</strong> Bursar, University of Moratuwa
                    </li>
                    <li>
                      <strong>Bank Name:</strong> Bank of Ceylon, Katubedda Branch
                    </li>
                    <li>
                      <strong>SWIFT Code:</strong> BCEYLKLX
                    </li>
                    <li>
                      <strong>Branch Code:</strong> 030
                    </li>
                    <li>
                      <strong>Bank Code:</strong> 7010
                    </li>
                    <li>
                      <strong>Bank Address:</strong> No: 605, Galle Road, Katubedda, Sri Lanka
                    </li>
                  </ul>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Clearly indicate your Name and Telephone number. Use "MERCon 2025-EDAS paper ID" as reason/memo
                  for payment. Please ask the bank teller to print these on deposit slip. If you are transferring via
                  online banking, indicate the reason as "MERCon 2025-EDAS paper ID".
                </p>
              </div>
            </div>

            {/* Note Section */}
            <div className="bg-primary-50 rounded-lg shadow-md p-8 border-l-4 border-primary-700">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Note:</h4>
              <p className="text-gray-700">
                Please contact registration chair for any clarification. Email:{" "}
                <a href="mailto:jayamalide@uom.lk" className="text-primary-600 hover:text-primary-700 font-medium underline">
                  jayamalide@uom.lk
                </a>{" "}
                and CC: to{" "}
                <a href="mailto:mercon@uom.lk" className="text-primary-600 hover:text-primary-700 font-medium underline">
                  mercon@uom.lk
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Button Section */}
      <section className="w-full py-20 px-6 bg-gradient-to-br from-white to-primary-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Register?</h3>
            <p className="text-gray-600 mb-8 text-lg">Please click the button below to register.</p>
            <a
              href="https://forms.gle/bnYtSPhywcDxGE5D6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 bg-primary-500 text-white font-semibold text-lg rounded-full hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
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
