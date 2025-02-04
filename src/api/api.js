import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchTransactions = async (month, search, page) => {
  const response = await axios.get(`${API_BASE_URL}/transactions`, {
    params: { month, search, page }
  });
  return response.data;
};

export const fetchStatistics = async (month) => {
  const response = await axios.get(`${API_BASE_URL}/statistics`, { params: { month } });
  return response.data;
};

export const fetchBarChart = async (month) => {
  const response = await axios.get(`${API_BASE_URL}/barchart`, { params: { month } });
  return response.data;
};

export const fetchPieChart = async (month) => {
  const response = await axios.get(`${API_BASE_URL}/piechart`, { params: { month } });
  return response.data;
};
