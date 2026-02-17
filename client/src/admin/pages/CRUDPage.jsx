import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdmin } from '../context/AdminContext'; // Ensure this path is correct
import { Trash2, Edit, Plus, X, Save, Loader2, AlertCircle } from 'lucide-react';

const CRUDPage = ({ title, module, fields, readOnly = false }) => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAdmin();

  // Construct Base URL based on your backend route structure
  // Note: For contacts, you mentioned /api/all-contacts, for others /api/module
  const API_URL = module 
    ? `${import.meta.env.VITE_BACKEND_URL}/api/${module}`
    : `${import.meta.env.VITE_BACKEND_URL}/api`;

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/all`);
      setItems(res.data.data || res.data); // Handle both {data: []} and direct []
      setError(null);
    } catch (err) {
      setError("Failed to fetch data from server.");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [module]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle array input for 'tech' (comma separated)
    if (name === 'tech') {
      setFormData({ ...formData, [name]: value.split(',').map(t => t.trim()) });
    } else {
      setFormData({ 
        ...formData, 
        [name]: type === 'checkbox' ? checked : value 
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: token } };
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, config);
      } else {
        await axios.post(`${API_URL}/create`, formData, config);
      }
      setIsModalOpen(false);
      setFormData({});
      setEditingId(null);
      fetchData();
    } catch (err) {
      alert("Error saving data. Check console for details.");
      console.error("Submit Error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: token } });
        fetchData();
      } catch (err) {
        console.error("Delete Error:", err);
      }
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setFormData(item);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{title}</h1>
          <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mt-1">Management Console</p>
        </div>
        
        {!readOnly && (
          <button 
            onClick={() => { setEditingId(null); setFormData({}); setIsModalOpen(true); }}
            className="bg-[#426369] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#355055] transition-all shadow-lg shadow-[#426369]/20 cursor-pointer"
          >
            <Plus size={16} /> Add New {title.slice(0, -1)}
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center text-slate-300 gap-4">
            <Loader2 className="animate-spin" size={40} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Synchronizing Data...</span>
          </div>
        ) : error ? (
          <div className="py-40 flex flex-col items-center justify-center text-red-400 gap-4">
            <AlertCircle size={40} />
            <span className="text-sm font-bold">{error}</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  {fields.slice(0, 3).map(f => (
                    <th key={f.name} className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{f.label}</th>
                  ))}
                  <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {items.length > 0 ? items.map((item) => (
                  <tr key={item._id} className="group hover:bg-slate-50/50 transition-colors">
                    {fields.slice(0, 3).map(f => (
                      <td key={f.name} className="p-6 text-sm font-medium text-slate-600">
                        {typeof item[f.name] === 'boolean' ? (item[f.name] ? 'Yes' : 'No') : (item[f.name] || '—')}
                      </td>
                    ))}
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        {!readOnly && (
                          <button onClick={() => startEdit(item)} className="p-2 text-slate-400 hover:text-[#426369] hover:bg-[#426369]/5 rounded-lg transition-all cursor-pointer">
                            <Edit size={18} />
                          </button>
                        )}
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={fields.length} className="p-20 text-center text-slate-400 italic text-sm">
                      No entries found in this module.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Dynamic Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  {editingId ? 'Edit' : 'Create'} {title.slice(0, -1)}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Fill in the details below</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {fields.map(f => (
                <div key={f.name} className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] ml-1">
                    {f.label}
                  </label>

                  {f.type === 'select' ? (
                    <select 
                      name={f.name} value={formData[f.name] || ''} onChange={handleChange} required
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-[#426369]/10 focus:border-[#426369] outline-none appearance-none"
                    >
                      <option value="">Choose an option...</option>
                      {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : f.type === 'textarea' ? (
                    <textarea 
                      name={f.name} value={formData[f.name] || ''} onChange={handleChange} required
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-[#426369]/10 focus:border-[#426369] outline-none min-h-[120px] resize-none"
                    />
                  ) : f.type === 'checkbox' ? (
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <input 
                        type="checkbox" name={f.name} checked={formData[f.name] || false} onChange={handleChange}
                        className="w-5 h-5 accent-[#426369] cursor-pointer"
                      />
                      <span className="text-sm font-bold text-slate-600">Mark as {f.label}</span>
                    </div>
                  ) : (
                    <input 
                      type={f.type || 'text'} name={f.name} value={formData[f.name] || ''} onChange={handleChange} required
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-[#426369]/10 focus:border-[#426369] outline-none"
                    />
                  )}
                </div>
              ))}

              <button type="submit" className="w-full bg-[#426369] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-[#426369]/20 hover:bg-[#355055] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mt-4 cursor-pointer">
                <Save size={20} /> {editingId ? 'Update' : 'ADD'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRUDPage;