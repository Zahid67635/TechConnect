"use client";
import React, { useState } from "react";
import { HiSparkles, HiRefresh, HiExclamationTriangle } from "react-icons/hi";
import { generateComparison } from "@/lib/gemini";
import { toast } from "react-hot-toast";

const AIComparison = ({ currentProduct, selectedProduct }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [comparison, setComparison] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateComparison = async () => {
    if (!selectedProduct) return;

    // Check if API key is configured
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      setError(
        "Gemini API key is not configured. Please add your API key to the .env.local file."
      );
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateComparison(currentProduct, selectedProduct);
      setComparison(result);
      toast.success("AI comparison generated successfully!");
    } catch (err) {
      console.error("Comparison error:", err);
      setError(err.message || "Failed to generate AI comparison");
      toast.error("Failed to generate AI comparison");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!selectedProduct) {
    return (
      <div className="max-w-screen-xl mx-auto mt-8 mb-12">
        <div className="p-8 border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
          <div className="text-center">
            <HiSparkles className="mx-auto mb-4 text-4xl text-purple-500" />
            <h3 className="mb-2 text-2xl font-bold text-gray-800">
              AI-Powered Comparison
            </h3>
            <p className="text-gray-600">
              Select a product to compare and get intelligent insights powered
              by Googles Gemini AI
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto mt-8 mb-12">
      <div className="p-8 border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <HiSparkles className="text-3xl text-purple-500" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                AI Comparison Analysis
              </h3>
              <p className="text-sm text-gray-600">
                Powered by Google Gemini AI
              </p>
            </div>
          </div>
          <button
            onClick={handleGenerateComparison}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-200 bg-purple-500 rounded-lg hover:bg-purple-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                Analyzing with AI...
              </>
            ) : (
              <>
                <HiRefresh className="text-lg" />
                Generate AI Analysis
              </>
            )}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-6 mb-6 border border-red-200 bg-red-50 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <HiExclamationTriangle className="text-2xl text-red-500" />
              <h4 className="text-lg font-bold text-red-800">
                Configuration Required
              </h4>
            </div>
            <p className="mb-4 text-red-700">{error}</p>
            <div className="p-4 bg-red-100 rounded-lg">
              <p className="mb-2 text-sm font-semibold text-red-800">
                To enable AI comparison:
              </p>
              <ol className="space-y-1 text-sm text-red-700 list-decimal list-inside">
                <li>
                  Get your free Gemini API key from{" "}
                  <a
                    href="https://makersuite.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                  >
                    Google AI Studio
                  </a>
                </li>
                <li>
                  Add it to your .env.local file:{" "}
                  <code className="px-1 bg-red-200 rounded">
                    NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key
                  </code>
                </li>
                <li>Restart the development server</li>
              </ol>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isGenerating && (
          <div className="py-12 text-center">
            <div className="inline-flex items-center gap-3 text-purple-600">
              <div className="flex space-x-1 animate-pulse">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span className="font-semibold">
                Gemini AI is analyzing the products...
              </span>
            </div>
            <p className="mt-2 text-gray-600">This may take a few moments</p>
          </div>
        )}

        {/* AI Comparison Results */}
        {comparison && !isGenerating && (
          <div className="space-y-6">
            {/* Winner Announcement */}
            <div className="p-6 text-center bg-white border shadow-sm rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-3">
                <HiSparkles className="text-2xl text-yellow-500" />
                <h4 className="text-xl font-bold text-gray-800">
                  AI Recommendation
                </h4>
              </div>
              <p className="text-lg leading-relaxed text-gray-700">
                {comparison.recommendation}
              </p>
              {comparison.summary && (
                <div className="pt-4 mt-4 border-t">
                  <p className="italic text-gray-600">{comparison.summary}</p>
                </div>
              )}
            </div>

            {/* Detailed Analysis */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Product 1 Analysis */}
              <div className="p-6 bg-white border shadow-sm rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      comparison.winner === "product1"
                        ? "bg-green-500"
                        : comparison.winner === "tie"
                        ? "bg-yellow-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <h5 className="font-bold text-gray-800">
                    {currentProduct.model}
                  </h5>
                  {comparison.winner === "product1" && (
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      AI RECOMMENDED
                    </span>
                  )}
                  {comparison.winner === "tie" && (
                    <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                      TIED
                    </span>
                  )}
                </div>
                <ul className="mb-4 space-y-2">
                  {comparison.product1Strengths?.map((strength, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <div className="flex-shrink-0 w-2 h-2 mt-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">AI Score</span>
                    <span className="text-lg font-bold text-purple-600">
                      {comparison.product1Score}/10
                    </span>
                  </div>
                </div>
              </div>

              {/* Product 2 Analysis */}
              <div className="p-6 bg-white border shadow-sm rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      comparison.winner === "product2"
                        ? "bg-green-500"
                        : comparison.winner === "tie"
                        ? "bg-yellow-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <h5 className="font-bold text-gray-800">
                    {selectedProduct.model}
                  </h5>
                  {comparison.winner === "product2" && (
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      AI RECOMMENDED
                    </span>
                  )}
                  {comparison.winner === "tie" && (
                    <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                      TIED
                    </span>
                  )}
                </div>
                <ul className="mb-4 space-y-2">
                  {comparison.product2Strengths?.map((strength, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">AI Score</span>
                    <span className="text-lg font-bold text-purple-600">
                      {comparison.product2Score}/10
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            {comparison.keyInsights && (
              <div className="p-6 border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h5 className="flex items-center gap-2 mb-4 font-bold text-gray-800">
                  <HiSparkles className="text-blue-500" />
                  AI Key Insights
                </h5>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-white rounded-lg">
                    <h6 className="mb-2 font-semibold text-gray-800">
                      Performance
                    </h6>
                    <p className="text-sm text-gray-600">
                      {comparison.keyInsights.performance}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h6 className="mb-2 font-semibold text-gray-800">
                      Value for Money
                    </h6>
                    <p className="text-sm text-gray-600">
                      {comparison.keyInsights.valueForMoney}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h6 className="mb-2 font-semibold text-gray-800">
                      Build Quality
                    </h6>
                    <p className="text-sm text-gray-600">
                      {comparison.keyInsights.buildQuality}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Comparison Stats */}
            <div className="p-6 border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
              <h5 className="flex items-center gap-2 mb-3 font-bold text-gray-800">
                <HiSparkles className="text-green-500" />
                Comparison Statistics
              </h5>
              <div className="grid gap-4 text-sm md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    $
                    {Math.abs(
                      currentProduct.price - selectedProduct.price
                    ).toLocaleString()}
                  </div>
                  <div className="text-gray-600">Price Difference</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.abs(
                      currentProduct.rating - selectedProduct.rating
                    ).toFixed(1)}
                  </div>
                  <div className="text-gray-600">Rating Gap</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {comparison.winner === "tie"
                      ? "Even Match"
                      : "Clear Winner"}
                  </div>
                  <div className="text-gray-600">AI Verdict</div>
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
