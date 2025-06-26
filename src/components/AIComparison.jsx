"use client";
import React, { useState } from "react";
import { HiSparkles, HiRefresh } from "react-icons/hi";

const AIComparison = ({ currentProduct, selectedProduct }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [comparison, setComparison] = useState(null);

  const generateComparison = async () => {
    if (!selectedProduct) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysis = analyzeProducts(currentProduct, selectedProduct);
    setComparison(analysis);
    setIsGenerating(false);
  };

  const analyzeProducts = (product1, product2) => {
    const analysis = {
      winner: null,
      strengths: {
        product1: [],
        product2: []
      },
      recommendation: "",
      scores: {
        product1: 0,
        product2: 0
      }
    };

    // Price comparison
    if (product1.price < product2.price) {
      analysis.strengths.product1.push("More affordable pricing");
      analysis.scores.product1 += 2;
    } else if (product2.price < product1.price) {
      analysis.strengths.product2.push("More affordable pricing");
      analysis.scores.product2 += 2;
    }

    // Rating comparison
    if (product1.rating > product2.rating) {
      analysis.strengths.product1.push("Higher user rating");
      analysis.scores.product1 += 1;
    } else if (product2.rating > product1.rating) {
      analysis.strengths.product2.push("Higher user rating");
      analysis.scores.product2 += 1;
    }

    // Spec analysis (simplified)
    const product1Specs = product1.spec || [];
    const product2Specs = product2.spec || [];

    // Check for processor advantage
    const product1Processor = product1Specs.find(s => s.processor)?.processor || "";
    const product2Processor = product2Specs.find(s => s.processor)?.processor || "";
    
    if (product1Processor.includes("i7") || product1Processor.includes("Ryzen 7")) {
      analysis.strengths.product1.push("High-performance processor");
      analysis.scores.product1 += 2;
    }
    if (product2Processor.includes("i7") || product2Processor.includes("Ryzen 7")) {
      analysis.strengths.product2.push("High-performance processor");
      analysis.scores.product2 += 2;
    }

    // Check for RAM advantage
    const product1RAM = product1Specs.find(s => s.ram)?.ram || "";
    const product2RAM = product2Specs.find(s => s.ram)?.ram || "";
    
    const product1RAMSize = parseInt(product1RAM.match(/\d+/)?.[0] || "0");
    const product2RAMSize = parseInt(product2RAM.match(/\d+/)?.[0] || "0");
    
    if (product1RAMSize > product2RAMSize) {
      analysis.strengths.product1.push("More RAM capacity");
      analysis.scores.product1 += 1;
    } else if (product2RAMSize > product1RAMSize) {
      analysis.strengths.product2.push("More RAM capacity");
      analysis.scores.product2 += 1;
    }

    // Determine winner
    if (analysis.scores.product1 > analysis.scores.product2) {
      analysis.winner = "product1";
      analysis.recommendation = `${product1.model} offers better overall value with superior specifications and competitive pricing.`;
    } else if (analysis.scores.product2 > analysis.scores.product1) {
      analysis.winner = "product2";
      analysis.recommendation = `${product2.model} provides excellent performance and features that justify its positioning in the market.`;
    } else {
      analysis.winner = "tie";
      analysis.recommendation = "Both products offer compelling features. Your choice should depend on specific use cases and budget preferences.";
    }

    return analysis;
  };

  if (!selectedProduct) {
    return (
      <div className="max-w-screen-xl mx-auto mt-8 mb-12">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
          <div className="text-center">
            <HiSparkles className="mx-auto text-4xl text-purple-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">AI-Powered Comparison</h3>
            <p className="text-gray-600">Select a product to compare and get intelligent insights powered by AI analysis</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto mt-8 mb-12">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <HiSparkles className="text-3xl text-purple-500" />
            <h3 className="text-2xl font-bold text-gray-800">AI Comparison Analysis</h3>
          </div>
          <button
            onClick={generateComparison}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing...
              </>
            ) : (
              <>
                <HiRefresh className="text-lg" />
                Generate Analysis
              </>
            )}
          </button>
        </div>

        {isGenerating && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-3 text-purple-600">
              <div className="animate-pulse flex space-x-1">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="font-semibold">AI is analyzing the products...</span>
            </div>
          </div>
        )}

        {comparison && !isGenerating && (
          <div className="space-y-6">
            {/* Winner Announcement */}
            <div className="text-center bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-center gap-2 mb-3">
                <HiSparkles className="text-2xl text-yellow-500" />
                <h4 className="text-xl font-bold text-gray-800">AI Recommendation</h4>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{comparison.recommendation}</p>
            </div>

            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product 1 Strengths */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-4 h-4 rounded-full ${comparison.winner === 'product1' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <h5 className="font-bold text-gray-800">{currentProduct.model}</h5>
                  {comparison.winner === 'product1' && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">RECOMMENDED</span>
                  )}
                </div>
                <ul className="space-y-2">
                  {comparison.strengths.product1.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      {strength}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">AI Score</span>
                    <span className="font-bold text-lg text-purple-600">{comparison.scores.product1}/10</span>
                  </div>
                </div>
              </div>

              {/* Product 2 Strengths */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-4 h-4 rounded-full ${comparison.winner === 'product2' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <h5 className="font-bold text-gray-800">{selectedProduct.model}</h5>
                  {comparison.winner === 'product2' && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">RECOMMENDED</span>
                  )}
                </div>
                <ul className="space-y-2">
                  {comparison.strengths.product2.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      {strength}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">AI Score</span>
                    <span className="font-bold text-lg text-purple-600">{comparison.scores.product2}/10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Insights */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h5 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <HiSparkles className="text-blue-500" />
                Key Insights
              </h5>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">${Math.abs(currentProduct.price - selectedProduct.price).toLocaleString()}</div>
                  <div className="text-gray-600">Price Difference</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{Math.abs(currentProduct.rating - selectedProduct.rating).toFixed(1)}</div>
                  <div className="text-gray-600">Rating Gap</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{comparison.winner === 'tie' ? 'Even' : 'Clear'}</div>
                  <div className="text-gray-600">Winner Status</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIComparison;