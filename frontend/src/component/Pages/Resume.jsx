import { marked } from 'marked'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'





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



  return (
    <div className='w-full h-full flex gap-1'>
      <div className="info w-6/12 h-[100vh] border rounded-2xl p-3 my-1 mx-1 bg-neutral-100 overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap'>

          <div className="flex flex-col">
            <div className="flex flex-col p-3 gap-2">
              <label htmlFor="Name">Name</label>
              <input type="text" {...register("Fullname", { required: true })} className='border border-slate-500 p-3 rounded-2xl w-[300px]' />
            </div>

            <div className="flex flex-col p-3 gap-2">
              <label htmlFor="email">Email</label>
              <input type="email" {...register("Email", { required: true })} className='border border-slate-500 p-3 rounded-2xl w-[300px]' />
            </div>

            <div className="flex flex-col p-3 gap-2">
              <label htmlFor="contact">Phone Number</label>
              <input type="number" {...register("ContactNumber", { required: true, maxLength: 10 })} className='border border-slate-500 p-3 rounded-2xl w-[300px]' />
            </div>

            <div className="flex flex-col p-3 gap-2">
              <label htmlFor="Education">Education</label>
              <input type="text" {...register("Education", { required: true })} className='border border-slate-500 p-3 rounded-2xl w-[300px]' />
            </div>
            <div className="flex flex-col p-3 gap-2">
              <label htmlFor="College">College Name</label>
              <input type="text" {...register("College", { required: true })} className='border border-slate-500 p-3 rounded-2xl w-[300px]' />
            </div>

            <div className="flex flex-col p-3 gap-2">
              <label htmlFor="github">Github</label>
              <input type="text" {...register("GitHub")} className='border border-slate-500 p-3 rounded-2xl w-[300px]' />
            </div>
            <div className="flex flex-col p-3 gap-2">
              <label htmlFor="linkedin">LinkedIn</label>
              <input type="text" {...register("LinkedIn", { required: true })} className='border border-slate-500 p-3 rounded-2xl w-[300px]' />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col p-3 gap-2">
              <label htmlFor="job-role">Job Role applying for</label>
              <input type="text" {...register("Job-role", { required: true })} className='border border-slate-500 p-3 rounded-2xl w-[300px]' />
            </div>
            <div className="flex flex-col p-3 gap-2">
              <label htmlFor="Skills">Skills</label>
              <textarea type="text" {...register("Skills", { required: true })} className='border border-slate-500 p-3 rounded-2xl w-[300px] h-39 resize-none' />
            </div>

            <div className="flex flex-col p-3 gap-2">
              <label htmlFor="jd">Job Description</label>
              <textarea type="text" {...register("JD", { required: true })} className='border border-slate-500 p-3 rounded-2xl w-[300px] h-65 resize-none' />
            </div>
          </div>

          <button type='submit' className=' mt-10 h-10 py-0 px-4 border rounded-xl bg-amber-200 hover:cursor-pointer'>{loading ? <></> : "Submit"}</button>
        </form >

      </div>
      <div className="editor w-6/12 h-[100vh] border rounded-2xl p-3 my-1 mx-1 bg-neutral-100 overflow-y-auto">
        <h1 className='text-4xl font-bold text-center'>Resume Preview</h1>
        <div className='flex justify-center'>
          {loading ? <h1 className='text-md font-bold'>Loading...</h1> : null}
        </div>
        <div className='h-full shadow bg-amber-100 p-2 rounded-2xl overflow-y-auto'>
          <Markdown remarkPlugins={remarkGfm}>{loading ? <>

          </> : resume}</Markdown>
        </div>
        <div className='flex justify-end'>
          <button className='h-10 py-0 px-4 border rounded-xl bg-amber-200 hover:cursor-pointer mt-5'>Download</button>
        </div>
        
      </div>
    </div>
  )

}
export default Resume