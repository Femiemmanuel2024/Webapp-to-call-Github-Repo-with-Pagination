import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

function Home() {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items per page
  const pageCount = Math.ceil(repos.length / itemsPerPage); // Calculate the total number of pages

  useEffect(() => {
    fetchRepos();
  }, [currentPage]);

  const fetchRepos = async (currentPage) => {
    const response = await fetch(
      // `https://api.github.com/users/Femiemmanuel2024/repos?per_page=${itemsPerPage}&page=${currentPage}`

      `https://api.github.com/users/Femiemmanuel2024/repos?_page=${currentPage}&_limit=4`
    );
    const data = await response.json();
    setRepos(data);
  };

  const handlePageClick = async (data) => {
    // setCurrentPage(selected + 1); 
    console.log (data);
    let currentPage = data.selected + 1
    const newpage = await fetchRepos (currentPage)
  };

  

  return (
    <div className="home">
      <h2 className="title">List Of Available Repo</h2>
      <section className="repo-container">
        {repos.map((repo) => (
          <div className="repo-card" key={repo.id}>
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
          pageCount={25}
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



    </div>
  );
}

export default Home;
