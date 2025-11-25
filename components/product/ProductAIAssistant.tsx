"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button, Input, Spinner } from "@/components/ui";
import { Product } from "@/types";
import axios from "axios";

const MotionDiv = motion.div as any;

interface ProductAIAssistantProps {
  product: Product;
}

/**
 * ProductAIAssistant Component
 * AI-powered product question answering
 * - Input field for user questions
 * - Sends product context to AI API
 * - Displays AI-generated responses
 * - Animated response appearance
 */
export const ProductAIAssistant = ({ product }: ProductAIAssistantProps) => {
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Handle AI question submission
  const handleAskAI = async () => {
    if (!aiQuery.trim()) return;

    setAiLoading(true);
    setAiResponse("");

    try {
      // Build prompt with product context
      const prompt = `
        You are a helpful shopping assistant.
        Product: ${product.title}
        Description: ${product.description}
        Price: $${product.price}
        Rating: ${product.rating}/5
        Brand: ${product.brand}

        User Question: ${aiQuery}

        Answer the user briefly and helpfully based on the product details provided.
      `;

      // Call AI API
      const res = await axios.post("/api/ai", { prompt });

      // Extract response
      const { text, error } = res.data;

      if (error) throw new Error(error);

      setAiResponse(text || "I couldn't generate a response.");
    } catch (err) {
      console.error(err);
      setAiResponse("Sorry, I encountered an error. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-[#1E293B] border border-indigo-100 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4 text-primary dark:text-primary-light">
        <Sparkles size={20} />
        <h3 className="font-bold">Ask AI Assistant</h3>
      </div>

      <div className="flex gap-2">
        <Input
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
          placeholder="E.g., Is this good for hiking?"
          className="bg-white dark:bg-slate-950"
          onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
        />

        <Button onClick={handleAskAI} disabled={aiLoading}>
          {aiLoading ? <Spinner /> : "Ask"}
        </Button>
      </div>

      {aiResponse && (
        <MotionDiv
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 p-4 bg-white dark:bg-slate-950 rounded-lg border border-border-light dark:border-border-light text-sm text-slate-700 dark:text-slate-300"
        >
          {aiResponse}
        </MotionDiv>
      )}
    </div>
  );
};
