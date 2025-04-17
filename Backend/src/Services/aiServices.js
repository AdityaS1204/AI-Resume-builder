const { GoogleGenerativeAI } = require("@google/generative-ai");
const api_key = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(api_key);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

async function generateResume(data) {
  if (!data) {
    throw new Error("No data provided for resume generation.");
  }
  const prompt = `
 You are an expert AI resume writer. Given a user’s personal details and a job description, produce a concise, one‑page, ATS-friendly resume that meets the following requirements:
    (mostly all the isntructions will be given in the parenthesis).
    * Section order:  
      1. Name  
      2. Contact Information (Phone & Email and soical media links)  
      3. Professional Summary (1–2 sentences tailored to the job role)  
      4. Education  
      5. Skills (bullet‑listed; highlight those matching the job description)  
      6. Relevant Experience or Projects (if any; use reverse‑chronological order)(Go through the JD and the github info provided by the user and create a project section with 2-3 projects that are relevant to the JD)
      format for the project section:
        * Project Title
        * Description (1–2 sentences)
        * Technologies used (bullet-listed)
        * GitHub link (if available)
      7. GitHub & LinkedIn URLs  
    
    * Tone & formatting:  
      * Professional, clear, and easy to scan  
      * Use consistent heading styles and bullet points  
      * Keep it to one page  
    
    Always tailor the summary and skills bullets to the “Job Role” and “JD” (job description) fields provided. 
    Dont give any response other than the resume.
    format the resume text like making the heading like proffessional language etc in bold and text size accordingly.
    the following is an example resume:
    ## **Jethalal Gada**  
Nagpur, Maharashtra | adityas.singh.tech@gmail.com | 9730198978 | LinkedIn: in/adi-ng-908012288 | GitHub: AdityaS1204  

---

## **Professional Summary**  
Results-driven Software Developer with hands-on experience in building full-stack applications, integrating AI models.  
Skilled in JavaScript, React.js, Node.js, and database management.  
Demonstrated ability to deliver robust solutions that improve efficiency and user experience.

---

## **Technical Skills**  
* **Languages:** JavaScript, Python, C  
* **Frameworks & Libraries:** Node.js, Express, React.js, Tailwind CSS  
* **Databases:** MongoDB, PostgreSQL  
* **Version Control:** Git, GitHub  
* **Tools & Platforms:** OAuth, Docker  
* **Other:** REST APIs, AI model APIs (OpenAI, Gemini), Agile Development  

---

## **Projects**

** 1. Full-Stack Gen AI Website**  
* Built a web application enabling users to generate AI-powered answers to queries and download responses as PDFs.  
* Designed a secure login and registration system using OAuth and PostgreSQL.  
* Optimized API calls and queries, improving performance by 20%.  
* Achieved 98% satisfaction from beta users.  

** 2. 3D T-Shirt Design Site **  
* Created a platform for users to design 3D T-shirts using DALL·E and Three.js.  
* Increased engagement by 40% with responsive UI in React.js + Tailwind CSS.  
* Generated over 1,000 designs in 3 months.  

** 3. React.js E-Commerce Prototype **  
* Built an intuitive e-commerce UI with dynamic filtering and product galleries.  
* Improved page load speed by 30% via efficient React state management.  
* Increased simulated cart-to-checkout conversions by 25%.  

---

## **Certifications**  
* ChatGPT Prompt Engineering for Developers — DeepLearning.AI  
* Open Source Models with Hugging Face — DeepLearning.AI  

---

## **Education**  
**Bachelor of Technology in Information Technology**  (in single line)
G.H. Raisoni Institute of Technology and Management | 2022 – 2026 (Expected)  
*Relevant coursework: Software Engineering, Web Development, Database Systems, Artificial Intelligence*  


    (dont repeat the skills section in the education section, just write the degree and college name and the relevant coursework if any, dont repeat the links anywhere in the resume)

    Name: ${data.name}
    Contact: ${data.contact} | ${data.email}
    Education: ${data.education}
    Skills: ${data.skills}
    Job Role: ${data.jobRole}
    GitHub: ${data.github}
    LinkedIn: ${data.linkedin}
    College: ${data.college}
    Job Description:${data.jd}
`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = generateResume;
