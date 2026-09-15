'use client';
import React, { useState, useEffect } from 'react';
import { Timeline } from '@/components/Timeline';
import { useAuth } from '@/context/AuthContext';
import { TaskApiClient } from '@/lib/tasks';
import { Task } from '@/types';

export default function DashboardHome() {
    const { user, logout, isLoading: authLoading } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [tasksLoading, setTasksLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 1. Fetch live metrics from database on screen load
    useEffect(() => {
        if (authLoading || !user) return;

        async function loadLiveDashboardData() {
            try {
                setTasksLoading(true);
                const response = await TaskApiClient.getTimelineTasks();
                setTasks(response.data);
            } catch (err: any) {
                console.error("Dashboard population failed:", err);
                setError(err.message || "Failed to establish a secure link with the intranet database.");
            } finally {
                setTasksLoading(false);
            }
        }

        loadLiveDashboardData();
    }, [user, authLoading]);

    // 2. Action method handling updates when a developer clicks "Start Task"
    const handleStartTask = async (taskId: string) => {
        try {
            await TaskApiClient.startTask(taskId);
            // Refresh timeline array instantly to show the active in_progress color indicator
            const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, status: 'in_progress' as const } : t);
            setTasks(updatedTasks);
            if (selectedTask && selectedTask.id === taskId) {
                setSelectedTask({ ...selectedTask, status: 'in_progress' });
            }
        } catch (err: any) {
            alert(`Could not allocate task: ${err.message}`);
        }
    };

    if (authLoading || tasksLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500 mb-4"></div>
                <p className="text-sm font-mono tracking-wider">Synchronizing platform matrix nodes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4">
                <div className="bg-rose-950/30 border border-rose-800 p-6 rounded-2xl max-w-md text-center">
                    <p className="text-rose-200 font-bold mb-4">⚠️ Platform Network Error</p>
                    <p className="text-sm text-slate-400 mb-6">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-4 py-2 bg-rose-800 hover:bg-rose-700 rounded-xl text-sm transition-all font-bold">Retry Handshake</button>
                </div>
            </div>
        );
    }

    if (!user) return null; // Context router redirect takes care of this fallback automatically

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
            {/* Dynamic Metric Status Header Banner */}
            <div className="max-w-5xl mx-auto mb-8 p-6 bg-slate-900 rounded-2xl border border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Welcome back, {user.fullName} 👋</h1>
                    <p className="text-gray-400 text-sm mt-1">Track system overview & active evaluation milestones.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-indigo-950 border border-indigo-800 rounded-xl text-center">
                        <span className="block text-xs uppercase tracking-wider text-indigo-400 font-mono">Tier</span>
                        <span className="text-sm font-bold capitalize text-indigo-200">{user.experienceTier}</span>
                    </div>
                    <button onClick={logout} className="px-4 py-2 bg-slate-800 hover:bg-rose-900/40 hover:text-rose-400 border border-slate-700 rounded-xl text-sm font-semibold transition-all">
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Dynamic Project Timeline List Grid */}
                <div className="md:col-span-2">
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                        🚀 Onboarding Task Progression Line
                    </h2>
                    {tasks.length > 0 ? (
                        <Timeline tasks={tasks} onSelectTask={(task) => setSelectedTask(task)} />
                    ) : (
                        <p className="text-slate-500 italic text-sm p-4 border border-dashed border-slate-800 rounded-xl">No tasks assigned to your development path window.</p>
                    )}
                </div>

                {/* Selected Task Details View Panel Sidebar Drawer */}
                <div className="bg-slate-900 border border-gray-800 rounded-2xl p-6 h-fit sticky top-8">
                    <h2 className="text-xl font-bold mb-4 text-white">Workspace Monitor</h2>
                    {selectedTask ? (
                        <div>
                            <h3 className="text-lg font-bold text-indigo-400">{selectedTask.title}</h3>
                            <p className="text-sm text-slate-400 mt-2 leading-relaxed">{selectedTask.description}</p>

                            <div className="mt-6 space-y-3">
                                <div className="text-xs text-slate-400 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between">
                                    <span>Track Focus:</span> 
                                    <span className="text-amber-400 font-bold uppercase">{selectedTask.specialtyTag}</span>
                                </div>
                
                                {selectedTask.status === 'available' ? (
                                    <button onClick={() => handleStartTask(selectedTask.id)} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-md">
                                        Lock In & Initialize Project
                                    </button>
                                ) : selectedTask.status === 'in_progress' ? (
                                    <div className="space-y-2">
                                        <span className="block text-center text-xs text-amber-500 font-mono py-1 bg-amber-950/30 border border-amber-900 rounded-lg">🚀 Running Workspace Dev Environment</span>
                                        <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all shadow-md">
                                            Submit Repository Check Link
                                        </button>
                                    </div>
                                ) : (
                                    <span className="block text-center text-xs text-emerald-400 font-mono py-2 bg-emerald-950/40 border border-emerald-900 rounded-lg">✅ Milestone Successfully Checked</span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm italic">Select an unlocked curriculum node item along the track vector timeline path to inspect repository validation targets.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
