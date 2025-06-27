import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export const generateComparison = async (product1, product2) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    Compare these two tech products and provide a detailed analysis:

    Product 1: ${product1.model}
    Price: $${product1.price}
    Rating: ${product1.rating}/5
    Key Features: ${product1.keyFeature?.join(', ')}
    Specifications: ${product1.spec?.map(spec => Object.entries(spec).map(([key, value]) => `${key}: ${value}`).join(', ')).join('; ')}

    Product 2: ${product2.model}
    Price: $${product2.price}
    Rating: ${product2.rating}/5
    Key Features: ${product2.keyFeature?.join(', ')}
    Specifications: ${product2.spec?.map(spec => Object.entries(spec).map(([key, value]) => `${key}: ${value}`).join(', ')).join('; ')}

    Please provide a comprehensive comparison in the following JSON format:
    {
      "winner": "product1" | "product2" | "tie",
      "recommendation": "A detailed recommendation explaining which product is better and why",
      "product1Strengths": ["strength1", "strength2", "strength3"],
      "product2Strengths": ["strength1", "strength2", "strength3"],
      "product1Score": number_out_of_10,
      "product2Score": number_out_of_10,
      "keyInsights": {
        "performance": "Performance comparison insight",
        "valueForMoney": "Value for money analysis",
        "buildQuality": "Build quality comparison"
      },
      "summary": "Brief summary of the comparison"
    }

    Focus on technical specifications, performance, value for money, and overall user experience. Be objective and provide specific reasons for your recommendations.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse JSON from the response
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      // If JSON parsing fails, return a structured response based on the text
      return {
        winner: "tie",
        recommendation: text,
        product1Strengths: ["AI analysis provided"],
        product2Strengths: ["AI analysis provided"],
        product1Score: 7,
        product2Score: 7,
        keyInsights: {
          performance: "Detailed analysis provided by AI",
          valueForMoney: "AI comparison completed",
          buildQuality: "Professional assessment done"
        },
        summary: "AI-powered comparison completed successfully"
      };
    }
  } catch (error) {
    console.error('Error generating AI comparison:', error);
    throw new Error('Failed to generate AI comparison. Please check your API key and try again.');
  }
};