import axios from "axios";

const handleError = (error) => {
  console.error(error);
  return null;
};

const checkResponseStatus = (res, expectedStatus) => {
  if (!expectedStatus.includes(res.status)) {
    console.log("Unexpected Error Occurred");
    return false;
  }
  return true;
};

export const getAllMovies = async () => {
  const res = await axios.get("/movie").catch(handleError);
  if (!checkResponseStatus(res, [200])) return null;
  return res.data;
};

export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch(handleError);
    
  if (!checkResponseStatus(res, [200, 201])) return null;
  return res.data;
};

export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch(handleError);

  if (!checkResponseStatus(res, [200])) return null;
  return res.data;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`/movie/${id}`).catch(handleError);
  if (!checkResponseStatus(res, [200])) return null;
  return res.data;
};

export const newBooking = async (data) => {
  const res = await axios
    .post("/booking", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch(handleError);

  if (!checkResponseStatus(res, [201])) return null;
  return res.data;
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/bookings/${id}`).catch(handleError);
  if (!checkResponseStatus(res, [200])) return null;
  return res.data;
};

export const deleteBooking = async (id) => {
  const res = await axios.delete(`/booking/${id}`).catch(handleError);
  if (!checkResponseStatus(res, [200])) return null;
  return res.data;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch(handleError);
  if (!checkResponseStatus(res, [200])) return null;
  return res.data;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        fetaured: data.fetaured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch(handleError);

  if (!checkResponseStatus(res, [201])) return null;
  return res.data;
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios.get(`/admin/${adminId}`).catch(handleError);
  if (!checkResponseStatus(res, [200])) return null;
  return res.data;
};
