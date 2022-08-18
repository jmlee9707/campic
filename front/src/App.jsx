import React, { useEffect } from "react";
import "@styles/reset.css";
import "@styles/_typography.scss";
import "@styles/_common.scss";
import "@styles/font.css";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@store/user";
import { getUserInfo } from "@apis/user";
import { setLocation } from "@store/camp";
import Router from "./routers/Router";

const DEFAULTIMG = "iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANuSURBVHgB7ZuhbmJREIanmxWtrGyr2srK4gAHOJC8As+ERSJBggMcSHDgAAc4cLv73+RuCOmmlHvOP1N2vuQmpOI2/TrMOXPmzM2vP4gTnR/iUHDRJFw0CRdNwkWTcNEkXDQJF03CRZNw0SRcNAkXTcJFk3DRJH6KYQ6HgyyXS5nNZrJYLGSz2SQ/A7e3t/L4+Jg8Ly8v8vb2Jpa5sXgeDZmDwUCGw+FfsZ9xf38v7+/vksvlks/WMCcacnu93tmCT4HkUqmUCLeEKdHdbjcRHYJ8Pi+1Wk2sYEZ0u92WyWQiIUEqqdfrYgETuw5EcmjJAO/sdDpiAXXR4/E4WLr4iNFoFPX956IqervdSr/fl9jgd1y6uIZCVTS+2pAdm/1+n2wXNVEVjbTBAilEM6rVRE+nU0o0pyCqV6uVaKEmGiU1G/xztVATrRFd8/lctPivRO92O9FCTbTGwoQ8rYWfR5NQE43zZDZ3d3eihZpojTPjh4cH0UJN9Ovrq7BBN0YLNdEarSe0vLRQE42vMTNPI1Vp9hXVRGNhKhaLwgJNAE1Ut3doNzGiGtGs3UNUFY2orlQqEptyuazeGVcvWBDVhUJBYoF3a6cNYKIyrFarUWTgnXi3Ba72ugEi2YpkYO4CDdpbuEBzaVMAiytycsx0dAkmr4RBMoSj1XWucAjGdhGCNc5RPsOk6GPQFUE3BufXeI4vOWIngVIehQjKa4uCU8yLvhb8PJqEiybhokm4aBIumoSLJmF6WAjFyvFVrtPiBftonADiwWeLsyspJkSn01cQul6vk+d4AusroHCB8OfnZ3l6elJtXx2jVrDgehYqvrTqi3mhBrLxoIrUEk8VDbmYGcQZhtYVWkQ7ZKPjwpQeXXQ6M4gzC6QES6Sjcoj02Pk9muhLhjK1YAyDRhGddShTi5jDoEFFY/uFeUGNS+YhgfBGoxE0uoOJxkLXarW+XRT/C0jGMGioBTOIaHRDEMnXCGSHaBxnLsGRLqxMp8YADeMQu6XMopvN5tWki4/AEUCIb2sm0V9pnn5nULlmnYnMJDrGoLxVsv6tmURrDkiyyZqnM4m+5tx8StaJLj/4J+GiSbhoEi6ahIsm4aJJuGgSfpuUhEc0CRdNwkWTcNEkXDQJF03CRZNw0SRcNAkXTcJFk3DRJFw0CRdN4jfu06j7peOGKgAAAABJRU5ErkJggg==";
function App() {
  const dispatch = useDispatch();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          dispatch(
            setLocation({
              lati: position.coords.latitude,
              longi: position.coords.longitude
            })
          );
        },
        err => console.log(err),
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  };  


  const reqUser = async () => {
    const userRes = await getUserInfo(sessionStorage.getItem("userEmail"));
    if (userRes.userInfo.profileImg === null) {
      userRes.userInfo.profileImg = DEFAULTIMG;
    }
    dispatch(setUserInfo(userRes.userInfo));
  };

  
  useEffect(() => {
    if (sessionStorage.getItem("userEmail") !== null) {
      try {
        reqUser();
      } catch (err) {
        console.log(err);
      }
    };
    getLocation();
  }, []);



  return <Router />;
}

export default App;
