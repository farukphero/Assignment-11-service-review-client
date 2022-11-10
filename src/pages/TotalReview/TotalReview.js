import React from 'react';

const TotalReview = ({review}) => {
    const {_id,title,img,description} = review;
    return (
        <div className=" mt-5">
         <div className="card bg-base-100 shadow-xl">
         <div className="card-actions justify-end">
              <button
                // onClick={() => handleUpdate(_id)}
                className="btn btn-primary"
              >
                Delete
              </button>
            </div>
         <div className="card-body">
           <div className="flex">
           <img className="h-12 w-12 rounded-full mr-5" src={img} alt="" />
      <h2 className="card-title">{title}</h2>
           </div>
      <p>{description}</p>
      <div className="card-actions justify-end">
        <button  className="btn btn-primary">Delete</button>
      </div>
      </div>
      </div>
    </div>
    );
};

export default TotalReview;