import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext();

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [
        projectsRes,
        statsRes,
        testimonialsRes,
        clientsRes,
      ] = await Promise.all([
        axios.get(`${API_BASE_URL}/projects/all`),
        axios.get(`${API_BASE_URL}/stats/all`),
        axios.get(`${API_BASE_URL}/testimonials/all`),
        axios.get(`${API_BASE_URL}/clients/all`),
      ]);

      setProjects(projectsRes.data.data);
      setStats(statsRes.data.data);
      setTestimonials(testimonialsRes.data.data);
      setClients(clientsRes.data.data);

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const [showScheduler, setShowScheduler] = useState(false);
  

  return (
    <DataContext.Provider
      value={{
        projects,
        stats,
        testimonials,
        clients,
        loading,
        error,
        refetch: fetchAllData,
        showScheduler,
        setShowScheduler
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
