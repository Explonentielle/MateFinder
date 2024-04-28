import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/src/components/ui/accordion";
  import { Section } from "./Section";
  
  const FAQS: { question: string; answer: string }[] = [
    {
      question: "How can I create a new activity on Mate Finder?",
      answer:
        "To create a new activity on Mate Finder, log in to your account, go to the 'Create Activity' section, fill in the required information such as title, description, date, and time, then submit the form.",
    },
    {
      question: "Can I add specific details to my activity, such as location and cost?",
      answer:
        "Yes, when creating your activity, you can specify details such as the event location, any potential cost, and other relevant information for participants.",
    },
    {
      question: "How can I find partners to participate in an activity on Mate Finder?",
      answer:
        "You can find partners for your activity by posting details about the event, sharing your activity on social media, or joining groups and communities related to your interests on Mate Finder.",
    },
    {
      question: "Does Mate Finder offer activities based on my interests and location?",
      answer:
        "Yes, Mate Finder provides a variety of activities based on your interests and location. You can explore different categories and filters to find activities that match your preferences.",
    },
    {
      question: "Can I invite friends to join an activity on Mate Finder?",
      answer:
        "Yes, you can invite friends to join an activity on Mate Finder by sharing the activity link with them or inviting them directly through the platform.",
    },
    {
      question: "Is there a messaging feature to communicate with other participants?",
      answer:
        "Yes, Mate Finder offers a messaging feature that allows you to communicate with other participants before, during, and after the activity. You can use this feature to coordinate plans and ask questions.",
    },
    {
      question: "How do I ensure the safety of participants during activities?",
      answer:
        "Mate Finder prioritizes the safety of its users. We encourage users to review safety guidelines and communicate with other participants to ensure a safe and enjoyable experience.",
    },
    {
      question: "What should I do if I encounter any issues or need assistance?",
      answer:
        "If you encounter any issues or need assistance, you can reach out to our support team through the Help Center or contact us directly via email. We're here to help!",
    },
  ];
  
  export const FAQSection = () => {
    return (
      <Section className="flex w-full flex-row items-start gap-4 max-lg:flex-col max-lg:items-center">
        <div className="flex-1 max-lg:text-center">
          <h2 className="text-xl font-bold text-primary">FAQ</h2>
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="w-full max-w-lg flex-1 text-left">
          <Accordion type="multiple">
            {FAQS.map((faq, index) => (
              <AccordionItem
                value={faq.question}
                key={faq.question}
                className="text-left"
              >
                <AccordionTrigger>
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    );
  };