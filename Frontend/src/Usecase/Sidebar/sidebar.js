import React, { useState } from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { FiMenu, FiArrowLeftCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { ImProfile } from "react-icons/im";

const Sidebar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleProjectManagementClick = () => {
    setSelectedItem(
      selectedItem === "ProjectManagement" ? null : "ProjectManagement"
    );
  };
  const handleAttendanceManagementClick = () => {
    setSelectedItem(
      selectedItem === "AttendanceManagement" ? null : "AttendanceManagement"
    );
  };

  return (
    <section className="page sidebar-2-page">
      <aside className={`sidebar-2 ${isOpen ? "open" : ""}`}>
        <div className="inner">
          <header>
            <button
              type="button"
              className="sidebar-2-burger"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="open-nav">
                {isOpen ? (
                  <FiArrowLeftCircle size={20} style={{ color: "#ffffff" }} />
                ) : (
                  <FiMenu size={20} style={{ color: "#ffffff" }} />
                )}
              </span>
            </button>
          </header>
          <nav>
            <button type="button" onClick={handleAttendanceManagementClick}>
              <span>
                <RiAdminFill size={20} />
              </span>
              <p className="navbar-item">Attendance</p>
            </button>
            {/* <button type="button" onClick={handleProjectManagementClick}>
              <span>
                <LiaProjectDiagramSolid size={24} />
              </span>
              <p className="navbar-item">Project</p>
            </button> */}
            {/* while clicking AttendanceManagement */}
            {selectedItem === "AttendanceManagement" && (
              <>
                <div id="proj-div1">
                  <Link to="/main" style={{ textDecoration: "none" }}>
                    <button type="button" id="nav-button">
                      <span className="navbar-item1">
                        <FaHome />
                      </span>
                      <p className="navbar-item1">Home</p>
                    </button>
                  </Link>
                </div>
              </>
            )}
            {/* project management clicking */}
            {selectedItem === "ProjectManagement" && (
              <>
                <div id="proj-div3">
                  <Link
                    to="/home"
                    style={{ textDecoration: "none" }}
                    className="material-symbols-outlined"
                  >
                    <button type="button" id="nav-button">
                      <span>
                        <FaHome />
                      </span>
                      <p className="navbar-item2">Home</p>
                    </button>
                  </Link>
                  <Link
                    to="/admin"
                    style={{ textDecoration: "none" }}
                    className="material-symbols-outlined"
                  >
                    <button type="button" id="nav-button">
                      <span>
                        <RiAdminFill />
                      </span>
                      <p className="navbar-item2">Admin</p>
                    </button>
                  </Link>
                  <Link
                    to="/user"
                    style={{ textDecoration: "none" }}
                    className="material-symbols-outlined"
                  >
                    <button type="button" id="nav-button">
                      <span>
                        <FaUserCircle />
                      </span>
                      <p className="navbar-item2">User</p>
                    </button>
                  </Link>
                  <Link
                    to="/task"
                    style={{ textDecoration: "none" }}
                    className="material-symbols-outlined"
                  >
                    <button type="button" id="nav-button">
                      <span>
                        <BiTask />
                      </span>
                      <p className="navbar-item2">Task</p>
                    </button>
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      </aside>
    </section>
  );
};

export default Sidebar1;
