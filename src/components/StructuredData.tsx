export default function StructuredData() {
  const educationalOrg = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "MAHAD Al-TOWHEED",
    "alternateName": "معهد التوحيد",
    "description": "Non-profit Islamic school in Shashemane providing academic and religious education.",
    "url": "https://mahad.fcncare.com/",
    "logo": "https://mahad.fcncare.com/logo.png",
    "foundingDate": "1985",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Shashemane",
      "addressCountry": "ET"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+251916006695",
      "contactType": "admissions",
      "availableLanguage": ["English", "Arabic", "Amharic"]
    },
    "numberOfStudents": 1000,
    "educationalLevel": "Kindergarten through Grade 12",
    "teaches": ["Academic Education", "Religious Education", "Islamic Studies"]
  }

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is MAHAD Al-TOWHEED?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MAHAD Al-TOWHEED is a non-profit Islamic school in Shashemane, Ethiopia, founded in 1985. We provide academic education from Kindergarten to Grade 10 and religious education from Grade 1 to Grade 12."
        }
      },
      {
        "@type": "Question",
        "name": "Where is MAHAD Al-TOWHEED located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our school is located in Bulchana (05), Shashemane, Ethiopia."
        }
      },
      {
        "@type": "Question",
        "name": "How many students attend MAHAD Al-TOWHEED?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We currently serve over 1000 students across our academic and religious programs."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  )
}