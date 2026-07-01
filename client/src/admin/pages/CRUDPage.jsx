import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdmin } from '../context/AdminContext';
import { Trash2, Edit, Plus, X, Save, Loader2, UploadCloud, PlusCircle, MinusCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import toast from 'react-hot-toast';

// Helper: safely parse a value that might be a JSON-stringified array
const parseArrayField = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) { }
  }
  return [];
};

const CRUDPage = ({ title, module, fields, readOnly = false }) => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  // For multi-file fields: existing saved URLs (strings) — kept when editing
  const [existingImages, setExistingImages] = useState({}); // { fieldName: [url, ...] }
  // For multi-file fields: newly selected File objects to upload
  const [newFiles, setNewFiles] = useState({}); // { fieldName: [File, ...] }
  // For single-file fields: preview URL
  const [singlePreviews, setSinglePreviews] = useState({}); // { fieldName: objectUrl | savedUrl }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { token } = useAdmin();

  const [expandedPhases, setExpandedPhases] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => {
    if (!searchQuery) return true;
    return fields.some(f => {
      if (f.type === 'file' || f.type === 'phases') return false;
      const val = item[f.name];
      if (val === undefined || val === null) return false;
      if (Array.isArray(val)) {
        return val.some(element => String(element).toLowerCase().includes(searchQuery.toLowerCase()));
      }
      return String(val).toLowerCase().includes(searchQuery.toLowerCase());
    });
  });

  const togglePhaseExpand = (index) => {
    setExpandedPhases(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handlePhaseChange = (index, name, value) => {
    const updatedPhases = [...(formData.phases || [])];
    updatedPhases[index] = { ...updatedPhases[index], [name]: value };
    setFormData(prev => ({ ...prev, phases: updatedPhases }));
  };

  const handlePhaseArrayChange = (phaseIdx, arrayName, itemIdx, value) => {
    const updatedPhases = [...(formData.phases || [])];
    const newArray = [...(updatedPhases[phaseIdx][arrayName] || [])];
    newArray[itemIdx] = value;
    updatedPhases[phaseIdx] = { ...updatedPhases[phaseIdx], [arrayName]: newArray };
    setFormData(prev => ({ ...prev, phases: updatedPhases }));
  };

  const addPhaseArrayItem = (phaseIdx, arrayName) => {
    const updatedPhases = [...(formData.phases || [])];
    const newArray = [...(updatedPhases[phaseIdx][arrayName] || []), ""];
    updatedPhases[phaseIdx] = { ...updatedPhases[phaseIdx], [arrayName]: newArray };
    setFormData(prev => ({ ...prev, phases: updatedPhases }));
  };

  const removePhaseArrayItem = (phaseIdx, arrayName, itemIdx) => {
    const updatedPhases = [...(formData.phases || [])];
    const newArray = (updatedPhases[phaseIdx][arrayName] || []).filter((_, i) => i !== itemIdx);
    updatedPhases[phaseIdx] = { ...updatedPhases[phaseIdx], [arrayName]: newArray };
    setFormData(prev => ({ ...prev, phases: updatedPhases }));
  };

  const addPhase = () => {
    const newPhase = {
      tempId: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: '',
      summary: [''],
      images: [],
      newImages: []
    };
    setFormData(prev => ({
      ...prev,
      phases: [...(prev.phases || []), newPhase]
    }));
    const nextIdx = (formData.phases || []).length;
    setExpandedPhases(prev => ({ ...prev, [nextIdx]: true }));
  };

  const removePhase = (index) => {
    const updatedPhases = (formData.phases || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, phases: updatedPhases }));
  };

  const handlePhaseImagesChange = (phaseIdx, files) => {
    const updatedPhases = [...(formData.phases || [])];
    const incoming = Array.from(files);

    // 1. Validate Mimetypes
    const invalidTypes = incoming.filter(file => !file.type || !file.type.startsWith('image/'));
    if (invalidTypes.length > 0) {
      toast.error(`Only image files are allowed! Rejected: ${invalidTypes.map(f => f.name).join(', ')}`);
    }

    let validIncoming = incoming.filter(file => file.type && file.type.startsWith('image/'));

    // 2. Validate Size (30MB limit)
    const sizeLimit = 30 * 1024 * 1024;
    const oversized = validIncoming.filter(file => file.size > sizeLimit);
    if (oversized.length > 0) {
      toast.error(`Files too large! Max limit is 30MB. Rejected: ${oversized.map(f => f.name).join(', ')}`);
    }

    validIncoming = validIncoming.filter(file => file.size <= sizeLimit);
    if (validIncoming.length === 0) return;

    updatedPhases[phaseIdx] = {
      ...updatedPhases[phaseIdx],
      newImages: [...(updatedPhases[phaseIdx].newImages || []), ...validIncoming]
    };
    setFormData(prev => ({ ...prev, phases: updatedPhases }));
  };

  const removePhaseExistingImage = (phaseIdx, imgIdx) => {
    const updatedPhases = [...(formData.phases || [])];
    const existingImgs = (updatedPhases[phaseIdx].images || []).filter((_, i) => i !== imgIdx);
    updatedPhases[phaseIdx] = { ...updatedPhases[phaseIdx], images: existingImgs };
    setFormData(prev => ({ ...prev, phases: updatedPhases }));
  };

  const removePhaseNewFile = (phaseIdx, imgIdx) => {
    const updatedPhases = [...(formData.phases || [])];
    const newImgs = (updatedPhases[phaseIdx].newImages || []).filter((_, i) => i !== imgIdx);
    updatedPhases[phaseIdx] = { ...updatedPhases[phaseIdx], newImages: newImgs };
    setFormData(prev => ({ ...prev, phases: updatedPhases }));
  };

  const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/${module}`;

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/all`);
      setItems(res.data.data || res.data);
    } catch (err) { console.error("Fetch Error"); } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchData();
    setSearchQuery('');
  }, [module]);

  const resetFileStates = () => {
    setExistingImages({});
    setNewFiles({});
    setSinglePreviews({});
    setExpandedPhases({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const fieldConfig = fields.find(f => f.name === name);
      const sizeLimit = 30 * 1024 * 1024; // 30MB
      
      if (fieldConfig?.multiple) {
        // Append new files to existing new-file list
        const incoming = Array.from(files);

        // 1. Validate Mimetypes
        const invalidTypes = incoming.filter(file => !file.type || !file.type.startsWith('image/'));
        if (invalidTypes.length > 0) {
          toast.error(`Only image files are allowed! Rejected: ${invalidTypes.map(f => f.name).join(', ')}`);
        }

        let validIncoming = incoming.filter(file => file.type && file.type.startsWith('image/'));

        // 2. Validate Size
        const oversized = validIncoming.filter(file => file.size > sizeLimit);
        if (oversized.length > 0) {
          toast.error(`Files too large! Max limit is 30MB. Rejected: ${oversized.map(f => f.name).join(', ')}`);
        }

        validIncoming = validIncoming.filter(file => file.size <= sizeLimit);
        if (validIncoming.length === 0) return;

        setNewFiles(prev => ({
          ...prev,
          [name]: [...(prev[name] || []), ...validIncoming],
        }));
      } else {
        const file = files[0];
        if (!file) return;

        if (!file.type || !file.type.startsWith('image/')) {
          toast.error(`Only image files are allowed! Rejected: ${file.name}`);
          return;
        }

        if (file.size > sizeLimit) {
          toast.error(`File too large! Max limit is 30MB. Rejected: ${file.name}`);
          return;
        }

        setFormData(prev => ({ ...prev, [name]: file }));
        setSinglePreviews(prev => ({ ...prev, [name]: URL.createObjectURL(file) }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleArrayChange = (fieldName, index, value) => {
    const newArray = [...(formData[fieldName] || [])];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [fieldName]: newArray }));
  };

  const addArrayItem = (fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: [...(prev[fieldName] || []), ""] }));
  };

  const removeArrayItem = (fieldName, index) => {
    const newArray = (formData[fieldName] || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [fieldName]: newArray }));
  };

  // Remove an image from the existing saved images list
  const removeExistingImage = (fieldName, index) => {
    setExistingImages(prev => ({
      ...prev,
      [fieldName]: (prev[fieldName] || []).filter((_, i) => i !== index),
    }));
  };

  // Remove a newly added file from the new-files list
  const removeNewFile = (fieldName, index) => {
    setNewFiles(prev => ({
      ...prev,
      [fieldName]: (prev[fieldName] || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();

      Object.keys(formData).forEach(key => {
        const fieldConfig = fields.find(f => f.name === key);
        const value = formData[key];

        if (fieldConfig?.type === 'phases') {
          // Handled separately below
        } else if (fieldConfig?.type === 'file') {
          if (fieldConfig.multiple) {
            // Handled separately below
          } else {
            if (value instanceof File) data.append(key, value);
          }
        } else if (fieldConfig?.type === 'array' || Array.isArray(value)) {
          data.append(key, JSON.stringify(value || []));
        } else {
          data.append(key, value !== undefined ? value : "");
        }
      });

      // Handle phases field
      if (formData.phases) {
        const phasesToSend = formData.phases.map((phase, idx) => {
          const { newImages, ...rest } = phase;
          return {
            ...rest,
            order: idx
          };
        });
        data.append('phases', JSON.stringify(phasesToSend));

        formData.phases.forEach((phase) => {
          if (phase.newImages && phase.newImages.length > 0) {
            phase.newImages.forEach(file => {
              data.append(`phase_images_${phase._id || phase.tempId}`, file);
            });
          }
        });
      }

      // Handle multi-file fields
      fields.filter(f => f.type === 'file' && f.multiple).forEach(f => {
        const existing = existingImages[f.name] || [];
        const newF = newFiles[f.name] || [];
        data.append(`existingImages_${f.name}`, JSON.stringify(existing));
        newF.forEach(file => data.append(f.name, file));
      });

      const config = { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } };
      if (editingId) await axios.put(`${API_URL}/${editingId}`, data, config);
      else await axios.post(`${API_URL}/create`, data, config);

      setIsModalOpen(false);
      setFormData({});
      resetFileStates();
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || 'Save failed. Please try again.');
    } finally { setSubmitting(false); }
  };

  const startEdit = async (item) => {
    setEditingId(item._id);

    let normalized = { ...item };

    if (module === 'projects') {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${item._id}`);
        if (res.data.success) {
          normalized = res.data.data;
        }
      } catch (err) {
        console.error("Error fetching project details for edit:", err);
      }
    }

    fields.forEach(f => {
      if (f.type === 'array') {
        normalized[f.name] = parseArrayField(normalized[f.name]);
      }
    });

    setFormData(normalized);

    // Pre-populate existingImages for multi-file fields
    const existing = {};
    fields.filter(f => f.type === 'file' && f.multiple).forEach(f => {
      const val = normalized[f.name];
      existing[f.name] = Array.isArray(val) ? val : [];
    });
    setExistingImages(existing);

    // Pre-populate singlePreviews for single-file fields
    const singles = {};
    fields.filter(f => f.type === 'file' && !f.multiple).forEach(f => {
      if (normalized[f.name]) singles[f.name] = normalized[f.name];
    });
    setSinglePreviews(singles);

    setNewFiles({});
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: token } });
        fetchData();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{title}</h1>
        </div>
        {!readOnly && (
          <button onClick={() => { setEditingId(null); setFormData({}); resetFileStates(); setIsModalOpen(true); }}
            className="bg-[#426369] text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
            <Plus size={16} /> New {title.slice(0, -1)}
          </button>
        )}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#426369]/10 focus:border-[#426369]/30 transition-all placeholder:text-slate-400"
              />
            </div>
            {searchQuery && (
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Found {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
              </span>
            )}
          </div>

        {loading ? (<div className="py-20 flex justify-center"><Loader2 className="animate-spin text-slate-300" size={40} /></div>) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  {fields.filter(f => f.type !== 'phases').map(f => (
                    <th key={f.name} className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">{f.label}</th>
                  ))}
                  <th className="p-6 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={fields.filter(f => f.type !== 'phases').length + 1} className="p-12 text-center text-sm font-semibold text-slate-400">
                      {searchQuery ? 'No results found matching your search query.' : 'No records available.'}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors group">
                      {fields.filter(f => f.type !== 'phases').map(f => (
                        <td key={f.name} className="p-6 text-sm font-semibold text-slate-600">
                          {f.type === 'file' ? (
                            <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                              <img
                                src={Array.isArray(item[f.name]) ? item[f.name][0] : item[f.name]}
                                className="w-full h-full object-cover"
                                alt={f.label}
                                onError={(e) => e.target.src = 'https://placehold.co/100x100?text=NA'}
                              />
                            </div>
                          ) : f.type === 'array' ? (
                            <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-md">
                              {Array.isArray(item[f.name]) ? `${item[f.name].length} items` : '0 items'}
                            </span>
                          ) : (
                            <span className="truncate max-w-[150px] block">
                              {typeof item[f.name] === 'boolean' ? (item[f.name] ? 'Yes' : 'No') : String(item[f.name] || '—')}
                            </span>
                          )}
                        </td>
                      ))}
                      <td className="p-6 text-right flex justify-end gap-2">
                        {!readOnly && <button onClick={() => startEdit(item)} className="p-2 text-slate-400 hover:text-[#426369] transition-colors cursor-pointer"><Edit size={18} /></button>}
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{editingId ? 'Edit' : 'Create'} {title.slice(0, -1)}</h3>
              <button onClick={() => { setIsModalOpen(false); resetFileStates(); }} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {fields.map(f => (
                <div key={f.name} className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                    {f.label} {f.required && <span className="text-red-400">*</span>}
                  </label>

                  {f.type === 'file' ? (
                    <div className="space-y-4">
                      {/* Drop zone */}
                      <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50 hover:bg-slate-100/50 transition-all text-center">
                        <input
                          type="file"
                          name={f.name}
                          multiple={f.multiple}
                          onChange={handleChange}
                          accept="image/*"
                          required={editingId ? false : f.required}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <UploadCloud className="mx-auto text-slate-300 mb-2" size={32} />
                        <p className="text-[10px] font-black uppercase text-slate-400">
                          {f.multiple ? 'Click to add images' : `Click to upload ${f.label}`}
                        </p>
                      </div>

                      {f.multiple ? (
                        /* Multi-image preview with per-image delete */
                        (() => {
                          const existing = existingImages[f.name] || [];
                          const newF = newFiles[f.name] || [];
                          if (existing.length === 0 && newF.length === 0) return null;
                          return (
                            <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                              {/* Existing saved images */}
                              {existing.map((url, i) => (
                                <div key={`ex-${i}`} className="relative group/img">
                                  <img src={url} className="w-16 h-16 object-cover rounded-xl border border-white shadow-sm" alt="" />
                                  <button
                                    type="button"
                                    onClick={() => removeExistingImage(f.name, i)}
                                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity shadow-md hover:bg-red-600 cursor-pointer"
                                  >
                                    <X size={10} />
                                  </button>
                                </div>
                              ))}
                              {/* Newly added file previews */}
                              {newF.map((file, i) => (
                                <div key={`new-${i}`} className="relative group/img">
                                  <img src={URL.createObjectURL(file)} className="w-16 h-16 object-cover rounded-xl border-2 border-[#426369]/40 shadow-sm" alt="" />
                                  <button
                                    type="button"
                                    onClick={() => removeNewFile(f.name, i)}
                                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity shadow-md hover:bg-red-600 cursor-pointer"
                                  >
                                    <X size={10} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          );
                        })()
                      ) : (
                        /* Single image preview */
                        singlePreviews[f.name] && (
                          <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <img src={singlePreviews[f.name]} className="w-20 h-20 object-cover rounded-xl shadow-md border-2 border-white" alt="" />
                          </div>
                        )
                      )}
                    </div>
                  ) : f.type === 'phases' ? (
                    <div className="space-y-4">
                      <div className="space-y-4">
                        {(formData.phases || []).map((phase, phaseIdx) => {
                          const isExpanded = expandedPhases[phaseIdx];
                          return (
                            <div key={phase._id || phase.tempId} className="border border-slate-200 rounded-3xl bg-slate-50/50 overflow-hidden transition-all">
                              {/* Phase Accordion Header */}
                              <div
                                className="flex justify-between items-center p-4 bg-slate-50 cursor-pointer select-none"
                                onClick={() => togglePhaseExpand(phaseIdx)}
                              >
                                <span className="text-xs font-black text-slate-700 tracking-wider">
                                  Phase {phaseIdx + 1}: {phase.title || 'Untitled Phase'}
                                </span>
                                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                  <button
                                    type="button"
                                    onClick={() => togglePhaseExpand(phaseIdx)}
                                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                                  >
                                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removePhase(phaseIdx)}
                                    className="text-red-500 hover:text-red-600 transition-colors p-1"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>

                              {/* Phase Accordion Content */}
                              {isExpanded && (
                                <div className="p-6 border-t border-slate-200 space-y-4 bg-white">
                                  {/* Title */}
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phase Title *</label>
                                    <input
                                      type="text"
                                      value={phase.title || ''}
                                      onChange={(e) => handlePhaseChange(phaseIdx, 'title', e.target.value)}
                                      placeholder="e.g. Design & Prototyping"
                                      required
                                      className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#426369]/10"
                                    />
                                  </div>

                                  {/* Key Points (Summary) */}
                                  <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Key Points / Execution Summary</label>
                                    <div className="space-y-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                                      {(phase.summary || []).map((point, idx) => (
                                        <div key={idx} className="flex gap-2">
                                          <input
                                            type="text"
                                            value={point || ''}
                                            onChange={(e) => handlePhaseArrayChange(phaseIdx, 'summary', idx, e.target.value)}
                                            placeholder="Enter execution step..."
                                            className="flex-1 bg-white border border-slate-100 rounded-xl p-2.5 text-xs font-semibold outline-none"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => removePhaseArrayItem(phaseIdx, 'summary', idx)}
                                            className="text-red-400 hover:text-red-500 transition-colors"
                                          >
                                            <MinusCircle size={20} />
                                          </button>
                                        </div>
                                      ))}
                                      <button
                                        type="button"
                                        onClick={() => addPhaseArrayItem(phaseIdx, 'summary')}
                                        className="flex items-center gap-1.5 text-[9px] font-black uppercase text-[#426369] hover:opacity-80 transition-opacity"
                                      >
                                        <PlusCircle size={16} /> Add Key Point
                                      </button>
                                    </div>
                                  </div>

                                  {/* Images */}
                                  <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phase Images</label>
                                    <div className="relative border border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 text-center hover:bg-slate-100/50 transition-colors">
                                      <input
                                        type="file"
                                        multiple
                                        onChange={(e) => handlePhaseImagesChange(phaseIdx, e.target.files)}
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                      />
                                      <UploadCloud className="mx-auto text-slate-300 mb-1" size={24} />
                                      <p className="text-[9px] font-black uppercase text-slate-400">Click to upload phase visuals</p>
                                    </div>

                                    {/* Image Previews */}
                                    {((phase.images || []).length > 0 || (phase.newImages || []).length > 0) && (
                                      <div className="flex flex-wrap gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                                        {/* Existing Images */}
                                        {(phase.images || []).map((url, imgIdx) => (
                                          <div key={`ex-${imgIdx}`} className="relative group/img">
                                            <img src={url} className="w-12 h-12 object-cover rounded-lg border border-white shadow-sm" alt="" />
                                            <button
                                              type="button"
                                              onClick={() => removePhaseExistingImage(phaseIdx, imgIdx)}
                                              className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity shadow-md hover:bg-red-600 cursor-pointer"
                                            >
                                              <X size={8} />
                                            </button>
                                          </div>
                                        ))}
                                        {/* New Image Previews */}
                                        {(phase.newImages || []).map((file, imgIdx) => (
                                          <div key={`new-${imgIdx}`} className="relative group/img">
                                            <img src={URL.createObjectURL(file)} className="w-12 h-12 object-cover rounded-lg border border-[#426369]/40 shadow-sm" alt="" />
                                            <button
                                              type="button"
                                              onClick={() => removePhaseNewFile(phaseIdx, imgIdx)}
                                              className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity shadow-md hover:bg-red-600 cursor-pointer"
                                            >
                                              <X size={8} />
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={addPhase}
                        className="flex items-center gap-2 text-xs font-black uppercase text-[#426369] bg-[#426369]/5 hover:bg-[#426369]/10 px-4 py-2.5 rounded-xl border border-[#426369]/10 transition-colors cursor-pointer"
                      >
                        <PlusCircle size={18} /> Add New Phase
                      </button>
                    </div>
                  ) : f.type === 'array' ? (
                    <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      {(formData[f.name] || []).map((item, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleArrayChange(f.name, idx, e.target.value)}
                            placeholder={`Enter ${f.label} point...`}
                            className="flex-1 bg-white border border-slate-100 rounded-xl p-3 text-sm font-bold outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem(f.name, idx)}
                            className="text-red-400 hover:text-red-500 transition-colors"
                          >
                            <MinusCircle size={24} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayItem(f.name)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase text-[#426369] hover:opacity-80 transition-opacity"
                      >
                        <PlusCircle size={18} /> Add {f.label} Item
                      </button>
                    </div>
                  ) : f.type === 'select' ? (
                    <select name={f.name} value={formData[f.name] || ''} onChange={handleChange} required={f.required} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#426369]/10">
                      <option value="">Select Option</option>
                      {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : f.type === 'checkbox' ? (
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <input
                        type="checkbox" name={f.name} checked={formData[f.name] || false} onChange={handleChange}
                        className="w-5 h-5 accent-[#426369] cursor-pointer"
                      />
                      <span className="text-sm font-bold text-slate-600">Mark as {f.label}</span>
                    </div>
                  ) : f.type === 'textarea' ? (
                    <textarea name={f.name} value={formData[f.name] || ''} onChange={handleChange} required={f.required} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#426369]/10 min-h-[100px]" />
                  ) : (
                    <input
                      type={f.type || 'text'}
                      name={f.name}
                      value={formData[f.name] || ''}
                      onChange={handleChange}
                      required={f.required}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#426369]/10"
                    />
                  )}
                </div>
              ))}

              <button type="submit" disabled={submitting} className="w-full bg-[#426369] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-[#426369]/20 flex items-center justify-center gap-3 hover:-translate-y-1 transition-all disabled:opacity-50 cursor-pointer">
                {submitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                {editingId ? 'Update Record' : 'Create Record'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRUDPage;