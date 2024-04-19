import { FaRegStar, FaRegEye, FaCodeBranch } from 'react-icons/fa';
import { TbGitFork } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

function RepoDetails() {
    const { id } = useParams()
    const [details, setDetails] = useState({})
    const [branch, setBranch] = useState({})
    const [deployment, setDeployment] = useState({})
    const [description, setDescription] = useState(""); // New state for the description

    useEffect(() => {
        fetch(`https://api.github.com/repos/Femiemmanuel2024/${id}`)
        .then((response) => (response.json()))
        .then((data) => {
            setDetails(data);
            setDescription(data.description); // Set the description when fetching repository details
        })
    }, []) 

    useEffect(() => {
        fetch(`https://api.github.com/repos/Femiemmanuel2024/${id}/branches`)
        .then((response) => (response.json()))
        .then((data) => {
            setBranch(data)
        })
    }, []) 

    useEffect(() => {
        fetch(`https://api.github.com/repos/Femiemmanuel2024/${id}/deployments`)
        .then((response) => (response.json()))
        .then((data) => {
            setDeployment(data)
        })
    }, []) 

    return (
        <div id="repodetail">
            <div className="repodetail-card">
                <h2 className="repo-name">{details.name}</h2>
                <p>Description: {description ? description : "No description available"}</p> {/* Display description */}
                <p>Language: {details.language === null ? "none": details.language}</p>
                
                <p>Live site: {deployment.length === 0 ? `none` : <a href={`https://github.com/TheFemiOlaniyi?tab=repositories/${details.name}`}>https://github.com/TheFemiOlaniyi?tab=repositories/{details.name}</a>}</p>

                <p><a href={`https://github.com/${details.full_name}`}>Visit Github</a></p>

                <div className="repo-mini-details">
                    <p><FaRegStar className="icons" /> Stars: {details.stargazers_count}</p>
                    <p><FaRegEye className="icons" /> Watch: {details.watchers}</p>
                    <p><TbGitFork className="icons" /> Forks: {details.forks}</p>
                    <p><FaCodeBranch className="icons" /> Branches: {branch.length}</p>
                </div>
            </div>
            <Link to="/" className='Homebutton'>Home</Link> {/* Link to home page */}
        </div>
    )



}

export default RepoDetails
