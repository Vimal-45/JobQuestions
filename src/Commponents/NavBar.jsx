import { useDispatch, useSelector } from "react-redux";
import { getAllNotes, getUserNotes } from "../Features/ApiActions";
import logo from "../assets/logo.jpeg";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import userImg from "../assets/ProfileImg.jpg";

const NavBar = () => {
  const user = useSelector((state) => state.quesAppReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
      };

      getAllNotes(headers, dispatch);
      getUserNotes(headers, dispatch);
    }
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    localStorage.clear();

    navigate("/signin");
  };
  return (
    <div className="fixed top-0 left-0 w-full shadow-lg z-10 bg-white border-gray-200 py-2.5 dark:bg-gray-900">
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={user.imageUrl || userImg}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm"> {user.username} </span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => navigate("/editprofile")}>
              Edit Profile
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active>
            HOME
          </Navbar.Link>
          <Navbar.Link href="/mynotes">MY NOTES</Navbar.Link>
          <Navbar.Link href="/addnotes">ADD NOTES</Navbar.Link>
          <Navbar.Link href="/profile">PROFILE</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
