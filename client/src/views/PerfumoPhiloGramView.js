import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// here will be the single pic posted from the user with comments and like section
import { BsPin, BsPinFill } from "react-icons/bs";
import { Carousel } from "flowbite-react";
import Comments from "../components/comments/Comments";

function PerfumoPhiloGramView() {
  const [post, setPost] = useState();
  const [isPinned, setPinned] = useState(false);
  const { id } = useParams();
  console.log("id from useParams :>> ", id);

  const getPostById = async () => {
    const requestOptions = {
      method: "GET",

      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/philogram/${id}`,
        requestOptions
      );
      const result = await response.json();
      // console.log("result with 1 post by id", result);
      setPost(result);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getPostById();
  }, []);

  console.log("post :>> ", post);
  return (
    <>
      <div className="flex justify-center ">
        <div className="grid grid-cols-1  w-[900px] h-[700px] md:h-[600px]  mt-11 border-solid rounded-md border-gray-500 shadow-lg ">
          <div className="items-user flex justify-between ">
            <div className="flex gap-2 pt-[0.5rem] h-[30px]  ">
              <img
                src={post && post.user[0].avatarPic}
                alt="user img"
                style={{
                  width: "37px",
                  height: "37px",
                  borderRadius: "45%",
                  marginLeft: "3px",
                }}
              />
              <div>
                <p>{post && post.user[0].userName}</p>
                <p>{post && post.date}</p>
              </div>
            </div>
            {isPinned === false ? (
              <BsPin
                onClick={() => setPinned(true)}
                size={25}
                style={{ paddingTop: "0.5rem" }}
              />
            ) : (
              <BsPinFill
                onClick={() => setPinned(false)}
                size={25}
                style={{ paddingTop: "0.5rem" }}
              />
            )}
          </div>

          <div className="item-text col-span-1 pl-3 md:col-span-2 mt-5">
            <p>{post && post.tag}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="item-img   m-10 h-56  xl:h-80 2xl:h-96 lg:mx-5 lg:h-80 ">
              <Carousel slide={false}>
                {post &&
                  post.pics.map((pic) => {
                    return <img src={pic.url} alt="user uploaded pics" />;
                  })}
              </Carousel>
            </div>
            <div className="item-comments relative">
              <Comments />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PerfumoPhiloGramView;
