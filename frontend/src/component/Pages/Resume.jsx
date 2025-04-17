import { motion } from "framer-motion";
import axios from 'axios'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'



const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};



export const Resume = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [formData, setFormData] = useState({})
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('');


  const getGitHubProjects = async (github) => {

    const username = github.replace(/.*\/([^/]+)$/, '$1');
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      const projectData = response.data.map(repo => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        technologies: repo.languages_url,
      }));
      console.log(projectData)

      const projectLanguages = await Promise.all(
        response.data.map(async (repo) => {
          const languagesResponse = await axios.get(repo.languages_url);
          return Object.keys(languagesResponse.data).join(', ');
        })
      );
      const projects = response.data.map((repo, index) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        technologies: projectLanguages[index],
      }));
      return projects;

    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
      return [];
    }

  }





  const onSubmit = async (data) => {

    setLoading(true)

    const githubProjects = await getGitHubProjects(data.GitHub)
    console.log(githubProjects)

    const cleanedData = {
      name: data.Fullname,
      email: data.Email,
      contact: data.ContactNumber,
      education: data.Education,
      college: data.College,
      skills: data.Skills,
      githubProjects: githubProjects,
      jobRole: data['Job-role'],
      github: data.GitHub,
      linkedin: data.LinkedIn,
      jd: data.JD,
    };

    setFormData(cleanedData)
    console.log(cleanedData)
    const resume = await axios.post('http://localhost:8000/ai/get-resume', { cleanedData })
    setLoading(false)
    const markedData = resume.data
    setResume(markedData)
    console.log(resume.data)
  }


  const handleDownloadPDF = async () => {
    try {
      const response = await axios.post('http://localhost:8000/ai/generate-resume-pdf', {
        markdownContent: resume,
      }, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  }



  return (
    <div className='w-full h-full flex gap-1'>
      <div className="info w-6/12 h-[100vh]  p-3 my-1 mx-1 overflow-y-auto">
        <motion.form
          initial="hidden"
          animate="visible"
          variants={formVariants}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-xl p-8 flex flex-wrap gap-2 max-w-5xl w-full border border-purple-100"
        >
          <div className="flex flex-col flex-1 min-w-[320px]">
            <h2 className="text-2xl font-bold mb-6 text-indigo-400">Personal Information</h2>

            <motion.div variants={itemVariants} className="flex flex-col mb-4">
              <label htmlFor="Name" className="text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                {...register("Fullname", { required: true })}
                className="border border-indigo-200 p-3 rounded-xl w-[300px] bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col mb-4">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                {...register("Email", { required: true })}
                className="border border-indigo-200 p-3 rounded-xl w-[300px] bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col mb-4">
              <label htmlFor="contact" className="text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="number"
                {...register("ContactNumber", { required: true, maxLength: 10 })}
                className="border border-indigo-200 p-3 rounded-xl w-[300px] bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col mb-4">
              <label htmlFor="Education" className="text-sm font-medium text-gray-700 mb-1">Education</label>
              <input
                type="text"
                {...register("Education", { required: true })}
                className="border border-indigo-200 p-3 rounded-xl w-[300px] bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col mb-4">
              <label htmlFor="College" className="text-sm font-medium text-gray-700 mb-1">College Name</label>
              <input
                type="text"
                {...register("College", { required: true })}
                className="border border-indigo-200 p-3 rounded-xl w-[300px] bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col mb-4">
              <label htmlFor="github" className="text-sm font-medium text-gray-700 mb-1">Github</label>
              <input
                type="text"
                {...register("GitHub")}
                className="border border-indigo-200 p-3 rounded-xl w-[300px] bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col mb-4">
              <label htmlFor="linkedin" className="text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <input
                type="text"
                {...register("LinkedIn", { required: true })}
                className="border border-indigo-200 p-3 rounded-xl w-[300px] bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
              />
            </motion.div>
          </div>

          <div className="flex flex-col ">
            <h2 className="text-2xl font-bold mb-6 text-indigo-400">Professional Details</h2>

            <motion.div variants={itemVariants} className="flex flex-col mb-4">
              <label htmlFor="job-role" className="text-sm font-medium text-gray-700 mb-1">Job Role applying for</label>
              <input
                type="text"
                {...register("Job-role", { required: true })}
                className="border border-indigo-200 p-3 rounded-xl w-[300px] bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col mb-4">
              <label htmlFor="Skills" className="text-sm font-medium text-gray-700 mb-1">Skills</label>
              <textarea
                type="text"
                {...register("Skills", { required: true })}
                className="border border-indigo-200 p-3 rounded-xl w-[300px] bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none h-56 resize-none"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col mb-4">
              <label htmlFor="jd" className="text-sm font-medium text-gray-700 mb-1">Job Description</label>
              <textarea
                type="text"
                {...register("JD", { required: true })}
                className="border border-indigo-200 p-3 rounded-xl w-[300px] bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none h-60 resize-none"
              />
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="w-[300px] flex justify-center mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              type="submit"
              className=" rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-[300px] mt-0 h-10 py-0 px-4 hover:cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </motion.div>
        </motion.form>

      </div>
      <div className="editor w-6/12 h-[100vh] p-3 my-1 mx-1  overflow-y-auto">
        <h1 className='text-4xl font-bold text-center'>Resume Preview</h1>
        <div className="flex justify-center items-center py-6">
          {loading ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <motion.h1
                className="text-xl text-indigo-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Generating resume
              </motion.h1>

              <motion.div className="flex mt-2">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="h-2 w-2 mx-1 rounded-full bg-indigo-500"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      scale: [0.5, 1, 0.5],
                      y: [0, -6, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: dot * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : null}
        </div>
        <div className='h-full bg-white shadow-2xl p-2 rounded-2xl overflow-y-auto'>
          <Markdown remarkPlugins={remarkGfm}>{resume}</Markdown>
        </div>
        <div className='flex justify-end'>
          <button className='h-10 py-0 px-4 border rounded-xl bg-amber-200 hover:cursor-pointer mt-5' onClick={handleDownloadPDF} >Download</button>
        </div>

      </div>
    </div>
  )

}
export default Resume