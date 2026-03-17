import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home, Briefcase, PenTool, Activity, Trash2, Plus, Edit2 } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, collection, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import AdminModal from '../components/admin/AdminModal';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('general');
    const [loading, setLoading] = useState(true);

    // Authentication Check
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
        if (!isAuthenticated) {
            navigate('/admin/login');
        } else {
            setLoading(false);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        navigate('/admin/login');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center font-syne text-xl">Loading...</div>;

    const tabs = [
        { id: 'general', label: 'Basic Info & Hero', icon: Home },
        { id: 'experience', label: 'Experience Timeline', icon: Activity },
        { id: 'education', label: 'Education', icon: Activity },
        { id: 'certifications', label: 'Certifications', icon: Activity },
        { id: 'projects', label: 'Selected Projects', icon: Briefcase },
        { id: 'blog', label: 'Blog Articles', icon: PenTool },
        { id: 'more-work', label: 'More Work', icon: Activity },
        { id: 'socials', label: 'Social Profiles', icon: Activity },
        { id: 'interests', label: 'Interests & Hobbies', icon: Activity },
    ];

    return (
        <div className="min-h-screen font-sans bg-gray-50 flex flex-col md:flex-row text-black selection:bg-purple-200 cursor-auto">
            
            {/* Sidebar */}
            <aside className="w-full md:w-72 bg-white border-r border-black/5 flex flex-col shrink-0 min-h-screen hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
                <div className="p-6 border-b border-black/10">
                    <h2 className="text-2xl font-syne font-bold uppercase tracking-tight">Portfolio<br/><span className="text-transparent stroke-black [-webkit-text-stroke:1px_black]">Admin</span></h2>
                </div>
                
                <nav className="flex-1 p-4 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-syne font-bold text-sm tracking-wide ${
                                activeTab === tab.id 
                                    ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20 translate-x-1' 
                                    : 'text-black/60 hover:bg-black/5 hover:text-black hover:translate-x-1'
                            }`}
                        >
                            <tab.icon size={20} />
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-black/10">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-600 hover:bg-red-50 font-medium"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto relative bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-5xl mx-auto">
                    <header className="mb-10 flex justify-between items-center md:hidden">
                        <h1 className="text-2xl font-syne font-bold">Admin Panel</h1>
                        <button onClick={handleLogout} className="p-2 bg-red-50 text-red-600 rounded-full"><LogOut size={20}/></button>
                    </header>
                    
                    <h1 className="text-4xl lg:text-5xl font-syne font-bold mb-10 tracking-tight text-gray-900">
                        {tabs.find(t => t.id === activeTab)?.label}
                    </h1>

                    {/* Render active content conditionally based on tab here */}
                    {activeTab === 'general' && <GeneralEditor />}
                    
                    {activeTab === 'experience' && <SiteDataArrayEditor fieldKey="experiences" title="Experience" 
                        fields={[
                            { name: 'year', label: 'Year (e.g. 2021 - Present)', required: true },
                            { name: 'role', label: 'Role', required: true },
                            { name: 'company', label: 'Company Name' },
                            { name: 'location', label: 'Location' },
                            { name: 'description', label: 'Description', type: 'textarea' }
                        ]}
                    />}
                    {activeTab === 'education' && <SiteDataArrayEditor fieldKey="education" title="Education" 
                        fields={[
                            { name: 'year', label: 'Year', required: true },
                            { name: 'school', label: 'Institution/School', required: true },
                            { name: 'degree', label: 'Degree/Course' },
                            { name: 'grade', label: 'Grade/GPA' }
                        ]}
                    />}
                    {activeTab === 'certifications' && <SiteDataArrayEditor fieldKey="certifications" title="Certifications" 
                        fields={[
                            { name: 'title', label: 'Certification Title', required: true },
                            { name: 'issuer', label: 'Issuer' },
                            { name: 'year', label: 'Year' },
                            { name: 'link', label: 'Credential URL' }
                        ]}
                    />}
                    {activeTab === 'socials' && <SiteDataArrayEditor fieldKey="socials" title="Social Links" 
                        fields={[
                            { name: 'platform', label: 'Platform Name', required: true },
                            { name: 'url', label: 'Profile URL', required: true },
                            { name: 'icon', label: 'Icon String (e.g. Linkedin, Instagram, Figma)' }
                        ]}
                    />}
                    {activeTab === 'interests' && <SiteDataArrayEditor fieldKey="interests" title="Interests & Hobbies" 
                        fields={[
                            { name: 'label', label: 'Interest Name (e.g. Driving)', required: true },
                            { name: 'color', label: 'Tailwind Color (e.g. bg-yellow-200)', required: true },
                            { name: 'rotate', label: 'Rotation Class (e.g. rotate-1)' },
                            { name: 'icon', label: 'Icon Name (e.g. Car, Trophy)' }
                        ]}
                    />}

                    {activeTab === 'projects' && <CollectionEditor collectionName="projects" title="Projects (Selected Work)" 
                        fields={[
                            { name: 'id', label: 'Unique ID (e.g. foodboss)', required: true },
                            { name: 'title', label: 'Project Title', required: true },
                            { name: 'category', label: 'Category' },
                            { name: 'year', label: 'Year' },
                            { name: 'link', label: 'External Link' },
                            { name: 'description', label: 'Description', type: 'textarea' },
                            { name: 'tech', label: 'Tech Stack (comma separated)', type: 'array' },
                            { name: 'images', label: 'Images (JSON URL Array)', type: 'json' }
                        ]}
                    />}
                    {activeTab === 'blog' && <CollectionEditor collectionName="blogPosts" title="Blog Posts" 
                        fields={[
                            { name: 'id', label: 'Unique ID (e.g. 1, 2, my-post)', required: true },
                            { name: 'title', label: 'Blog Title', required: true },
                            { name: 'date', label: 'Publication Date' },
                            { name: 'image', label: 'Cover Image URL' },
                            { name: 'content', label: 'Content Paragraphs (JSON Array)', type: 'json' }
                        ]}
                    />}
                    {activeTab === 'more-work' && <CollectionEditor collectionName="moreWork" title="More Work" 
                        fields={[
                            { name: 'id', label: 'Unique ID', required: true },
                            { name: 'title', label: 'Title', required: true },
                            { name: 'category', label: 'Category' },
                            { name: 'image', label: 'Image URL' }
                        ]}
                    />}
                </div>
            </main>
        </div>
    );
};

// --- Sub Editors ---

const SiteDataArrayEditor = ({ fieldKey, title, fields }) => {
    const [data, setData] = useState({ [fieldKey]: [] });
    const [loading, setLoading] = useState(true);
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [saving, setSaving] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const docRef = doc(db, "siteData", "general");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data());
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [fieldKey]);

    const items = data[fieldKey] || [];

    const handleDelete = async (index) => {
        if(window.confirm("Are you sure you want to delete this item?")) {
            const loadingToast = toast.loading("Deleting item...");
            try {
                const newArray = [...items];
                newArray.splice(index, 1);
                
                await updateDoc(doc(db, "siteData", "general"), {
                    [fieldKey]: newArray
                });
                
                toast.success("Item deleted successfully!", { id: loadingToast });
                fetchData();
            } catch (error) {
                console.error("Error deleting doc:", error);
                toast.error("Failed to delete item.", { id: loadingToast });
            }
        }
    };

    const handleOpenModal = (index = null) => {
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    const handleSaveItem = async (formData) => {
        setSaving(true);
        const loadingToast = toast.loading("Saving item...");
        try {
            const newArray = [...items];
            if (editingIndex !== null) {
                newArray[editingIndex] = formData;
            } else {
                newArray.push(formData);
            }

            await updateDoc(doc(db, "siteData", "general"), {
                [fieldKey]: newArray
            });
            
            toast.success("Item saved successfully!", { id: loadingToast });
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Error saving doc:", error);
            toast.error("Failed to save item.", { id: loadingToast });
        }
        setSaving(false);
    };

    if (loading) return <div>Loading {title}...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-black/5">
                <h3 className="text-xl font-bold font-syne">{title}</h3>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-purple-600 transition-colors shadow-lg shadow-black/10 hover:shadow-purple-500/20"
                >
                    <Plus size={16} /> Add New
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
                {items.length === 0 ? (
                    <div className="p-12 text-center text-black/40 font-syne text-lg">No items found here yet.</div>
                ) : (
                    <div className="divide-y divide-black/5">
                        {items.map((item, index) => (
                            <div key={index} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">{item.title || item.role || item.school || item.platform || item.label}</h4>
                                    <p className="text-sm text-black/50 truncate max-w-md mt-1">{item.company || item.degree || item.issuer || item.url || item.description}</p>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleOpenModal(index)} className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"><Edit2 size={16}/></button>
                                    <button onClick={() => handleDelete(index)} className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"><Trash2 size={16}/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <AdminModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingIndex !== null ? `Edit ${title}` : `Add New ${title}`}
                fields={fields}
                initialData={editingIndex !== null ? items[editingIndex] : null}
                onSubmit={handleSaveItem}
                saving={saving}
            />
        </div>
    );
};

// --- General Stats/Skills Editor ---
const GeneralEditor = () => {
    const [data, setData] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchGeneralData = async () => {
            const docRef = doc(db, "siteData", "general");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setData(docSnap.data());
            }
        };
        fetchGeneralData();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const docRef = doc(db, "siteData", "general");
            await updateDoc(docRef, data);
            toast.success("General data updated successfully!");
        } catch (error) {
            console.error("Error updating document: ", error);
            toast.error("Failed to update general data.");
        }
        setSaving(false);
    };

    if (!data) return <div>Loading general data...</div>;

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
                <h3 className="text-2xl font-bold font-syne mb-2 text-gray-900">Hero Section Bio</h3>
                <p className="text-sm text-black/50 mb-6">This is the main introduction paragraph on your landing page. HTML tags like &lt;strong&gt; are supported.</p>
                <textarea 
                    className="w-full h-32 p-4 border border-black/10 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none leading-relaxed transition-all"
                    value={data.heroBio || ''}
                    placeholder="I'm Jeel Thumar — a UI/UX designer..."
                    onChange={(e) => setData({...data, heroBio: e.target.value})}
                />
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
                <h3 className="text-2xl font-bold font-syne mb-2 text-gray-900">Stats Configuration</h3>
                <p className="text-sm text-black/50 mb-6">Update the numerical statistics shown below the Hero section.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(data.stats || []).map((stat, index) => (
                        <div key={index} className="space-y-3 p-5 bg-gray-50/50 rounded-xl border border-black/5 transition-colors hover:border-black/10">
                            <label className="text-xs font-bold text-black/40 uppercase tracking-widest">{stat.label}</label>
                            <div className="flex gap-3">
                                <input 
                                    className="flex-1 p-3 border border-black/10 rounded-lg focus:border-purple-500 outline-none transition-colors"
                                    value={stat.value}
                                    placeholder="Value"
                                    onChange={(e) => {
                                        const newStats = [...data.stats];
                                        newStats[index].value = e.target.value;
                                        setData({...data, stats: newStats});
                                    }}
                                />
                                <input 
                                    className="w-20 p-3 border border-black/10 rounded-lg focus:border-purple-500 outline-none transition-colors text-center font-mono"
                                    value={stat.suffix}
                                    placeholder="Suffix"
                                    onChange={(e) => {
                                        const newStats = [...data.stats];
                                        newStats[index].suffix = e.target.value;
                                        setData({...data, stats: newStats});
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
                    <h3 className="text-2xl font-bold font-syne mb-2 text-gray-900">Skills</h3>
                    <p className="text-sm text-black/50 mb-6">Comma separated list of short skills.</p>
                    <textarea 
                        className="w-full h-40 p-4 border border-black/10 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all leading-relaxed"
                        value={(data.skills || []).join(', ')}
                        placeholder="UI/UX Design, Figma, Photoshore..."
                        onChange={(e) => {
                            const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setData({...data, skills: arr});
                        }}
                    />
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
                    <h3 className="text-2xl font-bold font-syne mb-2 text-gray-900">Marquee Banner</h3>
                    <p className="text-sm text-black/50 mb-6">Scrolling text items, separated by commas.</p>
                    <textarea 
                        className="w-full h-40 p-4 border border-black/10 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all leading-relaxed uppercase"
                        value={(data.marqueeItems || []).join(', ')}
                        placeholder="UI DESIGN, UX DESIGN, PROTOTYPING..."
                        onChange={(e) => {
                            const arr = e.target.value.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
                            setData({...data, marqueeItems: arr});
                        }}
                    />
                </div>
            </div>

            <button 
                onClick={handleSave}
                disabled={saving}
                className="w-full py-4 bg-black text-white font-syne text-lg font-bold rounded-xl hover:bg-purple-600 transition-colors shadow-lg shadow-black/10 hover:shadow-purple-500/30 active:scale-[0.98]"
            >
                {saving ? 'Saving Changes...' : 'Save All General Settings'}
            </button>
        </div>
    );
};

const CollectionEditor = ({ collectionName, title, fields }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [saving, setSaving] = useState(false);

    const fetchItems = async () => {
        setLoading(true);
        const snapshot = await getDocs(collection(db, collectionName));
        const fetchedItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(fetchedItems);
        setLoading(false);
    };

    useEffect(() => {
        fetchItems();
    }, [collectionName]);

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this item?")) {
            const loadingToast = toast.loading("Deleting item...");
            try {
                await deleteDoc(doc(db, collectionName, id));
                toast.success("Item deleted successfully!", { id: loadingToast });
                fetchItems();
            } catch (error) {
                console.error("Error deleting doc:", error);
                toast.error("Failed to delete item.", { id: loadingToast });
            }
        }
    };

    const handleOpenModal = (item = null) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleSaveItem = async (formData) => {
        setSaving(true);
        const loadingToast = toast.loading("Saving item...");
        try {
            // Document ID is either from the existing item, or the ID field the user entered
            const docId = editingItem ? editingItem.id : (formData.id || Date.now().toString());
            
            // Remove 'id' from formData payload if it exists, since Firestore uses doc ID
            const payload = { ...formData };
            if (!editingItem) {
                payload.id = docId; // Ensure id is saved in the doc if creation
            }

            await setDoc(doc(db, collectionName, String(docId)), payload);
            toast.success("Item saved successfully!", { id: loadingToast });
            setIsModalOpen(false);
            fetchItems();
        } catch (error) {
            console.error("Error saving doc:", error);
            toast.error("Failed to save item.", { id: loadingToast });
        }
        setSaving(false);
    };

    if (loading) return <div>Loading {title}...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
                <h3 className="text-xl font-bold font-syne">{title}</h3>
                <button 
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-purple-600 transition-colors shadow-lg shadow-black/10 hover:shadow-purple-500/20"
                >
                    <Plus size={16} /> Add New Document
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
                {items.length === 0 ? (
                    <div className="p-12 text-center text-black/40 font-syne text-lg">No collection items found.</div>
                ) : (
                    <div className="divide-y divide-black/5">
                        {items.map(item => (
                            <div key={item.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg text-gray-900">{item.title || item.id}</h4>
                                    <div className="text-xs font-mono text-purple-600 mt-1 mb-1">ID: {item.id}</div>
                                    <p className="text-sm text-black/50 truncate max-w-md">{item.description || item.category || 'No description available'}</p>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleOpenModal(item)} className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"><Edit2 size={16}/></button>
                                    <button onClick={() => handleDelete(item.id)} className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"><Trash2 size={16}/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <AdminModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingItem ? `Edit ${title}` : `Add New ${title}`}
                fields={fields}
                initialData={editingItem}
                onSubmit={handleSaveItem}
                saving={saving}
            />
        </div>
    );
};

export default AdminDashboard;
