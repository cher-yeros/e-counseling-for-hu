import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function HomePage() {
  return (
    <>
      <Navbar />
      <div
        style={{
          //background : '#5f9beb !important' ,
          background: "#596CFF",
          height: "calc(100vh - 100px)",
          margin: "0px !important",
        }}
        className="container-fluid bg-secondary px-0 px-md-5 mb-5"
      >
        <div className="row align-items-center px-3">
          <div className="col-lg-6 text-center text-lg-left">
            <h1 className="display-3 font-weight-bold text-white">
              Hawassa University online counselling
            </h1>
            <h6 style={{ fontSize: "1rem" }} className="display-4  text-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
              nam magni molestiae modi fugiat iste delectus. Placeat laborum est
              magni voluptates, neque veritatis laboriosam quos quam hic
              necessitatibus nesciunt perferendis eligendi quae rem totam! Cum
              enim sed, quia architecto esse quo provident? Minus voluptate
              aliquam ab accusantium necessitatibus amet molestiae.
            </h6>

            <Link to="/login" className="btn btn-secondary mt-1 py-3 px-5">
              Login
            </Link>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <img
              style={{ width: "25rem" }}
              className=""
              src="assets/images/homeImage.jpg"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
