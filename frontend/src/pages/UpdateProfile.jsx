/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const UpdateProfile = () => {
  const param = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState([]);
  const [educations, setEducations] = useState([]);
  const [interests, setInterests] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newEducation, setNewEducation] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  // console.log(param);
  // console.log(user)
  if (user && param !== user._id) {
    navigate("/");
  }

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/userProfile/" + param);
      const userProfile = res.data[0];
      setSummary(userProfile.summary);
      setSkills(userProfile.skills);
      setEducations(userProfile.educations);
      setInterests(userProfile.interests);
      setId(userProfile._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [param]);

  const handleUserUpdate = async () => {
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      setPhoto(filename);
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const userId = param;
      const res = await axios.put(
        URL + "/api/userProfile/" + id,
        {
          userId,
          summary,
          skills,
          interests,
          educations,
          photo,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      // console.log(res1.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() === "") return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };

  const deleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const addEducation = () => {
    if (newEducation.trim() === "") return;
    setEducations([...educations, newEducation.trim()]);
    setNewEducation("");
  };

  const deleteEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };

  const addInterest = () => {
    if (newInterest.trim() === "") return;
    setInterests([...interests, newInterest.trim()]);
    setNewInterest("");
  };

  const deleteInterest = (index) => {
    const updatedInterests = [...interests];
    updatedInterests.splice(index, 1);
    setInterests(updatedInterests);
  };

  return (
    <div>
      <Navbar />
      <div className="md:px-[200px] mt-8">
        <div className="w-full">
          <h1 className="text-xl font-bold mb-4 text-center">Update Profile</h1>

          <textarea
            onChange={(e) => setSummary(e.target.value)}
            value={summary}
            className="outline-none px-4 py-2 text-gray-500 w-full border"
            placeholder="Summary about yourself"
            rows="4"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4 py-2 outline-none border rounded-md border-white text-black"
          />
          <div className="flex flex-col mt-4">
            <div className="flex items-center space-x-4">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                type="text"
                placeholder="Add new skill"
                className="outline-none px-4 py-2 text-gray-500"
              />
              <div
                onClick={addSkill}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer  hover:text-black hover:bg-gray-400"
              >
                Add
              </div>
            </div>
            <div className="flex flex-wrap mt-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2"
                >
                  {skill}
                  <ImCross
                    onClick={() => deleteSkill(index)}
                    className="ml-2 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex items-center space-x-4">
              <input
                value={newEducation}
                onChange={(e) => setNewEducation(e.target.value)}
                type="text"
                placeholder="Add new education"
                className="outline-none px-4 py-2 text-gray-500"
              />
              <div
                onClick={addEducation}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer  hover:text-black hover:bg-gray-400"
              >
                Add
              </div>
            </div>
            <div className="flex flex-wrap mt-2">
              {educations.map((education, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2"
                >
                  {education}
                  <ImCross
                    onClick={() => deleteEducation(index)}
                    className="ml-2 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex items-center space-x-4">
              <input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                type="text"
                placeholder="Add new interest"
                className="outline-none px-4 py-2 text-gray-500"
              />
              <div
                onClick={addInterest}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer  hover:text-black hover:bg-gray-400"
              >
                Add
              </div>
            </div>
            <div className="flex flex-wrap mt-2">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2"
                >
                  {interest}
                  <ImCross
                    onClick={() => deleteInterest(index)}
                    className="ml-2 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-8">
            <button
              onClick={handleUserUpdate}
              className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
            >
              Update
            </button>
            <button
              onClick={() => navigate(`/profile/${param}`)}
              className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
          {updated && (
            <h3 className="text-green-500 text-sm text-center mt-4">
              Profile updated successfully!
            </h3>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProfile;

// <input
//             onChange={(e) => setUsername(e.target.value)}
//             value={username}
//             className="outline-none px-4 py-2 text-gray-500"
//             placeholder="Your username"
//             type="text"
//           />
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="outline-none px-4 py-2 text-gray-500"
//             placeholder="Your email"
//             type="email"
//           />
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             className="outline-none px-4 py-2 text-gray-500"
//             placeholder="Your password"
//             type="password"
//           />
