import { Ultra } from "next/font/google";
import React from "react";

const Terms = () => {
  const conditions = [
    {
      heading: "Interpretation and Definitions",
      list: 'The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this platform and compliant to the Company\'s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client\'s needs in respect of provision of the Company\'s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.',
    },
    {
      heading: "License",
      list: "Unless otherwise stated, DIY Creative Display and/or its licensors own the intellectual property rights for all material on DIY Creative Display. All intellectual property rights are reserved. You may access this from DIY Creative Display for your own personal use subjected to restrictions set in these terms and conditions.",
    },
    {
      heading: "Restrictions",
      list: "You are specifically restricted from all of the following:",
      innerList: [
        "Publishing any DIY Creative Display material in any other media",
        "Selling, sublicensing and/or otherwise commercializing any DIY Creative Display material;",
        "Publicly performing and/or showing any DIY Creative Display material",
        "Using this platform in any way that is or may be damaging to DIY Creative Display",
        "Using this platform in any way that impacts user access to DIY Creative Display",
        "Using this platform contrary to applicable laws and regulations, or in any way may cause harm to the platform, or to any person or business entity",
        "Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to DIY Creative Display",
        "Using this platform to engage in any advertising or marketing",
      ],
    },
    {
      heading: "Your Content",
      list: 'In these terms and conditions, "Your Content" shall mean text, images you choose to display on DIY Creative Display. By displaying Your Content, you grant DIY Creative Display a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.',
    },
    {
      heading: "No warranties",
      list: 'This platform is provided "as is," with all faults, and DIY Creative Display expresses no representations or warranties, of any kind related to DIY Creative Display or the materials contained on this platform. Also, nothing contained on DIY Creative Display shall be interpreted as advising you.',
    },
    {
      heading: "Limitation of liability",
      list: "In no event shall DIY Creative Display, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this platform whether such liability is under contract. DIY Creative Display, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this platform.",
    },
    {
      heading: "Indemnification",
      list: "You hereby indemnify to the fullest extent DIY Creative Display from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these terms.",
    },
    {
      heading: "Severability",
      list: "If any provision of these terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.",
    },
    {
      heading: "Variation of Terms",
      list: "DIY Creative Display is permitted to revise these terms at any time as it sees fit, and by using this platform you are expected to review these terms on a regular basis.",
    },
    {
      heading: "Entire Agreement",
      list: "These terms constitute the entire agreement between DIY Creative Display and you in relation to your use of this platform, and supersede all prior agreements and understandings. By signing up, you agree and consent to these terms and conditions.",
    },
  ];
  return (
    <section className="pt-7 pb-16 px-5">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-bold text-2xl text-amber-700 pb-2">
          Terms and Conditions
        </h2>
        <p>
          Welcome to DIY Creative Display! These terms and conditions outline
          the rules and regulations for the use of our platform.
        </p>
        <p className="py-4">
          By accessing DIY Creative Display, we assume you accept these terms
          and conditions. Do not continue to use DIY Creative Display if you do
          not agree to take all of the terms and conditions stated on this page.
        </p>
        {conditions.map((condition, idx) => (
          <div key={idx}>
            <h2 className="font-bold text-lg text-amber-700 pt-4 pb-2">
              <span className="mr-1">{`${idx + 1}.`}</span>
              {condition.heading}
            </h2>
            <ul className="list-disc px-5">
              <li>{condition.list}</li>
              {condition.innerList &&
                condition.innerList.map((list, i) => (
                  <ul className="list-disc px-5 list-inside">
                    <li key={i}>{list}</li>
                  </ul>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Terms;
