import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/src/components/ui/accordion";
  import { Section } from "./Section";
  
  const FAQS: { question: string; answer: string }[] = [
    {
      question: "Comment puis-je créer une nouvelle activité sur Mate Finder ?",
      answer:
        "Pour créer une nouvelle activité sur Mate Finder, connectez-vous à votre compte, accédez à la section 'Créer une activité', remplissez les informations requises telles que le titre, la description, la date et l'heure, puis soumettez le formulaire.",
    },
    {
      question: "Puis-je ajouter des détails spécifiques à mon activité, tels que l'emplacement et le coût ?",
      answer:
        "Oui, lors de la création de votre activité, vous pouvez spécifier des détails tels que l'emplacement de l'événement, tout coût éventuel et d'autres informations pertinentes pour les participants.",
    },
    {
      question: "Comment puis-je trouver des partenaires pour participer à une activité sur Mate Finder ?",
      answer:
        "Vous pouvez trouver des partenaires pour votre activité en publiant des détails sur l'événement, en partageant votre activité sur les réseaux sociaux ou en rejoignant des groupes et des communautés liés à vos intérêts sur Mate Finder.",
    },
    {
      question: "Mate Finder propose-t-il des activités en fonction de mes intérêts et de ma localisation ?",
      answer:
        "Oui, Mate Finder propose une variété d'activités en fonction de vos intérêts et de votre localisation. Vous pouvez explorer différentes catégories et filtres pour trouver des activités qui correspondent à vos préférences.",
    },
    {
      question: "Puis-je inviter des amis à participer à une activité sur Mate Finder ?",
      answer:
        "Oui, vous pouvez inviter des amis à participer à une activité sur Mate Finder en partageant le lien de l'activité avec eux ou en les invitant directement via la plateforme.",
    },
    {
      question: "Y a-t-il une fonctionnalité de messagerie pour communiquer avec les autres participants ?",
      answer:
        "Oui, Mate Finder propose une fonctionnalité de messagerie qui vous permet de communiquer avec les autres participants avant, pendant et après l'activité. Vous pouvez utiliser cette fonctionnalité pour coordonner les plans et poser des questions.",
    },
    {
      question: "Comment puis-je garantir la sécurité des participants pendant les activités ?",
      answer:
        "Mate Finder donne la priorité à la sécurité de ses utilisateurs. Nous encourageons les utilisateurs à consulter les directives de sécurité et à communiquer avec les autres participants pour garantir une expérience sûre et agréable.",
    },
    {
      question: "Que dois-je faire si je rencontre des problèmes ou si j'ai besoin d'aide ?",
      answer:
        "Si vous rencontrez des problèmes ou si vous avez besoin d'aide, vous pouvez contacter notre équipe de support via le Centre d'aide ou nous contacter directement par e-mail. Nous sommes là pour vous aider !",
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