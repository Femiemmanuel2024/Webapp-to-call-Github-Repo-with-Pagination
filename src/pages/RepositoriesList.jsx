import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import NoRepositoriesPage from "./NoRepositoriesPage"; // Import the JSX page for no repositories found

function Home() {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 12;
  const [noRepositories, setNoRepositories] = useState(false); 

  useEffect(() => {
    fetchRepos(currentPage);
  }, [currentPage]);

  const fetchRepos = async (page) => {
    try {
      const res = await fetch(
        `https://api.github.com/users/femiemmanuel2024/repos?per_page=4&page=${currentPage}`
      );
      const data = await res.json();
      if (data.length === 0) {
        setNoRepositories(true); // Set state to indicate no repositories found
      } else {
        setRepos(data);
      }
    } catch (error) {
      console.error("Error fetching repositories:", error);
      // Handle error here, such as displaying an error message to the user
    }
  };

  const handlePageClick = async (data) => {
    let selectedPage = data.selected + 1;
    const newPage = await fetchRepos(currentPage);
    setCurrentPage(selectedPage);
  };

  return (
    <div className="home">
      {noRepositories ? (
        <NoRepositoriesPage /> // Render the JSX page for no repositories found
      ) : (
        <>
          <h2 className="title">List Of Available Repo</h2>
          <section className="repo-container">
            {repos.map((repo) => (
              <div className="repo-card"  key={repo.id}>
                <Link to={`/repodetails/${repo.name}`}>
                  <h2 className="repo-name">{repo.name}</h2>
                </Link>
                <p className="language">
                  Language: {repo.language === null ? "none" : repo.language}
                </p>
                <p className="date">Start date & time: {repo.created_at}</p>
                <p className="visibility">Visibility: {repo.visibility}</p>
              </div>
            ))}
          </section>

          <div className="pagination-container">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel="..."
              pageCount={5} // Replace with actual page count
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
              previousClassName="prev"
              nextClassName="next"
              disabledClassName="disabled"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
