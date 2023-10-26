import {
  faComment,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@remix-run/react";
import { API_URL } from "~/constants/api";
import type { DbInfluencer } from "~/types/ApiOps";

export default function UserHomeCard({ user }: { user: DbInfluencer }) {
  return (
    <div className="flex">
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <div className="avatar">
          <div className="w-full rounded-xl ring ring-secondary">
            <img
              src={API_URL + user.influencerProfile.profilePicture}
              alt="profile"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-10 font-bold text-4xl">
          <h2>
            {user.fname} {user.lname}
          </h2>
          <div className="badge badge-secondary my-1">
            {user.usertype.toLowerCase()}
          </div>
          <div className="flex flex-row justify-center items-center mt-5">
            <Link to={`/chatbox?otherPerson=${69}`}>
              <button className="btn btn-primary btn-circle mx-2">
                <FontAwesomeIcon icon={faComment} />
              </button>
            </Link>
            <Link to="/profile" prefetch="intent">
              <button className="btn btn-primary btn-circle mx-2">
                <FontAwesomeIcon icon={faUser} />
              </button>
            </Link>

            <form method="post" action="/api">
              <button
                className="btn btn-primary btn-circle mx-2"
                name="operation"
                value="LOGOUT"
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
