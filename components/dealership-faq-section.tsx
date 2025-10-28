"use client"

import { useState, useEffect, useRef } from "react"
import { FAQ } from "@/components/faq-tabs"

export function DealershipFAQSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])
  const categories = {
    "phone-calls": "Voice Call AI",
    "whatsapp": "WhatsApp AI",
    "messenger": "Messenger AI",
    "instagram": "Instagram AI",
    "website-widget": "Website Widget AI"
  }

  const faqData = {
    "phone-calls": [
      {
        question: "How does the Phone Calls AI handle incoming calls?",
        answer: "Our Phone Calls AI answers every call instantly, 24/7. It can handle vehicle inquiries, check inventory, book test drives, schedule service appointments, and qualify leads - all in natural conversation. When needed, it seamlessly transfers to your team with full context."
      },
      {
        question: "Can customers tell they're speaking with AI?",
        answer: "Our Phone Calls AI sounds completely natural and conversational. Most customers can't tell the difference. It understands accents, handles interruptions, and responds intelligently to follow-up questions just like a human would."
      },
      {
        question: "What happens if the AI can't answer a question?",
        answer: "If the AI encounters a question it can't confidently answer, it smoothly transfers the call to your team with a complete summary of the conversation. Your staff receives context about what the customer asked, so they can pick up seamlessly."
      },
      {
        question: "Does it work with my existing phone system?",
        answer: "Yes! Clutch integrates with all major phone systems. We handle the technical setup, so incoming calls are automatically routed through our AI. Your existing numbers stay the same - no changes needed for your customers."
      },
      {
        question: "Can it handle multiple calls at once?",
        answer: "Absolutely. Unlike human staff, our Phone Calls AI can handle unlimited simultaneous calls. No more busy signals or customers going to voicemail. Every caller gets instant, personalized attention."
      }
    ],
    "whatsapp": [
      {
        question: "How does WhatsApp AI work for my dealership?",
        answer: "WhatsApp AI responds instantly to every message, 24/7. Customers can ask about vehicles, check availability, get pricing, book test drives, and schedule service - all through WhatsApp. It syncs with your inventory and calendar in real-time."
      },
      {
        question: "Can it send photos and videos of cars?",
        answer: "Yes! WhatsApp AI can automatically send vehicle photos, videos, spec sheets, and brochures. Customers can request specific angles or features, and the AI retrieves them from your inventory system instantly."
      },
      {
        question: "Does it work with WhatsApp Business?",
        answer: "Absolutely. We integrate seamlessly with your existing WhatsApp Business account. Your customers message your normal WhatsApp number, and our AI handles the conversations while maintaining your business profile and branding."
      },
      {
        question: "Can customers negotiate prices on WhatsApp?",
        answer: "Yes. WhatsApp AI follows your pricing rules and can offer approved discounts, discuss trade-in values, and present financing options. For anything requiring manager approval, it captures the details and escalates to your team."
      },
      {
        question: "What if a customer wants to speak to a real person?",
        answer: "Customers can request a human at any time. The AI instantly notifies your team and transfers the chat with full conversation history. Your staff sees everything discussed, so they can continue seamlessly."
      }
    ],
    "messenger": [
      {
        question: "How does Messenger AI handle Facebook messages?",
        answer: "Messenger AI responds instantly to every Facebook message. Customers can browse inventory, get vehicle details, book test drives, and ask questions - all within Messenger. It integrates with your Facebook Business Page automatically."
      },
      {
        question: "Can it handle group chats or multiple conversations?",
        answer: "Yes! Messenger AI can manage unlimited simultaneous conversations. Whether it's one customer or a hundred messaging at once, everyone gets instant, personalized responses without any delays."
      },
      {
        question: "Does it work with Facebook Marketplace listings?",
        answer: "Absolutely. When customers message you from Marketplace, Messenger AI responds with vehicle details, pricing, availability, and can schedule viewings - all automatically. It knows which car they're asking about from the listing."
      },
      {
        question: "Can customers share their location for directions?",
        answer: "Yes! Messenger AI can send directions to your dealership, suggest the best routes, and even coordinate meeting times. It makes it incredibly easy for customers to find and visit you."
      },
      {
        question: "What about after-hours messages?",
        answer: "Messenger AI works 24/7. Whether customers message at 2 AM or on weekends, they get instant responses. No lead goes cold because they couldn't reach you outside business hours."
      }
    ],
    "instagram": [
      {
        question: "How does Instagram AI respond to DMs?",
        answer: "Instagram AI monitors your DMs 24/7 and responds instantly to every message. Customers can ask about cars, get pricing, book test drives, or inquire about service - all through Instagram Direct Messages."
      },
      {
        question: "Can it respond to story replies and comments?",
        answer: "Yes! When customers reply to your stories or comment on posts asking about vehicles, Instagram AI detects these and responds appropriately. It can move the conversation to DMs for more detailed discussions."
      },
      {
        question: "Does it work with Instagram Shopping posts?",
        answer: "Absolutely. When you tag vehicles in Instagram Shopping posts and customers inquire, Instagram AI provides all the details - specs, pricing, availability - and can schedule viewings or send more photos."
      },
      {
        question: "Can it send vehicle photos and videos through DMs?",
        answer: "Yes! Instagram AI can automatically send high-quality photos, videos, and even Reels of vehicles. Customers can request specific angles or interior shots, and the AI retrieves them from your inventory instantly."
      },
      {
        question: "What if customers send voice messages?",
        answer: "Instagram AI can understand voice messages too! Customers can send voice notes asking about cars, and the AI transcribes and responds appropriately - making it super convenient for customers on the go."
      }
    ],
    "website-widget": [
      {
        question: "How does the Website Widget AI work?",
        answer: "Website Widget AI appears as a chat bubble on your dealership website. Visitors can ask about any vehicle, check inventory, get financing info, book test drives, or schedule service - all without leaving your site."
      },
      {
        question: "Can it show vehicle details and photos?",
        answer: "Absolutely! Website Widget AI can display vehicle cards with photos, specs, pricing, and availability right in the chat. Customers can browse your entire inventory without clicking away from the conversation."
      },
      {
        question: "Does it capture leads automatically?",
        answer: "Yes! Every conversation is captured. Website Widget AI collects customer details naturally during the chat, qualifies their interest, and logs everything in your CRM - complete with the conversation transcript."
      },
      {
        question: "Can customers book test drives directly through the widget?",
        answer: "Yes! The AI checks your calendar in real-time and offers available slots. Customers can book, reschedule, or cancel test drives all through the chat widget. Confirmations are sent automatically."
      },
      {
        question: "What happens when a customer leaves the website?",
        answer: "The conversation doesn't end! Website Widget AI can continue the conversation via email, SMS, or WhatsApp if the customer provides their details. They can pick up right where they left off on any channel."
      }
    ]
  }

  return (
    <section 
      ref={sectionRef}
      className={`-mt-24 pb-32 sm:-mt-32 sm:pb-32 px-4 relative z-10 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <FAQ 
        title="Frequently Asked Questions" 
        subtitle="Got Questions? We've Got Answers" 
        categories={categories} 
        faqData={faqData} 
        className="bg-transparent px-0 py-0" 
      />
    </section>
  )
}

