import { useState } from "react";
import Item from "./Item";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function Accordion() {
  const [isOpen, setisOpen] = useState(null);

  const handleToggle = (index) => {
    setisOpen(isOpen === index ? null : index);
  };

  return (
    <div className="accordion">
      {faqs.map((faq, index) => (
        <div
          onClick={() => handleToggle(index)}
          className={isOpen === index ? "item open" : "item"}
          key={index}
        >
          <span className="number">0{index + 1}</span>
          <p>{faq.title}</p>
          {isOpen === index ? <span>-</span> : <span>+</span>}
          {isOpen === index && <p className="content-box">{faq.text}</p>}
        </div>
      ))}
      ;
    </div>
  );
}
