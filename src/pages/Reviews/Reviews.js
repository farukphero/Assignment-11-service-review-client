import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reviews = ({ review, handleDelete, reviews, setReviews }) => {
  const navigate = useNavigate();
  const { _id, title, img, image, description, name } = review;
  const handleUpdatedReview = (event) => {
    event.preventDefault();
    const form = event.target;
    const description = form.serviceMessage.value;
    console.log(description);
    const review = { description };
    console.log(review);
    fetch(`https://fly-plane-web-server.vercel.app/allReviews/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const fil = reviews.filter((rev) => rev._id !== _id);
          const newUpdateReview = [...reviews, fil];
          setReviews(newUpdateReview);
          toast("Updated");
          navigate('/showreview');
          event.target.reset();
        }
      });
  };

  return (
    <div className=" w-4/5 mx-auto">
      <div className="card-body">
        <div className="card-actions justify-end"></div>
      </div>

      <h1 className="text-2xl font-semibold">{name}</h1>
          <img className="h-52 w-full" src={image} alt="" />
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
        </figure>
        <div className="card-body">
          <div>
            <div className="card-actions mb-5 md:mb-0 md:justify-end">
              {/* The button to open modal */}
             

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="my-modal" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box">
                  <form onSubmit={handleUpdatedReview} className="card-body">
                    <textarea
                      className="textarea min-h-16"
                      name="serviceMessage"
                      placeholder="Describe about service"
                      required
                    ></textarea>
                    {/* <p>{error}</p> */}
                    <button htmlFor="my-modal" className="btn btn-primary">
                      Updated
                    </button>
                  </form>
                  <div className="modal-action">
                    <label htmlFor="my-modal" className="btn">
                      X
                    </label>
                  </div>
                </div>
              </div>
              <ToastContainer />
            </div>
            <div className="flex">
              <img className="h-12 w-12 rounded-full mr-5" src={img} alt="" />
              <h2 className="card-title">{title}</h2>
            </div>
          </div>
          <p>{description}</p>
          <div className="card-actions justify-between md:justify-end">
          <label htmlFor="my-modal" className="btn btn-outline btn-primary">
                Edit
              </label>
            <button
              onClick={() => handleDelete(_id)}
              className="btn btn-outline btn-primary"
            >
              Delete
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
