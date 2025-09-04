import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import Link from "next/link";

const Showpage = () => {
  const [show, setshow] = useState(null);
  const [error, seterror] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return; // wait until id is available

    const url = "https://api.tvmaze.com/shows/" + id;
    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setshow(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        seterror(true);
      });
  }, [id]);

  if (error) {
    return <div>Page not found</div>;
  }

  return (
    <div className="show-details">
      <Header />

      {show && (
        <div>
          <h1>{show.name}</h1>
    
<div className="details-flex" >
{show.image && (
  <img src={show.image.medium} alt={show.name} className="rounded shadow-md my-4" />
)}
          {/* Use dangerouslySetInnerHTML for HTML content like summary */}

          <div>
          <div className="summary" dangerouslySetInnerHTML={{ __html: show.summary }} />

          <h2 className="show-section">Schedule</h2>
<p><strong>Time:</strong> {show?.schedule?.time}</p>
<p><strong>Days:</strong> {show?.schedule?.days.join(", ")}</p>


<h2 className="how-section">Network</h2>
<p><strong>Name:</strong> {show?.network?.name}</p>
<p><strong>Country:</strong> {show?.network?.country?.name}</p>


          </div>
        </div>
        </div>
      )}
{/* <div slassName="show-section"/> */}

      <Footer />
    </div>
  );
};

export default Showpage;
