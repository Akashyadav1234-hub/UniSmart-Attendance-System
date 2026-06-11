import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [facultyName, setFacultyName] = useState('');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [academicYear, setAcademicYear] = useState('2024 - 2025');
  const [assignedBatch, setAssignedBatch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [uploadFile, setUploadFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleCreateFaculty = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://unismart-backend-cxir.onrender.com/api/admin/create-faculty', {
        fullName: facultyName,
        email: facultyEmail,
        academicYear,
        assignedBatch
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(response.data.message || 'Faculty created successfully');
      setFacultyName('');
      setFacultyEmail('');
      setAcademicYear('2024 - 2025');
      setAssignedBatch('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create faculty. Make sure you are logged in as admin.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleBulkUpload = async () => {
    if (!uploadFile) {
      alert('Please select a file to upload first.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', uploadFile);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://unismart-backend-cxir.onrender.com/api/admin/upload-students', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      alert(response.data.message || 'Students uploaded successfully!');
      setUploadFile(null);
    } catch (err) {
      console.error("Upload Error Details:", err.response?.data || err.message);
      alert(`Upload Failed: ${err.response?.data?.message || "Check console for details"}`);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <>
      <style>{`
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
      <div className="bg-background text-on-background font-body-md text-body-md h-screen flex flex-col md:flex-row overflow-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">
        <header className="md:hidden bg-surface-container-low border-b border-outline-variant flex items-center justify-between p-md sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-sm">
            <button aria-label="Menu" className="text-on-surface p-1 hover:bg-surface-variant rounded-md transition-colors">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="font-title-lg text-title-lg font-black text-on-surface">UniSmart</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md">AD</div>
        </header>

        <aside className="bg-surface-container-low border-r border-outline-variant h-full w-64 shrink-0 flex flex-col py-lg z-10 hidden md:flex">
          <div className="px-lg mb-xl">
            <h1 className="font-title-lg text-title-lg font-black text-on-surface">UniSmart Admin</h1>
            <p className="font-label-md text-label-md text-on-surface-variant mt-sm">Institutional Portal</p>
          </div>
          <nav className="flex-1 flex flex-col gap-sm overflow-y-auto">
            <a className="bg-primary-container text-on-primary-container rounded-xl mx-2 px-4 py-3 flex items-center gap-3 transition-all duration-200" href="#">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
              <span className="font-label-md text-label-md">Overview</span>
            </a>
          </nav>
          <div className="px-lg mt-auto pt-lg border-t border-outline-variant">
            <div className="mt-lg flex flex-col gap-sm">
              <a className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-3 px-2" href="#">
                <span className="material-symbols-outlined">help</span>
                <span className="font-caption text-caption">Help Center</span>
              </a>
              <Link className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-3 px-2" to="/">
                <span className="material-symbols-outlined">logout</span>
                <span className="font-caption text-caption">Logout</span>
              </Link>
            </div>
          </div>
        </aside>

        <main className="flex-1 w-full h-full overflow-y-auto bg-background">
          <div className="max-w-[1440px] mx-auto p-margin-mobile md:p-margin-desktop min-h-full flex flex-col gap-lg">
            <header className="mb-lg">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">System Overview</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-sm">Monitor attendance risks and manage institutional data.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              <section className="lg:col-span-8 flex flex-col gap-lg">
                <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col h-full">
                  <div className="bg-surface-container-lowest border-b border-outline-variant px-lg py-md flex flex-wrap justify-between items-center gap-sm">
                    <h3 className="font-headline-md text-headline-md text-on-surface">AI Attendance Risk Overview (SAI)</h3>
                    <button className="text-secondary font-label-md text-label-md hover:underline">View Full Report</button>
                  </div>
                  <div className="p-lg flex-1 flex flex-col gap-lg">
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface-variant mb-md uppercase tracking-wider">Batch-wise Heatmap</h4>
                      <div className="flex flex-wrap gap-sm">
                        <div className="flex-1 min-w-[70px] bg-surface-container-low h-12 rounded flex items-center justify-center font-caption text-caption text-on-surface border border-outline-variant/30">CS 101</div>
                        <div className="flex-1 min-w-[70px] bg-error-container text-on-error-container h-12 rounded flex items-center justify-center font-caption text-caption font-bold border border-error/20">CS 202</div>
                        <div className="flex-1 min-w-[70px] bg-secondary-container text-on-secondary-container h-12 rounded flex items-center justify-center font-caption text-caption font-bold border border-secondary/20">ENG 105</div>
                        <div className="flex-1 min-w-[70px] bg-surface-container-low h-12 rounded flex items-center justify-center font-caption text-caption text-on-surface border border-outline-variant/30">MATH 301</div>
                        <div className="flex-1 min-w-[70px] bg-surface-container-low h-12 rounded flex items-center justify-center font-caption text-caption text-on-surface border border-outline-variant/30">PHY 101</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-label-md text-label-md text-on-surface-variant mb-md uppercase tracking-wider">At-Risk Students (High Priority)</h4>
                      <div className="flex flex-col gap-sm">
                        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between p-md bg-surface-bright border border-outline-variant/50 rounded-lg hover:border-outline transition-colors gap-sm">
                          <div className="flex items-center gap-md w-full sm:w-auto">
                            <div className="w-10 h-10 rounded-full bg-surface-container flex shrink-0 items-center justify-center text-primary font-label-md text-label-md">JD</div>
                            <div className="min-w-0">
                              <p className="font-body-md text-body-md font-semibold text-on-surface truncate">Jane Doe</p>
                              <p className="font-caption text-caption text-on-surface-variant truncate">CS 202 • ID: 89012</p>
                            </div>
                          </div>
                          <span className="shrink-0 bg-error-container text-on-error-container font-caption text-caption px-3 py-1 rounded-full uppercase tracking-wider">High Risk</span>
                        </div>
                        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between p-md bg-surface-bright border border-outline-variant/50 rounded-lg hover:border-outline transition-colors gap-sm">
                          <div className="flex items-center gap-md w-full sm:w-auto">
                            <div className="w-10 h-10 rounded-full bg-surface-container flex shrink-0 items-center justify-center text-primary font-label-md text-label-md">MS</div>
                            <div className="min-w-0">
                              <p className="font-body-md text-body-md font-semibold text-on-surface truncate">Michael Smith</p>
                              <p className="font-caption text-caption text-on-surface-variant truncate">ENG 105 • ID: 89015</p>
                            </div>
                          </div>
                          <span className="shrink-0 bg-secondary-container text-on-secondary-container font-caption text-caption px-3 py-1 rounded-full uppercase tracking-wider">Medium Risk</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <aside className="lg:col-span-4 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-lg">
                <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                  <div className="bg-surface-container-lowest border-b border-outline-variant px-lg py-md">
                    <h3 className="font-headline-md text-headline-md text-on-surface">Create Faculty</h3>
                  </div>
                  <form className="p-lg flex flex-col gap-md" onSubmit={handleCreateFaculty}>
                    <div className="flex flex-col gap-xs">
                      <label className="font-caption text-caption text-on-surface-variant" htmlFor="facultyName">Full Name</label>
                      <input className="w-full bg-surface-bright border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" id="facultyName" placeholder="Dr. Sarah Jenkins" type="text" value={facultyName} onChange={(e) => setFacultyName(e.target.value)} required />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="font-caption text-caption text-on-surface-variant" htmlFor="facultyEmail">Institutional Email</label>
                      <input className="w-full bg-surface-bright border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" id="facultyEmail" placeholder="s.jenkins@university.edu" type="email" value={facultyEmail} onChange={(e) => setFacultyEmail(e.target.value)} required />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="font-caption text-caption text-on-surface-variant" htmlFor="academicYear">Academic Year Focus</label>
                      <select className="w-full bg-surface-bright border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow appearance-none" id="academicYear" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}>
                        <option>2024 - 2025</option>
                        <option>2023 - 2024</option>
                        <option>Summer 2024</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="font-caption text-caption text-on-surface-variant" htmlFor="assignedBatch">Assigned Batch</label>
                      <input className="w-full bg-surface-bright border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" id="assignedBatch" placeholder="e.g., CS 101" type="text" value={assignedBatch} onChange={(e) => setAssignedBatch(e.target.value)} required />
                    </div>
                    <button className="mt-sm w-full bg-primary text-on-primary font-label-md text-label-md rounded-lg py-md hover:bg-primary-container transition-colors disabled:opacity-70" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Provisioning...' : 'Provision Account'}
                    </button>
                  </form>
                </div>

                <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
                  <div className="bg-surface-container-lowest border-b border-outline-variant px-lg py-md">
                    <h3 className="font-headline-md text-headline-md text-on-surface">Bulk Upload Students</h3>
                  </div>
                  <div className="p-lg flex-1 flex flex-col relative">
                    <div className="flex-1 border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-xl text-center bg-surface-container-lowest hover:bg-surface-container-low hover:border-primary transition-colors group relative">
                      <input
                        type="file"
                        accept=".csv, .xls, .xlsx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleFileChange}
                      />
                      <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-md group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                      </div>
                      <p className="font-body-md text-body-md font-semibold text-on-surface">
                        {uploadFile ? uploadFile.name : 'Drag & Drop roster file here'}
                      </p>
                      <p className="font-caption text-caption text-on-surface-variant mt-xs">Supports .xls, .xlsx, .csv (Max 5MB)</p>

                      <button
                        onClick={uploadFile ? handleBulkUpload : undefined}
                        className="mt-md px-lg py-sm border border-outline-variant rounded-lg font-caption text-caption text-on-surface hover:bg-surface-variant transition-colors relative z-20"
                        disabled={isUploading}
                      >
                        {isUploading ? 'Uploading...' : (uploadFile ? 'Upload File' : 'Browse Files')}
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
