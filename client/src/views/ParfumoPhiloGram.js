import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer.js";
import { PhiloGramContext } from "../context/philogramContext.js";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaRegCommentDots } from "react-icons/fa";

function ParfumoPhiloGram() {
  // here will be uploaded the picture from users and after clicking 1 will be redirected to another page where will be the
  // pic and comments site
  const { posts, isLoading } = useContext(PhiloGramContext);

  console.log("posts :>> ", posts);

  const loopPosts = async () => {
    for (let i = 0; i < posts.allPosts.length; i++) {
      console.log("posts.allPosts[i] :>> ", await posts.allPosts[i]);
    }
  };

  const [isLiked, setLiked] = useState(false);

  return (
    <>
      <div className="flex   mt-8 gap-6 w-960  min-h-screen  justify-center flex-wrap ">
        {isLoading === true ? <p className="text-lg font-bold">... is Loading</p> :
          posts.allPosts.map((post, i) => {
            return (
              <div key={i} className=" bg-grey rounded shadow-md md:h-[260px] md:w-[250px] ">
                <div className="flex gap-1">
                  <div>
                    <img
                      src={post.user[0].avatarPic}
                      alt="userPic"
                      className="w-9 h-9 rounded-[50%]"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {post.user[0].userName}
                    </p>
                    <p>{post.date}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link to={`/perfumophilogramview/${post._id}`}>
                    {post.pics !== undefined && (
                      <img
                        src={post.pics[0].url}
                        alt="user uploaded pic"
                        className=" h-32 lg:w-full sm:h-48"
                      />
                    )}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-2 mt-1">
                    {isLiked === false ? (
                      <button
                        onClick={() => {
                          setLiked(true);
                          console.log(isLiked);
                        }}
                      >
                        <FaRegHeart size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setLiked(false);
                          console.log(isLiked);
                        }}
                      >
                        <FcLike size={20} />
                      </button>
                    )}

                    <FaRegCommentDots size={20} />
                    {/* <button>how many emojis?</button> */}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Footer />
    </>
  );
}

export default ParfumoPhiloGram;
