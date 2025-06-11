import React, { useState } from "react";

const Step2Company = ({ next, back, updateData }) => {
    const companyList = [
        "Google",
        "Apple",
        "Microsoft",
        "Amazon",
        "Meta",
        "Netflix",
        "Adobe",
        "IBM",
        "Intel",
        "Oracle",
        "Salesforce",
        "Tesla",
        "Samsung",
        "NVIDIA",
        "Cisco",
        "Spotify",
        "Uber",
        "Airbnb",
        "Dropbox",
        "Slack",
        "Atlassian",
        "Zoom",
        "Shopify",
        "Dell",
        "HP",
        "LinkedIn",
        "PayPal",
        "eBay",
        "TCS",
        "Infosys",
        "Wipro",
        "HCL Technologies",
        "Tech Mahindra",
        "Zoho",
        "Freshworks",
        "Capgemini",
        "Cognizant",
        "L&T Infotech",
        "Mindtree",
        "BYJU'S",
        "Flipkart",
        "Ola",
        "Swiggy",
        "Zomato",
        "Meesho",
        "PhonePe",
        "Razorpay",
        "CRED",
        "Nykaa",
        "Tata Digital",
        "Jio Platforms",
        "Qualcomm",
        "Broadcom"
      ];
      

  const quickOptions = ["I'm a student", "Self-employed", "Looking for work"];

  const [company, setCompany] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCompany(value);

    const matches = companyList.filter((c) =>
      c.toLowerCase().startsWith(value.toLowerCase())
    );

    setFiltered(value.trim() === "" ? [] : matches);
  };

  const handleSelectSuggestion = (value) => {
    setCompany(value);
    setFiltered([]);
  };

  const handleNext = () => {
    if (company.trim()) {
      updateData({ company });
      next();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Where do you work currently?
      </h2>

      <div className="relative">
        <input
          type="text"
          value={company}
          onChange={handleInputChange}
          placeholder="Enter your company name"
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-300"
        />

        {filtered.length > 0 && (
          <ul className="absolute z-10 bg-white border border-purple-200 w-full mt-1 rounded-md shadow-md max-h-48 overflow-y-auto">
            {filtered.map((suggestion, idx) => (
              <li
                key={idx}
                className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
        {quickOptions.map((option) => (
          <button
            key={option}
            onClick={() => {
              setCompany(option);
              setFiltered([]);
            }}
            className="border px-4 py-2 rounded-lg hover:shadow text-sm"
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={back}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!company}
          className={`px-4 py-2 rounded text-white ${
            company ? "bg-black hover:bg-gray-900" : "bg-gray-800 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2Company;
