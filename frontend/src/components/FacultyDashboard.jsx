import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FacultyDashboard = () => {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(today));
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [activeCourse, setActiveCourse] = useState('CompSci 101');
  const [students, setStudents] = useState([]);

  const handlePrevWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(next);
  };

  const renderCalendarDays = () => {
    const calendarCells = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(currentWeekStart);
      d.setDate(d.getDate() + i);
      calendarCells.push(d);
    }

    return calendarCells.map(dateObj => {
      const dateString = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
      const isSelected = selectedDate === dateString;
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

      return (
        <div
          key={dateString}
          onClick={() => setSelectedDate(dateString)}
          className={`p-2 rounded cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${isSelected ? 'bg-primary-container text-on-primary-container border-2 border-primary-container font-bold shadow-sm' : 'bg-surface border border-outline-variant hover:border-primary hover:shadow-sm'}`}
        >
          <span className="font-caption text-[10px] uppercase tracking-wider opacity-80">{dayName}</span>
          <span className="font-body-md text-body-md">{dateObj.getDate()}</span>
        </div>
      );
    });
  };

  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://unismart-backend-cxir.onrender.com/api/faculty/students?date=${selectedDate}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // The backend is now perfectly handling both saved data AND the 'Absent' default!
        setStudents(response.data);

      } catch (err) {
        console.error("Failed to fetch roster", err);
      }
    };
    fetchRoster();
  }, [selectedDate]);

  const handleToggleAttendance = (id, newStatus) => {
    setStudents(prev => prev.map(student =>
      student.id === id ? { ...student, status: newStatus } : student
    ));
  };

  const handleSaveAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      const records = students.map(student => ({
        studentId: student.id,
        status: student.status
      }));

      await axios.post('https://unismart-backend-cxir.onrender.com/api/faculty/attendance', {
        date: selectedDate,
        records: records
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Attendance saved successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save attendance');
      console.error(err);
    }
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadExcel = async () => {
    try {
      const token = localStorage.getItem('token');

      // We explicitly ask the backend for your specific presentation week
      const startDate = '2026-06-08';
      const endDate = '2026-06-13';

      const response = await axios.get(`https://unismart-backend-cxir.onrender.com/api/faculty/export?startDate=${startDate}&endDate=${endDate}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob', // Critical for downloading files!
      });

      // Create a hidden link and force the browser to download the Excel file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Weekly_Attendance_B10-CSF.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download report", err);
    }
  };
  return (
    <>
      <style>{`
        .material-symbols-outlined {
            font-family: 'Material Symbols Outlined';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
        }
        
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #c6c6cd;
            border-radius: 4px;
        }
      `}</style>
      <div className="bg-background text-on-surface font-body-md min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
        <nav className="bg-surface-container-low border-r border-outline-variant h-screen w-64 fixed left-0 top-0 flex flex-col py-lg z-50 md:flex hidden">
          <div className="px-lg mb-xl flex items-center gap-sm">
            <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold">U</div>
            <div>
              <h1 className="font-title-lg text-title-lg font-black text-on-surface">UniSmart Admin</h1>
              <p className="font-caption text-caption text-on-surface-variant">Institutional Portal</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-sm mt-4 overflow-y-auto">
            <a className="bg-primary-container text-on-primary-container rounded-xl mx-2 px-4 py-3 flex items-center gap-3 transition-all duration-200" href="#">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
              <span className="font-label-md text-label-md">Overview</span>
            </a>
          </div>
          <div className="mt-auto px-4 flex flex-col gap-4">
            <div className="border-t border-outline-variant pt-4 flex flex-col gap-2">
              <a className="text-on-surface-variant hover:bg-surface-container-high rounded-xl px-2 py-2 flex items-center gap-3 transition-all duration-200" href="#">
                <span className="material-symbols-outlined">help</span>
                <span className="font-label-md text-label-md">Help Center</span>
              </a>
              <Link className="text-on-surface-variant hover:bg-surface-container-high rounded-xl px-2 py-2 flex items-center gap-3 transition-all duration-200" to="/">
                <span className="material-symbols-outlined">logout</span>
                <span className="font-label-md text-label-md">Logout</span>
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen">
          <header className="bg-surface border-b border-outline-variant shadow-sm w-full sticky top-0 z-40 md:hidden flex justify-between items-center px-margin-mobile h-16">
            <h1 className="font-headline-md text-headline-md font-bold text-primary">UniSmart</h1>
            <div className="flex items-center gap-4 text-on-surface-variant">
              <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">menu</span>
            </div>
          </header>

          {/* Secondary Header removed */}

          <div className="p-margin-mobile md:p-margin-desktop max-w-[1440px] mx-auto w-full flex flex-col gap-lg">
            <div className="mb-4">
              <h2 className="font-display-lg text-display-lg text-on-surface">Faculty Dashboard</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Manage attendance, view insights, and generate reports.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
              <section className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_20px_-4px_rgba(26,54,93,0.05)] overflow-hidden flex flex-col">
                <div className="bg-surface-container p-4 border-b border-outline-variant flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">calendar_month</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Attendance Calendar</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handlePrevWeek} className="p-2 rounded hover:bg-surface-variant text-on-surface-variant transition-colors">
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <span className="font-label-md text-label-md">{currentWeekStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    <button onClick={handleNextWeek} className="p-2 rounded hover:bg-surface-variant text-on-surface-variant transition-colors">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="grid grid-cols-7 gap-2 mb-4 text-center">
                    {renderCalendarDays()}
                  </div>

                  <div className="mt-4 border-t border-outline-variant pt-4 flex-1">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-label-md text-label-md text-on-surface">
                        Roster for {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date'} - {students.length > 0 && students[0].batch ? `Batch ${students[0].batch}` : activeCourse}
                      </h4>
                      <div className="flex gap-2">
                        <button className="text-primary font-caption text-caption hover:underline">Mark All Present</button>
                      </div>
                    </div>
                    <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {students.map((student) => (
                        <li key={student.id} className={`flex items-center justify-between p-3 rounded border transition-colors ${student.status === 'Present' ? 'bg-surface-container-low border-outline-variant hover:border-outline' : 'bg-error-container/10 border-error/20 hover:border-error/40'}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-surface-variant text-primary flex items-center justify-center font-caption">{student.initials}</div>
                            <div className="flex flex-col">
                              <span className="font-body-md text-body-md text-on-surface">{student.name}</span>
                              <span className="font-caption text-[10px] text-on-surface-variant">{student.rollNumber}</span>
                            </div>
                          </div>
                          <div className="flex bg-surface border border-outline-variant rounded overflow-hidden">
                            <button
                              onClick={() => handleToggleAttendance(student.id, 'Present')}
                              className={`px-3 py-1 font-caption text-caption transition-colors ${student.status === 'Present' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container'}`}>
                              Present
                            </button>
                            <button
                              onClick={() => handleToggleAttendance(student.id, 'Absent')}
                              className={`px-3 py-1 font-caption text-caption transition-colors ${student.status === 'Absent' ? 'bg-error-container text-on-error-container' : 'text-on-surface-variant hover:bg-error-container hover:text-on-error-container'}`}>
                              Absent
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex justify-end">
                      <button onClick={handleSaveAttendance} className="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-2 rounded shadow-sm hover:bg-primary transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">save</span>
                        Save Attendance
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <div className="lg:col-span-4 flex flex-col gap-lg">
                <section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_20px_-4px_rgba(26,54,93,0.05)] overflow-hidden flex-1 flex flex-col">
                  <div className="bg-surface-container p-4 border-b border-outline-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                    <h3 className="font-headline-md text-headline-md text-on-surface">Smart Insights</h3>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div className="bg-surface-container-low p-4 rounded-lg border-l-4 border-secondary-container">
                      <p className="font-caption text-caption text-on-surface">
                        <strong>Recommendation:</strong> Reminder to Batch Y. Attendance is trending down 5% this week.
                      </p>
                      <button className="mt-2 text-primary text-caption font-caption hover:underline">Send Automated Message</button>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface-variant mb-3 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">warning</span> Risk Alerts
                      </h4>
                      <ul className="space-y-3">
                        {students && students.filter(student => student.status === 'Absent').length > 0 ? (
                          students
                            .filter(student => student.status === 'Absent')
                            .map((student) => {
                              // Generate a 2-letter avatar from their name (e.g., "ram" -> "RA")
                              const initials = student.name ? student.name.substring(0, 2).toUpperCase() : '??';

                              return (
                                <li key={student._id || student.rollNumber} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-error-container text-on-error-container flex items-center justify-center font-caption text-[10px]">
                                      {initials}
                                    </div>
                                    <span className="font-caption text-caption text-on-surface">{student.name}</span>
                                  </div>
                                  <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded text-xs font-bold border border-error/20">
                                    High Risk
                                  </span>
                                </li>
                              );
                            })
                        ) : (
                          <li className="text-sm text-green-600 font-medium">✅ All students are marked present!</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_20px_-4px_rgba(26,54,93,0.05)] p-5">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Export Reports</h3>
                  <p className="font-caption text-caption text-on-surface-variant mb-4">Download comprehensive attendance data for official records.</p>
                  <div className="flex flex-col gap-3">
                    <select className="w-full bg-surface border border-outline-variant rounded p-2 font-caption text-caption text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                      <option>Current Week (Jun 2026)</option>
                      <option>Previous Week (Jun 2026)</option>
                    </select>
                    <button
                      onClick={handleDownloadExcel}
                      disabled={isDownloading}
                      className="w-full bg-surface text-primary border border-outline-variant hover:border-primary hover:bg-surface-container-low font-label-md text-label-md py-2 rounded transition-colors flex justify-center items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      {isDownloading ? 'Downloading...' : 'Download Excel Report'}
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <footer className="mt-auto bg-primary text-on-primary py-xl w-full flex flex-col md:flex-row justify-between items-center px-margin-desktop">
            <div className="font-title-lg text-title-lg text-on-primary mb-4 md:mb-0">UniSmart</div>
            <div className="font-caption text-caption opacity-80 mb-4 md:mb-0">
              © 2024 UniSmart Learning Management System. All rights reserved.
            </div>
            <div className="flex gap-4 font-caption text-caption">
              <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" href="#">Privacy Policy</a>
              <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" href="#">Terms of Service</a>
              <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" href="#">Support</a>
              <a className="text-on-primary/80 hover:text-on-primary transition-colors cursor-pointer" href="#">Accessibility</a>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default FacultyDashboard;
