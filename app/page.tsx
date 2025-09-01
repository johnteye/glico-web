"use client";
import React, { useState, useMemo } from "react";

const InsuranceCalculator = () => {
  const [currency, setCurrency] = useState("GHS");
  const [product, setProduct] = useState("Fire");
  const [basePremium, setBasePremium] = useState<number>(10000);

  // Rates
  const fireLevyRate = 0.01; // 1%
  const nhilRate = 0.025; // 2.5%
  const getFundRate = 0.025; // 2.5%
  const covidRate = 0.01; // 1%
  const vatRate = 0.15; // 15%

  // Calculations
  const calculations = useMemo(() => {
    const fireLevy = product === "Fire" ? basePremium * fireLevyRate : 0;
    const nhil = basePremium * nhilRate;
    const getFund = basePremium * getFundRate;
    const covid = basePremium * covidRate;

    const subtotal = basePremium + fireLevy + nhil + getFund + covid;
    const vat = subtotal * vatRate;
    const total = subtotal + vat;

    return { fireLevy, nhil, getFund, covid, subtotal, vat, total };
  }, [basePremium, product]);

  return ( 
  
  <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6 mt-9 ">
   
      <h2 className="text-xl font-bold text-gray-800">Insurance Calculator</h2>

      {/* Currency */}
      <div>
        <label className="block font-medium">Currency</label>
      
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="USD">USD</option>
          <option value="EURO">EURO</option>
          <option value="GBP">GBP</option>
          <option value="AUD">AUD</option>
        </select>
      </div>

      {/* Product Selection */}
      <div>
        <label className="block font-medium">Product</label>
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="Fire">Fire</option>
          <option value="Accident">Accident</option>
          <option value="Marine">Marine</option>
          <option value="Engineering">Engineering</option>
        </select>
      </div>

      {/* Base Premium */}
      <div>
        <label className="block font-medium">Base Premium (BP)</label>
        <input
          type="number"
          value={basePremium}
          onChange={(e) => setBasePremium(Number(e.target.value))}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      {/* Levies */}
      <div className="space-y-2">
        {product === "Fire" && (
          <p className="flex justify-between">
            <span>Fire Levy (1%)</span>
            <span>{calculations.fireLevy.toFixed(2)}</span>
          </p>
        )}
        <p className="flex justify-between">
          <span>NHIL (2.5%)</span>
          <span>{calculations.nhil.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>GetFund (2.5%)</span>
          <span>{calculations.getFund.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Covid-19 Levy (1%)</span>
          <span>{calculations.covid.toFixed(2)}</span>
        </p>
      </div>

      {/* Subtotal */}
      <div className="flex justify-between font-semibold border-t pt-2">
        <span>Subtotal</span>
        <span>{calculations.subtotal.toFixed(2)}</span>
      </div>

      {/* VAT */}
      <div className="flex justify-between">
        <span>VAT (15%)</span>
        <span>{calculations.vat.toFixed(2)}</span>
      </div>

      {/* Total */}
      <div className="flex justify-between text-lg font-bold border-t pt-2">
        <span>Total</span>
        <span>{calculations.total.toFixed(2)}</span>
      </div>

      {/* Print Button */}
      <div className="text-center">
        <button
          onClick={() => window.print()}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default InsuranceCalculator;