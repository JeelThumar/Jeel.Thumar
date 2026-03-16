import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AdminModal = ({ isOpen, onClose, title, fields, initialData, onSubmit, saving }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            // Initialize empty fields
            const emptyData = {};
            fields.forEach(field => {
                if (field.type === 'array') emptyData[field.name] = [];
                else if (field.type === 'boolean') emptyData[field.name] = false;
                else emptyData[field.name] = '';
            });
            setFormData(emptyData);
        }
    }, [initialData, fields, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e, name, type) => {
        let value = e.target.value;
        if (type === 'number') value = Number(value);
        if (type === 'boolean') value = e.target.checked;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (e, name) => {
        // Simple comma separated parser for arrays
        const value = e.target.value;
        const arrayValue = value.split(',').map(item => item.trim()).filter(Boolean);
        setFormData(prev => ({ ...prev, [name]: arrayValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                <div className="flex justify-between items-center p-6 border-b border-black/10">
                    <h2 className="text-2xl font-bold font-syne">{title}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <form id="admin-form" onSubmit={handleSubmit} className="space-y-6">
                        {fields.map(field => (
                            <div key={field.name} className="space-y-2">
                                <label className="block text-sm font-bold uppercase tracking-widest text-black/60">
                                    {field.label}
                                </label>
                                
                                {field.type === 'textarea' ? (
                                    <textarea
                                        required={field.required}
                                        value={formData[field.name] || ''}
                                        onChange={(e) => handleChange(e, field.name, field.type)}
                                        className="w-full p-3 border border-black/20 rounded-lg focus:border-black outline-none min-h-[100px]"
                                        placeholder={field.placeholder}
                                    />
                                ) : field.type === 'array' ? (
                                    <input
                                        required={field.required}
                                        type="text"
                                        value={(formData[field.name] || []).join(', ')}
                                        onChange={(e) => handleArrayChange(e, field.name)}
                                        className="w-full p-3 border border-black/20 rounded-lg focus:border-black outline-none"
                                        placeholder="Comma separated values (e.g. React, Node, CSS)"
                                    />
                                ) : field.type === 'json' ? (
                                    <textarea
                                        required={field.required}
                                        value={typeof formData[field.name] === 'object' ? JSON.stringify(formData[field.name], null, 2) : formData[field.name] || ''}
                                        onChange={(e) => {
                                            try {
                                                const parsed = JSON.parse(e.target.value);
                                                setFormData(prev => ({ ...prev, [field.name]: parsed }));
                                            } catch(err) {
                                                setFormData(prev => ({ ...prev, [field.name]: e.target.value }));
                                            }
                                        }}
                                        className="w-full p-3 border border-black/20 rounded-lg focus:border-black outline-none min-h-[150px] font-mono text-sm"
                                        placeholder="Valid JSON array or object"
                                    />
                                ) : (
                                    <input
                                        required={field.required}
                                        type={field.type || 'text'}
                                        checked={field.type === 'boolean' ? formData[field.name] : undefined}
                                        value={field.type !== 'boolean' ? formData[field.name] || '' : undefined}
                                        onChange={(e) => handleChange(e, field.name, field.type)}
                                        className="w-full p-3 border border-black/20 rounded-lg focus:border-black outline-none"
                                        placeholder={field.placeholder}
                                    />
                                )}
                            </div>
                        ))}
                    </form>
                </div>

                <div className="flex justify-end gap-4 p-6 border-t border-black/10 bg-gray-50">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="px-6 py-3 font-bold text-black/60 hover:text-black transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        form="admin-form"
                        disabled={saving}
                        className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminModal;
