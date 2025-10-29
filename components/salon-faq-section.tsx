"use client"

import { useState, useEffect, useRef } from "react"
import { FAQ } from "@/components/faq-tabs"

export function SalonFAQSection() {
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
        answer: "Our Phone Calls AI answers every call instantly, 24/7. It can handle appointment bookings, answer service inquiries, check stylist availability, suggest treatments, and qualify new clients - all in natural conversation. When needed, it seamlessly transfers to your team with full context."
      },
      {
        question: "Can customers tell they're speaking with AI?",
        answer: "Our Phone Calls AI sounds completely natural and conversational. Most customers can't tell the difference. It understands accents, handles interruptions, and responds intelligently to follow-up questions just like a human receptionist would."
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
        question: "How does WhatsApp AI work for my salon?",
        answer: "WhatsApp AI responds instantly to every message, 24/7. Customers can book appointments, ask about services, check pricing, request stylist availability, and inquire about treatments - all through WhatsApp. It syncs with your booking system and calendar in real-time."
      },
      {
        question: "Can it send photos of hairstyles and treatments?",
        answer: "Yes! WhatsApp AI can automatically send photos of previous work, treatment examples, style references, and price lists. Customers can ask for inspiration or specific styles, and the AI retrieves them from your gallery instantly."
      },
      {
        question: "Does it work with WhatsApp Business?",
        answer: "Absolutely. We integrate seamlessly with your existing WhatsApp Business account. Your customers message your normal WhatsApp number, and our AI handles the conversations while maintaining your business profile and branding."
      },
      {
        question: "Can customers reschedule or cancel appointments?",
        answer: "Yes! WhatsApp AI can handle all appointment changes. Customers can reschedule, cancel, or request different stylists - all through natural conversation. The AI updates your booking system automatically and sends confirmations."
      },
      {
        question: "What if a customer wants to speak to a real person?",
        answer: "Customers can request a human at any time. The AI instantly notifies your team and transfers the chat with full conversation history. Your staff sees everything discussed, so they can continue seamlessly."
      }
    ],
    "messenger": [
      {
        question: "How does Messenger AI handle Facebook messages?",
        answer: "Messenger AI responds instantly to every Facebook message. Customers can book appointments, ask about services, check stylist availability, and get pricing - all within Messenger. It integrates with your Facebook Business Page automatically."
      },
      {
        question: "Can it handle group chats or multiple conversations?",
        answer: "Yes! Messenger AI can manage unlimited simultaneous conversations. Whether it's one customer or a hundred messaging at once, everyone gets instant, personalized responses without any delays."
      },
      {
        question: "Does it work with Facebook promotions and offers?",
        answer: "Absolutely. When customers message about special offers, promotions, or packages they saw on Facebook, Messenger AI provides all the details, explains terms, and can book them in - all automatically."
      },
      {
        question: "Can customers share their location for directions?",
        answer: "Yes! Messenger AI can send directions to your salon, suggest the best routes, and even coordinate appointment times around travel. It makes it incredibly easy for customers to find and visit you."
      },
      {
        question: "What about after-hours messages?",
        answer: "Messenger AI works 24/7. Whether customers message at 2 AM or on weekends, they get instant responses and can book appointments. No booking opportunity goes cold because they couldn't reach you outside business hours."
      }
    ],
    "instagram": [
      {
        question: "How does Instagram AI respond to DMs?",
        answer: "Instagram AI monitors your DMs 24/7 and responds instantly to every message. Customers can ask about services, get pricing, book appointments, or inquire about specific stylists - all through Instagram Direct Messages."
      },
      {
        question: "Can it respond to story replies and comments?",
        answer: "Yes! When customers reply to your stories or comment on posts asking about styles or services, Instagram AI detects these and responds appropriately. It can move the conversation to DMs for booking appointments."
      },
      {
        question: "Does it work with Instagram Shopping posts?",
        answer: "Absolutely. When you tag products or services in Instagram Shopping posts and customers inquire, Instagram AI provides all the details - pricing, availability, what's included - and can book them in directly."
      },
      {
        question: "Can it send photos of hairstyles and work through DMs?",
        answer: "Yes! Instagram AI can automatically send high-quality photos of previous work, style references, and transformation shots. Customers can request specific styles or looks, and the AI retrieves them from your portfolio instantly."
      },
      {
        question: "What if customers send voice messages?",
        answer: "Instagram AI can understand voice messages too! Customers can send voice notes asking about appointments or services, and the AI transcribes and responds appropriately - making it super convenient for busy customers."
      }
    ],
    "website-widget": [
      {
        question: "How does the Website Widget AI work?",
        answer: "Website Widget AI appears as a chat bubble on your salon website. Visitors can ask about services, check pricing, see stylist availability, book appointments, or inquire about treatments - all without leaving your site."
      },
      {
        question: "Can it show service details and photos?",
        answer: "Absolutely! Website Widget AI can display service cards with photos, descriptions, pricing, and duration right in the chat. Customers can browse your entire service menu without clicking away from the conversation."
      },
      {
        question: "Does it capture leads automatically?",
        answer: "Yes! Every conversation is captured. Website Widget AI collects customer details naturally during the chat, understands their preferences, and logs everything in your system - complete with the conversation transcript."
      },
      {
        question: "Can customers book appointments directly through the widget?",
        answer: "Yes! The AI checks your calendar in real-time and offers available slots with preferred stylists. Customers can book, reschedule, or cancel appointments all through the chat widget. Confirmations are sent automatically."
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

