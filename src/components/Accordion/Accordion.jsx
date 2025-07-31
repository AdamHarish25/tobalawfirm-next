// src/components/Accordion/Accordion.jsx (FINAL)
'use client';

import React from 'react';
import { FaChevronDown } from "react-icons/fa";

// CSS untuk komponen ini sudah dipindahkan ke src/app/globals.css

const Accordion = ({ children }) => {
  const [activeSectionIndex, setActiveSectionIndex] = React.useState(0);
  
  const toggleSection = (index) => {
    setActiveSectionIndex(activeSectionIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;
        return (
          <div className="accordion-section" key={index}>
            <div
              className={`accordion-header ${activeSectionIndex === index ? "active" : ""}`}
              onClick={() => toggleSection(index)}
            >
              <div className="accordion-headerIcon">
                <div className="accordion-icon">{child.props.icon}</div>
                <h1>{child.props.header}</h1>
              </div>
              <div className={`accordion-arrow ${activeSectionIndex === index ? "open" : ""}`}>
                <FaChevronDown />
              </div>
            </div>
            <div className={`accordion-content ${activeSectionIndex === index ? "open" : ""}`}>
              {child.props.children}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;